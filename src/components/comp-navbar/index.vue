<template>
  <el-row
    class="evenly-wrapper flex-center"
  >
    <el-date-picker
      v-model="year"
      class="w-100"
      type="year"
      placeholder="选择年"
    >
    </el-date-picker>

    <el-radio-group
      v-model="month"
    >
      <el-radio-button
        v-for="item in monthOptions"
        :key="item.value"
        :label="item.value"
      >
        {{ item.label }}
      </el-radio-button>
    </el-radio-group>

    <!-- <el-date-picker
      v-model="week"
      class="w-120"
      type="week"
      placeholder="选择周"
    >
    </el-date-picker> -->

    <!-- <el-date-picker
      v-model="day"
      class="w-140"
      type="date"
      placeholder="选择日"
    >
    </el-date-picker> -->

    <el-radio-group v-model="type">
      <el-radio-button
        v-for="item in diaryOptions"
        :key="item.value"
        :label="item.value"
      >
        {{ item.label }}
      </el-radio-button>
    </el-radio-group>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { MONTHS } from '/@/lib/const';

// 按钮选项
const DIARY_TYPES = [
  { label: '年计划', value: 0 },
  { label: '月计划', value: 1 },
  { label: '周计划', value: 2 },
  // { label: '日总结', key: 3 },
];

export default defineComponent({
  name: 'CompNavbar',
  components: {
  },
  setup() {
    const week = ref<Date>(new Date());
    const day = ref<Date>(new Date());
    const year = ref<Date>(new Date());
    const month = ref<number>(0);
    const type = ref<number>(0);
    const monthOptions = reactive([...MONTHS]);
    const diaryOptions = reactive([...DIARY_TYPES]);

    return {
      week,
      day,
      year,
      month,
      type,
      monthOptions,
      diaryOptions,
    };
  },
});
</script>
