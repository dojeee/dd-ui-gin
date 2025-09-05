<template>
  <a-layout class="main-layout">
    <!-- 顶部导航 -->
    <MainHeaderView />

    <a-layout :style="{ marginTop: '64px' }">
      <!-- 侧边栏 -->
      <MainSideBarView />

      <a-layout>
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
@use "@/styles/variables" as v;
.main-layout {
  min-height: 100vh;
}
</style>
