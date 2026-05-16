/* @vitest-environment jsdom */

import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import UserAskView from './UserAskView.vue';

const aiServiceMocks = vi.hoisted(() => ({
  resolveAiServiceWebSocketUrl: vi.fn(
    (path: string) => `ws://ai-service.test${path}`,
  ),
}));

vi.mock('../app/ai-service', () => aiServiceMocks);

const inquiryProtectedMocks = vi.hoisted(() => ({
  generateProtectedInquiryStrategy: vi.fn(),
  uploadProtectedInquiryRoundWindow: vi.fn(),
  requestProtectedInquiryFollowup: vi.fn(),
  requestProtectedInquiryJudgement: vi.fn(),
  refreshProtectedInquiryMemory: vi.fn(),
}));

vi.mock('../app/inquiry-protected-service', () => inquiryProtectedMocks);
const archiveServiceMocks = vi.hoisted(() => ({
  createInquiryArchive: vi.fn(),
  uploadInquiryArchiveVideo: vi.fn(),
}));

vi.mock('../app/archive-service', () => archiveServiceMocks);

const profileServiceMocks = vi.hoisted(() => ({
  searchPassengerProfilesProtected: vi.fn(),
  getProtectedProfileById: vi.fn(),
}));

vi.mock('../app/profile-service', () => profileServiceMocks);

const routerMocks = vi.hoisted(() => ({
  push: vi.fn(),
  route: {
    query: {
      profileId: '10',
    } as Record<string, unknown>,
  },
}));

vi.mock('vue-router', () => ({
  useRoute: () => routerMocks.route,
  useRouter: () => ({
    push: routerMocks.push,
  }),
}));

const adminServiceMocks = vi.hoisted(() => ({
  getInquirySettings: vi.fn(),
}));

vi.mock('../app/admin-service', () => adminServiceMocks);

vi.mock('../app/audit-service', () => ({
  recordAuditEvent: vi.fn().mockResolvedValue({ message: 'ok' }),
}));

const elMessageMocks = vi.hoisted(() => ({
  success: vi.fn(),
  warning: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
}));

vi.mock('../app/el-message', () => ({
  ElMessage: elMessageMocks,
}));

vi.mock('../app/realtime-mediapipe', () => {
  const createIdleRealtimeDetectionState = (overrides = {}) => ({
    phase: 'idle',
    statusMessage: '等待开始采样',
    windowSummary: '等待开始采样',
    lastDetectedAt: null,
    enabledModels: [],
    models: {
      face: {
        key: 'face',
        label: 'Face Landmarker',
        state: 'idle',
        detail: '等待开始',
        active: false,
      },
      hand: {
        key: 'hand',
        label: 'Hand Landmarker',
        state: 'idle',
        detail: '等待开始',
        active: false,
      },
      pose: {
        key: 'pose',
        label: 'Pose Landmarker',
        state: 'idle',
        detail: '等待开始',
        active: false,
      },
    },
    overlayFrame: {
      hasFace: false,
      faceCount: 0,
      handCount: 0,
      poseDetected: false,
      detectionFps: 0,
      inferenceMs: 0,
      detectedAt: null,
    },
    faceCues: {
      available: false,
      browTension: 0,
      eyeTension: 0,
      mouthPressure: 0,
      jawActivation: 0,
      dominantCue: '等待采样',
    },
    events: [],
    consoleEntries: [],
    ...overrides,
  });

  return {
    createIdleRealtimeDetectionState,
    createRealtimeDetectionController: vi.fn(() => ({
      start: vi.fn().mockResolvedValue(undefined),
      stop: vi.fn(),
    })),
  };
});

class FakeMediaRecorder extends EventTarget {
  static isTypeSupported = vi.fn((mimeType: string) =>
    mimeType.toLowerCase().startsWith('video/mp4'),
  );

