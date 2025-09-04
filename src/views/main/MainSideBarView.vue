<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :width="240"
    :collapsed-width="70"
    :class="['sidebar', { 'is-collapsed': collapsed }]"
    theme="dark"
  >
    <a-menu
      :inline-collapsed="collapsed"
      mode="inline"
      class="sidebar-menu"
      v-model:selectedKeys="defaultSelectMenuKey"
      v-model:openKeys="openKeys"
    >
      <!-- 菜单头部 -->
      <div class="menu-header">
        <span v-show="!collapsed" class="menu-header-title">Menus</span>
        <a-button type="text" class="menu-toggle-btn" @click.stop="toggleSide">
          <template #icon>
            <MenuFoldOutlined v-if="!collapsed" />
            <MenuUnfoldOutlined v-else />
          </template>
        </a-button>
      </div>

      <!-- 动态渲染菜单项 -->
      <template v-for="menu in sideBarMenus" :key="menu.key">
        <!-- 有 children → 渲染为 a-sub-menu -->
        <a-sub-menu
          :key="menu.key"
          v-if="menu.children && menu.children.length > 0"
        >
          <template #title>
            <span class="submenu-title">{{ menu.label }}</span>
          </template>

          <!-- 子菜单项 -->
          <a-menu-item
            v-for="child in menu.children"
            :key="child.key"
            :title="child.title"
          >
            <template #icon>
              <component :is="iconMap[child.icon]" v-if="child.icon" />
            </template>
            <span>{{ child.label }}</span>
          </a-menu-item>
        </a-sub-menu>

        <!-- 无 children → 渲染为 a-menu-item -->
        <a-menu-item v-else :key="menu.key" :title="menu.title">
          <template #icon>
            <component :is="iconMap[menu.icon]" v-if="menu.icon" />
          </template>
          <span>{{ menu.label }}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup>
import { ref, watch } from "vue";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import useSideBarMenusStores from "@/stores/sideBarMenusStores";
import { storeToRefs } from "pinia";
import { iconMap } from "@/assets/icons/SideBarIconMap";

// menu store
const sideBarMenusStores = useSideBarMenusStores();
const { sideBarMenus, topLevelKeys, firstSelectedKey } =
  storeToRefs(sideBarMenusStores);

const collapsed = ref(false);
const defaultSelectMenuKey = ref([firstSelectedKey.value]);

const initialOpenKeys = sideBarMenus.value
  .filter((menu) => menu.children && menu.children.length > 0)
  .map((menu) => menu.key);
const openKeys = ref(initialOpenKeys);

watch(firstSelectedKey, (newKey) => {
  defaultSelectMenuKey.value = [newKey];
});

const toggleSide = () => {
  collapsed.value = !collapsed.value;
};
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as v;

