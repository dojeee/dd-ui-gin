<template>
  <a-layout class="main-layout">
    <!-- 顶部导航 -->
    <MainHeaderView />

    <a-layout :style="{ marginTop: '64px' }">

        <!-- 侧边栏 -->
      <MainSideBarView />

        
      <a-layout :style="{ marginLeft: '240px' }">
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
import MainFooterView from "./main/MainFooterView.vue"
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as v;
.main-layout {
  min-height: 100vh;
}

.header {
  background: v.$gradient-bg-header;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 0px solid v.$color-border;
  height: v.$header-height;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: v.$z-index-header;
}
</style>
