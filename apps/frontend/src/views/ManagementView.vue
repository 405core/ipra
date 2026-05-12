<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import {
  clearAuthSession,
  loadAuthSession,
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
import { recordAuditEvent } from '../app/audit-service';
import { openTouchInput } from '../app/touch-input';
import { useProtectedPage } from '../app/use-protected-page';
import {
  createAdminProfile,
  createAdminUser,
  createAdminWatchlist,
  deleteAdminProfile,
  deleteAdminWatchlist,
  listAdminAuditLogsProtected,
  getAdminInquirySettings,
  listAdminProfiles,
  listAdminProfilesProtected,
  listAdminUsers,
  listAdminUsersProtected,
  listAdminWatchlist,
  listAdminWatchlistProtected,
  updateAdminInquirySettings,
  updateAdminProfile,
  updateAdminUser,
  updateAdminUserStatus,
  updateAdminWatchlist,
  type AdminUserItem,
  type AdminWatchlistItem,
  type InquirySettings,
} from '../app/admin-service';
import type { ProtectedListItem } from '../app/protected-service';
import {
  fetchArchiveVideoBlob,
  getInquiryArchive,
  listInquiryArchives,
  type InquiryArchiveDetailPayload,
  type InquiryArchiveListItem,
  type InquiryArchiveVideoPayload,
} from '../app/archive-service';
import type { PassengerProfileRecord } from '../app/profile-service';

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
  | 'archives-judgement'
  | 'audit-result'
  | null;

interface FilterOption {
  value: string;
  label: string;
}

interface ProfileDetailEntry {
  label: string;
  value: string;
}

interface ProfileFormState {
  documentNum: string;
  fullName: string;
  documentType: string;
  nationality: string;
  gender: string;
  birthDate: string;
  phone: string;
  pnr: string;
  flightNo: string;
  destination: string;
  purpose: string;
  occupation: string;
  company: string;
  riskTags: string;
  criminalRecord: string;
  remark: string;
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

const profiles = ref<PassengerProfileRecord[]>([]);
const protectedProfiles = ref<ProtectedListItem[]>([]);
const watchlist = ref<AdminWatchlistItem[]>([]);
const protectedWatchlist = ref<ProtectedListItem[]>([]);
const users = ref<AdminUserItem[]>([]);
const protectedUsers = ref<ProtectedListItem[]>([]);
const protectedAuditLogs = ref<ProtectedListItem[]>([]);
const archives = ref<InquiryArchiveListItem[]>([]);
const inquirySettings = ref<InquirySettings | null>(null);
const inquiryMaxRoundsInput = ref(3);
const isSavingInquirySettings = ref(false);
const isProfileFormVisible = ref(false);
const isWatchlistFormVisible = ref(false);
const isUserFormVisible = ref(false);
const isArchiveDetailVisible = ref(false);
const selectedArchive = ref<InquiryArchiveDetailPayload | null>(null);
const archiveVideoUrls = ref<Record<number, string>>({});
const isLoadingArchiveDetail = ref(false);
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

const profileForm = ref<ProfileFormState>(createEmptyProfileForm());
const watchlistForm = ref<Partial<AdminWatchlistItem>>({
  documentNum: '',
  riskReason: '',
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

const editingProfileId = ref<number | null>(null);
const editingWatchlistId = ref<number | null>(null);

const currentUserId = computed(() => session.value?.user.id ?? null);
const isAnyFormVisible = computed(
  () =>
    isProfileFormVisible.value ||
    isWatchlistFormVisible.value ||
    isUserFormVisible.value ||
    isArchiveDetailVisible.value,
);
const isEditingCurrentUser = computed(
  () => userForm.value.id != null && userForm.value.id === currentUserId.value,
);
const adminName = computed(() => session.value?.user.name || '系统管理员');
const adminWorkId = computed(() => session.value?.user.workId || 'admin');
const profileDocumentTypeOptions = computed(() =>
  buildDistinctOptions(
    profiles.value.map((item) =>
      readProfileField(item, 'basicInfo', 'documentType'),
    ),
    formatDocumentTypeLabel,
  ),
);
const profileGenderOptions = computed(() =>
  buildDistinctOptions(
    profiles.value.map((item) => readProfileField(item, 'basicInfo', 'gender')),
    formatGenderLabel,
  ),
);
const profileNationalityOptions = computed(() =>
  buildDistinctOptions(
    profiles.value.map((item) =>
      readProfileField(item, 'basicInfo', 'nationality'),
    ),
  ),
);
const userRoleOptions: FilterOption[] = [
  { value: '', label: '全部角色' },
  { value: 'user', label: '员工' },
  { value: 'admin', label: '管理员' },
];
const userStatusOptions: FilterOption[] = [
  { value: '', label: '全部状态' },
  { value: 'active', label: '启用' },
  { value: 'disabled', label: '停用' },
];
const auditResultOptions: FilterOption[] = [
  { value: '', label: '全部结果' },
  { value: 'success', label: '成功' },
  { value: 'denied', label: '拒绝' },
  { value: 'failure', label: '失败' },
];
const archiveJudgementOptions: FilterOption[] = [
  { value: '', label: '全部判定' },
  { value: 'concealment', label: '隐瞒' },
  { value: 'falseStatement', label: '虚假陈述' },
  { value: 'clear', label: '无异常' },
];
const filteredProfiles = computed(() =>
  profiles.value.filter((item) => {
    const documentType = readProfileField(item, 'basicInfo', 'documentType');
    const nationality = readProfileField(item, 'basicInfo', 'nationality');
    const gender = readProfileField(item, 'basicInfo', 'gender');

    if (
      profileFilters.value.documentType &&
      documentType !== profileFilters.value.documentType
    ) {
      return false;
    }
    if (
      profileFilters.value.nationality &&
      nationality !== profileFilters.value.nationality
    ) {
      return false;
    }
    if (profileFilters.value.gender && gender !== profileFilters.value.gender) {
      return false;
    }
    return matchesSearch(buildProfileSearchText(item), profileQuery.value);
  }),
);
const filteredWatchlist = computed(() =>
  watchlist.value.filter((item) =>
    matchesSearch(
      [item.documentNum, item.riskReason || '高风险名单命中'],
      watchlistQuery.value,
    ),
  ),
);
const filteredUsers = computed(() =>
  users.value.filter((item) => {
    if (userFilters.value.role && item.role !== userFilters.value.role) {
      return false;
    }
    if (userFilters.value.status && item.status !== userFilters.value.status) {
      return false;
    }
    return matchesSearch(buildUserSearchText(item), userQuery.value);
  }),
);
const filteredAuditLogs = computed(() => protectedAuditLogs.value);
const filteredArchives = computed(() =>
  archives.value.filter((item) =>
    matchesSearch(
      [
        item.archiveCode,
        item.sessionId,
        item.passengerName,
        item.passengerDocumentNum,
        item.operatorName,
        item.operatorWorkId,
        formatArchiveJudgementLabel(item.finalJudgement),
      ],
      archiveQuery.value,
    ),
  ),
);
const selectedProfileDocumentTypeLabel = computed(() =>
  describeFilterLabel(
    '证件类型',
    profileDocumentTypeOptions.value,
    profileFilters.value.documentType,
  ),
);
const selectedProfileNationalityLabel = computed(() =>
  describeFilterLabel(
    '国籍',
    profileNationalityOptions.value,
    profileFilters.value.nationality,
  ),
);
const selectedProfileGenderLabel = computed(() =>
  describeFilterLabel(
    '性别',
    profileGenderOptions.value,
    profileFilters.value.gender,
  ),
);
const selectedUserRoleLabel = computed(() =>
  describeFilterLabel('角色', userRoleOptions, userFilters.value.role),
);
const selectedUserStatusLabel = computed(() =>
  describeFilterLabel('状态', userStatusOptions, userFilters.value.status),
);
const selectedArchiveJudgementLabel = computed(() =>
  describeFilterLabel(
    '判定',
    archiveJudgementOptions,
    archiveFilters.value.judgement,
  ),
);
const selectedAuditResultLabel = computed(() =>
  describeFilterLabel('结果', auditResultOptions, auditFilters.value.result),
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
  void refreshAll();
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

async function refreshAll() {
  await Promise.all([
    loadProfiles(),
    loadWatchlist(),
    loadUsers(),
    loadArchives(),
    loadAuditLogs(),
    loadInquirySettings(),
  ]);
}

async function loadProfiles() {
  const protectedResult = await listAdminProfilesProtected(profileQuery.value);
  protectedProfiles.value = protectedResult.items;
  const result = await listAdminProfiles('');
  profiles.value = result.items;
  statusMessages.value.profiles = `已加载基础画像 ${result.total} 条。`;
}

async function loadWatchlist() {
  const protectedResult = await listAdminWatchlistProtected(
    watchlistQuery.value,
  );
  protectedWatchlist.value = protectedResult.items;
  const result = await listAdminWatchlist('');
  watchlist.value = result.items;
  statusMessages.value.watchlist = `已加载高风险名单 ${result.total} 条。`;
}

async function loadUsers() {
  const protectedResult = await listAdminUsersProtected(userQuery.value);
  protectedUsers.value = protectedResult.items;
  const result = await listAdminUsers('');
  users.value = result.items;
  statusMessages.value.users = `已加载用户 ${result.total} 条。`;
}

async function loadArchives() {
  const result = await listInquiryArchives({
    query: archiveQuery.value,
    documentNum: archiveDocumentNum.value,
    operatorWorkId: archiveOperatorWorkId.value,
    judgement: archiveFilters.value.judgement,
    limit: 500,
  });
  archives.value = result.items;
  statusMessages.value.archives = `已加载问询归档 ${result.total} 条。`;
}

async function loadAuditLogs() {
  const result = await listAdminAuditLogsProtected({
    query: auditQuery.value,
    actorWorkId: auditActorWorkId.value,
    result: auditFilters.value.result,
    limit: 500,
  });
  protectedAuditLogs.value = result.items;
  statusMessages.value.audit = `已加载审计日志 ${result.total} 条。`;
}

async function loadInquirySettings() {
  const result = await getAdminInquirySettings();
  inquirySettings.value = result;
  inquiryMaxRoundsInput.value = result.maxRounds;
  statusMessages.value.settings = `当前总交互轮次上限为 ${result.maxRounds} 轮。`;
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

function resetProfileForm() {
  editingProfileId.value = null;
  profileForm.value = createEmptyProfileForm();
}

function resetWatchlistForm() {
  editingWatchlistId.value = null;
  watchlistForm.value = {
    documentNum: '',
    riskReason: '',
  };
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

function editProfile(item: PassengerProfileRecord) {
  openFilterPicker.value = null;
  editingProfileId.value = item.id;
  profileForm.value = mapProfileToForm(item);
  isProfileFormVisible.value = true;
}

function editWatchlist(item: AdminWatchlistItem) {
  openFilterPicker.value = null;
  editingWatchlistId.value = item.id;
  watchlistForm.value = {
    documentNum: item.documentNum,
    riskReason: item.riskReason,
  };
  isWatchlistFormVisible.value = true;
}

function editUser(item: AdminUserItem) {
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

async function submitProfile() {
  try {
    const payload = buildProfilePayload(profileForm.value);
    if (editingProfileId.value) {
      await updateAdminProfile(editingProfileId.value, payload);
      statusMessages.value.profiles = '基础画像已更新。';
    } else {
      await createAdminProfile(payload);
      statusMessages.value.profiles = '基础画像已新增。';
    }
    resetProfileForm();
    isProfileFormVisible.value = false;
    await loadProfiles();
  } catch (error) {
    statusMessages.value.profiles =
      error instanceof Error ? error.message : '基础画像保存失败。';
  }
}

async function removeProfile(id: number) {
  try {
    await deleteAdminProfile(id);
    statusMessages.value.profiles = '基础画像已删除。';
    await loadProfiles();
  } catch (error) {
    statusMessages.value.profiles =
      error instanceof Error ? error.message : '删除基础画像失败。';
  }
}

async function submitWatchlist() {
  try {
    if (editingWatchlistId.value) {
      await updateAdminWatchlist(editingWatchlistId.value, watchlistForm.value);
      statusMessages.value.watchlist = '高风险名单已更新。';
    } else {
      await createAdminWatchlist(watchlistForm.value);
      statusMessages.value.watchlist = '高风险名单已新增。';
    }
    resetWatchlistForm();
    isWatchlistFormVisible.value = false;
    await loadWatchlist();
  } catch (error) {
    statusMessages.value.watchlist =
      error instanceof Error ? error.message : '高风险名单保存失败。';
  }
}

async function removeWatchlist(id: number) {
  try {
    await deleteAdminWatchlist(id);
    statusMessages.value.watchlist = '高风险名单已删除。';
    await loadWatchlist();
  } catch (error) {
    statusMessages.value.watchlist =
      error instanceof Error ? error.message : '删除高风险名单失败。';
  }
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
  try {
    await recordAuditEvent({
      action: 'logout',
      resource: '退出登录',
      result: 'success',
      path: '/admin/home',
    });
  } catch {
    // noop
  }
  clearAuthSession();
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

  if (isProfileFormVisible.value) {
    closeProfileForm();
    return;
  }
  if (isWatchlistFormVisible.value) {
    closeWatchlistForm();
    return;
  }
  if (isUserFormVisible.value) {
    closeUserForm();
    return;
  }
  if (isArchiveDetailVisible.value) {
    closeArchiveDetail();
  }
}

function selectTab(tabKey: TabKey) {
  activeTab.value = tabKey;
  openFilterPicker.value = null;
}

function toggleFilterPicker(key: Exclude<FilterPickerKey, null>) {
  openFilterPicker.value = openFilterPicker.value === key ? null : key;
}

function openCreateProfileForm() {
  openFilterPicker.value = null;
  resetProfileForm();
  isProfileFormVisible.value = true;
}

function openCreateWatchlistForm() {
  openFilterPicker.value = null;
  resetWatchlistForm();
  isWatchlistFormVisible.value = true;
}

function openCreateUserForm() {
  openFilterPicker.value = null;
  resetUserForm();
  isUserFormVisible.value = true;
}

function closeProfileForm() {
  openFilterPicker.value = null;
  resetProfileForm();
  isProfileFormVisible.value = false;
}

function closeWatchlistForm() {
  openFilterPicker.value = null;
  resetWatchlistForm();
  isWatchlistFormVisible.value = false;
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

function applyArchiveJudgementFilter(value: string) {
  archiveFilters.value.judgement = value;
  openFilterPicker.value = null;
  void loadArchives();
}

function applyAuditResultFilter(value: string) {
  auditFilters.value.result = value;
  openFilterPicker.value = null;
}

async function openArchiveDetail(item: InquiryArchiveListItem) {
  isArchiveDetailVisible.value = true;
  selectedArchive.value = null;
  isLoadingArchiveDetail.value = true;
  revokeArchiveVideoUrls();

  try {
    const detail = await getInquiryArchive(item.id);
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

function createEmptyProfileForm(): ProfileFormState {
  return {
    documentNum: '',
    fullName: '',
    documentType: '',
    nationality: '',
    gender: '',
    birthDate: '',
    phone: '',
    pnr: '',
    flightNo: '',
    destination: '',
    purpose: '',
    occupation: '',
    company: '',
    riskTags: '',
    criminalRecord: '',
    remark: '',
  };
}

function mapProfileToForm(item: PassengerProfileRecord): ProfileFormState {
  const profileData = (item.profileData ?? {}) as Record<string, any>;
  const basicInfo = (profileData.basicInfo ?? {}) as Record<string, any>;
  const tripInfo = (profileData.tripInfo ?? {}) as Record<string, any>;
  const occupation = (profileData.occupation ?? {}) as Record<string, any>;
  const riskInfo = (profileData.riskInfo ?? {}) as Record<string, any>;

  return {
    documentNum: item.documentNum,
    fullName: item.fullName,
    documentType: String(basicInfo.documentType ?? ''),
    nationality: String(basicInfo.nationality ?? ''),
    gender: String(basicInfo.gender ?? ''),
    birthDate: String(basicInfo.birthDate ?? ''),
    phone: String(basicInfo.phone ?? ''),
    pnr: String(tripInfo.pnr ?? ''),
    flightNo: String(tripInfo.flightNo ?? ''),
    destination: String(tripInfo.destination ?? ''),
    purpose: String(tripInfo.purposeDeclared ?? ''),
    occupation: String(occupation.occupation ?? ''),
    company: String(occupation.company ?? ''),
    riskTags: Array.isArray(riskInfo.riskTags)
      ? riskInfo.riskTags.join(', ')
      : '',
    criminalRecord: String(riskInfo.criminalRecord ?? ''),
    remark: String(riskInfo.note ?? ''),
  };
}

function buildProfilePayload(
  form: ProfileFormState,
): Partial<PassengerProfileRecord> {
  return {
    documentNum: form.documentNum.trim(),
    fullName: form.fullName.trim(),
    profileData: {
      basicInfo: compactObject({
        documentType: form.documentType.trim(),
        nationality: form.nationality.trim(),
        gender: form.gender.trim(),
        birthDate: form.birthDate.trim(),
        phone: form.phone.trim(),
      }),
      tripInfo: compactObject({
        pnr: form.pnr.trim(),
        flightNo: form.flightNo.trim(),
        destination: form.destination.trim(),
        purposeDeclared: form.purpose.trim(),
      }),
      occupation: compactObject({
        occupation: form.occupation.trim(),
        company: form.company.trim(),
      }),
      riskInfo: compactObject({
        riskTags: splitTags(form.riskTags),
        criminalRecord: form.criminalRecord.trim(),
        note: form.remark.trim(),
      }),
    },
  };
}

function splitTags(value: string) {
  return value
    .split(/[,，、;；]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function compactObject(input: Record<string, unknown>) {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (Array.isArray(value)) {
      if (value.length > 0) {
        result[key] = value;
      }
      continue;
    }
    if (typeof value === 'string') {
      if (value.trim()) {
        result[key] = value.trim();
      }
      continue;
    }
    if (value) {
      result[key] = value;
    }
  }
  return result;
}

function buildProfileSummary(item: PassengerProfileRecord) {
  const profileData = (item.profileData ?? {}) as Record<string, any>;
  const tripInfo = (profileData.tripInfo ?? {}) as Record<string, any>;
  const occupation = (profileData.occupation ?? {}) as Record<string, any>;
  const destination = String(tripInfo.destination ?? '').trim();
  const purpose = String(tripInfo.purposeDeclared ?? '').trim();
  const occupationName = String(occupation.occupation ?? '').trim();

  return (
    [destination, purpose, occupationName].filter(Boolean).join(' · ') ||
    '未填写更多画像信息'
  );
}

function buildProfileDetailEntries(
  item: PassengerProfileRecord,
): ProfileDetailEntry[] {
  const profileData = (item.profileData ?? {}) as Record<string, any>;
  const basicInfo = (profileData.basicInfo ?? {}) as Record<string, any>;
  const tripInfo = (profileData.tripInfo ?? {}) as Record<string, any>;
  const occupation = (profileData.occupation ?? {}) as Record<string, any>;
  const occupationSummary = [occupation.occupation, occupation.company]
    .map((value) => String(value ?? '').trim())
    .filter(Boolean)
    .join(' · ');

  return [
    {
      label: '国籍',
      value: String(basicInfo.nationality ?? '').trim() || '未填写',
    },
    {
      label: '出生',
      value: String(basicInfo.birthDate ?? '').trim() || '未填写',
    },
    {
      label: '电话',
      value: String(basicInfo.phone ?? '').trim() || '未填写',
    },
    {
      label: 'PNR',
      value: String(tripInfo.pnr ?? '').trim() || '未填写',
    },
    {
      label: '航班',
      value: String(tripInfo.flightNo ?? '').trim() || '未填写',
    },
    {
      label: '目的地',
      value: String(tripInfo.destination ?? '').trim() || '未填写',
    },
    {
      label: '目的',
      value: String(tripInfo.purposeDeclared ?? '').trim() || '未填写',
    },
    {
      label: '职业 / 单位',
      value: occupationSummary || '未填写',
    },
  ];
}

function buildProfileRiskTags(item: PassengerProfileRecord) {
  const profileData = (item.profileData ?? {}) as Record<string, any>;
  const riskInfo = (profileData.riskInfo ?? {}) as Record<string, any>;
  const rawTags = riskInfo.riskTags;
  if (!Array.isArray(rawTags)) {
    return [] as string[];
  }

  return rawTags.map((tag) => String(tag ?? '').trim()).filter(Boolean);
}

function buildProfileNotes(item: PassengerProfileRecord): ProfileDetailEntry[] {
  const profileData = (item.profileData ?? {}) as Record<string, any>;
  const riskInfo = (profileData.riskInfo ?? {}) as Record<string, any>;
  const notes: ProfileDetailEntry[] = [];
  const criminalRecord = String(riskInfo.criminalRecord ?? '').trim();
  const remark = String(riskInfo.note ?? '').trim();

  if (criminalRecord) {
    notes.push({
      label: '违法犯罪记录',
      value: criminalRecord,
    });
  }
  if (remark) {
    notes.push({
      label: '备注',
      value: remark,
    });
  }

  return notes;
}

function buildProfileSearchText(item: PassengerProfileRecord) {
  return [
    item.fullName,
    item.documentNum,
    item.riskReason,
    readProfileField(item, 'basicInfo', 'documentType'),
    formatDocumentTypeLabel(
      readProfileField(item, 'basicInfo', 'documentType'),
    ),
    readProfileField(item, 'basicInfo', 'nationality'),
    readProfileField(item, 'basicInfo', 'gender'),
    formatGenderLabel(readProfileField(item, 'basicInfo', 'gender')),
    ...buildProfileDetailEntries(item).flatMap((detail) => [
      detail.label,
      detail.value,
    ]),
    ...buildProfileRiskTags(item),
    ...buildProfileNotes(item).flatMap((note) => [note.label, note.value]),
  ];
}

function buildUserSearchText(item: AdminUserItem) {
  return [
    item.workId,
    item.name,
    item.role,
    formatUserRoleLabel(item.role),
    item.status,
    formatUserStatusLabel(item.status),
  ];
}

function matchesSearch(values: Array<string | undefined>, rawQuery: string) {
  const terms = rawQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);

  if (terms.length === 0) {
    return true;
  }

  const haystack = values
    .map((value) =>
      String(value ?? '')
        .trim()
        .toLowerCase(),
    )
    .filter(Boolean)
    .join(' ');

  return terms.every((term) => haystack.includes(term));
}

function buildDistinctOptions(
  values: string[],
  formatter?: (value: string) => string,
) {
  const distinctValues = [
    ...new Set(values.map((item) => item.trim()).filter(Boolean)),
  ].sort((left, right) => left.localeCompare(right, 'zh-Hans-CN'));

  return [
    { value: '', label: '全部' },
    ...distinctValues.map((value) => ({
      value,
      label: formatter ? formatter(value) : value,
    })),
  ];
}

function describeFilterLabel(
  prefix: string,
  options: FilterOption[],
  value: string,
) {
  const label = options.find((item) => item.value === value)?.label ?? '全部';
  return `${prefix}：${label}`;
}

function readProfileField(
  item: PassengerProfileRecord,
  section: 'basicInfo' | 'tripInfo' | 'occupation' | 'riskInfo',
  field: string,
) {
  const profileData = (item.profileData ?? {}) as Record<string, any>;
  const sectionData = (profileData[section] ?? {}) as Record<string, any>;
  return String(sectionData[field] ?? '').trim();
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
    second: '2-digit',
  });
}

function formatArchiveTime(value: string) {
  return formatAuditTime(value);
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
              class="admin-toolbar__search-input"
              type="text"
              inputmode="search"
              placeholder="输入要筛选的内容"
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
            <button
              type="button"
              class="ghost ghost--strong"
              @click="openCreateProfileForm"
            >
              {{ editingProfileId ? '继续编辑' : '新增基础画像' }}
            </button>
          </div>
        </div>

        <p class="admin-filter-summary">
          当前展示 {{ protectedProfiles.length }} 条基础画像。
        </p>

        <div class="admin-table">
          <article
            v-for="(item, index) in protectedProfiles"
            :key="item.id"
            class="admin-row admin-row--profile"
          >
            <div class="admin-row__profile-content">
              <SensitiveAssetImage
                :src="item.asset.url"
                alt="基础画像敏感图片"
              />
            </div>
            <div class="admin-row__actions">
              <button
                type="button"
                @click="editProfile(filteredProfiles[index] || profiles[index])"
              >
                编辑
              </button>
              <button
                type="button"
                class="danger"
                @click="
                  removeProfile((filteredProfiles[index] || profiles[index]).id)
                "
              >
                删除
              </button>
            </div>
          </article>
        </div>
      </section>

      <section v-else-if="activeTab === 'watchlist'" class="admin-panel">
        <div class="admin-toolbar">
          <div class="admin-toolbar__search-block">
            <input
              v-model="watchlistQuery"
              class="admin-toolbar__search-input"
              type="text"
              inputmode="search"
              placeholder="输入要筛选的内容"
            />
          </div>
          <div class="admin-toolbar__actions">
            <button type="button" class="ghost" @click="clearWatchlistFilters">
              清空检索
            </button>
            <button
              type="button"
              class="ghost ghost--strong"
              @click="openCreateWatchlistForm"
            >
              {{ editingWatchlistId ? '继续编辑' : '新增高风险名单' }}
            </button>
          </div>
        </div>

        <p class="admin-filter-summary">
          当前展示 {{ protectedWatchlist.length }} 条高风险名单。
        </p>

        <div class="admin-table">
          <article
            v-for="(item, index) in protectedWatchlist"
            :key="item.id"
            class="admin-row"
          >
            <div class="admin-row__profile-content">
              <SensitiveAssetImage
                :src="item.asset.url"
                alt="高风险名单敏感图片"
              />
            </div>
            <div class="admin-row__actions">
              <button
                type="button"
                @click="
                  editWatchlist(filteredWatchlist[index] || watchlist[index])
                "
              >
                编辑
              </button>
              <button
                type="button"
                class="danger"
                @click="
                  removeWatchlist(
                    (filteredWatchlist[index] || watchlist[index]).id,
                  )
                "
              >
                删除
              </button>
            </div>
          </article>
        </div>
      </section>

      <section v-else-if="activeTab === 'archives'" class="admin-panel">
        <div class="admin-toolbar">
          <div class="admin-toolbar__search-block">
            <input
              v-model="archiveQuery"
              class="admin-toolbar__search-input"
              type="text"
              inputmode="search"
              placeholder="输入归档编号、姓名、证件号或会话 ID"
              @keyup.enter="loadArchives"
            />
          </div>
          <div class="admin-toolbar__actions">
            <input
              v-model="archiveDocumentNum"
              class="admin-toolbar__search-input admin-toolbar__search-input--compact"
              type="text"
              inputmode="search"
              placeholder="按证件号"
              @keyup.enter="loadArchives"
            />
            <input
              v-model="archiveOperatorWorkId"
              class="admin-toolbar__search-input admin-toolbar__search-input--compact"
              type="text"
              inputmode="search"
              placeholder="按工号"
              @keyup.enter="loadArchives"
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
          当前筛选后 {{ filteredArchives.length }} 条问询归档。{{
            statusMessages.archives
          }}
        </p>

        <div class="admin-table">
          <article
            v-for="item in filteredArchives"
            :key="item.id"
            class="admin-row admin-row--archive"
          >
            <div class="admin-row__profile-content">
              <div class="admin-row__headline">
                <strong>{{ item.archiveCode }}</strong>
                <span
                  class="admin-row__status"
                  :class="archiveJudgementClass(item.finalJudgement)"
                >
                  <span class="admin-row__status-dot"></span>
                  {{ formatArchiveJudgementLabel(item.finalJudgement) }}
                </span>
                <span class="admin-row__identity">{{ item.sessionId }}</span>
              </div>
              <div class="admin-row__fact-list">
                <span class="admin-row__fact">
                  <span class="admin-row__fact-label">旅客</span>
                  <strong class="admin-row__fact-value">
                    {{ item.passengerName || '未记录' }}
                  </strong>
                </span>
                <span class="admin-row__fact">
                  <span class="admin-row__fact-label">证件号</span>
                  <strong class="admin-row__fact-value">
                    {{ item.passengerDocumentNum || '-' }}
                  </strong>
                </span>
                <span class="admin-row__fact">
                  <span class="admin-row__fact-label">采样</span>
                  <strong class="admin-row__fact-value">
                    {{ item.roundCount }} 轮 ·
                    {{ formatDuration(item.totalDurationSeconds) }}
                  </strong>
                </span>
                <span class="admin-row__fact">
                  <span class="admin-row__fact-label">操作人</span>
                  <strong class="admin-row__fact-value">
                    {{ item.operatorName || '-' }} /
                    {{ item.operatorWorkId || '-' }}
                  </strong>
                </span>
                <span class="admin-row__fact">
                  <span class="admin-row__fact-label">归档时间</span>
                  <strong class="admin-row__fact-value">
                    {{ formatArchiveTime(item.archivedAt) }}
                  </strong>
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
      </section>

      <section v-else class="admin-panel">
        <template v-if="activeTab === 'audit'">
          <div class="admin-toolbar">
            <div class="admin-toolbar__search-block">
              <input
                v-model="auditQuery"
                class="admin-toolbar__search-input"
                type="text"
                inputmode="search"
                placeholder="输入操作人、动作、资源或路径"
              />
            </div>
            <div class="admin-toolbar__actions">
              <input
                v-model="auditActorWorkId"
                class="admin-toolbar__search-input admin-toolbar__search-input--compact"
                type="text"
                inputmode="search"
                placeholder="按工号筛选"
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
            当前展示 {{ filteredAuditLogs.length }} 条审计日志。
          </p>

          <div class="admin-audit-list">
            <article
              v-for="item in filteredAuditLogs"
              :key="item.id"
              class="admin-audit-item"
            >
              <SensitiveAssetImage
                :src="item.asset.url"
                alt="审计日志敏感图片"
              />
            </article>
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
                  type="number"
                  min="1"
                  max="10"
                  step="1"
                  inputmode="numeric"
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
                class="admin-toolbar__search-input"
                type="text"
                inputmode="search"
                placeholder="输入要筛选的内容"
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
            当前展示 {{ protectedUsers.length }} 个用户。
          </p>

          <div class="admin-table">
            <article
              v-for="(item, index) in protectedUsers"
              :key="item.id"
              class="admin-row"
            >
              <div class="admin-row__profile-content">
                <SensitiveAssetImage :src="item.asset.url" alt="用户敏感图片" />
              </div>
              <div class="admin-row__actions">
                <button
                  type="button"
                  @click="editUser(filteredUsers[index] || users[index])"
                >
                  编辑
                </button>
                <button
                  type="button"
                  :class="
                    (filteredUsers[index] || users[index]).status === 'active'
                      ? 'danger'
                      : ''
                  "
                  @click="
                    toggleUserStatus(filteredUsers[index] || users[index])
                  "
                >
                  {{
                    (filteredUsers[index] || users[index]).status === 'active'
                      ? '停用'
                      : '启用'
                  }}
                </button>
              </div>
            </article>
          </div>
        </template>
      </section>
    </section>
  </main>

  <Teleport to="body">
    <section
      v-if="isProfileFormVisible"
      class="admin-dialog"
      @click.self="closeProfileForm"
    >
      <div
        class="admin-form-card admin-form-card--dialog admin-form-card--profile"
      >
        <div class="admin-form-card__header">
          <div>
            <h3>{{ editingProfileId ? '编辑基础画像' : '新增基础画像' }}</h3>
            <p>在弹窗内填写并提交基础画像信息。</p>
          </div>
          <button type="button" class="ghost" @click="closeProfileForm">
            关闭窗口
          </button>
        </div>

        <div class="admin-form-grid">
          <input
            v-model="profileForm.documentNum"
            :title="touchInputHint"
            type="text"
            placeholder="证件号码"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入证件号码',
                placeholder: '输入证件号码',
                value: profileForm.documentNum,
                assign: (value) => (profileForm.documentNum = value),
              })
            "
          />
          <input
            v-model="profileForm.fullName"
            :title="touchInputHint"
            type="text"
            placeholder="姓名"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入姓名',
                placeholder: '输入姓名',
                value: profileForm.fullName,
                assign: (value) => (profileForm.fullName = value),
              })
            "
          />
          <input
            v-model="profileForm.documentType"
            :title="touchInputHint"
            type="text"
            placeholder="证件类型"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入证件类型',
                placeholder: '输入证件类型',
                value: profileForm.documentType,
                assign: (value) => (profileForm.documentType = value),
              })
            "
          />
          <input
            v-model="profileForm.nationality"
            :title="touchInputHint"
            type="text"
            placeholder="国籍"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入国籍',
                placeholder: '输入国籍',
                value: profileForm.nationality,
                assign: (value) => (profileForm.nationality = value),
              })
            "
          />
          <input
            v-model="profileForm.gender"
            :title="touchInputHint"
            type="text"
            placeholder="性别"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入性别',
                placeholder: '输入性别',
                value: profileForm.gender,
                assign: (value) => (profileForm.gender = value),
              })
            "
          />
          <input
            v-model="profileForm.birthDate"
            :title="touchInputHint"
            type="text"
            placeholder="出生日期"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入出生日期',
                placeholder: '输入出生日期',
                value: profileForm.birthDate,
                assign: (value) => (profileForm.birthDate = value),
              })
            "
          />
          <input
            v-model="profileForm.phone"
            :title="touchInputHint"
            type="text"
            inputmode="tel"
            placeholder="联系电话"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入联系电话',
                placeholder: '输入联系电话',
                value: profileForm.phone,
                inputMode: 'tel',
                assign: (value) => (profileForm.phone = value),
              })
            "
          />
          <input
            v-model="profileForm.pnr"
            :title="touchInputHint"
            type="text"
            placeholder="订票编码 PNR"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入订票编码 PNR',
                placeholder: '输入订票编码 PNR',
                value: profileForm.pnr,
                assign: (value) => (profileForm.pnr = value),
              })
            "
          />
          <input
            v-model="profileForm.flightNo"
            :title="touchInputHint"
            type="text"
            placeholder="航班号"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入航班号',
                placeholder: '输入航班号',
                value: profileForm.flightNo,
                assign: (value) => (profileForm.flightNo = value),
              })
            "
          />
          <input
            v-model="profileForm.destination"
            :title="touchInputHint"
            type="text"
            placeholder="目的地"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入目的地',
                placeholder: '输入目的地',
                value: profileForm.destination,
                assign: (value) => (profileForm.destination = value),
              })
            "
          />
          <input
            v-model="profileForm.purpose"
            :title="touchInputHint"
            type="text"
            placeholder="出行目的"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入出行目的',
                placeholder: '输入出行目的',
                value: profileForm.purpose,
                assign: (value) => (profileForm.purpose = value),
              })
            "
          />
          <input
            v-model="profileForm.occupation"
            :title="touchInputHint"
            type="text"
            placeholder="职业"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入职业',
                placeholder: '输入职业',
                value: profileForm.occupation,
                assign: (value) => (profileForm.occupation = value),
              })
            "
          />
          <input
            v-model="profileForm.company"
            :title="touchInputHint"
            type="text"
            placeholder="工作单位"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入工作单位',
                placeholder: '输入工作单位',
                value: profileForm.company,
                assign: (value) => (profileForm.company = value),
              })
            "
          />
          <input
            v-model="profileForm.riskTags"
            :title="touchInputHint"
            type="text"
            placeholder="风险标签，多个用逗号分隔"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入风险标签',
                description: '多个标签可用逗号分隔。',
                placeholder: '输入风险标签，多个用逗号分隔',
                value: profileForm.riskTags,
                assign: (value) => (profileForm.riskTags = value),
              })
            "
          />
          <textarea
            v-model="profileForm.criminalRecord"
            :title="touchInputHint"
            placeholder="违法犯罪记录"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入违法犯罪记录',
                placeholder: '输入违法犯罪记录',
                value: profileForm.criminalRecord,
                multiline: true,
                assign: (value) => (profileForm.criminalRecord = value),
              })
            "
          ></textarea>
          <textarea
            v-model="profileForm.remark"
            :title="touchInputHint"
            placeholder="备注"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入备注',
                placeholder: '输入备注',
                value: profileForm.remark,
                multiline: true,
                assign: (value) => (profileForm.remark = value),
              })
            "
          ></textarea>
        </div>

        <div class="admin-form-actions">
          <button type="button" @click="submitProfile">
            {{ editingProfileId ? '更新基础画像' : '新增基础画像' }}
          </button>
          <button type="button" class="ghost" @click="closeProfileForm">
            取消
          </button>
        </div>
      </div>
    </section>
  </Teleport>

  <Teleport to="body">
    <section
      v-if="isWatchlistFormVisible"
      class="admin-dialog"
      @click.self="closeWatchlistForm"
    >
      <div
        class="admin-form-card admin-form-card--dialog admin-form-card--watchlist"
      >
        <div class="admin-form-card__header">
          <div>
            <h3>
              {{ editingWatchlistId ? '编辑高风险名单' : '新增高风险名单' }}
            </h3>
            <p>在弹窗内填写证件号码和高风险原因。</p>
          </div>
          <button type="button" class="ghost" @click="closeWatchlistForm">
            关闭窗口
          </button>
        </div>

        <div class="admin-form-grid">
          <input
            v-model="watchlistForm.documentNum"
            :title="touchInputHint"
            type="text"
            placeholder="证件号码"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入证件号码',
                placeholder: '输入证件号码',
                value: watchlistForm.documentNum ?? '',
                assign: (value) => (watchlistForm.documentNum = value),
              })
            "
          />
          <textarea
            v-model="watchlistForm.riskReason"
            :title="touchInputHint"
            placeholder="高风险原因"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入高风险原因',
                placeholder: '输入高风险原因',
                value: watchlistForm.riskReason ?? '',
                multiline: true,
                assign: (value) => (watchlistForm.riskReason = value),
              })
            "
          ></textarea>
        </div>

        <div class="admin-form-actions">
          <button type="button" @click="submitWatchlist">
            {{ editingWatchlistId ? '更新高风险名单' : '新增高风险名单' }}
          </button>
          <button type="button" class="ghost" @click="closeWatchlistForm">
            取消
          </button>
        </div>
      </div>
    </section>
  </Teleport>

  <Teleport to="body">
    <section
      v-if="isUserFormVisible"
      class="admin-dialog"
      @click.self="closeUserForm"
    >
      <div
        class="admin-form-card admin-form-card--dialog admin-form-card--user"
      >
        <div class="admin-form-card__header">
          <div>
            <h3>{{ userForm.id ? '编辑用户' : '新增用户' }}</h3>
            <p>在弹窗内维护工号、角色、状态和密码。</p>
          </div>
          <button type="button" class="ghost" @click="closeUserForm">
            关闭窗口
          </button>
        </div>

        <div class="admin-form-grid">
          <input
            v-model="userForm.workId"
            :title="touchInputHint"
            type="text"
            placeholder="工号"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入工号',
                placeholder: '输入工号',
                value: userForm.workId,
                assign: (value) => (userForm.workId = value),
              })
            "
          />
          <input
            v-model="userForm.name"
            :title="touchInputHint"
            type="text"
            placeholder="姓名"
            @dblclick.stop.prevent="
              openFormFieldInput({
                title: '输入姓名',
                placeholder: '输入姓名',
                value: userForm.name,
                assign: (value) => (userForm.name = value),
              })
            "
          />
          <select v-model="userForm.role">
            <option value="user">员工</option>
            <option value="admin">管理员</option>
          </select>
          <select v-model="userForm.status">
            <option value="active">启用</option>
            <option value="disabled" :disabled="isEditingCurrentUser">
              停用
            </option>
          </select>
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

        <div class="admin-form-actions">
          <button type="button" @click="submitUser">
            {{ userForm.id ? '更新用户' : '新增用户' }}
          </button>
          <button type="button" class="ghost" @click="closeUserForm">
            取消
          </button>
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
        <div class="admin-form-card__header">
          <div>
            <h3>
              {{
                selectedArchive?.archiveCode ||
                (isLoadingArchiveDetail ? '正在加载问询归档' : '问询归档详情')
              }}
            </h3>
            <p>
              {{
                selectedArchive
                  ? `${selectedArchive.passengerName || '未记录旅客'} / ${
                      selectedArchive.passengerDocumentNum || '-'
                    }`
                  : '正在读取归档主表、轮次、视频与系统摘要。'
              }}
            </p>
          </div>
          <button type="button" class="ghost" @click="closeArchiveDetail">
            关闭窗口
          </button>
        </div>

        <div v-if="selectedArchive" class="archive-detail">
          <section class="archive-detail__summary">
            <div>
              <span class="meta-label">最终判定</span>
              <strong>{{
                formatArchiveJudgementLabel(selectedArchive.finalJudgement)
              }}</strong>
            </div>
            <div>
              <span class="meta-label">归档时间</span>
              <strong>{{
                formatArchiveTime(selectedArchive.archivedAt)
              }}</strong>
            </div>
            <div>
              <span class="meta-label">采样</span>
              <strong>
                {{ selectedArchive.roundCount }} 轮 ·
                {{ formatDuration(selectedArchive.totalDurationSeconds) }}
              </strong>
            </div>
            <div>
              <span class="meta-label">归档人</span>
              <strong>
                {{ selectedArchive.operatorName || '-' }} /
                {{ selectedArchive.operatorWorkId || '-' }}
              </strong>
            </div>
          </section>

          <section class="archive-detail__block">
            <span class="meta-label">详细理由</span>
            <p>{{ selectedArchive.judgementReason }}</p>
          </section>

          <section class="archive-detail__grid">
            <div class="archive-detail__block">
              <span class="meta-label">系统摘要</span>
              <pre>{{
                stringifyDetail(selectedArchive.judgementBriefing)
              }}</pre>
            </div>
            <div class="archive-detail__block">
              <span class="meta-label">旅客快照</span>
              <pre>{{
                stringifyDetail(selectedArchive.passengerSnapshot)
              }}</pre>
            </div>
          </section>

          <section class="archive-round-list">
            <article
              v-for="round in selectedArchive.rounds"
              :key="round.id"
              class="archive-round"
            >
              <header>
                <div>
                  <span class="meta-label">第 {{ round.roundNo }} 轮</span>
                  <h4>{{ round.title || round.focus || '问询轮次' }}</h4>
                </div>
                <span class="admin-row__pill">{{
                  formatDuration(round.durationSeconds)
                }}</span>
              </header>

              <div class="archive-detail__block">
                <span class="meta-label">本轮摘要</span>
                <p>
                  {{
                    round.roundSummary || round.humanOmniSummary || '未记录摘要'
                  }}
                </p>
              </div>

              <div class="archive-detail__grid">
                <div class="archive-detail__block">
                  <span class="meta-label">问题</span>
                  <pre>{{ stringifyDetail(round.questions) }}</pre>
                </div>
                <div class="archive-detail__block">
                  <span class="meta-label">转写</span>
                  <pre>{{ stringifyDetail(round.transcripts) }}</pre>
                </div>
              </div>

              <div
                v-if="asArray(round.riskHints).length"
                class="admin-row__tags"
              >
                <span
                  v-for="hint in asArray(round.riskHints)"
                  :key="String(hint)"
                  class="admin-row__tag"
                >
                  {{ hint }}
                </span>
              </div>

              <div v-if="round.videos.length" class="archive-video-list">
                <article
                  v-for="video in round.videos"
                  :key="video.id"
                  class="archive-video"
                >
                  <div class="archive-video__meta">
                    <strong>{{
                      video.fileName || video.windowId || '归档视频'
                    }}</strong>
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
      </div>
    </section>
  </Teleport>
