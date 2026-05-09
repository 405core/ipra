<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue';
import {
  requestFirstRoundStrategy,
  requestFollowupGuidance,
  uploadHumanOmniWindow,
  type ActionObservationPayload,
  type AsrPayload,
  type FollowupGuidanceResponse,
  type HumanOmniWindowSummaryPayload,
  type MultimodalAssessmentPayload,
  type PassengerProfilePayload,
  type QuestionAnswerPayload,
  type RiskAssessmentPayload,
  type TripProfilePayload,
} from '../app/ai-service';
import {
  createCInquirySession,
  submitCInquiryTurn,
  transcribeCInquiryAnswer,
  type CAsrResponse,
  type CInquirySessionPayload,
  type CInquiryTurnResponse,
} from '../app/c-inquiry-service';
import {
  createIdleRealtimeDetectionState,
  createRealtimeDetectionController,
  type RealtimeDetectionController,
  type RealtimeEvent,
  type RealtimeDetectionState,
} from '../app/realtime-mediapipe';
import { loadAuthSession } from '../auth';

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
type CVoiceRecorderPhase =
  | 'idle'
  | 'recording'
  | 'recorded'
  | 'unsupported'
  | 'error';

interface MockPassengerProfile {
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

interface TranscriptSeed {
  speaker: string;
  role: TranscriptRole;
  text: string;
  delayMs: number;
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
  focus: string;
  strategyNote: string;
  signal: string;
  questions: StrategyQuestion[];
  transcriptScript: TranscriptSeed[];
  transcripts: TranscriptEntry[];
  completed: boolean;
  durationSeconds: number;
  summary: string;
  uploadState: RoundUploadState;
  uploadErrorMessage: string;
  humanOmniWindow: HumanOmniWindowSummaryPayload | null;
  actionObservations: ActionObservationPayload[];
  recordedFileName: string;
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

interface FollowUpTheme {
  title: string;
  focus: string;
  strategyNote: (cue: string) => string;
  signal: (cue: string) => string;
  questions: (
    cue: string,
    roundNumber: number,
  ) => Array<Omit<StrategyQuestion, 'id'>>;
  transcript: (cue: string, roundNumber: number) => TranscriptSeed[];
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
const inspectorName = session?.user.realName || '普通员工';
const inspectorWorkId = session?.user.badgeNumber || 'EMP-0000';

const passengerProfile: MockPassengerProfile = {
  name: 'ZHANG WEI',
  alias: '张伟',
  documentId: 'E92834102',
  pnr: 'CX880-LAX',
  route: 'CX880 (HKG -> LAX)',
  seat: '12A / Business',
  eta: '预计 14:20 抵达',
  riskLevel: 'high',
  riskLabel: '高风险预警',
  summary:
    '最近 3 个月内存在异常行程组合，且与重点名单出现高重合度，需要通过多轮问询核验时间线与设备空窗。',
  observation: '10:45 至 10:50 出现终端记录空窗，且现场监控存在约 5 分钟断点。',
  tags: ['异常行程', '设备空窗', '名单重合', '需人工复核'],
};

const mockedPassengerSupplement: MockPassengerSupplement = {
  passengerId: 'pax-e92834102',
  age: 34,
  gender: 'male',
  nationality: '中国',
  occupation: '仓储调度员',
  monthlyIncome: '12000-18000 CNY',
  travelHistory: ['2026-01 深圳-香港当日往返', '2026-03 香港-洛杉矶公务行'],
  documents: {
    documentType: 'passport',
    visaStatus: 'B1/B2 valid',
    issuingCountry: 'CN',
  },
};

const mockedTripSupplement: MockTripSupplement = {
  purposeDeclared: '商务随行与设备交接',
  stayDays: 7,
  ticketType: '单程',
  returnTicketStatus: '未见返程票',
  companions: ['同行联系人待核验'],
  accommodation: 'LAX Transit Hotel (mock)',
  fundingSource: '本人承担',
};

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

const stageLoadingContent: Record<StageLoadingMode, StageLoadingContent> = {
  strategy: {
    eyebrow: 'Strategy Engine',
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
    eyebrow: 'Sampling Window',
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
    eyebrow: 'Follow-up Guidance',
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
    eyebrow: 'Human Review',
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

const followUpThemes: FollowUpTheme[] = [
  {
    title: '设备空窗复核',
    focus: '围绕终端空窗与异常上报追问',
    strategyNote: (cue) =>
      `上一轮对象提到“${cue}”，系统推断需要继续核验终端卡顿与上报链路是否闭环。`,
    signal: (cue) => `围绕“${cue}”的说明仍存在设备日志闭环缺口。`,
    questions: (cue, roundNumber) => [
      {
        title: `第 ${roundNumber} 轮 · 上报节点`,
        prompt: `上一轮您提到“${cue}”，请明确说明您是否在 10:45 至 10:50 期间向任何人报告过这一异常。`,
        objective: '核对异常上报对象与时间点。',
      },
      {
        title: '操作路径还原',
        prompt:
          '如果终端当时无法使用，请具体说明您改用了什么替代动作，是否离开过货架、工作台或扫描区。',
        objective: '复原设备异常后的真实行为路径。',
      },
      {
        title: '时长校验',
        prompt:
          '请量化您感知到的异常持续时间，是几秒、几十秒还是接近数分钟？为什么这样判断？',
        objective: '验证对象对异常持续时长的稳定性。',
      },
    ],
    transcript: (cue) => [
      {
        speaker: '系统',
        role: 'system',
        text: `第二轮追问已生成，重点复核“${cue}”与设备空窗的对应关系。`,
        delayMs: 800,
      },
      {
        speaker: '问询员',
        role: 'interviewer',
        text: `上一轮您提到“${cue}”，请先说明您当时有没有向值班员上报。`,
        delayMs: 1800,
      },
      {
        speaker: '张伟',
        role: 'subject',
        text: '没有正式上报，我当时以为只是短暂卡顿，想着等几秒恢复后再继续，所以没有离开工位。',
        delayMs: 3800,
      },
      {
        speaker: '问询员',
        role: 'interviewer',
        text: '如果只是短暂卡顿，为什么设备日志会形成接近 5 分钟的完整空窗？',
        delayMs: 6200,
      },
      {
        speaker: '张伟',
        role: 'subject',
        text: '我记得自己其实去旁边看过一次照明配电箱，大概几十秒，但没想到会影响这么久。',
        delayMs: 8600,
      },
    ],
  },
  {
    title: '现场同伴交叉核验',
    focus: '围绕旁证对象、同伴接触与区域移动追问',
    strategyNote: (cue) =>
      `系统基于“${cue}”判断对象可能隐去了现场旁证信息，需要继续核对共同在场人员与交接动作。`,
    signal: () => '对象开始补充新的在场人员信息，说明前述描述存在遗漏。',
    questions: (cue, roundNumber) => [
      {
        title: `第 ${roundNumber} 轮 · 共同在场人员`,
        prompt: `关于“${cue}”，请逐一说明在您附近的同事、设备管理员或保洁人员分别在做什么。`,
        objective: '识别可交叉验证的旁证对象。',
      },
      {
        title: '工位离开说明',
        prompt:
          '您是否曾离开工位、走到配电箱、通道口或监控盲区附近？请说明每次移动的原因与停留时长。',
        objective: '核验位置变动与监控断点是否相关。',
      },
      {
        title: '交接物品核实',
        prompt:
          '那段时间您是否接触过备用工牌、扫码枪、手写清单或临时记录表？这些物品是谁提供的？',
        objective: '追踪潜在交接痕迹。',
      },
    ],
    transcript: (cue) => [
      {
        speaker: '系统',
        role: 'system',
        text: `新一轮策略已切换到现场旁证复核，重点围绕“${cue}”展开。`,
        delayMs: 700,
      },
      {
        speaker: '问询员',
        role: 'interviewer',
        text: `您刚才提到“${cue}”，那当时附近还有谁能证明您确实在原工位？`,
        delayMs: 2000,
      },
      {
        speaker: '张伟',
        role: 'subject',
        text: '我记得赵强从通道口经过了一次，他手里拿着备用扫码枪，但我们没有正式交接。',
        delayMs: 4200,
      },
      {
        speaker: '问询员',
        role: 'interviewer',
        text: '您为什么先前没有提到赵强和备用扫码枪？这与终端空窗有什么关系？',
        delayMs: 6500,
      },
      {
        speaker: '张伟',
        role: 'subject',
        text: '因为我当时只是短暂看了一眼，没有真正接过去，后来想起来才觉得可能和设备异常有关。',
        delayMs: 9000,
      },
    ],
  },
  {
    title: '路径与权限追踪',
    focus: '围绕移动路径、权限物品与异常行为链追问',
    strategyNote: (cue) =>
      `系统从“${cue}”推导出需要继续核验对象是否接触过替代设备或进入过非固定作业区域。`,
    signal: () => '移动路径描述与工位停留说法出现张力，需要人工重点复核。',
    questions: (cue, roundNumber) => [
      {
        title: `第 ${roundNumber} 轮 · 路径地图`,
        prompt: `请以“${cue}”为起点，逐步说明您之后的移动路径，包含通道、货架编号和停留点。`,
        objective: '要求对象给出可比对的空间轨迹。',
      },
      {
        title: '替代设备来源',
        prompt:
          '如果您接触过备用扫码枪或纸质清单，请明确说明来源、接触时长，以及为何没有留下正式交接记录。',
        objective: '核对替代操作是否符合流程。',
      },
      {
        title: '权限边界说明',
        prompt:
          '您是否进入过非本人负责的区域、配电箱附近或监控盲区？若进入过，请说明原因和谁允许您这样做。',
        objective: '检查权限边界与行动动机。',
      },
    ],
    transcript: (cue) => [
      {
        speaker: '系统',
        role: 'system',
        text: `系统已将重点切换至路径与权限追踪，继续围绕“${cue}”核验。`,
        delayMs: 900,
      },
      {
        speaker: '问询员',
        role: 'interviewer',
        text: `请从“${cue}”开始，把您之后经过的区域和停留点完整复述出来。`,
        delayMs: 2200,
      },
      {
        speaker: '张伟',
        role: 'subject',
        text: '我先走到西侧通道口，又靠近过配电箱附近，之后回到货架前，但没有进入限制区域。',
        delayMs: 4600,
      },
      {
        speaker: '问询员',
        role: 'interviewer',
        text: '如果只是靠近配电箱，为何监控断点后您的位置在日志里仍然缺失？',
        delayMs: 7000,
      },
      {
        speaker: '张伟',
        role: 'subject',
        text: '可能是我在那里停留得比记忆中更久，但我没有想隐瞒，只是记不清具体秒数。',
        delayMs: 9800,
      },
    ],
  },
];

const currentStage = ref<WorkflowStage>('strategy');
const sessionId = ref(createSessionId());
const strategySummary = ref('');
const generatedQuestions = ref<StrategyQuestion[]>([]);
const strategyFocusAreas = ref<string[]>([]);
const strategyOperatorNote = ref('');
const strategyRiskAssessment = ref<RiskAssessmentPayload | null>(null);
const strategyGenerationCount = ref(0);
const isGeneratingStrategy = ref(false);
const isEndingSampling = ref(false);
const isRequestingGuidance = ref(false);
const strategyRequestError = ref('');
const roundServiceError = ref('');
const rounds = ref<InterviewRound[]>([]);
const currentRoundId = ref<string | null>(null);
const selectedJudgement = ref<FinalJudgement | null>(null);
const judgementReason = ref('');
const judgementBriefing = ref<JudgementBriefing | null>(null);
const isArchived = ref(false);
const archivedAt = ref('');
const archiveCode = ref('IPRA-ASK-20260503-014');
const stageLoadingMode = ref<StageLoadingMode | null>(null);
const stageLoadingPhraseIndex = ref(0);
const cMaxRounds = ref(3);
const cSession = ref<CInquirySessionPayload | null>(null);
const cTurnResponse = ref<CInquiryTurnResponse | null>(null);
const cAsrResponse = ref<CAsrResponse | null>(null);
const cTranscriptInput = ref(
  '朋友介绍我去当地赌场附近旅游，费用先用现金支付。',
);
const cStatusMessage = ref('尚未创建 C 模块会话，可直接使用下方示例文本验证。');
const cErrorMessage = ref('');
const cIsCreatingSession = ref(false);
const cIsSubmittingAnswer = ref(false);
const cRecorderPhase = ref<CVoiceRecorderPhase>('idle');
const cRecorderMessage = ref(
  '可选：录一段回答音频，后端 mock ASR 会读取音频元信息。',
);
const cRecordedAudio = ref<Blob | null>(null);
const cRecordedDurationMs = ref(0);

const videoElement = ref<HTMLVideoElement | null>(null);
const overlayCanvas = ref<HTMLCanvasElement | null>(null);
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
let transcriptTimeoutIds: number[] = [];
let samplingStartedAt = 0;
let realtimeDetectionController: RealtimeDetectionController | null = null;
let mediaRecorder: MediaRecorder | null = null;
let recordedChunks: Blob[] = [];
let recordingMimeType = '';
let cVoiceRecorder: MediaRecorder | null = null;
let cVoiceStream: MediaStream | null = null;
let cVoiceChunks: Blob[] = [];
let cVoiceMimeType = '';
let cVoiceStartedAt = 0;
let cVoiceTimerId: number | null = null;
let cVoiceDiscardRecording = false;
let stageLoadingTimerId: number | null = null;
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

const totalTranscriptCount = computed(() =>
  completedRounds.value.reduce(
    (count, round) => count + round.transcripts.length,
    0,
  ),
);

const totalSampleDuration = computed(() =>
  completedRounds.value.reduce((sum, round) => sum + round.durationSeconds, 0),
);

const strategyGenerated = computed(() => generatedQuestions.value.length > 0);
const canEnterInterview = computed(
  () => strategyGenerated.value && !isGeneratingStrategy.value,
);
const canStartSampling = computed(
  () =>
    samplingState.value.phase !== 'active' &&
    !isEndingSampling.value &&
    !isRequestingGuidance.value &&
    !isArchived.value,
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
    rounds.value.length > 1 &&
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
  const riskHints =
    judgementBriefing.value?.multimodalAssessment.riskHints || [];
  if (riskHints.length) {
    return riskHints.slice(0, 4);
  }

  const tags = completedRounds.value.flatMap((round) => [
    round.focus,
    round.signal,
  ]);
  return tags.slice(0, 4);
});

const cInquiryHistory = computed(
  () => cTurnResponse.value?.history || cSession.value?.history || [],
);

const cLatestRiskHints = computed(() => cTurnResponse.value?.riskHints || []);

const cCanSubmitAnswer = computed(() => {
  if (cIsCreatingSession.value || cIsSubmittingAnswer.value) {
    return false;
  }

  if (cSession.value?.status === 'completed') {
    return false;
  }

  return Boolean(cTranscriptInput.value.trim() || cRecordedAudio.value);
});

const cRoundLabel = computed(() => {
  if (!cSession.value) {
    return '未创建';
  }

  return `${cSession.value.currentRound}/${cSession.value.maxRounds}`;
});

const cRecorderPhaseLabel = computed(() => {
  switch (cRecorderPhase.value) {
    case 'recording':
      return `录音中 ${formatDuration(Math.ceil(cRecordedDurationMs.value / 1000))}`;
    case 'recorded':
      return `已录制 ${formatDuration(Math.ceil(cRecordedDurationMs.value / 1000))}`;
    case 'unsupported':
      return '浏览器不支持';
    case 'error':
      return '录音失败';
    default:
      return '未录音';
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

function deriveDestination() {
  const match = passengerProfile.route.match(/->\s*([A-Z]{3})/);
  if (match?.[1]) {
    return `美国洛杉矶 ${match[1]}`;
  }

  return passengerProfile.route;
}

function buildPassengerPayload(): PassengerProfilePayload {
  return {
    passengerId: mockedPassengerSupplement.passengerId,
    name: passengerProfile.alias,
    age: mockedPassengerSupplement.age,
    gender: mockedPassengerSupplement.gender,
    nationality: mockedPassengerSupplement.nationality,
    occupation: mockedPassengerSupplement.occupation,
    monthlyIncome: mockedPassengerSupplement.monthlyIncome,
    travelHistory: [...mockedPassengerSupplement.travelHistory],
    documents: {
      ...mockedPassengerSupplement.documents,
      documentNumber: passengerProfile.documentId,
      pnr: passengerProfile.pnr,
      seat: passengerProfile.seat,
    },
  };
}

function buildTripPayload(): TripProfilePayload {
  return {
    destination: deriveDestination(),
    purposeDeclared: mockedTripSupplement.purposeDeclared,
    stayDays: mockedTripSupplement.stayDays,
    ticketType: mockedTripSupplement.ticketType,
    returnTicketStatus: mockedTripSupplement.returnTicketStatus,
    companions: [...mockedTripSupplement.companions],
    accommodation: mockedTripSupplement.accommodation,
    fundingSource: mockedTripSupplement.fundingSource,
  };
}

function buildKnownFacts() {
  return [
    passengerProfile.summary,
    passengerProfile.observation,
    ...passengerProfile.tags.map((tag) => `风险标签：${tag}`),
  ];
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

function createOpeningTranscriptScript(questions: StrategyQuestion[]) {
  const primaryPrompt =
    questions[0]?.prompt ||
    '请先按时间顺序复述 10:40 到 10:50 之间您在西区仓库的具体动作。';
  const secondaryPrompt =
    questions[1]?.prompt ||
    '那为什么 10:45 到 10:50 之间没有任何终端操作记录？';

  return [
    {
      speaker: '系统',
      role: 'system',
      text: '首轮采样已启动，视频流与话筒输入正在同步记录，并等待 HumanOmni 窗口摘要。',
      delayMs: 700,
    },
    {
      speaker: '问询员',
      role: 'interviewer',
      text: primaryPrompt,
      delayMs: 1800,
    },
    {
      speaker: passengerProfile.alias,
      role: 'subject',
      text: '10:40 左右我在西区货架做常规清点，后面终端突然像卡住了一样，我就停了一下。',
      delayMs: 4000,
    },
    {
      speaker: '问询员',
      role: 'interviewer',
      text: secondaryPrompt,
      delayMs: 6300,
    },
    {
      speaker: passengerProfile.alias,
      role: 'subject',
      text: '我记得灯闪了一下，可能顺手去看了下附近情况，但我当时没觉得这是严重异常。',
      delayMs: 9000,
    },
  ] satisfies TranscriptSeed[];
}

function buildOpeningRound() {
  return {
    id: 'round-1',
    roundNumber: 1,
    title: '第 1 轮 · 首轮策略执行',
    focus: strategyFocusAreas.value.length
      ? strategyFocusAreas.value.join(' / ')
      : '首轮关注：时间线与终端空窗',
    strategyNote:
      strategyOperatorNote.value ||
      strategySummary.value ||
      '系统默认围绕时间线断点、设备空窗与照明波动启动首轮问询。',
    signal:
      strategyRiskAssessment.value?.summary ||
      '对象需先对 10:45 至 10:50 的时间线和设备空窗给出稳定说明。',
    questions: generatedQuestions.value.map((question) => ({ ...question })),
    transcriptScript: createOpeningTranscriptScript(generatedQuestions.value),
    transcripts: [],
    completed: false,
    durationSeconds: 0,
    summary: '',
    uploadState: 'idle',
    uploadErrorMessage: '',
    humanOmniWindow: null,
    actionObservations: [],
    recordedFileName: '',
    asrText: '',
  } satisfies InterviewRound;
}

function getRoundCue(round?: InterviewRound | null) {
  if (!round) {
    return passengerProfile.tags[1];
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

function createFollowupTranscriptScript(
  roundNumber: number,
  focus: string,
  questions: StrategyQuestion[],
  previousRound: InterviewRound,
  operatorNote: string,
) {
  const cue = getRoundCue(previousRound);
  const primaryPrompt = questions[0]?.prompt || `请继续说明 ${focus}。`;
  const secondaryPrompt =
    questions[1]?.prompt || '请补充上一轮中遗漏的关键时间节点。';

  return [
    {
      speaker: '系统',
      role: 'system',
      text: `第 ${roundNumber} 轮追问已生成，重点关注 ${focus}。${operatorNote ? ` 提示：${operatorNote}` : ''}`,
      delayMs: 700,
    },
    {
      speaker: '问询员',
      role: 'interviewer',
      text: primaryPrompt,
      delayMs: 1900,
    },
    {
      speaker: passengerProfile.alias,
      role: 'subject',
      text: `关于“${cue}”，我需要补充的是当时情况比上一轮更复杂，我前面漏掉了部分细节。`,
      delayMs: 4300,
    },
    {
      speaker: '问询员',
      role: 'interviewer',
      text: secondaryPrompt,
      delayMs: 6700,
    },
    {
      speaker: passengerProfile.alias,
      role: 'subject',
      text: `我当时主要围绕${focus}处理，相关动作和停留时间可能和我最初描述不完全一致。`,
      delayMs: 9300,
    },
  ] satisfies TranscriptSeed[];
}

function buildFollowUpRoundFromResponse(
  response: FollowupGuidanceResponse,
  roundNumber: number,
  previousRound: InterviewRound,
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
    transcriptScript: createFollowupTranscriptScript(
      roundNumber,
      focus,
      questions,
      previousRound,
      response.operatorNote,
    ),
    transcripts: [],
    completed: false,
    durationSeconds: 0,
    summary: '',
    uploadState: 'idle',
    uploadErrorMessage: '',
    humanOmniWindow: null,
    actionObservations: [],
    recordedFileName: '',
    asrText: '',
  } satisfies InterviewRound;
}

function enterInterviewStage() {
  if (!canEnterInterview.value) {
    return;
  }

  currentStage.value = 'interview';
  roundServiceError.value = '';
  judgementBriefing.value = null;

  if (!rounds.value.length) {
    const openingRound = buildOpeningRound();
    rounds.value = [openingRound];
    currentRoundId.value = openingRound.id;
  }
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
  return round.transcripts
    .filter((entry) => entry.role === 'subject')
    .map((entry) => entry.text)
    .join(' ');
}

function buildQaHistory() {
  return rounds.value
    .filter((round) => round.completed && round.uploadState === 'uploaded')
    .map((round) => {
      const answerText = collectSubjectTranscript(round);
      return {
        questionId: round.questions[0]?.id || null,
        roundNo: round.roundNumber,
        question: round.questions[0]?.prompt || round.title,
        answerText,
        answerStartSeconds: 0,
        answerEndSeconds: Math.max(1, round.durationSeconds),
      } satisfies QuestionAnswerPayload;
    });
}

function buildRoundAsrPayload(round: InterviewRound): AsrPayload {
  const text = collectSubjectTranscript(round);
  if (!text) {
    return {
      status: 'not_connected',
      provider: 'frontend-mock',
      model: 'frontend-mock-transcript',
      language: 'zh-CN',
      text: '',
      segments: [],
      words: [],
    };
  }

  return {
    status: 'provided',
    provider: 'frontend-mock',
    model: 'frontend-mock-transcript',
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

function buildFollowupPayload(roundNumber: number, round: InterviewRound) {
  return {
    sessionId: sessionId.value,
    roundNo: roundNumber,
    passengerProfile: buildPassengerPayload(),
    tripProfile: buildTripPayload(),
    qaHistory: buildQaHistory(),
    humanOmniWindows: buildHumanOmniWindows(),
    actionObservations: buildActionObservationHistory(),
    asr: buildRoundAsrPayload(round),
    constraints: buildOutputConstraints(3),
  };
}

function buildSummarizeWindowFormData(round: InterviewRound, file: File) {
  const windowId = createWindowId(round);
  const formData = new FormData();
  formData.append('file', file, file.name);
  formData.append('sessionId', sessionId.value);
  formData.append('questionId', round.questions[0]?.id || round.id);
  formData.append('windowId', windowId);
  formData.append('modal', 'video_audio');
  formData.append('startSeconds', '0');
  formData.append('endSeconds', String(Math.max(1, round.durationSeconds)));
  return formData;
}

function clearTranscriptTimers() {
  transcriptTimeoutIds.forEach((timeoutId) => {
    window.clearTimeout(timeoutId);
  });
  transcriptTimeoutIds = [];
}

function clearStageLoadingTimer() {
  if (stageLoadingTimerId !== null) {
    window.clearInterval(stageLoadingTimerId);
    stageLoadingTimerId = null;
  }
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
  clearTranscriptTimers();
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

function scheduleMockTranscripts(round: InterviewRound) {
  clearTranscriptTimers();
  round.transcripts = [];
  round.summary = '';

  round.transcriptScript.forEach((seed, index) => {
    const timeoutId = window.setTimeout(() => {
      if (
        currentRound.value?.id !== round.id ||
        samplingState.value.phase !== 'active'
      ) {
        return;
      }

      round.transcripts.push({
        id: `${round.id}-transcript-${index + 1}`,
        speaker: seed.speaker,
        role: seed.role,
        time: formatTranscriptTime(samplingState.value.elapsedSeconds),
        text: seed.text,
      });
    }, seed.delayMs);

    transcriptTimeoutIds.push(timeoutId);
  });
}

async function generateStrategy() {
  if (isGeneratingStrategy.value) {
    return;
  }

  isGeneratingStrategy.value = true;
  strategyRequestError.value = '';
  openStageLoading('strategy');

  try {
    const response = await requestFirstRoundStrategy({
      sessionId: sessionId.value,
      passengerProfile: buildPassengerPayload(),
      tripProfile: buildTripPayload(),
      knownFacts: buildKnownFacts(),
      constraints: buildOutputConstraints(6),
    });

    if (!response.questions.length) {
      throw new Error('AI-Service 未返回首轮问题。');
    }

    strategySummary.value =
      response.strategy.goal || response.riskAssessment.summary;
    strategyFocusAreas.value = [...response.strategy.focusAreas];
    strategyOperatorNote.value = response.operatorNote;
    strategyRiskAssessment.value = response.riskAssessment;
    generatedQuestions.value = response.questions.map((question, index) =>
      createStrategyQuestionFromApi(question, index),
    );
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
  round.asrText = '';

  try {
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
    scheduleMockTranscripts(round);
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
  openStageLoading('samplingUpload');

  const collectedDuration = Math.max(1, samplingState.value.elapsedSeconds);
  const capturedEvents = [...realtimeDetection.value.events];
  round.durationSeconds = collectedDuration;
  round.completed = round.transcripts.length > 0;
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
    samplingState.value = {
      ...createIdleSamplingState(),
      phase: round.completed ? 'ended' : 'idle',
      permissionGranted: true,
    };
  }

  if (!round.completed) {
    round.uploadState = 'error';
    round.uploadErrorMessage = '本轮未采集到可用转写内容，请重新采样。';
    roundServiceError.value = round.uploadErrorMessage;
    isEndingSampling.value = false;
    closeStageLoading('samplingUpload');
    return;
  }

  if (!recordedFile) {
    round.uploadState = 'error';
    round.uploadErrorMessage =
      round.uploadErrorMessage ||
      '未生成可上传的音视频片段，请检查浏览器录制能力后重试。';
    roundServiceError.value = round.uploadErrorMessage;
    isEndingSampling.value = false;
    closeStageLoading('samplingUpload');
    return;
  }

  round.uploadState = 'uploading';
  round.uploadErrorMessage = '';

  try {
    const response = await uploadHumanOmniWindow(
      buildSummarizeWindowFormData(round, recordedFile),
    );
    round.humanOmniWindow = response.humanOmniWindow;
    round.recordedFileName = response.uploadedFile.filename;
    round.uploadState = 'uploaded';
    round.uploadErrorMessage = '';
    updateCurrentRoundSummary(round);
  } catch (error) {
    round.uploadState = 'error';
    round.uploadErrorMessage = normalizeErrorMessage(
      error,
      'HumanOmni 窗口摘要上传失败，请检查 AI-Service 后重试。',
    );
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

  isRequestingGuidance.value = true;
  roundServiceError.value = '';
  openStageLoading('nextRound');

  try {
    const nextRoundNumber = round.roundNumber + 1;
    const response = await requestFollowupGuidance(
      buildFollowupPayload(nextRoundNumber, round),
    );

    if (!response.followupGuidance.length) {
      throw new Error('AI-Service 未返回下一轮追问建议。');
    }

    const nextRound = buildFollowUpRoundFromResponse(
      response,
      nextRoundNumber,
      round,
    );
    rounds.value.push(nextRound);
    currentRoundId.value = nextRound.id;
    resetSamplingIndicators();
    resetRealtimeDetectionViewState();
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
    return;
  }

  isRequestingGuidance.value = true;
  roundServiceError.value = '';
  openStageLoading('judgementBriefing');

  try {
    const response = await requestFollowupGuidance(
      buildFollowupPayload(round.roundNumber + 1, round),
    );
    judgementBriefing.value = {
      multimodalAssessment: response.multimodalAssessment,
      operatorNote: response.operatorNote,
      warnings: [...response.warnings],
      generatedAt: new Date().toLocaleTimeString('zh-CN', {
        hour12: false,
      }),
    };
    currentStage.value = 'judgement';
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

function archiveCase() {
  if (!canArchive.value) {
    return;
  }

  archivedAt.value = new Date().toLocaleString('zh-CN', {
    hour12: false,
  });
  isArchived.value = true;
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

  return new Date(timestamp).toLocaleTimeString('zh-CN', {
    hour12: false,
  });
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

function buildCInquiryPassenger() {
  return {
    name: passengerProfile.alias,
    documentId: passengerProfile.documentId,
    destination: deriveDestination(),
    purpose: mockedTripSupplement.purposeDeclared,
    riskLevel: passengerProfile.riskLabel,
  };
}

function buildCInitialQuestion() {
  return (
    generatedQuestions.value[0]?.prompt ||
    `${passengerProfile.alias}，请说明本次前往${deriveDestination()}的主要目的、停留时间和费用来源。`
  );
}

function buildCSignals() {
  const events = realtimeDetection.value.events
    .filter((event) => event.tone === 'warn' || event.tone === 'alert')
    .slice(-2);

  return events.map((event) => ({
    source: 'frontend-mediapipe',
    label: event.title,
    severity: event.tone === 'alert' ? 0.86 : 0.72,
    at: event.displayTime,
  }));
}

function syncCSessionFromTurn(response: CInquiryTurnResponse) {
  cTurnResponse.value = response;

  if (!cSession.value) {
    return;
  }

  cSession.value = {
    ...cSession.value,
    currentRound: response.currentRound,
    currentQuestion: response.currentQuestion,
    status: response.status,
    history: response.history,
    updatedAt: new Date().toISOString(),
  };
}

async function createCSession(options: { resetTurn?: boolean } = {}) {
  if (cIsCreatingSession.value) {
    return cSession.value;
  }

  cIsCreatingSession.value = true;
  cErrorMessage.value = '';

  try {
    const session = await createCInquirySession({
      passenger: buildCInquiryPassenger(),
      maxRounds: cMaxRounds.value,
      initialQuestion: buildCInitialQuestion(),
    });

    cSession.value = session;
    if (options.resetTurn !== false) {
      cTurnResponse.value = null;
      cAsrResponse.value = null;
    }
    cStatusMessage.value = `C 模块会话已创建：${session.sessionId}`;
    return session;
  } catch (error) {
    cErrorMessage.value = normalizeErrorMessage(error, 'C 模块会话创建失败。');
    return null;
  } finally {
    cIsCreatingSession.value = false;
  }
}

async function resetCSession() {
  cSession.value = null;
  cTurnResponse.value = null;
  cAsrResponse.value = null;
  cErrorMessage.value = '';
  cStatusMessage.value = '已重置 C 模块验证台，可重新创建会话。';
  resetCVoiceRecording();
}

async function submitCAnswer() {
  if (!cCanSubmitAnswer.value) {
    return;
  }

  cIsSubmittingAnswer.value = true;
  cErrorMessage.value = '';

  try {
    let session = cSession.value;
    if (!session) {
      session = await createCSession({ resetTurn: false });
    }

    if (!session) {
      return;
    }

    const asr = await transcribeCInquiryAnswer({
      fallbackTranscript: cTranscriptInput.value,
      audio: cRecordedAudio.value,
      durationMs: cRecordedDurationMs.value,
    });
    cAsrResponse.value = asr;

    const response = await submitCInquiryTurn(session.sessionId, {
      answerTranscript: asr.transcript,
      signals: buildCSignals(),
    });
    syncCSessionFromTurn(response);

    cStatusMessage.value = response.shouldStop
      ? `已达到 ${response.maxRounds} 轮上限，C 模块轮次熔断已触发。`
      : `第 ${response.currentRound} 轮已提交，C 模块已生成下一轮追问。`;
  } catch (error) {
    cErrorMessage.value = normalizeErrorMessage(error, 'C 模块回答提交失败。');
  } finally {
    cIsSubmittingAnswer.value = false;
  }
}

function clearCVoiceTimer() {
  if (cVoiceTimerId !== null) {
    window.clearInterval(cVoiceTimerId);
    cVoiceTimerId = null;
  }
}

function chooseCVoiceMimeType() {
  if (
    typeof MediaRecorder === 'undefined' ||
    typeof MediaRecorder.isTypeSupported !== 'function'
  ) {
    return '';
  }

  const audioTypes = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'];
  return (
    audioTypes.find((mimeType) => MediaRecorder.isTypeSupported(mimeType)) || ''
  );
}

function stopCVoiceTracks() {
  cVoiceStream?.getTracks().forEach((track) => track.stop());
  cVoiceStream = null;
}

function stopCVoiceRuntime() {
  clearCVoiceTimer();
  stopCVoiceTracks();
  cVoiceRecorder = null;
}

async function startCVoiceRecording() {
  if (cRecorderPhase.value === 'recording') {
    return;
  }

  if (
    typeof navigator === 'undefined' ||
    !navigator.mediaDevices?.getUserMedia
  ) {
    cRecorderPhase.value = 'unsupported';
    cRecorderMessage.value =
      '当前浏览器不支持麦克风采集，请使用手动转写文本验证。';
    return;
  }

  if (typeof MediaRecorder === 'undefined') {
    cRecorderPhase.value = 'unsupported';
    cRecorderMessage.value =
      '当前浏览器不支持 MediaRecorder，请使用手动转写文本验证。';
    return;
  }

  resetCVoiceRecording();

  try {
    cVoiceStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    cVoiceMimeType = chooseCVoiceMimeType();
    cVoiceDiscardRecording = false;
    cVoiceRecorder = new MediaRecorder(
      cVoiceStream,
      cVoiceMimeType ? { mimeType: cVoiceMimeType } : undefined,
    );
    cVoiceChunks = [];

    cVoiceRecorder.addEventListener('dataavailable', (event) => {
      if (event.data.size > 0) {
        cVoiceChunks.push(event.data);
      }
    });

    cVoiceRecorder.addEventListener('stop', () => {
      clearCVoiceTimer();
      if (cVoiceDiscardRecording) {
        cVoiceDiscardRecording = false;
        cVoiceChunks = [];
        stopCVoiceRuntime();
        return;
      }

      cRecordedDurationMs.value = Math.max(0, Date.now() - cVoiceStartedAt);
      cRecordedAudio.value = cVoiceChunks.length
        ? new Blob(cVoiceChunks, { type: cVoiceMimeType || 'audio/webm' })
        : null;
      cRecorderPhase.value = cRecordedAudio.value ? 'recorded' : 'idle';
      cRecorderMessage.value = cRecordedAudio.value
        ? `已生成 ${Math.round(cRecordedAudio.value.size / 1024)} KB 音频片段，可随本轮回答提交。`
        : '未采集到有效音频，仍可使用手动转写文本提交。';
      stopCVoiceRuntime();
    });

    cVoiceStartedAt = Date.now();
    cRecordedDurationMs.value = 0;
    cRecordedAudio.value = null;
    cRecorderPhase.value = 'recording';
    cRecorderMessage.value =
      '录音进行中，结束后会把音频元信息提交给 mock ASR。';
    cVoiceTimerId = window.setInterval(() => {
      cRecordedDurationMs.value = Math.max(0, Date.now() - cVoiceStartedAt);
    }, 250);
    cVoiceRecorder.start();
  } catch (error) {
    stopCVoiceRuntime();
    cRecorderPhase.value = 'error';
    cRecorderMessage.value = normalizeErrorMessage(
      error,
      '麦克风调用失败，请使用手动转写文本验证。',
    );
  }
}

function stopCVoiceRecording() {
  if (cVoiceRecorder?.state === 'recording') {
    cVoiceDiscardRecording = false;
    cVoiceRecorder.stop();
    return;
  }

  stopCVoiceRuntime();
}

function resetCVoiceRecording() {
  if (cVoiceRecorder?.state === 'recording') {
    cVoiceDiscardRecording = true;
    cVoiceRecorder.stop();
  } else {
    stopCVoiceRuntime();
  }

  cVoiceChunks = [];
  cVoiceMimeType = '';
  cRecordedAudio.value = null;
  cRecordedDurationMs.value = 0;
  cRecorderPhase.value = 'idle';
  cRecorderMessage.value =
    '可选：录一段回答音频，后端 mock ASR 会读取音频元信息。';
}

onBeforeUnmount(() => {
  stopSamplingResources();
  stopCVoiceRuntime();
  closeStageLoading();
});
</script>

<template>
  <section class="ask-page">
    <header class="workflow-hero">
      <div>
        <p class="section-eyebrow">Inquiry Flow</p>
        <h2>辅助问询流程控制台</h2>
        <p class="section-copy">
          使用单一主工作面管理策略生成、多轮采样和人工判定。当前已对接
          AI-Service
          三个接口，摄像头与话筒采样为真实浏览器调用，缺失字段仅在前端做显式
          mock 补齐。
        </p>
      </div>

      <div class="workflow-hero__meta">
        <div class="meta-chip">
          <span>CASE</span>
          <strong>{{ archiveCode }}</strong>
        </div>
        <div class="meta-chip">
          <span>检查员</span>
          <strong>{{ inspectorName }} · {{ inspectorWorkId }}</strong>
        </div>
      </div>
    </header>

    <section class="c-demo-panel" data-testid="c-voice-llm-demo">
      <header class="c-demo-panel__head">
        <div>
          <p class="section-eyebrow">C Module Demo</p>
          <h3>C 语音 + LLM 验证台</h3>
          <p class="section-copy">
            这里直接调用 Go 后端 mock 接口，验证模拟 ASR、多轮追问、风险关键词和
            maxRounds 轮次熔断，不依赖 AI-Service 或 HumanOmni。
          </p>
        </div>

        <div class="stage-chip-group">
          <span
            class="status-chip"
            :class="
              cSession?.status === 'completed'
                ? 'status-chip--ended'
                : 'status-chip--active'
            "
          >
            {{ cSession ? cSession.status : 'not-started' }}
          </span>
          <span class="soft-chip">轮次 {{ cRoundLabel }}</span>
        </div>
      </header>

      <div class="c-demo-grid">
        <section class="c-demo-block">
          <div class="c-demo-block__head">
            <div>
              <span class="meta-label">Session</span>
              <strong>会话与当前问题</strong>
            </div>
            <label class="c-round-control">
              <span>上限</span>
              <input
                v-model.number="cMaxRounds"
                type="number"
                min="1"
                max="10"
                :disabled="Boolean(cSession)"
              />
            </label>
          </div>

          <p class="workspace-summary">{{ cStatusMessage }}</p>

          <div class="summary-stack summary-stack--compact">
            <div class="summary-item">
              <span class="meta-label">Session ID</span>
              <strong>{{ cSession?.sessionId || '待创建' }}</strong>
            </div>
            <div class="summary-item">
              <span class="meta-label">当前问题</span>
              <p>{{ cSession?.currentQuestion || buildCInitialQuestion() }}</p>
            </div>
          </div>

          <div class="action-row">
            <button
              class="secondary-action"
              type="button"
              :disabled="cIsCreatingSession || Boolean(cSession)"
              @click="createCSession()"
            >
              {{ cIsCreatingSession ? '创建中...' : '创建 C 会话' }}
            </button>
            <button
              class="secondary-action"
              type="button"
              @click="resetCSession"
            >
              重置验证台
            </button>
          </div>
        </section>

        <section class="c-demo-block">
          <div class="c-demo-block__head">
            <div>
              <span class="meta-label">Mock ASR</span>
              <strong>语音采集 / 模拟转写</strong>
            </div>
            <span class="soft-chip">{{ cRecorderPhaseLabel }}</span>
          </div>

          <div class="c-recorder-row">
            <button
              class="secondary-action"
              type="button"
              :disabled="cRecorderPhase === 'recording'"
              @click="startCVoiceRecording"
            >
              开始录音
            </button>
            <button
              class="secondary-action"
              type="button"
              :disabled="cRecorderPhase !== 'recording'"
              @click="stopCVoiceRecording"
            >
              结束录音
            </button>
          </div>

          <p class="workspace-summary">{{ cRecorderMessage }}</p>

          <label class="c-transcript-box">
            <span>模拟转写文本</span>
            <textarea
              v-model="cTranscriptInput"
              rows="5"
              placeholder="输入或保留一段旅客回答，用于 mock ASR 和 LLM 追问。"
            ></textarea>
          </label>

          <div v-if="cAsrResponse" class="summary-item">
            <span class="meta-label">ASR 返回</span>
            <p>{{ cAsrResponse.transcript }}</p>
            <div class="tag-row">
              <span class="tag-chip tag-chip--passive"
                >置信度 {{ Math.round(cAsrResponse.confidence * 100) }}%</span
              >
              <span class="tag-chip tag-chip--passive">{{
                cAsrResponse.language
              }}</span>
              <span class="tag-chip tag-chip--passive"
                >{{ cAsrResponse.audioBytes }} bytes</span
              >
            </div>
          </div>

          <button
            class="primary-action"
            type="button"
            :disabled="!cCanSubmitAnswer"
            @click="submitCAnswer"
          >
            {{
              cIsSubmittingAnswer
                ? '提交中...'
                : cSession
                  ? '提交本轮回答'
                  : '创建会话并提交'
            }}
          </button>
        </section>

        <section class="c-demo-block">
          <div class="c-demo-block__head">
            <div>
              <span class="meta-label">Mock LLM</span>
              <strong>追问结果与熔断</strong>
            </div>
            <span
              class="status-chip"
              :class="
                cTurnResponse?.shouldStop
                  ? 'status-chip--ended'
                  : 'status-chip--idle'
              "
            >
              {{ cTurnResponse?.shouldStop ? 'shouldStop: true' : '等待提交' }}
            </span>
          </div>

          <div v-if="cLatestRiskHints.length" class="tag-row">
            <span
              v-for="hint in cLatestRiskHints"
              :key="hint"
              class="tag-chip tag-chip--passive"
            >
              {{ hint }}
            </span>
          </div>

          <div class="summary-stack summary-stack--compact">
            <div class="summary-item">
              <span class="meta-label">下一轮问题</span>
              <p>
                {{ cTurnResponse?.nextQuestion || '提交回答后在这里显示。' }}
              </p>
            </div>
            <div class="summary-item">
              <span class="meta-label">生成依据</span>
              <p>
                {{
                  cTurnResponse?.rationale || '等待 mock LLM 返回 rationale。'
                }}
              </p>
            </div>
          </div>

          <div class="c-history-list">
            <article
              v-for="turn in cInquiryHistory"
              :key="`${turn.round}-${turn.createdAt}`"
              class="history-item"
            >
              <div class="history-item__meta">
                <strong>第 {{ turn.round }} 轮</strong>
                <span>{{ turn.createdAt }}</span>
              </div>
              <p>{{ turn.question }}</p>
              <p>{{ turn.answerTranscript }}</p>
            </article>
          </div>
        </section>
      </div>

      <div v-if="cErrorMessage" class="inline-alert">
        {{ cErrorMessage }}
      </div>
    </section>

    <Transition name="stage-switch" mode="out-in">
      <article :key="stageCardKey" class="stage-card">
        <div class="stage-card__progress">
          <div class="stage-card__progress-head">
            <div>
              <p class="section-eyebrow">Progress Track</p>
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
              <p class="section-eyebrow">Stage 01</p>
              <h3>首轮策略生成</h3>
              <p class="section-copy">
                读取对象画像并生成首轮问题包，完成后解锁采样问询。
              </p>
            </div>

            <div class="stage-chip-group">
              <span
                class="risk-chip"
                :class="riskToneClass(passengerProfile.riskLevel)"
              >
                {{ passengerProfile.riskLabel }}
              </span>
              <span class="soft-chip">画像已载入</span>
            </div>
          </header>

          <div class="strategy-layout">
            <section class="profile-panel profile-panel--compact">
              <div class="profile-panel__identity">
                <div class="profile-avatar">{{ passengerProfile.alias }}</div>
                <div>
                  <strong>{{ passengerProfile.name }}</strong>
                  <span>{{ passengerProfile.documentId }}</span>
                </div>
              </div>

              <div class="profile-grid">
                <div>
                  <span class="meta-label">旅客别名</span>
                  <strong>{{ passengerProfile.alias }}</strong>
                </div>
                <div>
                  <span class="meta-label">PNR</span>
                  <strong>{{ passengerProfile.pnr }}</strong>
                </div>
                <div>
                  <span class="meta-label">航线</span>
                  <strong>{{ passengerProfile.route }}</strong>
                </div>
                <div>
                  <span class="meta-label">座位 / 舱位</span>
                  <strong>{{ passengerProfile.seat }}</strong>
                </div>
                <div>
                  <span class="meta-label">抵离状态</span>
                  <strong>{{ passengerProfile.eta }}</strong>
                </div>
                <div>
                  <span class="meta-label">观察重点</span>
                  <strong>{{ passengerProfile.observation }}</strong>
                </div>
              </div>

              <div class="profile-insight">
                <span class="meta-label">风险摘要</span>
                <p class="profile-summary">{{ passengerProfile.summary }}</p>
              </div>

              <div class="tag-row">
                <span
                  v-for="tag in passengerProfile.tags"
                  :key="tag"
                  class="tag-chip tag-chip--passive"
                >
                  {{ tag }}
                </span>
              </div>
            </section>

            <section class="workspace-panel">
              <div class="workspace-panel__head">
                <div>
                  <p class="section-eyebrow">Strategy Engine</p>
                  <h4>首轮问题包</h4>
                </div>

                <span class="soft-chip">
                  {{
                    isGeneratingStrategy
                      ? 'AI-Service 生成中'
                      : strategyGenerated
                        ? `${generatedQuestions.length} 个问题已生成`
                        : '等待生成'
                  }}
                </span>
              </div>

              <p class="workspace-summary">
                {{
                  strategySummary ||
                  '系统将根据用户画像与风险标签，调用 AI-Service 生成首轮策略与问题包。'
                }}
              </p>

              <div
                v-if="strategyRiskAssessment || strategyOperatorNote"
                class="summary-stack summary-stack--dense"
              >
                <div v-if="strategyRiskAssessment" class="summary-item">
                  <span class="meta-label">风险预评估</span>
                  <div class="summary-item__inline">
                    <strong>{{ strategyRiskAssessment.summary }}</strong>
                    <span
                      class="risk-chip"
                      :class="
                        strategyRiskToneClass(strategyRiskAssessment.level)
                      "
                    >
                      {{ strategyRiskLabel(strategyRiskAssessment.level) }}
                    </span>
                  </div>
                  <div
                    v-if="strategyRiskAssessment.reasons.length"
                    class="tag-row"
                  >
                    <span
                      v-for="reason in strategyRiskAssessment.reasons"
                      :key="reason"
                      class="tag-chip tag-chip--passive"
                    >
                      {{ reason }}
                    </span>
                  </div>
                </div>

                <div v-if="strategyFocusAreas.length" class="summary-item">
                  <span class="meta-label">关注方向</span>
                  <div class="tag-row">
                    <span
                      v-for="area in strategyFocusAreas"
                      :key="area"
                      class="tag-chip tag-chip--passive"
                    >
                      {{ area }}
                    </span>
                  </div>
                </div>

                <div v-if="strategyOperatorNote" class="summary-item">
                  <span class="meta-label">工作人员提示</span>
                  <p>{{ strategyOperatorNote }}</p>
                </div>
              </div>

              <div
                v-if="strategyGenerated"
                class="question-list question-list--scroll"
              >
                <article
                  v-for="question in generatedQuestions"
                  :key="question.id"
                  class="question-item"
                >
                  <div class="question-item__meta">
                    <strong>{{ question.title }}</strong>
                    <span>{{ question.objective }}</span>
                  </div>
                  <p>{{ question.prompt }}</p>
                </article>
              </div>

              <div v-else class="empty-panel">
                <strong>尚未生成首轮问题</strong>
                <span
                  >点击下方按钮后，系统会请求 AI-Service
                  生成首轮核验问题与问询策略。</span
                >
              </div>

              <div v-if="strategyRequestError" class="inline-alert">
                {{ strategyRequestError }}
              </div>

              <div class="action-row">
                <button
                  class="primary-action"
                  type="button"
                  :disabled="
                    isGeneratingStrategy || Boolean(activeStageLoading)
                  "
                  @click="generateStrategy"
                >
                  {{ strategyGenerated ? '重新生成策略' : '生成策略' }}
                </button>
                <button
                  class="secondary-action"
                  type="button"
                  :disabled="!canEnterInterview || Boolean(activeStageLoading)"
                  @click="enterInterviewStage"
                >
                  进入继续
                </button>
              </div>
            </section>
          </div>
        </template>

        <template v-else-if="currentStage === 'interview'">
          <header class="stage-card__head">
            <div>
              <p class="section-eyebrow">Stage 02</p>
              <h3>智能辅助问询</h3>
              <p class="section-copy">
                真实媒体采样与 mock
                转写同步展示，结束后上传窗口摘要并驱动下一轮。
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
            <section class="video-panel video-panel--capture">
              <div class="video-panel__head">
                <div>
                  <p class="section-eyebrow">Live Capture</p>
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

                <div class="video-stage__assist">
                  <span
                    class="detector-pill"
                    :class="`detector-pill--${realtimeDetection.phase}`"
                  >
                    {{ realtimeDetection.statusMessage }}
                  </span>
                  <span class="detector-pill detector-pill--neutral">
                    Face {{ realtimeDetection.overlayFrame.faceCount }}
                  </span>
                  <span class="detector-pill detector-pill--neutral">
                    Hand {{ realtimeDetection.overlayFrame.handCount }}
                  </span>
                  <span class="detector-pill detector-pill--neutral">
                    Pose
                    {{
                      realtimeDetection.overlayFrame.poseDetected ? 'ON' : 'OFF'
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
                  <strong>{{ passengerProfile.alias }}</strong>
                  <span>{{ passengerProfile.route }}</span>
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
                    <p class="section-eyebrow">Sampling Console</p>
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
                    FPS
                  </span>
                  <span class="soft-chip">
                    推理
                    {{ realtimeDetection.overlayFrame.inferenceMs.toFixed(1) }}
                    ms
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
                <div class="audio-meter__bars">
                  <span
                    v-for="(bar, index) in samplingState.meterBars"
                    :key="`${index}-${bar}`"
                    class="audio-meter__bar"
                    :style="{ transform: `scaleY(${bar})` }"
                  ></span>
                </div>
                <p class="audio-meter__copy">
                  语音转文字为
                  mock，但麦克风采样、电平反馈与摄像头视频流均为真实浏览器输入；上传片段强制为
                  MP4/H.264。
                </p>
              </div>
            </section>

            <section class="transcript-panel transcript-panel--round">
              <div class="transcript-panel__head">
                <div>
                  <p class="section-eyebrow">Round Focus</p>
                  <h4>{{ currentRound.title }}</h4>
                </div>
                <span class="soft-chip">{{ currentRound.focus }}</span>
              </div>

              <p class="workspace-summary">{{ currentRound.strategyNote }}</p>

              <div class="round-actions round-actions--compact">
                <div class="round-actions__copy">
                  <strong>{{
                    currentRound.completed ? '本轮已完成' : '本轮未完成'
                  }}</strong>
                  <span>
                    {{
                      currentRound.completed
                        ? currentRound.summary ||
                          '本轮已结束，等待窗口摘要上传完成后解锁下一步。'
                        : '完成采样并等待摘要上传后，可解锁下一轮或进入人工判断。'
                    }}
                  </span>
                </div>

                <div class="action-row">
                  <button
                    class="secondary-action"
                    type="button"
                    :disabled="!canAdvanceRound || Boolean(activeStageLoading)"
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
                <span>{{ currentRound.questions.length }} 条</span>
              </div>

              <div class="current-questions current-questions--scroll">
                <article
                  v-for="question in currentRound.questions"
                  :key="question.id"
                  class="question-brief"
                >
                  <strong>{{ question.title }}</strong>
                  <p>{{ question.prompt }}</p>
                  <span>{{ question.objective }}</span>
                </article>
              </div>

              <div class="panel-subhead">
                <strong>实时转写</strong>
                <span>{{ currentRound.transcripts.length }} 条</span>
              </div>

              <div class="transcript-stream transcript-stream--compact">
                <article
                  v-for="entry in currentRound.transcripts"
                  :key="entry.id"
                  class="transcript-entry"
                  :class="`transcript-entry--${entry.role}`"
                >
                  <div class="transcript-entry__meta">
                    <strong>{{ entry.speaker }}</strong>
                    <span>{{ entry.time }}</span>
                  </div>
                  <p>{{ entry.text }}</p>
                </article>

                <div
                  v-if="!currentRound.transcripts.length"
                  class="empty-panel empty-panel--compact"
                >
                  <strong>尚无实时转写记录</strong>
                  <span
                    >开始采样后，这里会按时间顺序显示 mock 语音转写内容。</span
                  >
                </div>
              </div>

              <div v-if="samplingState.errorMessage" class="inline-alert">
                {{ samplingState.errorMessage }}
              </div>

              <div
                class="summary-stack summary-stack--compact round-summary-stack"
              >
                <div class="summary-item">
                  <span class="meta-label">窗口上传</span>
                  <div class="summary-item__inline">
                    <strong>{{
                      roundUploadStateLabel(currentRound.uploadState)
                    }}</strong>
                    <span
                      class="status-chip"
                      :class="roundUploadStateClass(currentRound.uploadState)"
                    >
                      {{ roundUploadStateLabel(currentRound.uploadState) }}
                    </span>
                  </div>
                  <p>
                    {{
                      currentRound.recordedFileName ||
                      '结束采样后会生成本轮真实 MP4/H.264 音视频片段并上传至 HumanOmni 摘要接口。'
                    }}
                  </p>
                </div>

                <div class="summary-item">
                  <span class="meta-label">HumanOmni 摘要</span>
                  <p>
                    {{
                      currentRound.humanOmniWindow?.rawSummary ||
                      (currentRound.uploadState === 'uploading'
                        ? '正在等待 AI-Service 返回窗口摘要。'
                        : '尚未生成窗口摘要。')
                    }}
                  </p>
                </div>
              </div>

              <div v-if="currentRound.uploadErrorMessage" class="inline-alert">
                {{ currentRound.uploadErrorMessage }}
              </div>

              <div v-if="roundServiceError" class="inline-alert">
                {{ roundServiceError }}
              </div>
            </section>
          </div>

          <section class="history-panel">
            <div class="history-panel__head">
              <div>
                <p class="section-eyebrow">Round History</p>
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
                  <span>{{
                    round.uploadState === 'uploaded'
                      ? formatDuration(round.durationSeconds)
                      : roundUploadStateLabel(round.uploadState)
                  }}</span>
                </div>
                <p>
                  {{
                    round.humanOmniWindow?.rawSummary ||
                    round.summary ||
                    round.strategyNote
                  }}
                </p>
                <div class="tag-row">
                  <span class="tag-chip tag-chip--passive">{{
                    round.focus
                  }}</span>
                  <span class="tag-chip tag-chip--passive">{{
                    round.signal
                  }}</span>
                </div>
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
              <p class="section-eyebrow">Stage 03</p>
              <h3>人工辅助判断</h3>
              <p class="section-copy">
                AI-Service 摘要作为辅助线索，最终结论由检查员判定并归档。
              </p>
            </div>

            <div class="stage-chip-group">
              <span class="status-chip status-chip--judgement"
                >Human Review</span
              >
              <span class="soft-chip">至少 20 字详细理由</span>
            </div>
          </header>

          <div class="judgement-layout">
            <section class="workspace-panel workspace-panel--judgement">
              <div class="workspace-panel__head">
                <div>
                  <p class="section-eyebrow">Decision</p>
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
                  placeholder="请详细说明为什么做出该判定，至少包含关键证据、风险信号与人工判断依据。"
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
                  <p class="section-eyebrow">AI-Service Digest</p>
                  <h4>归档前摘要</h4>
                </div>
                <span class="soft-chip">{{
                  judgementBriefing?.generatedAt || passengerProfile.alias
                }}</span>
              </div>

              <div v-if="judgementBriefing" class="summary-stack digest-stack">
                <div class="digest-kpis">
                  <div class="summary-item">
                    <span class="meta-label">对象</span>
                    <strong
                      >{{ passengerProfile.name }} /
                      {{ passengerProfile.documentId }}</strong
                    >
                  </div>
                  <div class="summary-item">
                    <span class="meta-label">已完成轮次</span>
                    <strong
                      >{{ completedRounds.length }} 轮 ·
                      {{ formatDuration(totalSampleDuration) }}</strong
                    >
                  </div>
                </div>
                <div class="summary-item">
                  <span class="meta-label">AI 综合摘要</span>
                  <p>{{ judgementBriefing.multimodalAssessment.summary }}</p>
                </div>
                <div class="summary-item">
                  <span class="meta-label">风险提示</span>
                  <div class="tag-row">
                    <span
                      v-for="hint in judgementBriefing.multimodalAssessment
                        .riskHints"
                      :key="hint"
                      class="tag-chip tag-chip--passive"
                    >
                      {{ hint }}
                    </span>
                  </div>
                </div>
                <div class="summary-item">
                  <span class="meta-label">证据摘要</span>
                  <div class="evidence-list">
                    <article
                      v-for="evidence in judgementBriefing.multimodalAssessment
                        .evidence"
                      :key="evidence"
                      class="evidence-item"
                    >
                      {{ evidence }}
                    </article>
                  </div>
                </div>
                <div class="summary-item">
                  <span class="meta-label">工作人员提示</span>
                  <p>{{ judgementBriefing.operatorNote }}</p>
                </div>
                <div
                  v-if="judgementBriefing.warnings.length"
                  class="summary-item summary-item--warning"
                >
                  <span class="meta-label">注意事项</span>
                  <div class="warning-list">
                    <article
                      v-for="warning in judgementBriefing.warnings"
                      :key="warning"
                      class="warning-item"
                    >
                      {{ warning }}
                    </article>
                  </div>
                </div>
              </div>

              <div v-else class="empty-panel empty-panel--compact">
                <strong>尚未生成 AI-Service 摘要</strong>
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
              归档
            </button>
          </div>
        </template>

        <template v-else>
          <header class="stage-card__head">
            <div>
              <p class="section-eyebrow">Archived</p>
              <h3>流程已完成归档</h3>
              <p class="section-copy">
                页面已进入锁定完成态，以下展示最终判定、理由摘要与本次问询的关键依据，当前内容不再允许修改。
              </p>
            </div>

            <div class="stage-chip-group">
              <span
                v-if="selectedJudgement"
                class="judgement-pill"
                :class="judgmentToneClass(selectedJudgement)"
              >
                {{ selectedJudgementLabel }}
              </span>
              <span class="soft-chip">{{ archivedAt }}</span>
            </div>
          </header>

          <div class="completion-layout">
            <section class="completion-hero">
              <div class="completion-seal">ARCHIVED</div>
              <div>
                <p class="section-eyebrow">Archive Code</p>
                <h4>{{ archiveCode }}</h4>
                <p>
                  本次问询共完成 {{ completedRounds.length }} 轮采样，累计转写
                  {{ totalTranscriptCount }} 条，最终由
                  {{ inspectorName }} 完成人工定性。
                </p>
              </div>
            </section>

            <section class="completion-grid">
              <div class="completion-panel">
                <span class="meta-label">最终判定</span>
                <strong>{{ selectedJudgementLabel }}</strong>
                <p>{{ archivedAt }}</p>
              </div>

              <div class="completion-panel">
                <span class="meta-label">详细理由</span>
                <p>{{ judgementReason.trim() }}</p>
              </div>

              <div class="completion-panel">
                <span class="meta-label">关键依据</span>
                <div class="tag-row">
                  <span
                    v-for="tag in keyEvidenceTags"
                    :key="tag"
                    class="tag-chip tag-chip--passive"
                  >
                    {{ tag }}
                  </span>
                </div>
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
  display: grid;
  gap: 22px;
}

.workflow-hero,
.stage-card {
  border-radius: 28px;
  background: var(--surface-bg);
  border: 1px solid var(--surface-border);
  box-shadow: var(--shadow);
}

.workflow-hero,
.stage-card {
  overflow: hidden;
}

.c-demo-panel {
  display: grid;
  gap: 18px;
  padding: 24px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(157, 189, 202, 0.34);
  box-shadow: var(--shadow);
}

.workflow-hero,
.c-demo-panel__head,
.c-demo-block__head,
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

.workflow-hero {
  padding: 28px;
  background:
    linear-gradient(
      135deg,
      rgba(11, 114, 136, 0.06),
      rgba(255, 255, 255, 0.96)
    ),
    var(--surface-bg);
}

.c-demo-panel__head,
.c-demo-block__head {
  align-items: flex-start;
}

.c-demo-panel h3 {
  margin: 6px 0 0;
  color: var(--text-main);
}

.c-demo-grid {
  display: grid;
  gap: 16px;
}

.c-demo-block {
  display: grid;
  align-content: start;
  gap: 16px;
  min-width: 0;
  padding: 18px;
  border-radius: 20px;
  background: var(--surface-subtle);
  border: 1px solid rgba(157, 189, 202, 0.24);
}

.c-round-control {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(11, 114, 136, 0.08);
  color: var(--accent-strong);
  font-size: 0.82rem;
  font-weight: 700;
}

.c-round-control input {
  width: 56px;
  min-height: 30px;
  padding: 0 8px;
  border-radius: 10px;
  border: 1px solid rgba(11, 114, 136, 0.2);
  background: #ffffff;
  color: var(--text-main);
}

.c-recorder-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.c-transcript-box {
  display: grid;
  gap: 8px;
}

.c-transcript-box span {
  font-weight: 700;
  color: var(--text-main);
}

.c-transcript-box textarea {
  width: 100%;
  min-height: 132px;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid rgba(157, 189, 202, 0.3);
  background: #ffffff;
  color: var(--text-main);
  resize: vertical;
}

.c-transcript-box textarea:focus,
.c-round-control input:focus {
  outline: none;
  border-color: rgba(11, 114, 136, 0.46);
}

.c-history-list {
  display: grid;
  gap: 12px;
  max-height: 340px;
  overflow-y: auto;
  padding-right: 4px;
}

.workflow-hero h2,
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

.workflow-hero__meta,
.stage-chip-group,
.action-row,
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.workflow-hero__meta {
  justify-content: flex-end;
}

.meta-chip,
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

.meta-chip,
.soft-chip,
.progress-note {
  background: rgba(11, 114, 136, 0.08);
  color: var(--accent-strong);
}

.meta-chip {
  display: grid;
  gap: 2px;
  padding: 10px 14px;
}

.meta-chip span {
  font-size: 0.72rem;
  color: var(--text-muted);
}

.stage-card {
  --stage-card-padding: 20px;
  position: relative;
  padding: var(--stage-card-padding);
  display: grid;
  gap: 16px;
  min-height: 0;
}

.stage-card__progress {
  margin: calc(var(--stage-card-padding) * -1)
    calc(var(--stage-card-padding) * -1) 0;
  padding: 14px var(--stage-card-padding);
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
  gap: 14px;
}

.profile-panel,
.workspace-panel,
.video-panel,
.transcript-panel,
.history-panel,
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
.analysis-column {
  display: grid;
  align-content: start;
  gap: 14px;
  padding: 16px;
}

.video-panel,
.sampling-console,
.audio-meter {
  display: grid;
  gap: 12px;
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

.current-questions--scroll {
  max-height: 260px;
}

.digest-stack {
  max-height: 500px;
}

.round-summary-stack {
  grid-template-columns: repeat(2, minmax(0, 1fr));
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
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(91, 113, 121, 0.09);
  color: var(--text-main);
  font-size: 0.8rem;
  font-weight: 600;
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
  min-height: 286px;
  border-radius: 18px;
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
  min-height: 286px;
  object-fit: cover;
  transform: scaleX(-1);
}

.video-stage__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  min-height: 286px;
  pointer-events: none;
  transform: scaleX(-1);
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
  padding: 12px;
  border: 1px solid rgba(157, 189, 202, 0.18);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.68);
}

.round-actions__copy {
  display: grid;
  gap: 4px;
}

.history-item {
  display: grid;
  gap: 8px;
  padding: 12px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.22);
}

.status-chip--idle {
  background: rgba(91, 113, 121, 0.12);
  color: var(--text-muted);
}

.status-chip--active,
.status-chip--running,
.status-chip--partial,
.status-chip--analysis,
.status-chip--judgement {
  background: rgba(11, 114, 136, 0.12);
  color: var(--accent-strong);
}

.status-chip--loading {
  background: rgba(192, 123, 25, 0.12);
  color: var(--warn);
}

.status-chip--ended {
  background: rgba(35, 125, 77, 0.12);
  color: var(--safe);
}

.status-chip--unavailable,
.status-chip--error {
  background: rgba(182, 78, 61, 0.12);
  color: var(--alert);
}

.analysis-hero {
  padding: 22px;
  align-items: center;
  gap: 24px;
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
  padding: 22px;
  border-radius: 24px;
  background:
    linear-gradient(135deg, rgba(11, 114, 136, 0.1), rgba(255, 255, 255, 0.96)),
    var(--surface-subtle);
  border: 1px solid rgba(157, 189, 202, 0.22);
}

.completion-seal {
  display: grid;
  place-items: center;
  min-width: 160px;
  min-height: 160px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent-bright));
  color: #ffffff;
  font-weight: 800;
  letter-spacing: 0.12em;
}

.completion-grid {
  display: grid;
  gap: 16px;
}

.completion-panel {
  padding: 18px;
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
  .c-demo-grid {
    grid-template-columns: minmax(260px, 0.85fr) minmax(300px, 1fr) minmax(
        320px,
        1.15fr
      );
  }

  .strategy-layout,
  .judgement-layout {
    grid-template-columns: minmax(300px, 0.82fr) minmax(420px, 1.18fr);
  }

  .interview-layout {
    grid-template-columns: minmax(420px, 0.92fr) minmax(430px, 1.08fr);
    align-items: start;
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
    grid-template-columns: 0.9fr 1.2fr 0.9fr;
  }
}

@media (max-width: 959px) {
  .workflow-hero,
  .stage-card__progress-head,
  .stage-card__head,
  .sampling-console__head,
  .round-actions,
  .completion-hero,
  .analysis-hero {
    flex-direction: column;
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
}

@media (max-width: 719px) {
  .stage-card {
    --stage-card-padding: 16px;
  }

  .stage-card,
  .workflow-hero {
    padding: 16px;
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
  .workflow-hero__meta,
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

  .c-demo-panel {
    padding: 18px;
  }

  .c-demo-panel__head,
  .c-demo-block__head,
  .c-recorder-row {
    grid-template-columns: 1fr;
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
    min-width: 132px;
    min-height: 132px;
  }
}
</style>
