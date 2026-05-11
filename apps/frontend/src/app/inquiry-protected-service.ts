import { loadAuthSession } from '../auth';
import type { ProtectedAssetRef } from './protected-service';

export interface ProtectedInquiryRoundSnapshot {
  id: string;
  roundNumber: number;
  title: string;
  questionCount: number;
  status: string;
  promptAsset?: ProtectedAssetRef;
  summaryAsset?: ProtectedAssetRef;
}

export interface ProtectedInquirySessionSnapshot {
  sessionId: string;
  strategyAsset?: ProtectedAssetRef;
  memoryAsset?: ProtectedAssetRef;
  currentRound?: ProtectedInquiryRoundSnapshot;
  historicalRounds: ProtectedInquiryRoundSnapshot[];
  judgementAsset?: ProtectedAssetRef;
  completedRounds: number;
  totalSampleDuration: number;
}

async function authorizedFetch(input: RequestInfo | URL, init?: RequestInit) {
  const session = loadAuthSession();
  if (!session?.token) {
    throw new Error('登录状态已失效，请重新登录。');
  }

  const headers =
    init?.body instanceof FormData
      ? {
          ...(init?.headers ?? {}),
          Authorization: `Bearer ${session.token}`,
        }
      : {
          'Content-Type': 'application/json',
          ...(init?.headers ?? {}),
          Authorization: `Bearer ${session.token}`,
        };

  return fetch(input, {
    ...init,
    headers,
  });
}

async function parseProtectedPayload<T>(response: Response, fallbackMessage: string): Promise<T> {
  const payload = (await response.json().catch(() => null)) as
    | T
    | { message?: string }
    | null;

  if (!response.ok || !payload) {
    const message =
      payload &&
      typeof payload === 'object' &&
      'message' in payload &&
      typeof payload.message === 'string'
        ? payload.message
        : fallbackMessage;
    throw new Error(message);
  }

  return payload as T;
}

export async function generateProtectedInquiryStrategy(payload: {
  sessionId: string;
  passengerId: string;
  passengerProfile: Record<string, unknown>;
  tripProfile: Record<string, unknown>;
  knownFacts: string[];
  constraints: Record<string, unknown>;
}) {
  const response = await authorizedFetch('/api/inquiry/protected/strategy', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return parseProtectedPayload<ProtectedInquirySessionSnapshot>(
    response,
    '生成受保护问询策略失败。'
  );
}

export async function uploadProtectedInquiryRoundWindow(
  sessionId: string,
  roundId: string,
  formData: FormData
) {
  const response = await authorizedFetch(
    `/api/inquiry/protected/sessions/${sessionId}/rounds/${roundId}/window-summary`,
    {
      method: 'POST',
      body: formData,
    }
  );
  return parseProtectedPayload<ProtectedInquirySessionSnapshot>(
    response,
    '上传受保护问询窗口摘要失败。'
  );
}

export async function requestProtectedInquiryFollowup(
  sessionId: string,
  payload: Record<string, unknown>
) {
  const response = await authorizedFetch(`/api/inquiry/protected/sessions/${sessionId}/followup`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return parseProtectedPayload<ProtectedInquirySessionSnapshot>(
    response,
    '生成受保护追问失败。'
  );
}

export async function requestProtectedInquiryJudgement(sessionId: string) {
  const response = await authorizedFetch(`/api/inquiry/protected/sessions/${sessionId}/judgement`, {
    method: 'POST',
    body: JSON.stringify({}),
  });
  return parseProtectedPayload<ProtectedInquirySessionSnapshot>(
    response,
    '生成受保护人工判断摘要失败。'
  );
}

export async function refreshProtectedInquiryMemory(sessionId: string) {
  const response = await authorizedFetch(`/api/inquiry/protected/sessions/${sessionId}/memory`);
  return parseProtectedPayload<{ asset: ProtectedAssetRef }>(
    response,
    '刷新受保护记忆失败。'
  );
}
