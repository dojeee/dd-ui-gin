<template>
  <a-layout-footer v-show="false" class="footer-container">
    Ant Design ©2018 Created by Ant UED
  </a-layout-footer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const feature = ref();
</script>

<style lang="scss" scoped>
.footer-container {
  width: 100%;
  text-align: center;
  background-color: var(--footer-bg) !important;
  color: var(--text-color-secondary);
  padding: 16px 0;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}
</style>
