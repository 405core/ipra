package auth

import (
	"errors"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	dbschema "ipra/backend/internal/database"
	"ipra/backend/internal/sensitive"
)

type adminUserPayload struct {
	WorkID   string `json:"workId"`
	Name     string `json:"name"`
	Role     string `json:"role"`
	Status   string `json:"status"`
	Password string `json:"password"`
}

type adminUserListResult struct {
	Items []userResponse `json:"items"`
	Total int64          `json:"total"`
}

func (h *Handler) RegisterAdminRoutes(r gin.IRouter) {
	adminGroup := r.Group("/api/admin/users")
	adminGroup.Use(h.requireAuth(), requireAdminRoleForAuth())

	adminGroup.GET("", h.handleAdminListUsers)
	adminGroup.GET("/protected", h.handleAdminProtectedUsers)
	adminGroup.GET("/:id", h.handleAdminGetUser)
	adminGroup.POST("", h.handleAdminCreateUser)
	adminGroup.PUT("/:id", h.handleAdminUpdateUser)
	adminGroup.PATCH("/:id/status", h.handleAdminUpdateUserStatus)
}

func (h *Handler) handleAdminListUsers(c *gin.Context) {
	limit := 20
	if rawLimit := strings.TrimSpace(c.Query("limit")); rawLimit != "" {
		if parsed, err := strconv.Atoi(rawLimit); err == nil && parsed > 0 {
			if parsed > 500 {
				parsed = 500
			}
			limit = parsed
		}
	}

	query := strings.TrimSpace(c.Query("query"))
	dbQuery := h.db.Model(&dbschema.SystemUser{})
	if query != "" {
		pattern := "%" + query + "%"
		dbQuery = dbQuery.Where(
			`work_id ILIKE ? OR name ILIKE ? OR role ILIKE ? OR status ILIKE ?`,
			pattern,
			pattern,
			pattern,
			pattern,
		)
	}

	var total int64
	if err := dbQuery.Count(&total).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询用户失败"})
		return
	}

	var users []dbschema.SystemUser
	if err := dbQuery.Order("updated_at DESC").Limit(limit).Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询用户失败"})
		return
	}

	items := make([]userResponse, 0, len(users))
	for _, user := range users {
		items = append(items, toUserResponse(user))
	}

	c.JSON(http.StatusOK, adminUserListResult{
		Items: items,
		Total: total,
	})
}

func (h *Handler) handleAdminProtectedUsers(c *gin.Context) {
	if h.sensitive == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"message": "敏感图片服务未启用"})
		return
	}

	claims, ok := ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	limit := 20
	if rawLimit := strings.TrimSpace(c.Query("limit")); rawLimit != "" {
		if parsed, err := strconv.Atoi(rawLimit); err == nil && parsed > 0 {
			if parsed > 500 {
				parsed = 500
			}
			limit = parsed
		}
	}

	query := strings.TrimSpace(c.Query("query"))
	dbQuery := h.db.Model(&dbschema.SystemUser{})
	if query != "" {
		pattern := "%" + query + "%"
		dbQuery = dbQuery.Where(
			`work_id ILIKE ? OR name ILIKE ? OR role ILIKE ? OR status ILIKE ?`,
			pattern,
			pattern,
			pattern,
			pattern,
		)
	}

	var total int64
	if err := dbQuery.Count(&total).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询用户失败"})
		return
	}

	var users []dbschema.SystemUser
	if err := dbQuery.Order("updated_at DESC").Limit(limit).Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询用户失败"})
		return
	}

	items := make([]sensitive.ListItem, 0, len(users))
	for _, user := range users {
		items = append(items, h.buildProtectedUserItem(c, claims, user, "admin:users"))
	}

	c.JSON(http.StatusOK, sensitive.ListResponse{
		Items:    items,
		Total:    total,
		Page:     1,
		PageSize: len(items),
	})
}

