<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import {
  closeTouchInput,
  confirmTouchInput,
  touchInputState,
  type TouchInputMode,
} from './touch-input';

const inputElement = ref<HTMLInputElement | HTMLTextAreaElement | null>(null);
const capsEnabled = ref(false);

const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const topLetterKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const middleLetterKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
const bottomLetterKeys = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

const resolvedInputMode = computed(() => {
  switch (touchInputState.inputMode) {
    case 'numeric':
      return 'numeric';
    case 'decimal':
      return 'decimal';
    case 'tel':
      return 'tel';
    case 'email':
      return 'email';
    case 'url':
      return 'url';
    case 'search':
      return 'search';
    default:
      return 'text';
  }
});

const resolvedType = computed(() => {
  if (touchInputState.masked) {
    return 'password';
  }
  return mapModeToType(touchInputState.inputMode);
});

const inputModeLabel = computed(() => {
  switch (touchInputState.inputMode) {
    case 'numeric':
      return '数字';
    case 'decimal':
      return '数字 / 小数';
    case 'tel':
      return '电话';
    case 'email':
      return '邮箱';
    case 'url':
      return '网址';
    case 'search':
      return '检索';
    default:
      return '文本';
  }
});

const previewValue = computed(() => {
  if (!touchInputState.value) {
    return '尚未输入内容';
  }
  return touchInputState.masked ? '•'.repeat(touchInputState.value.length) : touchInputState.value;
});

watch(
  () => touchInputState.isOpen,
  async (isOpen) => {
    capsEnabled.value = false;
    if (!isOpen) {
      return;
    }

    await nextTick();
    focusInput(touchInputState.value.length);
  }
);

function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    closeTouchInput();
  }
}

function handleConfirm() {
  confirmTouchInput();
}

function handleFieldKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeTouchInput();
    return;
  }

  if (!touchInputState.multiline && event.key === 'Enter') {
    event.preventDefault();
    handleConfirm();
  }
}

function appendKey(key: string) {
  const resolvedKey =
    /^[A-Z]$/.test(key) && !capsEnabled.value ? key.toLowerCase() : key;
  insertText(resolvedKey);
}

function insertSpace() {
  insertText(' ');
}

function toggleCaps() {
  capsEnabled.value = !capsEnabled.value;
}

function clearValue() {
  touchInputState.value = '';
  void nextTick(() => focusInput(0));
}

function backspace() {
  const element = inputElement.value;
  if (!element) {
    touchInputState.value = touchInputState.value.slice(0, -1);
    return;
  }

  const start = element.selectionStart ?? touchInputState.value.length;
  const end = element.selectionEnd ?? start;

  if (start !== end) {
    touchInputState.value =
      touchInputState.value.slice(0, start) + touchInputState.value.slice(end);
    void nextTick(() => focusInput(start));
    return;
  }

  if (start <= 0) {
    return;
  }

  touchInputState.value =
    touchInputState.value.slice(0, start - 1) + touchInputState.value.slice(end);
  void nextTick(() => focusInput(start - 1));
}

function insertText(text: string) {
  const element = inputElement.value;
  if (!element) {
    touchInputState.value += text;
    return;
  }

  const start = element.selectionStart ?? touchInputState.value.length;
  const end = element.selectionEnd ?? start;
  touchInputState.value =
    touchInputState.value.slice(0, start) + text + touchInputState.value.slice(end);
  void nextTick(() => focusInput(start + text.length));
}

function focusInput(position = touchInputState.value.length) {
  const element = inputElement.value;
  if (!element) {
    return;
  }

  element.focus();
  element.setSelectionRange(position, position);
}

function mapModeToType(mode: TouchInputMode) {
  switch (mode) {
    case 'email':
      return 'email';
    case 'url':
      return 'url';
    case 'tel':
      return 'tel';
    default:
      return 'text';
  }
}
</script>

