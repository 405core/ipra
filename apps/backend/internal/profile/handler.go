package profile

import (
	"errors"
	"io"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"ipra/backend/internal/auth"
	"ipra/backend/internal/config"
)

const maxImportFileSize = 20 << 20

type Handler struct {
	service *Service
	ocr     *IDCardOCRClient
}

func NewHandler(db *gorm.DB, ocrConfig config.OCRConfig) *Handler {
	return &Handler{
		service: NewService(db),
		ocr:     NewIDCardOCRClient(ocrConfig),
	}
}

func (h *Handler) Register(r gin.IRouter, authMiddleware gin.HandlerFunc) {
	group := r.Group("/api/passenger-profiles")
	if authMiddleware != nil {
		group.Use(authMiddleware)
	}

	group.GET("", h.handleSearch)
	group.POST("/imports", h.handleImport)
	group.POST("/ocr/idcard", h.handleRecognizeIDCard)

	templateGroup := r.Group("/api/import-templates")
	if authMiddleware != nil {
		templateGroup.Use(authMiddleware)
	}
	registerTemplateRoutes(templateGroup)

	adminGroup := r.Group("/api/admin")
	if authMiddleware != nil {
		adminGroup.Use(authMiddleware, requireAdminRole())
	}

	adminGroup.GET("/profiles", h.handleAdminListProfiles)
	adminGroup.POST("/profiles", h.handleAdminCreateProfile)
	adminGroup.PUT("/profiles/:id", h.handleAdminUpdateProfile)
	adminGroup.DELETE("/profiles/:id", h.handleAdminDeleteProfile)

	adminGroup.GET("/watchlist", h.handleAdminListWatchlist)
	adminGroup.POST("/watchlist", h.handleAdminCreateWatchlist)
	adminGroup.PUT("/watchlist/:id", h.handleAdminUpdateWatchlist)
	adminGroup.DELETE("/watchlist/:id", h.handleAdminDeleteWatchlist)
}

func (h *Handler) handleSearch(c *gin.Context) {
	profiles, err := h.service.SearchProfilesByDocumentExact(c.Request.Context(), c.Query("query"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询旅客画像失败"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"profiles": profiles,
	})
}

func (h *Handler) handleImport(c *gin.Context) {
	claims, ok := auth.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	fileHeader, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "缺少导入文件"})
		return
	}

	file, err := fileHeader.Open()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "读取导入文件失败"})
		return
	}
	defer file.Close()

	data, err := io.ReadAll(io.LimitReader(file, maxImportFileSize+1))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "读取导入文件失败"})
		return
	}
	if len(data) > maxImportFileSize {
		c.JSON(http.StatusBadRequest, gin.H{"message": "导入文件不能超过 20MB"})
		return
	}

	importType := ""
	if rawImportType := strings.TrimSpace(c.PostForm("importType")); rawImportType != "" {
		normalizedImportType, valid := normalizeImportType(rawImportType)
		if !valid {
			c.JSON(http.StatusBadRequest, gin.H{"message": "importType 仅支持 BASE_PROFILE 或 HIGH_RISK"})
			return
		}
		importType = normalizedImportType
	}

	if importType == "" {
		parsed, err := parseSpreadsheetWithMetadata(fileHeader.Filename, data)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}

		importType, err = detectImportTypeFromSpreadsheet(parsed.Rows, parsed.WorksheetName)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}
	}

	result, err := h.service.ImportProfiles(
		c.Request.Context(),
		claims.UserID,
		fileHeader.Filename,
		importType,
		data,
	)
	if err != nil {
		if errors.Is(err, ErrImportValidation) {
			c.JSON(http.StatusOK, result)
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{"message": "导入旅客画像失败"})
		return
	}

	c.JSON(http.StatusOK, result)
}

func (h *Handler) handleAdminListProfiles(c *gin.Context) {
	limit := parseListLimit(c)
	result, err := h.service.ListProfiles(c.Request.Context(), c.Query("query"), limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询基础画像失败"})
		return
	}

	c.JSON(http.StatusOK, result)
}

func (h *Handler) handleAdminCreateProfile(c *gin.Context) {
	var payload SearchProfileResponse
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求参数无效"})
		return
	}
	if strings.TrimSpace(payload.DocumentNum) == "" || strings.TrimSpace(payload.FullName) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "证件号码和姓名不能为空"})
		return
	}

	if err := h.service.CreateProfile(c.Request.Context(), payload); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "新增基础画像失败"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ok"})
}

func (h *Handler) handleAdminUpdateProfile(c *gin.Context) {
	id, ok := parseUintParam(c, "id")
	if !ok {
		return
	}

	var payload SearchProfileResponse
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求参数无效"})
		return
	}

	if err := h.service.UpdateProfile(c.Request.Context(), id, payload); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "更新基础画像失败"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ok"})
}

func (h *Handler) handleAdminDeleteProfile(c *gin.Context) {
	id, ok := parseUintParam(c, "id")
	if !ok {
		return
	}

	if err := h.service.DeleteProfile(c.Request.Context(), id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "删除基础画像失败"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ok"})
}

func (h *Handler) handleAdminListWatchlist(c *gin.Context) {
	limit := parseListLimit(c)
	result, err := h.service.ListWatchlist(c.Request.Context(), c.Query("query"), limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询高风险名单失败"})
		return
	}

	c.JSON(http.StatusOK, result)
}

func (h *Handler) handleAdminCreateWatchlist(c *gin.Context) {
	var payload WatchlistItem
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求参数无效"})
		return
	}
	if strings.TrimSpace(payload.DocumentNum) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "证件号码不能为空"})
		return
	}

	if err := h.service.CreateWatchlist(c.Request.Context(), payload); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "新增高风险名单失败"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ok"})
}

func (h *Handler) handleAdminUpdateWatchlist(c *gin.Context) {
	id, ok := parseUintParam(c, "id")
	if !ok {
		return
	}

	var payload WatchlistItem
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求参数无效"})
		return
	}
	if strings.TrimSpace(payload.DocumentNum) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "证件号码不能为空"})
		return
	}

	if err := h.service.UpdateWatchlist(c.Request.Context(), id, payload); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "更新高风险名单失败"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ok"})
}

func (h *Handler) handleAdminDeleteWatchlist(c *gin.Context) {
	id, ok := parseUintParam(c, "id")
	if !ok {
		return
	}

	if err := h.service.DeleteWatchlist(c.Request.Context(), id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "删除高风险名单失败"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "ok"})
}

func parseListLimit(c *gin.Context) int {
	limit := 20
	if rawLimit := strings.TrimSpace(c.Query("limit")); rawLimit != "" {
		parsedLimit, err := strconv.Atoi(rawLimit)
		if err == nil && parsedLimit > 0 {
			if parsedLimit > 500 {
				parsedLimit = 500
			}
			limit = parsedLimit
		}
	}
	return limit
}

func parseUintParam(c *gin.Context, key string) (uint64, bool) {
	value := strings.TrimSpace(c.Param(key))
	id, err := strconv.ParseUint(value, 10, 64)
	if err != nil || id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "ID 参数无效"})
		return 0, false
	}
	return id, true
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
