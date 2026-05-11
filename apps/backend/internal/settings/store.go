package settings

import (
	"context"
	"errors"
	"fmt"
	"strconv"
	"time"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
	dbschema "ipra/backend/internal/database"
)

const (
	DefaultInteractionRounds = 3
	MinInteractionRounds     = 1
	MaxInteractionRounds     = 10

	inquiryMaxRoundsKey = "inquiry.max_interaction_rounds"
)

type InquirySettings struct {
	MaxRounds   int
	UpdatedAt   time.Time
	UpdatedByID uint64
}

type Store interface {
	EnsureSchema(context.Context) error
	GetInquirySettings(context.Context) (InquirySettings, error)
	UpdateInquirySettings(context.Context, int, uint64) (InquirySettings, error)
}

type GormStore struct {
	db  *gorm.DB
	now func() time.Time
}

func NewGormStore(db *gorm.DB) *GormStore {
	return &GormStore{
		db:  db,
		now: time.Now,
	}
}

func (s *GormStore) EnsureSchema(ctx context.Context) error {
	if s == nil || s.db == nil {
		return nil
	}

	statements := []string{
		`CREATE TABLE IF NOT EXISTS system_setting (
			setting_key VARCHAR(128) PRIMARY KEY,
			setting_value TEXT NOT NULL,
			description TEXT NOT NULL DEFAULT '',
			updated_by_id BIGINT REFERENCES "system_user"(id),
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
		)`,
		`INSERT INTO system_setting (setting_key, setting_value, description)
			VALUES ('inquiry.max_interaction_rounds', '3', '管理员设置的总交互轮次上限')
			ON CONFLICT (setting_key) DO NOTHING`,
	}

	for _, statement := range statements {
		if err := s.db.WithContext(ctx).Exec(statement).Error; err != nil {
			return err
		}
	}

	return nil
}

func (s *GormStore) GetInquirySettings(ctx context.Context) (InquirySettings, error) {
	if s == nil || s.db == nil {
		return InquirySettings{}, errors.New("settings store database is not configured")
	}

	var row dbschema.SystemSetting
	err := s.db.WithContext(ctx).Where("setting_key = ?", inquiryMaxRoundsKey).First(&row).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		if err := s.ensureDefaultInquirySetting(ctx); err != nil {
			return InquirySettings{}, err
		}
		err = s.db.WithContext(ctx).Where("setting_key = ?", inquiryMaxRoundsKey).First(&row).Error
	}
	if err != nil {
		return InquirySettings{}, fmt.Errorf("load inquiry settings: %w", err)
	}

	return toInquirySettings(row)
}

func (s *GormStore) UpdateInquirySettings(ctx context.Context, maxRounds int, updatedByID uint64) (InquirySettings, error) {
	if s == nil || s.db == nil {
		return InquirySettings{}, errors.New("settings store database is not configured")
	}
	if !IsValidInteractionRounds(maxRounds) {
		return InquirySettings{}, fmt.Errorf("maxRounds must be between %d and %d", MinInteractionRounds, MaxInteractionRounds)
	}

	now := s.now().UTC()
	var updatedBy *uint64
	if updatedByID != 0 {
		updatedBy = &updatedByID
	}
	row := dbschema.SystemSetting{
		SettingKey:   inquiryMaxRoundsKey,
		SettingValue: strconv.Itoa(maxRounds),
		Description:  "管理员设置的总交互轮次上限",
		UpdatedByID:  updatedBy,
		UpdatedAt:    now,
		CreatedAt:    now,
	}

	if err := s.db.WithContext(ctx).Clauses(clause.OnConflict{
		Columns: []clause.Column{{Name: "setting_key"}},
		DoUpdates: clause.Assignments(map[string]any{
			"setting_value": row.SettingValue,
			"description":   row.Description,
			"updated_by_id": row.UpdatedByID,
			"updated_at":    now,
		}),
	}).Create(&row).Error; err != nil {
		return InquirySettings{}, fmt.Errorf("update inquiry settings: %w", err)
	}

	return s.GetInquirySettings(ctx)
}

func IsValidInteractionRounds(value int) bool {
	return value >= MinInteractionRounds && value <= MaxInteractionRounds
}

func (s *GormStore) ensureDefaultInquirySetting(ctx context.Context) error {
	now := s.now().UTC()
	row := dbschema.SystemSetting{
		SettingKey:   inquiryMaxRoundsKey,
		SettingValue: strconv.Itoa(DefaultInteractionRounds),
		Description:  "管理员设置的总交互轮次上限",
		CreatedAt:    now,
		UpdatedAt:    now,
	}
	return s.db.WithContext(ctx).Clauses(clause.OnConflict{
		Columns:   []clause.Column{{Name: "setting_key"}},
		DoNothing: true,
	}).Create(&row).Error
}

func toInquirySettings(row dbschema.SystemSetting) (InquirySettings, error) {
	maxRounds, err := strconv.Atoi(row.SettingValue)
	if err != nil || !IsValidInteractionRounds(maxRounds) {
		return InquirySettings{}, fmt.Errorf("invalid inquiry max rounds setting %q", row.SettingValue)
	}

	var updatedByID uint64
	if row.UpdatedByID != nil {
		updatedByID = *row.UpdatedByID
	}
	return InquirySettings{
		MaxRounds:   maxRounds,
		UpdatedAt:   row.UpdatedAt,
		UpdatedByID: updatedByID,
	}, nil
}

var _ Store = (*GormStore)(nil)
