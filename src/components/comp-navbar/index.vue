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
      :disabled="monthDisabled"
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

    <el-radio-group v-model="diaryType">
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
import { defineComponent, ref, reactive, computed } from 'vue';
import { MONTHS } from '/@/lib/const';
import { G } from '/@types/index';

// 按钮选项
const DIARY_TYPES: G.OptionsType = [
  { label: '年计划', value: 'year' },
  { label: '月计划', value: 'month' },
  { label: '周计划', value: 'week' },
  // { label: '日总结', key: 'day' },
];

type DiaryTypeValueType = 'year' | 'month' | 'week' | 'day';

export default defineComponent({
  name: 'CompNavbar',
  components: {
  },
  setup() {
    const week = ref<Date>(new Date());
    const day = ref<Date>(new Date());
    const year = ref<Date>(new Date());
    const month = ref<number>(0);
    const diaryType = ref<DiaryTypeValueType>('year');
    const monthOptions = reactive([...MONTHS]);
    const diaryOptions = reactive([...DIARY_TYPES]);

    // 月份禁用条件
    const monthDisabled = computed<boolean>(() => diaryType.value === 'year');

    return {
      week,
      day,
      year,
      month,
      diaryType,
      monthOptions,
      diaryOptions,
      monthDisabled,
    };
  },
});
</script>
