/* @vitest-environment jsdom */

import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import UserAskView from './UserAskView.vue';

const aiServiceMocks = vi.hoisted(() => ({
  requestFirstRoundStrategy: vi.fn(),
  requestFollowupGuidance: vi.fn(),
  resolveAiServiceWebSocketUrl: vi.fn(
    (path: string) => `ws://ai-service.test${path}`,
  ),
  uploadHumanOmniWindow: vi.fn(),
}));

vi.mock('../app/ai-service', () => aiServiceMocks);

const archiveServiceMocks = vi.hoisted(() => ({
  createInquiryArchive: vi.fn(),
  uploadInquiryArchiveVideo: vi.fn(),
}));

vi.mock('../app/archive-service', () => archiveServiceMocks);

const profileServiceMocks = vi.hoisted(() => ({
  searchPassengerProfiles: vi.fn(),
}));

vi.mock('../app/profile-service', () => profileServiceMocks);

const routerMocks = vi.hoisted(() => ({
  push: vi.fn(),
  route: {
    query: {
      documentNum: '440582199402155270',
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
      documentNum: '440582199402155270',
    };
    profileServiceMocks.searchPassengerProfiles.mockResolvedValue([
      createPassengerProfile(),
    ]);
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

    aiServiceMocks.requestFirstRoundStrategy.mockResolvedValue({
      sessionId: 'session-1',
      llm: {
        provider: 'mock',
        model: 'test',
      },
      riskAssessment: {
        level: 'medium',
        summary: '需要核验时间线。',
        reasons: ['时间线缺口'],
      },
      strategy: {
        goal: '核验首轮问题',
        focusAreas: ['时间线'],
      },
      questions: [
        {
          questionId: 'q-1',
          priority: 1,
          question: '请说明 10:45 附近的具体动作。',
          purpose: '核对时间线。',
          expectedEvidence: [],
        },
      ],
      operatorNote: '保持中性。',
    });

    aiServiceMocks.uploadHumanOmniWindow.mockResolvedValue({
      ok: true,
      sessionId: 'session-1',
      questionId: 'q-1',
      windowId: 'window-1',
      startSeconds: 0,
      endSeconds: 1,
      modal: 'video_audio',
      uploadedFile: {
        filename: 'round-1.mp4',
        storedPath: '/tmp/humanomni-windows/round-1.mp4',
        contentType: 'video/mp4',
        sizeBytes: 4,
        bucket: null,
        objectKey: null,
      },
      humanOmni: {
        modelName: 'test',
        rawSummary: '对象表述平稳。',
        elapsedSeconds: 1,
      },
      humanOmniWindow: {
        windowId: 'window-1',
        questionId: 'q-1',
        startSeconds: 0,
        endSeconds: 1,
        modal: 'video_audio',
        rawSummary: '对象表述平稳。',
        modelName: 'test',
      },
    });

    archiveServiceMocks.uploadInquiryArchiveVideo.mockResolvedValue({
      uploadedFile: {
        filename: 'round-1.mp4',
        storedPath: 'minio://ipra-videos/humanomni-windows/round-1.mp4',
        contentType: 'video/mp4',
        sizeBytes: 4,
        bucket: 'ipra-videos',
        objectKey: 'humanomni-windows/round-1.mp4',
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

    aiServiceMocks.requestFollowupGuidance.mockResolvedValue({
      sessionId: 'session-1',
      roundNo: 1,
      llm: {
        provider: 'mock',
        model: 'test',
      },
      multimodalAssessment: {
        summary: '继续追问。',
        riskHints: ['回答需要补充'],
        evidence: [],
        limitations: [],
      },
      followupGuidance: [
        {
          priority: 1,
          question: '请补充说明刚才回答中的时间点。',
          reason: '需要补充细节。',
          operatorTip: '保持中性。',
          focusArea: '时间点',
        },
      ],
      operatorNote: '继续问询。',
      warnings: [],
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

    expect(aiServiceMocks.requestFirstRoundStrategy).not.toHaveBeenCalled();
  });

  it('loads the searched passenger profile into the strategy stage', async () => {
    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await flushPromises();
    await nextTick();

    expect(profileServiceMocks.searchPassengerProfiles).toHaveBeenCalledWith(
      '440582199402155270',
    );
    expect(wrapper.text()).toContain('黎泽宝');
    expect(wrapper.text()).toContain('440582199402155270');
    expect(wrapper.text()).toContain('CZ3101 (CAN -> BKK)');
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

    expect(aiServiceMocks.requestFirstRoundStrategy).toHaveBeenCalledTimes(1);
    const payload = aiServiceMocks.requestFirstRoundStrategy.mock.calls[0][0];
    expect(payload.passengerProfile).toMatchObject({
      passengerId: '440582199402155270',
      name: '黎泽宝',
      nationality: '中国',
      occupation: '外贸业务员',
      documents: {
        documentNumber: '440582199402155270',
        pnr: 'CZ3101',
        flightNo: 'CZ3101',
      },
    });
    expect(payload.tripProfile).toMatchObject({
      destination: 'BKK',
      purposeDeclared: '商务拜访',
      stayDays: 6,
      fundingSource: '公司报销',
    });
    expect(payload.knownFacts).toContain(
      '高风险原因：名单命中：异常出境目的待核验',
    );
    expect(JSON.stringify(payload)).not.toContain('E92834102');
    expect(JSON.stringify(payload)).not.toContain('张伟');
    expect(JSON.stringify(payload)).not.toContain('CX880-LAX');
  });

  it('keeps the strategy stage locked when the queried profile is missing', async () => {
    profileServiceMocks.searchPassengerProfiles.mockResolvedValue([]);

    const wrapper = mount(UserAskView);
    mountedWrappers.push(wrapper);
    await flushPromises();
    await nextTick();

    expect(wrapper.text()).toContain('未查询到该证件号的基础画像');
    const strategyButton = findButton(wrapper, '生成策略');
    expect(strategyButton.attributes('disabled')).toBeDefined();
    await strategyButton.trigger('click');
    expect(aiServiceMocks.requestFirstRoundStrategy).not.toHaveBeenCalled();
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
    expect(wrapper.text()).toContain('我在西区货架继续清点');

    await finishSampling(wrapper);
    await findButton(wrapper, '进入下一轮').trigger('click');
    await flushPromises();

    expect(aiServiceMocks.requestFollowupGuidance).toHaveBeenCalledTimes(1);
    expect(
      aiServiceMocks.requestFollowupGuidance.mock.calls[0][0].asr,
    ).toMatchObject({
      status: 'provided',
      provider: 'iflytek-rtasr-llm',
      model: 'rtasr-llm',
      language: 'zh-CN',
      text: '我在西区货架继续清点',
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

    expect(wrapper.text()).toContain('随便走进一个三线城市');
    expect(wrapper.text()).not.toContain('随便走进随便走进');
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

    expect(wrapper.text()).toContain('在这两张图当中我能想到的原因只有两种');
    expect(wrapper.text()).not.toContain('在这两张图当中 在这两张图当中');
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

    expect(wrapper.text()).toContain(
      '不认真，造假更要认真，无论是以上哪种情况',
    );
    expect(wrapper.text()).not.toContain(
      '不认真造假更要认真 不认真，造假更要认真',
    );
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

    const expectedText = 'alpha beta gamma duplicate tail delta epsilon';
    expect(wrapper.text()).toContain(expectedText);
    expect(wrapper.text()).not.toContain('duplicate tail duplicate tail');

    await finishSampling(wrapper);
    await findButton(wrapper, '\u8fdb\u5165\u4e0b\u4e00\u8f6e').trigger(
      'click',
    );
    await flushPromises();

    expect(
      aiServiceMocks.requestFollowupGuidance.mock.calls[0][0].asr.text,
    ).toBe(expectedText);
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

    expect(wrapper.text()).toContain(
      'alpha beta, duplicate-tail, delta epsilon',
    );
    expect(wrapper.text()).not.toContain('duplicate-tail. duplicate tail');
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
    expect(wrapper.text()).toContain('尚无实时转写记录');
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
    expect(aiServiceMocks.uploadHumanOmniWindow).toHaveBeenCalledTimes(1);

    await findButton(wrapper, '进入下一轮').trigger('click');
    await flushPromises();

    expect(aiServiceMocks.requestFollowupGuidance).toHaveBeenCalledTimes(1);
    expect(
      aiServiceMocks.requestFollowupGuidance.mock.calls[0][0].asr,
    ).toMatchObject({
      status: 'not_connected',
      provider: 'iflytek-rtasr-llm',
      text: '',
      segments: [],
    });
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

    expect(aiServiceMocks.requestFollowupGuidance).toHaveBeenCalledTimes(1);

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

    expect(aiServiceMocks.requestFollowupGuidance).toHaveBeenCalledTimes(1);
    expect(wrapper.text()).toContain('最多只能进行 2 轮问询');
    expect(elMessageMocks.warning).toHaveBeenCalledWith(
      '最多只能进行 2 轮问询，请进入人工辅助判断。',
    );
    const judgementButton = findButton(wrapper, '进入人工辅助判断');
    expect(judgementButton.attributes('disabled')).toBeUndefined();

    await judgementButton.trigger('click');
    await flushPromises();

    expect(aiServiceMocks.requestFollowupGuidance).toHaveBeenCalledTimes(1);
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
      finalJudgement: 'clear',
      passengerDocumentNum: '440582199402155270',
      rounds: [
        {
          roundNo: 1,
          videos: [
            {
              minioBucket: 'ipra-videos',
              minioObjectKey: 'humanomni-windows/round-1.mp4',
            },
          ],
        },
      ],
    });
    expect(wrapper.text()).toContain('流程已完成归档');
    expect(wrapper.text()).toContain('IPRA-ASK-20260511-0001');
  });
});
