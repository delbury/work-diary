<template>
  <el-select
    v-bind="$attrs"
    clearable
    @input="ev => $emit('input', ev)"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CompSelect',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [Number, String, Array, Boolean],
      default: '',
    },
  },
  emits: ['input'],
  setup(props, ctx) {
    return {
    };
  },
});
</script>
