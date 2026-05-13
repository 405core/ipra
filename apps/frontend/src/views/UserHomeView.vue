<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import SensitiveAssetImage from '../app/SensitiveAssetImage.vue';
import { openTouchInput } from '../app/touch-input';
import { useProtectedPage } from '../app/use-protected-page';
import {
  getProfileRiskCategory,
  recognizeIDCard,
  type IDCardOCRResponse,
  searchPassengerProfilesProtected,
} from '../app/profile-service';
import type {
  ProtectedFactRef,
  ProtectedFieldRef,
  ProtectedListItem,
} from '../app/protected-service';

const router = useRouter();
const defaultCameraStatus = '等待开启摄像头。';
const defaultOCRStatus = '请将身份证保持在取景框内后点击确定。';

const query = ref('');
const touchInputHint = '单击正常输入，双击打开触控键盘';
const results = ref<ProtectedListItem[]>([]);
const recentSearches = ref<string[]>([]);
const searchStatus = ref('');
const isSearching = ref(false);
const lastSearchedQuery = ref('');
const protectedResultError = ref('');
const riskCategoryDialogVisible = ref(false);
const pendingAskProfileId = ref('');
const openingAskProfileId = ref('');
const cameraVideo = ref<HTMLVideoElement | null>(null);
const captureCanvas = ref<HTMLCanvasElement | null>(null);
const isCameraActive = ref(false);
const isCameraStarting = ref(false);
const capturedFrame = ref('');
const cameraStatus = ref(defaultCameraStatus);
const ocrStatus = ref(defaultOCRStatus);
const ocrSide = ref('');
const ocrName = ref('');
const ocrNumber = ref('');
const ocrAddress = ref('');
const ocrAuthority = ref('');
const ocrTimeLimit = ref('');
const cameraPanelStatus = computed(() => {
  const cameraMessage = cameraStatus.value.trim();
  const ocrMessage = ocrStatus.value.trim();

  if (
    !isCameraActive.value &&
    cameraMessage &&
    cameraMessage !== defaultCameraStatus
  ) {
    return cameraMessage;
  }

  return ocrMessage || cameraMessage || defaultOCRStatus;
});
const resultEmptyTitle = computed(() => {
  if (isSearching.value) {
    return '正在检索旅客画像...';
  }

  if (!lastSearchedQuery.value) {
    return '当前没有匹配记录。';
  }

  return searchStatus.value || '当前没有匹配记录。';
});
const resultEmptyDetail = computed(() => {
  if (isSearching.value) {
    return '系统正在根据证件号匹配旅客画像。';
  }

  if (!lastSearchedQuery.value) {
    return '请输入准确证件号后检索。';
  }

  if (searchStatus.value.startsWith('未找到证件号为')) {
    return '请核对证件号后重新检索。';
  }

  return '请稍后重试，或检查输入内容。';
});
let cameraStream: MediaStream | null = null;
let liveScanTimer: number | null = null;
let isOCRRequestPending = false;
let lastAutoSearchNumber = '';
type LegacyNavigator = Navigator & {
  webkitGetUserMedia?: (
    constraints: MediaStreamConstraints,
    successCallback: (stream: MediaStream) => void,
    errorCallback: (error: DOMException) => void,
  ) => void;
  mozGetUserMedia?: (
    constraints: MediaStreamConstraints,
    successCallback: (stream: MediaStream) => void,
    errorCallback: (error: DOMException) => void,
  ) => void;
  msGetUserMedia?: (
    constraints: MediaStreamConstraints,
    successCallback: (stream: MediaStream) => void,
    errorCallback: (error: DOMException) => void,
  ) => void;
};

type RiskCategoryCode =
  | 'cross_border_gambling'
  | 'cross_border_fraud'
  | 'illegal_work'
  | 'suspicious_purpose';

const riskCategoryOptions: Array<{
  value: RiskCategoryCode;
  label: string;
  detail: string;
}> = [
  {
    value: 'cross_border_gambling',
    label: '跨境赌博',
    detail: '围绕资金来源、活动安排和同行关系核验。',
  },
  {
    value: 'cross_border_fraud',
    label: '跨境电诈',
    detail: '围绕邀约来源、境外联系人和设备用途核验。',
  },
  {
    value: 'illegal_work',
    label: '非法务工',
    detail: '围绕雇佣关系、薪酬承诺和签证目的核验。',
  },
  {
    value: 'suspicious_purpose',
    label: '出境目的存疑',
    detail: '围绕目的、行程、住宿和返程安排核验。',
  },
];

function handleProfilesImported() {
  if (query.value.trim()) {
    void loadProfiles(query.value);
  }
}

onMounted(() => {
  window.addEventListener('ipra:profiles-imported', handleProfilesImported);
});

useProtectedPage('/home/data');

onBeforeUnmount(() => {
  window.removeEventListener('ipra:profiles-imported', handleProfilesImported);
  stopCameraStream(false);
});