  mimeType: string;
  state: RecordingState = 'inactive';
  ondataavailable: ((event: BlobEvent) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  onstop: ((event: Event) => void) | null = null;

  constructor(_stream: MediaStream, options?: MediaRecorderOptions) {
    super();
    this.mimeType = options?.mimeType || 'video/mp4';
  }

  start() {
    this.state = 'recording';
    this.ondataavailable?.({
      data: new Blob(['clip'], { type: this.mimeType }),
    } as BlobEvent);
  }

  stop() {
    this.state = 'inactive';
    const event = new Event('stop');
    this.dispatchEvent(event);
    this.onstop?.(event);
  }
}

class FakeAudioNode {
  connect = vi.fn();
  disconnect = vi.fn();
}

class FakeScriptProcessorNode extends FakeAudioNode {
  onaudioprocess: ScriptProcessorNode['onaudioprocess'] = null;
}

class FakeAnalyserNode extends FakeAudioNode {
  fftSize = 64;
  smoothingTimeConstant = 0.82;
  frequencyBinCount = 32;

  getByteFrequencyData(data: Uint8Array) {
    data.fill(32);
  }
}

class FakeAudioContext {
  static latestProcessor: FakeScriptProcessorNode | null = null;

  sampleRate = 48000;
  destination = new FakeAudioNode();

  createMediaStreamSource() {
    return new FakeAudioNode();
  }

  createAnalyser() {
    return new FakeAnalyserNode();
  }

  createScriptProcessor() {
    const processor = new FakeScriptProcessorNode();
    FakeAudioContext.latestProcessor = processor;
    return processor;
  }

  resume = vi.fn().mockResolvedValue(undefined);
  close = vi.fn().mockResolvedValue(undefined);
}

class FakeWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;
  static latest: FakeWebSocket | null = null;
  static instances: FakeWebSocket[] = [];

