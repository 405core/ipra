package auth

import (
	"errors"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"ipra/backend/internal/audit"
	dbschema "ipra/backend/internal/database"
	"ipra/backend/internal/sensitive"
)

const authClaimsContextKey = "authClaims"

type Handler struct {
	db           *gorm.DB
	audit        *audit.Recorder
	tokenManager *TokenManager
	sensitive    *sensitive.Manager
}

type loginRequest struct {
	WorkID   string `json:"workId"`
	Password string `json:"password"`
}

type userResponse struct {
	ID     uint64 `json:"id"`
	WorkID string `json:"workId"`
	Name   string `json:"name"`
	Role   string `json:"role"`
	Status string `json:"status"`
}

func NewHandler(db *gorm.DB, tokenManager *TokenManager, auditRecorder *audit.Recorder) *Handler {
	return &Handler{
		db:           db,
		audit:        auditRecorder,
		tokenManager: tokenManager,
	}
}

func (h *Handler) SetSensitiveManager(manager *sensitive.Manager) {
	if h == nil {
		return
	}
	h.sensitive = manager
}

func (h *Handler) Register(r gin.IRouter) {
	r.POST("/api/login", h.handleLogin)

	authGroup := r.Group("/api/auth")
	authGroup.Use(h.requireAuth())
	authGroup.GET("/me", h.handleCurrentUser)
	authGroup.POST("/logout", h.handleLogout)
}

func (h *Handler) AuthMiddleware() gin.HandlerFunc {
	return h.requireAuth()
}

func (h *Handler) handleLogin(c *gin.Context) {
	var req loginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求参数无效"})
		return
	}

	workID := NormalizeWorkID(req.WorkID)
	password := strings.TrimSpace(req.Password)
	if workID == "" || password == "" {
		h.logLoginAttempt(c, dbschema.AuditLog{
			ActorWorkID: workID,
			Action:      "login",
			Resource:    "登录",
			Result:      "failure",
			StatusCode:  http.StatusBadRequest,
			Method:      c.Request.Method,
			Path:        c.FullPath(),
			ClientIP:    strings.TrimSpace(c.ClientIP()),
			UserAgent:   strings.TrimSpace(c.Request.UserAgent()),
		})
		c.JSON(http.StatusBadRequest, gin.H{"message": "工号和密码不能为空"})
		return
	}

	var user dbschema.SystemUser
	if err := h.db.Where("LOWER(work_id) = ?", workID).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			h.logLoginAttempt(c, dbschema.AuditLog{
				ActorWorkID: workID,
				Action:      "login",
				Resource:    "登录",
				Result:      "failure",
				StatusCode:  http.StatusUnauthorized,
				Method:      c.Request.Method,
				Path:        c.FullPath(),
				ClientIP:    strings.TrimSpace(c.ClientIP()),
				UserAgent:   strings.TrimSpace(c.Request.UserAgent()),
			})
			c.JSON(http.StatusUnauthorized, gin.H{"message": "工号或密码错误"})
			return
		}

		h.logLoginAttempt(c, dbschema.AuditLog{
			ActorWorkID: workID,
			Action:      "login",
			Resource:    "登录",
			Result:      "failure",
			StatusCode:  http.StatusInternalServerError,
			Method:      c.Request.Method,
			Path:        c.FullPath(),
			ClientIP:    strings.TrimSpace(c.ClientIP()),
			UserAgent:   strings.TrimSpace(c.Request.UserAgent()),
		})
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询用户失败"})
		return
	}

	if err := VerifyPassword(user.PasswordHash, password); err != nil {
		h.logLoginAttempt(c, dbschema.AuditLog{
			ActorWorkID: workID,
			Action:      "login",
			Resource:    "登录",
			Result:      "failure",
			StatusCode:  http.StatusUnauthorized,
			Method:      c.Request.Method,
			Path:        c.FullPath(),
			ClientIP:    strings.TrimSpace(c.ClientIP()),
			UserAgent:   strings.TrimSpace(c.Request.UserAgent()),
		})
		c.JSON(http.StatusUnauthorized, gin.H{"message": "工号或密码错误"})
		return
	}

	if NormalizeStatus(user.Status) != StatusActive {
		h.logLoginAttempt(c, dbschema.AuditLog{
			ActorUserID: func() *uint64 { id := user.ID; return &id }(),
			ActorWorkID: user.WorkID,
			ActorName:   user.Name,
			ActorRole:   NormalizeRole(user.Role),
			Action:      "login",
			Resource:    "登录",
			Result:      "denied",
			StatusCode:  http.StatusForbidden,
			Method:      c.Request.Method,
			Path:        c.FullPath(),
			ClientIP:    strings.TrimSpace(c.ClientIP()),
			UserAgent:   strings.TrimSpace(c.Request.UserAgent()),
		})
		c.JSON(http.StatusForbidden, gin.H{"message": "账号已停用"})
		return
	}

	token, err := h.tokenManager.Sign(user)
	if err != nil {
		h.logLoginAttempt(c, dbschema.AuditLog{
			ActorUserID: func() *uint64 { id := user.ID; return &id }(),
			ActorWorkID: user.WorkID,
			ActorName:   user.Name,
			ActorRole:   NormalizeRole(user.Role),
			Action:      "login",
			Resource:    "登录",
			Result:      "failure",
			StatusCode:  http.StatusInternalServerError,
			Method:      c.Request.Method,
			Path:        c.FullPath(),
			ClientIP:    strings.TrimSpace(c.ClientIP()),
			UserAgent:   strings.TrimSpace(c.Request.UserAgent()),
		})
		c.JSON(http.StatusInternalServerError, gin.H{"message": "生成 token 失败"})
		return
	}

	h.logLoginAttempt(c, dbschema.AuditLog{
		ActorUserID: func() *uint64 { id := user.ID; return &id }(),
		ActorWorkID: user.WorkID,
		ActorName:   user.Name,
		ActorRole:   NormalizeRole(user.Role),
		Action:      "login",
		Resource:    "登录",
		Result:      "success",
		StatusCode:  http.StatusOK,
		Method:      c.Request.Method,
		Path:        c.FullPath(),
		ClientIP:    strings.TrimSpace(c.ClientIP()),
		UserAgent:   strings.TrimSpace(c.Request.UserAgent()),
	})

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user":  toUserResponse(user),
	})
}

