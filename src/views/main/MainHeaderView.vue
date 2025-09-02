<template>
    <a-layout-header class="header">
        <h2 class="header-title" role="button" tabindex="0" @click="handleTitleClick" @keydown.enter="handleTitleClick">
            Td Site
        </h2>
        <div class="header-right">
            <a-button class="feed-settings-btn">
                <template #icon>
                    <ControlOutlined />
                </template>
                Feed settings
            </a-button>

            <a-dropdown :trigger="['click']" :visible="dropdownVisible" @visibleChange="handleVisibleChange">
                <div class="user-panel">
                    <a-avatar size="large" src="https://randomuser.me/api/portraits/men/1.jpg" />
                </div>
                <template #overlay>
                    <a-menu>
                        <!-- 主题切换项 -->
                        <a-menu-item key="0" :focusable="false">
                            <div class="theme-container">
                                <span class="theme-label">Theme</span>
                                <a-switch v-model:checked="isDarkMode" class="theme-switch" @click.stop>
                                    <template #checkedChildren>☀️</template>
                                    <template #unCheckedChildren>🌙</template>
                                </a-switch>
                            </div>
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="1">Profile</a-menu-item>
                        <a-menu-item key="3" @click="logout">Logout</a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
    </a-layout-header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { ControlOutlined } from "@ant-design/icons-vue";
import { useAuthStore } from "@/stores/authStores";
import { useThemeStore } from "@/stores/themeStores";
import { storeToRefs } from "pinia";
import { computed } from 'vue';

// store
const authStore = useAuthStore();
const themeStore = useThemeStore();
const { token } = storeToRefs(authStore);
const { theme } = storeToRefs(themeStore);

// router
const router = useRouter();

// 下拉菜单状态控制
const dropdownVisible = ref<boolean>(false);

// 主题切换计算属性
const isDarkMode = computed<boolean>({
    get() {
        return theme.value === 'dark';
    },
    set(newValue: boolean) {
        themeStore.setTheme(newValue ? 'dark' : 'light');
    }
});

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

// 下拉菜单显示状态变化
const handleVisibleChange = (flag: boolean) => {
    dropdownVisible.value = flag;
};
</script>

<style lang="scss" scoped>
@use "@/styles/variables" as v;

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
    font-family: "Italianno", cursive, system-ui;
    font-size: calc(var(--font-size, 46px));
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
    color: v.$color-text-secondary;
    font-weight: 500;
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