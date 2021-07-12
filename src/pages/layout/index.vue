<template>
  <CompNavbar></CompNavbar>
  <div class="subpage">
    <router-view></router-view>
  </div>
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
