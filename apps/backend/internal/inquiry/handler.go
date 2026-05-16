package inquiry

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"ipra/backend/internal/auth"
	"ipra/backend/internal/memory"
	"ipra/backend/internal/profile"
	"ipra/backend/internal/sensitive"
)

const (
	defaultMaxRounds = 3
	minMaxRounds     = 1
	maxMaxRounds     = 10
)

var riskCaseLabels = map[string]string{
	"cross_border_gambling": "跨境赌博",
	"cross_border_fraud":    "跨境电诈",
	"illegal_work":          "非法务工",
	"suspicious_purpose":    "出境目的存疑",
}

type Handler struct {
	mu                sync.RWMutex
	nextID            int64
	sessions          map[string]*Session
	protectedSessions map[string]*ProtectedSession
	sensitive         *sensitive.Manager
	memoryStore       memory.Store
	profileLookup     profileLookup
	aiServiceBaseURL  string
	httpClient        *http.Client
}

type profileLookup interface {
	SearchProfilesByDocumentExact(ctx context.Context, documentNum string) ([]profile.SearchProfileResponse, error)
	GetProfileByID(ctx context.Context, id uint64) (profile.SearchProfileResponse, error)
}

type Passenger struct {
	Name        string `json:"name"`
	DocumentID  string `json:"documentId"`
	Destination string `json:"destination"`
	Purpose     string `json:"purpose"`
	RiskLevel   string `json:"riskLevel"`
}

type Signal struct {
	Source   string  `json:"source"`
	Label    string  `json:"label"`
	Severity float64 `json:"severity"`
	At       string  `json:"at,omitempty"`
}

type Turn struct {
	Round            int      `json:"round"`
	Question         string   `json:"question"`
	AnswerTranscript string   `json:"answerTranscript"`
	Signals          []Signal `json:"signals,omitempty"`
	RiskHints        []string `json:"riskHints"`
	Rationale        string   `json:"rationale"`
	CreatedAt        string   `json:"createdAt"`
}

type Session struct {
	SessionID       string    `json:"sessionId"`
	Passenger       Passenger `json:"passenger"`
	CurrentRound    int       `json:"currentRound"`
	MaxRounds       int       `json:"maxRounds"`
	CurrentQuestion string    `json:"currentQuestion"`
	Status          string    `json:"status"`
	History         []Turn    `json:"history"`
	CreatedAt       string    `json:"createdAt"`
	UpdatedAt       string    `json:"updatedAt"`
}

type ProtectedSession struct {
	SessionID        string
	OwnerUserID      uint64
	PassengerID      string
	PassengerName    string
	PassengerDocNum  string
	PassengerRowID   uint64
	PassengerProfile map[string]any
	TripProfile      map[string]any
	KnownFacts       []string
	RiskCaseContext  map[string]any
	ProfileBlock     *sensitive.ListItem
	StrategyBlock    *sensitive.ListItem
	MemoryBlock      *sensitive.ListItem
	StrategyAsset    *sensitive.AssetRef
	MemoryAsset      *sensitive.AssetRef
	CurrentRoundID   string
	Rounds           []*ProtectedRound
	JudgementBlock   *sensitive.ListItem
	JudgementAsset   *sensitive.AssetRef
	JudgementData    map[string]any
	CreatedAt        time.Time
	UpdatedAt        time.Time
}

type ProtectedRound struct {
	ID                 string
	RoundNumber        int
	Title              string
	QuestionCount      int
	PromptBlock        *sensitive.ListItem
	SummaryBlock       *sensitive.ListItem
	TranscriptBlock    *sensitive.ListItem
	PromptAsset        *sensitive.AssetRef
	SummaryAsset       *sensitive.AssetRef
	TranscriptAsset    *sensitive.AssetRef
	Status             string
	DurationSeconds    int
	RecordedFileName   string
	UploadedFile       map[string]any
	AnswerText         string
	PromptQuestions    []string
	HumanOmniSummary   string
	HumanOmniWindow    map[string]any
	ActionObservations []map[string]any
	ASR                map[string]any
}

type ProtectedBlockSnapshot struct {
	Asset  *sensitive.AssetRef  `json:"asset,omitempty"`
	Fields []sensitive.FieldRef `json:"fields,omitempty"`
	Chips  []sensitive.FieldRef `json:"chips,omitempty"`
	Facts  []sensitive.FactRef  `json:"facts,omitempty"`
	Meta   []sensitive.FieldRef `json:"meta,omitempty"`
	Notes  []sensitive.FieldRef `json:"notes,omitempty"`
}

type ProtectedRoundSnapshot struct {
	ID               string                  `json:"id"`
	RoundNumber      int                     `json:"roundNumber"`
	Title            string                  `json:"title"`
	QuestionCount    int                     `json:"questionCount"`
	Status           string                  `json:"status"`
	PromptBlock      *ProtectedBlockSnapshot `json:"promptBlock,omitempty"`
	SummaryBlock     *ProtectedBlockSnapshot `json:"summaryBlock,omitempty"`
	TranscriptBlock  *ProtectedBlockSnapshot `json:"transcriptBlock,omitempty"`
	PromptAsset      *sensitive.AssetRef     `json:"promptAsset,omitempty"`
	SummaryAsset     *sensitive.AssetRef     `json:"summaryAsset,omitempty"`
	TranscriptAsset  *sensitive.AssetRef     `json:"transcriptAsset,omitempty"`
	RecordedFileName string                  `json:"recordedFileName,omitempty"`
	UploadedFile     map[string]any          `json:"uploadedFile,omitempty"`
	HumanOmniWindow  map[string]any          `json:"humanOmniWindow,omitempty"`
}

type ArchiveRoundSnapshot struct {
	ID                 string
	RoundNumber        int
	Title              string
	QuestionCount      int
	Status             string
	DurationSeconds    int
	RecordedFileName   string
	AnswerText         string
	PromptQuestions    []string
	HumanOmniSummary   string
	HumanOmniWindow    map[string]any
	ActionObservations []map[string]any
	ASR                map[string]any
}

type ArchiveSessionSnapshot struct {
	SessionID           string
	OwnerUserID         uint64
	PassengerRowID      uint64
	PassengerName       string
	PassengerDocNum     string
	PassengerProfile    map[string]any
	TripProfile         map[string]any
	KnownFacts          []string
	JudgementData       map[string]any
	Rounds              []ArchiveRoundSnapshot
	CompletedRounds     int
	TotalSampleDuration int
}

type ProtectedSessionSnapshot struct {
	SessionID           string                   `json:"sessionId"`
	Profile             *sensitive.ListItem      `json:"profile,omitempty"`
	StrategyBlock       *ProtectedBlockSnapshot  `json:"strategyBlock,omitempty"`
	MemoryBlock         *ProtectedBlockSnapshot  `json:"memoryBlock,omitempty"`
	StrategyAsset       *sensitive.AssetRef      `json:"strategyAsset,omitempty"`
	MemoryAsset         *sensitive.AssetRef      `json:"memoryAsset,omitempty"`
	CurrentRound        *ProtectedRoundSnapshot  `json:"currentRound,omitempty"`
	HistoricalRounds    []ProtectedRoundSnapshot `json:"historicalRounds"`
	JudgementBlock      *ProtectedBlockSnapshot  `json:"judgementBlock,omitempty"`
	JudgementAsset      *sensitive.AssetRef      `json:"judgementAsset,omitempty"`
	CompletedRounds     int                      `json:"completedRounds"`
	TotalSampleDuration int                      `json:"totalSampleDuration"`
}

type createSessionRequest struct {
	Passenger       Passenger `json:"passenger"`
	MaxRounds       int       `json:"maxRounds"`
	InitialQuestion string    `json:"initialQuestion"`
}

type submitTurnRequest struct {
	AnswerTranscript string   `json:"answerTranscript"`
	Signals          []Signal `json:"signals"`
}

type turnResponse struct {
	SessionID       string   `json:"sessionId"`
	NextQuestion    string   `json:"nextQuestion"`
	Rationale       string   `json:"rationale"`
	RiskHints       []string `json:"riskHints"`
	CurrentRound    int      `json:"currentRound"`
	MaxRounds       int      `json:"maxRounds"`
	ShouldStop      bool     `json:"shouldStop"`
	Status          string   `json:"status"`
	CurrentQuestion string   `json:"currentQuestion"`
	History         []Turn   `json:"history"`
}

type asrResponse struct {
	Transcript string  `json:"transcript"`
	Confidence float64 `json:"confidence"`
	Language   string  `json:"language"`
	AudioBytes int64   `json:"audioBytes"`
	DurationMs int     `json:"durationMs"`
}

func NewHandler() *Handler {
	return &Handler{
		sessions:          make(map[string]*Session),
		protectedSessions: make(map[string]*ProtectedSession),
		httpClient: &http.Client{
			Timeout: 5 * time.Minute,
		},
	}
}

func (h *Handler) Register(r gin.IRouter) {
	r.GET("/health", h.handleHealth)
	r.POST("/api/asr/transcribe", h.handleASRTranscribe)
	r.POST("/api/inquiry/sessions", h.handleCreateSession)
	r.GET("/api/inquiry/sessions/:sessionId", h.handleGetSession)
	r.POST("/api/inquiry/sessions/:sessionId/turns", h.handleSubmitTurn)
}

