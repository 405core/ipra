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

type HistoryTabKey = 'scan' | 'log';

const activeTab = ref<HistoryTabKey>('log');
const query = ref('');
const logs = ref<ProtectedListItem[]>([]);
const total = ref(0);
const page = ref(1);
const pageSize = 10;
const statusMessage = ref('正在加载审计日志...');
const isLoading = ref(false);
const selectedLog = ref<ProtectedDetailResponse | null>(null);
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
  selectedLog.value = null;
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
      <div class="audit-topbar">
        <div class="history-tabs" role="tablist" aria-label="历史记录导航">
          <button
            type="button"
            class="history-tab"
            :class="{ 'is-active': activeTab === 'scan' }"
            :aria-selected="activeTab === 'scan'"
            @click="activeTab = 'scan'"
          >
            扫描记录
          </button>
          <button
            type="button"
            class="history-tab"
            :class="{ 'is-active': activeTab === 'log' }"
            :aria-selected="activeTab === 'log'"
            @click="activeTab = 'log'"
          >
            日志记录
          </button>
        </div>

        <template v-if="activeTab === 'log'">
          <input
            v-model="query"
            :title="touchInputHint"
            class="audit-topbar__input"
            type="text"
            inputmode="search"
            placeholder="筛选操作、资源、路径"
            @dblclick.stop.prevent="openAuditFilterKeyboard"
          />
          <span class="audit-topbar__meta">{{ paginationSummary() }}，总计 {{ total }} 条</span>
          <button type="button" class="audit-refresh" :disabled="isLoading" @click="loadLogs">
            {{ isLoading ? '刷新中...' : '刷新' }}
          </button>
        </template>
      </div>

      <section v-if="activeTab === 'scan'" class="audit-card audit-card--placeholder">
        <div class="audit-empty">
          <strong>扫描记录功能暂未开放</strong>
          <span>当前仅保留导航占位，后续将在这里展示扫描历史。</span>
        </div>
      </section>

      <section v-else class="audit-card">
        <div class="audit-list">
          <article v-for="item in pagedLogs()" :key="item.id" class="audit-item">
            <div class="audit-item__head">
              <div class="audit-item__title">
                <strong>
                  <SensitiveAssetImage
                    v-if="findProtectedField(item.fields, 'resource')"
                    :src="findProtectedField(item.fields, 'resource')!.asset.url"
                    alt="资源"
                    inline
                  />
                </strong>
                <span class="audit-item__subtitle">
                  <SensitiveAssetImage
                    v-if="findProtectedField(item.fields, 'action')"
                    :src="findProtectedField(item.fields, 'action')!.asset.url"
                    alt="动作"
                    inline
                  />
                </span>
              </div>
              <div class="audit-item__chips">
                <span
                  v-for="chip in item.chips ?? []"
                  :key="`${item.id}-${chip.key}`"
                  class="audit-item__pill"
                  :class="`is-${chip.tone || 'default'}`"
                >
                  <SensitiveAssetImage
                    :src="chip.asset.url"
                    :alt="chip.key"
                    inline
                  />
                </span>
              </div>
            </div>

            <div class="audit-item__meta">
              <span
                v-for="detail in protectedFactEntries(item)"
                :key="`${item.id}-${detail.key || detail.label}`"
                class="audit-item__meta-entry"
              >
                <span class="audit-item__meta-label">{{ detail.label }}</span>
                <strong>
                  <SensitiveAssetImage
                    :src="detail.asset.url"
                    :alt="detail.label"
                    inline
                  />
                </strong>
              </span>
            </div>
            <div class="audit-item__actions">
              <button type="button" class="audit-item__detail" @click="openLogDetail(item)">
                详情
              </button>
            </div>
          </article>

          <div v-if="!logs.length" class="audit-empty">
            <strong>当前没有可显示的审计日志</strong>
            <span>{{ statusMessage }}</span>
          </div>
        </div>

        <div v-if="logs.length" class="audit-pagination">
          <button
            type="button"
            class="audit-refresh"
            :disabled="page <= 1"
            @click="page = Math.max(1, page - 1)"
          >
            上一页
          </button>
          <span class="audit-topbar__meta">第 {{ page }} / {{ pageCount() }} 页</span>
          <button
            type="button"
            class="audit-refresh"
            :disabled="page >= pageCount()"
            @click="page = Math.min(pageCount(), page + 1)"
          >
            下一页
          </button>
        </div>
      </section>
    </section>
  </section>

  <Teleport to="body">
    <section v-if="selectedLog" class="audit-dialog" @click.self="closeLogDetail">
      <div class="audit-dialog__card">
        <div class="audit-dialog__head">
          <div>
            <h3>日志详情</h3>
          </div>
          <button type="button" class="audit-dialog__close" @click="closeLogDetail">关闭</button>
        </div>

        <SensitiveAssetImage :src="selectedLog.asset.url" alt="审计日志详情敏感图片" />
      </div>
    </section>
  </Teleport>
</template>

<style scoped lang="scss">
.audit-page {
  min-height: 0;
  height: 100%;
  display: grid;
}

.audit-shell {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: 0;
  height: min(100%, var(--content-height, 100%));
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: clamp(12px, 1.4vw, 18px);
  padding: clamp(14px, 1.8vw, 26px);
  border-radius: clamp(22px, 2vw, 28px);
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(157, 189, 202, 0.36);
  box-shadow: 0 22px 46px rgba(14, 40, 48, 0.08);
  overflow: hidden;
}

.audit-topbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: clamp(10px, 1.2vw, 12px);
  min-width: 0;
}

.history-tabs {
  display: flex;
  flex: 0 0 auto;
  gap: 12px;
}

