// 监听 navbar 的年和月变化的回调

import { watch } from 'vue';
import { StoreType } from '/@/store';

export default (store: StoreType, cb: (year: Date, month: number) => void) => {
  watch(store.state.navbar, (state) => {
    cb(state.year as Date, state.month);
  });
};
