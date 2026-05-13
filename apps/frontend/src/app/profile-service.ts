import { loadAuthSession } from '../auth';
import type {
  ProtectedAssetRef,
  ProtectedDetailResponse,
  ProtectedListItem,
  ProtectedListResponse,
} from './protected-service';
import { protectedJson } from './protected-service';

export type ImportType = 'BASE_PROFILE' | 'HIGH_RISK';

export interface PassengerProfileRecord {
  id: number;
  fullName: string;
  documentNum: string;
  isHighRisk: boolean;
  riskCategory?: string;
  riskReason?: string;
  profileData: Record<string, unknown>;
  updatedAt: string;
}

export interface ProfileRiskCategoryResponse {
  profileId: string;
  riskCategory: string;
}

export interface ImportBatchResult {
  batchId: number;
  batchNo: string;
  status: string;
  totalRows: number;
  successCount: number;
  failedCount: number;
  detailAsset?: ProtectedAssetRef;
}

export interface IDCardOCRResponse {
  code: number;
  msg: string;
  taskNo?: string;
  data?: {
    result: number;
    side?: 'front' | 'back' | string;
    documentNumberRecognized?: boolean;
  };
  results?: ProtectedListResponse;
  detailAsset?: ProtectedAssetRef;
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

export async function searchPassengerProfilesProtected(query: string) {
  const params = new URLSearchParams();
  const trimmed = query.trim();
  if (trimmed) {
    params.set('query', trimmed);
  }
  return protectedJson<ProtectedListResponse>(
    `/api/passenger-profiles/protected?${params.toString()}`,
    '查询旅客画像失败。'
  );
}

export async function getProtectedProfileById(id: string) {
  return protectedJson<ProtectedListItem>(
    `/api/passenger-profiles/${id}/protected`,
    '查询旅客画像失败。'
  );
}

export async function getProfileRiskCategory(id: string) {
  return protectedJson<ProfileRiskCategoryResponse>(
    `/api/passenger-profiles/${id}/risk-category`,
    '查询风险类别失败。'
  );
}

export async function importPassengerProfiles(file: File) {
  const formData = new FormData();
  formData.append('file', file);

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

export async function getProtectedImportResult(batchId: number) {
  return protectedJson<ProtectedDetailResponse>(
    `/api/passenger-profiles/imports/${batchId}/protected`,
    '读取导入明细失败。'
  );
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

export async function recognizeIDCard(photoBase64: string) {
  const response = await authorizedFetch('/api/passenger-profiles/ocr/idcard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      photoBase64,
    }),
  });

  const payload = (await response.json().catch(() => null)) as
    | IDCardOCRResponse
    | { message?: string }
    | null;

  if (!response.ok || !payload) {
    const message =
      payload && 'message' in payload && typeof payload.message === 'string'
        ? payload.message
        : '身份证 OCR 识别失败。';
    throw new Error(message);
  }

  return payload as IDCardOCRResponse;
}
