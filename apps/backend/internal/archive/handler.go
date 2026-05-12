package archive

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"
	"time"
	"unicode/utf8"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"ipra/backend/internal/auth"
	"ipra/backend/internal/config"
	dbschema "ipra/backend/internal/database"
)

const (
	defaultListLimit = 100
	maxListLimit     = 500
)

type Handler struct {
	db          *gorm.DB
	storage     objectStorage
	videoBucket string
	now         func() time.Time
}

type createArchiveRequest struct {
	SessionID            string                `json:"sessionId"`
	PassengerDocumentNum string                `json:"passengerDocumentNum"`
	FinalJudgement       string                `json:"finalJudgement"`
	JudgementReason      string                `json:"judgementReason"`
	TotalDurationSeconds int                   `json:"totalDurationSeconds"`
	TranscriptCount      int                   `json:"transcriptCount"`
	Rounds               []archiveRoundRequest `json:"rounds"`
}

type archiveRoundRequest struct {
	RoundNo            int                   `json:"roundNo"`
	RoundClientID      string                `json:"roundClientId"`
	Title              string                `json:"title"`
	Focus              string                `json:"focus"`
	StrategyNote       string                `json:"strategyNote"`
	Questions          json.RawMessage       `json:"questions"`
	Transcripts        json.RawMessage       `json:"transcripts"`
	AnswerText         string                `json:"answerText"`
	RoundSummary       string                `json:"roundSummary"`
	HumanOmniSummary   string                `json:"humanOmniSummary"`
	ActionObservations json.RawMessage       `json:"actionObservations"`
	RiskHints          json.RawMessage       `json:"riskHints"`
	DurationSeconds    int                   `json:"durationSeconds"`
	StartedAt          *time.Time            `json:"startedAt"`
	EndedAt            *time.Time            `json:"endedAt"`
	Videos             []archiveVideoRequest `json:"videos"`
}

type archiveVideoRequest struct {
	VideoKind           string          `json:"videoKind"`
	WindowID            string          `json:"windowId"`
	QuestionID          string          `json:"questionId"`
	FileName            string          `json:"fileName"`
	ContentType         string          `json:"contentType"`
	SizeBytes           int64           `json:"sizeBytes"`
	Modal               string          `json:"modal"`
	StartSeconds        *float64        `json:"startSeconds"`
	EndSeconds          *float64        `json:"endSeconds"`
	HumanOmniModel      string          `json:"humanOmniModel"`
	HumanOmniRawSummary string          `json:"humanOmniRawSummary"`
}

type listResponse struct {
	Items []archiveListItem `json:"items"`
	Total int64             `json:"total"`
}

type archiveListItem struct {
	ID                   uint64    `json:"id"`
	ArchiveCode          string    `json:"archiveCode"`
	SessionID            string    `json:"sessionId"`
	PassengerDocumentNum string    `json:"passengerDocumentNum"`
	PassengerName        string    `json:"passengerName"`
	OperatorWorkID       string    `json:"operatorWorkId"`
	OperatorName         string    `json:"operatorName"`
	FinalJudgement       string    `json:"finalJudgement"`
	RoundCount           int       `json:"roundCount"`
	TotalDurationSeconds int       `json:"totalDurationSeconds"`
	TranscriptCount      int       `json:"transcriptCount"`
	VideoCount           int64     `json:"videoCount"`
	Status               string    `json:"status"`
	ArchivedAt           time.Time `json:"archivedAt"`
}

type archiveDetailResponse struct {
	dbschema.InquiryArchive
	Rounds []archiveRoundDetail           `json:"rounds"`
	Videos []dbschema.InquiryArchiveVideo `json:"videos"`
}

type archiveRoundDetail struct {
	dbschema.InquiryArchiveRound
	Videos []dbschema.InquiryArchiveVideo `json:"videos"`
}

func NewHandler(db *gorm.DB, minioConfig config.MinIOConfig) *Handler {
	return &Handler{
		db:          db,
		storage:     newMinIOClient(minioConfig),
		videoBucket: strings.TrimSpace(firstNonEmpty(minioConfig.BucketVideo)),
		now:         time.Now,
	}
}

