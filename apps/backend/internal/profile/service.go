package profile

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"time"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	dbschema "ipra/backend/internal/database"
)

var ErrImportValidation = errors.New("import validation failed")

const (
	importTypeBaseProfile = "BASE_PROFILE"
	importTypeHighRisk    = "HIGH_RISK"
)

type Service struct {
	db *gorm.DB
}

type SearchProfileResponse struct {
	ID         uint64         `json:"id"`
	FullName   string         `json:"fullName"`
	DocumentNum string        `json:"documentNum"`
	IsHighRisk bool           `json:"isHighRisk"`
	RiskReason string         `json:"riskReason,omitempty"`
	ProfileData map[string]any `json:"profileData"`
	UpdatedAt  time.Time      `json:"updatedAt"`
}

type ImportResult struct {
	BatchID      uint64        `json:"batchId"`
	BatchNo      string        `json:"batchNo"`
	Status       string        `json:"status"`
	TotalRows    int           `json:"totalRows"`
	SuccessCount int           `json:"successCount"`
	FailedCount  int           `json:"failedCount"`
	ErrorDetails []ImportError `json:"errorDetails,omitempty"`
}

type ImportError struct {
	RowNo     int               `json:"rowNo"`
	ErrorCode string            `json:"errorCode"`
	Message   string            `json:"message"`
	RawData   map[string]string `json:"rawData,omitempty"`
}

type profileRecord struct {
	DocumentNum string
	FullName    string
	ProfileData map[string]any
	RiskReason  string
}

func NewService(db *gorm.DB) *Service {
	return &Service{db: db}
}

func (s *Service) SearchProfiles(ctx context.Context, query string, limit int) ([]SearchProfileResponse, error) {
	dbQuery := s.db.WithContext(ctx).Model(&dbschema.PassengerProfile{})

	trimmedQuery := strings.TrimSpace(query)
	if trimmedQuery != "" {
		pattern := "%" + trimmedQuery + "%"
		dbQuery = dbQuery.Where(
			`document_num ILIKE ? OR full_name ILIKE ? OR COALESCE(profile_data -> 'tripInfo' ->> 'pnr', '') ILIKE ? OR COALESCE(profile_data -> 'tripInfo' ->> 'route', '') ILIKE ?`,
			pattern,
			pattern,
			pattern,
			pattern,
		)
	}

	var profiles []dbschema.PassengerProfile
	if err := dbQuery.Order("updated_at DESC").Limit(limit).Find(&profiles).Error; err != nil {
		return nil, err
	}

	watchlistMap, err := s.loadWatchlistMap(ctx, profiles)
	if err != nil {
		return nil, err
	}

	response := make([]SearchProfileResponse, 0, len(profiles))
	seenDocuments := make(map[string]struct{}, len(profiles))
	for _, profile := range profiles {
		watchItem, inWatchlist := watchlistMap[profile.DocumentNum]
		seenDocuments[profile.DocumentNum] = struct{}{}
		response = append(response, SearchProfileResponse{
			ID:          profile.ID,
			FullName:    profile.FullName,
			DocumentNum: profile.DocumentNum,
			IsHighRisk:  inWatchlist,
			RiskReason:  watchItem,
			ProfileData: decodeJSONMap(profile.ProfileData),
			UpdatedAt:   profile.UpdatedAt,
		})
	}

	watchlistOnly, err := s.searchWatchlistOnly(ctx, trimmedQuery, limit, seenDocuments)
	if err != nil {
		return nil, err
	}
	response = append(response, watchlistOnly...)
	if len(response) > limit {
		response = response[:limit]
	}

	return response, nil
}