async function loadProfiles(rawValue = query.value) {
  const trimmed = rawValue.trim();
  query.value = trimmed;
  lastSearchedQuery.value = trimmed;
  if (!trimmed) {
    results.value = [];
    searchStatus.value = '请输入证件号进行检索。';
    protectedResultError.value = '';
    isSearching.value = false;
    return;
  }

  isSearching.value = true;
  searchStatus.value = '正在检索旅客画像...';

  try {
    const response = await searchPassengerProfilesProtected(trimmed);
    results.value = response.items;
    protectedResultError.value = '';

    if (trimmed) {
      recentSearches.value = [
        trimmed,
        ...recentSearches.value.filter((item) => item !== trimmed),
      ].slice(0, 4);
    }

    searchStatus.value = results.value.length
      ? `已检索到 ${results.value.length} 条匹配记录。`
      : `未找到证件号为 "${trimmed}" 的旅客记录。`;
  } catch (error) {
    results.value = [];
    protectedResultError.value = normalizeErrorMessage(
      error,
      '查询旅客画像失败，请稍后重试。',
    );
    searchStatus.value = protectedResultError.value;
  } finally {
    isSearching.value = false;
  }
}

async function submitSearch() {
  await loadProfiles();
}

async function openSearchKeyboard() {
  const value = await openTouchInput({
    title: '输入证件号',
    description: '仅支持证件号精确检索，输入完成后点击确认。',
    placeholder: '输入旅客证件号',
    value: query.value,
    inputMode: 'search',
    confirmText: '确认检索',
  });

  if (value == null) {
    return;
  }

  query.value = value;
  await loadProfiles(value);
}

async function applyRecentSearch(item: string) {
  query.value = item;
  await loadProfiles(item);
}

async function openAskWorkspace(profile: ProtectedListItem) {
  const profileId = String(profile.id || '').trim();
  if (!profileId) {
    return;
  }

  openingAskProfileId.value = profileId;
  try {
    const response = await getProfileRiskCategory(profileId);
    const riskCategory = normalizeRiskCategoryCode(response.riskCategory);
    if (riskCategory) {
      await navigateToAskWorkspace(profileId, riskCategory, 'watchlist');
      return;
    }

    pendingAskProfileId.value = profileId;
    riskCategoryDialogVisible.value = true;
  } catch (error) {
    searchStatus.value = normalizeErrorMessage(error, '查询风险类别失败，请稍后重试。');
  } finally {
    openingAskProfileId.value = '';
  }
}

async function navigateToAskWorkspace(
  profileId: string,
  riskCategory: RiskCategoryCode,
  source: 'watchlist' | 'officer',
) {
  await router.push({
    name: 'home-ask',
    query: {
      profileId,
      riskCategory,
      riskCategorySource: source,
    },
  });
}

async function chooseRiskCategory(value: RiskCategoryCode) {
  const profileId = pendingAskProfileId.value.trim();
  if (!profileId) {
    riskCategoryDialogVisible.value = false;
    return;
  }

  riskCategoryDialogVisible.value = false;
  pendingAskProfileId.value = '';
  await navigateToAskWorkspace(profileId, value, 'officer');
}

function closeRiskCategoryDialog() {
  riskCategoryDialogVisible.value = false;
  pendingAskProfileId.value = '';
}

function normalizeRiskCategoryCode(value: unknown): RiskCategoryCode | '' {
  switch (String(value || '').trim()) {
    case 'cross_border_gambling':
      return 'cross_border_gambling';
    case 'cross_border_fraud':
      return 'cross_border_fraud';
    case 'illegal_work':
      return 'illegal_work';
    case 'suspicious_purpose':
      return 'suspicious_purpose';
    default:
      return '';
  }
}

async function toggleCamera() {
  if (isCameraActive.value) {
    stopCameraStream();
    return;
  }

  await startCamera();
}

async function startCamera() {
  if (isCameraActive.value || isCameraStarting.value) {
    return;
  }

  if (typeof navigator === 'undefined') {
    cameraStatus.value = '当前环境不支持调用摄像头。';
    return;
  }

  if (typeof window !== 'undefined' && !window.isSecureContext) {
    cameraStatus.value =
      '当前页面不是安全环境，请使用 HTTPS 或 localhost 打开系统。';
    return;
  }

  isCameraStarting.value = true;
  capturedFrame.value = '';
  resetOCRState();

  try {
    const stream = await requestCameraStream();

    stopCameraStream(false);
    cameraStream = stream;

    if (cameraVideo.value) {
      cameraVideo.value.srcObject = stream;
      await cameraVideo.value.play().catch(() => undefined);
    }

    isCameraActive.value = true;
    startLiveScanLoop();
    cameraStatus.value = '摄像头已开启，请将身份证保持在取景框内后点击确定。';
    ocrStatus.value = defaultOCRStatus;
  } catch (error) {
    cameraStatus.value = resolveCameraErrorMessage(error);
  } finally {
    isCameraStarting.value = false;
  }
}

function stopCameraStream(updateStatus = true) {
  stopLiveScanLoop();
  isOCRRequestPending = false;
  cameraStream?.getTracks().forEach((track) => track.stop());
  cameraStream = null;

  if (cameraVideo.value) {
    cameraVideo.value.pause();
    cameraVideo.value.srcObject = null;
  }

  isCameraActive.value = false;
  if (updateStatus) {
    cameraStatus.value = capturedFrame.value
      ? '已截取当前画面。'
      : '摄像头已关闭。';
  }
}

