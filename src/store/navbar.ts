import { Module } from 'vuex';
import { RootState, NavbarState } from '/@types/store';

const module: Module<NavbarState, RootState> = {
  namespaced: true,
  state: {
    year: null,
    month: 0,
  },
  mutations: {
    setYearSync(state, payload: Date) {
      state.year = payload;
    },
    setMonthSync(state, payload: number) {
      state.month = payload;
    },
  },
};

export default module;
