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
	"ipra/backend/internal/displaytime"
	"ipra/backend/internal/inquiry"
	"ipra/backend/internal/sensitive"
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
	sensitive   *sensitive.Manager
	inquiry     archiveSessionSnapshotProvider
}

type archiveSessionSnapshotProvider interface {
	ArchiveSnapshot(sessionID string, userID uint64) (inquiry.ArchiveSessionSnapshot, bool)
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

type createArchiveResponse struct {
	ID             string    `json:"id"`
	ArchiveCode    string    `json:"archiveCode"`
	FinalJudgement string    `json:"finalJudgement"`
	ArchivedAt     time.Time `json:"archivedAt"`
}

type protectedArchiveListResponse struct {
	Items []protectedArchiveListItem `json:"items"`
	Total int64                      `json:"total"`
	Page  int                        `json:"page"`
	PageSize int                     `json:"pageSize"`
}

type protectedArchiveListItem struct {
	sensitive.ListItem
	ArchiveCode          string    `json:"archiveCode"`
	SessionID            string    `json:"sessionId"`
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

type protectedArchiveVideoPayload struct {
	ID           uint64  `json:"id"`
	FileName     string  `json:"fileName"`
	ContentType  string  `json:"contentType"`
	SizeBytes    int64   `json:"sizeBytes"`
	Modal        string  `json:"modal"`
	PlaybackPath string  `json:"playbackPath"`
	StartSeconds *float64 `json:"startSeconds,omitempty"`
	EndSeconds   *float64 `json:"endSeconds,omitempty"`
}

type protectedArchiveRoundPayload struct {
	ID              uint64                        `json:"id"`
	RoundNo         int                           `json:"roundNo"`
	DurationSeconds int                           `json:"durationSeconds"`
	DetailAsset     *sensitive.AssetRef           `json:"detailAsset,omitempty"`
	Videos          []protectedArchiveVideoPayload `json:"videos"`
}

type protectedArchiveDetailResponse struct {
	ID                   string                        `json:"id"`
	ArchiveCode          string                        `json:"archiveCode"`
	SessionID            string                        `json:"sessionId"`
	FinalJudgement       string                        `json:"finalJudgement"`
	RoundCount           int                           `json:"roundCount"`
	TotalDurationSeconds int                           `json:"totalDurationSeconds"`
	TranscriptCount      int                           `json:"transcriptCount"`
	Status               string                        `json:"status"`
	ArchivedAt           time.Time                     `json:"archivedAt"`
	OverviewAsset        *sensitive.AssetRef           `json:"overviewAsset,omitempty"`
	JudgementAsset       *sensitive.AssetRef           `json:"judgementAsset,omitempty"`
	BriefingAsset        *sensitive.AssetRef           `json:"briefingAsset,omitempty"`
	PassengerAsset       *sensitive.AssetRef           `json:"passengerAsset,omitempty"`
	Rounds               []protectedArchiveRoundPayload `json:"rounds"`
	Videos               []protectedArchiveVideoPayload `json:"videos"`
}

func NewHandler(db *gorm.DB, minioConfig config.MinIOConfig) *Handler {
	return &Handler{
		db:          db,
		storage:     newMinIOClient(minioConfig),
		videoBucket: strings.TrimSpace(firstNonEmpty(minioConfig.BucketVideo)),
		now:         time.Now,
	}
}

func (h *Handler) SetSensitiveManager(manager *sensitive.Manager) {
	if h == nil {
		return
	}
	h.sensitive = manager
}

func (h *Handler) SetInquirySessionProvider(provider archiveSessionSnapshotProvider) {
	if h == nil {
		return
	}
	h.inquiry = provider
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
		c.JSON(http.StatusOK, createArchiveResponse{
			ID:             strconv.FormatUint(detail.ID, 10),
			ArchiveCode:    detail.ArchiveCode,
			FinalJudgement: detail.FinalJudgement,
			ArchivedAt:     detail.ArchivedAt,
		})
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
	if h.sensitive == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"message": "敏感图片服务未启用"})
		return
	}
	claims, ok := auth.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
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

	items := make([]protectedArchiveListItem, 0, len(archives))
	for _, item := range archives {
		var videoCount int64
		_ = h.db.WithContext(c.Request.Context()).
			Model(&dbschema.InquiryArchiveVideo{}).
			Where("archive_id = ?", item.ID).
			Count(&videoCount).Error
		items = append(items, h.buildProtectedArchiveListItem(c, claims, item, videoCount))
	}

	c.JSON(http.StatusOK, protectedArchiveListResponse{
		Items:    items,
		Total:    total,
		Page:     1,
		PageSize: len(items),
	})
}