async function confirmCameraFrame() {
  if (!isCameraActive.value && !capturedFrame.value) {
    cameraStatus.value = '请先开启摄像头，再确认当前证件画面。';
    return;
  }

  if (isOCRRequestPending) {
    cameraStatus.value = '正在识别当前证件画面，请稍候。';
    return;
  }

  captureCurrentVideoFrame();
  if (!capturedFrame.value) {
    cameraStatus.value = '当前还没有可识别的证件画面。';
    return;
  }

  cameraStatus.value = '正在确认当前证件画面并发起检索。';
  ocrStatus.value = '识别中';
  await runOCRScan({
    forceSearch: true,
    manual: true,
  });
}

function startLiveScanLoop() {
  stopLiveScanLoop();
  captureCurrentVideoFrame();
  liveScanTimer = window.setInterval(() => {
    captureCurrentVideoFrame();
  }, 450);
}

function stopLiveScanLoop() {
  if (liveScanTimer != null) {
    window.clearInterval(liveScanTimer);
    liveScanTimer = null;
  }
}

async function runOCRScan(options?: {
  forceSearch?: boolean;
  manual?: boolean;
}) {
  if (!isCameraActive.value || isOCRRequestPending || !capturedFrame.value) {
    return;
  }

  isOCRRequestPending = true;
  try {
    const result = await recognizeIDCard(capturedFrame.value);
    handleOCRResult(result, options);
  } catch (error) {
    const message = normalizeErrorMessage(error, '调用身份证 OCR 失败。');
    ocrStatus.value = message;
    cameraStatus.value = '当前证件画面识别失败，请调整角度或光线后重试。';
  } finally {
    isOCRRequestPending = false;
  }
}

function handleOCRResult(
  result: IDCardOCRResponse,
  options?: { forceSearch?: boolean; manual?: boolean },
) {
  if (result.code !== 200) {
    ocrStatus.value = result.msg || '身份证 OCR 识别失败。';
    if (options?.manual) {
      cameraStatus.value = '当前证件画面未识别成功，请调整后重试。';
    }
    return;
  }

  const payload = result.data;
  if (!payload || payload.result !== 0) {
    ocrStatus.value = '未识别到有效身份证画面。';
    if (options?.manual) {
      cameraStatus.value = '当前证件画面未识别成功，请保持身份证完整入框。';
    }
    return;
  }

  ocrSide.value = payload.side || '';

  if (
    payload.side === 'front' &&
    payload.documentNumberRecognized
  ) {
    ocrStatus.value = '扫描成功';
    if (result.results) {
      applyProtectedOCRResults(result.results);
      return;
    }
    const recognizedNumber = query.value.trim();
    if (recognizedNumber) {
      syncOCRNumberToSearch(recognizedNumber, options?.forceSearch === true);
    }
    return;
  }

  if (payload.side === 'back') {
    ocrStatus.value = '已识别到国徽面，请切换到人像面。';
    if (options?.manual) {
      cameraStatus.value = '当前是身份证国徽面，请翻到人像面后再检索。';
    }
    return;
  }

  ocrStatus.value = '已获取证件画面，等待更清晰识别结果。';
  if (options?.manual) {
    cameraStatus.value = '当前证件画面信息不足，请保持身份证完整入框。';
  }
}

function applyProtectedOCRResults(response: {
  items: ProtectedListItem[];
  total: number;
}) {
  results.value = response.items;
  protectedResultError.value = '';
  searchStatus.value = response.items.length
    ? `已检索到 ${response.items.length} 条匹配记录。`
    : '未检索到匹配记录。';
  stopCameraStream(false);
  cameraStatus.value = defaultCameraStatus;
  ocrStatus.value = '扫描成功';
}

function syncOCRNumberToSearch(number: string, forceSearch = false) {
  const normalized = number.trim();
  if (!normalized) {
    return;
  }

  query.value = normalized;
  if (!forceSearch && lastAutoSearchNumber === normalized) {
    return;
  }

  lastAutoSearchNumber = normalized;
  stopCameraStream(false);
  cameraStatus.value = defaultCameraStatus;
  ocrStatus.value = '扫描成功';
  void loadProfiles(normalized);
}

function resetOCRState() {
  ocrStatus.value = defaultOCRStatus;
  ocrSide.value = '';
  ocrName.value = '';
  ocrNumber.value = '';
  ocrAddress.value = '';
  ocrAuthority.value = '';
  ocrTimeLimit.value = '';
  lastAutoSearchNumber = '';
}

