<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :width="230"
    :collapsed-width="70"
    :class="['sidebar-container', { 'is-collapsed': collapsed }]"
    theme="dark"
  >
    <!-- menu list -->
    <a-menu
      mode="inline"
      class="sidebar-menu"
      v-model:selectedKeys="selectedMenuKey"
      v-model:openKeys="openKeys"
      @click="handleMenuClick"
    >
      <!-- header collapsed -->
      <div class="menu-header">
        <span v-show="!collapsed" class="menu-header-title">Menus</span>
        <a-button type="text" class="menu-toggle-btn" @click.stop="toggleSide">
          <template #icon>
            <MenuFoldOutlined v-if="!collapsed" />
            <MenuUnfoldOutlined v-else />
          </template>
        </a-button>
      </div>
      <template v-for="menu in sideBarMenus" :key="menu.key">
        <!-- 有 children → 渲染为 a-sub-menu -->
        <a-sub-menu
          v-if="menu.children && menu.children.length > 0"
          :key="menu.key"
          :title="menu.title"
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
        <a-menu-item
          v-if="!menu.children || menu.children.length === 0"
          :key="menu.key"
          :title="menu.title"
        >
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
import { ref, onMounted, watch } from "vue";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import useSideBarMenusStores from "@/stores/sideBarMenusStores";
import { storeToRefs } from "pinia";
import { iconMap } from "@/assets/icons/SideBarIconMap";

// menu store
const sideBarMenusStores = useSideBarMenusStores();
const { sideBarMenus, topLevelKeys, firstSelectedKey } =
  storeToRefs(sideBarMenusStores);

const collapsed = ref(false);
const selectedMenuKey = ref([]);
const openKeys = ref([]);

const handleMenuClick = ({ key }) => {
  if (key) {
    selectedMenuKey.value = [key];
  }
};

const toggleSide = () => {
  collapsed.value = !collapsed.value;
  if (collapsed.value) {
    openKeys.value = [];
  }
};

watch(firstSelectedKey, (newKey) => {
  selectedMenuKey.value = [newKey];
});
onMounted(() => {
  // set default open keys
  const initialOpenKeys = sideBarMenus.value
    .filter((menu) => menu.children && menu.children.length > 0)
    .map((menu) => menu.key);
  openKeys.value = initialOpenKeys;

  // set default selected menu
  selectedMenuKey.value = [firstSelectedKey.value];
});
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as v;

.sidebar-container {
  position: v.$sidebar-position;
  height: calc(100vh - #{v.$sidebar-top});
  top: v.$sidebar-top;
  bottom: v.$sidebar-bottom;
  background: v.$gradient-bg-sidebar !important;
}

/* 关键：对 Ant Design 内部的包装容器应用 flex 布局 */
.sidebar-container :deep(.ant-layout-sider-children) {
  display: flex;
  flex-direction: column;
  height: 100%;
  transform: translateZ(0);
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
  flex-shrink: 0;
}

/* 菜单容器 */
.sidebar-menu {
  background: transparent;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  /* For IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
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
  height: auto;
  left: 7px;
  justify-content: center;
  color: v.$color-text-icon;
  font-size: v.$font-size-icon;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  cursor: pointer;
  // transition: background-color v.$transition-speed;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-toggle-btn:hover {
  background-color: v.$color-bg-hover;
}

/* 菜单项基础样式 */
.sidebar-menu :deep(.ant-menu-item) {
  color: v.$color-text-secondary;
  border-radius: v.$menu-border-radius;
  line-height: v.$menu-item-height;
  padding: 0 v.$menu-padding-x !important;
  user-select: none;
}

/* 子菜单标题样式 - 不应该有选中状态 */
.sidebar-menu :deep(.ant-menu-submenu-title) {
  color: v.$color-text-secondary;
  margin: v.$menu-item-margin-y v.$menu-item-margin-x !important;
  width: calc(100% - #{v.$menu-item-margin-x * 2});
  padding: 0 v.$menu-padding-x !important;
  user-select: none;
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

/* 子菜单标题 */
.submenu-title {
  text-transform: uppercase;
  font-size: v.$font-size-submenu;
  font-weight: v.$font-weight-medium;
  color: v.$color-text-submenu;
  letter-spacing: 0.5px;
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
.sidebar-container.is-collapsed .sidebar-menu :deep(.ant-menu-submenu-title) {
  text-align: center !important;
}

.sidebar-container.is-collapsed .sidebar-menu :deep(.ant-menu-submenu-arrow) {
  display: none !important;
}

.sidebar-container.is-collapsed .sidebar-menu :deep(.ant-menu-sub) {
  display: block !important;
}

/* 统一所有菜单项样式 - 一级和二级菜单项都显示为同样的图标 */
.sidebar-container.is-collapsed .sidebar-menu :deep(.ant-menu-item),
.sidebar-container.is-collapsed
  .sidebar-menu
  :deep(.ant-menu-sub .ant-menu-item) {
  text-align: center !important;
}

/* 隐藏所有文字，只保留图标 */
.sidebar-container.is-collapsed
  .sidebar-menu
  :deep(.ant-menu-item)
  .ant-menu-title-content,
.sidebar-container.is-collapsed
  .sidebar-menu
  :deep(.ant-menu-item)
  span:not(.anticon),
.sidebar-container.is-collapsed
  .sidebar-menu
  :deep(.ant-menu-sub .ant-menu-item)
  .ant-menu-title-content,
.sidebar-container.is-collapsed
  .sidebar-menu
  :deep(.ant-menu-sub .ant-menu-item)
  span:not(.anticon) {
  display: none !important;
}
</style>
