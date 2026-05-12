package profile

import (
	"encoding/json"
	"errors"
	"fmt"
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

func (h *Handler) Service() *Service {
	if h == nil {
		return nil
	}
	return h.service
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
	group.GET("/:id/protected", h.handleProtectedProfileByID)
	group.POST("/imports", h.handleImport)
	group.GET("/imports/:id/protected", h.handleProtectedImportDetail)
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
	adminGroup.GET("/profiles/:id", h.handleAdminGetProfile)
	adminGroup.POST("/profiles", h.handleAdminCreateProfile)
	adminGroup.PUT("/profiles/:id", h.handleAdminUpdateProfile)
	adminGroup.DELETE("/profiles/:id", h.handleAdminDeleteProfile)

	adminGroup.GET("/watchlist", h.handleAdminListWatchlist)
	adminGroup.GET("/watchlist/protected", h.handleAdminProtectedWatchlist)
	adminGroup.GET("/watchlist/:id", h.handleAdminGetWatchlist)
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
		items = append(items, h.buildProtectedProfileListItem(c, claims, profile, "home:data"))
	}

	c.JSON(http.StatusOK, sensitive.ListResponse{
		Items:    items,
		Total:    int64(len(items)),
		Page:     1,
		PageSize: len(items),
	})
}

func (h *Handler) buildProtectedProfileSearchResponse(
	c *gin.Context,
	claims auth.Claims,
	query string,
) (sensitive.ListResponse, error) {
	profiles, err := h.service.SearchProfilesByDocumentExact(c.Request.Context(), query)
	if err != nil {
		return sensitive.ListResponse{}, err
	}

	items := make([]sensitive.ListItem, 0, len(profiles))
	for _, profile := range profiles {
		items = append(items, h.buildProtectedProfileListItem(c, claims, profile, "home:data"))
	}

	return sensitive.ListResponse{
		Items:    items,
		Total:    int64(len(items)),
		Page:     1,
		PageSize: len(items),
	}, nil
}

func (h *Handler) handleProtectedProfileByID(c *gin.Context) {
	if h.sensitive == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"message": "敏感图片服务未启用"})
		return
	}

	claims, ok := auth.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	id, ok := parseUintParam(c, "id")
	if !ok {
		return
	}

	profileRecord, err := h.service.GetProfileByID(c.Request.Context(), id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"message": "旅客画像不存在"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询旅客画像失败"})
		return
	}

	item := h.buildProtectedProfileListItem(c, claims, profileRecord, "home:ask:profile")
	c.JSON(http.StatusOK, item)
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
	if err != nil && !errors.Is(err, ErrImportValidation) {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "导入旅客画像失败"})
		return
	}

	response := gin.H{
		"batchId":      result.BatchID,
		"batchNo":      result.BatchNo,
		"status":       result.Status,
		"totalRows":    result.TotalRows,
		"successCount": result.SuccessCount,
		"failedCount":  result.FailedCount,
	}
	if h.sensitive != nil && result.FailedCount > 0 {
		response["detailAsset"] = h.putImportDetailAsset(
			c,
			claims,
			result,
			"home:import:detail",
		)
	}
	c.JSON(http.StatusOK, response)
}

func (h *Handler) handleProtectedImportDetail(c *gin.Context) {
	if h.sensitive == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"message": "敏感图片服务未启用"})
		return
	}

	claims, ok := auth.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	id, ok := parseUintParam(c, "id")
	if !ok {
		return
	}

	detail, err := h.service.GetImportBatchDetail(c.Request.Context(), id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"message": "导入批次不存在"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"message": "读取导入明细失败"})
		return
	}

	c.JSON(http.StatusOK, sensitive.DetailResponse{
		ID: strconv.FormatUint(detail.BatchID, 10),
		Asset: h.putImportBatchDetailAsset(
			c,
			claims,
			detail,
			"home:import:detail",
		),
	})
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
		item := h.buildProtectedProfileListItem(c, claims, profile, "admin:profiles")
		item.Actions = []string{"edit", "delete"}
		items = append(items, item)
	}

	c.JSON(http.StatusOK, sensitive.ListResponse{
		Items:    items,
		Total:    result.Total,
		Page:     1,
		PageSize: len(items),
	})
}

