<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { openTouchInput } from '../app/touch-input';
import {
  searchPassengerProfiles,
  type PassengerProfileRecord,
} from '../app/profile-service';

interface ProfileDetailEntry {
  label: string;
  value: string;
}

const router = useRouter();

const query = ref('');
const touchInputHint = '单击正常输入，双击打开触控键盘';
const results = ref<PassengerProfileRecord[]>([]);
const recentSearches = ref<string[]>([]);
const searchStatus = ref('');
const isSearching = ref(false);

function handleProfilesImported() {
  void loadProfiles(query.value);
}

onMounted(() => {
  void loadProfiles();
  window.addEventListener('ipra:profiles-imported', handleProfilesImported);
});

onBeforeUnmount(() => {
  window.removeEventListener('ipra:profiles-imported', handleProfilesImported);
});

async function loadProfiles(rawValue = query.value) {
  const trimmed = rawValue.trim();
  query.value = trimmed;
  isSearching.value = true;
  searchStatus.value = trimmed ? '正在检索旅客画像...' : '正在加载最新画像记录...';

  try {
    const profiles = await searchPassengerProfiles(trimmed);
    results.value = profiles;

    if (trimmed) {
      recentSearches.value = [
        trimmed,
        ...recentSearches.value.filter((item) => item !== trimmed),
      ].slice(0, 4);
    }

    if (trimmed) {
      searchStatus.value = results.value.length
        ? `已检索到 ${results.value.length} 条匹配记录。`
        : `未找到与 "${trimmed}" 匹配的旅客记录。`;
    } else {
      searchStatus.value = results.value.length ? '' : '当前暂无已导入画像，请先导入文件。';
    }
  } catch (error) {
    results.value = [];
    searchStatus.value = normalizeErrorMessage(error, '查询旅客画像失败，请稍后重试。');
  } finally {
    isSearching.value = false;
  }
}

async function submitSearch() {
  await loadProfiles();
}

async function openSearchKeyboard() {
  const value = await openTouchInput({
    title: '检索旅客画像',
    description: '输入完成后点击确认，系统会自动发起检索。',
    placeholder: '输入旅客证件号、姓名或订票编码 (PNR)',
    value: query.value,
    inputMode: 'search',
    confirmText: '确认检索',
  });

  if (value == null) {
    return;
  }

  query.value = value;
  await loadProfiles(value);
}

async function applyRecentSearch(item: string) {
  query.value = item;
  await loadProfiles(item);
}

async function openAskWorkspace() {
  await router.push({ name: 'home-ask' });
}

function buildRouteLabel(tripInfo: Record<string, unknown>) {
  const route = asString(tripInfo.route);
  if (route) {
    return route;
  }

  const flightNo = asString(tripInfo.flightNo);
  const origin = asString(tripInfo.origin);
  const destination = asString(tripInfo.destination);

  if (flightNo && origin && destination) {
    return `${flightNo} (${origin} -> ${destination})`;
  }
  if (origin && destination) {
    return `${origin} -> ${destination}`;
  }
  if (destination) {
    return `目的地 ${destination}`;
  }
  return '未录入行程信息';
}

function buildWatchTags(
  profile: PassengerProfileRecord,
  riskRecords: Array<Record<string, unknown>>,
  riskTags: string[]
) {
  const tags = [...riskTags];

  for (const record of riskRecords) {
    const type = asString(record.type);
    if (type) {
      tags.push(type);
    }
  }

  if (profile.isHighRisk) {
    tags.unshift('高风险名单');
  }

  const unique = [...new Set(tags.filter(Boolean))];
  return unique.slice(0, 4);
}

function buildResultDetailEntries(profile: PassengerProfileRecord): ProfileDetailEntry[] {
  const profileData = asRecord(profile.profileData);
  const basicInfo = asRecord(profileData.basicInfo);
  const tripInfo = asRecord(profileData.tripInfo);
  const occupation = asRecord(profileData.occupation);
  const occupationSummary = [asString(occupation.occupation), asString(occupation.company)]
    .filter(Boolean)
    .join(' · ');

  return [
    { label: '国籍', value: asString(basicInfo.nationality) || '未填写' },
    { label: '出生', value: asString(basicInfo.birthDate) || '未填写' },
    { label: '电话', value: asString(basicInfo.phone) || '未填写' },
    { label: 'PNR', value: asString(tripInfo.pnr) || '未填写' },
    { label: '航班', value: asString(tripInfo.flightNo) || '未填写' },
    { label: '目的地', value: asString(tripInfo.destination) || '未填写' },
    { label: '目的', value: asString(tripInfo.purposeDeclared) || '未填写' },
    { label: '职业 / 单位', value: occupationSummary || '未填写' },
  ];
}

