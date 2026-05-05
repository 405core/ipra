<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  importPassengerProfiles,
  searchPassengerProfiles,
  type ImportBatchResult,
  type ImportType,
  type PassengerProfileRecord,
} from '../app/profile-service';

type RiskLevel = 'high' | 'medium';

interface PassengerRecord {
  id: string;
  name: string;
  documentId: string;
  pnr: string;
  route: string;
  seat: string;
  eta: string;
  riskLevel: RiskLevel;
  riskLabel: string;
  summary: string;
  watchTags: string[];
}

interface DashboardStat {
  label: string;
  value: string;
  detail: string;
}

const router = useRouter();

const dashboardStats: DashboardStat[] = [
  {
    label: '导入入口',
    value: 'CSV / XLSX',
    detail: '支持基础画像与高风险名单',
  },
  {
    label: '检索方式',
    value: '证件 / 姓名 / PNR',
    detail: '命中后直接展示全息画像',
  },
  {
    label: '风险联动',
    value: '高风险即预警',
    detail: '命中名单自动高亮',
  },
  {
    label: '数据承载',
    value: '主表 + JSON',
    detail: '兼容多维画像字段',
  },
];

const importTypeOptions: Array<{ label: string; value: ImportType }> = [
  { label: '基础画像', value: 'BASE_PROFILE' },
  { label: '高风险名单', value: 'HIGH_RISK' },
];

const query = ref('');
const results = ref<PassengerRecord[]>([]);
const recentSearches = ref<string[]>([]);
const searchStatus = ref('正在加载最新画像记录...');
const importStatus = ref('支持 CSV / XLSX，单次最大 20MB。推荐使用系统导出的多 sheet XLSX 模板。');
const isDropActive = ref(false);
const isSearching = ref(false);
const isImporting = ref(false);
const selectedImportType = ref<ImportType>('BASE_PROFILE');
const fileInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  void loadProfiles();
});

async function loadProfiles(rawValue = query.value) {
  const trimmed = rawValue.trim();
  query.value = trimmed;
  isSearching.value = true;
  searchStatus.value = trimmed ? '正在检索旅客画像...' : '正在加载最新画像记录...';

  try {
    const profiles = await searchPassengerProfiles(trimmed);
    results.value = profiles.map(mapProfileToCard);

    if (trimmed) {
      recentSearches.value = [
        trimmed,
        ...recentSearches.value.filter((item) => item !== trimmed),
      ].slice(0, 4);
    }

    if (trimmed) {
      searchStatus.value = results.value.length
        ? `已检索到 ${results.value.length} 条匹配记录。`
        : `未找到与 "${trimmed}" 匹配的旅客记录。`;
    } else {
      searchStatus.value = results.value.length
        ? `已加载最新 ${results.value.length} 条画像记录。`
        : '当前暂无已导入画像，请先导入文件。';
    }
  } catch (error) {
    results.value = [];
    searchStatus.value = normalizeErrorMessage(error, '查询旅客画像失败，请稍后重试。');
  } finally {
    isSearching.value = false;
  }
}

async function submitSearch() {
  await loadProfiles();
}

async function applyRecentSearch(item: string) {
  query.value = item;
  await loadProfiles(item);
}

function triggerFileSelection() {
  if (isImporting.value) {
    return;
  }
  fileInput.value?.click();
}

async function exportImportTemplate() {
  importStatus.value = '正在获取模板文件...';

  try {
    const response = await fetch('/api/import-templates/passenger-profile.xlsx');

    if (!response.ok) {
      throw new Error('模板下载失败');
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const disposition = response.headers.get('Content-Disposition') ?? '';
    const match = disposition.match(/filename="([^"]+)"/);
    const filename = match?.[1] ?? 'ipra-passenger-profile-template.xlsx';

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    importStatus.value = `模板已导出：${filename}`;
  } catch (error) {
    importStatus.value =
      error instanceof Error ? error.message : '模板下载失败，请稍后重试。';
  }
}

async function acceptFile(file: File | null) {
  if (!file) {
    importStatus.value = '未选择文件。';
    return;
  }

  const normalizedName = file.name.toLowerCase();
  const isSupported =
    normalizedName.endsWith('.csv') || normalizedName.endsWith('.xlsx');

  if (!isSupported) {
    importStatus.value = '仅支持 CSV 或 XLSX 文件。';
    return;
  }

  isImporting.value = true;
  importStatus.value = `正在导入 ${importTypeLabel(selectedImportType.value)}：${file.name}`;

  try {
    const result = await importPassengerProfiles(file, selectedImportType.value);
    importStatus.value = buildImportStatus(file.name, result);
    await loadProfiles(query.value);
  } catch (error) {
    importStatus.value = normalizeErrorMessage(error, '导入旅客画像失败，请稍后重试。');
  } finally {
    isImporting.value = false;
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  }
}