func (h *Handler) RegisterProtected(r gin.IRouter, authMiddleware gin.HandlerFunc) {
	group := r.Group("/api/inquiry/protected")
	if authMiddleware != nil {
		group.Use(authMiddleware)
	}

	group.POST("/strategy", h.handleProtectedStrategy)
	group.POST("/sessions/:sessionId/rounds/:roundId/window-summary", h.handleProtectedWindowSummary)
	group.POST("/sessions/:sessionId/followup", h.handleProtectedFollowup)
	group.POST("/sessions/:sessionId/judgement", h.handleProtectedJudgement)
	group.GET("/sessions/:sessionId/memory", h.handleProtectedMemory)
}

func (h *Handler) SetSensitiveManager(manager *sensitive.Manager) {
	if h == nil {
		return
	}
	h.sensitive = manager
}

func (h *Handler) SetMemoryStore(store memory.Store) {
	if h == nil {
		return
	}
	h.memoryStore = store
}

func (h *Handler) SetProfileLookup(lookup profileLookup) {
	if h == nil {
		return
	}
	h.profileLookup = lookup
}

func (h *Handler) SetAIServiceBaseURL(baseURL string) {
	if h == nil {
		return
	}
	h.aiServiceBaseURL = strings.TrimRight(strings.TrimSpace(baseURL), "/")
}

type protectedStrategyRequest struct {
	SessionID       string         `json:"sessionId"`
	Constraints     map[string]any `json:"constraints"`
	PassengerID     string         `json:"passengerId"`
	RiskCaseContext map[string]any `json:"riskCaseContext"`
}

type protectedWindowSummaryRequest struct {
	RoundNumber        int              `json:"roundNumber"`
	QuestionID         string           `json:"questionId"`
	RecordedFileName   string           `json:"recordedFileName"`
	DurationSeconds    int              `json:"durationSeconds"`
	AnswerText         string           `json:"answerText"`
	HumanOmniWindow    map[string]any   `json:"humanOmniWindow"`
	ActionObservations []map[string]any `json:"actionObservations"`
	ASR                map[string]any   `json:"asr"`
}

type protectedFollowupRequest struct {
	RoundNumber int `json:"roundNumber"`
}

func (h *Handler) handleProtectedStrategy(c *gin.Context) {
	if h.sensitive == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"message": "敏感图片服务未启用"})
		return
	}
	if h.profileLookup == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"message": "旅客画像服务未启用"})
		return
	}
	claims, ok := auth.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	var req protectedStrategyRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求参数无效"})
		return
	}
	if strings.TrimSpace(req.SessionID) == "" {
		req.SessionID = h.newSessionID()
	}
	passengerID := strings.TrimSpace(req.PassengerID)
	if passengerID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "passengerId 不能为空"})
		return
	}

	profileRecord, found, err := h.loadInquiryProfile(c.Request.Context(), passengerID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "读取旅客画像失败"})
		return
	}
	if !found || profileRecord.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"message": "未查询到可用旅客画像"})
		return
	}
	passengerProfile := buildInquiryPassengerProfile(profileRecord)
	tripProfile := buildInquiryTripProfile(profileRecord)
	knownFacts := buildInquiryKnownFacts(profileRecord)
	riskCaseContext := buildProtectedRiskCaseContext(req.RiskCaseContext, profileRecord.RiskCategory)
	profileBlock := h.buildProtectedProfileBlock(c, claims, profileRecord)

	memoryContext := h.loadMemoryContext(req.SessionID, passengerID)
	aiPayload := map[string]any{
		"sessionId":        req.SessionID,
		"passengerProfile": passengerProfile,
		"tripProfile":      tripProfile,
		"knownFacts":       knownFacts,
		"memoryContext":    memoryContext,
		"constraints":      req.Constraints,
		"riskCaseContext":  riskCaseContext,
	}
	aiResponse, err := h.postAIJSON("/v1/inquiry/first-round-strategy", aiPayload)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	strategyAsset := h.renderStrategyAsset(c, claims, aiResponse)
	memoryAsset := h.renderMemoryAsset(c, claims, req.SessionID, passengerID, memoryContext)
	round := h.buildOpeningRound(c, claims, aiResponse)
	strategyBlock := h.buildStrategyBlock(c, claims, aiResponse, strategyAsset)
	memoryBlock := h.buildMemoryBlock(c, claims, req.SessionID, passengerID, memoryContext, memoryAsset)

	h.mu.Lock()
	h.protectedSessions[req.SessionID] = &ProtectedSession{
		SessionID:        req.SessionID,
		OwnerUserID:      claims.UserID,
		PassengerID:      passengerID,
		PassengerName:    strings.TrimSpace(profileRecord.FullName),
		PassengerDocNum:  strings.TrimSpace(profileRecord.DocumentNum),
		PassengerRowID:   profileRecord.ID,
		PassengerProfile: cloneMap(passengerProfile),
		TripProfile:      cloneMap(tripProfile),
		KnownFacts:       append([]string(nil), knownFacts...),
		RiskCaseContext:  cloneMap(riskCaseContext),
		ProfileBlock:     profileBlock,
		StrategyBlock:    strategyBlock,
		MemoryBlock:      memoryBlock,
		StrategyAsset:    &strategyAsset,
		MemoryAsset:      optionalAsset(memoryAsset),
		CurrentRoundID:   round.ID,
		Rounds:           []*ProtectedRound{round},
		CreatedAt:        time.Now().UTC(),
		UpdatedAt:        time.Now().UTC(),
	}
	h.mu.Unlock()

	c.JSON(http.StatusOK, h.snapshotProtectedSession(req.SessionID))
}

func (h *Handler) loadInquiryProfile(
	ctx context.Context,
	passengerID string,
) (profile.SearchProfileResponse, bool, error) {
	trimmedPassengerID := strings.TrimSpace(passengerID)
	if trimmedPassengerID == "" || h.profileLookup == nil {
		return profile.SearchProfileResponse{}, false, nil
	}

	if numericID, err := strconv.ParseUint(trimmedPassengerID, 10, 64); err == nil && numericID != 0 {
		record, getErr := h.profileLookup.GetProfileByID(ctx, numericID)
		if getErr == nil && record.ID != 0 {
			return record, true, nil
		}
	}

	profiles, err := h.profileLookup.SearchProfilesByDocumentExact(ctx, trimmedPassengerID)
	if err != nil {
		return profile.SearchProfileResponse{}, false, err
	}
	if len(profiles) == 0 {
		return profile.SearchProfileResponse{}, false, nil
	}

	return profiles[0], true, nil
}

func buildProtectedRiskCaseContext(raw map[string]any, databaseRiskCategory string) map[string]any {
	category := profile.NormalizeRiskCategoryCode(readStringMapValue(raw, "category"))
	source := strings.TrimSpace(readStringMapValue(raw, "source"))
	reason := strings.TrimSpace(readStringMapValue(raw, "reason"))
	officerNote := strings.TrimSpace(readStringMapValue(raw, "officerNote"))

	if category == "" {
		category = profile.NormalizeRiskCategoryCode(databaseRiskCategory)
		if category != "" && source == "" {
			source = "watchlist"
		}
	}
	if category == "" {
		category = "suspicious_purpose"
	}

	if source != "watchlist" && source != "officer" && source != "none" {
		source = "none"
	}

	result := map[string]any{
		"source":   source,
		"category": category,
		"label":    riskCaseLabels[category],
	}
	if reason != "" {
		result["reason"] = reason
	}
	if officerNote != "" {
		result["officerNote"] = officerNote
	}
	return result
}

func readStringMapValue(values map[string]any, key string) string {
	if len(values) == 0 {
		return ""
	}
	value, ok := values[key]
	if !ok || value == nil {
		return ""
	}
	switch current := value.(type) {
	case string:
		return strings.TrimSpace(current)
	default:
		return strings.TrimSpace(fmt.Sprint(current))
	}
}

func (h *Handler) handleProtectedWindowSummary(c *gin.Context) {
	if h.sensitive == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"message": "敏感图片服务未启用"})
		return
	}
	claims, ok := auth.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}
	if err := c.Request.ParseMultipartForm(256 << 20); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求参数无效"})
		return
	}

	session, round, ok := h.authorizeProtectedRound(c.Param("sessionId"), c.Param("roundId"), claims.UserID)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"message": "受保护问询轮次不存在"})
		return
	}

	fileHeader, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "缺少采样文件"})
		return
	}
	file, err := fileHeader.Open()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "读取采样文件失败"})
		return
	}
	defer file.Close()
	fileBytes, err := io.ReadAll(file)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "读取采样文件失败"})
		return
	}

	actionObservations := parseJSONMapSlice(c.PostForm("actionObservations"))
	asr := parseJSONMap(c.PostForm("asr"))
	durationSeconds := parsePositiveInt(c.PostForm("durationSeconds"))
	answerText := strings.TrimSpace(c.PostForm("answerText"))

	aiResponse, err := h.postAIForm("/v1/humanomni/summarize-window", fileHeader.Filename, fileHeader.Header.Get("Content-Type"), fileBytes, map[string]string{
		"sessionId":    c.PostForm("sessionId"),
		"questionId":   c.PostForm("questionId"),
		"windowId":     c.PostForm("windowId"),
		"modal":        firstNonEmptyInquiry(c.PostForm("modal"), "video_audio"),
		"startSeconds": firstNonEmptyInquiry(c.PostForm("startSeconds"), "0"),
		"endSeconds":   firstNonEmptyInquiry(c.PostForm("endSeconds"), strconv.Itoa(durationSeconds)),
	})
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	round.DurationSeconds = durationSeconds
	round.RecordedFileName = extractStringMap(aiResponse, "uploadedFile", "filename")
	round.UploadedFile = sanitizeUploadedFile(extractNestedMap(aiResponse, "uploadedFile"))
	round.AnswerText = answerText
	round.HumanOmniWindow = sanitizeHumanOmniWindow(extractNestedMap(aiResponse, "humanOmniWindow"))
	round.ActionObservations = actionObservations
	round.ASR = asr
	round.HumanOmniSummary = firstNonEmptyInquiry(
		extractStringMap(aiResponse, "humanOmniWindow", "rawSummary"),
		extractStringMap(aiResponse, "humanOmni", "rawSummary"),
	)
	transcriptAsset := h.renderRoundTranscriptAsset(c, claims, round)
	round.TranscriptAsset = &transcriptAsset
	round.TranscriptBlock = h.buildRoundTranscriptBlock(c, claims, round, transcriptAsset)
	round.Status = "uploaded"
	summaryAsset := h.renderRoundSummaryAsset(c, claims, round)
	round.SummaryAsset = &summaryAsset
	round.SummaryBlock = h.buildRoundSummaryBlock(c, claims, round, summaryAsset)
	session.UpdatedAt = time.Now().UTC()

	c.JSON(http.StatusOK, h.snapshotProtectedSession(session.SessionID))
}