<template>
  <teleport to="body">
    <transition name="touch-input-fade">
      <div
        v-if="touchInputState.isOpen"
        class="touch-input-overlay"
        role="dialog"
        aria-modal="true"
        @click="handleBackdropClick"
      >
        <section class="touch-input-shell" @click.stop>
          <aside class="touch-input-sidebar">
            <div class="touch-input-sidebar__glow" aria-hidden="true"></div>

            <div class="touch-input-brand">
              <div class="touch-input-brand__mark">RA</div>
              <div>
                <p class="touch-input-brand__name">Touch Keyboard</p>
                <p class="touch-input-brand__subtitle">Admin Input Overlay</p>
              </div>
            </div>

            <div class="touch-input-copy">
              <p class="touch-input-copy__eyebrow">触控输入</p>
              <h2>{{ touchInputState.title }}</h2>
              <p>
                {{
                  touchInputState.description ||
                  '当前字段支持直接键入，也支持使用下方触控键盘逐字输入。'
                }}
              </p>
            </div>

            <div class="touch-input-pill-group">
              <span class="meta-pill">输入模式：{{ inputModeLabel }}</span>
              <span class="meta-pill">字母模式：{{ capsEnabled ? '大写' : '小写' }}</span>
            </div>

            <div class="touch-input-preview">
              <span class="touch-input-preview__label">当前内容</span>
              <strong>{{ previewValue }}</strong>
            </div>

            <button type="button" class="touch-input-close" @click="closeTouchInput">
              取消并关闭
            </button>
          </aside>

          <section class="touch-input-console">
            <label class="field-card is-active">
              <span class="field-card__label">{{ touchInputState.title }}</span>
              <div
                class="field-card__input-wrap"
                :class="{ 'field-card__input-wrap--multiline': touchInputState.multiline }"
              >
                <span class="field-card__icon">
                  {{ touchInputState.masked ? 'PW' : touchInputState.multiline ? 'TXT' : 'IN' }}
                </span>
                <textarea
                  v-if="touchInputState.multiline"
                  ref="inputElement"
                  v-model="touchInputState.value"
                  :inputmode="resolvedInputMode"
                  :placeholder="touchInputState.placeholder"
                  rows="5"
                  @keydown="handleFieldKeydown"
                ></textarea>
                <input
                  v-else
                  ref="inputElement"
                  v-model="touchInputState.value"
                  :type="resolvedType"
                  :inputmode="resolvedInputMode"
                  :placeholder="touchInputState.placeholder"
                  @keydown="handleFieldKeydown"
                />
              </div>
            </label>

            <div class="keyboard-header">
              <div class="keyboard-header__line"></div>
              <span class="keyboard-header__title">触控键盘输入区</span>
              <div class="keyboard-header__line"></div>
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
                <button class="key key--action key--clear" type="button" @click="clearValue">
                  清空
                </button>
                <button class="key key--space" type="button" @click="insertSpace">SPACE</button>
                <button class="key key--action key--submit" type="button" @click="handleConfirm">
                  {{ touchInputState.confirmText }}
                </button>
              </div>
            </div>
          </section>
        </section>
      </div>
    </transition>
  </teleport>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap');

.touch-input-overlay {
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
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  padding: 32px 20px;
  background: rgba(16, 24, 28, 0.54);
  backdrop-filter: blur(12px);
  font-family: 'IBM Plex Sans', sans-serif;
}

.touch-input-shell {
  position: relative;
  width: min(1320px, 100%);
  min-height: min(860px, 92vh);
  display: grid;
  grid-template-columns: minmax(300px, 0.92fr) minmax(420px, 1.5fr);
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(191, 208, 216, 0.9);
  border-radius: 28px;
  overflow: hidden;
  box-shadow:
    0 24px 64px rgba(13, 114, 138, 0.12),
    0 2px 8px rgba(18, 33, 38, 0.05);
}

