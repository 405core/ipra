import { loadAuthSession } from '../auth';

export interface ProtectedAssetRef {
  id: string;
  url: string;
  context: string;
}

export interface ProtectedListItem {
  id: string;
  asset: ProtectedAssetRef;
  detailAsset?: ProtectedAssetRef;
  actions?: string[];
}

export interface ProtectedListResponse {
  items: ProtectedListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ProtectedDetailResponse {
  id: string;
  asset: ProtectedAssetRef;
}

async function authorizedFetch(input: RequestInfo | URL, init?: RequestInit) {
  const session = loadAuthSession();
  if (!session?.token) {
    throw new Error('登录状态已失效，请重新登录。');
  }

  return fetch(input, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${session.token}`,
    },
  });
}

export async function protectedJson<T>(input: RequestInfo | URL, fallbackMessage: string) {
  const response = await authorizedFetch(input);
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