func (h *Handler) Register(r gin.IRouter, authMiddleware gin.HandlerFunc) {
	group := r.Group("/api/inquiry")
	if authMiddleware != nil {
		group.Use(authMiddleware)
	}
	group.POST("/archives", h.handleCreate)
	group.POST("/archive-videos", h.handleUploadVideo)
}

func (h *Handler) RegisterAdminRoutes(r gin.IRouter, authMiddleware gin.HandlerFunc) {
	group := r.Group("/api/admin/inquiry-archives")
	if authMiddleware != nil {
		group.Use(authMiddleware, requireAdminRole())
	}
	group.GET("", h.handleList)
	group.GET("/:id", h.handleGet)
	group.GET("/videos/:id/stream", h.handleStreamVideo)
}

func (h *Handler) handleCreate(c *gin.Context) {
	if h.db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "归档服务未配置数据库"})
		return
	}
	if h.storage == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "归档服务未配置 MinIO"})
		return
	}

	claims, ok := auth.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	var payload createArchiveRequest
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求参数无效"})
		return
	}

	if detail, found, err := h.findDetailBySessionID(c.Request.Context(), payload.SessionID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询既有归档失败"})
		return
	} else if found {
		c.JSON(http.StatusOK, detail)
		return
	}

	if err := validateCreateArchiveRequest(payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	if err := h.statAllVideos(c.Request.Context(), payload); err != nil {
		status := http.StatusBadGateway
		if errors.Is(err, errObjectNotFound) {
			status = http.StatusBadRequest
		}
		c.JSON(status, gin.H{"message": err.Error()})
		return
	}

	detail, err := h.createArchive(c.Request.Context(), claims, payload)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "保存问询归档失败"})
		return
	}
	c.JSON(http.StatusCreated, detail)
}

func (h *Handler) handleList(c *gin.Context) {
	if h.db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "归档服务未配置数据库"})
		return
	}

	limit := parseLimit(c.Query("limit"))
	dbQuery := h.db.WithContext(c.Request.Context()).Model(&dbschema.InquiryArchive{})

	if query := strings.TrimSpace(c.Query("query")); query != "" {
		pattern := "%" + query + "%"
		dbQuery = dbQuery.Where(
			`archive_code ILIKE ? OR session_id ILIKE ? OR passenger_document_num ILIKE ? OR passenger_name ILIKE ? OR operator_work_id ILIKE ? OR operator_name ILIKE ? OR judgement_reason ILIKE ?`,
			pattern,
			pattern,
			pattern,
			pattern,
			pattern,
			pattern,
			pattern,
		)
	}
	if judgement := strings.TrimSpace(c.Query("judgement")); judgement != "" {
		dbQuery = dbQuery.Where("final_judgement = ?", judgement)
	}
	if documentNum := strings.TrimSpace(c.Query("documentNum")); documentNum != "" {
		dbQuery = dbQuery.Where("passenger_document_num ILIKE ?", "%"+documentNum+"%")
	}
	if operatorWorkID := strings.TrimSpace(c.Query("operatorWorkId")); operatorWorkID != "" {
		dbQuery = dbQuery.Where("LOWER(operator_work_id) = ?", strings.ToLower(operatorWorkID))
	}
	if from, ok := parseTimeQuery(c.Query("from")); ok {
		dbQuery = dbQuery.Where("archived_at >= ?", from)
	}
	if to, ok := parseTimeQuery(c.Query("to")); ok {
		dbQuery = dbQuery.Where("archived_at <= ?", to)
	}

	var total int64
	if err := dbQuery.Count(&total).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询问询归档失败"})
		return
	}

	var archives []dbschema.InquiryArchive
	if err := dbQuery.Order("archived_at DESC").Limit(limit).Find(&archives).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询问询归档失败"})
		return
	}

	items := make([]archiveListItem, 0, len(archives))
	for _, item := range archives {
		var videoCount int64
		_ = h.db.WithContext(c.Request.Context()).
			Model(&dbschema.InquiryArchiveVideo{}).
			Where("archive_id = ?", item.ID).
			Count(&videoCount).Error
		items = append(items, archiveListItem{
			ID:                   item.ID,
			ArchiveCode:          item.ArchiveCode,
			SessionID:            item.SessionID,
			PassengerDocumentNum: item.PassengerDocumentNum,
			PassengerName:        item.PassengerName,
			OperatorWorkID:       item.OperatorWorkID,
			OperatorName:         item.OperatorName,
			FinalJudgement:       item.FinalJudgement,
			RoundCount:           item.RoundCount,
			TotalDurationSeconds: item.TotalDurationSeconds,
			TranscriptCount:      item.TranscriptCount,
			VideoCount:           videoCount,
			Status:               item.Status,
			ArchivedAt:           item.ArchivedAt,
		})
	}

	c.JSON(http.StatusOK, listResponse{Items: items, Total: total})
}