func (h *Handler) handleProtectedFollowup(c *gin.Context) {
	if h.sensitive == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"message": "敏感图片服务未启用"})
		return
	}
	claims, ok := auth.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}
	var req protectedFollowupRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求参数无效"})
		return
	}

	session, currentRound, ok := h.authorizeCurrentProtectedSession(c.Param("sessionId"), claims.UserID)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"message": "受保护问询会话不存在"})
		return
	}

	if currentRound.Status != "uploaded" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "当前轮次尚未完成受保护摘要上传"})
		return
	}

	memoryContext := h.loadMemoryContext(session.SessionID, session.PassengerID)
	aiPayload := map[string]any{
		"sessionId":          session.SessionID,
		"roundNo":            currentRound.RoundNumber + 1,
		"passengerProfile":   session.PassengerProfile,
		"tripProfile":        session.TripProfile,
		"qaHistory":          h.buildQaHistory(session),
		"humanOmniWindows":   h.buildHumanOmniWindows(session),
		"actionObservations": h.buildActionObservationHistory(session),
		"asr":                cloneMap(currentRound.ASR),
		"memoryContext":      memoryContext,
		"constraints": map[string]any{
			"questionCount": 3,
			"tone":          "中性、专业、非指控",
			"language":      "zh-CN",
		},
		"riskCaseContext": cloneMap(session.RiskCaseContext),
	}
	logFollowupAsrPayload(session.SessionID, currentRound.RoundNumber+1, currentRound.ASR, aiPayload["qaHistory"])
	aiResponse, err := h.postAIJSON("/v1/inquiry/followup-guidance", aiPayload)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	nextRound := h.buildFollowupRound(c, claims, aiResponse, currentRound.RoundNumber+1)
	session.Rounds = append(session.Rounds, nextRound)
	session.CurrentRoundID = nextRound.ID
	memoryAsset := h.renderMemoryAsset(c, claims, session.SessionID, session.PassengerID, memoryContext)
	session.MemoryAsset = optionalAsset(memoryAsset)
	session.MemoryBlock = h.buildMemoryBlock(c, claims, session.SessionID, session.PassengerID, memoryContext, memoryAsset)
	session.UpdatedAt = time.Now().UTC()

	c.JSON(http.StatusOK, h.snapshotProtectedSession(session.SessionID))
}

func (h *Handler) handleProtectedJudgement(c *gin.Context) {
	if h.sensitive == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"message": "敏感图片服务未启用"})
		return
	}
	claims, ok := auth.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	session, currentRound, ok := h.authorizeCurrentProtectedSession(c.Param("sessionId"), claims.UserID)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"message": "受保护问询会话不存在"})
		return
	}

	memoryContext := h.loadMemoryContext(session.SessionID, session.PassengerID)
	aiPayload := map[string]any{
		"sessionId":          session.SessionID,
		"roundNo":            currentRound.RoundNumber + 1,
		"passengerProfile":   session.PassengerProfile,
		"tripProfile":        session.TripProfile,
		"qaHistory":          h.buildQaHistory(session),
		"humanOmniWindows":   h.buildHumanOmniWindows(session),
		"actionObservations": h.buildActionObservationHistory(session),
		"asr":                currentRound.ASR,
		"memoryContext":      memoryContext,
		"constraints": map[string]any{
			"questionCount": 3,
			"tone":          "中性、专业、非指控",
			"language":      "zh-CN",
		},
		"riskCaseContext": cloneMap(session.RiskCaseContext),
	}
	aiResponse, err := h.postAIJSON("/v1/inquiry/followup-guidance", aiPayload)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"message": err.Error()})
		return
	}

	judgementAsset := h.renderJudgementAsset(c, claims, aiResponse, session)
	session.JudgementAsset = &judgementAsset
	session.JudgementBlock = h.buildJudgementBlock(c, claims, aiResponse, session, judgementAsset)
	session.JudgementData = cloneMap(aiResponse)
	session.UpdatedAt = time.Now().UTC()

	c.JSON(http.StatusOK, h.snapshotProtectedSession(session.SessionID))
}

func (h *Handler) handleProtectedMemory(c *gin.Context) {
	if h.sensitive == nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{"message": "敏感图片服务未启用"})
		return
	}
	claims, ok := auth.ClaimsFromContext(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}
	session, ok := h.authorizeProtectedSession(c.Param("sessionId"), claims.UserID)
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"message": "受保护问询会话不存在"})
		return
	}

	context := h.loadMemoryContext(session.SessionID, session.PassengerID)
	asset := h.renderMemoryAsset(c, claims, session.SessionID, session.PassengerID, context)
	session.MemoryAsset = optionalAsset(asset)
	session.MemoryBlock = h.buildMemoryBlock(c, claims, session.SessionID, session.PassengerID, context, asset)
	session.UpdatedAt = time.Now().UTC()

	c.JSON(http.StatusOK, gin.H{
		"asset": asset,
	})
}

func (h *Handler) handleHealth(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"service": "ipra-c-voice-llm",
	})
}

func (h *Handler) handleASRTranscribe(c *gin.Context) {
	c.Header("X-IPRA-Deprecated", "true")
	c.Header("Warning", `299 - "legacy plaintext inquiry endpoint is deprecated; use protected inquiry flow"`)
	if err := c.Request.ParseMultipartForm(16 << 20); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "expected multipart form data"})
		return
	}

	var audioBytes int64
	file, _, err := c.Request.FormFile("audio")
	if err == nil {
		defer file.Close()
		n, copyErr := io.Copy(io.Discard, file)
		if copyErr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": "failed to read audio"})
			return
		}
		audioBytes = n
	} else if !errors.Is(err, http.ErrMissingFile) {
		c.JSON(http.StatusBadRequest, gin.H{"message": "failed to read audio"})
		return
	}

	durationMs := 0
	if rawDuration := strings.TrimSpace(c.PostForm("durationMs")); rawDuration != "" {
		parsed, parseErr := strconv.Atoi(rawDuration)
		if parseErr != nil || parsed < 0 {
			c.JSON(http.StatusBadRequest, gin.H{"message": "durationMs must be a non-negative integer"})
			return
		}
		durationMs = parsed
	}

	transcript := strings.TrimSpace(c.PostForm("fallbackTranscript"))
	confidence := 0.92
	switch {
	case transcript != "":
		confidence = 0.99
	case audioBytes > 0:
		transcript = "模拟转写：旅客表示本次出境主要是旅游，并愿意配合进一步核验。"
	default:
		transcript = "模拟转写：未检测到有效音频，请输入旅客回答文本后继续。"
		confidence = 0.45
	}

	c.JSON(http.StatusOK, asrResponse{
		Transcript: transcript,
		Confidence: confidence,
		Language:   "zh-CN",
		AudioBytes: audioBytes,
		DurationMs: durationMs,
	})
}

func (h *Handler) handleCreateSession(c *gin.Context) {
	c.Header("X-IPRA-Deprecated", "true")
	c.Header("Warning", `299 - "legacy plaintext inquiry endpoint is deprecated; use protected inquiry flow"`)
	var req createSessionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "invalid JSON body"})
		return
	}

	maxRounds := req.MaxRounds
	if maxRounds == 0 {
		maxRounds = defaultMaxRounds
	}
	if maxRounds < minMaxRounds || maxRounds > maxMaxRounds {
		c.JSON(http.StatusBadRequest, gin.H{"message": "maxRounds must be between 1 and 10"})
		return
	}

	question := strings.TrimSpace(req.InitialQuestion)
	if question == "" {
		question = buildInitialQuestion(req.Passenger)
	}

	now := time.Now().UTC().Format(time.RFC3339)
	session := &Session{
		SessionID:       h.newSessionID(),
		Passenger:       req.Passenger,
		CurrentRound:    0,
		MaxRounds:       maxRounds,
		CurrentQuestion: question,
		Status:          "active",
		History:         []Turn{},
		CreatedAt:       now,
		UpdatedAt:       now,
	}

	h.mu.Lock()
	h.sessions[session.SessionID] = session
	h.mu.Unlock()

	c.JSON(http.StatusCreated, session)
}

