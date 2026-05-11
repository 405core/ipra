package profile

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"ipra/backend/internal/auth"
	"ipra/backend/internal/config"
	"ipra/backend/internal/sensitive"
)

const maxImportFileSize = 20 << 20

type Handler struct {
	service   *Service
	ocr       *IDCardOCRClient
	sensitive *sensitive.Manager
}

func NewHandler(db *gorm.DB, ocrConfig config.OCRConfig) *Handler {
	return &Handler{
		service: NewService(db),
		ocr:     NewIDCardOCRClient(ocrConfig),
	}
}

func (h *Handler) SetSensitiveManager(manager *sensitive.Manager) {
	if h == nil {
		return
	}
	h.sensitive = manager
}

func (h *Handler) Register(r gin.IRouter, authMiddleware gin.HandlerFunc) {
	group := r.Group("/api/passenger-profiles")
	if authMiddleware != nil {
		group.Use(authMiddleware)
	}

	group.GET("", h.handleSearch)
	group.GET("/protected", h.handleProtectedSearch)
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
	adminGroup.GET("/profiles/protected", h.handleAdminProtectedProfiles)
	adminGroup.POST("/profiles", h.handleAdminCreateProfile)
	adminGroup.PUT("/profiles/:id", h.handleAdminUpdateProfile)
	adminGroup.DELETE("/profiles/:id", h.handleAdminDeleteProfile)

	adminGroup.GET("/watchlist", h.handleAdminListWatchlist)
	adminGroup.GET("/watchlist/protected", h.handleAdminProtectedWatchlist)
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

func (h *Handler) handleProtectedSearch(c *gin.Context) {
	if h.sensitive == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"message": "敏感图片服务未启用"})
		return
	}

	claims, ok := auth.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	profiles, err := h.service.SearchProfilesByDocumentExact(c.Request.Context(), c.Query("query"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询旅客画像失败"})
		return
	}

	items := make([]sensitive.ListItem, 0, len(profiles))
	for _, profile := range profiles {
		items = append(items, sensitive.ListItem{
			ID:          strconv.FormatUint(profile.ID, 10),
			Asset:       h.putProfileAsset(c, claims, profile, sensitive.PresetDetail, "home:data"),
			DetailAsset: h.putProfileAsset(c, claims, profile, sensitive.PresetDetail, "home:data:detail"),
			Actions:     []string{"open-ask"},
		})
	}

	c.JSON(http.StatusOK, sensitive.ListResponse{
		Items:    items,
		Total:    int64(len(items)),
		Page:     1,
		PageSize: len(items),
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

func (h *Handler) handleAdminProtectedProfiles(c *gin.Context) {
	if h.sensitive == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"message": "敏感图片服务未启用"})
		return
	}

	claims, ok := auth.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	limit := parseListLimit(c)
	result, err := h.service.ListProfiles(c.Request.Context(), c.Query("query"), limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询基础画像失败"})
		return
	}

	items := make([]sensitive.ListItem, 0, len(result.Items))
	for _, profile := range result.Items {
		items = append(items, sensitive.ListItem{
			ID:          strconv.FormatUint(profile.ID, 10),
			Asset:       h.putProfileAsset(c, claims, profile, sensitive.PresetList, "admin:profiles"),
			DetailAsset: h.putProfileAsset(c, claims, profile, sensitive.PresetDialog, "admin:profiles:detail"),
			Actions:     []string{"edit", "delete"},
		})
	}

	c.JSON(http.StatusOK, sensitive.ListResponse{
		Items:    items,
		Total:    result.Total,
		Page:     1,
		PageSize: len(items),
	})
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

func (h *Handler) handleAdminProtectedWatchlist(c *gin.Context) {
	if h.sensitive == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"message": "敏感图片服务未启用"})
		return
	}

	claims, ok := auth.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	limit := parseListLimit(c)
	result, err := h.service.ListWatchlist(c.Request.Context(), c.Query("query"), limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询高风险名单失败"})
		return
	}

	items := make([]sensitive.ListItem, 0, len(result.Items))
	for _, item := range result.Items {
		items = append(items, sensitive.ListItem{
			ID:          strconv.FormatUint(item.ID, 10),
			Asset:       h.putWatchlistAsset(c, claims, item, sensitive.PresetList, "admin:watchlist"),
			DetailAsset: h.putWatchlistAsset(c, claims, item, sensitive.PresetDialog, "admin:watchlist:detail"),
			Actions:     []string{"edit", "delete"},
		})
	}

	c.JSON(http.StatusOK, sensitive.ListResponse{
		Items:    items,
		Total:    result.Total,
		Page:     1,
		PageSize: len(items),
	})
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

