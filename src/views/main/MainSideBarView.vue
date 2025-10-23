<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :width="250"
    :collapsed-width="70"
    :class="['sidebar-container', { 'is-collapsed': collapsed }]"
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
            <span>{{ menu.label }}</span>
          </template>

          <!-- 子菜单项 -->
          <a-menu-item
            v-for="child in menu.children"
            :key="child.key"
            :title="child.title"
          >
            <template #icon>
              <component
                :is="iconMap[child.icon]"
                v-if="child.icon"
                class="sidebar-icon"
              />
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
            <component
              :is="iconMap[menu.icon]"
              v-if="menu.icon"
              class="sidebar-icon"
            />
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
import { useSideBarMenusStores } from "@/stores/sideBarMenusStores";
import { storeToRefs } from "pinia";
import { iconMap } from "@/assets/icons/SideBarIconMap";
import { useRouter } from "vue-router";
import router from "@/routers";

// menu store
const sideBarMenusStores = useSideBarMenusStores();
const { sideBarMenus, topLevelKeys, firstSelectedKey } =
  storeToRefs(sideBarMenusStores);

const collapsed = ref(false);
const selectedMenuKey = ref([]);
const openKeys = ref([]);

const ruoter = useRouter();

const handleMenuClick = ({ key }) => {
  if (key) {
    selectedMenuKey.value = [key];
  }

  console.log("menus is: ", key);
  switch (key) {
    case "usersManager":
      ruoter.push("/manager/user");
      break;
    case "roleManager":
      router.push("/manager/role");
      break;
    case "permissionManager":
      router.push("/manager/permission");
      break;
    case "chat":
      router.push("/llms/chat");
      break;
    default:
      break;
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
@use "@/styles/design-tokens" as v;

.sidebar-container {
  background: var(--sidebar-bg) !important;
  transition: background 0.3s ease-in-out;
  border-right: 0.8px solid var(--sidebar-right-border-color);
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

  -ms-overflow-style: none;
  scrollbar-width: none;
  border-right: 0 !important;
}

.menu-header-title {
  text-transform: uppercase;
  font-size: v.$font-size-submenu;
  font-weight: v.$font-weight-medium;
  color: var(--sidebar-text-color-submenu);
  letter-spacing: 0.5px;
}

.menu-toggle-btn {
  height: auto;
  left: 7px;
  color: var(--sidebar-icon-color);
  font-size: v.$font-size-icon;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  cursor: pointer;
  transition: background-color v.$transition-speed ease;
}

.menu-toggle-btn:hover {
  background-color: var(--sidebar-item-hover-bg);
}

/* ========== 菜单项通用样式 ========== */
.sidebar-menu :deep(.ant-menu-item),
.sidebar-menu :deep(.ant-menu-submenu-title) {
  color: var(--sidebar-text-color);
  border-radius: v.$menu-border-radius;
  line-height: v.$menu-item-height;
  padding: 0 v.$menu-padding-x !important;
  user-select: none;
}

/* 子菜单标题特殊样式 */
.sidebar-menu :deep(.ant-menu-submenu-title) {
  color: var(--sidebar-text-color-submenu);
  margin: v.$menu-item-margin-y v.$menu-item-margin-x !important;
  width: calc(100% - #{v.$menu-item-margin-x * 2});
}

/* 选中状态 */
.sidebar-menu :deep(.ant-menu-item-selected) {
  background-color: var(--sidebar-item-selected-bg) !important;
  color: var(--sidebar-text-color) !important;
}

/* 悬停状态 */
.sidebar-menu :deep(.ant-menu-item:not(.ant-menu-item-selected):hover),
.sidebar-menu :deep(.ant-menu-submenu-title:hover) {
  background-color: var(--sidebar-item-hover-bg) !important;
  color: var(--sidebar-text-color) !important;
}

/* 子菜单背景 */
.sidebar-menu :deep(.ant-menu-sub) {
  background-color: var(--sidebar-submenus-bg) !important;
}

/* 子菜单箭头颜色 */
.sidebar-menu :deep(.ant-menu-submenu-arrow) {
  color: var(--sidebar-text-color-submenu);
}

/* ========== Phosphor 图标统一控制 ========== */
.sidebar-menu :deep(.sidebar-icon) {
  width: v.$font-size-icon;
  height: v.$font-size-icon;
  fill: var(--sidebar-icon-color);
  stroke: none;
  vertical-align: middle;
  text-align: center;
}

/* 折叠状态：隐藏文字，只显示图标 */
.sidebar-container.is-collapsed
  .sidebar-menu
  :deep(.ant-menu-item .ant-menu-title-content),
.sidebar-container.is-collapsed
  .sidebar-menu
  :deep(.ant-menu-sub .ant-menu-item .ant-menu-title-content) {
  display: none !important;
}

/* 折叠状态：图标水平居中 */
.sidebar-container.is-collapsed .sidebar-menu :deep(.ant-menu-item) {
  text-align: center !important;
}

/* 隐藏子菜单箭头（折叠时） */
.sidebar-container.is-collapsed .sidebar-menu :deep(.ant-menu-submenu-arrow) {
  display: none !important;
}

/* 修复折叠时子菜单显示问题 */
.sidebar-container.is-collapsed .sidebar-menu :deep(.ant-menu-sub) {
  display: block !important;
  transition: none !important;
}
</style>
