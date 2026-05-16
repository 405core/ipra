package inquiry

import (
	"bytes"
	"context"
	"encoding/json"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"ipra/backend/internal/profile"
	"ipra/backend/internal/sensitive"
)

func TestASRTranscribeUsesFallbackTranscript(t *testing.T) {
	router := newTestRouter()

	var body bytes.Buffer
	writer := multipart.NewWriter(&body)
	if err := writer.WriteField("fallbackTranscript", "我去澳门旅游，朋友介绍了酒店。"); err != nil {
		t.Fatal(err)
	}
	if err := writer.WriteField("durationMs", "1500"); err != nil {
		t.Fatal(err)
	}
	if err := writer.Close(); err != nil {
		t.Fatal(err)
	}

	req := httptest.NewRequest(http.MethodPost, "/api/asr/transcribe", &body)
	req.Header.Set("Content-Type", writer.FormDataContentType())
	rec := httptest.NewRecorder()
	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d: %s", rec.Code, rec.Body.String())
	}

	var got asrResponse
	decodeBody(t, rec, &got)
	if got.Transcript != "我去澳门旅游，朋友介绍了酒店。" {
		t.Fatalf("unexpected transcript: %q", got.Transcript)
	}
	if got.Language != "zh-CN" {
		t.Fatalf("unexpected language: %q", got.Language)
	}
	if got.DurationMs != 1500 {
		t.Fatalf("unexpected duration: %d", got.DurationMs)
	}
	if got.Confidence < 0.9 {
		t.Fatalf("expected high fallback confidence, got %f", got.Confidence)
	}
}

func TestCreateSessionUsesDefaultRoundsAndQuestion(t *testing.T) {
	router := newTestRouter()

	rec := postJSON(t, router, "/api/inquiry/sessions", createSessionRequest{
		Passenger: Passenger{
			Name:        "张三",
			DocumentID:  "E12345678",
			Destination: "澳门",
			Purpose:     "旅游",
			RiskLevel:   "中",
		},
	})

	if rec.Code != http.StatusCreated {
		t.Fatalf("expected status 201, got %d: %s", rec.Code, rec.Body.String())
	}

	var got Session
	decodeBody(t, rec, &got)
	if got.SessionID == "" {
		t.Fatal("expected session id")
	}
	if got.MaxRounds != defaultMaxRounds {
		t.Fatalf("expected default max rounds %d, got %d", defaultMaxRounds, got.MaxRounds)
	}
	if got.CurrentRound != 0 {
		t.Fatalf("expected current round 0, got %d", got.CurrentRound)
	}
	if got.Status != "active" {
		t.Fatalf("expected active status, got %q", got.Status)
	}
	if !strings.Contains(got.CurrentQuestion, "张三") || !strings.Contains(got.CurrentQuestion, "澳门") {
		t.Fatalf("default question did not include passenger context: %q", got.CurrentQuestion)
	}
}

func TestSubmitTurnGeneratesKeywordFollowUp(t *testing.T) {
	router := newTestRouter()
	session := createTestSession(t, router, 3)

	rec := postJSON(t, router, "/api/inquiry/sessions/"+session.SessionID+"/turns", submitTurnRequest{
		AnswerTranscript: "朋友介绍我去当地赌场附近旅游，费用先现金支付。",
	})
	if rec.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d: %s", rec.Code, rec.Body.String())
	}

	var got turnResponse
	decodeBody(t, rec, &got)
	if got.ShouldStop {
		t.Fatal("first turn should not stop when max rounds is 3")
	}
	if got.CurrentRound != 1 {
		t.Fatalf("expected round 1, got %d", got.CurrentRound)
	}
	if got.NextQuestion == "" {
		t.Fatal("expected next question")
	}
	if !contains(got.RiskHints, "疑似涉赌目的") {
		t.Fatalf("expected gambling risk hint, got %#v", got.RiskHints)
	}
	if !strings.Contains(got.Rationale, "涉赌") {
		t.Fatalf("expected rationale to mention gambling cue, got %q", got.Rationale)
	}
}

