<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { clearAuthSession, loadAuthSession } from '../auth';
import {
  createAdminProfile,
  createAdminUser,
  createAdminWatchlist,
  deleteAdminProfile,
  deleteAdminWatchlist,
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
import type { PassengerProfileRecord } from '../app/profile-service';

type TabKey = 'profiles' | 'watchlist' | 'users';
type FilterPickerKey =
  | 'profiles-search'
  | 'profiles-document-type'
  | 'profiles-gender'
  | 'watchlist-search'
  | 'watchlist-reason'
  | 'users-search'
  | 'users-role'
  | 'users-status'
  | null;

interface FilterOption {
  value: string;
  label: string;
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
const session = loadAuthSession();

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'profiles', label: '基础画像' },
  { key: 'watchlist', label: '高风险名单' },
  { key: 'users', label: '管理用户' },
];

const activeTab = ref<TabKey>('profiles');
const openFilterPicker = ref<FilterPickerKey>(null);
const statusMessages = ref<Record<TabKey, string>>({
  profiles: '正在加载基础画像...',
  watchlist: '正在加载高风险名单...',
  users: '正在加载用户...',
});

const profileQuery = ref('');
const watchlistQuery = ref('');
const userQuery = ref('');

const profiles = ref<PassengerProfileRecord[]>([]);
const watchlist = ref<AdminWatchlistItem[]>([]);
const users = ref<AdminUserItem[]>([]);
const isProfileFormVisible = ref(false);
const isWatchlistFormVisible = ref(false);
const isUserFormVisible = ref(false);
const profileFilters = ref({
  documentType: '',
  gender: '',
});
const watchlistFilters = ref({
  reasonState: '',
});
const userFilters = ref({
  role: '',
  status: '',
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

const adminName = computed(() => session?.user.name || '系统管理员');
const adminWorkId = computed(() => session?.user.workId || 'admin');
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
const watchlistReasonOptions: FilterOption[] = [
  { value: '', label: '全部原因状态' },
  { value: 'filled', label: '已填写原因' },
  { value: 'empty', label: '未填写原因' },
];
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
const filteredProfiles = computed(() =>
  profiles.value.filter((item) => {
    const documentType = readProfileField(item, 'basicInfo', 'documentType');
    const gender = readProfileField(item, 'basicInfo', 'gender');

    if (profileFilters.value.documentType && documentType !== profileFilters.value.documentType) {
      return false;
    }
    if (profileFilters.value.gender && gender !== profileFilters.value.gender) {
      return false;
    }
    return true;
  })
);
const filteredWatchlist = computed(() =>
  watchlist.value.filter((item) => {
    if (watchlistFilters.value.reasonState === 'filled') {
      return Boolean(item.riskReason?.trim());
    }
    if (watchlistFilters.value.reasonState === 'empty') {
      return !item.riskReason?.trim();
    }
    return true;
  })
);
const filteredUsers = computed(() =>
  users.value.filter((item) => {
    if (userFilters.value.role && item.role !== userFilters.value.role) {
      return false;
    }
    if (userFilters.value.status && item.status !== userFilters.value.status) {
      return false;
    }
    return true;
  })
);
const selectedProfileDocumentTypeLabel = computed(() =>
  findSelectedLabel(profileDocumentTypeOptions.value, profileFilters.value.documentType, '证件类型')
);
const selectedProfileGenderLabel = computed(() =>
  findSelectedLabel(profileGenderOptions.value, profileFilters.value.gender, '性别')
);
const selectedWatchlistReasonLabel = computed(() =>
  findSelectedLabel(watchlistReasonOptions, watchlistFilters.value.reasonState, '原因状态')
);
const selectedUserRoleLabel = computed(() =>
  findSelectedLabel(userRoleOptions, userFilters.value.role, '角色')
);
const selectedUserStatusLabel = computed(() =>
  findSelectedLabel(userStatusOptions, userFilters.value.status, '状态')
);

onMounted(() => {
  void refreshAll();
  if (typeof document !== 'undefined') {
    document.addEventListener('click', handleDocumentClick);
  }
});

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('click', handleDocumentClick);
  }
});

async function refreshAll() {
  await Promise.all([loadProfiles(), loadWatchlist(), loadUsers()]);
}

async function loadProfiles() {
  const result = await listAdminProfiles(profileQuery.value);
  profiles.value = result.items;
  statusMessages.value.profiles = `已加载基础画像 ${result.total} 条。`;
}

async function loadWatchlist() {
  const result = await listAdminWatchlist(watchlistQuery.value);
  watchlist.value = result.items;
  statusMessages.value.watchlist = `已加载高风险名单 ${result.total} 条。`;
}

