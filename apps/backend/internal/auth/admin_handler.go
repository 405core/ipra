package auth

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	dbschema "ipra/backend/internal/database"
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