func (h *Handler) handleGetSession(c *gin.Context) {
	c.Header("X-IPRA-Deprecated", "true")
	c.Header("Warning", `299 - "legacy plaintext inquiry endpoint is deprecated; use protected inquiry flow"`)
	session, ok := h.sessionSnapshot(c.Param("sessionId"))
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"message": "session not found"})
		return
	}

	c.JSON(http.StatusOK, session)
}

func (h *Handler) handleSubmitTurn(c *gin.Context) {
	c.Header("X-IPRA-Deprecated", "true")
	c.Header("Warning", `299 - "legacy plaintext inquiry endpoint is deprecated; use protected inquiry flow"`)
	var req submitTurnRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "invalid JSON body"})
		return
	}

	answer := strings.TrimSpace(req.AnswerTranscript)
	if answer == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "answerTranscript is required"})
		return
	}

	h.mu.Lock()
	defer h.mu.Unlock()

	session, ok := h.sessions[c.Param("sessionId")]
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"message": "session not found"})
		return
	}
	if session.Status == "completed" {
		c.JSON(http.StatusOK, buildTurnResponse(session, "", "问询已结束，已触发轮次熔断。", nil, true))
		return
	}

	nextRound := session.CurrentRound + 1
	riskHints := detectRiskHints(answer, req.Signals)
	question, rationale := generateNextQuestion(riskHints, session)
	shouldStop := nextRound >= session.MaxRounds
	if shouldStop {
		question = ""
		rationale = "已达到管理员设置的总交互轮次上限，建议结束当前辅助问询并进入人工定性。"
		session.Status = "completed"
	}

	now := time.Now().UTC().Format(time.RFC3339)
	turn := Turn{
		Round:            nextRound,
		Question:         session.CurrentQuestion,
		AnswerTranscript: answer,
		Signals:          req.Signals,
		RiskHints:        riskHints,
		Rationale:        rationale,
		CreatedAt:        now,
	}
	session.History = append(session.History, turn)
	session.CurrentRound = nextRound
	session.CurrentQuestion = question
	session.UpdatedAt = now

	c.JSON(http.StatusOK, buildTurnResponse(session, question, rationale, riskHints, shouldStop))
}

func (h *Handler) newSessionID() string {
	h.mu.Lock()
	defer h.mu.Unlock()
	h.nextID++
	return fmt.Sprintf("sess-%d-%04d", time.Now().UnixNano(), h.nextID)
}

func (h *Handler) sessionSnapshot(sessionID string) (Session, bool) {
	h.mu.RLock()
	defer h.mu.RUnlock()

	session, ok := h.sessions[sessionID]
	if !ok {
		return Session{}, false
	}
	return cloneSession(session), true
}

func buildTurnResponse(session *Session, nextQuestion string, rationale string, riskHints []string, shouldStop bool) turnResponse {
	return turnResponse{
		SessionID:       session.SessionID,
		NextQuestion:    nextQuestion,
		Rationale:       rationale,
		RiskHints:       riskHints,
		CurrentRound:    session.CurrentRound,
		MaxRounds:       session.MaxRounds,
		ShouldStop:      shouldStop,
		Status:          session.Status,
		CurrentQuestion: session.CurrentQuestion,
		History:         append([]Turn(nil), session.History...),
	}
}

func buildInitialQuestion(passenger Passenger) string {
	name := strings.TrimSpace(passenger.Name)
	destination := strings.TrimSpace(passenger.Destination)
	purpose := strings.TrimSpace(passenger.Purpose)

	if name == "" {
		name = "旅客"
	}
	if destination == "" {
		destination = "本次目的地"
	}
	if purpose == "" {
		purpose = "出境目的"
	}

	return fmt.Sprintf("%s，请先说明你本次前往%s的主要目的（如%s）、停留时间和费用来源。", name, destination, purpose)
}

func detectRiskHints(answer string, signals []Signal) []string {
	rules := []struct {
		hint  string
		terms []string
	}{
		{hint: "疑似涉赌目的", terms: []string{"赌博", "博彩", "赌场", "筹码", "娱乐城"}},
		{hint: "资金来源需核验", terms: []string{"借款", "贷款", "欠债", "现金", "转账", "银行卡"}},
		{hint: "同行人与邀约关系需核验", terms: []string{"朋友", "网友", "介绍", "中介", "带我"}},
		{hint: "境外务工或招聘线索", terms: []string{"工作", "务工", "招聘", "老板", "工资"}},
		{hint: "行程安排不清晰", terms: []string{"不知道", "不清楚", "临时", "随便", "还没订"}},
	}

	hints := make([]string, 0, 4)
	seen := make(map[string]bool)
	for _, rule := range rules {
		for _, term := range rule.terms {
			if strings.Contains(answer, term) {
				if !seen[rule.hint] {
					hints = append(hints, rule.hint)
					seen[rule.hint] = true
				}
				break
			}
		}
	}

	for _, signal := range signals {
		if signal.Severity >= 0.7 {
			hint := "存在高强度多模态异常信号"
			if strings.TrimSpace(signal.Label) != "" {
				hint = "多模态异常：" + strings.TrimSpace(signal.Label)
			}
			if !seen[hint] {
				hints = append(hints, hint)
				seen[hint] = true
			}
		}
	}

	if len(hints) == 0 {
		return []string{"暂无明显风险关键词"}
	}
	return hints
}

func generateNextQuestion(riskHints []string, session *Session) (string, string) {
	primary := ""
	if len(riskHints) > 0 {
		primary = riskHints[0]
	}

	switch primary {
	case "疑似涉赌目的":
		return "你提到的娱乐或博彩相关安排是谁推荐的？请说明具体地点、同行人员和预计花费。", "回答中出现涉赌相关关键词，需要追问真实目的与资金安排。"
	case "资金来源需核验":
		return "请详细说明本次出行费用来源、携带现金或银行卡情况，以及是否存在他人资助。", "回答中出现资金压力或转账线索，需要核验费用来源。"
	case "同行人与邀约关系需核验":
		return "请说明邀请你出行的人与你的关系、认识时间、联系方式，以及对方是否安排了行程。", "回答涉及朋友、网友或中介邀约，需要核验关系链。"
	case "境外务工或招聘线索":
		return "请说明境外是否已有工作安排、雇主信息、薪资承诺和合同材料。", "回答中出现务工招聘线索，需要排查与申报目的是否一致。"
	case "行程安排不清晰":
		return "请按时间顺序说明到达后的住宿、交通、联系人和返程安排。", "回答对行程细节不清晰，需要追问可验证安排。"
	default:
		if strings.HasPrefix(primary, "多模态异常：") || primary == "存在高强度多模态异常信号" {
			return "刚才回答时系统捕捉到异常反馈，请你重新说明该问题的关键事实，并补充可核验材料。", "接收到高强度多模态异常信号，需要围绕同一问题复核。"
		}
	}

	nextIndex := session.CurrentRound + 2
	return fmt.Sprintf("请继续补充第%d轮核验信息：本次出境目的、行程安排和资金来源是否均能提供证明？", nextIndex), "未发现明显风险关键词，继续进行常规一致性核验。"
}

func cloneSession(session *Session) Session {
	clone := *session
	clone.History = append([]Turn(nil), session.History...)
	return clone
}

func (h *Handler) loadMemoryContext(sessionID string, passengerID string) map[string]any {
	if h == nil || h.memoryStore == nil {
		return map[string]any{
			"sessionId":         sessionID,
			"passengerId":       passengerID,
			"sessionMemories":   []any{},
			"passengerMemories": []any{},
			"ruleMemories":      []any{},
		}
	}

	context, err := h.memoryStore.GetContext(memory.ContextRequest{
		SessionID:   sessionID,
		PassengerID: passengerID,
	})
	if err != nil {
		return map[string]any{
			"sessionId":         sessionID,
			"passengerId":       passengerID,
			"sessionMemories":   []any{},
			"passengerMemories": []any{},
			"ruleMemories":      []any{},
		}
	}

	payload, _ := json.Marshal(context)
	result := map[string]any{}
	_ = json.Unmarshal(payload, &result)
	return result
}

func (h *Handler) postAIJSON(path string, payload map[string]any) (map[string]any, error) {
	if h == nil || h.aiServiceBaseURL == "" {
		return nil, errors.New("AI-Service 未配置")
	}
	body, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPost, h.aiServiceBaseURL+path, bytes.NewReader(body))
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := h.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	if resp.StatusCode >= 400 {
		return nil, fmt.Errorf("AI-Service 请求失败: %s", strings.TrimSpace(string(respBody)))
	}

	result := map[string]any{}
	if err := json.Unmarshal(respBody, &result); err != nil {
		return nil, err
	}
	return result, nil
}

