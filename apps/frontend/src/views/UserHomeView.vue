<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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

const allResults: PassengerRecord[] = [
  {
    id: 'result-zhang-wei',
    name: 'ZHANG WEI',
    documentId: 'E92834102',
    pnr: 'CX880-LAX',
    route: 'CX880 (HKG -> LAX)',
    seat: '12A / Business',
    eta: '预计 14:20 抵达',
    riskLevel: 'high',
    riskLabel: '高风险预警',
    summary:
      '最近 3 个月内存在多次异常行程组合，且与重点名单出现高重合度，建议执行二级人工审核。',
    watchTags: ['异常行程', '名单重合', '人工复核'],
  },
  {
    id: 'result-li-na',
    name: 'LI NA',
    documentId: 'G5521009',
    pnr: 'MU715-SIN',
    route: 'MU715 (PVG -> SIN)',
    seat: '18C / Economy',
    eta: '预计 19:05 抵达',
    riskLevel: 'medium',
    riskLabel: '持续观察',
    summary:
      '同行人关系链存在轻度异常，建议补充核验近 30 天出入境与购票关联信息。',
    watchTags: ['关系链复核', '补充数据', '持续观察'],
  },
];

const dashboardStats: DashboardStat[] = [
  {
    label: '本日查询量',
    value: '1,284',
    detail: '+12% vs. 昨日',
  },
  {
    label: '高风险拦截',
    value: '24',
    detail: '+4 新增记录',
  },
  {
    label: 'API 延迟',
    value: '18ms',
    detail: '当前链路稳定',
  },
  {
    label: '节点负载',
    value: '45%',
    detail: '处于安全阈值',
  },
];

const query = ref('');
const results = ref<PassengerRecord[]>([...allResults]);
const recentSearches = ref(['E92834102', 'G5521009']);
const searchStatus = ref('请输入旅客证件号或 PNR 发起检索。');
const importStatus = ref('支持 CSV / XLSX，单次最大 20MB。');
const isDropActive = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

function performSearch(rawValue = query.value) {
  const trimmed = rawValue.trim();
  query.value = trimmed;

  if (!trimmed) {
    results.value = [...allResults];
    searchStatus.value = '已重置为默认结果，请输入旅客证件号或 PNR。';
    return;
  }

  const keyword = trimmed.toLowerCase();
  results.value = allResults.filter((record) =>
    [record.documentId, record.pnr, record.name, record.route].some((field) =>
      field.toLowerCase().includes(keyword)
    )
  );

  recentSearches.value = [
    trimmed,
    ...recentSearches.value.filter((item) => item !== trimmed),
  ].slice(0, 4);

  searchStatus.value = results.value.length
    ? `已检索到 ${results.value.length} 条匹配记录。`
    : `未找到与 "${trimmed}" 匹配的旅客记录。`;
}

function submitSearch() {
  performSearch();
}

function applyRecentSearch(item: string) {
  query.value = item;
  performSearch(item);
}

function triggerFileSelection() {
  fileInput.value?.click();
}

function acceptFile(file: File | null) {
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

  importStatus.value = `已选择文件：${file.name}`;
}

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  acceptFile(input.files?.[0] ?? null);
}

function handleDrop(event: DragEvent) {
  isDropActive.value = false;
  acceptFile(event.dataTransfer?.files?.[0] ?? null);
}

async function openAskWorkspace() {
  await router.push({ name: 'home-ask' });
}
</script>

<template>
  <section class="user-page">
    <section class="hero-card">
      <div>
        <p class="section-eyebrow">Search Console</p>
        <h2>数据检索与风险联动分析</h2>
        <p class="section-copy">
          这个页面现在只负责 `UserHomeView` 自己的业务内容。侧边栏切换已经移到公共布局里，不再把页内分区误当成页面导航。
        </p>
      </div>

      <div class="hero-card__actions">
        <button class="secondary-action" type="button">
          导出模板
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
            placeholder="输入旅客证件号或订票编码 (PNR)"
          />
          <button type="submit">查询</button>
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

        <button
          class="upload-dropzone"
          :class="{ 'is-active': isDropActive }"
          type="button"
          @click="triggerFileSelection"
          @dragenter.prevent="isDropActive = true"
          @dragover.prevent="isDropActive = true"
          @dragleave.prevent="isDropActive = false"
          @drop.prevent="handleDrop"
        >
          <strong>点击或拖拽文件至此处</strong>
          <span>系统将校验文件格式并接入风险分析队列。</span>
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
            <button class="secondary-action" type="button">查看档案</button>
            <button class="text-action" type="button">标记安全</button>
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