func (h *Handler) handleAdminGetProfile(c *gin.Context) {
	id, ok := parseUintParam(c, "id")
	if !ok {
		return
	}

	result, err := h.service.ListProfiles(c.Request.Context(), "", 500)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询基础画像失败"})
		return
	}

	for _, item := range result.Items {
		if item.ID == id {
			c.JSON(http.StatusOK, item)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"message": "基础画像不存在"})
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
		items = append(items, h.buildProtectedWatchlistItem(c, claims, item, "admin:watchlist"))
	}

	c.JSON(http.StatusOK, sensitive.ListResponse{
		Items:    items,
		Total:    result.Total,
		Page:     1,
		PageSize: len(items),
	})
}

func (h *Handler) handleAdminGetWatchlist(c *gin.Context) {
	id, ok := parseUintParam(c, "id")
	if !ok {
		return
	}

	result, err := h.service.ListWatchlist(c.Request.Context(), "", 500)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询高风险名单失败"})
		return
	}

	for _, item := range result.Items {
		if item.ID == id {
			c.JSON(http.StatusOK, item)
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"message": "高风险名单不存在"})
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
	riskTags := profileStringSlice(profile, "riskInfo", "riskTags")
	documentType := formatDocumentTypeLabel(profileField(profile, "basicInfo", "documentType"))
	gender := formatGenderLabel(profileField(profile, "basicInfo", "gender"))
	title := firstNonEmptyText(strings.TrimSpace(profile.FullName), "旅客画像")
	subtitle := ""
	sections := make([]sensitive.Section, 0, 3)
	factItems := []sensitive.FactItem{}
	tagItems := []sensitive.TagItem{}
	metaItems := make([]sensitive.TagItem, 0, len(riskTags)+4)
	footerTags := []sensitive.TagItem{}

	if preset == sensitive.PresetList || preset == sensitive.PresetCompactList {
		if preset == sensitive.PresetCompactList {
			subtitle = buildProfileCompactSubtitle(profile)
		} else {
			subtitle = buildProfileListSubtitle(profile)
		}
		if documentType != "" {
			tagItems = append(tagItems, sensitive.TagItem{
				Text: documentType,
				Tone: sensitive.TagToneDefault,
			})
		}
		if gender != "" {
			tagItems = append(tagItems, sensitive.TagItem{
				Text: gender,
				Tone: sensitive.TagToneDefault,
			})
		}
		tagItems = append(tagItems, sensitive.TagItem{
			Text: profile.DocumentNum,
			Tone: sensitive.TagToneIdentity,
		})
		if preset == sensitive.PresetCompactList {
			tagItems = append(tagItems, buildProfileCompactStatusTags(profile, riskTags)...)
			factItems = buildProfileCompactFactItems(profile)
			metaItems = append(metaItems, buildCompactProfileMetaItems(profile)...)
			footerTags = append(footerTags, buildProfileCompactFooterTags(profile)...)
		} else {
			if profile.IsHighRisk {
				metaItems = append(metaItems, sensitive.TagItem{
					Text: formatRiskTag(profile.IsHighRisk),
					Tone: sensitive.TagToneAlert,
				})
			}
			if profile.ID == 0 {
				metaItems = append(metaItems, sensitive.TagItem{
					Text: "基础画像未导入",
					Tone: sensitive.TagToneWarning,
				})
			}
			metaItems = append(metaItems, buildRiskTagItems(riskTags, sensitive.TagToneAccent)...)
			factItems = buildProfileFactItems(profile)
			sections = append(sections, buildProfileListSections(profile)...)
		}
	} else {
		subtitle = "证件号 " + firstNonEmptyText(strings.TrimSpace(profile.DocumentNum), "-")
		tagItems = append(tagItems, sensitive.TagItem{
			Text: formatRiskTag(profile.IsHighRisk),
			Tone: profileRiskTone(profile.IsHighRisk),
		})
		if documentType != "" {
			tagItems = append(tagItems, sensitive.TagItem{
				Text: documentType,
				Tone: sensitive.TagToneDefault,
			})
		}
		if gender != "" {
			tagItems = append(tagItems, sensitive.TagItem{
				Text: gender,
				Tone: sensitive.TagToneDefault,
			})
		}
		if profile.ID == 0 {
			metaItems = append(metaItems, sensitive.TagItem{
				Text: "基础画像未导入",
				Tone: sensitive.TagToneWarning,
			})
		}
		metaItems = append(metaItems, buildRiskTagItems(riskTags, sensitive.TagToneAccent)...)
		metaItems = append(metaItems, buildProfileNoteTagItems(profile)...)

		if riskLines := compactStrings([]string{
			formatProfileFieldLabel("高风险原因", profile.RiskReason),
			formatProfileFieldLabel("违法犯罪记录", profileField(profile, "riskInfo", "criminalRecord")),
			formatProfileFieldLabel("备注", profileField(profile, "riskInfo", "note")),
		}); len(riskLines) > 0 {
			sections = append(sections, sensitive.Section{
				Heading: "风险说明",
				Lines:   riskLines,
			})
		}
	}

	document := sensitive.Document{
		Eyebrow:    "",
		Title:      title,
		Subtitle:   subtitle,
		TagItems:   tagItems,
		FactItems:  factItems,
		MetaItems:  metaItems,
		FooterTags: footerTags,
		Sections:   sections,
	}

	if preset == sensitive.PresetCompactList {
		document.Footer = nil
	} else {
		document.Footer = []string{
			"更新时间 " + formatTime(profile.UpdatedAt),
		}
	}

	return h.sensitive.Put(
		claims.UserID,
		document,
		preset,
		selectFormat(preset),
		buildWatermarkContext(c, claims, page),
	)
}

