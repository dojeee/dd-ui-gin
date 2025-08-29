<!-- Layout.vue -->
<template>
    <a-layout class="admin-layout">

        <!-- 顶部导航 -->
        <a-layout-header class="header">
            <div class="header-left">
                <span class="header-title">For You</span>
            </div>

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



        <!-- 侧边栏 -->
        <a-layout-sider v-model:collapsed="collapsed" collapsible :width="240" :collapsed-width="80"
            :class="['sider', { 'is-collapsed': collapsed }]" theme="dark">
            <div class="sider-content">
                <div class="menu-header">
                    <div class="menu-header-left">
                        <span class="menu-header-title" v-if="!collapsed">Menu</span>
                    </div>
                    <div class="menu-header-right">
                        <a-button type="text" class="menu-header-toggle" @click.stop="toggleSide">
                            <template #icon>
                                <LeftOutlined v-if="!collapsed" />
                                <RightOutlined v-else />
                            </template>
                        </a-button>
                    </div>
                </div>

                <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" mode="inline" theme="dark"
                    class="menu">
                    <!-- Static Group -->
                    <a-sub-menu key="menu" class="no-arrow">
                        <template #title>
                            <div class="menu-title">
                                <span class="submenu-title">MENUS</span>
                            </div>
                        </template>
                    </a-sub-menu>
                    <a-menu-item key="foryou">
                        <template #icon>
                            <CompassOutlined />
                        </template>
                        <span>For You</span>
                    </a-menu-item>
                    <a-menu-item key="following">
                        <template #icon>
                            <UsergroupAddOutlined />
                        </template>
                        <span>Following</span>
                    </a-menu-item>
                    <a-menu-item key="explore">
                        <template #icon>
                            <RiseOutlined />
                        </template>
                        <span>Explore</span>
                    </a-menu-item>
                    <a-menu-item key="history">
                        <template #icon>
                            <HistoryOutlined />
                        </template>
                        <span>History</span>
                    </a-menu-item>

                    <!-- Collapsible Groups -->
                    <a-sub-menu key="customFeeds">
                        <template #title>
                            <span class="submenu-title">Custom feeds</span>
                        </template>
                        <a-menu-item key="addCustomFeed">
                            <template #icon>
                                <PlusOutlined />
                            </template>
                            <span>Custom feed</span>
                        </a-menu-item>
                    </a-sub-menu>

                    <a-sub-menu key="network">
                        <template #title>
                            <span class="submenu-title">Network</span>
                        </template>
                        <a-menu-item key="findSquads">
                            <template #icon>
                                <TeamOutlined />
                            </template>
                            <span>Find Squads</span>
                        </a-menu-item>
                        <a-menu-item key="newSquad">
                            <template #icon>
                                <PlusOutlined />
                            </template>
                            <span>New Squad</span>
                        </a-menu-item>
                    </a-sub-menu>

                    <a-sub-menu key="bookmarks">
                        <template #title>
                            <span class="submenu-title">Bookmarks</span>
                        </template>
                        <a-menu-item key="briefings">
                            <template #icon>
                                <ReadOutlined />
                            </template>
                            <span>Presidential briefings</span>
                        </a-menu-item>
                        <a-menu-item key="saves">
                            <template #icon>
                                <BookOutlined />
                            </template>
                            <span>Quick saves</span>
                        </a-menu-item>
                    </a-sub-menu>

                    <a-sub-menu key="discover">
                        <template #title>
                            <span class="submenu-title">Discover</span>
                        </template>
                        <a-menu-item key="tags">
                            <template #icon>
                                <TagOutlined />
                            </template>
                            <span>Tags</span>
                        </a-menu-item>
                        <a-menu-item key="sources">
                            <template #icon>
                                <GlobalOutlined />
                            </template>
                            <span>Sources</span>
                        </a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </div>
        </a-layout-sider>

        <!-- 主内容区 -->
        <a-layout class="content-layout">


            <!-- 页面内容 -->
            <a-layout-content class="main-content">
                <router-view />
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script setup>
import {
    TeamOutlined,
    PlusOutlined,
    CompassOutlined, UsergroupAddOutlined, RiseOutlined, HistoryOutlined,
    ReadOutlined, BookOutlined, TagOutlined, GlobalOutlined,
    ControlOutlined, LeftOutlined, RightOutlined
} from '@ant-design/icons-vue';

import { ref, watch } from 'vue';

const collapsed = ref(false);
const selectedKeys = ref(['foryou']);
const allSubMenuKeys = ['customFeeds', 'network', 'bookmarks', 'discover'];
const openKeys = ref(allSubMenuKeys);
const allKeysOpen = ref(true);


// 切换侧边栏（左右展开/收起）
const toggleSide = () => {
    collapsed.value = !collapsed.value;
};

const logout = () => {
    console.log('User logged out');
    // 跳转登录页等
};
</script>

<style scoped>
.admin-layout {
    min-height: 100vh;
    background-color: #0d0d0d;
}

/* 侧边栏样式 */
.sider {
    background: #1a1a1a !important;
    box-shadow: none;
    border-right: 1px solid #2a2a2a;
    transition: all 0.2s;
    flex: 0 0 auto;
}

.sider-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 16px;
}

.menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    color: #a0a0a0;
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.menu-header-left {
    display: flex;
    align-items: center;
    gap: 8px;
}

.menu-header-right {
    display: flex;
    align-items: center;
}

.menu-header-toggle {
    color: #a0a0a0;
}

/* 折叠时 menu-header 的样式 */
.sider.is-collapsed .menu-header {
    padding: 8px 6px;
    justify-content: center;
}

.sider.is-collapsed .menu-header-title {
    display: none;
}

.collapse-all-btn {
    color: #a0a0a0;
    font-size: 18px;
}

.new-post-btn {
    background-color: #ffffff;
    color: #0d0d0d;
    border: none;
    border-radius: 8px;
    height: 40px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 16px;
}

.new-post-btn:hover {
    background-color: #f0f0f0;
}

.menu {
    background: transparent;
    border: none;
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
}

.menu-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.menu-toggle-btn {
    color: #a0a0a0;
    font-size: 14px;
}

.menu :deep(.ant-menu-item),
.menu :deep(.ant-menu-submenu-title) {
    color: #a0a0a0;
    border-radius: 6px;
    margin: 4px 0 !important;
    width: 100%;
}

.menu :deep(.ant-menu-item-selected) {
    background-color: #2a2a2a !important;
    color: #ffffff !important;
}

.menu :deep(.ant-menu-item:hover),
.menu :deep(.ant-menu-submenu-title:hover) {
    background-color: #252525 !important;
    color: #ffffff !important;
}

.submenu-title {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    color: #6a6a6a;
    letter-spacing: 0.5px;
}

.menu :deep(.ant-menu-sub) {
    background: transparent !important;
}

.menu :deep(.ant-menu-submenu-arrow) {
    color: #6a6a6a;
}

/* 主内容区 */
.content-layout {
    background: #0d0d0d;
}

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

.header-left {
    display: flex;
    align-items: center;
    gap: 16px;
}

.collapse-sidebar-btn {
    color: #a0a0a0;
    font-size: 18px;
}

.header-title {
    color: #ffffff;
    font-size: 20px;
    font-weight: 600;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 16px;
}

.feed-settings-btn {
    background-color: #2a2a2a;
    color: #a0a0a0;
    border: 1px solid #4a4a4a;
    border-radius: 8px;
}

.user-panel {
    cursor: pointer;
}

/* 内容区域 */
.main-content {
    padding: 88px 24px 24px 24px;
    /* 顶部留出 header 空间 */
    color: #ffffff;
}
</style>