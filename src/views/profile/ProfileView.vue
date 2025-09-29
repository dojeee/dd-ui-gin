<template>
  <div class="profile-container">
    <a-modal
      v-model:open="showModal"
      width="650px"
      :mask-closable="true"
      :closable="false"
      :destroy-on-close="true"
      :keyboard="true"
      :footer="null"
      class="account-modal"
    >
      <div class="account-modal-body">
        <div class="sidebar">
          <div class="sidebar__header">
            <a-button
              type="text"
              shape="circle"
              @click="closeModal"
              class="close-btn"
            >
              <template #icon>
                <component size="20" :is="iconMap['PhX']" />
              </template>
            </a-button>
          </div>

          <a-divider class="sidebar__divider" />

          <a-menu
            mode="vertical"
            class="sidebar__menu"
            v-model:selectedKeys="selectedMenuKey"
          >
            <a-menu-item
              v-for="menu in menuItems"
              :key="menu.key"
              :title="menu.title"
            >
              <template #icon>
                <component size="20" :is="iconMap[menu.icon]" />
              </template>
              <span>{{ menu.label }}</span>
            </a-menu-item>
          </a-menu>
        </div>

        <div class="content-area">
          <div v-if="activeMenu === 'general'">
            <p>ytryrChatGPT Plus</p>
            <p>fff GPT-5</p>
            <a-button type="primary" size="small" style="margin-top: 16px">
              upgrade
            </a-button>
            <a-divider />
            <p>dfgd</p>
            <p>sdfs</p>
            <p>sdfhgdfhd</p>
            <a-divider />
            <a-button type="danger" size="small">delete</a-button>
          </div>

          <div v-else-if="activeMenu === 'notification'">
            <h3>Notifications</h3>
          </div>

          <div v-else-if="activeMenu === 'account'">
            <h3>Account Settings</h3>
            <p>Dark Mode</p>
            <a-switch v-model:checked="darkMode" />
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useProfileStore } from "@/stores/profileStores";
import { storeToRefs } from "pinia";
import { iconMap } from "@/assets/icons/SideBarIconMap";
// 1. 先获取完整的 store 实例
const profileStore = useProfileStore();
// 2. 从实例中直接解构出 actions (方法)
const { disableModal } = profileStore;
// 3. 使用 storeToRefs 来包裹 store 实例，从中解构出 state 和 getters 以保持响应性
const { showModal, menuItems } = storeToRefs(profileStore);

// 控制菜单的选中项，默认为 'general'
const selectedMenuKey = ref(["general"]);
const darkMode = ref(false);

// 使用 computed 属性，当 selectedMenuKey 变化时，activeMenu 会自动更新
const activeMenu = computed(() => {
  return selectedMenuKey.value.length > 0 ? selectedMenuKey.value[0] : null;
});

const closeModal = () => {
  disableModal();
};
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;

// Modal 主体布局
.account-modal-body {
  display: flex;
  height: 550px;
}

// --- 左侧边栏 ---
.sidebar {
  width: 200px;
  background-color: var(--settings-menu-bg);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.sidebar__header {
  padding: v.$spacing-sm v.$spacing-md;
}

.close-btn {
  padding: 0;
  width: 32px;
  height: 32px;
  color: var(--sidebar-icon-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color v.$transition-speed ease;

  &:hover {
    background-color: var(--sidebar-item-hover-bg);
  }
}

.sidebar__divider {
  margin: 0 0;
  background-color: var(--settings-divider-bg);
}

.sidebar__menu {
  border-right: none !important;
  background-color: var(--settings-menu-bg);
  flex: 1; // 让菜单填满剩余垂直空间
  overflow-y: none; // 内容超出时滚动
  margin-top: v.$spacing-xs; // 与分隔线留出空隙
}

// 默认状态的文字颜色
.sidebar__menu :deep(.ant-menu-item) {
  color: var(--sidebar-text-color);
}

// 悬停状态 (当未被选中时)
.sidebar__menu :deep(.ant-menu-item:not(.ant-menu-item-selected):hover) {
  background-color: var(--settings-menu-item-hover-bg) !important;
}

// 选中状态
.sidebar__menu :deep(.ant-menu-item-selected) {
  color: var(--sidebar-icon-color) !important;
  background-color: var(--settings-menu-item-selected-bg) !important;
}

.sidebar__menu :deep(.ant-menu-item svg),
.sidebar__menu :deep(.ant-menu-item [class*="icon"]) {
  vertical-align: middle;
  display: inline-block;
}
// --- 右侧内容区 ---
.content-area {
  border: none;
  flex: 1;
  padding: v.$spacing-xl;
  overflow-y: auto;
  background-color: var(--background-color-base);
}
</style>

<style lang="scss">
@use "@/styles/design-tokens" as v;

.account-modal.ant-modal {
  // 控制 Modal 在屏幕中的垂直位置
  top: 15%;
}

.account-modal .ant-modal-content,
.account-modal .ant-modal-body {
  // 移除 antd 的所有默认内边距
  padding: v.$spacing-zero;
}

.account-modal .ant-modal-content {
  // 在这里设置圆角和溢出隐藏
  border-radius: v.$radius-xl;
  overflow: hidden;
  background-color: transparent; // 背景交由内部元素控制
}
</style>
