package sensitive

import (
	"fmt"
	"strings"
	"time"
)

func BuildDisplayWatermarkContext(ctx WatermarkContext) WatermarkContext {
	ctx.WorkID = strings.TrimSpace(ctx.WorkID)
	ctx.Name = strings.TrimSpace(ctx.Name)
	ctx.Role = strings.TrimSpace(ctx.Role)
	ctx.ClientIP = strings.TrimSpace(ctx.ClientIP)
	ctx.RequestID = strings.TrimSpace(ctx.RequestID)
	ctx.Page = resolveWatermarkPageTitle(ctx.Page)
	if ctx.Timestamp.IsZero() {
		ctx.Timestamp = nowUTC()
	}
	return ctx
}

func BuildWatermarkText(ctx WatermarkContext) string {
	ctx = BuildDisplayWatermarkContext(ctx)
	return strings.Join([]string{
		"IPRA",
		"页面 " + firstNonEmpty(ctx.Page, "安全工作区"),
		"姓名 " + firstNonEmpty(ctx.Name, "-"),
		"工号 " + firstNonEmpty(ctx.WorkID, "-"),
		"时间 " + formatWatermarkTimestamp(ctx.Timestamp),
	}, " · ")
}

func formatWatermarkTimestamp(timestamp time.Time) string {
	if timestamp.IsZero() {
		timestamp = nowUTC()
	}
	return timestamp.In(time.Local).Format("2006/01/02 15:04:05")
}

func resolveWatermarkPageTitle(page string) string {
	switch strings.TrimSpace(page) {
	case "", "secure-workspace":
		return "安全工作区"
	case "home:data":
		return "智能旅客风险评估系统"
	case "home:data:detail":
		return "智能旅客风险评估系统"
	case "home:ask":
		return "辅助问询"
	case "home:ask:strategy":
		return "辅助问询"
	case "home:ask:memory":
		return "辅助问询"
	case "home:ask:round":
		return "辅助问询"
	case "home:ask:summary":
		return "辅助问询"
	case "home:ask:judgement":
		return "辅助问询"
	case "home:log":
		return "历史记录"
	case "audit:list":
		return "历史记录"
	case "audit:detail":
		return "历史记录"
	case "admin:profiles":
		return "安全工作区"
	case "admin:profiles:detail":
		return "安全工作区"
	case "admin:watchlist":
		return "安全工作区"
	case "admin:watchlist:detail":
		return "安全工作区"
	default:
		if strings.Contains(page, "/home/data") {
			return "智能旅客风险评估系统"
		}
		if strings.Contains(page, "/home/ask") {
			return "辅助问询"
		}
		if strings.Contains(page, "/home/log") {
			return "历史记录"
		}
		return firstNonEmpty(strings.TrimSpace(page), "安全工作区")
	}
}

func firstNonEmpty(values ...string) string {
	for _, value := range values {
		if trimmed := strings.TrimSpace(value); trimmed != "" {
			return trimmed
		}
	}
	return ""
}

func NewWatermarkContext(workID string, name string, role string, clientIP string, requestID string, page string) WatermarkContext {
	return BuildDisplayWatermarkContext(WatermarkContext{
		WorkID:    workID,
		Name:      name,
		Role:      role,
		ClientIP:  clientIP,
		RequestID: requestID,
		Page:      page,
		Timestamp: nowUTC(),
	})
}

func DebugWatermarkText(page string, name string, workID string, timestamp time.Time) string {
	return BuildWatermarkText(WatermarkContext{
		Page:      page,
		Name:      name,
		WorkID:    workID,
		Timestamp: timestamp,
	})
}

func DebugWatermarkTileStyle(tileIndex int) string {
	if tileIndex < 0 || tileIndex >= len(defaultWatermarkTiles) {
		return ""
	}
	tile := defaultWatermarkTiles[tileIndex]
	return fmt.Sprintf("%.0f%% %.0f%% %.0f %.2f", tile.top*100, tile.left*100, tile.rotation, tile.opacity)
}