function captureCurrentVideoFrame() {
  const video = cameraVideo.value;
  const canvas = captureCanvas.value;
  if (!video || !canvas || !video.videoWidth || !video.videoHeight) {
    return;
  }

  const context = canvas.getContext('2d');
  if (!context) {
    return;
  }

  const targetWidth = 960;
  const targetHeight = Math.round(targetWidth / 1.586);
  const targetAspect = targetWidth / targetHeight;
  const sourceWidth = video.videoWidth;
  const sourceHeight = video.videoHeight;
  const sourceAspect = sourceWidth / sourceHeight;

  let cropWidth = sourceWidth;
  let cropHeight = sourceHeight;
  if (sourceAspect > targetAspect) {
    cropWidth = Math.round(sourceHeight * targetAspect);
  } else {
    cropHeight = Math.round(sourceWidth / targetAspect);
  }

  const offsetX = Math.floor((sourceWidth - cropWidth) / 2);
  const offsetY = Math.floor((sourceHeight - cropHeight) / 2);

  canvas.width = targetWidth;
  canvas.height = targetHeight;
  context.drawImage(
    video,
    offsetX,
    offsetY,
    cropWidth,
    cropHeight,
    0,
    0,
    targetWidth,
    targetHeight,
  );

  capturedFrame.value = canvas.toDataURL('image/jpeg', 0.9);
}

function resolveCameraErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (!(error instanceof DOMException)) {
    return '开启摄像头失败，请检查浏览器权限。';
  }

  switch (error.name) {
    case 'NotAllowedError':
    case 'PermissionDeniedError':
      return '未授予摄像头权限，请先允许浏览器访问摄像头。';
    case 'NotFoundError':
    case 'DevicesNotFoundError':
      return '未检测到可用摄像头设备。';
    case 'NotReadableError':
    case 'TrackStartError':
      return '摄像头当前被其他程序占用。';
    case 'SecurityError':
      return '当前环境不允许调用摄像头，请使用 HTTPS 或 localhost。';
    default:
      return '开启摄像头失败，请稍后重试。';
  }
}

async function requestCameraStream() {
  const constraints: MediaStreamConstraints = {
    video: {
      facingMode: { ideal: 'environment' },
      width: { ideal: 1280 },
      height: { ideal: 720 },
    },
    audio: false,
  };

  if (navigator.mediaDevices?.getUserMedia) {
    return navigator.mediaDevices.getUserMedia(constraints);
  }

  const legacyNavigator = navigator as LegacyNavigator;
  const legacyGetUserMedia =
    legacyNavigator.webkitGetUserMedia ??
    legacyNavigator.mozGetUserMedia ??
    legacyNavigator.msGetUserMedia;

  if (!legacyGetUserMedia) {
    throw new Error('当前浏览器缺少摄像头接口，请使用最新版 Edge 或 Chrome。');
  }

  return new Promise<MediaStream>((resolve, reject) => {
    legacyGetUserMedia.call(legacyNavigator, constraints, resolve, reject);
  });
}

function findProtectedField(
  fields: ProtectedFieldRef[] | undefined,
  key: string,
) {
  return fields?.find((item) => item.key === key) ?? null;
}

function findProtectedChip(record: ProtectedListItem, key: string) {
  return findProtectedField(record.chips, key);
}

function protectedFactEntries(record: ProtectedListItem) {
  return (record.facts ?? []) as ProtectedFactRef[];
}

function protectedNoteEntries(record: ProtectedListItem) {
  return (record.notes ?? []) as ProtectedFieldRef[];
}

function protectedRiskTags(record: ProtectedListItem) {
  return (record.meta ?? []) as ProtectedFieldRef[];
}

function normalizeErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}
</script>