func (h *Handler) postAIForm(path string, filename string, contentType string, fileBytes []byte, fields map[string]string) (map[string]any, error) {
	if h == nil || h.aiServiceBaseURL == "" {
		return nil, errors.New("AI-Service 未配置")
	}

	var body bytes.Buffer
	writer := multipart.NewWriter(&body)
	part, err := writer.CreateFormFile("file", filename)
	if err != nil {
		return nil, err
	}
	if _, err := part.Write(fileBytes); err != nil {
		return nil, err
	}
	for key, value := range fields {
		if strings.TrimSpace(value) == "" {
			continue
		}
		if err := writer.WriteField(key, value); err != nil {
			return nil, err
		}
	}
	if err := writer.Close(); err != nil {
		return nil, err
	}

	req, err := http.NewRequest(http.MethodPost, h.aiServiceBaseURL+path, &body)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Content-Type", writer.FormDataContentType())
	if strings.TrimSpace(contentType) != "" {
		req.Header.Set("X-Upload-Content-Type", contentType)
	}

	resp, err := h.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	if resp.StatusCode >= 400 {
		return nil, fmt.Errorf("AI-Service 请求失败: %s", strings.TrimSpace(string(respBody)))
	}

	result := map[string]any{}
	if err := json.Unmarshal(respBody, &result); err != nil {
		return nil, err
	}
	return result, nil
}

func (h *Handler) authorizeProtectedSession(sessionID string, userID uint64) (*ProtectedSession, bool) {
	h.mu.RLock()
	defer h.mu.RUnlock()
	session, ok := h.protectedSessions[sessionID]
	if !ok || session.OwnerUserID != userID {
		return nil, false
	}
	return session, true
}

func (h *Handler) authorizeCurrentProtectedSession(sessionID string, userID uint64) (*ProtectedSession, *ProtectedRound, bool) {
	session, ok := h.authorizeProtectedSession(sessionID, userID)
	if !ok {
		return nil, nil, false
	}
	for _, round := range session.Rounds {
		if round.ID == session.CurrentRoundID {
			return session, round, true
		}
	}
	return nil, nil, false
}

func (h *Handler) authorizeProtectedRound(sessionID string, roundID string, userID uint64) (*ProtectedSession, *ProtectedRound, bool) {
	session, ok := h.authorizeProtectedSession(sessionID, userID)
	if !ok {
		return nil, nil, false
	}
	for _, round := range session.Rounds {
		if round.ID == roundID {
			return session, round, true
		}
	}
	return nil, nil, false
}

func (h *Handler) snapshotProtectedSession(sessionID string) ProtectedSessionSnapshot {
	session, ok := h.protectedSessions[sessionID]
	if !ok {
		return ProtectedSessionSnapshot{}
	}

	historical := make([]ProtectedRoundSnapshot, 0, len(session.Rounds))
	completedRounds := 0
	totalDuration := 0
	var currentRound *ProtectedRoundSnapshot
	for _, round := range session.Rounds {
		snapshot := ProtectedRoundSnapshot{
			ID:               round.ID,
			RoundNumber:      round.RoundNumber,
			Title:            round.Title,
			QuestionCount:    round.QuestionCount,
			Status:           round.Status,
			PromptBlock:      toProtectedBlockSnapshot(round.PromptBlock),
			SummaryBlock:     toProtectedBlockSnapshot(round.SummaryBlock),
			TranscriptBlock:  toProtectedBlockSnapshot(round.TranscriptBlock),
			PromptAsset:      round.PromptAsset,
			SummaryAsset:     round.SummaryAsset,
			TranscriptAsset:  round.TranscriptAsset,
			RecordedFileName: round.RecordedFileName,
			UploadedFile:     sanitizeUploadedFile(cloneMap(round.UploadedFile)),
			HumanOmniWindow:  sanitizeHumanOmniWindow(cloneMap(round.HumanOmniWindow)),
		}
		if round.ID == session.CurrentRoundID {
			currentRound = &snapshot
		} else {
			historical = append(historical, snapshot)
		}
		if round.Status == "uploaded" {
			completedRounds++
			totalDuration += round.DurationSeconds
		}
	}

	return ProtectedSessionSnapshot{
		SessionID:           session.SessionID,
		Profile:             session.ProfileBlock,
		StrategyBlock:       toProtectedBlockSnapshot(session.StrategyBlock),
		MemoryBlock:         toProtectedBlockSnapshot(session.MemoryBlock),
		StrategyAsset:       session.StrategyAsset,
		MemoryAsset:         session.MemoryAsset,
		CurrentRound:        currentRound,
		HistoricalRounds:    historical,
		JudgementBlock:      toProtectedBlockSnapshot(session.JudgementBlock),
		JudgementAsset:      session.JudgementAsset,
		CompletedRounds:     completedRounds,
		TotalSampleDuration: totalDuration,
	}
}

func (h *Handler) ArchiveSnapshot(sessionID string, userID uint64) (ArchiveSessionSnapshot, bool) {
	session, ok := h.authorizeProtectedSession(sessionID, userID)
	if !ok {
		return ArchiveSessionSnapshot{}, false
	}

	rounds := make([]ArchiveRoundSnapshot, 0, len(session.Rounds))
	completedRounds := 0
	totalDuration := 0
	for _, round := range session.Rounds {
		rounds = append(rounds, ArchiveRoundSnapshot{
			ID:                 round.ID,
			RoundNumber:        round.RoundNumber,
			Title:              round.Title,
			QuestionCount:      round.QuestionCount,
			Status:             round.Status,
			DurationSeconds:    round.DurationSeconds,
			RecordedFileName:   round.RecordedFileName,
			AnswerText:         round.AnswerText,
			PromptQuestions:    append([]string(nil), round.PromptQuestions...),
			HumanOmniSummary:   round.HumanOmniSummary,
			HumanOmniWindow:    cloneMap(round.HumanOmniWindow),
			ActionObservations: cloneMapSlice(round.ActionObservations),
			ASR:                cloneMap(round.ASR),
		})
		if round.Status == "uploaded" {
			completedRounds++
			totalDuration += round.DurationSeconds
		}
	}

	return ArchiveSessionSnapshot{
		SessionID:           session.SessionID,
		OwnerUserID:         session.OwnerUserID,
		PassengerRowID:      session.PassengerRowID,
		PassengerName:       session.PassengerName,
		PassengerDocNum:     session.PassengerDocNum,
		PassengerProfile:    cloneMap(session.PassengerProfile),
		TripProfile:         cloneMap(session.TripProfile),
		KnownFacts:          append([]string(nil), session.KnownFacts...),
		JudgementData:       cloneMap(session.JudgementData),
		Rounds:              rounds,
		CompletedRounds:     completedRounds,
		TotalSampleDuration: totalDuration,
	}, true
}

func sanitizeUploadedFile(value map[string]any) map[string]any {
	if len(value) == 0 {
		return nil
	}
	result := map[string]any{}
	if filename := extractString(value["filename"]); filename != "" {
		result["filename"] = filename
	}
	if contentType := extractString(value["contentType"]); contentType != "" {
		result["contentType"] = contentType
	}
	if sizeBytes, ok := asInquiryNumber(value["sizeBytes"]); ok {
		result["sizeBytes"] = sizeBytes
	}
	return result
}

func sanitizeHumanOmniWindow(value map[string]any) map[string]any {
	if len(value) == 0 {
		return nil
	}
	result := map[string]any{}
	for _, key := range []string{
		"windowId",
		"questionId",
		"startSeconds",
		"endSeconds",
		"modal",
		"modelName",
	} {
		if raw, ok := value[key]; ok && raw != nil {
			result[key] = raw
		}
	}
	return result
}

func toProtectedBlockSnapshot(item *sensitive.ListItem) *ProtectedBlockSnapshot {
	if item == nil {
		return nil
	}

	result := &ProtectedBlockSnapshot{
		Fields: append([]sensitive.FieldRef(nil), item.Fields...),
		Chips:  append([]sensitive.FieldRef(nil), item.Chips...),
		Facts:  append([]sensitive.FactRef(nil), item.Facts...),
		Meta:   append([]sensitive.FieldRef(nil), item.Meta...),
		Notes:  append([]sensitive.FieldRef(nil), item.Notes...),
	}
	if item.Asset.ID != "" {
		asset := item.Asset
		result.Asset = &asset
	}
	return result
}

func (h *Handler) renderStrategyAsset(c *gin.Context, claims auth.Claims, response map[string]any) sensitive.AssetRef {
	document := sensitive.Document{
		Eyebrow:  "辅助问询",
		Title:    "首轮策略与问题包",
		Subtitle: extractStringMap(response, "llm", "model"),
		Tags: compactInquiryStrings([]string{
			extractStringMap(response, "riskAssessment", "summary"),
			"问题数 " + strconv.Itoa(len(extractMapSlice(response["questions"]))),
		}),
		Sections: []sensitive.Section{
			{
				Heading: "风险预评估",
				Lines: compactInquiryStrings([]string{
					formatInquiryLine("风险等级", extractStringMap(response, "riskAssessment", "level")),
					formatInquiryLine("风险摘要", extractStringMap(response, "riskAssessment", "summary")),
				}),
			},
			{
				Heading: "工作人员提示",
				Lines: compactInquiryStrings([]string{
					extractString(response["operatorNote"]),
				}),
			},
			{
				Heading: "问题包",
				Lines:   buildQuestionLines(extractMapSlice(response["questions"])),
			},
		},
	}

	return h.sensitive.Put(claims.UserID, document, sensitive.PresetDialog, sensitive.FormatPNG, buildInquiryWatermark(c, claims, "home:ask:strategy"))
}

