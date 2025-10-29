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
          placeholder="Search conversations"
          size="small"
          @search="onSearch"
        />
      </div>

      <a-divider />

      <!-- 3. sidebar menu -->
      <div class="sidebar-menu-wrapper">
        <div class="conversation-list">
          <!-- 所有对话标题 -->
          <div class="group-title">All conversations</div>

          <!-- conversation content -->
          <div
            v-for="conv in filteredConversations"
            :key="conv.id"
            class="conversation-item"
            :class="{
              'conversation-item--active': activeConversationId === conv.id,
            }"
            @click="handleConversationClick(conv.id)"
          >
            <span class="conversation-title">
              {{ conv.title || "Untitled Conversation" }}
            </span>
            <a-button
              type="text"
              size="small"
              class="more-btn"
              @click.stop="handleMoreAction(conv.id)"
            >
              <MoreOutlined />
            </a-button>
          </div>

          <!-- 空状态 -->
          <div v-if="filteredConversations.length === 0" class="empty-state">
            No conversations found
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStores } from "@/stores/llms/chatStores";
import { onMounted, computed, ref } from "vue";
import { MoreOutlined } from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";

const useChatStore = useChatStores();
const { conversations, loading } = storeToRefs(useChatStore);

const activeConversationId = ref<string | null>(null);
const searchQuery = ref("");

const filteredConversations = computed(() => {
  const list = conversations.value || [];
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return list;
  return list.filter((conv) =>
    (conv.title || "").toLowerCase().includes(query)
  );
});

const handleConversationClick = (id: string) => {
  activeConversationId.value = id;
  console.log("Clicked conversation ID:", id);
};

const handleMoreAction = (id: string) => {
  console.log("More actions for conversation ID:", id);
};

const handleCreateConversation = () => {
  console.log("Create new conversation");
};

const onSearch = (value: string) => {
  console.log("Search:", value);
};

onMounted(() => {
  useChatStore.fetchConversations("1001");
});
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;

$sidebar-bg: #141414;
$item-hover-bg: #2a2a2a;
$item-active-bg: #363636;
$text-color: #ffffff;
$text-color-secondary: #999999;
$border-color: #333333;

.chat-view-container {
  height: 100vh;
  display: flex;
  overflow: hidden;
}

.chat-sidebar {
  width: 270px;
  flex-shrink: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $sidebar-bg;
  border-right: 1px solid $border-color;
  padding: v.$content-padding;
  color: $text-color;
}

.sidebar-header {
  margin-bottom: v.$spacing-lg;

  .ant-btn {
    background: linear-gradient(90deg, #5b42d8, #7c5de7);
    border: none;
    height: 40px;
    font-size: 14px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(91, 66, 216, 0.3);

    &:hover {
      background: linear-gradient(90deg, #6a50e0, #8a6df1);
    }
  }
}

.sidebar-search {
  margin-bottom: v.$spacing-lg;

  :deep(.ant-input-search) {
    .ant-input {
      height: 36px;
      font-size: 14px;
      padding: 0 11px;
      background-color: #222222;
      border: 1px solid #333;
      color: $text-color;
      border-radius: 6px;

      &:focus {
        border-color: #5b42d8;
        box-shadow: 0 0 0 2px rgba(91, 66, 216, 0.2);
      }

      &::placeholder {
        color: $text-color-secondary;
      }
    }

    .ant-btn {
      height: 36px;
      background-color: #222222;
      border: 1px solid #333;
      color: $text-color-secondary;

      &:hover {
        background-color: #333333;
      }
    }
  }
}

// 分隔线
:deep(.ant-divider) {
  margin: v.$spacing-md 0;
  border-color: $border-color;
}

.sidebar-menu-wrapper {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-top: v.$spacing-sm;
}

.conversation-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

// 分组标题（如“今天”、“过去 7 天”）
.group-title {
  padding: 8px 12px;
  font-size: 12px;
  color: $text-color-secondary;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 16px;
  margin-bottom: 8px;
}

// 对话项
.conversation-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: $text-color;

  &:hover {
    background-color: $item-hover-bg;
  }

  &--active {
    background-color: $item-active-bg;
    color: $text-color;
  }

  .conversation-title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
  }

  .delete-btn {
    opacity: 0;
    margin-left: 8px;
    color: $text-color-secondary;
    padding: 0 4px;
    font-size: 16px;

    &:hover {
      color: $text-color;
    }

    .conversation-item:hover & {
      opacity: 1;
    }
  }
}

// 选中项样式（可选）
.conversation-item--selected {
  background-color: $item-active-bg;
  border-left: 3px solid #5b42d8;
}
</style>
