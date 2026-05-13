<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { formatChinaDateTime } from '../app/display-time';
import {
  loadAuthSession,
  logoutAuthSession,
  resolveRoleHome,
  validateAuthSession,
} from '../auth';
import {
  buildScopedWatermarkText,
  VIDEO_ARCHIVE_WATERMARK_TILE_LAYOUTS,
  WATERMARK_REFRESH_INTERVAL_MS,
} from '../app/watermark';
import SensitiveAssetImage from '../app/SensitiveAssetImage.vue';
import { ElMessage } from '../app/el-message';
import {
  getProtectedAuditLogDetail,
} from '../app/audit-service';
import { openTouchInput } from '../app/touch-input';
import { useProtectedPage } from '../app/use-protected-page';
import {
  createAdminUser,
  getAdminUser,
  listAdminAuditLogsProtected,
  getAdminInquirySettings,
  listAdminProfilesProtected,
  listAdminUsersProtected,
  listAdminWatchlistProtected,
  updateAdminInquirySettings,
  updateAdminUser,
  updateAdminUserStatus,
  type AdminProfileProtectedQuery,
  type AdminUserItem,
  type InquirySettings,
} from '../app/admin-service';
import type {
  ProtectedDetailResponse,
  ProtectedFilterGroup,
  ProtectedFactRef,
  ProtectedFieldRef,
  ProtectedListItem,
} from '../app/protected-service';
import {
  fetchArchiveVideoBlob,
  getInquiryArchive,
  listInquiryArchives,
  type InquiryArchiveDetailPayload,
  type InquiryArchiveListItem,
  type InquiryArchiveVideoPayload,
} from '../app/archive-service';

type TabKey =
  | 'profiles'
  | 'watchlist'
  | 'users'
  | 'archives'
  | 'audit'
  | 'settings';
type FilterPickerKey =
  | 'profiles-document-type'
  | 'profiles-nationality'
  | 'profiles-gender'
  | 'users-role'
  | 'users-status'
  | 'user-form-role'
  | 'user-form-status'
  | 'archives-judgement'
  | 'audit-result'
  | null;

interface FilterOption {
  value: string;
  label: string;
}

const router = useRouter();
const session = ref(loadAuthSession());
const videoWatermarkTimestamp = ref(Date.now());
let videoWatermarkTimerId: number | null = null;

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'profiles', label: '基础画像' },
  { key: 'watchlist', label: '高风险名单' },
  { key: 'users', label: '管理用户' },
  { key: 'archives', label: '问询归档' },
  { key: 'audit', label: '审计日志' },
  { key: 'settings', label: '系统设置' },
];

const activeTab = ref<TabKey>('profiles');
const openFilterPicker = ref<FilterPickerKey>(null);
const statusMessages = ref<Record<TabKey, string>>({
  profiles: '正在加载基础画像...',
  watchlist: '正在加载高风险名单...',
  users: '正在加载用户...',
  archives: '正在加载问询归档...',
  audit: '正在加载审计日志...',
  settings: '正在加载系统设置...',
});

const profileQuery = ref('');
const watchlistQuery = ref('');
const userQuery = ref('');
const archiveQuery = ref('');
const archiveDocumentNum = ref('');
const archiveOperatorWorkId = ref('');
const auditQuery = ref('');
const auditActorWorkId = ref('');
const touchInputHint = '单击正常输入，双击打开触控键盘';
let profileReloadTimer: number | null = null;
let watchlistReloadTimer: number | null = null;
let userReloadTimer: number | null = null;
let archiveReloadTimer: number | null = null;
let auditReloadTimer: number | null = null;
let profileLoadRequestId = 0;
let watchlistLoadRequestId = 0;
let userLoadRequestId = 0;
let archiveLoadRequestId = 0;
let auditLoadRequestId = 0;
const loadedTabs = ref<Record<TabKey, boolean>>({
  profiles: false,
  watchlist: false,
  users: false,
  archives: false,
  audit: false,
  settings: false,
});

const protectedProfiles = ref<ProtectedListItem[]>([]);
const protectedWatchlist = ref<ProtectedListItem[]>([]);
const protectedUsers = ref<ProtectedListItem[]>([]);
const protectedAuditLogs = ref<ProtectedListItem[]>([]);
const archives = ref<InquiryArchiveListItem[]>([]);
const profileFilterGroups = ref<ProtectedFilterGroup[]>([]);
const userFilterGroups = ref<ProtectedFilterGroup[]>([]);
const archiveFilterGroups = ref<ProtectedFilterGroup[]>([]);
const auditFilterGroups = ref<ProtectedFilterGroup[]>([]);
const inquirySettings = ref<InquirySettings | null>(null);
const inquiryMaxRoundsInput = ref(3);
const isSavingInquirySettings = ref(false);
const isUserFormVisible = ref(false);
const isArchiveDetailVisible = ref(false);
const isAuditDetailVisible = ref(false);
const selectedArchive = ref<InquiryArchiveDetailPayload | null>(null);
const selectedAuditLog = ref<ProtectedDetailResponse | null>(null);
const archiveVideoUrls = ref<Record<number, string>>({});
const isLoadingArchiveDetail = ref(false);
const isLoadingAuditDetail = ref(false);
const auditDetailError = ref('');
const profileFilters = ref({
  documentType: '',
  nationality: '',
  gender: '',
});
const userFilters = ref({
  role: '',
  status: '',
});
const archiveFilters = ref({
  judgement: '',
});
const auditFilters = ref({
  result: '',
});

const userForm = ref<{
  id?: number;
  workId: string;
  name: string;
  role: 'admin' | 'user';
  status: string;
  password: string;
}>({
  workId: '',
  name: '',
  role: 'user',
  status: 'active',
  password: '',
});
const userFormRoleOptions: FilterOption[] = [
  { value: 'user', label: '员工' },
  { value: 'admin', label: '管理员' },
];
const userFormStatusOptions: FilterOption[] = [
  { value: 'active', label: '启用' },
  { value: 'disabled', label: '停用' },
];

const currentUserId = computed(() => session.value?.user.id ?? null);
const isAnyFormVisible = computed(
  () =>
    isUserFormVisible.value ||
    isArchiveDetailVisible.value ||
    isAuditDetailVisible.value,
);
const isEditingCurrentUser = computed(
  () => userForm.value.id != null && userForm.value.id === currentUserId.value,
);
const adminName = computed(() => session.value?.user.name || '系统管理员');
const adminWorkId = computed(() => session.value?.user.workId || 'admin');
const profileDocumentTypeOptions = computed<FilterOption[]>(() =>
  withAllOption(
    '全部证件类型',
    filterGroupOptions(profileFilterGroups.value, 'documentType'),
  ),
);
const profileNationalityOptions = computed<FilterOption[]>(() =>
  withAllOption(
    '全部国籍',
    filterGroupOptions(profileFilterGroups.value, 'nationality'),
  ),
);
const profileGenderOptions = computed<FilterOption[]>(() =>
  withAllOption(
    '全部性别',
    filterGroupOptions(profileFilterGroups.value, 'gender'),
  ),
);
const userRoleOptions = computed<FilterOption[]>(() =>
  withAllOption(
    '全部角色',
    filterGroupOptions(userFilterGroups.value, 'role'),
  ),
);
const userStatusOptions = computed<FilterOption[]>(() =>
  withAllOption(
    '全部状态',
    filterGroupOptions(userFilterGroups.value, 'status'),
  ),
);
const auditResultOptions = computed<FilterOption[]>(() =>
  withAllOption(
    '全部结果',
    filterGroupOptions(auditFilterGroups.value, 'result'),
  ),
);
const archiveJudgementOptions = computed<FilterOption[]>(() =>
  withAllOption(
    '全部判定',
    filterGroupOptions(archiveFilterGroups.value, 'judgement'),
  ),
);
const listPageSize = 10;
const profilePage = ref(1);
const watchlistPage = ref(1);
const userPage = ref(1);
const archivePage = ref(1);
const auditPage = ref(1);
const filteredAuditLogs = computed(() => protectedAuditLogs.value);
const filteredProtectedProfiles = computed(() => protectedProfiles.value);
const filteredProtectedWatchlist = computed(() => protectedWatchlist.value);
const filteredProtectedUsers = computed(() => protectedUsers.value);
const filteredArchives = computed(() => archives.value);
const pagedProtectedProfiles = computed(() =>
  sliceCurrentPage(filteredProtectedProfiles.value, profilePage.value),
);
const pagedProtectedWatchlist = computed(() =>
  sliceCurrentPage(filteredProtectedWatchlist.value, watchlistPage.value),
);
const pagedProtectedUsers = computed(() =>
  sliceCurrentPage(filteredProtectedUsers.value, userPage.value),
);
const pagedArchives = computed(() =>
  sliceCurrentPage(filteredArchives.value, archivePage.value),
);
const pagedAuditLogs = computed(() =>
  sliceCurrentPage(filteredAuditLogs.value, auditPage.value),
);
const profilePageCount = computed(() =>
  computePageCount(filteredProtectedProfiles.value.length),
);
const watchlistPageCount = computed(() =>
  computePageCount(filteredProtectedWatchlist.value.length),
);
const userPageCount = computed(() =>
  computePageCount(filteredProtectedUsers.value.length),
);
const archivePageCount = computed(() => computePageCount(filteredArchives.value.length));
const auditPageCount = computed(() => computePageCount(filteredAuditLogs.value.length));
const selectedProfileDocumentTypeLabel = computed(() =>
  describeFilterLabel(
    '证件类型',
    profileDocumentTypeOptions.value,
    profileFilters.value.documentType,
    formatDocumentTypeLabel(profileFilters.value.documentType),
  ),
);
const selectedProfileNationalityLabel = computed(() =>
  describeFilterLabel(
    '国籍',
    profileNationalityOptions.value,
    profileFilters.value.nationality,
    profileFilters.value.nationality || '全部',
  )
);
const selectedProfileGenderLabel = computed(() =>
  describeFilterLabel(
    '性别',
    profileGenderOptions.value,
    profileFilters.value.gender,
    formatGenderLabel(profileFilters.value.gender),
  ),
);
const selectedUserRoleLabel = computed(() =>
  describeFilterLabel(
    '角色',
    userRoleOptions.value,
    userFilters.value.role,
    formatUserRoleLabel(userFilters.value.role),
  ),
);
const selectedUserStatusLabel = computed(() =>
  describeFilterLabel(
    '状态',
    userStatusOptions.value,
    userFilters.value.status,
    formatUserStatusLabel(userFilters.value.status),
  ),
);
const selectedArchiveJudgementLabel = computed(() =>
  describeFilterLabel(
    '判定',
    archiveJudgementOptions.value,
    archiveFilters.value.judgement,
    formatArchiveJudgementLabel(archiveFilters.value.judgement),
  ),
);
const selectedAuditResultLabel = computed(() =>
  describeFilterLabel(
    '结果',
    auditResultOptions.value,
    auditFilters.value.result,
    formatAuditResultLabel(auditFilters.value.result),
  ),
);
const archiveVideoWatermarkText = computed(() =>
  session.value
    ? buildScopedWatermarkText(
        session.value,
        '归档回放',
        videoWatermarkTimestamp.value,
      )
    : '',
);

function startVideoWatermarkTimer() {
  if (videoWatermarkTimerId !== null || typeof window === 'undefined') {
    return;
  }

  videoWatermarkTimerId = window.setInterval(() => {
    videoWatermarkTimestamp.value = Date.now();
  }, WATERMARK_REFRESH_INTERVAL_MS);
}

function stopVideoWatermarkTimer() {
  if (videoWatermarkTimerId === null || typeof window === 'undefined') {
    return;
  }

  window.clearInterval(videoWatermarkTimerId);
  videoWatermarkTimerId = null;
}

onMounted(() => {
  void initializeManagementView();
  startVideoWatermarkTimer();
  if (typeof document !== 'undefined') {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleDocumentKeydown);
  }
});

useProtectedPage('/admin/home');

onBeforeUnmount(() => {
  revokeArchiveVideoUrls();
  stopVideoWatermarkTimer();
  clearScheduledReload(profileReloadTimer);
  clearScheduledReload(watchlistReloadTimer);
  clearScheduledReload(userReloadTimer);
  clearScheduledReload(archiveReloadTimer);
  clearScheduledReload(auditReloadTimer);
  if (typeof document !== 'undefined') {
    document.removeEventListener('click', handleDocumentClick);
    document.removeEventListener('keydown', handleDocumentKeydown);
    document.body.style.overflow = '';
  }
});

watch(isAnyFormVisible, (visible) => {
  if (typeof document === 'undefined') {
    return;
  }
  document.body.style.overflow = visible ? 'hidden' : '';
});

watch(profileQuery, () => {
  profilePage.value = 1;
  scheduleProfilesReload();
});

watch(watchlistQuery, () => {
  watchlistPage.value = 1;
  scheduleWatchlistReload();
});

watch(userQuery, () => {
  userPage.value = 1;
  scheduleUsersReload();
});

watch([archiveQuery, archiveDocumentNum, archiveOperatorWorkId], () => {
  archivePage.value = 1;
  scheduleArchivesReload();
});

watch([auditQuery, auditActorWorkId], () => {
  auditPage.value = 1;
  scheduleAuditLogsReload();
});

watch(
  () => [
    profileFilters.value.documentType,
    profileFilters.value.nationality,
    profileFilters.value.gender,
  ],
  () => {
    profilePage.value = 1;
    scheduleProfilesReload(true);
  },
);

watch(
  () => [userFilters.value.role, userFilters.value.status],
  () => {
    userPage.value = 1;
    scheduleUsersReload(true);
  },
);

watch(
  () => archiveFilters.value.judgement,
  () => {
    archivePage.value = 1;
  },
);

watch(
  () => auditFilters.value.result,
  () => {
    auditPage.value = 1;
  },
);

watch(profilePageCount, (count) => {
  profilePage.value = clampPage(profilePage.value, count);
});

watch(watchlistPageCount, (count) => {
  watchlistPage.value = clampPage(watchlistPage.value, count);
});

watch(userPageCount, (count) => {
  userPage.value = clampPage(userPage.value, count);
});

watch(archivePageCount, (count) => {
  archivePage.value = clampPage(archivePage.value, count);
});

