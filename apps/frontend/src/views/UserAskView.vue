<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface CameraFeed {
  id: string;
  label: string;
  title: string;
  active?: boolean;
}

interface TranscriptEntry {
  id: string;
  speaker: string;
  role: 'interviewer' | 'subject';
  time: string;
  text: string;
  pending?: boolean;
}

interface InsightItem {
  title: string;
  detail: string;
  tone: 'alert' | 'warn';
}

interface SystemIndicator {
  label: string;
  tone: 'ok' | 'ai';
}

const router = useRouter();

const sessionClock = '01:24:45';
const credibilityScore = 64;

const cameraFeeds: CameraFeed[] = [
  {
    id: 'wide',
    label: 'WIDE VIEW',
    title: '房间全景',
  },
  {
    id: 'desk',
    label: 'DESK VIEW',
    title: '桌面视角',
  },
  {
    id: 'close',
    label: 'CLOSE UP',
    title: '受访者特写',
    active: true,
  },
];

const transcript: TranscriptEntry[] = [
  {
    id: 'q1',
    speaker: '问询员 (Interviewer)',
    role: 'interviewer',
    time: '10:45:12',
    text: '您好，李先生。关于上周二下午三点左右，您在西区仓库的情况，能详细描述一下吗？',
  },
  {
    id: 'a1',
    speaker: '李华 (Subject)',
    role: 'subject',
    time: '10:45:30',
    text: '当时我正在进行常规的库存清点。我是按照排班表在那里的，没有发现什么异常。',
  },
  {
    id: 'q2',
    speaker: '问询员 (Interviewer)',
    role: 'interviewer',
    time: '10:45:45',
    text: '按照记录，那时候监控系统出现了约 5 分钟的断开，您是否有察觉到电力或网络异常？',
  },
  {
    id: 'a2',
    speaker: '李华 (Subject)',
    role: 'subject',
    time: '10:46:10',
    text: '那个……我记得好像灯闪了一下，但是我当时以为是正常的电压不稳……',
    pending: true,
  },
];

const insights: InsightItem[] = [
  {
    title: '口供矛盾点',
    detail: '受访者称在清点库存，但其手持终端在 10:45 至 10:50 期间无操作记录。',
    tone: 'alert',
  },
  {
    title: '情绪预警',
    detail: '提到“灯光闪烁”时语义停顿明显增多，建议沿断电细节继续追问。',
    tone: 'warn',
  },
];

const suggestedPrompts = [
  '既然在清点库存，为什么您的 PDA 终端没有产生任何数据录入？',
  '关于灯光闪烁，您能否回忆起当时是全部熄灭还是局部跳闪？',
  '在断电发生的五分钟内，您有听到除灯光外的其他异常声音吗？',
];

const systemIndicators: SystemIndicator[] = [
  {
    label: 'Video Sync',
    tone: 'ok',
  },
  {
    label: 'Audio High-Res',
    tone: 'ok',
  },
  {
    label: 'AI LLM Ready',
    tone: 'ai',
  },
];

const annotation = ref('');
const annotations = ref<string[]>([
  '灯光闪烁说法与设备日志存在偏差，需要追问具体时长。',
]);

function addAnnotation() {
  const value = annotation.value.trim();
  if (!value) {
    return;
  }

  annotations.value.unshift(value);
  annotation.value = '';
}

function useSuggestion(prompt: string) {
  annotation.value = prompt;
}

async function backToSearch() {
  await router.push({ name: 'home-data' });
}
</script>