func (h *Handler) handleAdminGetUser(c *gin.Context) {
	id, err := strconv.ParseUint(strings.TrimSpace(c.Param("id")), 10, 64)
	if err != nil || id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "ID 参数无效"})
		return
	}

	var user dbschema.SystemUser
	if err := h.db.First(&user, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"message": "用户不存在"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询用户失败"})
		return
	}

	c.JSON(http.StatusOK, toUserResponse(user))
}

func userStatusTagTone(value string) sensitive.TagTone {
	if NormalizeStatus(value) == StatusActive {
		return sensitive.TagToneSuccess
	}
	return sensitive.TagToneMuted
}

func (h *Handler) buildProtectedUserItem(
	c *gin.Context,
	claims Claims,
	user dbschema.SystemUser,
	page string,
) sensitive.ListItem {
	role := NormalizeRole(user.Role)
	status := NormalizeStatus(user.Status)
	document := sensitive.Document{
		Eyebrow:  "用户管理",
		Title:    firstNonEmptyString(strings.TrimSpace(user.Name), "系统用户"),
		Subtitle: "用户账号信息",
		TagItems: []sensitive.TagItem{
			{Text: firstNonEmptyString(strings.TrimSpace(user.WorkID), "-"), Tone: sensitive.TagToneIdentity},
			{Text: role, Tone: sensitive.TagToneDefault},
			{Text: status, Tone: userStatusTagTone(user.Status)},
		},
		FactItems: []sensitive.FactItem{
			{Label: "工号", Value: firstNonEmptyString(strings.TrimSpace(user.WorkID), "-")},
			{Label: "姓名", Value: firstNonEmptyString(strings.TrimSpace(user.Name), "-")},
			{Label: "角色", Value: role},
			{Label: "状态", Value: status},
		},
		Footer: []string{
			"更新时间 " + user.UpdatedAt.Local().Format("2006-01-02 15:04:05"),
		},
	}

	inlineText := func(value string) sensitive.AssetRef {
		return h.sensitive.PutWithStyle(
			claims.UserID,
			sensitive.Document{Title: firstNonEmptyString(strings.TrimSpace(value), "-")},
			sensitive.PresetInline,
			sensitive.FormatWebP,
			sensitive.RenderStyle{Transparent: true, HideAccent: true},
			buildSensitiveWatermarkContext(c, claims, page),
		)
	}

	return sensitive.ListItem{
		ID: strconv.FormatUint(user.ID, 10),
		Asset: h.sensitive.Put(
			claims.UserID,
			document,
			sensitive.PresetList,
			sensitive.FormatWebP,
			buildSensitiveWatermarkContext(c, claims, page),
		),
		Actions: []string{"edit", "toggle-status"},
		Kind:    "user",
		Fields: []sensitive.FieldRef{
			{
				Key:   "name",
				Asset: inlineText(firstNonEmptyString(strings.TrimSpace(user.Name), "系统用户")),
			},
			{
				Key:   "workId",
				Asset: inlineText(firstNonEmptyString(strings.TrimSpace(user.WorkID), "-")),
				Tone:  sensitive.TagToneIdentity,
			},
		},
		Chips: []sensitive.FieldRef{
			{
				Key:   "role",
				Asset: inlineText(role),
				Tone:  sensitive.TagToneDefault,
			},
			{
				Key:   "status",
				Asset: inlineText(status),
				Tone:  userStatusTagTone(user.Status),
			},
		},
		Facts: []sensitive.FactRef{
			{Key: "workId", Label: "工号", Asset: inlineText(firstNonEmptyString(strings.TrimSpace(user.WorkID), "-"))},
			{Key: "name", Label: "姓名", Asset: inlineText(firstNonEmptyString(strings.TrimSpace(user.Name), "-"))},
			{Key: "role", Label: "角色", Asset: inlineText(role)},
			{Key: "status", Label: "状态", Asset: inlineText(status)},
		},
		Meta: []sensitive.FieldRef{
			{
				Key:   "updatedAt",
				Asset: inlineText("更新时间 " + user.UpdatedAt.Local().Format("2006-01-02 15:04:05")),
				Tone:  sensitive.TagToneMuted,
			},
		},
		Flags: map[string]bool{
			"isActive": status == StatusActive,
		},
	}
}

