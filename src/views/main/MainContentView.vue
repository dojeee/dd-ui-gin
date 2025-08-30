
<template>

    <a-layout class="content-layout">
        <a-layout-content class="main-content">
            <router-view />
        </a-layout-content>
    </a-layout>

</template>


<script setup>
import { ref } from 'vue';

const feature = ref();
</script>



<style lang="scss" scoped>

/* 内容区域 */
.main-content {
    padding: 88px 24px 24px 24px;
    /* 顶部留出 header 空间 */
    color: #ffffff;
}
.sider+.content-layout {
    margin-left: 240px;
    transition: margin-left 0.2s;
}

</style>