<template>
  <section class="user-page">
    <section class="user-shell">
      <section class="panel-grid">
        <section class="search-column">
          <form
            class="surface-card surface-card--search"
            @submit.prevent="submitSearch"
          >
            <div class="panel-heading">
              <div>
                <h3>手动检索</h3>
              </div>
            </div>

            <label class="search-box" for="passenger-query">
              <input
                id="passenger-query"
                v-model="query"
                :title="touchInputHint"
                type="text"
                placeholder="输入旅客证件号"
                @dblclick.stop.prevent="openSearchKeyboard"
              />
              <button type="submit" :disabled="isSearching">
                {{ isSearching ? '检索中...' : '查询' }}
              </button>
            </label>

            <div v-if="recentSearches.length" class="tag-row">
              <span class="tag-row__label">最近搜索</span>
              <button
                v-for="item in recentSearches"
                :key="item"
                class="tag-chip"
                type="button"
                @click="applyRecentSearch(item)"
              >
                {{ item }}
              </button>
            </div>
          </form>

          <section class="surface-card surface-card--results">
            <div class="block-heading">
              <div>
                <h3>检索结果 ({{ results.length }})</h3>
              </div>
            </div>

            <div v-if="results.length" class="results-list">
              <article
                v-for="record in results"
                :key="record.id"
                class="result-strip"
                :class="{ 'is-high-risk': record.flags?.isHighRisk }"
              >
                <div class="result-strip__content">
                  <div class="result-strip__headline">
                    <strong class="result-strip__title">
                      <SensitiveAssetImage
                        v-if="findProtectedField(record.fields, 'fullName')"
                        :src="findProtectedField(record.fields, 'fullName')!.asset.url"
                        alt="旅客姓名"
                        inline
                        eager
                      />
                    </strong>
                    <span
                      v-if="findProtectedChip(record, 'highRisk')"
                      class="result-strip__pill is-high-risk"
                    >
                      <SensitiveAssetImage
                        :src="findProtectedChip(record, 'highRisk')!.asset.url"
                        alt="高风险预警"
                        inline
                      />
                    </span>
                    <span
                      v-if="findProtectedChip(record, 'documentType')"
                      class="result-strip__pill"
                    >
                      <SensitiveAssetImage
                        :src="findProtectedChip(record, 'documentType')!.asset.url"
                        alt="证件类型"
                        inline
                      />
                    </span>
                    <span
                      v-if="findProtectedChip(record, 'gender')"
                      class="result-strip__pill"
                    >
                      <SensitiveAssetImage
                        :src="findProtectedChip(record, 'gender')!.asset.url"
                        alt="性别"
                        inline
                      />
                    </span>
                    <span
                      v-if="findProtectedChip(record, 'documentNum')"
                      class="result-strip__identity"
                    >
                      <SensitiveAssetImage
                        :src="findProtectedChip(record, 'documentNum')!.asset.url"
                        alt="证件号码"
                        inline
                      />
                    </span>
                    <span
                      v-if="findProtectedChip(record, 'imported')"
                      class="result-strip__pill"
                    >
                      <SensitiveAssetImage
                        :src="findProtectedChip(record, 'imported')!.asset.url"
                        alt="导入状态"
                        inline
                      />
                    </span>
                  </div>

                  <div class="result-strip__fact-list">
                    <span
                      v-for="detail in protectedFactEntries(record)"
                      :key="`${record.id}-${detail.key || detail.label}`"
                      class="result-strip__fact"
                    >
                      <span class="result-strip__fact-label">
                        {{ detail.label }}
                      </span>
                      <strong class="result-strip__fact-value">
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
                      protectedRiskTags(record).length ||
                      protectedNoteEntries(record).length
                    "
                    class="result-strip__tags"
                  >
                    <span
                      v-for="tag in protectedRiskTags(record)"
                      :key="`${record.id}-${tag.key}-${tag.asset.id}`"
                      class="result-strip__tag"
                    >
                      <SensitiveAssetImage
                        :src="tag.asset.url"
                        alt="风险标签"
                        inline
                      />
                    </span>
                    <span
                      v-for="note in protectedNoteEntries(record)"
                      :key="`${record.id}-${note.key}-${note.asset.id}`"
                      class="result-strip__tag result-strip__tag--muted"
                    >
                      <SensitiveAssetImage
                        :src="note.asset.url"
                        alt="备注"
                        inline
                      />
                    </span>
                  </div>
                </div>

                <div class="result-strip__actions">
                  <button
                    class="primary-action"
                    type="button"
                    :disabled="openingAskProfileId === record.id"
                    @click="openAskWorkspace(record)"
                  >
                    {{
                      openingAskProfileId === record.id
                        ? '读取风险类别...'
                        : '发起辅助问询'
                    }}
                  </button>
                </div>
              </article>
            </div>

            <div v-else class="empty-state">
              <p>{{ resultEmptyTitle }}</p>
              <span>{{ resultEmptyDetail }}</span>
            </div>
          </section>
        </section>

        <section class="surface-card surface-card--camera">
          <div class="panel-heading">
            <div>
              <h3>实时扫描</h3>
            </div>
          </div>

          <div
            class="camera-preview"
            :class="{ 'is-live': isCameraActive, 'has-capture': capturedFrame }"
          >
            <video
              v-show="isCameraActive"
              ref="cameraVideo"
              class="camera-preview__video"
              autoplay
              muted
              playsinline
            ></video>
            <img
              v-if="capturedFrame && !isCameraActive"
              :src="capturedFrame"
              class="camera-preview__image"
              alt="已确认的证件画面"
            />
            <div
              v-if="!isCameraActive && !capturedFrame"
              class="camera-preview__placeholder"
            >
              <strong>等待开启摄像头</strong>
              <span>开启后可实时预览证件画面，点击确定后识别。</span>
            </div>
            <div class="camera-preview__frame"></div>
          </div>

          <canvas ref="captureCanvas" class="sr-only"></canvas>

          <p class="status-copy camera-status camera-status--secondary">
            {{ cameraPanelStatus }}
          </p>

          <div class="camera-actions">
            <button
              class="camera-action camera-action--primary"
              type="button"
              :disabled="isCameraStarting || isOCRRequestPending"
              @click="toggleCamera"
            >
              {{
                isCameraActive
                  ? '关闭'
                  : isCameraStarting
                    ? '开启中...'
                    : '开启'
              }}
            </button>
            <button
              class="camera-action"
              type="button"
              :disabled="!isCameraActive || isOCRRequestPending"
              @click="confirmCameraFrame"
            >
              {{ isOCRRequestPending ? '识别中...' : '确定' }}
            </button>
          </div>
        </section>
      </section>
    </section>

    <Teleport to="body">
      <section
        v-if="riskCategoryDialogVisible"
        class="risk-category-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="risk-category-dialog-title"
      >
        <div class="risk-category-dialog__panel">
          <div class="risk-category-dialog__header">
            <div>
              <p class="section-eyebrow">问询方向</p>
              <h3 id="risk-category-dialog-title">选择辅助问询类型</h3>
            </div>
            <button
              class="risk-category-dialog__close"
              type="button"
              aria-label="关闭"
              @click="closeRiskCategoryDialog"
            >
              ×
            </button>
          </div>

          <div class="risk-category-dialog__options">
            <button
              v-for="option in riskCategoryOptions"
              :key="option.value"
              type="button"
              class="risk-category-option"
              @click="chooseRiskCategory(option.value)"
            >
              <strong>{{ option.label }}</strong>
              <span>{{ option.detail }}</span>
            </button>
          </div>
        </div>
      </section>
    </Teleport>
  </section>