watch(auditPageCount, (count) => {
  auditPage.value = clampPage(auditPage.value, count);
});

async function initializeManagementView() {
  await Promise.all([
    ensureTabLoaded('profiles'),
    ensureTabLoaded('settings'),
  ]);
}

async function ensureTabLoaded(tabKey: TabKey) {
  if (loadedTabs.value[tabKey]) {
    return;
  }

  const loaded = await refreshTab(tabKey);
  if (loaded) {
    loadedTabs.value[tabKey] = true;
  }
}

async function refreshTab(tabKey: TabKey) {
  let loaded = false;
  switch (tabKey) {
    case 'profiles':
      loaded = await loadProfiles();
      break;
    case 'watchlist':
      loaded = await loadWatchlist();
      break;
    case 'users':
      loaded = await loadUsers();
      break;
    case 'archives':
      loaded = await loadArchives();
      break;
    case 'audit':
      loaded = await loadAuditLogs();
      break;
    case 'settings':
      loaded = await loadInquirySettings();
      break;
  }
  return loaded;
}

function clearScheduledReload(timerId: number | null) {
  if (timerId != null && typeof window !== 'undefined') {
    window.clearTimeout(timerId);
  }
}

function scheduleProfilesReload(immediate = false) {
  clearScheduledReload(profileReloadTimer);
  if (immediate || typeof window === 'undefined') {
    profileReloadTimer = null;
    void loadProfiles();
    return;
  }
  profileReloadTimer = window.setTimeout(() => {
    profileReloadTimer = null;
    void loadProfiles();
  }, 240);
}

function scheduleWatchlistReload(immediate = false) {
  clearScheduledReload(watchlistReloadTimer);
  if (immediate || typeof window === 'undefined') {
    watchlistReloadTimer = null;
    void loadWatchlist();
    return;
  }
  watchlistReloadTimer = window.setTimeout(() => {
    watchlistReloadTimer = null;
    void loadWatchlist();
  }, 240);
}

function scheduleUsersReload(immediate = false) {
  clearScheduledReload(userReloadTimer);
  if (immediate || typeof window === 'undefined') {
    userReloadTimer = null;
    void loadUsers();
    return;
  }
  userReloadTimer = window.setTimeout(() => {
    userReloadTimer = null;
    void loadUsers();
  }, 240);
}

function scheduleArchivesReload(immediate = false) {
  clearScheduledReload(archiveReloadTimer);
  if (immediate || typeof window === 'undefined') {
    archiveReloadTimer = null;
    void loadArchives();
    return;
  }
  archiveReloadTimer = window.setTimeout(() => {
    archiveReloadTimer = null;
    void loadArchives();
  }, 240);
}

function scheduleAuditLogsReload(immediate = false) {
  clearScheduledReload(auditReloadTimer);
  if (immediate || typeof window === 'undefined') {
    auditReloadTimer = null;
    void loadAuditLogs();
    return;
  }
  auditReloadTimer = window.setTimeout(() => {
    auditReloadTimer = null;
    void loadAuditLogs();
  }, 240);
}

async function loadProfiles() {
  const requestId = ++profileLoadRequestId;
  try {
    const query: AdminProfileProtectedQuery = {
      query: profileQuery.value,
      documentType: profileFilters.value.documentType,
      nationality: profileFilters.value.nationality,
      gender: profileFilters.value.gender,
    };
    const protectedResult = await listAdminProfilesProtected(query);
    if (requestId !== profileLoadRequestId) {
      return false;
    }
    protectedProfiles.value = protectedResult.items;
    profileFilterGroups.value = protectedResult.filters ?? [];
    statusMessages.value.profiles = `已加载基础画像 ${protectedResult.total} 条。`;
    return true;
  } catch (error) {
    if (requestId !== profileLoadRequestId) {
      return false;
    }
    protectedProfiles.value = [];
    profileFilterGroups.value = [];
    statusMessages.value.profiles =
      error instanceof Error ? error.message : '查询基础画像失败。';
    return false;
  }
}

async function loadWatchlist() {
  const requestId = ++watchlistLoadRequestId;
  try {
    const protectedResult = await listAdminWatchlistProtected(
      watchlistQuery.value,
    );
    if (requestId !== watchlistLoadRequestId) {
      return false;
    }
    protectedWatchlist.value = protectedResult.items;
    statusMessages.value.watchlist = `已加载高风险名单 ${protectedResult.total} 条。`;
    return true;
  } catch (error) {
    if (requestId !== watchlistLoadRequestId) {
      return false;
    }
    protectedWatchlist.value = [];
    statusMessages.value.watchlist =
      error instanceof Error ? error.message : '查询高风险名单失败。';
    return false;
  }
}

async function loadUsers() {
  const requestId = ++userLoadRequestId;
  try {
    const protectedResult = await listAdminUsersProtected({
      query: userQuery.value,
      role: userFilters.value.role,
      status: userFilters.value.status,
    });
    if (requestId !== userLoadRequestId) {
      return false;
    }
    protectedUsers.value = protectedResult.items;
    userFilterGroups.value = protectedResult.filters ?? [];
    statusMessages.value.users = `已加载用户 ${protectedResult.total} 条。`;
    return true;
  } catch (error) {
    if (requestId !== userLoadRequestId) {
      return false;
    }
    protectedUsers.value = [];
    userFilterGroups.value = [];
    statusMessages.value.users =
      error instanceof Error ? error.message : '查询用户失败。';
    return false;
  }
}

async function loadArchives() {
  const requestId = ++archiveLoadRequestId;
  try {
    const result = await listInquiryArchives({
      query: archiveQuery.value,
      documentNum: archiveDocumentNum.value,
      operatorWorkId: archiveOperatorWorkId.value,
      judgement: archiveFilters.value.judgement,
      limit: 500,
    });
    if (requestId !== archiveLoadRequestId) {
      return false;
    }
    archives.value = result.items;
    archiveFilterGroups.value = result.filters;
    statusMessages.value.archives = `已加载问询归档 ${result.total} 条。`;
    return true;
  } catch (error) {
    if (requestId !== archiveLoadRequestId) {
      return false;
    }
    archives.value = [];
    archiveFilterGroups.value = [];
    statusMessages.value.archives =
      error instanceof Error ? error.message : '查询问询归档失败。';
    return false;
  }
}

async function loadAuditLogs() {
  const requestId = ++auditLoadRequestId;
  try {
    const result = await listAdminAuditLogsProtected({
      query: auditQuery.value,
      actorWorkId: auditActorWorkId.value,
      result: auditFilters.value.result,
      limit: 500,
    });
    if (requestId !== auditLoadRequestId) {
      return false;
    }
    protectedAuditLogs.value = result.items;
    auditFilterGroups.value = result.filters ?? [];
    statusMessages.value.audit = `已加载审计日志 ${result.total} 条。`;
    return true;
  } catch (error) {
    if (requestId !== auditLoadRequestId) {
      return false;
    }
    protectedAuditLogs.value = [];
    auditFilterGroups.value = [];
    statusMessages.value.audit =
      error instanceof Error ? error.message : '查询审计日志失败。';
    return false;
  }
}

async function loadInquirySettings() {
  try {
    const result = await getAdminInquirySettings();
    inquirySettings.value = result;
    inquiryMaxRoundsInput.value = result.maxRounds;
    statusMessages.value.settings = `当前总交互轮次上限为 ${result.maxRounds} 轮。`;
    return true;
  } catch (error) {
    inquirySettings.value = null;
    statusMessages.value.settings =
      error instanceof Error ? error.message : '读取系统设置失败。';
    return false;
  }
}

async function syncCurrentSession() {
  const nextSession = await validateAuthSession();
  session.value = nextSession;

  if (!nextSession) {
    await router.push('/login');
    return null;
  }

  if (nextSession.user.role !== 'admin') {
    await router.push(resolveRoleHome(nextSession.user.role));
  }

  return nextSession;
}

function resetUserForm() {
  userForm.value = {
    workId: '',
    name: '',
    role: 'user',
    status: 'active',
    password: '',
  };
}

async function editUserById(id: number) {
  const item = await getAdminUser(id);
  openFilterPicker.value = null;
  userForm.value = {
    id: item.id,
    workId: item.workId,
    name: item.name,
    role: item.role,
    status: item.status,
    password: '',
  };
  isUserFormVisible.value = true;
}

async function submitUser() {
  try {
    if (isEditingCurrentUser.value && userForm.value.status === 'disabled') {
      const message = '不能停用当前登录管理员。';
      statusMessages.value.users = message;
      ElMessage.warning(message);
      return;
    }

    if (userForm.value.id) {
      await updateAdminUser(userForm.value.id, userForm.value);
      if (isEditingCurrentUser.value) {
        const nextSession = await syncCurrentSession();
        if (!nextSession || nextSession.user.role !== 'admin') {
          statusMessages.value.users = '当前登录信息已同步更新。';
          resetUserForm();
          isUserFormVisible.value = false;
          return;
        }
      }
      statusMessages.value.users = '用户已更新。';
    } else {
      await createAdminUser(userForm.value);
      statusMessages.value.users = '用户已新增。';
    }
    resetUserForm();
    isUserFormVisible.value = false;
    await loadUsers();
  } catch (error) {
    statusMessages.value.users =
      error instanceof Error ? error.message : '用户保存失败。';
  }
}

async function toggleUserStatus(item: AdminUserItem) {
  try {
    const nextStatus = item.status === 'active' ? 'disabled' : 'active';

    if (item.id === currentUserId.value && nextStatus === 'disabled') {
      const message = '不能停用当前登录管理员。';
      statusMessages.value.users = message;
      ElMessage.warning(message);
      return;
    }

    await updateAdminUserStatus(item.id, nextStatus);
    statusMessages.value.users = `用户已${nextStatus === 'active' ? '启用' : '停用'}。`;
    ElMessage.success(statusMessages.value.users);
    await loadUsers();
  } catch (error) {
    statusMessages.value.users =
      error instanceof Error ? error.message : '更新用户状态失败。';
    ElMessage.error(statusMessages.value.users);
  }
}

async function saveInquirySettings() {
  const nextValue = Number(inquiryMaxRoundsInput.value);
  if (!Number.isInteger(nextValue) || nextValue < 1 || nextValue > 10) {
    statusMessages.value.settings = '总交互轮次上限需在 1-10 之间。';
    ElMessage.warning(statusMessages.value.settings);
    return;
  }

  isSavingInquirySettings.value = true;
  try {
    const result = await updateAdminInquirySettings(nextValue);
    inquirySettings.value = result;
    inquiryMaxRoundsInput.value = result.maxRounds;
    statusMessages.value.settings = '系统设置已保存。';
    ElMessage.success(statusMessages.value.settings);
  } catch (error) {
    statusMessages.value.settings =
      error instanceof Error ? error.message : '系统设置保存失败。';
    ElMessage.error(statusMessages.value.settings);
  } finally {
    isSavingInquirySettings.value = false;
  }
}

async function logout() {
  await logoutAuthSession();
  await router.push('/login');
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof HTMLElement) || target.closest('.filter-picker')) {
    return;
  }
  openFilterPicker.value = null;
}

function handleDocumentKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape') {
    return;
  }

  if (isUserFormVisible.value) {
    closeUserForm();
    return;
  }
  if (isArchiveDetailVisible.value) {
    closeArchiveDetail();
    return;
  }
  if (isAuditDetailVisible.value) {
    closeAuditDetail();
  }
}

function selectTab(tabKey: TabKey) {
  activeTab.value = tabKey;
  openFilterPicker.value = null;
  if (loadedTabs.value[tabKey]) {
    void refreshTab(tabKey);
    return;
  }
  void ensureTabLoaded(tabKey);
}

function toggleFilterPicker(key: Exclude<FilterPickerKey, null>) {
  openFilterPicker.value = openFilterPicker.value === key ? null : key;
}

function openCreateUserForm() {
  openFilterPicker.value = null;
  resetUserForm();
  isUserFormVisible.value = true;
}

function closeUserForm() {
  openFilterPicker.value = null;
  resetUserForm();
  isUserFormVisible.value = false;
}

function closeArchiveDetail() {
  openFilterPicker.value = null;
  isArchiveDetailVisible.value = false;
  selectedArchive.value = null;
  revokeArchiveVideoUrls();
}

function closeAuditDetail() {
  openFilterPicker.value = null;
  isAuditDetailVisible.value = false;
  selectedAuditLog.value = null;
  auditDetailError.value = '';
}

function clearProfileFilters() {
  profileQuery.value = '';
  profileFilters.value.documentType = '';
  profileFilters.value.nationality = '';
  profileFilters.value.gender = '';
  openFilterPicker.value = null;
  void loadProfiles();
}

function clearWatchlistFilters() {
  watchlistQuery.value = '';
  void loadWatchlist();
}

function clearUserFilters() {
  userQuery.value = '';
  userFilters.value.role = '';
  userFilters.value.status = '';
  openFilterPicker.value = null;
  void loadUsers();
}

function clearArchiveFilters() {
  archiveQuery.value = '';
  archiveDocumentNum.value = '';
  archiveOperatorWorkId.value = '';
  archiveFilters.value.judgement = '';
  openFilterPicker.value = null;
  void loadArchives();
}

function clearAuditFilters() {
  auditQuery.value = '';
  auditActorWorkId.value = '';
  auditFilters.value.result = '';
  openFilterPicker.value = null;
  void loadAuditLogs();
}

function applyProfileDocumentTypeFilter(value: string) {
  profileFilters.value.documentType = value;
  openFilterPicker.value = null;
}

function applyProfileNationalityFilter(value: string) {
  profileFilters.value.nationality = value;
  openFilterPicker.value = null;
}

function applyProfileGenderFilter(value: string) {
  profileFilters.value.gender = value;
  openFilterPicker.value = null;
}

function applyUserRoleFilter(value: string) {
  userFilters.value.role = value;
  openFilterPicker.value = null;
}

function applyUserStatusFilter(value: string) {
  userFilters.value.status = value;
  openFilterPicker.value = null;
}

function applyUserFormRole(value: 'admin' | 'user') {
  userForm.value.role = value;
  openFilterPicker.value = null;
}

