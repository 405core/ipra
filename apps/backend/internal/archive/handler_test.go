package archive

import (
	"encoding/json"
	"strings"
	"testing"
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