</template>

<style scoped lang="scss">
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.user-page {
  min-height: 0;
  height: 100%;
  display: grid;
}

.user-shell {
  box-sizing: border-box;
  display: grid;
  width: 100%;
  min-width: 0;
  min-height: 0;
  height: min(100%, var(--content-height, 100%));
  padding: clamp(14px, 1.8vw, 26px);
  border-radius: clamp(22px, 2vw, 28px);
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(157, 189, 202, 0.36);
  box-shadow: 0 22px 46px rgba(14, 40, 48, 0.08);
  overflow: hidden;
}

.surface-card,
.result-card,
.stat-card,
.empty-state {
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(157, 189, 202, 0.36);
  box-shadow: 0 22px 46px rgba(14, 40, 48, 0.08);
}

.panel-heading,
.block-heading,
.identity-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.panel-heading h3,
.block-heading h3 {
  margin: 0;
  color: #15252b;
}

.identity-card h4 {
  margin: 6px 0 0;
  color: #15252b;
}

.section-eyebrow,
.meta-label,
.tag-row__label {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
  font-weight: 700;
  color: #5b7179;
}

.status-copy,
.result-grid p,
.empty-state span,
.stat-card p,
.identity-card p {
  color: #5b7179;
  line-height: 1.6;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.panel-grid,
.stats-grid {
  display: grid;
  gap: clamp(12px, 1.4vw, 18px);
}

.panel-grid {
  min-height: 0;
  height: 100%;
}

.search-column {
  display: grid;
  gap: clamp(10px, 1.2vw, 14px);
  min-height: 0;
  height: 100%;
  grid-template-rows: auto minmax(0, 1fr);
}

.surface-card {
  min-height: 0;
  padding: clamp(14px, 1.5vw, 20px);
  border-radius: clamp(22px, 2vw, 28px);
}

.surface-card--search {
  display: grid;
  gap: 8px;
  padding: clamp(12px, 1.3vw, 16px);
}

.surface-card--camera {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto auto;
  gap: 12px;
  padding: clamp(12px, 1.4vw, 16px);
  height: 100%;
}

.surface-card--results {
  display: grid;
  gap: 0;
  padding: clamp(14px, 1.5vw, 20px);
  min-height: 0;
  grid-template-rows: auto minmax(0, 1fr);
  overflow: hidden;
}

.panel-badge {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(11, 114, 136, 0.12);
  color: #09596c;
  font-size: 0.82rem;
  font-weight: 700;
}

.panel-badge--muted {
  background: rgba(91, 113, 121, 0.12);
  color: #5b7179;
}

.search-box {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 6px 6px 6px 10px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.4);
}

.search-box input {
  min-width: 0;
  padding: 4px 2px;
  background: transparent;
  color: #15252b;
  font-size: 1rem;
}

.search-box input:focus {
  outline: none;
}

.search-box button,
.primary-action,
.secondary-action,
.text-action {
  min-height: 46px;
  padding: 0 18px;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
}

.primary-action,
.search-box button {
  background: linear-gradient(135deg, #0b7288, #20a8c5);
  color: #ffffff;
}

.secondary-action {
  background: rgba(11, 114, 136, 0.08);
  color: #09596c;
}

.text-action {
  min-height: 40px;
  background: transparent;
  color: #5b7179;
}

.search-box button:disabled,
.primary-action:disabled,
.secondary-action:disabled,
.text-action:disabled {
  cursor: wait;
  opacity: 0.68;
}

.tag-chip {
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(91, 113, 121, 0.09);
  color: #15252b;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.tag-chip--passive {
  cursor: default;
}

.tag-chip--active {
  background: rgba(11, 114, 136, 0.16);
  color: #09596c;
}

.surface-card--search .search-box button {
  min-height: 42px;
  padding: 0 16px;
}

.surface-card--search .tag-row {
  gap: 8px;
}

.surface-card--search .tag-chip {
  min-height: 30px;
  padding: 0 10px;
  font-size: 0.8rem;
}

.status-copy {
  margin: 0;
}

.camera-preview {
  position: relative;
  overflow: hidden;
  min-height: 0;
  height: 100%;
  border-radius: clamp(18px, 1.8vw, 22px);
  background: linear-gradient(
    160deg,
    rgba(11, 114, 136, 0.08),
    rgba(255, 255, 255, 0.96)
  );
  border: 1px solid rgba(157, 189, 202, 0.36);
}

.camera-preview__video,
.camera-preview__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.camera-preview__placeholder {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  gap: 8px;
  padding: 20px;
  text-align: center;
  color: #5b7179;
}

.camera-preview__placeholder strong {
  color: #15252b;
}

.camera-preview__frame {
  position: absolute;
  inset: 14% 10%;
  border-radius: 18px;
  border: 2px dashed rgba(11, 114, 136, 0.52);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.42);
  pointer-events: none;
}