async function loadUsers() {
  const result = await listAdminUsers(userQuery.value);
  users.value = result.items;
  statusMessages.value.users = `已加载用户 ${result.total} 条。`;
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
  editingProfileId.value = item.id;
  profileForm.value = mapProfileToForm(item);
  isProfileFormVisible.value = true;
}

function editWatchlist(item: AdminWatchlistItem) {
  editingWatchlistId.value = item.id;
  watchlistForm.value = {
    documentNum: item.documentNum,
    riskReason: item.riskReason,
  };
  isWatchlistFormVisible.value = true;
}

function editUser(item: AdminUserItem) {
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
    if (userForm.value.id) {
      await updateAdminUser(userForm.value.id, userForm.value);
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
    await updateAdminUserStatus(item.id, nextStatus);
    statusMessages.value.users = `用户已${nextStatus === 'active' ? '启用' : '停用'}。`;
    await loadUsers();
  } catch (error) {
    statusMessages.value.users =
      error instanceof Error ? error.message : '更新用户状态失败。';
  }
}

async function logout() {
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

function selectTab(tabKey: TabKey) {
  activeTab.value = tabKey;
  openFilterPicker.value = null;
}

function toggleFilterPicker(key: Exclude<FilterPickerKey, null>) {
  openFilterPicker.value = openFilterPicker.value === key ? null : key;
}

function openCreateProfileForm() {
  resetProfileForm();
  isProfileFormVisible.value = true;
}

function openCreateWatchlistForm() {
  resetWatchlistForm();
  isWatchlistFormVisible.value = true;
}

function openCreateUserForm() {
  resetUserForm();
  isUserFormVisible.value = true;
}

function closeProfileForm() {
  resetProfileForm();
  isProfileFormVisible.value = false;
}

function closeWatchlistForm() {
  resetWatchlistForm();
  isWatchlistFormVisible.value = false;
}

function closeUserForm() {
  resetUserForm();
  isUserFormVisible.value = false;
}

function clearProfileFilters() {
  profileQuery.value = '';
  profileFilters.value.documentType = '';
  profileFilters.value.gender = '';
  openFilterPicker.value = null;
  void loadProfiles();
}

function clearWatchlistFilters() {
  watchlistQuery.value = '';
  watchlistFilters.value.reasonState = '';
  openFilterPicker.value = null;
  void loadWatchlist();
}

function clearUserFilters() {
  userQuery.value = '';
  userFilters.value.role = '';
  userFilters.value.status = '';
  openFilterPicker.value = null;
  void loadUsers();
}

function applyProfileDocumentTypeFilter(value: string) {
  profileFilters.value.documentType = value;
  openFilterPicker.value = null;
}

function applyProfileGenderFilter(value: string) {
  profileFilters.value.gender = value;
  openFilterPicker.value = null;
}

function applyWatchlistReasonFilter(value: string) {
  watchlistFilters.value.reasonState = value;
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

function submitProfileSearch() {
  openFilterPicker.value = null;
  void loadProfiles();
}

function submitWatchlistSearch() {
  openFilterPicker.value = null;
  void loadWatchlist();
}

function submitUserSearch() {
  openFilterPicker.value = null;
  void loadUsers();
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

function findSelectedLabel(options: FilterOption[], value: string, fallbackPrefix: string) {
  return options.find((item) => item.value === value)?.label ?? `${fallbackPrefix}：全部`;
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
          <div class="filter-picker">
            <button
              class="filter-chip"
              :class="{ 'is-active': profileQuery.trim() }"
              type="button"
              @click.stop="toggleFilterPicker('profiles-search')"
            >
              {{ profileQuery.trim() ? `检索：${profileQuery}` : '手动检索' }}
            </button>
            <div
              v-if="openFilterPicker === 'profiles-search'"
              class="filter-picker__menu filter-picker__menu--search"
              @click.stop
            >
              <input
                v-model="profileQuery"
                type="text"
                placeholder="输入证件号或姓名"
                @keyup.enter="submitProfileSearch"
              />
              <div class="filter-picker__actions">
                <button type="button" @click="submitProfileSearch">确定</button>
                <button type="button" class="ghost" @click="profileQuery = ''">清空</button>
              </div>
            </div>
          </div>
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

        <p class="admin-filter-summary">当前筛选后 {{ filteredProfiles.length }} 条基础画像。</p>

        <section v-if="isProfileFormVisible" class="admin-form-card">
          <div class="admin-form-card__header">
            <div>
              <h3>{{ editingProfileId ? '编辑基础画像' : '新增基础画像' }}</h3>
              <p>表单默认收起，只有新增或编辑时展开。</p>
            </div>
            <button type="button" class="ghost" @click="closeProfileForm">收起表单</button>
          </div>

          <div class="admin-form-grid">
            <input v-model="profileForm.documentNum" type="text" placeholder="证件号码" />
            <input v-model="profileForm.fullName" type="text" placeholder="姓名" />
            <input v-model="profileForm.documentType" type="text" placeholder="证件类型" />
            <input v-model="profileForm.nationality" type="text" placeholder="国籍" />
            <input v-model="profileForm.gender" type="text" placeholder="性别" />
            <input v-model="profileForm.birthDate" type="text" placeholder="出生日期" />
            <input v-model="profileForm.phone" type="text" placeholder="联系电话" />
            <input v-model="profileForm.pnr" type="text" placeholder="订票编码 PNR" />
            <input v-model="profileForm.flightNo" type="text" placeholder="航班号" />
            <input v-model="profileForm.destination" type="text" placeholder="目的地" />
            <input v-model="profileForm.purpose" type="text" placeholder="出行目的" />
            <input v-model="profileForm.occupation" type="text" placeholder="职业" />
            <input v-model="profileForm.company" type="text" placeholder="工作单位" />
            <input v-model="profileForm.riskTags" type="text" placeholder="风险标签，多个用逗号分隔" />
            <textarea v-model="profileForm.criminalRecord" placeholder="违法犯罪记录"></textarea>
            <textarea v-model="profileForm.remark" placeholder="备注"></textarea>
          </div>

          <div class="admin-form-actions">
            <button type="button" @click="submitProfile">
              {{ editingProfileId ? '更新基础画像' : '新增基础画像' }}
            </button>
            <button type="button" class="ghost" @click="closeProfileForm">取消</button>
          </div>
        </section>

        <div class="admin-table">
          <article v-for="item in filteredProfiles" :key="item.id" class="admin-row">
            <div>
              <strong>{{ item.fullName }}</strong>
              <p>{{ item.documentNum }}</p>
              <p>{{ buildProfileSummary(item) }}</p>
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
          <div class="filter-picker">
            <button
              class="filter-chip"
              :class="{ 'is-active': watchlistQuery.trim() }"
              type="button"
              @click.stop="toggleFilterPicker('watchlist-search')"
            >
              {{ watchlistQuery.trim() ? `检索：${watchlistQuery}` : '手动检索' }}
            </button>
            <div
              v-if="openFilterPicker === 'watchlist-search'"
              class="filter-picker__menu filter-picker__menu--search"
              @click.stop
            >
              <input
                v-model="watchlistQuery"
                type="text"
                placeholder="输入证件号或原因"
                @keyup.enter="submitWatchlistSearch"
              />
              <div class="filter-picker__actions">
                <button type="button" @click="submitWatchlistSearch">确定</button>
                <button type="button" class="ghost" @click="watchlistQuery = ''">清空</button>
              </div>
            </div>
          </div>
          <div class="filter-picker">
            <button
              class="filter-chip"
              :class="{ 'is-active': watchlistFilters.reasonState }"
              type="button"
              @click.stop="toggleFilterPicker('watchlist-reason')"
            >
              {{ selectedWatchlistReasonLabel }}
            </button>
            <div
              v-if="openFilterPicker === 'watchlist-reason'"
              class="filter-picker__menu"
              @click.stop
            >
              <button
                v-for="option in watchlistReasonOptions"
                :key="option.value || 'all-watchlist-reason'"
                type="button"
                @click="applyWatchlistReasonFilter(option.value)"
              >
                {{ option.label }}
              </button>
            </div>
          </div>
          <button type="button" class="ghost" @click="clearWatchlistFilters">清空筛选</button>
          <button type="button" class="ghost ghost--strong" @click="openCreateWatchlistForm">
            {{ editingWatchlistId ? '继续编辑' : '新增高风险名单' }}
          </button>
        </div>

        <p class="admin-filter-summary">当前筛选后 {{ filteredWatchlist.length }} 条高风险名单。</p>

        <section v-if="isWatchlistFormVisible" class="admin-form-card">
          <div class="admin-form-card__header">
            <div>
              <h3>{{ editingWatchlistId ? '编辑高风险名单' : '新增高风险名单' }}</h3>
              <p>证件号码保留手动输入，高风险原因为选填。</p>
            </div>
            <button type="button" class="ghost" @click="closeWatchlistForm">收起表单</button>
          </div>

          <div class="admin-form-grid">
            <input v-model="watchlistForm.documentNum" type="text" placeholder="证件号码" />
            <textarea v-model="watchlistForm.riskReason" placeholder="高风险原因"></textarea>
          </div>

          <div class="admin-form-actions">
            <button type="button" @click="submitWatchlist">
              {{ editingWatchlistId ? '更新高风险名单' : '新增高风险名单' }}
            </button>
            <button type="button" class="ghost" @click="closeWatchlistForm">取消</button>
          </div>
        </section>

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
        <div class="admin-toolbar">
          <div class="filter-picker">
            <button
              class="filter-chip"
              :class="{ 'is-active': userQuery.trim() }"
              type="button"
              @click.stop="toggleFilterPicker('users-search')"
            >
              {{ userQuery.trim() ? `检索：${userQuery}` : '手动检索' }}
            </button>
            <div
              v-if="openFilterPicker === 'users-search'"
              class="filter-picker__menu filter-picker__menu--search"
              @click.stop
            >
              <input
                v-model="userQuery"
                type="text"
                placeholder="输入工号或姓名"
                @keyup.enter="submitUserSearch"
              />
              <div class="filter-picker__actions">
                <button type="button" @click="submitUserSearch">确定</button>
                <button type="button" class="ghost" @click="userQuery = ''">清空</button>
              </div>
            </div>
          </div>
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

        <p class="admin-filter-summary">当前筛选后 {{ filteredUsers.length }} 个用户。</p>

        <section v-if="isUserFormVisible" class="admin-form-card">
          <div class="admin-form-card__header">
            <div>
              <h3>{{ userForm.id ? '编辑用户' : '新增用户' }}</h3>
              <p>角色和状态属于低基数字段，筛选时已收纳为按钮选择。</p>
            </div>
            <button type="button" class="ghost" @click="closeUserForm">收起表单</button>
          </div>

          <div class="admin-form-grid">
            <input v-model="userForm.workId" type="text" placeholder="工号" />
            <input v-model="userForm.name" type="text" placeholder="姓名" />
            <select v-model="userForm.role">
              <option value="user">员工</option>
              <option value="admin">管理员</option>
            </select>
            <select v-model="userForm.status">
              <option value="active">启用</option>
              <option value="disabled">停用</option>
            </select>
            <input v-model="userForm.password" type="password" placeholder="密码（修改时可留空）" />
          </div>

          <div class="admin-form-actions">
            <button type="button" @click="submitUser">
              {{ userForm.id ? '更新用户' : '新增用户' }}
            </button>
            <button type="button" class="ghost" @click="closeUserForm">取消</button>
          </div>
        </section>

        <div class="admin-table">
          <article v-for="item in filteredUsers" :key="item.id" class="admin-row">
            <div>
              <strong>{{ item.name }} · {{ item.workId }}</strong>
              <p>{{ item.role === 'admin' ? '管理员' : '员工' }} · {{ item.status }}</p>
            </div>
            <div class="admin-row__actions">
              <button type="button" @click="editUser(item)">编辑</button>
              <button type="button" class="ghost" @click="toggleUserStatus(item)">
                {{ item.status === 'active' ? '停用' : '启用' }}
              </button>
            </div>
          </article>
        </div>
      </section>
    </section>
  </main>
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
.admin-row__actions button {
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
  align-items: center;
}

.admin-form-grid {
  align-items: stretch;
}

.admin-form-grid > * {
  flex: 1 1 280px;
}

.admin-form-grid textarea {
  min-height: 120px;
  flex-basis: 100%;
}

.admin-filter-summary {
  margin: 0 0 18px;
  color: #7a5c50;
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

.admin-toolbar button,
.admin-form-actions button,
.admin-row__actions button {
  background: linear-gradient(135deg, #b55339, #e27f55);
  color: #fff;
}

.admin-toolbar button.ghost,
.admin-form-actions button.ghost,
.admin-row__actions button.ghost {
  background: #f3e7de;
  color: #7c5140;
}

.admin-toolbar button.ghost--strong {
  background: #ecd3c7;
  color: #6f3e31;
}

.admin-row__actions button.danger {
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
}

.filter-chip {
  padding: 0 14px;
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

.filter-picker__menu--search {
  min-width: 280px;
}

.filter-picker__actions {
  display: flex;
  gap: 8px;
}

.filter-picker__actions button {
  min-height: 38px;
  padding: 0 12px;
  border-radius: 12px;
}

.filter-picker__actions button.ghost {
  background: #f3e7de;
  color: #7c5140;
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
  align-items: center;
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

.admin-row__actions {
  display: flex;
  gap: 10px;
}

@media (max-width: 1100px) {
  .admin-page {
    grid-template-columns: 1fr;
  }

  .admin-form-grid > * {
    flex-basis: 100%;
  }

  .admin-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .admin-form-card__header {
    flex-direction: column;
  }
}
</style>
