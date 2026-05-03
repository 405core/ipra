<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue';
import { loadAuthSession } from '../auth';

type WorkflowStage = 'strategy' | 'interview' | 'analysis' | 'judgement';
type RiskLevel = 'high' | 'medium';
type TranscriptRole = 'system' | 'interviewer' | 'subject';
type SamplingPhase = 'idle' | 'active' | 'ended' | 'error';
type FinalJudgement = 'concealment' | 'falseStatement' | 'clear';

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
}

interface SamplingState {
  phase: SamplingPhase;
  errorMessage: string;
  elapsedSeconds: number;
  audioLevel: number;
  meterBars: number[];
  permissionGranted: boolean;
}

interface AnalysisFinding {
  title: string;
  detail: string;
  tone: 'alert' | 'warn' | 'info';
}

interface StageItem {
  id: WorkflowStage;
  label: string;
  helper: string;
}

interface FollowUpTheme {
  title: string;
  focus: string;
  strategyNote: (cue: string) => string;
  signal: (cue: string) => string;
  questions: (cue: string, roundNumber: number) => Array<Omit<StrategyQuestion, 'id'>>;
  transcript: (cue: string, roundNumber: number) => TranscriptSeed[];
}

interface WindowWithWebkitAudioContext extends Window {
  webkitAudioContext?: typeof AudioContext;
}

const session = loadAuthSession();
const inspectorName = session?.user.name || '普通员工';
const inspectorWorkId = session?.user.workId || 'EMP-0000';

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
    id: 'analysis',
    label: 'AI 分析',
    helper: '汇总轮次证据并生成结论',
  },
  {
    id: 'judgement',
    label: '人工辅助判断',
    helper: '给出最终判定并归档',
  },
];

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
        text:
          '没有正式上报，我当时以为只是短暂卡顿，想着等几秒恢复后再继续，所以没有离开工位。',
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
        text:
          '我记得自己其实去旁边看过一次照明配电箱，大概几十秒，但没想到会影响这么久。',
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
        text:
          '我记得赵强从通道口经过了一次，他手里拿着备用扫码枪，但我们没有正式交接。',
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
        text:
          '因为我当时只是短暂看了一眼，没有真正接过去，后来想起来才觉得可能和设备异常有关。',
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
        text:
          '我先走到西侧通道口，又靠近过配电箱附近，之后回到货架前，但没有进入限制区域。',
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
        text:
          '可能是我在那里停留得比记忆中更久，但我没有想隐瞒，只是记不清具体秒数。',
        delayMs: 9800,
      },
    ],
  },
];

const currentStage = ref<WorkflowStage>('strategy');
const strategySummary = ref('');
const generatedQuestions = ref<StrategyQuestion[]>([]);
const strategyGenerationCount = ref(0);
const rounds = ref<InterviewRound[]>([]);
const currentRoundId = ref<string | null>(null);
const selectedJudgement = ref<FinalJudgement | null>(null);
const judgementReason = ref('');
const isArchived = ref(false);
const archivedAt = ref('');
const archiveCode = ref('IPRA-ASK-20260503-014');

const videoElement = ref<HTMLVideoElement | null>(null);
const samplingState = ref<SamplingState>(createIdleSamplingState());

let mediaStream: MediaStream | null = null;
let audioContext: AudioContext | null = null;
let analyserNode: AnalyserNode | null = null;
let audioSourceNode: MediaStreamAudioSourceNode | null = null;
let meterFrameId: number | null = null;
let elapsedIntervalId: number | null = null;
let transcriptTimeoutIds: number[] = [];
let samplingStartedAt = 0;

const currentRound = computed(() => {
  if (!currentRoundId.value) {
    return null;
  }

  return rounds.value.find((round) => round.id === currentRoundId.value) || null;
});

const completedRounds = computed(() =>
  rounds.value.filter((round) => round.completed)
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
  completedRounds.value.reduce((count, round) => count + round.transcripts.length, 0)
);

const totalSampleDuration = computed(() =>
  completedRounds.value.reduce((sum, round) => sum + round.durationSeconds, 0)
);

const analysisScore = computed(() => {
  const roundsFactor = completedRounds.value.length * 8;
  const transcriptFactor = Math.min(12, totalTranscriptCount.value);
  return Math.min(92, 58 + roundsFactor + transcriptFactor);
});

const analysisScoreStyle = computed<Record<string, string>>(() => ({
  '--score-angle': `${Math.max(12, analysisScore.value * 3.6)}deg`,
}));

