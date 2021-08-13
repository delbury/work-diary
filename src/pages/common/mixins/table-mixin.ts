import { ref, onMounted } from 'vue';

export const useTableHeight = () => {
  // 表格 wrapper
  const refWrapper = ref<HTMLElement | null>(null);
  const tableHeight = ref<number | null>(null);
  onMounted(() => {
    if(refWrapper.value) {
      const rect = (refWrapper.value).getBoundingClientRect();
      tableHeight.value = rect.height;
    }
  });
  return [refWrapper, tableHeight];
};
