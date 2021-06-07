<template>
  <div class="plan-list-wrapper mg-t-l">
    <el-table :data="tableData">
      <el-table-column
        type="selection"
        width="60"
      >
      </el-table-column>
      <el-table-column
        type="index"
        width="60"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        label="目标项"
        prop="desc"
      >
        <template #default="data">
          <el-input
            v-model="data.row.desc"
            clearable
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="月份"
        width="180"
      >
        <template #default="data">
          <comp-select
            v-model="data.row.months"
            :options="monthOptions"
            multiple
            collapse-tags
          ></comp-select>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { MONTHS } from '/@/lib/const';

export default defineComponent({
  setup() {
    const monthOptions = reactive([...MONTHS]);
    const tableData = reactive([
      { desc: '一个小目标', months: [] },
      { desc: '一个大目标', months: [] },
    ]);

    return {
      tableData,
      monthOptions,
    };
  },
});
</script>

<style lang="scss">
.plan-list-wrapper {
  width: 960px;
  margin: 0 auto;
}
</style>
