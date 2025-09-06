<template>
  <a-layout class="main-layout">
    <!-- 顶部导航 -->
    <MainHeaderView />

    <a-layout class="content-container">
      <!-- 侧边栏 -->
      <MainSideBarView />

      <a-layout class="content-area">
        <!-- 主内容区 -->
        <MainContentView />

        <!-- 页脚 -->
        <MainFooterView />
      </a-layout>
    </a-layout>
    <!-- 内容区域 -->
  </a-layout>
</template>

<script setup lang="ts">
import MainHeaderView from "./main/MainHeaderView.vue";
import MainContentView from "./main/MainContentView.vue";
import MainSideBarView from "./main/MainSideBarView.vue";
import MainFooterView from "./main/MainFooterView.vue";
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;

.main-layout {
  max-width: 100%;
}
.content-container {
  width: 100%;
}
.content-area {
  overflow-y: auto; /* Allow content to scroll if it exceeds height */
  padding: 24px; /* Example padding, adjust as needed */
  background-color: var(--background-color-base);
  color: var(--text-color-primary);
  transition: background-color v.$global-transition-duration ease-in-out,
    color v.$global-transition-duration ease-in-out;
}
</style><a-layout class="main-layout">
  <MainHeaderView />
  <a-layout class="content-container">  <-- 这个layout是容器
    <MainSideBarView />                <-- Sider 在这个容器里
    <a-layout>                         <-- 另一个 layout 嵌套
      <MainContentView />
      <MainFooterView />
    </a-layout>
  </a-layout>
</template>