func (h *Handler) handleCurrentUser(c *gin.Context) {
	claims, ok := claimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	var user dbschema.SystemUser
	if err := h.db.First(&user, claims.UserID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "用户不存在"})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询当前用户失败"})
		return
	}

	if NormalizeStatus(user.Status) != StatusActive {
		c.JSON(http.StatusForbidden, gin.H{"message": "账号已停用"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user": toUserResponse(user),
	})
}

func (h *Handler) handleLogout(c *gin.Context) {
	claims, ok := claimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	actorUserID := claims.UserID
	entry := dbschema.AuditLog{
		ActorUserID: &actorUserID,
		ActorWorkID: trimToLimit(claims.WorkID, 64),
		ActorName:   trimToLimit(claims.Name, 64),
		ActorRole:   trimToLimit(NormalizeRole(claims.Role), 32),
		Action:      "logout",
		Resource:    "退出登录",
		Result:      "success",
		StatusCode:  http.StatusOK,
		Method:      c.Request.Method,
		Path:        c.FullPath(),
		ClientIP:    trimToLimit(strings.TrimSpace(c.ClientIP()), 64),
		UserAgent:   trimToLimit(strings.TrimSpace(c.Request.UserAgent()), 255),
	}
	h.logLoginAttempt(c, entry)

	c.JSON(http.StatusOK, gin.H{"message": "ok"})
}

func (h *Handler) requireAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		token, ok := parseBearerToken(c.GetHeader("Authorization"))
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "缺少认证 token"})
			return
		}

		claims, err := h.tokenManager.Parse(token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "token 无效或已过期"})
			return
		}

		c.Set(authClaimsContextKey, claims)
		c.Next()
	}
}

func claimsFromContext(c *gin.Context) (Claims, bool) {
	value, ok := c.Get(authClaimsContextKey)
	if !ok {
		return Claims{}, false
	}

	claims, ok := value.(Claims)
	if !ok {
		return Claims{}, false
	}

	return claims, true
}

func ClaimsFromContext(c *gin.Context) (Claims, bool) {
	return claimsFromContext(c)
}

func (h *Handler) ResolveAuditIdentity(c *gin.Context) (audit.Identity, bool) {
	claims, ok := claimsFromContext(c)
	if !ok {
		return audit.Identity{}, false
	}

	return audit.Identity{
		UserID: claims.UserID,
		WorkID: claims.WorkID,
		Name:   claims.Name,
		Role:   NormalizeRole(claims.Role),
	}, true
}

func buildSensitiveWatermarkContext(c *gin.Context, claims Claims, page string) sensitive.WatermarkContext {
	return sensitive.NewWatermarkContext(
		strings.TrimSpace(claims.WorkID),
		strings.TrimSpace(claims.Name),
		strings.TrimSpace(claims.Role),
		strings.TrimSpace(c.ClientIP()),
		c.Request.Method+" "+firstNonEmptyString(c.FullPath(), c.Request.URL.Path),
		page,
	)
}

func firstNonEmptyString(values ...string) string {
	for _, value := range values {
		if trimmed := strings.TrimSpace(value); trimmed != "" {
			return trimmed
		}
	}
	return ""
}

func parseBearerToken(header string) (string, bool) {
	if header == "" || !strings.HasPrefix(header, "Bearer ") {
		return "", false
	}

	token := strings.TrimSpace(strings.TrimPrefix(header, "Bearer "))
	if token == "" {
		return "", false
	}

	return token, true
}

func trimToLimit(value string, limit int) string {
	value = strings.TrimSpace(value)
	if limit <= 0 || len(value) <= limit {
		return value
	}
	return value[:limit]
}

func toUserResponse(user dbschema.SystemUser) userResponse {
	return userResponse{
		ID:     user.ID,
		WorkID: user.WorkID,
		Name:   user.Name,
		Role:   NormalizeRole(user.Role),
		Status: NormalizeStatus(user.Status),
	}
}

func (h *Handler) logLoginAttempt(c *gin.Context, entry dbschema.AuditLog) {
	if h == nil || h.audit == nil {
		return
	}
	h.audit.LogBestEffort(c.Request.Context(), entry)
}