</template>

<style scoped lang="scss">
.admin-page {
  min-height: 100vh;
  height: 100vh;
  display: grid;
  grid-template-columns: 280px 1fr;
  background:
    linear-gradient(135deg, rgba(145, 48, 30, 0.07), transparent 36%),
    linear-gradient(180deg, #fff8f4, #f4efe9);
  overflow: hidden;
}

.admin-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 28px 22px;
  background: #261613;
  color: #fff7f0;
}

.admin-sidebar__eyebrow,
.admin-header__eyebrow {
  margin: 0 0 10px;
  font-size: 0.74rem;
  letter-spacing: 0.18em;
  color: rgba(255, 240, 230, 0.72);
}

.admin-sidebar h1,
.admin-header h2 {
  margin: 0;
}

.admin-sidebar__meta {
  margin: 14px 0 0;
  color: rgba(255, 240, 230, 0.82);
}

.admin-nav {
  display: grid;
  gap: 12px;
}

.admin-nav__item,
.admin-logout,
.admin-toolbar button,
.admin-form-actions button,
.admin-row__actions button,
.admin-user-table__actions button {
  min-height: 44px;
  border: 0;
  border-radius: 14px;
  cursor: pointer;
}

.admin-nav__item {
  text-align: left;
  padding: 0 14px;
  background: rgba(255, 255, 255, 0.08);
  color: inherit;
}

