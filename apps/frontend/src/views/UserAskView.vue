<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';
import SensitiveAssetImage from '../app/SensitiveAssetImage.vue';
import { formatChinaDateTime, formatChinaTime } from '../app/display-time';
import { useRoute, useRouter } from 'vue-router';
import { openTouchInput } from '../app/touch-input';
import {
  resolveAiServiceWebSocketUrl,
  type ActionObservationPayload,
  type AsrPayload,
  type FollowupGuidanceResponse,
  type HumanOmniWindowSummaryPayload,
  type MultimodalAssessmentPayload,
  type RealtimeAsrEvent,
  type RiskAssessmentPayload,
  type UploadedWindowFilePayload,
} from '../app/ai-service';
import { recordAuditEvent } from '../app/audit-service';
import {
  generateProtectedInquiryStrategy,
  type ProtectedInquiryBlock,
  refreshProtectedInquiryMemory,
  requestProtectedInquiryFollowup,
  requestProtectedInquiryJudgement,
  uploadProtectedInquiryRoundWindow,
  type ProtectedInquiryRoundSnapshot,
  type ProtectedInquirySessionSnapshot,
} from '../app/inquiry-protected-service';
import type {
  ProtectedAssetRef,
  ProtectedFactRef,
  ProtectedFieldRef,
  ProtectedListItem,
} from '../app/protected-service';
import {
  createInquiryArchive,
  uploadInquiryArchiveVideo,
  type CreateInquiryArchivePayload,
  type CreateInquiryArchiveRoundPayload,
  type CreateInquiryArchiveVideoPayload,
  type UploadedArchiveVideoFilePayload,
} from '../app/archive-service';
import {
  getProtectedProfileById,
} from '../app/profile-service';
import {
  createIdleRealtimeDetectionState,
  createRealtimeDetectionController,
  type RealtimeDetectionController,
  type RealtimeEvent,
  type RealtimeDetectionState,
} from '../app/realtime-mediapipe';
import { useProtectedPage } from '../app/use-protected-page';
import { getInquirySettings } from '../app/admin-service';
import { ElMessage } from '../app/el-message';
import { loadAuthSession } from '../auth';
import {
  buildScopedWatermarkText,
  VIDEO_CAPTURE_WATERMARK_TILE_LAYOUTS,
  WATERMARK_REFRESH_INTERVAL_MS,
} from '../app/watermark';

type WorkflowStage = 'strategy' | 'interview' | 'judgement';
type RiskLevel = 'high' | 'medium';
type TranscriptRole = 'system' | 'interviewer' | 'subject';
type SamplingPhase = 'idle' | 'active' | 'ended' | 'error';
type RoundUploadState = 'idle' | 'uploading' | 'uploaded' | 'error';
type FinalJudgement = 'concealment' | 'falseStatement' | 'clear';
type StageLoadingMode =
  | 'strategy'
  | 'samplingUpload'
  | 'nextRound'
  | 'judgementBriefing';
type SpeechRecognitionPhase =
  | 'idle'
  | 'connecting'
  | 'listening'
  | 'stopping'
  | 'ended'
  | 'unsupported'
  | 'error';
type MemoryLoadState = 'idle' | 'loading' | 'ready' | 'error';
type ProfileLoadState = 'idle' | 'loading' | 'ready' | 'locked' | 'error';
type RiskCategoryCode =
  | 'cross_border_gambling'
  | 'cross_border_fraud'
  | 'illegal_work'
  | 'suspicious_purpose';
type RiskCategorySource = 'watchlist' | 'officer' | 'none';

interface RiskCaseContextPayload {
  source: RiskCategorySource;
  category: RiskCategoryCode;
  label: string;
  reason?: string;
  officerNote?: string;
}

interface PassengerProfileViewModel {
  name: string;
  alias: string;
  documentId: string;
  pnr: string;
  route: string;
  seat: string;
  eta: string;
  riskLevel: RiskLevel;
  riskLabel: string;
  summary: string;
  observation: string;
  tags: string[];
}

interface StrategyQuestion {
  id: string;
  title: string;
  prompt: string;
  objective: string;
}

interface TranscriptEntry {
  id: string;
  speaker: string;
  role: TranscriptRole;
  time: string;
  text: string;
}

interface InterviewRound {
  id: string;
  roundNumber: number;
  title: string;
  questionCount: number;
  promptBlock: ProtectedInquiryBlock | null;
  summaryBlock: ProtectedInquiryBlock | null;
  promptAsset: ProtectedAssetRef | null;
  summaryAsset: ProtectedAssetRef | null;
  focus: string;
  strategyNote: string;
  signal: string;
  questions: StrategyQuestion[];
  transcripts: TranscriptEntry[];
  completed: boolean;
  durationSeconds: number;
  summary: string;
  uploadState: RoundUploadState;
  uploadErrorMessage: string;
  humanOmniWindow: HumanOmniWindowSummaryPayload | null;
  actionObservations: ActionObservationPayload[];
  recordedFileName: string;
  uploadedFile: UploadedArchiveVideoFilePayload | null;
  asrText: string;
}

interface SamplingState {
  phase: SamplingPhase;
  errorMessage: string;
  elapsedSeconds: number;
  audioLevel: number;
  meterBars: number[];
  permissionGranted: boolean;
}

interface StageItem {
  id: WorkflowStage;
  label: string;
  helper: string;
}

interface StageLoadingContent {
  eyebrow: string;
  title: string;
  detail: string;
  phrases: string[];
}

interface WindowWithWebkitAudioContext extends Window {
  webkitAudioContext?: typeof AudioContext;
}

interface MockPassengerSupplement {
  passengerId: string;
  age: number;
  gender: string;
  nationality: string;
  occupation: string;
  monthlyIncome: string;
  travelHistory: string[];
  documents: Record<string, unknown>;
}

interface MockTripSupplement {
  purposeDeclared: string;
  stayDays: number;
  ticketType: string;
  returnTicketStatus: string;
  companions: string[];
  accommodation: string;
  fundingSource: string;
}

interface JudgementBriefing {
  multimodalAssessment: MultimodalAssessmentPayload;
  operatorNote: string;
  warnings: string[];
  generatedAt: string;
}

const session = loadAuthSession();
const inspectorName = session?.user.name || '普通员工';
const inspectorWorkId = session?.user.workId || 'EMP-0000';
const route = useRoute();
const router = useRouter();
const touchInputHint = '单击正常输入，双击打开触控键盘';

const workflowStages: StageItem[] = [
  {
    id: 'strategy',
    label: '首轮策略生成',
    helper: '读取画像并产出首轮问题',
  },
  {
    id: 'interview',
    label: '智能辅助问询',
    helper: '采样、转写与多轮追问',
  },
  {
    id: 'judgement',
    label: '人工辅助判断',
    helper: '给出最终判定并归档',
  },
];

const riskCategoryLabels: Record<RiskCategoryCode, string> = {
  cross_border_gambling: '跨境赌博',
  cross_border_fraud: '跨境电诈',
  illegal_work: '非法务工',
  suspicious_purpose: '出境目的存疑',
};

const stageLoadingContent: Record<StageLoadingMode, StageLoadingContent> = {
  strategy: {
    eyebrow: '首轮策略',
    title: '正在生成首轮策略',
    detail: 'AI-Service 正在整合画像、风险标签和输出约束。',
    phrases: [
      '正在读取旅客画像',
      '正在校准风险标签',
      '正在组织首轮问题包',
      '正在生成工作人员提示',
    ],
  },
  samplingUpload: {
    eyebrow: '采样整理',
    title: '正在整理本轮采样',
    detail: '系统正在停止录制、汇总转写，并上传音视频窗口摘要。',
    phrases: [
      '正在封装音视频片段',
      '正在提取本轮问询线索',
      '正在上传 HumanOmni 窗口',
      '正在等待多模态摘要返回',
    ],
  },
  nextRound: {
    eyebrow: '追问生成',
    title: '正在生成下一轮追问',
    detail: '系统正在结合本轮摘要和历史线索，整理下一轮问询重点。',
    phrases: [
      '正在读取本轮摘要',
      '正在比对风险缺口',
      '正在生成追问问题',
      '正在更新轮次焦点',
    ],
  },
  judgementBriefing: {
    eyebrow: '人工复核',
    title: '正在整理人审前摘要',
    detail: 'AI-Service 正在生成多模态辅助线索，供检查员最终判定。',
    phrases: [
      '正在归并多轮采样证据',
      '正在提炼风险提示',
      '正在生成判定辅助摘要',
      '正在准备人工复核材料',
    ],
  },
};

async function openJudgementReasonKeyboard() {
  const value = await openTouchInput({
    title: '输入详细理由',
    description: '请填写关键证据、风险信号与人工判断依据。',
    placeholder:
      '请详细说明为什么做出该判定，至少包含关键证据、风险信号与人工判断依据。',
    value: judgementReason.value,
    multiline: true,
    confirmText: '确认回填',
  });

  if (value == null) {
    return;
  }

  judgementReason.value = value;
}

const strategyBlueprints = [
  {
    summary:
      '系统优先围绕时间线断点、设备空窗与照明波动生成首轮策略，用于验证对象叙述是否稳定一致。',
    questions: [
      {
        title: '时间线复述',
        prompt:
          '请按时间顺序复述 10:40 到 10:50 之间您在西区仓库的具体位置、动作和接触到的设备。',
        objective: '确认基础时间线是否稳定。',
      },
      {
        title: '终端空窗说明',
        prompt:
          '系统显示您的手持终端在 10:45 至 10:50 没有任何操作记录，请解释当时为什么会出现空窗。',
        objective: '核对日志空窗与口头描述是否一致。',
      },
      {
        title: '照明波动细节',
        prompt:
          '您提到现场照明有短暂波动，请说明发生时间、持续时长，以及是否影响到您正在进行的工作。',
        objective: '锁定异常事件与行为变化的关联。',
      },
      {
        title: '现场同伴核验',
        prompt:
          '在那段时间里，还有哪些同事或设备管理员在您附近？是否有人与您有过交接或沟通？',
        objective: '为下一轮交叉核验建立对象。',
      },
    ],
  },
  {
    summary:
      '策略引擎将首轮重点放在设备异常与现场同伴交叉验证，优先测试对象对关键细节的回忆完整性。',
    questions: [
      {
        title: '岗位活动切片',
        prompt:
          '请将 10:40 到 10:50 这十分钟拆成几个动作阶段，分别说明您每一段都在处理什么任务。',
        objective: '检查描述是否具有可核对的颗粒度。',
      },
      {
        title: '设备异常上报',
        prompt:
          '若终端当时确实异常，您是否向值班员、组长或设备管理员报告过？请说明对象和时间点。',
        objective: '判断异常响应是否符合常规流程。',
      },
      {
        title: '照明与监控关系',
        prompt:
          '照明波动与监控断点是否几乎同时发生？您当时有没有因此移动位置、暂停操作或离开工位？',
        objective: '比对异常事件与行为变化。',
      },
      {
        title: '旁证对象识别',
        prompt:
          '请回忆那几分钟里，谁最有可能证明您的位置和动作？如果需要核对，应先找哪位同事？',
        objective: '提取后续追问与交叉核验线索。',
      },
    ],
  },
];

const currentStage = ref<WorkflowStage>('strategy');
const sessionId = ref(createSessionId());
const protectedSession = ref<ProtectedInquirySessionSnapshot | null>(null);
const protectedProfile = ref<ProtectedListItem | null>(null);
const maxInteractionRounds = ref(3);
const inquirySettingsMessage = ref('');
const hasLoadedInquirySettings = ref(false);
const roundLimitDialogVisible = ref(false);
const strategyGenerationCount = ref(0);
const isGeneratingStrategy = ref(false);
const isEndingSampling = ref(false);
const isRequestingGuidance = ref(false);
const strategyRequestError = ref('');
const roundServiceError = ref('');
const memoryLoadState = ref<MemoryLoadState>('idle');
const memoryErrorMessage = ref('');
const memoryLastSyncedAt = ref('');
const rounds = ref<InterviewRound[]>([]);
const currentRoundId = ref<string | null>(null);
const selectedJudgement = ref<FinalJudgement | null>(null);
const judgementReason = ref('');
const isArchived = ref(false);
const isArchiving = ref(false);
const archivedAt = ref('');
const archiveCode = ref('');
const stageLoadingMode = ref<StageLoadingMode | null>(null);
const stageLoadingPhraseIndex = ref(0);
const videoWatermarkTimestamp = ref(Date.now());
const speechRecognitionPhase = ref<SpeechRecognitionPhase>('idle');
const speechRecognitionMessage = ref('等待开始采样。');
const profileLoadState = ref<ProfileLoadState>('idle');
const profileLoadError = ref('');

const videoElement = ref<HTMLVideoElement | null>(null);
const overlayCanvas = ref<HTMLCanvasElement | null>(null);
const capturePanelElement = ref<HTMLElement | null>(null);
const roundPanelElement = ref<HTMLElement | null>(null);
const roundPanelMaxHeight = ref('');
const samplingState = ref<SamplingState>(createIdleSamplingState());
const realtimeDetection = ref<RealtimeDetectionState>(
  createIdleRealtimeDetectionState(),
);

let mediaStream: MediaStream | null = null;
let audioContext: AudioContext | null = null;
let analyserNode: AnalyserNode | null = null;
let audioSourceNode: MediaStreamAudioSourceNode | null = null;
let meterFrameId: number | null = null;
let elapsedIntervalId: number | null = null;
let samplingStartedAt = 0;
let realtimeDetectionController: RealtimeDetectionController | null = null;
let mediaRecorder: MediaRecorder | null = null;
let recordedChunks: Blob[] = [];
let recordingMimeType = '';
let asrWebSocket: WebSocket | null = null;
let asrProcessorNode: ScriptProcessorNode | null = null;
let asrPcmByteQueue: number[] = [];
let asrStableSegments = new Map<number, string>();
let asrInterimSegments = new Map<number, string>();
let speechRecognitionEntryId = '';
let speechFinalTranscript = '';
let speechInterimTranscript = '';
let isStoppingSpeechRecognition = false;
let speechRecognitionHadError = false;
let speechRecognitionFatalError = false;
let speechRecognitionStopTimerId: number | null = null;
let interviewPanelResizeObserver: ResizeObserver | null = null;
const ASR_TARGET_SAMPLE_RATE = 16000;
const ASR_FRAME_BYTES = 1280;
const ASR_STOP_GRACE_MS = 2500;
let stageLoadingTimerId: number | null = null;
let videoWatermarkTimerId: number | null = null;
const MP4_H264_MIME_TYPES = [
  'video/mp4;codecs=avc1.64001F,mp4a.40.2',
  'video/mp4;codecs=avc1.4D401F,mp4a.40.2',
  'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
  'video/mp4;codecs=h264,aac',
  'video/mp4',
] as const;

const currentRound = computed(() => {
  if (!currentRoundId.value) {
    return null;
  }

  return (
    rounds.value.find((round) => round.id === currentRoundId.value) || null
  );
});

const captureVideoWatermarkText = computed(() =>
  session
    ? buildScopedWatermarkText(
        session,
        '采集视频',
        videoWatermarkTimestamp.value,
      )
    : '',
);

const completedRounds = computed(() =>
  rounds.value.filter((round) => round.completed),
);

const historicalRounds = computed(() => {
  if (!currentRound.value) {
    return [];
  }

  return rounds.value
    .filter((round) => round.id !== currentRound.value?.id)
    .slice()
    .reverse();
});

const totalSampleDuration = computed(
  () =>
    protectedSession.value?.totalSampleDuration ??
    completedRounds.value.reduce(
      (sum, round) => sum + round.durationSeconds,
      0,
    ),
);

const strategyGenerated = computed(() =>
  Boolean(protectedSession.value?.strategyAsset),
);
const canEnterInterview = computed(
  () =>
    strategyGenerated.value &&
    !isGeneratingStrategy.value &&
    !isStrategyLocked.value,
);
const canStartSampling = computed(
  () =>
    samplingState.value.phase !== 'active' &&
    !isEndingSampling.value &&
    !isRequestingGuidance.value &&
    !isArchived.value,
);
const hasReachedInteractionLimit = computed(
  () =>
    Boolean(currentRound.value?.completed) &&
    (currentRound.value?.roundNumber ?? 0) >= maxInteractionRounds.value,
);
const canAdvanceRound = computed(
  () =>
    Boolean(currentRound.value?.completed) &&
    currentRound.value?.uploadState === 'uploaded' &&
    samplingState.value.phase !== 'active' &&
    !isArchived.value &&
    !isEndingSampling.value &&
    !isRequestingGuidance.value,
);
const canEnterJudgement = computed(
  () =>
    (protectedSession.value?.completedRounds ?? 0) > 0 &&
    (rounds.value.length > 1 || hasReachedInteractionLimit.value) &&
    Boolean(currentRound.value?.completed) &&
    currentRound.value?.uploadState === 'uploaded' &&
    samplingState.value.phase !== 'active' &&
    !isEndingSampling.value &&
    !isRequestingGuidance.value,
);
const canArchive = computed(
  () =>
    Boolean(selectedJudgement.value) &&
    judgementReason.value.trim().length >= 20 &&
    !isArchiving.value &&
    !isArchived.value,
);

const stageCardKey = computed(() =>
  isArchived.value ? 'judgement-archived' : currentStage.value,
);

const activeStageLoading = computed(() =>
  stageLoadingMode.value ? stageLoadingContent[stageLoadingMode.value] : null,
);

const activeStageLoadingPhrase = computed(() => {
  const loading = activeStageLoading.value;
  if (!loading) {
    return '';
  }

  return loading.phrases[
    stageLoadingPhraseIndex.value % loading.phrases.length
  ];
});

const samplingPhaseLabel = computed(() => {
  switch (samplingState.value.phase) {
    case 'active':
      return '采样进行中';
    case 'ended':
      return '采样已结束';
    case 'error':
      return '采样失败';
    default:
      return '等待开始';
  }
});

const selectedJudgementLabel = computed(() =>
  selectedJudgement.value ? judgementLabel(selectedJudgement.value) : '待判定',
);
const protectedStrategyAsset = computed(
  () => protectedSession.value?.strategyAsset ?? null,
);
const protectedMemoryAsset = computed(
  () => protectedSession.value?.memoryAsset ?? null,
);
const protectedJudgementAsset = computed(
  () => protectedSession.value?.judgementAsset ?? null,
);
const completedRoundCount = computed(
  () => protectedSession.value?.completedRounds ?? completedRounds.value.length,
);

const realtimeModelStatuses = computed(() =>
  Object.values(realtimeDetection.value.models),
);
const realtimeEnabledModelLabel = computed(() => {
  const enabledModels = realtimeModelStatuses.value
    .filter((status) => status.active)
    .map((status) => status.label.replace(' Landmarker', ''));

  return enabledModels.length ? enabledModels.join(' / ') : '未启用';
});
const faceCueItems = computed(() => [
  {
    key: 'brow',
    label: '眉部紧张',
    value: realtimeDetection.value.faceCues.browTension,
    helper: '额眉区域短时收紧或上提',
  },
  {
    key: 'eye',
    label: '眼周收缩',
    value: realtimeDetection.value.faceCues.eyeTension,
    helper: '眯眼或眼周肌肉收缩候选',
  },
  {
    key: 'mouth',
    label: '唇部压紧',
    value: realtimeDetection.value.faceCues.mouthPressure,
    helper: '抿嘴、卷唇或口周压紧候选',
  },
  {
    key: 'jaw',
    label: '下颌动作',
    value: realtimeDetection.value.faceCues.jawActivation,
    helper: '张口、偏移或下颌发力候选',
  },
]);

