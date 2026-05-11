package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"ipra/backend/internal/auth"
	"ipra/backend/internal/config"
	dbschema "ipra/backend/internal/database"
	"ipra/backend/internal/profile"
)

func TestPingRoute(t *testing.T) {
	router := newRouter(nil, nil, nil, nil)
	req := httptest.NewRequest(http.MethodGet, "/api/ping", nil)
	recorder := httptest.NewRecorder()

	router.ServeHTTP(recorder, req)

	if recorder.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", recorder.Code, http.StatusOK)
	}
}

func TestImportTemplateRouteRequiresAuth(t *testing.T) {
	tokenManager := auth.NewTokenManager("test-secret", time.Hour)
	authHandler := auth.NewHandler(nil, tokenManager)
	router := newRouter(authHandler, profile.NewHandler(nil, config.OCRConfig{}), nil, nil)
	req := httptest.NewRequest(
		http.MethodGet,
		"/api/import-templates/passenger-profile.xlsx",
		nil,
	)
	recorder := httptest.NewRecorder()

	router.ServeHTTP(recorder, req)

	if recorder.Code != http.StatusUnauthorized {
		t.Fatalf("status = %d, want %d", recorder.Code, http.StatusUnauthorized)
	}
}

func TestImportTemplateRouteAuthorized(t *testing.T) {
	user := dbschema.SystemUser{
		WorkID:       "user",
		Name:         "员工",
		PasswordHash: "placeholder",
		Role:         "user",
		Status:       "active",
	}
	tokenManager := auth.NewTokenManager("test-secret", time.Hour)
	token, err := tokenManager.Sign(user)
	if err != nil {
		t.Fatalf("sign token: %v", err)
	}

	authHandler := auth.NewHandler(nil, tokenManager)
	router := newRouter(authHandler, profile.NewHandler(nil, config.OCRConfig{}), nil, nil)
	req := httptest.NewRequest(
		http.MethodGet,
		"/api/import-templates/passenger-profile.xlsx",
		nil,
	)
	req.Header.Set("Authorization", "Bearer "+token)
	recorder := httptest.NewRecorder()

	router.ServeHTTP(recorder, req)

	if recorder.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", recorder.Code, http.StatusOK)
	}
	if contentType := recorder.Header().Get("Content-Type"); contentType != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" {
		t.Fatalf(
			"Content-Type = %q, want %q",
			contentType,
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		)
	}
	if disposition := recorder.Header().Get("Content-Disposition"); disposition == "" {
		t.Fatal("Content-Disposition header is empty")
	}
	if body := recorder.Body.Bytes(); len(body) < 4 || string(body[:2]) != "PK" {
		t.Fatal("template body is not an xlsx zip payload")
	}
}

func TestHighRiskTemplateRouteAuthorized(t *testing.T) {
	user := dbschema.SystemUser{
		WorkID:       "user",
		Name:         "员工",
		PasswordHash: "placeholder",
		Role:         "user",
		Status:       "active",
	}
	tokenManager := auth.NewTokenManager("test-secret", time.Hour)
	token, err := tokenManager.Sign(user)
	if err != nil {
		t.Fatalf("sign token: %v", err)
	}

	authHandler := auth.NewHandler(nil, tokenManager)
	router := newRouter(authHandler, profile.NewHandler(nil, config.OCRConfig{}), nil, nil)
	req := httptest.NewRequest(
		http.MethodGet,
		"/api/import-templates/high-risk-watchlist.xlsx",
		nil,
	)
	req.Header.Set("Authorization", "Bearer "+token)
	recorder := httptest.NewRecorder()

	router.ServeHTTP(recorder, req)

	if recorder.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", recorder.Code, http.StatusOK)
	}
	if disposition := recorder.Header().Get("Content-Disposition"); disposition == "" {
		t.Fatal("Content-Disposition header is empty")
	}
	if body := recorder.Body.Bytes(); len(body) < 4 || string(body[:2]) != "PK" {
		t.Fatal("template body is not an xlsx zip payload")
	}
}
