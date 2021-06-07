import { createApp } from 'vue';
import App from './App.vue';
import router from '/@/router';
import elements, { globalOptions } from './plugins/element-plus';
import '/@/assets/style/index.scss';

const app = createApp(App).use(router);
app.config.globalProperties.$ELEMENT = globalOptions;
app.use(elements);
app.mount('#app');
