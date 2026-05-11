import { loadAuthSession } from '../auth';
import type {
  AgentMemoryContextPayload,
  AgentMemoryItemPayload,
  AgentMemoryUpdatePayload,
} from './ai-service';

export interface MemoryUpsertResponse {
  items: AgentMemoryItemPayload[];
  total: number;
}

async function authorizedJson<TResponse>(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  const session = loadAuthSession();
  if (!session?.token) {
    throw new Error('登录状态已失效，请重新登录。');
  }

  const response = await fetch(input, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${session.token}`,
    },
  });

  const payload = (await response.json().catch(() => null)) as
    | TResponse
    | { message?: string }
    | null;

  if (!response.ok || !payload) {
    const message =
      payload &&
      typeof payload === 'object' &&
      'message' in payload &&
      typeof payload.message === 'string'
        ? payload.message
        : '智能体记忆请求失败。';
    throw new Error(message);
  }

  return payload as TResponse;
}

export async function fetchMemoryContext(
  sessionId: string,
  passengerId: string,
) {
  const params = new URLSearchParams();
  params.set('sessionId', sessionId);
  params.set('passengerId', passengerId);

  return authorizedJson<AgentMemoryContextPayload>(
    `/api/inquiry/memory-context?${params.toString()}`,
  );
}

export async function persistMemoryUpdates(
  memoryUpdates: AgentMemoryUpdatePayload[],
) {
  if (!memoryUpdates.length) {
    return { items: [], total: 0 } satisfies MemoryUpsertResponse;
  }

  return authorizedJson<MemoryUpsertResponse>('/api/inquiry/memory-updates', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ memoryUpdates }),
  });
}