func (h *Handler) handleAdminCreateUser(c *gin.Context) {
	var payload adminUserPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求参数无效"})
		return
	}

	workID := NormalizeWorkID(payload.WorkID)
	if workID == "" || strings.TrimSpace(payload.Name) == "" || strings.TrimSpace(payload.Password) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "工号、姓名和密码不能为空"})
		return
	}

	passwordHash, err := HashPassword(payload.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "生成密码失败"})
		return
	}

	user := dbschema.SystemUser{
		WorkID:       workID,
		Name:         strings.TrimSpace(payload.Name),
		Role:         NormalizeRole(payload.Role),
		Status:       NormalizeStatus(payload.Status),
		PasswordHash: passwordHash,
	}
	if user.Role == "" {
		user.Role = RoleUser
	}
	if user.Status == "" {
		user.Status = StatusActive
	}

	if err := h.db.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "新增用户失败"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ok"})
}

func (h *Handler) handleAdminUpdateUser(c *gin.Context) {
	id, ok := parseAdminUserID(c)
	if !ok {
		return
	}

	claims, ok := claimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	var payload adminUserPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求参数无效"})
		return
	}

	updates := map[string]any{}
	if workID := NormalizeWorkID(payload.WorkID); workID != "" {
		updates["work_id"] = workID
	}
	if name := strings.TrimSpace(payload.Name); name != "" {
		updates["name"] = name
	}
	if role := NormalizeRole(payload.Role); role != "" {
		updates["role"] = role
	}
	if status := NormalizeStatus(payload.Status); status != "" {
		if claims.UserID == id && status == StatusDisabled {
			c.JSON(http.StatusBadRequest, gin.H{"message": "不能停用当前登录管理员"})
			return
		}
		updates["status"] = status
	}
	if password := strings.TrimSpace(payload.Password); password != "" {
		passwordHash, err := HashPassword(password)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "生成密码失败"})
			return
		}
		updates["password_hash"] = passwordHash
	}
	updates["updated_at"] = gorm.Expr("CURRENT_TIMESTAMP")

	if err := h.db.Model(&dbschema.SystemUser{}).Where("id = ?", id).Updates(updates).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "更新用户失败"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ok"})
}

func (h *Handler) handleAdminUpdateUserStatus(c *gin.Context) {
	id, ok := parseAdminUserID(c)
	if !ok {
		return
	}

	claims, ok := claimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	var payload adminUserPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求参数无效"})
		return
	}

	status := NormalizeStatus(payload.Status)
	if status == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "状态不能为空"})
		return
	}

	if claims.UserID == id && status == StatusDisabled {
		c.JSON(http.StatusBadRequest, gin.H{"message": "不能停用当前登录管理员"})
		return
	}

	if err := h.db.Model(&dbschema.SystemUser{}).
		Where("id = ?", id).
		Updates(map[string]any{
			"status":     status,
			"updated_at": gorm.Expr("CURRENT_TIMESTAMP"),
		}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "更新用户状态失败"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ok"})
}

func parseAdminUserID(c *gin.Context) (uint64, bool) {
	value := strings.TrimSpace(c.Param("id"))
	id, err := strconv.ParseUint(value, 10, 64)
	if err != nil || id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "ID 参数无效"})
		return 0, false
	}
	return id, true
}

func requireAdminRoleForAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims, ok := ClaimsFromContext(c)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
			return
		}
		if NormalizeRole(claims.Role) != RoleAdmin {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"message": "无权限访问"})
			return
		}
		c.Next()
	}
}

func compactUserStrings(values []string) []string {
	result := make([]string, 0, len(values))
	for _, value := range values {
		if trimmed := strings.TrimSpace(value); trimmed != "" {
			result = append(result, trimmed)
		}
	}
	return result
}