.sidebar {
  background: v.$gradient-bg-sidebar !important;
  box-shadow: none;
  border-right: 0px solid v.$color-border;
  transition: all v.$transition-speed v.$transition-easing;
  flex: 0 0 auto;

  /* 固定定位 */
  position: fixed;
  top: v.$header-height;
  bottom: 0;
  left: 0;
  z-index: v.$z-index-sidebar;
  height: calc(100vh - #{v.$header-height});
}

/* 菜单容器 */
.sidebar-menu {
  background: transparent;
  border: none;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 菜单标题区域 */
.menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: v.$spacing-sm v.$spacing-md;
  height: calc(#{v.$menu-item-height} + #{v.$spacing-sm});
  box-sizing: border-box;
  width: 100%;
}

.menu-header-title {
  text-transform: uppercase;
  font-size: v.$font-size-submenu;
  font-weight: v.$font-weight-medium;
  color: v.$color-text-submenu;
  letter-spacing: 0.5px;
}

/* 切换按钮 */
.menu-toggle-btn {
  margin-left: auto;
  margin-right: v.$spacing-xs;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: v.$button-height;
  min-width: v.$button-height;
  color: v.$color-text-icon;
  font-size: v.$font-size-icon-small;
  padding: v.$spacing-xs;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: v.$button-border-radius;
  transition: background-color v.$transition-speed;
}

.menu-toggle-btn:hover {
  background-color: v.$color-bg-hover;
}

/* 菜单项基础样式 */
.sidebar-menu :deep(.ant-menu-item) {
  color: v.$color-text-secondary;
  border-radius: v.$menu-border-radius;
  margin: v.$menu-item-margin-y v.$menu-item-margin-x !important;
  width: calc(100% - #{v.$menu-item-margin-x * 2});
  font-size: v.$font-size-menu;
  height: v.$menu-item-height;
  line-height: v.$menu-item-height;
  padding: 0 v.$menu-padding-x !important;
  transition: all v.$transition-speed;
}

/* 子菜单标题样式 - 不应该有选中状态 */
.sidebar-menu :deep(.ant-menu-submenu-title) {
  color: v.$color-text-secondary;
  border-radius: v.$menu-border-radius;
  margin: v.$menu-item-margin-y v.$menu-item-margin-x !important;
  width: calc(100% - #{v.$menu-item-margin-x * 2});
  font-size: v.$font-size-menu;
  height: v.$menu-item-height;
  line-height: v.$menu-item-height;
  padding: 0 v.$menu-padding-x !important;
  transition: all v.$transition-speed;
  user-select: none;
  /* 防止文字被选中 */
}

.sidebar-menu :deep(.ant-menu-item-selected) {
  background-color: v.$color-bg-selected !important;
  color: v.$color-text-primary !important;
}

/* 只有菜单项才有悬停效果，子菜单标题不要选中样式 */
.sidebar-menu :deep(.ant-menu-item:hover) {
  background-color: v.$color-bg-hover !important;
  color: v.$color-text-primary !important;
}

.sidebar-menu :deep(.ant-menu-submenu-title:hover) {
  background-color: v.$color-bg-hover !important;
  color: v.$color-text-primary !important;
}

/* 确保子菜单标题不会有选中状态 */
.sidebar-menu :deep(.ant-menu-submenu-title-selected),
.sidebar-menu
  :deep(.ant-menu-submenu.ant-menu-submenu-selected > .ant-menu-submenu-title) {
  background-color: transparent !important;
  color: v.$color-text-secondary !important;
}

/* 子菜单标题 */
.submenu-title {
  text-transform: uppercase;
  font-size: v.$font-size-submenu;
  font-weight: v.$font-weight-medium;
  color: v.$color-text-submenu;
  letter-spacing: 0.5px;
}

/* 子菜单容器 */
.sidebar-menu :deep(.ant-menu-sub) {
  background: transparent !important;
}

.sidebar-menu :deep(.ant-menu-submenu-arrow) {
  color: v.$color-text-muted;
}

/* 图标样式 */
.sidebar-menu :deep(.anticon) {
  color: v.$color-text-icon;
  font-size: v.$font-size-icon;
}

/* 折叠状态样式 */
.sidebar.is-collapsed .sidebar-menu :deep(.ant-menu-submenu-title) {
  display: none !important;
}

.sidebar.is-collapsed .sidebar-menu :deep(.ant-menu-submenu-arrow) {
  display: none !important;
}

/* 让子菜单容器展开，不显示嵌套结构 */
.sidebar.is-collapsed .sidebar-menu :deep(.ant-menu-submenu) {
  height: auto !important;
  line-height: normal !important;
  margin: 0 !important;
  padding: 0 !important;
}

.sidebar.is-collapsed .sidebar-menu :deep(.ant-menu-sub) {
  position: static !important;
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  transform: none !important;
  left: auto !important;
  top: auto !important;
  width: 100% !important;
  display: block !important;
}

/* 统一所有菜单项样式 - 一级和二级菜单项都显示为同样的图标 */
.sidebar.is-collapsed .sidebar-menu :deep(.ant-menu-item),
.sidebar.is-collapsed .sidebar-menu :deep(.ant-menu-sub .ant-menu-item) {
  text-align: center !important;
  padding: 0 !important;
  margin: v.$menu-item-margin-y v.$menu-item-margin-x !important;
  width: calc(100% - #{v.$menu-item-margin-x * 2}) !important;
  height: v.$menu-item-height !important;
  line-height: v.$menu-item-height !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  border-radius: v.$menu-border-radius !important;
  position: relative !important;
}

/* 隐藏所有文字，只保留图标 */
.sidebar.is-collapsed
  .sidebar-menu
  :deep(.ant-menu-item)
  .ant-menu-title-content,
.sidebar.is-collapsed .sidebar-menu :deep(.ant-menu-item) span:not(.anticon),
.sidebar.is-collapsed
  .sidebar-menu
  :deep(.ant-menu-sub .ant-menu-item)
  .ant-menu-title-content,
.sidebar.is-collapsed
  .sidebar-menu
  :deep(.ant-menu-sub .ant-menu-item)
  span:not(.anticon) {
  display: none !important;
}

/* 确保所有图标显示并对齐 */
.sidebar.is-collapsed .sidebar-menu :deep(.anticon) {
  font-size: v.$font-size-icon !important;
  margin: 0 !important;
  display: inline-flex !important;
  color: v.$color-text-icon !important;
  justify-content: center !important;
  align-items: center !important;
}

.sidebar.is-collapsed .sidebar-menu :deep(.ant-menu-item .anticon),
.sidebar.is-collapsed
  .sidebar-menu
  :deep(.ant-menu-sub .ant-menu-item .anticon) {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

/* 确保子菜单项的悬停和选中效果 */
.sidebar.is-collapsed .sidebar-menu :deep(.ant-menu-sub .ant-menu-item:hover) {
  background-color: v.$color-bg-hover !important;
  color: v.$color-text-primary !important;
}

.sidebar.is-collapsed
  .sidebar-menu
  :deep(.ant-menu-sub .ant-menu-item-selected) {
  background-color: v.$color-bg-selected !important;
  color: v.$color-text-primary !important;
}

/* 其他按钮样式 */
.new-post-btn {
  background-color: v.$color-text-primary;
  color: v.$color-text-dark;
  border: none;
  border-radius: v.$button-border-radius-large;
  height: v.$button-height-large;
  font-size: v.$font-size-button;
  font-weight: v.$font-weight-semibold;
  margin-bottom: v.$spacing-lg;
}

.new-post-btn:hover {
  background-color: v.$color-bg-button-hover;
}

.feed-settings-btn {
  background-color: v.$color-bg-button;
  color: v.$color-text-muted;
  border: 1px solid v.$color-border-button;
  border-radius: v.$button-border-radius-large;
}

.header-title {
  margin-top: 10px;
  color: v.$color-text-primary;
  font-size: v.$font-size-header;
  font-weight: v.$font-weight-semibold;
}
</style>
