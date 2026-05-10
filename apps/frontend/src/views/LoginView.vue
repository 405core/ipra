<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginWithCredentials, resolveRoleHome, saveAuthSession } from '../auth';

type FieldKey = 'workId' | 'password';
type FeedbackTone = 'neutral' | 'error' | 'success';

const workId = ref('');
const password = ref('');
const activeField = ref<FieldKey>('workId');
const capsEnabled = ref(false);
const feedback = ref('请选择输入框后使用触控键盘，或直接键入。');
const feedbackTone = ref<FeedbackTone>('neutral');
const isSubmitting = ref(false);
const router = useRouter();

const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const topLetterKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const middleLetterKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const bottomLetterKeys = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

const activeFieldLabel = computed(() =>
  activeField.value === 'workId' ? '工号' : '密码'
);

function setFeedback(message: string, tone: FeedbackTone = 'neutral') {
  feedback.value = message;
  feedbackTone.value = tone;
}

function focusField(field: FieldKey) {
  activeField.value = field;
  setFeedback(`当前输入目标：${field === 'workId' ? '工号' : '密码'}。`);
}

function updateActiveField(
  updater: (currentValue: string) => string,
  tone: FeedbackTone = 'neutral'
) {
  if (activeField.value === 'workId') {
    workId.value = updater(workId.value);
  } else {
    password.value = updater(password.value);
  }

  setFeedback(`已更新${activeFieldLabel.value}输入。`, tone);
}

function appendKey(key: string) {
  const resolvedKey =
    /^[A-Z]$/.test(key) && !capsEnabled.value ? key.toLowerCase() : key;

  updateActiveField((currentValue) => currentValue + resolvedKey);
}

function toggleCaps() {
  capsEnabled.value = !capsEnabled.value;
  setFeedback(
    `字母输入已切换为${capsEnabled.value ? '大写' : '小写'}模式。`
  );
}

function backspace() {
  updateActiveField((currentValue) => currentValue.slice(0, -1));
}

function clearActiveField() {
  updateActiveField(() => '');
  setFeedback(`已清空${activeFieldLabel.value}输入。`);
}

function insertSpace() {
  updateActiveField((currentValue) => currentValue + ' ');
}

