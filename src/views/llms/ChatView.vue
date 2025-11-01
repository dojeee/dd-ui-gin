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
        <a-input-search v-model:value="searchQuery" placeholder="Search conversations" size="small"
          @search="onSearch" />
      </div>

      <a-divider />

      <!-- 3. sidebar menu -->
      <div class="sidebar-menu-wrapper">
        <div class="conversation-list">
          <!-- 所有对话标题 -->
          <div class="group-title">All conversations</div>

          <!-- conversation content -->
          <div v-for="conv in filteredConversations" :key="conv.id" class="conversation-item" :class="{
            'conversation-item--active': activeConversationId === conv.id,
          }" @click="handleConversationClick(conv.id)">
            <span class="conversation-title">
              {{ conv.title || "Untitled Conversation" }}
            </span>

            <a-dropdown :trigger="['click']" placement="bottomRight" :getPopupContainer="getPopupContainer" @click.stop>
              <a-button type="circle" size="small" class="more-btn">
                <MoreOutlined />
              </a-button>
              <template #overlay>
                <a-menu @click="({ key }) => handleMoreAction(key, conv.id)">
                  <a-menu-item key="rename">
                    <EditOutlined />
                    Rename
                  </a-menu-item>
                  <a-menu-item key="delete" danger>
                    <DeleteOutlined />
                    Delete
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>

          <!-- 空状态 -->
          <div v-if="filteredConversations.length === 0" class="empty-state">
            No conversations found
          </div>
        </div>
      </div>
    </div>

    <a-modal v-model:open="renameModalOpen" title="Rename conversation" :confirm-loading="renameLoading"
      @ok="handleRenameModalOk" @cancel="handleRenameModalCancel" destroy-on-close>
      <a-form layout="vertical" class="rename-modal-form">
        <a-form-item>
          <a-input v-model:value="renameTitle" placeholder="Enter new title" :maxlength="60" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { useChatStores } from "@/stores/llms/chatStores";
import { onMounted, computed, ref, onUnmounted } from "vue";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { message,Modal } from "ant-design-vue";

const useChatStore = useChatStores();
const { conversations, loading, showHeader, renameLoading, renameTargetId, renameTitle } =
  storeToRefs(useChatStore);
const activeConversationId = ref<string | null>(null);
const searchQuery = ref("");
const renameModalOpen = ref(false);



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

const handleMoreAction = (action: string, conversationId: string) => {
  switch (action) {
    case "rename":
      openRenameModal(conversationId);
      break;
    case "delete":
      console.log("Delete conversation:", conversationId);
      Modal.confirm({
        title: "Delete conversation",
        content: "Are you sure you want to delete this conversation?",
        onOk: async () => {
          await useChatStore.deleteConversation();
        },
        onCancel: () => {
          message.info("Cancel delete");
        },
      });
      break;
    default:
      break;
  }
};

const getPopupContainer = (): HTMLElement => {
  return document.body;
};

const handleCreateConversation = () => {
  console.log("Create new conversation");
};

const onSearch = (value: string) => {
  console.log("Search:", value);
};

const openRenameModal = (conversationId: string) => {
  const target = conversations.value.find((item) => item.id === conversationId);
  renameTargetId.value = conversationId;
  renameTitle.value = target?.title ?? "";
  renameModalOpen.value = true;
};

const handleRenameModalCancel = () => {
  renameModalOpen.value = false;
  renameTitle.value = "";
  renameTargetId.value = null;
  renameLoading.value = false;
};

const handleRenameModalOk = async () => {
  if (renameLoading.value) {
    return;
  }
  await useChatStore.updateConversationTitle();
  handleRenameModalCancel();
};

onMounted(() => {
  useChatStore.fetchConversations("1001");
  showHeader.value = false;
});
onUnmounted(() => {
  showHeader.value = true;
});
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;

// 🖤 深色主题变量
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
      border-radius: 8px;

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

:deep(.ant-divider) {
  margin: v.$spacing-md 0;
  border-color: $border-color;
}

.sidebar-menu-wrapper {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-top: v.$spacing-sm;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.conversation-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.group-title {
  padding: 8px 12px;
  font-size: 12px;
  color: $text-color-secondary;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 16px;
  margin-bottom: 8px;
}

.conversation-item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 6px 8px 8px 8px;
  margin-bottom: 4px;
  border-radius: 4px;
  border-radius: 8px;
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

  .more-btn {
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

.empty-state {
  padding: 20px;
  text-align: center;
  color: $text-color-secondary;
  font-size: 14px;
}

.rename-modal-form {
  margin-top: 18px;

  :deep(.ant-form-item) {
    margin-top: 20px;
    margin-bottom: 0;
  }
}

:deep(.ant-dropdown-menu) {
  background-color: $sidebar-bg;
  border: 1px solid $border-color;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  min-width: 120px;
  /* 防止菜单过窄 */

  .ant-dropdown-menu-item {
    color: $text-color;
    padding: 8px 16px;
    font-size: 14px;

    &:hover {
      background-color: $item-hover-bg;
    }

    &-danger {
      color: #ff4d4f;
    }
  }
}
</style>
