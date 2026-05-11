package archive

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"
	"mime/multipart"
	"net/http"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

const maxArchiveVideoUploadBytes = 200 << 20

var (
	archiveVideoSafeNamePattern = regexp.MustCompile(`[^A-Za-z0-9_.-]+`)
	allowedArchiveVideoExts     = map[string]struct{}{
		".mp4":  {},
		".mov":  {},
		".mkv":  {},
		".avi":  {},
		".webm": {},
		".wav":  {},
		".mp3":  {},
		".m4a":  {},
	}
)

type archiveVideoUploadResponse struct {
	UploadedFile uploadedArchiveVideoFile `json:"uploadedFile"`
}

type uploadedArchiveVideoFile struct {
	Filename    string `json:"filename"`
	StoredPath  string `json:"storedPath"`
	ContentType string `json:"contentType"`
	SizeBytes   int64  `json:"sizeBytes"`
	Bucket      string `json:"bucket"`
	ObjectKey   string `json:"objectKey"`
}

func (h *Handler) handleUploadVideo(c *gin.Context) {
	if h.storage == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "归档服务未配置 MinIO"})
		return
	}
	bucket := strings.TrimSpace(h.videoBucket)
	if bucket == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "归档服务未配置视频 bucket"})
		return
	}

	c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, maxArchiveVideoUploadBytes+(1<<20))
	fileHeader, err := c.FormFile("file")
	if err != nil {
		message := "缺少视频文件"
		if strings.Contains(err.Error(), "request body too large") {
			message = "视频文件不能超过 200MB"
		}
		c.JSON(http.StatusBadRequest, gin.H{"message": message})
		return
	}
	if fileHeader.Size <= 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "视频文件不能为空"})
		return
	}
	if fileHeader.Size > maxArchiveVideoUploadBytes {
		c.JSON(http.StatusBadRequest, gin.H{"message": "视频文件不能超过 200MB"})
		return
	}

	sessionID := strings.TrimSpace(c.PostForm("sessionId"))
	if sessionID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "sessionId 不能为空"})
		return
	}

	contentType := normalizeArchiveVideoContentType(fileHeader)
	objectKey, err := h.buildArchiveVideoObjectKey(fileHeader, sessionID, c.PostForm("windowId"), contentType)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	file, err := fileHeader.Open()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "读取视频文件失败"})
		return
	}
	defer file.Close()

	if err := h.storage.PutObject(c.Request.Context(), bucket, objectKey, file, fileHeader.Size, contentType); err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"message": "上传视频到 MinIO 失败：" + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, archiveVideoUploadResponse{
		UploadedFile: uploadedArchiveVideoFile{
			Filename:    firstNonEmpty(fileHeader.Filename, filepath.Base(objectKey)),
			StoredPath:  fmt.Sprintf("minio://%s/%s", bucket, objectKey),
			ContentType: contentType,
			SizeBytes:   fileHeader.Size,
			Bucket:      bucket,
			ObjectKey:   objectKey,
		},
	})
}

func (h *Handler) buildArchiveVideoObjectKey(
	fileHeader *multipart.FileHeader,
	sessionID string,
	windowID string,
	contentType string,
) (string, error) {
	extension, err := archiveVideoExtension(fileHeader.Filename, contentType)
	if err != nil {
		return "", err
	}

	now := time.Now()
	if h != nil && h.now != nil {
		now = h.now()
	}
	safeSessionID := archiveSafeObjectName(sessionID)
	if safeSessionID == "" {
		safeSessionID = "session-" + randomObjectSuffix()
	}
	safeWindowID := archiveSafeObjectName(windowID)
	if safeWindowID == "" {
		safeWindowID = "window-" + randomObjectSuffix()
	}

	return fmt.Sprintf(
		"humanomni-windows/%s/%s-%s%s",
		now.Format("2006/01/02"),
		safeSessionID,
		safeWindowID,
		extension,
	), nil
}

func archiveVideoExtension(filename string, contentType string) (string, error) {
	extension := strings.ToLower(filepath.Ext(strings.TrimSpace(filename)))
	if extension == "" {
		extension = extensionForArchiveVideoContentType(contentType)
	}
	if _, ok := allowedArchiveVideoExts[extension]; !ok {
		return "", errors.New("视频文件仅支持 mp4、mov、mkv、avi、webm、wav、mp3、m4a")
	}
	return extension, nil
}

func extensionForArchiveVideoContentType(contentType string) string {
	switch strings.ToLower(strings.TrimSpace(strings.Split(contentType, ";")[0])) {
	case "video/mp4":
		return ".mp4"
	case "video/quicktime":
		return ".mov"
	case "video/x-matroska":
		return ".mkv"
	case "video/x-msvideo":
		return ".avi"
	case "video/webm":
		return ".webm"
	case "audio/wav", "audio/x-wav":
		return ".wav"
	case "audio/mpeg":
		return ".mp3"
	case "audio/mp4", "audio/x-m4a":
		return ".m4a"
	default:
		return ""
	}
}

func normalizeArchiveVideoContentType(fileHeader *multipart.FileHeader) string {
	if fileHeader == nil {
		return "application/octet-stream"
	}
	if value := strings.TrimSpace(fileHeader.Header.Get("Content-Type")); value != "" {
		return value
	}
	return "application/octet-stream"
}

func archiveSafeObjectName(value string) string {
	cleaned := archiveVideoSafeNamePattern.ReplaceAllString(strings.TrimSpace(value), "_")
	cleaned = strings.Trim(cleaned, "._-")
	if len(cleaned) > 80 {
		return cleaned[:80]
	}
	return cleaned
}

func randomObjectSuffix() string {
	var data [6]byte
	if _, err := rand.Read(data[:]); err == nil {
		return hex.EncodeToString(data[:])
	}
	return strconv.FormatInt(time.Now().UnixNano(), 36)
}
