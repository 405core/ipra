package audit

import (
	"context"
	"encoding/json"
	"log"
	"net/url"
	"sort"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	dbschema "ipra/backend/internal/database"
)

type Identity struct {
	UserID uint64
	WorkID string
	Name   string
	Role   string
}

type IdentityResolver func(*gin.Context) (Identity, bool)

type Recorder struct {
	db *gorm.DB
}

func NewRecorder(db *gorm.DB) *Recorder {
	return &Recorder{db: db}
}

func (r *Recorder) EnsureSchema(ctx context.Context) error {
	if r == nil || r.db == nil {
		return nil
	}

	statements := []string{
		`CREATE TABLE IF NOT EXISTS audit_log (
			id BIGSERIAL PRIMARY KEY,
			actor_user_id BIGINT,
			actor_work_id VARCHAR(64) NOT NULL DEFAULT '',
			actor_name VARCHAR(64) NOT NULL DEFAULT '',
			actor_role VARCHAR(32) NOT NULL DEFAULT '',
			action VARCHAR(128) NOT NULL,
			resource VARCHAR(128) NOT NULL DEFAULT '',
			result VARCHAR(32) NOT NULL,
			status_code INT NOT NULL DEFAULT 0,
			method VARCHAR(16) NOT NULL DEFAULT '',
			path VARCHAR(255) NOT NULL DEFAULT '',
			client_ip VARCHAR(64) NOT NULL DEFAULT '',
			user_agent VARCHAR(255) NOT NULL DEFAULT '',
			detail JSONB,
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE INDEX IF NOT EXISTS idx_audit_log_actor_user_id ON audit_log(actor_user_id)`,
		`CREATE INDEX IF NOT EXISTS idx_audit_log_actor_work_id ON audit_log(actor_work_id)`,
		`CREATE INDEX IF NOT EXISTS idx_audit_log_action ON audit_log(action)`,
		`CREATE INDEX IF NOT EXISTS idx_audit_log_resource ON audit_log(resource)`,
		`CREATE INDEX IF NOT EXISTS idx_audit_log_result ON audit_log(result)`,
		`CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at DESC)`,
	}

	for _, statement := range statements {
		if err := r.db.WithContext(ctx).Exec(statement).Error; err != nil {
			return err
		}
	}

	return nil
}

func (r *Recorder) Log(ctx context.Context, entry dbschema.AuditLog) error {
	if r == nil || r.db == nil {
		return nil
	}
	if entry.CreatedAt.IsZero() {
		entry.CreatedAt = time.Now().UTC()
	}
	return r.db.WithContext(ctx).Create(&entry).Error
}

func (r *Recorder) LogBestEffort(ctx context.Context, entry dbschema.AuditLog) {
	if err := r.Log(ctx, entry); err != nil {
		log.Printf("audit log failed: %v", err)
	}
}

func (r *Recorder) RequestMiddleware(resolveIdentity IdentityResolver) gin.HandlerFunc {
	return func(c *gin.Context) {
		startedAt := time.Now()
		c.Next()

		routePath := c.FullPath()
		if routePath == "" {
			routePath = c.Request.URL.Path
		}
		if shouldSkipRequestAudit(routePath) {
			return
		}

		action, resource := classifyRequest(c.Request.Method, routePath)
		query := sanitizeQueryValues(c.Request.URL.Query())
		params := sanitizeRouteParams(c.Params)
		detail := map[string]any{
			"latencyMs": time.Since(startedAt).Milliseconds(),
		}
		if len(query) > 0 {
			detail["query"] = query
		}
		if len(params) > 0 {
			detail["params"] = params
		}

		entry := dbschema.AuditLog{
			Action:     action,
			Resource:   resource,
			Result:     classifyResult(c.Writer.Status()),
			StatusCode: c.Writer.Status(),
			Method:     c.Request.Method,
			Path:       routePath,
			ClientIP:   trimToLimit(strings.TrimSpace(c.ClientIP()), 64),
			UserAgent:  trimToLimit(strings.TrimSpace(c.Request.UserAgent()), 255),
			Detail:     marshalDetail(detail),
		}

		if resolveIdentity != nil {
			if identity, ok := resolveIdentity(c); ok {
				if identity.UserID != 0 {
					actorUserID := identity.UserID
					entry.ActorUserID = &actorUserID
				}
				entry.ActorWorkID = trimToLimit(identity.WorkID, 64)
				entry.ActorName = trimToLimit(identity.Name, 64)
				entry.ActorRole = trimToLimit(identity.Role, 32)
			}
		}

		r.LogBestEffort(c.Request.Context(), entry)
	}
}

func shouldSkipRequestAudit(routePath string) bool {
	switch routePath {
	case "", "/health", "/api/ping", "/api/login", "/api/auth/me", "/api/audit-logs/events":
		return true
	default:
		return false
	}
}

