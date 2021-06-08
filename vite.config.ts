import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import styleImport from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [{
        libraryName: 'element-plus',
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name) => {
          name = name.slice(3);
          return `element-plus/packages/theme-chalk/src/${name}.scss`;
        },
        resolveComponent: (name) => {
          return `element-plus/lib/${name}`;
        },
      }],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "./src/assets/style/vars.scss" as *;', // 全局引入变量
      },
    },
  },
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, 'src'),
      '/@/types': path.resolve(__dirname, 'types'),
    },
  },
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: false,
    open: false, // boolean | string
    proxy: {
      '^/api/.*': {
        target: 'http://127.0.0.1:4000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    sourcemap: false,
  },
});
