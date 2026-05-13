<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import SensitiveAssetImage from '../app/SensitiveAssetImage.vue';
import {
  getProtectedAuditLogDetail,
  listProtectedAuditLogs,
} from '../app/audit-service';
import { openTouchInput } from '../app/touch-input';
import { useProtectedPage } from '../app/use-protected-page';
import type {
  ProtectedDetailResponse,
  ProtectedFactRef,
  ProtectedFieldRef,
  ProtectedListItem,
} from '../app/protected-service';

const query = ref('');
const logs = ref<ProtectedListItem[]>([]);
const total = ref(0);
const page = ref(1);
const pageSize = 10;
const statusMessage = ref('正在加载审计日志...');
const isLoading = ref(false);
const selectedLog = ref<ProtectedDetailResponse | null>(null);
const isLogDetailVisible = ref(false);
const detailLoading = ref(false);
const detailError = ref('');
const touchInputHint = '单击正常输入，双击打开触控键盘';
let logReloadTimer: number | null = null;
let logLoadRequestId = 0;

onMounted(() => {
  void loadLogs();
});

useProtectedPage('/home/log');

onBeforeUnmount(() => {
  if (logReloadTimer != null && typeof window !== 'undefined') {
    window.clearTimeout(logReloadTimer);
  }
});

watch(query, () => {
  page.value = 1;
  scheduleLogsReload();
});

async function loadLogs() {
  const requestId = ++logLoadRequestId;
  isLoading.value = true;
  try {
    const result = await listProtectedAuditLogs({
      query: query.value,
      limit: 200,
    });
    if (requestId !== logLoadRequestId) {
      return;
    }
    logs.value = result.items;
    total.value = result.total;
    statusMessage.value = `已加载审计日志 ${result.total} 条`;
  } catch (error) {
    if (requestId !== logLoadRequestId) {
      return;
    }
    logs.value = [];
    total.value = 0;
    statusMessage.value =
      error instanceof Error ? error.message : '查询审计日志失败';
  } finally {
    if (requestId === logLoadRequestId) {
      isLoading.value = false;
    }
  }
}

function scheduleLogsReload(immediate = false) {
  if (logReloadTimer != null && typeof window !== 'undefined') {
    window.clearTimeout(logReloadTimer);
  }

  if (immediate || typeof window === 'undefined') {
    logReloadTimer = null;
    void loadLogs();
    return;
  }

  logReloadTimer = window.setTimeout(() => {
    logReloadTimer = null;
    void loadLogs();
  }, 240);
}

async function openAuditFilterKeyboard() {
  const value = await openTouchInput({
    title: '筛选审计日志',
    description: '输入后将立即按操作、资源或路径重新加载审计日志。',
    placeholder: '筛选操作、资源、路径',
    value: query.value,
    inputMode: 'search',
    confirmText: '确认筛选',
  });

  if (value == null) {
    return;
  }

  if (value === query.value) {
    await loadLogs();
    return;
  }

  query.value = value;
}

async function openLogDetail(item: ProtectedListItem) {
  isLogDetailVisible.value = true;
  detailLoading.value = true;
  detailError.value = '';
  selectedLog.value = null;
  try {
    selectedLog.value = await getProtectedAuditLogDetail(item.id);
  } catch (error) {
    detailError.value = error instanceof Error ? error.message : '查询审计日志详情失败';
  } finally {
    detailLoading.value = false;
  }
}

function closeLogDetail() {
  isLogDetailVisible.value = false;
  selectedLog.value = null;
  detailLoading.value = false;
  detailError.value = '';
}

function findProtectedField(
  fields: ProtectedFieldRef[] | undefined,
  key: string,
) {
  return fields?.find((item) => item.key === key) ?? null;
}

function protectedFactEntries(item: ProtectedListItem) {
  return (item.facts ?? []) as ProtectedFactRef[];
}

function protectedChipToneClass(tone?: string | null) {
  switch (tone) {
    case 'success':
      return 'admin-row__pill--success';
    case 'warning':
      return 'admin-row__pill--warning';
    case 'alert':
    case 'danger':
    case 'denied':
    case 'failure':
      return 'admin-row__pill--alert';
    case 'muted':
      return 'admin-row__pill--muted';
    case 'identity':
      return 'admin-row__pill--identity';
    default:
      return '';
  }
}

function pageCount() {
  return Math.max(1, Math.ceil(logs.value.length / pageSize));
}

function pagedLogs() {
  const safePage = Math.min(Math.max(page.value, 1), pageCount());
  const start = (safePage - 1) * pageSize;
  return logs.value.slice(start, start + pageSize);
}