.admin-nav__item.is-active {
  background: linear-gradient(135deg, #c75b3d, #eb8d63);
}

.admin-logout {
  background: rgba(255, 255, 255, 0.12);
  color: inherit;
}

.admin-content {
  min-height: 0;
  height: 100vh;
  padding: 28px;
  overflow-x: hidden;
  overflow-y: auto;
}

.admin-panel {
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(204, 179, 164, 0.5);
  box-shadow: 0 18px 36px rgba(52, 28, 20, 0.08);
}

.admin-panel {
  padding: 20px;
  overflow: visible;
}

.admin-toolbar,
.admin-form-grid,
.admin-form-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.admin-toolbar,
.admin-form-grid {
  margin-bottom: 18px;
}

.admin-toolbar {
  align-items: stretch;
  justify-content: space-between;
  padding: 14px 16px;
  border-radius: 20px;
  background: linear-gradient(
    180deg,
    rgba(255, 250, 246, 0.94),
    rgba(247, 238, 231, 0.82)
  );
  border: 1px solid rgba(218, 197, 184, 0.66);
}

.admin-toolbar__search-block {
  display: flex;
  flex: 0 1 280px;
  align-items: center;
  min-width: min(100%, 280px);
}

.admin-toolbar__actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(138px, 156px));
  flex: 1 1 520px;
  gap: 12px;
  align-items: stretch;
  align-content: stretch;
  justify-content: end;
  margin-left: auto;
  min-width: min(100%, 420px);
}

