import {
  DrawingUtils,
  FaceLandmarker,
  FilesetResolver,
  HandLandmarker,
  PoseLandmarker,
  type FaceLandmarkerResult,
  type HandLandmarkerResult,
  type NormalizedLandmark,
  type PoseLandmarkerResult,
} from '@mediapipe/tasks-vision';

export type LandmarkerKind = 'face' | 'hand' | 'pose';
export type LandmarkerState = 'idle' | 'loading' | 'ready' | 'failed' | 'unavailable';
export type DetectionPhase =
  | 'idle'
  | 'loading'
  | 'running'
  | 'partial'
  | 'unavailable'
  | 'error';
export type RealtimeEventTone = 'info' | 'warn' | 'alert';
export type RealtimeEventType =
  | 'gaze_away'
  | 'head_turn'
  | 'head_down'
  | 'brow_tension'
  | 'eye_tension'
  | 'mouth_pressure'
  | 'jaw_activation'
  | 'hand_near_face'
  | 'hand_motion'
  | 'posture_change'
  | 'no_face';

export interface LandmarkerStatus {
  key: LandmarkerKind;
  label: string;
  state: LandmarkerState;
  detail: string;
  active: boolean;
}

export interface OverlayFrameData {
  hasFace: boolean;
  faceCount: number;
  handCount: number;
  poseDetected: boolean;
  detectionFps: number;
  inferenceMs: number;
  detectedAt: number | null;
}

export interface FaceCueSnapshot {
  available: boolean;
  browTension: number;
  eyeTension: number;
  mouthPressure: number;
  jawActivation: number;
  dominantCue: string;
}

export interface RealtimeEvent {
  id: string;
  type: RealtimeEventType;
  title: string;
  detail: string;
  tone: RealtimeEventTone;
  timestamp: number;
  displayTime: string;
}

export interface SamplingConsoleEntry {
  id: string;
  kind: 'status' | 'event';
  tone: RealtimeEventTone;
  title: string;
  detail: string;
  time: string;
}

export interface RealtimeDetectionState {
  phase: DetectionPhase;
  statusMessage: string;
  windowSummary: string;
  lastDetectedAt: number | null;
  enabledModels: LandmarkerKind[];
  models: Record<LandmarkerKind, LandmarkerStatus>;
  overlayFrame: OverlayFrameData;
  faceCues: FaceCueSnapshot;
  events: RealtimeEvent[];
  consoleEntries: SamplingConsoleEntry[];
}

interface RealtimeDetectionOptions {
  onUpdate?: (state: RealtimeDetectionState) => void;
  targetFps?: number;
  maxEntries?: number;
}

export interface RealtimeDetectionController {
  start(video: HTMLVideoElement, canvas: HTMLCanvasElement): Promise<void>;
  stop(): void;
}

interface Point {
  x: number;
  y: number;
}

interface Bounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  center: Point;
}

interface FaceSignalSet {
  bounds: Bounds | null;
  turned: boolean;
  lowered: boolean;
  gazeAway: boolean;
}

const MEDIAPIPE_WASM_ROOT =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm';

const MODEL_ASSETS: Record<LandmarkerKind, string> = {
  face:
    'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task',
  hand:
    'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task',
  pose:
    'https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/latest/pose_landmarker_lite.task',
};

const LANDMARKER_LABELS: Record<LandmarkerKind, string> = {
  face: 'Face Landmarker',
  hand: 'Hand Landmarker',
  pose: 'Pose Landmarker',
};

const EVENT_COOLDOWN_MS = 1800;
const EVENT_WINDOW_MS = 7000;
const FACE_CUE_LABELS: Record<keyof Omit<FaceCueSnapshot, 'available' | 'dominantCue'>, string> = {
  browTension: '眉部紧张',
  eyeTension: '眼周收缩',
  mouthPressure: '唇部压紧',
  jawActivation: '下颌动作',
};

export function createIdleRealtimeDetectionState(
  overrides: Partial<RealtimeDetectionState> = {}
): RealtimeDetectionState {
  const baseModels = createDefaultModels();
  const baseState: RealtimeDetectionState = {
    phase: 'idle',
    statusMessage: '等待开始采样',
    windowSummary: '开始采样后，这里会生成面部、手势与姿态的实时辅助提示。',
    lastDetectedAt: null,
    enabledModels: [],
    models: baseModels,
    overlayFrame: {
      hasFace: false,
      faceCount: 0,
      handCount: 0,
      poseDetected: false,
      detectionFps: 0,
      inferenceMs: 0,
      detectedAt: null,
    },
    faceCues: createIdleFaceCueSnapshot(),
    events: [],
    consoleEntries: [],
  };

  return {
    ...baseState,
    ...overrides,
    enabledModels: overrides.enabledModels ? [...overrides.enabledModels] : baseState.enabledModels,
    models: {
      face: { ...baseModels.face, ...(overrides.models?.face || {}) },
      hand: { ...baseModels.hand, ...(overrides.models?.hand || {}) },
      pose: { ...baseModels.pose, ...(overrides.models?.pose || {}) },
    },
    overlayFrame: {
      ...baseState.overlayFrame,
      ...(overrides.overlayFrame || {}),
    },
    faceCues: {
      ...baseState.faceCues,
      ...(overrides.faceCues || {}),
    },
    events: overrides.events ? overrides.events.map((event) => ({ ...event })) : [],
    consoleEntries: overrides.consoleEntries
      ? overrides.consoleEntries.map((entry) => ({ ...entry }))
      : [],
  };
}

