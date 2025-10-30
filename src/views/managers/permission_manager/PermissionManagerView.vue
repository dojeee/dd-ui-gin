<template>
  <div class="permission-manager-container">
    <!-- -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;

.permission-manager-container {
  display: flex;
  flex-direction: column;
  padding: v.$content-padding;
  height: 100%;
  overflow-y: auto;
  
  /* 需求4: 默认隐藏滚动条，悬停时显示 */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  
  &:hover {
    scrollbar-color: var(--scrollbar-thumb-color) transparent;
  }
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  &:hover::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb-color, #ccc);
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--scrollbar-thumb-hover-color, #999);
  }
}
</style>