func (h *Handler) buildProtectedProfileListItem(
	c *gin.Context,
	claims auth.Claims,
	profile SearchProfileResponse,
	page string,
) sensitive.ListItem {
	riskTags := compactStrings(profileStringSlice(profile, "riskInfo", "riskTags"))
	chips := make([]sensitive.FieldRef, 0, 8)

	if documentType := formatDocumentTypeLabel(profileField(profile, "basicInfo", "documentType")); documentType != "" {
		chips = append(chips, h.putInlineFieldAsset(c, claims, "documentType", documentType, sensitive.TagToneDefault, page+":chip"))
	}
	if gender := formatGenderLabel(profileField(profile, "basicInfo", "gender")); gender != "" {
		chips = append(chips, h.putInlineFieldAsset(c, claims, "gender", gender, sensitive.TagToneDefault, page+":chip"))
	}
	chips = append(chips, h.putInlineFieldAsset(
		c,
		claims,
		"documentNum",
		firstNonEmptyText(strings.TrimSpace(profile.DocumentNum), "未填证件号"),
		sensitive.TagToneIdentity,
		page+":chip",
	))
	if profile.IsHighRisk {
		chips = append(chips, h.putInlineFieldAsset(c, claims, "highRisk", "高风险预警", sensitive.TagToneAlert, page+":chip"))
	}
	if profile.ID == 0 {
		chips = append(chips, h.putInlineFieldAsset(c, claims, "imported", "基础画像未导入", sensitive.TagToneWarning, page+":chip"))
	}

	notes := make([]sensitive.FieldRef, 0, 6)
	if value := strings.TrimSpace(profile.RiskReason); value != "" {
		notes = append(notes, h.putInlineFieldAsset(c, claims, "riskReason", value, sensitive.TagToneAlert, page+":note"))
	}
	if value := strings.TrimSpace(profileField(profile, "riskInfo", "criminalRecord")); value != "" {
		notes = append(notes, h.putInlineFieldAsset(c, claims, "criminalRecord", value, sensitive.TagToneMuted, page+":note"))
	}
	if value := strings.TrimSpace(profileField(profile, "riskInfo", "note")); value != "" {
		notes = append(notes, h.putInlineFieldAsset(c, claims, "note", value, sensitive.TagToneMuted, page+":note"))
	}

	meta := make([]sensitive.FieldRef, 0, len(riskTags))
	for _, value := range riskTags {
		meta = append(meta, h.putInlineFieldAsset(c, claims, "riskTag", value, sensitive.TagToneAccent, page+":meta"))
	}

	return sensitive.ListItem{
		ID:          strconv.FormatUint(profile.ID, 10),
		Asset:       h.putProfileAsset(c, claims, profile, sensitive.PresetList, page),
		DetailAsset: h.putProfileAsset(c, claims, profile, sensitive.PresetDialog, page+":detail"),
		Actions:     []string{"open-ask"},
		Kind:        "profile",
		Fields: []sensitive.FieldRef{
			h.putInlineFieldAsset(
				c,
				claims,
				"fullName",
				firstNonEmptyText(strings.TrimSpace(profile.FullName), "旅客画像"),
				sensitive.TagToneDefault,
				page+":field",
			),
		},
		Chips: chips,
		Facts: h.buildProtectedProfileFacts(c, claims, profile, page+":fact"),
		Meta:  meta,
		Notes: notes,
		Flags: map[string]bool{
			"isHighRisk": profile.IsHighRisk,
			"isImported": profile.ID != 0,
		},
	}
}