const keyEvidenceTags = computed(() => {
  const tags = completedRounds.value.map((round) => round.title);
  return [...passengerProfile.value.tags, ...tags].slice(0, 4);
});

const memoryStatusLabel = computed(() => {
  switch (memoryLoadState.value) {
    case 'loading':
      return '记忆读取中';
    case 'ready':
      return '记忆已同步';
    case 'error':
      return '记忆同步异常';
    default:
      return '等待同步';
  }
});

const speechRecognitionLabel = computed(() => {
  switch (speechRecognitionPhase.value) {
    case 'connecting':
      return '讯飞 ASR 连接中';
    case 'listening':
      return '讯飞实时转写中';
    case 'stopping':
      return '正在停止转写';
    case 'ended':
      return '转写已结束';
    case 'unsupported':
      return '浏览器不支持音频流转写';
    case 'error':
      return '实时转写异常';
    default:
      return '等待转写';
  }
});

function createIdleMeterBars() {
  return [0.22, 0.28, 0.18, 0.24, 0.3, 0.2, 0.26, 0.18, 0.22, 0.3, 0.24, 0.2];
}

function createIdleSamplingState(): SamplingState {
  return {
    phase: 'idle',
    errorMessage: '',
    elapsedSeconds: 0,
    audioLevel: 0,
    meterBars: createIdleMeterBars(),
    permissionGranted: false,
  };
}

function formatDuration(seconds: number) {
  const safeSeconds = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function formatTranscriptTime(seconds: number) {
  return `00:${String(Math.max(0, Math.round(seconds))).padStart(2, '0')}`;
}

function riskToneClass(level: RiskLevel) {
  return level === 'high' ? 'risk-chip--high' : 'risk-chip--medium';
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || Array.isArray(value) || typeof value !== 'object') {
    return {};
  }
  return value as Record<string, unknown>;
}

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean);
}

function asOptionalNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Number.parseInt(value.trim(), 10);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function firstNonEmpty(...values: Array<string | undefined | null>) {
  return values.map((value) => value?.trim() ?? '').find(Boolean) ?? '';
}

function normalizeRouteQueryValue(value: unknown) {
  if (Array.isArray(value)) {
    return asString(value[0]);
  }
  return asString(value);
}

function formatDocumentTypeLabel(value: string) {
  const normalized = value.trim().toUpperCase();
  switch (normalized) {
    case 'PASSPORT':
      return '护照';
    case 'ID_CARD':
      return '身份证';
    case 'HKMTP':
      return '港澳通行证';
    default:
      return value || '未填写';
  }
}

function formatGenderLabel(value: string) {
  switch (value.trim().toLowerCase()) {
    case 'male':
    case 'm':
    case '1':
      return '男';
    case 'female':
    case 'f':
    case '2':
      return '女';
    case 'unknown':
    case '0':
      return '未知';
    default:
      return value || '未填写';
  }
}

function buildPassengerProfileView(
  profile: ProtectedListItem | null,
): PassengerProfileViewModel {
  if (!profile) {
    return {
      name: '',
      alias: '',
      documentId: '',
      pnr: '',
      route: '',
      seat: '',
      eta: '',
      riskLevel: 'medium',
      riskLabel: '画像未载入',
      summary: '',
      observation: '',
      tags: [],
    };
  }
  const nameField = findProtectedField(profile.fields, 'fullName');
  const documentField = findProtectedChip(profile.chips, 'documentNum');
  const tags = [
    ...(profile.meta ?? []).map((item) => item.key || 'tag'),
    ...(profile.notes ?? []).map((item) => item.key || 'note'),
  ].slice(0, 4);

  return {
    name: nameField?.key || '旅客画像',
    alias: nameField?.key || '旅客画像',
    documentId: documentField?.key || '',
    pnr: '已受保护',
    route: '已受保护',
    seat: '已受保护',
    eta: '已受保护',
    riskLevel: profile.flags?.isHighRisk ? 'high' : 'medium',
    riskLabel: profile.flags?.isHighRisk ? '高风险预警' : '画像已载入',
    summary: profile.flags?.isHighRisk
      ? '命中高风险名单，需要优先核验证件、行程与同行关系。'
      : '基础画像已载入，等待生成首轮策略。',
    observation: '敏感画像内容已通过受保护资产展示。',
    tags: tags.length ? tags : ['待策略生成'],
  };
}

const passengerProfile = computed(() =>
  buildPassengerProfileView(protectedProfile.value),
);
const hasSelectedProfile = computed(
  () => profileLoadState.value === 'ready' && Boolean(protectedProfile.value),
);
const isProfileLoading = computed(() => profileLoadState.value === 'loading');
const isStrategyLocked = computed(() => !hasSelectedProfile.value);
const profileLockMessage = computed(() => {
  if (isProfileLoading.value) {
    return '正在读取旅客画像，请稍候。';
  }
  return profileLoadError.value || '请先在数据检索中选择旅客后发起辅助问询。';
});
const profileHeaderStatusLabel = computed(() =>
  hasSelectedProfile.value ? '画像已载入' : '画像未载入',
);
const selectedProfileId = computed(() =>
  normalizeRouteQueryValue(route.query.profileId).trim(),
);
const selectedPassengerId = computed(
  () => selectedProfileId.value,
);
const selectedRiskCategory = computed(() =>
  normalizeRiskCategoryCode(route.query.riskCategory),
);
const selectedRiskCategorySource = computed(() =>
  normalizeRiskCategorySource(route.query.riskCategorySource),
);

function resetProfileDependentState() {
  currentStage.value = 'strategy';
  protectedProfile.value = null;
  strategyGenerationCount.value = 0;
  strategyRequestError.value = '';
  roundServiceError.value = '';
  memoryLoadState.value = 'idle';
  memoryErrorMessage.value = '';
  memoryLastSyncedAt.value = '';
  rounds.value = [];
  currentRoundId.value = null;
  judgementReason.value = '';
  selectedJudgement.value = null;
}

async function loadSelectedProfile(profileId: string) {
  resetProfileDependentState();
  const trimmedProfileId = profileId.trim();
  if (!trimmedProfileId) {
    profileLoadState.value = 'locked';
    profileLoadError.value = '请先在数据检索中选择旅客后发起辅助问询。';
    return;
  }

  profileLoadState.value = 'loading';
  profileLoadError.value = '';
  protectedProfile.value = null;

  try {
    protectedProfile.value = await getProtectedProfileById(trimmedProfileId);

    if (!protectedProfile.value) {
      profileLoadState.value = 'locked';
      profileLoadError.value =
        '未查询到对应的基础画像，请返回数据检索页后重新发起辅助问询。';
      return;
    }

    profileLoadState.value = 'ready';
    profileLoadError.value = '';
  } catch (error) {
    profileLoadState.value = 'error';
    profileLoadError.value = normalizeErrorMessage(
      error,
      '旅客画像读取失败，请返回数据检索后重试。',
    );
  }
}

function returnToDataSearch() {
  void router.push({ name: 'home-data' });
}

function buildRiskCaseContext(): RiskCaseContextPayload {
  const category = selectedRiskCategory.value;
  const source = selectedRiskCategorySource.value;
  const context: RiskCaseContextPayload = {
    source,
    category,
    label: riskCategoryLabels[category],
  };

  if (source === 'watchlist') {
    context.reason = '高风险名单风险类别命中';
  } else if (source === 'officer') {
    context.officerNote = '工作人员在发起辅助问询前选择风险方向';
  }

  return context;
}

function normalizeRiskCategoryCode(value: unknown): RiskCategoryCode {
  switch (normalizeRouteQueryValue(value).trim()) {
    case 'cross_border_gambling':
      return 'cross_border_gambling';
    case 'cross_border_fraud':
      return 'cross_border_fraud';
    case 'illegal_work':
      return 'illegal_work';
    case 'suspicious_purpose':
      return 'suspicious_purpose';
    default:
      return 'suspicious_purpose';
  }
}

function normalizeRiskCategorySource(value: unknown): RiskCategorySource {
  switch (normalizeRouteQueryValue(value).trim()) {
    case 'watchlist':
      return 'watchlist';
    case 'officer':
      return 'officer';
    default:
      return 'none';
  }
}

function stageStatus(stage: WorkflowStage) {
  if (isArchived.value && stage === 'judgement') {
    return 'completed';
  }

  const currentIndex = workflowStages.findIndex(
    (item) => item.id === currentStage.value,
  );
  const stageIndex = workflowStages.findIndex((item) => item.id === stage);

  if (stageIndex < currentIndex) {
    return 'completed';
  }

  if (stageIndex === currentIndex) {
    return 'active';
  }

  return 'locked';
}

function stageStatusLabel(stage: WorkflowStage) {
  if (isArchived.value && stage === 'judgement') {
    return '已归档';
  }

  const status = stageStatus(stage);
  if (status === 'completed') {
    return '已完成';
  }

  if (status === 'active') {
    return '进行中';
  }

  return '待进入';
}

function judgmentToneClass(value: FinalJudgement) {
  if (value === 'concealment') {
    return 'judgement-pill--alert';
  }

  if (value === 'falseStatement') {
    return 'judgement-pill--warn';
  }

  return 'judgement-pill--safe';
}

function judgementLabel(value: FinalJudgement) {
  if (value === 'concealment') {
    return '隐瞒';
  }

  if (value === 'falseStatement') {
    return '虚假陈述';
  }

  return '无异常';
}

function createQuestionId(prefix: string, index: number) {
  return `${prefix}-question-${index + 1}`;
}

function createSessionId() {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, '')
    .slice(0, 14);
  const random = Math.random().toString(36).slice(2, 8);
  return `inq-${timestamp}-${random}`;
}

