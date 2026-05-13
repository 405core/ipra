import { loadAuthSession } from '../auth';

export interface ProtectedAssetRef {
  id: string;
  url: string;
  context: string;
}

export type ProtectedTagTone =
  | 'default'
  | 'accent'
  | 'muted'
  | 'alert'
  | 'warning'
  | 'success'
  | 'identity';

export interface ProtectedFieldRef {
  key: string;
  asset: ProtectedAssetRef;
  tone?: ProtectedTagTone;
}

export interface ProtectedFactRef {
  key?: string;
  label: string;
  asset: ProtectedAssetRef;
}

export interface ProtectedFilterOption {
  value: string;
  label: string;
}

export interface ProtectedFilterGroup {
  key: string;
  label: string;
  options: ProtectedFilterOption[];
}

export interface ProtectedListItem {
  id: string;
  asset: ProtectedAssetRef;
  detailAsset?: ProtectedAssetRef;
  actions?: string[];
  kind?: string;
  fields?: ProtectedFieldRef[];
  chips?: ProtectedFieldRef[];
  facts?: ProtectedFactRef[];
  meta?: ProtectedFieldRef[];
  notes?: ProtectedFieldRef[];
  flags?: Record<string, boolean>;
}

export interface ProtectedListResponse {
  items: ProtectedListItem[];
  total: number;
  page: number;
  pageSize: number;
  filters?: ProtectedFilterGroup[];
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