function applyUserFormStatus(value: string) {
  if (value === 'disabled' && isEditingCurrentUser.value) {
    return;
  }
  userForm.value.status = value;
  openFilterPicker.value = null;
}

function applyArchiveJudgementFilter(value: string) {
  archiveFilters.value.judgement = value;
  openFilterPicker.value = null;
  void loadArchives();
}

function applyAuditResultFilter(value: string) {
  auditFilters.value.result = value;
  openFilterPicker.value = null;
  scheduleAuditLogsReload(true);
}

function computePageCount(totalItems: number) {
  return Math.max(1, Math.ceil(totalItems / listPageSize));
}

function clampPage(page: number, pageCount: number) {
  return Math.min(Math.max(page, 1), Math.max(pageCount, 1));
}

function sliceCurrentPage<T>(items: T[], page: number) {
  const start = (clampPage(page, computePageCount(items.length)) - 1) * listPageSize;
  return items.slice(start, start + listPageSize);
}

function buildPaginationSummary(totalItems: number, currentPage: number) {
  if (!totalItems) {
    return '当前没有数据';
  }

  const safePage = clampPage(currentPage, computePageCount(totalItems));
  const start = (safePage - 1) * listPageSize + 1;
  const end = Math.min(totalItems, start + listPageSize - 1);
  return `第 ${safePage} / ${computePageCount(totalItems)} 页，显示 ${start}-${end} 条，共 ${totalItems} 条`;
}

async function openArchiveDetail(item: InquiryArchiveListItem) {
  isArchiveDetailVisible.value = true;
  selectedArchive.value = null;
  isLoadingArchiveDetail.value = true;
  revokeArchiveVideoUrls();

  try {
    const detail = await getInquiryArchive(Number(item.id));
    selectedArchive.value = detail;
    await loadArchiveVideos(detail.videos);
  } catch (error) {
    statusMessages.value.archives =
      error instanceof Error ? error.message : '查询问询归档详情失败。';
    ElMessage.error(statusMessages.value.archives);
    isArchiveDetailVisible.value = false;
  } finally {
    isLoadingArchiveDetail.value = false;
  }
}

async function openAuditDetail(item: ProtectedListItem) {
  isAuditDetailVisible.value = true;
  selectedAuditLog.value = null;
  auditDetailError.value = '';
  isLoadingAuditDetail.value = true;

  try {
    selectedAuditLog.value = await getProtectedAuditLogDetail(item.id);
  } catch (error) {
    auditDetailError.value =
      error instanceof Error ? error.message : '查询审计日志详情失败。';
  } finally {
    isLoadingAuditDetail.value = false;
  }
}

async function loadArchiveVideos(videos: InquiryArchiveVideoPayload[]) {
  const entries = (
    await Promise.all(
      videos.map(async (video) => {
        try {
          const blob = await fetchArchiveVideoBlob(video.id);
          return [video.id, URL.createObjectURL(blob)] as const;
        } catch {
          return null;
        }
      }),
    )
  ).filter((entry): entry is readonly [number, string] => Boolean(entry));

  archiveVideoUrls.value = Object.fromEntries(entries);
}

function revokeArchiveVideoUrls() {
  Object.values(archiveVideoUrls.value).forEach((url) =>
    URL.revokeObjectURL(url),
  );
  archiveVideoUrls.value = {};
}

async function openFormFieldInput(options: {
  title: string;
  description?: string;
  placeholder: string;
  value: string;
  multiline?: boolean;
  inputMode?:
    | 'text'
    | 'search'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal';
  masked?: boolean;
  confirmText?: string;
  assign: (value: string) => void;
}) {
  const nextValue = await openTouchInput({
    title: options.title,
    description: options.description,
    placeholder: options.placeholder,
    value: options.value,
    multiline: options.multiline,
    inputMode: options.inputMode,
    masked: options.masked,
    confirmText: options.confirmText ?? '确认回填',
  });

  if (nextValue == null) {
    return;
  }

  options.assign(nextValue);
}

async function openToolbarSearchInput(options: {
  title: string;
  description?: string;
  placeholder: string;
  value: string;
  inputMode?:
    | 'text'
    | 'search'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal';
  assign: (value: string) => void;
  reload?: () => void;
}) {
  const nextValue = await openTouchInput({
    title: options.title,
    description: options.description,
    placeholder: options.placeholder,
    value: options.value,
    inputMode: options.inputMode ?? 'search',
    confirmText: '确认筛选',
  });

  if (nextValue == null) {
    return;
  }

  if (nextValue === options.value) {
    options.reload?.();
    return;
  }

  options.assign(nextValue);
}

function describeFilterLabel(
  prefix: string,
  options: FilterOption[],
  value: string,
  fallbackLabel?: string,
) {
  const label =
    options.find((item) => item.value === value)?.label ??
    (value ? fallbackLabel ?? value : '全部');
  return `${prefix}：${label}`;
}

function withAllOption(label: string, options: FilterOption[]) {
  return [{ value: '', label }, ...options];
}

function filterGroupOptions(groups: ProtectedFilterGroup[], key: string) {
  return groups.find((group) => group.key === key)?.options ?? [];
}

function formatDocumentTypeLabel(value: string) {
  const normalized = value.trim().toUpperCase();
  switch (normalized) {
    case 'PASSPORT':
      return '护照';
    case 'ID_CARD':
      return '身份证';
    case 'HKMTP':
      return '港澳通行证';
    default:
      return value || '未填写';
  }
}

function formatGenderLabel(value: string) {
  switch (value.trim().toLowerCase()) {
    case 'male':
    case 'm':
    case '1':
      return '男';
    case 'female':
    case 'f':
    case '2':
      return '女';
    case 'unknown':
    case '0':
      return '未知';
    default:
      return value || '未填写';
  }
}

function formatUserRoleLabel(value: string) {
  return value === 'admin'
    ? '管理员'
    : value === 'user'
      ? '员工'
      : value || '未填写';
}

function formatUserStatusLabel(value: string) {
  return value === 'active'
    ? '启用'
    : value === 'disabled'
      ? '停用'
      : value || '未填写';
}

function formatAuditResultLabel(value: string) {
  return value === 'success'
    ? '成功'
    : value === 'denied'
      ? '拒绝'
      : value === 'failure'
        ? '失败'
        : value || '未知';
}

function formatArchiveJudgementLabel(value: string) {
  if (value === 'concealment') {
    return '隐瞒';
  }
  if (value === 'falseStatement') {
    return '虚假陈述';
  }
  if (value === 'clear') {
    return '无异常';
  }
  return value || '待判定';
}

function archiveJudgementClass(value: string) {
  if (value === 'concealment') {
    return 'is-alert';
  }
  if (value === 'falseStatement') {
    return 'is-warning';
  }
  return 'is-active';
}

