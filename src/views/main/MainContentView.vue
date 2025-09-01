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
@use '@/styles/variables' as v;

/* 内容区域 */
.content-layout {
    background: v.$gradient-bg-content;
    min-height: 100vh;
}

.main-content {
    background: v.$gradient-bg-content;
    padding: 88px 24px 24px 24px;
    /* 顶部留出 header 空间 */
    color: v.$color-text-primary;
    min-height: calc(100vh - 88px);
}

.sider+.content-layout {
    margin-left: v.$sider-width;
    transition: margin-left v.$transition-speed;
}
</style>
