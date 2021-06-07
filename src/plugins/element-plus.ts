import 'element-plus/packages/theme-chalk/src/base.scss';
import { Plugin } from 'vue';
import {
  locale,
  ElButton,
  ElHeader,
  ElMain,
  ElFooter,
  ElCol,
  ElRow,
  ElDatePicker,
  ElRadio,
  ElRadioGroup,
  ElRadioButton,
  ElSelect,
  ElOption,
  ElCheckbox,
  ElTable,
  ElTableColumn,
  ElInput,
} from 'element-plus';
import lang from 'element-plus/lib/locale/lang/zh-cn';

locale(lang);
const Coms = [
  ElButton,
  ElHeader,
  ElMain,
  ElFooter,
  ElCol,
  ElRow,
  ElDatePicker,
  ElRadio,
  ElRadioGroup,
  ElRadioButton,
  ElSelect,
  ElOption,
  ElCheckbox,
  ElTable,
  ElTableColumn,
  ElInput,
];

const plugin: Plugin = {
  install: (app) => {
    Coms.forEach(Com => app.component(Com.name, Com));
  },
};
export default plugin;

export const globalOptions = {
  size: 'mini',
  zIndex: 3000,
};