func (h *Handler) handleGet(c *gin.Context) {
	id, ok := parseUintParam(c, "id")
	if !ok {
		return
	}
	detail, found, err := h.findDetail(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询问询归档详情失败"})
		return
	}
	if !found {
		c.JSON(http.StatusNotFound, gin.H{"message": "问询归档不存在"})
		return
	}
	c.JSON(http.StatusOK, detail)
}

func (h *Handler) handleStreamVideo(c *gin.Context) {
	if h.storage == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "归档服务未配置 MinIO"})
		return
	}
	id, ok := parseUintParam(c, "id")
	if !ok {
		return
	}

	var video dbschema.InquiryArchiveVideo
	if err := h.db.WithContext(c.Request.Context()).First(&video, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"message": "归档视频不存在"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询归档视频失败"})
		return
	}

	response, err := h.storage.GetObject(c.Request.Context(), video.MinIOBucket, video.MinIOObjectKey, c.GetHeader("Range"))
	if err != nil {
		status := http.StatusBadGateway
		if errors.Is(err, errObjectNotFound) {
			status = http.StatusNotFound
		}
		c.JSON(status, gin.H{"message": "读取归档视频失败"})
		return
	}
	defer response.Body.Close()

	copyHeader(c.Writer.Header(), response.Header, "Content-Type")
	copyHeader(c.Writer.Header(), response.Header, "Content-Length")
	copyHeader(c.Writer.Header(), response.Header, "Content-Range")
	copyHeader(c.Writer.Header(), response.Header, "Accept-Ranges")
	if c.Writer.Header().Get("Content-Type") == "" {
		c.Writer.Header().Set("Content-Type", firstNonEmpty(video.ContentType, "application/octet-stream"))
	}
	c.Status(response.StatusCode)
	_, _ = io.Copy(c.Writer, response.Body)
}

func (h *Handler) statAllVideos(ctx context.Context, payload createArchiveRequest) error {
	for _, round := range payload.Rounds {
		for _, video := range round.Videos {
			resolvedVideo, err := h.findVideoBySessionAndFileName(ctx, payload.SessionID, video.FileName)
			if err != nil {
				if errors.Is(err, gorm.ErrRecordNotFound) {
					return fmt.Errorf("归档视频不存在：%s", strings.TrimSpace(video.FileName))
				}
				return fmt.Errorf("查询归档视频失败：%w", err)
			}
			bucket := strings.TrimSpace(resolvedVideo.MinIOBucket)
			objectKey := strings.TrimSpace(resolvedVideo.MinIOObjectKey)
			if err := h.storage.StatObject(ctx, bucket, objectKey); err != nil {
				if errors.Is(err, errObjectNotFound) {
					return fmt.Errorf("MinIO 视频对象不存在：%s/%s", bucket, objectKey)
				}
				return fmt.Errorf("校验 MinIO 视频对象失败：%w", err)
			}
		}
	}
	return nil
}