function buildResultTags(profile: PassengerProfileRecord) {
  const profileData = asRecord(profile.profileData);
  const riskInfo = asRecord(profileData.riskInfo);
  const riskTags = asStringArray(riskInfo.riskTags);
  const riskRecords = Object.keys(riskInfo).length ? [riskInfo] : [];
  return buildWatchTags(profile, riskRecords, riskTags);
}

function buildResultNotes(profile: PassengerProfileRecord): ProfileDetailEntry[] {
  const profileData = asRecord(profile.profileData);
  const riskInfo = asRecord(profileData.riskInfo);
  const notes: ProfileDetailEntry[] = [];

  if (asString(profile.riskReason)) {
    notes.push({
      label: '预警原因',
      value: asString(profile.riskReason),
    });
  }

  if (asString(riskInfo.criminalRecord)) {
    notes.push({
      label: '违法犯罪记录',
      value: asString(riskInfo.criminalRecord),
    });
  }

  if (asString(riskInfo.note)) {
    notes.push({
      label: '备注',
      value: asString(riskInfo.note),
    });
  }

  return notes;
}

function readProfileField(
  profile: PassengerProfileRecord,
  section: 'basicInfo' | 'tripInfo' | 'occupation' | 'riskInfo',
  field: string
) {
  const profileData = asRecord(profile.profileData);
  const sectionData = asRecord(profileData[section]);
  return asString(sectionData[field]);
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

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || Array.isArray(value) || typeof value !== 'object') {
    return {};
  }
  return value as Record<string, unknown>;
}

function asRecordArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => asRecord(item)).filter((item) => Object.keys(item).length > 0);
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter((item) => item.length > 0);
}

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function formatDateTime(value: string) {
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
  });
}

function normalizeErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}
</script>

<template>
  <section class="user-page">
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
          <input
            id="passenger-query"
            v-model="query"
            :title="touchInputHint"
            type="text"
            placeholder="输入旅客证件号、姓名或订票编码 (PNR)"
            @dblclick.stop.prevent="openSearchKeyboard"
          />
          <button type="submit" :disabled="isSearching">
            {{ isSearching ? '检索中...' : '查询' }}
          </button>
        </label>

        <p v-if="searchStatus" class="status-copy">{{ searchStatus }}</p>

        <div v-if="recentSearches.length" class="tag-row">
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
          class="result-strip"
          :class="{ 'is-high-risk': record.isHighRisk }"
        >
          <div class="result-strip__content">
            <div class="result-strip__headline">
              <strong>{{ record.fullName }}</strong>
              <span v-if="record.isHighRisk" class="result-strip__pill is-high-risk">高风险预警</span>
              <span class="result-strip__pill">
                {{ formatDocumentTypeLabel(readProfileField(record, 'basicInfo', 'documentType')) || '未填证件类型' }}
              </span>
              <span class="result-strip__pill">
                {{ formatGenderLabel(readProfileField(record, 'basicInfo', 'gender')) || '未填性别' }}
              </span>
              <span class="result-strip__identity">{{ record.documentNum }}</span>
            </div>

            <div class="result-strip__fact-list">
              <span
                v-for="detail in buildResultDetailEntries(record)"
                :key="`${record.id}-${detail.label}`"
                class="result-strip__fact"
              >
                <span class="result-strip__fact-label">{{ detail.label }}</span>
                <strong class="result-strip__fact-value">{{ detail.value }}</strong>
              </span>
            </div>

            <div
              v-if="buildResultTags(record).length || buildResultNotes(record).length"
              class="result-strip__tags"
            >
              <span
                v-for="tag in buildResultTags(record)"
                :key="`${record.id}-${tag}`"
                class="result-strip__tag"
              >
                {{ tag }}
              </span>
              <span
                v-for="note in buildResultNotes(record)"
                :key="`${record.id}-${note.label}`"
                class="result-strip__tag result-strip__tag--muted"
              >
                {{ note.label }}
              </span>
            </div>
          </div>

          <div class="result-strip__actions">
            <button class="primary-action" type="button" @click="openAskWorkspace">
              发起辅助问询
            </button>
          </div>
        </article>
      </div>

      <div v-else class="empty-state">
        <p>当前没有匹配记录。</p>
        <span>请尝试其他证件号、PNR，或重新导入批量文件。</span>
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