.admin-toolbar__actions > * {
  min-width: 0;
}

.admin-toolbar__search-input {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 64px;
}

.admin-toolbar__search-input--compact {
  min-height: 64px;
}

.admin-form-grid {
  align-items: stretch;
}

.admin-form-grid > * {
  flex: 1 1 280px;
}

.admin-form-actions {
  justify-content: flex-end;
}

.admin-form-grid textarea {
  min-height: 120px;
  flex-basis: 100%;
}

.admin-filter-summary {
  margin: 0 0 18px;
  color: #7a5c50;
}

.admin-audit-list {
  display: grid;
  gap: 14px;
}

.admin-audit-item {
  padding: 18px 20px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(212, 188, 173, 0.56);
}

.admin-audit-item__head,
.admin-audit-item__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
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
  margin-top: 10px;
}

.settings-panel {
  display: grid;
  gap: 18px;
}

.settings-panel__body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(180px, 240px);
  gap: 20px;
  align-items: end;
}

.settings-panel__eyebrow {
  margin: 0 0 8px;
  color: #8f6a5d;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.settings-panel h2,
.settings-panel p {
  margin: 0;
}

.settings-panel p {
  margin-top: 8px;
  color: #7a5c50;
}

.settings-field {
  display: grid;
  gap: 8px;
  color: #6f493c;
  font-weight: 700;
}

.admin-toolbar input,
.admin-form-grid input,
.admin-form-grid select,
.admin-form-grid textarea,
.settings-field input {
  width: 100%;
  min-height: 44px;
  padding: 12px 14px;
  border: 1px solid #d7c1b4;
  border-radius: 14px;
  font: inherit;
  background: #fffdfa;
}

.admin-toolbar .admin-toolbar__search-input {
  min-height: 64px;
}

.admin-toolbar__actions > button,
.admin-toolbar__actions > .filter-picker {
  width: 100%;
  height: 100%;
  min-height: 64px;
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
  margin-bottom: 18px;
  padding: 18px;
  border-radius: 20px;
  background: #fff9f6;
  border: 1px solid rgba(215, 193, 180, 0.5);
}

.admin-dialog {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(34, 22, 18, 0.42);
  backdrop-filter: blur(6px);
}

.admin-form-card--dialog {
  width: min(860px, 100%);
  max-height: calc(100vh - 48px);
  margin-bottom: 0;
  overflow: auto;
  box-shadow: 0 28px 56px rgba(34, 22, 18, 0.22);
}

.admin-form-card--profile {
  width: min(1040px, 100%);
}

.admin-form-card--watchlist,
.admin-form-card--user {
  width: min(720px, 100%);
}

.admin-form-card--archive {
  width: min(1120px, 100%);
}

.admin-form-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.admin-form-card__header h3,
.admin-form-card__header p {
  margin: 0;
}

.admin-form-card__header p {
  margin-top: 6px;
  color: #7a5c50;
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
  min-height: 64px;
  padding: 0 16px;
  border-radius: 14px;
  background: #f6ebe4;
  color: #6f493c;
}

.filter-chip.is-active {
  background: #ecd3c7;
  color: #6c372b;
}

.filter-picker__menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 20;
  display: grid;
  gap: 8px;
  min-width: 180px;
  padding: 12px;
  border-radius: 16px;
  background: #fffdfb;
  border: 1px solid rgba(204, 179, 164, 0.6);
  box-shadow: 0 16px 30px rgba(52, 28, 20, 0.12);
}