func (h *Handler) putProfileAsset(
	c *gin.Context,
	claims auth.Claims,
	profile SearchProfileResponse,
	preset sensitive.RenderPreset,
	page string,
) sensitive.AssetRef {
	document := sensitive.Document{
		Eyebrow:  "",
		Title:    firstNonEmptyText(strings.TrimSpace(profile.FullName), "旅客画像"),
		Subtitle: "证件号 " + firstNonEmptyText(strings.TrimSpace(profile.DocumentNum), "-"),
		Tags: compactStrings([]string{
			formatRiskTag(profile.IsHighRisk),
			formatProfileFieldLabel("证件类型", profileField(profile, "basicInfo", "documentType")),
			formatProfileFieldLabel("性别", profileField(profile, "basicInfo", "gender")),
			formatProfileFieldLabel("国籍", profileField(profile, "basicInfo", "nationality")),
		}),
		Sections: []sensitive.Section{
			{
				Heading: "基本信息",
				Lines: compactStrings([]string{
					formatProfileFieldLabel("姓名", profile.FullName),
					formatProfileFieldLabel("证件号码", profile.DocumentNum),
					formatProfileFieldLabel("出生日期", profileField(profile, "basicInfo", "birthDate")),
					formatProfileFieldLabel("联系电话", profileField(profile, "basicInfo", "phone")),
				}),
			},
			{
				Heading: "行程信息",
				Lines: compactStrings([]string{
					formatProfileFieldLabel("PNR", profileField(profile, "tripInfo", "pnr")),
					formatProfileFieldLabel("航班号", profileField(profile, "tripInfo", "flightNo")),
					formatProfileFieldLabel("目的地", profileField(profile, "tripInfo", "destination")),
					formatProfileFieldLabel("申报目的", profileField(profile, "tripInfo", "purposeDeclared")),
				}),
			},
			{
				Heading: "职业与风险",
				Lines: compactStrings([]string{
					formatProfileFieldLabel("职业", profileField(profile, "occupation", "occupation")),
					formatProfileFieldLabel("单位", profileField(profile, "occupation", "company")),
					formatProfileFieldLabel("高风险原因", profile.RiskReason),
					formatProfileFieldLabel("风险标签", strings.Join(profileStringSlice(profile, "riskInfo", "riskTags"), "、")),
					formatProfileFieldLabel("违法犯罪记录", profileField(profile, "riskInfo", "criminalRecord")),
					formatProfileFieldLabel("备注", profileField(profile, "riskInfo", "note")),
				}),
			},
		},
		Footer: []string{
			"更新时间 " + formatTime(profile.UpdatedAt),
		},
	}

	return h.sensitive.Put(
		claims.UserID,
		document,
		preset,
		selectFormat(preset),
		buildWatermarkContext(c, claims, page),
	)
}

func (h *Handler) putWatchlistAsset(
	c *gin.Context,
	claims auth.Claims,
	item WatchlistItem,
	preset sensitive.RenderPreset,
	page string,
) sensitive.AssetRef {
	document := sensitive.Document{
		Eyebrow:  "高风险名单",
		Title:    "名单命中记录",
		Subtitle: "证件号 " + firstNonEmptyText(strings.TrimSpace(item.DocumentNum), "-"),
		Tags:     []string{"高风险预警"},
		Sections: []sensitive.Section{
			{
				Heading: "名单信息",
				Lines: compactStrings([]string{
					formatProfileFieldLabel("证件号码", item.DocumentNum),
					formatProfileFieldLabel("命中原因", item.RiskReason),
				}),
			},
		},
		Footer: []string{
			"更新时间 " + formatTime(item.UpdatedAt),
		},
	}

	return h.sensitive.Put(
		claims.UserID,
		document,
		preset,
		selectFormat(preset),
		buildWatermarkContext(c, claims, page),
	)
}

func buildWatermarkContext(c *gin.Context, claims auth.Claims, page string) sensitive.WatermarkContext {
	return sensitive.NewWatermarkContext(
		strings.TrimSpace(claims.WorkID),
		strings.TrimSpace(claims.Name),
		strings.TrimSpace(claims.Role),
		strings.TrimSpace(c.ClientIP()),
		c.Request.Method+" "+firstNonEmptyText(c.FullPath(), c.Request.URL.Path),
		page,
	)
}

func selectFormat(preset sensitive.RenderPreset) sensitive.RenderFormat {
	if preset == sensitive.PresetDialog {
		return sensitive.FormatPNG
	}
	return sensitive.FormatWebP
}

func formatRiskTag(highRisk bool) string {
	if highRisk {
		return "高风险预警"
	}
	return "基础画像"
}

func profileField(profile SearchProfileResponse, section string, field string) string {
	sectionMap, ok := profile.ProfileData[section].(map[string]any)
	if !ok {
		return ""
	}
	return strings.TrimSpace(stringifyValue(sectionMap[field]))
}

func profileStringSlice(profile SearchProfileResponse, section string, field string) []string {
	sectionMap, ok := profile.ProfileData[section].(map[string]any)
	if !ok {
		return nil
	}
	rawValues, ok := sectionMap[field].([]any)
	if !ok {
		return nil
	}
	result := make([]string, 0, len(rawValues))
	for _, raw := range rawValues {
		if value := strings.TrimSpace(stringifyValue(raw)); value != "" {
			result = append(result, value)
		}
	}
	return result
}

func stringifyValue(value any) string {
	switch typed := value.(type) {
	case string:
		return typed
	case nil:
		return ""
	default:
		payload, err := json.Marshal(typed)
		if err != nil {
			return ""
		}
		return string(payload)
	}
}

func compactStrings(values []string) []string {
	result := make([]string, 0, len(values))
	for _, value := range values {
		if trimmed := strings.TrimSpace(value); trimmed != "" {
			result = append(result, trimmed)
		}
	}
	return result
}

func formatProfileFieldLabel(label string, value string) string {
	value = strings.TrimSpace(value)
	if value == "" {
		return ""
	}
	return label + "：" + value
}

func formatTime(value time.Time) string {
	if value.IsZero() {
		return "-"
	}
	return value.Local().Format("2006-01-02 15:04:05")
}

func firstNonEmptyText(values ...string) string {
	for _, value := range values {
		if trimmed := strings.TrimSpace(value); trimmed != "" {
			return trimmed
		}
	}
	return ""
}
