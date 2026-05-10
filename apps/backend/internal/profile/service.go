package profile

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"sort"
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
	ID              string         `json:"id"`
	FullName        string         `json:"fullName"`
	DocumentNum     string         `json:"documentNum"`
	Gender          *int16         `json:"gender,omitempty"`
	BirthDate       *string        `json:"birthDate,omitempty"`
	IsHighRisk      bool           `json:"isHighRisk"`
	IdentityDetails map[string]any `json:"identityDetails"`
	DimensionData   map[string]any `json:"dimensionData"`
	UpdatedAt       time.Time      `json:"updatedAt"`
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
}

func NewService(db *gorm.DB) *Service {
	return &Service{db: db}
}

func (s *Service) SearchProfiles(ctx context.Context, query string, limit int) ([]SearchProfileResponse, error) {
	trimmedQuery := strings.TrimSpace(query)
	pattern := "%" + trimmedQuery + "%"

	dbQuery := s.db.WithContext(ctx).Model(&dbschema.PassengerProfile{})
	if trimmedQuery != "" {
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

	watchlistQuery := s.db.WithContext(ctx).Model(&dbschema.HighRiskWatchlist{})
	if trimmedQuery != "" {
		watchlistQuery = watchlistQuery.Where(
			`document_num ILIKE ? OR risk_reason ILIKE ?`,
			pattern,
			pattern,
			pattern,
		)
	}
	var watchlistItems []dbschema.HighRiskWatchlist
	if err := watchlistQuery.Order("updated_at DESC").Limit(limit).Find(&watchlistItems).Error; err != nil {
		return nil, err
	}

	watchlistByKey := make(map[string]dbschema.HighRiskWatchlist, len(watchlistItems))
	for _, item := range watchlistItems {
		watchlistByKey[profileKey(item.DocumentNum)] = item
	}

	response := make([]SearchProfileResponse, 0, len(profiles)+len(watchlistItems))
	seen := make(map[string]struct{}, len(profiles)+len(watchlistItems))
	for _, profile := range profiles {
		key := profileKey(profile.DocumentNum)
		watchlist, hasWatchlist := watchlistByKey[key]
		profileData := decodeJSONMap(profile.ProfileData)
		dimensionData := enrichProfileData(profileData, hasWatchlist, watchlist)
		documentInfo := asMap(profileData["documentInfo"])

		gender, birthDate := extractIdentityFields(documentInfo)
		updatedAt := profile.UpdatedAt
		if hasWatchlist && watchlist.UpdatedAt.After(updatedAt) {
			updatedAt = watchlist.UpdatedAt
		}

		response = append(response, SearchProfileResponse{
			ID:              fmt.Sprintf("profile:%d", profile.ID),
			FullName:        profile.FullName,
			DocumentNum:     profile.DocumentNum,
			Gender:          gender,
			BirthDate:       birthDate,
			IsHighRisk:      hasWatchlist,
			IdentityDetails: documentInfo,
			DimensionData:   dimensionData,
			UpdatedAt:       updatedAt,
		})
		seen[key] = struct{}{}
	}

	for _, watchlist := range watchlistItems {
		key := profileKey(watchlist.DocumentNum)
		if _, exists := seen[key]; exists {
			continue
		}
		dimensionData := enrichProfileData(nil, true, watchlist)
		response = append(response, SearchProfileResponse{
			ID:              fmt.Sprintf("watchlist:%d", watchlist.ID),
			FullName:        "",
			DocumentNum:     watchlist.DocumentNum,
			IsHighRisk:      true,
			IdentityDetails: map[string]any{},
			DimensionData:   dimensionData,
			UpdatedAt:       watchlist.UpdatedAt,
		})
	}

	sort.Slice(response, func(i, j int) bool {
		return response[i].UpdatedAt.After(response[j].UpdatedAt)
	})
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

		switch importType {
		case importTypeBaseProfile:
			record, buildErr := buildProfileRecord(rowData)
			if buildErr != nil {
				errorsList = append(errorsList, ImportError{
					RowNo:     rowNo,
					ErrorCode: "INVALID_ROW",
					Message:   buildErr.Error(),
					RawData:   rowData,
				})
				continue
			}
			if upsertErr := s.upsertProfile(ctx, batch.ID, record); upsertErr != nil {
				errorsList = append(errorsList, ImportError{
					RowNo:     rowNo,
					ErrorCode: "UPSERT_FAILED",
					Message:   "写入画像数据失败",
					RawData:   rowData,
				})
				continue
			}
		case importTypeHighRisk:
			record, buildErr := buildHighRiskWatchlistRecord(rowData)
			if buildErr != nil {
				errorsList = append(errorsList, ImportError{
					RowNo:     rowNo,
					ErrorCode: "INVALID_ROW",
					Message:   buildErr.Error(),
					RawData:   rowData,
				})
				continue
			}
			if upsertErr := s.upsertHighRiskWatchlist(ctx, batch.ID, record); upsertErr != nil {
				errorsList = append(errorsList, ImportError{
					RowNo:     rowNo,
					ErrorCode: "UPSERT_FAILED",
					Message:   "写入高风险名单失败",
					RawData:   rowData,
				})
				continue
			}
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

func (s *Service) upsertProfile(ctx context.Context, batchID uint64, record profileRecord) error {
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
		Columns: []clause.Column{
			{Name: "document_num"},
		},
		DoUpdates: clause.Assignments(map[string]any{
			"full_name":    record.FullName,
			"profile_data": profileData,
			"updated_at":   gorm.Expr("CURRENT_TIMESTAMP"),
		}),
	}).Create(&profile).Error
}

func (s *Service) upsertHighRiskWatchlist(ctx context.Context, batchID uint64, record highRiskWatchlistRecord) error {
	watchlist := dbschema.HighRiskWatchlist{
		DocumentNum: record.DocumentNum,
		RiskReason:  record.RiskReason,
	}

	return s.db.WithContext(ctx).Clauses(clause.OnConflict{
		Columns: []clause.Column{
			{Name: "document_num"},
		},
		DoUpdates: clause.Assignments(map[string]any{
			"risk_reason": record.RiskReason,
			"updated_at":  gorm.Expr("CURRENT_TIMESTAMP"),
		}),
	}).Create(&watchlist).Error
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

func formatOptionalDate(value *time.Time) *string {
	if value == nil {
		return nil
	}

	formatted := value.Format("2006-01-02")
	return &formatted
}

func profileKey(documentNum string) string {
	return strings.TrimSpace(documentNum)
}

func enrichProfileData(profileData map[string]any, isHighRisk bool, watchlist dbschema.HighRiskWatchlist) map[string]any {
	result := cloneMap(profileData)
	if result == nil {
		result = map[string]any{}
	}
	if !isHighRisk {
		return result
	}

	if strings.TrimSpace(watchlist.RiskReason) != "" {
		result["riskTags"] = []string{watchlist.RiskReason}
		result["riskRecords"] = []map[string]any{
			{
				"type": watchlist.RiskReason,
			},
		}
	} else {
		result["riskTags"] = []string{"名单命中"}
		result["riskRecords"] = []map[string]any{
			{
				"type": "名单命中",
			},
		}
	}

	return result
}

func cloneMap(input map[string]any) map[string]any {
	if len(input) == 0 {
		return map[string]any{}
	}
	cloned := make(map[string]any, len(input))
	for key, value := range input {
		cloned[key] = value
	}
	return cloned
}

func asMap(value any) map[string]any {
	typed, ok := value.(map[string]any)
	if !ok || typed == nil {
		return map[string]any{}
	}
	return typed
}

func extractIdentityFields(documentInfo map[string]any) (*int16, *string) {
	genderValue, _ := documentInfo["gender"].(string)
	gender, _ := parseGender(genderValue)

	birthDateValue, _ := documentInfo["birthDate"].(string)
	birthDateValue = strings.TrimSpace(birthDateValue)
	if birthDateValue == "" {
		return gender, nil
	}
	return gender, &birthDateValue
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