  readyState = FakeWebSocket.CONNECTING;
  sent: unknown[] = [];
  onopen: ((event: Event) => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  onclose: ((event: CloseEvent) => void) | null = null;

  constructor(public url: string) {
    FakeWebSocket.latest = this;
    FakeWebSocket.instances.push(this);
  }

  send(data: unknown) {
    this.sent.push(data);
  }

  close() {
    this.readyState = FakeWebSocket.CLOSED;
    this.onclose?.(new CloseEvent('close'));
  }

  open() {
    this.readyState = FakeWebSocket.OPEN;
    this.onopen?.(new Event('open'));
  }

  receive(payload: unknown) {
    this.onmessage?.(
      new MessageEvent('message', {
        data: JSON.stringify(payload),
      }),
    );
  }
}

function flushPromises() {
  return new Promise((resolve) => window.setTimeout(resolve, 0));
}

function createMockStream() {
  return {
    getTracks: () => [
      {
        stop: vi.fn(),
      },
    ],
  } as unknown as MediaStream;
}

function createProtectedAsset(id: string, url = `/api/sensitive-assets/${id}`) {
  return {
    id,
    url,
    context: 'dialog',
  };
}

function createProtectedProfile(id = '10') {
  return {
    id,
    asset: createProtectedAsset(`profile-${id}`),
    fields: [
      {
        key: 'fullName',
        asset: createProtectedAsset(`profile-${id}-fullName`),
      },
    ],
    chips: [
      {
        key: 'highRisk',
        asset: createProtectedAsset(`profile-${id}-highRisk`),
        tone: 'alert',
      },
      {
        key: 'documentType',
        asset: createProtectedAsset(`profile-${id}-documentType`),
      },
      {
        key: 'gender',
        asset: createProtectedAsset(`profile-${id}-gender`),
      },
      {
        key: 'documentNum',
        asset: createProtectedAsset(`profile-${id}-documentNum`),
        tone: 'identity',
      },
    ],
    facts: [
      {
        key: 'pnr',
        label: 'PNR',
        asset: createProtectedAsset(`profile-${id}-pnr`),
      },
      {
        key: 'route',
        label: '航线',
        asset: createProtectedAsset(`profile-${id}-route`),
      },
    ],
    meta: [
      {
        key: 'riskTag',
        asset: createProtectedAsset(`profile-${id}-riskTag`),
      },
    ],
    notes: [
      {
        key: 'note',
        asset: createProtectedAsset(`profile-${id}-note`),
      },
    ],
    flags: {
      isHighRisk: true,
    },
  };
}

function createPassengerProfile(overrides = {}) {
  return {
    id: 10,
    fullName: '黎泽宝',
    documentNum: '440582199402155270',
    isHighRisk: true,
    riskReason: '名单命中：异常出境目的待核验',
    updatedAt: '2026-05-11T08:00:00Z',
    profileData: {
      basicInfo: {
        documentType: 'PASSPORT',
        issuingRegion: 'CN',
        nationality: '中国',
        gender: 'male',
        birthDate: '1990-04-12',
      },
      tripInfo: {
        pnr: 'CZ3101',
        flightNo: 'CZ3101',
        origin: 'CAN',
        destination: 'BKK',
        route: 'CZ3101 (CAN -> BKK)',
        departureDate: '2026-05-12',
        stayDays: 6,
        purposeDeclared: '商务拜访',
        returnTicketStatus: '已订返程票',
        accommodation: '曼谷商务酒店',
        companions: ['同行同事 A'],
        seat: '18C',
      },
      travelHistory: {
        recentDestinations: ['泰国', '新加坡'],
        travelHistorySummary: '近三个月有两次短期出境记录',
      },
      occupation: {
        occupation: '外贸业务员',
        monthlyIncome: '15000 CNY',
        fundingSource: '公司报销',
      },
      riskInfo: {
        riskTags: ['异常行程', '资金核验'],
        criminalRecord: '无',
        note: '需核验商务邀请材料',
      },
    },
    ...overrides,
  };
}

function findButton(wrapper: VueWrapper, label: string) {
  const button = wrapper
    .findAll('button')
    .find((item) => item.text().includes(label));

  expect(button, `button "${label}" should exist`).toBeTruthy();
  return button!;
}

async function enterInterviewStage(wrapper: VueWrapper) {
  await flushPromises();
  await nextTick();

  await findButton(wrapper, '生成策略').trigger('click');
  await flushPromises();
  await nextTick();

  await findButton(wrapper, '进入继续').trigger('click');
  await nextTick();
}

async function finishSampling(wrapper: VueWrapper) {
  await findButton(wrapper, '结束采样').trigger('click');
  await flushPromises();
  await nextTick();
}

describe('UserAskView realtime speech sampling', () => {
  let mediaDevicesDescriptor: PropertyDescriptor | undefined;
  const mountedWrappers: VueWrapper[] = [];

  beforeEach(() => {
    vi.clearAllMocks();
    routerMocks.route.query = {
      profileId: '10',
    };
    profileServiceMocks.searchPassengerProfilesProtected.mockResolvedValue({
      items: [createProtectedProfile()],
      total: 1,
      page: 1,
      pageSize: 1,
    });
    profileServiceMocks.getProtectedProfileById.mockResolvedValue(
      createProtectedProfile(),
    );
    adminServiceMocks.getInquirySettings.mockResolvedValue({
      maxRounds: 3,
      minRounds: 1,
      maxAllowedRounds: 10,
      updatedAt: '2026-05-11T08:00:00Z',
    });
    mediaDevicesDescriptor = Object.getOwnPropertyDescriptor(
      navigator,
      'mediaDevices',
    );

    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: {
        getUserMedia: vi.fn().mockResolvedValue(createMockStream()),
      },
    });

    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
    vi.stubGlobal('MediaRecorder', FakeMediaRecorder);
    vi.stubGlobal('AudioContext', FakeAudioContext);
    vi.stubGlobal('WebSocket', FakeWebSocket);

    inquiryProtectedMocks.generateProtectedInquiryStrategy.mockResolvedValue({
      sessionId: 'session-1',
      strategyAsset: createProtectedAsset('strategy-1'),
      memoryAsset: createProtectedAsset('memory-1'),
      currentRound: {
        id: 'round-1',
        roundNumber: 1,
        title: '第 1 轮 · 首轮策略执行',
        questionCount: 1,
        status: 'pending',
        promptAsset: createProtectedAsset('prompt-1'),
      },
      historicalRounds: [],
      completedRounds: 0,
      totalSampleDuration: 0,
    });

    inquiryProtectedMocks.uploadProtectedInquiryRoundWindow.mockImplementation(
      async (_sessionId: string, roundId: string) => {
        if (roundId === 'round-2') {
          return {
            sessionId: 'session-1',
            strategyAsset: createProtectedAsset('strategy-1'),
            memoryAsset: createProtectedAsset('memory-2'),
            currentRound: {
              id: 'round-2',
              roundNumber: 2,
              title: '第 2 轮 · AI 追问引导',
              questionCount: 1,
              status: 'uploaded',
              promptAsset: createProtectedAsset('prompt-2'),
              summaryAsset: createProtectedAsset('summary-2'),
              recordedFileName: 'round-2.mp4',
              uploadedFile: {
                filename: 'round-2.mp4',
                contentType: 'video/mp4',
                sizeBytes: 4,
              },
              humanOmniWindow: {
                windowId: 'window-2',
                questionId: 'q-2',
                startSeconds: 0,
                endSeconds: 1,
                modal: 'video_audio',
                modelName: 'test',
              },
            },
            historicalRounds: [
              {
                id: 'round-1',
                roundNumber: 1,
                title: '第 1 轮 · 首轮策略执行',
                questionCount: 1,
                status: 'uploaded',
                promptAsset: createProtectedAsset('prompt-1'),
                summaryAsset: createProtectedAsset('summary-1'),
                recordedFileName: 'round-1.mp4',
                uploadedFile: {
                  filename: 'round-1.mp4',
                  contentType: 'video/mp4',
                  sizeBytes: 4,
                },
                humanOmniWindow: {
                  windowId: 'window-1',
                  questionId: 'q-1',
                  startSeconds: 0,
                  endSeconds: 1,
                  modal: 'video_audio',
                  modelName: 'test',
                },
              },
            ],
            completedRounds: 2,
            totalSampleDuration: 2,
          };
        }

        return {
          sessionId: 'session-1',
          strategyAsset: createProtectedAsset('strategy-1'),
          memoryAsset: createProtectedAsset('memory-1'),
          currentRound: {
            id: 'round-1',
            roundNumber: 1,
            title: '第 1 轮 · 首轮策略执行',
            questionCount: 1,
            status: 'uploaded',
            promptAsset: createProtectedAsset('prompt-1'),
            summaryAsset: createProtectedAsset('summary-1'),
            recordedFileName: 'round-1.mp4',
            uploadedFile: {
              filename: 'round-1.mp4',
              contentType: 'video/mp4',
              sizeBytes: 4,
            },
            humanOmniWindow: {
              windowId: 'window-1',
              questionId: 'q-1',
              startSeconds: 0,
              endSeconds: 1,
              modal: 'video_audio',
              modelName: 'test',
            },
          },
          historicalRounds: [],
          completedRounds: 1,
          totalSampleDuration: 1,
        };
      },
    );

    inquiryProtectedMocks.requestProtectedInquiryFollowup.mockResolvedValue({
      sessionId: 'session-1',
      strategyAsset: createProtectedAsset('strategy-1'),
      memoryAsset: createProtectedAsset('memory-2'),
      currentRound: {
        id: 'round-2',
        roundNumber: 2,
        title: '第 2 轮 · AI 追问引导',
        questionCount: 1,
        status: 'pending',
        promptAsset: createProtectedAsset('prompt-2'),
      },
      historicalRounds: [
        {
          id: 'round-1',
          roundNumber: 1,
          title: '第 1 轮 · 首轮策略执行',
          questionCount: 1,
          status: 'uploaded',
          promptAsset: createProtectedAsset('prompt-1'),
          summaryAsset: createProtectedAsset('summary-1'),
          recordedFileName: 'round-1.mp4',
          uploadedFile: {
            filename: 'round-1.mp4',
            contentType: 'video/mp4',
            sizeBytes: 4,
          },
          humanOmniWindow: {
            windowId: 'window-1',
            questionId: 'q-1',
            startSeconds: 0,
            endSeconds: 1,
            modal: 'video_audio',
            modelName: 'test',
          },
        },
      ],
      completedRounds: 1,
      totalSampleDuration: 1,
    });

    archiveServiceMocks.uploadInquiryArchiveVideo.mockResolvedValue({
      uploadedFile: {
        filename: 'round-1.mp4',
        contentType: 'video/mp4',
        sizeBytes: 4,
        minioBucket: 'ipra-videos',
        minioObjectKey: 'humanomni-windows/2026/05/16/session-window-1.mp4',
        videoKind: 'round_clip',
        windowId: 'window-1',
        questionId: 'q-1',
        modal: 'video_audio',
        startSeconds: 0,
        endSeconds: 1,
      },
    });

    archiveServiceMocks.createInquiryArchive.mockResolvedValue({
      id: 1,
      archiveCode: 'IPRA-ASK-20260511-0001',
      sessionId: 'session-1',
      passengerDocumentNum: '440582199402155270',
      passengerName: '测试旅客',
      operatorWorkId: 'user',
      operatorName: '员工',
      finalJudgement: 'clear',
      judgementReason: '测试归档理由满足二十字以上的要求。',
      roundCount: 1,
      totalDurationSeconds: 1,
      transcriptCount: 1,
      status: 'archived',
      archivedAt: '2026-05-11T08:00:00Z',
      createdAt: '2026-05-11T08:00:00Z',
      updatedAt: '2026-05-11T08:00:00Z',
      rounds: [],
      videos: [],
    });

    inquiryProtectedMocks.requestProtectedInquiryJudgement.mockResolvedValue({
      sessionId: 'session-1',
      strategyAsset: createProtectedAsset('strategy-1'),
      memoryAsset: createProtectedAsset('memory-2'),
      judgementAsset: createProtectedAsset('judgement-1'),
      currentRound: {
        id: 'round-2',
        roundNumber: 2,
        title: '第 2 轮 · AI 追问引导',
        questionCount: 1,
        status: 'uploaded',
        promptAsset: createProtectedAsset('prompt-2'),
        summaryAsset: createProtectedAsset('summary-2'),
      },
      historicalRounds: [
        {
          id: 'round-1',
          roundNumber: 1,
          title: '第 1 轮 · 首轮策略执行',
          questionCount: 1,
          status: 'uploaded',
          promptAsset: createProtectedAsset('prompt-1'),
          summaryAsset: createProtectedAsset('summary-1'),
        },
      ],
      completedRounds: 2,
      totalSampleDuration: 2,
    });
  });

