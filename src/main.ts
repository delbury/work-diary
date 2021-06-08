import { createApp } from 'vue';
import App from './App.vue';
import router from '/@/router';
import elements, { globalOptions } from './plugins/element-plus';
import '/@/assets/style/index.scss';

// 组件
import CompSelect from '/@/components/comp-select/index.vue';

// 指令
import VFocus from '/@/lib/directives/focus';

const app = createApp(App).use(router);
app.config.globalProperties.$ELEMENT = globalOptions;

app
  .use(elements)
  .use(VFocus);
app.component(CompSelect.name, CompSelect);

app.mount('#app');
