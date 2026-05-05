<script setup lang="ts">
import { RouterView } from 'vue-router';
import GlobalWatermark from './GlobalWatermark.vue';
</script>

<template>
  <div class="app-root">
    <RouterView />
    <GlobalWatermark />
  </div>
</template>

<style scoped lang="scss">
.app-root {
  min-height: 100vh;
}
</style>