<template>
  <section class="ask-page">
    <section class="ask-banner">
      <div>
        <p class="section-eyebrow">Inquiry Workspace</p>
        <h2>辅助问询工作台</h2>
        <p class="section-copy">
          `UserAskView` 已转为标准 Vue 组件。页面只承载问询工作流本身，导航切换交给外层公共布局。
        </p>
      </div>

      <div class="ask-banner__actions">
        <div class="timer-chip">
          <span class="timer-chip__dot"></span>
          <span>{{ sessionClock }}</span>
        </div>
        <button class="secondary-action" type="button" @click="backToSearch">
          返回检索台
        </button>
      </div>
    </section>

    <section class="workspace-grid">
      <section class="surface-card video-card">
        <div class="card-head">
          <div>
            <p class="section-eyebrow">Live Stream</p>
            <h3>CAM 01</h3>
          </div>
          <span class="status-pill status-pill--live">录制中</span>
        </div>

        <div class="video-stage">
          <div class="video-stage__overlay">
            <div>
              <strong>李华 (Li Hua)</strong>
              <span>Subject Interviewee</span>
            </div>
          </div>
        </div>

        <div class="camera-strip">
          <article
            v-for="feed in cameraFeeds"
            :key="feed.id"
            class="camera-tile"
            :class="{ 'is-active': feed.active }"
          >
            <span>{{ feed.label }}</span>
            <strong>{{ feed.title }}</strong>
          </article>
        </div>
      </section>

      <section class="surface-card transcript-card">
        <div class="card-head">
          <div>
            <p class="section-eyebrow">Live ASR</p>
            <h3>实时转录</h3>
          </div>
          <span class="status-pill">Audio Sync Active</span>
        </div>

        <div class="transcript-list">
          <article
            v-for="entry in transcript"
            :key="entry.id"
            class="transcript-bubble"
            :class="`transcript-bubble--${entry.role}`"
          >
            <div class="transcript-bubble__meta">
              <strong>{{ entry.speaker }}</strong>
              <span>{{ entry.time }}</span>
            </div>
            <p>
              {{ entry.text }}
              <span v-if="entry.pending" class="typing-cursor"></span>
            </p>
          </article>
        </div>

        <div class="annotation-panel">
          <label class="annotation-input">
            <input
              v-model="annotation"
              type="text"
              placeholder="输入批注或准备下一轮追问"
              @keydown.enter.prevent="addAnnotation"
            />
            <button class="primary-action" type="button" @click="addAnnotation">
              添加
            </button>
          </label>

          <div class="annotation-list">
            <strong>现场批注</strong>
            <p v-for="note in annotations" :key="note">{{ note }}</p>
          </div>
        </div>
      </section>

      <section class="surface-card assistant-card">
        <div class="assistant-card__head">
          <div>
            <p class="assistant-card__eyebrow">AI Guidance</p>
            <h3>智能辅助</h3>
          </div>
          <span class="assistant-card__mode">Analysis Active</span>
        </div>

        <div class="assistant-stack">
          <section class="assistant-group">
            <h4>关键点提取</h4>
            <article
              v-for="item in insights"
              :key="item.title"
              class="insight-card"
              :class="`insight-card--${item.tone}`"
            >
              <strong>{{ item.title }}</strong>
              <p>{{ item.detail }}</p>
            </article>
          </section>

          <section class="assistant-group">
            <h4>推荐追问</h4>
            <button
              v-for="prompt in suggestedPrompts"
              :key="prompt"
              class="prompt-button"
              type="button"
              @click="useSuggestion(prompt)"
            >
              {{ prompt }}
            </button>
          </section>

          <section class="assistant-group">
            <div class="score-head">
              <h4>风险指标</h4>
              <strong>{{ credibilityScore }}%</strong>
            </div>
            <p class="score-copy">诚信度评分 (Credibility)</p>
            <div class="score-track">
              <div
                class="score-track__fill"
                :style="{ width: `${credibilityScore}%` }"
              ></div>
            </div>
          </section>
        </div>

        <button class="report-action" type="button">
          生成初步研判简报
        </button>
      </section>
    </section>

    <footer class="action-bar">
      <div class="system-status">
        <span class="section-eyebrow">System Status</span>
        <div class="system-status__items">
          <div
            v-for="indicator in systemIndicators"
            :key="indicator.label"
            class="indicator-chip"
            :class="`indicator-chip--${indicator.tone}`"
          >
            {{ indicator.label }}
          </div>
        </div>
      </div>

      <div class="action-bar__buttons">
        <button class="secondary-action" type="button">暂停问询</button>
        <button class="danger-action" type="button">结束问询</button>
      </div>
    </footer>
  </section>