function createWindowId(round: InterviewRound) {
  return `${sessionId.value}-${round.id}-${Date.now().toString(36)}`;
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength)}…`;
}

function normalizeErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === 'string' && error) {
    return error;
  }

  return fallback;
}

function formatCurrentChinaTime() {
  const formatted = formatChinaDateTime(new Date().toISOString());
  return formatted.slice(-8);
}

function syncMemoryStatus(hasAsset: boolean) {
  memoryLoadState.value = hasAsset ? 'ready' : 'idle';
  if (hasAsset) {
    memoryLastSyncedAt.value = formatCurrentChinaTime();
  }
}

function mapProtectedRoundStatus(
  status: string,
  existing?: InterviewRound | null,
): RoundUploadState {
  if (status === 'uploaded') {
    return 'uploaded';
  }
  if (existing?.uploadState === 'error') {
    return 'error';
  }
  if (existing?.uploadState === 'uploading') {
    return 'uploading';
  }
  return 'idle';
}

function createProtectedInterviewRound(
  snapshot: ProtectedInquiryRoundSnapshot,
  existing?: InterviewRound | null,
): InterviewRound {
  return {
    id: snapshot.id,
    roundNumber: snapshot.roundNumber,
    title: snapshot.title,
    questionCount: snapshot.questionCount,
    promptBlock: snapshot.promptBlock ?? existing?.promptBlock ?? null,
    summaryBlock: snapshot.summaryBlock ?? existing?.summaryBlock ?? null,
    promptAsset: snapshot.promptAsset ?? existing?.promptAsset ?? null,
    summaryAsset: snapshot.summaryAsset ?? existing?.summaryAsset ?? null,
    focus: existing?.focus || snapshot.title,
    strategyNote:
      existing?.strategyNote || '服务端返回的问题与提示已转为带水印图片展示',
    signal: existing?.signal || '受保护问询轮次',
    questions: existing?.questions ?? [],
    transcripts: existing?.transcripts ?? [],
    completed: snapshot.status === 'uploaded' || existing?.completed || false,
    durationSeconds: existing?.durationSeconds ?? 0,
    summary: existing?.summary ?? '',
    uploadState: mapProtectedRoundStatus(snapshot.status, existing),
    uploadErrorMessage: existing?.uploadErrorMessage ?? '',
    humanOmniWindow:
      snapshot.humanOmniWindow ?? existing?.humanOmniWindow ?? null,
    actionObservations: existing?.actionObservations ?? [],
    recordedFileName:
      snapshot.recordedFileName ?? existing?.recordedFileName ?? '',
    uploadedFile: snapshot.uploadedFile ?? existing?.uploadedFile ?? null,
    asrText: existing?.asrText ?? '',
  };
}

function syncProtectedSessionState(snapshot: ProtectedInquirySessionSnapshot) {
  protectedSession.value = snapshot;
  protectedProfile.value = snapshot.profile ?? protectedProfile.value;
  sessionId.value = snapshot.sessionId;
  syncMemoryStatus(Boolean(snapshot.memoryAsset));

  const nextSnapshots = [
    ...snapshot.historicalRounds,
    ...(snapshot.currentRound ? [snapshot.currentRound] : []),
  ].sort((left, right) => left.roundNumber - right.roundNumber);
  const existingById = new Map(rounds.value.map((round) => [round.id, round]));

  rounds.value = nextSnapshots.map((item) =>
    createProtectedInterviewRound(item, existingById.get(item.id)),
  );
  currentRoundId.value = snapshot.currentRound?.id ?? null;
}

function findProtectedField(
  fields: ProtectedFieldRef[] | undefined,
  key: string,
) {
  return fields?.find((item) => item.key === key) ?? null;
}

function findProtectedChip(
  fields: ProtectedFieldRef[] | undefined,
  key: string,
) {
  return findProtectedField(fields, key);
}

function protectedFactEntries(block?: ProtectedInquiryBlock | null) {
  return (block?.facts ?? []) as ProtectedFactRef[];
}

function protectedMetaEntries(block?: ProtectedInquiryBlock | null) {
  return (block?.meta ?? []) as ProtectedFieldRef[];
}

function protectedNoteEntries(block?: ProtectedInquiryBlock | null) {
  return (block?.notes ?? []) as ProtectedFieldRef[];
}

function findProtectedRoundSnapshot(
  snapshot: ProtectedInquirySessionSnapshot,
  roundId: string,
) {
  return [
    ...snapshot.historicalRounds,
    ...(snapshot.currentRound ? [snapshot.currentRound] : []),
  ].find((round) => round.id === roundId);
}

async function refreshMemoryContext() {
  if (!selectedPassengerId.value) {
    memoryLoadState.value = 'idle';
    return null;
  }

  memoryLoadState.value = 'loading';
  memoryErrorMessage.value = '';

  try {
    if (!sessionId.value || !protectedSession.value) {
      memoryLoadState.value = 'idle';
      return null;
    }

    const { asset } = await refreshProtectedInquiryMemory(sessionId.value);
    protectedSession.value = {
      ...protectedSession.value,
      memoryAsset: asset,
    };
    syncMemoryStatus(true);
    memoryLoadState.value = 'ready';
    memoryLastSyncedAt.value = formatCurrentChinaTime();
    return null;
  } catch (error) {
    memoryLoadState.value = 'error';
    memoryErrorMessage.value = normalizeErrorMessage(
      error,
      '智能体记忆读取失败，本次问询将继续执行。',
    );
    return null;
  }
}

function buildOutputConstraints(questionCount: number) {
  return {
    questionCount,
    tone: '中性、专业、非指控',
    language: 'zh-CN',
  };
}

function createStrategyQuestion(
  prompt: string,
  objective: string,
  index: number,
  prefix: string,
  title?: string,
) {
  return {
    id: createQuestionId(prefix, index),
    title: title || `问题 ${String(index + 1).padStart(2, '0')}`,
    prompt,
    objective,
  } satisfies StrategyQuestion;
}

function createStrategyQuestionFromApi(
  question: {
    questionId: string;
    question: string;
    purpose: string;
  },
  index: number,
) {
  return {
    id: question.questionId || createQuestionId('strategy-api', index),
    title: `问题 ${String(index + 1).padStart(2, '0')}`,
    prompt: question.question,
    objective: question.purpose || '核验叙述与证据的一致性。',
  } satisfies StrategyQuestion;
}

function buildOpeningRound() {
  return {
    id: 'round-1',
    roundNumber: 1,
    title: '第 1 轮 · 首轮策略执行',
    questionCount: 0,
    promptBlock: null,
    summaryBlock: null,
    promptAsset: null,
    summaryAsset: null,
    focus: '首轮关注：出境目的与行程一致性',
    strategyNote: '系统已基于旅客画像启动首轮事实核验。',
    signal: '对象需先对出境目的、行程安排和资金来源给出稳定说明。',
    questions: [],
    transcripts: [],
    completed: false,
    durationSeconds: 0,
    summary: '',
    uploadState: 'idle',
    uploadErrorMessage: '',
    humanOmniWindow: null,
    actionObservations: [],
    recordedFileName: '',
    uploadedFile: null,
    asrText: '',
  } satisfies InterviewRound;
}

function getRoundCue(round?: InterviewRound | null) {
  if (!round) {
    return passengerProfile.value.tags[1] || passengerProfile.value.alias;
  }

  const lastSubjectEntry = [...round.transcripts]
    .reverse()
    .find((entry) => entry.role === 'subject');

  if (lastSubjectEntry?.text) {
    const compactText = lastSubjectEntry.text
      .replace(/[，。、“”]/g, ' ')
      .trim();
    return compactText.slice(0, 16) || round.focus;
  }

  return round.questions[0]?.title || round.focus;
}

function buildFollowUpRoundFromResponse(
  response: FollowupGuidanceResponse,
  roundNumber: number,
) {
  const questions = response.followupGuidance.map((item, index) =>
    createStrategyQuestion(
      item.question,
      item.reason || item.operatorTip || '继续核验前后轮次叙述是否一致。',
      index,
      `round-${roundNumber}`,
      item.focusArea
        ? `${item.focusArea} · Q${index + 1}`
        : `追问 ${index + 1}`,
    ),
  );
  const focus =
    response.followupGuidance
      .map((item) => item.focusArea)
      .filter(Boolean)
      .join(' / ') || `第 ${roundNumber} 轮追问`;

  return {
    id: `round-${roundNumber}`,
    roundNumber,
    title: `第 ${roundNumber} 轮 · AI 追问引导`,
    questionCount: questions.length,
    promptBlock: null,
    summaryBlock: null,
    promptAsset: null,
    summaryAsset: null,
    focus,
    strategyNote:
      response.operatorNote ||
      response.multimodalAssessment.summary ||
      'AI-Service 已生成新一轮追问引导。',
    signal:
      response.multimodalAssessment.riskHints[0] ||
      response.warnings[0] ||
      '继续采样以获取更多线索。',
    questions,
    transcripts: [],
    completed: false,
    durationSeconds: 0,
    summary: '',
    uploadState: 'idle',
    uploadErrorMessage: '',
    humanOmniWindow: null,
    actionObservations: [],
    recordedFileName: '',
    uploadedFile: null,
    asrText: '',
  } satisfies InterviewRound;
}

async function loadInquirySettingsForSession() {
  if (hasLoadedInquirySettings.value) {
    return;
  }

  try {
    const settings = await getInquirySettings();
    if (
      Number.isFinite(settings.maxRounds) &&
      settings.maxRounds >= settings.minRounds &&
      settings.maxRounds <= settings.maxAllowedRounds
    ) {
      maxInteractionRounds.value = settings.maxRounds;
    }
    inquirySettingsMessage.value = '';
  } catch (error) {
    maxInteractionRounds.value = 3;
    inquirySettingsMessage.value =
      '未能读取管理员轮次设置，已按默认 3 轮执行。';
  } finally {
    hasLoadedInquirySettings.value = true;
  }
}

async function enterInterviewStage() {
  if (!canEnterInterview.value || isStrategyLocked.value) {
    return;
  }

  await loadInquirySettingsForSession();
  currentStage.value = 'interview';
  roundServiceError.value = '';
}

function updateCurrentRoundSummary(round: InterviewRound) {
  const subjectStatements = round.transcripts.filter(
    (entry) => entry.role === 'subject',
  );
  const lastSubjectText = subjectStatements[subjectStatements.length - 1]?.text;
  const stableCue = lastSubjectText
    ? `对象最新补充为“${truncateText(lastSubjectText, 24)}”`
    : '对象已完成本轮说明';
  const focusText = round.focus.replace('围绕', '').replace('首轮关注：', '');
  const humanOmniSummary = round.humanOmniWindow?.rawSummary
    ? `HumanOmni 摘要提示“${truncateText(round.humanOmniWindow.rawSummary, 34)}”`
    : '';

  round.summary = [stableCue, `本轮重点为 ${focusText}`, humanOmniSummary]
    .filter(Boolean)
    .join('，');
}

function collectSubjectTranscript(round: InterviewRound) {
  const realtimeAsrText = round.asrText.trim();
  if (realtimeAsrText) {
    return realtimeAsrText;
  }

  return round.transcripts
    .filter((entry) => entry.role === 'subject')
    .map((entry) => entry.text)
    .join(' ')
    .trim();
}

function buildRoundAsrPayload(round: InterviewRound): AsrPayload {
  const text = collectSubjectTranscript(round);
  if (!text) {
    const status =
      speechRecognitionPhase.value === 'error' || speechRecognitionHadError
        ? 'error'
        : 'not_connected';
    return {
      status,
      provider: 'iflytek-rtasr-llm',
      model: 'rtasr-llm',
      language: 'zh-CN',
      text: '',
      segments: [],
      words: [],
    };
  }

  return {
    status: 'provided',
    provider: 'iflytek-rtasr-llm',
    model: 'rtasr-llm',
    language: 'zh-CN',
    text,
    segments: [
      {
        startSeconds: 0,
        endSeconds: Math.max(1, round.durationSeconds),
        text,
      },
    ],
    words: [],
  };
}

function deriveObservationConfidence(event: RealtimeEvent) {
  if (event.tone === 'alert') {
    return 0.82;
  }

  if (event.tone === 'warn') {
    return 0.68;
  }

  return 0.55;
}

function buildActionObservations(
  round: InterviewRound,
  events: RealtimeEvent[],
) {
  const chronologicalEvents = [...events].reverse();

  return chronologicalEvents.map((event, index) => {
    const startSeconds = Number(
      Math.max(0, (event.timestamp - samplingStartedAt) / 1000).toFixed(1),
    );
    const endSeconds = Number(
      Math.min(Math.max(1, round.durationSeconds), startSeconds + 1.4).toFixed(
        1,
      ),
    );

    return {
      observationId: `${round.id}-obs-${index + 1}`,
      type: event.type,
      label: event.title,
      description: event.detail,
      startSeconds,
      endSeconds,
      timeRange: `${formatDuration(startSeconds)} - ${formatDuration(endSeconds)}`,
      confidence: deriveObservationConfidence(event),
      source: 'frontend-mediapipe',
      evidence: {
        displayTime: event.displayTime,
        tone: event.tone,
      },
    } satisfies ActionObservationPayload;
  });
}

function buildHumanOmniWindows() {
  return rounds.value.flatMap((round) =>
    round.humanOmniWindow ? [round.humanOmniWindow] : [],
  );
}

function buildActionObservationHistory() {
  return rounds.value.flatMap((round) => round.actionObservations);
}

function buildSummarizeWindowFormData(
  round: InterviewRound,
  file: File,
  windowId: string,
) {
  const formData = new FormData();
  formData.append('file', file, file.name);
  formData.append('sessionId', sessionId.value);
  formData.append('questionId', round.questions[0]?.id || round.id);
  formData.append('windowId', windowId);
  formData.append('modal', 'video_audio');
  formData.append('startSeconds', '0');
  formData.append('endSeconds', String(Math.max(1, round.durationSeconds)));
  formData.append(
    'durationSeconds',
    String(Math.max(1, round.durationSeconds)),
  );
  formData.append('answerText', collectSubjectTranscript(round));
  formData.append(
    'actionObservations',
    JSON.stringify(round.actionObservations),
  );
  formData.append('asr', JSON.stringify(buildRoundAsrPayload(round)));
  return formData;
}

function buildArchiveVideoUploadFormData(
  round: InterviewRound,
  file: File,
  windowId: string,
) {
  const formData = new FormData();
  formData.append('file', file, file.name);
  formData.append('sessionId', sessionId.value);
  formData.append('roundNo', String(round.roundNumber));
  formData.append('roundClientId', round.id);
  formData.append('questionId', round.questions[0]?.id || round.id);
  formData.append('windowId', windowId);
  formData.append('videoKind', 'round_clip');
  formData.append('modal', 'video_audio');
  formData.append('startSeconds', '0');
  formData.append('endSeconds', String(Math.max(1, round.durationSeconds)));
  formData.append(
    'durationSeconds',
    String(Math.max(1, round.durationSeconds)),
  );
  formData.append('recordedFileName', file.name);
  formData.append('answerText', collectSubjectTranscript(round));
  formData.append(
    'actionObservations',
    JSON.stringify(round.actionObservations),
  );
  formData.append('asr', JSON.stringify(buildRoundAsrPayload(round)));
  return formData;
}

function clearStageLoadingTimer() {
  if (stageLoadingTimerId !== null) {
    window.clearInterval(stageLoadingTimerId);
    stageLoadingTimerId = null;
  }
}

function startVideoWatermarkTimer() {
  if (videoWatermarkTimerId !== null || typeof window === 'undefined') {
    return;
  }

  videoWatermarkTimerId = window.setInterval(() => {
    videoWatermarkTimestamp.value = Date.now();
  }, WATERMARK_REFRESH_INTERVAL_MS);
}

function stopVideoWatermarkTimer() {
  if (videoWatermarkTimerId === null || typeof window === 'undefined') {
    return;
  }

  window.clearInterval(videoWatermarkTimerId);
  videoWatermarkTimerId = null;
}

function openStageLoading(mode: StageLoadingMode) {
  stageLoadingMode.value = mode;
  stageLoadingPhraseIndex.value = 0;
  clearStageLoadingTimer();
  stageLoadingTimerId = window.setInterval(() => {
    stageLoadingPhraseIndex.value += 1;
  }, 1400);
}

function closeStageLoading(mode?: StageLoadingMode) {
  if (mode && stageLoadingMode.value !== mode) {
    return;
  }

  stageLoadingMode.value = null;
  stageLoadingPhraseIndex.value = 0;
  clearStageLoadingTimer();
}

function syncRoundPanelMaxHeight() {
  const capturePanel = capturePanelElement.value;
  if (!capturePanel || window.innerWidth < 960) {
    roundPanelMaxHeight.value = '';
    return;
  }

  const height = Math.round(capturePanel.getBoundingClientRect().height);
  roundPanelMaxHeight.value = height > 0 ? `${height}px` : '';
}

function setupInterviewPanelSizing() {
  if (typeof ResizeObserver === 'undefined') {
    window.addEventListener('resize', syncRoundPanelMaxHeight);
    void nextTick(syncRoundPanelMaxHeight);
    return;
  }

  interviewPanelResizeObserver?.disconnect();
  interviewPanelResizeObserver = new ResizeObserver(() => {
    syncRoundPanelMaxHeight();
  });
  if (capturePanelElement.value) {
    interviewPanelResizeObserver.observe(capturePanelElement.value);
  }
  void nextTick(syncRoundPanelMaxHeight);
}

function stopElapsedTimer() {
  if (elapsedIntervalId !== null) {
    window.clearInterval(elapsedIntervalId);
    elapsedIntervalId = null;
  }
}

function stopMeterLoop() {
  if (meterFrameId !== null) {
    window.cancelAnimationFrame(meterFrameId);
    meterFrameId = null;
  }
}

function isMp4H264MimeType(mimeType: string) {
  const normalized = mimeType.toLowerCase();
  if (!normalized.startsWith('video/mp4')) {
    return false;
  }

  return (
    !normalized.includes('codecs=') ||
    normalized.includes('avc1') ||
    normalized.includes('h264')
  );
}

function resolveRecordingMimeType() {
  if (
    typeof MediaRecorder === 'undefined' ||
    typeof MediaRecorder.isTypeSupported !== 'function'
  ) {
    return '';
  }

  return (
    MP4_H264_MIME_TYPES.find((mimeType) =>
      MediaRecorder.isTypeSupported(mimeType),
    ) || ''
  );
}

function createRecordedClipFile(round: InterviewRound) {
  if (!recordedChunks.length) {
    return null;
  }

  const mimeType = recordingMimeType || recordedChunks[0]?.type || '';
  if (!isMp4H264MimeType(mimeType)) {
    throw new Error('当前浏览器未生成 MP4/H.264 片段，无法上传到 AI-Service。');
  }

  const extension = 'mp4';
  const blob = new Blob(recordedChunks, {
    type: mimeType,
  });
  const fileName = `${sessionId.value}-${round.id}.${extension}`;
  round.recordedFileName = fileName;

  return new File([blob], fileName, {
    type: mimeType,
  });
}

function resetRecorderState() {
  if (mediaRecorder) {
    mediaRecorder.ondataavailable = null;
    mediaRecorder.onstop = null;
    mediaRecorder.onerror = null;
    mediaRecorder = null;
  }

  recordedChunks = [];
  recordingMimeType = '';
}

function forceStopMediaRecorder() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    try {
      mediaRecorder.stop();
    } catch {
      // no-op
    }
  }

  resetRecorderState();
}

function releaseMediaStream() {
  stopAsrAudioProcessing();

  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop());
    mediaStream = null;
  }

  if (videoElement.value) {
    videoElement.value.srcObject = null;
  }

  if (audioSourceNode) {
    audioSourceNode.disconnect();
    audioSourceNode = null;
  }

  if (analyserNode) {
    analyserNode.disconnect();
    analyserNode = null;
  }

  if (audioContext) {
    audioContext.close().catch(() => undefined);
    audioContext = null;
  }
}

function stopSamplingRuntime() {
  stopSpeechRecognition();
  stopElapsedTimer();
  stopMeterLoop();
  realtimeDetectionController?.stop();
  releaseMediaStream();
}

function stopSamplingResources() {
  stopSamplingRuntime();
  forceStopMediaRecorder();
}

function resetSamplingIndicators() {
  samplingState.value = createIdleSamplingState();
}

function resetRealtimeDetectionViewState() {
  realtimeDetection.value = createIdleRealtimeDetectionState();
}

function resolveMediaError(error: unknown) {
  if (error instanceof DOMException) {
    if (error.name === 'NotAllowedError') {
      return '浏览器拒绝了摄像头或麦克风权限，请允许访问后重试。';
    }

    if (error.name === 'NotFoundError') {
      return '未检测到可用的摄像头或麦克风设备。';
    }

    return `设备调用失败：${error.message}`;
  }

  return normalizeErrorMessage(error, '设备调用失败，请稍后重试。');
}

function updateAudioMeter() {
  if (!analyserNode) {
    samplingState.value.meterBars = createIdleMeterBars();
    samplingState.value.audioLevel = 0;
    return;
  }

  const frequencyData = new Uint8Array(analyserNode.frequencyBinCount);
  analyserNode.getByteFrequencyData(frequencyData);

  const meterBars = createIdleMeterBars().map((value, index) => {
    const sampleIndex = Math.min(frequencyData.length - 1, index * 2);
    const nextValue = frequencyData[sampleIndex] / 255;
    return Math.max(0.16, Math.min(1, nextValue + value * 0.35));
  });

  const average =
    frequencyData.reduce((sum, item) => sum + item, 0) /
    frequencyData.length /
    255;

  samplingState.value.meterBars = meterBars;
  samplingState.value.audioLevel = average;
}

function ensureRealtimeDetectionController() {
  if (!realtimeDetectionController) {
    realtimeDetectionController = createRealtimeDetectionController({
      targetFps: 6,
      maxEntries: 12,
      onUpdate: (nextState) => {
        realtimeDetection.value = nextState;
      },
    });
  }

  return realtimeDetectionController;
}

async function startRealtimeDetection() {
  if (
    !videoElement.value ||
    !overlayCanvas.value ||
    samplingState.value.phase !== 'active'
  ) {
    return;
  }

  try {
    const controller = ensureRealtimeDetectionController();
    await controller.start(videoElement.value, overlayCanvas.value);
  } catch (error) {
    realtimeDetection.value = createIdleRealtimeDetectionState({
      phase: 'error',
      statusMessage: '视觉检测启动失败',
      windowSummary: normalizeErrorMessage(error, '实时视觉检测未能成功启动。'),
    });
  }
}

function startMeterLoop() {
  const tick = () => {
    updateAudioMeter();
    meterFrameId = window.requestAnimationFrame(tick);
  };

  tick();
}

function startElapsedTimer() {
  stopElapsedTimer();
  samplingState.value.elapsedSeconds = 0;
  elapsedIntervalId = window.setInterval(() => {
    samplingState.value.elapsedSeconds = Math.max(
      1,
      Math.floor((Date.now() - samplingStartedAt) / 1000),
    );
  }, 1000);
}

async function startMediaRecorder(stream: MediaStream) {
  if (typeof MediaRecorder === 'undefined') {
    throw new Error('当前浏览器不支持 MediaRecorder，无法生成上传片段。');
  }

  recordedChunks = [];
  recordingMimeType = resolveRecordingMimeType();
  if (!recordingMimeType) {
    throw new Error('当前浏览器不支持 MP4/H.264 录制，无法上传采样片段。');
  }

  mediaRecorder = new MediaRecorder(stream, {
    mimeType: recordingMimeType,
  });
  recordingMimeType = mediaRecorder.mimeType || recordingMimeType;
  if (!isMp4H264MimeType(recordingMimeType)) {
    resetRecorderState();
    throw new Error(
      '当前浏览器返回的录制编码不是 MP4/H.264，无法继续采样上传。',
    );
  }

  mediaRecorder.ondataavailable = (event) => {
    if (event.data?.size) {
      recordedChunks.push(event.data);
    }
  };
  mediaRecorder.start(500);
}

function stopMediaRecorder(round: InterviewRound): Promise<File | null> {
  const recorder = mediaRecorder;
  if (!recorder) {
    return Promise.resolve(createRecordedClipFile(round));
  }

  if (recorder.state === 'inactive') {
    const file = createRecordedClipFile(round);
    resetRecorderState();
    return Promise.resolve(file);
  }

  return new Promise((resolve, reject) => {
    const handleStop = () => {
      try {
        const file = createRecordedClipFile(round);
        resetRecorderState();
        resolve(file);
      } catch (error) {
        resetRecorderState();
        reject(error);
      }
    };
    const handleError = () => {
      resetRecorderState();
      reject(new Error('采样录制失败，请重试。'));
    };

    recorder.addEventListener('stop', handleStop, {
      once: true,
    });
    recorder.addEventListener('error', handleError, {
      once: true,
    });

    try {
      recorder.stop();
    } catch (error) {
      resetRecorderState();
      reject(error);
    }
  });
}

async function generateStrategy() {
  if (isGeneratingStrategy.value) {
    return;
  }
  if (isStrategyLocked.value || !selectedPassengerId.value) {
    strategyRequestError.value = profileLockMessage.value;
    return;
  }

  isGeneratingStrategy.value = true;
  strategyRequestError.value = '';
  openStageLoading('strategy');

  try {
    void recordAuditEvent({
      action: 'generate_strategy',
      resource: '辅助问询',
      result: 'success',
      path: '/home/ask',
      detail: {
        sessionId: sessionId.value,
        documentNum: selectedPassengerId.value,
      },
    });
    const response = await generateProtectedInquiryStrategy({
      sessionId: sessionId.value,
      passengerId: selectedPassengerId.value,
      riskCaseContext: buildRiskCaseContext(),
      constraints: buildOutputConstraints(6),
    });
    syncProtectedSessionState(response);
    strategyGenerationCount.value += 1;
  } catch (error) {
    strategyRequestError.value = normalizeErrorMessage(
      error,
      '首轮策略生成失败，请检查 AI-Service 后重试。',
    );
  } finally {
    isGeneratingStrategy.value = false;
    closeStageLoading('strategy');
  }
}

async function startSampling() {
  const round = currentRound.value;
  if (!round || !canStartSampling.value || isArchived.value) {
    return;
  }

  if (
    typeof navigator === 'undefined' ||
    !navigator.mediaDevices?.getUserMedia
  ) {
    samplingState.value = {
      ...createIdleSamplingState(),
      phase: 'error',
      errorMessage: '当前浏览器环境不支持媒体采样。',
    };
    return;
  }

  stopSamplingResources();
  resetSamplingIndicators();
  resetRealtimeDetectionViewState();
  roundServiceError.value = '';
  round.completed = false;
  round.durationSeconds = 0;
  round.summary = '';
  round.uploadState = 'idle';
  round.uploadErrorMessage = '';
  round.humanOmniWindow = null;
  round.actionObservations = [];
  round.recordedFileName = '';
  round.uploadedFile = null;
  round.asrText = '';
  round.transcripts = [];
  resetSpeechRecognitionState('等待语音输入。');

  try {
    void recordAuditEvent({
      action: 'start_sampling',
      resource: '辅助问询',
      result: 'success',
      path: '/home/ask',
      detail: {
        roundId: round.id,
        roundNumber: round.roundNumber,
      },
    });
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
      },
      audio: true,
    });

    mediaStream = stream;
    samplingStartedAt = Date.now();
    samplingState.value.phase = 'active';
    samplingState.value.permissionGranted = true;
    samplingState.value.errorMessage = '';

    await nextTick();

    if (videoElement.value) {
      videoElement.value.srcObject = stream;
      await videoElement.value.play().catch(() => undefined);
    }

    const AudioContextConstructor =
      window.AudioContext ||
      (window as WindowWithWebkitAudioContext).webkitAudioContext;

    if (AudioContextConstructor) {
      audioContext = new AudioContextConstructor();
      await audioContext.resume().catch(() => undefined);
      audioSourceNode = audioContext.createMediaStreamSource(stream);
      analyserNode = audioContext.createAnalyser();
      analyserNode.fftSize = 64;
      analyserNode.smoothingTimeConstant = 0.82;
      audioSourceNode.connect(analyserNode);
      startMeterLoop();
    }

    await startMediaRecorder(stream);
    startElapsedTimer();
    startSpeechRecognition(round);
    void startRealtimeDetection();
  } catch (error) {
    stopSamplingResources();
    resetRealtimeDetectionViewState();
    samplingState.value = {
      ...createIdleSamplingState(),
      phase: 'error',
      errorMessage: resolveMediaError(error),
    };
  }
}

async function endSampling() {
  const round = currentRound.value;
  if (
    !round ||
    samplingState.value.phase !== 'active' ||
    isEndingSampling.value
  ) {
    return;
  }

  isEndingSampling.value = true;
  roundServiceError.value = '';
  stopSpeechRecognition();
  openStageLoading('samplingUpload');

  const collectedDuration = Math.max(1, samplingState.value.elapsedSeconds);
  const capturedEvents = [...realtimeDetection.value.events];
  round.durationSeconds = collectedDuration;
  round.asrText = collectSubjectTranscript(round);
  round.actionObservations = buildActionObservations(round, capturedEvents);
  updateCurrentRoundSummary(round);

  let recordedFile: File | null = null;
  try {
    recordedFile = await stopMediaRecorder(round);
  } catch (error) {
    round.uploadState = 'error';
    round.uploadErrorMessage = normalizeErrorMessage(
      error,
      '采样录制失败，请重试。',
    );
  } finally {
    stopSamplingRuntime();
  }

  if (!recordedFile) {
    round.completed = false;
    round.uploadState = 'error';
    round.uploadErrorMessage =
      round.uploadErrorMessage ||
      '未生成可上传的音视频片段，请检查浏览器录制能力后重试。';
    roundServiceError.value = round.uploadErrorMessage;
    samplingState.value = {
      ...createIdleSamplingState(),
      phase: 'idle',
      permissionGranted: true,
    };
    isEndingSampling.value = false;
    closeStageLoading('samplingUpload');
    return;
  }

  round.completed = true;
  samplingState.value = {
    ...createIdleSamplingState(),
    phase: 'ended',
    permissionGranted: true,
  };
  round.uploadState = 'uploading';
  round.uploadErrorMessage = '';
  let summaryUploaded = false;

  try {
    const windowId = createWindowId(round);
    const response = await uploadProtectedInquiryRoundWindow(
      sessionId.value,
      round.id,
      buildSummarizeWindowFormData(round, recordedFile, windowId),
    );
    const uploadedRoundSnapshot = findProtectedRoundSnapshot(
      response,
      round.id,
    );
    const humanOmniWindow = uploadedRoundSnapshot?.humanOmniWindow ?? null;
    syncProtectedSessionState(response);
    const uploadedRound =
      rounds.value.find((item) => item.id === round.id) || round;
    if (humanOmniWindow) {
      uploadedRound.humanOmniWindow = {
        ...humanOmniWindow,
        windowId: humanOmniWindow.windowId || windowId,
      };
    }
    uploadedRound.completed = true;
    uploadedRound.uploadState = 'uploaded';
    uploadedRound.uploadErrorMessage = '';
    updateCurrentRoundSummary(uploadedRound);
    summaryUploaded = true;
    closeStageLoading('samplingUpload');
    const archiveVideo = await uploadInquiryArchiveVideo(
      buildArchiveVideoUploadFormData(
        round,
        recordedFile,
        humanOmniWindow?.windowId || windowId,
      ),
    );
    uploadedRound.recordedFileName = archiveVideo.uploadedFile.filename;
    uploadedRound.uploadedFile = archiveVideo.uploadedFile;
    uploadedRound.transcripts = [];
    uploadedRound.asrText = '';
    uploadedRound.actionObservations = [];
    uploadedRound.humanOmniWindow = null;
    void recordAuditEvent({
      action: 'end_sampling',
      resource: '辅助问询',
      result: 'success',
      path: '/home/ask',
      detail: {
        roundId: round.id,
        roundNumber: round.roundNumber,
        recordedFileName: recordedFile.name,
      },
    });
  } catch (error) {
    const fallbackMessage = summaryUploaded
      ? '采样摘要已生成，但问询视频归档上传失败，请检查后端和 MinIO 配置后重试。'
      : 'HumanOmni 窗口摘要上传失败，请检查 AI-Service 后重试。';
    const message = normalizeErrorMessage(error, fallbackMessage);
    round.uploadState = 'error';
    round.uploadErrorMessage = message;
    roundServiceError.value = round.uploadErrorMessage;
  } finally {
    isEndingSampling.value = false;
    closeStageLoading('samplingUpload');
  }
}

async function enterNextRound() {
  const round = currentRound.value;
  if (!canAdvanceRound.value || !round || isRequestingGuidance.value) {
    return;
  }

  if (hasReachedInteractionLimit.value) {
    roundLimitDialogVisible.value = true;
    ElMessage.warning(
      `最多只能进行 ${maxInteractionRounds.value} 轮问询，请进入人工辅助判断。`,
    );
    return;
  }

  isRequestingGuidance.value = true;
  roundServiceError.value = '';
  openStageLoading('nextRound');

  try {
    const nextRoundNumber = round.roundNumber + 1;
    const response = await requestProtectedInquiryFollowup(sessionId.value, {
      roundNumber: nextRoundNumber,
      riskCaseContext: buildRiskCaseContext(),
    });
    syncProtectedSessionState(response);
    round.transcripts = [];
    round.asrText = '';
    round.actionObservations = [];
    round.humanOmniWindow = null;
    resetSamplingIndicators();
    resetRealtimeDetectionViewState();
    void recordAuditEvent({
      action: 'enter_next_round',
      resource: '辅助问询',
      result: 'success',
      path: '/home/ask',
      detail: {
        currentRoundNumber: round.roundNumber,
        nextRoundNumber,
      },
    });
  } catch (error) {
    roundServiceError.value = normalizeErrorMessage(
      error,
      '下一轮追问生成失败，请检查 AI-Service 后重试。',
    );
  } finally {
    isRequestingGuidance.value = false;
    closeStageLoading('nextRound');
  }
}

async function enterJudgementStage() {
  const round = currentRound.value;
  if (
    currentStage.value === 'interview' &&
    (!canEnterJudgement.value || !round)
  ) {
    return;
  }

  if (currentStage.value !== 'interview' || !round) {
    currentStage.value = 'judgement';
    void recordAuditEvent({
      action: 'enter_judgement_stage',
      resource: '辅助问询',
      result: 'success',
      path: '/home/ask',
      detail: {
        mode: 'direct',
      },
    });
    return;
  }

  if (hasReachedInteractionLimit.value) {
    currentStage.value = 'judgement';
    void recordAuditEvent({
      action: 'enter_judgement_stage',
      resource: '辅助问询',
      result: 'success',
      path: '/home/ask',
      detail: {
        mode: 'round_limit',
        roundNumber: round.roundNumber,
        maxInteractionRounds: maxInteractionRounds.value,
      },
    });
    return;
  }

  isRequestingGuidance.value = true;
  roundServiceError.value = '';
  openStageLoading('judgementBriefing');

  try {
    const response = await requestProtectedInquiryJudgement(sessionId.value);
    syncProtectedSessionState(response);
    currentStage.value = 'judgement';
    void recordAuditEvent({
      action: 'enter_judgement_stage',
      resource: '辅助问询',
      result: 'success',
      path: '/home/ask',
      detail: {
        roundId: round.id,
        roundNumber: round.roundNumber,
      },
    });
  } catch (error) {
    roundServiceError.value = normalizeErrorMessage(
      error,
      '人工判断前摘要生成失败，请检查 AI-Service 后重试。',
    );
  } finally {
    isRequestingGuidance.value = false;
    closeStageLoading('judgementBriefing');
  }
}

async function archiveCase() {
  if (!canArchive.value) {
    return;
  }

  isArchiving.value = true;
  roundServiceError.value = '';

  try {
    const response = await createInquiryArchive(buildArchivePayload());
    archiveCode.value = response.archiveCode;
    archivedAt.value = formatArchiveTimestamp(response.archivedAt);
    isArchived.value = true;
    ElMessage.success('问询归档已保存。');
    void recordAuditEvent({
      action: 'archive_case',
      resource: '辅助问询',
      result: 'success',
      path: '/home/ask',
      detail: {
        archiveCode: response.archiveCode,
        archivedAt: response.archivedAt,
        sessionId: sessionId.value,
        finalJudgement: selectedJudgement.value,
      },
    });
  } catch (error) {
    roundServiceError.value = normalizeErrorMessage(
      error,
      '问询归档保存失败，请检查后端和 MinIO 配置。',
    );
    ElMessage.error(roundServiceError.value);
  } finally {
    isArchiving.value = false;
  }
}

function buildArchivePayload(): CreateInquiryArchivePayload {
  return {
    sessionId: sessionId.value,
    finalJudgement: selectedJudgement.value || '',
    judgementReason: judgementReason.value.trim(),
    rounds: completedRounds.value.map(buildArchiveRoundPayload),
  };
}

function buildArchiveRoundPayload(
  round: InterviewRound,
): CreateInquiryArchiveRoundPayload {
  return {
    roundNo: round.roundNumber,
    roundClientId: round.id,
    videos: buildArchiveVideos(round),
  };
}

function buildArchiveVideos(
  round: InterviewRound,
): CreateInquiryArchiveVideoPayload[] {
  const uploadedFile = round.uploadedFile;
  if (!uploadedFile) {
    return [];
  }

  return [
    {
      fileName: uploadedFile.filename,
      contentType: uploadedFile.contentType || 'video/mp4',
      sizeBytes: uploadedFile.sizeBytes,
    },
  ];
}

function formatArchiveTimestamp(value: string) {
  return formatChinaDateTime(value);
}

function strategyRiskToneClass(level: RiskAssessmentPayload['level']) {
  if (level === 'high') {
    return 'risk-chip--high';
  }

  if (level === 'medium') {
    return 'risk-chip--medium';
  }

  return 'risk-chip--safe';
}

function strategyRiskLabel(level: RiskAssessmentPayload['level']) {
  if (level === 'high') {
    return '高风险';
  }

  if (level === 'medium') {
    return '中风险';
  }

  if (level === 'low') {
    return '低风险';
  }

  return '待确认';
}

function roundUploadStateLabel(state: RoundUploadState) {
  if (state === 'uploading') {
    return '窗口上传中';
  }

  if (state === 'uploaded') {
    return '窗口摘要已回传';
  }

  if (state === 'error') {
    return '窗口摘要失败';
  }

  return '等待上传';
}

function roundUploadStateClass(state: RoundUploadState) {
  if (state === 'uploading') {
    return 'status-chip--loading';
  }

  if (state === 'uploaded') {
    return 'status-chip--ended';
  }

  if (state === 'error') {
    return 'status-chip--error';
  }

  return 'status-chip--idle';
}

function selectJudgement(value: FinalJudgement) {
  if (isArchived.value) {
    return;
  }

  selectedJudgement.value = value;
}

function formatRealtimeClock(timestamp: number | null) {
  if (!timestamp) {
    return '暂无';
  }

  return formatChinaTime(timestamp);
}

function formatCuePercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

function faceCueLevelClass(value: number) {
  if (value >= 0.42) {
    return 'face-cue-card--strong';
  }

  if (value >= 0.24) {
    return 'face-cue-card--active';
  }

  return 'face-cue-card--idle';
}

function resetSpeechRecognitionState(message = '等待开始采样。') {
  speechRecognitionPhase.value = 'idle';
  speechRecognitionMessage.value = message;
  speechRecognitionEntryId = '';
  speechFinalTranscript = '';
  speechInterimTranscript = '';
  isStoppingSpeechRecognition = false;
  speechRecognitionHadError = false;
  speechRecognitionFatalError = false;
  asrPcmByteQueue = [];
  asrStableSegments = new Map<number, string>();
  asrInterimSegments = new Map<number, string>();
}

function upsertSpeechTranscript(round: InterviewRound) {
  const transcript = mergeTranscriptParts([
    speechFinalTranscript,
    speechInterimTranscript,
  ]);

  round.asrText = transcript;
  if (!transcript) {
    return;
  }

  const existingEntry = speechRecognitionEntryId
    ? round.transcripts.find((entry) => entry.id === speechRecognitionEntryId)
    : null;

  if (existingEntry) {
    existingEntry.text = transcript;
    existingEntry.time = formatTranscriptTime(
      samplingState.value.elapsedSeconds,
    );
    return;
  }

  const entry = {
    id: `${round.id}-speech-transcript`,
    speaker: passengerProfile.value.alias,
    role: 'subject',
    time: formatTranscriptTime(samplingState.value.elapsedSeconds),
    text: transcript,
  } satisfies TranscriptEntry;

  round.transcripts.push(entry);
  speechRecognitionEntryId = entry.id;
}

function promoteSpeechInterimTranscript(round: InterviewRound) {
  const interimTranscript = speechInterimTranscript.trim();
  if (!interimTranscript) {
    return;
  }

  speechFinalTranscript = mergeTranscriptParts([
    speechFinalTranscript,
    interimTranscript,
  ]);
  speechInterimTranscript = '';
  upsertSpeechTranscript(round);
}

const MIN_TRANSCRIPT_OVERLAP = 4;
const TRANSCRIPT_COMPARISON_IGNORED_CHARS = /[\s\p{P}\p{S}]/u;
const TRANSCRIPT_TRAILING_SEPARATOR = /[\s\p{P}\p{S}]+$/u;
const TRANSCRIPT_LEADING_SEPARATOR = /^[\s\p{P}\p{S}]+/u;

interface TranscriptComparison {
  normalized: string;
  starts: number[];
  ends: number[];
}

function buildTranscriptComparison(value: string): TranscriptComparison {
  const starts: number[] = [];
  const ends: number[] = [];
  let normalized = '';
  let sourceIndex = 0;

  for (const character of value) {
    const nextSourceIndex = sourceIndex + character.length;
    if (!TRANSCRIPT_COMPARISON_IGNORED_CHARS.test(character)) {
      normalized += character.toLowerCase();
      starts.push(sourceIndex);
      ends.push(nextSourceIndex);
    }
    sourceIndex = nextSourceIndex;
  }

  return { normalized, starts, ends };
}

function sourceIndexAfterNormalizedPrefix(
  comparison: TranscriptComparison,
  length: number,
) {
  if (length <= 0) {
    return 0;
  }
  return comparison.ends[length - 1] ?? Number.MAX_SAFE_INTEGER;
}

function sourceIndexAtNormalizedPosition(
  comparison: TranscriptComparison,
  position: number,
) {
  return comparison.starts[position] ?? 0;
}

function findNormalizedSuffixPrefixOverlap(left: string, right: string) {
  const maxOverlap = Math.min(left.length, right.length);
  for (let length = maxOverlap; length >= MIN_TRANSCRIPT_OVERLAP; length -= 1) {
    if (left.endsWith(right.slice(0, length))) {
      return length;
    }
  }
  return 0;
}

function findNormalizedInternalOverlap(left: string, right: string) {
  const maxOverlap = Math.min(left.length, right.length);
  for (let length = maxOverlap; length >= MIN_TRANSCRIPT_OVERLAP; length -= 1) {
    const leftIndex = left.lastIndexOf(right.slice(0, length));
    if (leftIndex >= 0) {
      return leftIndex;
    }
  }
  return -1;
}

function appendTranscriptRemainder(left: string, remainder: string) {
  const nextRemainder = remainder.trimEnd();
  if (!nextRemainder.trim()) {
    return left.trim();
  }

  if (
    TRANSCRIPT_TRAILING_SEPARATOR.test(left) &&
    TRANSCRIPT_LEADING_SEPARATOR.test(nextRemainder)
  ) {
    return `${left.replace(TRANSCRIPT_TRAILING_SEPARATOR, '')}${nextRemainder}`.trim();
  }

  return `${left}${nextRemainder}`.trim();
}

function mergeTranscriptPart(merged: string, part: string) {
  const next = part.trim();
  if (!next) {
    return merged;
  }
  if (!merged) {
    return next;
  }
  if (next.includes(merged)) {
    return next;
  }
  if (merged.includes(next)) {
    return merged;
  }

  const mergedComparison = buildTranscriptComparison(merged);
  const nextComparison = buildTranscriptComparison(next);
  const mergedNormalized = mergedComparison.normalized;
  const nextNormalized = nextComparison.normalized;

  if (mergedNormalized && nextNormalized) {
    if (
      mergedNormalized.length >= MIN_TRANSCRIPT_OVERLAP &&
      nextNormalized.includes(mergedNormalized)
    ) {
      return next;
    }
    if (
      nextNormalized.length >= MIN_TRANSCRIPT_OVERLAP &&
      mergedNormalized.includes(nextNormalized)
    ) {
      return merged;
    }

    const overlapLength = findNormalizedSuffixPrefixOverlap(
      mergedNormalized,
      nextNormalized,
    );
    if (overlapLength) {
      const appendFrom = sourceIndexAfterNormalizedPrefix(
        nextComparison,
        overlapLength,
      );
      return appendTranscriptRemainder(merged, next.slice(appendFrom));
    }

    const replacementStart = findNormalizedInternalOverlap(
      mergedNormalized,
      nextNormalized,
    );
    if (replacementStart >= 0) {
      const keepUntil = sourceIndexAtNormalizedPosition(
        mergedComparison,
        replacementStart,
      );
      return `${merged.slice(0, keepUntil)}${next}`.trim();
    }
  }

  const maxOverlap = Math.min(merged.length, next.length);
  for (let length = maxOverlap; length > 0; length -= 1) {
    if (merged.endsWith(next.slice(0, length))) {
      return `${merged}${next.slice(length)}`.trim();
    }
  }

  return `${merged} ${next}`.trim();
}

function mergeTranscriptParts(parts: string[]) {
  return parts.reduce(mergeTranscriptPart, '');
}

function clearOverlappedAsrSegments(event: RealtimeAsrEvent) {
  const startMs = event.replaceStartMs ?? event.startMs;
  const endMs = event.replaceEndMs ?? event.endMs;
  const correctionMode = String(
    event.correctionMode ?? event.rawType ?? '',
  ).toLowerCase();
  const shouldReplace =
    correctionMode === 'pgs' ||
    correctionMode === 'rpl' ||
    correctionMode === 'replace' ||
    correctionMode === 'correction';

  if (!shouldReplace || startMs == null) {
    return;
  }

  const removeIfCovered = (segments: Map<number, string>) => {
    for (const segmentId of [...segments.keys()]) {
      if (
        segmentId === event.segmentId ||
        segmentId < startMs ||
        (endMs != null && segmentId > endMs)
      ) {
        continue;
      }
      segments.delete(segmentId);
    }
  };

  removeIfCovered(asrStableSegments);
  removeIfCovered(asrInterimSegments);
}

function rebuildStreamingAsrTranscript(round: InterviewRound) {
  speechFinalTranscript = mergeTranscriptParts(
    [...asrStableSegments.entries()]
      .sort(([left], [right]) => left - right)
      .map(([, text]) => text),
  );
  speechInterimTranscript = mergeTranscriptParts(
    [...asrInterimSegments.entries()]
      .sort(([left], [right]) => left - right)
      .map(([, text]) => text),
  );
  upsertSpeechTranscript(round);
}

function handleStreamingAsrEvent(
  event: RealtimeAsrEvent,
  round: InterviewRound,
) {
  if (
    currentRound.value?.id !== round.id ||
    samplingState.value.phase !== 'active'
  ) {
    return;
  }

  if (event.type === 'status') {
    speechRecognitionMessage.value =
      event.status === 'connected'
        ? '讯飞实时转写已连接。'
        : event.message || '讯飞实时转写状态已更新。';
    return;
  }

  if (event.type === 'error') {
    speechRecognitionHadError = true;
    speechRecognitionPhase.value = 'error';
    speechRecognitionMessage.value = event.message || '讯飞实时转写异常。';
    return;
  }

  const text = event.text?.trim();
  if (!text) {
    speechRecognitionMessage.value = '未识别到有效文本，继续监听。';
    return;
  }

  const segmentId = event.segmentId ?? Date.now();
  clearOverlappedAsrSegments(event);
  if (event.isFinal) {
    asrInterimSegments.delete(segmentId);
    asrStableSegments.set(segmentId, text);
  } else {
    asrInterimSegments.set(segmentId, text);
  }
  speechRecognitionMessage.value = event.isFinal
    ? '讯飞转写已更新。'
    : '正在接收讯飞转写结果。';
  rebuildStreamingAsrTranscript(round);
}

function downsampleToPcm16(
  input: Float32Array,
  sourceSampleRate: number,
  targetSampleRate = ASR_TARGET_SAMPLE_RATE,
) {
  if (sourceSampleRate === targetSampleRate) {
    return floatToPcm16(input);
  }

  const ratio = sourceSampleRate / targetSampleRate;
  const outputLength = Math.max(1, Math.floor(input.length / ratio));
  const output = new Float32Array(outputLength);
  for (let index = 0; index < outputLength; index += 1) {
    output[index] =
      input[Math.min(input.length - 1, Math.floor(index * ratio))];
  }
  return floatToPcm16(output);
}

function floatToPcm16(input: Float32Array) {
  const output = new Int16Array(input.length);
  for (let index = 0; index < input.length; index += 1) {
    const sample = Math.max(-1, Math.min(1, input[index]));
    output[index] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }
  return output;
}

function pcm16ToBytes(input: Int16Array) {
  const bytes: number[] = [];
  input.forEach((sample) => {
    bytes.push(sample & 0xff, (sample >> 8) & 0xff);
  });
  return bytes;
}

function sendAsrAudioFrame(frameBytes: number[]) {
  if (!asrWebSocket || asrWebSocket.readyState !== WebSocket.OPEN) {
    return;
  }
  asrWebSocket.send(new Uint8Array(frameBytes).buffer);
}

function queueAsrPcmFrame(pcm16: Int16Array) {
  asrPcmByteQueue.push(...pcm16ToBytes(pcm16));
  while (asrPcmByteQueue.length >= ASR_FRAME_BYTES) {
    const frame = asrPcmByteQueue.splice(0, ASR_FRAME_BYTES);
    sendAsrAudioFrame(frame);
  }
}

function startAsrAudioProcessing() {
  if (!audioContext || !audioSourceNode || !asrWebSocket) {
    return;
  }

  stopAsrAudioProcessing();
  const processor = audioContext.createScriptProcessor(4096, 1, 1);
  processor.onaudioprocess = (event) => {
    const input = event.inputBuffer.getChannelData(0);
    const output = event.outputBuffer.getChannelData(0);
    output.fill(0);
    const pcm16 = downsampleToPcm16(input, audioContext!.sampleRate);
    queueAsrPcmFrame(pcm16);
  };
  audioSourceNode.connect(processor);
  processor.connect(audioContext.destination);
  asrProcessorNode = processor;
}

function stopAsrAudioProcessing() {
  if (!asrProcessorNode) {
    return;
  }

  asrProcessorNode.onaudioprocess = null;
  asrProcessorNode.disconnect();
  asrProcessorNode = null;
}

function clearSpeechRecognitionStopTimer() {
  if (speechRecognitionStopTimerId !== null) {
    window.clearTimeout(speechRecognitionStopTimerId);
    speechRecognitionStopTimerId = null;
  }
}

function startSpeechRecognition(round: InterviewRound) {
  if (typeof WebSocket === 'undefined') {
    speechRecognitionPhase.value = 'unsupported';
    speechRecognitionMessage.value = '当前浏览器不支持 WebSocket 音频转写。';
    return;
  }

  if (!audioContext || !audioSourceNode) {
    speechRecognitionPhase.value = 'unsupported';
    speechRecognitionMessage.value = '当前浏览器无法建立音频处理链。';
    return;
  }

  stopSpeechRecognition({ reset: false });
  speechRecognitionEntryId = '';
  speechFinalTranscript = '';
  speechInterimTranscript = '';
  speechRecognitionHadError = false;
  speechRecognitionFatalError = false;
  clearSpeechRecognitionStopTimer();
  asrPcmByteQueue = [];
  asrStableSegments = new Map<number, string>();
  asrInterimSegments = new Map<number, string>();

  const socket = new WebSocket(
    resolveAiServiceWebSocketUrl('/v1/asr/iflytek/realtime'),
  );
  asrWebSocket = socket;
  speechRecognitionPhase.value = 'connecting';
  speechRecognitionMessage.value = '正在连接讯飞实时转写。';

  socket.onopen = () => {
    if (asrWebSocket !== socket) {
      return;
    }
    speechRecognitionPhase.value = 'listening';
    speechRecognitionMessage.value = '讯飞实时转写已启动。';
    startAsrAudioProcessing();
  };
  socket.onmessage = (event) => {
    const parseMessage = (rawValue: string) => {
      const payload = JSON.parse(rawValue) as RealtimeAsrEvent;
      handleStreamingAsrEvent(payload, round);
    };

    if (typeof event.data === 'string') {
      parseMessage(event.data);
      return;
    }

    if (event.data instanceof Blob) {
      event.data
        .text()
        .then(parseMessage)
        .catch(() => undefined);
    }
  };
  socket.onerror = () => {
    speechRecognitionHadError = true;
    speechRecognitionPhase.value = 'error';
    speechRecognitionMessage.value = '讯飞实时转写连接异常。';
  };
  socket.onclose = (event) => {
    clearSpeechRecognitionStopTimer();
    stopAsrAudioProcessing();
    if (asrWebSocket === socket) {
      asrWebSocket = null;
    }

    if (isStoppingSpeechRecognition) {
      speechRecognitionPhase.value = 'ended';
      speechRecognitionMessage.value = speechFinalTranscript.trim()
        ? '讯飞实时转写已完成。'
        : '讯飞实时转写已结束，未返回有效文本。';
      isStoppingSpeechRecognition = false;
      return;
    }

    if (samplingState.value.phase === 'active') {
      speechRecognitionHadError = true;
      speechRecognitionPhase.value = 'error';
      const closeDetail = event.code
        ? `（${event.code}${event.reason ? `：${event.reason}` : ''}）`
        : '';
      speechRecognitionMessage.value = `讯飞实时转写连接已断开${closeDetail}。`;
    }
  };
}

function stopSpeechRecognition(options: { reset?: boolean } = {}) {
  if (currentRound.value) {
    promoteSpeechInterimTranscript(currentRound.value);
  }

  stopAsrAudioProcessing();
  asrPcmByteQueue = [];
  const socket = asrWebSocket;
  if (socket) {
    isStoppingSpeechRecognition = true;
    speechRecognitionPhase.value = 'stopping';
    speechRecognitionMessage.value = '正在等待讯飞返回最终转写。';
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: 'end' }));
      clearSpeechRecognitionStopTimer();
      speechRecognitionStopTimerId = window.setTimeout(() => {
        if (asrWebSocket === socket) {
          socket.close();
        }
      }, ASR_STOP_GRACE_MS);
    } else {
      socket.close();
      asrWebSocket = null;
    }
  }

  if (options.reset) {
    clearSpeechRecognitionStopTimer();
    resetSpeechRecognitionState();
  }
}

onMounted(() => {
  setupInterviewPanelSizing();
  startVideoWatermarkTimer();
});

useProtectedPage('/home/ask');

watch(
  () => route.query.profileId,
  (value, previousValue) => {
    const nextProfileId = normalizeRouteQueryValue(value);
    const previousProfileId = normalizeRouteQueryValue(previousValue);
    if (
      nextProfileId === previousProfileId &&
      profileLoadState.value !== 'idle'
    ) {
      return;
    }
    void loadSelectedProfile(nextProfileId);
  },
  { immediate: true },
);

watch(
  () => [currentStage.value, currentRoundId.value, samplingState.value.phase],
  () => {
    void nextTick(() => {
      setupInterviewPanelSizing();
    });
  },
);

onBeforeUnmount(() => {
  interviewPanelResizeObserver?.disconnect();
  window.removeEventListener('resize', syncRoundPanelMaxHeight);
  stopVideoWatermarkTimer();
  stopSamplingResources();
  stopSpeechRecognition({ reset: true });
  closeStageLoading();
});
</script>

<template>
  <section class="ask-page">
    <Transition name="stage-switch" mode="out-in">
      <article :key="stageCardKey" class="stage-card">
        <div class="stage-card__progress">
          <div class="stage-card__progress-head">
            <div>
              <p class="section-eyebrow">流程进度</p>
              <h4>三阶段流程</h4>
            </div>
            <span class="progress-note">上一阶段完成后解锁下一阶段</span>
          </div>

          <div class="progress-track">
            <article
              v-for="(stage, index) in workflowStages"
              :key="stage.id"
              class="progress-step"
              :class="`is-${stageStatus(stage.id)}`"
            >
              <span class="progress-step__index">{{ index + 1 }}</span>
              <div class="progress-step__copy">
                <strong>{{ stage.label }}</strong>
                <p>{{ stage.helper }}</p>
              </div>
              <span class="progress-step__state">{{
                stageStatusLabel(stage.id)
              }}</span>
            </article>
          </div>
        </div>

        <template v-if="currentStage === 'strategy'">
          <header class="stage-card__head">
            <div>
              <p class="section-eyebrow">第一阶段</p>
              <h3>首轮策略生成</h3>
              <p class="section-copy">
                读取对象画像并生成首轮问题包，完成后解锁采样问询。
              </p>
            </div>

            <div class="stage-chip-group">
              <span
                v-if="hasSelectedProfile"
                class="risk-chip"
                :class="riskToneClass(passengerProfile.riskLevel)"
              >
                {{ passengerProfile.riskLabel }}
              </span>
              <span class="soft-chip">{{ profileHeaderStatusLabel }}</span>
            </div>
          </header>

          <div class="strategy-layout">
            <section class="profile-panel profile-panel--compact">
              <template v-if="hasSelectedProfile">
                <div
                  v-if="protectedProfile"
                  class="ask-protected-card"
                  :class="{ 'is-high-risk': protectedProfile.flags?.isHighRisk }"
                >
                  <div class="ask-protected-card__content">
                    <div class="ask-protected-card__headline">
                      <strong class="ask-protected-card__title">
                        <SensitiveAssetImage
                          v-if="findProtectedField(protectedProfile.fields, 'fullName')"
                          :src="findProtectedField(protectedProfile.fields, 'fullName')!.asset.url"
                          alt="旅客姓名"
                          inline
                          eager
                        />
                      </strong>
                      <span
                        v-if="findProtectedChip(protectedProfile.chips, 'highRisk')"
                        class="ask-protected-card__pill ask-protected-card__pill--alert"
                      >
                        <SensitiveAssetImage
                          :src="findProtectedChip(protectedProfile.chips, 'highRisk')!.asset.url"
                          alt="高风险预警"
                          inline
                        />
                      </span>
                      <span
                        v-if="findProtectedChip(protectedProfile.chips, 'documentType')"
                        class="ask-protected-card__pill"
                      >
                        <SensitiveAssetImage
                          :src="findProtectedChip(protectedProfile.chips, 'documentType')!.asset.url"
                          alt="证件类型"
                          inline
                        />
                      </span>
                      <span
                        v-if="findProtectedChip(protectedProfile.chips, 'gender')"
                        class="ask-protected-card__pill"
                      >
                        <SensitiveAssetImage
                          :src="findProtectedChip(protectedProfile.chips, 'gender')!.asset.url"
                          alt="性别"
                          inline
                        />
                      </span>
                      <span
                        v-if="findProtectedChip(protectedProfile.chips, 'documentNum')"
                        class="ask-protected-card__identity"
                      >
                        <SensitiveAssetImage
                          :src="findProtectedChip(protectedProfile.chips, 'documentNum')!.asset.url"
                          alt="证件号码"
                          inline
                        />
                      </span>
                    </div>

                    <div class="ask-protected-card__facts">
                      <span
                        v-for="detail in protectedFactEntries(protectedProfile)"
                        :key="`${protectedProfile.id}-${detail.key || detail.label}`"
                        class="ask-protected-card__fact"
                      >
                        <span class="ask-protected-card__fact-label">
                          {{ detail.label }}
                        </span>
                        <strong class="ask-protected-card__fact-value">
                          <SensitiveAssetImage
                            :src="detail.asset.url"
                            :alt="detail.label"
                            inline
                          />
                        </strong>
                      </span>
                    </div>

                    <div
                      v-if="
                        protectedMetaEntries(protectedProfile).length ||
                        protectedNoteEntries(protectedProfile).length
                      "
                      class="ask-protected-card__tags"
                    >
                      <span
                        v-for="tag in protectedMetaEntries(protectedProfile)"
                        :key="`${protectedProfile.id}-${tag.key}-${tag.asset.id}`"
                        class="ask-protected-card__tag"
                      >
                        <SensitiveAssetImage
                          :src="tag.asset.url"
                          alt="风险标签"
                          inline
                        />
                      </span>
                      <span
                        v-for="note in protectedNoteEntries(protectedProfile)"
                        :key="`${protectedProfile.id}-${note.key}-${note.asset.id}`"
                        class="ask-protected-card__tag ask-protected-card__tag--muted"
                      >
                        <SensitiveAssetImage
                          :src="note.asset.url"
                          alt="备注"
                          inline
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </template>

              <div v-else class="locked-panel">
                <strong>{{
                  isProfileLoading ? '正在读取旅客画像' : '画像未载入'
                }}</strong>
                <p>{{ profileLockMessage }}</p>
                <button
                  class="secondary-action"
                  type="button"
                  @click="returnToDataSearch"
                >
                  返回数据检索
                </button>
              </div>

              <section v-if="hasSelectedProfile" class="memory-panel">
                <div class="memory-panel__head">
                  <div>
                    <span class="meta-label">智能体记忆</span>
                    <strong>{{ memoryStatusLabel }}</strong>
                  </div>
                  <span
                    class="status-chip"
                    :class="`status-chip--${memoryLoadState}`"
                  >
                    {{ memoryLastSyncedAt || '未同步' }}
                  </span>
                </div>

                <SensitiveAssetImage
                  v-if="protectedSession?.memoryBlock?.asset || protectedMemoryAsset"
                  :src="
                    protectedSession?.memoryBlock?.asset?.url ||
                    protectedMemoryAsset!.url
                  "
                  alt="智能体记忆敏感图片"
                />

                <div v-else class="empty-panel empty-panel--compact">
                  <strong>尚无可用记忆</strong>
                  <span>生成策略后，系统会沉淀本次会话与旅客记忆。</span>
                </div>

                <div v-if="memoryErrorMessage" class="inline-alert">
                  {{ memoryErrorMessage }}
                </div>
              </section>
            </section>

            <section class="workspace-panel">
              <div class="workspace-panel__head">
                <div>
                  <p class="section-eyebrow">首轮策略</p>
                  <h4>首轮问题包</h4>
                </div>

                <span class="soft-chip">
                  {{
                    isStrategyLocked
                      ? '等待数据检索'
                      : isGeneratingStrategy
                        ? '系统生成中'
                        : strategyGenerated
                          ? '策略已生成'
                          : '等待生成'
                  }}
                </span>
              </div>

              <p class="workspace-summary">
                {{
                  protectedSession?.strategyBlock?.asset || protectedStrategyAsset
                    ? '首轮策略、风险预评估和问题包已转为服务端带水印图片'
                    : '系统将根据用户画像与风险标签生成首轮策略与问题包'
                }}
              </p>

              <SensitiveAssetImage
                v-if="protectedSession?.strategyBlock?.asset || protectedStrategyAsset"
                :src="
                  protectedSession?.strategyBlock?.asset?.url ||
                  protectedStrategyAsset!.url
                "
                alt="首轮策略敏感图片"
              />

              <div
                v-else
                class="empty-panel"
                :class="{ 'empty-panel--locked': isStrategyLocked }"
              >
                <strong>{{
                  isStrategyLocked ? '请先进行数据检索' : '尚未生成首轮问题'
                }}</strong>
                <span>
                  {{
                    isStrategyLocked
                      ? '从数据检索结果中点击“发起辅助问询”后，系统会载入真实旅客画像并解锁策略生成。'
                      : '点击下方按钮后，系统会请求 AI-Service 生成首轮核验问题与问询策略。'
                  }}
                </span>
              </div>

              <div v-if="strategyRequestError" class="inline-alert">
                {{ strategyRequestError }}
              </div>

              <div class="action-row">
                <button
                  class="primary-action"
                  type="button"
                  :disabled="
                    isStrategyLocked ||
                    isGeneratingStrategy ||
                    Boolean(activeStageLoading)
                  "
                  @click="generateStrategy"
                >
                  {{ strategyGenerated ? '重新生成策略' : '生成策略' }}
                </button>
                <button
                  class="secondary-action"
                  type="button"
                  :disabled="
                    isStrategyLocked ||
                    !canEnterInterview ||
                    Boolean(activeStageLoading)
                  "
                  @click="enterInterviewStage"
                >
                  进入继续
                </button>
                <button
                  v-if="isStrategyLocked"
                  class="secondary-action"
                  type="button"
                  @click="returnToDataSearch"
                >
                  返回数据检索
                </button>
              </div>
            </section>
          </div>
        </template>

        <template v-else-if="currentStage === 'interview'">
          <header class="stage-card__head">
            <div>
              <p class="section-eyebrow">第二阶段</p>
              <h3>智能辅助问询</h3>
              <p class="section-copy">
                点击开始采样后同步记录视频、话筒输入与实时转写；结束后上传本轮窗口并生成下一轮追问。
              </p>
            </div>

            <div class="stage-chip-group">
              <span
                class="status-chip"
                :class="`status-chip--${samplingState.phase}`"
              >
                {{ samplingPhaseLabel }}
              </span>
              <span class="soft-chip">
                {{ currentRound ? currentRound.title : '待创建轮次' }}
              </span>
            </div>
          </header>

          <div v-if="currentRound" class="interview-layout">
            <section
              ref="capturePanelElement"
              class="video-panel video-panel--capture"
            >
              <div class="video-panel__head">
                <div>
                  <p class="section-eyebrow">采样视频</p>
                  <h4>采样视频流</h4>
                </div>
                <span class="soft-chip">
                  {{
                    samplingState.permissionGranted
                      ? '媒体权限已授权'
                      : '等待授权'
                  }}
                </span>
              </div>

              <div class="capture-toolbar">
                <button
                  class="primary-action capture-action"
                  :class="{ 'is-recording': samplingState.phase === 'active' }"
                  type="button"
                  :disabled="
                    samplingState.phase === 'active'
                      ? isEndingSampling
                      : !canStartSampling
                  "
                  @click="
                    samplingState.phase === 'active'
                      ? endSampling()
                      : startSampling()
                  "
                >
                  {{
                    samplingState.phase === 'active' ? '结束采样' : '开始采样'
                  }}
                </button>
                <span class="capture-toolbar__hint">
                  {{
                    samplingState.phase === 'active'
                      ? `采样中 · ${formatDuration(samplingState.elapsedSeconds)}`
                      : samplingState.phase === 'ended'
                        ? '本轮采样已完成'
                        : '等待开始采样'
                  }}
                </span>
              </div>

              <div class="video-stage">
                <video
                  ref="videoElement"
                  autoplay
                  muted
                  playsinline
                  class="video-stage__feed"
                ></video>
                <canvas
                  ref="overlayCanvas"
                  class="video-stage__canvas"
                ></canvas>
                <div
                  v-if="captureVideoWatermarkText"
                  class="video-stage__watermark video-stage__watermark--capture"
                  aria-hidden="true"
                >
                  <span
                    v-for="tile in VIDEO_CAPTURE_WATERMARK_TILE_LAYOUTS"
                    :key="tile.id"
                    class="video-stage__watermark-tile"
                    :style="{
                      top: tile.top,
                      left: tile.left,
                      opacity: tile.opacity,
                      transform: `translate(-50%, -50%) rotate(${tile.rotation}deg)`,
                    }"
                  >
                    {{ captureVideoWatermarkText }}
                  </span>
                </div>

                <div class="video-stage__assist">
                  <span
                    class="detector-pill"
                    :class="`detector-pill--${realtimeDetection.phase}`"
                  >
                    {{ realtimeDetection.statusMessage }}
                  </span>
                  <span class="detector-pill detector-pill--neutral">
                    人脸 {{ realtimeDetection.overlayFrame.faceCount }}
                  </span>
                  <span class="detector-pill detector-pill--neutral">
                    手部 {{ realtimeDetection.overlayFrame.handCount }}
                  </span>
                  <span class="detector-pill detector-pill--neutral">
                    姿态
                    {{
                      realtimeDetection.overlayFrame.poseDetected
                        ? '已识别'
                        : '未识别'
                    }}
                  </span>
                </div>

                <div
                  v-if="samplingState.phase !== 'active'"
                  class="video-stage__placeholder"
                >
                  <strong>{{
                    samplingState.phase === 'ended'
                      ? '本轮采样已完成'
                      : '等待开始采样'
                  }}</strong>
                  <span>
                    {{
                      samplingState.phase === 'error'
                        ? samplingState.errorMessage
                        : '点击“开始采样”后调用摄像头与话筒。'
                    }}
                  </span>
                </div>

                <div class="video-stage__overlay">
                  <span
                    class="live-dot"
                    :class="{ 'is-active': samplingState.phase === 'active' }"
                  ></span>
                  <strong>当前问询对象</strong>
                  <span>信息已受保护显示</span>
                  <span>
                    {{
                      realtimeDetection.enabledModels.length
                        ? `${realtimeDetection.enabledModels.length} 个视觉模型已启用`
                        : '等待视觉检测启动'
                    }}
                  </span>
                </div>
              </div>

              <section class="sampling-console">
                <div class="sampling-console__head">
                  <div>
                    <p class="section-eyebrow">采样控制</p>
                    <h4>采样控制台</h4>
                  </div>
                  <span
                    class="status-chip"
                    :class="`status-chip--${realtimeDetection.phase}`"
                  >
                    {{ realtimeDetection.statusMessage }}
                  </span>
                </div>

                <div class="sampling-console__stats">
                  <article class="console-stat">
                    <span>采样时长</span>
                    <strong>{{
                      formatDuration(samplingState.elapsedSeconds)
                    }}</strong>
                  </article>
                  <article class="console-stat">
                    <span>最近检测</span>
                    <strong>{{
                      formatRealtimeClock(realtimeDetection.lastDetectedAt)
                    }}</strong>
                  </article>
                  <article class="console-stat">
                    <span>启用模型</span>
                    <strong>{{ realtimeEnabledModelLabel }}</strong>
                  </article>
                </div>

                <div class="sampling-console__detectors">
                  <article
                    v-for="status in realtimeModelStatuses"
                    :key="status.key"
                    class="detector-chip"
                    :class="`detector-chip--${status.state}`"
                  >
                    <strong>{{ status.label }}</strong>
                    <span>{{ status.detail }}</span>
                  </article>
                </div>

                <div class="console-summary">
                  <strong>当前窗口摘要</strong>
                  <p>{{ realtimeDetection.windowSummary }}</p>
                </div>

                <div class="face-cue-panel">
                  <div class="console-stream__head">
                    <strong>面部细微波动</strong>
                    <span>基于 MediaPipe blendshapes 的前端候选信号</span>
                  </div>

                  <div class="face-cue-grid">
                    <article
                      v-for="item in faceCueItems"
                      :key="item.key"
                      class="face-cue-card"
                      :class="faceCueLevelClass(item.value)"
                    >
                      <div class="face-cue-card__meta">
                        <span>{{ item.label }}</span>
                        <strong>{{ formatCuePercent(item.value) }}</strong>
                      </div>
                      <div class="face-cue-card__bar">
                        <span
                          :style="{
                            width: `${Math.max(8, item.value * 100)}%`,
                          }"
                        ></span>
                      </div>
                      <p>{{ item.helper }}</p>
                    </article>
                  </div>

                  <p class="face-cue-note">
                    当前主导信号为“{{
                      realtimeDetection.faceCues.dominantCue
                    }}”，用于辅助观察短时面部变化，不等价于最终微表情结论。
                  </p>
                </div>

                <div class="console-metrics">
                  <span class="soft-chip">
                    检测
                    {{ realtimeDetection.overlayFrame.detectionFps.toFixed(1) }}
                    帧/秒
                  </span>
                  <span class="soft-chip">
                    推理
                    {{ realtimeDetection.overlayFrame.inferenceMs.toFixed(1) }}
                    毫秒
                  </span>
                  <span class="soft-chip">
                    {{
                      realtimeDetection.overlayFrame.hasFace
                        ? '人脸已识别'
                        : '人脸未识别'
                    }}
                  </span>
                  <span class="soft-chip">
                    {{
                      realtimeDetection.overlayFrame.poseDetected
                        ? '姿态已识别'
                        : '姿态未识别'
                    }}
                  </span>
                </div>

                <div class="console-stream">
                  <div class="console-stream__head">
                    <strong>实时业务事件流</strong>
                    <span>以问询辅助线索为主</span>
                  </div>

                  <article
                    v-for="entry in realtimeDetection.consoleEntries"
                    :key="entry.id"
                    class="console-entry"
                    :class="[
                      `console-entry--${entry.tone}`,
                      `console-entry--${entry.kind}`,
                    ]"
                  >
                    <div class="console-entry__meta">
                      <strong>{{ entry.title }}</strong>
                      <span>{{ entry.time }}</span>
                    </div>
                    <p>{{ entry.detail }}</p>
                  </article>

                  <div
                    v-if="!realtimeDetection.consoleEntries.length"
                    class="empty-panel empty-panel--compact"
                  >
                    <strong>尚无采样控制台输出</strong>
                    <span
                      >开始采样后，这里会滚动输出模型状态与实时辅助事件。</span
                    >
                  </div>
                </div>
              </section>

              <div class="audio-meter">
                <div class="audio-meter__head">
                  <strong>话筒输入</strong>
                  <span>{{
                    formatDuration(samplingState.elapsedSeconds)
                  }}</span>
                </div>
                <div class="audio-meter__status">
                  <span
                    class="status-chip"
                    :class="`status-chip--${speechRecognitionPhase}`"
                  >
                    {{ speechRecognitionLabel }}
                  </span>
                  <p>{{ speechRecognitionMessage }}</p>
                </div>
                <div class="audio-meter__bars">
                  <span
                    v-for="(bar, index) in samplingState.meterBars"
                    :key="`${index}-${bar}`"
                    class="audio-meter__bar"
                    :style="{ transform: `scaleY(${bar})` }"
                  ></span>
                </div>
              </div>
            </section>

            <section
              ref="roundPanelElement"
              class="transcript-panel transcript-panel--round"
              :style="
                roundPanelMaxHeight
                  ? { maxHeight: roundPanelMaxHeight }
                  : undefined
              "
            >
              <div class="transcript-panel__head">
                <div>
                  <p class="section-eyebrow">本轮重点</p>
                  <h4>{{ currentRound.title }}</h4>
                </div>
                <span class="soft-chip"
                  >{{ currentRound.questionCount }} 条问题</span
                >
              </div>

              <div class="transcript-panel__scroll">
                <p class="workspace-summary">
                  服务端返回的问题包、工作人员提示和本轮摘要已转为带水印图片
                </p>

                <div class="round-actions round-actions--compact">
                  <div class="round-actions__copy">
                    <strong>{{
                      currentRound.completed ? '本轮已完成' : '本轮未完成'
                    }}</strong>
                    <span>
                      {{
                        hasReachedInteractionLimit
                          ? '已达到管理员设置的总交互轮次上限，建议结束当前辅助问询流程。'
                          : currentRound.completed
                            ? '本轮采样与摘要已完成，可继续进入下一轮追问或提交人工辅助判断。'
                            : '完成采样并等待摘要上传后，可解锁下一轮或进入人工判断。'
                      }}
                    </span>
                    <small
                      v-if="inquirySettingsMessage"
                      class="round-limit-badge round-limit-badge--warning"
                    >
                      {{ inquirySettingsMessage }}
                    </small>
                    <small v-else class="round-limit-badge">
                      当前上限 <strong>{{ maxInteractionRounds }}</strong> 轮
                    </small>
                  </div>

                  <div class="action-row">
                    <button
                      class="secondary-action"
                      type="button"
                      :disabled="
                        !canAdvanceRound || Boolean(activeStageLoading)
                      "
                      @click="enterNextRound"
                    >
                      进入下一轮
                    </button>
                    <button
                      class="primary-action"
                      type="button"
                      :disabled="
                        !canEnterJudgement || Boolean(activeStageLoading)
                      "
                      @click="enterJudgementStage"
                    >
                      进入人工辅助判断
                    </button>
                  </div>
                </div>

                <div class="panel-subhead">
                  <strong>当前问题</strong>
                  <span>{{ currentRound.questionCount }} 条</span>
                </div>

                <SensitiveAssetImage
                  v-if="currentRound.promptBlock?.asset || currentRound.promptAsset"
                  :src="
                    currentRound.promptBlock?.asset?.url ||
                    currentRound.promptAsset!.url
                  "
                  alt="当前轮问题包敏感图片"
                />
                <div class="panel-subhead">
                  <strong>受保护摘要</strong>
                  <span>{{
                    currentRound.summaryBlock?.asset || currentRound.summaryAsset
                      ? '已生成'
                      : '待生成'
                  }}</span>
                </div>

                <SensitiveAssetImage
                  v-if="currentRound.summaryBlock?.asset || currentRound.summaryAsset"
                  :src="
                    currentRound.summaryBlock?.asset?.url ||
                    currentRound.summaryAsset!.url
                  "
                  alt="当前轮摘要敏感图片"
                />
                <div v-else class="empty-panel empty-panel--compact">
                  <strong>尚未生成本轮摘要</strong>
                  <span>完成采样并上传后，这里会展示带水印的受保护摘要。</span>
                </div>

                <div v-if="samplingState.errorMessage" class="inline-alert">
                  {{ samplingState.errorMessage }}
                </div>

                <section class="memory-panel memory-panel--inline">
                  <div class="memory-panel__head">
                    <div>
                      <span class="meta-label">智能体记忆</span>
                      <strong>{{ memoryStatusLabel }}</strong>
                    </div>
                    <span
                      class="status-chip"
                      :class="`status-chip--${memoryLoadState}`"
                    >
                      {{ memoryLastSyncedAt || '未同步' }}
                    </span>
                  </div>

                  <SensitiveAssetImage
                    v-if="protectedSession?.memoryBlock?.asset || protectedMemoryAsset"
                    :src="
                      protectedSession?.memoryBlock?.asset?.url ||
                      protectedMemoryAsset!.url
                    "
                    alt="问询记忆敏感图片"
                  />

                  <div v-else class="empty-panel empty-panel--compact">
                    <strong>尚无可用记忆</strong>
                    <span>完成采样与追问后，系统会更新记忆上下文。</span>
                  </div>

                  <div v-if="memoryErrorMessage" class="inline-alert">
                    {{ memoryErrorMessage }}
                  </div>
                </section>
              </div>
            </section>
          </div>

          <section class="history-panel">
            <div class="history-panel__head">
              <div>
                <p class="section-eyebrow">历史轮次</p>
                <h4>历史轮次保留区</h4>
              </div>
              <span class="progress-note"
                >进入下一轮后，之前的问题与摘要会保留在此处</span
              >
            </div>

            <div v-if="historicalRounds.length" class="history-list">
              <article
                v-for="round in historicalRounds"
                :key="round.id"
                class="history-item"
              >
                <div class="history-item__meta">
                  <strong>{{ round.title }}</strong>
                  <span>{{ round.questionCount }} 条问题</span>
                </div>
                <SensitiveAssetImage
                  v-if="
                    round.summaryBlock?.asset ||
                    round.promptBlock?.asset ||
                    round.summaryAsset ||
                    round.promptAsset
                  "
                  :src="
                    round.summaryBlock?.asset?.url ||
                    round.promptBlock?.asset?.url ||
                    round.summaryAsset?.url ||
                    round.promptAsset?.url
                  "
                  alt="历史轮次敏感图片"
                />
              </article>
            </div>

            <div v-else class="empty-panel empty-panel--compact">
              <strong>当前仍处于首轮问询</strong>
              <span
                >完成本轮后点击“进入下一轮”，历史摘要会自动保留在这里。</span
              >
            </div>
          </section>
        </template>

        <template v-else-if="currentStage === 'judgement' && !isArchived">
          <header class="stage-card__head">
            <div>
              <p class="section-eyebrow">第三阶段</p>
              <h3>人工辅助判断</h3>
              <p class="section-copy">
                系统摘要作为辅助线索，最终结论由检查员判定并归档。
              </p>
            </div>

            <div class="stage-chip-group">
              <span class="status-chip status-chip--judgement">人工复核</span>
              <span class="soft-chip">至少 20 字详细理由</span>
            </div>
          </header>

          <div class="judgement-layout">
            <section class="workspace-panel workspace-panel--judgement">
              <div class="workspace-panel__head">
                <div>
                  <p class="section-eyebrow">判定结果</p>
                  <h4>最终判定</h4>
                </div>
                <span class="soft-chip">{{ selectedJudgementLabel }}</span>
              </div>

              <div class="verdict-grid">
                <button
                  class="verdict-button verdict-button--alert"
                  :class="{ 'is-active': selectedJudgement === 'concealment' }"
                  type="button"
                  @click="selectJudgement('concealment')"
                >
                  隐瞒
                </button>
                <button
                  class="verdict-button verdict-button--warn"
                  :class="{
                    'is-active': selectedJudgement === 'falseStatement',
                  }"
                  type="button"
                  @click="selectJudgement('falseStatement')"
                >
                  虚假陈述
                </button>
                <button
                  class="verdict-button verdict-button--safe"
                  :class="{ 'is-active': selectedJudgement === 'clear' }"
                  type="button"
                  @click="selectJudgement('clear')"
                >
                  无异常
                </button>
              </div>

              <label class="reason-box">
                <span>详细理由</span>
                <textarea
                  v-model="judgementReason"
                  :title="touchInputHint"
                  placeholder="请详细说明为什么做出该判定，至少包含关键证据、风险信号与人工判断依据。"
                  @dblclick.stop.prevent="openJudgementReasonKeyboard"
                ></textarea>
              </label>

              <div class="reason-meta">
                <span>当前字数：{{ judgementReason.trim().length }}</span>
                <span>{{
                  canArchive ? '理由已满足归档条件' : '未满足归档条件'
                }}</span>
              </div>
            </section>

            <section class="profile-panel digest-panel">
              <div class="workspace-panel__head">
                <div>
                  <p class="section-eyebrow">系统摘要</p>
                  <h4>归档前摘要</h4>
                </div>
                <span class="soft-chip">{{ passengerProfile.alias }}</span>
              </div>

              <div
                v-if="
                  protectedSession?.judgementBlock?.asset || protectedJudgementAsset
                "
                class="summary-stack digest-stack"
              >
                <SensitiveAssetImage
                  :src="
                    protectedSession?.judgementBlock?.asset?.url ||
                    protectedJudgementAsset!.url
                  "
                  alt="人工辅助判断摘要敏感图片"
                />
              </div>

              <div v-else class="empty-panel empty-panel--compact">
                <strong>尚未生成系统摘要</strong>
                <span
                  >请返回第二阶段完成采样与摘要整理后，再进入人工辅助判断。</span
                >
              </div>
            </section>
          </div>

          <div class="action-row">
            <button
              class="primary-action"
              type="button"
              :disabled="!canArchive"
              @click="archiveCase"
            >
              {{ isArchiving ? '归档中...' : '归档' }}
            </button>
          </div>
        </template>

        <template v-else>
          <header class="stage-card__head">
            <div>
              <p class="section-eyebrow">已归档</p>
              <h3>流程已完成归档</h3>
              <p class="section-copy">
                页面已进入锁定完成态，以下展示最终判定、理由摘要与本次问询的关键依据，当前内容不再允许修改。
              </p>
            </div>

            <div class="stage-chip-group">
              <span class="soft-chip">流程已锁定</span>
            </div>
          </header>

          <div class="completion-layout">
            <section class="completion-hero">
              <div class="completion-seal">已归档</div>
              <div>
                <p class="section-eyebrow">归档完成</p>
                <h4>问询记录已保存</h4>
                <p>
                  本次问询的最终结论、理由摘要与关键依据已归档保存，当前页面仅保留完成态展示。
                </p>
              </div>
            </section>

            <section class="completion-grid">
              <div class="completion-panel">
                <span class="meta-label">归档状态</span>
                <strong>已完成</strong>
                <p>问询流程不可再修改</p>
              </div>

              <div class="completion-panel">
                <span class="meta-label">采样轮次</span>
                <strong>{{ completedRoundCount }} 轮</strong>
                <p>累计采样 {{ formatDuration(totalSampleDuration) }}</p>
              </div>

              <div class="completion-panel">
                <span class="meta-label">处理结果</span>
                <p>详细结论与依据已进入归档记录，后续请在归档页查看受保护内容。</p>
              </div>
            </section>
          </div>
        </template>
      </article>
    </Transition>

    <Transition name="stage-loading">
      <div
        v-if="activeStageLoading"
        class="stage-loading"
        role="dialog"
        aria-modal="true"
        :aria-label="activeStageLoading.title"
      >
        <div class="stage-loading__panel" role="status" aria-live="polite">
          <div class="stage-loading__visual" aria-hidden="true">
            <span class="stage-loading__ring"></span>
            <span class="stage-loading__core"></span>
            <span class="stage-loading__spark stage-loading__spark--a"></span>
            <span class="stage-loading__spark stage-loading__spark--b"></span>
            <span class="stage-loading__spark stage-loading__spark--c"></span>
          </div>

          <div class="stage-loading__copy">
            <p class="section-eyebrow">{{ activeStageLoading.eyebrow }}</p>
            <h4>{{ activeStageLoading.title }}</h4>
            <p>{{ activeStageLoading.detail }}</p>
          </div>

          <div class="stage-loading__phrase">
            <span :key="activeStageLoadingPhrase">
              {{ activeStageLoadingPhrase }}
            </span>
            <i aria-hidden="true"></i>
            <i aria-hidden="true"></i>
            <i aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="round-limit-dialog">
      <div
        v-if="roundLimitDialogVisible"
        class="round-limit-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="轮次上限提示"
      >
        <div class="round-limit-dialog__panel">
          <p class="section-eyebrow">轮次上限</p>
          <h4>最多只能进行 {{ maxInteractionRounds }} 轮问询</h4>
          <p>已达到管理员设置的总交互轮次上限，请进入人工辅助判断。</p>
          <div class="action-row">
            <button
              class="secondary-action"
              type="button"
              @click="roundLimitDialogVisible = false"
            >
              我知道了
            </button>
            <button
              class="primary-action"
              type="button"
              @click="
                roundLimitDialogVisible = false;
                enterJudgementStage();
              "
            >
              进入人工辅助判断
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped lang="scss">
.ask-page {
  --surface-bg: rgba(255, 255, 255, 0.92);
  --surface-border: rgba(157, 189, 202, 0.36);
  --surface-subtle: rgba(245, 250, 252, 0.9);
  --surface-strong: rgba(235, 245, 248, 0.96);
  --text-main: #15252b;
  --text-muted: #5b7179;
  --accent: #0b7288;
  --accent-bright: #20a8c5;
  --accent-strong: #09596c;
  --alert: #b64e3d;
  --warn: #c07b19;
  --safe: #237d4d;
  --shadow: 0 22px 46px rgba(14, 40, 48, 0.08);
  min-height: 0;
  height: 100%;
  display: grid;
  gap: clamp(14px, 1.8vw, 22px);
}

.stage-card {
  min-height: 0;
  height: min(100%, var(--content-height, 100%));
  border-radius: clamp(22px, 2vw, 28px);
  background: var(--surface-bg);
  border: 1px solid var(--surface-border);
  box-shadow: var(--shadow);
}

.stage-card {
  overflow: hidden;
}

.stage-card__progress-head,
.stage-card__head,
.workspace-panel__head,
.video-panel__head,
.sampling-console__head,
.transcript-panel__head,
.history-panel__head,
.analysis-column__head,
.audio-meter__head,
.console-stream__head,
.round-actions,
.completion-hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.stage-card h3,
.stage-card__progress-head h4,
.workspace-panel h4,
.profile-panel strong,
.video-panel h4,
.transcript-panel h4,
.analysis-column h4 {
  margin: 6px 0 0;
  color: var(--text-main);
}

.stage-card h3 {
  font-size: 1.18rem;
}

.stage-card__head {
  align-items: center;
  padding-bottom: 2px;
}

.section-eyebrow,
.meta-label {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-muted);
}

.section-copy,
.workspace-summary,
.profile-summary,
.question-item p,
.question-brief p,
.analysis-hero p,
.finding-item p,
.completion-panel p,
.summary-item p,
.audio-meter__copy,
.progress-step__copy p,
.history-item p,
.round-actions__copy span,
.empty-panel span,
.video-stage__placeholder span {
  color: var(--text-muted);
  line-height: 1.48;
}

.section-copy {
  margin-top: 6px;
  max-width: 680px;
}

.stage-chip-group,
.action-row,
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-width: 0;
}

.soft-chip,
.status-chip,
.risk-chip,
.progress-note,
.judgement-pill {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
}

.soft-chip,
.progress-note {
  background: rgba(11, 114, 136, 0.08);
  color: var(--accent-strong);
}

.stage-card {
  --stage-card-padding: clamp(16px, 1.8vw, 24px);
  position: relative;
  padding: var(--stage-card-padding);
  display: grid;
  gap: clamp(12px, 1.4vw, 16px);
  min-height: 0;
}

.stage-card__progress {
  margin: calc(var(--stage-card-padding) * -1)
    calc(var(--stage-card-padding) * -1) 0;
  padding: clamp(12px, 1.4vw, 14px) var(--stage-card-padding);
  border-bottom: 1px solid rgba(157, 189, 202, 0.24);
  background:
    linear-gradient(
      180deg,
      rgba(230, 244, 248, 0.82),
      rgba(255, 255, 255, 0.72)
    ),
    rgba(248, 252, 253, 0.94);
}

.stage-card__progress-head h4 {
  font-size: 1rem;
}

.progress-track {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 12px;
}

.progress-step {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  min-height: 68px;
  padding: 10px 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.54);
  border: 1px solid rgba(157, 189, 202, 0.26);
}

.progress-step::after {
  content: '';
  position: absolute;
  top: 50%;
  left: calc(100% - 3px);
  width: 10px;
  height: 2px;
  background: rgba(157, 189, 202, 0.42);
  transform: translateY(-50%);
}

.progress-step:last-child::after {
  display: none;
}

.progress-step__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.progress-step__index {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 11px;
  background: rgba(11, 114, 136, 0.08);
  color: var(--accent-strong);
  font-weight: 800;
  font-size: 0.92rem;
}

.progress-step__copy strong {
  display: block;
  overflow: hidden;
  color: var(--text-main);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.progress-step__copy p {
  margin-top: 2px;
  overflow: hidden;
  font-size: 0.8rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.progress-step__state {
  align-self: start;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted);
  white-space: nowrap;
}

.progress-step.is-active {
  background: linear-gradient(
    135deg,
    rgba(11, 114, 136, 0.12),
    rgba(255, 255, 255, 0.98)
  );
  border-color: rgba(11, 114, 136, 0.28);
  box-shadow: 0 10px 22px rgba(11, 114, 136, 0.1);
}

.progress-step.is-active .progress-step__index {
  background: linear-gradient(135deg, var(--accent), var(--accent-bright));
  color: #ffffff;
}

.progress-step.is-active .progress-step__state {
  color: var(--accent-strong);
}

.progress-step.is-active::after,
.progress-step.is-completed::after {
  background: linear-gradient(90deg, var(--accent), var(--accent-bright));
}

.progress-step.is-completed {
  border-color: rgba(35, 125, 77, 0.2);
  background: rgba(255, 255, 255, 0.78);
}

.progress-step.is-completed .progress-step__index {
  background: linear-gradient(135deg, rgba(35, 125, 77, 0.84), #4ca36f);
  color: #ffffff;
}

.progress-step.is-completed .progress-step__state {
  color: var(--safe);
}

.progress-step.is-locked {
  opacity: 0.82;
}

.progress-step.is-locked .progress-step__state {
  color: var(--text-muted);
}

.strategy-layout,
.interview-layout,
.analysis-layout,
.judgement-layout,
.completion-layout {
  display: grid;
  gap: clamp(12px, 1.4vw, 16px);
  min-height: 0;
}

.profile-panel,
.workspace-panel,
.video-panel,
.transcript-panel,
.history-panel,
.memory-panel,
.analysis-hero,
.timeline-strip,
.analysis-column,
.completion-panel {
  border-radius: 18px;
  background: var(--surface-subtle);
  border: 1px solid rgba(157, 189, 202, 0.26);
}

.profile-panel,
.workspace-panel,
.video-panel,
.transcript-panel,
.history-panel,
.memory-panel,
.analysis-column {
  display: grid;
  align-content: start;
  gap: clamp(12px, 1.4vw, 14px);
  padding: clamp(14px, 1.5vw, 16px);
  min-height: 0;
}

.ask-protected-card {
  position: relative;
  overflow: hidden;
  padding: clamp(14px, 1.5vw, 16px) clamp(14px, 1.5vw, 18px)
    clamp(14px, 1.5vw, 16px) clamp(20px, 1.8vw, 24px);
  border-radius: clamp(18px, 1.8vw, 24px);
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(157, 189, 202, 0.36);
  box-shadow: 0 22px 46px rgba(14, 40, 48, 0.08);
}

.ask-protected-card::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 6px;
  background: linear-gradient(180deg, var(--accent), var(--accent-bright));
}

.ask-protected-card.is-high-risk::before {
  background: linear-gradient(180deg, #c75c47, #de876d);
}

.ask-protected-card__content {
  min-width: 0;
  display: grid;
  gap: 10px;
}

.ask-protected-card__headline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 10px;
}

.ask-protected-card__title {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
}

.ask-protected-card__title :deep(.sensitive-image img) {
  height: 28px;
}

.ask-protected-card__pill,
.ask-protected-card__identity,
.ask-protected-card__tag {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
}

.ask-protected-card__pill {
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(157, 189, 202, 0.48);
  color: #43646e;
}

.ask-protected-card__pill--alert {
  background: rgba(199, 92, 71, 0.12);
  border-color: rgba(199, 92, 71, 0.16);
  color: #a24734;
}

.ask-protected-card__identity {
  background: rgba(217, 238, 244, 0.92);
  color: #09596c;
}

.ask-protected-card__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
}

.ask-protected-card__fact {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 34px;
  padding: 0 10px;
  border-radius: 12px;
  background: #fbfeff;
  border: 1px solid rgba(157, 189, 202, 0.36);
}

.ask-protected-card__fact-label {
  color: #6c8790;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.ask-protected-card__fact-value {
  display: inline-flex;
  align-items: center;
  color: var(--text-main);
  font-size: 0.84rem;
  font-weight: 700;
}

.ask-protected-card__pill :deep(.sensitive-image img),
.ask-protected-card__identity :deep(.sensitive-image img),
.ask-protected-card__tag :deep(.sensitive-image img),
.ask-protected-card__fact-value :deep(.sensitive-image img) {
  height: 18px;
}

.ask-protected-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ask-protected-card__tag {
  background: rgba(11, 114, 136, 0.12);
  color: #09596c;
}

.ask-protected-card__tag--muted {
  background: rgba(91, 113, 121, 0.12);
  color: #5b7179;
}

.video-panel,
.sampling-console,
.audio-meter {
  display: grid;
  gap: 12px;
}

.transcript-panel--round {
  min-height: 0;
  overflow: hidden;
}

.transcript-panel__scroll {
  display: grid;
  align-content: start;
  gap: 14px;
  min-height: 0;
  overflow-y: auto;
  padding-right: 4px;
}

.profile-panel__identity,
.question-item,
.question-brief,
.summary-item {
  display: grid;
  gap: 8px;
}

.profile-panel__identity {
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 12px;
}

.profile-avatar {
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    rgba(11, 114, 136, 0.16),
    rgba(32, 168, 197, 0.24)
  );
  color: var(--accent-strong);
  font-size: 0.96rem;
  font-weight: 800;
}

.profile-panel__identity strong,
.profile-panel__identity span {
  display: block;
}

.profile-panel__identity span {
  color: var(--text-muted);
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 0;
}

.profile-grid div,
.profile-insight {
  min-width: 0;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(157, 189, 202, 0.16);
}

.profile-insight {
  display: grid;
  gap: 4px;
}

.profile-grid strong,
.summary-item strong,
.completion-panel strong {
  color: var(--text-main);
}

.summary-item__inline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.profile-summary {
  margin: 0;
}

.workspace-summary {
  margin-top: 4px;
}

.question-list,
.current-questions,
.analysis-columns,
.history-list,
.memory-list,
.summary-stack {
  display: grid;
  gap: 10px;
}

.summary-stack--compact {
  margin-top: 8px;
}

.summary-stack--dense {
  gap: 8px;
}

.stage-card .summary-item {
  min-width: 0;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(157, 189, 202, 0.16);
}

.question-item,
.question-brief {
  padding: 12px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.24);
}

.memory-panel {
  margin-top: 0;
  background:
    linear-gradient(
      180deg,
      rgba(11, 114, 136, 0.05),
      rgba(255, 255, 255, 0.88)
    ),
    var(--surface-subtle);
}

.memory-panel--inline {
  padding: 12px;
}

.memory-panel__head,
.memory-item__meta {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.memory-panel__head strong,
.memory-item__meta strong {
  color: var(--text-main);
}

.memory-panel__head .meta-label,
.memory-item__meta span {
  color: var(--text-muted);
  font-size: 0.82rem;
}

.memory-list {
  max-height: 260px;
  overflow-y: auto;
  padding-right: 4px;
}

.memory-reference-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 2px 4px 0;
  scrollbar-width: thin;
}

.memory-reference-chip {
  display: inline-grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-rows: auto auto;
  column-gap: 8px;
  row-gap: 1px;
  align-items: center;
  flex: 0 0 auto;
  max-width: min(100%, 240px);
  width: max-content;
  min-width: 0;
  min-height: 34px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(91, 113, 121, 0.09);
  color: var(--text-main);
}

.memory-reference-chip span,
.memory-reference-chip small {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.memory-reference-chip span {
  font-size: 0.8rem;
  font-weight: 700;
}

.memory-reference-chip small {
  color: var(--text-muted);
  font-size: 0.68rem;
  font-weight: 600;
}

.memory-reference-chip b {
  grid-row: 1 / span 2;
  grid-column: 2;
  align-self: center;
  justify-self: end;
  min-width: 28px;
  padding: 2px 7px;
  border-radius: 999px;
  background: rgba(11, 114, 136, 0.12);
  color: var(--accent-strong);
  font-size: 0.72rem;
  line-height: 1.2;
  text-align: center;
}

.memory-item {
  display: grid;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(157, 189, 202, 0.18);
}

.memory-item p {
  margin: 0;
  color: var(--text-muted);
}

.question-item__meta,
.history-item__meta,
.transcript-entry__meta,
.console-entry__meta,
.reason-meta {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.question-item__meta span,
.question-brief span,
.reason-meta,
.transcript-entry__meta span {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.question-list--scroll,
.current-questions--scroll,
.digest-stack,
.history-list {
  max-height: 320px;
  overflow-y: auto;
  padding-right: 4px;
}

.history-panel {
  min-height: 0;
  overflow: hidden;
}

.current-questions--scroll {
  max-height: 260px;
}

.digest-stack {
  max-height: 500px;
}

.round-summary-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.round-summary-stack .summary-item {
  min-height: 0;
}

.round-summary-stack .summary-item p {
  max-height: 120px;
  overflow-y: auto;
  padding-right: 4px;
}

.panel-subhead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-top: 2px;
}

.panel-subhead strong {
  color: var(--text-main);
}

.panel-subhead span {
  color: var(--text-muted);
  font-size: 0.82rem;
  font-weight: 700;
}

.empty-panel {
  display: grid;
  gap: 8px;
  place-items: center;
  min-height: 148px;
  padding: 18px;
  text-align: center;
  border-radius: 18px;
  border: 1px dashed rgba(11, 114, 136, 0.24);
  background: rgba(255, 255, 255, 0.76);
}

.empty-panel--compact {
  min-height: 104px;
}

.empty-panel--locked,
.locked-panel {
  border-style: dashed;
  background: rgba(246, 250, 251, 0.86);
}

.locked-panel {
  display: grid;
  gap: 12px;
  place-items: center;
  min-height: 320px;
  padding: 22px;
  text-align: center;
  border-radius: 18px;
  border: 1px dashed rgba(11, 114, 136, 0.24);
}

.locked-panel strong {
  color: var(--text-main);
}

.locked-panel p {
  max-width: 320px;
  margin: 0;
  color: var(--text-muted);
}

.primary-action,
.secondary-action,
.verdict-button {
  min-height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease,
    box-shadow 0.2s ease;
}

.primary-action:hover,
.secondary-action:hover,
.verdict-button:hover {
  transform: translateY(-1px);
}

.primary-action:disabled,
.secondary-action:disabled,
.verdict-button:disabled {
  cursor: not-allowed;
  opacity: 0.48;
  transform: none;
  box-shadow: none;
}

.primary-action {
  background: linear-gradient(135deg, var(--accent), var(--accent-bright));
  color: #ffffff;
  box-shadow: 0 14px 28px rgba(11, 114, 136, 0.18);
}

.secondary-action {
  background: rgba(11, 114, 136, 0.08);
  color: var(--accent-strong);
}

.risk-chip--high {
  background: rgba(182, 78, 61, 0.12);
  color: var(--alert);
}

.risk-chip--medium {
  background: rgba(192, 123, 25, 0.14);
  color: var(--warn);
}

.risk-chip--safe {
  background: rgba(35, 125, 77, 0.12);
  color: var(--safe);
}

.tag-chip {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  flex: 0 1 auto;
  max-width: min(100%, 320px);
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(91, 113, 121, 0.09);
  color: var(--text-main);
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1.25;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tag-chip--passive {
  cursor: default;
}

.capture-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(157, 189, 202, 0.18);
}

.capture-action {
  min-width: 128px;
}

.capture-action.is-recording {
  background: linear-gradient(135deg, var(--alert), #d96d57);
  box-shadow: 0 14px 28px rgba(182, 78, 61, 0.18);
}

.capture-toolbar__hint {
  color: var(--text-muted);
  font-size: 0.84rem;
  font-weight: 700;
  text-align: right;
}

.video-stage {
  position: relative;
  min-height: clamp(260px, 36vh, 420px);
  border-radius: clamp(16px, 1.6vw, 18px);
  background:
    radial-gradient(
      circle at top left,
      rgba(32, 168, 197, 0.2),
      transparent 26%
    ),
    linear-gradient(135deg, #203039, #111b20);
  overflow: hidden;
}

.video-stage__feed {
  width: 100%;
  height: 100%;
  min-height: inherit;
  object-fit: cover;
  transform: scaleX(-1);
}

.video-stage__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  min-height: inherit;
  pointer-events: none;
  transform: scaleX(-1);
}

.video-stage__watermark {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
  user-select: none;
}

.video-stage__watermark-tile {
  position: absolute;
  max-width: min(64%, 360px);
  color: rgba(255, 255, 255, 0.56);
  font-size: clamp(0.72rem, 0.64rem + 0.22vw, 0.86rem);
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1.45;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.34);
  white-space: normal;
}

.video-stage__assist {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: calc(100% - 32px);
}

.video-stage__placeholder {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: grid;
  gap: 8px;
  place-content: center;
  padding: 24px;
  text-align: center;
  color: #ffffff;
  background: linear-gradient(
    180deg,
    rgba(10, 20, 24, 0.14),
    rgba(10, 20, 24, 0.76)
  );
}

.video-stage__overlay {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 2;
  display: grid;
  gap: 4px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(10, 20, 24, 0.48);
  color: #ffffff;
  backdrop-filter: blur(12px);
}

.detector-pill {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(10, 20, 24, 0.5);
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 700;
  backdrop-filter: blur(14px);
}

.detector-pill--neutral {
  background: rgba(255, 255, 255, 0.12);
}

.detector-pill--running,
.detector-pill--partial {
  background: rgba(19, 163, 187, 0.32);
}

.detector-pill--loading {
  background: rgba(226, 170, 77, 0.3);
}

.detector-pill--unavailable,
.detector-pill--error {
  background: rgba(182, 78, 61, 0.34);
}

.detector-pill--idle {
  background: rgba(255, 255, 255, 0.16);
}

.live-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.32);
}

.live-dot.is-active {
  background: #33b06c;
  box-shadow: 0 0 0 6px rgba(51, 176, 108, 0.14);
}

.sampling-console {
  padding: 14px;
  border-radius: 16px;
  background:
    linear-gradient(
      180deg,
      rgba(11, 114, 136, 0.06),
      rgba(255, 255, 255, 0.96)
    ),
    #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.22);
}

.sampling-console__stats,
.sampling-console__detectors,
.console-metrics,
.face-cue-grid {
  display: grid;
  gap: 8px;
}

.sampling-console__stats {
  grid-template-columns: repeat(auto-fit, minmax(112px, 1fr));
}

.console-stat,
.console-summary,
.console-entry {
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(157, 189, 202, 0.18);
  background: rgba(255, 255, 255, 0.86);
}

.console-stat {
  display: grid;
  gap: 3px;
}

.console-stat span,
.console-entry__meta span,
.console-stream__head span {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.console-stat strong,
.console-summary strong,
.console-entry strong,
.detector-chip strong {
  color: var(--text-main);
}

.sampling-console__detectors {
  grid-template-columns: repeat(auto-fit, minmax(122px, 1fr));
}

.detector-chip {
  display: grid;
  gap: 4px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(157, 189, 202, 0.18);
  background: rgba(255, 255, 255, 0.88);
}

.detector-chip span {
  font-size: 0.8rem;
  color: var(--text-muted);
}

.detector-chip--loading {
  border-color: rgba(226, 170, 77, 0.26);
  background: rgba(255, 247, 233, 0.94);
}

.detector-chip--ready {
  border-color: rgba(11, 114, 136, 0.22);
  background: rgba(240, 249, 252, 0.94);
}

.detector-chip--failed,
.detector-chip--unavailable {
  border-color: rgba(182, 78, 61, 0.24);
  background: rgba(255, 243, 239, 0.96);
}

.console-summary {
  display: grid;
  gap: 6px;
}

.console-summary p,
.console-entry p,
.face-cue-note,
.face-cue-card p {
  margin: 0;
}

.face-cue-panel {
  display: grid;
  gap: 8px;
}

.face-cue-grid {
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
}

.face-cue-card {
  display: grid;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(157, 189, 202, 0.18);
  background: rgba(255, 255, 255, 0.88);
}

.face-cue-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.face-cue-card__meta span,
.face-cue-card p,
.face-cue-note {
  color: var(--text-muted);
  font-size: 0.8rem;
}

.face-cue-card__meta strong {
  color: var(--text-main);
}

.face-cue-card__bar {
  position: relative;
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(157, 189, 202, 0.18);
}

.face-cue-card__bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    rgba(32, 168, 197, 0.68),
    rgba(11, 114, 136, 0.96)
  );
}

.face-cue-card--active {
  border-color: rgba(11, 114, 136, 0.2);
  background: rgba(240, 249, 252, 0.94);
}

.face-cue-card--strong {
  border-color: rgba(192, 123, 25, 0.24);
  background: rgba(255, 247, 233, 0.96);
}

.console-metrics {
  grid-template-columns: repeat(auto-fit, minmax(104px, 1fr));
}

.console-stream {
  display: grid;
  gap: 8px;
  max-height: 220px;
  overflow-y: auto;
  padding-right: 4px;
}

.console-entry {
  display: grid;
  gap: 6px;
}

.console-entry--event {
  border-left: 4px solid rgba(11, 114, 136, 0.24);
}

.console-entry--status {
  background: rgba(248, 252, 253, 0.9);
}

.console-entry--warn {
  border-left-color: var(--warn);
}

.console-entry--alert {
  border-left-color: var(--alert);
}

.audio-meter {
  margin-top: 0;
}

.audio-meter__status {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.audio-meter__status p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.86rem;
}

.audio-meter__bars {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  align-items: end;
  gap: 6px;
  min-height: 62px;
  padding: 10px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.22);
}

.audio-meter__bar {
  display: block;
  height: 42px;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    rgba(32, 168, 197, 0.95),
    rgba(11, 114, 136, 0.4)
  );
  transform-origin: bottom center;
  transition: transform 0.08s linear;
}

.audio-meter__copy {
  margin: 0;
}

.transcript-stream {
  display: grid;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 4px;
}

.transcript-entry {
  display: grid;
  gap: 8px;
  max-width: 88%;
}

.transcript-entry p {
  margin: 0;
  padding: 10px 12px;
  border-radius: 14px;
}

.transcript-entry--interviewer p {
  background: #f1f8fb;
  border-top-left-radius: 6px;
}

.transcript-entry--subject {
  justify-self: end;
}

.transcript-entry--subject p {
  background: #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.22);
  border-top-right-radius: 6px;
}

.transcript-entry--system {
  max-width: 100%;
}

.transcript-entry--system p {
  background: rgba(11, 114, 136, 0.08);
  color: var(--accent-strong);
}

.inline-alert {
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(182, 78, 61, 0.1);
  color: var(--alert);
}

.round-actions {
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid rgba(157, 189, 202, 0.24);
}

.round-actions--compact {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 180px;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border: 1px solid rgba(157, 189, 202, 0.18);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.68);
}

.round-actions__copy {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.round-limit-badge {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border-radius: 999px;
  border: 1px solid rgba(196, 93, 51, 0.28);
  background: rgba(255, 239, 219, 0.94);
  color: #9a3f24;
  font-size: 0.86rem;
  font-weight: 700;
}

.round-limit-badge strong {
  color: #c44f28;
  font-size: 1.02rem;
}

.round-limit-badge--warning {
  border-color: rgba(182, 78, 61, 0.3);
  background: rgba(182, 78, 61, 0.1);
  color: var(--alert);
}

.round-actions--compact .action-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.round-actions--compact .primary-action,
.round-actions--compact .secondary-action {
  width: 100%;
  min-width: 0;
  white-space: normal;
}

.history-item {
  display: grid;
  gap: 8px;
  padding: 12px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.22);
}

.history-item__tags {
  display: grid;
  gap: 8px;
  justify-items: start;
  min-width: 0;
}

.history-item__tags .tag-chip {
  max-width: min(100%, 520px);
  min-height: 28px;
  height: auto;
  padding-top: 6px;
  padding-bottom: 6px;
  align-items: flex-start;
  overflow: visible;
  text-align: left;
  text-overflow: clip;
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.status-chip--idle {
  background: rgba(91, 113, 121, 0.12);
  color: var(--text-muted);
}

.status-chip--active,
.status-chip--listening,
.status-chip--running,
.status-chip--partial,
.status-chip--analysis,
.status-chip--judgement,
.status-chip--ready {
  background: rgba(11, 114, 136, 0.12);
  color: var(--accent-strong);
}

.status-chip--loading,
.status-chip--connecting,
.status-chip--stopping {
  background: rgba(192, 123, 25, 0.12);
  color: var(--warn);
}

.status-chip--ended {
  background: rgba(35, 125, 77, 0.12);
  color: var(--safe);
}

.status-chip--unavailable,
.status-chip--unsupported,
.status-chip--error {
  background: rgba(182, 78, 61, 0.12);
  color: var(--alert);
}

.analysis-hero {
  padding: clamp(16px, 1.8vw, 22px);
  align-items: center;
  gap: clamp(16px, 1.8vw, 24px);
}

.analysis-score {
  display: grid;
  place-items: center;
  width: 176px;
  min-width: 176px;
  aspect-ratio: 1;
  padding: 14px;
  border-radius: 50%;
  background: conic-gradient(
    var(--accent) var(--score-angle),
    rgba(157, 189, 202, 0.22) 0deg
  );
}

.analysis-score__inner {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #ffffff;
  color: var(--text-main);
}

.analysis-score__inner strong {
  font-size: 2rem;
}

.timeline-strip {
  display: grid;
  gap: 14px;
  padding: 18px;
}

.timeline-strip__item {
  display: grid;
  gap: 6px;
  padding: 14px 16px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.22);
}

.timeline-strip__item span,
.timeline-strip__item p {
  color: var(--text-muted);
}

.timeline-strip__item strong {
  color: var(--text-main);
}

.finding-item {
  display: grid;
  gap: 8px;
  padding: 16px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.22);
}

.finding-item--alert {
  border-left: 4px solid var(--alert);
  background: #fff3ef;
}

.finding-item--warn {
  border-left: 4px solid var(--warn);
  background: #fff7e9;
}

.finding-item--info {
  border-left: 4px solid var(--accent);
}

.verdict-grid {
  display: grid;
  gap: 10px;
  margin-top: 0;
}

.verdict-button {
  justify-content: center;
  background: #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.22);
}

.verdict-button.is-active {
  color: #ffffff;
}

.verdict-button--alert.is-active {
  background: linear-gradient(135deg, var(--alert), #d96d57);
}

.verdict-button--warn.is-active {
  background: linear-gradient(135deg, var(--warn), #e2aa4d);
}

.verdict-button--safe.is-active {
  background: linear-gradient(135deg, var(--safe), #4ca36f);
}

.reason-box {
  display: grid;
  gap: 8px;
  margin-top: 0;
}

.reason-box span {
  font-weight: 700;
  color: var(--text-main);
}

.reason-box textarea {
  min-height: 132px;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid rgba(157, 189, 202, 0.3);
  background: #ffffff;
  color: var(--text-main);
  font: inherit;
  resize: vertical;
}

.reason-box textarea:focus {
  outline: none;
  border-color: rgba(11, 114, 136, 0.4);
}

.reason-meta {
  margin-top: 0;
}

.evidence-list,
.warning-list {
  display: grid;
  gap: 8px;
}

.evidence-item,
.warning-item {
  padding: 10px 12px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.22);
}

.summary-item--warning {
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 247, 233, 0.92);
  border: 1px solid rgba(192, 123, 25, 0.22);
}

.digest-kpis {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.warning-item {
  background: rgba(255, 243, 239, 0.92);
  border-color: rgba(182, 78, 61, 0.18);
}

.completion-layout {
  gap: 18px;
}

.completion-hero {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  justify-content: start;
  padding: clamp(16px, 1.8vw, 22px);
  border-radius: clamp(20px, 1.8vw, 24px);
  background:
    linear-gradient(135deg, rgba(11, 114, 136, 0.1), rgba(255, 255, 255, 0.96)),
    var(--surface-subtle);
  border: 1px solid rgba(157, 189, 202, 0.22);
}

.completion-hero > div {
  min-width: 0;
}

.completion-hero h4 {
  overflow-wrap: anywhere;
  word-break: break-word;
}

.completion-hero p {
  max-width: 760px;
  overflow-wrap: anywhere;
}

.completion-seal {
  display: grid;
  place-items: center;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-bright));
  color: #ffffff;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.completion-grid {
  display: grid;
  min-width: 0;
  gap: 16px;
}

.completion-panel {
  min-width: 0;
  padding: clamp(14px, 1.5vw, 18px);
}

.completion-panel p,
.completion-panel strong,
.completion-panel .tag-row {
  min-width: 0;
  overflow-wrap: anywhere;
}

.completion-panel .tag-chip {
  max-width: 100%;
  overflow: visible;
  text-overflow: clip;
  white-space: normal;
  overflow-wrap: anywhere;
}

.judgement-pill--alert {
  background: rgba(182, 78, 61, 0.14);
  color: var(--alert);
}

.judgement-pill--warn {
  background: rgba(192, 123, 25, 0.16);
  color: var(--warn);
}

.judgement-pill--safe {
  background: rgba(35, 125, 77, 0.12);
  color: var(--safe);
}

.stage-switch-enter-active,
.stage-switch-leave-active {
  transition:
    opacity 0.24s ease,
    transform 0.24s ease;
}

.stage-switch-enter-from,
.stage-switch-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.stage-loading {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  min-height: 100vh;
  background:
    radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.74),
      transparent 46%
    ),
    rgba(236, 247, 250, 0.72);
  backdrop-filter: blur(12px);
}

.stage-loading__panel {
  display: grid;
  justify-items: center;
  gap: 18px;
  width: min(420px, 100%);
  padding: 28px;
  border-radius: 22px;
  text-align: center;
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.96),
      rgba(241, 250, 252, 0.94)
    ),
    #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.32);
  box-shadow:
    0 24px 60px rgba(14, 40, 48, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.82);
}

.round-limit-dialog {
  position: fixed;
  inset: 0;
  z-index: 1010;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(14, 32, 39, 0.34);
  backdrop-filter: blur(10px);
}

.round-limit-dialog__panel {
  display: grid;
  gap: 14px;
  width: min(420px, 100%);
  padding: 24px;
  border-radius: 20px;
  border: 1px solid rgba(196, 93, 51, 0.2);
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 22px 52px rgba(38, 82, 96, 0.18);
}

.round-limit-dialog__panel h4,
.round-limit-dialog__panel p {
  margin: 0;
}

.round-limit-dialog__panel h4 {
  color: #9a3f24;
  font-size: 1.16rem;
}

.round-limit-dialog__panel p:last-of-type {
  color: var(--text-muted);
  line-height: 1.5;
}

.round-limit-dialog__panel .action-row {
  justify-content: flex-end;
  margin-top: 4px;
}

.stage-loading__visual {
  position: relative;
  display: grid;
  place-items: center;
  width: 86px;
  height: 86px;
}

.stage-loading__ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    from 90deg,
    rgba(11, 114, 136, 0),
    rgba(32, 168, 197, 0.9),
    rgba(35, 125, 77, 0.7),
    rgba(11, 114, 136, 0)
  );
  animation: stage-loading-spin 1.2s linear infinite;
  -webkit-mask: radial-gradient(circle, transparent 57%, #000 59%);
  mask: radial-gradient(circle, transparent 57%, #000 59%);
}

.stage-loading__core {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background:
    radial-gradient(
      circle at 34% 30%,
      rgba(255, 255, 255, 0.95),
      transparent 28%
    ),
    linear-gradient(135deg, var(--accent), var(--accent-bright));
  box-shadow:
    0 0 0 10px rgba(11, 114, 136, 0.08),
    0 14px 28px rgba(11, 114, 136, 0.2);
  animation: stage-loading-pulse 1.4s ease-in-out infinite;
}

.stage-loading__spark {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 16px rgba(32, 168, 197, 0.7);
  animation: stage-loading-float 1.8s ease-in-out infinite;
}

.stage-loading__spark--a {
  top: 8px;
  right: 16px;
}

.stage-loading__spark--b {
  bottom: 10px;
  left: 14px;
  animation-delay: 0.24s;
}

.stage-loading__spark--c {
  right: 6px;
  bottom: 22px;
  animation-delay: 0.48s;
}

.stage-loading__copy {
  display: grid;
  gap: 6px;
}

.stage-loading__copy h4 {
  margin: 0;
  color: var(--text-main);
  font-size: 1.2rem;
}

.stage-loading__copy p:last-child {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.5;
}

.stage-loading__phrase {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-height: 38px;
  padding: 0 16px;
  border-radius: 999px;
  background: rgba(11, 114, 136, 0.08);
  color: var(--accent-strong);
  font-weight: 800;
}

.stage-loading__phrase span {
  animation: stage-loading-phrase 1.4s ease-in-out infinite;
}

.stage-loading__phrase i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  animation: stage-loading-dot 1s ease-in-out infinite;
}

.stage-loading__phrase i:nth-of-type(2) {
  animation-delay: 0.16s;
}

.stage-loading__phrase i:nth-of-type(3) {
  animation-delay: 0.32s;
}

.stage-loading-enter-active,
.stage-loading-leave-active {
  transition:
    opacity 0.22s ease,
    backdrop-filter 0.22s ease;
}

.stage-loading-enter-active .stage-loading__panel,
.stage-loading-leave-active .stage-loading__panel {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.stage-loading-enter-from,
.stage-loading-leave-to {
  opacity: 0;
  backdrop-filter: blur(0);
}

.stage-loading-enter-from .stage-loading__panel,
.stage-loading-leave-to .stage-loading__panel {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}

@keyframes stage-loading-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes stage-loading-pulse {
  0%,
  100% {
    transform: scale(0.96);
  }

  50% {
    transform: scale(1.08);
  }
}

@keyframes stage-loading-float {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.42;
  }

  50% {
    transform: translateY(-8px);
    opacity: 1;
  }
}

@keyframes stage-loading-phrase {
  0%,
  100% {
    opacity: 0.72;
    transform: translateY(1px);
  }

  50% {
    opacity: 1;
    transform: translateY(-1px);
  }
}

@keyframes stage-loading-dot {
  0%,
  80%,
  100% {
    transform: translateY(0);
    opacity: 0.36;
  }

  40% {
    transform: translateY(-5px);
    opacity: 1;
  }
}

@media (min-width: 960px) {
  .strategy-layout,
  .judgement-layout {
    grid-template-columns: minmax(300px, 0.82fr) minmax(420px, 1.18fr);
    align-items: stretch;
  }

  .interview-layout {
    grid-template-columns: minmax(420px, 0.92fr) minmax(430px, 1.08fr);
    align-items: stretch;
  }

  .transcript-panel--round {
    height: auto;
  }

  .verdict-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .history-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .analysis-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .timeline-strip {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .completion-grid {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.2fr) minmax(0, 0.9fr);
  }
}

@media (max-width: 959px) {
  .stage-card__progress-head,
  .stage-card__head,
  .sampling-console__head,
  .round-actions,
  .analysis-hero {
    flex-direction: column;
  }

  .completion-hero {
    grid-template-columns: 1fr;
    justify-items: start;
  }

  .progress-track {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .progress-step {
    min-height: auto;
  }

  .progress-step::after {
    display: none;
  }

  .analysis-score {
    width: 148px;
    min-width: 148px;
  }

  .sampling-console__stats,
  .sampling-console__detectors,
  .console-metrics {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .transcript-panel--round {
    max-height: none !important;
    overflow: visible;
  }

  .transcript-panel__scroll {
    overflow: visible;
    padding-right: 0;
  }

  .round-actions--compact {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 719px) {
  .stage-card {
    --stage-card-padding: 16px;
  }

  .stage-card__progress {
    padding-top: 18px;
    padding-bottom: 16px;
  }

  .stage-card__progress-head .progress-note,
  .progress-step__copy p {
    display: none;
  }

  .progress-track {
    gap: 10px;
  }

  .progress-step {
    gap: 10px;
    grid-template-columns: auto minmax(0, 1fr);
    padding: 10px;
    border-radius: 14px;
  }

  .progress-step__state {
    grid-column: 2;
    justify-self: start;
  }

  .progress-step__index {
    width: 30px;
    height: 30px;
    border-radius: 10px;
  }

  .progress-step__copy strong {
    font-size: 0.92rem;
  }

  .video-stage,
  .video-stage__feed,
  .video-stage__canvas {
    min-height: 240px;
  }

  .profile-grid,
  .digest-kpis,
  .round-summary-stack {
    grid-template-columns: 1fr;
  }

  .capture-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .capture-action {
    width: 100%;
  }

  .capture-toolbar__hint {
    text-align: left;
  }

  .action-row,
  .stage-chip-group {
    width: 100%;
  }

  .primary-action,
  .secondary-action,
  .verdict-button {
    width: 100%;
  }

  .action-row {
    flex-direction: column;
  }

  .video-stage__assist {
    right: 16px;
    max-width: none;
  }

  .sampling-console,
  .console-stat,
  .detector-chip,
  .console-summary,
  .console-entry {
    padding: 14px;
  }

  .sampling-console__stats,
  .sampling-console__detectors,
  .console-metrics {
    grid-template-columns: 1fr;
  }

  .analysis-score__inner strong {
    font-size: 1.65rem;
  }

  .completion-seal {
    width: 132px;
    height: 132px;
  }
}
</style>
