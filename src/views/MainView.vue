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
  height: 100vh;
  overflow: hidden;
}

.content-container {
  height: calc(100vh - #{v.$header-height});
  display: flex;
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
