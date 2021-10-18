<template>
  <CompDialog
    v-bind="$attrs"
    title="新建年计划"
    width="500px"
    @on-confirm="submit"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      label-width="100px"
    >
      <el-form-item
        label="任务年度"
        required
      >
        <el-date-picker
          v-model="formModel.year"
          type="year"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="指定月份">
        <comp-select
          v-model="formModel.months"
          :options="monthOptions"
          multiple
        ></comp-select>
      </el-form-item>

      <el-form-item
        label="目标项"
        required
      >
        <el-input
          v-model="formModel.desc"
          type="textarea"
          :autosize="{
            minRows: 5,
          }"
          placeholder="请输入计划详情"
        ></el-input>
      </el-form-item>
    </el-form>
  </CompDialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import type { Server } from '/@types/server';
import { ElForm } from 'element-plus';
import { MONTHS } from '/@/lib/const';
import api from '/@/api';

type ElFormInstance = InstanceType<typeof ElForm>

export default defineComponent({
  emits: ['on-done'],
  setup(props, ctx) {
    const loading = ref(false);
    const formModel = reactive({
      desc: '',
      months: [],
      year: new Date(),
    });
    const formRef = ref<ElFormInstance>();

    const monthOptions = reactive([...MONTHS]);

    // 确认提交
    const submit = ({ close }: { close: () => void }) => {
      formRef.value?.validate(async(isValid) => {
        if(isValid) {
          // 验证通过，构造表单数据
          const postData: Server.YearsPlanRowRequest = {
            year: formModel.year.getFullYear(),
            months: formModel.months,
            desc: formModel.desc,
          };
          try {
            loading.value = true;
            const res = await api.addYearPlan(postData);
            ctx.emit('on-done');
            close();
          } finally {
            loading.value = false;
          }
        }
      });
    };

    return {
      formModel,
      formRef,
      monthOptions,
      submit,
    };
  },
});
</script>