const strategyGenerated = computed(() => generatedQuestions.value.length > 0);
const canEnterInterview = computed(() => strategyGenerated.value);
const canStartSampling = computed(() => samplingState.value.phase !== 'active');
const canAdvanceRound = computed(
  () =>
    Boolean(currentRound.value?.completed) &&
    samplingState.value.phase !== 'active' &&
    !isArchived.value
);
const canEnterAnalysis = computed(
  () =>
    rounds.value.length > 1 &&
    Boolean(currentRound.value?.completed) &&
    samplingState.value.phase !== 'active'
);
const canArchive = computed(
  () =>
    Boolean(selectedJudgement.value) &&
    judgementReason.value.trim().length >= 20 &&
    !isArchived.value
);

const stageCardKey = computed(() =>
  isArchived.value ? 'judgement-archived' : currentStage.value
);

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
  selectedJudgement.value ? judgementLabel(selectedJudgement.value) : '待判定'
);

const keyEvidenceTags = computed(() => {
  const tags = completedRounds.value.flatMap((round) => [round.focus, round.signal]);
  return tags.slice(0, 4);
});

const analysisTimeline = computed(() => [
  {
    label: '完成轮次',
    value: `${completedRounds.value.length} 轮`,
    detail: rounds.value.length > 1 ? '已满足进入分析的轮次要求' : '至少需要两轮采样',
  },
  {
    label: '累计转写',
    value: `${totalTranscriptCount.value} 条`,
    detail: '转写为前端 mock 脚本流，按采样状态实时注入',
  },
  {
    label: '累计采样',
    value: formatDuration(totalSampleDuration.value),
    detail: '摄像头与话筒通过浏览器真实调用',
  },
]);

const analysisFindings = computed<AnalysisFinding[]>(() => {
  const firstCue = getRoundCue(completedRounds.value[0]) || '终端异常';
  const latestCue =
    getRoundCue(completedRounds.value[completedRounds.value.length - 1]) ||
    '移动路径说明';

  return [
    {
      title: '时间线稳定性下降',
      detail: `对象围绕“${firstCue}”的描述在后续轮次中出现新的动作补充，说明首轮陈述并不完整。`,
      tone: 'alert',
    },
    {
      title: '设备空窗解释不足',
      detail:
        '对象未形成完整的异常上报链路，且将“短暂卡顿”逐步修正为靠近配电箱与移动工位，口径存在漂移。',
      tone: 'alert',
    },
    {
      title: '旁证线索后置出现',
      detail: `关于“${latestCue}”的说明直到后续轮次才出现，适合结合通道监控与同伴笔录继续人工复核。`,
      tone: 'warn',
    },
  ];
});

const analysisRecommendations = computed<AnalysisFinding[]>(() => [
  {
    title: '优先核验设备与工位日志',
    detail: '比对终端空窗、备用扫码枪领取记录与配电箱周边监控时间戳。',
    tone: 'info',
  },
  {
    title: '补充同伴交叉问询',
    detail: '围绕赵强、值班员与现场设备管理员开展旁证核验，确认是否存在未记录的短时交接。',
    tone: 'warn',
  },
  {
    title: '人工结论建议',
    detail:
      analysisScore.value >= 80
        ? '当前模型倾向认为对象存在显著陈述缺口，建议人工判断时重点审视“隐瞒”与“虚假陈述”。'
        : '当前模型仍建议人工判断时保留无异常可能，但需给出完整理由。',
    tone: 'info',
  },
]);

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

  const currentIndex = workflowStages.findIndex((item) => item.id === currentStage.value);
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

function generateStrategy() {
  const variantIndex = strategyGenerationCount.value % strategyBlueprints.length;
  const blueprint = strategyBlueprints[variantIndex];

  strategySummary.value = blueprint.summary;
  generatedQuestions.value = blueprint.questions.map((question, index) => ({
    id: createQuestionId(`strategy-${variantIndex}`, index),
    ...question,
  }));
  strategyGenerationCount.value += 1;
}

