import { Plugin, Directive } from 'vue';

const directive: Directive = {
  mounted(el) {
    const elm = el.querySelector('input') as HTMLInputElement;
    if(elm) {
      elm.focus();
    }
  },
};

const plugin: Plugin = {
  install(app) {
    app.directive('focus', directive);
  },
};
export default plugin;
