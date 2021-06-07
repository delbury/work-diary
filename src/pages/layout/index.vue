<template>
  <CompNavbar></CompNavbar>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CompNavbar from '/@/components/comp-navbar/index.vue';

export default defineComponent({
  name: 'PageLayout',
  components: {
    CompNavbar,
  },
});
</script>
