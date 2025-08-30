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


<style scoped>




.header {
    background: #1a1a1a;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: none;
    border-bottom: 1px solid #2a2a2a;
    height: 64px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1000;
}

.header-title {
    margin-top: 10px;
    color: #ffffff;
    font-size: 20px;
    font-weight: 600;
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
