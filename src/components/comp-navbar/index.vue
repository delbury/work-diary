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

    <el-radio-group
      v-model="diaryType"
      @change="handleDiaryTypeChange"
    >
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
import { defineComponent, ref, reactive, computed, watch } from 'vue';
import { MONTHS } from '/@/lib/const';
import { G } from '/@types/index';
import { useRouter } from 'vue-router';
import { useStore } from '/@/store';

// 按钮选项
const DIARY_TYPES: G.OptionsType = [
  { label: '年计划', value: 'years' },
  { label: '月计划', value: 'months' },
  { label: '周计划', value: 'weeks' },
  // { label: '日总结', key: 'day' },
];

type DiaryTypeValueType = 'years' | 'months' | 'weeks' | 'days';

export default defineComponent({
  name: 'CompNavbar',
  components: {
  },
  setup(props, ctx) {
    const store = useStore();
    const router = useRouter();
    const week = ref<Date>(new Date());
    const day = ref<Date>(new Date());
    const year = ref<Date>(new Date());
    const month = ref<number>(0);
    let defaultPath: DiaryTypeValueType = 'years';
    {
      const cp = router.currentRoute.value.path;
      for(const d of DIARY_TYPES) {
        if(new RegExp('^/diary/' + d.value).test(cp)) {
          defaultPath = d.value as DiaryTypeValueType;
          break;
        }
      }
    }
    const diaryType = ref<DiaryTypeValueType>(defaultPath);
    const monthOptions = reactive([...MONTHS]);
    const diaryOptions = reactive([...DIARY_TYPES]);

    // 月份禁用条件
    const monthDisabled = computed<boolean>(() => diaryType.value === 'years');

    // 监听路径变换
    const handleDiaryTypeChange = (ev: DiaryTypeValueType) => {
      router.push('/diary/' + ev);
    };

    // 监听参数变化
    watch([year, month], ([y, m]) => {
      console.log(y, m);
    });

    return {
      week,
      day,
      year,
      month,
      diaryType,
      monthOptions,
      diaryOptions,
      monthDisabled,
      handleDiaryTypeChange,
    };
  },
});
</script>