async function submitLogin() {
  if (!workId.value.trim() || !password.value.trim()) {
    setFeedback('请输入完整的工号和密码。', 'error');
    return;
  }

  isSubmitting.value = true;

  try {
    const session = await loginWithCredentials(
      workId.value.trim(),
      password.value
    );

    saveAuthSession(session);
    setFeedback(
      `${session.user.role === 'admin' ? '管理员' : '员工'}登录成功，正在跳转。`,
      'success'
    );
    await router.push(resolveRoleHome(session.user.role));
  } catch (error) {
    setFeedback(
      error instanceof Error ? error.message : '登录失败，请稍后再试',
      'error'
    );
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <section class="login-view">
    <div class="login-view__pattern" aria-hidden="true"></div>
    <div class="login-view__glow" aria-hidden="true"></div>

    <form class="login-card" @submit.prevent="submitLogin">
      <aside class="brand-panel">
        <div class="brand-lockup">
          <div class="brand-mark">RA</div>
          <div>
            <p class="brand-name">Luminous</p>
            <p class="brand-subtitle">Risk Assessment</p>
          </div>
        </div>

        <div class="field-grid field-grid--sidebar">
          <label class="field-card" :class="{ 'is-active': activeField === 'workId' }">
            <span class="field-card__label">工号 Work ID</span>
            <div class="field-card__input-wrap">
              <span class="field-card__icon">AC</span>
              <input
                v-model="workId"
                type="text"
                inputmode="text"
                autocomplete="username"
                placeholder="输入登录工号"
                @focus="focusField('workId')"
              />
            </div>
          </label>

          <label
            class="field-card"
            :class="{ 'is-active': activeField === 'password' }"
          >
            <span class="field-card__label">密码 Password</span>
            <div class="field-card__input-wrap">
              <span class="field-card__icon">PW</span>
              <input
                v-model="password"
                type="password"
                autocomplete="current-password"
                placeholder="输入通行密码"
                @focus="focusField('password')"
              />
            </div>
          </label>
        </div>

        <div class="brand-copy">
          <h1>智能旅客风险评估系统</h1>
          <p>
            高精度的数据分析引擎。请验证您的身份以进入安全评估终端，所有操作均通过加密链路审计。
          </p>
        </div>

        <div class="system-pill">
          <span class="system-pill__dot"></span>
          <span>系统运行正常</span>
          <span class="system-pill__divider"></span>
          <span>安全连接已建立</span>
        </div>
      </aside>

      <section class="form-panel">
        <div class="form-panel__body">
          <div class="keyboard-header">
            <div class="keyboard-header__line"></div>
            <span class="keyboard-header__title">触控键盘输入区</span>
            <div class="keyboard-header__line"></div>
          </div>

          <div class="keyboard-meta">
            <span class="meta-pill">当前输入：{{ activeFieldLabel }}</span>
            <span class="meta-pill">字母模式：{{ capsEnabled ? '大写' : '小写' }}</span>
          </div>

          <div class="keyboard">
            <div class="keyboard-row">
              <button
                v-for="key in numberKeys"
                :key="key"
                class="key key--standard"
                type="button"
                @click="appendKey(key)"
              >
                {{ key }}
              </button>
            </div>

            <div class="keyboard-row">
              <button
                v-for="key in topLetterKeys"
                :key="key"
                class="key key--standard"
                type="button"
                @click="appendKey(key)"
              >
                {{ capsEnabled ? key : key.toLowerCase() }}
              </button>
            </div>

            <div class="keyboard-row keyboard-row--inset">
              <button
                v-for="key in middleLetterKeys"
                :key="key"
                class="key key--standard"
                type="button"
                @click="appendKey(key)"
              >
                {{ capsEnabled ? key : key.toLowerCase() }}
              </button>
            </div>

            <div class="keyboard-row keyboard-row--bottom">
              <button
                class="key key--wide key--utility"
                :class="{ 'is-toggled': capsEnabled }"
                type="button"
                @click="toggleCaps"
              >
                CAPS
              </button>
              <button
                v-for="key in bottomLetterKeys"
                :key="key"
                class="key key--standard"
                type="button"
                @click="appendKey(key)"
              >
                {{ capsEnabled ? key : key.toLowerCase() }}
              </button>
              <button class="key key--wide key--utility" type="button" @click="backspace">
                DEL
              </button>
            </div>

            <div class="keyboard-row keyboard-row--actions">
              <button class="key key--action key--clear" type="button" @click="clearActiveField">
                清空
              </button>
              <button class="key key--space" type="button" @click="insertSpace">
                SPACE
              </button>
              <button
                class="key key--action key--submit"
                type="submit"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? '登录中...' : '登录' }}
              </button>
            </div>
          </div>

          <p class="form-feedback" :class="`is-${feedbackTone}`">
            {{ feedback }}
          </p>
        </div>
      </section>
    </form>
  </section>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap');

.login-view {
  --color-bg: #f3f8fb;
  --color-panel: #ffffff;
  --color-panel-muted: #eef5f8;
  --color-panel-strong: #e2edf2;
  --color-primary: #0d728a;
  --color-primary-strong: #0a5566;
  --color-primary-soft: #d8f1f8;
  --color-text: #122126;
  --color-text-muted: #52656d;
  --color-danger: #bc3a2b;
  --color-success: #16936a;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 20px;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at top left, rgba(13, 114, 138, 0.1), transparent 32%),
    radial-gradient(circle at bottom right, rgba(37, 178, 214, 0.14), transparent 28%),
    var(--color-bg);
  color: var(--color-text);
  font-family: 'IBM Plex Sans', sans-serif;
}

