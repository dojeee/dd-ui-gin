<template>
  <a-layout-content class="content-container">
    <div class="content-wrapper">
      <h2>this is content header</h2>
      <h2>this is content header</h2>
      <h2>this is content header</h2>
      <h2>this is content header</h2>
      ...
      <br />
      Really
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      long
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      <br />
      ...
      <br />
      ...
      <br />
      long
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      <br />
      ...
      <br />
      ...
      <br />
      long
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <h2>sssdsd</h2>
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />

      <router-view />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      content
    </div>
  </a-layout-content>
</template>

<script setup lang="ts">
import { ref } from "vue";

const feature = ref();
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;

.content-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--content-bg);
  color: var(--text-color-primary);
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  // 自定义滚动条样式
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
}

.content-wrapper {
  padding: v.$spacing-xl;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}
</style>
