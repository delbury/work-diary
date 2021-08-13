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
        <el-col :span="6">
          <el-form-item
            label="月份"
            prop="month"
          >
            <comp-select
              v-model="searchForm.months"
              class="full-w"
              :options="monthOptions"
              multiple
              collapse-tags
              placeholder="请选择月份"
            ></comp-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
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
          <!-- 添加 -->
          <el-button
            class="btn-inline"
            circle
            type="primary"
            icon="el-icon-plus"
            @click="handleAddRow"
          ></el-button>

          <!-- 批量删除 -->
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
            v-if="data.row._editing"
            v-model="data.row.desc"
            type="textarea"
            clearable
            :autosize="{ minRows: 2 }"
          ></el-input>
          <span v-else>{{ data.row.desc }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="目标项"
        prop="desc"
        show-overflow-tooltip
      >
        <template #default="data">
          <el-input
            v-if="data.row._editing"
            v-model="data.row.desc"
            v-focus
            clearable
          ></el-input>
          <span v-else>{{ data.row.desc }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="月份"
        width="180"
        prop="months"
        show-overflow-tooltip
      >
        <template #default="data">
          <comp-select
            v-if="data.row._editing"
            v-model="data.row.months"
            :options="monthOptions"
            multiple
            collapse-tags
          ></comp-select>
          <span v-else>{{ monthsFormattor(data.row.months) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="任务组"
        width="180"
        prop="group"
      ></el-table-column>
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
  nextTick,
} from 'vue';
import { useStore } from '/@/store';
import { MONTHS } from '/@/lib/const';
import { Pages } from '/@types/index';
import { uniqueIdGenerator } from '/@/lib/util';
import api from '/@/api';
import { useTableHeight } from '/@/pages/common/mixins/table-mixin';

export default defineComponent({
  setup(props, ctx) {
    const store = useStore();
    const that = getCurrentInstance(); // 实例
    const monthOptions = reactive([...MONTHS]);
    const tableData = reactive<Pages.DiaryYears.TableDataRows>([]);
    // 搜索条件
    const searchForm = reactive({
      onlyUnassigned: 0, // 仅看未分配月份
      months: [], // 月份
      keyword: '', // 关键词
      year: store.state.navbar.year, // 年份
    });

    const [refWrapper, tableHeight] = useTableHeight();

    // 查询年计划列表
    // api.searchYearPlans().then((res) => {
    //   tableData.length = 0;
    //   tableData.push(...res.data.data);
    // });

    return {
      searchForm,
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
          _editing: true,
          year: (store.state.navbar.year ?? new Date()).getFullYear(),
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
  methods: {
    // 月份格式化
    monthsFormattor(months: number[]): string {
      return months.map(it => it + 1).join(',') || '-';
    },
  },
});
</script>