func (h *Handler) buildProtectedProfileFacts(
	c *gin.Context,
	claims auth.Claims,
	profile SearchProfileResponse,
	page string,
) []sensitive.FactRef {
	facts := buildProfileFactItems(profile)
	result := make([]sensitive.FactRef, 0, len(facts))
	for _, fact := range facts {
		result = append(result, sensitive.FactRef{
			Key:   fact.Label,
			Label: fact.Label,
			Asset: h.putInlineTextAsset(c, claims, fact.Value, page),
		})
	}
	return result
}

func (h *Handler) putInlineFieldAsset(
	c *gin.Context,
	claims auth.Claims,
	key string,
	value string,
	tone sensitive.TagTone,
	page string,
) sensitive.FieldRef {
	return sensitive.FieldRef{
		Key:   key,
		Asset: h.putInlineTextAsset(c, claims, value, page),
		Tone:  tone,
	}
}

func (h *Handler) putInlineTextAsset(
	c *gin.Context,
	claims auth.Claims,
	value string,
	page string,
) sensitive.AssetRef {
	document := sensitive.Document{
		Title: firstNonEmptyText(strings.TrimSpace(value), "-"),
	}

	return h.sensitive.PutWithStyle(
		claims.UserID,
		document,
		sensitive.PresetInline,
		sensitive.FormatWebP,
		sensitive.RenderStyle{
			Transparent: true,
			HideAccent:  true,
		},
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
		Title:    firstNonEmptyText(strings.TrimSpace(item.DocumentNum), "名单命中记录"),
		Subtitle: firstNonEmptyText(strings.TrimSpace(item.RiskReason), "高风险名单命中"),
		TagItems: []sensitive.TagItem{
			{Text: "高风险预警", Tone: sensitive.TagToneAlert},
		},
		Sections: []sensitive.Section{
			{
				Heading: "命中原因",
				Lines: compactStrings([]string{
					firstNonEmptyText(strings.TrimSpace(item.RiskReason), "高风险名单命中"),
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

func (h *Handler) buildProtectedWatchlistItem(
	c *gin.Context,
	claims auth.Claims,
	item WatchlistItem,
	page string,
) sensitive.ListItem {
	result := sensitive.ListItem{
		ID:          strconv.FormatUint(item.ID, 10),
		Asset:       h.putWatchlistAsset(c, claims, item, sensitive.PresetList, page),
		DetailAsset: h.putWatchlistAsset(c, claims, item, sensitive.PresetDialog, page+":detail"),
		Actions:     []string{"edit", "delete"},
		Kind:        "watchlist",
		Fields: []sensitive.FieldRef{
			h.putInlineFieldAsset(
				c,
				claims,
				"documentNum",
				firstNonEmptyText(strings.TrimSpace(item.DocumentNum), "-"),
				sensitive.TagToneIdentity,
				page+":field",
			),
		},
		Chips: []sensitive.FieldRef{
			h.putInlineFieldAsset(c, claims, "status", "高风险预警", sensitive.TagToneAlert, page+":chip"),
		},
		Notes: []sensitive.FieldRef{
			h.putInlineFieldAsset(
				c,
				claims,
				"riskReason",
				firstNonEmptyText(strings.TrimSpace(item.RiskReason), "高风险名单命中"),
				sensitive.TagToneAlert,
				page+":note",
			),
		},
		Flags: map[string]bool{
			"isHighRisk": true,
		},
	}

	if updatedAt := formatTime(item.UpdatedAt); updatedAt != "" {
		result.Meta = []sensitive.FieldRef{
			h.putInlineFieldAsset(c, claims, "updatedAt", "更新时间 "+updatedAt, sensitive.TagToneMuted, page+":meta"),
		}
	}

	return result
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

func formatProfileTag(label string, value string) string {
	value = strings.TrimSpace(value)
	if value == "" {
		return ""
	}
	if strings.TrimSpace(label) == "" {
		return value
	}
	return label + " " + value
}

func profileRiskTone(highRisk bool) sensitive.TagTone {
	if highRisk {
		return sensitive.TagToneAlert
	}
	return sensitive.TagToneAccent
}

func buildProfileFactItems(profile SearchProfileResponse) []sensitive.FactItem {
	profileData := profile.ProfileData
	basicInfo, _ := profileData["basicInfo"].(map[string]any)
	tripInfo, _ := profileData["tripInfo"].(map[string]any)
	occupation, _ := profileData["occupation"].(map[string]any)

	return compactFactItems([]sensitive.FactItem{
		{Label: "国籍", Value: strings.TrimSpace(stringifyValue(basicInfo["nationality"]))},
		{Label: "出生", Value: strings.TrimSpace(stringifyValue(basicInfo["birthDate"]))},
		{Label: "电话", Value: strings.TrimSpace(stringifyValue(basicInfo["phone"]))},
		{Label: "PNR", Value: strings.TrimSpace(stringifyValue(tripInfo["pnr"]))},
		{Label: "航班", Value: strings.TrimSpace(stringifyValue(tripInfo["flightNo"]))},
		{Label: "出发地", Value: strings.TrimSpace(stringifyValue(tripInfo["origin"]))},
		{Label: "目的地", Value: strings.TrimSpace(stringifyValue(tripInfo["destination"]))},
		{Label: "目的", Value: strings.TrimSpace(stringifyValue(tripInfo["purposeDeclared"]))},
		{Label: "职业", Value: strings.TrimSpace(stringifyValue(occupation["occupation"]))},
		{Label: "单位", Value: strings.TrimSpace(stringifyValue(occupation["company"]))},
	})
}

func buildProfileMetaItems(profile SearchProfileResponse) []sensitive.TagItem {
	items := []sensitive.TagItem{}
	for _, value := range compactStrings([]string{
		formatProfileTag("国籍", profileField(profile, "basicInfo", "nationality")),
		formatProfileTag("出生", profileField(profile, "basicInfo", "birthDate")),
		formatProfileTag("电话", profileField(profile, "basicInfo", "phone")),
		formatProfileTag("PNR", profileField(profile, "tripInfo", "pnr")),
		formatProfileTag("航班", profileField(profile, "tripInfo", "flightNo")),
		formatProfileTag("目的地", profileField(profile, "tripInfo", "destination")),
		formatProfileTag("申报目的", profileField(profile, "tripInfo", "purposeDeclared")),
		formatProfileTag("职业", profileField(profile, "occupation", "occupation")),
		buildRouteTag(profile),
	}) {
		items = append(items, sensitive.TagItem{Text: value, Tone: sensitive.TagToneAccent})
	}
	return items
}

func buildProfileListSubtitle(profile SearchProfileResponse) string {
	values := compactStrings([]string{
		buildExplicitRouteValue(profile),
		profileField(profile, "tripInfo", "destination"),
		profileField(profile, "tripInfo", "purposeDeclared"),
		profileField(profile, "occupation", "occupation"),
		profileField(profile, "occupation", "company"),
	})
	if len(values) > 4 {
		values = values[:4]
	}
	return strings.Join(values, " · ")
}

func buildProfileCompactSubtitle(profile SearchProfileResponse) string {
	return ""
}

func buildProfileListSections(profile SearchProfileResponse) []sensitive.Section {
	sections := make([]sensitive.Section, 0, 2)

	tripLines := compactStrings([]string{
		formatProfileFieldLabel("完整行程", buildExplicitRouteValue(profile)),
		formatProfileFieldLabel("出发地", profileField(profile, "tripInfo", "origin")),
	})
	if len(tripLines) > 0 {
		sections = append(sections, sensitive.Section{
			Heading: "行程说明",
			Lines:   tripLines,
		})
	}

	riskLines := compactStrings([]string{
		formatProfileFieldLabel("高风险原因", profile.RiskReason),
		formatProfileFieldLabel("违法犯罪记录", profileField(profile, "riskInfo", "criminalRecord")),
		formatProfileFieldLabel("备注", profileField(profile, "riskInfo", "note")),
	})
	if len(riskLines) > 0 {
		sections = append(sections, sensitive.Section{
			Heading: "风险说明",
			Lines:   riskLines,
		})
	}

	return sections
}

func buildProfileCompactFactItems(profile SearchProfileResponse) []sensitive.FactItem {
	return compactFactItems([]sensitive.FactItem{
		{Label: "国籍", Value: profileField(profile, "basicInfo", "nationality")},
		{Label: "航班", Value: profileField(profile, "tripInfo", "flightNo")},
		{Label: "行程", Value: buildRouteValue(profile)},
		{Label: "目的", Value: profileField(profile, "tripInfo", "purposeDeclared")},
		{Label: "职业 / 单位", Value: buildOccupationValue(profile)},
	})
}

func buildCompactProfileMetaItems(profile SearchProfileResponse) []sensitive.TagItem {
	return nil
}

func buildProfileCompactFooterTags(profile SearchProfileResponse) []sensitive.TagItem {
	items := []sensitive.TagItem{}

	if value := strings.TrimSpace(profile.RiskReason); value != "" {
		items = append(items, sensitive.TagItem{
			Text: "风险原因 " + value,
			Tone: sensitive.TagToneAlert,
		})
	}
	if value := strings.TrimSpace(profileField(profile, "riskInfo", "criminalRecord")); value != "" {
		items = append(items, sensitive.TagItem{
			Text: "违法记录 " + value,
			Tone: sensitive.TagToneMuted,
		})
	}
	if value := strings.TrimSpace(profileField(profile, "riskInfo", "note")); value != "" {
		items = append(items, sensitive.TagItem{
			Text: "备注 " + value,
			Tone: sensitive.TagToneMuted,
		})
	}

	return items
}

func buildProfileCompactStatusTags(profile SearchProfileResponse, riskTags []string) []sensitive.TagItem {
	items := make([]sensitive.TagItem, 0, 5)

	if profile.IsHighRisk {
		items = append(items, sensitive.TagItem{
			Text: formatRiskTag(profile.IsHighRisk),
			Tone: sensitive.TagToneAlert,
		})
	}
	if profile.ID == 0 {
		items = append(items, sensitive.TagItem{
			Text: "基础画像未导入",
			Tone: sensitive.TagToneWarning,
		})
	}

	for _, value := range compactStrings(riskTags) {
		items = append(items, sensitive.TagItem{
			Text: value,
			Tone: sensitive.TagToneAccent,
		})
		if len(items) >= 5 {
			break
		}
	}

	return items
}

func buildOccupationValue(profile SearchProfileResponse) string {
	return firstNonEmptyText(
		strings.Join(compactStrings([]string{
			profileField(profile, "occupation", "occupation"),
			profileField(profile, "occupation", "company"),
		}), " · "),
	)
}

func buildRiskTagItems(values []string, tone sensitive.TagTone) []sensitive.TagItem {
	items := make([]sensitive.TagItem, 0, len(values))
	for _, value := range compactStrings(values) {
		items = append(items, sensitive.TagItem{Text: value, Tone: tone})
	}
	return items
}

func buildProfileNoteTagItems(profile SearchProfileResponse) []sensitive.TagItem {
	items := make([]sensitive.TagItem, 0, 2)
	if strings.TrimSpace(profileField(profile, "riskInfo", "criminalRecord")) != "" {
		items = append(items, sensitive.TagItem{
			Text: "违法犯罪记录",
			Tone: sensitive.TagToneMuted,
		})
	}
	if strings.TrimSpace(profileField(profile, "riskInfo", "note")) != "" {
		items = append(items, sensitive.TagItem{
			Text: "备注",
			Tone: sensitive.TagToneMuted,
		})
	}
	return items
}

func compactFactItems(values []sensitive.FactItem) []sensitive.FactItem {
	result := make([]sensitive.FactItem, 0, len(values))
	for _, value := range values {
		if strings.TrimSpace(value.Label) == "" || strings.TrimSpace(value.Value) == "" {
			continue
		}
		result = append(result, sensitive.FactItem{
			Label: strings.TrimSpace(value.Label),
			Value: strings.TrimSpace(value.Value),
		})
	}
	return result
}

func buildRouteValue(profile SearchProfileResponse) string {
	route := profileField(profile, "tripInfo", "route")
	if route != "" {
		return route
	}

	flightNo := profileField(profile, "tripInfo", "flightNo")
	origin := profileField(profile, "tripInfo", "origin")
	destination := profileField(profile, "tripInfo", "destination")

	switch {
	case flightNo != "" && origin != "" && destination != "":
		return flightNo + " " + origin + " -> " + destination
	case origin != "" && destination != "":
		return origin + " -> " + destination
	case destination != "":
		return "目的地 " + destination
	default:
		return ""
	}
}

func buildExplicitRouteValue(profile SearchProfileResponse) string {
	return profileField(profile, "tripInfo", "route")
}

func buildRouteTag(profile SearchProfileResponse) string {
	route := profileField(profile, "tripInfo", "route")
	if route != "" {
		return formatProfileTag("行程", route)
	}

	flightNo := profileField(profile, "tripInfo", "flightNo")
	origin := profileField(profile, "tripInfo", "origin")
	destination := profileField(profile, "tripInfo", "destination")

	switch {
	case flightNo != "" && origin != "" && destination != "":
		return formatProfileTag("行程", flightNo+" "+origin+" -> "+destination)
	case origin != "" && destination != "":
		return formatProfileTag("行程", origin+" -> "+destination)
	case destination != "":
		return formatProfileTag("行程", "目的地 "+destination)
	default:
		return ""
	}
}

func formatDocumentTypeLabel(value string) string {
	switch strings.ToUpper(strings.TrimSpace(value)) {
	case "PASSPORT":
		return "护照"
	case "ID_CARD":
		return "身份证"
	case "HKMTP":
		return "港澳通行证"
	default:
		return strings.TrimSpace(value)
	}
}

func formatGenderLabel(value string) string {
	switch strings.ToLower(strings.TrimSpace(value)) {
	case "male", "m", "1":
		return "男"
	case "female", "f", "2":
		return "女"
	case "unknown", "0":
		return "未知"
	default:
		return strings.TrimSpace(value)
	}
}

func formatTime(value time.Time) string {
	if value.IsZero() {
		return "-"
	}
	return value.Local().Format("2006-01-02 15:04:05")
}

func (h *Handler) putImportDetailAsset(
	c *gin.Context,
	claims auth.Claims,
	result ImportResult,
	page string,
) sensitive.AssetRef {
	detail := ImportBatchDetail{
		BatchID:      result.BatchID,
		BatchNo:      result.BatchNo,
		Status:       result.Status,
		TotalRows:    result.TotalRows,
		SuccessCount: result.SuccessCount,
		FailedCount:  result.FailedCount,
		ErrorDetails: result.ErrorDetails,
	}
	return h.putImportBatchDetailAsset(c, claims, detail, page)
}

func (h *Handler) putImportBatchDetailAsset(
	c *gin.Context,
	claims auth.Claims,
	detail ImportBatchDetail,
	page string,
) sensitive.AssetRef {
	lines := make([]string, 0, len(detail.ErrorDetails)*4+6)
	lines = append(lines,
		"批次号 "+firstNonEmptyText(detail.BatchNo, "-"),
		"状态 "+firstNonEmptyText(detail.Status, "-"),
		fmt.Sprintf("总行数 %d，成功 %d，失败 %d", detail.TotalRows, detail.SuccessCount, detail.FailedCount),
	)
	for _, item := range detail.ErrorDetails {
		lines = append(lines, fmt.Sprintf("第 %d 行 [%s] %s", item.RowNo, firstNonEmptyText(item.ErrorCode, "-"), firstNonEmptyText(item.Message, "校验失败")))
		for key, value := range item.RawData {
			if strings.TrimSpace(value) == "" {
				continue
			}
			lines = append(lines, fmt.Sprintf("%s：%s", strings.TrimSpace(key), strings.TrimSpace(value)))
		}
	}
	if len(lines) == 0 {
		lines = append(lines, "当前批次没有可展示的失败明细。")
	}

	document := sensitive.Document{
		Eyebrow:  "批量导入",
		Title:    "导入结果明细",
		Subtitle: firstNonEmptyText(detail.FileName, detail.ImportType, "导入批次"),
		Sections: []sensitive.Section{
			{
				Heading: "失败明细",
				Lines:   lines,
			},
		},
	}

	return h.sensitive.Put(
		claims.UserID,
		document,
		sensitive.PresetDialog,
		sensitive.FormatPNG,
		buildWatermarkContext(c, claims, page),
	)
}

func firstNonEmptyText(values ...string) string {
	for _, value := range values {
		if trimmed := strings.TrimSpace(value); trimmed != "" {
			return trimmed
		}
	}
	return ""
}