.filter-picker__menu button {
  min-height: 40px;
  padding: 0 12px;
  text-align: left;
  border-radius: 12px;
  background: #f7eee8;
  color: #6f493c;
}

.admin-table {
  display: grid;
  gap: 12px;
}

.admin-row {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 18px;
  border-radius: 18px;
  background: #fff9f6;
  border: 1px solid rgba(215, 193, 180, 0.5);
}

.admin-row p {
  margin: 6px 0 0;
  color: #6a5148;
}

.admin-row > :first-child {
  min-width: 0;
  flex: 1 1 auto;
}

.admin-row__actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: auto;
  justify-content: flex-start;
  align-items: stretch;
  flex: 0 0 172px;
  width: 172px;
}

.admin-row__actions button {
  width: 100%;
  flex: 1 1 0;
  min-height: 64px;
  font-weight: 700;
}

.admin-row--profile {
  align-items: stretch;
}

.admin-row__profile-content {
  min-width: 0;
  flex: 1 1 auto;
  display: grid;
  gap: 10px;
}

.admin-row__headline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 10px;
}

.admin-row__identity {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(243, 231, 222, 0.92);
  color: #7a5142;
  font-size: 0.82rem;
  font-weight: 700;
}

.admin-row__pill {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(214, 193, 180, 0.78);
  color: #7a5c50;
  font-size: 0.78rem;
  font-weight: 700;
}

