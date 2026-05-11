import { loadAuthSession } from '../auth';

export interface AuditLogItem {
  id: number;
  actorUserId?: number | null;
  actorWorkId: string;
  actorName: string;
  actorRole: string;
  action: string;
  resource: string;
  result: string;
  statusCode: number;
  method: string;
  path: string;
  clientIp: string;
  userAgent: string;
  detail?: Record<string, unknown> | null;
  createdAt: string;
}

export interface AuditLogListResult {
  items: AuditLogItem[];
  total: number;
}

export interface AuditLogQuery {
  query?: string;
  limit?: number;
  result?: string;
  actorWorkId?: string;
}

export interface AuditEventPayload {
  action: string;
  resource: string;
  result?: string;
  path?: string;
  detail?: Record<string, unknown>;
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

export async function listAuditLogs(query: AuditLogQuery = {}) {
  const params = new URLSearchParams();
  if (query.query?.trim()) {
    params.set('query', query.query.trim());
  }
  if (query.result?.trim()) {
    params.set('result', query.result.trim());
  }
  if (query.actorWorkId?.trim()) {
    params.set('actorWorkId', query.actorWorkId.trim());
  }
  params.set('limit', String(query.limit && query.limit > 0 ? query.limit : 200));

  const response = await authorizedFetch(`/api/audit-logs?${params.toString()}`);
  return parsePayload<AuditLogListResult>(response, '查询审计日志失败。');
}

export async function recordAuditEvent(payload: AuditEventPayload) {
  const response = await authorizedFetch('/api/audit-logs/events', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return parsePayload<{ message: string }>(response, '记录审计日志失败。');
}
