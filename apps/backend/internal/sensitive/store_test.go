package sensitive

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"testing"
	"time"

	"github.com/gin-gonic/gin"
)

func testFontCandidates(t *testing.T) []string {
	t.Helper()
	return []string{
		"/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
		"/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc",
		"/usr/share/fonts/truetype/wqy/wqy-zenhei.ttf",
		"/Library/Fonts/Arial Unicode.ttf",
		"/System/Library/Fonts/Hiragino Sans GB.ttc",
		"/System/Library/Fonts/STHeiti Medium.ttc",
		filepath.Clean("/System/Library/Fonts/STHeiti Light.ttc"),
	}
}

func newTestManager(t *testing.T) *Manager {
	t.Helper()
	manager, err := NewManager(testFontCandidates(t))
	if err != nil {
		t.Fatalf("NewManager() error = %v", err)
	}
	return manager
}

func testDocument() Document {
	return Document{
		Eyebrow:  "测试",
		Title:    "敏感图片",
		Subtitle: "水印与缓存验证",
		Tags:     []string{"列表", "压缩"},
		Sections: []Section{
			{
				Heading: "内容",
				Lines: []string{
					"这是一段用于测试的敏感文本",
					"应当被服务端渲染为带水印图片",
				},
			},
		},
	}
}

func testWatermark(name string, requestID string) WatermarkContext {
	return WatermarkContext{
		WorkID:    "EMP-0001",
		Name:      name,
		Role:      "user",
		ClientIP:  "127.0.0.1",
		RequestID: requestID,
		Page:      "test",
		Timestamp: time.Date(2026, 5, 11, 12, 0, 0, 0, time.UTC),
	}
}

func TestBuildWatermarkTextMatchesFrontendRule(t *testing.T) {
	text := BuildWatermarkText(WatermarkContext{
		WorkID:    "EMP-0001",
		Name:      "Alice",
		Page:      "home:data",
		Timestamp: time.Date(2026, 5, 11, 12, 0, 0, 0, time.UTC),
	})

	want := "IPRA · 页面 智能旅客风险评估系统 · 姓名 Alice · 工号 EMP-0001 · 时间 2026/05/11 20:00:00"
	if text != want {
		t.Fatalf("watermark text = %q, want %q", text, want)
	}
}

func TestBuildDisplayWatermarkContextResolvesPageTitle(t *testing.T) {
	ctx := BuildDisplayWatermarkContext(WatermarkContext{
		Page: "home:ask:summary",
	})

	if ctx.Page != "辅助问询" {
		t.Fatalf("page = %q", ctx.Page)
	}
}

func TestDebugWatermarkTileStyleMatchesFrontendRule(t *testing.T) {
	if got := DebugWatermarkTileStyle(0); got != "9% 14% -18 0.38" {
		t.Fatalf("tile[0] = %q", got)
	}
}

func TestSetNoStoreHeaders(t *testing.T) {
	gin.SetMode(gin.TestMode)
	rec := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(rec)

	SetNoStoreHeaders(c)

	if got := rec.Header().Get("Cache-Control"); got != "no-store, no-cache, must-revalidate, max-age=0" {
		t.Fatalf("Cache-Control = %q", got)
	}
	if got := rec.Header().Get("Pragma"); got != "no-cache" {
		t.Fatalf("Pragma = %q", got)
	}
	if got := rec.Header().Get("Expires"); got != "0" {
		t.Fatalf("Expires = %q", got)
	}
	if got := rec.Header().Get("X-Content-Type-Options"); got != "nosniff" {
		t.Fatalf("X-Content-Type-Options = %q", got)
	}
}