export function createRealtimeDetectionController(
  options: RealtimeDetectionOptions = {}
): RealtimeDetectionController {
  const targetFps = options.targetFps ?? 6;
  const maxEntries = options.maxEntries ?? 10;

  let state = createIdleRealtimeDetectionState();
  let faceLandmarker: FaceLandmarker | null = null;
  let handLandmarker: HandLandmarker | null = null;
  let poseLandmarker: PoseLandmarker | null = null;
  let overlayCanvas: HTMLCanvasElement | null = null;
  let overlayContext: CanvasRenderingContext2D | null = null;
  let drawingUtils: DrawingUtils | null = null;
  let activeVideo: HTMLVideoElement | null = null;
  let rafId: number | null = null;
  let running = false;
  let sessionId = 0;
  let lastDetectAt = 0;
  let previousDetectionAt = 0;
  let noFaceSince = 0;
  let previousHandCenters: Point[] = [];
  let previousTorsoCenter: Point | null = null;
  let torsoBaseline: Point | null = null;
  let previousFaceCues = createIdleFaceCueSnapshot();
  const lastEventTimes = new Map<RealtimeEventType, number>();

  function emit() {
    options.onUpdate?.(cloneState(state));
  }

  function setState(next: RealtimeDetectionState) {
    state = next;
    emit();
  }

  function updateState(patch: Partial<RealtimeDetectionState>) {
    state = createIdleRealtimeDetectionState({
      ...state,
      ...patch,
      models: patch.models || state.models,
      overlayFrame: patch.overlayFrame || state.overlayFrame,
      faceCues: patch.faceCues || state.faceCues,
      events: patch.events || state.events,
      consoleEntries: patch.consoleEntries || state.consoleEntries,
    });
    emit();
  }

  function setModelState(kind: LandmarkerKind, patch: Partial<LandmarkerStatus>) {
    state = createIdleRealtimeDetectionState({
      ...state,
      models: {
        ...state.models,
        [kind]: {
          ...state.models[kind],
          ...patch,
        },
      },
    });
    emit();
  }

  function pushConsoleEntry(
    kind: SamplingConsoleEntry['kind'],
    tone: RealtimeEventTone,
    title: string,
    detail: string,
    timestamp = Date.now()
  ) {
    const nextEntry: SamplingConsoleEntry = {
      id: `${kind}-${timestamp}-${Math.random().toString(36).slice(2, 7)}`,
      kind,
      tone,
      title,
      detail,
      time: formatClockTime(timestamp),
    };

    state = createIdleRealtimeDetectionState({
      ...state,
      consoleEntries: [nextEntry, ...state.consoleEntries].slice(0, maxEntries),
    });
    emit();
  }

  function pushRealtimeEvent(event: Omit<RealtimeEvent, 'id' | 'displayTime'>) {
    const lastTimestamp = lastEventTimes.get(event.type) ?? 0;
    if (event.timestamp - lastTimestamp < EVENT_COOLDOWN_MS) {
      return;
    }

    lastEventTimes.set(event.type, event.timestamp);
    const nextEvent: RealtimeEvent = {
      ...event,
      id: `${event.type}-${event.timestamp}`,
      displayTime: formatClockTime(event.timestamp),
    };
    const recentEvents = [nextEvent, ...state.events]
      .filter((item) => event.timestamp - item.timestamp <= EVENT_WINDOW_MS)
      .slice(0, 8);

    state = createIdleRealtimeDetectionState({
      ...state,
      events: recentEvents,
    });
    pushConsoleEntry('event', event.tone, event.title, event.detail, event.timestamp);
  }

  function updateSummary(timestamp: number) {
    const recentEvents = state.events.filter((item) => timestamp - item.timestamp <= EVENT_WINDOW_MS);
    const activeTypes = new Set(recentEvents.map((item) => item.type));
    const overlayFrame = state.overlayFrame;
    const faceCues = state.faceCues;

    let summary = '当前画面整体稳定，建议继续结合问题节点观察应答节奏与停顿位置。';
    if (!overlayFrame.hasFace) {
      summary = '当前窗口未稳定识别人脸，建议保持正对镜头并减少大幅离位。';
    } else if (
      activeTypes.has('brow_tension') ||
      activeTypes.has('eye_tension') ||
      activeTypes.has('mouth_pressure') ||
      activeTypes.has('jaw_activation')
    ) {
      summary = `最近数秒面部出现短时波动，当前以“${faceCues.dominantCue || '面部细微变化'}”最明显，适合对照问题节点继续观察。`;
    } else if (activeTypes.has('gaze_away') || activeTypes.has('head_turn') || activeTypes.has('head_down')) {
      summary = '最近数秒出现视线或头部偏移，适合对照当前问题节点关注回避式反应。';
    } else if (activeTypes.has('hand_near_face') || activeTypes.has('hand_motion')) {
      summary = '最近数秒手部动作较活跃并多次靠近面部，可作为补充观察线索。';
    } else if (activeTypes.has('posture_change')) {
      summary = '最近数秒姿态变化较明显，建议结合转写时间点复核坐姿变化前后的陈述。';
    } else if (faceCues.available) {
      summary = `已启用面部 blendshape 辅助检测，当前以“${faceCues.dominantCue || '面部细微变化'}”分量较高。`;
    } else if (overlayFrame.poseDetected && overlayFrame.handCount > 0) {
      summary = '已同步跟踪面部、手势和姿态，画面具备持续观察条件。';
    }

    updateState({
      windowSummary: summary,
      events: recentEvents,
    });
  }

  function resetTransientSignals() {
    previousHandCenters = [];
    previousTorsoCenter = null;
    torsoBaseline = null;
    previousFaceCues = createIdleFaceCueSnapshot();
    noFaceSince = 0;
    lastEventTimes.clear();
  }

  function clearOverlay() {
    if (!overlayContext || !overlayCanvas) {
      return;
    }

    overlayContext.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
  }

  function stopLoop() {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
    running = false;
  }

  function closeLandmarkers() {
    faceLandmarker?.close();
    handLandmarker?.close();
    poseLandmarker?.close();
    faceLandmarker = null;
    handLandmarker = null;
    poseLandmarker = null;
  }

  async function initializeLandmarkers(activeSessionId: number) {
    setState(
      createIdleRealtimeDetectionState({
        ...state,
        phase: 'loading',
        statusMessage: 'MediaPipe 视觉模型加载中',
        windowSummary: '正在从前端初始化 Face / Hand / Pose Landmarker。',
        models: createDefaultModels('loading', '加载中'),
      })
    );
    pushConsoleEntry(
      'status',
      'info',
      '视觉检测准备中',
      '正在加载 MediaPipe 前端模型与推理资源。'
    );

    let visionFileset;
    try {
      visionFileset = await FilesetResolver.forVisionTasks(MEDIAPIPE_WASM_ROOT);
    } catch (error) {
      if (activeSessionId !== sessionId) {
        return false;
      }
      const detail = resolveInitializationError(error);
      setState(
        createIdleRealtimeDetectionState({
          phase: 'unavailable',
          statusMessage: '实时视觉检测不可用',
          windowSummary: detail,
          models: createDefaultModels('unavailable', detail),
        })
      );
      pushConsoleEntry('status', 'warn', '视觉检测不可用', detail);
      return false;
    }

    if (activeSessionId !== sessionId) {
      return false;
    }

    const results = await Promise.allSettled([
      FaceLandmarker.createFromOptions(visionFileset, {
        baseOptions: {
          modelAssetPath: MODEL_ASSETS.face,
        },
        runningMode: 'VIDEO',
        numFaces: 1,
        minFaceDetectionConfidence: 0.45,
        minFacePresenceConfidence: 0.45,
        minTrackingConfidence: 0.45,
        outputFaceBlendshapes: true,
      }),
      HandLandmarker.createFromOptions(visionFileset, {
        baseOptions: {
          modelAssetPath: MODEL_ASSETS.hand,
        },
        runningMode: 'VIDEO',
        numHands: 2,
        minHandDetectionConfidence: 0.45,
        minHandPresenceConfidence: 0.45,
        minTrackingConfidence: 0.45,
      }),
      PoseLandmarker.createFromOptions(visionFileset, {
        baseOptions: {
          modelAssetPath: MODEL_ASSETS.pose,
        },
        runningMode: 'VIDEO',
        numPoses: 1,
        minPoseDetectionConfidence: 0.45,
        minPosePresenceConfidence: 0.45,
        minTrackingConfidence: 0.45,
        outputSegmentationMasks: false,
      }),
    ]);

    const enabledModels: LandmarkerKind[] = [];
    const kinds: LandmarkerKind[] = ['face', 'hand', 'pose'];
    const createdLandmarkers: Array<FaceLandmarker | HandLandmarker | PoseLandmarker | null> = [
      null,
      null,
      null,
    ];

    results.forEach((result, index) => {
      const kind = kinds[index];
      if (result.status === 'fulfilled') {
        createdLandmarkers[index] = result.value;
        enabledModels.push(kind);
        setModelState(kind, {
          state: 'ready',
          active: true,
          detail: kind === 'face' ? '已就绪 · 含 blendshapes' : '已就绪',
        });
        pushConsoleEntry('status', 'info', `${LANDMARKER_LABELS[kind]} 已就绪`, '已纳入本轮实时辅助检测。');
      } else {
        setModelState(kind, {
          state: 'failed',
          active: false,
          detail: resolveInitializationError(result.reason),
        });
        pushConsoleEntry(
          'status',
          'warn',
          `${LANDMARKER_LABELS[kind]} 未启用`,
          resolveInitializationError(result.reason)
        );
      }
    });

    if (activeSessionId !== sessionId) {
      createdLandmarkers.forEach((landmarker) => landmarker?.close());
      return false;
    }

    faceLandmarker = (createdLandmarkers[0] as FaceLandmarker | null) ?? null;
    handLandmarker = (createdLandmarkers[1] as HandLandmarker | null) ?? null;
    poseLandmarker = (createdLandmarkers[2] as PoseLandmarker | null) ?? null;

    if (!enabledModels.length) {
      setState(
        createIdleRealtimeDetectionState({
          phase: 'unavailable',
          statusMessage: '实时视觉检测不可用',
          windowSummary: '当前浏览器采样仍可继续，但 MediaPipe 模型未能成功加载。',
          enabledModels: [],
          models: state.models,
          consoleEntries: state.consoleEntries,
        })
      );
      return false;
    }

    setState(
      createIdleRealtimeDetectionState({
        ...state,
        phase: enabledModels.length === 3 ? 'running' : 'partial',
        statusMessage:
          enabledModels.length === 3 ? '视觉检测运行中' : '视觉检测部分可用',
        windowSummary:
          enabledModels.length === 3
            ? '前端已同时启用人脸、手势与姿态跟踪。'
            : '部分视觉模型已启用，仍可继续辅助采样。',
        enabledModels,
      })
    );
    return true;
  }

  function syncCanvasSize() {
    if (!activeVideo || !overlayCanvas) {
      return;
    }

    const width = activeVideo.videoWidth || 1280;
    const height = activeVideo.videoHeight || 720;

    if (overlayCanvas.width !== width || overlayCanvas.height !== height) {
      overlayCanvas.width = width;
      overlayCanvas.height = height;
    }
  }

  function drawResults(
    faceResult: FaceLandmarkerResult | null,
    handResult: HandLandmarkerResult | null,
    poseResult: PoseLandmarkerResult | null
  ) {
    if (!overlayContext || !drawingUtils || !overlayCanvas) {
      return;
    }

    const context = overlayContext;
    const canvas = overlayCanvas;

    context.clearRect(0, 0, canvas.width, canvas.height);

    faceResult?.faceLandmarks.forEach((landmarks) => {
      drawingUtils?.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, {
        color: '#8ae3ff',
        lineWidth: 2.2,
      });
      drawingUtils?.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, {
        color: '#dbf8ff',
        lineWidth: 1.5,
      });
      drawingUtils?.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, {
        color: '#dbf8ff',
        lineWidth: 1.5,
      });
      drawingUtils?.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_IRIS, {
        color: '#73d4f4',
        lineWidth: 1.2,
      });
      drawingUtils?.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_IRIS, {
        color: '#73d4f4',
        lineWidth: 1.2,
      });
      drawingUtils?.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, {
        color: '#ffca9f',
        lineWidth: 1.6,
      });

      const faceBounds = computeBounds(landmarks);
      if (faceBounds) {
        drawBounds(context, canvas, faceBounds, 'rgba(138, 227, 255, 0.92)');
      }
    });

    handResult?.landmarks.forEach((landmarks) => {
      drawingUtils?.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, {
        color: '#ffd46b',
        lineWidth: 2.2,
      });
      drawingUtils?.drawLandmarks(landmarks, {
        color: '#fff5c8',
        fillColor: '#ffd46b',
        lineWidth: 1.2,
        radius: 2.1,
      });
    });

    poseResult?.landmarks.forEach((landmarks) => {
      drawingUtils?.drawConnectors(landmarks, PoseLandmarker.POSE_CONNECTIONS, {
        color: '#75e7a1',
        lineWidth: 2,
      });
      drawingUtils?.drawLandmarks(landmarks, {
        color: '#d7ffe7',
        fillColor: '#75e7a1',
        lineWidth: 1,
        radius: 1.9,
      });
    });
  }

  function handleRealtimeSignals(
    timestamp: number,
    faceResult: FaceLandmarkerResult | null,
    handResult: HandLandmarkerResult | null,
    poseResult: PoseLandmarkerResult | null
  ) {
    const faceLandmarks = faceResult?.faceLandmarks[0] || null;
    const faceCueSnapshot = deriveFaceCueSnapshot(faceResult);
    const handLandmarks = handResult?.landmarks || [];
    const poseLandmarks = poseResult?.landmarks[0] || null;

    const faceSignals = deriveFaceSignals(faceLandmarks);
    const handCount = handLandmarks.length;
    const poseDetected = Boolean(poseLandmarks?.length);

    if (!faceSignals.bounds) {
      noFaceSince = noFaceSince || timestamp;
      if (timestamp - noFaceSince > 1600) {
        pushRealtimeEvent({
          type: 'no_face',
          title: '当前未稳定识别人脸',
          detail: '画面中的面部关键点持续缺失，建议提示对象回到镜头正前方。',
          tone: 'warn',
          timestamp,
        });
      }
    } else {
      noFaceSince = 0;
    }

    if (faceSignals.gazeAway) {
      pushRealtimeEvent({
        type: 'gaze_away',
        title: '检测到视线偏移',
        detail: '面部关键点显示近几帧存在明显偏离镜头的趋势。',
        tone: 'warn',
        timestamp,
      });
    }

    if (faceSignals.turned) {
      pushRealtimeEvent({
        type: 'head_turn',
        title: '检测到转头动作',
        detail: '头部朝向发生变化，建议对照当前问题观察是否存在回避性转头。',
        tone: 'info',
        timestamp,
      });
    }

    if (faceSignals.lowered) {
      pushRealtimeEvent({
        type: 'head_down',
        title: '检测到低头趋势',
        detail: '鼻尖与眼部关键点相对位置下移，近期存在低头动作。',
        tone: 'warn',
        timestamp,
      });
    }

    if (faceCueSnapshot.available) {
      const browDelta = faceCueSnapshot.browTension - previousFaceCues.browTension;
      const eyeDelta = faceCueSnapshot.eyeTension - previousFaceCues.eyeTension;
      const mouthDelta = faceCueSnapshot.mouthPressure - previousFaceCues.mouthPressure;
      const jawDelta = faceCueSnapshot.jawActivation - previousFaceCues.jawActivation;

      if (faceCueSnapshot.browTension > 0.34 && browDelta > 0.08) {
        pushRealtimeEvent({
          type: 'brow_tension',
          title: '眉部张力抬升',
          detail: '眉部 blendshape 在短时间内抬升，出现额眉区域收紧或上提候选信号。',
          tone: 'info',
          timestamp,
        });
      }

      if (faceCueSnapshot.eyeTension > 0.32 && eyeDelta > 0.07) {
        pushRealtimeEvent({
          type: 'eye_tension',
          title: '眼周收缩增强',
          detail: '眼周 blendshape 在近几帧明显增强，出现眯眼或眼周收缩候选信号。',
          tone: 'warn',
          timestamp,
        });
      }

      if (faceCueSnapshot.mouthPressure > 0.28 && mouthDelta > 0.07) {
        pushRealtimeEvent({
          type: 'mouth_pressure',
          title: '唇部压紧增强',
          detail: '口周 blendshape 短时抬升，出现抿嘴或唇部压紧候选信号。',
          tone: 'warn',
          timestamp,
        });
      }

      if (faceCueSnapshot.jawActivation > 0.3 && jawDelta > 0.08) {
        pushRealtimeEvent({
          type: 'jaw_activation',
          title: '下颌动作增强',
          detail: '下颌相关 blendshape 短时抬升，出现明显张口或下颌动作候选信号。',
          tone: 'info',
          timestamp,
        });
      }
    }

    if (handCount) {
      const handCenters = handLandmarks.map((landmarks) => averagePoints([landmarks[0], landmarks[5], landmarks[9], landmarks[13], landmarks[17]]));
      const handMovement = computeMotionDelta(handCenters, previousHandCenters);
      const nearFace = detectHandNearFace(handLandmarks, faceSignals.bounds);

      if (nearFace) {
        pushRealtimeEvent({
          type: 'hand_near_face',
          title: '手靠近脸部',
          detail: '手部关键点多次进入面部附近区域，可作为补充观察线索。',
          tone: 'warn',
          timestamp,
        });
      }

      if (handMovement > 0.032) {
        pushRealtimeEvent({
          type: 'hand_motion',
          title: '手部移动明显',
          detail: '近几帧手部位移幅度较大，当前处于较活跃的解释动作阶段。',
          tone: 'info',
          timestamp,
        });
      }

      previousHandCenters = handCenters;
    } else {
      previousHandCenters = [];
    }

    if (poseLandmarks) {
      const torsoCenter = averagePoints([
        poseLandmarks[11],
        poseLandmarks[12],
        poseLandmarks[23],
        poseLandmarks[24],
      ]);
      const shoulderTilt = Math.abs((poseLandmarks[11]?.y || 0) - (poseLandmarks[12]?.y || 0));
      const torsoShift = previousTorsoCenter ? distanceBetween(torsoCenter, previousTorsoCenter) : 0;
      const baselineShift = torsoBaseline ? distanceBetween(torsoCenter, torsoBaseline) : 0;

      if (!torsoBaseline) {
        torsoBaseline = torsoCenter;
      } else {
        torsoBaseline = interpolatePoint(torsoBaseline, torsoCenter, 0.08);
      }
      previousTorsoCenter = torsoCenter;

      if (shoulderTilt > 0.05 || torsoShift > 0.035 || baselineShift > 0.045) {
        pushRealtimeEvent({
          type: 'posture_change',
          title: '姿态明显变化',
          detail: '肩线倾斜或躯干中心在短时间内出现偏移，适合结合转写节点复核。',
          tone: 'info',
          timestamp,
        });
      }
    } else {
      previousTorsoCenter = null;
    }

    const nextFrame: OverlayFrameData = {
      hasFace: Boolean(faceSignals.bounds),
      faceCount: faceResult?.faceLandmarks.length || 0,
      handCount,
      poseDetected,
      detectionFps: state.overlayFrame.detectionFps,
      inferenceMs: state.overlayFrame.inferenceMs,
      detectedAt: timestamp,
    };

    let statusMessage = '视觉检测运行中';
    if (!nextFrame.hasFace) {
      statusMessage = '检测中 · 当前未稳定识别人脸';
    } else if (handCount > 1) {
      statusMessage = '检测中 · 多手势活跃';
    } else if (poseDetected && handCount > 0) {
      statusMessage = '检测中 · 面部、手势与姿态联动';
    } else if (state.phase === 'partial') {
      statusMessage = '检测中 · 部分视觉模型可用';
    }

    updateState({
      lastDetectedAt: timestamp,
      statusMessage,
      overlayFrame: nextFrame,
      faceCues: faceCueSnapshot,
    });
    previousFaceCues = faceCueSnapshot;
    updateSummary(timestamp);
  }

  function detectFrame(timestamp: number) {
    if (!activeVideo || !overlayCanvas || !overlayContext || !drawingUtils) {
      return;
    }

    if (activeVideo.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
      return;
    }

    syncCanvasSize();
    const inferenceStartedAt = performance.now();
    const faceResult = faceLandmarker ? faceLandmarker.detectForVideo(activeVideo, timestamp) : null;
    const handResult = handLandmarker ? handLandmarker.detectForVideo(activeVideo, timestamp) : null;
    const poseResult = poseLandmarker ? poseLandmarker.detectForVideo(activeVideo, timestamp) : null;
    const inferenceMs = performance.now() - inferenceStartedAt;
    const fps =
      previousDetectionAt > 0 ? 1000 / Math.max(1, timestamp - previousDetectionAt) : state.overlayFrame.detectionFps;
    previousDetectionAt = timestamp;

    drawResults(faceResult, handResult, poseResult);

    updateState({
      overlayFrame: {
        ...state.overlayFrame,
        detectionFps: Number.isFinite(fps) ? Number(fps.toFixed(1)) : 0,
        inferenceMs: Number(inferenceMs.toFixed(1)),
      },
    });

    handleRealtimeSignals(timestamp, faceResult, handResult, poseResult);
  }

  function loop(frameTime: number) {
    if (!running) {
      return;
    }

    rafId = window.requestAnimationFrame(loop);
    if (frameTime - lastDetectAt < 1000 / targetFps) {
      return;
    }

    lastDetectAt = frameTime;
    detectFrame(frameTime);
  }

  return {
    async start(video, canvas) {
      const activeSessionId = sessionId + 1;
      sessionId = activeSessionId;
      stopLoop();
      closeLandmarkers();
      resetTransientSignals();
      overlayCanvas = canvas;
      overlayContext = canvas.getContext('2d');
      activeVideo = video;

      if (!overlayContext) {
        setState(
          createIdleRealtimeDetectionState({
            phase: 'error',
            statusMessage: '检测叠加层不可用',
            windowSummary: '浏览器未能创建绘图上下文，实时视觉检测已降级。',
          })
        );
        pushConsoleEntry(
          'status',
          'warn',
          '绘图层创建失败',
          '当前采样仍可继续，但无法在视频上叠加关键点。'
        );
        return;
      }

      overlayContext.lineCap = 'round';
      overlayContext.lineJoin = 'round';
      drawingUtils = new DrawingUtils(overlayContext);
      clearOverlay();

      const initialized = await initializeLandmarkers(activeSessionId);
      if (activeSessionId !== sessionId || !initialized || !state.enabledModels.length) {
        clearOverlay();
        return;
      }

      running = true;
      lastDetectAt = 0;
      previousDetectionAt = 0;
      rafId = window.requestAnimationFrame(loop);
    },

    stop() {
      sessionId += 1;
      stopLoop();
      closeLandmarkers();
      clearOverlay();
      drawingUtils = null;
      overlayContext = null;
      overlayCanvas = null;
      activeVideo = null;
      resetTransientSignals();

      if (state.phase === 'idle') {
        emit();
        return;
      }

      setState(
        createIdleRealtimeDetectionState({
          ...state,
          phase: 'idle',
          statusMessage: '视觉检测已停止',
          windowSummary:
            state.events.length > 0
              ? state.windowSummary
              : '采样已停止，等待下一轮开始后重新进入实时视觉检测。',
          enabledModels: state.enabledModels,
          models: state.models,
          events: state.events,
          consoleEntries: state.consoleEntries,
          overlayFrame: {
            ...state.overlayFrame,
            detectionFps: 0,
          },
        })
      );
      pushConsoleEntry('status', 'info', '视觉检测已停止', '本轮不再新增视觉事件，等待下一次采样开始。');
    },
  };
}

