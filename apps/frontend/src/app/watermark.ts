import type { AuthSession } from '../auth';

export const WATERMARK_REFRESH_INTERVAL_MS = 1000;

export interface WatermarkTileLayout {
  id: string;
  top: string;
  left: string;
  rotation: number;
  opacity: number;
}

export const WATERMARK_TILE_LAYOUTS: WatermarkTileLayout[] = [
  { id: 'tile-1', top: '9%', left: '14%', rotation: -18, opacity: 0.38 },
  { id: 'tile-2', top: '18%', left: '81%', rotation: -16, opacity: 0.34 },
  { id: 'tile-3', top: '34%', left: '49%', rotation: -20, opacity: 0.36 },
  { id: 'tile-4', top: '52%', left: '10%', rotation: -19, opacity: 0.38 },
  { id: 'tile-5', top: '58%', left: '74%', rotation: -17, opacity: 0.35 },
  { id: 'tile-6', top: '79%', left: '24%', rotation: -21, opacity: 0.38 },
  { id: 'tile-7', top: '89%', left: '86%', rotation: -15, opacity: 0.34 },
];

const WATERMARK_TIMESTAMP_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
};

export function formatWatermarkTimestamp(timestamp: number) {
  return new Intl.DateTimeFormat('zh-CN', WATERMARK_TIMESTAMP_FORMAT).format(timestamp);
}

export function shouldDisplayWatermark(
  session: AuthSession | null,
  explicitWatermarkFlag: boolean | undefined
) {
  if (!session?.user) {
    return false;
  }

  return explicitWatermarkFlag !== false;
}

export function buildWatermarkText(
  session: AuthSession,
  routeTitle: string | undefined,
  timestamp: number
) {
  const normalizedTitle = routeTitle?.trim() || '安全工作区';

  return [
    `IPRA`,
    `页面 ${normalizedTitle}`,
    `姓名 ${session.user.name}`,
    `工号 ${session.user.workId}`,
    `时间 ${formatWatermarkTimestamp(timestamp)}`,
  ].join(' · ');
}
