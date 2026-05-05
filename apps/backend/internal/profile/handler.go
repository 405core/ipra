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
)

const maxImportFileSize = 20 << 20

type Handler struct {
	service *Service
}

func NewHandler(db *gorm.DB) *Handler {
	return &Handler{
		service: NewService(db),
	}
}

func (h *Handler) Register(r gin.IRouter, authMiddleware gin.HandlerFunc) {
	group := r.Group("/api/passenger-profiles")
	if authMiddleware != nil {
		group.Use(authMiddleware)
	}

	group.GET("", h.handleSearch)
	group.POST("/imports", h.handleImport)
}

func (h *Handler) handleSearch(c *gin.Context) {
	limit := 20
	if rawLimit := strings.TrimSpace(c.Query("limit")); rawLimit != "" {
		parsedLimit, err := strconv.Atoi(rawLimit)
		if err != nil || parsedLimit <= 0 {
			c.JSON(http.StatusBadRequest, gin.H{"message": "limit 参数无效"})
			return
		}
		if parsedLimit > 50 {
			parsedLimit = 50
		}
		limit = parsedLimit
	}

	profiles, err := h.service.SearchProfiles(c.Request.Context(), c.Query("query"), limit)
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

	importType, valid := normalizeImportType(c.PostForm("importType"))
	if !valid {
		c.JSON(http.StatusBadRequest, gin.H{"message": "importType 仅支持 BASE_PROFILE 或 HIGH_RISK"})
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