function paginationSummary() {
  if (!logs.value.length) {
    return '当前没有数据';
  }
  const safePage = Math.min(Math.max(page.value, 1), pageCount());
  const start = (safePage - 1) * pageSize + 1;
  const end = Math.min(logs.value.length, start + pageSize - 1);
  return `第 ${safePage} / ${pageCount()} 页，显示 ${start}-${end} 条，共 ${logs.value.length} 条`;
}
</script>

<template>
  <section class="audit-page">
    <section class="audit-shell">
      <div class="admin-toolbar">
        <div class="admin-toolbar__search-block">
          <input
            v-model="query"
            :title="touchInputHint"
            class="admin-toolbar__search-input"
            type="text"
            inputmode="search"
            placeholder="输入操作、资源或路径"
            @dblclick.stop.prevent="openAuditFilterKeyboard"
          />
        </div>
        <div class="admin-toolbar__actions">
          <button
            type="button"
            class="ghost ghost--strong"
            :disabled="isLoading"
            @click="loadLogs"
          >
            {{ isLoading ? '刷新中...' : '刷新日志' }}
          </button>
        </div>
      </div>

      <p class="admin-filter-summary">
        {{ paginationSummary() }}，总计 {{ total }} 条
      </p>

      <div class="admin-table">
        <article
          v-for="item in pagedLogs()"
          :key="item.id"
          class="admin-row admin-row--audit"
        >
          <div class="admin-row__profile-content">
            <div class="admin-row__headline">
              <strong class="admin-inline-title">
                <SensitiveAssetImage
                  v-if="findProtectedField(item.fields, 'resource')"
                  :src="findProtectedField(item.fields, 'resource')!.asset.url"
                  alt="资源"
                  inline
                  eager
                />
              </strong>
              <span class="admin-row__pill admin-row__pill--identity">
                <SensitiveAssetImage
                  v-if="findProtectedField(item.fields, 'action')"
                  :src="findProtectedField(item.fields, 'action')!.asset.url"
                  alt="动作"
                  inline
                />
              </span>
              <span
                v-for="chip in item.chips ?? []"
                :key="`${item.id}-${chip.key}`"
                class="admin-row__pill"
                :class="protectedChipToneClass(chip.tone)"
              >
                <SensitiveAssetImage
                  :src="chip.asset.url"
                  :alt="chip.key"
                  inline
                />
              </span>
            </div>

            <div
              v-if="protectedFactEntries(item).length"
              class="admin-row__fact-list"
            >
              <span
                v-for="detail in protectedFactEntries(item)"
                :key="`${item.id}-${detail.key || detail.label}`"
                class="admin-row__fact"
              >
                <span class="admin-row__fact-label">{{ detail.label }}</span>
                <strong class="admin-row__fact-value">
                  <SensitiveAssetImage
                    :src="detail.asset.url"
                    :alt="detail.label"
                    inline
                  />
                </strong>
              </span>
            </div>
          </div>

          <div class="admin-row__actions">
            <button type="button" @click="openLogDetail(item)">
              查看详情
            </button>
          </div>
        </article>

        <div v-if="!logs.length" class="empty-panel--compact">
          <strong>当前没有可显示的审计日志</strong>
          <span>{{ statusMessage }}</span>
        </div>
      </div>

      <div v-if="logs.length" class="admin-pagination">
        <button
          type="button"
          class="ghost"
          :disabled="page <= 1"
          @click="page = Math.max(1, page - 1)"
        >
          上一页
        </button>
        <span class="admin-pagination__meta">
          第 {{ page }} / {{ pageCount() }} 页
        </span>
        <button
          type="button"
          class="ghost"
          :disabled="page >= pageCount()"
          @click="page = Math.min(pageCount(), page + 1)"
        >
          下一页
        </button>
      </div>
    </section>
  </section>

  <Teleport to="body">
    <section
      v-if="isLogDetailVisible"
      class="admin-dialog"
      @click.self="closeLogDetail"
    >
      <div class="admin-form-card admin-form-card--dialog admin-form-card--audit admin-form-card--content-fit">
        <div class="admin-dialog-shell admin-dialog-shell--audit-detail">
          <section class="admin-dialog-console admin-dialog-console--audit-detail admin-dialog-console--content-only">
            <div v-if="selectedLog" class="archive-detail archive-detail--dialog">
              <section class="archive-detail__block archive-detail__block--media">
                <span class="meta-label">日志快照</span>
                <SensitiveAssetImage
                  :src="selectedLog.asset.url"
                  alt="审计日志详情敏感图片"
                />
              </section>
            </div>

            <div v-else class="empty-panel--compact">
              <strong>{{
                detailLoading ? '正在加载审计日志详情' : '暂时无法显示日志详情'
              }}</strong>
              <span>{{ detailError || '请稍候。' }}</span>
            </div>
          </section>
        </div>
      </div>
    </section>
  </Teleport>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap');