function formatDuration(seconds: number) {
  const safeSeconds = Math.max(0, Math.round(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function formatAuditTime(value: string) {
  return formatChinaDateTime(value);
}

function formatArchiveTime(value: string) {
  return formatAuditTime(value);
}

function findProtectedField(
  fields: ProtectedFieldRef[] | undefined,
  key: string,
) {
  return fields?.find((item) => item.key === key) ?? null;
}

function findProtectedChip(item: ProtectedListItem, key: string) {
  return findProtectedField(item.chips, key);
}

function protectedFactEntries(item: ProtectedListItem) {
  return (item.facts ?? []) as ProtectedFactRef[];
}

function protectedRiskTags(item: ProtectedListItem) {
  return (item.meta ?? []) as ProtectedFieldRef[];
}

function protectedNotes(item: ProtectedListItem) {
  return (item.notes ?? []) as ProtectedFieldRef[];
}

function protectedMeta(item: ProtectedListItem) {
  return (item.meta ?? []) as ProtectedFieldRef[];
}

function protectedChipToneClass(tone?: string) {
  switch (tone) {
    case 'alert':
      return 'admin-row__pill--alert';
    case 'warning':
      return 'admin-row__pill--warning';
    case 'success':
      return 'admin-row__pill--success';
    case 'identity':
      return 'admin-row__pill--identity';
    default:
      return '';
  }
}

function asArray(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function stringifyDetail(value: unknown) {
  if (value == null) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}
</script>

<template>
  <main class="admin-page">
    <aside class="admin-sidebar">
      <div>
        <p class="admin-sidebar__eyebrow">ADMIN CONSOLE</p>
        <h1>管理员工作台</h1>
        <p class="admin-sidebar__meta">{{ adminName }} · {{ adminWorkId }}</p>
      </div>

      <nav class="admin-nav">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="admin-nav__item"
          :class="{ 'is-active': activeTab === tab.key }"
          type="button"
          @click="selectTab(tab.key)"
        >
          {{ tab.label }}
        </button>
      </nav>

      <button class="admin-logout" type="button" @click="logout">
        退出登录
      </button>
    </aside>

    <section class="admin-content">
      <section v-if="activeTab === 'profiles'" class="admin-panel">
        <div class="admin-toolbar">
          <div class="admin-toolbar__search-block">
            <input
              v-model="profileQuery"
              :title="touchInputHint"
              class="admin-toolbar__search-input"
              type="text"
              inputmode="search"
              placeholder="输入要筛选的内容"
              @dblclick.stop.prevent="
                openToolbarSearchInput({
                  title: '筛选基础画像',
                  description: '输入后将立即按关键字重新加载基础画像。',
                  placeholder: '输入要筛选的内容',
                  value: profileQuery,
                  assign: (value) => (profileQuery = value),
                  reload: () => scheduleProfilesReload(true),
                })
              "
            />
          </div>
          <div class="admin-toolbar__actions">
            <div class="filter-picker">
              <button
                class="filter-chip"
                :class="{ 'is-active': profileFilters.documentType }"
                type="button"
                @click.stop="toggleFilterPicker('profiles-document-type')"
              >
                {{ selectedProfileDocumentTypeLabel }}
              </button>
              <div
                v-if="openFilterPicker === 'profiles-document-type'"
                class="filter-picker__menu"
                @click.stop
              >
                <button
                  v-for="option in profileDocumentTypeOptions"
                  :key="option.value || 'all-document-type'"
                  type="button"
                  @click="applyProfileDocumentTypeFilter(option.value)"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>
            <div class="filter-picker">
              <button
                class="filter-chip"
                :class="{ 'is-active': profileFilters.nationality }"
                type="button"
                @click.stop="toggleFilterPicker('profiles-nationality')"
              >
                {{ selectedProfileNationalityLabel }}
              </button>
              <div
                v-if="openFilterPicker === 'profiles-nationality'"
                class="filter-picker__menu"
                @click.stop
              >
                <button
                  v-for="option in profileNationalityOptions"
                  :key="option.value || 'all-nationality'"
                  type="button"
                  @click="applyProfileNationalityFilter(option.value)"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>
            <div class="filter-picker">
              <button
                class="filter-chip"
                :class="{ 'is-active': profileFilters.gender }"
                type="button"
                @click.stop="toggleFilterPicker('profiles-gender')"
              >
                {{ selectedProfileGenderLabel }}
              </button>
              <div
                v-if="openFilterPicker === 'profiles-gender'"
                class="filter-picker__menu"
                @click.stop
              >
                <button
                  v-for="option in profileGenderOptions"
                  :key="option.value || 'all-gender'"
                  type="button"
                  @click="applyProfileGenderFilter(option.value)"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>
            <button type="button" class="ghost" @click="clearProfileFilters">
              清空筛选
            </button>
          </div>
        </div>

        <p class="admin-filter-summary">
          {{ buildPaginationSummary(filteredProtectedProfiles.length, profilePage) }}
        </p>

        <div class="admin-table">
          <article
            v-for="item in pagedProtectedProfiles"
            :key="item.id"
            class="admin-row admin-row--profile"
          >
            <div class="admin-row__profile-content">
              <div class="admin-row__headline">
                <strong class="admin-inline-title">
                  <SensitiveAssetImage
                    v-if="findProtectedField(item.fields, 'fullName')"
                    :src="findProtectedField(item.fields, 'fullName')!.asset.url"
                    alt="姓名"
                    inline
                    eager
                  />
                </strong>
                <span
                  v-if="findProtectedChip(item, 'highRisk')"
                  class="admin-row__pill admin-row__pill--alert"
                >
                  <SensitiveAssetImage
                    :src="findProtectedChip(item, 'highRisk')!.asset.url"
                    alt="高风险预警"
                    inline
                  />
                </span>
                <span
                  v-if="findProtectedChip(item, 'documentType')"
                  class="admin-row__pill"
                >
                  <SensitiveAssetImage
                    :src="findProtectedChip(item, 'documentType')!.asset.url"
                    alt="证件类型"
                    inline
                  />
                </span>
                <span
                  v-if="findProtectedChip(item, 'gender')"
                  class="admin-row__pill"
                >
                  <SensitiveAssetImage
                    :src="findProtectedChip(item, 'gender')!.asset.url"
                    alt="性别"
                    inline
                  />
                </span>
                <span
                  v-if="findProtectedChip(item, 'documentNum')"
                  class="admin-row__identity"
                >
                  <SensitiveAssetImage
                    :src="findProtectedChip(item, 'documentNum')!.asset.url"
                    alt="证件号码"
                    inline
                  />
                </span>
                <span
                  v-if="findProtectedChip(item, 'imported')"
                  class="admin-row__pill admin-row__pill--warning"
                >
                  <SensitiveAssetImage
                    :src="findProtectedChip(item, 'imported')!.asset.url"
                    alt="导入状态"
                    inline
                  />
                </span>
              </div>
              <div class="admin-row__fact-list">
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
              <div
                v-if="protectedRiskTags(item).length || protectedNotes(item).length"
                class="admin-row__tags"
              >
                <span
                  v-for="tag in protectedRiskTags(item)"
                  :key="`${item.id}-${tag.key}-${tag.asset.id}`"
                  class="admin-row__tag"
                >
                  <SensitiveAssetImage
                    :src="tag.asset.url"
                    alt="风险标签"
                    inline
                  />
                </span>
                <span
                  v-for="note in protectedNotes(item)"
                  :key="`${item.id}-${note.key}-${note.asset.id}`"
                  class="admin-row__tag admin-row__tag--muted"
                >
                  <SensitiveAssetImage
                    :src="note.asset.url"
                    alt="补充说明"
                    inline
                  />
                </span>
              </div>
            </div>
          </article>
        </div>

        <div class="admin-pagination">
          <button
            type="button"
            class="ghost"
            :disabled="profilePage <= 1"
            @click="profilePage = Math.max(1, profilePage - 1)"
          >
            上一页
          </button>
          <span class="admin-pagination__meta">
            第 {{ profilePage }} / {{ profilePageCount }} 页
          </span>
          <button
            type="button"
            class="ghost"
            :disabled="profilePage >= profilePageCount"
            @click="profilePage = Math.min(profilePageCount, profilePage + 1)"
          >
            下一页
          </button>
        </div>
      </section>

      <section v-else-if="activeTab === 'watchlist'" class="admin-panel">
        <div class="admin-toolbar">
          <div class="admin-toolbar__search-block">
            <input
              v-model="watchlistQuery"
              :title="touchInputHint"
              class="admin-toolbar__search-input"
              type="text"
              inputmode="search"
              placeholder="输入要筛选的内容"
              @dblclick.stop.prevent="
                openToolbarSearchInput({
                  title: '筛选高风险名单',
                  description: '输入后将立即按关键字重新加载高风险名单。',
                  placeholder: '输入要筛选的内容',
                  value: watchlistQuery,
                  assign: (value) => (watchlistQuery = value),
                  reload: () => scheduleWatchlistReload(true),
                })
              "
            />
          </div>
          <div class="admin-toolbar__actions">
            <button type="button" class="ghost" @click="clearWatchlistFilters">
              清空检索
            </button>
          </div>
        </div>

        <p class="admin-filter-summary">
          {{ buildPaginationSummary(filteredProtectedWatchlist.length, watchlistPage) }}
        </p>

        <div class="admin-table">
          <article
            v-for="item in pagedProtectedWatchlist"
            :key="item.id"
            class="admin-row admin-row--watchlist"
          >
            <div class="admin-row__profile-content">
              <div class="admin-row__headline">
                <span
                  v-if="findProtectedField(item.fields, 'documentNum')"
                  class="admin-row__identity"
                >
                  <SensitiveAssetImage
                    :src="findProtectedField(item.fields, 'documentNum')!.asset.url"
                    alt="证件号码"
                    inline
                    eager
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

              <div v-if="protectedNotes(item).length" class="admin-row__tags">
                <span
                  v-for="note in protectedNotes(item)"
                  :key="`${item.id}-${note.key}`"
                  class="admin-row__tag"
                >
                  <SensitiveAssetImage
                    :src="note.asset.url"
                    :alt="note.key"
                    inline
                  />
                </span>
              </div>

              <div v-if="protectedMeta(item).length" class="admin-row__tags">
                <span
                  v-for="meta in protectedMeta(item)"
                  :key="`${item.id}-${meta.key}`"
                  class="admin-row__tag admin-row__tag--muted"
                >
                  <SensitiveAssetImage
                    :src="meta.asset.url"
                    :alt="meta.key"
                    inline
                  />
                </span>
              </div>
            </div>
          </article>
        </div>

        <div class="admin-pagination">
          <button
            type="button"
            class="ghost"
            :disabled="watchlistPage <= 1"
            @click="watchlistPage = Math.max(1, watchlistPage - 1)"
          >
            上一页
          </button>
          <span class="admin-pagination__meta">
            第 {{ watchlistPage }} / {{ watchlistPageCount }} 页
          </span>
          <button
            type="button"
            class="ghost"
            :disabled="watchlistPage >= watchlistPageCount"
            @click="watchlistPage = Math.min(watchlistPageCount, watchlistPage + 1)"
          >
            下一页
          </button>
        </div>
      </section>

      <section v-else-if="activeTab === 'archives'" class="admin-panel">
        <div class="admin-toolbar">
          <div class="admin-toolbar__search-block">
            <input
              v-model="archiveQuery"
              :title="touchInputHint"
              class="admin-toolbar__search-input"
              type="text"
              inputmode="search"
              placeholder="输入归档编号、姓名、证件号或会话 ID"
              @keyup.enter="loadArchives"
              @dblclick.stop.prevent="
                openToolbarSearchInput({
                  title: '筛选问询归档',
                  description: '输入后将立即按关键字重新加载问询归档。',
                  placeholder: '输入归档编号、姓名、证件号或会话 ID',
                  value: archiveQuery,
                  assign: (value) => (archiveQuery = value),
                  reload: () => scheduleArchivesReload(true),
                })
              "
            />
          </div>
          <div class="admin-toolbar__actions">
            <input
              v-model="archiveDocumentNum"
              :title="touchInputHint"
              class="admin-toolbar__search-input admin-toolbar__search-input--compact"
              type="text"
              inputmode="search"
              placeholder="按证件号"
              @keyup.enter="loadArchives"
              @dblclick.stop.prevent="
                openToolbarSearchInput({
                  title: '按证件号筛选归档',
                  description: '输入后将立即按证件号重新加载问询归档。',
                  placeholder: '按证件号',
                  value: archiveDocumentNum,
                  assign: (value) => (archiveDocumentNum = value),
                  reload: () => scheduleArchivesReload(true),
                })
              "
            />
            <input
              v-model="archiveOperatorWorkId"
              :title="touchInputHint"
              class="admin-toolbar__search-input admin-toolbar__search-input--compact"
              type="text"
              inputmode="search"
              placeholder="按工号"
              @keyup.enter="loadArchives"
              @dblclick.stop.prevent="
                openToolbarSearchInput({
                  title: '按工号筛选归档',
                  description: '输入后将立即按工号重新加载问询归档。',
                  placeholder: '按工号',
                  value: archiveOperatorWorkId,
                  assign: (value) => (archiveOperatorWorkId = value),
                  reload: () => scheduleArchivesReload(true),
                })
              "
            />
            <div class="filter-picker">
              <button
                class="filter-chip"
                :class="{ 'is-active': archiveFilters.judgement }"
                type="button"
                @click.stop="toggleFilterPicker('archives-judgement')"
              >
                {{ selectedArchiveJudgementLabel }}
              </button>
              <div
                v-if="openFilterPicker === 'archives-judgement'"
                class="filter-picker__menu"
                @click.stop
              >
                <button
                  v-for="option in archiveJudgementOptions"
                  :key="option.value || 'all-archive-judgement'"
                  type="button"
                  @click="applyArchiveJudgementFilter(option.value)"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>
            <button type="button" class="ghost" @click="clearArchiveFilters">
              清空筛选
            </button>
            <button
              type="button"
              class="ghost ghost--strong"
              @click="loadArchives"
            >
              刷新归档
            </button>
          </div>
        </div>

        <p class="admin-filter-summary">
          {{ buildPaginationSummary(filteredArchives.length, archivePage) }}。{{
            statusMessages.archives
          }}
        </p>

        <div class="admin-table">
          <article
            v-for="item in pagedArchives"
            :key="item.id"
            class="admin-row admin-row--archive"
          >
            <div class="admin-row__profile-content">
              <div class="admin-row__headline">
                <strong class="admin-inline-title">
                  <SensitiveAssetImage
                    v-if="findProtectedField(item.fields, 'archiveCode')"
                    :src="findProtectedField(item.fields, 'archiveCode')!.asset.url"
                    alt="归档编号"
                    inline
                    eager
                  />
                </strong>
                <span
                  class="admin-row__status"
                  :class="archiveJudgementClass(item.finalJudgement)"
                >
                  <span class="admin-row__status-dot"></span>
                  <SensitiveAssetImage
                    v-if="findProtectedChip(item, 'judgement')"
                    :src="findProtectedChip(item, 'judgement')!.asset.url"
                    alt="最终判定"
                    inline
                  />
                </span>
                <span class="admin-row__identity">
                  <SensitiveAssetImage
                    v-if="findProtectedChip(item, 'sessionId')"
                    :src="findProtectedChip(item, 'sessionId')!.asset.url"
                    alt="会话 ID"
                    inline
                  />
                </span>
              </div>
              <div class="admin-row__fact-list">
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
              <div v-if="protectedNotes(item).length" class="admin-row__tags">
                <span
                  v-for="note in protectedNotes(item)"
                  :key="`${item.id}-${note.key}-${note.asset.id}`"
                  class="admin-row__tag admin-row__tag--muted"
                >
                  <SensitiveAssetImage
                    :src="note.asset.url"
                    alt="归档说明"
                    inline
                  />
                </span>
              </div>
            </div>
            <div class="admin-row__actions">
              <button type="button" @click="openArchiveDetail(item)">
                查看详情
              </button>
            </div>
          </article>
        </div>

        <div class="admin-pagination">
          <button
            type="button"
            class="ghost"
            :disabled="archivePage <= 1"
            @click="archivePage = Math.max(1, archivePage - 1)"
          >
            上一页
          </button>
          <span class="admin-pagination__meta">
            第 {{ archivePage }} / {{ archivePageCount }} 页
          </span>
          <button
            type="button"
            class="ghost"
            :disabled="archivePage >= archivePageCount"
            @click="archivePage = Math.min(archivePageCount, archivePage + 1)"
          >
            下一页
          </button>
        </div>
      </section>

      <section v-else class="admin-panel">
        <template v-if="activeTab === 'audit'">
          <div class="admin-toolbar">
            <div class="admin-toolbar__search-block">
              <input
                v-model="auditQuery"
                :title="touchInputHint"
                class="admin-toolbar__search-input"
                type="text"
                inputmode="search"
                placeholder="输入操作人、动作、资源或路径"
                @dblclick.stop.prevent="
                  openToolbarSearchInput({
                    title: '筛选审计日志',
                    description: '输入后将立即按关键字重新加载审计日志。',
                    placeholder: '输入操作人、动作、资源或路径',
                    value: auditQuery,
                    assign: (value) => (auditQuery = value),
                    reload: () => scheduleAuditLogsReload(true),
                  })
                "
              />
            </div>
            <div class="admin-toolbar__actions">
              <input
                v-model="auditActorWorkId"
                :title="touchInputHint"
                class="admin-toolbar__search-input admin-toolbar__search-input--compact"
                type="text"
                inputmode="search"
                placeholder="按工号筛选"
                @dblclick.stop.prevent="
                  openToolbarSearchInput({
                    title: '按工号筛选审计日志',
                    description: '输入后将立即按工号重新加载审计日志。',
                    placeholder: '按工号筛选',
                    value: auditActorWorkId,
                    assign: (value) => (auditActorWorkId = value),
                    reload: () => scheduleAuditLogsReload(true),
                  })
                "
              />
              <div class="filter-picker">
                <button
                  class="filter-chip"
                  :class="{ 'is-active': auditFilters.result }"
                  type="button"
                  @click.stop="toggleFilterPicker('audit-result')"
                >
                  {{ selectedAuditResultLabel }}
                </button>
                <div
                  v-if="openFilterPicker === 'audit-result'"
                  class="filter-picker__menu"
                  @click.stop
                >
                  <button
                    v-for="option in auditResultOptions"
                    :key="option.value || 'all-audit-result'"
                    type="button"
                    @click="applyAuditResultFilter(option.value)"
                  >
                    {{ option.label }}
                  </button>
                </div>
              </div>
              <button type="button" class="ghost" @click="clearAuditFilters">
                清空筛选
              </button>
              <button
                type="button"
                class="ghost ghost--strong"
                @click="loadAuditLogs"
              >
                刷新日志
              </button>
            </div>
          </div>

          <p class="admin-filter-summary">
            {{ buildPaginationSummary(filteredAuditLogs.length, auditPage) }}
          </p>

          <div class="admin-table">
            <article
              v-for="item in pagedAuditLogs"
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
                <button type="button" @click="openAuditDetail(item)">
                  查看详情
                </button>
              </div>
            </article>
          </div>

          <div class="admin-pagination">
            <button
              type="button"
              class="ghost"
              :disabled="auditPage <= 1"
              @click="auditPage = Math.max(1, auditPage - 1)"
            >
              上一页
            </button>
            <span class="admin-pagination__meta">
              第 {{ auditPage }} / {{ auditPageCount }} 页
            </span>
            <button
              type="button"
              class="ghost"
              :disabled="auditPage >= auditPageCount"
              @click="auditPage = Math.min(auditPageCount, auditPage + 1)"
            >
              下一页
            </button>
          </div>
        </template>

        <template v-else-if="activeTab === 'settings'">
          <div class="settings-panel">
            <div class="settings-panel__body">
              <div>
                <p class="settings-panel__eyebrow">辅助问询</p>
                <h2>总交互轮次上限</h2>
                <p>{{ statusMessages.settings }}</p>
              </div>
              <label class="settings-field">
                <span>轮次上限</span>
                <input
                  v-model.number="inquiryMaxRoundsInput"
                  :title="touchInputHint"
                  type="number"
                  min="1"
                  max="10"
                  step="1"
                  inputmode="numeric"
                  @dblclick.stop.prevent="
                    openFormFieldInput({
                      title: '输入轮次上限',
                      placeholder: '输入 1 到 10 之间的整数',
                      value: String(inquiryMaxRoundsInput),
                      inputMode: 'numeric',
                      assign: (value) =>
                        (inquiryMaxRoundsInput = Number(value) || 0),
                    })
                  "
                />
              </label>
            </div>
            <div class="admin-form-actions">
              <button type="button" class="ghost" @click="loadInquirySettings">
                刷新
              </button>
              <button
                type="button"
                :disabled="isSavingInquirySettings"
                @click="saveInquirySettings"
              >
                {{ isSavingInquirySettings ? '保存中...' : '保存设置' }}
              </button>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="admin-toolbar">
            <div class="admin-toolbar__search-block">
              <input
                v-model="userQuery"
                :title="touchInputHint"
                class="admin-toolbar__search-input"
                type="text"
                inputmode="search"
                placeholder="输入要筛选的内容"
                @dblclick.stop.prevent="
                  openToolbarSearchInput({
                    title: '筛选用户',
                    description: '输入后将立即按关键字重新加载用户列表。',
                    placeholder: '输入要筛选的内容',
                    value: userQuery,
                    assign: (value) => (userQuery = value),
                    reload: () => scheduleUsersReload(true),
                  })
                "
              />
            </div>
            <div class="admin-toolbar__actions">
              <div class="filter-picker">
                <button
                  class="filter-chip"
                  :class="{ 'is-active': userFilters.role }"
                  type="button"
                  @click.stop="toggleFilterPicker('users-role')"
                >
                  {{ selectedUserRoleLabel }}
                </button>
                <div
                  v-if="openFilterPicker === 'users-role'"
                  class="filter-picker__menu"
                  @click.stop
                >
                  <button
                    v-for="option in userRoleOptions"
                    :key="option.value || 'all-user-role'"
                    type="button"
                    @click="applyUserRoleFilter(option.value)"
                  >
                    {{ option.label }}
                  </button>
                </div>
              </div>
              <div class="filter-picker">
                <button
                  class="filter-chip"
                  :class="{ 'is-active': userFilters.status }"
                  type="button"
                  @click.stop="toggleFilterPicker('users-status')"
                >
                  {{ selectedUserStatusLabel }}
                </button>
                <div
                  v-if="openFilterPicker === 'users-status'"
                  class="filter-picker__menu"
                  @click.stop
                >
                  <button
                    v-for="option in userStatusOptions"
                    :key="option.value || 'all-user-status'"
                    type="button"
                    @click="applyUserStatusFilter(option.value)"
                  >
                    {{ option.label }}
                  </button>
                </div>
              </div>
              <button type="button" class="ghost" @click="clearUserFilters">
                清空筛选
              </button>
              <button
                type="button"
                class="ghost ghost--strong"
                @click="openCreateUserForm"
              >
                {{ userForm.id ? '继续编辑' : '新增用户' }}
              </button>
            </div>
          </div>

          <p class="admin-filter-summary">
            {{ buildPaginationSummary(filteredProtectedUsers.length, userPage) }}
          </p>

          <div class="admin-table">
            <article
              v-for="item in pagedProtectedUsers"
              :key="item.id"
              class="admin-row admin-row--user"
            >
              <div class="admin-row__profile-content">
                <div class="admin-row__headline">
                  <strong class="admin-inline-title">
                    <SensitiveAssetImage
                      v-if="findProtectedField(item.fields, 'name')"
                      :src="findProtectedField(item.fields, 'name')!.asset.url"
                      alt="姓名"
                      inline
                      eager
                    />
                  </strong>
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

                <div v-if="protectedMeta(item).length" class="admin-row__tags">
                  <span
                    v-for="meta in protectedMeta(item)"
                    :key="`${item.id}-${meta.key}`"
                    class="admin-row__tag admin-row__tag--muted"
                  >
                    <SensitiveAssetImage
                      :src="meta.asset.url"
                      :alt="meta.key"
                      inline
                    />
                  </span>
                </div>
              </div>
              <div class="admin-row__actions">
                <button
                  type="button"
                  @click="editUserById(Number(item.id))"
                >
                  编辑
                </button>
                <button
                  type="button"
                  :class="{ danger: item.flags?.isActive }"
                  @click="toggleUserStatus({ id: Number(item.id), workId: '', name: '', role: 'user', status: item.flags?.isActive ? 'active' : 'disabled' })"
                >
                  {{
                    item.flags?.isActive
                      ? '停用'
                      : '启用'
                  }}
                </button>
              </div>
            </article>
          </div>

          <div class="admin-pagination">
            <button
              type="button"
              class="ghost"
              :disabled="userPage <= 1"
              @click="userPage = Math.max(1, userPage - 1)"
            >
              上一页
            </button>
            <span class="admin-pagination__meta">
              第 {{ userPage }} / {{ userPageCount }} 页
            </span>
            <button
              type="button"
              class="ghost"
              :disabled="userPage >= userPageCount"
              @click="userPage = Math.min(userPageCount, userPage + 1)"
            >
              下一页
            </button>
          </div>
        </template>
      </section>
    </section>
  </main>

  <Teleport to="body">
    <section
      v-if="isUserFormVisible"
      class="admin-dialog"
      @click.self="closeUserForm"
    >
      <div
        class="admin-form-card admin-form-card--dialog admin-form-card--user"
      >
        <div class="admin-dialog-shell admin-dialog-shell--user-form">
          <section class="admin-dialog-console admin-dialog-console--user-form">
            <div class="admin-user-console">
              <div class="admin-form-grid admin-form-grid--dialog">
                <label class="admin-field-card">
                  <span class="admin-field-card__label">工号</span>
                  <div class="admin-field-card__input-wrap">
                    <span class="admin-field-card__icon">ID</span>
                    <input
                      v-model="userForm.workId"
                      :title="touchInputHint"
                      type="text"
                      placeholder="输入工号"
                      @dblclick.stop.prevent="
                        openFormFieldInput({
                          title: '输入工号',
                          placeholder: '输入工号',
                          value: userForm.workId,
                          assign: (value) => (userForm.workId = value),
                        })
                      "
                    />
                  </div>
                </label>
                <label class="admin-field-card">
                  <span class="admin-field-card__label">姓名</span>
                  <div class="admin-field-card__input-wrap">
                    <span class="admin-field-card__icon">NM</span>
                    <input
                      v-model="userForm.name"
                      :title="touchInputHint"
                      type="text"
                      placeholder="输入姓名"
                      @dblclick.stop.prevent="
                        openFormFieldInput({
                          title: '输入姓名',
                          placeholder: '输入姓名',
                          value: userForm.name,
                          assign: (value) => (userForm.name = value),
                        })
                      "
                    />
                  </div>
                </label>
                <div class="admin-field-card">
                  <span class="admin-field-card__label">角色</span>
                  <div class="filter-picker admin-field-card__picker">
                    <button
                      type="button"
                      class="admin-field-card__input-wrap admin-field-card__picker-trigger"
                      :class="{ 'is-active': openFilterPicker === 'user-form-role' }"
                      @click.stop="toggleFilterPicker('user-form-role')"
                    >
                      <span class="admin-field-card__icon">RL</span>
                      <span class="admin-field-card__picker-value">
                        {{ formatUserRoleLabel(userForm.role) }}
                      </span>
                      <span class="admin-field-card__picker-caret" aria-hidden="true"></span>
                    </button>
                    <div
                      v-if="openFilterPicker === 'user-form-role'"
                      class="filter-picker__menu filter-picker__menu--dialog"
                      @click.stop
                    >
                      <button
                        v-for="option in userFormRoleOptions"
                        :key="option.value"
                        type="button"
                        :class="{ 'is-active': userForm.role === option.value }"
                        @click="applyUserFormRole(option.value as 'admin' | 'user')"
                      >
                        {{ option.label }}
                      </button>
                    </div>
                  </div>
                </div>
                <div class="admin-field-card">
                  <span class="admin-field-card__label">状态</span>
                  <div class="filter-picker admin-field-card__picker">
                    <button
                      type="button"
                      class="admin-field-card__input-wrap admin-field-card__picker-trigger"
                      :class="{ 'is-active': openFilterPicker === 'user-form-status' }"
                      @click.stop="toggleFilterPicker('user-form-status')"
                    >
                      <span class="admin-field-card__icon">ST</span>
                      <span class="admin-field-card__picker-value">
                        {{ formatUserStatusLabel(userForm.status) }}
                      </span>
                      <span class="admin-field-card__picker-caret" aria-hidden="true"></span>
                    </button>
                    <div
                      v-if="openFilterPicker === 'user-form-status'"
                      class="filter-picker__menu filter-picker__menu--dialog"
                      @click.stop
                    >
                      <button
                        v-for="option in userFormStatusOptions"
                        :key="option.value"
                        type="button"
                        :disabled="option.value === 'disabled' && isEditingCurrentUser"
                        :class="{ 'is-active': userForm.status === option.value }"
                        @click="applyUserFormStatus(option.value)"
                      >
                        {{ option.label }}
                      </button>
                    </div>
                  </div>
                </div>
                <label class="admin-field-card admin-field-card--wide">
                  <span class="admin-field-card__label">密码</span>
                  <div class="admin-field-card__input-wrap">
                    <span class="admin-field-card__icon">PW</span>
                    <input
                      v-model="userForm.password"
                      :title="touchInputHint"
                      type="password"
                      placeholder="密码（修改时可留空）"
                      @dblclick.stop.prevent="
                        openFormFieldInput({
                          title: '输入密码',
                          placeholder: '输入密码（修改时可留空）',
                          value: userForm.password,
                          masked: true,
                          assign: (value) => (userForm.password = value),
                        })
                      "
                    />
                  </div>
                </label>
              </div>
            </div>

            <div class="admin-form-actions admin-form-actions--dialog">
              <button type="button" class="admin-user-form__action" @click="submitUser">
                {{ userForm.id ? '更新用户' : '新增用户' }}
              </button>
              <button
                type="button"
                class="ghost admin-user-form__action admin-user-form__action--ghost"
                @click="closeUserForm"
              >
                取消
              </button>
            </div>
          </section>
        </div>
      </div>
    </section>
  </Teleport>

  <Teleport to="body">
    <section
      v-if="isArchiveDetailVisible"
      class="admin-dialog"
      @click.self="closeArchiveDetail"
    >
      <div
        class="admin-form-card admin-form-card--dialog admin-form-card--archive"
      >
        <div class="admin-dialog-shell admin-dialog-shell--archive-detail">
          <section class="admin-dialog-console admin-dialog-console--archive-detail admin-dialog-console--content-only">
            <div v-if="selectedArchive" class="archive-detail archive-detail--dialog">
              <section class="archive-detail__summary">
                <div class="archive-detail__summary-card">
                  <span class="meta-label">最终判定</span>
                  <strong>{{
                    formatArchiveJudgementLabel(selectedArchive.finalJudgement)
                  }}</strong>
                </div>
                <div class="archive-detail__summary-card">
                  <span class="meta-label">归档时间</span>
                  <strong>{{
                    formatArchiveTime(selectedArchive.archivedAt)
                  }}</strong>
                </div>
                <div class="archive-detail__summary-card">
                  <span class="meta-label">采样</span>
                  <strong>
                    {{ selectedArchive.roundCount }} 轮 ·
                    {{ formatDuration(selectedArchive.totalDurationSeconds) }}
                  </strong>
                </div>
                <div class="archive-detail__summary-card">
                  <span class="meta-label">归档人</span>
                  <strong>已受保护</strong>
                </div>
              </section>

              <section
                v-if="selectedArchive.overviewAsset"
                class="archive-detail__block archive-detail__block--media"
              >
                <span class="meta-label">归档概览</span>
                <SensitiveAssetImage
                  :src="selectedArchive.overviewAsset.url"
                  alt="归档概览"
                />
              </section>

              <section class="archive-detail__block archive-detail__block--media">
                <span class="meta-label">详细理由</span>
                <SensitiveAssetImage
                  v-if="selectedArchive.judgementAsset"
                  :src="selectedArchive.judgementAsset.url"
                  alt="判定理由"
                />
                <p v-else>已通过受保护资产交付</p>
              </section>

              <section class="archive-detail__grid">
                <div class="archive-detail__block archive-detail__block--media">
                  <span class="meta-label">系统摘要</span>
                  <SensitiveAssetImage
                    v-if="selectedArchive.briefingAsset"
                    :src="selectedArchive.briefingAsset.url"
                    alt="系统摘要"
                  />
                  <pre v-else>已通过受保护资产交付</pre>
                </div>
                <div class="archive-detail__block archive-detail__block--media">
                  <span class="meta-label">旅客快照</span>
                  <SensitiveAssetImage
                    v-if="selectedArchive.passengerAsset"
                    :src="selectedArchive.passengerAsset.url"
                    alt="旅客快照"
                  />
                  <pre v-else>已通过受保护资产交付</pre>
                </div>
              </section>

              <section class="archive-round-list">
                <article
                  v-for="round in selectedArchive.rounds"
                  :key="round.id"
                  class="archive-round"
                >
                  <header class="archive-round__header">
                    <div class="archive-round__title">
                      <span class="meta-label">第 {{ round.roundNo }} 轮</span>
                      <h4>问询轮次</h4>
                    </div>
                    <span class="admin-dialog-pill admin-dialog-pill--console">{{
                      formatDuration(round.durationSeconds)
                    }}</span>
                  </header>

                  <div class="archive-detail__block archive-detail__block--round">
                    <span class="meta-label">本轮摘要</span>
                    <SensitiveAssetImage
                      v-if="round.detailAsset"
                      :src="round.detailAsset.url"
                      alt="归档轮次详情"
                    />
                    <p v-else>已通过受保护资产交付</p>
                  </div>

                  <div v-if="round.videos.length" class="archive-video-list">
                    <article
                      v-for="video in round.videos"
                      :key="video.id"
                      class="archive-video"
                    >
                      <div class="archive-video__meta">
                        <strong>{{ video.fileName || '归档视频' }}</strong>
                        <span
                          >{{ video.contentType || video.modal }} ·
                          {{ video.sizeBytes }} bytes</span
                        >
                      </div>
                      <div
                        v-if="archiveVideoUrls[video.id]"
                        class="archive-video__player"
                      >
                        <video
                          :src="archiveVideoUrls[video.id]"
                          controls
                          preload="metadata"
                        ></video>
                        <div
                          v-if="archiveVideoWatermarkText"
                          class="archive-video__watermark"
                          aria-hidden="true"
                        >
                          <span
                            v-for="tile in VIDEO_ARCHIVE_WATERMARK_TILE_LAYOUTS"
                            :key="tile.id"
                            class="archive-video__watermark-tile"
                            :style="{
                              top: tile.top,
                              left: tile.left,
                              opacity: tile.opacity,
                              transform: `translate(-50%, -50%) rotate(${tile.rotation}deg)`,
                            }"
                          >
                            {{ archiveVideoWatermarkText }}
                          </span>
                        </div>
                      </div>
                      <p v-else>视频正在加载或暂不可用。</p>
                    </article>
                  </div>
                </article>
              </section>
            </div>

            <div v-else class="empty-panel empty-panel--compact">
              <strong>正在加载归档详情</strong>
              <span>请稍候。</span>
            </div>
          </section>
        </div>
      </div>
    </section>
  </Teleport>

  <Teleport to="body">
    <section
      v-if="isAuditDetailVisible"
      class="admin-dialog"
      @click.self="closeAuditDetail"
    >
      <div class="admin-form-card admin-form-card--dialog admin-form-card--audit admin-form-card--content-fit">
        <div class="admin-dialog-shell admin-dialog-shell--audit-detail">
          <section class="admin-dialog-console admin-dialog-console--audit-detail admin-dialog-console--content-only">
            <div v-if="selectedAuditLog" class="archive-detail archive-detail--dialog">
              <section class="archive-detail__block archive-detail__block--media">
                <span class="meta-label">日志快照</span>
                <SensitiveAssetImage
                  :src="selectedAuditLog.asset.url"
                  alt="审计日志详情敏感图片"
                />
              </section>
            </div>

            <div v-else class="empty-panel empty-panel--compact">
              <strong>{{
                isLoadingAuditDetail ? '正在加载审计日志详情' : '暂时无法显示日志详情'
              }}</strong>
              <span>{{ auditDetailError || '请稍候。' }}</span>
            </div>
          </section>
        </div>
      </div>
    </section>
  </Teleport>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap');

.admin-page {
  --admin-scale: clamp(0.88rem, 0.54rem + 0.72vmin, 1.16rem);
  --admin-page-pad: calc(var(--admin-scale) * 1.2);
  --admin-sidebar-width: clamp(
    calc(var(--admin-scale) * 15.8),
    18.5vw,
    calc(var(--admin-scale) * 19.4)
  );
  --admin-surface-radius: calc(var(--admin-scale) * 1.45);
  --admin-card-radius: calc(var(--admin-scale) * 1.08);
  --admin-gap-xs: calc(var(--admin-scale) * 0.42);
  --admin-gap-sm: calc(var(--admin-scale) * 0.62);
  --admin-gap-md: calc(var(--admin-scale) * 0.9);
  --admin-gap-lg: calc(var(--admin-scale) * 1.22);
  --admin-control-h: calc(var(--admin-scale) * 3.35);
  --admin-control-h-lg: calc(var(--admin-scale) * 3.9);
  --admin-nav-h: calc(var(--admin-scale) * 4.9);
  --admin-action-inline: calc(var(--admin-scale) * 7.4);
  --admin-pill-h: calc(var(--admin-scale) * 2);
  --admin-pill-px: calc(var(--admin-scale) * 0.78);
  --admin-inline-image-h: calc(var(--admin-scale) * 1.28);
  --admin-icon-dot: calc(var(--admin-scale) * 0.34);
  --admin-font-xs: calc(var(--admin-scale) * 0.78);
  --admin-font-sm: calc(var(--admin-scale) * 0.9);
  --admin-font-md: calc(var(--admin-scale) * 1.02);
  --admin-font-lg: calc(var(--admin-scale) * 1.78);
  min-height: 100dvh;
  height: 100dvh;
  display: grid;
  grid-template-columns: var(--admin-sidebar-width) minmax(0, 1fr);
  background:
    linear-gradient(135deg, rgba(145, 48, 30, 0.07), transparent 36%),
    linear-gradient(180deg, #fff8f4, #f4efe9);
  overflow: hidden;
}

.admin-sidebar {
  position: sticky;
  top: 0;
  height: 100dvh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: var(--admin-gap-lg);
  padding: var(--admin-page-pad) calc(var(--admin-scale) * 1.15);
  background: #261613;
  color: #fff7f0;
  box-sizing: border-box;
}

.admin-sidebar > div {
  display: grid;
  gap: var(--admin-gap-xs);
}

.admin-sidebar__eyebrow,
.admin-header__eyebrow {
  margin: 0 0 var(--admin-gap-sm);
  font-size: var(--admin-font-xs);
  letter-spacing: 0.18em;
  color: rgba(255, 240, 230, 0.72);
}

.admin-sidebar h1,
.admin-header h2 {
  margin: 0;
  font-size: var(--admin-font-lg);
  line-height: 1.12;
}

.admin-sidebar__meta {
  margin: var(--admin-gap-md) 0 0;
  color: rgba(255, 240, 230, 0.82);
  font-size: var(--admin-font-sm);
}

.admin-nav {
  display: grid;
  gap: var(--admin-gap-sm);
  align-content: start;
}

.admin-nav__item,
.admin-logout,
.admin-toolbar button,
.admin-form-actions button,
.admin-row__actions button,
.admin-user-table__actions button {
  min-height: var(--admin-control-h);
  border: 0;
  border-radius: var(--admin-card-radius);
  cursor: pointer;
}

.admin-nav__item {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: var(--admin-nav-h);
  padding: 0 calc(var(--admin-scale) * 1.05);
  background: rgba(255, 255, 255, 0.08);
  color: inherit;
  font-size: var(--admin-font-md);
  font-weight: 700;
  line-height: 1.25;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.admin-nav__item.is-active {
  background: linear-gradient(135deg, #c75b3d, #eb8d63);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.08),
    0 calc(var(--admin-scale) * 0.55) calc(var(--admin-scale) * 1.15)
      rgba(235, 141, 99, 0.28);
}

.admin-logout {
  background: rgba(255, 255, 255, 0.12);
  color: inherit;
  min-height: var(--admin-control-h-lg);
  font-size: var(--admin-font-md);
  font-weight: 700;
  margin-top: auto;
  padding: 0 calc(var(--admin-scale) * 1.05);
}

.admin-content {
  min-height: 0;
  height: 100dvh;
  padding: var(--admin-page-pad);
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr);
  overflow-x: hidden;
  overflow-y: auto;
}

.admin-panel {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  height: 100%;
  max-height: calc(100dvh - (var(--admin-page-pad) * 2));
  border-radius: var(--admin-surface-radius);
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(204, 179, 164, 0.5);
  box-shadow: 0 18px 36px rgba(52, 28, 20, 0.08);
  container-type: inline-size;
  container-name: admin-panel;
}

.admin-panel {
  padding: calc(var(--admin-scale) * 1.12);
  overflow: hidden;
}

.admin-toolbar,
.admin-form-grid,
.admin-form-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--admin-gap-md);
}

.admin-toolbar,
.admin-form-grid {
  margin-bottom: var(--admin-gap-lg);
}

.admin-toolbar {
  align-items: stretch;
  justify-content: space-between;
  padding: calc(var(--admin-scale) * 0.98);
  border-radius: var(--admin-surface-radius);
  background: linear-gradient(
    180deg,
    rgba(255, 250, 246, 0.94),
    rgba(247, 238, 231, 0.82)
  );
  border: 1px solid rgba(218, 197, 184, 0.66);
}

.admin-toolbar__search-block {
  display: flex;
  flex: 1 1 clamp(15rem, 28vw, 22rem);
  align-items: stretch;
  min-width: min(100%, 14rem);
}

.admin-toolbar__actions {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, calc(var(--admin-scale) * 8.9)), 1fr)
  );
  flex: 999 1 clamp(22rem, 56vw, 44rem);
  gap: var(--admin-gap-md);
  align-items: stretch;
  align-content: stretch;
  justify-content: end;
  min-width: min(100%, 20rem);
}