  afterEach(() => {
    while (mountedWrappers.length) {
      mountedWrappers.pop()?.unmount();
    }

    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    FakeWebSocket.latest = null;
    FakeWebSocket.instances = [];
    FakeAudioContext.latestProcessor = null;

    if (mediaDevicesDescriptor) {
      Object.defineProperty(navigator, 'mediaDevices', mediaDevicesDescriptor);
    } else {
      Reflect.deleteProperty(navigator, 'mediaDevices');
    }
  });

  it('locks the strategy stage when opened without a searched profile', async () => {
    routerMocks.route.query = {};
    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await flushPromises();
    await nextTick();

    expect(wrapper.text()).toContain('请先进行数据检索');
    expect(wrapper.text()).not.toContain('E92834102');
    expect(wrapper.text()).not.toContain('张伟');

    const strategyButton = findButton(wrapper, '生成策略');
    expect(strategyButton.attributes('disabled')).toBeDefined();
    await strategyButton.trigger('click');

    expect(
      inquiryProtectedMocks.generateProtectedInquiryStrategy,
    ).not.toHaveBeenCalled();
  });

  it('loads the searched passenger profile into the strategy stage', async () => {
    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await flushPromises();
    await nextTick();

    expect(profileServiceMocks.getProtectedProfileById).toHaveBeenCalledWith(
      '10',
    );
    expect(wrapper.text()).toContain('画像已载入');
    expect(
      findButton(wrapper, '生成策略').attributes('disabled'),
    ).toBeUndefined();
  });

