package memory

import (
	"encoding/json"
	"time"
)

const (
	ScopeSession   = "session"
	ScopePassenger = "passenger"
	ScopeRule      = "rule"

	TypeFact          = "fact"
	TypeGap           = "gap"
	TypeInconsistency = "inconsistency"
	TypeEvidence      = "evidence"
	TypeProcedure     = "procedure"

	StatusActive   = "active"
	StatusInactive = "inactive"

	SourceSystemRule = "system-rule"
)

type Item struct {
	ID         uint64          `json:"id"`
	ScopeType  string          `json:"scopeType"`
	ScopeID    string          `json:"scopeId"`
	MemoryType string          `json:"memoryType"`
	Title      string          `json:"title"`
	Content    string          `json:"content"`
	Evidence   json.RawMessage `json:"evidence,omitempty"`
	Confidence *float64        `json:"confidence,omitempty"`
	Source     string          `json:"source"`
	Status     string          `json:"status,omitempty"`
	CreatedAt  time.Time       `json:"createdAt"`
	UpdatedAt  time.Time       `json:"updatedAt"`
	ExpiresAt  *time.Time      `json:"expiresAt,omitempty"`
}

type Update struct {
	ScopeType  string          `json:"scopeType"`
	ScopeID    string          `json:"scopeId"`
	MemoryType string          `json:"memoryType"`
	Title      string          `json:"title"`
	Content    string          `json:"content"`
	Evidence   json.RawMessage `json:"evidence,omitempty"`
	Confidence *float64        `json:"confidence,omitempty"`
	Source     string          `json:"source"`
	ExpiresAt  *time.Time      `json:"expiresAt,omitempty"`
}

type Context struct {
	SessionID         string `json:"sessionId"`
	PassengerID       string `json:"passengerId"`
	SessionMemories   []Item `json:"sessionMemories"`
	PassengerMemories []Item `json:"passengerMemories"`
	RuleMemories      []Item `json:"ruleMemories"`
}

type Store interface {
	GetContext(ctx ContextRequest) (Context, error)
	Upsert(ctx UpsertRequest) ([]Item, error)
	UpdateStatus(ctx StatusUpdateRequest) (Item, error)
}

type ContextRequest struct {
	SessionID   string
	PassengerID string
	Limit       int
}

type UpsertRequest struct {
	Updates []Update
	UserID  uint64
	IsAdmin bool
}

type StatusUpdateRequest struct {
	ID     uint64
	Status string
	UserID uint64
}