.admin-toolbar__actions > * {
  min-width: 0;
}

.admin-toolbar__search-input {
  flex: 1 1 auto;
  min-width: 0;
  min-height: var(--admin-control-h-lg);
}

.admin-toolbar__search-input--compact {
  min-height: var(--admin-control-h-lg);
}

.admin-form-grid {
  align-items: stretch;
}

.admin-form-grid > * {
  flex: 1 1 clamp(15rem, 26vw, 21rem);
}

.admin-form-actions {
  justify-content: flex-end;
}

.admin-form-grid textarea {
  min-height: clamp(6.5rem, 10vh, 8.5rem);
  flex-basis: 100%;
}

.admin-filter-summary {
  margin: 0 0 var(--admin-gap-lg);
  color: #7a5c50;
  font-size: var(--admin-font-sm);
}

.admin-pagination {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: var(--admin-gap-sm);
  margin-top: var(--admin-gap-lg);
  padding-top: var(--admin-gap-sm);
  border-top: 1px solid rgba(204, 179, 164, 0.35);
}

.admin-pagination button {
  min-height: var(--admin-control-h-lg);
  min-width: calc(var(--admin-scale) * 7.8);
  padding: 0 calc(var(--admin-scale) * 1.15);
  border: 0;
  border-radius: var(--admin-card-radius);
  background: linear-gradient(135deg, #b55339, #e27f55);
  color: #fff;
  font-size: var(--admin-font-md);
  font-weight: 700;
  box-shadow: 0 calc(var(--admin-scale) * 0.4) calc(var(--admin-scale) * 0.95)
    rgba(181, 83, 57, 0.24);
  cursor: pointer;
}

.admin-pagination button:disabled {
  background: #f3e7de;
  color: #b49485;
  box-shadow: none;
  cursor: not-allowed;
}

.admin-pagination__meta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: var(--admin-control-h-lg);
  padding: 0 calc(var(--admin-scale) * 1.15);
  border-radius: var(--admin-card-radius);
  background: rgba(243, 231, 222, 0.88);
  border: 1px solid rgba(204, 179, 164, 0.42);
  color: #7a5c50;
  font-size: var(--admin-font-md);
  font-weight: 700;
}

