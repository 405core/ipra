package archive

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
)

func TestValidateCreateArchiveRequest(t *testing.T) {
	valid := createArchiveRequest{
		SessionID:       "inq-1",
		FinalJudgement:  "clear",
		JudgementReason: "该旅客回答与采样摘要基本一致，未发现明显异常风险。",
		Rounds: []archiveRoundRequest{
			{
				RoundNo: 1,
				Videos: []archiveVideoRequest{
					{
						MinIOBucket:    "ipra-videos",
						MinIOObjectKey: "humanomni-windows/2026/05/11/round-1.mp4",
						Modal:          "video_audio",
					},
				},
			},
		},
	}

	if err := validateCreateArchiveRequest(valid); err != nil {
		t.Fatalf("validateCreateArchiveRequest() error = %v", err)
	}
}

func TestValidateCreateArchiveRequestRejectsInvalidPayload(t *testing.T) {
	cases := []struct {
		name    string
		mutate  func(*createArchiveRequest)
		message string
	}{
		{
			name: "short reason",
			mutate: func(req *createArchiveRequest) {
				req.JudgementReason = "太短"
			},
			message: "judgementReason",
		},
		{
			name: "invalid judgement",
			mutate: func(req *createArchiveRequest) {
				req.FinalJudgement = "unknown"
			},
			message: "finalJudgement",
		},
		{
			name: "missing video",
			mutate: func(req *createArchiveRequest) {
				req.Rounds[0].Videos = nil
			},
			message: "视频",
		},
		{
			name: "missing object key",
			mutate: func(req *createArchiveRequest) {
				req.Rounds[0].Videos[0].MinIOObjectKey = ""
			},
			message: "minioObjectKey",
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			req := createArchiveRequest{
				SessionID:       "inq-1",
				FinalJudgement:  "clear",
				JudgementReason: "该旅客回答与采样摘要基本一致，未发现明显异常风险。",
				Rounds: []archiveRoundRequest{
					{
						RoundNo: 1,
						Videos: []archiveVideoRequest{
							{
								MinIOBucket:    "ipra-videos",
								MinIOObjectKey: "humanomni-windows/2026/05/11/round-1.mp4",
								Modal:          "video_audio",
							},
						},
					},
				},
			}
			tc.mutate(&req)

			err := validateCreateArchiveRequest(req)
			if err == nil {
				t.Fatal("validateCreateArchiveRequest() error = nil")
			}
			if !strings.Contains(err.Error(), tc.message) {
				t.Fatalf("error = %q, want containing %q", err.Error(), tc.message)
			}
		})
	}
}

func TestJSONOrDefault(t *testing.T) {
	if got := string(jsonOrDefault(nil, "{}")); got != "{}" {
		t.Fatalf("jsonOrDefault(nil) = %q, want {}", got)
	}

	raw := json.RawMessage(`{"ok":true}`)
	if got := string(jsonOrDefault(raw, "{}")); got != `{"ok":true}` {
		t.Fatalf("jsonOrDefault(raw) = %q", got)
	}
}

func TestUploadVideoStoresObjectInConfiguredBucket(t *testing.T) {
	gin.SetMode(gin.TestMode)
	storage := &recordingStorage{}
	handler := &Handler{
		storage:     storage,
		videoBucket: "ipra-videos",
		now: func() time.Time {
			return time.Date(2026, 5, 12, 8, 30, 0, 0, time.UTC)
		},
	}
	router := gin.New()
	handler.Register(router, func(c *gin.Context) {
		c.Next()
	})

	var body bytes.Buffer
	writer := multipart.NewWriter(&body)
	if err := writer.WriteField("sessionId", "inq-20260512-abc123"); err != nil {
		t.Fatal(err)
	}
	if err := writer.WriteField("windowId", "window-1"); err != nil {
		t.Fatal(err)
	}
	part, err := writer.CreateFormFile("file", "round-1.mp4")
	if err != nil {
		t.Fatal(err)
	}
	if _, err := part.Write([]byte("video-data")); err != nil {
		t.Fatal(err)
	}
	if err := writer.Close(); err != nil {
		t.Fatal(err)
	}

	request := httptest.NewRequest(http.MethodPost, "/api/inquiry/archive-videos", &body)
	request.Header.Set("Content-Type", writer.FormDataContentType())
	recorder := httptest.NewRecorder()
	router.ServeHTTP(recorder, request)

	if recorder.Code != http.StatusCreated {
		t.Fatalf("status = %d, want %d: %s", recorder.Code, http.StatusCreated, recorder.Body.String())
	}
	if storage.bucket != "ipra-videos" {
		t.Fatalf("bucket = %q, want ipra-videos", storage.bucket)
	}
	if storage.objectKey != "humanomni-windows/2026/05/12/inq-20260512-abc123-window-1.mp4" {
		t.Fatalf("objectKey = %q", storage.objectKey)
	}
	if storage.body != "video-data" {
		t.Fatalf("body = %q", storage.body)
	}

	var got archiveVideoUploadResponse
	if err := json.Unmarshal(recorder.Body.Bytes(), &got); err != nil {
		t.Fatal(err)
	}
	if got.UploadedFile.StoredPath != "minio://ipra-videos/humanomni-windows/2026/05/12/inq-20260512-abc123-window-1.mp4" {
		t.Fatalf("storedPath = %q", got.UploadedFile.StoredPath)
	}
}

type recordingStorage struct {
	bucket      string
	objectKey   string
	contentType string
	size        int64
	body        string
}

func (s *recordingStorage) StatObject(context.Context, string, string) error {
	return nil
}

func (s *recordingStorage) GetObject(context.Context, string, string, string) (*http.Response, error) {
	return nil, nil
}

func (s *recordingStorage) PutObject(
	_ context.Context,
	bucket string,
	objectKey string,
	body io.Reader,
	size int64,
	contentType string,
) error {
	data, err := io.ReadAll(body)
	if err != nil {
		return err
	}
	s.bucket = bucket
	s.objectKey = objectKey
	s.contentType = contentType
	s.size = size
	s.body = string(data)
	return nil
}