function createDefaultModels(
  state: LandmarkerState = 'idle',
  detail = '待启动'
): Record<LandmarkerKind, LandmarkerStatus> {
  return {
    face: {
      key: 'face',
      label: LANDMARKER_LABELS.face,
      state,
      detail,
      active: false,
    },
    hand: {
      key: 'hand',
      label: LANDMARKER_LABELS.hand,
      state,
      detail,
      active: false,
    },
    pose: {
      key: 'pose',
      label: LANDMARKER_LABELS.pose,
      state,
      detail,
      active: false,
    },
  };
}

function createIdleFaceCueSnapshot(): FaceCueSnapshot {
  return {
    available: false,
    browTension: 0,
    eyeTension: 0,
    mouthPressure: 0,
    jawActivation: 0,
    dominantCue: '暂无面部波动',
  };
}

function cloneState(state: RealtimeDetectionState): RealtimeDetectionState {
  return createIdleRealtimeDetectionState(state);
}

function formatClockTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString('zh-CN', {
    hour12: false,
  });
}

function resolveInitializationError(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return '模型资源加载失败，请检查网络或浏览器兼容性。';
}

function deriveFaceCueSnapshot(faceResult: FaceLandmarkerResult | null): FaceCueSnapshot {
  const categories = faceResult?.faceBlendshapes?.[0]?.categories || [];
  if (!categories.length) {
    return createIdleFaceCueSnapshot();
  }

  const categoryMap = new Map(categories.map((category) => [category.categoryName, category.score]));
  const browTension = clamp01(
    Math.max(
      averageScore(categoryMap, ['browDownLeft', 'browDownRight']),
      averageScore(categoryMap, ['browInnerUp']),
      averageScore(categoryMap, ['browOuterUpLeft', 'browOuterUpRight']) * 0.82
    )
  );
  const eyeTension = clamp01(
    Math.max(
      averageScore(categoryMap, ['eyeSquintLeft', 'eyeSquintRight']),
      averageScore(categoryMap, ['eyeWideLeft', 'eyeWideRight']) * 0.68
    )
  );
  const mouthPressure = clamp01(
    Math.max(
      averageScore(categoryMap, ['mouthPressLeft', 'mouthPressRight']),
      averageScore(categoryMap, ['mouthRollUpper', 'mouthRollLower']) * 0.78,
      averageScore(categoryMap, ['mouthPucker']) * 0.72
    )
  );
  const jawActivation = clamp01(
    Math.max(
      averageScore(categoryMap, ['jawOpen']) * 0.9,
      averageScore(categoryMap, ['jawLeft', 'jawRight']),
      averageScore(categoryMap, ['mouthStretchLeft', 'mouthStretchRight']) * 0.7
    )
  );

  const dominantEntry = Object.entries({
    browTension,
    eyeTension,
    mouthPressure,
    jawActivation,
  }).sort((left, right) => right[1] - left[1])[0];

  const dominantCue =
    dominantEntry && dominantEntry[1] > 0.08
      ? FACE_CUE_LABELS[dominantEntry[0] as keyof typeof FACE_CUE_LABELS]
      : '暂无明显面部波动';

  return {
    available: true,
    browTension,
    eyeTension,
    mouthPressure,
    jawActivation,
    dominantCue,
  };
}