async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  await acceptFile(input.files?.[0] ?? null);
}

async function handleDrop(event: DragEvent) {
  isDropActive.value = false;
  await acceptFile(event.dataTransfer?.files?.[0] ?? null);
}

async function reviewRecord(record: PassengerRecord) {
  query.value = record.documentId;
  await loadProfiles(record.documentId);
}

async function openAskWorkspace() {
  await router.push({ name: 'home-ask' });
}

function mapProfileToCard(profile: PassengerProfileRecord): PassengerRecord {
  const dimensionData = asRecord(profile.dimensionData);
  const tripInfo = asRecord(dimensionData.tripInfo);
  const occupation = asRecord(dimensionData.occupation);
  const riskRecords = asRecordArray(dimensionData.riskRecords);
  const riskTags = asStringArray(dimensionData.riskTags);

  const route = buildRouteLabel(tripInfo);
  const seat = asString(tripInfo.seat) || asString(tripInfo.accommodation) || '未录入座位 / 住宿信息';
  const eta =
    asString(tripInfo.departureDate) ||
    asString(tripInfo.returnTicketStatus) ||
    `更新于 ${formatDateTime(profile.updatedAt)}`;
  const pnr = asString(tripInfo.pnr) || '未录入 PNR';
  const summary = buildSummary(profile, tripInfo, occupation, riskRecords, riskTags);
  const watchTags = buildWatchTags(profile, tripInfo, riskRecords, riskTags);

  return {
    id: String(profile.id),
    name: profile.fullName,
    documentId: profile.documentNum,
    pnr,
    route,
    seat,
    eta,
    riskLevel: profile.isHighRisk ? 'high' : 'medium',
    riskLabel: profile.isHighRisk ? '高风险预警' : '画像已导入',
    summary,
    watchTags,
  };
}

function buildRouteLabel(tripInfo: Record<string, unknown>) {
  const route = asString(tripInfo.route);
  if (route) {
    return route;
  }

  const flightNo = asString(tripInfo.flightNo);
  const origin = asString(tripInfo.origin);
  const destination = asString(tripInfo.destination);

  if (flightNo && origin && destination) {
    return `${flightNo} (${origin} -> ${destination})`;
  }
  if (origin && destination) {
    return `${origin} -> ${destination}`;
  }
  if (destination) {
    return `目的地 ${destination}`;
  }
  return '未录入行程信息';
}

function buildSummary(
  profile: PassengerProfileRecord,
  tripInfo: Record<string, unknown>,
  occupation: Record<string, unknown>,
  riskRecords: Array<Record<string, unknown>>,
  riskTags: string[]
) {
  const firstRisk = riskRecords[0] ?? {};
  const riskType = asString(firstRisk.type);
  const purpose = asString(tripInfo.purposeDeclared);
  const occupationName =
    asString(occupation.occupation) || asString(occupation.position) || asString(occupation.company);

  if (profile.isHighRisk) {
    const detail = riskType || riskTags[0] || '名单命中';
    return `当前旅客已命中高风险画像：${detail}。建议优先核验行程目的、资金来源和同行关系。`;
  }

  if (purpose && occupationName) {
    return `申报出境目的为“${purpose}”，当前职业信息为“${occupationName}”，可结合历史行程继续核验。`;
  }

  if (purpose) {
    return `申报出境目的为“${purpose}”，画像已完成入库，可继续进行证件匹配和人工问询。`;
  }

  return '画像记录已完成入库，可继续开展证件匹配、风险比对和后续辅助问询。';
}

function buildWatchTags(
  profile: PassengerProfileRecord,
  tripInfo: Record<string, unknown>,
  riskRecords: Array<Record<string, unknown>>,
  riskTags: string[]
) {
  const tags = [...riskTags];

  for (const record of riskRecords) {
    const type = asString(record.type);
    if (type) {
      tags.push(type);
    }
  }

  const destination = asString(tripInfo.destination);
  if (destination) {
    tags.push(`目的地:${destination}`);
  }

  if (profile.isHighRisk) {
    tags.unshift('高风险名单');
  }

  const unique = [...new Set(tags.filter(Boolean))];
  return unique.length ? unique.slice(0, 4) : ['已导入画像'];
}