.touch-input-sidebar {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px;
  overflow: hidden;
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.7), rgba(216, 241, 248, 0.9)),
    var(--color-panel-muted);
  border-right: 1px solid rgba(191, 208, 216, 0.8);
}

.touch-input-sidebar__glow {
  position: absolute;
  inset: auto auto -120px -80px;
  width: 280px;
  height: 280px;
  border-radius: 999px;
  background: rgba(92, 213, 248, 0.22);
  filter: blur(60px);
  pointer-events: none;
}

.touch-input-brand,
.touch-input-pill-group {
  position: relative;
  z-index: 1;
}

.touch-input-brand {
  display: flex;
  align-items: center;
  gap: 18px;
}

.touch-input-brand__mark {
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

.touch-input-brand__name,
.touch-input-copy h2 {
  margin: 0;
  font-family: 'Manrope', sans-serif;
}

.touch-input-brand__name {
  font-size: 1.55rem;
  font-weight: 800;
  color: var(--color-primary-strong);
  line-height: 1;
}

.touch-input-brand__subtitle,
.touch-input-copy__eyebrow {
  margin: 6px 0 0;
  color: var(--color-text-muted);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.touch-input-copy {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 16px;
  max-width: 30rem;
}

.touch-input-copy h2 {
  font-size: clamp(2rem, 2vw + 1.2rem, 2.8rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.04em;
  color: var(--color-text);
}

.touch-input-copy p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 1rem;
  line-height: 1.8;
}

.touch-input-pill-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.meta-pill {
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(191, 208, 216, 0.86);
  color: var(--color-text-muted);
  font-size: 0.83rem;
  font-weight: 600;
}

.touch-input-preview {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 6px;
  margin-top: auto;
  padding: 18px 20px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(191, 208, 216, 0.86);
}

.touch-input-preview__label {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--color-text-muted);
}

.touch-input-preview strong {
  color: var(--color-text);
  line-height: 1.7;
  word-break: break-word;
}

.touch-input-close {
  position: relative;
  z-index: 1;
  min-height: 52px;
  border: 0;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.78);
  color: var(--color-text-muted);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.touch-input-console {
  display: grid;
  align-content: start;
  gap: 18px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.9);
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
  min-height: 72px;
  padding: 0 18px;
  border-radius: 20px;
  background: var(--color-panel-muted);
  border: 1px solid rgba(191, 208, 216, 0.92);
  box-shadow:
    0 0 0 4px rgba(13, 114, 138, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.72);
}

.field-card__input-wrap--multiline {
  align-items: flex-start;
  padding-top: 18px;
  padding-bottom: 18px;
}

.field-card__icon {
  flex: 0 0 auto;
  min-width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: rgba(13, 114, 138, 0.1);
  color: var(--color-primary-strong);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.field-card input,
.field-card textarea {
  width: 100%;
  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 1rem;
  line-height: 1.7;
  outline: none;
  resize: none;
}

.field-card textarea {
  min-height: 160px;
}

.field-card input::placeholder,
.field-card textarea::placeholder {
  color: rgba(82, 101, 109, 0.72);
}

.keyboard-header {
  display: flex;
  align-items: center;
  gap: 16px;
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

.touch-input-fade-enter-active,
.touch-input-fade-leave-active {
  transition: opacity 0.18s ease;
}

.touch-input-fade-enter-from,
.touch-input-fade-leave-to {
  opacity: 0;
}

@media (max-width: 1080px) {
  .touch-input-shell {
    grid-template-columns: 1fr;
  }

  .touch-input-sidebar {
    border-right: 0;
    border-bottom: 1px solid rgba(191, 208, 216, 0.8);
  }
}

@media (max-width: 720px) {
  .touch-input-overlay {
    padding: 0;
  }

  .touch-input-shell {
    min-height: 100vh;
    border-radius: 0;
  }

  .touch-input-sidebar,
  .touch-input-console {
    padding: 24px;
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
