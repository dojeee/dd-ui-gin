<template>

    <a-layout-header class="header">
        <h2 class="header-title">Td Site</h2>
        <div class="header-right">
            <a-button class="feed-settings-btn">
                <template #icon>
                    <ControlOutlined />
                </template>
                Feed settings
            </a-button>

            <a-dropdown>
                <div class="user-panel">
                    <a-avatar size="small" src="https://randomuser.me/api/portraits/men/1.jpg" />
                </div>
                <template #overlay>
                    <a-menu>
                        <a-menu-item key="1">Profile</a-menu-item>
                        <a-menu-item key="3" @click="logout">Logout</a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </a-layout-header>
</template>


<script setup>


</script>


<style lang="scss" scoped>
@use '@/styles/variables' as v;

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

.header-title {
    margin-top: 10px;
    color: v.$color-text-primary;
    font-size: v.$font-size-header;
    font-weight: v.$font-weight-semibold;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 16px;
}


.user-panel {
    cursor: pointer;
}

</style>
