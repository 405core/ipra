package profile

import (
	"context"
	"crypto/rand"
	"database/sql"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"time"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	dbschema "ipra/backend/internal/database"
	"ipra/backend/internal/sensitive"
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
	ID          uint64         `json:"id"`
	FullName    string         `json:"fullName"`
	DocumentNum string         `json:"documentNum"`
	IsHighRisk  bool           `json:"isHighRisk"`
	RiskCategory string        `json:"riskCategory,omitempty"`
	RiskReason  string         `json:"riskReason,omitempty"`
	ProfileData map[string]any `json:"profileData"`
	UpdatedAt   time.Time      `json:"updatedAt"`
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
	RiskCategory string
	RiskReason  string
}

type ImportBatchDetail struct {
	BatchID      uint64
	BatchNo      string
	FileName     string
	ImportType   string
	Status       string
	TotalRows    int
	SuccessCount int
	FailedCount  int
	ErrorDetails []ImportError
	StartedAt    *time.Time
	FinishedAt   *time.Time
}

func NewService(db *gorm.DB) *Service {
	return &Service{db: db}
}

func (s *Service) EnsureSchema(ctx context.Context) error {
	if s == nil || s.db == nil {
		return nil
	}

	statements := []string{
		`CREATE TABLE IF NOT EXISTS high_risk_watchlist (
			id BIGSERIAL PRIMARY KEY,
			document_num VARCHAR(64) NOT NULL,
			risk_category VARCHAR(64) NOT NULL DEFAULT '',
			risk_reason TEXT NOT NULL DEFAULT '',
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE UNIQUE INDEX IF NOT EXISTS idx_uniq_watchlist_doc ON high_risk_watchlist(document_num)`,
		`ALTER TABLE high_risk_watchlist ADD COLUMN IF NOT EXISTS risk_category VARCHAR(64) NOT NULL DEFAULT ''`,
	}

	for _, statement := range statements {
		if err := s.db.WithContext(ctx).Exec(statement).Error; err != nil {
			return err
		}
	}

	return nil
}

func (s *Service) SearchProfilesByDocumentExact(
	ctx context.Context,
	documentNum string,
) ([]SearchProfileResponse, error) {
	trimmedDocumentNum := strings.TrimSpace(documentNum)
	if trimmedDocumentNum == "" {
		return []SearchProfileResponse{}, nil
	}

	var profiles []dbschema.PassengerProfile
	if err := s.db.WithContext(ctx).
		Where("document_num = ?", trimmedDocumentNum).
		Order("updated_at DESC").
		Limit(1).
		Find(&profiles).Error; err != nil {
		return nil, err
	}

	if len(profiles) > 0 {
		watchlistMap, err := s.loadWatchlistMap(ctx, profiles)
		if err != nil {
			return nil, err
		}

		profile := profiles[0]
		watchItem, inWatchlist := watchlistMap[profile.DocumentNum]
		return []SearchProfileResponse{
			{
				ID:          profile.ID,
				FullName:    profile.FullName,
				DocumentNum: profile.DocumentNum,
				IsHighRisk:  inWatchlist,
				RiskCategory: watchItem.RiskCategory,
				RiskReason:  watchItem.RiskReason,
				ProfileData: decodeJSONMap(profile.ProfileData),
				UpdatedAt:   profile.UpdatedAt,
			},
		}, nil
	}

	var watchItem dbschema.HighRiskWatchlist
	if err := s.db.WithContext(ctx).
		Where("document_num = ?", trimmedDocumentNum).
		Order("updated_at DESC").
		First(&watchItem).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return []SearchProfileResponse{}, nil
		}
		return nil, err
	}

	return []SearchProfileResponse{
		{
			ID:          0,
			FullName:    "未导入基础画像",
			DocumentNum: watchItem.DocumentNum,
			IsHighRisk:  true,
			RiskCategory: watchItem.RiskCategory,
			RiskReason:  watchItem.RiskReason,
			ProfileData: map[string]any{},
			UpdatedAt:   watchItem.UpdatedAt,
		},
	}, nil
}