function buildImportStatus(fileName: string, result: ImportBatchResult) {
  const label = importTypeLabel(selectedImportType.value);
  const firstError = result.errorDetails?.[0];

  if (result.status === 'success') {
    return `${label}导入完成：${fileName}，成功 ${result.successCount}/${result.totalRows} 行。`;
  }

  if (result.status === 'partial_failed') {
    return `${label}部分导入成功：成功 ${result.successCount} 行，失败 ${result.failedCount} 行。${
      firstError ? `首个错误位于第 ${firstError.rowNo} 行：${firstError.message}` : ''
    }`;
  }

  return `${label}导入失败：${
    firstError
      ? firstError.rowNo
        ? `第 ${firstError.rowNo} 行 ${firstError.message}`
        : firstError.message
      : '请检查文件格式和字段内容。'
  }`;
}

function importTypeLabel(value: ImportType) {
  return value === 'HIGH_RISK' ? '高风险名单' : '基础画像';
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || Array.isArray(value) || typeof value !== 'object') {
    return {};
  }
  return value as Record<string, unknown>;
}

function asRecordArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => asRecord(item)).filter((item) => Object.keys(item).length > 0);
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter((item) => item.length > 0);
}

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function formatDateTime(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString('zh-CN', {
    hour12: false,
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function normalizeErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}
</script>

<template>
  <section class="user-page">
    <section class="hero-card">
      <div>
        <p class="section-eyebrow">Search Console</p>
        <h2>数据检索与风险联动分析</h2>
        <p class="section-copy">
          通过离线导入采购方提供的旅客画像与高风险名单，现场可按证件号、姓名或 PNR 快速检索，并直接查看已入库的全息画像摘要。
        </p>
      </div>

      <div class="hero-card__actions">
        <button class="secondary-action" type="button" @click="exportImportTemplate">
          下载模板
        </button>
        <button class="primary-action" type="button" @click="openAskWorkspace">
          进入辅助问询
        </button>
      </div>
    </section>

    <section class="panel-grid">
      <form class="surface-card surface-card--search" @submit.prevent="submitSearch">
        <div class="panel-heading">
          <div>
            <p class="section-eyebrow">Single Query</p>
            <h3>单人检索</h3>
          </div>
          <span class="panel-badge">Live</span>
        </div>

        <label class="search-box" for="passenger-query">
          <span class="search-box__prefix">ID</span>
          <input
            id="passenger-query"
            v-model="query"
            type="text"
            placeholder="输入旅客证件号、姓名或订票编码 (PNR)"
          />
          <button type="submit" :disabled="isSearching">
            {{ isSearching ? '检索中...' : '查询' }}
          </button>
        </label>

        <p class="status-copy">{{ searchStatus }}</p>

        <div class="tag-row">
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

      <section class="surface-card">
        <div class="panel-heading">
          <div>
            <p class="section-eyebrow">Batch Import</p>
            <h3>批量导入</h3>
          </div>
          <span class="panel-badge panel-badge--muted">CSV / XLSX</span>
        </div>

        <input
          ref="fileInput"
          class="sr-only"
          type="file"
          accept=".csv,.xlsx"
          @change="handleFileChange"
        />

        <div class="tag-row tag-row--compact">
          <span class="tag-row__label">导入类型</span>
          <button
            v-for="option in importTypeOptions"
            :key="option.value"
            class="tag-chip"
            :class="{ 'tag-chip--active': selectedImportType === option.value }"
            type="button"
            @click="selectedImportType = option.value"
          >
            {{ option.label }}
          </button>
        </div>

        <button
          class="upload-dropzone"
          :class="{ 'is-active': isDropActive }"
          type="button"
          :disabled="isImporting"
          @click="triggerFileSelection"
          @dragenter.prevent="isDropActive = true"
          @dragover.prevent="isDropActive = true"
          @dragleave.prevent="isDropActive = false"
          @drop.prevent="handleDrop"
        >
          <strong>{{ isImporting ? '正在处理导入文件...' : '点击或拖拽文件至此处' }}</strong>
          <span>当前导入类型：{{ importTypeLabel(selectedImportType) }}。</span>
        </button>

        <p class="status-copy">{{ importStatus }}</p>
      </section>
    </section>

    <section class="content-block">
      <div class="block-heading">
        <div>
          <p class="section-eyebrow">Active Workspace</p>
          <h3>检索结果 ({{ results.length }})</h3>
        </div>
      </div>

      <div v-if="results.length" class="results-list">
        <article
          v-for="record in results"
          :key="record.id"
          class="result-card"
          :class="`result-card--${record.riskLevel}`"
        >
          <div class="result-card__accent"></div>

          <div class="result-card__body">
            <div class="identity-card">
              <div class="identity-card__avatar">
                {{ record.name.slice(0, 2) }}
              </div>
              <div>
                <h4>{{ record.name }}</h4>
                <p>PASSPORT: {{ record.documentId }}</p>
              </div>
              <span class="risk-pill" :class="`risk-pill--${record.riskLevel}`">
                {{ record.riskLabel }}
              </span>
            </div>

            <div class="result-grid">
              <div>
                <span class="meta-label">航班信息</span>
                <strong>{{ record.route }}</strong>
                <p>{{ record.seat }}</p>
              </div>

              <div>
                <span class="meta-label">抵离状态</span>
                <strong>{{ record.eta }}</strong>
                <p>PNR: {{ record.pnr }}</p>
              </div>

              <div class="result-grid__summary">
                <span class="meta-label">评估描述</span>
                <p>{{ record.summary }}</p>
              </div>
            </div>

            <div class="tag-row tag-row--compact">
              <span class="tag-row__label">关注标签</span>
              <span
                v-for="tag in record.watchTags"
                :key="tag"
                class="tag-chip tag-chip--passive"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="result-card__actions">
            <button class="primary-action" type="button" @click="openAskWorkspace">
              发起辅助问询
            </button>
            <button class="secondary-action" type="button" @click="reviewRecord(record)">
              按证件复查
            </button>
            <button class="text-action" type="button" @click="applyRecentSearch(record.documentId)">
              再次检索
            </button>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <p>当前没有匹配记录。</p>
        <span>请尝试其他证件号、PNR，或重新导入批量文件。</span>
      </div>
    </section>

    <section class="content-block">
      <div class="block-heading">
        <div>
          <p class="section-eyebrow">Daily Overview</p>
          <h3>态势速览</h3>
        </div>
      </div>

      <div class="stats-grid">
        <article v-for="item in dashboardStats" :key="item.label" class="stat-card">
          <span class="meta-label">{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
          <p>{{ item.detail }}</p>
        </article>
      </div>
    </section>
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
  display: grid;
  gap: 22px;
}

.hero-card,
.surface-card,
.result-card,
.stat-card,
.empty-state {
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(157, 189, 202, 0.36);
  box-shadow: 0 22px 46px rgba(14, 40, 48, 0.08);
}

.hero-card,
.panel-heading,
.block-heading,
.identity-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.hero-card {
  padding: 28px;
}

.hero-card h2,
.panel-heading h3,
.block-heading h3,
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

.section-copy,
.status-copy,
.result-grid p,
.empty-state span,
.stat-card p,
.identity-card p {
  color: #5b7179;
  line-height: 1.6;
}

.section-copy {
  margin-top: 14px;
  max-width: 720px;
}

.hero-card__actions,
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.panel-grid,
.stats-grid {
  display: grid;
  gap: 18px;
}

.surface-card {
  padding: 24px;
}

.surface-card--search {
  display: grid;
  gap: 18px;
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
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 22px;
  background: #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.4);
}

.search-box__prefix {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  border-radius: 14px;
  background: #d9eef4;
  color: #09596c;
  font-weight: 700;
}

.search-box input {
  min-width: 0;
  padding: 10px 4px;
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

.upload-dropzone {
  display: grid;
  gap: 8px;
  width: 100%;
  padding: 26px 20px;
  text-align: left;
  border-radius: 24px;
  border: 1.5px dashed rgba(11, 114, 136, 0.28);
  background: linear-gradient(160deg, rgba(11, 114, 136, 0.05), rgba(255, 255, 255, 0.96));
  cursor: pointer;
}

.upload-dropzone.is-active {
  border-color: #0b7288;
  background: linear-gradient(160deg, rgba(11, 114, 136, 0.12), rgba(255, 255, 255, 0.96));
}

.upload-dropzone:disabled {
  cursor: wait;
  opacity: 0.72;
}

.results-list {
  display: grid;
  gap: 18px;
  margin-top: 16px;
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
  background: linear-gradient(135deg, rgba(11, 114, 136, 0.16), rgba(32, 168, 197, 0.24));
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
    grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.85fr);
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
  .hero-card,
  .hero-card__actions,
  .panel-heading,
  .block-heading {
    flex-direction: column;
  }

  .search-box {
    grid-template-columns: 1fr;
  }

  .search-box button,
  .hero-card__actions > button {
    width: 100%;
  }
}
</style>