</template>

<style scoped lang="scss">
.ask-page {
  display: grid;
  gap: 20px;
}

.ask-banner,
.surface-card,
.action-bar {
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(157, 189, 202, 0.36);
  box-shadow: 0 22px 46px rgba(14, 40, 48, 0.08);
}

.ask-banner,
.card-head,
.ask-banner__actions,
.score-head,
.action-bar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.ask-banner {
  padding: 28px;
}

.ask-banner h2,
.card-head h3,
.assistant-card__head h3 {
  margin: 6px 0 0;
  color: #15252b;
}

.section-eyebrow,
.assistant-card__eyebrow {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
  font-weight: 700;
  color: #5b7179;
}

.section-copy,
.assistant-group p,
.transcript-bubble p,
.annotation-list p,
.score-copy,
.camera-tile span,
.video-stage__overlay span {
  color: #5b7179;
  line-height: 1.6;
}

.section-copy {
  margin-top: 14px;
  max-width: 760px;
}

.ask-banner__actions {
  flex-wrap: wrap;
}

.timer-chip,
.status-pill,
.assistant-card__mode,
.indicator-chip {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  padding: 0 14px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
}

.timer-chip {
  gap: 10px;
  background: rgba(11, 114, 136, 0.08);
  color: #09596c;
}

.timer-chip__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #33b06c;
  box-shadow: 0 0 0 6px rgba(51, 176, 108, 0.16);
}

.workspace-grid {
  display: grid;
  gap: 18px;
}

.surface-card {
  padding: 22px;
}

.video-card,
.transcript-card,
.assistant-card {
  display: grid;
  gap: 18px;
}

.status-pill {
  background: rgba(91, 113, 121, 0.12);
  color: #5b7179;
}

.status-pill--live {
  background: rgba(182, 78, 61, 0.12);
  color: #b64e3d;
}

.video-stage {
  position: relative;
  min-height: 360px;
  border-radius: 24px;
  background:
    linear-gradient(180deg, rgba(10, 20, 24, 0.02), rgba(10, 20, 24, 0.55)),
    radial-gradient(circle at 20% 20%, rgba(38, 122, 146, 0.22), transparent 24%),
    linear-gradient(135deg, #25333a, #121b20);
  overflow: hidden;
}

.video-stage__overlay {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  min-height: 100%;
  padding: 18px;
  color: #ffffff;
}

.video-stage__overlay strong {
  display: block;
  font-size: 1rem;
}

.camera-strip {
  display: grid;
  gap: 12px;
}

.camera-tile {
  display: grid;
  gap: 4px;
  min-height: 88px;
  padding: 14px;
  border-radius: 18px;
  background: linear-gradient(160deg, rgba(17, 31, 37, 0.88), rgba(42, 60, 67, 0.72));
  color: #ffffff;
  border: 1px solid rgba(157, 189, 202, 0.18);
}

.camera-tile strong {
  font-size: 0.95rem;
}

.camera-tile.is-active {
  border-color: rgba(11, 114, 136, 0.4);
  box-shadow: inset 0 0 0 1px rgba(32, 168, 197, 0.4);
}

.transcript-list {
  display: grid;
  gap: 16px;
  max-height: 560px;
  overflow-y: auto;
  padding-right: 4px;
}

.transcript-bubble {
  display: grid;
  gap: 8px;
  max-width: 86%;
}

.transcript-bubble--subject {
  justify-self: end;
}

.transcript-bubble__meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.transcript-bubble__meta strong {
  font-size: 0.82rem;
}

.transcript-bubble__meta span {
  font-size: 0.76rem;
  color: #7d9198;
}

.transcript-bubble p {
  margin: 0;
  padding: 14px 16px;
  border-radius: 20px;
  background: #f5fafc;
  border: 1px solid rgba(157, 189, 202, 0.26);
}

.transcript-bubble--interviewer p {
  border-top-left-radius: 6px;
}

.transcript-bubble--subject p {
  background: #ffffff;
  border-top-right-radius: 6px;
}

.typing-cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  margin-left: 8px;
  vertical-align: -2px;
  background: #0b7288;
  animation: blink 1s steps(1) infinite;
}

