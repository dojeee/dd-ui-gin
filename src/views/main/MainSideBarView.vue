<template>
    
    <a-layout-sider
    v-model:collapsed="collapsed"
    :width="siderWidth"
    :collapsed-width="collapsedWidth"
    class="sidebar"
    :class="{ 'sidebar--collapsed': collapsed }"
  >
    <!-- 菜单区域 -->
    <div class="sidebar__menu">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        class="sidebar__menu-inner"
      >
        <!-- 菜单标题 + 折叠按钮 -->
        <div class="sidebar__menu-header">
          <span v-show="!collapsed" class="sidebar__menu-title">
            Menus
          </span>
          <a-button
            type="text"
            class="sidebar__toggle-btn"
            @click.stop="toggleCollapse"
          >
            <MenuFoldOutlined v-if="!collapsed" />
            <MenuUnfoldOutlined v-else />
          </a-button>
        </div>

        <!-- 主菜单项 -->
        <a-menu-item key="foryou">
          <template #icon><CompassOutlined /></template>
          For You
        </a-menu-item>
        <a-menu-item key="following">
          <template #icon><UsergroupAddOutlined /></template>
          Following
        </a-menu-item>
        <!-- 其他菜单项... -->

        <!-- 子菜单组 -->
        <a-sub-menu key="customFeeds">
          <template #title><span>Custom feeds</span></template>
          <a-menu-item key="addCustomFeed">
            <template #icon><PlusOutlined /></template>
            Custom feed
          </a-menu-item>
        </a-sub-menu>

        <!-- 更多子菜单... -->
      </a-menu>
    </div>
  </a-layout-sider>
</template>



<script setup>

import { ref, watch } from 'vue';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CompassOutlined,
  UsergroupAddOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue';

const collapsed = ref(false);
const selectedKeys = ref(['foryou']);
const allSubMenuKeys = ['customFeeds', 'network', 'bookmarks', 'discover'];
const openKeys = ref([...allSubMenuKeys]);

const siderWidth = 240;
const collapsedWidth = 80;

const toggleCollapse = () => {
  collapsed.value = !collapsed.value;
};

// 折叠时自动展开子菜单（只显示图标）
watch(collapsed, (val) => {
  openKeys.value = val ? allSubMenuKeys : allSubMenuKeys;
});

</script>



<style lang="scss" scoped>

@import '@/styles/index.scss';

.sidebar {
  background: $color-bg-sidebar;
  border-right: 1px solid $color-border;
  position: fixed;
  top: $header-height;
  bottom: 0;
  left: 0;
  z-index: 900;
  height: calc(100vh - $header-height);
  transition: width $transition-speed;

  &__menu {
    padding: 8px 0;
  }

  &__menu-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    height: 44px;
  }

  &__menu-title {
    font-size: $font-size-submenu;
    font-weight: $font-weight-submenu;
    color: $color-text-submenu;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  &__toggle-btn {
    padding: 4px;
    color: $color-text-submenu;
    font-size: 16px;

    &:hover {
      background-color: $color-bg-hover;
    }
  }

  // 菜单主体样式
  &__menu-inner {
    background: transparent;

    .ant-menu-item,
    .ant-menu-submenu-title {
      color: $color-text-secondary;
      height: $menu-item-height;
      line-height: $menu-item-height;
      margin: $menu-item-margin-y $menu-item-margin-x;
      padding: 0 12px;
      border-radius: $menu-border-radius;
      font-size: $font-size-menu;

      &:hover {
        background-color: $color-bg-hover;
      }

      &.ant-menu-item-selected {
        background-color: $color-bg-selected;
        color: $color-text-primary;
      }
    }

    // 子菜单标题
    .ant-menu-submenu-title {
      .ant-menu-title-content {
        font-weight: 500;
      }
    }
  }

  // 折叠状态
  &--collapsed {
    width: $collapsed-width !important;

    .sidebar__menu-title {
      display: none;
    }

    // 所有菜单项只保留图标
    .ant-menu-item,
    .ant-menu-submenu-title {
      justify-content: center;
      padding: 0 !important;

      .ant-menu-title-content,
      span:not(.anticon) {
        display: none;
      }
    }
  }
}

</style>
