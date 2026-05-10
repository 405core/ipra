import { loadAuthSession } from '../auth';

export type ImportType = 'BASE_PROFILE' | 'HIGH_RISK';

export interface PassengerProfileRecord {
  id: number;
  fullName: string;
  documentNum: string;
  isHighRisk: boolean;
  riskReason?: string;
  profileData: Record<string, unknown>;
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

export async function downloadImportTemplate(templateType: ImportType) {
  const endpoint =
    templateType === 'HIGH_RISK'
      ? '/api/import-templates/high-risk-watchlist.xlsx'
      : '/api/import-templates/passenger-profile.xlsx';

  const response = await authorizedFetch(endpoint);
  if (!response.ok) {
    let message = '模板下载失败。';
    try {
      const payload = (await response.json()) as { message?: string };
      if (typeof payload?.message === 'string' && payload.message.trim()) {
        message = payload.message;
      }
    } catch {
      // noop
    }
    throw new Error(message);
  }

  const blob = await response.blob();
  const disposition = response.headers.get('Content-Disposition') ?? '';
  const match = disposition.match(/filename="([^"]+)"/);
  const filename =
    match?.[1] ??
    (templateType === 'HIGH_RISK'
      ? 'ipra-high-risk-watchlist-template.xlsx'
      : 'ipra-passenger-profile-template.xlsx');

  return { blob, filename };
}