func TestRoundFuseCompletesSession(t *testing.T) {
	router := newTestRouter()
	session := createTestSession(t, router, 2)

	first := postJSON(t, router, "/api/inquiry/sessions/"+session.SessionID+"/turns", submitTurnRequest{
		AnswerTranscript: "我去旅游，住宿已经订好。",
	})
	if first.Code != http.StatusOK {
		t.Fatalf("expected first turn status 200, got %d: %s", first.Code, first.Body.String())
	}

	second := postJSON(t, router, "/api/inquiry/sessions/"+session.SessionID+"/turns", submitTurnRequest{
		AnswerTranscript: "返程还没订，朋友说可以临时安排。",
	})
	if second.Code != http.StatusOK {
		t.Fatalf("expected second turn status 200, got %d: %s", second.Code, second.Body.String())
	}

	var got turnResponse
	decodeBody(t, second, &got)
	if !got.ShouldStop {
		t.Fatal("expected round fuse to stop after max rounds")
	}
	if got.Status != "completed" {
		t.Fatalf("expected completed status, got %q", got.Status)
	}
	if got.NextQuestion != "" {
		t.Fatalf("expected no next question after fuse, got %q", got.NextQuestion)
	}
	if got.CurrentRound != 2 {
		t.Fatalf("expected round 2, got %d", got.CurrentRound)
	}
}

func TestCreateSessionRejectsInvalidMaxRounds(t *testing.T) {
	router := newTestRouter()

	rec := postJSON(t, router, "/api/inquiry/sessions", createSessionRequest{
		MaxRounds: 11,
	})

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("expected status 400, got %d: %s", rec.Code, rec.Body.String())
	}
}

func TestSubmitTurnRejectsBlankTranscript(t *testing.T) {
	router := newTestRouter()
	session := createTestSession(t, router, 3)

	rec := postJSON(t, router, "/api/inquiry/sessions/"+session.SessionID+"/turns", submitTurnRequest{
		AnswerTranscript: "  ",
	})

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("expected status 400, got %d: %s", rec.Code, rec.Body.String())
	}
}

func TestLoadInquiryProfileAcceptsProfileID(t *testing.T) {
	handler := NewHandler()
	handler.SetProfileLookup(stubProfileLookup{
		getByID: func(ctx context.Context, id uint64) (profile.SearchProfileResponse, error) {
			if id != 10 {
				t.Fatalf("unexpected profile id: %d", id)
			}
			return profile.SearchProfileResponse{
				ID:          10,
				FullName:    "测试旅客",
				DocumentNum: "440582199402155270",
				ProfileData: map[string]any{},
			}, nil
		},
		searchByDocument: func(ctx context.Context, documentNum string) ([]profile.SearchProfileResponse, error) {
			t.Fatalf("document lookup should not be used when profile id is provided: %s", documentNum)
			return nil, nil
		},
	})

	record, found, err := handler.loadInquiryProfile(context.Background(), "10")
	if err != nil {
		t.Fatalf("loadInquiryProfile() error = %v", err)
	}
	if !found {
		t.Fatal("expected profile to be found by id")
	}
	if record.ID != 10 {
		t.Fatalf("expected profile id 10, got %d", record.ID)
	}
}

func TestLoadInquiryProfileFallsBackToDocumentNumber(t *testing.T) {
	handler := NewHandler()
	handler.SetProfileLookup(stubProfileLookup{
		searchByDocument: func(ctx context.Context, documentNum string) ([]profile.SearchProfileResponse, error) {
			if documentNum != "440582199402155270" {
				t.Fatalf("unexpected document num: %s", documentNum)
			}
			return []profile.SearchProfileResponse{
				{
					ID:          10,
					FullName:    "测试旅客",
					DocumentNum: "440582199402155270",
					ProfileData: map[string]any{},
				},
			}, nil
		},
	})

	record, found, err := handler.loadInquiryProfile(context.Background(), "440582199402155270")
	if err != nil {
		t.Fatalf("loadInquiryProfile() error = %v", err)
	}
	if !found {
		t.Fatal("expected profile to be found by document number")
	}
	if record.DocumentNum != "440582199402155270" {
		t.Fatalf("unexpected document num: %s", record.DocumentNum)
	}
}

