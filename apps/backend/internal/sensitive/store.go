package sensitive

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"net/http"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
)

const defaultAssetTTL = 20 * time.Minute

type Manager struct {
	renderer *Renderer
	mu       sync.RWMutex
	assets   map[string]AssetSpec
	ttl      time.Duration
}

func NewManager(fontCandidates []string) (*Manager, error) {
	renderer, err := NewRenderer(fontCandidates)
	if err != nil {
		return nil, err
	}
	return &Manager{
		renderer: renderer,
		assets:   make(map[string]AssetSpec),
		ttl:      defaultAssetTTL,
	}, nil
}

func (m *Manager) Put(ownerUserID uint64, document Document, preset RenderPreset, format RenderFormat, watermark WatermarkContext) AssetRef {
	if m == nil {
		return AssetRef{}
	}

	m.pruneLocked(nowUTC())

	assetID := randomID(18)
	spec := AssetSpec{
		OwnerUserID: ownerUserID,
		Document:    document,
		Preset:      preset,
		Format:      format,
		Watermark:   watermark,
		CreatedAt:   nowUTC(),
		ExpiresAt:   nowUTC().Add(m.ttl),
	}

	m.mu.Lock()
	m.assets[assetID] = spec
	m.mu.Unlock()

	return AssetRef{
		ID:      assetID,
		URL:     "/api/sensitive-assets/" + assetID,
		Context: string(preset),
	}
}

func (m *Manager) HandleAsset(c *gin.Context) {
	userIDValue, exists := c.Get("sensitiveAssetUserID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}
	userID, ok := userIDValue.(uint64)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "未授权"})
		return
	}

	spec, err := m.getForUser(c.Param("assetId"), userID)
	if err != nil {
		status := http.StatusNotFound
		if errors.Is(err, errForbiddenAsset) {
			status = http.StatusForbidden
		}
		c.JSON(status, gin.H{"message": "敏感图片资源不存在或已失效"})
		return
	}

	image, err := m.renderer.Render(spec)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "生成敏感图片失败"})
		return
	}

	SetNoStoreHeaders(c)
	c.Header("Content-Type", image.ContentType)
	c.Header("Content-Length", itoa(len(image.Bytes)))
	c.Data(http.StatusOK, image.ContentType, image.Bytes)
}

var errForbiddenAsset = errors.New("forbidden asset")

func (m *Manager) getForUser(assetID string, userID uint64) (AssetSpec, error) {
	if m == nil {
		return AssetSpec{}, errors.New("manager not configured")
	}

	now := nowUTC()
	m.mu.RLock()
	spec, ok := m.assets[assetID]
	m.mu.RUnlock()
	if !ok || spec.ExpiresAt.Before(now) {
		return AssetSpec{}, errors.New("asset not found")
	}
	if spec.OwnerUserID != 0 && spec.OwnerUserID != userID {
		return AssetSpec{}, errForbiddenAsset
	}
	return spec, nil
}

func (m *Manager) pruneLocked(now time.Time) {
	m.mu.Lock()
	defer m.mu.Unlock()
	for key, spec := range m.assets {
		if !spec.ExpiresAt.After(now) {
			delete(m.assets, key)
		}
	}
}

func SetNoStoreHeaders(c *gin.Context) {
	c.Header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
	c.Header("Pragma", "no-cache")
	c.Header("Expires", "0")
	c.Header("X-Content-Type-Options", "nosniff")
}

func randomID(size int) string {
	buf := make([]byte, size)
	if _, err := rand.Read(buf); err != nil {
		return hex.EncodeToString([]byte(time.Now().UTC().Format("20060102150405.000000000")))
	}
	return hex.EncodeToString(buf)
}

func itoa(value int) string {
	return fmtInt(int64(value))
}

func fmtInt(value int64) string {
	if value == 0 {
		return "0"
	}
	var buf [20]byte
	i := len(buf)
	for value > 0 {
		i--
		buf[i] = byte('0' + value%10)
		value /= 10
	}
	return string(buf[i:])
}

func nowUTC() time.Time {
	return time.Now().UTC()
}
