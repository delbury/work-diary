import { Module } from 'vuex';
import { RootState, NavbarState } from '/@types/store';

const module: Module<NavbarState, RootState> = {
  namespaced: true,
  state: {
    year: new Date(),
    month: new Date().getMonth(),
  },
  mutations: {
    setYearSync(state, payload: Date) {
      state.year = payload;
    },
    setMonthSync(state, payload: number) {
      state.month = payload;
    },
    setDateSync(state, payload: Date) {
      state.year = payload;
      state.month = payload.getMonth();
    },
  },
};

export default module;