func TestAsInquiryStringSliceAlwaysReturnsArray(t *testing.T) {
	tests := []struct {
		name  string
		input any
		want  []string
	}{
		{
			name:  "nil",
			input: nil,
			want:  []string{},
		},
		{
			name:  "string slice",
			input: []string{"同行人A", "同行人B"},
			want:  []string{"同行人A", "同行人B"},
		},
		{
			name:  "any slice",
			input: []any{"泰国", "新加坡"},
			want:  []string{"泰国", "新加坡"},
		},
		{
			name:  "unsupported type",
			input: "single",
			want:  []string{},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := asInquiryStringSlice(tt.input)
			if len(got) != len(tt.want) {
				t.Fatalf("len(asInquiryStringSlice(%v)) = %d, want %d", tt.input, len(got), len(tt.want))
			}
			for index := range tt.want {
				if got[index] != tt.want[index] {
					t.Fatalf("asInquiryStringSlice(%v)[%d] = %q, want %q", tt.input, index, got[index], tt.want[index])
				}
			}
		})
	}
}

func TestBuildProtectedRiskCaseContext(t *testing.T) {
	fromRequest := buildProtectedRiskCaseContext(
		map[string]any{
			"source":   "officer",
			"category": "illegal_work",
		},
		"cross_border_fraud",
	)
	if fromRequest["category"] != "illegal_work" {
		t.Fatalf("category = %v, want illegal_work", fromRequest["category"])
	}
	if fromRequest["source"] != "officer" {
		t.Fatalf("source = %v, want officer", fromRequest["source"])
	}

	fromDatabase := buildProtectedRiskCaseContext(nil, "跨境电诈")
	if fromDatabase["category"] != "cross_border_fraud" {
		t.Fatalf("database category = %v, want cross_border_fraud", fromDatabase["category"])
	}
	if fromDatabase["source"] != "watchlist" {
		t.Fatalf("database source = %v, want watchlist", fromDatabase["source"])
	}

	fallback := buildProtectedRiskCaseContext(nil, "")
	if fallback["category"] != "suspicious_purpose" {
		t.Fatalf("fallback category = %v, want suspicious_purpose", fallback["category"])
	}
	if fallback["source"] != "none" {
		t.Fatalf("fallback source = %v, want none", fallback["source"])
	}
}

func TestBuildHumanOmniWindowsRestoresRawSummaryForAIService(t *testing.T) {
	handler := NewHandler()
	session := &ProtectedSession{
		Rounds: []*ProtectedRound{
			{
				HumanOmniSummary: "The person is speaking and appears slightly tense.",
				HumanOmniWindow: map[string]any{
					"windowId":     "window-1",
					"questionId":   "round-1",
					"startSeconds": 0,
					"endSeconds":   21,
					"modal":        "video_audio",
					"modelName":    "HumanOmni0.5",
				},
			},
		},
	}

	got := handler.buildHumanOmniWindows(session)

	if len(got) != 1 {
		t.Fatalf("expected one HumanOmni window, got %d", len(got))
	}
	if got[0]["rawSummary"] != "The person is speaking and appears slightly tense." {
		t.Fatalf("rawSummary = %v, want restored summary", got[0]["rawSummary"])
	}
	if _, ok := session.Rounds[0].HumanOmniWindow["rawSummary"]; ok {
		t.Fatal("buildHumanOmniWindows should not mutate the protected round window snapshot")
	}
}

