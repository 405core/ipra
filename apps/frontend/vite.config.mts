/// <reference types='vitest' />
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

function resolveWorkspacePath(...segments: string[]) {
  return path.resolve(import.meta.dirname, '..', '..', ...segments);
}

function readHttpsOptions() {
  const enabled = process.env.VITE_DEV_HTTPS === 'true';
  if (!enabled) {
    return undefined;
  }

  const keyPath = process.env.VITE_DEV_SSL_KEY ?? resolveWorkspacePath('.certs/ipra-local-key.pem');
  const certPath =
    process.env.VITE_DEV_SSL_CERT ?? resolveWorkspacePath('.certs/ipra-local-cert.pem');

  if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
    throw new Error(
      `VITE_DEV_HTTPS 已启用，但证书文件不存在。\n` +
        `请先运行: bash scripts/generate-dev-https-cert.sh\n` +
        `当前期望证书路径:\n- key: ${keyPath}\n- cert: ${certPath}`
    );
  }

  return {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };
}

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/frontend',
  server: {
    port: 4200,
    host: '0.0.0.0',
    https: readHttpsOptions(),
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 4300,
    host: 'localhost',
    https: readHttpsOptions(),
  },
  plugins: [vue(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  // Uncomment this if you are using workers.
  // worker: {
  //   plugins: () => [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../../dist/apps/frontend',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
}));