.camera-preview.is-live .camera-preview__frame {
  border-color: rgba(11, 114, 136, 0.8);
}

.camera-preview.has-capture {
  box-shadow: 0 18px 30px rgba(11, 114, 136, 0.12);
}

.camera-status {
  min-height: 44px;
}

.camera-status--secondary {
  min-height: 52px;
  padding: clamp(10px, 1vw, 12px);
  border-radius: clamp(12px, 1.2vw, 14px);
  background: rgba(11, 114, 136, 0.06);
  border: 1px solid rgba(11, 114, 136, 0.1);
}

.camera-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.camera-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 56px;
  padding: 0 12px;
  border-radius: 16px;
  background: rgba(11, 114, 136, 0.08);
  border: 1px solid rgba(11, 114, 136, 0.16);
  color: #09596c;
  font-weight: 700;
  cursor: pointer;
}

.camera-action--primary {
  background: linear-gradient(135deg, #0b7288, #20a8c5);
  border-color: rgba(11, 114, 136, 0.3);
  color: #ffffff;
}

.camera-action:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.risk-category-dialog {
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(10, 31, 38, 0.42);
  backdrop-filter: blur(8px);
}

.risk-category-dialog__panel {
  width: min(640px, 100%);
  padding: clamp(18px, 2vw, 24px);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(157, 189, 202, 0.46);
  box-shadow: 0 24px 56px rgba(14, 40, 48, 0.2);
}

.risk-category-dialog__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.risk-category-dialog__header h3 {
  margin: 4px 0 0;
  color: #15252b;
}

.risk-category-dialog__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(91, 113, 121, 0.1);
  color: #15252b;
  font-size: 1.35rem;
  line-height: 1;
  cursor: pointer;
}

.risk-category-dialog__options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.risk-category-option {
  min-height: 116px;
  padding: 16px;
  border-radius: 16px;
  background: rgba(11, 114, 136, 0.07);
  border: 1px solid rgba(11, 114, 136, 0.16);
  color: #15252b;
  text-align: left;
  cursor: pointer;
}

.risk-category-option:hover,
.risk-category-option:focus-visible {
  background: rgba(11, 114, 136, 0.13);
  border-color: rgba(11, 114, 136, 0.32);
  outline: none;
}

.risk-category-option strong,
.risk-category-option span {
  display: block;
}

.risk-category-option strong {
  font-size: 1rem;
}

.risk-category-option span {
  margin-top: 8px;
  color: #5b7179;
  font-size: 0.88rem;
  line-height: 1.5;
}

.results-list {
  display: grid;
  gap: clamp(12px, 1.2vw, 14px);
  height: 100%;
  margin-top: clamp(12px, 1.4vw, 16px);
  min-height: 0;
  align-content: start;
  overflow: auto;
  padding-right: 4px;
}

.surface-card--results .empty-state {
  margin-top: clamp(12px, 1.4vw, 16px);
  padding: clamp(24px, 4vw, 34px) 12px 16px;
  border: 0;
  background: transparent;
  box-shadow: none;
}

.result-strip {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: clamp(14px, 1.4vw, 18px);
  padding: clamp(14px, 1.5vw, 16px) clamp(14px, 1.5vw, 18px)
    clamp(14px, 1.5vw, 16px) clamp(20px, 1.8vw, 24px);
  border-radius: clamp(18px, 1.8vw, 24px);
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(157, 189, 202, 0.36);
  box-shadow: 0 22px 46px rgba(14, 40, 48, 0.08);
  overflow: hidden;
}

.result-strip::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 6px;
  background: linear-gradient(180deg, #0b7288, #20a8c5);
}

.result-strip.is-high-risk::before {
  background: linear-gradient(180deg, #c75c47, #de876d);
}

.result-strip__content {
  min-width: 0;
  flex: 1 1 auto;
  display: grid;
  gap: 10px;
}

.result-strip__headline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 10px;
}

.result-strip__title {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
}

.result-strip__title :deep(.sensitive-image img) {
  height: 28px;
}

.result-strip__pill,
.result-strip__identity,
.result-strip__tag {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
}

.result-strip__pill {
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(157, 189, 202, 0.48);
  color: #43646e;
}

.result-strip__pill.is-high-risk {
  background: rgba(199, 92, 71, 0.12);
  border-color: rgba(199, 92, 71, 0.16);
  color: #a24734;
}

.result-strip__identity {
  background: rgba(217, 238, 244, 0.92);
  color: #09596c;
}

