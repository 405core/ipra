import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vue(), nxViteTsPaths()],
  test: {
    include: ['apps/frontend/src/**/*.spec.ts'],
  },
});
