package profile

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"ipra/backend/internal/config"
)

func TestAdminProfileMaintenanceEndpointsAreImportOnly(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := gin.New()
	NewHandler(nil, config.OCRConfig{}).Register(router, nil)

	cases := []struct {
		name       string
		method     string
		path       string
		payload    any
		wantStatus int
		wantBody   string
	}{
		{
			name:       "get profile detail",
			method:     http.MethodGet,
			path:       "/api/admin/profiles/1",
			wantStatus: http.StatusForbidden,
			wantBody:   "基础画像仅支持通过导入文件维护",
		},
		{
			name:       "create profile",
			method:     http.MethodPost,
			path:       "/api/admin/profiles",
			payload:    map[string]any{"documentNum": "A1", "fullName": "张三"},
			wantStatus: http.StatusForbidden,
			wantBody:   "基础画像仅支持通过导入文件维护",
		},
		{
			name:       "update profile",
			method:     http.MethodPut,
			path:       "/api/admin/profiles/1",
			payload:    map[string]any{"fullName": "李四"},
			wantStatus: http.StatusForbidden,
			wantBody:   "基础画像仅支持通过导入文件维护",
		},
		{
			name:       "delete profile",
			method:     http.MethodDelete,
			path:       "/api/admin/profiles/1",
			wantStatus: http.StatusForbidden,
			wantBody:   "基础画像仅支持通过导入文件维护",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			rec := performJSONRequest(t, router, tc.method, tc.path, tc.payload)
			assertRejectMessage(t, rec, tc.wantStatus, tc.wantBody)
		})
	}
}

func TestAdminWatchlistMaintenanceEndpointsAreImportOnly(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := gin.New()
	NewHandler(nil, config.OCRConfig{}).Register(router, nil)

	cases := []struct {
		name       string
		method     string
		path       string
		payload    any
		wantStatus int
		wantBody   string
	}{
		{
			name:       "get watchlist detail",
			method:     http.MethodGet,
			path:       "/api/admin/watchlist/1",
			wantStatus: http.StatusForbidden,
			wantBody:   "高风险名单仅支持通过导入文件维护",
		},
		{
			name:       "create watchlist item",
			method:     http.MethodPost,
			path:       "/api/admin/watchlist",
			payload:    map[string]any{"documentNum": "A1", "riskReason": "命中名单"},
			wantStatus: http.StatusForbidden,
			wantBody:   "高风险名单仅支持通过导入文件维护",
		},
		{
			name:       "update watchlist item",
			method:     http.MethodPut,
			path:       "/api/admin/watchlist/1",
			payload:    map[string]any{"riskReason": "变更"},
			wantStatus: http.StatusForbidden,
			wantBody:   "高风险名单仅支持通过导入文件维护",
		},
		{
			name:       "delete watchlist item",
			method:     http.MethodDelete,
			path:       "/api/admin/watchlist/1",
			wantStatus: http.StatusForbidden,
			wantBody:   "高风险名单仅支持通过导入文件维护",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			rec := performJSONRequest(t, router, tc.method, tc.path, tc.payload)
			assertRejectMessage(t, rec, tc.wantStatus, tc.wantBody)
		})
	}
}

func performJSONRequest(
	t *testing.T,
	handler http.Handler,
	method string,
	path string,
	payload any,
) *httptest.ResponseRecorder {
	t.Helper()

	var body *bytes.Reader
	if payload == nil {
		body = bytes.NewReader(nil)
	} else {
		data, err := json.Marshal(payload)
		if err != nil {
			t.Fatalf("marshal payload: %v", err)
		}
		body = bytes.NewReader(data)
	}

	req := httptest.NewRequest(method, path, body)
	if payload != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, req)
	return rec
}

func assertRejectMessage(
	t *testing.T,
	rec *httptest.ResponseRecorder,
	wantStatus int,
	wantMessage string,
) {
	t.Helper()

	if rec.Code != wantStatus {
		t.Fatalf("status = %d, want %d: %s", rec.Code, wantStatus, rec.Body.String())
	}

	var payload struct {
		Message string `json:"message"`
	}
	if err := json.NewDecoder(rec.Body).Decode(&payload); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if payload.Message != wantMessage {
		t.Fatalf("message = %q, want %q", payload.Message, wantMessage)
	}
}
