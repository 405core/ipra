<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router';
import { clearAuthSession, loadAuthSession } from '../auth';
import { recordAuditEvent } from '../app/audit-service';
import { ElMessage } from '../app/el-message';
import {
  downloadImportTemplate,
  importPassengerProfiles,
  type ImportBatchResult,
  type ImportType,
} from '../app/profile-service';

type UserRouteName = 'home-data' | 'home-ask' | 'home-log';

interface NavigationItem {
  routeName: UserRouteName;
  label: string;
  description: string;
}

const router = useRouter();
const route = useRoute();
const session = loadAuthSession();

const navigationItems: NavigationItem[] = [
  {
    routeName: 'home-data',
    label: '数据检索',
    description: '',
  },
  {
    routeName: 'home-ask',
    label: '辅助问询',
    description: '',
  },
  {
    routeName: 'home-log',
    label: '历史记录',
    description: '',
  },
];

const isDesktop = ref(false);
const isSidebarVisible = ref(false);
const isImporting = ref(false);
const isImportDragActive = ref(false);
const defaultImportHint = '支持 CSV / XLSX';
const importStatus = ref('');
const importInput = ref<HTMLInputElement | null>(null);
let importDragDepth = 0;

const userName = computed(() => session?.user.name || '员工');
const badgeNumber = computed(() => session?.user.workId || '100002');
const roleLabel = computed(() =>
  session?.user.role === 'admin' ? '管理员' : '员工'
);
const userBadge = computed(() => {
  const source = userName.value.trim();
  return source.length > 2 ? source.slice(-2) : source || 'RA';
});
const currentTitle = computed(() =>
  typeof route.meta.title === 'string' ? route.meta.title : '员工工作台'
);
const importBoxDetail = computed(() => {
  if (isImporting.value) {
    return importStatus.value || '正在处理导入文件...';
  }

  return defaultImportHint;
});
const hasImportStatus = computed(
  () => !isImporting.value && Boolean(importStatus.value.trim())
);

function syncLayout(force = false) {
  if (typeof window === 'undefined') {
    return;
  }

  const nextIsDesktop = window.innerWidth >= 1080;
  if (force || nextIsDesktop !== isDesktop.value) {
    isDesktop.value = nextIsDesktop;
    isSidebarVisible.value = nextIsDesktop;
  }
}

function handleResize() {
  syncLayout();
}

function toggleSidebar() {
  isSidebarVisible.value = !isSidebarVisible.value;
}

function closeSidebar() {
  isSidebarVisible.value = false;
}

function handleNavClick() {
  if (!isDesktop.value) {
    closeSidebar();
  }
}

async function downloadTemplate(templateType: ImportType) {
  try {
    const { blob, filename } = await downloadImportTemplate(templateType);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    ElMessage.error(normalizeErrorMessage(error, '模板下载失败。'));
  }
}

function triggerImportSelection() {
  if (isImporting.value) {
    return;
  }
  importInput.value?.click();
}

async function acceptImportFile(file: File | null) {
  if (!file) {
    importStatus.value = '未选择文件。';
    return;
  }

  const normalizedName = file.name.toLowerCase();
  const isSupported = normalizedName.endsWith('.csv') || normalizedName.endsWith('.xlsx');
  if (!isSupported) {
    importStatus.value = '仅支持 CSV 或 XLSX 文件。';
    ElMessage.warning(importStatus.value);
    return;
  }

  isImporting.value = true;
  importStatus.value = `正在导入：${file.name}`;

  try {
    const result = await importPassengerProfiles(file);
    importStatus.value = buildImportStatus(file.name, result);
    if (result.status === 'success') {
      ElMessage.success('导入完成');
    } else if (result.status === 'partial_failed') {
      ElMessage.warning('导入部分成功');
    } else {
      ElMessage.error('导入失败');
    }
    window.dispatchEvent(new CustomEvent('ipra:profiles-imported'));
  } catch (error) {
    importStatus.value = normalizeErrorMessage(error, '导入旅客画像失败，请稍后重试。');
    ElMessage.error(importStatus.value);
  } finally {
    isImporting.value = false;
    if (importInput.value) {
      importInput.value.value = '';
    }
  }
}