.login-view__pattern,
.login-view__glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.login-view__pattern {
  opacity: 0.35;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(13, 114, 138, 0.14) 1px, transparent 0);
  background-size: 36px 36px;
}

.login-view__glow {
  inset: auto;
  width: min(72vw, 860px);
  height: min(72vw, 860px);
  left: 50%;
  top: 50%;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  background: rgba(92, 213, 248, 0.25);
  filter: blur(120px);
}

.login-card {
  position: relative;
  z-index: 1;
  width: min(1240px, 100%);
  min-height: 680px;
  display: grid;
  grid-template-columns: minmax(280px, 0.92fr) minmax(420px, 1.5fr);
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(191, 208, 216, 0.9);
  border-radius: 28px;
  overflow: hidden;
  box-shadow:
    0 24px 64px rgba(13, 114, 138, 0.12),
    0 2px 8px rgba(18, 33, 38, 0.05);
  backdrop-filter: blur(10px);
}

.brand-panel {
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 48px;
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.7), rgba(216, 241, 248, 0.9)),
    var(--color-panel-muted);
  border-right: 1px solid rgba(191, 208, 216, 0.8);
}

.brand-lockup {
  display: flex;
  align-items: center;
  gap: 18px;
}

.brand-mark {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, var(--color-primary), #0fa0bf);
  color: #ffffff;
  font-family: 'Manrope', sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  box-shadow: 0 14px 30px rgba(13, 114, 138, 0.24);
}

.brand-name,
.brand-copy h1 {
  font-family: 'Manrope', sans-serif;
}

.brand-name {
  font-size: 1.65rem;
  font-weight: 800;
  color: var(--color-primary-strong);
  line-height: 1;
}

