<template>
  <div
    ref="refWrapper"
    class="sub-page-wrapper"
  >
    <el-form
      :model="searchForm"
      label-width="auto"
    >
      <el-row
        :gutter="20"
        class="mg-no"
      >
        <el-col :span="18">
          <el-form-item
            label="关键词"
            prop="keyword"
          >
            <el-input
              v-model="searchForm.keyword"
              class="full-w"
              placeholder="请输入关键词"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-checkbox
            v-model="searchForm.onlyUnassigned"
            :true-label="1"
            :false-label="0"
          >
            仅看未分配
          </el-checkbox>
        </el-col>

        <el-col
          :span="2"
          class="text-right"
        >
          <el-button type="primary">
            查询
          </el-button>
        </el-col>
      </el-row>
    </el-form>

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
        type="index"
        width="50"
        label="序号"
      >
      </el-table-column>

      <el-table-column
        type="expand"
        width="20"
      >
        <template #default="data">
          <el-input
            v-if="data.row._editing"
            v-model="data.row.monthRemark"
            type="textarea"
            clearable
            :autosize="{ minRows: 2 }"
          ></el-input>
          <span v-else>{{ data.row.monthRemark }}</span>
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
        width="180"
        label="周"
        prop="week"
        show-overflow-tooltip
      >
        <template #default="data">
          <el-date-picker
            v-if="data.row._editing"
            v-model="data.row.week"
            class="full-w"
            type="week"
            format="gggg 第 ww 周"
            placeholder="选择周"
          >
          </el-date-picker>
          <span v-else>{{ weekFormattor(data.row.week) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  onMounted,
  getCurrentInstance,
} from 'vue';
import { useStore } from '/@/store';
import { MONTHS } from '/@/lib/const';
import { Pages } from '/@types/index';
import { uniqueIdGenerator } from '/@/lib/util';
import api from '/@/api';
import { ElTable } from 'element-plus';

export default defineComponent({
  setup(props, ctx) {
    const store = useStore();
    const that = getCurrentInstance(); // 实例
    const monthOptions = reactive([...MONTHS]);
    const tableData = reactive<Pages.DiaryWeeks.TableDataRows>(
      Array.from({ length: 5 }, (v, k) => ({ id: uniqueIdGenerator(), yearPlanId: '1', desc: '一个小目标' + k, months: [] })),
    );
    // 搜索条件
    const searchForm = reactive({
      onlyUnassigned: 0, // 仅看未分配月份
      months: [], // 月份
      keyword: '', // 关键词
      year: store.state.navbar.year, // 年份
    });

    // 表格 wrapper
    const refWrapper = ref<HTMLElement | null>(null);
    const tableHeight = ref<number | null>(null);
    onMounted(() => {
      if(refWrapper.value) {
        const rect = (refWrapper.value).getBoundingClientRect();
        tableHeight.value = rect.height;
      }
    });


    // 查询年计划列表
    // api.searchYearPlans();

    return {
      searchForm,
      tableData,
      monthOptions,
      refWrapper,
      tableHeight,
      // 删除该行
      handleDeleteRow: (data: Pages.DiaryYears.SlotScope) => {
        that?.appContext.config.globalProperties.$confirm('是否移除当月该计划？', '提示', {
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
  methods: {
    // 周格式化
    weekFormattor(dateStr: string): string {
      if(!dateStr) return '-';
      const date = new Date(dateStr);
      const dateStart = new Date(dateStr);
      dateStart.setMonth(0);
      dateStart.setDate(1);
      const d = Math.round((date.valueOf() - dateStart.valueOf()) / 86400000);
      const week = Math.ceil((d + dateStart.getDay() - 1) / 7);
      const year = date.getFullYear();
      return `${year} 第 ${week} 周`;
    },
  },
});
</script>
