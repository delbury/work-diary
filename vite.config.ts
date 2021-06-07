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
    // modules
    // postcss
    // preprocessorOptions: {
    //   less: {
    //     javascriptEnabled: true,
    //     additionalData: '@import "./src/assets/style/theme.less";', // 全局 style 引入主题变量
    //   },
    // },
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