.admin-audit-list {
  display: grid;
  gap: var(--admin-gap-md);
}

.admin-audit-item {
  padding: clamp(1rem, 0.88rem + 0.7vw, 1.25rem);
  border-radius: var(--admin-surface-radius);
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(212, 188, 173, 0.56);
}

.admin-audit-item__head,
.admin-audit-item__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--admin-gap-md);
}

.admin-audit-item__head {
  align-items: flex-start;
}

.admin-audit-item__head p,
.admin-audit-item__meta {
  margin: 0;
  color: #7a5c50;
}

.admin-audit-item__meta {
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: var(--admin-gap-sm);
}

.settings-panel {
  display: grid;
  gap: var(--admin-gap-lg);
}

.settings-panel__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(clamp(11rem, 18vw, 13.5rem), clamp(12rem, 21vw, 15rem));
  gap: clamp(1rem, 0.9rem + 0.8vw, 1.35rem);
  align-items: end;
}

.settings-panel__eyebrow {
  margin: 0 0 var(--admin-gap-xs);
  color: #8f6a5d;
  font-size: var(--admin-font-xs);
  font-weight: 700;
  letter-spacing: 0.12em;
}

.settings-panel h2,
.settings-panel p {
  margin: 0;
}

.settings-panel p {
  margin-top: var(--admin-gap-xs);
  color: #7a5c50;
  font-size: var(--admin-font-sm);
}

.settings-field {
  display: grid;
  gap: var(--admin-gap-xs);
  color: #6f493c;
  font-weight: 700;
}

.admin-toolbar input,
.admin-form-grid input,
.admin-form-grid select,
.admin-form-grid textarea,
.settings-field input {
  width: 100%;
  min-height: var(--admin-control-h);
  padding: calc(var(--admin-scale) * 0.78);
  border: 1px solid #d7c1b4;
  border-radius: var(--admin-card-radius);
  font: inherit;
  background: #fffdfa;
}

.admin-toolbar .admin-toolbar__search-input {
  min-height: var(--admin-control-h-lg);
}

.admin-toolbar__actions > button,
.admin-toolbar__actions > .filter-picker {
  width: 100%;
  height: 100%;
  min-height: var(--admin-control-h-lg);
}

.admin-toolbar button,
.admin-form-actions button,
.admin-row__actions button,
.admin-user-table__actions button {
  background: linear-gradient(135deg, #b55339, #e27f55);
  color: #fff;
}

.admin-toolbar button.ghost,
.admin-form-actions button.ghost,
.admin-row__actions button.ghost,
.admin-user-table__actions button.ghost {
  background: #f3e7de;
  color: #7c5140;
}

.admin-toolbar button.ghost--strong {
  background: #ecd3c7;
  color: #6f3e31;
}

.admin-row__actions button.danger,
.admin-user-table__actions button.danger {
  background: #f4d7d0;
  color: #8a3325;
}

.admin-form-card {
  margin-bottom: var(--admin-gap-lg);
  padding: calc(var(--admin-scale) * 1.08);
  border-radius: var(--admin-surface-radius);
  background: #fff9f6;
  border: 1px solid rgba(215, 193, 180, 0.5);
}

.admin-dialog {
  --dialog-panel: #ffffff;
  --dialog-panel-muted: #f7eee8;
  --dialog-panel-strong: #f1e3d9;
  --dialog-primary: #b55339;
  --dialog-primary-strong: #6b392c;
  --dialog-primary-soft: #f8e1d4;
  --dialog-text: #2f211c;
  --dialog-text-muted: #7a5c50;
  --dialog-border: rgba(215, 193, 180, 0.88);
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  background: rgba(34, 22, 18, 0.42);
  backdrop-filter: blur(12px);
  font-family: 'IBM Plex Sans', sans-serif;
}

.admin-form-card--dialog {
  width: min(1320px, 100%);
  min-height: min(860px, 92vh);
  max-height: min(860px, 92vh);
  margin-bottom: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--dialog-border);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow:
    0 24px 64px rgba(181, 83, 57, 0.12),
    0 2px 8px rgba(34, 22, 18, 0.05);
  display: flex;
  flex-direction: column;
}

.admin-form-card--user {
  width: min(980px, 100%);
  min-height: 0;
  max-height: min(720px, 88vh);
}

.admin-form-card--content-fit {
  min-height: 0;
  max-height: min(760px, 88vh);
}

.admin-dialog-shell {
  display: grid;
  grid-template-columns: minmax(300px, 0.92fr) minmax(420px, 1.5fr);
  width: 100%;
  height: 100%;
  min-height: 0;
  background: rgba(255, 255, 255, 0.92);
}

.admin-dialog-shell--stacked {
  grid-template-columns: 1fr;
  grid-template-rows: auto minmax(0, 1fr);
}

.admin-dialog-shell--user-form {
  grid-template-columns: 1fr;
  height: auto;
}

.admin-dialog-shell--archive-detail {
  grid-template-columns: 1fr;
}

.admin-dialog-shell--audit-detail {
  grid-template-columns: 1fr;
}

.admin-dialog-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.9fr);
  gap: 24px;
  padding: 32px 32px 22px;
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.78), rgba(248, 225, 212, 0.92)),
    var(--dialog-panel-muted);
  border-bottom: 1px solid var(--dialog-border);
}

