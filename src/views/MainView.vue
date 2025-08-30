<!-- Layout.vue -->
<template>
    <a-layout class="admin-layout">

        <!-- 顶部导航 -->
        <MainHeaderView />

        <!-- 侧边栏 -->
        <MainSideBarView />

        <!-- 内容区域 -->
        <MainContentView />
    </a-layout>
</template>

<script setup>

import MainHeaderView from './main/MainHeaderView.vue';
import MainContentView from './main/MainContentView.vue';
import MainSideBarView from './main/MainSideBarView.vue';

</script>



<style scoped>
.admin-layout {
    min-height: 100vh;
    background-color: #0d0d0d;
}
</style>