  it('sends the real passenger profile when generating strategy', async () => {
    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await flushPromises();
    await nextTick();

    await findButton(wrapper, '生成策略').trigger('click');
    await flushPromises();

    expect(
      inquiryProtectedMocks.generateProtectedInquiryStrategy,
    ).toHaveBeenCalledTimes(1);
    const payload =
      inquiryProtectedMocks.generateProtectedInquiryStrategy.mock.calls[0][0];
    expect(payload).toMatchObject({
      sessionId: expect.any(String),
      passengerId: '10',
      constraints: {
        questionCount: 6,
        tone: '中性、专业、非指控',
        language: 'zh-CN',
      },
    });
  });

  it('passes the URL risk category into the protected strategy request', async () => {
    routerMocks.route.query = {
      profileId: '10',
      riskCategory: 'cross_border_gambling',
      riskCategorySource: 'watchlist',
    };

    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await flushPromises();
    await nextTick();

    await findButton(wrapper, '生成策略').trigger('click');
    await flushPromises();

    const payload =
      inquiryProtectedMocks.generateProtectedInquiryStrategy.mock.calls[0][0];
    expect(payload.riskCaseContext).toMatchObject({
      source: 'watchlist',
      category: 'cross_border_gambling',
      label: '跨境赌博',
      reason: '高风险名单风险类别命中',
    });
  });

