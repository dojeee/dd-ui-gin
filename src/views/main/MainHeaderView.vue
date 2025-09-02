<template>
  <a-layout-header class="header">
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

      <a-dropdown>
        <div class="user-panel">
          <a-avatar
            size="large"
            src="https://randomuser.me/api/portraits/men/1.jpg"
          />
        </div>
        <template #overlay>
          <a-menu class="personalMenus">
            <a-menu-item class="themeButtons">
              <a-space size="2">
                <a-button class="themeButton" size="medium" @click="handlerLightTheme">☀️</a-button>
                <a-button class="themeButton" size="medium" @click="handlerDarkTheme">🌙</a-button>
              </a-space>
            </a-menu-item>
            <a-menu-item key="1">Profile</a-menu-item>
            <a-menu-item key="3" @click="logout">Logout</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import {
  BulbFilled,
  BulbOutlined,
  ControlOutlined,
} from "@ant-design/icons-vue";
import { useAuthStore } from "@/stores/authStores";
import { storeToRefs } from "pinia";

// store
const authStore = useAuthStore();
// router
const router = useRouter();
const { token } = storeToRefs(useAuthStore());

const handleTitleClick = async (): Promise<void> => {
  router.push("/");
};

const logout = async (): Promise<void> => {
  if (token.value) {
    console.log("token不为空,开始登出.");
    await authStore.logout();
  }
  router.push("/login");
};

const handlerLightTheme = async (): Promise<void> => {
  console.log("light");
};

const handlerDarkTheme = async (): Promise<void> => {
  console.log("dark");
};
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as v;

/* 本地字体：Italianno 放在 public/fonts/Italianno-Regular.ttf */
@font-face {
  font-family: "Italianno";
  src: url("/fonts/Italianno-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

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
  margin-top: 30px;
  color: v.$color-text-primary;
  font-size: v.$font-size-header;
  font-weight: v.$font-weight-semibold;
}

.header-title {
  font-family: "Italianno", cursive, system-ui;
  font-size: calc(var(--font-size, 40px) + 6px);
  line-height: 1;
  cursor: pointer;
  transition: transform 0.12s ease, color 0.12s ease;
}

.header-title:focus {
  outline: none;
  transform: translateY(-1px);
}

.header-title:hover {
  transform: translateY(-2px);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-panel {
  cursor: pointer;
}

.personalMenus {
  width: 120px;
  flex-direction: column;
}

.themeButtons {
//   flex-direction: row;
  
  align-items: center;
  justify-content: center;
}
.themeButton{
    border-width: 0px;
    border-radius: 4px;
}
</style>