func classifyRequest(method string, routePath string) (string, string) {
	switch {
	case method == "GET" && routePath == "/api/passenger-profiles":
		return "search_passenger_profiles", "旅客画像"
	case method == "POST" && routePath == "/api/passenger-profiles/imports":
		return "import_passenger_profiles", "旅客画像"
	case method == "POST" && routePath == "/api/passenger-profiles/ocr/idcard":
		return "recognize_idcard", "证件识别"
	case method == "GET" && strings.HasPrefix(routePath, "/api/import-templates/"):
		return "download_import_template", "导入模板"
	case method == "GET" && routePath == "/api/admin/profiles":
		return "list_admin_profiles", "基础画像"
	case method == "POST" && routePath == "/api/admin/profiles":
		return "create_admin_profile", "基础画像"
	case method == "PUT" && routePath == "/api/admin/profiles/:id":
		return "update_admin_profile", "基础画像"
	case method == "DELETE" && routePath == "/api/admin/profiles/:id":
		return "delete_admin_profile", "基础画像"
	case method == "GET" && routePath == "/api/admin/watchlist":
		return "list_admin_watchlist", "高风险名单"
	case method == "POST" && routePath == "/api/admin/watchlist":
		return "create_admin_watchlist", "高风险名单"
	case method == "PUT" && routePath == "/api/admin/watchlist/:id":
		return "update_admin_watchlist", "高风险名单"
	case method == "DELETE" && routePath == "/api/admin/watchlist/:id":
		return "delete_admin_watchlist", "高风险名单"
	case method == "GET" && routePath == "/api/admin/users":
		return "list_admin_users", "用户管理"
	case method == "POST" && routePath == "/api/admin/users":
		return "create_admin_user", "用户管理"
	case method == "PUT" && routePath == "/api/admin/users/:id":
		return "update_admin_user", "用户管理"
	case method == "PATCH" && routePath == "/api/admin/users/:id/status":
		return "update_admin_user_status", "用户管理"
	case method == "GET" && routePath == "/api/inquiry/settings":
		return "view_inquiry_settings", "系统设置"
	case method == "GET" && routePath == "/api/admin/settings/inquiry":
		return "view_admin_inquiry_settings", "系统设置"
	case method == "PUT" && routePath == "/api/admin/settings/inquiry":
		return "update_admin_inquiry_settings", "系统设置"
	case method == "POST" && routePath == "/api/inquiry/archives":
		return "create_inquiry_archive", "问询归档"
	case method == "GET" && routePath == "/api/admin/inquiry-archives":
		return "list_inquiry_archives", "问询归档"
	case method == "GET" && routePath == "/api/admin/inquiry-archives/:id":
		return "view_inquiry_archive", "问询归档"
	case method == "GET" && routePath == "/api/admin/inquiry-archives/videos/:id/stream":
		return "stream_inquiry_archive_video", "问询归档"
	case method == "GET" && routePath == "/api/admin/memory":
		return "list_admin_memory", "Agent记忆"
	case method == "GET" && routePath == "/api/audit-logs":
		return "view_audit_logs", "日志审计"
	case method == "POST" && routePath == "/api/asr/transcribe":
		return "transcribe_audio", "辅助问询"
	case method == "POST" && routePath == "/api/inquiry/sessions":
		return "create_inquiry_session", "辅助问询"
	case method == "GET" && routePath == "/api/inquiry/sessions/:sessionId":
		return "view_inquiry_session", "辅助问询"
	case method == "POST" && routePath == "/api/inquiry/sessions/:sessionId/turns":
		return "submit_inquiry_turn", "辅助问询"
	case method == "GET" && routePath == "/api/memory/context":
		return "view_memory_context", "Agent记忆"
	case method == "POST" && routePath == "/api/memory/updates":
		return "save_memory_updates", "Agent记忆"
	default:
		normalizedMethod := strings.ToLower(strings.TrimSpace(method))
		normalizedPath := strings.Trim(strings.TrimSpace(routePath), "/")
		normalizedPath = strings.ReplaceAll(normalizedPath, "/", "_")
		if normalizedPath == "" {
			normalizedPath = "unknown_path"
		}
		return normalizedMethod + "_" + normalizedPath, "通用接口"
	}
}

func classifyResult(statusCode int) string {
	switch {
	case statusCode >= 200 && statusCode < 400:
		return "success"
	case statusCode == 401 || statusCode == 403:
		return "denied"
	default:
		return "failure"
	}
}

func sanitizeQueryValues(values url.Values) map[string]string {
	if len(values) == 0 {
		return nil
	}

	keys := make([]string, 0, len(values))
	for key := range values {
		keys = append(keys, key)
	}
	sort.Strings(keys)

	result := make(map[string]string, len(keys))
	for _, key := range keys {
		result[key] = trimToLimit(strings.Join(values[key], ","), 160)
	}
	return result
}

func sanitizeRouteParams(params gin.Params) map[string]string {
	if len(params) == 0 {
		return nil
	}

	result := make(map[string]string, len(params))
	for _, item := range params {
		result[item.Key] = trimToLimit(item.Value, 160)
	}
	return result
}

func marshalDetail(value any) json.RawMessage {
	if value == nil {
		return nil
	}

	payload, err := json.Marshal(value)
	if err != nil {
		return nil
	}
	return payload
}

func trimToLimit(value string, limit int) string {
	value = strings.TrimSpace(value)
	if limit <= 0 || len(value) <= limit {
		return value
	}
	return value[:limit]
}