func TestHandleAssetSetsNoStoreHeaders(t *testing.T) {
	gin.SetMode(gin.TestMode)
	manager := newTestManager(t)
	asset := manager.Put(7, testDocument(), PresetList, FormatWebP, testWatermark("Alice", "rid-1"))

	rec := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(rec)
	c.Params = gin.Params{{Key: "assetId", Value: asset.ID}}
	c.Set("sensitiveAssetUserID", uint64(7))

	manager.HandleAsset(c)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d", rec.Code)
	}
	if got := rec.Header().Get("Content-Type"); got != "image/webp" {
		t.Fatalf("Content-Type = %q", got)
	}
	if rec.Body.Len() == 0 {
		t.Fatalf("expected non-empty image body")
	}
}

func TestHandleAssetRejectsOtherOwner(t *testing.T) {
	gin.SetMode(gin.TestMode)
	manager := newTestManager(t)
	asset := manager.Put(7, testDocument(), PresetList, FormatWebP, testWatermark("Alice", "rid-1"))

	rec := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(rec)
	c.Params = gin.Params{{Key: "assetId", Value: asset.ID}}
	c.Set("sensitiveAssetUserID", uint64(8))

	manager.HandleAsset(c)

	if rec.Code != http.StatusForbidden {
		t.Fatalf("status = %d", rec.Code)
	}
}

func TestRendererWatermarkAffectsOutput(t *testing.T) {
	manager := newTestManager(t)

	left, err := manager.renderer.Render(AssetSpec{
		Document:  testDocument(),
		Preset:    PresetList,
		Format:    FormatWebP,
		Watermark: testWatermark("Alice", "rid-left"),
	})
	if err != nil {
		t.Fatalf("left render error = %v", err)
	}

	right, err := manager.renderer.Render(AssetSpec{
		Document:  testDocument(),
		Preset:    PresetList,
		Format:    FormatWebP,
		Watermark: testWatermark("Bob", "rid-right"),
	})
	if err != nil {
		t.Fatalf("right render error = %v", err)
	}

	if bytes.Equal(left.Bytes, right.Bytes) {
		t.Fatalf("expected different bytes for different watermarks")
	}
}

func TestRendererFormatsAndPayloadSize(t *testing.T) {
	manager := newTestManager(t)

	webpImage, err := manager.renderer.Render(AssetSpec{
		Document:  testDocument(),
		Preset:    PresetList,
		Format:    FormatWebP,
		Watermark: testWatermark("Alice", "rid-webp"),
	})
	if err != nil {
		t.Fatalf("webp render error = %v", err)
	}

	pngImage, err := manager.renderer.Render(AssetSpec{
		Document:  testDocument(),
		Preset:    PresetDialog,
		Format:    FormatPNG,
		Watermark: testWatermark("Alice", "rid-png"),
	})
	if err != nil {
		t.Fatalf("png render error = %v", err)
	}

	if webpImage.ContentType != "image/webp" {
		t.Fatalf("webp content-type = %q", webpImage.ContentType)
	}
	if pngImage.ContentType != "image/png" {
		t.Fatalf("png content-type = %q", pngImage.ContentType)
	}
	if webpImage.Width >= pngImage.Width {
		t.Fatalf("expected list width < dialog width, got %d >= %d", webpImage.Width, pngImage.Width)
	}
	if len(webpImage.Bytes) == 0 || len(pngImage.Bytes) == 0 {
		t.Fatalf("expected non-empty encoded bytes")
	}
	if len(webpImage.Bytes) > 350000 {
		t.Fatalf("webp payload too large: %d bytes", len(webpImage.Bytes))
	}
}

func TestRendererInlinePresetUsesContentWidth(t *testing.T) {
	manager := newTestManager(t)

	image, err := manager.renderer.Render(AssetSpec{
		Document: Document{
			Title: "男",
		},
		Preset: PresetInline,
		Format: FormatWebP,
		Style: RenderStyle{
			Transparent: true,
			HideAccent:  true,
		},
		Watermark: testWatermark("Alice", "rid-inline"),
	})
	if err != nil {
		t.Fatalf("inline render error = %v", err)
	}

	if image.Width <= 0 {
		t.Fatalf("expected positive inline width, got %d", image.Width)
	}
	if image.Width >= 240 {
		t.Fatalf("expected compact inline width, got %d", image.Width)
	}
}
