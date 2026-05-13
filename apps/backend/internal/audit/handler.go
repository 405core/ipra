package audit

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	dbschema "ipra/backend/internal/database"
	"ipra/backend/internal/displaytime"
	"ipra/backend/internal/sensitive"
)

type Handler struct {
	recorder        *Recorder
	authMiddleware  gin.HandlerFunc
	resolveIdentity IdentityResolver
	sensitive       *sensitive.Manager
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

func (h *Handler) SetSensitiveManager(manager *sensitive.Manager) {
	if h == nil {
		return
	}
	h.sensitive = manager
}

func (h *Handler) Register(r gin.IRouter) {
	group := r.Group("/api/audit-logs")
	if h.authMiddleware != nil {
		group.Use(h.authMiddleware)
	}

	group.GET("", h.handleList)
	group.GET("/protected", h.handleProtectedList)
	group.GET("/:id/protected", h.handleProtectedDetail)
	group.POST("/events", h.handleRecordEvent)
}

func (h *Handler) handleList(c *gin.Context) {
	identity, ok := h.resolve(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	items, total, err := h.queryLogs(c, identity)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询审计日志失败"})
		return
	}

	c.JSON(http.StatusOK, listResult{
		Items: items,
		Total: total,
	})
}

func (h *Handler) handleProtectedList(c *gin.Context) {
	if h.sensitive == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"message": "敏感图片服务未启用"})
		return
	}

	identity, ok := h.resolve(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	items, total, err := h.queryLogs(c, identity)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询审计日志失败"})
		return
	}

	listItems := make([]sensitive.ListItem, 0, len(items))
	for _, item := range items {
		listItems = append(listItems, h.buildProtectedAuditItem(c, identity, item, "audit:list"))
	}

	resultOptions, err := h.listAuditFilterOptions(identity, auditListFilterWithoutResult(auditListFilterFromRequest(c)))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询审计日志失败"})
		return
	}

	c.JSON(http.StatusOK, sensitive.ListResponse{
		Items:    listItems,
		Total:    total,
		Page:     1,
		PageSize: len(listItems),
		Filters: []sensitive.FilterGroup{
			{
				Key:     "result",
				Label:   "结果",
				Options: sensitive.NormalizeFilterOptions(resultOptions),
			},
		},
	})
}

