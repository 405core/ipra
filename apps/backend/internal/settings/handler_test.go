package settings

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"ipra/backend/internal/audit"
	"ipra/backend/internal/auth"
	dbschema "ipra/backend/internal/database"
)

type fakeStore struct {
	value InquirySettings
	err   error
}

func (s *fakeStore) EnsureSchema(_ context.Context) error {
	return nil
}

func (s *fakeStore) GetInquirySettings(_ context.Context) (InquirySettings, error) {
	if s.err != nil {
		return InquirySettings{}, s.err
	}
	return s.value, nil
}

func (s *fakeStore) UpdateInquirySettings(_ context.Context, maxRounds int, updatedByID uint64) (InquirySettings, error) {
	if s.err != nil {
		return InquirySettings{}, s.err
	}
	s.value.MaxRounds = maxRounds
	s.value.UpdatedByID = updatedByID
	s.value.UpdatedAt = time.Date(2026, 5, 11, 8, 0, 0, 0, time.UTC)
	return s.value, nil
}

func TestGetInquirySettingsAllowsAuthenticatedUsers(t *testing.T) {
	store := &fakeStore{value: InquirySettings{
		MaxRounds: 3,
		UpdatedAt: time.Date(2026, 5, 11, 7, 0, 0, 0, time.UTC),
	}}
	router, userToken, _ := newSettingsTestRouter(store)

	req := httptest.NewRequest(http.MethodGet, "/api/inquiry/settings", nil)
	req.Header.Set("Authorization", "Bearer "+userToken)
	rec := httptest.NewRecorder()
	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d: %s", rec.Code, http.StatusOK, rec.Body.String())
	}
	var got InquirySettingsResponse
	decodeSettingsBody(t, rec, &got)
	if got.MaxRounds != 3 || got.MinRounds != MinInteractionRounds || got.MaxAllowedRounds != MaxInteractionRounds {
		t.Fatalf("unexpected settings response: %#v", got)
	}
}

func TestAdminCanUpdateInquirySettings(t *testing.T) {
	store := &fakeStore{value: InquirySettings{MaxRounds: 3}}
	router, _, adminToken := newSettingsTestRouter(store)

	rec := putSettingsJSON(t, router, "/api/admin/settings/inquiry", adminToken, map[string]any{
		"maxRounds": 5,
	})

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d: %s", rec.Code, http.StatusOK, rec.Body.String())
	}
	var got InquirySettingsResponse
	decodeSettingsBody(t, rec, &got)
	if got.MaxRounds != 5 {
		t.Fatalf("maxRounds = %d, want 5", got.MaxRounds)
	}
	if store.value.UpdatedByID != 1 {
		t.Fatalf("updatedByID = %d, want 1", store.value.UpdatedByID)
	}
}

func TestNonAdminCannotUpdateInquirySettings(t *testing.T) {
	store := &fakeStore{value: InquirySettings{MaxRounds: 3}}
	router, userToken, _ := newSettingsTestRouter(store)

	rec := putSettingsJSON(t, router, "/api/admin/settings/inquiry", userToken, map[string]any{
		"maxRounds": 5,
	})

	if rec.Code != http.StatusForbidden {
		t.Fatalf("status = %d, want %d: %s", rec.Code, http.StatusForbidden, rec.Body.String())
	}
}

func TestUpdateInquirySettingsRejectsInvalidRounds(t *testing.T) {
	cases := []struct {
		name  string
		value any
	}{
		{name: "zero", value: 0},
		{name: "too high", value: 11},
		{name: "non numeric", value: "abc"},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			store := &fakeStore{value: InquirySettings{MaxRounds: 3}}
			router, _, adminToken := newSettingsTestRouter(store)

			rec := putSettingsJSON(t, router, "/api/admin/settings/inquiry", adminToken, map[string]any{
				"maxRounds": tc.value,
			})

			if rec.Code != http.StatusBadRequest {
				t.Fatalf("status = %d, want %d: %s", rec.Code, http.StatusBadRequest, rec.Body.String())
			}
		})
	}
}

func newSettingsTestRouter(store Store) (*gin.Engine, string, string) {
	gin.SetMode(gin.TestMode)
	router := gin.New()
	tokenManager := auth.NewTokenManager("settings-test-secret", time.Hour)
	authHandler := auth.NewHandler(nil, tokenManager, audit.NewRecorder(nil))
	NewHandler(store).Register(router, authHandler.AuthMiddleware())

	userToken, _ := tokenManager.Sign(dbschema.SystemUser{
		ID:     2,
		WorkID: "user",
		Name:   "User",
		Role:   auth.RoleUser,
		Status: auth.StatusActive,
	})
	adminToken, _ := tokenManager.Sign(dbschema.SystemUser{
		ID:     1,
		WorkID: "admin",
		Name:   "Admin",
		Role:   auth.RoleAdmin,
		Status: auth.StatusActive,
	})

	return router, userToken, adminToken
}

func putSettingsJSON(t *testing.T, handler http.Handler, path string, token string, payload any) *httptest.ResponseRecorder {
	t.Helper()

	body, err := json.Marshal(payload)
	if err != nil {
		t.Fatal(err)
	}
	req := httptest.NewRequest(http.MethodPut, path, bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+token)
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, req)
	return rec
}

func decodeSettingsBody(t *testing.T, rec *httptest.ResponseRecorder, target any) {
	t.Helper()

	if err := json.NewDecoder(rec.Body).Decode(target); err != nil {
		t.Fatalf("decode body: %v", err)
	}
}
