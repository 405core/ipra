import { loadAuthSession } from '../auth';

export type ImportType = 'BASE_PROFILE' | 'HIGH_RISK';

export interface PassengerProfileRecord {
  id: number;
  fullName: string;
  documentType: string;
  documentNum: string;
  issuingRegion: string;
  gender?: number | null;
  birthDate?: string | null;
  isHighRisk: boolean;
  identityDetails: Record<string, unknown>;
  dimensionData: Record<string, unknown>;
  latestBatchId?: number | null;
  updatedAt: string;
}

export interface ImportErrorDetail {
  rowNo: number;
  errorCode: string;
  message: string;
  rawData?: Record<string, string>;
}

export interface ImportBatchResult {
  batchId: number;
  batchNo: string;
  status: string;
  totalRows: number;
  successCount: number;
  failedCount: number;
  errorDetails?: ImportErrorDetail[];
}

interface SearchProfilesResponse {
  profiles: PassengerProfileRecord[];
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

export async function searchPassengerProfiles(query: string) {
  const params = new URLSearchParams();
  const trimmed = query.trim();
  if (trimmed) {
    params.set('query', trimmed);
  }
  params.set('limit', '20');

  const response = await authorizedFetch(`/api/passenger-profiles?${params.toString()}`);
  const payload = (await response.json().catch(() => null)) as
    | SearchProfilesResponse
    | { message?: string }
    | null;

  if (!response.ok || !payload || !('profiles' in payload)) {
    const message =
      payload && 'message' in payload && typeof payload.message === 'string'
        ? payload.message
        : '查询旅客画像失败。';
    throw new Error(message);
  }

  return payload.profiles;
}

export async function importPassengerProfiles(file: File, importType: ImportType) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('importType', importType);

  const response = await authorizedFetch('/api/passenger-profiles/imports', {
    method: 'POST',
    body: formData,
  });

  const payload = (await response.json().catch(() => null)) as
    | ImportBatchResult
    | { message?: string }
    | null;

  if (!response.ok || !payload || !('batchId' in payload)) {
    const message =
      payload && 'message' in payload && typeof payload.message === 'string'
        ? payload.message
        : '导入旅客画像失败。';
    throw new Error(message);
  }

  return payload;
}