func (h *Handler) handleProtectedDetail(c *gin.Context) {
	if h.sensitive == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"message": "敏感图片服务未启用"})
		return
	}

	identity, ok := h.resolve(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	id, err := strconv.ParseUint(strings.TrimSpace(c.Param("id")), 10, 64)
	if err != nil || id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "ID 参数无效"})
		return
	}

	var item dbschema.AuditLog
	dbQuery := h.recorder.db.Model(&dbschema.AuditLog{})
	if !identity.IsAdmin() {
		dbQuery = dbQuery.Where("actor_user_id = ?", identity.UserID)
	}
	if err := dbQuery.First(&item, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"message": "审计日志不存在"})
		return
	}

	c.JSON(http.StatusOK, sensitive.DetailResponse{
		ID:    strconv.FormatUint(item.ID, 10),
		Asset: h.putAuditAsset(c, identity, item, sensitive.PresetDialog, "audit:detail"),
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

func (h *Handler) queryLogs(c *gin.Context, identity Identity) ([]dbschema.AuditLog, int64, error) {
	return h.queryLogsWithFilter(c, identity, auditListFilterFromRequest(c))
}

type auditListFilter struct {
	Query       string
	Result      string
	ActorWorkID string
	Limit       int
}

func auditListFilterFromRequest(c *gin.Context) auditListFilter {
	limit := 100
	if rawLimit := strings.TrimSpace(c.Query("limit")); rawLimit != "" {
		if parsed, err := strconv.Atoi(rawLimit); err == nil && parsed > 0 {
			if parsed > 500 {
				parsed = 500
			}
			limit = parsed
		}
	}
	return auditListFilter{
		Query:       strings.TrimSpace(c.Query("query")),
		Result:      strings.TrimSpace(c.Query("result")),
		ActorWorkID: strings.TrimSpace(c.Query("actorWorkId")),
		Limit:       limit,
	}
}

func (h *Handler) queryLogsWithFilter(
	c *gin.Context,
	identity Identity,
	filter auditListFilter,
) ([]dbschema.AuditLog, int64, error) {
	dbQuery := h.buildAuditListQuery(identity, filter)
	var total int64
	if err := dbQuery.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	var items []dbschema.AuditLog
	query := dbQuery.Order("created_at DESC")
	if filter.Limit > 0 {
		query = query.Limit(filter.Limit)
	}
	if err := query.Find(&items).Error; err != nil {
		return nil, 0, err
	}
	return items, total, nil
}

func (h *Handler) buildAuditListQuery(
	identity Identity,
	filter auditListFilter,
) *gorm.DB {
	dbQuery := h.recorder.db.Model(&dbschema.AuditLog{}).
		Where("path <> ?", "/api/sensitive-assets/:assetId")
	if !identity.IsAdmin() {
		dbQuery = dbQuery.Where("actor_user_id = ?", identity.UserID)
	} else if filter.ActorWorkID != "" {
		dbQuery = dbQuery.Where("LOWER(actor_work_id) = ?", strings.ToLower(filter.ActorWorkID))
	}

	if filter.Query != "" {
		pattern := "%" + filter.Query + "%"
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
	if filter.Result != "" {
		dbQuery = dbQuery.Where("result = ?", filter.Result)
	}
	return dbQuery
}

func (h *Handler) listAuditFilterOptions(
	identity Identity,
	filter auditListFilter,
) ([]sensitive.FilterOption, error) {
	var values []string
	if err := h.buildAuditListQuery(identity, filter).Distinct("result").Pluck("result", &values).Error; err != nil {
		return nil, err
	}

	options := make([]sensitive.FilterOption, 0, len(values))
	for _, value := range values {
		value = strings.TrimSpace(value)
		if value == "" {
			continue
		}
		options = append(options, sensitive.FilterOption{
			Value: value,
			Label: formatAuditResult(value),
		})
	}
	return sensitive.NormalizeFilterOptions(options), nil
}

func auditListFilterWithoutResult(filter auditListFilter) auditListFilter {
	filter.Result = ""
	filter.Limit = 0
	return filter
}

func (h *Handler) putAuditAsset(
	c *gin.Context,
	identity Identity,
	item dbschema.AuditLog,
	preset sensitive.RenderPreset,
	page string,
) sensitive.AssetRef {
	metaItems := []sensitive.TagItem{
		{
			Text: formatAuditTime(item.CreatedAt),
			Tone: sensitive.TagToneMuted,
		},
		{
			Text: firstAuditValue(strings.TrimSpace(item.ActorName), "未知操作人") + " / " + firstAuditValue(strings.TrimSpace(item.ActorWorkID), "-"),
			Tone: sensitive.TagToneMuted,
		},
		{
			Text: strings.TrimSpace(item.Method) + " " + firstAuditValue(strings.TrimSpace(item.Path), "-"),
			Tone: sensitive.TagToneMuted,
		},
		{
			Text: "状态码 " + strconv.Itoa(item.StatusCode),
			Tone: sensitive.TagToneMuted,
		},
	}

	document := sensitive.Document{
		Eyebrow:  "审计日志",
		Title:    firstAuditValue(strings.TrimSpace(item.Resource), "员工操作记录"),
		Subtitle: firstAuditValue(strings.TrimSpace(item.Action), "未命名动作"),
		TagItems: []sensitive.TagItem{
			{
				Text: formatAuditResult(item.Result),
				Tone: auditResultTone(item.Result),
			},
			{
				Text: firstAuditValue(strings.TrimSpace(item.ActorRole), "-"),
				Tone: sensitive.TagToneDefault,
			},
		},
		MetaItems: metaItems,
		Sections: []sensitive.Section{
			{
				Heading: "环境信息",
				Lines: compactAuditValues([]string{
					"客户端 IP：" + firstAuditValue(strings.TrimSpace(item.ClientIP), "-"),
					"User-Agent：" + firstAuditValue(strings.TrimSpace(item.UserAgent), "-"),
					"详细数据：" + stringifyAuditDetail(item.Detail),
				}),
			},
		},
		Footer: []string{
			"记录时间 " + formatAuditTime(item.CreatedAt),
		},
	}

	return h.sensitive.Put(
		identity.UserID,
		document,
		preset,
		selectAuditFormat(preset),
		buildAuditWatermarkContext(c, identity, page),
	)
}

func (h *Handler) buildProtectedAuditItem(
	c *gin.Context,
	identity Identity,
	item dbschema.AuditLog,
	page string,
) sensitive.ListItem {
	inlineText := func(value string) sensitive.AssetRef {
		return h.sensitive.PutWithStyle(
			identity.UserID,
			sensitive.Document{
				Title: firstAuditValue(strings.TrimSpace(value), "-"),
			},
			sensitive.PresetInline,
			sensitive.FormatWebP,
			sensitive.RenderStyle{
				Transparent: true,
				HideAccent:  true,
			},
			buildAuditWatermarkContext(c, identity, page),
		)
	}

	return sensitive.ListItem{
		ID:          strconv.FormatUint(item.ID, 10),
		Asset:       h.putAuditAsset(c, identity, item, sensitive.PresetList, page),
		DetailAsset: h.putAuditAsset(c, identity, item, sensitive.PresetDialog, "audit:detail"),
		Actions:     []string{"detail"},
		Kind:        "audit",
		Fields: []sensitive.FieldRef{
			{
				Key:   "resource",
				Asset: inlineText(firstAuditValue(strings.TrimSpace(item.Resource), "员工操作记录")),
			},
			{
				Key:   "action",
				Asset: inlineText(firstAuditValue(strings.TrimSpace(item.Action), "未命名动作")),
			},
		},
		Chips: []sensitive.FieldRef{
			{
				Key:   "result",
				Asset: inlineText(formatAuditResult(item.Result)),
				Tone:  auditResultTone(item.Result),
			},
			{
				Key:   "role",
				Asset: inlineText(firstAuditValue(strings.TrimSpace(item.ActorRole), "-")),
				Tone:  sensitive.TagToneDefault,
			},
		},
		Facts: []sensitive.FactRef{
			{
				Key:   "operator",
				Label: "操作人",
				Asset: inlineText(firstAuditValue(strings.TrimSpace(item.ActorName), "未知操作人") + " / " + firstAuditValue(strings.TrimSpace(item.ActorWorkID), "-")),
			},
			{
				Key:   "createdAt",
				Label: "时间",
				Asset: inlineText(formatAuditTime(item.CreatedAt)),
			},
		},
	}
}

func buildAuditWatermarkContext(c *gin.Context, identity Identity, page string) sensitive.WatermarkContext {
	return sensitive.NewWatermarkContext(
		strings.TrimSpace(identity.WorkID),
		strings.TrimSpace(identity.Name),
		strings.TrimSpace(identity.Role),
		strings.TrimSpace(c.ClientIP()),
		c.Request.Method+" "+firstAuditValue(c.FullPath(), c.Request.URL.Path),
		page,
	)
}

func stringifyAuditDetail(value json.RawMessage) string {
	if len(value) == 0 {
		return "无"
	}
	return string(value)
}

func formatAuditTime(value time.Time) string {
	return displaytime.Format(value, "2006-01-02 15:04:05")
}

func formatAuditResult(value string) string {
	switch strings.TrimSpace(value) {
	case "success":
		return "成功"
	case "denied":
		return "拒绝"
	case "failure":
		return "失败"
	default:
		return firstAuditValue(strings.TrimSpace(value), "未知")
	}
}

func auditResultTone(value string) sensitive.TagTone {
	switch strings.TrimSpace(value) {
	case "success":
		return sensitive.TagToneSuccess
	case "denied", "failure":
		return sensitive.TagToneMuted
	default:
		return sensitive.TagToneDefault
	}
}

func compactAuditValues(values []string) []string {
	result := make([]string, 0, len(values))
	for _, value := range values {
		if trimmed := strings.TrimSpace(value); trimmed != "" {
			result = append(result, trimmed)
		}
	}
	return result
}

func firstAuditValue(values ...string) string {
	for _, value := range values {
		if trimmed := strings.TrimSpace(value); trimmed != "" {
			return trimmed
		}
	}
	return ""
}

func selectAuditFormat(preset sensitive.RenderPreset) sensitive.RenderFormat {
	if preset == sensitive.PresetDialog {
		return sensitive.FormatPNG
	}
	return sensitive.FormatWebP
}
