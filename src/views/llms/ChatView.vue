<template>
  <div class="chat-view-container">
    <!-- sidebar -->
    <div class="chat-sidebar">
      <!-- 1. sidebar header -->
      <div class="sidebar-header">
        <a-button type="primary" block @click="handleCreateConversation">
          + New conversation
        </a-button>
      </div>

      <!-- 2. sidebar search -->
      <div class="sidebar-search">
        <a-input-search
          v-model:value="searchQuery"
          placeholder="搜索对话"
          size="small"
          @search="onSearch"
        />
      </div>

      <a-divider />

      <!-- 3. sidebar menu -->
      <div class="sidebar-menu-wrapper">
        <!-- loading -->
        <div v-if="loading" class="chat-sidebar-menu">
          <a-spin />
        </div>

        <!-- menu -->
        <a-menu
          v-if="!loading"
          mode="inline"
          :items="menuItems"
          @click="handleConversationClick"
          class="conversation-menu"
        />
        <a-spin v-else style="display: block; margin: 20px auto" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStores } from "@/stores/llms/chatStores";
import { onMounted, computed } from "vue";
import type { MenuProps } from "ant-design-vue";

const useChatStore = useChatStores();
const { conversations, loading, searchQuery } = useChatStore;

const menuItems = computed<MenuProps["items"]>(() => {
  return conversations.map((conv) => ({
    key: conv.id,
    label: conv.title || "Untitled Conversation",
  }));
});

const handleCreateConversation = () => {
  console.log("Create new conversation");
};

const handleConversationClick = ({ key }: { key: string }) => {
  console.log("Clicked conversation ID:", key);
};
const onSearch = (value: string) => {
  console.log("搜索:", value);
};

onMounted(() => {
  const res = useChatStore.fetchConversations("1001");
  if (!res) {
    console.error("Failed to fetch conversations");
  }
});
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;
.chat-view-container {
  height: 100vh;
  display: flex;
  overflow: hidden;
}

.chat-sidebar {
  width: 270px;
  flex-shrink: 0;
  height: 100%;
  background-color: var(--sidebar-bg);
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color-base);
  padding: v.$content-padding;
}

.sidebar-header {
  margin-bottom: v.$spacing-lg;
}

/* 2. 搜索框区域 —— 调大一点 */
.sidebar-search {
  margin-bottom: v.$spacing-lg; // 👈 新增：与下方分隔
  :deep(.ant-input-search) {
    .ant-input {
      height: 36px; // 默认是 32px，稍高一点
      font-size: 14px;
      padding: 0 11px; // 保持内边距舒适
    }
    .ant-btn {
      height: 36px; // 按钮也同步高度
    }
  }
}

/* 3. 菜单容器 —— 确保可滚动且不被挤压 */
.sidebar-menu-wrapper {
  flex: 1; // 占据剩余空间
  min-height: 0; // 👈 关键！允许 flex 子项收缩
  overflow-y: auto; // 垂直滚动
  padding-top: v.$spacing-sm; // 与上方分隔线留点空隙
}

.conversation-menu {
  border-right: none;
}

/* 可选：分隔线样式微调 */
:deep(.ant-divider) {
  margin: v.$spacing-md 0; // 上下留空
}
</style>
