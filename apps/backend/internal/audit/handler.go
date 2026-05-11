package audit

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	dbschema "ipra/backend/internal/database"
)

type Handler struct {
	recorder        *Recorder
	authMiddleware  gin.HandlerFunc
	resolveIdentity IdentityResolver
}

type listResult struct {
	Items []dbschema.AuditLog `json:"items"`
	Total int64               `json:"total"`
}

type eventPayload struct {
	Action   string         `json:"action"`
	Resource string         `json:"resource"`
	Result   string         `json:"result"`
	Path     string         `json:"path"`
	Detail   map[string]any `json:"detail"`
}

func NewHandler(
	recorder *Recorder,
	authMiddleware gin.HandlerFunc,
	resolveIdentity IdentityResolver,
) *Handler {
	return &Handler{
		recorder:        recorder,
		authMiddleware:  authMiddleware,
		resolveIdentity: resolveIdentity,
	}
}

func (h *Handler) Register(r gin.IRouter) {
	group := r.Group("/api/audit-logs")
	if h.authMiddleware != nil {
		group.Use(h.authMiddleware)
	}

	group.GET("", h.handleList)
	group.POST("/events", h.handleRecordEvent)
}

func (h *Handler) handleList(c *gin.Context) {
	identity, ok := h.resolve(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	limit := 100
	if rawLimit := strings.TrimSpace(c.Query("limit")); rawLimit != "" {
		if parsed, err := strconv.Atoi(rawLimit); err == nil && parsed > 0 {
			if parsed > 500 {
				parsed = 500
			}
			limit = parsed
		}
	}

	query := strings.TrimSpace(c.Query("query"))
	result := strings.TrimSpace(c.Query("result"))
	actorWorkID := strings.TrimSpace(c.Query("actorWorkId"))

	dbQuery := h.recorder.db.Model(&dbschema.AuditLog{})
	if !identity.IsAdmin() {
		dbQuery = dbQuery.Where("actor_user_id = ?", identity.UserID)
	} else if actorWorkID != "" {
		dbQuery = dbQuery.Where("LOWER(actor_work_id) = ?", strings.ToLower(actorWorkID))
	}

	if query != "" {
		pattern := "%" + query + "%"
		dbQuery = dbQuery.Where(
			`actor_work_id ILIKE ? OR actor_name ILIKE ? OR action ILIKE ? OR resource ILIKE ? OR path ILIKE ? OR result ILIKE ?`,
			pattern,
			pattern,
			pattern,
			pattern,
			pattern,
			pattern,
		)
	}
	if result != "" {
		dbQuery = dbQuery.Where("result = ?", result)
	}

	var total int64
	if err := dbQuery.Count(&total).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询审计日志失败"})
		return
	}

	var items []dbschema.AuditLog
	if err := dbQuery.Order("created_at DESC").Limit(limit).Find(&items).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询审计日志失败"})
		return
	}

	c.JSON(http.StatusOK, listResult{
		Items: items,
		Total: total,
	})
}

func (h *Handler) handleRecordEvent(c *gin.Context) {
	identity, ok := h.resolve(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	var payload eventPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求参数无效"})
		return
	}

	action := trimToLimit(payload.Action, 128)
	resource := trimToLimit(payload.Resource, 128)
	result := trimToLimit(payload.Result, 32)
	if action == "" || resource == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "action 和 resource 不能为空"})
		return
	}
	if result == "" {
		result = "success"
	}

	actorUserID := identity.UserID
	entry := dbschema.AuditLog{
		ActorUserID: &actorUserID,
		ActorWorkID: trimToLimit(identity.WorkID, 64),
		ActorName:   trimToLimit(identity.Name, 64),
		ActorRole:   trimToLimit(identity.Role, 32),
		Action:      action,
		Resource:    resource,
		Result:      result,
		StatusCode:  http.StatusOK,
		Method:      "EVENT",
		Path:        trimToLimit(payload.Path, 255),
		ClientIP:    trimToLimit(strings.TrimSpace(c.ClientIP()), 64),
		UserAgent:   trimToLimit(strings.TrimSpace(c.Request.UserAgent()), 255),
		Detail:      marshalDetail(payload.Detail),
	}
	if entry.Path == "" {
		entry.Path = "client:event"
	}

	if err := h.recorder.Log(c.Request.Context(), entry); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "记录审计日志失败"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ok"})
}

func (h *Handler) resolve(c *gin.Context) (Identity, bool) {
	if h.resolveIdentity == nil {
		return Identity{}, false
	}
	return h.resolveIdentity(c)
}

func (i Identity) IsAdmin() bool {
	return strings.EqualFold(strings.TrimSpace(i.Role), "admin")
}