.audit-page {
  --audit-scale: clamp(0.88rem, 0.54rem + 0.72vmin, 1.08rem);
  --audit-gap-xs: calc(var(--audit-scale) * 0.36);
  --audit-gap-sm: calc(var(--audit-scale) * 0.62);
  --audit-gap-md: calc(var(--audit-scale) * 0.92);
  --audit-gap-lg: calc(var(--audit-scale) * 1.18);
  --audit-card-radius: calc(var(--audit-scale) * 1.14);
  --audit-pill-h: calc(var(--audit-scale) * 1.92);
  --audit-pill-px: calc(var(--audit-scale) * 0.72);
  --audit-control-h-lg: calc(var(--audit-scale) * 2.95);
  --audit-font-xs: clamp(0.74rem, 0.68rem + 0.18vw, 0.82rem);
  --audit-font-sm: clamp(0.82rem, 0.76rem + 0.18vw, 0.92rem);
  --audit-font-md: clamp(0.92rem, 0.84rem + 0.24vw, 1rem);
  --audit-inline-image-h: calc(var(--audit-scale) * 1.08);
  --audit-border: rgba(157, 189, 202, 0.42);
  --audit-border-strong: rgba(157, 189, 202, 0.56);
  --audit-accent: #0b7288;
  --audit-accent-strong: #0a5b6b;
  --audit-text: #15252b;
  --audit-text-muted: #5b7179;
  min-height: 0;
  height: min(100%, var(--content-height, 100%));
  display: grid;
  overflow: hidden;
  font-family: 'IBM Plex Sans', sans-serif;
}

.audit-shell {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  gap: var(--audit-gap-md);
  padding: clamp(14px, 1.8vw, 26px);
  border-radius: clamp(22px, 2vw, 28px);
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(157, 189, 202, 0.36);
  box-shadow: 0 22px 46px rgba(14, 40, 48, 0.08);
  overflow: hidden;
}

.admin-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--audit-gap-md);
}

.admin-toolbar__search-block {
  flex: 1 1 min(30rem, 100%);
  min-width: min(100%, 18rem);
}

.admin-toolbar__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--audit-gap-sm);
  margin-left: auto;
}

.admin-toolbar__search-input {
  width: 100%;
  min-height: var(--audit-control-h-lg);
  padding: 0 calc(var(--audit-scale) * 0.92);
  border-radius: var(--audit-card-radius);
  background: #fff;
  border: 1px solid var(--audit-border);
  color: var(--audit-text);
  font: inherit;
  font-size: var(--audit-font-md);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);
}

.admin-toolbar__search-input::placeholder {
  color: #7a97a0;
}

.admin-toolbar__search-input:focus {
  outline: none;
  border-color: rgba(11, 114, 136, 0.36);
  box-shadow:
    0 0 0 4px rgba(11, 114, 136, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.72);
}

.admin-toolbar button,
.admin-row__actions button,
.admin-pagination button {
  border: 0;
  cursor: pointer;
  font-family: inherit;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    opacity 0.18s ease;
}

