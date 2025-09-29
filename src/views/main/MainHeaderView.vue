<template>
  <a-layout-header class="header-container">
    <h2
      class="header-title"
      role="button"
      tabindex="0"
      @click="handleTitleClick"
      @keydown.enter="handleTitleClick"
    >
      Td Site
    </h2>
    <div class="header-right">
      <a-button class="feed-settings-btn">
        <template #icon>
          <ControlOutlined />
        </template>
        Feed settings
      </a-button>

      <a-dropdown :trigger="['click']">
        <div class="user-panel">
          <a-avatar
            size="large"
            src="https://randomuser.me/api/portraits/men/1.jpg"
          />
        </div>
        <template #overlay>
          <a-menu class="header-avatar-menu" @click="handleMenuClick">
            <!-- 主题切换项 -->
            <a-sub-menu key="themeSubMenu" title="Theme">
              <a-menu-item key="theme-light"
                >Light
                <template #icon>
                  <component size="18" :is="iconMap['PhSun']" />
                </template>
              </a-menu-item>

              <a-menu-item key="theme-dark">
                Dark
                <template #icon>
                  <component size="18" :is="iconMap['PhMoon']" />
                </template>
              </a-menu-item>

              <a-menu-item key="color-theme">
                Color
                <template #icon>
                  <component size="18" :is="iconMap['PhPalette']" />
                </template>
              </a-menu-item>

              <template #icon>
                <component size="18" :is="iconMap['PhTShirt']" />
              </template>
            </a-sub-menu>

            <a-menu-divider />

            <a-menu-item key="1"
              >Settings
              <template #icon>
                <component size="18" :is="iconMap['PhGear']" />
              </template>
            </a-menu-item>

            <a-menu-item key="2"
              >Logout
              <template #icon>
                <component size="18" :is="iconMap['PhSignOut']" />
              </template>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import {
  ControlOutlined,
  UserOutlined,
  SkinOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import { useAuthStore } from "@/stores/authStores";
import { useThemeStore } from "@/stores/themeStores";
import { storeToRefs } from "pinia";
import { iconMap } from "@/assets/icons/SideBarIconMap";
import { useProfileStore } from "@/stores/profileStores";

// store
const authStore = useAuthStore();
const themeStore = useThemeStore();
const { token } = storeToRefs(authStore);
const { enableModal } = useProfileStore();

// router
const router = useRouter();

// 标题点击
const handleTitleClick = (): void => {
  router.push("/");
};

// 退出登录
const logout = async (): Promise<void> => {
  if (token.value) {
    await authStore.logout();
  }
  router.push("/login");
};

const handleMenuClick = (e: { key: string; domEvent: MouseEvent }): void => {
  const { key, domEvent } = e;

  switch (key) {
    case "theme-light":
      themeStore.setTheme("light");
      break;
    case "theme-dark":
      themeStore.setTheme("dark");
      break;
    case "color-theme":
      themeStore.setTheme("color");
      break;
    case "1":
      enableModal();
      break;
    case "2":
      logout();
      break;
    default:
      break;
  }
};
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;

.header-container {
  background: var(--header-gradient-bg);
  border-bottom: 1px solid var(--border-color-base);
}

.header-container.ant-layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: v.$header-height;
  padding: 0 v.$spacing-lg;
}

.header-title {
  margin-top: 30px;
  color: var(--text-color-primary);
  font-size: 46px; /* Use a fixed value for simplicity */
  font-weight: 700;
  font-family: "Italianno", cursive, system-ui;
  line-height: 1;
  cursor: pointer;
  transition: transform 0.12s ease, color 0.12s ease;
}

.header-title:focus {
  outline: none;
  transform: translateY(-3px);
  font-size: 46px;
}

.header-title:hover {
  transform: translateX(2px);
  font-size: 48px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-panel {
  cursor: pointer;
}

.theme-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s ease;
  user-select: none;
}

.theme-container:hover {
  background: rgba(0, 0, 0, 0.04);
}

.theme-label {
  font-size: 14px;
  color: var(--text-color-secondary);
  font-weight: 500;
}

.header-avatar-menu {
  
  :deep(.ant-dropdown-menu-submenu-title) {
    display: flex;
    align-items: center;
    gap: v.$spacing-tow; 
  }

  // 确保 icon 自身也居中
  :deep(.ant-dropdown-menu-item-icon) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  // 让箭头也垂直居中
  :deep(.ant-dropdown-menu-submenu-arrow) {
    display: flex;
    align-items: center;
  }
}

.theme-switch {
  :deep(.ant-switch) {
    transition: all 0.3s ease;

    &::before {
      width: 18px;
      height: 18px;
      background: rgb(204, 65, 65);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transform: translateX(0);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &::after {
      width: 18px;
      height: 18px;
      top: 3px;
      background: #1890ff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
      background-color: #d9d9d9;
    }
  }

  :deep(.ant-switch-checked) {
    background-color: #1890ff;
    border-color: #096dd9;

    &::before {
      transform: translateX(26px);
      background: white;
    }

    &::after {
      transform: translateX(-26px);
    }

    &:hover {
      background-color: #40a9ff;
    }
  }
}
</style>
