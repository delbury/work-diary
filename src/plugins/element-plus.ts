import 'element-plus/packages/theme-chalk/src/base.scss';
import { Plugin } from 'vue';
import {
  // locale,
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
  ElScrollbar,
  ElMessageBox,
  ElForm,
  ElFormItem,
  ElCalendar,
  ElTooltip,
  ElDialog,
  ElLoading,
  ElPopconfirm,
} from 'element-plus';
import {} from 'element-plus/es';
// import lang from 'element-plus/lib/locale/lang/zh-cn';
// import 'dayjs/locale/zh-cn';
// locale(lang);

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
  ElScrollbar,
  ElMessageBox,
  ElForm,
  ElFormItem,
  ElCalendar,
  ElTooltip,
  ElDialog,
  ElLoading,
  ElPopconfirm,
];

const plugin: Plugin = {
  install: (app) => {
    Coms.forEach(Com => app.use(Com));
  },
};
export default plugin;

export const globalOptions = {
  size: 'mini',
  zIndex: 3000,
};
