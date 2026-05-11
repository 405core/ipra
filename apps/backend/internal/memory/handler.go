package memory

import (
	"errors"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"ipra/backend/internal/auth"
)

type Handler struct {
	store Store
}

type upsertRequest struct {
	MemoryUpdates []Update `json:"memoryUpdates"`
}

type upsertResponse struct {
	Items []Item `json:"items"`
	Total int    `json:"total"`
}

type statusPayload struct {
	Status string `json:"status"`
}

func NewHandler(store Store) *Handler {
	return &Handler{store: store}
}

func (h *Handler) Register(r gin.IRouter, authMiddleware gin.HandlerFunc) {
	group := r.Group("/api/inquiry")
	group.Use(authMiddleware)
	group.GET("/memory-context", h.handleGetContext)
	group.POST("/memory-updates", h.handleUpsert)
}

func (h *Handler) RegisterAdminRoutes(r gin.IRouter, authMiddleware gin.HandlerFunc) {
	group := r.Group("/api/admin/memories")
	group.Use(authMiddleware, requireAdminRole())
	group.PATCH("/:id/status", h.handleUpdateStatus)
}

func (h *Handler) handleGetContext(c *gin.Context) {
	if h.store == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "记忆服务未配置"})
		return
	}

	limit := 0
	if rawLimit := strings.TrimSpace(c.Query("limit")); rawLimit != "" {
		parsed, err := strconv.Atoi(rawLimit)
		if err != nil || parsed < 0 {
			c.JSON(http.StatusBadRequest, gin.H{"message": "limit 参数无效"})
			return
		}
		limit = parsed
	}

	result, err := h.store.GetContext(ContextRequest{
		SessionID:   c.Query("sessionId"),
		PassengerID: c.Query("passengerId"),
		Limit:       limit,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询智能体记忆失败"})
		return
	}

	c.JSON(http.StatusOK, result)
}

func (h *Handler) handleUpsert(c *gin.Context) {
	if h.store == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "记忆服务未配置"})
		return
	}

	claims, ok := auth.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	var payload upsertRequest
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求参数无效"})
		return
	}

	items, err := h.store.Upsert(UpsertRequest{
		Updates: payload.MemoryUpdates,
		UserID:  claims.UserID,
		IsAdmin: auth.NormalizeRole(claims.Role) == auth.RoleAdmin,
	})
	if err != nil {
		switch {
		case errors.Is(err, ErrForbidden):
			c.JSON(http.StatusForbidden, gin.H{"message": "普通问询接口不能写入规则记忆"})
		case errors.Is(err, ErrInvalidRequest):
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"message": "保存智能体记忆失败"})
		}
		return
	}

	c.JSON(http.StatusOK, upsertResponse{Items: items, Total: len(items)})
}

func (h *Handler) handleUpdateStatus(c *gin.Context) {
	if h.store == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "记忆服务未配置"})
		return
	}

	id, err := strconv.ParseUint(strings.TrimSpace(c.Param("id")), 10, 64)
	if err != nil || id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "ID 参数无效"})
		return
	}

	claims, ok := auth.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	var payload statusPayload
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求参数无效"})
		return
	}

	item, err := h.store.UpdateStatus(StatusUpdateRequest{
		ID:     id,
		Status: strings.TrimSpace(payload.Status),
		UserID: claims.UserID,
	})
	if err != nil {
		switch {
		case errors.Is(err, ErrNotFound):
			c.JSON(http.StatusNotFound, gin.H{"message": "记忆不存在"})
		case errors.Is(err, ErrInvalidRequest):
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"message": "更新智能体记忆状态失败"})
		}
		return
	}

	c.JSON(http.StatusOK, item)
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