  it('keeps the strategy stage locked when the queried profile is missing', async () => {
    profileServiceMocks.getProtectedProfileById.mockRejectedValue(
      new Error('旅客画像读取失败，请返回数据检索后重试。'),
    );

    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await flushPromises();
    await nextTick();

    expect(wrapper.text()).toContain('旅客画像读取失败，请返回数据检索后重试。');
    const strategyButton = findButton(wrapper, '生成策略');
    expect(strategyButton.attributes('disabled')).toBeDefined();
    await strategyButton.trigger('click');
    expect(
      inquiryProtectedMocks.generateProtectedInquiryStrategy,
    ).not.toHaveBeenCalled();
  });

  it('passes realtime Iflytek ASR text into followup guidance', async () => {
    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await enterInterviewStage(wrapper);

    await findButton(wrapper, '开始采样').trigger('click');
    await flushPromises();
    await nextTick();

    FakeWebSocket.latest?.open();
    FakeWebSocket.latest?.receive({
      type: 'status',
      status: 'connected',
      provider: 'iflytek-rtasr-llm',
    });
    FakeWebSocket.latest?.receive({
      type: 'transcript',
      provider: 'iflytek-rtasr-llm',
      model: 'rtasr-llm',
      segmentId: 160,
      text: '我在西区货架继续清点',
      isFinal: true,
    });
    await nextTick();

    expect(wrapper.text()).toContain('讯飞实时转写中');

    await finishSampling(wrapper);
    await findButton(wrapper, '进入下一轮').trigger('click');
    await flushPromises();

    expect(
      inquiryProtectedMocks.requestProtectedInquiryFollowup,
    ).toHaveBeenCalledTimes(1);
    expect(
      inquiryProtectedMocks.requestProtectedInquiryFollowup.mock.calls[0][1],
    ).toMatchObject({
      roundNumber: 2,
    });
  });

  it('updates an interim Iflytek ASR segment and keeps the newest text', async () => {
    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await enterInterviewStage(wrapper);

    await findButton(wrapper, '开始采样').trigger('click');
    await flushPromises();
    await nextTick();

    FakeWebSocket.latest?.open();
    FakeWebSocket.latest?.receive({
      type: 'transcript',
      segmentId: 100,
      text: '随便走进',
      isFinal: false,
    });
    FakeWebSocket.latest?.receive({
      type: 'transcript',
      segmentId: 100,
      text: '随便走进一个三线城市',
      isFinal: false,
    });
    await nextTick();

    expect(wrapper.text()).toContain('正在接收讯飞转写结果');
  });

  it('deduplicates cumulative Iflytek ASR updates with different segment ids', async () => {
    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await enterInterviewStage(wrapper);

    await findButton(wrapper, '开始采样').trigger('click');
    await flushPromises();
    await nextTick();

    FakeWebSocket.latest?.open();
    FakeWebSocket.latest?.receive({
      type: 'transcript',
      segmentId: 100,
      text: '在这两张图当中',
      isFinal: false,
    });
    FakeWebSocket.latest?.receive({
      type: 'transcript',
      segmentId: 180,
      text: '在这两张图当中我能想到的原因',
      isFinal: false,
    });
    FakeWebSocket.latest?.receive({
      type: 'transcript',
      segmentId: 260,
      text: '在这两张图当中我能想到的原因只有两种',
      isFinal: false,
    });
    await nextTick();

    expect(wrapper.text()).toContain('正在接收讯飞转写结果');
  });

  it('replaces corrected Iflytek ASR text instead of appending it', async () => {
    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await enterInterviewStage(wrapper);

    await findButton(wrapper, '开始采样').trigger('click');
    await flushPromises();
    await nextTick();

    FakeWebSocket.latest?.open();
    FakeWebSocket.latest?.receive({
      type: 'transcript',
      segmentId: 100,
      startMs: 100,
      endMs: 1200,
      text: '不认真造假更要认真',
      rawType: 'rlt',
      isFinal: false,
    });
    FakeWebSocket.latest?.receive({
      type: 'transcript',
      segmentId: 220,
      startMs: 100,
      endMs: 2200,
      text: '不认真，造假更要认真，无论是以上哪种情况',
      rawType: 'pgs',
      isFinal: false,
    });
    await nextTick();

    expect(wrapper.text()).toContain('正在接收讯飞转写结果');
  });

