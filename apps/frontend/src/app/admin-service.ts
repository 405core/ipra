import { loadAuthSession } from '../auth';
import type { ProtectedListResponse } from './protected-service';
import { protectedJson } from './protected-service';

export interface AdminUserItem {
  id: number;
  workId: string;
  name: string;
  role: 'admin' | 'user';
  status: string;
}

export interface InquirySettings {
  maxRounds: number;
  minRounds: number;
  maxAllowedRounds: number;
  updatedAt: string;
}

interface AdminUserPayload {
  workId?: string;
  name?: string;
  role?: 'admin' | 'user';
  status?: string;
  password?: string;
}

async function authorizedFetch(input: RequestInfo | URL, init?: RequestInit) {
  const session = loadAuthSession();
  if (!session?.token) {
    throw new Error('登录状态已失效，请重新登录。');
  }

  return fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${session.token}`,
    },
  });
}

async function parsePayload<T>(response: Response, fallbackMessage: string): Promise<T> {
  const payload = (await response.json().catch(() => null)) as
    | T
    | { message?: string }
    | null;

  if (
    !response.ok ||
    payload == null ||
    (typeof payload !== 'object' && typeof payload !== 'function')
  ) {
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

export async function listAdminProfilesProtected(query: string) {
  const params = new URLSearchParams();
  if (query.trim()) {
    params.set('query', query.trim());
  }
  params.set('limit', '500');
  return protectedJson<ProtectedListResponse>(
    `/api/admin/profiles/protected?${params.toString()}`,
    '查询基础画像失败。'
  );
}

export async function listAdminWatchlistProtected(query: string) {
  const params = new URLSearchParams();
  if (query.trim()) {
    params.set('query', query.trim());
  }
  params.set('limit', '500');
  return protectedJson<ProtectedListResponse>(
    `/api/admin/watchlist/protected?${params.toString()}`,
    '查询高风险名单失败。'
  );
}

export async function getAdminUser(id: number) {
  const response = await authorizedFetch(`/api/admin/users/${id}`);
  return parsePayload<AdminUserItem>(response, '查询用户失败。');
}

export async function listAdminUsersProtected(query: string) {
  const params = new URLSearchParams();
  if (query.trim()) {
    params.set('query', query.trim());
  }
  params.set('limit', '500');
  return protectedJson<ProtectedListResponse>(
    `/api/admin/users/protected?${params.toString()}`,
    '查询用户失败。'
  );
}

export async function createAdminUser(payload: AdminUserPayload) {
  const response = await authorizedFetch('/api/admin/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return parsePayload<{ message: string }>(response, '新增用户失败。');
}

export async function updateAdminUser(id: number, payload: AdminUserPayload) {
  const response = await authorizedFetch(`/api/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return parsePayload<{ message: string }>(response, '更新用户失败。');
}

export async function updateAdminUserStatus(id: number, status: string) {
  const response = await authorizedFetch(`/api/admin/users/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
  return parsePayload<{ message: string }>(response, '更新用户状态失败。');
}

export async function listAdminAuditLogsProtected(query: {
  query?: string;
  actorWorkId?: string;
  result?: string;
  limit?: number;
}) {
  const params = new URLSearchParams();
  if (query.query?.trim()) {
    params.set('query', query.query.trim());
  }
  if (query.actorWorkId?.trim()) {
    params.set('actorWorkId', query.actorWorkId.trim());
  }
  if (query.result?.trim()) {
    params.set('result', query.result.trim());
  }
  params.set('limit', String(query.limit && query.limit > 0 ? query.limit : 500));

  return protectedJson<ProtectedListResponse>(
    `/api/audit-logs/protected?${params.toString()}`,
    '查询审计日志失败。'
  );
}

export async function getInquirySettings() {
  const response = await authorizedFetch('/api/inquiry/settings');
  return parsePayload<InquirySettings>(response, '读取问询设置失败。');
}

export async function getAdminInquirySettings() {
  const response = await authorizedFetch('/api/admin/settings/inquiry');
  return parsePayload<InquirySettings>(response, '读取系统设置失败。');
}

export async function updateAdminInquirySettings(maxRounds: number) {
  const response = await authorizedFetch('/api/admin/settings/inquiry', {
    method: 'PUT',
    body: JSON.stringify({ maxRounds }),
  });
  return parsePayload<InquirySettings>(response, '保存系统设置失败。');
}