.annotation-panel {
  display: grid;
  gap: 14px;
  padding-top: 6px;
  border-top: 1px solid rgba(157, 189, 202, 0.26);
}

.annotation-input {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
}

.annotation-input input {
  min-width: 0;
  min-height: 48px;
  padding: 0 16px;
  border-radius: 16px;
  background: #ffffff;
  color: #15252b;
  border: 1px solid rgba(157, 189, 202, 0.36);
}

.annotation-input input:focus {
  outline: none;
}

.annotation-list {
  display: grid;
  gap: 10px;
}

.annotation-list strong,
.assistant-group h4 {
  color: #15252b;
}

.annotation-list p {
  margin: 0;
  padding: 12px 14px;
  border-radius: 16px;
  background: #f8fbfd;
  border: 1px solid rgba(157, 189, 202, 0.24);
}

.assistant-card {
  padding: 0;
  overflow: hidden;
}

.assistant-card__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 22px;
  background: linear-gradient(135deg, #0b7288, #20a8c5);
  color: #ffffff;
}

.assistant-card__eyebrow,
.assistant-card__mode {
  color: rgba(255, 255, 255, 0.82);
}

.assistant-stack {
  display: grid;
  gap: 18px;
  padding: 22px;
}

.assistant-group {
  display: grid;
  gap: 12px;
}

.insight-card,
.prompt-button {
  padding: 14px;
  border-radius: 18px;
  text-align: left;
  border: 1px solid rgba(157, 189, 202, 0.26);
  background: #ffffff;
}

.insight-card strong {
  display: block;
  margin-bottom: 6px;
}

.insight-card--alert {
  background: #fff2ef;
  border-left: 4px solid #b64e3d;
}

.insight-card--warn {
  background: #fff7e9;
  border-left: 4px solid #c07b19;
}

.prompt-button {
  cursor: pointer;
  color: #15252b;
}

.score-head strong {
  color: #996106;
}

.score-copy {
  margin: 0;
}

.score-track {
  height: 8px;
  border-radius: 999px;
  background: #edf3f6;
  overflow: hidden;
}

.score-track__fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #c07b19, #e2aa4d);
}

.report-action,
.primary-action,
.secondary-action,
.danger-action {
  min-height: 46px;
  padding: 0 18px;
  border-radius: 14px;
  font-weight: 700;
  cursor: pointer;
}

.report-action,
.primary-action {
  background: linear-gradient(135deg, #0b7288, #20a8c5);
  color: #ffffff;
}

.report-action {
  margin: 0 22px 22px;
}

.secondary-action {
  background: rgba(11, 114, 136, 0.08);
  color: #09596c;
}

.danger-action {
  background: linear-gradient(135deg, #b64e3d, #d96d57);
  color: #ffffff;
}

.action-bar {
  padding: 18px 22px;
}

.system-status {
  display: grid;
  gap: 10px;
}

.system-status__items,
.action-bar__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.indicator-chip--ok {
  background: rgba(51, 176, 108, 0.12);
  color: #237d4d;
}

.indicator-chip--ai {
  background: rgba(11, 114, 136, 0.12);
  color: #09596c;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

@media (min-width: 900px) {
  .workspace-grid {
    grid-template-columns: minmax(280px, 0.9fr) minmax(360px, 1.15fr) minmax(280px, 0.85fr);
    align-items: start;
  }

  .camera-strip {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 899px) {
  .ask-banner,
  .ask-banner__actions,
  .card-head,
  .action-bar {
    flex-direction: column;
  }
}

@media (max-width: 639px) {
  .annotation-input {
    grid-template-columns: 1fr;
  }

  .secondary-action,
  .primary-action,
  .danger-action,
  .report-action {
    width: 100%;
  }
}
</style>
