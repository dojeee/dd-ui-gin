<template>
  <a-layout-content class="content-container">
    <!-- 固定的页面头部区域 -->
    <div class="page-header">
      <!-- 面包屑导航 -->
      <div class="breadcrumb-container" v-if="breadcrumbItems.length > 0">
        <a-breadcrumb>
          <a-breadcrumb-item 
            v-for="(item, index) in breadcrumbItems" 
            :key="index"
          >
            <component 
              v-if="item.icon && getIconComponent(item.icon)" 
              :is="getIconComponent(item.icon)" 
            />
            <span>{{ item.title }}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      
      <!-- 页面标题和操作区域 -->
      <div class="page-title-section" v-if="currentPageTitle">
        <div class="page-title">
          <!-- <h1>{{ currentPageTitle }}</h1> -->
          <p class="page-description" v-if="currentPageDescription">
            {{ currentPageDescription }}
          </p>
        </div>
        <div class="page-actions">
          <slot name="page-actions"></slot>
        </div>
      </div>
    </div>
    
    <!-- 可滚动的内容区域 -->
    <div class="page-content">
      <router-view />
    </div>
  </a-layout-content>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { iconMap } from "@/assets/icons/SideBarIconMap";


const route = useRoute();
const feature = ref();

// 定义面包屑项类型
interface BreadcrumbItem {
  title: string;
  icon: string;
  path: string;
  isLast: boolean;
}

// 生成面包屑数据
const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const matched = route.matched.filter(item => item.meta?.title);
  
  return matched.map((item, index) => ({
    title: (item.meta?.title as string) || '',
    icon: (item.meta?.icon as string) || '',
    path: item.path,
    isLast: index === matched.length - 1
  }));
});

// 当前页面标题
const currentPageTitle = computed(() => {
  const currentRoute = route.matched[route.matched.length - 1];
  return currentRoute?.meta?.title as string || '';
});

// 当前页面描述
const currentPageDescription = computed(() => {
  const currentRoute = route.matched[route.matched.length - 1];
  return currentRoute?.meta?.description as string || '';
});

// 获取图标组件的辅助函数
const getIconComponent = (iconName: string) => {
  return (iconMap as any)[iconName] || null;
};
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--content-bg);
  color: var(--text-color-primary);
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  height: 100%;
  overflow: hidden;
}

// 固定的页面头部区域
.page-header {
  flex-shrink: 0;
  padding: v.$spacing-lg v.$spacing-xl;
  background: var(--content-bg);
  border-bottom: 1px solid var(--border-color-light);
  z-index: 10;
}

// 面包屑容器样式
.breadcrumb-container {
  margin-bottom: v.$spacing-md;
  
  :deep(.ant-breadcrumb) {
    font-size: v.$font-size-menu;
    
    .ant-breadcrumb-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--text-color-secondary);
      text-decoration: none;
      transition: color 0.3s ease;
      
      &:hover {
        color: var(--primary-color);
      }
      
      .anticon {
        font-size: v.$font-size-icon-small;
        color: var(--sidebar-icon-color);
      }
    }
    
    .ant-breadcrumb-separator {
      color: var(--text-color-disabled);
      margin: 0 8px;
    }
    
    // 最后一项（当前页面）的样式
    li:last-child {
      .ant-breadcrumb-link {
        color: var(--text-color-primary);
        font-weight: v.$font-weight-medium;
        
        .anticon {
          color: var(--primary-color);
        }
      }
    }
  }
}

// 页面标题区域
.page-title-section {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: v.$spacing-lg;
  
  .page-title {
    flex: 1;
    
    h1 {
      margin: 0 0 v.$spacing-xs 0;
      font-size: v.$font-size-header;
      font-weight: v.$font-weight-semibold;
      color: var(--text-color-primary);
      line-height: 1.2;
    }
    
    .page-description {
      margin: 0;
      font-size: v.$font-size-menu;
      color: var(--text-color-secondary);
      line-height: 1.4;
    }
  }
  
  .page-actions {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: v.$spacing-sm;
  }
}

// 可滚动的内容区域
.page-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: v.$spacing-xl;
  
  // 自定义滚动条样式
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