func (s *Service) ImportProfiles(
	ctx context.Context,
	operatorID uint64,
	filename string,
	importType string,
	data []byte,
) (ImportResult, error) {
	batchNo, err := generateBatchNo()
	if err != nil {
		return ImportResult{}, err
	}

	startedAt := time.Now()
	batch := dbschema.ImportBatchLog{
		BatchNo:    batchNo,
		OperatorID: operatorID,
		FileName:   filename,
		ImportType: importType,
		Status:     "parsing",
		StartedAt:  &startedAt,
	}

	if err := s.db.WithContext(ctx).Create(&batch).Error; err != nil {
		return ImportResult{}, err
	}

	result := ImportResult{
		BatchID: batch.ID,
		BatchNo: batch.BatchNo,
		Status:  batch.Status,
	}

	rows, err := parseSpreadsheet(filename, data)
	if err != nil {
		result.Status = "failed"
		result.ErrorDetails = []ImportError{
			{
				ErrorCode: "INVALID_SPREADSHEET",
				Message:   err.Error(),
			},
		}
		if updateErr := s.finishBatch(ctx, batch.ID, result); updateErr != nil {
			return ImportResult{}, updateErr
		}
		return result, ErrImportValidation
	}

	headers, dataRows := splitSpreadsheetRows(rows)
	if len(headers) == 0 {
		result.Status = "failed"
		result.ErrorDetails = []ImportError{
			{
				ErrorCode: "EMPTY_HEADER",
				Message:   "导入文件缺少表头",
			},
		}
		if updateErr := s.finishBatch(ctx, batch.ID, result); updateErr != nil {
			return ImportResult{}, updateErr
		}
		return result, ErrImportValidation
	}

	if len(dataRows) == 0 {
		result.Status = "failed"
		result.ErrorDetails = []ImportError{
			{
				ErrorCode: "EMPTY_DATA",
				Message:   "导入文件未包含可用数据行",
			},
		}
		if updateErr := s.finishBatch(ctx, batch.ID, result); updateErr != nil {
			return ImportResult{}, updateErr
		}
		return result, ErrImportValidation
	}

	result.TotalRows = len(dataRows)
	errorsList := make([]ImportError, 0)

	for idx, rawRow := range dataRows {
		rowNo := idx + 2
		rowData := rowToValueMap(headers, rawRow)

		record, buildErr := buildProfileRecord(rowData, importType)
		if buildErr != nil {
			errorsList = append(errorsList, ImportError{
				RowNo:     rowNo,
				ErrorCode: "INVALID_ROW",
				Message:   buildErr.Error(),
				RawData:   rowData,
			})
			continue
		}

		var upsertErr error
		switch importType {
		case importTypeHighRisk:
			upsertErr = s.upsertWatchlist(ctx, record)
		default:
			upsertErr = s.upsertProfile(ctx, record)
		}

		if upsertErr != nil {
			errorsList = append(errorsList, ImportError{
				RowNo:     rowNo,
				ErrorCode: "UPSERT_FAILED",
				Message:   "写入数据失败",
				RawData:   rowData,
			})
			continue
		}

		result.SuccessCount++
	}

	result.FailedCount = len(errorsList)
	if result.FailedCount > 0 {
		result.ErrorDetails = errorsList
	}

	switch {
	case result.SuccessCount == 0 && result.FailedCount > 0:
		result.Status = "failed"
	case result.SuccessCount > 0 && result.FailedCount > 0:
		result.Status = "partial_failed"
	default:
		result.Status = "success"
	}

	if err := s.finishBatch(ctx, batch.ID, result); err != nil {
		return ImportResult{}, err
	}

	if result.Status == "failed" {
		return result, ErrImportValidation
	}

	return result, nil
}

type ProfileListResult struct {
	Items []SearchProfileResponse `json:"items"`
	Total int64                   `json:"total"`
}

