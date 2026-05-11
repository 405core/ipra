package settings

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"ipra/backend/internal/auth"
)

type Handler struct {
	store Store
}

type InquirySettingsResponse struct {
	MaxRounds        int       `json:"maxRounds"`
	MinRounds        int       `json:"minRounds"`
	MaxAllowedRounds int       `json:"maxAllowedRounds"`
	UpdatedAt        time.Time `json:"updatedAt"`
}

type updateInquirySettingsRequest struct {
	MaxRounds int `json:"maxRounds"`
}

func NewHandler(store Store) *Handler {
	return &Handler{store: store}
}

func (h *Handler) Register(r gin.IRouter, authMiddleware gin.HandlerFunc) {
	inquiryGroup := r.Group("/api/inquiry")
	inquiryGroup.Use(authMiddleware)
	inquiryGroup.GET("/settings", h.handleGetInquirySettings)

	adminGroup := r.Group("/api/admin/settings")
	adminGroup.Use(authMiddleware, requireAdminRole())
	adminGroup.GET("/inquiry", h.handleGetInquirySettings)
	adminGroup.PUT("/inquiry", h.handleUpdateInquirySettings)
}

func (h *Handler) handleGetInquirySettings(c *gin.Context) {
	if h.store == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "系统设置服务未配置"})
		return
	}

	settings, err := h.store.GetInquirySettings(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "读取问询设置失败"})
		return
	}

	c.JSON(http.StatusOK, toResponse(settings))
}

func (h *Handler) handleUpdateInquirySettings(c *gin.Context) {
	if h.store == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "系统设置服务未配置"})
		return
	}

	claims, ok := auth.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	var payload updateInquirySettingsRequest
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求参数无效"})
		return
	}
	if !IsValidInteractionRounds(payload.MaxRounds) {
		c.JSON(http.StatusBadRequest, gin.H{"message": "总交互轮次上限需在 1-10 之间"})
		return
	}

	settings, err := h.store.UpdateInquirySettings(
		c.Request.Context(),
		payload.MaxRounds,
		claims.UserID,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "更新问询设置失败"})
		return
	}

	c.JSON(http.StatusOK, toResponse(settings))
}

func toResponse(settings InquirySettings) InquirySettingsResponse {
	return InquirySettingsResponse{
		MaxRounds:        settings.MaxRounds,
		MinRounds:        MinInteractionRounds,
		MaxAllowedRounds: MaxInteractionRounds,
		UpdatedAt:        settings.UpdatedAt,
	}
}

func requireAdminRole() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims, ok := auth.ClaimsFromContext(c)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
			return
		}
		if auth.NormalizeRole(claims.Role) != auth.RoleAdmin {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"message": "无权限访问"})
			return
		}
		c.Next()
	}
}
