import { loadAuthSession } from '../auth';

export interface InquiryArchiveVideoPayload {
  id: number;
  archiveId: number;
  archiveRoundId?: number | null;
  videoKind: string;
  sessionId: string;
  windowId?: string | null;
  questionId?: string | null;
  videoUrl: string;
  minioBucket: string;
  minioObjectKey: string;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  modal: string;
  startSeconds?: number | null;
  endSeconds?: number | null;
  humanOmniModel: string;
  humanOmniRawSummary: string;
  uploadPayload?: Record<string, unknown> | null;
  createdAt: string;
}

export interface InquiryArchiveRoundPayload {
  id: number;
  archiveId: number;
  roundNo: number;
  roundClientId: string;
  title: string;
  focus: string;
  strategyNote: string;
  questions: unknown[];
  transcripts: unknown[];
  answerText: string;
  roundSummary: string;
  humanOmniSummary: string;
  actionObservations: unknown[];
  riskHints: string[];
  durationSeconds: number;
  startedAt?: string | null;
  endedAt?: string | null;
  createdAt: string;
  videos: InquiryArchiveVideoPayload[];
}

export interface InquiryArchiveDetailPayload {
  id: number;
  archiveCode: string;
  sessionId: string;
  passengerProfileId?: number | null;
  passengerDocumentNum: string;
  passengerName: string;
  passengerSnapshot?: Record<string, unknown> | null;
  operatorId?: number | null;
  operatorWorkId: string;
  operatorName: string;
  finalJudgement: string;
  judgementReason: string;
  judgementBriefing?: Record<string, unknown> | null;
  multimodalAssessment?: Record<string, unknown> | null;
  roundCount: number;
  totalDurationSeconds: number;
  transcriptCount: number;
  status: string;
  archivedAt: string;
  createdAt: string;
  updatedAt: string;
  rounds: InquiryArchiveRoundPayload[];
  videos: InquiryArchiveVideoPayload[];
}

export interface InquiryArchiveListItem {
  id: number;
  archiveCode: string;
  sessionId: string;
  passengerDocumentNum: string;
  passengerName: string;
  operatorWorkId: string;
  operatorName: string;
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
}

export interface CreateInquiryArchiveVideoPayload {
  videoKind: string;
  windowId?: string | null;
  questionId?: string | null;
  videoUrl: string;
  minioBucket: string;
  minioObjectKey: string;
  fileName: string;
  contentType?: string | null;
  sizeBytes: number;
  modal: string;
  startSeconds?: number | null;
  endSeconds?: number | null;
  humanOmniModel?: string | null;
  humanOmniRawSummary?: string | null;
  uploadPayload?: Record<string, unknown> | null;
}

export interface CreateInquiryArchiveRoundPayload {
  roundNo: number;
  roundClientId: string;
  title: string;
  focus: string;
  strategyNote: string;
  questions: unknown[];
  transcripts: unknown[];
  answerText: string;
  roundSummary: string;
  humanOmniSummary: string;
  actionObservations: unknown[];
  riskHints: string[];
  durationSeconds: number;
  videos: CreateInquiryArchiveVideoPayload[];
}

export interface CreateInquiryArchivePayload {
  sessionId: string;
  passengerProfileId?: number | null;
  passengerDocumentNum: string;
  passengerName: string;
  passengerSnapshot: Record<string, unknown>;
  finalJudgement: string;
  judgementReason: string;
  judgementBriefing: Record<string, unknown>;
  multimodalAssessment: Record<string, unknown>;
  totalDurationSeconds: number;
  transcriptCount: number;
  rounds: CreateInquiryArchiveRoundPayload[];
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

  return fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${session.token}`,
    },
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

export async function createInquiryArchive(payload: CreateInquiryArchivePayload) {
  const response = await authorizedFetch('/api/inquiry/archives', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return parsePayload<InquiryArchiveDetailPayload>(response, '保存问询归档失败。');
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
  params.set('limit', String(query.limit && query.limit > 0 ? query.limit : 500));

  const response = await authorizedFetch(`/api/admin/inquiry-archives?${params.toString()}`);
  return parsePayload<InquiryArchiveListResult>(response, '查询问询归档失败。');
}

export async function getInquiryArchive(id: number) {
  const response = await authorizedFetch(`/api/admin/inquiry-archives/${id}`);
  return parsePayload<InquiryArchiveDetailPayload>(response, '查询问询归档详情失败。');
}

export async function fetchArchiveVideoBlob(videoId: number) {
  const response = await authorizedFetch(`/api/admin/inquiry-archives/videos/${videoId}/stream`, {
    headers: {},
  });
  if (!response.ok) {
    throw new Error('加载归档视频失败。');
  }
  return response.blob();
}