async function handleImportChange(event: Event) {
  const input = event.target as HTMLInputElement;
  await acceptImportFile(input.files?.[0] ?? null);
}

function handleImportDragEnter() {
  if (isImporting.value) {
    return;
  }
  importDragDepth += 1;
  isImportDragActive.value = true;
}

function handleImportDragLeave() {
  if (isImporting.value) {
    return;
  }
  importDragDepth = Math.max(0, importDragDepth - 1);
  if (importDragDepth === 0) {
    isImportDragActive.value = false;
  }
}

function handleImportDragOver(event: DragEvent) {
  if (isImporting.value) {
    return;
  }
  event.preventDefault();
  isImportDragActive.value = true;
}

async function handleImportDrop(event: DragEvent) {
  event.preventDefault();
  importDragDepth = 0;
  isImportDragActive.value = false;
  if (isImporting.value) {
    return;
  }
  await acceptImportFile(event.dataTransfer?.files?.[0] ?? null);
}

async function logout() {
  try {
    await recordAuditEvent({
      action: 'logout',
      resource: '退出登录',
      result: 'success',
      path: route.fullPath,
    });
  } catch {
    // noop
  }
  clearAuthSession();
  await router.push('/login');
}

function buildImportStatus(fileName: string, result: ImportBatchResult) {
  const firstError = result.errorDetails?.[0];

  if (result.status === 'success') {
    return `导入完成：${fileName}，成功 ${result.successCount}/${result.totalRows} 行。`;
  }

  if (result.status === 'partial_failed') {
    return `部分成功：${result.successCount} 成功，${result.failedCount} 失败。${
      firstError ? `第 ${firstError.rowNo} 行：${firstError.message}` : ''
    }`;
  }

  return `导入失败：${
    firstError
      ? firstError.rowNo
        ? `第 ${firstError.rowNo} 行 ${firstError.message}`
        : firstError.message
      : '请检查文件格式和字段内容。'
  }`;
}

function normalizeErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

watch(
  () => route.fullPath,
  () => {
    if (!isDesktop.value) {
      closeSidebar();
    }
  }
);

