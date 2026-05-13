import { loadAuthSession } from '../auth';
import type {
  ProtectedAssetRef,
  ProtectedFilterGroup,
  ProtectedListItem,
} from './protected-service';
import { protectedJson } from './protected-service';

export interface InquiryArchiveVideoPayload {
  id: number;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  modal: string;
  playbackPath: string;
}

export interface InquiryArchiveRoundPayload {
  id: number;
  roundNo: number;
  durationSeconds: number;
  detailAsset?: ProtectedAssetRef;
  videos: InquiryArchiveVideoPayload[];
}

export interface InquiryArchiveDetailPayload {
  id: string;
  archiveCode: string;
  sessionId: string;
  finalJudgement: string;
  roundCount: number;
  totalDurationSeconds: number;
  transcriptCount: number;
  status: string;
  archivedAt: string;
  overviewAsset?: ProtectedAssetRef;
  judgementAsset?: ProtectedAssetRef;
  briefingAsset?: ProtectedAssetRef;
  passengerAsset?: ProtectedAssetRef;
  rounds: InquiryArchiveRoundPayload[];
  videos: InquiryArchiveVideoPayload[];
}

export interface InquiryArchiveListItem extends ProtectedListItem {
  archiveCode: string;
  sessionId: string;
  finalJudgement: string;
  roundCount: number;
  totalDurationSeconds: number;
  transcriptCount: number;
  videoCount: number;
  status: string;
  archivedAt: string;
}

export interface InquiryArchiveListResult {
  items: InquiryArchiveListItem[];
  total: number;
  filters: ProtectedFilterGroup[];
}

interface ProtectedArchiveListResponse {
  items: InquiryArchiveListItem[];
  total: number;
  page: number;
  pageSize: number;
  filters?: ProtectedFilterGroup[];
}

export interface CreateInquiryArchiveVideoPayload {
  fileName: string;
  contentType?: string | null;
  sizeBytes: number;
}

export interface CreateInquiryArchiveRoundPayload {
  roundNo: number;
  roundClientId: string;
  videos: CreateInquiryArchiveVideoPayload[];
}

export interface CreateInquiryArchivePayload {
  sessionId: string;
  finalJudgement: string;
  judgementReason: string;
  rounds: CreateInquiryArchiveRoundPayload[];
}

export interface UploadedArchiveVideoFilePayload {
  filename: string;
  contentType?: string | null;
  sizeBytes: number;
}

export interface InquiryArchiveVideoUploadResult {
  uploadedFile: UploadedArchiveVideoFilePayload;
}

export interface InquiryArchiveQuery {
  query?: string;
  judgement?: string;
  documentNum?: string;
  operatorWorkId?: string;
  from?: string;
  to?: string;
  limit?: number;
}

async function authorizedFetch(input: RequestInfo | URL, init?: RequestInit) {
  const session = loadAuthSession();
  if (!session?.token) {
    throw new Error('登录状态已失效，请重新登录。');
  }

  const headers = new Headers(init?.headers);
  const isFormData =
    typeof FormData !== 'undefined' && init?.body instanceof FormData;
  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  headers.set('Authorization', `Bearer ${session.token}`);

  return fetch(input, {
    ...init,
    headers,
  });
}

async function parsePayload<T>(response: Response, fallbackMessage: string) {
  const payload = (await response.json().catch(() => null)) as
    | T
    | { message?: string }
    | null;

  if (!response.ok || payload == null) {
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

export async function createInquiryArchive(
  payload: CreateInquiryArchivePayload,
) {
  const response = await authorizedFetch('/api/inquiry/archives', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return parsePayload<{
    archiveCode: string;
    archivedAt: string;
    finalJudgement: string;
    id: string;
  }>(
    response,
    '保存问询归档失败。',
  );
}

export async function uploadInquiryArchiveVideo(formData: FormData) {
  const response = await authorizedFetch('/api/inquiry/archive-videos', {
    method: 'POST',
    body: formData,
  });
  return parsePayload<InquiryArchiveVideoUploadResult>(
    response,
    '上传问询视频到 MinIO 失败。',
  );
}

export async function listInquiryArchives(query: InquiryArchiveQuery = {}) {
  const params = new URLSearchParams();
  if (query.query?.trim()) {
    params.set('query', query.query.trim());
  }
  if (query.judgement?.trim()) {
    params.set('judgement', query.judgement.trim());
  }
  if (query.documentNum?.trim()) {
    params.set('documentNum', query.documentNum.trim());
  }
  if (query.operatorWorkId?.trim()) {
    params.set('operatorWorkId', query.operatorWorkId.trim());
  }
  if (query.from?.trim()) {
    params.set('from', query.from.trim());
  }
  if (query.to?.trim()) {
    params.set('to', query.to.trim());
  }
  params.set(
    'limit',
    String(query.limit && query.limit > 0 ? query.limit : 500),
  );

  const response = await protectedJson<ProtectedArchiveListResponse>(
    `/api/admin/inquiry-archives?${params.toString()}`,
    '查询问询归档失败。'
  );
  return {
    items: response.items,
    total: response.total,
    filters: response.filters ?? [],
  } satisfies InquiryArchiveListResult;
}

export async function getInquiryArchive(id: number) {
  return protectedJson<InquiryArchiveDetailPayload>(
    `/api/admin/inquiry-archives/${id}`,
    '查询问询归档详情失败。',
  );
}

export async function fetchArchiveVideoBlob(videoId: number) {
  const response = await authorizedFetch(
    `/api/admin/inquiry-archives/videos/${videoId}/stream`,
    {
      headers: {},
    },
  );
  if (!response.ok) {
    throw new Error('加载归档视频失败。');
  }
  return response.blob();
}