.admin-toolbar button:hover:not(:disabled),
.admin-row__actions button:hover:not(:disabled),
.admin-pagination button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.admin-toolbar button:disabled,
.admin-row__actions button:disabled,
.admin-pagination button:disabled {
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.admin-toolbar button,
.admin-row__actions button {
  min-height: var(--audit-control-h-lg);
  padding: 0 calc(var(--audit-scale) * 1.15);
  border-radius: var(--audit-card-radius);
  background: linear-gradient(135deg, var(--audit-accent), #20a8c5);
  color: #fff;
  font-size: var(--audit-font-md);
  font-weight: 700;
  box-shadow: 0 calc(var(--audit-scale) * 0.4) calc(var(--audit-scale) * 0.95)
    rgba(11, 114, 136, 0.22);
}

.admin-toolbar button.ghost,
.admin-pagination button.ghost {
  background: rgba(233, 244, 247, 0.96);
  color: var(--audit-accent-strong);
  border: 1px solid var(--audit-border);
  box-shadow: none;
}

.admin-toolbar button.ghost--strong {
  background: linear-gradient(135deg, var(--audit-accent), #20a8c5);
  color: #fff;
  border: 0;
  box-shadow: 0 calc(var(--audit-scale) * 0.4) calc(var(--audit-scale) * 0.95)
    rgba(11, 114, 136, 0.22);
}

.admin-toolbar button:disabled,
.admin-row__actions button:disabled,
.admin-pagination button:disabled {
  background: #eef5f7;
  color: #99aeb6;
  border-color: rgba(157, 189, 202, 0.24);
}

.admin-filter-summary {
  margin: 0;
  color: var(--audit-text-muted);
  font-size: var(--audit-font-sm);
  line-height: 1.6;
}

.admin-table {
  display: grid;
  flex: 1 1 auto;
  gap: var(--audit-gap-md);
  min-height: 0;
  align-content: start;
  overflow: auto;
  padding-right: var(--audit-gap-xs);
}

.admin-row {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: var(--audit-gap-lg);
  padding: calc(var(--audit-scale) * 0.98);
  border-radius: var(--audit-card-radius);
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid var(--audit-border);
}

.admin-row > :first-child {
  min-width: 0;
  flex: 1 1 auto;
}

.admin-row__profile-content {
  min-width: 0;
  flex: 1 1 auto;
  display: grid;
  gap: var(--audit-gap-sm);
}

.admin-row__headline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--audit-gap-xs) var(--audit-gap-sm);
}

.admin-inline-title {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  max-width: 100%;
}

.admin-inline-title :deep(.sensitive-image img) {
  height: var(--audit-inline-image-h);
}

.admin-row__pill :deep(.sensitive-image),
.admin-row__fact-value :deep(.sensitive-image) {
  max-width: 100%;
}

.admin-row__pill :deep(.sensitive-image img),
.admin-row__fact-value :deep(.sensitive-image img) {
  max-width: 100%;
  height: calc(var(--audit-scale) * 0.98);
}

.admin-row__pill,
.admin-row__fact {
  min-width: 0;
  max-width: 100%;
}

.admin-row__pill {
  display: inline-flex;
  align-items: center;
  min-height: var(--audit-pill-h);
  padding: 0 var(--audit-pill-px);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid var(--audit-border-strong);
  color: #43646e;
  font-size: var(--audit-font-xs);
  font-weight: 700;
}

.admin-row__pill--identity {
  background: rgba(233, 244, 247, 0.96);
  border-color: rgba(157, 189, 202, 0.58);
  color: #39606b;
}

.admin-row__pill--alert {
  background: rgba(199, 92, 71, 0.12);
  border-color: rgba(199, 92, 71, 0.18);
  color: #a24734;
}

.admin-row__pill--warning {
  background: rgba(233, 176, 58, 0.16);
  border-color: rgba(233, 176, 58, 0.24);
  color: #9b6508;
}

.admin-row__pill--success {
  background: rgba(35, 125, 77, 0.14);
  border-color: rgba(35, 125, 77, 0.22);
  color: #237d4d;
}

.admin-row__pill--muted {
  background: rgba(91, 113, 121, 0.12);
  border-color: rgba(157, 189, 202, 0.24);
  color: #5b7179;
}

.admin-row__fact-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--audit-gap-xs) var(--audit-gap-sm);
}

.admin-row__fact {
  display: inline-flex;
  align-items: center;
  gap: var(--audit-gap-xs);
  min-height: calc(var(--audit-scale) * 2.18);
  padding: 0 var(--audit-pill-px);
  border-radius: calc(var(--audit-scale) * 0.78);
  background: #fbfeff;
  border: 1px solid rgba(157, 189, 202, 0.36);
}

.admin-row__fact-label {
  color: #6f8a93;
  font-size: var(--audit-font-xs);
  font-weight: 700;
  letter-spacing: 0.04em;
}

.admin-row__fact-value {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  color: var(--audit-text);
  font-size: var(--audit-font-sm);
  font-weight: 700;
}

.admin-row__actions {
  display: flex;
  flex-direction: column;
  gap: var(--audit-gap-sm);
  margin-left: auto;
  justify-content: flex-start;
  align-items: stretch;
  flex: 0 0 clamp(calc(var(--audit-scale) * 8.9), 14vw, calc(var(--audit-scale) * 11.2));
  width: clamp(calc(var(--audit-scale) * 8.9), 14vw, calc(var(--audit-scale) * 11.2));
  min-width: 0;
}

.admin-row__actions button {
  width: 100%;
  flex: 1 1 0;
  min-width: 0;
  min-height: var(--audit-control-h-lg);
  border-radius: var(--audit-card-radius);
  font-size: var(--audit-font-sm);
  font-weight: 700;
}

.admin-pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: var(--audit-gap-sm);
  margin-top: var(--audit-gap-xs);
  padding-top: var(--audit-gap-sm);
  border-top: 1px solid rgba(157, 189, 202, 0.28);
}