.history-tab,
.audit-refresh {
  min-height: clamp(42px, 5vh, 48px);
  padding: 0 clamp(14px, 1.6vw, 18px);
  border-radius: clamp(12px, 1.2vw, 14px);
  font-weight: 700;
  flex: 0 0 auto;
}

.history-tab {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(157, 189, 202, 0.42);
  color: #4a636b;
}

.history-tab.is-active,
.audit-refresh {
  background: linear-gradient(135deg, #0b7288, #20a8c5);
  color: #fff;
}

.audit-topbar__input {
  flex: 1 1 min(340px, 100%);
  min-width: min(100%, 260px);
  min-height: clamp(44px, 5vh, 48px);
  padding: 0 clamp(12px, 1.4vw, 16px);
  border-radius: clamp(14px, 1.5vw, 16px);
  background: #fff;
  border: 1px solid rgba(157, 189, 202, 0.4);
  color: #15252b;
}

.audit-topbar__meta,
.audit-item__meta,
.audit-empty span {
  color: #5b7179;
  line-height: 1.6;
}

.audit-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  padding: clamp(16px, 1.8vw, 24px);
  border-radius: clamp(20px, 1.8vw, 24px);
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(157, 189, 202, 0.36);
  overflow: hidden;
}

.audit-card--placeholder {
  display: grid;
  place-items: center;
}

.audit-list {
  display: grid;
  flex: 1 1 auto;
  gap: clamp(12px, 1.2vw, 14px);
  height: 100%;
  min-height: 0;
  align-content: start;
  overflow: auto;
  padding-right: 4px;
}

.audit-pagination {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: clamp(12px, 1.2vw, 16px);
  padding-top: clamp(10px, 1vw, 12px);
  border-top: 1px solid rgba(157, 189, 202, 0.28);
}

.audit-item,
.audit-empty {
  padding: clamp(16px, 1.6vw, 20px);
  border-radius: clamp(18px, 1.8vw, 22px);
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(157, 189, 202, 0.36);
}

.audit-item__head,
.audit-item__meta,
.audit-item__actions,
.audit-dialog__head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.audit-item__head {
  justify-content: space-between;
  align-items: flex-start;
}

.audit-item__head strong,
.audit-empty strong,
.audit-dialog__head h3 {
  color: #15252b;
}

.audit-item__title {
  display: grid;
  gap: 8px;
}

.audit-item__title strong,
.audit-item__subtitle {
  display: inline-flex;
  align-items: center;
}

.audit-item__title :deep(.sensitive-image img) {
  height: 22px;
}

.audit-item__chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.audit-item__meta {
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
}

.audit-item__meta-entry {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 34px;
  padding: 0 10px;
  border-radius: 12px;
  background: #fbfeff;
  border: 1px solid rgba(157, 189, 202, 0.36);
}

.audit-item__meta-entry strong {
  display: inline-flex;
  align-items: center;
}

.audit-item__meta-label {
  color: #6c8790;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.audit-item__pill {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
}

.audit-item__pill.is-success {
  background: rgba(35, 125, 77, 0.12);
  color: #237d4d;
}

.audit-item__pill.is-alert,
.audit-item__pill.is-denied,
.audit-item__pill.is-failure {
  background: rgba(199, 92, 71, 0.12);
  color: #a24734;
}

.audit-item__pill.is-muted {
  background: rgba(91, 113, 121, 0.12);
  color: #5b7179;
}

.audit-item__pill.is-default {
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(157, 189, 202, 0.48);
  color: #43646e;
}

.audit-item__notes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.audit-item__note {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(91, 113, 121, 0.12);
  color: #5b7179;
}

.audit-item__detail,
.audit-dialog__close {
  min-height: 34px;
  padding: 0 14px;
  border-radius: 12px;
  background: rgba(11, 114, 136, 0.12);
  color: #0b7288;
  font-weight: 700;
}

.audit-empty {
  text-align: center;
}

.audit-dialog {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(18, 40, 46, 0.36);
  backdrop-filter: blur(8px);
}

.audit-dialog__card {
  width: min(920px, 100%);
  max-height: min(86dvh, 920px);
  overflow: auto;
  padding: 24px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(157, 189, 202, 0.4);
  box-shadow: 0 26px 56px rgba(14, 40, 48, 0.18);
}

.audit-dialog__head {
  justify-content: space-between;
  align-items: flex-start;
}

.audit-dialog__head h3,
.audit-dialog__head p,
.audit-detail-item,
.audit-detail-block {
  margin: 0;
}

.audit-dialog__head p,
.audit-detail-item span,
.audit-detail-block span {
  color: #5b7179;
}

.audit-detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.audit-detail-item {
  display: grid;
  gap: 6px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(239, 246, 249, 0.88);
  border: 1px solid rgba(157, 189, 202, 0.26);
}

.audit-detail-item strong {
  color: #15252b;
  word-break: break-word;
}

.audit-detail-item--full {
  grid-column: 1 / -1;
}

.audit-detail-block {
  margin-top: 18px;
  display: grid;
  gap: 10px;
}

.audit-detail-block pre {
  margin: 0;
  padding: 16px 18px;
  border-radius: 18px;
  background: #f2f8fa;
  border: 1px solid rgba(157, 189, 202, 0.26);
  color: #1d353c;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 0.85rem;
  line-height: 1.65;
}

@media (max-width: 719px) {
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

  .audit-card {
    min-height: 280px;
    height: auto;
  }

  .audit-list {
    flex: 1 1 auto;
    max-height: none;
  }

  .audit-card--placeholder {
    min-height: 280px;
  }

  .audit-dialog {
    padding: 14px;
  }

  .audit-dialog__card {
    padding: 20px;
  }

  .audit-detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
