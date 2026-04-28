<template>
  <div class="mermaid-block">
    <div
      v-if="!errorMessage"
      class="mermaid-toolbar"
    >
      <div class="mermaid-toolbar-group">
        <button
          class="mermaid-zoom-button"
          type="button"
          @click="increaseScale"
        >
          放大
        </button>
        <button
          class="mermaid-zoom-button"
          type="button"
          @click="resetScale"
        >
          还原
        </button>
      </div>
      <span class="mermaid-zoom-label">{{ zoomLabel }}</span>
    </div>
    <div class="mermaid-scroll">
      <div
        v-if="errorMessage"
        class="mermaid-render-error"
        role="alert"
      >
        <strong>Mermaid 渲染失败</strong>
        <pre>{{ errorMessage }}</pre>
      </div>
      <div
        v-else
        ref="container"
        class="mermaid-diagram"
        :style="diagramStyle"
        v-html="svgMarkup"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { mermaidConfig } from '../mermaid-config';

const props = defineProps<{
  id: string;
  graph: string;
}>();

type MermaidRenderResult = {
  svg: string;
  bindFunctions?: (element: Element) => void;
};

type MermaidApi = {
  initialize: (config: unknown) => void;
  render: (id: string, code: string) => Promise<MermaidRenderResult>;
};

const container = ref<HTMLElement | null>(null);
const svgMarkup = ref('');
const errorMessage = ref('');
const defaultScale = 1.15;
const maxScale = 2.2;
const scaleStep = 0.15;
const scale = ref(defaultScale);

let mermaidPromise: Promise<MermaidApi> | undefined;
let renderCount = 0;

const diagramStyle = computed(() => {
  const width = `${Math.round(scale.value * 100)}%`;

  return {
    width,
    minWidth: width,
  };
});

const zoomLabel = computed(() => `${Math.round(scale.value * 100)}%`);

function loadMermaid(): Promise<MermaidApi> {
  mermaidPromise ??= import('mermaid/dist/mermaid.esm.min.mjs').then(
    (module) => module.default as MermaidApi
  );

  return mermaidPromise;
}

function clampScale(nextScale: number): number {
  return Math.max(defaultScale, Math.min(maxScale, Number(nextScale.toFixed(2))));
}

function increaseScale(): void {
  scale.value = clampScale(scale.value + scaleStep);
}

function resetScale(): void {
  scale.value = defaultScale;
}

async function renderDiagram(): Promise<void> {
  try {
    const mermaid = await loadMermaid();
    const graph = decodeURIComponent(props.graph);
    const renderId = `${props.id}-${renderCount++}`;

    mermaid.initialize(mermaidConfig);

    const { svg, bindFunctions } = await mermaid.render(renderId, graph);

    errorMessage.value = '';
    svgMarkup.value = svg;

    await nextTick();

    if (container.value && bindFunctions) {
      bindFunctions(container.value);
    }
  } catch (error) {
    svgMarkup.value = '';
    errorMessage.value = error instanceof Error ? error.message : String(error);
  }
}

onMounted(() => {
  void renderDiagram();
});

watch(
  () => props.graph,
  () => {
    void renderDiagram();
  }
);
</script>
