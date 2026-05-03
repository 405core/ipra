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
	ID              uint64         `json:"id"`
	FullName        string         `json:"fullName"`
	DocumentType    string         `json:"documentType"`
	DocumentNum     string         `json:"documentNum"`
	IssuingRegion   string         `json:"issuingRegion"`
	Gender          *int16         `json:"gender,omitempty"`
	BirthDate       *string        `json:"birthDate,omitempty"`
	IsHighRisk      bool           `json:"isHighRisk"`
	IdentityDetails map[string]any `json:"identityDetails"`
	DimensionData   map[string]any `json:"dimensionData"`
	LatestBatchID   *uint64        `json:"latestBatchId,omitempty"`
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
	DocumentType    string
	DocumentNum     string
	IssuingRegion   string
	FullName        string
	Gender          *int16
	BirthDate       *time.Time
	IsHighRisk      bool
	IdentityDetails map[string]any
	DimensionData   map[string]any
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
			`document_num ILIKE ? OR full_name ILIKE ? OR COALESCE(dimension_data -> 'tripInfo' ->> 'pnr', '') ILIKE ? OR COALESCE(dimension_data -> 'tripInfo' ->> 'route', '') ILIKE ?`,
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

	response := make([]SearchProfileResponse, 0, len(profiles))
	for _, profile := range profiles {
		response = append(response, SearchProfileResponse{
			ID:              profile.ID,
			FullName:        profile.FullName,
			DocumentType:    profile.DocumentType,
			DocumentNum:     profile.DocumentNum,
			IssuingRegion:   profile.IssuingRegion,
			Gender:          profile.Gender,
			BirthDate:       formatOptionalDate(profile.BirthDate),
			IsHighRisk:      profile.IsHighRisk,
			IdentityDetails: decodeJSONMap(profile.IdentityDetails),
			DimensionData:   decodeJSONMap(profile.DimensionData),
			LatestBatchID:   profile.LatestBatchID,
			UpdatedAt:       profile.UpdatedAt,
		})
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

		if upsertErr := s.upsertProfile(ctx, batch.ID, record); upsertErr != nil {
			errorsList = append(errorsList, ImportError{
				RowNo:     rowNo,
				ErrorCode: "UPSERT_FAILED",
				Message:   "写入画像数据失败",
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

func (s *Service) upsertProfile(ctx context.Context, batchID uint64, record profileRecord) error {
	identityDetails, err := json.Marshal(record.IdentityDetails)
	if err != nil {
		return err
	}

	dimensionData, err := json.Marshal(record.DimensionData)
	if err != nil {
		return err
	}

	profile := dbschema.PassengerProfile{
		DocumentType:    record.DocumentType,
		DocumentNum:     record.DocumentNum,
		IssuingRegion:   record.IssuingRegion,
		FullName:        record.FullName,
		Gender:          record.Gender,
		BirthDate:       record.BirthDate,
		IsHighRisk:      record.IsHighRisk,
		IdentityDetails: identityDetails,
		DimensionData:   dimensionData,
		LatestBatchID:   &batchID,
	}

	return s.db.WithContext(ctx).Clauses(clause.OnConflict{
		Columns: []clause.Column{
			{Name: "document_type"},
			{Name: "document_num"},
			{Name: "issuing_region"},
		},
		DoUpdates: clause.Assignments(map[string]any{
			"full_name":        record.FullName,
			"gender":           record.Gender,
			"birth_date":       record.BirthDate,
			"is_high_risk":     record.IsHighRisk,
			"identity_details": identityDetails,
			"dimension_data":   dimensionData,
			"latest_batch_id":  batchID,
			"updated_at":       gorm.Expr("CURRENT_TIMESTAMP"),
		}),
	}).Create(&profile).Error
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