onMounted(() => {
  syncLayout(true);
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <section
    class="user-shell"
    :class="{ 'has-sidebar': isDesktop && isSidebarVisible }"
  >
    <header class="user-shell__header">
      <div class="brand-block">
        <button
          class="icon-button"
          type="button"
          :aria-expanded="isSidebarVisible"
          :aria-label="isSidebarVisible ? '隐藏侧边栏' : '展示侧边栏'"
          @click="toggleSidebar"
        >
          <span class="menu-glyph" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div>
          <h1>{{ currentTitle }}</h1>
        </div>
      </div>

      <div class="header-tools">
        <div class="session-chip">
          <div class="session-chip__avatar">{{ userBadge }}</div>
          <div>
            <strong>{{ userName }}</strong>
            <span>{{ roleLabel }} · {{ badgeNumber }}</span>
          </div>
        </div>

        <button class="logout-button" type="button" @click="logout">
          退出登录
        </button>
      </div>
    </header>

    <transition name="fade">
      <button
        v-if="isSidebarVisible && !isDesktop"
        class="user-shell__backdrop"
        type="button"
        aria-label="关闭侧边栏"
        @click="closeSidebar"
      ></button>
    </transition>

    <aside class="user-shell__sidebar" :class="{ 'is-visible': isSidebarVisible }">
      <div class="sidebar__head">
        <h2>工作区</h2>
      </div>

      <nav class="sidebar__nav" aria-label="员工工作台导航">
        <RouterLink
          v-for="item in navigationItems"
          :key="item.routeName"
          class="nav-link"
          :class="{ 'is-active': route.name === item.routeName }"
          :to="{ name: item.routeName }"
          @click="handleNavClick"
        >
          <strong>{{ item.label }}</strong>
          <span v-if="item.description">{{ item.description }}</span>
        </RouterLink>
      </nav>

      <div class="sidebar__tools">
        <p class="sidebar__tools-label">批量导入</p>
        <input
          ref="importInput"
          class="sidebar-upload__input"
          type="file"
          accept=".csv,.xlsx"
          @change="handleImportChange"
        />
        <button
          class="sidebar-upload"
          :class="{ 'is-drag-active': isImportDragActive }"
          type="button"
          :disabled="isImporting"
          @click="triggerImportSelection"
          @dragenter.prevent="handleImportDragEnter"
          @dragover="handleImportDragOver"
          @dragleave.prevent="handleImportDragLeave"
          @drop="handleImportDrop"
        >
          <strong>{{ isImporting ? '正在处理导入文件...' : '导入画像文件' }}</strong>
          <span>{{ importBoxDetail }}</span>
        </button>
        <p v-if="hasImportStatus" class="sidebar__status">{{ importStatus }}</p>
        <div class="sidebar__divider"></div>

        <p class="sidebar__tools-label">模板下载</p>
        <button
          class="sidebar-action"
          type="button"
          @click="downloadTemplate('BASE_PROFILE')"
        >
          下载基础画像模板
        </button>
        <button
          class="sidebar-action"
          type="button"
          @click="downloadTemplate('HIGH_RISK')"
        >
          下载高风险名单模板
        </button>
      </div>
    </aside>

    <main class="user-shell__content">
      <RouterView />
    </main>
  </section>
</template>

<style scoped lang="scss">
.user-shell {
  --page-bg: #eff6f9;
  --panel-bg: rgba(255, 255, 255, 0.9);
  --panel-border: rgba(157, 189, 202, 0.38);
  --accent: #0b7288;
  --accent-strong: #09596c;
  --text-main: #15252b;
  --text-muted: #5b7179;
  --shadow: 0 22px 46px rgba(14, 40, 48, 0.08);
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(16, 146, 174, 0.16), transparent 28%),
    radial-gradient(circle at right center, rgba(251, 162, 122, 0.12), transparent 22%),
    var(--page-bg);
  color: var(--text-main);
}

.user-shell__header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.84);
  border-bottom: 1px solid rgba(157, 189, 202, 0.28);
  backdrop-filter: blur(18px);
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-block h1,
.sidebar__head h2 {
  margin: 0;
}

.brand-block h1 {
  font-size: clamp(1.1rem, 0.95rem + 0.75vw, 1.65rem);
}

.brand-block__eyebrow,
.sidebar__eyebrow {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-muted);
}

.header-tools {
  display: flex;
  align-items: center;
  gap: 12px;
}

.session-chip {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 10px 8px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(157, 189, 202, 0.34);
}

.session-chip strong,
.session-chip span {
  display: block;
}

.session-chip strong {
  font-size: 0.95rem;
}

.session-chip span,
.nav-link span,
.sidebar__tools-label,
.sidebar__status,
.sidebar-upload span {
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.55;
}

.session-chip__avatar {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), #20a8c5);
  color: #ffffff;
  font-weight: 700;
}

.icon-button,
.logout-button,
.nav-link,
.sidebar-action,
.user-shell__backdrop {
  cursor: pointer;
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  border-radius: 18px;
  background: var(--panel-bg);
  border: 1px solid rgba(157, 189, 202, 0.36);
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.icon-button:hover,
.logout-button:hover,
.nav-link:hover {
  transform: translateY(-1px);
}

.menu-glyph {
  display: inline-flex;
  flex-direction: column;
  gap: 5px;
}

.menu-glyph span {
  display: block;
  width: 24px;
  height: 3px;
  border-radius: 999px;
  background: var(--text-main);
}

.logout-button {
  min-height: 44px;
  padding: 0 18px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--accent), #1d9dbc);
  color: #ffffff;
  font-weight: 700;
}

