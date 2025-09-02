<template>
  <a-config-provider :theme="currentTheme">
    <a-layout class="app">
      <router-view></router-view>
    </a-layout>
  </a-config-provider>
</template>

<script setup>

import { theme as antTheme } from 'ant-design-vue';
import { useThemeStore } from './stores/themeStores';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';


const themeStore = useThemeStore();
const { theme } = storeToRefs(themeStore);



const currentTheme = computed(() => {

  if (theme.value === 'dark') {
    return {
      algorithm: antTheme.darkAlgorithm,
    };
  }
  return {
    algorithm: antTheme.defaultAlgorithm,
  };
});
</script>





<style scoped>
.app {
  min-height: 100vh;
}
</style>
