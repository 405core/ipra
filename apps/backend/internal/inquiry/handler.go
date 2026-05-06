package inquiry

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

const (
	defaultMaxRounds = 3
	minMaxRounds     = 1
	maxMaxRounds     = 10
)

type Handler struct {
	mu       sync.RWMutex
	nextID   int64
	sessions map[string]*Session
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
		sessions: make(map[string]*Session),
	}
}

func (h *Handler) Register(r gin.IRouter) {
	r.GET("/health", h.handleHealth)
	r.POST("/api/asr/transcribe", h.handleASRTranscribe)
	r.POST("/api/inquiry/sessions", h.handleCreateSession)
	r.GET("/api/inquiry/sessions/:sessionId", h.handleGetSession)
	r.POST("/api/inquiry/sessions/:sessionId/turns", h.handleSubmitTurn)
}

func (h *Handler) handleHealth(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"service": "ipra-c-voice-llm",
	})
}

func (h *Handler) handleASRTranscribe(c *gin.Context) {
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
	session, ok := h.sessionSnapshot(c.Param("sessionId"))
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"message": "session not found"})
		return
	}

	c.JSON(http.StatusOK, session)
}

func (h *Handler) handleSubmitTurn(c *gin.Context) {
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
