<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
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
const currentStatusMessage = computed(() => statusMessages.value[activeTab.value]);

onMounted(() => {
  void refreshAll();
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
}

function editWatchlist(item: AdminWatchlistItem) {
  editingWatchlistId.value = item.id;
  watchlistForm.value = {
    documentNum: item.documentNum,
    riskReason: item.riskReason,
  };
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
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </nav>

      <button class="admin-logout" type="button" @click="logout">退出登录</button>
    </aside>

    <section class="admin-content">
      <header class="admin-header">
        <div>
          <p class="admin-header__eyebrow">管理状态</p>
          <h2>{{ tabs.find((item) => item.key === activeTab)?.label }}</h2>
        </div>
        <span class="admin-status">{{ currentStatusMessage }}</span>
      </header>

      <section v-if="activeTab === 'profiles'" class="admin-panel">
        <div class="admin-toolbar">
          <input v-model="profileQuery" type="text" placeholder="按证件号或姓名筛选" />
          <button type="button" @click="loadProfiles">筛选</button>
          <button type="button" class="ghost" @click="resetProfileForm">清空表单</button>
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
          <button type="button" @click="submitProfile">
            {{ editingProfileId ? '更新基础画像' : '新增基础画像' }}
          </button>
        </div>

        <div class="admin-table">
          <article v-for="item in profiles" :key="item.id" class="admin-row">
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
          <input v-model="watchlistQuery" type="text" placeholder="按证件号或原因筛选" />
          <button type="button" @click="loadWatchlist">筛选</button>
          <button type="button" class="ghost" @click="resetWatchlistForm">清空表单</button>
        </div>

        <div class="admin-form-grid">
          <input v-model="watchlistForm.documentNum" type="text" placeholder="证件号码" />
          <textarea v-model="watchlistForm.riskReason" placeholder="高风险原因"></textarea>
          <button type="button" @click="submitWatchlist">
            {{ editingWatchlistId ? '更新高风险名单' : '新增高风险名单' }}
          </button>
        </div>

        <div class="admin-table">
          <article v-for="item in watchlist" :key="item.id" class="admin-row">
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
          <input v-model="userQuery" type="text" placeholder="按工号、姓名或角色筛选" />
          <button type="button" @click="loadUsers">筛选</button>
          <button type="button" class="ghost" @click="resetUserForm">清空表单</button>
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
          <button type="button" @click="submitUser">
            {{ userForm.id ? '更新用户' : '新增用户' }}
          </button>
        </div>

        <div class="admin-table">
          <article v-for="item in users" :key="item.id" class="admin-row">
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
.admin-form-grid button,
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

.admin-header,
.admin-panel {
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(204, 179, 164, 0.5);
  box-shadow: 0 18px 36px rgba(52, 28, 20, 0.08);
}

.admin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 24px;
}

.admin-status {
  padding: 10px 14px;
  border-radius: 999px;
  background: #f8ece4;
  color: #7a4f3e;
  font-size: 0.92rem;
}

.admin-panel {
  margin-top: 20px;
  padding: 20px;
}

.admin-toolbar,
.admin-form-grid {
  display: grid;
  gap: 12px;
  margin-bottom: 18px;
}

.admin-toolbar {
  grid-template-columns: minmax(220px, 1fr) 120px 120px;
}

.admin-form-grid {
  grid-template-columns: repeat(2, minmax(220px, 1fr));
}

.admin-form-grid textarea {
  min-height: 120px;
  grid-column: 1 / -1;
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
.admin-form-grid button,
.admin-row__actions button {
  background: linear-gradient(135deg, #b55339, #e27f55);
  color: #fff;
}

.admin-toolbar button.ghost,
.admin-row__actions button.ghost {
  background: #f3e7de;
  color: #7c5140;
}

.admin-row__actions button.danger {
  background: #f4d7d0;
  color: #8a3325;
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

  .admin-toolbar,
  .admin-form-grid {
    grid-template-columns: 1fr;
  }

  .admin-row {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