func (h *Handler) createArchive(ctx context.Context, claims auth.Claims, payload createArchiveRequest) (archiveDetailResponse, error) {
	now := h.now().UTC()
	var archiveID uint64
	passengerName := ""
	passengerSnapshot := json.RawMessage("{}")
	judgementBriefing := json.RawMessage("{}")
	multimodalAssessment := json.RawMessage("{}")

	err := h.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		archiveCode, err := h.nextArchiveCode(tx, now)
		if err != nil {
			return err
		}

		operatorID := claims.UserID
		if existing, found, err := h.findDetailBySessionID(ctx, payload.SessionID); err == nil && found {
			passengerName = existing.PassengerName
			passengerSnapshot = jsonOrDefault(existing.PassengerSnapshot, "{}")
			judgementBriefing = jsonOrDefault(existing.JudgementBriefing, "{}")
			multimodalAssessment = jsonOrDefault(existing.MultimodalAssessment, "{}")
		}
		archive := dbschema.InquiryArchive{
			ArchiveCode:          archiveCode,
			SessionID:            strings.TrimSpace(payload.SessionID),
			PassengerDocumentNum: trimToLimit(payload.PassengerDocumentNum, 64),
			PassengerName:        trimToLimit(passengerName, 128),
			PassengerSnapshot:    passengerSnapshot,
			OperatorID:           &operatorID,
			OperatorWorkID:       trimToLimit(claims.WorkID, 64),
			OperatorName:         trimToLimit(claims.Name, 64),
			FinalJudgement:       strings.TrimSpace(payload.FinalJudgement),
			JudgementReason:      strings.TrimSpace(payload.JudgementReason),
			JudgementBriefing:    judgementBriefing,
			MultimodalAssessment: multimodalAssessment,
			RoundCount:           len(payload.Rounds),
			TotalDurationSeconds: maxInt(payload.TotalDurationSeconds, 0),
			TranscriptCount:      maxInt(payload.TranscriptCount, 0),
			Status:               "archived",
			ArchivedAt:           now,
			CreatedAt:            now,
			UpdatedAt:            now,
		}
		if err := tx.Create(&archive).Error; err != nil {
			return err
		}
		archiveID = archive.ID

		for _, roundPayload := range payload.Rounds {
			round := dbschema.InquiryArchiveRound{
				ArchiveID:          archive.ID,
				RoundNo:            roundPayload.RoundNo,
				RoundClientID:      trimToLimit(roundPayload.RoundClientID, 128),
				Title:              trimToLimit(roundPayload.Title, 255),
				Focus:              strings.TrimSpace(roundPayload.Focus),
				StrategyNote:       strings.TrimSpace(roundPayload.StrategyNote),
				Questions:          jsonOrDefault(roundPayload.Questions, "[]"),
				Transcripts:        jsonOrDefault(roundPayload.Transcripts, "[]"),
				AnswerText:         strings.TrimSpace(roundPayload.AnswerText),
				RoundSummary:       strings.TrimSpace(roundPayload.RoundSummary),
				HumanOmniSummary:   strings.TrimSpace(roundPayload.HumanOmniSummary),
				ActionObservations: jsonOrDefault(roundPayload.ActionObservations, "[]"),
				RiskHints:          jsonOrDefault(roundPayload.RiskHints, "[]"),
				DurationSeconds:    maxInt(roundPayload.DurationSeconds, 0),
				StartedAt:          roundPayload.StartedAt,
				EndedAt:            roundPayload.EndedAt,
				CreatedAt:          now,
			}
			if err := tx.Create(&round).Error; err != nil {
				return err
			}

			for _, videoPayload := range roundPayload.Videos {
				videoFile, err := h.findVideoBySessionAndFileName(ctx, payload.SessionID, videoPayload.FileName)
				if err != nil {
					return err
				}
				roundID := round.ID
				video := dbschema.InquiryArchiveVideo{
					ArchiveID:           archive.ID,
					ArchiveRoundID:      &roundID,
					VideoKind:           firstNonEmpty(strings.TrimSpace(videoPayload.VideoKind), "round_clip"),
					SessionID:           strings.TrimSpace(payload.SessionID),
					WindowID:            optionalString(videoPayload.WindowID),
					QuestionID:          optionalString(videoPayload.QuestionID),
					VideoURL:            videoFile.VideoURL,
					MinIOBucket:         videoFile.MinIOBucket,
					MinIOObjectKey:      videoFile.MinIOObjectKey,
					FileName:            trimToLimit(videoPayload.FileName, 255),
					ContentType:         trimToLimit(videoPayload.ContentType, 128),
					SizeBytes:           maxInt64(videoPayload.SizeBytes, 0),
					Modal:               firstNonEmpty(strings.TrimSpace(videoPayload.Modal), "video_audio"),
					StartSeconds:        videoPayload.StartSeconds,
					EndSeconds:          videoPayload.EndSeconds,
					HumanOmniModel:      trimToLimit(videoPayload.HumanOmniModel, 128),
					HumanOmniRawSummary: strings.TrimSpace(videoPayload.HumanOmniRawSummary),
					UploadPayload:       json.RawMessage("{}"),
					CreatedAt:           now,
				}
				if err := tx.Create(&video).Error; err != nil {
					return err
				}
			}
		}

		return nil
	})
	if err != nil {
		return archiveDetailResponse{}, err
	}

	detail, found, err := h.findDetail(ctx, archiveID)
	if err != nil {
		return archiveDetailResponse{}, err
	}
	if !found {
		return archiveDetailResponse{}, gorm.ErrRecordNotFound
	}
	return detail, nil
}

