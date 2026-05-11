package memory

import (
	"crypto/sha256"
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

const (
	defaultContextLimit = 12
	maxContextLimit     = 50
)

var (
	ErrInvalidRequest = errors.New("invalid memory request")
	ErrForbidden      = errors.New("forbidden memory operation")
	ErrNotFound       = errors.New("memory item not found")
)

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

func (s *GormStore) GetContext(request ContextRequest) (Context, error) {
	if s == nil || s.db == nil {
		return Context{}, errors.New("memory store database is not configured")
	}

	request.SessionID = strings.TrimSpace(request.SessionID)
	request.PassengerID = strings.TrimSpace(request.PassengerID)
	limit := normalizeLimit(request.Limit)

	result := Context{
		SessionID:   request.SessionID,
		PassengerID: request.PassengerID,
	}

	var err error
	if request.SessionID != "" {
		result.SessionMemories, err = s.findActive(ScopeSession, request.SessionID, limit)
		if err != nil {
			return Context{}, err
		}
	}
	if request.PassengerID != "" {
		result.PassengerMemories, err = s.findActive(ScopePassenger, request.PassengerID, limit)
		if err != nil {
			return Context{}, err
		}
	}

	result.RuleMemories, err = s.findActive(ScopeRule, "default", limit)
	if err != nil {
		return Context{}, err
	}
	if len(result.RuleMemories) == 0 {
		result.RuleMemories = defaultRuleMemories(s.now())
	}

	return result, nil
}

func (s *GormStore) Upsert(request UpsertRequest) ([]Item, error) {
	if s == nil || s.db == nil {
		return nil, errors.New("memory store database is not configured")
	}
	if len(request.Updates) == 0 {
		return []Item{}, nil
	}

	now := s.now().UTC()
	items := make([]Item, 0, len(request.Updates))
	for _, update := range request.Updates {
		normalized, err := normalizeUpdate(update, now)
		if err != nil {
			return nil, err
		}
		if normalized.ScopeType == ScopeRule && !request.IsAdmin {
			return nil, ErrForbidden
		}

		contentHash := hashMemory(normalized.ScopeType, normalized.ScopeID, normalized.MemoryType, normalized.Content)
		createdByID := request.UserID
		dbItem := dbschema.AgentMemoryItem{
			ScopeType:   normalized.ScopeType,
			ScopeID:     normalized.ScopeID,
			MemoryType:  normalized.MemoryType,
			Title:       normalized.Title,
			Content:     normalized.Content,
			Evidence:    normalized.Evidence,
			Confidence:  normalized.Confidence,
			Source:      normalized.Source,
			Status:      StatusActive,
			ContentHash: contentHash,
			ExpiresAt:   normalized.ExpiresAt,
			CreatedByID: &createdByID,
			UpdatedByID: &createdByID,
			CreatedAt:   now,
			UpdatedAt:   now,
		}

		err = s.db.Clauses(clause.OnConflict{
			Columns: []clause.Column{
				{Name: "scope_type"},
				{Name: "scope_id"},
				{Name: "memory_type"},
				{Name: "content_hash"},
			},
			DoUpdates: clause.Assignments(map[string]any{
				"title":         dbItem.Title,
				"content":       dbItem.Content,
				"evidence":      dbItem.Evidence,
				"confidence":    dbItem.Confidence,
				"source":        dbItem.Source,
				"status":        StatusActive,
				"expires_at":    dbItem.ExpiresAt,
				"updated_by_id": dbItem.UpdatedByID,
				"updated_at":    now,
			}),
		}).Create(&dbItem).Error
		if err != nil {
			return nil, fmt.Errorf("upsert memory: %w", err)
		}

		var saved dbschema.AgentMemoryItem
		if err := s.db.Where(
			"scope_type = ? AND scope_id = ? AND memory_type = ? AND content_hash = ?",
			dbItem.ScopeType,
			dbItem.ScopeID,
			dbItem.MemoryType,
			dbItem.ContentHash,
		).First(&saved).Error; err != nil {
			return nil, fmt.Errorf("load upserted memory: %w", err)
		}
		items = append(items, toItem(saved))
	}

	return items, nil
}

func (s *GormStore) UpdateStatus(request StatusUpdateRequest) (Item, error) {
	if s == nil || s.db == nil {
		return Item{}, errors.New("memory store database is not configured")
	}
	status := strings.TrimSpace(request.Status)
	if status != StatusActive && status != StatusInactive {
		return Item{}, fmt.Errorf("%w: status must be active or inactive", ErrInvalidRequest)
	}
	if request.ID == 0 {
		return Item{}, fmt.Errorf("%w: id is required", ErrInvalidRequest)
	}

	updates := map[string]any{
		"status":        status,
		"updated_at":    s.now().UTC(),
		"updated_by_id": request.UserID,
	}
	result := s.db.Model(&dbschema.AgentMemoryItem{}).Where("id = ?", request.ID).Updates(updates)
	if result.Error != nil {
		return Item{}, fmt.Errorf("update memory status: %w", result.Error)
	}
	if result.RowsAffected == 0 {
		return Item{}, ErrNotFound
	}

	var dbItem dbschema.AgentMemoryItem
	if err := s.db.First(&dbItem, request.ID).Error; err != nil {
		return Item{}, fmt.Errorf("load memory: %w", err)
	}
	return toItem(dbItem), nil
}

func (s *GormStore) findActive(scopeType string, scopeID string, limit int) ([]Item, error) {
	now := s.now().UTC()
	var rows []dbschema.AgentMemoryItem
	err := s.db.
		Where("scope_type = ? AND scope_id = ? AND status = ?", scopeType, scopeID, StatusActive).
		Where("(expires_at IS NULL OR expires_at > ?)", now).
		Order("updated_at DESC").
		Limit(limit).
		Find(&rows).Error
	if err != nil {
		return nil, fmt.Errorf("query memory: %w", err)
	}

	items := make([]Item, 0, len(rows))
	for _, row := range rows {
		items = append(items, toItem(row))
	}
	return items, nil
}

func normalizeLimit(limit int) int {
	if limit <= 0 {
		return defaultContextLimit
	}
	if limit > maxContextLimit {
		return maxContextLimit
	}
	return limit
}

func normalizeUpdate(update Update, now time.Time) (Update, error) {
	update.ScopeType = strings.ToLower(strings.TrimSpace(update.ScopeType))
	update.ScopeID = strings.TrimSpace(update.ScopeID)
	update.MemoryType = strings.ToLower(strings.TrimSpace(update.MemoryType))
	update.Title = strings.TrimSpace(update.Title)
	update.Content = strings.TrimSpace(update.Content)
	update.Source = strings.TrimSpace(update.Source)

	if !validScope(update.ScopeType) {
		return Update{}, fmt.Errorf("%w: unsupported scopeType", ErrInvalidRequest)
	}
	if update.ScopeID == "" {
		return Update{}, fmt.Errorf("%w: scopeId is required", ErrInvalidRequest)
	}
	if !validMemoryType(update.MemoryType) {
		return Update{}, fmt.Errorf("%w: unsupported memoryType", ErrInvalidRequest)
	}
	if update.Content == "" {
		return Update{}, fmt.Errorf("%w: content is required", ErrInvalidRequest)
	}
	if update.Title == "" {
		update.Title = defaultTitle(update.MemoryType)
	}
	if update.Source == "" {
		update.Source = "ai-service"
	}
	if update.Confidence != nil {
		confidence := *update.Confidence
		if confidence < 0 {
			confidence = 0
		}
		if confidence > 1 {
			confidence = 1
		}
		update.Confidence = &confidence
	}
	if update.ExpiresAt == nil {
		update.ExpiresAt = defaultExpiresAt(update.ScopeType, now)
	}
	if len(update.Evidence) == 0 {
		update.Evidence = json.RawMessage(`{}`)
	}

	return update, nil
}

func validScope(value string) bool {
	return value == ScopeSession || value == ScopePassenger || value == ScopeRule
}

func validMemoryType(value string) bool {
	switch value {
	case TypeFact, TypeGap, TypeInconsistency, TypeEvidence, TypeProcedure:
		return true
	default:
		return false
	}
}

func defaultTitle(memoryType string) string {
	switch memoryType {
	case TypeFact:
		return "已确认事实"
	case TypeGap:
		return "待核验缺口"
	case TypeInconsistency:
		return "前后不一致"
	case TypeEvidence:
		return "证据线索"
	case TypeProcedure:
		return "问询规则"
	default:
		return "智能体记忆"
	}
}

func defaultExpiresAt(scopeType string, now time.Time) *time.Time {
	switch scopeType {
	case ScopeSession:
		value := now.Add(30 * 24 * time.Hour)
		return &value
	case ScopePassenger:
		value := now.Add(180 * 24 * time.Hour)
		return &value
	default:
		return nil
	}
}

func hashMemory(scopeType string, scopeID string, memoryType string, content string) string {
	hash := sha256.Sum256([]byte(scopeType + "\x00" + scopeID + "\x00" + memoryType + "\x00" + content))
	return hex.EncodeToString(hash[:])
}

func toItem(row dbschema.AgentMemoryItem) Item {
	return Item{
		ID:         row.ID,
		ScopeType:  row.ScopeType,
		ScopeID:    row.ScopeID,
		MemoryType: row.MemoryType,
		Title:      row.Title,
		Content:    row.Content,
		Evidence:   row.Evidence,
		Confidence: row.Confidence,
		Source:     row.Source,
		Status:     row.Status,
		CreatedAt:  row.CreatedAt,
		UpdatedAt:  row.UpdatedAt,
		ExpiresAt:  row.ExpiresAt,
	}
}

func defaultRuleMemories(now time.Time) []Item {
	return []Item{
		{
			ID:         0,
			ScopeType:  ScopeRule,
			ScopeID:    "default",
			MemoryType: TypeProcedure,
			Title:      "多模态线索使用边界",
			Content:    "动作、情绪和多模态观察只能作为追问方向参考，不能单独构成风险结论。",
			Source:     SourceSystemRule,
			CreatedAt:  now,
			UpdatedAt:  now,
		},
		{
			ID:         0,
			ScopeType:  ScopeRule,
			ScopeID:    "default",
			MemoryType: TypeProcedure,
			Title:      "问询话术要求",
			Content:    "追问必须保持中性、专业、非指控，优先围绕可核验事实展开。",
			Source:     SourceSystemRule,
			CreatedAt:  now,
			UpdatedAt:  now,
		},
	}
}

type FakeStore struct {
	ContextResult Context
	Upserted      []Update
	StatusUpdates []StatusUpdateRequest
	Err           error
	StatusErr     error
}

func (s *FakeStore) GetContext(request ContextRequest) (Context, error) {
	if s.Err != nil {
		return Context{}, s.Err
	}
	result := s.ContextResult
	result.SessionID = request.SessionID
	result.PassengerID = request.PassengerID
	return result, nil
}

func (s *FakeStore) Upsert(request UpsertRequest) ([]Item, error) {
	if s.Err != nil {
		return nil, s.Err
	}
	s.Upserted = append(s.Upserted, request.Updates...)
	items := make([]Item, 0, len(request.Updates))
	now := time.Now().UTC()
	for index, update := range request.Updates {
		items = append(items, Item{
			ID:         uint64(index + 1),
			ScopeType:  update.ScopeType,
			ScopeID:    update.ScopeID,
			MemoryType: update.MemoryType,
			Title:      update.Title,
			Content:    update.Content,
			Evidence:   update.Evidence,
			Confidence: update.Confidence,
			Source:     update.Source,
			Status:     StatusActive,
			CreatedAt:  now,
			UpdatedAt:  now,
			ExpiresAt:  update.ExpiresAt,
		})
	}
	return items, nil
}

func (s *FakeStore) UpdateStatus(request StatusUpdateRequest) (Item, error) {
	if s.StatusErr != nil {
		return Item{}, s.StatusErr
	}
	s.StatusUpdates = append(s.StatusUpdates, request)
	now := time.Now().UTC()
	return Item{
		ID:         request.ID,
		ScopeType:  ScopeSession,
		ScopeID:    "test-session",
		MemoryType: TypeFact,
		Title:      "测试记忆",
		Content:    "测试记忆内容",
		Source:     "test",
		Status:     request.Status,
		CreatedAt:  now,
		UpdatedAt:  now,
	}, nil
}

var _ Store = (*GormStore)(nil)
var _ Store = (*FakeStore)(nil)