.admin-row__fact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
}

.admin-row__fact {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 34px;
  padding: 0 10px;
  border-radius: 12px;
  background: #fffdfb;
  border: 1px solid rgba(214, 193, 180, 0.66);
}

.admin-row__fact-label {
  color: #8c6b5d;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.admin-row__fact-value {
  color: #1f282c;
  font-size: 0.84rem;
  font-weight: 700;
}

.admin-row__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.admin-row__tag {
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(181, 83, 57, 0.12);
  color: #934932;
  font-size: 0.78rem;
  font-weight: 700;
}

.admin-row__tag--muted {
  background: rgba(121, 145, 156, 0.14);
  color: #55656d;
}

.admin-row__status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
}

.admin-row__status-dot {
  width: 8px;
  height: 8px;
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
  gap: 16px;
}

.archive-detail__summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.archive-detail__summary > div,
.archive-detail__block,
.archive-round,
.archive-video {
  padding: 14px;
  border-radius: 16px;
  border: 1px solid rgba(215, 193, 180, 0.52);
  background: #fffdfa;
}

.archive-detail__summary strong,
.archive-detail__block p,
.archive-round h4 {
  margin: 0;
}

.meta-label {
  display: block;
  margin-bottom: 6px;
  color: #8a6b5e;
  font-size: 0.78rem;
  font-weight: 800;
}

