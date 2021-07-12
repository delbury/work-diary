<template>
  <div
    ref="refWrapper"
    class="sub-page-wrapper"
  >
    <el-calendar
      v-model="currentDate"
    >
      <template #dateCell="{data}">
        <div class="calendar-cell-date">
          {{ data.date.getDate() }}
        </div>
        <div class="calendar-cell-content">
          {{ cellRender(data.day) }}
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount } from 'vue';
import { useStore } from '/@/store';
import api from '/@/api';
import { spawn } from 'child_process';

export default defineComponent({
  setup() {
    const store = useStore();
    // 当前时间
    const currentDate = computed({
      get() {
        const date = store.state.navbar.year ? new Date(store.state.navbar.year) : new Date();
        const month = store.state.navbar.month;
        if(!date) {
          return new Date();
        }

        date.setMonth(month);
        return date;
      },
      set(val) {
        store.commit('navbar/setDateSync', val);
      },
    });

    // 请求数据
    onBeforeMount(async () => {
      const list = api.searchDayPlans();
      console.log(list);
    });

    // 内容渲染
    const cellRender = (date: string) => {

    };

    return {
      currentDate,
      cellRender,
    };
  },
});
</script>

<style lang="scss" >
.el-calendar-day {
  overflow: hidden;
}
</style>

<style lang="scss" scoped>
.calendar-cell-content {
  overflow: hidden;
  font-size: $fs-s;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
