import { createApp } from 'vue';
import App from './App.vue';
import router from '/@/router';
import store, { key } from './store';
import elements, { globalOptions } from './plugins/element-plus';
import '/@/assets/style/index.scss';

// 组件
import CompSelect from '/@/components/comp-select/index.vue';
import CompDialog from '/@/components/comp-dialog/index.vue';

// 指令
import VFocus from '/@/lib/directives/focus';

// api
import '/@/api';


const app = createApp(App).use(router).use(store, key);
app.config.globalProperties.$ELEMENT = globalOptions;

app
  .use(elements)
  .use(VFocus);
app.component(CompSelect.name, CompSelect);
app.component(CompDialog.name, CompDialog);

app.mount('#app');
