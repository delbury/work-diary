<template>
  <el-dialog
    v-bind="$attrs"
    @closed="handleClosed"
  >
    <slot></slot>

    <template #title>
      <slot name="title"></slot>
    </template>

    <template #footer>
      <slot name="footer">
        <el-button @click="handleCancel">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="handleConfirm"
        >
          确定
        </el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElDialog } from 'element-plus';

type IProps = (InstanceType<typeof ElDialog>)['$props']

export default defineComponent<IProps>({
  name: 'CompDialog',
  emits: ['on-cancel', 'update:modelValue', 'on-confirm'],
  setup(props, { emit, attrs }) {
    // 主动关闭弹框
    const handleClosed = () => {
      emit('update:modelValue', false);
    };

    return {
      handleCancel: () => {
        handleClosed();
        emit('on-cancel');
      },
      handleConfirm: () => {
        emit('on-confirm', { close: handleClosed });
      },
      handleClosed,
    };
  },
});
</script>
