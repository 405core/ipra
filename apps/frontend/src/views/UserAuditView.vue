<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { listAuditLogs, type AuditLogItem } from '../app/audit-service';

type HistoryTabKey = 'scan' | 'log';

const activeTab = ref<HistoryTabKey>('log');
const query = ref('');
const logs = ref<AuditLogItem[]>([]);
const total = ref(0);
const statusMessage = ref('正在加载审计日志...');
const isLoading = ref(false);
const selectedLog = ref<AuditLogItem | null>(null);

const filteredLogs = computed(() => {
  const keyword = query.value.trim().toLowerCase();
  if (!keyword) {
    return logs.value;
  }

  return logs.value.filter((item) =>
    [
      item.actorWorkId,
      item.actorName,
      item.action,
      item.resource,
      item.result,
      item.path,
      item.method,
    ]
      .join(' ')
      .toLowerCase()
      .includes(keyword),
  );
});

onMounted(() => {
  void loadLogs();
});

async function loadLogs() {
  isLoading.value = true;
  try {
    const result = await listAuditLogs({ limit: 200 });
    logs.value = result.items;
    total.value = result.total;
    statusMessage.value = `已加载审计日志 ${result.total} 条`;
  } catch (error) {
    logs.value = [];
    total.value = 0;
    statusMessage.value =
      error instanceof Error ? error.message : '查询审计日志失败';
  } finally {
    isLoading.value = false;
  }
}

function formatDateTime(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString('zh-CN', {
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function formatResultLabel(value: string) {
  if (value === 'success') {
    return '成功';
  }
  if (value === 'denied') {
    return '拒绝';
  }
  if (value === 'failure') {
    return '失败';
  }
  return value || '未知';
}

function formatRoleLabel(value: string) {
  if (value === 'admin') {
    return '管理员';
  }
  if (value === 'user') {
    return '员工';
  }
  return value || '未知';
}

function openLogDetail(item: AuditLogItem) {
  selectedLog.value = item;
}

function closeLogDetail() {
  selectedLog.value = null;
}

function formatText(value: string | number | null | undefined) {
  if (value == null) {
    return '-';
  }

  const normalized = String(value).trim();
  return normalized || '-';
}

function formatDetail(detail: AuditLogItem['detail']) {
  if (detail == null) {
    return '无';
  }

  if (typeof detail === 'object' && !Array.isArray(detail) && Object.keys(detail).length === 0) {
    return '无';
  }

  try {
    return JSON.stringify(detail, null, 2);
  } catch {
    return String(detail);
  }
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
            class="audit-topbar__input"
            type="text"
            inputmode="search"
            placeholder="筛选操作、资源、路径"
          />
          <span class="audit-topbar__meta">当前展示 {{ filteredLogs.length }} / {{ total }} 条</span>
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
          <article v-for="item in filteredLogs" :key="item.id" class="audit-item">
            <div class="audit-item__head">
              <strong>{{ item.resource }}</strong>
              <div class="audit-item__actions">
                <span class="audit-item__pill" :class="`is-${item.result}`">
                  {{ formatResultLabel(item.result) }}
                </span>
                <button type="button" class="audit-item__detail" @click="openLogDetail(item)">
                  详情
                </button>
              </div>
            </div>
            <div class="audit-item__meta">
              <span>{{ formatDateTime(item.createdAt) }}</span>
              <span>{{ item.actorName || item.actorWorkId || '未知操作人' }}</span>
              <span>{{ item.action }}</span>
              <span>{{ item.method }} {{ item.path }}</span>
            </div>
          </article>

          <div v-if="!filteredLogs.length" class="audit-empty">
            <strong>当前没有可显示的审计日志</strong>
            <span>{{ statusMessage }}</span>
          </div>
        </div>
      </section>
    </section>
  </section>

  <Teleport to="body">
    <section v-if="selectedLog" class="audit-dialog" @click.self="closeLogDetail">
      <div class="audit-dialog__card">
        <div class="audit-dialog__head">
          <div>
            <h3>{{ selectedLog.resource }}</h3>
            <p>{{ selectedLog.action }} · {{ formatDateTime(selectedLog.createdAt) }}</p>
          </div>
          <button type="button" class="audit-dialog__close" @click="closeLogDetail">关闭</button>
        </div>

        <div class="audit-detail-grid">
          <div class="audit-detail-item">
            <span>操作人</span>
            <strong>{{ formatText(selectedLog.actorName) }}</strong>
          </div>
          <div class="audit-detail-item">
            <span>工号</span>
            <strong>{{ formatText(selectedLog.actorWorkId) }}</strong>
          </div>
          <div class="audit-detail-item">
            <span>角色</span>
            <strong>{{ formatRoleLabel(selectedLog.actorRole) }}</strong>
          </div>
          <div class="audit-detail-item">
            <span>结果</span>
            <strong>{{ formatResultLabel(selectedLog.result) }}</strong>
          </div>
          <div class="audit-detail-item">
            <span>状态码</span>
            <strong>{{ formatText(selectedLog.statusCode) }}</strong>
          </div>
          <div class="audit-detail-item">
            <span>方法</span>
            <strong>{{ formatText(selectedLog.method) }}</strong>
          </div>
          <div class="audit-detail-item audit-detail-item--full">
            <span>路径</span>
            <strong>{{ formatText(selectedLog.path) }}</strong>
          </div>
          <div class="audit-detail-item">
            <span>客户端 IP</span>
            <strong>{{ formatText(selectedLog.clientIp) }}</strong>
          </div>
          <div class="audit-detail-item audit-detail-item--full">
            <span>User-Agent</span>
            <strong>{{ formatText(selectedLog.userAgent) }}</strong>
          </div>
        </div>

        <div class="audit-detail-block">
          <span>详细日志</span>
          <pre>{{ formatDetail(selectedLog.detail) }}</pre>
        </div>
      </div>
    </section>
  </Teleport>
</template>

<style scoped lang="scss">
.audit-page {
  min-height: calc(100vh - 146px);
  display: grid;
  align-content: center;
}

.audit-shell {
  box-sizing: border-box;
  width: min(1180px, 100%);
  height: calc(100vh - 146px);
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 18px;
  padding: 26px 28px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(157, 189, 202, 0.36);
  box-shadow: 0 22px 46px rgba(14, 40, 48, 0.08);
  overflow: hidden;
}

.audit-topbar {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  overflow-x: auto;
}

.history-tabs {
  display: flex;
  flex: 0 0 auto;
  gap: 12px;
}

.history-tab,
.audit-refresh {
  min-height: 44px;
  padding: 0 18px;
  border-radius: 14px;
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
  flex: 1 1 auto;
  min-height: 48px;
  padding: 0 16px;
  border-radius: 16px;
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
  min-height: 0;
  padding: 22px 24px;
  border-radius: 24px;
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
  gap: 14px;
  height: 100%;
  min-height: 0;
  overflow: auto;
}

.audit-item,
.audit-empty {
  padding: 18px 20px;
  border-radius: 22px;
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
}

.audit-item__head strong,
.audit-empty strong,
.audit-dialog__head h3 {
  color: #15252b;
}

.audit-item__meta {
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
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

.audit-item__pill.is-denied,
.audit-item__pill.is-failure {
  background: rgba(199, 92, 71, 0.12);
  color: #a24734;
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
  max-height: min(82vh, 920px);
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
    min-height: auto;
    align-content: start;
  }

  .audit-shell {
    height: auto;
    padding: 22px 20px;
    border-radius: 24px;
    overflow: visible;
  }

  .audit-card {
    min-height: 280px;
  }

  .audit-list {
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