function buildOpeningRound() {
  return {
    id: 'round-1',
    roundNumber: 1,
    title: '第 1 轮 · 首轮策略执行',
    focus: '首轮关注：时间线与终端空窗',
    strategyNote:
      strategySummary.value ||
      '系统默认围绕时间线断点、设备空窗与照明波动启动首轮问询。',
    signal: '对象需先对 10:45 至 10:50 的时间线和设备空窗给出稳定说明。',
    questions: generatedQuestions.value.map((question) => ({ ...question })),
    transcriptScript: [
      {
        speaker: '系统',
        role: 'system',
        text: '首轮采样已启动，视频流与话筒输入正在同步记录。',
        delayMs: 700,
      },
      {
        speaker: '问询员',
        role: 'interviewer',
        text: '请先按时间顺序复述 10:40 到 10:50 之间您在西区仓库的具体动作。',
        delayMs: 1800,
      },
      {
        speaker: '张伟',
        role: 'subject',
        text:
          '10:40 左右我在西区货架做常规清点，后面终端突然像卡住了一样，我就停了一下。',
        delayMs: 4000,
      },
      {
        speaker: '问询员',
        role: 'interviewer',
        text: '那为什么 10:45 到 10:50 之间没有任何终端操作记录？',
        delayMs: 6300,
      },
      {
        speaker: '张伟',
        role: 'subject',
        text:
          '我记得灯闪了一下，可能顺手去看了下附近情况，但我当时没觉得这是严重异常。',
        delayMs: 9000,
      },
    ],
    transcripts: [],
    completed: false,
    durationSeconds: 0,
    summary: '',
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
    const compactText = lastSubjectEntry.text.replace(/[，。、“”]/g, ' ').trim();
    return compactText.slice(0, 16) || round.focus;
  }

  return round.questions[0]?.title || round.focus;
}

function buildFollowUpRound(roundNumber: number, previousRound: InterviewRound) {
  const cue = getRoundCue(previousRound);
  const theme = followUpThemes[(roundNumber - 2) % followUpThemes.length];
  const rawQuestions = theme.questions(cue, roundNumber);

  return {
    id: `round-${roundNumber}`,
    roundNumber,
    title: `第 ${roundNumber} 轮 · ${theme.title}`,
    focus: theme.focus,
    strategyNote: theme.strategyNote(cue),
    signal: theme.signal(cue),
    questions: rawQuestions.map((question, index) => ({
      id: createQuestionId(`round-${roundNumber}`, index),
      ...question,
    })),
    transcriptScript: theme.transcript(cue, roundNumber),
    transcripts: [],
    completed: false,
    durationSeconds: 0,
    summary: '',
  } satisfies InterviewRound;
}

function enterInterviewStage() {
  if (!canEnterInterview.value) {
    return;
  }

  currentStage.value = 'interview';

  if (!rounds.value.length) {
    const openingRound = buildOpeningRound();
    rounds.value = [openingRound];
    currentRoundId.value = openingRound.id;
  }
}

function updateCurrentRoundSummary(round: InterviewRound) {
  const subjectStatements = round.transcripts.filter((entry) => entry.role === 'subject');
  const lastSubjectText = subjectStatements[subjectStatements.length - 1]?.text;
  const stableCue = lastSubjectText
    ? `对象最新补充为“${lastSubjectText.slice(0, 24)}${lastSubjectText.length > 24 ? '…' : ''}”`
    : '对象已完成本轮说明';

  round.summary = `${stableCue}，本轮重点仍是 ${round.focus.replace('围绕', '').replace('首轮关注：', '')}。`;
}

function clearTranscriptTimers() {
  transcriptTimeoutIds.forEach((timeoutId) => {
    window.clearTimeout(timeoutId);
  });
  transcriptTimeoutIds = [];
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

function stopSamplingResources() {
  clearTranscriptTimers();
  stopElapsedTimer();
  stopMeterLoop();
  releaseMediaStream();
}

function resetSamplingIndicators() {
  samplingState.value = createIdleSamplingState();
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

  return '设备调用失败，请稍后重试。';
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
    frequencyData.reduce((sum, item) => sum + item, 0) / frequencyData.length / 255;

  samplingState.value.meterBars = meterBars;
  samplingState.value.audioLevel = average;
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
      Math.floor((Date.now() - samplingStartedAt) / 1000)
    );
  }, 1000);
}

