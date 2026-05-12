import type { AuthSession } from '../auth';
import { formatChinaDateTime } from './display-time';

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

export const VIDEO_CAPTURE_WATERMARK_TILE_LAYOUTS: WatermarkTileLayout[] = [
  {
    id: 'capture-video-1',
    top: '18%',
    left: '22%',
    rotation: -18,
    opacity: 0.28,
  },
  {
    id: 'capture-video-2',
    top: '47%',
    left: '68%',
    rotation: -18,
    opacity: 0.24,
  },
  {
    id: 'capture-video-3',
    top: '78%',
    left: '36%',
    rotation: -18,
    opacity: 0.26,
  },
];

export const VIDEO_ARCHIVE_WATERMARK_TILE_LAYOUTS: WatermarkTileLayout[] = [
  {
    id: 'archive-video-1',
    top: '13%',
    left: '18%',
    rotation: -18,
    opacity: 0.34,
  },
  {
    id: 'archive-video-2',
    top: '22%',
    left: '72%',
    rotation: -18,
    opacity: 0.3,
  },
  {
    id: 'archive-video-3',
    top: '39%',
    left: '42%',
    rotation: -18,
    opacity: 0.32,
  },
  {
    id: 'archive-video-4',
    top: '58%',
    left: '82%',
    rotation: -18,
    opacity: 0.3,
  },
  {
    id: 'archive-video-5',
    top: '72%',
    left: '24%',
    rotation: -18,
    opacity: 0.34,
  },
  {
    id: 'archive-video-6',
    top: '78%',
    left: '61%',
    rotation: -18,
    opacity: 0.28,
  },
];

export function formatWatermarkTimestamp(timestamp: number) {
  return formatChinaDateTime(timestamp);
}

export function shouldDisplayWatermark(
  session: AuthSession | null,
  explicitWatermarkFlag: boolean | undefined,
) {
  if (!session?.user) {
    return false;
  }

  return explicitWatermarkFlag !== false;
}

export function buildWatermarkText(
  session: AuthSession,
  routeTitle: string | undefined,
  timestamp: number,
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

export function buildScopedWatermarkText(
  session: AuthSession,
  scope: string,
  timestamp: number,
) {
  return [
    'IPRA',
    scope,
    `姓名 ${session.user.name}`,
    `工号 ${session.user.workId}`,
    `时间 ${formatWatermarkTimestamp(timestamp)}`,
  ].join(' · ');
}