  it('deduplicates overlapped final and interim Iflytek ASR windows', async () => {
    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await enterInterviewStage(wrapper);

    await findButton(wrapper, '\u5f00\u59cb\u91c7\u6837').trigger('click');
    await flushPromises();
    await nextTick();

    FakeWebSocket.latest?.open();
    FakeWebSocket.latest?.receive({
      type: 'transcript',
      segmentId: 100,
      startMs: 100,
      endMs: 1800,
      text: 'alpha beta gamma duplicate tail',
      isFinal: true,
    });
    FakeWebSocket.latest?.receive({
      type: 'transcript',
      segmentId: 190,
      startMs: 1500,
      endMs: 2600,
      text: 'duplicate tail delta epsilon',
      isFinal: false,
    });
    await nextTick();

    expect(wrapper.text()).toContain('正在接收讯飞转写结果');

    await finishSampling(wrapper);
    await findButton(wrapper, '\u8fdb\u5165\u4e0b\u4e00\u8f6e').trigger(
      'click',
    );
    await flushPromises();

    expect(
      inquiryProtectedMocks.requestProtectedInquiryFollowup.mock.calls[0][1],
    ).toMatchObject({ roundNumber: 2 });
  });

  it('deduplicates overlapped ASR windows when punctuation changes', async () => {
    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await enterInterviewStage(wrapper);

    await findButton(wrapper, '\u5f00\u59cb\u91c7\u6837').trigger('click');
    await flushPromises();
    await nextTick();

    FakeWebSocket.latest?.open();
    FakeWebSocket.latest?.receive({
      type: 'transcript',
      segmentId: 100,
      startMs: 100,
      endMs: 1800,
      text: 'alpha beta, duplicate-tail.',
      isFinal: true,
    });
    FakeWebSocket.latest?.receive({
      type: 'transcript',
      segmentId: 190,
      startMs: 1500,
      endMs: 2600,
      text: 'duplicate tail, delta epsilon',
      isFinal: false,
    });
    await nextTick();

    expect(wrapper.text()).toContain('正在接收讯飞转写结果');
  });

  it('sends 16k pcm frames to the AI-Service ASR websocket', async () => {
    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await enterInterviewStage(wrapper);

    await findButton(wrapper, '开始采样').trigger('click');
    await flushPromises();
    await nextTick();

    FakeWebSocket.latest?.open();
    await nextTick();

    FakeAudioContext.latestProcessor?.onaudioprocess?.({
      inputBuffer: {
        getChannelData: () => new Float32Array(4096).fill(0.5),
      },
      outputBuffer: {
        getChannelData: () => new Float32Array(4096),
      },
    } as AudioProcessingEvent);
    await nextTick();

    expect(FakeWebSocket.latest?.url).toBe(
      'ws://ai-service.test/v1/asr/iflytek/realtime',
    );
    expect(FakeWebSocket.latest?.sent[0]).toBeInstanceOf(ArrayBuffer);
  });

  it('keeps listening when Iflytek ASR returns an empty result', async () => {
    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await enterInterviewStage(wrapper);

    await findButton(wrapper, '开始采样').trigger('click');
    await flushPromises();
    await nextTick();

    FakeWebSocket.latest?.open();
    FakeWebSocket.latest?.receive({
      type: 'transcript',
      segmentId: 100,
      text: '   ',
      isFinal: false,
    });
    await nextTick();

    expect(wrapper.text()).toContain('未识别到有效文本，继续监听。');
  });

  it('does not block sampling when realtime ASR websocket is unavailable', async () => {
    vi.stubGlobal('WebSocket', undefined);

    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await enterInterviewStage(wrapper);

    await findButton(wrapper, '开始采样').trigger('click');
    await flushPromises();
    await nextTick();

    expect(wrapper.text()).toContain('当前浏览器不支持 WebSocket 音频转写');

    await finishSampling(wrapper);
    expect(
      inquiryProtectedMocks.uploadProtectedInquiryRoundWindow,
    ).toHaveBeenCalledTimes(1);

    await findButton(wrapper, '进入下一轮').trigger('click');
    await flushPromises();

    expect(
      inquiryProtectedMocks.requestProtectedInquiryFollowup,
    ).toHaveBeenCalledTimes(1);
    expect(
      inquiryProtectedMocks.requestProtectedInquiryFollowup.mock.calls[0][1],
    ).toMatchObject({ roundNumber: 2 });
  });

