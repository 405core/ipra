package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestPingRoute(t *testing.T) {
	router := newRouter(nil, nil, nil)
	req := httptest.NewRequest(http.MethodGet, "/api/ping", nil)
	recorder := httptest.NewRecorder()

	router.ServeHTTP(recorder, req)

	if recorder.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", recorder.Code, http.StatusOK)
	}
}

func TestImportTemplateRoute(t *testing.T) {
	router := newRouter(nil, nil, nil)
	req := httptest.NewRequest(
		http.MethodGet,
		"/api/import-templates/passenger-profile.xlsx",
		nil,
	)
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
