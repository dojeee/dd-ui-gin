<template>
    <a-layout class="main-layout">

        <!-- 顶部导航 -->
        <MainHeaderView />

        <!-- 侧边栏 -->
        <MainSideBarView />

        <!-- 内容区域 -->
        <MainContentView />
    </a-layout>
</template>

<script setup lang="ts">

import MainHeaderView from './main/MainHeaderView.vue';
import MainContentView from './main/MainContentView.vue';
import MainSideBarView from './main/MainSideBarView.vue';

</script>



<style scoped>
.main-layout {
    min-height: 100vh;
}
</style>