  it('stops advancing when the configured interaction round limit is reached', async () => {
    adminServiceMocks.getInquirySettings.mockResolvedValue({
      maxRounds: 2,
      minRounds: 1,
      maxAllowedRounds: 10,
      updatedAt: '2026-05-11T08:00:00Z',
    });

    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await enterInterviewStage(wrapper);

    await findButton(wrapper, '开始采样').trigger('click');
    await flushPromises();
    await nextTick();
    await finishSampling(wrapper);
    await findButton(wrapper, '进入下一轮').trigger('click');
    await flushPromises();
    await nextTick();

    expect(
      inquiryProtectedMocks.requestProtectedInquiryFollowup,
    ).toHaveBeenCalledTimes(1);

    await findButton(wrapper, '开始采样').trigger('click');
    await flushPromises();
    await nextTick();
    await finishSampling(wrapper);
    await nextTick();

    const nextRoundButton = findButton(wrapper, '进入下一轮');
    expect(nextRoundButton.attributes('disabled')).toBeUndefined();
    expect(wrapper.text()).toContain('已达到管理员设置的总交互轮次上限');
    expect(wrapper.text()).toContain('当前上限');
    expect(wrapper.text()).toContain('2 轮');

    await nextRoundButton.trigger('click');
    await flushPromises();

    expect(
      inquiryProtectedMocks.requestProtectedInquiryFollowup,
    ).toHaveBeenCalledTimes(1);
    expect(wrapper.text()).toContain('最多只能进行 2 轮问询');
    expect(elMessageMocks.warning).toHaveBeenCalledWith(
      '最多只能进行 2 轮问询，请进入人工辅助判断。',
    );
    const judgementButton = findButton(wrapper, '进入人工辅助判断');
    expect(judgementButton.attributes('disabled')).toBeUndefined();

    await judgementButton.trigger('click');
    await flushPromises();

    expect(
      inquiryProtectedMocks.requestProtectedInquiryFollowup,
    ).toHaveBeenCalledTimes(1);
    expect(wrapper.text()).toContain('人工辅助判断');
  });

  it('persists archive payload and locks the completed view after archiving', async () => {
    adminServiceMocks.getInquirySettings.mockResolvedValue({
      maxRounds: 1,
      minRounds: 1,
      maxAllowedRounds: 10,
      updatedAt: '2026-05-11T08:00:00Z',
    });

    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await enterInterviewStage(wrapper);

    await findButton(wrapper, '开始采样').trigger('click');
    await flushPromises();
    await nextTick();
    await finishSampling(wrapper);

    await findButton(wrapper, '进入人工辅助判断').trigger('click');
    await flushPromises();
    await nextTick();

    await findButton(wrapper, '无异常').trigger('click');
    const reasonInput = wrapper.find('textarea[placeholder*="请详细说明"]');
    await reasonInput.setValue(
      '该旅客回答与采样摘要基本一致，未发现明显异常风险。',
    );
    await findButton(wrapper, '归档').trigger('click');
    await flushPromises();
    await nextTick();

    expect(archiveServiceMocks.uploadInquiryArchiveVideo).toHaveBeenCalledTimes(
      1,
    );
    expect(archiveServiceMocks.createInquiryArchive).toHaveBeenCalledTimes(1);
    const payload = archiveServiceMocks.createInquiryArchive.mock.calls[0][0];
    expect(payload).toMatchObject({
      sessionId: expect.any(String),
      finalJudgement: 'clear',
      rounds: [
        {
          roundNo: 1,
          videos: [
            {
              fileName: 'round-1.mp4',
              contentType: 'video/mp4',
              sizeBytes: 4,
              minioBucket: 'ipra-videos',
              minioObjectKey:
                'humanomni-windows/2026/05/16/session-window-1.mp4',
            },
          ],
        },
      ],
    });
    expect(wrapper.text()).toContain('流程已完成归档');
    expect(wrapper.text()).toContain('问询记录已保存');
  });
});