.admin-dialog-hero::after {
  content: '';
  position: absolute;
  inset: auto auto -90px -70px;
  width: 240px;
  height: 240px;
  border-radius: 999px;
  background: rgba(235, 141, 99, 0.18);
  filter: blur(60px);
  pointer-events: none;
}

.admin-dialog-hero__main,
.admin-dialog-hero__aside {
  position: relative;
  z-index: 1;
}

.admin-dialog-hero__main {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.admin-dialog-hero__aside {
  display: grid;
  align-content: start;
  gap: 14px;
}

.admin-dialog-brand,
.admin-dialog-pill-group,
.admin-dialog-preview,
.admin-dialog-copy,
.admin-dialog-close,
.admin-dialog-console {
  position: relative;
}

.admin-dialog-brand {
  display: flex;
  align-items: center;
  gap: 18px;
}

.admin-dialog-brand__mark {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, var(--dialog-primary), #eb8d63);
  color: #fff;
  font-family: 'Manrope', sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  box-shadow: 0 14px 30px rgba(181, 83, 57, 0.24);
}

.admin-dialog-brand__name,
.admin-dialog-copy h3 {
  margin: 0;
  font-family: 'Manrope', sans-serif;
}

.admin-dialog-brand__name {
  font-size: 1.55rem;
  font-weight: 800;
  color: var(--dialog-primary-strong);
  line-height: 1;
}

.admin-dialog-brand__subtitle,
.admin-dialog-copy__eyebrow,
.admin-dialog-console__title {
  margin: 6px 0 0;
  color: var(--dialog-text-muted);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.admin-dialog-copy {
  display: grid;
  gap: 16px;
  max-width: 30rem;
}

.admin-dialog-copy h3 {
  font-size: clamp(2rem, 2vw + 1.2rem, 2.8rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: var(--dialog-text);
}

.admin-dialog-copy p {
  margin: 0;
  color: var(--dialog-text-muted);
  font-size: 1rem;
  line-height: 1.8;
}

.admin-dialog-pill-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.admin-dialog-pill {
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid var(--dialog-border);
  color: var(--dialog-text-muted);
  font-size: 0.83rem;
  font-weight: 600;
}

.admin-dialog-pill--console {
  background: rgba(248, 225, 212, 0.52);
}

.admin-dialog-preview {
  display: grid;
  gap: 6px;
  padding: 18px 20px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid var(--dialog-border);
}

.admin-dialog-preview__label {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--dialog-text-muted);
}

.admin-dialog-preview strong {
  color: var(--dialog-text);
  line-height: 1.7;
  word-break: break-word;
}

.admin-dialog-preview span {
  color: var(--dialog-text-muted);
}

.admin-dialog-close {
  min-height: 52px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.78);
  color: var(--dialog-text-muted);
  font-weight: 700;
}

.admin-dialog-console {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  align-content: start;
  gap: 18px;
  padding: 32px;
  min-height: 0;
  background: rgba(255, 255, 255, 0.9);
}

.admin-dialog-console--stacked {
  padding-top: 24px;
}

.admin-dialog-console--user-form {
  grid-template-rows: minmax(0, 1fr) auto;
  padding: 28px 32px 32px;
  height: auto;
}

.admin-dialog-console--archive-detail {
  grid-template-rows: minmax(0, 1fr) auto;
  padding: 28px 32px 32px;
}

.admin-dialog-console--audit-detail {
  grid-template-rows: minmax(0, 1fr) auto;
  padding: 28px 32px 32px;
}

.admin-dialog-console--content-only {
  grid-template-rows: minmax(0, 1fr);
  padding-bottom: 28px;
}

.admin-dialog-console__header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.admin-dialog-console__header--inline {
  justify-content: flex-start;
}

.admin-dialog-console__line {
  height: 1px;
  flex: 1;
  background: var(--dialog-border);
}

.admin-form-card--dialog .admin-form-card__header > button,
.admin-form-card--dialog .admin-form-actions button {
  min-height: calc(var(--admin-scale) * 4.3);
  min-width: clamp(calc(var(--admin-scale) * 8.6), 22vw, calc(var(--admin-scale) * 10.8));
  padding: 0 calc(var(--admin-scale) * 1.28);
  font-size: var(--admin-font-md);
  font-weight: 800;
  border-radius: calc(var(--admin-card-radius) * 1.08);
}

.admin-form-card--dialog .admin-form-actions {
  gap: calc(var(--admin-gap-md) * 1.1);
}

.admin-form-card.admin-form-card--user
  .admin-form-actions.admin-form-actions--dialog {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px !important;
  padding-top: 18px;
}

.admin-form-card.admin-form-card--user .admin-user-form__action {
  height: 88px;
  min-height: 88px;
  padding-top: 0;
  padding-bottom: 0;
  font-size: calc(var(--admin-font-md) * 1.08);
  border: 0;
  border-radius: 24px !important;
  appearance: none;
  overflow: hidden;
}

.admin-form-card.admin-form-card--user .admin-user-form__action--ghost {
  border-radius: 24px !important;
}

.admin-form-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--admin-gap-md);
  margin-bottom: 0;
  padding: clamp(1.4rem, 1rem + 1vw, 2rem) clamp(1.4rem, 1rem + 1vw, 2rem)
    clamp(1rem, 0.8rem + 0.6vw, 1.35rem);
  border-bottom: 1px solid rgba(215, 193, 180, 0.5);
  background:
    linear-gradient(180deg, rgba(255, 252, 249, 0.96), rgba(247, 238, 231, 0.9));
}

.admin-form-card__header h3,
.admin-form-card__header p {
  margin: 0;
}

.admin-form-card__header p {
  margin-top: var(--admin-gap-xs);
  color: #7a5c50;
  font-size: var(--admin-font-sm);
}

.admin-form-card--dialog .admin-form-grid,
.admin-form-card--dialog .archive-detail,
.admin-form-card--dialog .empty-panel {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  padding: 0;
}

.admin-form-card--dialog .admin-form-grid {
  margin-bottom: 0;
  align-content: start;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.admin-form-card--dialog .admin-form-actions {
  flex: 0 0 auto;
  padding: 14px 0 0;
  border-top: 1px solid rgba(215, 193, 180, 0.6);
  background: transparent;
}

.admin-form-actions--dialog {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  justify-content: stretch;
}

.admin-form-grid--dialog {
  min-height: 0;
}

.admin-user-console {
  display: grid;
  grid-template-rows: auto;
  min-height: 0;
  overflow: visible;
  padding-right: 0;
}

.admin-user-console .admin-form-grid {
  overflow: visible;
  flex: 0 0 auto;
}

.admin-field-card {
  display: grid;
  gap: 10px;
}

.admin-field-card__label {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--dialog-text);
}

.admin-field-card__input-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 72px;
  padding: 0 18px;
  border-radius: 20px;
  background: var(--dialog-panel-muted);
  border: 1px solid var(--dialog-border);
  box-shadow:
    0 0 0 4px rgba(181, 83, 57, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.72);
}

.admin-field-card__input-wrap--select {
  position: relative;
  min-height: 88px;
  padding: 0 22px;
}

.admin-field-card__icon {
  flex: 0 0 auto;
  min-width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: rgba(181, 83, 57, 0.12);
  color: var(--dialog-primary-strong);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.admin-field-card--wide {
  grid-column: 1 / -1;
}

.admin-field-card__picker {
  display: flex;
  width: 100%;
}

.admin-field-card__picker-trigger {
  width: 100%;
  border: 0;
  text-align: left;
  cursor: pointer;
}

.admin-field-card__picker-trigger.is-active {
  box-shadow:
    0 0 0 4px rgba(181, 83, 57, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.72);
}

.admin-field-card__picker-value {
  flex: 1 1 auto;
  min-width: 0;
  color: var(--dialog-text);
  font-size: 1.08rem;
  font-weight: 700;
  line-height: 1.4;
}

.admin-field-card__picker-caret {
  flex: 0 0 auto;
  width: 12px;
  height: 12px;
  margin-right: 4px;
  border-right: 2px solid rgba(107, 57, 44, 0.88);
  border-bottom: 2px solid rgba(107, 57, 44, 0.88);
  transform: rotate(45deg) translateY(-2px);
}

.admin-form-grid .admin-field-card input,
.admin-form-grid .admin-field-card select,
.admin-form-grid .admin-field-card textarea {
  width: 100%;
  min-height: auto;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--dialog-text);
  font: inherit;
  font-size: 1rem;
  line-height: 1.7;
  outline: none;
  resize: none;
  box-shadow: none;
}

.admin-form-grid .admin-field-card input::placeholder,
.admin-form-grid .admin-field-card textarea::placeholder {
  color: rgba(122, 92, 80, 0.72);
}

.filter-picker {
  position: relative;
  display: flex;
}

.filter-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: var(--admin-control-h-lg);
  padding: 0 calc(var(--admin-scale) * 0.86);
  border-radius: var(--admin-card-radius);
  background: #f6ebe4;
  color: #6f493c;
  font-size: var(--admin-font-sm);
}

.filter-chip.is-active {
  background: #ecd3c7;
  color: #6c372b;
}

.filter-picker__menu {
  position: absolute;
  top: calc(100% + var(--admin-gap-xs));
  left: 0;
  z-index: 20;
  display: grid;
  gap: var(--admin-gap-xs);
  min-width: clamp(10rem, 18vw, 12rem);
  padding: var(--admin-gap-sm);
  border-radius: var(--admin-card-radius);
  background: #fffdfb;
  border: 1px solid rgba(204, 179, 164, 0.6);
  box-shadow: 0 16px 30px rgba(52, 28, 20, 0.12);
}

.filter-picker__menu button {
  min-height: calc(var(--admin-scale) * 2.75);
  padding: 0 var(--admin-pill-px);
  text-align: left;
  border-radius: calc(var(--admin-scale) * 0.78);
  background: #f7eee8;
  color: #6f493c;
  font-size: var(--admin-font-sm);
}

.filter-picker__menu--dialog {
  top: calc(100% + 10px);
  width: 100%;
  min-width: 0;
  padding: 12px;
  gap: 10px;
  z-index: 120;
}

.filter-picker__menu--dialog button {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 68px;
  padding: 0 18px;
  border: 1px solid rgba(214, 193, 180, 0.76);
  border-radius: 18px;
  background: #f7eee8;
  color: #6f493c;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.4;
}

.filter-picker__menu--dialog button.is-active {
  background: #ecd3c7;
  color: #6c372b;
  border-color: rgba(181, 83, 57, 0.28);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.28);
}

.filter-picker__menu--dialog button:disabled {
  background: #f4ede8;
  color: #b29689;
  border-color: rgba(214, 193, 180, 0.56);
  cursor: not-allowed;
}

.admin-table {
  display: grid;
  flex: 1 1 auto;
  gap: var(--admin-gap-md);
  min-height: 0;
  align-content: start;
  overflow: auto;
  padding-right: var(--admin-gap-xs);
}

.admin-row {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: var(--admin-gap-lg);
  padding: calc(var(--admin-scale) * 0.98);
  border-radius: var(--admin-card-radius);
  background: #fff9f6;
  border: 1px solid rgba(215, 193, 180, 0.5);
}

.admin-row p {
  margin: var(--admin-gap-xs) 0 0;
  color: #6a5148;
}

.admin-row > :first-child {
  min-width: 0;
  flex: 1 1 auto;
}

.admin-row__actions {
  display: flex;
  flex-direction: column;
  gap: var(--admin-gap-sm);
  margin-left: auto;
  justify-content: flex-start;
  align-items: stretch;
  flex: 0 0 clamp(
    calc(var(--admin-scale) * 8.9),
    14vw,
    calc(var(--admin-scale) * 11.2)
  );
  width: clamp(
    calc(var(--admin-scale) * 8.9),
    14vw,
    calc(var(--admin-scale) * 11.2)
  );
  min-width: 0;
}

.admin-row__actions button {
  width: 100%;
  flex: 1 1 0;
  min-height: var(--admin-control-h-lg);
  font-size: var(--admin-font-sm);
  font-weight: 700;
}

.admin-row--profile {
  align-items: stretch;
}

.admin-row--user {
  align-items: stretch;
  flex-wrap: wrap;
  padding-top: calc(var(--admin-scale) * 1.16);
  padding-bottom: calc(var(--admin-scale) * 1.16);
}

.admin-row--user .admin-row__profile-content {
  display: flex;
  flex: 1 1 clamp(18rem, 34vw, 28rem);
  align-items: center;
  flex-wrap: wrap;
  gap: var(--admin-gap-sm) var(--admin-gap-md);
  min-height: calc(var(--admin-scale) * 4.9);
}

.admin-row--user .admin-row__headline {
  flex: 0 1 auto;
  min-width: 0;
  max-width: 100%;
}

.admin-row--user .admin-row__fact-list {
  flex: 1 1 auto;
  justify-content: flex-start;
  min-width: 0;
}

.admin-row--user .admin-row__fact {
  min-height: var(--admin-pill-h);
  padding: 0 var(--admin-pill-px);
}

.admin-row--user .admin-row__actions {
  flex: 0 0 clamp(
    calc(var(--admin-scale) * 8.9),
    14vw,
    calc(var(--admin-scale) * 11.2)
  );
  width: clamp(
    calc(var(--admin-scale) * 8.9),
    14vw,
    calc(var(--admin-scale) * 11.2)
  );
  max-width: none;
  min-width: 0;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  flex-wrap: nowrap;
  gap: var(--admin-gap-sm);
}

.admin-row--user .admin-row__actions button {
  width: 100%;
  flex: 1 1 0;
  min-width: 0;
  min-height: var(--admin-control-h-lg);
  padding: 0 calc(var(--admin-scale) * 1.15);
  font-size: var(--admin-font-sm);
  font-weight: 700;
  border-radius: var(--admin-card-radius);
}

.admin-row--profile :deep(.sensitive-image) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 0;
  max-height: clamp(6rem, 10vh, 8rem);
}

.admin-row--profile :deep(.sensitive-image img) {
  width: 100%;
  max-width: 100%;
  max-height: clamp(6rem, 10vh, 8rem);
  object-fit: fill;
  object-position: center center;
}