.admin-pagination button {
  min-height: var(--audit-control-h-lg);
  min-width: calc(var(--audit-scale) * 7.8);
  padding: 0 calc(var(--audit-scale) * 1.15);
  border-radius: var(--audit-card-radius);
  font-size: var(--audit-font-md);
  font-weight: 700;
}

.admin-pagination__meta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: var(--audit-control-h-lg);
  padding: 0 calc(var(--audit-scale) * 1.15);
  border-radius: var(--audit-card-radius);
  background: rgba(233, 244, 247, 0.96);
  border: 1px solid var(--audit-border);
  color: var(--audit-accent-strong);
  font-size: var(--audit-font-md);
  font-weight: 700;
}

.admin-dialog {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(18, 40, 46, 0.36);
  backdrop-filter: blur(8px);
}

.admin-form-card {
  width: min(1080px, 100%);
  overflow: hidden;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(157, 189, 202, 0.4);
  box-shadow: 0 26px 56px rgba(14, 40, 48, 0.18);
}

.admin-form-card--dialog {
  min-height: 0;
}

.admin-form-card--content-fit {
  min-height: 0;
  max-height: min(760px, 88vh);
}

.admin-dialog-shell {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  height: 100%;
  min-height: 0;
  background: rgba(255, 255, 255, 0.92);
}

.admin-dialog-console {
  display: grid;
  grid-template-rows: minmax(0, 1fr);
  gap: 18px;
  padding: 28px 32px 32px;
  min-height: 0;
  background: rgba(255, 255, 255, 0.9);
}

.archive-detail {
  display: grid;
  gap: var(--audit-gap-md);
}

.archive-detail--dialog {
  min-height: 0;
  align-content: start;
  overflow: auto;
  padding-right: 6px;
}

.archive-detail__block {
  padding: 22px;
  border-radius: 20px;
  border: 1px solid rgba(157, 189, 202, 0.36);
  background: linear-gradient(
    180deg,
    rgba(250, 254, 255, 0.98),
    rgba(239, 246, 249, 0.94)
  );
  box-shadow:
    0 0 0 4px rgba(11, 114, 136, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.72);
}

.meta-label {
  display: block;
  margin-bottom: 2px;
  color: var(--audit-text-muted);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.archive-detail__block--media :deep(.sensitive-image) {
  display: block;
  overflow: hidden;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(157, 189, 202, 0.36);
}

.archive-detail__block--media :deep(.sensitive-image img) {
  display: block;
  width: 100%;
  height: auto;
}

.empty-panel--compact {
  display: grid;
  place-items: center;
  gap: 10px;
  min-height: 220px;
  padding: 24px;
  text-align: center;
  border-radius: 20px;
  border: 1px solid rgba(157, 189, 202, 0.36);
  background: linear-gradient(
    180deg,
    rgba(250, 254, 255, 0.98),
    rgba(239, 246, 249, 0.94)
  );
  box-shadow:
    0 0 0 4px rgba(11, 114, 136, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.72);
}

.empty-panel--compact strong {
  font-family: 'Manrope', sans-serif;
  font-size: 1.22rem;
  color: var(--audit-text);
}

.empty-panel--compact span {
  color: var(--audit-text-muted);
  line-height: 1.6;
}

@media (max-width: 959px) {
  .audit-page {
    height: auto;
  }

  .audit-shell {
    height: auto;
    min-height: auto;
    padding: 14px;
    border-radius: 22px;
    overflow: visible;
  }

  .admin-toolbar__search-block,
  .admin-toolbar__actions {
    flex: 1 1 100%;
    min-width: 0;
    margin-left: 0;
  }

  .admin-toolbar__actions > * {
    flex: 1 1 auto;
  }

  .admin-table {
    padding-right: 0;
  }

  .admin-row {
    flex-direction: column;
    gap: var(--audit-gap-md);
  }

  .admin-row__actions {
    width: 100%;
    flex: 1 1 auto;
  }

  .admin-row__actions button,
  .admin-pagination button,
  .admin-pagination__meta {
    min-height: calc(var(--audit-control-h-lg) + 4px);
  }

  .admin-pagination {
    justify-content: stretch;
  }

  .admin-pagination button,
  .admin-pagination__meta {
    flex: 1 1 auto;
    min-width: 0;
  }

  .admin-dialog {
    padding: 14px;
  }

  .admin-dialog-console {
    padding: 20px;
  }
}

@media (max-width: 719px) {
  .admin-row__fact {
    width: 100%;
    justify-content: space-between;
  }

  .empty-panel--compact {
    min-height: 180px;
  }
}
</style>
