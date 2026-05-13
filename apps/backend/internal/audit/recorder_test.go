package audit

import "testing"

func TestClassifyRequestSpecificRoutes(t *testing.T) {
	tests := []struct {
		name       string
		method     string
		routePath  string
		wantAction string
		wantRes    string
	}{
		{
			name:       "protected profile search",
			method:     "GET",
			routePath:  "/api/passenger-profiles/protected",
			wantAction: "search_passenger_profiles_protected",
			wantRes:    "旅客画像",
		},
		{
			name:       "protected inquiry strategy",
			method:     "POST",
			routePath:  "/api/inquiry/protected/strategy",
			wantAction: "create_protected_inquiry_strategy",
			wantRes:    "辅助问询",
		},
		{
			name:       "protected inquiry window summary",
			method:     "POST",
			routePath:  "/api/inquiry/protected/sessions/:sessionId/rounds/:roundId/window-summary",
			wantAction: "upload_protected_round_summary",
			wantRes:    "辅助问询",
		},
		{
			name:       "protected inquiry memory",
			method:     "GET",
			routePath:  "/api/inquiry/protected/sessions/:sessionId/memory",
			wantAction: "view_protected_inquiry_memory",
			wantRes:    "智能体记忆",
		},
		{
			name:       "admin protected users",
			method:     "GET",
			routePath:  "/api/admin/users/protected",
			wantAction: "list_admin_users_protected",
			wantRes:    "用户管理",
		},
		{
			name:       "audit detail",
			method:     "GET",
			routePath:  "/api/audit-logs/:id/protected",
			wantAction: "view_audit_log_detail",
			wantRes:    "日志审计",
		},
		{
			name:       "admin memory status update",
			method:     "PATCH",
			routePath:  "/api/admin/memories/:id/status",
			wantAction: "update_admin_memory_status",
			wantRes:    "智能体记忆",
		},
		{
			name:       "watchlist template",
			method:     "GET",
			routePath:  "/api/import-templates/high-risk-watchlist.xlsx",
			wantAction: "download_watchlist_template",
			wantRes:    "导入模板",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			gotAction, gotRes := classifyRequest(tt.method, tt.routePath)
			if gotAction != tt.wantAction || gotRes != tt.wantRes {
				t.Fatalf("classifyRequest(%q, %q) = (%q, %q), want (%q, %q)",
					tt.method, tt.routePath, gotAction, gotRes, tt.wantAction, tt.wantRes)
			}
		})
	}
}

func TestClassifyRequestFallbackToGeneric(t *testing.T) {
	action, resource := classifyRequest("GET", "/api/unknown/route")
	if action != "get_api_unknown_route" || resource != "通用接口" {
		t.Fatalf("unexpected fallback classify result: (%q, %q)", action, resource)
	}
}
