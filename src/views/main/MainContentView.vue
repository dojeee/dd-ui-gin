<template>
  <a-layout-content class="page-container">
    <!-- 自定义页面头部 -->
    <div class="pc-header">
      <!-- 左侧：面包屑 + 返回按钮 -->
      <div class="pc-header-left">
        <!-- 返回按钮（可选） -->
        <a-button
          v-if="canGoBack"
          type="text"
          size="small"
          class="pc-back-btn"
          @click="handleBack"
        >
          <LeftOutlined />
        </a-button>

        <!-- 面包屑 -->
        <a-breadcrumb class="pc-breadcrumb">
          <a-breadcrumb-item
            v-for="(item, index) in breadcrumbItems"
            :key="index"
            :separator="'/'"
          >
            <span
              class="pc-breadcrumb-item"
              :class="{ 'is-current': item.isLast }"
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
            </span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>

      <!-- 中间：标题 -->
      <div class="pc-title-area">
        <div class="pc-title-wrapper">
          <h1 class="pc-title">{{ currentPage.title }}</h1>
          <p v-if="currentPage.description" class="pc-description">
            {{ currentPage.description }}
          </p>
        </div>
      </div>

      <!-- 右侧：操作区 -->
      <div v-if="$slots['page-actions']" class="pc-actions">
        <slot name="page-actions"></slot>
      </div>
    </div>

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
import { computed, ref } from "vue";
import { useRoute, useRouter, RouteLocationMatched } from "vue-router";
import { iconMap } from "@/assets/icons/SideBarIconMap";
import LeftOutlined from "@ant-design/icons-vue/LeftOutlined"; // 引入返回图标

const route = useRoute();
const router = useRouter();

// 当前激活的路由（有 meta.title 的）
const matchedRoutes = computed(() =>
  route.matched.filter((item: RouteLocationMatched) => item.meta?.title)
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

// 面包屑数据
interface BreadcrumbItem {
  title: string;
  icon: string;
  path: string;
  isLast: boolean;
}

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

// 缓存视图（示例，实际应从 store 获取）
const cachedViews = ref<string[]>(["Dashboard", "UserList"]); // 示例：缓存首页、用户列表
</script>

<style lang="scss" scoped>
$page-header-bg: #fff;
$page-header-border: #d9d9d9;
$text-primary: var(--text-color-primary, #262626);
$text-secondary: var(--text-color-secondary, #595959);
$primary-color: var(--primary-color, #1890ff);
$content-bg: var(--content-bg, #f5f7fa);

.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $content-bg;
  color: $text-primary;
  overflow: hidden;
}

/* 自定义头部 */
.pc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px;
  border-bottom: 1px solid $page-header-border;
  background-color: $page-header-bg;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}

.pc-header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
}

.pc-back-btn {
  color: $text-secondary;
  font-size: 16px;
}

/* 面包屑样式穿透 */
:deep(.pc-breadcrumb) {
  .ant-breadcrumb-link {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .pc-breadcrumb-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;

    &.is-current {
      font-weight: 500;
      color: $text-primary;
    }
  }

  .pc-breadcrumb-icon {
    font-size: 14px;
    color: var(--sidebar-icon-color, #8c8c8c);
  }

  .pc-breadcrumb-link {
    color: $text-secondary;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: $primary-color;
    }
  }

  .pc-breadcrumb-text {
    color: $text-primary;
    font-weight: 500;
  }
}

.pc-title-area {
  flex: 2;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
}

.pc-title-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pc-title {
  float: left;
  // margin: 0;
  // font-size: 18px;
  // font-weight: 500;
  color: $text-primary;
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
}

.pc-description {
  margin: 4px 0 0;
  font-size: 14px;
  color: $text-secondary;
}

.pc-actions {
  display: flex;
  gap: 8px;
  white-space: nowrap;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
}

/* 内容区域 */
.pc-content-wrapper {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px;
  background-color: $content-bg;
}

.pc-content {
  min-height: 100%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 24px;
}

/* 滚动条 */
.pc-content-wrapper {
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.25);
  }
}
</style>