func (h *Handler) handleGet(c *gin.Context) {
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
	detail, found, err := h.findDetail(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "查询问询归档详情失败"})
		return
	}
	if !found {
		c.JSON(http.StatusNotFound, gin.H{"message": "问询归档不存在"})
		return
	}
	c.JSON(http.StatusOK, h.buildProtectedArchiveDetail(c, claims, detail))
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

	sensitive.SetNoStoreHeaders(c)
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

func (h *Handler) buildProtectedArchiveListItem(
	c *gin.Context,
	claims auth.Claims,
	item dbschema.InquiryArchive,
	videoCount int64,
) protectedArchiveListItem {
	listItem := sensitive.ListItem{
		ID: strconv.FormatUint(item.ID, 10),
		Asset: h.putArchiveListAsset(c, claims, item),
		Fields: []sensitive.FieldRef{
			h.putInlineFieldAsset(c, claims, "archiveCode", item.ArchiveCode, sensitive.TagToneDefault, "admin:archives:field"),
		},
		Chips: []sensitive.FieldRef{
			h.putInlineFieldAsset(c, claims, "judgement", formatArchiveJudgementLabel(item.FinalJudgement), judgementTone(item.FinalJudgement), "admin:archives:chip"),
			h.putInlineFieldAsset(c, claims, "sessionId", item.SessionID, sensitive.TagToneIdentity, "admin:archives:chip"),
		},
		Facts: []sensitive.FactRef{
			h.putArchiveFact(c, claims, "采样", fmt.Sprintf("%d 轮 · %s", item.RoundCount, formatDuration(item.TotalDurationSeconds)), "admin:archives:fact"),
			h.putArchiveFact(c, claims, "归档时间", formatTime(item.ArchivedAt), "admin:archives:fact"),
			h.putArchiveFact(c, claims, "视频数", strconv.FormatInt(videoCount, 10), "admin:archives:fact"),
		},
		Notes: []sensitive.FieldRef{
			h.putInlineFieldAsset(c, claims, "protected", "旅客与操作人身份已受保护", sensitive.TagToneMuted, "admin:archives:note"),
		},
	}
	return protectedArchiveListItem{
		ListItem:             listItem,
		ArchiveCode:          item.ArchiveCode,
		SessionID:            item.SessionID,
		FinalJudgement:       item.FinalJudgement,
		RoundCount:           item.RoundCount,
		TotalDurationSeconds: item.TotalDurationSeconds,
		TranscriptCount:      item.TranscriptCount,
		VideoCount:           videoCount,
		Status:               item.Status,
		ArchivedAt:           item.ArchivedAt,
	}
}