func (h *Handler) nextArchiveCode(tx *gorm.DB, now time.Time) (string, error) {
	prefix := "IPRA-ASK-" + now.Format("20060102") + "-"
	var lastCode string
	if err := tx.Model(&dbschema.InquiryArchive{}).
		Select("archive_code").
		Where("archive_code LIKE ?", prefix+"%").
		Order("archive_code DESC").
		Limit(1).
		Scan(&lastCode).Error; err != nil {
		return "", err
	}

	next := 1
	if strings.HasPrefix(lastCode, prefix) {
		if parsed, err := strconv.Atoi(strings.TrimPrefix(lastCode, prefix)); err == nil {
			next = parsed + 1
		}
	}
	return fmt.Sprintf("%s%04d", prefix, next), nil
}

func (h *Handler) findDetailBySessionID(ctx context.Context, sessionID string) (archiveDetailResponse, bool, error) {
	sessionID = strings.TrimSpace(sessionID)
	if sessionID == "" {
		return archiveDetailResponse{}, false, nil
	}
	var archive dbschema.InquiryArchive
	if err := h.db.WithContext(ctx).Where("session_id = ?", sessionID).First(&archive).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return archiveDetailResponse{}, false, nil
		}
		return archiveDetailResponse{}, false, err
	}
	return h.findDetail(ctx, archive.ID)
}

func (h *Handler) findDetail(ctx context.Context, id uint64) (archiveDetailResponse, bool, error) {
	var archive dbschema.InquiryArchive
	if err := h.db.WithContext(ctx).First(&archive, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return archiveDetailResponse{}, false, nil
		}
		return archiveDetailResponse{}, false, err
	}

	var rounds []dbschema.InquiryArchiveRound
	if err := h.db.WithContext(ctx).
		Where("archive_id = ?", archive.ID).
		Order("round_no ASC").
		Find(&rounds).Error; err != nil {
		return archiveDetailResponse{}, false, err
	}

	var videos []dbschema.InquiryArchiveVideo
	if err := h.db.WithContext(ctx).
		Where("archive_id = ?", archive.ID).
		Order("created_at ASC, id ASC").
		Find(&videos).Error; err != nil {
		return archiveDetailResponse{}, false, err
	}

	videosByRound := make(map[uint64][]dbschema.InquiryArchiveVideo)
	for _, video := range videos {
		if video.ArchiveRoundID != nil {
			videosByRound[*video.ArchiveRoundID] = append(videosByRound[*video.ArchiveRoundID], video)
		}
	}

	roundDetails := make([]archiveRoundDetail, 0, len(rounds))
	for _, round := range rounds {
		roundDetails = append(roundDetails, archiveRoundDetail{
			InquiryArchiveRound: round,
			Videos:              videosByRound[round.ID],
		})
	}

	return archiveDetailResponse{
		InquiryArchive: archive,
		Rounds:         roundDetails,
		Videos:         videos,
	}, true, nil
}

func (h *Handler) findVideoBySessionAndFileName(ctx context.Context, sessionID string, fileName string) (dbschema.InquiryArchiveVideo, error) {
	var video dbschema.InquiryArchiveVideo
	err := h.db.WithContext(ctx).
		Where("session_id = ? AND file_name = ?", strings.TrimSpace(sessionID), strings.TrimSpace(fileName)).
		Order("created_at DESC, id DESC").
		First(&video).Error
	if err != nil {
		return dbschema.InquiryArchiveVideo{}, err
	}
	return video, nil
}

