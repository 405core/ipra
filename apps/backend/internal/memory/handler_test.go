package memory

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"ipra/backend/internal/auth"
	dbschema "ipra/backend/internal/database"
)

func TestMemoryContextRequiresAuth(t *testing.T) {
	router, _ := newMemoryTestRouter(auth.RoleUser)
	req := httptest.NewRequest(http.MethodGet, "/api/inquiry/memory-context?sessionId=s1", nil)
	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusUnauthorized {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusUnauthorized)
	}
}

func TestMemoryContextReturnsStoreResult(t *testing.T) {
	router, token := newMemoryTestRouter(auth.RoleUser)
	req := httptest.NewRequest(http.MethodGet, "/api/inquiry/memory-context?sessionId=s1&passengerId=p1", nil)
	req.Header.Set("Authorization", "Bearer "+token)
	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d: %s", rec.Code, http.StatusOK, rec.Body.String())
	}

	var got Context
	decodeMemoryBody(t, rec, &got)
	if got.SessionID != "s1" || got.PassengerID != "p1" {
		t.Fatalf("unexpected context ids: %#v", got)
	}
	if len(got.RuleMemories) != 1 {
		t.Fatalf("expected rule memory from fake store, got %#v", got.RuleMemories)
	}
}

func TestMemoryUpdatesRejectRuleForRegularUser(t *testing.T) {
	store := &validatingFakeStore{}
	router, token := newMemoryRouterWithStore(auth.RoleUser, store)

	rec := postMemoryJSON(t, router, "/api/inquiry/memory-updates", token, upsertRequest{
		MemoryUpdates: []Update{
			{
				ScopeType:  ScopeRule,
				ScopeID:    "default",
				MemoryType: TypeProcedure,
				Content:    "规则记忆不能由普通接口写入",
			},
		},
	})

	if rec.Code != http.StatusForbidden {
		t.Fatalf("status = %d, want %d: %s", rec.Code, http.StatusForbidden, rec.Body.String())
	}
}

func TestMemoryUpdatesPersistSessionMemory(t *testing.T) {
	store := &validatingFakeStore{}
	router, token := newMemoryRouterWithStore(auth.RoleUser, store)
	confidence := 0.88

	rec := postMemoryJSON(t, router, "/api/inquiry/memory-updates", token, upsertRequest{
		MemoryUpdates: []Update{
			{
				ScopeType:  ScopeSession,
				ScopeID:    "s1",
				MemoryType: TypeGap,
				Title:      "住宿待核验",
				Content:    "旅客尚未提供明确住宿地址",
				Confidence: &confidence,
				Source:     "ai-service",
			},
		},
	})

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d: %s", rec.Code, http.StatusOK, rec.Body.String())
	}
	if len(store.Upserted) != 1 {
		t.Fatalf("expected one upsert, got %#v", store.Upserted)
	}
	if store.Upserted[0].ScopeType != ScopeSession {
		t.Fatalf("unexpected upsert: %#v", store.Upserted[0])
	}
}

func TestAdminCanUpdateMemoryStatus(t *testing.T) {
	store := &FakeStore{}
	router, token := newMemoryRouterWithStore(auth.RoleAdmin, store)

	rec := postMemoryJSON(t, router, "/api/admin/memories/7/status", token, statusPayload{
		Status: StatusInactive,
	})

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d: %s", rec.Code, http.StatusOK, rec.Body.String())
	}
	if len(store.StatusUpdates) != 1 || store.StatusUpdates[0].ID != 7 {
		t.Fatalf("unexpected status updates: %#v", store.StatusUpdates)
	}
}

func TestRegularUserCannotUpdateMemoryStatus(t *testing.T) {
	store := &FakeStore{}
	router, token := newMemoryRouterWithStore(auth.RoleUser, store)

	rec := postMemoryJSON(t, router, "/api/admin/memories/7/status", token, statusPayload{
		Status: StatusInactive,
	})

	if rec.Code != http.StatusForbidden {
		t.Fatalf("status = %d, want %d: %s", rec.Code, http.StatusForbidden, rec.Body.String())
	}
}

func newMemoryTestRouter(role string) (*gin.Engine, string) {
	store := &FakeStore{
		ContextResult: Context{
			RuleMemories: []Item{
				{
					ID:         1,
					ScopeType:  ScopeRule,
					ScopeID:    "default",
					MemoryType: TypeProcedure,
					Title:      "规则",
					Content:    "动作和情绪线索只能作为追问参考",
					Source:     SourceSystemRule,
					CreatedAt:  time.Now().UTC(),
					UpdatedAt:  time.Now().UTC(),
				},
			},
		},
	}
	return newMemoryRouterWithStore(role, store)
}

func newMemoryRouterWithStore(role string, store Store) (*gin.Engine, string) {
	gin.SetMode(gin.TestMode)
	router := gin.New()
	tokenManager := auth.NewTokenManager("test-secret", time.Hour)
	handler := NewHandler(store)
	authHandler := auth.NewHandler(nil, tokenManager)
	handler.Register(router, authHandler.AuthMiddleware())
	handler.RegisterAdminRoutes(router, authHandler.AuthMiddleware())

	token, err := tokenManager.Sign(dbschema.SystemUser{
		ID:           11,
		WorkID:       "tester",
		Name:         "测试员",
		PasswordHash: "placeholder",
		Role:         role,
		Status:       auth.StatusActive,
	})
	if err != nil {
		panic(err)
	}
	return router, token
}

func postMemoryJSON(t *testing.T, handler http.Handler, path string, token string, payload any) *httptest.ResponseRecorder {
	t.Helper()
	body, err := json.Marshal(payload)
	if err != nil {
		t.Fatal(err)
	}
	method := http.MethodPost
	if path == "/api/admin/memories/7/status" {
		method = http.MethodPatch
	}
	req := httptest.NewRequest(method, path, bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, req)
	return rec
}

func decodeMemoryBody(t *testing.T, rec *httptest.ResponseRecorder, target any) {
	t.Helper()
	if err := json.NewDecoder(rec.Body).Decode(target); err != nil {
		t.Fatalf("decode response: %v", err)
	}
}

type validatingFakeStore struct {
	FakeStore
}

func (s *validatingFakeStore) Upsert(request UpsertRequest) ([]Item, error) {
	for _, update := range request.Updates {
		if update.ScopeType == ScopeRule && !request.IsAdmin {
			return nil, ErrForbidden
		}
	}
	return s.FakeStore.Upsert(request)
}
