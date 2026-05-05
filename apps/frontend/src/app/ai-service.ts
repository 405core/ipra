export interface PassengerProfilePayload {
  passengerId?: string | null;
  name?: string | null;
  age?: number | null;
  gender?: string | null;
  nationality?: string | null;
  occupation?: string | null;
  monthlyIncome?: string | null;
  travelHistory?: string[];
  documents?: Record<string, unknown>;
}

export interface TripProfilePayload {
  destination?: string | null;
  purposeDeclared?: string | null;
  stayDays?: number | null;
  ticketType?: string | null;
  returnTicketStatus?: string | null;
  companions?: string[];
  accommodation?: string | null;
  fundingSource?: string | null;
}

export interface OutputConstraintsPayload {
  questionCount: number;
  tone: string;
  language: string;
}

export interface FirstRoundStrategyRequest {
  sessionId: string;
  passengerProfile: PassengerProfilePayload;
  tripProfile: TripProfilePayload;
  knownFacts: string[];
  constraints: OutputConstraintsPayload;
}

export interface RiskAssessmentPayload {
  level: 'low' | 'medium' | 'high' | 'unknown';
  summary: string;
  reasons: string[];
}

export interface InquiryStrategyPayload {
  goal: string;
  focusAreas: string[];
}

export interface GeneratedQuestionPayload {
  questionId: string;
  priority: number;
  question: string;
  purpose: string;
  expectedEvidence: string[];
}

export interface LlmRuntimeInfoPayload {
  provider: string;
  model: string;
}

export interface FirstRoundStrategyResponse {
  sessionId: string;
  llm: LlmRuntimeInfoPayload;
  riskAssessment: RiskAssessmentPayload;
  strategy: InquiryStrategyPayload;
  questions: GeneratedQuestionPayload[];
  operatorNote: string;
}

export interface UploadedWindowFilePayload {
  filename: string;
  storedPath: string;
  contentType?: string | null;
  sizeBytes: number;
}

export interface HumanOmniSummaryResultPayload {
  modelName: string;
  rawSummary: string;
  elapsedSeconds: number;
  error?: string | null;
}

export interface HumanOmniWindowSummaryPayload {
  windowId?: string | null;
  questionId?: string | null;
  startSeconds?: number | null;
  endSeconds?: number | null;
  modal: 'video' | 'video_audio' | 'audio' | string;
  rawSummary: string;
  modelName?: string | null;
}

export interface HumanOmniSummarizeWindowResponse {
  ok: boolean;
  sessionId: string;
  questionId?: string | null;
  windowId: string;
  startSeconds?: number | null;
  endSeconds?: number | null;
  modal: 'video' | 'video_audio' | 'audio';
  uploadedFile: UploadedWindowFilePayload;
  humanOmni: HumanOmniSummaryResultPayload;
  humanOmniWindow: HumanOmniWindowSummaryPayload;
}

export interface QuestionAnswerPayload {
  questionId?: string | null;
  roundNo?: number | null;
  question: string;
  answerText: string;
  answerStartSeconds?: number | null;
  answerEndSeconds?: number | null;
}

export interface ActionObservationPayload {
  observationId?: string | null;
  type: string;
  label?: string | null;
  description: string;
  startSeconds?: number | null;
  endSeconds?: number | null;
  timeRange?: string | null;
  confidence?: number | null;
  source?: string | null;
  evidence?: Record<string, unknown> | unknown[] | string | null;
}

export interface AsrSegmentPayload {
  startSeconds: number;
  endSeconds: number;
  text: string;
}

export interface AsrPayload {
  status: string;
  provider?: string | null;
  model?: string | null;
  language?: string | null;
  text: string;
  segments: AsrSegmentPayload[];
  words: Record<string, unknown>[];
}

export interface FollowupGuidanceRequest {
  sessionId: string;
  roundNo: number;
  passengerProfile: PassengerProfilePayload;
  tripProfile: TripProfilePayload;
  qaHistory: QuestionAnswerPayload[];
  humanOmniWindows: HumanOmniWindowSummaryPayload[];
  actionObservations: ActionObservationPayload[];
  asr?: AsrPayload | null;
  constraints: OutputConstraintsPayload;
}

export interface MultimodalAssessmentPayload {
  summary: string;
  riskHints: string[];
  evidence: string[];
  limitations: string[];
}

export interface FollowupQuestionPayload {
  priority: number;
  question: string;
  reason: string;
  operatorTip: string;
  focusArea: string;
}

export interface FollowupGuidanceResponse {
  sessionId: string;
  roundNo: number;
  llm: LlmRuntimeInfoPayload;
  multimodalAssessment: MultimodalAssessmentPayload;
  followupGuidance: FollowupQuestionPayload[];
  operatorNote: string;
  warnings: string[];
}

function resolveAiServiceBaseUrl() {
  const rawBaseUrl = import.meta.env.VITE_AI_SERVICE_BASE_URL;
  if (!rawBaseUrl) {
    throw new Error('未配置 VITE_AI_SERVICE_BASE_URL。');
  }

  return rawBaseUrl.replace(/\/+$/, '');
}

function resolveRequestUrl(path: string) {
  return `${resolveAiServiceBaseUrl()}${path}`;
}

async function readErrorMessage(response: Response) {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const payload = (await response.json().catch(() => null)) as
      | { detail?: string; message?: string }
      | null;
    if (payload?.detail) {
      return payload.detail;
    }

    if (payload?.message) {
      return payload.message;
    }
  }

  const text = await response.text().catch(() => '');
  return text || `请求失败（${response.status}）`;
}

async function requestJson<TResponse>(
  path: string,
  init: RequestInit
): Promise<TResponse> {
  const response = await fetch(resolveRequestUrl(path), init);

  if (!response.ok) {
    const message = await readErrorMessage(response);
    throw new Error(message);
  }

  return (await response.json()) as TResponse;
}

export async function requestFirstRoundStrategy(
  payload: FirstRoundStrategyRequest
) {
  return requestJson<FirstRoundStrategyResponse>('/v1/inquiry/first-round-strategy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export async function uploadHumanOmniWindow(formData: FormData) {
  return requestJson<HumanOmniSummarizeWindowResponse>('/v1/humanomni/summarize-window', {
    method: 'POST',
    body: formData,
  });
}

export async function requestFollowupGuidance(
  payload: FollowupGuidanceRequest
) {
  return requestJson<FollowupGuidanceResponse>('/v1/inquiry/followup-guidance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}