func TestRoundTranscriptTextPrefersASRText(t *testing.T) {
	round := &ProtectedRound{
		AnswerText: "fallback answer",
		ASR: map[string]any{
			"text": "  qwen3 transcript  ",
		},
	}

	if got := roundTranscriptText(round); got != "qwen3 transcript" {
		t.Fatalf("roundTranscriptText() = %q, want ASR text", got)
	}
}

func TestRoundTranscriptTextFallsBackToAnswerText(t *testing.T) {
	round := &ProtectedRound{
		AnswerText: "fallback answer",
		ASR: map[string]any{
			"text": " ",
		},
	}

	if got := roundTranscriptText(round); got != "fallback answer" {
		t.Fatalf("roundTranscriptText() = %q, want answer text", got)
	}
}

func TestProtectedSessionSnapshotIncludesTranscriptAsset(t *testing.T) {
	handler := NewHandler()
	handler.protectedSessions["session-1"] = &ProtectedSession{
		SessionID:      "session-1",
		OwnerUserID:    7,
		CurrentRoundID: "round-1",
		Rounds: []*ProtectedRound{
			{
				ID:          "round-1",
				RoundNumber: 1,
				Title:       "round 1",
				Status:      "uploaded",
				TranscriptAsset: &sensitive.AssetRef{
					ID:      "transcript-asset",
					URL:     "/api/sensitive-assets/transcript-asset",
					Context: "dialog",
				},
			},
		},
	}

	got := handler.snapshotProtectedSession("session-1")
	if got.CurrentRound == nil {
		t.Fatal("expected current round")
	}
	if got.CurrentRound.TranscriptAsset == nil {
		t.Fatal("expected transcript asset")
	}
	if got.CurrentRound.TranscriptAsset.ID != "transcript-asset" {
		t.Fatalf("transcript asset id = %q", got.CurrentRound.TranscriptAsset.ID)
	}
}

func newTestRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	router := gin.New()
	NewHandler().Register(router)
	return router
}

func createTestSession(t *testing.T, handler http.Handler, maxRounds int) Session {
	t.Helper()

	rec := postJSON(t, handler, "/api/inquiry/sessions", createSessionRequest{
		Passenger: Passenger{
			Name:        "李四",
			DocumentID:  "P87654321",
			Destination: "新加坡",
			Purpose:     "旅游",
		},
		MaxRounds:       maxRounds,
		InitialQuestion: "请说明本次出境目的。",
	})
	if rec.Code != http.StatusCreated {
		t.Fatalf("expected status 201, got %d: %s", rec.Code, rec.Body.String())
	}

	var session Session
	decodeBody(t, rec, &session)
	return session
}

func postJSON(t *testing.T, handler http.Handler, path string, payload any) *httptest.ResponseRecorder {
	t.Helper()

	body, err := json.Marshal(payload)
	if err != nil {
		t.Fatal(err)
	}
	req := httptest.NewRequest(http.MethodPost, path, bytes.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, req)
	return rec
}

func decodeBody(t *testing.T, rec *httptest.ResponseRecorder, target any) {
	t.Helper()

	if err := json.NewDecoder(rec.Body).Decode(target); err != nil {
		t.Fatalf("failed to decode response body: %v", err)
	}
}

func contains(values []string, expected string) bool {
	for _, value := range values {
		if value == expected {
			return true
		}
	}
	return false
}

type stubProfileLookup struct {
	getByID          func(ctx context.Context, id uint64) (profile.SearchProfileResponse, error)
	searchByDocument func(ctx context.Context, documentNum string) ([]profile.SearchProfileResponse, error)
}

func (s stubProfileLookup) SearchProfilesByDocumentExact(ctx context.Context, documentNum string) ([]profile.SearchProfileResponse, error) {
	if s.searchByDocument == nil {
		return nil, nil
	}
	return s.searchByDocument(ctx, documentNum)
}

func (s stubProfileLookup) GetProfileByID(ctx context.Context, id uint64) (profile.SearchProfileResponse, error) {
	if s.getByID == nil {
		return profile.SearchProfileResponse{}, nil
	}
	return s.getByID(ctx, id)
}
