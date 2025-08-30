<!-- Layout.vue -->
<template>
    <a-layout class="admin-layout">

        <!-- 顶部导航 -->
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



        <!-- 侧边栏 -->
        <a-layout-sider v-model:collapsed="collapsed" :width="240" :collapsed-width="70"
            :class="['sider', { 'is-collapsed': collapsed }]" theme="dark">

            <a-menu v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys" :inline-collapsed="collapsed"
                mode="inline" class="menu">

                <a-view class="menu-title">
                    <span v-show="!collapsed" class="submenu-title menu-header-span">Menus</span>
                    <a-button type="button" class="menu-toggle-btn" @click.stop="toggleSide">
                        <template #icon>
                            <MenuFoldOutlined v-if="!collapsed" />
                            <MenuUnfoldOutlined v-else />
                        </template>
                    </a-button>
                </a-view>

                <a-menu-item key="foryou" title="For You">
                    <template #icon>
                        <CompassOutlined />
                    </template>
                    <span>For You</span>
                </a-menu-item>
                <a-menu-item key="following" title="Following">
                    <template #icon>
                        <UsergroupAddOutlined />
                    </template>
                    <span>Following</span>
                </a-menu-item>
                <a-menu-item key="explore" title="Explore">
                    <template #icon>
                        <RiseOutlined />
                    </template>
                    <span>Explore</span>
                </a-menu-item>
                <a-menu-item key="history" title="History">
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
                    <a-menu-item key="addCustomFeed" title="Custom feed">
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
                    <a-menu-item key="findSquads" title="Find Squads">
                        <template #icon>
                            <TeamOutlined />
                        </template>
                        <span>Find Squads</span>
                    </a-menu-item>
                    <a-menu-item key="newSquad" title="New Squad">
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
                    <a-menu-item key="briefings" title="Presidential briefings">
                        <template #icon>
                            <ReadOutlined />
                        </template>
                        <span>Presidential briefings</span>
                    </a-menu-item>
                    <a-menu-item key="saves" title="Quick saves">
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
                    <a-menu-item key="tags" title="Tags">
                        <template #icon>
                            <TagOutlined />
                        </template>
                        <span>Tags</span>
                    </a-menu-item>
                    <a-menu-item key="sources" title="Sources">
                        <template #icon>
                            <GlobalOutlined />
                        </template>
                        <span>Sources</span>
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>

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
    MenuFoldOutlined,
    MenuUnfoldOutlined,
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

/* 可定制变量：统一管理侧边栏颜色/图标/字体等 */
.sider {
    --menu-icon-color: #e42f2f;
    --menu-icon-size: 20px;
    --menu-toggle-icon-size: 5px;
    --menu-font-size: 16px;
    --menu-text-color: #a0a0a0;
    --submenu-title-color: #6a6a6a;
    --submenu-font-size: 12px;
    --menu-hover-bg: #252525;
    --menu-selected-bg: #2a2a2a;
    --menu-selected-color: #ffffff;
}

/* 让侧边栏从 header 底部开始，不嵌入 header 下方 */
.sider {
    position: fixed;
    top: 64px;
    /* 与 header 高度一致 */
    bottom: 0;
    left: 0;
    z-index: 900;
    height: calc(100vh - 64px);
}

/* 主内容根据侧边栏宽度偏移，保证不被覆盖 */
.sider+.content-layout {
    margin-left: 240px;
    transition: margin-left 0.2s;
}

.sider.is-collapsed+.content-layout {
    margin-left: 80px;
}

.sider-content {
    flex-direction: column;
    height: 100%;
    display: flex;

}

.menu-header-right {
    display: flex;
    align-items: center;
}

.menu-header-toggle {
    color: #a0a0a0;
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
    /* 与菜单项保持相同的内边距和高度以保证对齐 */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    height: 44px;
    box-sizing: border-box;
    width: 100%;
}

.menu-toggle-btn {
    margin-left: auto;
    margin-right: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    min-width: 32px;
    color: var(--menu-icon-color);
    font-size: var(--menu-toggle-icon-size);
    padding: 2px 6px;
    border: none;
    background: transparent;
    cursor: pointer;
    clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
}

/* 保证折叠状态下按钮和菜单图标在同一行基线 */
.sider .menu-title .submenu-title,
.sider .menu :deep(.ant-menu-item) {
    display: flex;
    align-items: center;
}

.menu-header-span {
    color: var(--submenu-title-color);
    font-size: var(--submenu-font-size);
    font-weight: 500;
    letter-spacing: 0.5px;
}

.menu :deep(.ant-menu-item),
.menu :deep(.ant-menu-submenu-title) {
    color: var(--menu-text-color);
    border-radius: 6px;
    margin: 4px 0 !important;
    width: 100%;
    font-size: var(--menu-font-size);
}

.menu :deep(.ant-menu-item-selected) {
    background-color: var(--menu-selected-bg) !important;
    color: var(--menu-selected-color) !important;
}

.menu :deep(.ant-menu-item:hover),
.menu :deep(.ant-menu-submenu-title:hover) {
    background-color: var(--menu-hover-bg) !important;
    color: var(--menu-selected-color) !important;
}

.submenu-title {
    text-transform: uppercase;
    font-size: var(--submenu-font-size);
    font-weight: 500;
    color: var(--submenu-title-color);
    letter-spacing: 0.5px;
}

.menu :deep(.ant-menu-sub) {
    background: transparent !important;
}

.menu :deep(.ant-menu-submenu-arrow) {
    color: #6a6a6a;
}

/* 折叠时：隐藏父级 a-sub-menu（标题/箭头），展示其子项为图标形式 */
.sider.is-collapsed .menu :deep(.ant-menu-submenu-title),
.sider.is-collapsed .menu :deep(.ant-menu-submenu-arrow) {
    display: none !important;
}

.sider.is-collapsed .menu :deep(.ant-menu-submenu) {
    padding: 0 !important;
}

.sider.is-collapsed .menu :deep(.ant-menu-sub) {
    display: block !important;
}

.sider.is-collapsed .menu :deep(.ant-menu-sub) .ant-menu-item {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    padding: 0 !important;
    height: 40px;
    margin: 4px 0 !important;
}

.sider.is-collapsed .menu :deep(.ant-menu-item) span,
.sider.is-collapsed .menu :deep(.ant-menu-sub) .ant-menu-item span {
    display: none !important;
}

.sider.is-collapsed .menu :deep(.anticon) {
    font-size: var(--menu-icon-size) !important;
}

/* 图标统一样式 */
.menu :deep(.anticon) {
    color: var(--menu-icon-color);
    font-size: var(--menu-icon-size);
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


.collapse-sidebar-btn {
    color: #a0a0a0;
    font-size: 18px;
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