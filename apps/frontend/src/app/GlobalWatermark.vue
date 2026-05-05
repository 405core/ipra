<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { loadAuthSession, type AuthSession } from '../auth';
import {
  buildWatermarkText,
  shouldDisplayWatermark,
  WATERMARK_REFRESH_INTERVAL_MS,
  WATERMARK_TILE_LAYOUTS,
} from './watermark';

const route = useRoute();
const authSession = ref<AuthSession | null>(null);
const currentTimestamp = ref(Date.now());

let refreshTimer: number | null = null;

const routeTitle = computed(() =>
  typeof route.meta.title === 'string' ? route.meta.title : undefined
);
const explicitWatermarkFlag = computed(() =>
  typeof route.meta.watermark === 'boolean' ? route.meta.watermark : undefined
);
const shouldShowWatermark = computed(() =>
  shouldDisplayWatermark(authSession.value, explicitWatermarkFlag.value)
);
const watermarkText = computed(() =>
  authSession.value
    ? buildWatermarkText(authSession.value, routeTitle.value, currentTimestamp.value)
    : ''
);

function refreshWatermarkContext() {
  if (typeof window === 'undefined') {
    authSession.value = null;
    return;
  }

  authSession.value = loadAuthSession();
  currentTimestamp.value = Date.now();
}

function startRefreshTimer() {
  if (refreshTimer !== null || typeof window === 'undefined') {
    return;
  }

  refreshTimer = window.setInterval(() => {
    currentTimestamp.value = Date.now();
  }, WATERMARK_REFRESH_INTERVAL_MS);
}

function stopRefreshTimer() {
  if (refreshTimer === null) {
    return;
  }

  window.clearInterval(refreshTimer);
  refreshTimer = null;
}

function handleWindowFocus() {
  refreshWatermarkContext();
}

function handleVisibilityChange() {
  if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
    refreshWatermarkContext();
  }
}

function handleStorageEvent() {
  refreshWatermarkContext();
}

watch(
  () => route.fullPath,
  () => {
    refreshWatermarkContext();
  },
  { immediate: true }
);

onMounted(() => {
  refreshWatermarkContext();
  startRefreshTimer();
  window.addEventListener('focus', handleWindowFocus);
  window.addEventListener('storage', handleStorageEvent);
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onBeforeUnmount(() => {
  stopRefreshTimer();
  window.removeEventListener('focus', handleWindowFocus);
  window.removeEventListener('storage', handleStorageEvent);
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>

<template>
  <div
    v-if="shouldShowWatermark"
    class="app-watermark"
    data-testid="global-watermark"
    aria-hidden="true"
    style="pointer-events: none;"
  >
    <div class="app-watermark__plane">
      <span
        v-for="tile in WATERMARK_TILE_LAYOUTS"
        :key="tile.id"
        class="app-watermark__tile"
        :style="{
          top: tile.top,
          left: tile.left,
          opacity: tile.opacity,
          transform: `translate(-50%, -50%) rotate(${tile.rotation}deg)`,
        }"
      >
        {{ watermarkText }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-watermark {
  position: fixed;
  inset: 0;
  z-index: 88;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.app-watermark__plane {
  display: flex;
  position: absolute;
  inset: 0;
}

.app-watermark__tile {
  position: absolute;
  max-width: min(36vw, 420px);
  color: rgba(12, 34, 42, 0.2);
  font-size: clamp(0.76rem, 0.7rem + 0.22vw, 0.92rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.45;
  white-space: normal;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.32);
}

@media (max-width: 960px) {
  .app-watermark__tile {
    max-width: min(46vw, 280px);
    font-size: 0.72rem;
    line-height: 1.38;
  }
}

@media print {
  .app-watermark {
    position: fixed;
    inset: 0;
  }

  .app-watermark__tile {
    color: rgba(12, 34, 42, 0.18);
  }
}
</style>
