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

func TestImportTemplateRoutes(t *testing.T) {
	for _, path := range []string{
		"/api/import-templates/passenger-profile.xlsx",
		"/api/import-templates/high-risk-watchlist.xlsx",
	} {
		router := newRouter(nil, nil, nil)
		req := httptest.NewRequest(http.MethodGet, path, nil)
		recorder := httptest.NewRecorder()

		router.ServeHTTP(recorder, req)

		if recorder.Code != http.StatusOK {
			t.Fatalf("%s status = %d, want %d", path, recorder.Code, http.StatusOK)
		}
		if contentType := recorder.Header().Get("Content-Type"); contentType != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" {
			t.Fatalf(
				"%s Content-Type = %q, want %q",
				path,
				contentType,
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			)
		}
		if disposition := recorder.Header().Get("Content-Disposition"); disposition == "" {
			t.Fatalf("%s Content-Disposition header is empty", path)
		}
		if body := recorder.Body.Bytes(); len(body) < 4 || string(body[:2]) != "PK" {
			t.Fatalf("%s template body is not an xlsx zip payload", path)
		}
	}
}