func validateCreateArchiveRequest(payload createArchiveRequest) error {
	if strings.TrimSpace(payload.SessionID) == "" {
		return errors.New("sessionId 不能为空")
	}
	switch strings.TrimSpace(payload.FinalJudgement) {
	case "concealment", "falseStatement", "clear":
	default:
		return errors.New("finalJudgement 仅支持 concealment、falseStatement、clear")
	}
	if utf8.RuneCountInString(strings.TrimSpace(payload.JudgementReason)) < 20 {
		return errors.New("judgementReason 至少需要 20 字")
	}
	if len(payload.Rounds) == 0 {
		return errors.New("至少需要归档一轮问询记录")
	}

	videoCount := 0
	seenRounds := make(map[int]struct{}, len(payload.Rounds))
	for _, round := range payload.Rounds {
		if round.RoundNo <= 0 {
			return errors.New("roundNo 必须大于 0")
		}
		if _, exists := seenRounds[round.RoundNo]; exists {
			return errors.New("roundNo 不能重复")
		}
		seenRounds[round.RoundNo] = struct{}{}
		for _, video := range round.Videos {
			videoCount++
			if strings.TrimSpace(video.FileName) == "" {
				return errors.New("视频 fileName 不能为空")
			}
			if video.SizeBytes < 0 {
				return errors.New("视频 sizeBytes 不能小于 0")
			}
			switch firstNonEmpty(strings.TrimSpace(video.Modal), "video_audio") {
			case "video", "video_audio", "audio":
			default:
				return errors.New("视频 modal 仅支持 video、video_audio、audio")
			}
			if video.StartSeconds != nil && video.EndSeconds != nil && *video.EndSeconds < *video.StartSeconds {
				return errors.New("视频 endSeconds 不能小于 startSeconds")
			}
		}
	}
	if videoCount == 0 {
		return errors.New("至少需要一个已上传至 MinIO 的视频")
	}
	return nil
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

func parseUintParam(c *gin.Context, key string) (uint64, bool) {
	value := strings.TrimSpace(c.Param(key))
	id, err := strconv.ParseUint(value, 10, 64)
	if err != nil || id == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "ID 参数无效"})
		return 0, false
	}
	return id, true
}

func parseLimit(raw string) int {
	limit := defaultListLimit
	if parsed, err := strconv.Atoi(strings.TrimSpace(raw)); err == nil && parsed > 0 {
		limit = parsed
	}
	if limit > maxListLimit {
		return maxListLimit
	}
	return limit
}

func parseTimeQuery(raw string) (time.Time, bool) {
	value := strings.TrimSpace(raw)
	if value == "" {
		return time.Time{}, false
	}
	if parsed, err := time.Parse(time.RFC3339, value); err == nil {
		return parsed, true
	}
	if parsed, err := time.Parse("2006-01-02", value); err == nil {
		return parsed, true
	}
	return time.Time{}, false
}

func jsonOrDefault(value json.RawMessage, fallback string) json.RawMessage {
	if len(value) == 0 || strings.TrimSpace(string(value)) == "" {
		return json.RawMessage(fallback)
	}
	return value
}

func optionalString(value string) *string {
	trimmed := strings.TrimSpace(value)
	if trimmed == "" {
		return nil
	}
	return &trimmed
}

func trimToLimit(value string, limit int) string {
	trimmed := strings.TrimSpace(value)
	if limit <= 0 || len([]rune(trimmed)) <= limit {
		return trimmed
	}
	return string([]rune(trimmed)[:limit])
}

func maxInt(value int, minimum int) int {
	if value < minimum {
		return minimum
	}
	return value
}

func maxInt64(value int64, minimum int64) int64 {
	if value < minimum {
		return minimum
	}
	return value
}

func firstNonEmpty(values ...string) string {
	for _, value := range values {
		if strings.TrimSpace(value) != "" {
			return strings.TrimSpace(value)
		}
	}
	return ""
}

func copyHeader(target http.Header, source http.Header, name string) {
	if value := source.Get(name); value != "" {
		target.Set(name, value)
	}
}