function scheduleMockTranscripts(round: InterviewRound) {
  clearTranscriptTimers();
  round.transcripts = [];
  round.summary = '';

  round.transcriptScript.forEach((seed, index) => {
    const timeoutId = window.setTimeout(() => {
      if (currentRound.value?.id !== round.id || samplingState.value.phase !== 'active') {
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

async function startSampling() {
  const round = currentRound.value;
  if (!round || !canStartSampling.value || isArchived.value) {
    return;
  }

  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
    samplingState.value = {
      ...createIdleSamplingState(),
      phase: 'error',
      errorMessage: '当前浏览器环境不支持媒体采样。',
    };
    return;
  }

  stopSamplingResources();
  resetSamplingIndicators();
  round.completed = false;
  round.durationSeconds = 0;
  round.summary = '';

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

    startElapsedTimer();
    scheduleMockTranscripts(round);
  } catch (error) {
    stopSamplingResources();
    samplingState.value = {
      ...createIdleSamplingState(),
      phase: 'error',
      errorMessage: resolveMediaError(error),
    };
  }
}

function endSampling() {
  const round = currentRound.value;
  if (!round || samplingState.value.phase !== 'active') {
    return;
  }

  const collectedDuration = Math.max(1, samplingState.value.elapsedSeconds);
  round.durationSeconds = collectedDuration;
  round.completed = round.transcripts.length > 0;
  updateCurrentRoundSummary(round);

  stopSamplingResources();
  samplingState.value = {
    ...createIdleSamplingState(),
    phase: round.completed ? 'ended' : 'idle',
    permissionGranted: true,
  };
}

function enterNextRound() {
  if (!canAdvanceRound.value || !currentRound.value) {
    return;
  }

  const nextRound = buildFollowUpRound(rounds.value.length + 1, currentRound.value);
  rounds.value.push(nextRound);
  currentRoundId.value = nextRound.id;
  resetSamplingIndicators();
}

function enterAnalysisStage() {
  if (!canEnterAnalysis.value) {
    return;
  }

  currentStage.value = 'analysis';
}

function enterJudgementStage() {
  currentStage.value = 'judgement';
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

function selectJudgement(value: FinalJudgement) {
  if (isArchived.value) {
    return;
  }

  selectedJudgement.value = value;
}

onBeforeUnmount(() => {
  stopSamplingResources();
});
</script>

<template>
  <section class="ask-page">
    <header class="workflow-hero">
      <div>
        <p class="section-eyebrow">Inquiry Flow</p>
        <h2>辅助问询流程控制台</h2>
        <p class="section-copy">
          使用单一主工作面管理策略生成、多轮采样、AI 分析和人工判定。页面中的问询数据全部为前端
          mock，但摄像头与话筒采样为真实浏览器调用。
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

    <Transition name="stage-switch" mode="out-in">
      <article :key="stageCardKey" class="stage-card">
        <div class="stage-card__progress">
          <div class="stage-card__progress-head">
            <div>
              <p class="section-eyebrow">Progress Track</p>
              <h4>四阶段流程锁定推进</h4>
            </div>
            <span class="progress-note">仅完成上一阶段后才会解锁下一阶段</span>
          </div>

          <div class="progress-track">
            <article
              v-for="(stage, index) in workflowStages"
              :key="stage.id"
              class="progress-step"
              :class="`is-${stageStatus(stage.id)}`"
            >
              <div class="progress-step__top">
                <span class="progress-step__index">{{ index + 1 }}</span>
                <span class="progress-step__state">{{ stageStatusLabel(stage.id) }}</span>
              </div>
              <div class="progress-step__copy">
                <strong>{{ stage.label }}</strong>
                <p>{{ stage.helper }}</p>
              </div>
            </article>
          </div>
        </div>

        <template v-if="currentStage === 'strategy'">
          <header class="stage-card__head">
            <div>
              <p class="section-eyebrow">Stage 01</p>
              <h3>首轮策略生成</h3>
              <p class="section-copy">
                先读取当前对象画像，再生成首轮问题包。只有生成问题后，才能进入后续问询采样阶段。
              </p>
            </div>

            <div class="stage-chip-group">
              <span class="risk-chip" :class="riskToneClass(passengerProfile.riskLevel)">
                {{ passengerProfile.riskLabel }}
              </span>
              <span class="soft-chip">画像已载入</span>
            </div>
          </header>

          <div class="strategy-layout">
            <section class="profile-panel">
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

              <p class="profile-summary">{{ passengerProfile.summary }}</p>

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
                  {{ strategyGenerated ? `${generatedQuestions.length} 个问题已生成` : '等待生成' }}
                </span>
              </div>

              <p class="workspace-summary">
                {{
                  strategySummary ||
                  '系统将根据用户画像与风险标签，组合时间线、设备异常和现场旁证相关问题。'
                }}
              </p>

              <div v-if="strategyGenerated" class="question-list">
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
                <span>点击下方按钮后，系统会生成 4 个用于首轮核验的策略问题。</span>
              </div>

              <div class="action-row">
                <button class="primary-action" type="button" @click="generateStrategy">
                  {{ strategyGenerated ? '重新生成策略' : '生成策略' }}
                </button>
                <button
                  class="secondary-action"
                  type="button"
                  :disabled="!canEnterInterview"
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
                当前阶段支持真实摄像头与话筒采样，语音转文字使用前端 mock
                脚本流实时注入。需要至少完成一轮进入下一轮后，才会解锁进入分析。
              </p>
            </div>

            <div class="stage-chip-group">
              <span class="status-chip" :class="`status-chip--${samplingState.phase}`">
                {{ samplingPhaseLabel }}
              </span>
              <span class="soft-chip">
                {{ currentRound ? currentRound.title : '待创建轮次' }}
              </span>
            </div>
          </header>

          <div v-if="currentRound" class="interview-layout">
            <section class="video-panel">
              <div class="video-panel__head">
                <div>
                  <p class="section-eyebrow">Live Capture</p>
                  <h4>采样视频流</h4>
                </div>
                <span class="soft-chip">
                  {{ samplingState.permissionGranted ? '媒体权限已授权' : '等待授权' }}
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

                <div v-if="samplingState.phase !== 'active'" class="video-stage__placeholder">
                  <strong>{{ samplingState.phase === 'ended' ? '本轮采样已完成' : '等待开始采样' }}</strong>
                  <span>
                    {{ samplingState.phase === 'error' ? samplingState.errorMessage : '点击“开始采样”后调用摄像头与话筒。' }}
                  </span>
                </div>

                <div class="video-stage__overlay">
                  <span class="live-dot" :class="{ 'is-active': samplingState.phase === 'active' }"></span>
                  <strong>{{ passengerProfile.alias }}</strong>
                  <span>{{ passengerProfile.route }}</span>
                </div>
              </div>

              <div class="audio-meter">
                <div class="audio-meter__head">
                  <strong>话筒输入</strong>
                  <span>{{ formatDuration(samplingState.elapsedSeconds) }}</span>
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
                  语音转文字为 mock，但麦克风采样、电平反馈与摄像头视频流均为真实浏览器输入。
                </p>
              </div>

              <div class="action-row action-row--split">
                <button
                  class="primary-action"
                  type="button"
                  :disabled="!canStartSampling"
                  @click="startSampling"
                >
                  开始采样
                </button>
                <button
                  class="secondary-action"
                  type="button"
                  :disabled="samplingState.phase !== 'active'"
                  @click="endSampling"
                >
                  结束采样
                </button>
              </div>
            </section>

            <section class="transcript-panel">
              <div class="transcript-panel__head">
                <div>
                  <p class="section-eyebrow">Round Focus</p>
                  <h4>{{ currentRound.title }}</h4>
                </div>
                <span class="soft-chip">{{ currentRound.focus }}</span>
              </div>

              <p class="workspace-summary">{{ currentRound.strategyNote }}</p>

              <div class="current-questions">
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

              <div class="transcript-stream">
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

                <div v-if="!currentRound.transcripts.length" class="empty-panel empty-panel--compact">
                  <strong>尚无实时转写记录</strong>
                  <span>开始采样后，这里会按时间顺序显示 mock 语音转写内容。</span>
                </div>
              </div>

              <div v-if="samplingState.errorMessage" class="inline-alert">
                {{ samplingState.errorMessage }}
              </div>

              <div class="round-actions">
                <div class="round-actions__copy">
                  <strong>{{ currentRound.completed ? '本轮已完成' : '本轮未完成' }}</strong>
                  <span>
                    {{ currentRound.completed ? currentRound.summary : '请先完成采样并结束本轮，才能解锁下一轮或进入分析。' }}
                  </span>
                </div>

                <div class="action-row">
                  <button
                    class="secondary-action"
                    type="button"
                    :disabled="!canAdvanceRound"
                    @click="enterNextRound"
                  >
                    进入下一轮
                  </button>
                  <button
                    class="primary-action"
                    type="button"
                    :disabled="!canEnterAnalysis"
                    @click="enterAnalysisStage"
                  >
                    进入分析
                  </button>
                </div>
              </div>
            </section>
          </div>

          <section class="history-panel">
            <div class="history-panel__head">
              <div>
                <p class="section-eyebrow">Round History</p>
                <h4>历史轮次保留区</h4>
              </div>
              <span class="progress-note">进入下一轮后，之前的问题与摘要会保留在此处</span>
            </div>

            <div v-if="historicalRounds.length" class="history-list">
              <article
                v-for="round in historicalRounds"
                :key="round.id"
                class="history-item"
              >
                <div class="history-item__meta">
                  <strong>{{ round.title }}</strong>
                  <span>{{ round.completed ? formatDuration(round.durationSeconds) : '未完成' }}</span>
                </div>
                <p>{{ round.summary || round.strategyNote }}</p>
                <div class="tag-row">
                  <span class="tag-chip tag-chip--passive">{{ round.focus }}</span>
                  <span class="tag-chip tag-chip--passive">{{ round.signal }}</span>
                </div>
              </article>
            </div>

            <div v-else class="empty-panel empty-panel--compact">
              <strong>当前仍处于首轮问询</strong>
              <span>完成本轮后点击“进入下一轮”，历史摘要会自动保留在这里。</span>
            </div>
          </section>
        </template>

        <template v-else-if="currentStage === 'analysis'">
          <header class="stage-card__head">
            <div>
              <p class="section-eyebrow">Stage 03</p>
              <h3>AI 分析</h3>
              <p class="section-copy">
                当前结果基于已完成轮次的所有 mock 数据生成，用于帮助检查员快速定位矛盾点、风险信号与人工复核方向。
              </p>
            </div>

            <div class="stage-chip-group">
              <span class="status-chip status-chip--analysis">Analysis Ready</span>
              <span class="soft-chip">{{ completedRounds.length }} 轮数据已汇总</span>
            </div>
          </header>

          <div class="analysis-layout">
            <section class="analysis-hero">
              <div class="analysis-score" :style="analysisScoreStyle">
                <div class="analysis-score__inner">
                  <strong>{{ analysisScore }}%</strong>
                  <span>风险倾向</span>
                </div>
              </div>

              <div class="analysis-hero__copy">
                <p class="section-eyebrow">Model Summary</p>
                <h4>多轮口径已出现明显补充与修正</h4>
                <p>
                  系统认为对象关于设备空窗、配电箱附近停留与旁证同伴的陈述存在逐轮扩张，适合进入人工辅助判断阶段完成最终定性。
                </p>
              </div>
            </section>

            <section class="timeline-strip">
              <article v-for="item in analysisTimeline" :key="item.label" class="timeline-strip__item">
                <span>{{ item.label }}</span>
                <strong>{{ item.value }}</strong>
                <p>{{ item.detail }}</p>
              </article>
            </section>

            <section class="analysis-columns">
              <div class="analysis-column">
                <div class="analysis-column__head">
                  <p class="section-eyebrow">Risk Signals</p>
                  <h4>关键风险信号</h4>
                </div>

                <article
                  v-for="finding in analysisFindings"
                  :key="finding.title"
                  class="finding-item"
                  :class="`finding-item--${finding.tone}`"
                >
                  <strong>{{ finding.title }}</strong>
                  <p>{{ finding.detail }}</p>
                </article>
              </div>

              <div class="analysis-column">
                <div class="analysis-column__head">
                  <p class="section-eyebrow">Operator Guidance</p>
                  <h4>人工复核建议</h4>
                </div>

                <article
                  v-for="finding in analysisRecommendations"
                  :key="finding.title"
                  class="finding-item"
                  :class="`finding-item--${finding.tone}`"
                >
                  <strong>{{ finding.title }}</strong>
                  <p>{{ finding.detail }}</p>
                </article>
              </div>
            </section>
          </div>

          <div class="action-row">
            <button class="primary-action" type="button" @click="enterJudgementStage">
              进入人工辅助判断
            </button>
          </div>
        </template>

        <template v-else-if="currentStage === 'judgement' && !isArchived">
          <header class="stage-card__head">
            <div>
              <p class="section-eyebrow">Stage 04</p>
              <h3>人工辅助判断</h3>
              <p class="section-copy">
                最终判定必须由检查员完成。请选择结论，并填写详细理由；理由不足时页面不允许归档。
              </p>
            </div>

            <div class="stage-chip-group">
              <span class="status-chip status-chip--judgement">Human Review</span>
              <span class="soft-chip">至少 20 字详细理由</span>
            </div>
          </header>

          <div class="judgement-layout">
            <section class="workspace-panel">
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
                  :class="{ 'is-active': selectedJudgement === 'falseStatement' }"
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
                <span>{{ canArchive ? '理由已满足归档条件' : '未满足归档条件' }}</span>
              </div>
            </section>

            <section class="profile-panel">
              <div class="workspace-panel__head">
                <div>
                  <p class="section-eyebrow">Case Digest</p>
                  <h4>归档前摘要</h4>
                </div>
                <span class="soft-chip">{{ passengerProfile.alias }}</span>
              </div>

              <div class="summary-stack">
                <div class="summary-item">
                  <span class="meta-label">对象</span>
                  <strong>{{ passengerProfile.name }} / {{ passengerProfile.documentId }}</strong>
                </div>
                <div class="summary-item">
                  <span class="meta-label">已完成轮次</span>
                  <strong>{{ completedRounds.length }} 轮</strong>
                </div>
                <div class="summary-item">
                  <span class="meta-label">关键依据</span>
                  <p>
                    模型已标记时间线修正、设备异常未上报、旁证信息后置出现三类信号，请在理由中明确引用。
                  </p>
                </div>
              </div>

              <div class="tag-row">
                <span
                  v-for="tag in keyEvidenceTags"
                  :key="tag"
                  class="tag-chip tag-chip--passive"
                >
                  {{ tag }}
                </span>
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
                  {{ totalTranscriptCount }} 条，最终由 {{ inspectorName }} 完成人工定性。
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

.workflow-hero,
.stage-card__progress-head,
.stage-card__head,
.workspace-panel__head,
.video-panel__head,
.transcript-panel__head,
.history-panel__head,
.analysis-column__head,
.audio-meter__head,
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
    linear-gradient(135deg, rgba(11, 114, 136, 0.06), rgba(255, 255, 255, 0.96)),
    var(--surface-bg);
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
  line-height: 1.6;
}

.section-copy {
  margin-top: 14px;
  max-width: 760px;
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
  min-height: 36px;
  padding: 0 14px;
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
  --stage-card-padding: 28px;
  padding: var(--stage-card-padding);
  display: grid;
  gap: 24px;
  min-height: 740px;
}

.stage-card__progress {
  margin:
    calc(var(--stage-card-padding) * -1)
    calc(var(--stage-card-padding) * -1)
    0;
  padding: 22px var(--stage-card-padding) 20px;
  border-bottom: 1px solid rgba(157, 189, 202, 0.24);
  background:
    linear-gradient(180deg, rgba(230, 244, 248, 0.9), rgba(255, 255, 255, 0.72)),
    rgba(248, 252, 253, 0.94);
}

.stage-card__progress-head h4 {
  font-size: 1.1rem;
}

.progress-track {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.progress-step {
  position: relative;
  display: grid;
  gap: 12px;
  min-height: 128px;
  padding: 18px 16px 16px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.54);
  border: 1px solid rgba(157, 189, 202, 0.26);
}

.progress-step::after {
  content: '';
  position: absolute;
  top: 38px;
  left: calc(100% - 6px);
  width: 20px;
  height: 2px;
  background: rgba(157, 189, 202, 0.42);
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
  width: 40px;
  height: 40px;
  border-radius: 14px;
  background: rgba(11, 114, 136, 0.08);
  color: var(--accent-strong);
  font-weight: 800;
}

.progress-step__copy strong {
  display: block;
  color: var(--text-main);
}

.progress-step__copy p {
  margin-top: 4px;
}

.progress-step__state {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted);
}

.progress-step.is-active {
  background: linear-gradient(135deg, rgba(11, 114, 136, 0.12), rgba(255, 255, 255, 0.98));
  border-color: rgba(11, 114, 136, 0.28);
  box-shadow: 0 16px 30px rgba(11, 114, 136, 0.12);
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
  gap: 20px;
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
  border-radius: 24px;
  background: var(--surface-subtle);
  border: 1px solid rgba(157, 189, 202, 0.26);
}

.profile-panel,
.workspace-panel,
.video-panel,
.transcript-panel,
.history-panel,
.analysis-column {
  padding: 22px;
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
  gap: 14px;
}

.profile-avatar {
  display: grid;
  place-items: center;
  width: 68px;
  height: 68px;
  border-radius: 22px;
  background: linear-gradient(135deg, rgba(11, 114, 136, 0.16), rgba(32, 168, 197, 0.24));
  color: var(--accent-strong);
  font-size: 1.05rem;
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
  gap: 14px;
  margin-top: 18px;
}

.profile-grid strong,
.summary-item strong,
.completion-panel strong {
  color: var(--text-main);
}

.profile-summary {
  margin-top: 18px;
}

.workspace-summary {
  margin-top: 12px;
}

.question-list,
.current-questions,
.analysis-columns,
.history-list,
.summary-stack {
  display: grid;
  gap: 14px;
}

.question-item,
.question-brief {
  padding: 16px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.24);
}

.question-item__meta,
.history-item__meta,
.transcript-entry__meta,
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

.empty-panel {
  display: grid;
  gap: 8px;
  place-items: center;
  min-height: 220px;
  padding: 24px;
  text-align: center;
  border-radius: 24px;
  border: 1px dashed rgba(11, 114, 136, 0.24);
  background: rgba(255, 255, 255, 0.76);
}

.empty-panel--compact {
  min-height: 160px;
}

.primary-action,
.secondary-action,
.verdict-button {
  min-height: 46px;
  padding: 0 18px;
  border-radius: 14px;
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

.tag-chip {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(91, 113, 121, 0.09);
  color: var(--text-main);
  font-size: 0.84rem;
  font-weight: 600;
}

.tag-chip--passive {
  cursor: default;
}

.video-stage {
  position: relative;
  min-height: 360px;
  border-radius: 24px;
  background:
    radial-gradient(circle at top left, rgba(32, 168, 197, 0.2), transparent 26%),
    linear-gradient(135deg, #203039, #111b20);
  overflow: hidden;
}

.video-stage__feed {
  width: 100%;
  height: 100%;
  min-height: 360px;
  object-fit: cover;
  transform: scaleX(-1);
}

.video-stage__placeholder {
  position: absolute;
  inset: 0;
  display: grid;
  gap: 8px;
  place-content: center;
  padding: 24px;
  text-align: center;
  color: #ffffff;
  background: linear-gradient(180deg, rgba(10, 20, 24, 0.14), rgba(10, 20, 24, 0.76));
}

.video-stage__overlay {
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 18px;
  background: rgba(10, 20, 24, 0.48);
  color: #ffffff;
  backdrop-filter: blur(12px);
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

.audio-meter {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

.audio-meter__bars {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  align-items: end;
  gap: 6px;
  min-height: 84px;
  padding: 14px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.22);
}

.audio-meter__bar {
  display: block;
  height: 56px;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(32, 168, 197, 0.95), rgba(11, 114, 136, 0.4));
  transform-origin: bottom center;
  transition: transform 0.08s linear;
}

.audio-meter__copy {
  margin: 0;
}

.action-row--split {
  justify-content: flex-start;
}

.transcript-stream {
  display: grid;
  gap: 14px;
  max-height: 420px;
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
  padding: 14px 16px;
  border-radius: 18px;
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
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(182, 78, 61, 0.1);
  color: var(--alert);
}

.round-actions {
  padding-top: 12px;
  border-top: 1px solid rgba(157, 189, 202, 0.24);
}

.round-actions__copy {
  display: grid;
  gap: 4px;
}

.history-item {
  display: grid;
  gap: 10px;
  padding: 16px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.22);
}

.status-chip--idle {
  background: rgba(91, 113, 121, 0.12);
  color: var(--text-muted);
}

.status-chip--active,
.status-chip--analysis,
.status-chip--judgement {
  background: rgba(11, 114, 136, 0.12);
  color: var(--accent-strong);
}

.status-chip--ended {
  background: rgba(35, 125, 77, 0.12);
  color: var(--safe);
}

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
  background:
    conic-gradient(var(--accent) var(--score-angle), rgba(157, 189, 202, 0.22) 0deg);
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
  gap: 12px;
  margin-top: 16px;
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
  gap: 10px;
  margin-top: 18px;
}

.reason-box span {
  font-weight: 700;
  color: var(--text-main);
}

.reason-box textarea {
  min-height: 180px;
  padding: 16px;
  border-radius: 20px;
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
  margin-top: 12px;
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

@media (min-width: 960px) {
  .strategy-layout,
  .judgement-layout {
    grid-template-columns: minmax(320px, 0.95fr) minmax(360px, 1.2fr);
  }

  .interview-layout {
    grid-template-columns: minmax(340px, 0.95fr) minmax(420px, 1.2fr);
    align-items: start;
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
}

@media (max-width: 719px) {
  .stage-card {
    --stage-card-padding: 20px;
  }

  .stage-card,
  .workflow-hero {
    padding: 20px;
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
    padding: 14px 12px 12px;
    border-radius: 18px;
  }

  .progress-step__index {
    width: 36px;
    height: 36px;
    border-radius: 12px;
  }

  .progress-step__copy strong {
    font-size: 0.92rem;
  }

  .video-stage,
  .video-stage__feed {
    min-height: 280px;
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

  .analysis-score__inner strong {
    font-size: 1.65rem;
  }

  .completion-seal {
    min-width: 132px;
    min-height: 132px;
  }
}
</style>