func (s *Service) GetProfileByID(
	ctx context.Context,
	id uint64,
) (SearchProfileResponse, error) {
	var profile dbschema.PassengerProfile
	if err := s.db.WithContext(ctx).First(&profile, id).Error; err != nil {
		return SearchProfileResponse{}, err
	}

	watchlistMap, err := s.loadWatchlistMap(ctx, []dbschema.PassengerProfile{profile})
	if err != nil {
		return SearchProfileResponse{}, err
	}

	watchItem, inWatchlist := watchlistMap[profile.DocumentNum]
	return SearchProfileResponse{
		ID:          profile.ID,
		FullName:    profile.FullName,
		DocumentNum: profile.DocumentNum,
		IsHighRisk:  inWatchlist,
		RiskCategory: watchItem.RiskCategory,
		RiskReason:  watchItem.RiskReason,
		ProfileData: decodeJSONMap(profile.ProfileData),
		UpdatedAt:   profile.UpdatedAt,
	}, nil
}

func (s *Service) SearchProfiles(ctx context.Context, query string, limit int) ([]SearchProfileResponse, error) {
	dbQuery := s.db.WithContext(ctx).Model(&dbschema.PassengerProfile{})

	trimmedQuery := strings.TrimSpace(query)
	if trimmedQuery != "" {
		pattern := "%" + trimmedQuery + "%"
		dbQuery = dbQuery.Where(
			`document_num ILIKE ? OR full_name ILIKE ? OR CAST(profile_data AS TEXT) ILIKE ?`,
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
			RiskCategory: watchItem.RiskCategory,
			RiskReason:  watchItem.RiskReason,
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
	RiskCategory string   `json:"riskCategory,omitempty"`
	RiskReason  string    `json:"riskReason"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

type WatchlistListResult struct {
	Items []WatchlistItem `json:"items"`
	Total int64           `json:"total"`
}

type watchlistMatch struct {
	RiskCategory string
	RiskReason   string
}

type ProfileListFilter struct {
	Query        string
	DocumentType string
	Nationality  string
	Gender       string
}

func (s *Service) ListProfiles(
	ctx context.Context,
	filter ProfileListFilter,
	limit int,
) (ProfileListResult, error) {
	items, err := s.searchProfiles(ctx, filter, limit)
	if err != nil {
		return ProfileListResult{}, err
	}

	return ProfileListResult{
		Items: items,
		Total: int64(len(items)),
	}, nil
}

func (s *Service) searchProfiles(
	ctx context.Context,
	filter ProfileListFilter,
	limit int,
) ([]SearchProfileResponse, error) {
	profiles, err := s.loadProfileRecords(ctx, filter, limit)
	if err != nil {
		return nil, err
	}

	watchlistMap, err := s.loadWatchlistMap(ctx, profiles)
	if err != nil {
		return nil, err
	}

	response := make([]SearchProfileResponse, 0, len(profiles))
	for _, profile := range profiles {
		watchItem, inWatchlist := watchlistMap[profile.DocumentNum]
		response = append(response, SearchProfileResponse{
			ID:          profile.ID,
			FullName:    profile.FullName,
			DocumentNum: profile.DocumentNum,
			IsHighRisk:  inWatchlist,
			RiskCategory: watchItem.RiskCategory,
			RiskReason:  watchItem.RiskReason,
			ProfileData: decodeJSONMap(profile.ProfileData),
			UpdatedAt:   profile.UpdatedAt,
		})
	}

	return response, nil
}

func (s *Service) ListProfileFilterGroups(
	ctx context.Context,
	filter ProfileListFilter,
) ([]sensitive.FilterGroup, error) {
	documentTypeOptions, err := s.listProfileFilterOptions(
		ctx,
		profileFilterWithoutDocumentType(filter),
		"UPPER(profile_data->'basicInfo'->>'documentType')",
		func(value string) (sensitive.FilterOption, bool) {
			value = strings.ToUpper(strings.TrimSpace(value))
			if value == "" {
				return sensitive.FilterOption{}, false
			}
			return sensitive.FilterOption{
				Value: value,
				Label: formatDocumentTypeLabel(value),
			}, true
		},
	)
	if err != nil {
		return nil, err
	}

	nationalityOptions, err := s.listProfileFilterOptions(
		ctx,
		profileFilterWithoutNationality(filter),
		"profile_data->'basicInfo'->>'nationality'",
		func(value string) (sensitive.FilterOption, bool) {
			value = strings.TrimSpace(value)
			if value == "" {
				return sensitive.FilterOption{}, false
			}
			return sensitive.FilterOption{
				Value: value,
				Label: value,
			}, true
		},
	)
	if err != nil {
		return nil, err
	}

	genderOptions, err := s.listProfileFilterOptions(
		ctx,
		profileFilterWithoutGender(filter),
		"LOWER(profile_data->'basicInfo'->>'gender')",
		func(value string) (sensitive.FilterOption, bool) {
			value = normalizeProfileGenderFilter(value)
			if value == "" {
				return sensitive.FilterOption{}, false
			}
			return sensitive.FilterOption{
				Value: value,
				Label: formatGenderLabel(value),
			}, true
		},
	)
	if err != nil {
		return nil, err
	}

	return []sensitive.FilterGroup{
		{
			Key:     "documentType",
			Label:   "证件类型",
			Options: documentTypeOptions,
		},
		{
			Key:     "nationality",
			Label:   "国籍",
			Options: nationalityOptions,
		},
		{
			Key:     "gender",
			Label:   "性别",
			Options: genderOptions,
		},
	}, nil
}

func (s *Service) loadProfileRecords(
	ctx context.Context,
	filter ProfileListFilter,
	limit int,
) ([]dbschema.PassengerProfile, error) {
	dbQuery := s.buildProfileListQuery(ctx, filter).Order("updated_at DESC")
	if limit > 0 {
		dbQuery = dbQuery.Limit(limit)
	}

	var profiles []dbschema.PassengerProfile
	if err := dbQuery.Find(&profiles).Error; err != nil {
		return nil, err
	}
	return profiles, nil
}

func (s *Service) buildProfileListQuery(
	ctx context.Context,
	filter ProfileListFilter,
) *gorm.DB {
	dbQuery := s.db.WithContext(ctx).Model(&dbschema.PassengerProfile{})

	trimmedQuery := strings.TrimSpace(filter.Query)
	if trimmedQuery != "" {
		pattern := "%" + trimmedQuery + "%"
		dbQuery = dbQuery.Where(
			`document_num ILIKE ? OR full_name ILIKE ? OR CAST(profile_data AS TEXT) ILIKE ?`,
			pattern,
			pattern,
			pattern,
		)
	}

	if documentType := strings.TrimSpace(filter.DocumentType); documentType != "" {
		dbQuery = dbQuery.Where(
			"profile_data->'basicInfo'->>'documentType' = ?",
			strings.ToUpper(documentType),
		)
	}

	if nationality := strings.TrimSpace(filter.Nationality); nationality != "" {
		dbQuery = dbQuery.Where(
			"profile_data->'basicInfo'->>'nationality' ILIKE ?",
			"%"+nationality+"%",
		)
	}

	if gender := normalizeProfileGenderFilter(filter.Gender); gender != "" {
		dbQuery = dbQuery.Where(
			"LOWER(profile_data->'basicInfo'->>'gender') = ?",
			gender,
		)
	}

	return dbQuery
}

func (s *Service) listProfileFilterOptions(
	ctx context.Context,
	filter ProfileListFilter,
	expression string,
	resolver func(value string) (sensitive.FilterOption, bool),
) ([]sensitive.FilterOption, error) {
	values, err := s.listDistinctProfileValues(ctx, filter, expression)
	if err != nil {
		return nil, err
	}

	options := make([]sensitive.FilterOption, 0, len(values))
	for _, value := range values {
		option, ok := resolver(value)
		if !ok {
			continue
		}
		options = append(options, option)
	}

	return sensitive.NormalizeFilterOptions(options), nil
}

func (s *Service) listDistinctProfileValues(
	ctx context.Context,
	filter ProfileListFilter,
	expression string,
) ([]string, error) {
	rows, err := s.buildProfileListQuery(ctx, filter).
		Select("DISTINCT " + expression).
		Rows()
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	values := make([]string, 0)
	for rows.Next() {
		var value sql.NullString
		if err := rows.Scan(&value); err != nil {
			return nil, err
		}
		if !value.Valid {
			continue
		}
		values = append(values, value.String)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return values, nil
}

func profileFilterWithoutDocumentType(filter ProfileListFilter) ProfileListFilter {
	filter.DocumentType = ""
	return filter
}

func profileFilterWithoutNationality(filter ProfileListFilter) ProfileListFilter {
	filter.Nationality = ""
	return filter
}

func profileFilterWithoutGender(filter ProfileListFilter) ProfileListFilter {
	filter.Gender = ""
	return filter
}

func normalizeProfileGenderFilter(value string) string {
	switch strings.ToLower(strings.TrimSpace(value)) {
	case "male", "m", "1", "男":
		return "male"
	case "female", "f", "2", "女":
		return "female"
	case "unknown", "0", "未知":
		return "unknown"
	default:
		return strings.ToLower(strings.TrimSpace(value))
	}
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
			RiskCategory: item.RiskCategory,
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
		RiskCategory: payload.RiskCategory,
		RiskReason:  payload.RiskReason,
	})
}

func (s *Service) UpdateWatchlist(ctx context.Context, id uint64, payload WatchlistItem) error {
	return s.db.WithContext(ctx).Model(&dbschema.HighRiskWatchlist{}).
		Where("id = ?", id).
		Updates(map[string]any{
			"document_num": payload.DocumentNum,
			"risk_category": strings.TrimSpace(payload.RiskCategory),
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
		RiskCategory: strings.TrimSpace(record.RiskCategory),
		RiskReason:  record.RiskReason,
	}

	return s.db.WithContext(ctx).Clauses(clause.OnConflict{
		Columns: []clause.Column{{Name: "document_num"}},
		DoUpdates: clause.Assignments(map[string]any{
			"risk_category": strings.TrimSpace(record.RiskCategory),
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

func (s *Service) GetImportBatchDetail(
	ctx context.Context,
	batchID uint64,
) (ImportBatchDetail, error) {
	var batch dbschema.ImportBatchLog
	if err := s.db.WithContext(ctx).First(&batch, batchID).Error; err != nil {
		return ImportBatchDetail{}, err
	}

	result := ImportBatchDetail{
		BatchID:      batch.ID,
		BatchNo:      batch.BatchNo,
		FileName:     batch.FileName,
		ImportType:   batch.ImportType,
		Status:       batch.Status,
		TotalRows:    batch.TotalRows,
		SuccessCount: batch.SuccessCount,
		FailedCount:  batch.FailedCount,
		StartedAt:    batch.StartedAt,
		FinishedAt:   batch.FinishedAt,
	}
	if len(batch.ErrorDetails) > 0 {
		_ = json.Unmarshal(batch.ErrorDetails, &result.ErrorDetails)
	}
	return result, nil
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
) (map[string]watchlistMatch, error) {
	documentNums := make([]string, 0, len(profiles))
	for _, profile := range profiles {
		if strings.TrimSpace(profile.DocumentNum) != "" {
			documentNums = append(documentNums, profile.DocumentNum)
		}
	}
	if len(documentNums) == 0 {
		return map[string]watchlistMatch{}, nil
	}

	var items []dbschema.HighRiskWatchlist
	if err := s.db.WithContext(ctx).
		Where("document_num IN ?", documentNums).
		Find(&items).Error; err != nil {
		return nil, err
	}

	result := make(map[string]watchlistMatch, len(items))
	for _, item := range items {
		result[item.DocumentNum] = watchlistMatch{
			RiskCategory: strings.TrimSpace(item.RiskCategory),
			RiskReason:   item.RiskReason,
		}
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
			RiskCategory: item.RiskCategory,
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
