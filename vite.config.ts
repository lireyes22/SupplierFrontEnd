import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@catalog': fileURLToPath(new URL('./src/catalog', import.meta.url)),
      '@supplier': fileURLToPath(new URL('./src/supplier', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/shared/components', import.meta.url)),
      '@composables': fileURLToPath(new URL('./src/shared/composables', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/shared/services', import.meta.url)),
      '@helpers': fileURLToPath(new URL('./src/shared/helpers', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/shared/stores', import.meta.url)),
      '@interfaces': fileURLToPath(new URL('./src/shared/interfaces', import.meta.url)),
    }
  },
})