.admin-row--profile :deep(.sensitive-image__placeholder) {
  min-height: clamp(5.75rem, 9vh, 7.5rem);
}

.admin-row__profile-content {
  min-width: 0;
  flex: 1 1 auto;
  display: grid;
  gap: var(--admin-gap-sm);
}

.admin-row__headline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--admin-gap-xs) var(--admin-gap-sm);
}

.admin-inline-title {
  display: inline-flex;
  align-items: center;
  min-height: clamp(2rem, 1.8rem + 0.45vh, 2.3rem);
  min-width: 0;
  max-width: 100%;
}

.admin-inline-title :deep(.sensitive-image img) {
  height: var(--admin-inline-image-h);
}

.admin-row__identity :deep(.sensitive-image),
.admin-row__pill :deep(.sensitive-image),
.admin-row__tag :deep(.sensitive-image),
.admin-row__fact-value :deep(.sensitive-image),
.admin-row__status :deep(.sensitive-image) {
  max-width: 100%;
}

.admin-row__identity :deep(.sensitive-image img),
.admin-row__pill :deep(.sensitive-image img),
.admin-row__tag :deep(.sensitive-image img),
.admin-row__fact-value :deep(.sensitive-image img),
.admin-row__status :deep(.sensitive-image img) {
  max-width: 100%;
  height: calc(var(--admin-scale) * 0.98);
}

.admin-row__identity,
.admin-row__pill,
.admin-row__tag,
.admin-row__fact {
  min-width: 0;
  max-width: 100%;
}

.admin-row__identity {
  display: inline-flex;
  align-items: center;
  min-height: var(--admin-pill-h);
  padding: 0 var(--admin-pill-px);
  border-radius: 999px;
  background: rgba(243, 231, 222, 0.92);
  color: #7a5142;
  font-size: var(--admin-font-sm);
  font-weight: 700;
}

.admin-row__pill {
  display: inline-flex;
  align-items: center;
  min-height: var(--admin-pill-h);
  padding: 0 var(--admin-pill-px);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(214, 193, 180, 0.78);
  color: #7a5c50;
  font-size: var(--admin-font-xs);
  font-weight: 700;
}

.admin-row__pill--alert {
  background: rgba(199, 92, 71, 0.12);
  border-color: rgba(199, 92, 71, 0.16);
  color: #a24734;
}

.admin-row__pill--warning {
  background: rgba(234, 204, 141, 0.28);
  border-color: rgba(224, 206, 137, 0.52);
  color: #996106;
}

.admin-row__pill--success {
  background: rgba(35, 125, 77, 0.14);
  border-color: rgba(35, 125, 77, 0.22);
  color: #237d4d;
}

.admin-row__pill--identity {
  background: rgba(243, 231, 222, 0.92);
  border-color: rgba(208, 177, 158, 0.58);
  color: #7a5142;
}

.admin-row__fact-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--admin-gap-xs) var(--admin-gap-sm);
}

.admin-row__fact {
  display: inline-flex;
  align-items: center;
  gap: var(--admin-gap-xs);
  min-height: calc(var(--admin-scale) * 2.18);
  padding: 0 var(--admin-pill-px);
  border-radius: calc(var(--admin-scale) * 0.78);
  background: #fffdfb;
  border: 1px solid rgba(214, 193, 180, 0.66);
}

.admin-row__fact-label {
  color: #8c6b5d;
  font-size: var(--admin-font-xs);
  font-weight: 700;
  letter-spacing: 0.04em;
}

.admin-row__fact-value {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  color: #1f282c;
  font-size: var(--admin-font-sm);
  font-weight: 700;
}

.admin-row__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--admin-gap-xs);
}

.admin-row__tag {
  display: inline-flex;
  align-items: center;
  min-height: calc(var(--admin-scale) * 1.92);
  padding: 0 var(--admin-pill-px);
  border-radius: 999px;
  background: rgba(181, 83, 57, 0.12);
  color: #934932;
  font-size: var(--admin-font-xs);
  font-weight: 700;
}

.admin-row__tag--muted {
  background: rgba(121, 145, 156, 0.14);
  color: #55656d;
}

.admin-row__status {
  display: inline-flex;
  align-items: center;
  gap: var(--admin-gap-xs);
  min-height: var(--admin-pill-h);
  padding: 0 calc(var(--admin-scale) * 0.82);
  border-radius: 999px;
  font-size: var(--admin-font-xs);
  font-weight: 700;
}

.admin-row__status-dot {
  width: var(--admin-icon-dot);
  height: var(--admin-icon-dot);
  border-radius: 999px;
  background: currentColor;
  flex: 0 0 auto;
}

.admin-row__status.is-active {
  background: rgba(73, 166, 85, 0.14);
  color: #2d8b3a;
}

.admin-row__status.is-disabled {
  background: rgba(143, 103, 87, 0.14);
  color: #8a5b4f;
}

.admin-row__status.is-alert {
  background: rgba(181, 57, 57, 0.14);
  color: #a3312e;
}

.admin-row__status.is-warning {
  background: rgba(196, 126, 47, 0.16);
  color: #95611d;
}

.archive-detail,
.archive-round-list {
  display: grid;
  gap: var(--admin-gap-md);
}

.archive-detail--dialog {
  min-height: 0;
  align-content: start;
  overflow: auto;
  padding-right: 6px;
  grid-auto-rows: max-content;
}

.archive-detail__summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.archive-detail__summary-card,
.archive-detail__block,
.archive-round,
.archive-video {
  padding: 22px;
  border-radius: 20px;
  border: 1px solid var(--dialog-border);
  background: linear-gradient(180deg, rgba(255, 252, 249, 0.96), rgba(247, 238, 231, 0.9));
  box-shadow:
    0 0 0 4px rgba(181, 83, 57, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.72);
}

.archive-detail__summary-card {
  display: grid;
  align-content: start;
  gap: 8px;
  min-height: 136px;
}

.archive-detail__summary strong,
.archive-detail__block p,
.archive-round h4 {
  margin: 0;
}

.archive-detail__summary strong,
.archive-round h4 {
  font-family: 'Manrope', sans-serif;
  font-size: 1.18rem;
  color: var(--dialog-text);
  line-height: 1.35;
}

.meta-label {
  display: block;
  margin-bottom: 2px;
  color: var(--dialog-text-muted);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.archive-detail__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.archive-detail pre {
  max-height: clamp(12rem, 24vh, 16rem);
  margin: 0;
  padding: 18px 20px;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
  color: #44352f;
  font-size: var(--admin-font-sm);
  line-height: 1.6;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(215, 193, 180, 0.66);
}

.archive-round__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.archive-round__title {
  display: grid;
  gap: 6px;
}

.archive-video-list {
  display: grid;
  gap: 18px;
  margin-top: 18px;
}

.archive-video {
  display: grid;
  gap: 16px;
}

.archive-video__meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  color: #6b5349;
  font-size: var(--admin-font-sm);
}

.archive-video__meta strong {
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  color: var(--dialog-text);
}

.archive-video__player {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  background: #1f1a17;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.archive-video video {
  display: block;
  width: 100%;
  max-height: clamp(16rem, 40vh, 26rem);
  background: #1f1a17;
}

.archive-video__watermark {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
  user-select: none;
}

.archive-video__watermark-tile {
  position: absolute;
  max-width: min(62%, clamp(16rem, 34vw, 26rem));
  color: rgba(255, 255, 255, 0.58);
  font-size: calc(var(--admin-scale) * 0.8);
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1.45;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.36);
  white-space: normal;
}

.archive-detail__block--media :deep(.sensitive-image),
.archive-detail__block--round :deep(.sensitive-image) {
  display: block;
  overflow: hidden;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(215, 193, 180, 0.66);
}

.archive-detail__block--media :deep(.sensitive-image img),
.archive-detail__block--round :deep(.sensitive-image img) {
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
  border: 1px solid var(--dialog-border);
  background: linear-gradient(180deg, rgba(255, 252, 249, 0.96), rgba(247, 238, 231, 0.9));
  box-shadow:
    0 0 0 4px rgba(181, 83, 57, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.72);
}

.empty-panel--compact strong {
  font-family: 'Manrope', sans-serif;
  font-size: 1.22rem;
  color: var(--dialog-text);
}

.empty-panel--compact span {
  color: var(--dialog-text-muted);
}

.admin-user-table-wrap {
  overflow-x: auto;
  border-radius: var(--admin-card-radius);
  border: 1px solid rgba(215, 193, 180, 0.5);
  background: #fff9f6;
}

.admin-user-table {
  width: 100%;
  border-collapse: collapse;
  min-width: clamp(40rem, 72vw, 48rem);
}

.admin-user-table th,
.admin-user-table td {
  padding: clamp(0.8rem, 0.72rem + 0.45vw, 1rem)
    clamp(0.85rem, 0.76rem + 0.5vw, 1rem);
  text-align: left;
  border-bottom: 1px solid rgba(215, 193, 180, 0.5);
  vertical-align: middle;
}

.admin-user-table th {
  color: #8a6b5e;
  font-size: var(--admin-font-xs);
  font-weight: 800;
  letter-spacing: 0.06em;
  background: rgba(244, 236, 229, 0.9);
  white-space: nowrap;
}

.admin-user-table tbody tr:last-child td {
  border-bottom: 0;
}

.admin-user-table td {
  color: #3d312c;
}

.admin-user-table__name {
  color: #1f282c;
  font-weight: 700;
}

.admin-user-table .is-actions {
  width: clamp(10.5rem, 16vw, 14rem);
  text-align: right;
}

.admin-user-table__actions {
  display: inline-flex;
  justify-content: flex-end;
  gap: var(--admin-gap-sm);
  width: 100%;
}

.admin-user-table__actions button {
  min-width: clamp(5.6rem, 8vw, 7rem);
  min-height: clamp(2.6rem, 2.3rem + 0.8vh, 3rem);
  padding: 0 clamp(0.75rem, 0.66rem + 0.45vw, 1rem);
  font-size: var(--admin-font-sm);
}

@container admin-panel (max-width: 86rem) {
  .admin-toolbar__actions {
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(100%, calc(var(--admin-scale) * 8.2)), 1fr)
    );
  }

  .admin-row--user .admin-row__profile-content {
    align-items: flex-start;
  }

  .admin-row--user .admin-row__fact-list {
    flex-basis: 100%;
  }
}

@container admin-panel (max-width: 72rem) {
  .admin-toolbar {
    padding: calc(var(--admin-scale) * 0.95);
  }

  .admin-toolbar__search-block {
    min-width: 100%;
  }

  .admin-toolbar__actions {
    width: 100%;
    min-width: 100%;
  }

  .admin-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .admin-row__actions {
    margin-left: 0;
    width: 100%;
    flex: 1 1 auto;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .admin-row__actions button {
    flex: 1 1 calc(var(--admin-scale) * 8.4);
  }

  .admin-row--user .admin-row__profile-content,
  .admin-row--user .admin-row__actions {
    width: 100%;
  }

  .admin-row--user .admin-row__actions {
    justify-content: flex-start;
  }

  .archive-detail__summary,
  .archive-detail__grid,
  .settings-panel__body {
    grid-template-columns: 1fr;
  }
}

@container admin-panel (max-width: 52rem) {
  .admin-toolbar__actions {
    grid-template-columns: 1fr;
  }

  .admin-row__fact-list {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(100%, calc(var(--admin-scale) * 10.8)), 1fr)
    );
  }

  .admin-row__fact {
    width: 100%;
  }
}

@media (max-width: 1100px) {
  .admin-page {
    height: auto;
    grid-template-columns: 1fr;
    overflow: visible;
  }

  .admin-sidebar {
    position: static;
    height: auto;
    min-height: 0;
  }

  .admin-content {
    height: auto;
    min-height: auto;
    overflow: visible;
  }

  .admin-panel {
    min-height: 0;
    height: auto;
    max-height: none;
  }

  .admin-nav {
    grid-template-columns: repeat(
      auto-fit,
      minmax(min(100%, calc(var(--admin-scale) * 9.4)), 1fr)
    );
  }

  .admin-form-grid > * {
    flex-basis: 100%;
  }

  .admin-toolbar__search-block {
    min-width: 100%;
  }

  .admin-toolbar__actions {
    width: 100%;
    min-width: 100%;
    justify-content: stretch;
  }

  .admin-toolbar__search-input {
    flex: 1 1 14rem;
  }

  .admin-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .admin-row--user .admin-row__profile-content {
    display: grid;
    align-items: stretch;
    gap: var(--admin-gap-sm);
    width: 100%;
  }

  .admin-row--user .admin-row__actions {
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    min-width: 0;
    gap: var(--admin-gap-sm);
  }

  .admin-row--user .admin-row__actions button {
    width: auto;
    min-width: var(--admin-action-inline);
    flex: 1 1 var(--admin-action-inline);
  }

  .admin-row__actions {
    margin-left: 0;
    width: 100%;
  }

  .admin-user-table {
    min-width: clamp(34rem, 88vw, 42rem);
  }

  .admin-user-table .is-actions {
    width: clamp(9.5rem, 24vw, 11.5rem);
  }

  .settings-panel__body {
    grid-template-columns: 1fr;
  }

  .archive-detail__summary,
  .archive-detail__grid {
    grid-template-columns: 1fr;
  }

  .admin-dialog {
    align-items: flex-end;
    padding: 16px;
  }

  .admin-form-card--dialog {
    width: 100%;
    min-height: calc(100dvh - 32px);
    max-height: calc(100dvh - 32px);
  }

  .admin-form-card--user {
    min-height: 0;
    max-height: calc(100dvh - 32px);
  }

  .admin-dialog-shell {
    grid-template-columns: 1fr;
  }

  .admin-dialog-hero,
  .admin-dialog-console {
    padding: 22px;
  }

  .admin-dialog-hero {
    grid-template-columns: 1fr;
  }

  .admin-form-card--dialog .admin-form-grid {
    grid-template-columns: 1fr;
  }

  .admin-form-card--dialog .admin-form-actions {
    padding-top: 16px;
  }

  .admin-form-card--dialog .admin-form-actions button,
  .admin-dialog-close {
    width: 100%;
  }

  .admin-form-actions--dialog {
    grid-template-columns: 1fr;
  }
}
</style>
