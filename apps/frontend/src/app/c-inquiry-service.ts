export interface CInquiryPassengerPayload {
  name?: string;
  documentId?: string;
  destination?: string;
  purpose?: string;
  riskLevel?: string;
}

export interface CInquirySignalPayload {
  source: string;
  label: string;
  severity: number;
  at?: string;
}

export interface CInquiryTurnPayload {
  round: number;
  question: string;
  answerTranscript: string;
  signals?: CInquirySignalPayload[];
  riskHints: string[];
  rationale: string;
  createdAt: string;
}

export interface CInquirySessionPayload {
  sessionId: string;
  passenger: CInquiryPassengerPayload;
  currentRound: number;
  maxRounds: number;
  currentQuestion: string;
  status: 'active' | 'completed' | string;
  history: CInquiryTurnPayload[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCInquirySessionRequest {
  passenger: CInquiryPassengerPayload;
  maxRounds?: number;
  initialQuestion?: string;
}

export interface SubmitCInquiryTurnRequest {
  answerTranscript: string;
  signals?: CInquirySignalPayload[];
}

export interface CInquiryTurnResponse {
  sessionId: string;
  nextQuestion: string;
  rationale: string;
  riskHints: string[];
  currentRound: number;
  maxRounds: number;
  shouldStop: boolean;
  status: 'active' | 'completed' | string;
  currentQuestion: string;
  history: CInquiryTurnPayload[];
}

export interface CAsrResponse {
  transcript: string;
  confidence: number;
  language: string;
  audioBytes: number;
  durationMs: number;
}

export interface TranscribeCInquiryAnswerRequest {
  fallbackTranscript?: string;
  audio?: Blob | null;
  durationMs?: number;
}

async function readErrorMessage(response: Response) {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const payload = (await response.json().catch(() => null)) as {
      message?: string;
      detail?: string;
    } | null;

    if (payload?.message) {
      return payload.message;
    }

    if (payload?.detail) {
      return payload.detail;
    }
  }

  return (
    (await response.text().catch(() => '')) || `请求失败（${response.status}）`
  );
}

async function requestJson<TResponse>(path: string, init?: RequestInit) {
  const response = await fetch(path, init);

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  return (await response.json()) as TResponse;
}

export function createCInquirySession(payload: CreateCInquirySessionRequest) {
  return requestJson<CInquirySessionPayload>('/api/inquiry/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

export function getCInquirySession(sessionId: string) {
  return requestJson<CInquirySessionPayload>(
    `/api/inquiry/sessions/${encodeURIComponent(sessionId)}`,
  );
}

export function submitCInquiryTurn(
  sessionId: string,
  payload: SubmitCInquiryTurnRequest,
) {
  return requestJson<CInquiryTurnResponse>(
    `/api/inquiry/sessions/${encodeURIComponent(sessionId)}/turns`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  );
}

export function transcribeCInquiryAnswer(
  payload: TranscribeCInquiryAnswerRequest,
) {
  const formData = new FormData();

  if (payload.fallbackTranscript?.trim()) {
    formData.append('fallbackTranscript', payload.fallbackTranscript.trim());
  }

  if (payload.durationMs !== undefined) {
    formData.append(
      'durationMs',
      String(Math.max(0, Math.round(payload.durationMs))),
    );
  }

  if (payload.audio) {
    formData.append('audio', payload.audio, `c-answer-${Date.now()}.webm`);
  }

  return requestJson<CAsrResponse>('/api/asr/transcribe', {
    method: 'POST',
    body: formData,
  });
}
