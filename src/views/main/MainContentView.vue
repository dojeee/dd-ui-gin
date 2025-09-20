<template>
  <a-layout-content class="content-container">
    <!-- 使用 a-page-header 实现头部 -->
    <a-page-header
      :class="['pc-header', 'ant-page-header-overwrite']"
      :back-icon="canGoBack ? h(LeftOutlined) : undefined"
      @back="handleBack"
      :title="null"
      class="page-header"
    >
      <!-- 自定义面包屑 -->
      <template #breadcrumb>
        <a-breadcrumb class="pc-breadcrumb">
          <a-breadcrumb-item
            v-for="(item, index) in breadcrumbItems"
            :key="index"
          >
            <!-- 图标 -->
            <component
              v-if="item.icon && getIconComponent(item.icon)"
              :is="getIconComponent(item.icon)"
              class="pc-breadcrumb-icon"
            />

            <!-- 链接 or 文字 -->
            <router-link
              v-if="!item.isLast"
              :to="item.path"
              class="pc-breadcrumb-link"
            >
              {{ item.title }}
            </router-link>
            <span v-else class="pc-breadcrumb-text">{{ item.title }}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </template>

      <!-- 自定义标题和描述 -->
      <template #title>
        <div class="pc-title-wrapper">
          <h1 class="pc-title">{{ currentPage.title }}</h1>
          <p v-if="currentPage.description" class="pc-description">
            {{ currentPage.description }}
          </p>
        </div>
      </template>

      <!-- 右侧操作区 -->
      <template #extra>
        <div class="pc-actions">
          <slot name="page-actions"></slot>
        </div>
      </template>
    </a-page-header>

    <!-- 主体内容 -->
    <div class="pc-content-wrapper">
      <div class="pc-content">
        <router-view v-slot="{ Component, route }">
          <keep-alive :include="cachedViews">
            <component :is="Component" :key="route.name" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </a-layout-content>
</template>

<script setup lang="ts">
import { computed, h } from "vue";
import { useRoute, useRouter } from "vue-router";
import { iconMap } from "@/assets/icons/SideBarIconMap";
import { LeftOutlined } from "@ant-design/icons-vue";

const route = useRoute();
const router = useRouter();

// 当前激活的路由（有 meta.title 的）
const matchedRoutes = computed(() =>
  route.matched.filter((item) => item.meta?.title)
);

// 当前页面元数据
const currentPage = computed(() => {
  const meta = route.meta || {};
  return {
    title: (meta.title as string) || document.title || "未知页面",
    description: (meta.description as string) || "",
  };
});

// 是否显示返回按钮
const canGoBack = computed(() => {
  return router.options.history.state.back && matchedRoutes.value.length > 1;
});

// 返回逻辑
const handleBack = () => {
  router.go(-1);
};

// 面包屑数据（用于渲染 UI）
interface BreadcrumbItem {
  title: string;
  icon: string;
  path: string;
  isLast: boolean;
}

// 面包屑数据（用于渲染 UI）
const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  return matchedRoutes.value.map((item, index) => ({
    title: (item.meta.title as string) || "",
    icon: (item.meta.icon as string) || "",
    path: item.path,
    isLast: index === matchedRoutes.value.length - 1,
  }));
});

// 获取图标组件
const getIconComponent = (iconName: string) => {
  return (iconMap as Record<string, unknown>)[iconName] || null;
};

// 缓存视图
const cachedViews = ["Dashboard", "UserList"]; // 示例：可从 store 动态获取
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;
$page-header-border: var(--border-color-base);
$text-primary: var(--text-color-primary);
$text-secondary: var(--text-color-secondary);
$primary-color: var(--primary-color);
$content-bg: var(--content-bg);

.content-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* 覆盖 a-page-header 样式 */
:deep(.ant-page-header) {
  background-color: var(--content-bg);
}

:deep(.ant-page-header-breadcrumb) {
  margin-bottom: v.$spacing-breadcrumb-margin;
}

:deep(.ant-page-header-title) {
  padding: 0;
  font-size: v.$font-size-title;
  font-weight: 500;
  color: $text-primary;
}

:deep(.ant-page-header-extra) {
  margin-left: auto;
  white-space: nowrap;
}

:deep(.ant-page-header-heading) {
  flex-wrap: wrap;
  gap: v.$spacing-heading-gap;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.page-header {
  background-color: var(--content-page-header-bg);
  border-bottom: 1px solid var(--border-color-base);
}
/* 自定义面包屑样式 */
.pc-breadcrumb {
  .pc-breadcrumb-icon {
    font-size: v.$font-size-breadcrumb-icon;
    color: var(--breadcrumb-icon-color);
  }

  .pc-breadcrumb-link {
    color: $text-secondary;
    text-decoration: none;
    transition: color v.$transition-speed;

    &:hover {
      color: $primary-color;
    }
  }

  .pc-breadcrumb-text {
    color: $text-primary;
    font-weight: 500;
  }
}

.pc-title-wrapper {
  display: flex;
  flex-direction: column;
}

.pc-title {
  margin: 0;
  font-size: v.$font-size-title;
  font-weight: 500;
  color: $text-primary;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pc-description {
  margin: v.$spacing-breadcrumb-margin 0 0;
  font-size: v.$font-size-description;
  color: $text-secondary;
}

.pc-actions {
  display: flex;
  gap: v.$spacing-actions-gap;
  white-space: nowrap;
}

/* 滚动条样式 */
.pc-content-wrapper {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: v.$scrollbar-width;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb-color);
    border-radius: v.$scrollbar-thumb-border-radius;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--scrollbar-thumb-hover-color);
  }
}
.pc-content {
  flex: 1;
  min-height: 100%;
  background: var(--content-bg);
  padding: v.$content-padding;
  overflow-y: auto;
  overflow: hidden;
  flex: 1;
}

:deep(.ant-page-header-back) {
  display: none !important;
}
</style>