.result-strip__fact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
}

.result-strip__fact {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 34px;
  padding: 0 10px;
  border-radius: 12px;
  background: #fbfeff;
  border: 1px solid rgba(157, 189, 202, 0.36);
}

.result-strip__fact-label {
  color: #6c8790;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.result-strip__fact-value {
  display: inline-flex;
  align-items: center;
  color: #15252b;
  font-size: 0.84rem;
  font-weight: 700;
}

.result-strip__pill :deep(.sensitive-image img),
.result-strip__identity :deep(.sensitive-image img),
.result-strip__tag :deep(.sensitive-image img),
.result-strip__fact-value :deep(.sensitive-image img) {
  height: 18px;
}

.result-strip__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.result-strip__tag {
  background: rgba(11, 114, 136, 0.12);
  color: #09596c;
}

.result-strip__tag--muted {
  background: rgba(91, 113, 121, 0.12);
  color: #5b7179;
}

.result-strip__actions {
  display: grid;
  flex: 0 0 clamp(160px, 16vw, 220px);
  width: clamp(160px, 16vw, 220px);
  align-items: end;
}

.result-strip__actions .primary-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: clamp(84px, 16vh, 120px);
  padding: clamp(14px, 1.4vw, 18px) clamp(16px, 1.6vw, 20px);
  border-radius: clamp(16px, 1.6vw, 18px);
  font-size: clamp(0.96rem, 0.86rem + 0.32vw, 1.04rem);
  letter-spacing: 0.04em;
}

.result-strip.is-high-risk .result-strip__actions .primary-action {
  background: linear-gradient(135deg, #c75c47, #e07b61);
  box-shadow: 0 16px 28px rgba(199, 92, 71, 0.24);
}

.result-card {
  display: grid;
  overflow: hidden;
}

.result-card__accent {
  min-height: 6px;
  background: #0b7288;
}

.result-card--high .result-card__accent {
  background: linear-gradient(90deg, #b64e3d, #dd7a64);
}

.result-card--medium .result-card__accent {
  background: linear-gradient(90deg, #c07b19, #e2aa4d);
}

.result-card__body {
  padding: 24px;
}

.identity-card {
  flex-wrap: wrap;
}

.identity-card__avatar {
  display: grid;
  place-items: center;
  width: 60px;
  height: 60px;
  border-radius: 18px;
  background: linear-gradient(
    135deg,
    rgba(11, 114, 136, 0.16),
    rgba(32, 168, 197, 0.24)
  );
  color: #09596c;
  font-weight: 700;
}

.risk-pill {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
}

.risk-pill--high {
  background: #fee4de;
  color: #b64e3d;
}

.risk-pill--medium {
  background: rgba(234, 204, 141, 0.28);
  color: #996106;
}

.result-grid {
  display: grid;
  gap: 18px;
  margin-top: 20px;
}

.result-grid strong,
.stat-card strong {
  display: block;
  margin-top: 8px;
  font-size: 1.04rem;
}

.result-grid__summary {
  grid-column: 1 / -1;
}

.tag-row--compact {
  margin-top: 18px;
}

.result-card__actions {
  display: grid;
  gap: 12px;
  padding: 0 24px 24px;
}

.empty-state {
  display: grid;
  place-items: center;
  padding: 40px 24px;
  text-align: center;
}

.empty-state p {
  margin: 0;
  font-size: 1.04rem;
  font-weight: 700;
  color: #15252b;
}

.stat-card {
  padding: 22px;
}

.stat-card strong {
  font-size: clamp(1.6rem, 1.4rem + 0.6vw, 2.2rem);
}

@media (min-width: 720px) {
  .panel-grid,
  .result-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1080px) {
  .panel-grid {
    grid-template-columns: minmax(0, 1.28fr) minmax(320px, 0.92fr);
    align-items: stretch;
  }

  .stats-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .result-card {
    grid-template-columns: minmax(0, 1fr) 220px;
  }

  .result-card__accent {
    grid-column: 1 / -1;
  }

  .result-card__actions {
    align-content: center;
    padding: 24px 24px 24px 0;
  }
}

@media (max-width: 719px) {
  .user-page {
    height: auto;
  }

  .user-shell {
    height: auto;
    min-height: auto;
    padding: 14px;
    border-radius: 22px;
    overflow: visible;
  }

  .panel-heading,
  .block-heading {
    flex-direction: column;
  }

  .result-strip {
    flex-direction: column;
  }

  .result-strip__actions {
    width: 100%;
    flex: 0 0 auto;
  }

  .result-strip :deep(.sensitive-image__placeholder) {
    min-height: 260px;
  }

  .search-box {
    grid-template-columns: 1fr;
  }

  .search-box button {
    width: 100%;
  }

  .camera-actions {
    grid-template-columns: 1fr;
  }

  .risk-category-dialog {
    padding: 16px;
  }

  .risk-category-dialog__options {
    grid-template-columns: 1fr;
  }

  .camera-preview {
    min-height: 220px;
    height: auto;
    aspect-ratio: 1.58 / 1;
  }
}
</style>
