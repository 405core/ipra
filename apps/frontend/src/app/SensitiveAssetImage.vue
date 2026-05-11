<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { loadAuthSession } from '../auth';

const props = defineProps<{
  src?: string;
  alt?: string;
  loading?: boolean;
  error?: string;
  fit?: 'contain' | 'cover';
  eager?: boolean;
}>();

const objectFit = computed(() => props.fit ?? 'contain');
const imageLoading = computed(() => (props.eager ? 'eager' : 'lazy'));
const imageDecoding = computed(() => (props.eager ? 'sync' : 'async'));
const resolvedSrc = ref('');
const fetchError = ref('');

let activeObjectUrl = '';
let activeAbortController: AbortController | null = null;

function revokeObjectUrl() {
  if (!activeObjectUrl) {
    return;
  }
  URL.revokeObjectURL(activeObjectUrl);
  activeObjectUrl = '';
}

function clearResolvedImage() {
  revokeObjectUrl();
  resolvedSrc.value = '';
}

async function loadProtectedImage() {
  activeAbortController?.abort();
  activeAbortController = null;
  clearResolvedImage();
  fetchError.value = '';

  const source = props.src?.trim();
  if (!source) {
    return;
  }

  const session = loadAuthSession();
  if (!session?.token) {
    fetchError.value = '登录状态已失效，请重新登录';
    return;
  }

  const controller = new AbortController();
  activeAbortController = controller;

  try {
    const response = await fetch(source, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
      cache: 'no-store',
      signal: controller.signal,
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      const message =
        payload && typeof payload.message === 'string' ? payload.message : '受保护图片加载失败';
      throw new Error(message);
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    if (controller.signal.aborted) {
      URL.revokeObjectURL(objectUrl);
      return;
    }

    activeObjectUrl = objectUrl;
    resolvedSrc.value = objectUrl;
  } catch (error) {
    if (controller.signal.aborted) {
      return;
    }
    fetchError.value = error instanceof Error ? error.message : '受保护图片加载失败';
  } finally {
    if (activeAbortController === controller) {
      activeAbortController = null;
    }
  }
}

watch(
  () => props.src,
  () => {
    void loadProtectedImage();
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  activeAbortController?.abort();
  activeAbortController = null;
  clearResolvedImage();
});
</script>

<template>
  <div
    class="sensitive-image"
    :class="{ 'is-loading': loading || (!!props.src && !resolvedSrc && !fetchError), 'has-error': !!(error || fetchError) }"
  >
    <img
      v-if="resolvedSrc && !(error || fetchError)"
      :src="resolvedSrc"
      :alt="alt || '受保护敏感图片'"
      :style="{ objectFit }"
      :loading="imageLoading"
      :decoding="imageDecoding"
      draggable="false"
    />
    <div v-else-if="loading || (!!props.src && !resolvedSrc && !fetchError)" class="sensitive-image__placeholder">
      <strong>正在加载受保护图片</strong>
      <span>服务端正在返回带水印的敏感数据图像</span>
    </div>
    <div v-else class="sensitive-image__placeholder sensitive-image__placeholder--error">
      <strong>图片加载失败</strong>
      <span>{{ error || fetchError || '请稍后重试' }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sensitive-image {
  position: relative;
  width: 100%;
  min-height: 180px;
  overflow: hidden;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(246, 250, 252, 0.94), rgba(233, 243, 247, 0.92));
  border: 1px solid rgba(157, 189, 202, 0.36);
}

.sensitive-image img {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
}

.sensitive-image__placeholder {
  display: grid;
  place-items: center;
  gap: 10px;
  min-height: 180px;
  padding: 24px;
  text-align: center;
}

.sensitive-image__placeholder strong {
  color: #15252b;
}

.sensitive-image__placeholder span {
  color: #5b7179;
  line-height: 1.5;
}

.sensitive-image__placeholder--error {
  background: rgba(255, 243, 241, 0.72);
}
</style>
