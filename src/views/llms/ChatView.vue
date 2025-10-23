<template>
  <div class="chat-view-container">
    <contextHolder />
    <Conversations
      default-active-key="item1"
      :menu="menuConfig"
      :items="items"
      class="conversation-style"
    />
    <a-button>sdds</a-button>
  </div>
</template>

<script setup lang="ts">
import {
  DeleteOutlined,
  EditOutlined,
  StopOutlined,
} from "@ant-design/icons-vue";
import { theme, message } from "ant-design-vue";
import { Conversations, type ConversationsProps } from "ant-design-x-vue";
import { computed, h } from "vue";

defineOptions({ name: "AXConversationsWithMenuSetup" });

const items: ConversationsProps["items"] = Array.from({ length: 20 }).map(
  (_, index) => ({
    key: `item${index + 1}`,
    label: `Conversation Item ${index + 1}`,
    disabled: index === 3,
  })
);

const [messageApi, contextHolder] = message.useMessage();
const { token } = theme.useToken();

const style = computed(() => ({
  // width: "256px",
  background: token.value.colorBgContainer,
  borderRadius: token.value.borderRadius,
  height: "100%",
  overflow: "auto",
}));

const menuConfig: ConversationsProps["menu"] = (conversation) => ({
  items: [
    {
      label: "Operation 1",
      key: "operation1",
      icon: h(EditOutlined),
    },
    {
      label: "Operation 2",
      key: "operation2",
      icon: h(StopOutlined),
      disabled: true,
    },
    {
      label: "Operation 3",
      key: "operation3",
      icon: h(DeleteOutlined),
      danger: true,
    },
  ],
  onClick: (menuInfo) => {
    messageApi.info(`Click ${conversation.key} - ${menuInfo.key}`);
  },
});
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;
.chat-view-container {
  height: 100vh;
  display: flex;
  flex-direction: row; /* 保持横向布局 */
  overflow: hidden;
}

.conversation-style {
  background-color: var(--background-color-base);
  width: 256px;
  flex-shrink: 0;
  height: 100%;
  overflow-y: auto;
}
</style>