func (h *Handler) buildProtectedArchiveDetail(
	c *gin.Context,
	claims auth.Claims,
	detail archiveDetailResponse,
) protectedArchiveDetailResponse {
	overviewAsset := h.putArchiveOverviewAsset(c, claims, detail)
	judgementAsset := h.putArchiveJudgementAsset(c, claims, detail)
	briefingAsset := h.putArchiveBriefingAsset(c, claims, detail)
	passengerAsset := h.putArchivePassengerAsset(c, claims, detail)

	rounds := make([]protectedArchiveRoundPayload, 0, len(detail.Rounds))
	allVideos := make([]protectedArchiveVideoPayload, 0, len(detail.Videos))
	for _, round := range detail.Rounds {
		videos := make([]protectedArchiveVideoPayload, 0, len(round.Videos))
		for _, video := range round.Videos {
			payload := protectedArchiveVideoPayload{
				ID:           video.ID,
				FileName:     video.FileName,
				ContentType:  video.ContentType,
				SizeBytes:    video.SizeBytes,
				Modal:        video.Modal,
				PlaybackPath: fmt.Sprintf("/api/admin/inquiry-archives/videos/%d/stream", video.ID),
				StartSeconds: video.StartSeconds,
				EndSeconds:   video.EndSeconds,
			}
			videos = append(videos, payload)
			allVideos = append(allVideos, payload)
		}
		roundAsset := h.putArchiveRoundAsset(c, claims, round)
		rounds = append(rounds, protectedArchiveRoundPayload{
			ID:              round.ID,
			RoundNo:         round.RoundNo,
			DurationSeconds: round.DurationSeconds,
			DetailAsset:     optionalAssetRef(roundAsset),
			Videos:          videos,
		})
	}

	return protectedArchiveDetailResponse{
		ID:                   strconv.FormatUint(detail.ID, 10),
		ArchiveCode:          detail.ArchiveCode,
		SessionID:            detail.SessionID,
		FinalJudgement:       detail.FinalJudgement,
		RoundCount:           detail.RoundCount,
		TotalDurationSeconds: detail.TotalDurationSeconds,
		TranscriptCount:      detail.TranscriptCount,
		Status:               detail.Status,
		ArchivedAt:           detail.ArchivedAt,
		OverviewAsset:        optionalAssetRef(overviewAsset),
		JudgementAsset:       optionalAssetRef(judgementAsset),
		BriefingAsset:        optionalAssetRef(briefingAsset),
		PassengerAsset:       optionalAssetRef(passengerAsset),
		Rounds:               rounds,
		Videos:               allVideos,
	}
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

func (h *Handler) createArchive(ctx context.Context, claims auth.Claims, payload createArchiveRequest) (createArchiveResponse, error) {
	now := h.now().UTC()
	var archiveID uint64
	var sessionSnapshot inquiry.ArchiveSessionSnapshot
	if h.inquiry != nil {
		if snapshot, ok := h.inquiry.ArchiveSnapshot(strings.TrimSpace(payload.SessionID), claims.UserID); ok {
			sessionSnapshot = snapshot
		}
	}
	if sessionSnapshot.SessionID == "" {
		return createArchiveResponse{}, errors.New("受保护问询会话不存在或已失效")
	}

	err := h.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		archiveCode, err := h.nextArchiveCode(tx, now)
		if err != nil {
			return err
		}

		operatorID := claims.UserID
		archive := dbschema.InquiryArchive{
			ArchiveCode:          archiveCode,
			SessionID:            strings.TrimSpace(payload.SessionID),
			PassengerProfileID:   optionalUint64(sessionSnapshot.PassengerRowID),
			PassengerDocumentNum: trimToLimit(sessionSnapshot.PassengerDocNum, 64),
			PassengerName:        trimToLimit(sessionSnapshot.PassengerName, 128),
			PassengerSnapshot:    marshalRawJSON(buildArchivePassengerSnapshot(sessionSnapshot)),
			OperatorID:           &operatorID,
			OperatorWorkID:       trimToLimit(claims.WorkID, 64),
			OperatorName:         trimToLimit(claims.Name, 64),
			FinalJudgement:       strings.TrimSpace(payload.FinalJudgement),
			JudgementReason:      strings.TrimSpace(payload.JudgementReason),
			JudgementBriefing:    marshalRawJSON(buildArchiveJudgementBriefing(sessionSnapshot)),
			MultimodalAssessment: marshalRawJSON(buildArchiveMultimodalAssessment(sessionSnapshot)),
			RoundCount:           sessionSnapshot.CompletedRounds,
			TotalDurationSeconds: maxInt(sessionSnapshot.TotalSampleDuration, 0),
			TranscriptCount:      countArchiveTranscripts(sessionSnapshot),
			Status:               "archived",
			ArchivedAt:           now,
			CreatedAt:            now,
			UpdatedAt:            now,
		}
		if err := tx.Create(&archive).Error; err != nil {
			return err
		}
		archiveID = archive.ID

		roundsByNo := make(map[int]inquiry.ArchiveRoundSnapshot, len(sessionSnapshot.Rounds))
		for _, round := range sessionSnapshot.Rounds {
			roundsByNo[round.RoundNumber] = round
		}

		for _, roundPayload := range payload.Rounds {
			roundSnapshot, exists := roundsByNo[roundPayload.RoundNo]
			if !exists {
				return fmt.Errorf("受保护问询轮次不存在：%d", roundPayload.RoundNo)
			}
			round := dbschema.InquiryArchiveRound{
				ArchiveID:          archive.ID,
				RoundNo:            roundSnapshot.RoundNumber,
				RoundClientID:      trimToLimit(firstNonEmpty(roundPayload.RoundClientID, roundSnapshot.ID), 128),
				Title:              trimToLimit(roundSnapshot.Title, 255),
				Focus:              strings.TrimSpace(strings.Join(roundSnapshot.PromptQuestions, " / ")),
				StrategyNote:       "",
				Questions:          marshalRawJSON(roundSnapshot.PromptQuestions),
				Transcripts:        marshalRawJSON(buildArchiveTranscripts(roundSnapshot)),
				AnswerText:         strings.TrimSpace(roundSnapshot.AnswerText),
				RoundSummary:       strings.TrimSpace(roundSnapshot.HumanOmniSummary),
				HumanOmniSummary:   strings.TrimSpace(roundSnapshot.HumanOmniSummary),
				ActionObservations: marshalRawJSON(roundSnapshot.ActionObservations),
				RiskHints:          marshalRawJSON(buildArchiveRiskHints(sessionSnapshot)),
				DurationSeconds:    maxInt(roundSnapshot.DurationSeconds, 0),
				StartedAt:          nil,
				EndedAt:            nil,
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
					VideoURL:            "",
					MinIOBucket:         videoFile.MinIOBucket,
					MinIOObjectKey:      videoFile.MinIOObjectKey,
					FileName:            trimToLimit(videoPayload.FileName, 255),
					ContentType:         trimToLimit(videoPayload.ContentType, 128),
					SizeBytes:           maxInt64(videoPayload.SizeBytes, 0),
					Modal:               firstNonEmpty(strings.TrimSpace(videoPayload.Modal), "video_audio"),
					StartSeconds:        videoPayload.StartSeconds,
					EndSeconds:          videoPayload.EndSeconds,
					HumanOmniModel:      trimToLimit(videoPayload.HumanOmniModel, 128),
					HumanOmniRawSummary: "",
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
		return createArchiveResponse{}, err
	}

	detail, found, err := h.findDetail(ctx, archiveID)
	if err != nil {
		return createArchiveResponse{}, err
	}
	if !found {
		return createArchiveResponse{}, gorm.ErrRecordNotFound
	}
	return createArchiveResponse{
		ID:             strconv.FormatUint(detail.ID, 10),
		ArchiveCode:    detail.ArchiveCode,
		FinalJudgement: detail.FinalJudgement,
		ArchivedAt:     detail.ArchivedAt,
	}, nil
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

func optionalUint64(value uint64) *uint64 {
	if value == 0 {
		return nil
	}
	return &value
}

func marshalRawJSON(value any) json.RawMessage {
	if value == nil {
		return json.RawMessage("{}")
	}
	data, err := json.Marshal(value)
	if err != nil || len(data) == 0 {
		return json.RawMessage("{}")
	}
	return json.RawMessage(data)
}

func buildArchivePassengerSnapshot(snapshot inquiry.ArchiveSessionSnapshot) map[string]any {
	return map[string]any{
		"passengerProfile": cloneMap(snapshot.PassengerProfile),
		"tripProfile":      cloneMap(snapshot.TripProfile),
		"knownFacts":       append([]string(nil), snapshot.KnownFacts...),
	}
}

func buildArchiveJudgementBriefing(snapshot inquiry.ArchiveSessionSnapshot) map[string]any {
	if len(snapshot.JudgementData) == 0 {
		return map[string]any{}
	}
	return map[string]any{
		"operatorNote":        extractArchiveString(snapshot.JudgementData["operatorNote"]),
		"warnings":            extractArchiveStringSlice(snapshot.JudgementData["warnings"]),
		"multimodalAssessment": cloneMap(extractArchiveMap(snapshot.JudgementData["multimodalAssessment"])),
	}
}

func buildArchiveMultimodalAssessment(snapshot inquiry.ArchiveSessionSnapshot) map[string]any {
	return cloneMap(extractArchiveMap(snapshot.JudgementData["multimodalAssessment"]))
}

func buildArchiveTranscripts(round inquiry.ArchiveRoundSnapshot) []map[string]any {
	result := make([]map[string]any, 0, 1)
	if text := strings.TrimSpace(round.AnswerText); text != "" {
		result = append(result, map[string]any{
			"role": "subject",
			"text": text,
		})
	}
	return result
}

func buildArchiveRiskHints(snapshot inquiry.ArchiveSessionSnapshot) []string {
	assessment := extractArchiveMap(snapshot.JudgementData["multimodalAssessment"])
	return extractArchiveStringSlice(assessment["riskHints"])
}

func countArchiveTranscripts(snapshot inquiry.ArchiveSessionSnapshot) int {
	count := 0
	for _, round := range snapshot.Rounds {
		if strings.TrimSpace(round.AnswerText) != "" {
			count++
		}
	}
	return count
}

func extractArchiveMap(value any) map[string]any {
	result, ok := value.(map[string]any)
	if !ok {
		return map[string]any{}
	}
	return result
}

func extractArchiveString(value any) string {
	text, ok := value.(string)
	if !ok {
		return ""
	}
	return strings.TrimSpace(text)
}

func extractArchiveStringSlice(value any) []string {
	raw, ok := value.([]any)
	if !ok {
		if typed, ok := value.([]string); ok {
			return append([]string(nil), typed...)
		}
		return nil
	}
	result := make([]string, 0, len(raw))
	for _, item := range raw {
		if text := extractArchiveString(item); text != "" {
			result = append(result, text)
		}
	}
	return result
}

func cloneMap(input map[string]any) map[string]any {
	if len(input) == 0 {
		return map[string]any{}
	}
	output := make(map[string]any, len(input))
	for key, value := range input {
		output[key] = value
	}
	return output
}

func (h *Handler) putArchiveListAsset(c *gin.Context, claims auth.Claims, item dbschema.InquiryArchive) sensitive.AssetRef {
	document := sensitive.Document{
		Title:    item.ArchiveCode,
		Subtitle: "问询归档",
		TagItems: []sensitive.TagItem{
			{Text: formatArchiveJudgementLabel(item.FinalJudgement), Tone: judgementTone(item.FinalJudgement)},
			{Text: item.SessionID, Tone: sensitive.TagToneIdentity},
		},
		FactItems: []sensitive.FactItem{
			{Label: "采样", Value: fmt.Sprintf("%d 轮 · %s", item.RoundCount, formatDuration(item.TotalDurationSeconds))},
			{Label: "归档时间", Value: formatTime(item.ArchivedAt)},
		},
		FooterTags: []sensitive.TagItem{
			{Text: "旅客与归档内容已受保护", Tone: sensitive.TagToneMuted},
		},
	}
	return h.sensitive.Put(claims.UserID, document, sensitive.PresetCompactList, sensitive.FormatWebP, buildArchiveWatermark(c, claims, "admin:archives"))
}

func (h *Handler) putArchiveOverviewAsset(c *gin.Context, claims auth.Claims, detail archiveDetailResponse) sensitive.AssetRef {
	document := sensitive.Document{
		Title:    detail.ArchiveCode,
		Subtitle: "问询归档概览",
		TagItems: []sensitive.TagItem{
			{Text: formatArchiveJudgementLabel(detail.FinalJudgement), Tone: judgementTone(detail.FinalJudgement)},
			{Text: detail.SessionID, Tone: sensitive.TagToneIdentity},
		},
		FactItems: []sensitive.FactItem{
			{Label: "采样", Value: fmt.Sprintf("%d 轮 · %s", detail.RoundCount, formatDuration(detail.TotalDurationSeconds))},
			{Label: "归档时间", Value: formatTime(detail.ArchivedAt)},
			{Label: "状态", Value: firstNonEmpty(detail.Status, "archived")},
		},
		Footer: []string{
			"操作人与旅客身份、问询文本均通过受保护资产交付",
		},
	}
	return h.sensitive.Put(claims.UserID, document, sensitive.PresetDialog, sensitive.FormatPNG, buildArchiveWatermark(c, claims, "admin:archives:detail"))
}

func (h *Handler) putArchiveJudgementAsset(c *gin.Context, claims auth.Claims, detail archiveDetailResponse) sensitive.AssetRef {
	document := sensitive.Document{
		Title:    "最终判定与理由",
		Subtitle: formatArchiveJudgementLabel(detail.FinalJudgement),
		Sections: []sensitive.Section{
			{
				Heading: "判定理由",
				Lines:   compactArchiveStrings([]string{detail.JudgementReason}),
			},
		},
	}
	return h.sensitive.Put(claims.UserID, document, sensitive.PresetDialog, sensitive.FormatPNG, buildArchiveWatermark(c, claims, "admin:archives:detail"))
}

func (h *Handler) putArchiveBriefingAsset(c *gin.Context, claims auth.Claims, detail archiveDetailResponse) sensitive.AssetRef {
	briefing := extractArchiveMap(detail.JudgementBriefing)
	assessment := extractArchiveMap(detail.MultimodalAssessment)
	document := sensitive.Document{
		Title:    "系统摘要",
		Subtitle: extractArchiveString(assessment["summary"]),
		Sections: []sensitive.Section{
			{
				Heading: "工作人员提示",
				Lines: compactArchiveStrings([]string{
					extractArchiveString(briefing["operatorNote"]),
				}),
			},
			{
				Heading: "风险提示",
				Lines: extractArchiveStringSlice(assessment["riskHints"]),
			},
			{
				Heading: "证据摘要",
				Lines: extractArchiveStringSlice(assessment["evidence"]),
			},
			{
				Heading: "注意事项",
				Lines: extractArchiveStringSlice(briefing["warnings"]),
			},
		},
	}
	return h.sensitive.Put(claims.UserID, document, sensitive.PresetDialog, sensitive.FormatPNG, buildArchiveWatermark(c, claims, "admin:archives:detail"))
}

func (h *Handler) putArchivePassengerAsset(c *gin.Context, claims auth.Claims, detail archiveDetailResponse) sensitive.AssetRef {
	snapshot := extractArchiveMap(detail.PassengerSnapshot)
	document := sensitive.Document{
		Title:    "旅客快照",
		Subtitle: "归档时服务器快照",
		Sections: []sensitive.Section{
			{
				Heading: "已收口画像",
				Lines: compactArchiveStrings([]string{
					formatArchiveLine("姓名", detail.PassengerName),
					formatArchiveLine("证件号", detail.PassengerDocumentNum),
					formatArchiveLine("基础画像", stringifyArchiveValue(snapshot["passengerProfile"])),
					formatArchiveLine("行程画像", stringifyArchiveValue(snapshot["tripProfile"])),
					formatArchiveLine("已知事实", stringifyArchiveValue(snapshot["knownFacts"])),
				}),
			},
		},
	}
	return h.sensitive.Put(claims.UserID, document, sensitive.PresetDialog, sensitive.FormatPNG, buildArchiveWatermark(c, claims, "admin:archives:detail"))
}

func (h *Handler) putArchiveRoundAsset(c *gin.Context, claims auth.Claims, round archiveRoundDetail) sensitive.AssetRef {
	document := sensitive.Document{
		Title:    fmt.Sprintf("第 %d 轮摘要", round.RoundNo),
		Subtitle: formatDuration(round.DurationSeconds),
		Sections: []sensitive.Section{
			{
				Heading: "本轮内容",
				Lines: compactArchiveStrings([]string{
					formatArchiveLine("标题", round.Title),
					formatArchiveLine("问题包", stringifyArchiveValue(round.Questions)),
					formatArchiveLine("回答摘要", round.AnswerText),
					formatArchiveLine("轮次摘要", round.RoundSummary),
					formatArchiveLine("窗口摘要", round.HumanOmniSummary),
					formatArchiveLine("观察事件", stringifyArchiveValue(round.ActionObservations)),
				}),
			},
		},
	}
	return h.sensitive.Put(claims.UserID, document, sensitive.PresetDialog, sensitive.FormatPNG, buildArchiveWatermark(c, claims, "admin:archives:round"))
}

func (h *Handler) putArchiveFact(c *gin.Context, claims auth.Claims, label string, value string, page string) sensitive.FactRef {
	return sensitive.FactRef{
		Key:   label,
		Label: label,
		Asset: h.putInlineFieldAsset(c, claims, label, value, sensitive.TagToneDefault, page).Asset,
	}
}

func (h *Handler) putInlineFieldAsset(c *gin.Context, claims auth.Claims, key string, value string, tone sensitive.TagTone, page string) sensitive.FieldRef {
	document := sensitive.Document{
		Title: firstNonEmpty(strings.TrimSpace(value), "-"),
	}
	return sensitive.FieldRef{
		Key: key,
		Asset: h.sensitive.PutWithStyle(
			claims.UserID,
			document,
			sensitive.PresetInline,
			sensitive.FormatWebP,
			sensitive.RenderStyle{Transparent: true, HideAccent: true},
			buildArchiveWatermark(c, claims, page),
		),
		Tone: tone,
	}
}

func buildArchiveWatermark(c *gin.Context, claims auth.Claims, page string) sensitive.WatermarkContext {
	return sensitive.NewWatermarkContext(
		strings.TrimSpace(claims.WorkID),
		strings.TrimSpace(claims.Name),
		strings.TrimSpace(claims.Role),
		strings.TrimSpace(c.ClientIP()),
		c.Request.Method+" "+strings.TrimSpace(c.Request.URL.Path),
		page,
	)
}

func optionalAssetRef(asset sensitive.AssetRef) *sensitive.AssetRef {
	if asset.ID == "" {
		return nil
	}
	return &asset
}

func compactArchiveStrings(values []string) []string {
	result := make([]string, 0, len(values))
	for _, value := range values {
		if trimmed := strings.TrimSpace(value); trimmed != "" {
			result = append(result, trimmed)
		}
	}
	return result
}

func formatArchiveJudgementLabel(value string) string {
	switch strings.TrimSpace(value) {
	case "concealment":
		return "隐瞒"
	case "falseStatement":
		return "虚假陈述"
	case "clear":
		return "无异常"
	default:
		return firstNonEmpty(strings.TrimSpace(value), "待判定")
	}
}

func judgementTone(value string) sensitive.TagTone {
	switch strings.TrimSpace(value) {
	case "concealment":
		return sensitive.TagToneAlert
	case "falseStatement":
		return sensitive.TagToneWarning
	default:
		return sensitive.TagToneSuccess
	}
}

func formatDuration(seconds int) string {
	safeSeconds := maxInt(seconds, 0)
	return fmt.Sprintf("%02d:%02d", safeSeconds/60, safeSeconds%60)
}

func formatTime(value time.Time) string {
	return displaytime.Format(value, "2006-01-02 15:04:05")
}

func formatArchiveLine(label string, value string) string {
	if strings.TrimSpace(value) == "" {
		return ""
	}
	return label + "：" + strings.TrimSpace(value)
}

func stringifyArchiveValue(value any) string {
	if value == nil {
		return ""
	}
	switch typed := value.(type) {
	case string:
		return strings.TrimSpace(typed)
	case json.RawMessage:
		return strings.TrimSpace(string(typed))
	default:
		data, err := json.Marshal(typed)
		if err != nil {
			return ""
		}
		return strings.TrimSpace(string(data))
	}
}
