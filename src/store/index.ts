import { InjectionKey } from 'vue';
import { Store, createStore, useStore as useStoreOrigin } from 'vuex';
import { State } from '/@types/store';

export const key: InjectionKey<Store<State>> = Symbol();

export const useStore = (): Store<State> => useStoreOrigin(key);

export default createStore<State>({
  state: {
    year: '',
  },
});