.brand-subtitle {
  margin-top: 6px;
  color: var(--color-text-muted);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.brand-copy {
  display: grid;
  gap: 18px;
  max-width: 32rem;
  margin-top: auto;
}

.brand-copy h1 {
  font-size: clamp(2rem, 2vw + 1.4rem, 3rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.brand-copy p {
  color: var(--color-text-muted);
  font-size: 1.05rem;
  line-height: 1.8;
}

.system-pill {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  width: fit-content;
  padding: 14px 18px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(191, 208, 216, 0.95);
  color: var(--color-text-muted);
  font-size: 0.9rem;
  font-weight: 600;
}

.system-pill__dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #16b67d;
  box-shadow: 0 0 12px rgba(22, 182, 125, 0.5);
}

.system-pill__divider {
  width: 1px;
  height: 14px;
  background: rgba(143, 171, 183, 0.7);
}

.form-panel {
  display: grid;
  align-items: center;
  padding: 36px;
  background: rgba(255, 255, 255, 0.9);
}

.form-panel__body {
  width: min(820px, 100%);
  margin: 0 auto;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.field-grid--sidebar {
  grid-template-columns: 1fr;
  gap: 14px;
}

.field-card {
  display: grid;
  gap: 10px;
}

.field-card__label {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--color-text);
}

.field-card__input-wrap {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 68px;
  padding: 0 18px;
  border-radius: 20px;
  background: var(--color-panel-muted);
  border: 1px solid transparent;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.72);
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;
}

.field-card.is-active .field-card__input-wrap {
  border-color: rgba(13, 114, 138, 0.34);
  box-shadow:
    0 0 0 4px rgba(13, 114, 138, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.72);
  transform: translateY(-1px);
}

.field-card__icon {
  flex: 0 0 auto;
  min-width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: rgba(13, 114, 138, 0.1);
  color: var(--color-primary-strong);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.field-card input {
  width: 100%;
  background: transparent;
  color: var(--color-text);
  font-size: 1rem;
  font-family: inherit;
  outline: none;
}

.field-card input::placeholder {
  color: rgba(82, 101, 109, 0.72);
}

.field-grid--sidebar .field-card__input-wrap {
  min-height: 72px;
  background: rgba(255, 255, 255, 0.88);
  border-color: rgba(191, 208, 216, 0.92);
}

.keyboard-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0 0 14px;
}

.keyboard-header__line {
  height: 1px;
  flex: 1;
  background: rgba(191, 208, 216, 0.92);
}

.keyboard-header__title {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.keyboard-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
}

.meta-pill {
  padding: 10px 14px;
  border-radius: 999px;
  background: var(--color-panel-muted);
  border: 1px solid rgba(191, 208, 216, 0.86);
  color: var(--color-text-muted);
  font-size: 0.83rem;
  font-weight: 600;
}

.keyboard {
  display: grid;
  gap: 12px;
}

.keyboard-row {
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  gap: 12px;
}

.keyboard-row--inset {
  grid-template-columns: repeat(9, minmax(0, 1fr));
  width: calc(100% - 40px);
  margin: 0 auto;
}

.keyboard-row--bottom {
  grid-template-columns: 1.5fr repeat(7, minmax(0, 1fr)) 1.5fr;
}

.keyboard-row--bottom .key--wide {
  grid-column: auto;
}

.keyboard-row--actions {
  grid-template-columns: 2fr 5fr 3fr;
}

.key {
  min-height: 66px;
  padding: 0 12px;
  border-radius: 18px;
  border: 1px solid rgba(191, 208, 216, 0.8);
  background: var(--color-panel-muted);
  color: var(--color-text);
  font-family: 'Manrope', sans-serif;
  font-size: 1.06rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition:
    transform 160ms ease,
    background-color 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
  box-shadow: 0 8px 18px rgba(18, 33, 38, 0.04);
}

.key:hover {
  transform: translateY(-1px);
  border-color: rgba(143, 171, 183, 1);
  background: #e2edf2;
}

.key:active {
  transform: translateY(0);
}

.key:disabled {
  cursor: wait;
  opacity: 0.72;
  transform: none;
}

.key--wide {
  grid-column: span 2;
}

.key--utility {
  font-size: 0.88rem;
  color: var(--color-text-muted);
}

.key--utility.is-toggled {
  background: var(--color-primary-soft);
  color: var(--color-primary-strong);
  border-color: rgba(13, 114, 138, 0.3);
}

.key--action,
.key--space {
  min-height: 74px;
}

.key--clear {
  color: var(--color-danger);
}

.key--space {
  letter-spacing: 0.18em;
  color: var(--color-text-muted);
}

.key--submit {
  background: linear-gradient(135deg, var(--color-primary), #12a0c1);
  color: #ffffff;
  border-color: transparent;
  box-shadow: 0 14px 28px rgba(13, 114, 138, 0.24);
}

.key--submit:hover {
  background: linear-gradient(135deg, var(--color-primary-strong), #0d8ea9);
}

.form-feedback {
  min-height: 28px;
  margin-top: 18px;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

.form-feedback.is-error {
  color: var(--color-danger);
}

.form-feedback.is-success {
  color: var(--color-success);
}

@media (max-width: 1080px) {
  .login-card {
    grid-template-columns: 1fr;
  }

  .brand-panel {
    border-right: 0;
    border-bottom: 1px solid rgba(191, 208, 216, 0.8);
  }
}

@media (max-width: 720px) {
  .login-view {
    padding: 16px;
  }

  .brand-panel,
  .form-panel {
    padding: 24px;
  }

  .field-grid {
    grid-template-columns: 1fr;
  }

  .keyboard-row {
    gap: 8px;
  }

  .keyboard-row--inset {
    width: 100%;
  }

  .key {
    min-height: 58px;
    font-size: 0.96rem;
  }

  .key--action,
  .key--space {
    min-height: 64px;
  }
}
</style>
