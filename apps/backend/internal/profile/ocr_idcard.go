package profile

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"ipra/backend/internal/config"
)

const maxOCRPhotoBase64Bytes = 5 << 20

type IDCardOCRClient struct {
	apiURL     string
	appCode    string
	httpClient *http.Client
}

type idCardOCRRequest struct {
	PhotoBase64 string `json:"photoBase64"`
	PhotoURL    string `json:"photoUrl"`
}

type IDCardOCRResponse struct {
	Code   int            `json:"code"`
	Msg    string         `json:"msg"`
	TaskNo string         `json:"taskNo,omitempty"`
	Data   *IDCardOCRData `json:"data,omitempty"`
}

type IDCardOCRData struct {
	Result   int               `json:"result"`
	Side     string            `json:"side"`
	Info     map[string]string `json:"info,omitempty"`
	Validity map[string]bool   `json:"validity,omitempty"`
}

func NewIDCardOCRClient(cfg config.OCRConfig) *IDCardOCRClient {
	return &IDCardOCRClient{
		apiURL:  strings.TrimSpace(cfg.IDCardAPIURL),
		appCode: strings.TrimSpace(cfg.IDCardAppCode),
		httpClient: &http.Client{
			Timeout: 15 * time.Second,
		},
	}
}

func (c *IDCardOCRClient) Enabled() bool {
	return c != nil && c.apiURL != "" && c.appCode != ""
}

func (c *IDCardOCRClient) Recognize(ctx context.Context, req idCardOCRRequest) (IDCardOCRResponse, error) {
	if !c.Enabled() {
		return IDCardOCRResponse{}, errors.New("OCR 服务未配置")
	}

	form := url.Values{}
	if req.PhotoBase64 != "" {
		form.Set("photoBase64", req.PhotoBase64)
	}
	if req.PhotoURL != "" {
		form.Set("photoUrl", req.PhotoURL)
	}

	httpReq, err := http.NewRequestWithContext(
		ctx,
		http.MethodPost,
		c.apiURL,
		strings.NewReader(form.Encode()),
	)
	if err != nil {
		return IDCardOCRResponse{}, err
	}
	httpReq.Header.Set("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
	httpReq.Header.Set("Accept", "application/json")
	httpReq.Header.Set("Authorization", "APPCODE "+c.appCode)

	resp, err := c.httpClient.Do(httpReq)
	if err != nil {
		log.Printf("idcard ocr upstream request failed: %v", err)
		return IDCardOCRResponse{}, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(io.LimitReader(resp.Body, maxOCRPhotoBase64Bytes))
	if err != nil {
		log.Printf("idcard ocr upstream read failed: %v", err)
		return IDCardOCRResponse{}, err
	}

	var parsed IDCardOCRResponse
	if err := json.Unmarshal(body, &parsed); err != nil {
		log.Printf(
			"idcard ocr upstream invalid response: http_status=%d body=%q",
			resp.StatusCode,
			compactLogValue(string(body), 240),
		)
		if resp.StatusCode >= 400 {
			message := strings.TrimSpace(string(body))
			if message == "" {
				message = fmt.Sprintf("HTTP %d", resp.StatusCode)
			}
			return IDCardOCRResponse{}, fmt.Errorf("OCR 上游返回错误: %s", message)
		}
		return IDCardOCRResponse{}, fmt.Errorf("解析 OCR 返回失败: %w", err)
	}

	if resp.StatusCode >= 400 {
		log.Printf(
			"idcard ocr upstream rejected request: http_status=%d code=%d msg=%q",
			resp.StatusCode,
			parsed.Code,
			strings.TrimSpace(parsed.Msg),
		)
		message := strings.TrimSpace(parsed.Msg)
		if message == "" {
			message = fmt.Sprintf("OCR 上游返回错误: HTTP %d", resp.StatusCode)
		}
		return parsed, errors.New(message)
	}

	return parsed, nil
}

func (h *Handler) handleRecognizeIDCard(c *gin.Context) {
	if h.ocr == nil || !h.ocr.Enabled() {
		c.JSON(http.StatusServiceUnavailable, gin.H{"message": "OCR 服务未配置"})
		return
	}

	var req idCardOCRRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "请求参数无效"})
		return
	}

	req.PhotoBase64 = normalizePhotoBase64(req.PhotoBase64)
	req.PhotoURL = strings.TrimSpace(req.PhotoURL)
	if req.PhotoBase64 == "" && req.PhotoURL == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "photoBase64 或 photoUrl 至少提供一个"})
		return
	}
	if req.PhotoBase64 != "" && decodedBase64Size(req.PhotoBase64) > 2<<20 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "身份证照片不能超过 2MB"})
		return
	}

	result, err := h.ocr.Recognize(c.Request.Context(), req)
	if err != nil {
		log.Printf(
			"idcard ocr failed: client_ip=%s has_base64=%t has_url=%t error=%v",
			c.ClientIP(),
			req.PhotoBase64 != "",
			req.PhotoURL != "",
			err,
		)
		message := strings.TrimSpace(err.Error())
		if message == "" {
			message = "调用 OCR 服务失败"
		}
		c.JSON(http.StatusBadGateway, gin.H{
			"message": message,
		})
		return
	}

	c.JSON(http.StatusOK, result)
}

func normalizePhotoBase64(value string) string {
	trimmed := strings.TrimSpace(value)
	if trimmed == "" {
		return ""
	}
	if idx := strings.Index(trimmed, ","); idx >= 0 && strings.HasPrefix(trimmed, "data:") {
		return trimmed[idx+1:]
	}
	return trimmed
}

func decodedBase64Size(value string) int {
	decoded, err := base64.StdEncoding.DecodeString(value)
	if err == nil {
		return len(decoded)
	}

	decoded, err = base64.RawStdEncoding.DecodeString(value)
	if err == nil {
		return len(decoded)
	}

	return len(value)
}

func compactLogValue(value string, limit int) string {
	trimmed := strings.Join(strings.Fields(strings.TrimSpace(value)), " ")
	if len(trimmed) <= limit {
		return trimmed
	}
	return trimmed[:limit] + "..."
}