.user-shell__backdrop {
  position: fixed;
  inset: 82px 0 0;
  z-index: 20;
  background: rgba(10, 24, 29, 0.4);
}

.user-shell__sidebar {
  position: fixed;
  top: 82px;
  left: 0;
  bottom: 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  width: min(256px, calc(100vw - 28px));
  padding: 18px;
  background: rgba(246, 251, 253, 0.96);
  border-right: 1px solid rgba(157, 189, 202, 0.28);
  box-shadow: var(--shadow);
  transform: translateX(-104%);
  transition: transform 0.24s ease;
}

.user-shell__sidebar.is-visible {
  transform: translateX(0);
}

.sidebar__head {
  display: grid;
  gap: 6px;
  padding: 6px 4px 2px;
}

.sidebar__nav {
  display: grid;
  gap: 12px;
  margin-top: 18px;
}

.nav-link {
  display: grid;
  gap: 4px;
  width: 100%;
  min-height: 92px;
  padding: 16px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(17, 34, 40, 0.02), rgba(17, 34, 40, 0.06));
  color: var(--text-main);
  border: 1px solid rgba(15, 48, 58, 0.14);
  text-decoration: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
  align-content: center;
  justify-items: center;
  text-align: center;
}

.nav-link strong {
  font-size: 1.04rem;
  line-height: 1.35;
}

.nav-link.is-active {
  background: linear-gradient(135deg, #0b7288, #1690ab);
  border-color: rgba(9, 89, 108, 0.82);
  color: #ffffff;
  box-shadow: 0 16px 30px rgba(11, 114, 136, 0.22);
}

.nav-link.is-active span {
  color: rgba(255, 255, 255, 0.82);
}

.sidebar__tools {
  margin-top: auto;
  display: grid;
  gap: 10px;
  padding-top: 16px;
}

.sidebar-upload__input {
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

.sidebar__tools-label {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-weight: 700;
}

.sidebar__status {
  margin: 0;
}

.sidebar__divider {
  height: 1px;
  background: rgba(157, 189, 202, 0.32);
}

.sidebar-upload {
  display: grid;
  gap: 4px;
  width: 100%;
  min-height: 92px;
  padding: 18px 16px;
  border-radius: 18px;
  text-align: left;
  background: linear-gradient(160deg, rgba(11, 114, 136, 0.08), rgba(255, 255, 255, 0.94));
  border: 1px solid rgba(11, 114, 136, 0.18);
  color: var(--text-main);
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.sidebar-upload strong {
  font-size: 0.96rem;
}

.sidebar-upload.is-drag-active {
  border-color: rgba(11, 114, 136, 0.46);
  background: linear-gradient(160deg, rgba(11, 114, 136, 0.16), rgba(255, 255, 255, 0.98));
  box-shadow: 0 14px 28px rgba(11, 114, 136, 0.16);
}

.sidebar-upload:disabled {
  cursor: wait;
  opacity: 0.72;
}

.sidebar-action {
  min-height: 44px;
  width: 100%;
  padding: 0 14px;
  border-radius: 16px;
  text-align: left;
  font-weight: 700;
  color: var(--accent-strong);
  background: rgba(11, 114, 136, 0.08);
  border: 1px solid rgba(11, 114, 136, 0.16);
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.sidebar-action:hover {
  transform: translateY(-1px);
  background: rgba(11, 114, 136, 0.14);
  border-color: rgba(11, 114, 136, 0.28);
}

.user-shell__content {
  min-height: 100vh;
  padding: 106px 20px 24px;
  transition: padding-left 0.24s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (min-width: 1080px) {
  .user-shell.has-sidebar .user-shell__content {
    padding-left: 296px;
  }

  .user-shell__header {
    padding: 18px 28px;
  }

  .user-shell__sidebar {
    width: 252px;
  }

  .user-shell__content {
    padding: 106px 28px 28px;
  }
}

@media (max-width: 719px) {
  .user-shell__header,
  .header-tools {
    flex-direction: column;
  }

  .session-chip,
  .logout-button {
    width: 100%;
  }
}
</style>