function computeBounds(landmarks?: NormalizedLandmark[] | null): Bounds | null {
  if (!landmarks?.length) {
    return null;
  }

  const xs = landmarks.map((item) => item.x);
  const ys = landmarks.map((item) => item.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return {
    minX,
    maxX,
    minY,
    maxY,
    center: {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2,
    },
  };
}

function averageScore(categoryMap: Map<string, number>, names: string[]) {
  const scores = names
    .map((name) => categoryMap.get(name))
    .filter((score): score is number => typeof score === 'number');

  if (!scores.length) {
    return 0;
  }

  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function averagePoints(points: Array<NormalizedLandmark | Point | undefined>) {
  const validPoints = points.filter(Boolean) as Array<NormalizedLandmark | Point>;
  if (!validPoints.length) {
    return { x: 0, y: 0 };
  }

  const totals = validPoints.reduce(
    (sum, point) => ({
      x: sum.x + point.x,
      y: sum.y + point.y,
    }),
    { x: 0, y: 0 }
  );

  return {
    x: totals.x / validPoints.length,
    y: totals.y / validPoints.length,
  };
}

function distanceBetween(first: Point, second: Point) {
  return Math.hypot(first.x - second.x, first.y - second.y);
}

function interpolatePoint(from: Point, to: Point, ratio: number): Point {
  return {
    x: from.x + (to.x - from.x) * ratio,
    y: from.y + (to.y - from.y) * ratio,
  };
}

function computeMotionDelta(current: Point[], previous: Point[]) {
  if (!current.length || !previous.length) {
    return 0;
  }

  const length = Math.min(current.length, previous.length);
  let total = 0;
  for (let index = 0; index < length; index += 1) {
    total += distanceBetween(current[index], previous[index]);
  }
  return total / length;
}

function deriveFaceSignals(landmarks?: NormalizedLandmark[] | null): FaceSignalSet {
  if (!landmarks?.length) {
    return {
      bounds: null,
      turned: false,
      lowered: false,
      gazeAway: false,
    };
  }

  const leftEye = landmarks[33];
  const rightEye = landmarks[263];
  const noseTip = landmarks[1];
  const forehead = landmarks[10];
  const chin = landmarks[152];

  if (!leftEye || !rightEye || !noseTip || !forehead || !chin) {
    return {
      bounds: computeBounds(landmarks),
      turned: false,
      lowered: false,
      gazeAway: false,
    };
  }

  const eyeCenter = averagePoints([leftEye, rightEye]);
  const faceHeight = Math.max(0.08, Math.abs(chin.y - forehead.y));
  const horizontalOffset = Math.abs(noseTip.x - eyeCenter.x);
  const verticalOffset = noseTip.y - eyeCenter.y;
  const turned = horizontalOffset > 0.032;
  const lowered = verticalOffset > faceHeight * 0.2;
  const gazeAway = horizontalOffset > 0.055 || verticalOffset > faceHeight * 0.28;

  return {
    bounds: computeBounds(landmarks),
    turned,
    lowered,
    gazeAway,
  };
}

function detectHandNearFace(handLandmarks: NormalizedLandmark[][], faceBounds: Bounds | null) {
  if (!faceBounds) {
    return false;
  }

  const expandedBounds = {
    minX: faceBounds.minX - 0.05,
    maxX: faceBounds.maxX + 0.05,
    minY: faceBounds.minY - 0.07,
    maxY: faceBounds.maxY + 0.07,
  };

  return handLandmarks.some((landmarks) =>
    [landmarks[8], landmarks[12], landmarks[0]].some((point) => {
      if (!point) {
        return false;
      }

      const insideBox =
        point.x >= expandedBounds.minX &&
        point.x <= expandedBounds.maxX &&
        point.y >= expandedBounds.minY &&
        point.y <= expandedBounds.maxY;
      const closeToCenter = distanceBetween(point, faceBounds.center) < 0.19;
      return insideBox || closeToCenter;
    })
  );
}

function drawBounds(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  bounds: Bounds,
  strokeStyle: string
) {
  const width = (bounds.maxX - bounds.minX) * canvas.width;
  const height = (bounds.maxY - bounds.minY) * canvas.height;
  const x = bounds.minX * canvas.width;
  const y = bounds.minY * canvas.height;

  context.save();
  context.strokeStyle = strokeStyle;
  context.lineWidth = 2;
  context.setLineDash([10, 6]);
  context.strokeRect(x, y, width, height);
  context.restore();
}
