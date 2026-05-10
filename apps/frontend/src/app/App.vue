<script setup lang="ts">
import { RouterView } from 'vue-router';
import ElMessageHost from './ElMessageHost.vue';
import GlobalWatermark from './GlobalWatermark.vue';
import TouchInputOverlay from './TouchInputOverlay.vue';
</script>

<template>
  <div class="app-root">
    <RouterView />
    <ElMessageHost />
    <GlobalWatermark />
    <TouchInputOverlay />
  </div>
</template>

<style scoped lang="scss">
.app-root {
  min-height: 100vh;
}
</style>