func (h *Handler) renderMemoryAsset(c *gin.Context, claims auth.Claims, sessionID string, passengerID string, context map[string]any) sensitive.AssetRef {
	lines := make([]string, 0, 16)
	for _, key := range []string{"sessionMemories", "passengerMemories", "ruleMemories"} {
		for _, item := range extractMapSlice(context[key]) {
			lines = append(lines, compactInquiryStrings([]string{
				formatInquiryLine("标题", extractString(item["title"])),
				formatInquiryLine("内容", extractString(item["content"])),
				formatInquiryLine("类型", extractString(item["memoryType"])),
				formatInquiryLine("来源", extractString(item["source"])),
			})...)
		}
	}
	if len(lines) == 0 {
		lines = append(lines, "当前暂无可展示记忆。")
	}

	document := sensitive.Document{
		Eyebrow:  "辅助问询",
		Title:    "智能体记忆",
		Subtitle: "会话 " + sessionID,
		Sections: []sensitive.Section{
			{
				Heading: "记忆上下文",
				Lines:   lines,
			},
		},
		Footer: []string{
			"旅客标识 " + passengerID,
		},
	}
	return h.sensitive.Put(claims.UserID, document, sensitive.PresetDialog, sensitive.FormatPNG, buildInquiryWatermark(c, claims, "home:ask:memory"))
}

func (h *Handler) buildOpeningRound(c *gin.Context, claims auth.Claims, response map[string]any) *ProtectedRound {
	questions := buildQuestionLines(extractMapSlice(response["questions"]))
	round := &ProtectedRound{
		ID:              "round-1",
		RoundNumber:     1,
		Title:           "第 1 轮 · 首轮策略执行",
		QuestionCount:   len(questions),
		Status:          "pending",
		PromptQuestions: questions,
	}
	asset := h.renderRoundPromptAsset(c, claims, round, extractString(response["operatorNote"]), extractStringMap(response, "riskAssessment", "summary"))
	round.PromptAsset = &asset
	return round
}

func (h *Handler) buildFollowupRound(c *gin.Context, claims auth.Claims, response map[string]any, roundNumber int) *ProtectedRound {
	questions := buildFollowupQuestionLines(extractMapSlice(response["followupGuidance"]))
	round := &ProtectedRound{
		ID:              fmt.Sprintf("round-%d", roundNumber),
		RoundNumber:     roundNumber,
		Title:           fmt.Sprintf("第 %d 轮 · AI 追问引导", roundNumber),
		QuestionCount:   len(questions),
		Status:          "pending",
		PromptQuestions: questions,
	}
	asset := h.renderRoundPromptAsset(c, claims, round, extractString(response["operatorNote"]), extractStringMap(response, "multimodalAssessment", "summary"))
	round.PromptAsset = &asset
	return round
}

func (h *Handler) renderRoundPromptAsset(c *gin.Context, claims auth.Claims, round *ProtectedRound, note string, summary string) sensitive.AssetRef {
	document := sensitive.Document{
		Eyebrow:  "辅助问询",
		Title:    round.Title,
		Subtitle: summary,
		Sections: []sensitive.Section{
			{
				Heading: "工作人员提示",
				Lines:   compactInquiryStrings([]string{note}),
			},
			{
				Heading: "问题列表",
				Lines:   round.PromptQuestions,
			},
		},
	}
	return h.sensitive.Put(claims.UserID, document, sensitive.PresetDialog, sensitive.FormatPNG, buildInquiryWatermark(c, claims, "home:ask:round"))
}

func (h *Handler) renderRoundSummaryAsset(c *gin.Context, claims auth.Claims, round *ProtectedRound) sensitive.AssetRef {
	document := sensitive.Document{
		Eyebrow:  "辅助问询",
		Title:    round.Title + " 摘要",
		Subtitle: "本轮采样与窗口摘要",
		Sections: []sensitive.Section{
			{
				Heading: "摘要",
				Lines: compactInquiryStrings([]string{
					formatInquiryLine("录制文件", round.RecordedFileName),
					formatInquiryLine("采样时长", strconv.Itoa(round.DurationSeconds)+" 秒"),
					formatInquiryLine("回答文本", round.AnswerText),
					formatInquiryLine("窗口摘要", round.HumanOmniSummary),
				}),
			},
		},
	}
	return h.sensitive.Put(claims.UserID, document, sensitive.PresetDialog, sensitive.FormatPNG, buildInquiryWatermark(c, claims, "home:ask:summary"))
}

func (h *Handler) renderRoundTranscriptAsset(c *gin.Context, claims auth.Claims, round *ProtectedRound) sensitive.AssetRef {
	transcript := roundTranscriptText(round)
	document := sensitive.Document{
		Eyebrow:  "辅助问询",
		Title:    round.Title + " 语音转写",
		Subtitle: "本轮旅客回答语音转文字内容",
		Sections: []sensitive.Section{
			{
				Heading: "语音转写内容",
				Lines: compactInquiryStrings([]string{
					firstNonEmptyInquiry(transcript, "未识别到有效语音转写内容。"),
				}),
			},
		},
	}
	return h.sensitive.Put(claims.UserID, document, sensitive.PresetDialog, sensitive.FormatPNG, buildInquiryWatermark(c, claims, "home:ask:transcript"))
}

func (h *Handler) renderJudgementAsset(c *gin.Context, claims auth.Claims, response map[string]any, session *ProtectedSession) sensitive.AssetRef {
	document := sensitive.Document{
		Eyebrow:  "辅助问询",
		Title:    "人工辅助判断摘要",
		Subtitle: extractStringMap(response, "multimodalAssessment", "summary"),
		Sections: []sensitive.Section{
			{
				Heading: "风险提示",
				Lines:   extractStringSliceMap(response, "multimodalAssessment", "riskHints"),
			},
			{
				Heading: "证据摘要",
				Lines:   extractStringSliceMap(response, "multimodalAssessment", "evidence"),
			},
			{
				Heading: "工作人员提示",
				Lines:   compactInquiryStrings([]string{extractString(response["operatorNote"])}),
			},
			{
				Heading: "注意事项",
				Lines:   extractStringSlice(response["warnings"]),
			},
		},
		Footer: []string{
			"已完成轮次 " + strconv.Itoa(len(session.Rounds)),
		},
	}
	return h.sensitive.Put(claims.UserID, document, sensitive.PresetDialog, sensitive.FormatPNG, buildInquiryWatermark(c, claims, "home:ask:judgement"))
}

func (h *Handler) buildStrategyBlock(
	c *gin.Context,
	claims auth.Claims,
	response map[string]any,
	asset sensitive.AssetRef,
) *sensitive.ListItem {
	return &sensitive.ListItem{
		ID:    "strategy",
		Asset: asset,
		Facts: []sensitive.FactRef{
			h.buildInlineFact(c, claims, "风险摘要", extractStringMap(response, "riskAssessment", "summary"), "home:ask:strategy"),
			h.buildInlineFact(c, claims, "模型", extractStringMap(response, "llm", "model"), "home:ask:strategy"),
		},
		Meta: h.buildInlineTags(c, claims, extractStringSliceMap(response, "riskAssessment", "reasons"), sensitive.TagToneAccent, "home:ask:strategy:meta"),
		Notes: h.buildInlineTags(c, claims, compactInquiryStrings([]string{
			extractString(response["operatorNote"]),
		}), sensitive.TagToneMuted, "home:ask:strategy:note"),
	}
}

func (h *Handler) buildRoundTranscriptBlock(
	c *gin.Context,
	claims auth.Claims,
	round *ProtectedRound,
	asset sensitive.AssetRef,
) *sensitive.ListItem {
	transcript := roundTranscriptText(round)
	return &sensitive.ListItem{
		ID:    round.ID + "-transcript",
		Asset: asset,
		Facts: []sensitive.FactRef{
			h.buildInlineFact(c, claims, "转写状态", firstNonEmptyInquiry(extractString(round.ASR["status"]), "not_connected"), "home:ask:transcript"),
			h.buildInlineFact(c, claims, "服务", firstNonEmptyInquiry(extractString(round.ASR["provider"]), "-"), "home:ask:transcript"),
		},
		Notes: h.buildInlineTags(c, claims, compactInquiryStrings([]string{
			truncateInquiryText(transcript, 80),
		}), sensitive.TagToneMuted, "home:ask:transcript:note"),
	}
}

func roundTranscriptText(round *ProtectedRound) string {
	if round == nil {
		return ""
	}
	if text := strings.TrimSpace(extractString(round.ASR["text"])); text != "" {
		return text
	}
	return strings.TrimSpace(round.AnswerText)
}

func truncateInquiryText(value string, limit int) string {
	runes := []rune(strings.TrimSpace(value))
	if limit <= 0 || len(runes) <= limit {
		return string(runes)
	}
	return string(runes[:limit]) + "..."
}

func (h *Handler) buildMemoryBlock(
	c *gin.Context,
	claims auth.Claims,
	sessionID string,
	passengerID string,
	context map[string]any,
	asset sensitive.AssetRef,
) *sensitive.ListItem {
	notes := []string{
		"会话 " + firstNonEmptyInquiry(sessionID, "-"),
		"旅客标识 " + firstNonEmptyInquiry(passengerID, "-"),
	}
	lines := make([]string, 0, 6)
	for _, key := range []string{"sessionMemories", "passengerMemories", "ruleMemories"} {
		lines = append(lines, strconv.Itoa(len(extractMapSlice(context[key])))+" 条"+key)
	}
	return &sensitive.ListItem{
		ID:    "memory",
		Asset: asset,
		Notes: h.buildInlineTags(c, claims, compactInquiryStrings(notes), sensitive.TagToneMuted, "home:ask:memory:note"),
		Meta:  h.buildInlineTags(c, claims, compactInquiryStrings(lines), sensitive.TagToneAccent, "home:ask:memory:meta"),
	}
}

