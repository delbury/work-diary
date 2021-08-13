<template>
  <div class="sub-page-wrapper">
    <el-row
      align="middle"
      justify="space-between"
      class="mg-b-l"
    >
      <el-radio-group v-model="selectedWeekValue">
        <el-radio-button
          v-for="(item) in weeks"
          :key="item.value"
          :label="item.value"
          :title="item.range"
        >
          {{ item.label }}
        </el-radio-button>
      </el-radio-group>

      <div>日期范围：{{ selectedWeekRange }}</div>
    </el-row>

    <el-table
      class="flex-box border-t"
      :data="tableData"
      :height="tableHeight"
      row-key="id"
    >
      <el-table-column
        type="selection"
        width="50"
      >
      </el-table-column>
      <el-table-column
        width="70"
        label="操作"
      >
        <template #header>
          <!-- 批量移除 -->
          <el-button
            class="btn-inline"
            circle
            type="danger"
            icon="el-icon-delete"
          ></el-button>
        </template>

        <template #default="data">
          <!-- 编辑 -->
          <el-button
            class="btn-inline"
            circle
            plain
            type="primary"
            :icon="data.row._editing ? 'el-icon-check' : 'el-icon-edit-outline'"
            @click="() => {
              data.row._editing = !data.row._editing;
            }"
          ></el-button>
          <!-- 删除 -->
          <el-button
            class="btn-inline"
            circle
            plain
            type="danger"
            icon="el-icon-delete"
            @click="handleDeleteRow(data)"
          ></el-button>
        </template>
      </el-table-column>

      <el-table-column
        label="目标项"
        prop="desc"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        label="备注"
        prop="monthRemark"
        show-overflow-tooltip
      >
      </el-table-column>

      <el-table-column
        width="280"
        label="选择日"
        prop="days"
        show-overflow-tooltip
      >
        <template #default="data">
          <el-select
            v-if="data.row._editing"
            v-model="data.row.days"
            class="full-w"
            multiple
            collapse-tags
          >
            <el-option
              v-for="it in selectedWeek.days"
              :key="it.date"
              :label="it.label"
              :value="it.value"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, reactive } from 'vue';
import { useStore } from '/@/store';
import { getWeek, dateFormattor, ONE_DAY_TIME, getCurrentMonthWeeks } from '/@/lib/util';
import { Interface } from 'readline';
import { useTableHeight } from '/@/pages/common/mixins/table-mixin';
import { Pages } from '/@types/index';
import { uniqueIdGenerator } from '/@/lib/util';

type WeekItem = ReturnType<typeof getCurrentMonthWeeks>[0];

export default defineComponent({
  setup() {
    const store = useStore();
    const selectedWeek = ref<WeekItem>();
    const selectedWeekValue = ref('');
    const tableData = reactive<Pages.DiaryWeeks.TableDataRows>([
      { id: uniqueIdGenerator(), yearPlanId: '1', desc: '一个小目标' },
    ]);

    // 计算当前月包含的周
    const weeks = computed(() => {
      const date = new Date(store.state.navbar.year as Date);
      const curMonth = store.state.navbar.month;
      return getCurrentMonthWeeks(date, curMonth, true);
    });

    // 初始化选中周
    watch(weeks, (val) => {
      selectedWeek.value = weeks.value[0];
      selectedWeekValue.value = weeks.value[0].value;
    }, { immediate: true });
    // 选中周变更
    watch(selectedWeekValue, (val) => {
      const week = weeks.value.find(it => it.value === val);
      selectedWeek.value = week;
    }, { immediate: true });
    const selectedWeekRange = computed(() => selectedWeek.value?.range ?? '');

    const [refWrapper, tableHeight] = useTableHeight();

    return {
      weeks,
      selectedWeek,
      selectedWeekValue,
      selectedWeekRange,
      refWrapper,
      tableHeight,
      tableData,
    };
  },
});
</script>
