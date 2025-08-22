<template>
    <a-layout class="main">

        <a-layout-header class="main-header">
            <h2>Header</h2>
        </a-layout-header>

        <a-layout-content class="main-content">
            <h2>Content</h2>
            <router-view />
        </a-layout-content>

        <a-layout-footer class="main-footer">
            <h2>Footer</h2>
        </a-layout-footer>

    </a-layout>
</template>



<script setup>
</script>



<style scoped>
.main {
    background-color: skyblue;
}

.main-footer {
    float: bottom;
}
</style>
