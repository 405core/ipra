<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import {
  clearAuthSession,
  loadAuthSession,
  resolveRoleHome,
  validateAuthSession,
} from '../auth';
import { ElMessage } from '../app/el-message';
import { recordAuditEvent } from '../app/audit-service';
import { openTouchInput } from '../app/touch-input';
import {
  createAdminProfile,
  createAdminUser,
  createAdminWatchlist,
  deleteAdminProfile,
  deleteAdminWatchlist,
  listAdminAuditLogs,
  listAdminProfiles,
  listAdminUsers,
  listAdminWatchlist,
  updateAdminProfile,
  updateAdminUser,
  updateAdminUserStatus,
  updateAdminWatchlist,
  type AdminUserItem,
  type AdminWatchlistItem,
} from '../app/admin-service';
import type { AuditLogItem } from '../app/audit-service';
import type { PassengerProfileRecord } from '../app/profile-service';

type TabKey = 'profiles' | 'watchlist' | 'users' | 'audit';
type FilterPickerKey =
  | 'profiles-document-type'
  | 'profiles-nationality'
  | 'profiles-gender'
  | 'users-role'
  | 'users-status'
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

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'profiles', label: '基础画像' },
  { key: 'watchlist', label: '高风险名单' },
  { key: 'users', label: '管理用户' },
  { key: 'audit', label: '审计日志' },
];

const activeTab = ref<TabKey>('profiles');
const openFilterPicker = ref<FilterPickerKey>(null);
const statusMessages = ref<Record<TabKey, string>>({
  profiles: '正在加载基础画像...',
  watchlist: '正在加载高风险名单...',
  users: '正在加载用户...',
  audit: '正在加载审计日志...',
});

const profileQuery = ref('');
const watchlistQuery = ref('');
const userQuery = ref('');
const auditQuery = ref('');
const auditActorWorkId = ref('');
const touchInputHint = '单击正常输入，双击打开触控键盘';

const profiles = ref<PassengerProfileRecord[]>([]);
const watchlist = ref<AdminWatchlistItem[]>([]);
const users = ref<AdminUserItem[]>([]);
const auditLogs = ref<AuditLogItem[]>([]);
const isProfileFormVisible = ref(false);
const isWatchlistFormVisible = ref(false);
const isUserFormVisible = ref(false);
const profileFilters = ref({
  documentType: '',
  nationality: '',
  gender: '',
});
const userFilters = ref({
  role: '',
  status: '',
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
  () => isProfileFormVisible.value || isWatchlistFormVisible.value || isUserFormVisible.value
);
const isEditingCurrentUser = computed(
  () => userForm.value.id != null && userForm.value.id === currentUserId.value
);
const adminName = computed(() => session.value?.user.name || '系统管理员');
const adminWorkId = computed(() => session.value?.user.workId || 'admin');
const profileDocumentTypeOptions = computed(() =>
  buildDistinctOptions(
    profiles.value.map((item) => readProfileField(item, 'basicInfo', 'documentType')),
    formatDocumentTypeLabel
  )
);
const profileGenderOptions = computed(() =>
  buildDistinctOptions(
    profiles.value.map((item) => readProfileField(item, 'basicInfo', 'gender')),
    formatGenderLabel
  )
);
const profileNationalityOptions = computed(() =>
  buildDistinctOptions(profiles.value.map((item) => readProfileField(item, 'basicInfo', 'nationality')))
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
const filteredProfiles = computed(() =>
  profiles.value.filter((item) => {
    const documentType = readProfileField(item, 'basicInfo', 'documentType');
    const nationality = readProfileField(item, 'basicInfo', 'nationality');
    const gender = readProfileField(item, 'basicInfo', 'gender');

    if (profileFilters.value.documentType && documentType !== profileFilters.value.documentType) {
      return false;
    }
    if (profileFilters.value.nationality && nationality !== profileFilters.value.nationality) {
      return false;
    }
    if (profileFilters.value.gender && gender !== profileFilters.value.gender) {
      return false;
    }
    return matchesSearch(buildProfileSearchText(item), profileQuery.value);
  })
);
const filteredWatchlist = computed(() =>
  watchlist.value.filter((item) =>
    matchesSearch([item.documentNum, item.riskReason || '高风险名单命中'], watchlistQuery.value)
  )
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
  })
);
const filteredAuditLogs = computed(() =>
  auditLogs.value.filter((item) => {
    if (auditFilters.value.result && item.result !== auditFilters.value.result) {
      return false;
    }
    if (auditActorWorkId.value.trim() && item.actorWorkId !== auditActorWorkId.value.trim()) {
      return false;
    }
    return matchesSearch(
      [
        item.actorWorkId,
        item.actorName,
        item.action,
        item.resource,
        item.result,
        item.path,
        item.method,
      ],
      auditQuery.value
    );
  })
);
const selectedProfileDocumentTypeLabel = computed(() =>
  describeFilterLabel('证件类型', profileDocumentTypeOptions.value, profileFilters.value.documentType)
);
const selectedProfileNationalityLabel = computed(() =>
  describeFilterLabel('国籍', profileNationalityOptions.value, profileFilters.value.nationality)
);
const selectedProfileGenderLabel = computed(() =>
  describeFilterLabel('性别', profileGenderOptions.value, profileFilters.value.gender)
);
const selectedUserRoleLabel = computed(() =>
  describeFilterLabel('角色', userRoleOptions, userFilters.value.role)
);
const selectedUserStatusLabel = computed(() =>
  describeFilterLabel('状态', userStatusOptions, userFilters.value.status)
);
const selectedAuditResultLabel = computed(() =>
  describeFilterLabel('结果', auditResultOptions, auditFilters.value.result)
);

