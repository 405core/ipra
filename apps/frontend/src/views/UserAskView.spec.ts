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

vi.mock('../app/audit-service', () => ({
  recordAuditEvent: vi.fn().mockResolvedValue({ message: 'ok' }),
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

function findButton(wrapper: VueWrapper, label: string) {
  const button = wrapper
    .findAll('button')
    .find((item) => item.text().includes(label));

  expect(button, `button "${label}" should exist`).toBeTruthy();
  return button!;
}

async function enterInterviewStage(wrapper: VueWrapper) {
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

    inquiryProtectedMocks.uploadProtectedInquiryRoundWindow.mockResolvedValue({
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
      },
      historicalRounds: [],
      completedRounds: 1,
      totalSampleDuration: 1,
    });

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
        },
      ],
      completedRounds: 1,
      totalSampleDuration: 1,
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

    expect(inquiryProtectedMocks.requestProtectedInquiryFollowup).toHaveBeenCalledTimes(1);
    expect(
      inquiryProtectedMocks.requestProtectedInquiryFollowup.mock.calls[0][1].asr,
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
    expect(inquiryProtectedMocks.uploadProtectedInquiryRoundWindow).toHaveBeenCalledTimes(1);

    await findButton(wrapper, '进入下一轮').trigger('click');
    await flushPromises();

    expect(inquiryProtectedMocks.requestProtectedInquiryFollowup).toHaveBeenCalledTimes(1);
    expect(
      inquiryProtectedMocks.requestProtectedInquiryFollowup.mock.calls[0][1].asr,
    ).toMatchObject({
      status: 'not_connected',
      provider: 'iflytek-rtasr-llm',
      text: '',
      segments: [],
    });
  });
});