.surface-card,
.result-card,
.stat-card,
.empty-state {
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(157, 189, 202, 0.36);
  box-shadow: 0 22px 46px rgba(14, 40, 48, 0.08);
}

.panel-heading,
.block-heading,
.identity-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

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

.status-copy,
.result-grid p,
.empty-state span,
.stat-card p,
.identity-card p {
  color: #5b7179;
  line-height: 1.6;
}

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
  padding: 18px 20px;
}

.surface-card--search {
  display: grid;
  gap: 10px;
  padding: 14px 18px;
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
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 8px 8px 8px 12px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.4);
}

.search-box input {
  min-width: 0;
  padding: 6px 2px;
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

.search-box button:disabled,
.primary-action:disabled,
.secondary-action:disabled,
.text-action:disabled {
  cursor: wait;
  opacity: 0.68;
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

.tag-chip--active {
  background: rgba(11, 114, 136, 0.16);
  color: #09596c;
}

.status-copy {
  margin: 0;
}

.results-list {
  display: grid;
  gap: 14px;
  margin-top: 16px;
}

.result-strip {
  position: relative;
  display: flex;
  align-items: stretch;
  gap: 18px;
  padding: 16px 18px 16px 24px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(157, 189, 202, 0.36);
  box-shadow: 0 22px 46px rgba(14, 40, 48, 0.08);
  overflow: hidden;
}

.result-strip::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 6px;
  background: linear-gradient(180deg, #0b7288, #20a8c5);
}

.result-strip.is-high-risk::before {
  background: linear-gradient(180deg, #c75c47, #de876d);
}

.result-strip__content {
  min-width: 0;
  flex: 1 1 auto;
  display: grid;
  gap: 10px;
}

.result-strip__headline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 10px;
}

.result-strip__headline strong {
  color: #15252b;
}

.result-strip__pill,
.result-strip__identity,
.result-strip__tag {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
}

.result-strip__pill {
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(157, 189, 202, 0.48);
  color: #43646e;
}

.result-strip__pill.is-imported {
  background: rgba(11, 114, 136, 0.12);
  border-color: rgba(11, 114, 136, 0.18);
  color: #09596c;
}

.result-strip__pill.is-high-risk {
  background: rgba(199, 92, 71, 0.12);
  border-color: rgba(199, 92, 71, 0.16);
  color: #a24734;
}

.result-strip__identity {
  background: rgba(217, 238, 244, 0.92);
  color: #09596c;
}

.result-strip__fact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
}

.result-strip__fact {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 34px;
  padding: 0 10px;
  border-radius: 12px;
  background: #fbfeff;
  border: 1px solid rgba(157, 189, 202, 0.36);
}

.result-strip__fact-label {
  color: #6c8790;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.result-strip__fact-value {
  color: #15252b;
  font-size: 0.84rem;
  font-weight: 700;
}

.result-strip__summary {
  margin: 0;
  color: #5b7179;
  line-height: 1.6;
}

.result-strip__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.result-strip__tag {
  background: rgba(11, 114, 136, 0.12);
  color: #09596c;
}

.result-strip__tag--muted {
  background: rgba(91, 113, 121, 0.12);
  color: #5b7179;
}

.result-strip__actions {
  display: flex;
  flex: 0 0 240px;
  width: 240px;
  align-items: stretch;
}

.result-strip__actions .primary-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 18px 20px;
  border-radius: 18px;
  font-size: 1.04rem;
  letter-spacing: 0.04em;
}

.result-strip.is-high-risk .result-strip__actions .primary-action {
  background: linear-gradient(135deg, #c75c47, #e07b61);
  box-shadow: 0 16px 28px rgba(199, 92, 71, 0.24);
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
  .panel-heading,
  .block-heading {
    flex-direction: column;
  }

  .result-strip {
    flex-direction: column;
  }

  .result-strip__actions {
    width: 100%;
  }

  .search-box {
    grid-template-columns: 1fr;
  }

  .search-box button {
    width: 100%;
  }
}
</style>
