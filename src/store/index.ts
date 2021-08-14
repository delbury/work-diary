import { InjectionKey } from 'vue';
import {
  Store,
  createStore,
  useStore as useStoreOrigin,
  StoreOptions,
} from 'vuex';
import { RootState, StateTree } from '/@types/store';
import NavbarModule from './navbar';

export const key: InjectionKey<Store<StateTree>> = Symbol();
export type StoreType = Store<StateTree>
export const useStore = ():StoreType => useStoreOrigin(key);

const vuexOptions: StoreOptions<RootState> = {
  state: {
  },
  modules: {
    navbar: NavbarModule,
  },
};

export default createStore<RootState>(vuexOptions);