type WatchlistItem struct {
	ID          uint64    `json:"id"`
	DocumentNum string    `json:"documentNum"`
	RiskReason  string    `json:"riskReason"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

type WatchlistListResult struct {
	Items []WatchlistItem `json:"items"`
	Total int64           `json:"total"`
}

func (s *Service) ListProfiles(ctx context.Context, query string, limit int) (ProfileListResult, error) {
	items, err := s.SearchProfiles(ctx, query, limit)
	if err != nil {
		return ProfileListResult{}, err
	}

	var total int64
	dbQuery := s.db.WithContext(ctx).Model(&dbschema.PassengerProfile{})
	trimmedQuery := strings.TrimSpace(query)
	if trimmedQuery != "" {
		pattern := "%" + trimmedQuery + "%"
		dbQuery = dbQuery.Where(
			`document_num ILIKE ? OR full_name ILIKE ?`,
			pattern,
			pattern,
		)
	}
	if err := dbQuery.Count(&total).Error; err != nil {
		return ProfileListResult{}, err
	}

	return ProfileListResult{
		Items: items,
		Total: total,
	}, nil
}

func (s *Service) ListWatchlist(ctx context.Context, query string, limit int) (WatchlistListResult, error) {
	dbQuery := s.db.WithContext(ctx).Model(&dbschema.HighRiskWatchlist{})
	trimmedQuery := strings.TrimSpace(query)
	if trimmedQuery != "" {
		pattern := "%" + trimmedQuery + "%"
		dbQuery = dbQuery.Where(
			`document_num ILIKE ? OR risk_reason ILIKE ?`,
			pattern,
			pattern,
		)
	}

	var total int64
	if err := dbQuery.Count(&total).Error; err != nil {
		return WatchlistListResult{}, err
	}

	var items []dbschema.HighRiskWatchlist
	if err := dbQuery.Order("updated_at DESC").Limit(limit).Find(&items).Error; err != nil {
		return WatchlistListResult{}, err
	}

	result := make([]WatchlistItem, 0, len(items))
	for _, item := range items {
		result = append(result, WatchlistItem{
			ID:          item.ID,
			DocumentNum: item.DocumentNum,
			RiskReason:  item.RiskReason,
			UpdatedAt:   item.UpdatedAt,
		})
	}

	return WatchlistListResult{
		Items: result,
		Total: total,
	}, nil
}

func (s *Service) CreateProfile(ctx context.Context, payload SearchProfileResponse) error {
	return s.upsertProfile(ctx, profileRecord{
		DocumentNum: payload.DocumentNum,
		FullName:    payload.FullName,
		ProfileData: payload.ProfileData,
	})
}

func (s *Service) UpdateProfile(ctx context.Context, id uint64, payload SearchProfileResponse) error {
	var existing dbschema.PassengerProfile
	if err := s.db.WithContext(ctx).First(&existing, id).Error; err != nil {
		return err
	}

	documentNum := payload.DocumentNum
	if strings.TrimSpace(documentNum) == "" {
		documentNum = existing.DocumentNum
	}
	fullName := payload.FullName
	if strings.TrimSpace(fullName) == "" {
		fullName = existing.FullName
	}
	profileData := payload.ProfileData
	if profileData == nil {
		profileData = decodeJSONMap(existing.ProfileData)
	}

	rawProfileData, err := json.Marshal(profileData)
	if err != nil {
		return err
	}

	return s.db.WithContext(ctx).Model(&existing).Updates(map[string]any{
		"document_num": documentNum,
		"full_name":    fullName,
		"profile_data": rawProfileData,
		"updated_at":   gorm.Expr("CURRENT_TIMESTAMP"),
	}).Error
}

func (s *Service) DeleteProfile(ctx context.Context, id uint64) error {
	return s.db.WithContext(ctx).Delete(&dbschema.PassengerProfile{}, id).Error
}

func (s *Service) CreateWatchlist(ctx context.Context, payload WatchlistItem) error {
	return s.upsertWatchlist(ctx, profileRecord{
		DocumentNum: payload.DocumentNum,
		RiskReason:  payload.RiskReason,
	})
}

func (s *Service) UpdateWatchlist(ctx context.Context, id uint64, payload WatchlistItem) error {
	return s.db.WithContext(ctx).Model(&dbschema.HighRiskWatchlist{}).
		Where("id = ?", id).
		Updates(map[string]any{
			"document_num": payload.DocumentNum,
			"risk_reason":  payload.RiskReason,
			"updated_at":   gorm.Expr("CURRENT_TIMESTAMP"),
		}).Error
}

func (s *Service) DeleteWatchlist(ctx context.Context, id uint64) error {
	return s.db.WithContext(ctx).Delete(&dbschema.HighRiskWatchlist{}, id).Error
}

func (s *Service) upsertProfile(ctx context.Context, record profileRecord) error {
	profileData, err := json.Marshal(record.ProfileData)
	if err != nil {
		return err
	}

	profile := dbschema.PassengerProfile{
		DocumentNum: record.DocumentNum,
		FullName:    record.FullName,
		ProfileData: profileData,
	}

	return s.db.WithContext(ctx).Clauses(clause.OnConflict{
		Columns: []clause.Column{{Name: "document_num"}},
		DoUpdates: clause.Assignments(map[string]any{
			"full_name":    record.FullName,
			"profile_data": profileData,
			"updated_at":   gorm.Expr("CURRENT_TIMESTAMP"),
		}),
	}).Create(&profile).Error
}

func (s *Service) upsertWatchlist(ctx context.Context, record profileRecord) error {
	if strings.TrimSpace(record.RiskReason) == "" {
		record.RiskReason = "高风险名单命中"
	}

	item := dbschema.HighRiskWatchlist{
		DocumentNum: record.DocumentNum,
		RiskReason:  record.RiskReason,
	}

	return s.db.WithContext(ctx).Clauses(clause.OnConflict{
		Columns: []clause.Column{{Name: "document_num"}},
		DoUpdates: clause.Assignments(map[string]any{
			"risk_reason": record.RiskReason,
			"updated_at":  gorm.Expr("CURRENT_TIMESTAMP"),
		}),
	}).Create(&item).Error
}

func (s *Service) finishBatch(ctx context.Context, batchID uint64, result ImportResult) error {
	finishedAt := time.Now()

	var errorDetails any
	if len(result.ErrorDetails) > 0 {
		payload, err := json.Marshal(result.ErrorDetails)
		if err != nil {
			return err
		}
		errorDetails = payload
	}

	return s.db.WithContext(ctx).Model(&dbschema.ImportBatchLog{}).
		Where("id = ?", batchID).
		Updates(map[string]any{
			"status":        result.Status,
			"total_rows":    result.TotalRows,
			"success_count": result.SuccessCount,
			"failed_count":  result.FailedCount,
			"error_details": errorDetails,
			"finished_at":   finishedAt,
		}).Error
}

func decodeJSONMap(raw json.RawMessage) map[string]any {
	if len(raw) == 0 {
		return map[string]any{}
	}

	var decoded map[string]any
	if err := json.Unmarshal(raw, &decoded); err != nil {
		return map[string]any{}
	}

	if decoded == nil {
		return map[string]any{}
	}

	return decoded
}

func (s *Service) loadWatchlistMap(
	ctx context.Context,
	profiles []dbschema.PassengerProfile,
) (map[string]string, error) {
	documentNums := make([]string, 0, len(profiles))
	for _, profile := range profiles {
		if strings.TrimSpace(profile.DocumentNum) != "" {
			documentNums = append(documentNums, profile.DocumentNum)
		}
	}
	if len(documentNums) == 0 {
		return map[string]string{}, nil
	}

	var items []dbschema.HighRiskWatchlist
	if err := s.db.WithContext(ctx).
		Where("document_num IN ?", documentNums).
		Find(&items).Error; err != nil {
		return nil, err
	}

	result := make(map[string]string, len(items))
	for _, item := range items {
		result[item.DocumentNum] = item.RiskReason
	}

	return result, nil
}

func (s *Service) searchWatchlistOnly(
	ctx context.Context,
	query string,
	limit int,
	seenDocuments map[string]struct{},
) ([]SearchProfileResponse, error) {
	dbQuery := s.db.WithContext(ctx).Model(&dbschema.HighRiskWatchlist{})
	if query != "" {
		pattern := "%" + query + "%"
		dbQuery = dbQuery.Where(
			`document_num ILIKE ? OR risk_reason ILIKE ?`,
			pattern,
			pattern,
		)
	}

	var items []dbschema.HighRiskWatchlist
	if err := dbQuery.Order("updated_at DESC").Limit(limit).Find(&items).Error; err != nil {
		return nil, err
	}

	response := make([]SearchProfileResponse, 0, len(items))
	for _, item := range items {
		if _, exists := seenDocuments[item.DocumentNum]; exists {
			continue
		}
		response = append(response, SearchProfileResponse{
			ID:          0,
			FullName:    "未导入基础画像",
			DocumentNum: item.DocumentNum,
			IsHighRisk:  true,
			RiskReason:  item.RiskReason,
			ProfileData: map[string]any{},
			UpdatedAt:   item.UpdatedAt,
		})
	}

	return response, nil
}

func normalizeImportType(raw string) (string, bool) {
	switch strings.ToUpper(strings.TrimSpace(raw)) {
	case "", importTypeBaseProfile:
		return importTypeBaseProfile, true
	case importTypeHighRisk:
		return importTypeHighRisk, true
	default:
		return "", false
	}
}

func generateBatchNo() (string, error) {
	randomBytes := make([]byte, 4)
	if _, err := rand.Read(randomBytes); err != nil {
		return "", fmt.Errorf("generate batch no: %w", err)
	}

	return "BATCH-" + time.Now().UTC().Format("20060102T150405") + "-" + hex.EncodeToString(randomBytes), nil
}
