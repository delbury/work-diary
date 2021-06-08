<template>
  <div
    ref="refWrapper"
    class="plan-list-wrapper"
  >
    <el-table
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
        width="60"
        label="操作"
      >
        <template #header>
          <el-button
            class="btn-inline"
            circle
            plain
            type="primary"
            icon="el-icon-plus"
            @click="handleAddRow"
          ></el-button>
        </template>
        <template #default="data">
          <el-button
            class="btn-inline"
            circle
            plain
            type="danger"
            icon="el-icon-minus"
            @click="handleDeleteRow(data)"
          ></el-button>
        </template>
      </el-table-column>

      <el-table-column
        type="index"
        width="50"
        label="序号"
      >
        <!-- TODO: 待组件 bug 修复 -->
        <template #default="data">
          <span>{{ indexMethod(data) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        type="expand"
        width="20"
      >
        <template #default="data">
          <el-input
            v-model="data.row.desc"
            type="textarea"
            clearable
            :autosize="{ minRows: 2 }"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column
        label="目标项"
        prop="desc"
      >
        <template #default="data">
          <el-input
            v-model="data.row.desc"
            v-focus
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

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, getCurrentInstance } from 'vue';
import { MONTHS } from '/@/lib/const';
import { Pages } from '/@types/index';
import { uniqueIdGenerator } from '/@/lib/util';

export default defineComponent({
  setup(props, ctx) {
    const that = getCurrentInstance(); // 实例
    const monthOptions = reactive([...MONTHS]);
    const tableData = reactive<Pages.DiaryYears.TableDataRows>(
      Array.from({ length: 5 }, (v, k) => ({ id: uniqueIdGenerator(), desc: '一个小目标' + k, months: [] })),
    );

    // 表格 wrapper
    const refWrapper = ref<HTMLElement | null>(null);
    const tableHeight = ref<number | null>(null);
    onMounted(() => {
      if(refWrapper.value) {
        const rect = (refWrapper.value).getBoundingClientRect();
        tableHeight.value = rect.height;
      }
    });

    return {
      tableData,
      monthOptions,
      refWrapper,
      tableHeight,
      // 表格序号，自定义（临时处理 el-table 的 bug）
      indexMethod: (data: Pages.DiaryYears.SlotScope) => {
        if(data.$index > -1) {
          return tableData.findIndex(it => it === data.row) + 1;
        }
      },
      // 添加一行
      handleAddRow: () => {
        tableData.push({
          id: uniqueIdGenerator(),
          desc: '',
          month: [],
        });
      },
      // 删除该行
      handleDeleteRow: (data: Pages.DiaryYears.SlotScope) => {
        that?.appContext.config.globalProperties.$confirm('是否删除该计划？', '提示', {
          type: 'warning',
        }).then(() => {
          const index = tableData.findIndex(it => it.id === data.row.id);
          if(index > -1) {
            tableData.splice(index, 1);
          }
        }).catch(() => null);
      },
    };
  },
});
</script>

<style lang="scss">
.plan-list-wrapper {
  width: 960px;
  height: 100%;
  margin: 0 auto;
}
</style>