func (h *Handler) buildRoundSummaryBlock(
	c *gin.Context,
	claims auth.Claims,
	round *ProtectedRound,
	asset sensitive.AssetRef,
) *sensitive.ListItem {
	return &sensitive.ListItem{
		ID:    round.ID + "-summary",
		Asset: asset,
		Facts: []sensitive.FactRef{
			h.buildInlineFact(c, claims, "采样时长", strconv.Itoa(round.DurationSeconds)+" 秒", "home:ask:summary"),
			h.buildInlineFact(c, claims, "录制文件", round.RecordedFileName, "home:ask:summary"),
		},
		Notes: h.buildInlineTags(c, claims, compactInquiryStrings([]string{
			round.HumanOmniSummary,
		}), sensitive.TagToneMuted, "home:ask:summary:note"),
	}
}

func (h *Handler) buildJudgementBlock(
	c *gin.Context,
	claims auth.Claims,
	response map[string]any,
	session *ProtectedSession,
	asset sensitive.AssetRef,
) *sensitive.ListItem {
	return &sensitive.ListItem{
		ID:    "judgement",
		Asset: asset,
		Facts: []sensitive.FactRef{
			h.buildInlineFact(c, claims, "已完成轮次", strconv.Itoa(len(session.Rounds))+" 轮", "home:ask:judgement"),
			h.buildInlineFact(c, claims, "摘要", extractStringMap(response, "multimodalAssessment", "summary"), "home:ask:judgement"),
		},
		Meta: h.buildInlineTags(c, claims, extractStringSliceMap(response, "multimodalAssessment", "riskHints"), sensitive.TagToneAccent, "home:ask:judgement:meta"),
		Notes: h.buildInlineTags(c, claims, compactInquiryStrings([]string{
			extractString(response["operatorNote"]),
		}), sensitive.TagToneMuted, "home:ask:judgement:note"),
	}
}

func (h *Handler) buildProtectedProfileBlock(
	c *gin.Context,
	claims auth.Claims,
	record profile.SearchProfileResponse,
) *sensitive.ListItem {
	meta := h.buildInlineTags(
		c,
		claims,
		compactInquiryStrings(buildInquiryKnownFacts(record)),
		sensitive.TagToneAccent,
		"home:ask:profile:meta",
	)

	chips := []sensitive.FieldRef{
		{
			Key:   "documentNum",
			Asset: putInquiryInlineTextAsset(h, c, claims, firstNonEmptyInquiry(strings.TrimSpace(record.DocumentNum), "-"), "home:ask:profile:chip"),
			Tone:  sensitive.TagToneIdentity,
		},
	}
	if record.IsHighRisk {
		chips = append(chips, sensitive.FieldRef{
			Key:   "highRisk",
			Asset: putInquiryInlineTextAsset(h, c, claims, "高风险预警", "home:ask:profile:chip"),
			Tone:  sensitive.TagToneAlert,
		})
	}

	return &sensitive.ListItem{
		ID: "profile",
		Fields: []sensitive.FieldRef{
			{
				Key:   "fullName",
				Asset: putInquiryInlineTextAsset(h, c, claims, firstNonEmptyInquiry(strings.TrimSpace(record.FullName), "旅客画像"), "home:ask:profile:field"),
			},
		},
		Chips: chips,
		Facts: []sensitive.FactRef{
			h.buildInlineFact(c, claims, "证件号", firstNonEmptyInquiry(strings.TrimSpace(record.DocumentNum), "-"), "home:ask:profile:fact"),
			h.buildInlineFact(c, claims, "画像状态", "已载入", "home:ask:profile:fact"),
		},
		Meta: meta,
		Notes: h.buildInlineTags(
			c,
			claims,
			compactInquiryStrings([]string{
				strings.TrimSpace(record.RiskReason),
			}),
			sensitive.TagToneMuted,
			"home:ask:profile:note",
		),
		Flags: map[string]bool{
			"isHighRisk": record.IsHighRisk,
		},
	}
}

func buildInquiryPassengerProfile(record profile.SearchProfileResponse) map[string]any {
	profileData := cloneMap(record.ProfileData)
	basicInfo := cloneMap(asInquiryRecord(profileData["basicInfo"]))
	occupation := cloneMap(asInquiryRecord(profileData["occupation"]))
	tripInfo := cloneMap(asInquiryRecord(profileData["tripInfo"]))

	return map[string]any{
		"passengerId":   strings.TrimSpace(record.DocumentNum),
		"name":          strings.TrimSpace(record.FullName),
		"gender":        firstNonEmptyInquiry(extractInquiryString(basicInfo["gender"])),
		"nationality":   firstNonEmptyInquiry(extractInquiryString(basicInfo["nationality"])),
		"occupation":    firstNonEmptyInquiry(extractInquiryString(occupation["occupation"])),
		"monthlyIncome": firstNonEmptyInquiry(extractInquiryString(occupation["monthlyIncome"])),
		"travelHistory": buildInquiryTravelHistory(record),
		"documents": map[string]any{
			"documentType":   nilIfEmpty(extractInquiryString(basicInfo["documentType"])),
			"issuingRegion":  nilIfEmpty(extractInquiryString(basicInfo["issuingRegion"])),
			"documentNumber": strings.TrimSpace(record.DocumentNum),
			"birthDate":      nilIfEmpty(extractInquiryString(basicInfo["birthDate"])),
			"pnr":            nilIfEmpty(extractInquiryString(tripInfo["pnr"])),
			"flightNo":       nilIfEmpty(extractInquiryString(tripInfo["flightNo"])),
			"seat":           nilIfEmpty(extractInquiryString(tripInfo["seat"])),
		},
	}
}

func buildInquiryTripProfile(record profile.SearchProfileResponse) map[string]any {
	profileData := cloneMap(record.ProfileData)
	tripInfo := cloneMap(asInquiryRecord(profileData["tripInfo"]))
	occupation := cloneMap(asInquiryRecord(profileData["occupation"]))
	return map[string]any{
		"destination":        nilIfEmpty(extractInquiryString(tripInfo["destination"])),
		"purposeDeclared":    nilIfEmpty(extractInquiryString(tripInfo["purposeDeclared"])),
		"stayDays":           asInquiryInt(tripInfo["stayDays"]),
		"ticketType":         nilIfEmpty(extractInquiryString(tripInfo["ticketType"])),
		"returnTicketStatus": nilIfEmpty(extractInquiryString(tripInfo["returnTicketStatus"])),
		"companions":         asInquiryStringSlice(tripInfo["companions"]),
		"accommodation":      nilIfEmpty(extractInquiryString(tripInfo["accommodation"])),
		"fundingSource":      nilIfEmpty(extractInquiryString(occupation["fundingSource"])),
	}
}

func buildInquiryKnownFacts(record profile.SearchProfileResponse) []string {
	profileData := cloneMap(record.ProfileData)
	riskInfo := cloneMap(asInquiryRecord(profileData["riskInfo"]))
	values := []string{}
	if record.IsHighRisk {
		values = append(values, "命中高风险名单")
	}
	if value := strings.TrimSpace(record.RiskReason); value != "" {
		values = append(values, "高风险原因："+value)
	}
	for _, tag := range asInquiryStringSlice(riskInfo["riskTags"]) {
		values = append(values, "风险标签："+tag)
	}
	if value := extractInquiryString(riskInfo["criminalRecord"]); value != "" {
		values = append(values, "违法犯罪记录："+value)
	}
	if value := extractInquiryString(riskInfo["note"]); value != "" {
		values = append(values, "备注："+value)
	}
	return compactInquiryStrings(values)
}

func buildInquiryTravelHistory(record profile.SearchProfileResponse) []string {
	profileData := cloneMap(record.ProfileData)
	travelHistory := cloneMap(asInquiryRecord(profileData["travelHistory"]))
	values := []string{}
	destinations := asInquiryStringSlice(travelHistory["recentDestinations"])
	if len(destinations) > 0 {
		values = append(values, "主要去往："+strings.Join(destinations, "、"))
	}
	if value := extractInquiryString(travelHistory["travelHistorySummary"]); value != "" {
		values = append(values, value)
	}
	if value := extractInquiryString(travelHistory["lastDepartureDate"]); value != "" {
		values = append(values, "最近出境："+value)
	}
	if value := extractInquiryString(travelHistory["abnormalOverstayRecord"]); value != "" {
		values = append(values, "异常滞留："+value)
	}
	if value := extractInquiryString(travelHistory["visaRefusalRecord"]); value != "" {
		values = append(values, "拒签/遣返："+value)
	}
	return compactInquiryStrings(values)
}

func (h *Handler) buildInlineFact(
	c *gin.Context,
	claims auth.Claims,
	label string,
	value string,
	page string,
) sensitive.FactRef {
	return sensitive.FactRef{
		Key:   label,
		Label: label,
		Asset: putInquiryInlineTextAsset(h, c, claims, value, page),
	}
}