.archive-detail__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.archive-detail pre {
  max-height: 220px;
  margin: 0;
  overflow: auto;
  white-space: pre-wrap;
  word-break: break-word;
  color: #44352f;
  font-size: 0.82rem;
  line-height: 1.6;
}

.archive-round header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.archive-video-list {
  display: grid;
  gap: 12px;
  margin-top: 12px;
}

.archive-video {
  display: grid;
  gap: 10px;
}

.archive-video__meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  color: #6b5349;
}

.archive-video__player {
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  background: #1f1a17;
}

.archive-video video {
  display: block;
  width: 100%;
  max-height: 420px;
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
  max-width: min(62%, 420px);
  color: rgba(255, 255, 255, 0.58);
  font-size: clamp(0.72rem, 0.64rem + 0.2vw, 0.88rem);
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1.45;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.36);
  white-space: normal;
}

.admin-user-table-wrap {
  overflow-x: auto;
  border-radius: 18px;
  border: 1px solid rgba(215, 193, 180, 0.5);
  background: #fff9f6;
}

.admin-user-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
}

.admin-user-table th,
.admin-user-table td {
  padding: 14px 16px;
  text-align: left;
  border-bottom: 1px solid rgba(215, 193, 180, 0.5);
  vertical-align: middle;
}

.admin-user-table th {
  color: #8a6b5e;
  font-size: 0.78rem;
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
  width: 212px;
  text-align: right;
}

.admin-user-table__actions {
  display: inline-flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
}

.admin-user-table__actions button {
  min-width: 92px;
  min-height: 40px;
  padding: 0 16px;
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
  }

  .admin-content {
    height: auto;
    overflow: visible;
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
    flex: 1 1 220px;
  }

  .admin-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .admin-row__actions {
    margin-left: 0;
    width: min(192px, 100%);
  }

  .admin-user-table {
    min-width: 680px;
  }

  .admin-user-table .is-actions {
    width: 190px;
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
    padding: 12px;
  }

  .admin-form-card--dialog {
    width: 100%;
    max-height: calc(100vh - 24px);
  }

  .admin-form-card__header {
    flex-direction: column;
  }
}
</style>