onMounted(() => {
  void refreshAll();
  if (typeof document !== 'undefined') {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleDocumentKeydown);
  }
});

onBeforeUnmount(() => {
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
  await Promise.all([loadProfiles(), loadWatchlist(), loadUsers(), loadAuditLogs()]);
}

async function loadProfiles() {
  const result = await listAdminProfiles('');
  profiles.value = result.items;
  statusMessages.value.profiles = `已加载基础画像 ${result.total} 条。`;
}

async function loadWatchlist() {
  const result = await listAdminWatchlist('');
  watchlist.value = result.items;
  statusMessages.value.watchlist = `已加载高风险名单 ${result.total} 条。`;
}

async function loadUsers() {
  const result = await listAdminUsers('');
  users.value = result.items;
  statusMessages.value.users = `已加载用户 ${result.total} 条。`;
}

async function loadAuditLogs() {
  const result = await listAdminAuditLogs({ limit: 500 });
  auditLogs.value = result.items;
  statusMessages.value.audit = `已加载审计日志 ${result.total} 条。`;
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

function applyAuditResultFilter(value: string) {
  auditFilters.value.result = value;
  openFilterPicker.value = null;
}

async function openFormFieldInput(options: {
  title: string;
  description?: string;
  placeholder: string;
  value: string;
  multiline?: boolean;
  inputMode?: 'text' | 'search' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal';
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
    riskTags: Array.isArray(riskInfo.riskTags) ? riskInfo.riskTags.join(', ') : '',
    criminalRecord: String(riskInfo.criminalRecord ?? ''),
    remark: String(riskInfo.note ?? ''),
  };
}

function buildProfilePayload(form: ProfileFormState): Partial<PassengerProfileRecord> {
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

  return [destination, purpose, occupationName].filter(Boolean).join(' · ') || '未填写更多画像信息';
}

function buildProfileDetailEntries(item: PassengerProfileRecord): ProfileDetailEntry[] {
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
    formatDocumentTypeLabel(readProfileField(item, 'basicInfo', 'documentType')),
    readProfileField(item, 'basicInfo', 'nationality'),
    readProfileField(item, 'basicInfo', 'gender'),
    formatGenderLabel(readProfileField(item, 'basicInfo', 'gender')),
    ...buildProfileDetailEntries(item).flatMap((detail) => [detail.label, detail.value]),
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
  const terms = rawQuery
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (terms.length === 0) {
    return true;
  }

  const haystack = values
    .map((value) => String(value ?? '').trim().toLowerCase())
    .filter(Boolean)
    .join(' ');

  return terms.every((term) => haystack.includes(term));
}

function buildDistinctOptions(values: string[], formatter?: (value: string) => string) {
  const distinctValues = [...new Set(values.map((item) => item.trim()).filter(Boolean))].sort((left, right) =>
    left.localeCompare(right, 'zh-Hans-CN')
  );

  return [
    { value: '', label: '全部' },
    ...distinctValues.map((value) => ({
      value,
      label: formatter ? formatter(value) : value,
    })),
  ];
}

function describeFilterLabel(prefix: string, options: FilterOption[], value: string) {
  const label = options.find((item) => item.value === value)?.label ?? '全部';
  return `${prefix}：${label}`;
}

function readProfileField(
  item: PassengerProfileRecord,
  section: 'basicInfo' | 'tripInfo' | 'occupation' | 'riskInfo',
  field: string
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
  return value === 'admin' ? '管理员' : value === 'user' ? '员工' : value || '未填写';
}

function formatUserStatusLabel(value: string) {
  return value === 'active' ? '启用' : value === 'disabled' ? '停用' : value || '未填写';
}

function formatAuditResultLabel(value: string) {
  return value === 'success' ? '成功' : value === 'denied' ? '拒绝' : value === 'failure' ? '失败' : value || '未知';
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

      <button class="admin-logout" type="button" @click="logout">退出登录</button>
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
            <button type="button" class="ghost" @click="clearProfileFilters">清空筛选</button>
            <button type="button" class="ghost ghost--strong" @click="openCreateProfileForm">
              {{ editingProfileId ? '继续编辑' : '新增基础画像' }}
            </button>
          </div>
        </div>

        <p class="admin-filter-summary">当前筛选后 {{ filteredProfiles.length }} 条基础画像。</p>

        <div class="admin-table">
          <article v-for="item in filteredProfiles" :key="item.id" class="admin-row admin-row--profile">
            <div class="admin-row__profile-content">
              <div class="admin-row__headline">
                <strong>{{ item.fullName }}</strong>
                <span class="admin-row__pill">{{ formatDocumentTypeLabel(readProfileField(item, 'basicInfo', 'documentType')) || '未填证件类型' }}</span>
                <span class="admin-row__pill">{{ formatGenderLabel(readProfileField(item, 'basicInfo', 'gender')) || '未填性别' }}</span>
                <span class="admin-row__identity">{{ item.documentNum }}</span>
              </div>
              <div class="admin-row__fact-list">
                <span
                  v-for="detail in buildProfileDetailEntries(item)"
                  :key="`${item.id}-${detail.label}`"
                  class="admin-row__fact"
                >
                  <span class="admin-row__fact-label">{{ detail.label }}</span>
                  <strong class="admin-row__fact-value">{{ detail.value }}</strong>
                </span>
              </div>
              <div v-if="buildProfileRiskTags(item).length || buildProfileNotes(item).length" class="admin-row__tags">
                <span
                  v-for="tag in buildProfileRiskTags(item)"
                  :key="`${item.id}-${tag}`"
                  class="admin-row__tag"
                >
                  {{ tag }}
                </span>
                <span
                  v-for="note in buildProfileNotes(item)"
                  :key="`${item.id}-${note.label}`"
                  class="admin-row__tag admin-row__tag--muted"
                >
                  {{ note.label }}
                </span>
              </div>
            </div>
            <div class="admin-row__actions">
              <button type="button" @click="editProfile(item)">编辑</button>
              <button type="button" class="danger" @click="removeProfile(item.id)">删除</button>
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
            <button type="button" class="ghost" @click="clearWatchlistFilters">清空检索</button>
            <button type="button" class="ghost ghost--strong" @click="openCreateWatchlistForm">
              {{ editingWatchlistId ? '继续编辑' : '新增高风险名单' }}
            </button>
          </div>
        </div>

        <p class="admin-filter-summary">当前筛选后 {{ filteredWatchlist.length }} 条高风险名单。</p>

        <div class="admin-table">
          <article v-for="item in filteredWatchlist" :key="item.id" class="admin-row">
            <div>
              <strong>{{ item.documentNum }}</strong>
              <p>{{ item.riskReason || '高风险名单命中' }}</p>
            </div>
            <div class="admin-row__actions">
              <button type="button" @click="editWatchlist(item)">编辑</button>
              <button type="button" class="danger" @click="removeWatchlist(item.id)">删除</button>
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
              <button type="button" class="ghost" @click="clearAuditFilters">清空筛选</button>
              <button type="button" class="ghost ghost--strong" @click="loadAuditLogs">刷新日志</button>
            </div>
          </div>

          <p class="admin-filter-summary">当前筛选后 {{ filteredAuditLogs.length }} 条审计日志。</p>

          <div class="admin-audit-list">
            <article v-for="item in filteredAuditLogs" :key="item.id" class="admin-audit-item">
              <div class="admin-audit-item__head">
                <div>
                  <strong>{{ item.resource }}</strong>
                  <p>{{ item.action }}</p>
                </div>
                <span
                  class="admin-row__status"
                  :class="item.result === 'success' ? 'is-active' : 'is-disabled'"
                >
                  <span class="admin-row__status-dot"></span>
                  {{ formatAuditResultLabel(item.result) }}
                </span>
              </div>
              <div class="admin-audit-item__meta">
                <span>{{ formatAuditTime(item.createdAt) }}</span>
                <span>{{ item.actorName || '未知操作人' }} / {{ item.actorWorkId || '-' }}</span>
                <span>{{ item.method }} {{ item.path }}</span>
                <span>状态码 {{ item.statusCode }}</span>
              </div>
            </article>
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
            <button type="button" class="ghost" @click="clearUserFilters">清空筛选</button>
            <button type="button" class="ghost ghost--strong" @click="openCreateUserForm">
              {{ userForm.id ? '继续编辑' : '新增用户' }}
            </button>
          </div>
        </div>

        <p class="admin-filter-summary">当前筛选后 {{ filteredUsers.length }} 个用户。</p>

        <div class="admin-user-table-wrap">
          <table class="admin-user-table">
            <thead>
              <tr>
                <th>工号</th>
                <th>姓名</th>
                <th>角色</th>
                <th>状态</th>
                <th class="is-actions">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredUsers" :key="item.id">
                <td>{{ item.workId }}</td>
                <td>
                  <strong class="admin-user-table__name">{{ item.name }}</strong>
                </td>
                <td>
                  <span class="admin-row__pill">{{ formatUserRoleLabel(item.role) }}</span>
                </td>
                <td>
                  <span
                    class="admin-row__status"
                    :class="item.status === 'active' ? 'is-active' : 'is-disabled'"
                  >
                    <span class="admin-row__status-dot"></span>
                    {{ formatUserStatusLabel(item.status) }}
                  </span>
                </td>
                <td class="is-actions">
                  <div class="admin-user-table__actions">
                    <button type="button" @click="editUser(item)">编辑</button>
                    <button
                      type="button"
                      :class="item.status === 'active' ? 'danger' : ''"
                      @click="toggleUserStatus(item)"
                    >
                      {{ item.status === 'active' ? '停用' : '启用' }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </template>
      </section>
    </section>
  </main>

  <Teleport to="body">
    <section v-if="isProfileFormVisible" class="admin-dialog" @click.self="closeProfileForm">
      <div class="admin-form-card admin-form-card--dialog admin-form-card--profile">
        <div class="admin-form-card__header">
          <div>
            <h3>{{ editingProfileId ? '编辑基础画像' : '新增基础画像' }}</h3>
            <p>在弹窗内填写并提交基础画像信息。</p>
          </div>
          <button type="button" class="ghost" @click="closeProfileForm">关闭窗口</button>
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
          <button type="button" class="ghost" @click="closeProfileForm">取消</button>
        </div>
      </div>
    </section>
  </Teleport>

  <Teleport to="body">
    <section v-if="isWatchlistFormVisible" class="admin-dialog" @click.self="closeWatchlistForm">
      <div class="admin-form-card admin-form-card--dialog admin-form-card--watchlist">
        <div class="admin-form-card__header">
          <div>
            <h3>{{ editingWatchlistId ? '编辑高风险名单' : '新增高风险名单' }}</h3>
            <p>在弹窗内填写证件号码和高风险原因。</p>
          </div>
          <button type="button" class="ghost" @click="closeWatchlistForm">关闭窗口</button>
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
          <button type="button" class="ghost" @click="closeWatchlistForm">取消</button>
        </div>
      </div>
    </section>
  </Teleport>

  <Teleport to="body">
    <section v-if="isUserFormVisible" class="admin-dialog" @click.self="closeUserForm">
      <div class="admin-form-card admin-form-card--dialog admin-form-card--user">
        <div class="admin-form-card__header">
          <div>
            <h3>{{ userForm.id ? '编辑用户' : '新增用户' }}</h3>
            <p>在弹窗内维护工号、角色、状态和密码。</p>
          </div>
          <button type="button" class="ghost" @click="closeUserForm">关闭窗口</button>
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
            <option value="disabled" :disabled="isEditingCurrentUser">停用</option>
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
          <button type="button" class="ghost" @click="closeUserForm">取消</button>
        </div>
      </div>
    </section>
  </Teleport>
</template>

<style scoped lang="scss">
.admin-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 280px 1fr;
  background:
    linear-gradient(135deg, rgba(145, 48, 30, 0.07), transparent 36%),
    linear-gradient(180deg, #fff8f4, #f4efe9);
}

.admin-sidebar {
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
  padding: 28px;
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
  background: linear-gradient(180deg, rgba(255, 250, 246, 0.94), rgba(247, 238, 231, 0.82));
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

.admin-toolbar input,
.admin-form-grid input,
.admin-form-grid select,
.admin-form-grid textarea {
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
    grid-template-columns: 1fr;
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