func (h *Handler) buildInlineTags(
	c *gin.Context,
	claims auth.Claims,
	values []string,
	tone sensitive.TagTone,
	page string,
) []sensitive.FieldRef {
	result := make([]sensitive.FieldRef, 0, len(values))
	for index, value := range values {
		if strings.TrimSpace(value) == "" {
			continue
		}
		result = append(result, sensitive.FieldRef{
			Key:   fmt.Sprintf("tag-%d", index),
			Asset: putInquiryInlineTextAsset(h, c, claims, value, page),
			Tone:  tone,
		})
	}
	return result
}

func putInquiryInlineTextAsset(
	h *Handler,
	c *gin.Context,
	claims auth.Claims,
	value string,
	page string,
) sensitive.AssetRef {
	document := sensitive.Document{
		Title: firstNonEmptyInquiry(strings.TrimSpace(value), "-"),
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
		buildInquiryWatermark(c, claims, page),
	)
}

func (h *Handler) buildQaHistory(session *ProtectedSession) []map[string]any {
	result := make([]map[string]any, 0, len(session.Rounds))
	for _, round := range session.Rounds {
		if round.AnswerText == "" {
			continue
		}
		result = append(result, map[string]any{
			"questionId":         round.ID,
			"roundNo":            round.RoundNumber,
			"question":           strings.Join(round.PromptQuestions, "\n"),
			"answerText":         round.AnswerText,
			"answerStartSeconds": 0,
			"answerEndSeconds":   round.DurationSeconds,
		})
	}
	return result
}

func logFollowupAsrPayload(sessionID string, roundNo int, asr map[string]any, qaHistory any) {
	provider := extractString(asr["provider"])
	status := extractString(asr["status"])
	text := strings.TrimSpace(extractString(asr["text"]))
	qaCount := 0
	if items, ok := qaHistory.([]map[string]any); ok {
		qaCount = len(items)
	}

	log.Printf(
		"inquiry followup-guidance asr sessionId=%s roundNo=%d status=%q provider=%q textLen=%d text=%q qaHistoryCount=%d",
		sessionID,
		roundNo,
		status,
		provider,
		len([]rune(text)),
		truncateLogText(text, 180),
		qaCount,
	)
}

func truncateLogText(value string, limit int) string {
	runes := []rune(strings.TrimSpace(value))
	if limit <= 0 || len(runes) <= limit {
		return string(runes)
	}
	return string(runes[:limit]) + "..."
}

func (h *Handler) buildHumanOmniWindows(session *ProtectedSession) []map[string]any {
	result := make([]map[string]any, 0, len(session.Rounds))
	for _, round := range session.Rounds {
		if len(round.HumanOmniWindow) == 0 {
			continue
		}
		window := cloneMap(round.HumanOmniWindow)
		if strings.TrimSpace(extractString(window["rawSummary"])) == "" {
			if summary := strings.TrimSpace(round.HumanOmniSummary); summary != "" {
				window["rawSummary"] = summary
			}
		}
		result = append(result, window)
	}
	return result
}

func (h *Handler) buildActionObservationHistory(session *ProtectedSession) []map[string]any {
	result := make([]map[string]any, 0, len(session.Rounds)*2)
	for _, round := range session.Rounds {
		result = append(result, cloneMapSlice(round.ActionObservations)...)
	}
	return result
}

func buildInquiryWatermark(c *gin.Context, claims auth.Claims, page string) sensitive.WatermarkContext {
	return sensitive.NewWatermarkContext(
		strings.TrimSpace(claims.WorkID),
		strings.TrimSpace(claims.Name),
		strings.TrimSpace(claims.Role),
		strings.TrimSpace(c.ClientIP()),
		c.Request.Method+" "+strings.TrimSpace(c.Request.URL.Path),
		page,
	)
}

func optionalAsset(asset sensitive.AssetRef) *sensitive.AssetRef {
	if asset.ID == "" {
		return nil
	}
	return &asset
}

func asInquiryRecord(value any) map[string]any {
	record, ok := value.(map[string]any)
	if !ok || len(record) == 0 {
		return map[string]any{}
	}
	return record
}

func extractInquiryString(value any) string {
	switch typed := value.(type) {
	case string:
		return strings.TrimSpace(typed)
	default:
		return ""
	}
}

func asInquiryStringSlice(value any) []string {
	switch typed := value.(type) {
	case nil:
		return []string{}
	case []string:
		result := make([]string, 0, len(typed))
		for _, item := range typed {
			if text := extractInquiryString(item); text != "" {
				result = append(result, text)
			}
		}
		return result
	case []any:
		result := make([]string, 0, len(typed))
		for _, item := range typed {
			if text := extractInquiryString(item); text != "" {
				result = append(result, text)
			}
		}
		return result
	default:
		return []string{}
	}
}

func asInquiryNumber(value any) (float64, bool) {
	switch typed := value.(type) {
	case float64:
		return typed, true
	case float32:
		return float64(typed), true
	case int:
		return float64(typed), true
	case int64:
		return float64(typed), true
	case int32:
		return float64(typed), true
	default:
		return 0, false
	}
}

func asInquiryInt(value any) any {
	switch typed := value.(type) {
	case int:
		return typed
	case int32:
		return int(typed)
	case int64:
		return int(typed)
	case float64:
		return int(typed)
	case string:
		trimmed := strings.TrimSpace(typed)
		if trimmed == "" {
			return nil
		}
		parsed, err := strconv.Atoi(trimmed)
		if err != nil {
			return nil
		}
		return parsed
	default:
		return nil
	}
}

func nilIfEmpty(value string) any {
	if strings.TrimSpace(value) == "" {
		return nil
	}
	return strings.TrimSpace(value)
}

func cloneMap(input map[string]any) map[string]any {
	if len(input) == 0 {
		return map[string]any{}
	}
	result := make(map[string]any, len(input))
	for key, value := range input {
		result[key] = value
	}
	return result
}

func cloneMapSlice(values []map[string]any) []map[string]any {
	result := make([]map[string]any, 0, len(values))
	for _, value := range values {
		result = append(result, cloneMap(value))
	}
	return result
}

func extractString(value any) string {
	text, _ := value.(string)
	return strings.TrimSpace(text)
}

func extractMapSlice(value any) []map[string]any {
	raw, ok := value.([]any)
	if !ok {
		return nil
	}
	result := make([]map[string]any, 0, len(raw))
	for _, item := range raw {
		if mapped, ok := item.(map[string]any); ok {
			result = append(result, mapped)
		}
	}
	return result
}

func extractStringSlice(value any) []string {
	raw, ok := value.([]any)
	if !ok {
		return nil
	}
	result := make([]string, 0, len(raw))
	for _, item := range raw {
		if text := extractString(item); text != "" {
			result = append(result, text)
		}
	}
	return result
}

func extractStringMap(source map[string]any, key string, nested string) string {
	child, ok := source[key].(map[string]any)
	if !ok {
		return ""
	}
	return extractString(child[nested])
}

func extractNestedMap(source map[string]any, key string) map[string]any {
	child, ok := source[key].(map[string]any)
	if !ok {
		return map[string]any{}
	}
	return cloneMap(child)
}

func extractStringSliceMap(source map[string]any, key string, nested string) []string {
	child, ok := source[key].(map[string]any)
	if !ok {
		return nil
	}
	return extractStringSlice(child[nested])
}

func buildQuestionLines(items []map[string]any) []string {
	result := make([]string, 0, len(items)*2)
	for index, item := range items {
		title := extractString(item["question"])
		purpose := extractString(item["purpose"])
		if title != "" {
			result = append(result, fmt.Sprintf("%d. %s", index+1, title))
		}
		if purpose != "" {
			result = append(result, "目的："+purpose)
		}
	}
	return compactInquiryStrings(result)
}

func buildFollowupQuestionLines(items []map[string]any) []string {
	result := make([]string, 0, len(items)*3)
	for index, item := range items {
		question := extractString(item["question"])
		reason := extractString(item["reason"])
		operatorTip := extractString(item["operatorTip"])
		if question != "" {
			result = append(result, fmt.Sprintf("%d. %s", index+1, question))
		}
		if reason != "" {
			result = append(result, "原因："+reason)
		}
		if operatorTip != "" {
			result = append(result, "提示："+operatorTip)
		}
	}
	return compactInquiryStrings(result)
}

func compactInquiryStrings(values []string) []string {
	result := make([]string, 0, len(values))
	for _, value := range values {
		if trimmed := strings.TrimSpace(value); trimmed != "" {
			result = append(result, trimmed)
		}
	}
	return result
}

func formatInquiryLine(label string, value string) string {
	value = strings.TrimSpace(value)
	if value == "" {
		return ""
	}
	return label + "：" + value
}

func parseJSONMap(value string) map[string]any {
	value = strings.TrimSpace(value)
	if value == "" {
		return map[string]any{}
	}
	result := map[string]any{}
	_ = json.Unmarshal([]byte(value), &result)
	return result
}

func parseJSONMapSlice(value string) []map[string]any {
	value = strings.TrimSpace(value)
	if value == "" {
		return nil
	}
	raw := make([]map[string]any, 0)
	_ = json.Unmarshal([]byte(value), &raw)
	return raw
}

func parsePositiveInt(value string) int {
	parsed, err := strconv.Atoi(strings.TrimSpace(value))
	if err != nil || parsed < 0 {
		return 0
	}
	return parsed
}

func firstNonEmptyInquiry(values ...string) string {
	for _, value := range values {
		if trimmed := strings.TrimSpace(value); trimmed != "" {
			return trimmed
		}
	}
	return ""
}
