<template>
  <div class="chat-view-container">
    <a-button>sdds</a-button>
    <a-menu mode="inline" class="chat-sidebar-menu">
      <div></div>
      <template>
        <a-sub-menu> </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { useChatStores } from "@/stores/llms/chatStores";
import { onMounted } from "vue";

const useChatStore = useChatStores();

onMounted(() => {
  console.log("mounted");
  useChatStore.fetchConversations("1001");
});
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;
.chat-view-container {
  height: 100vh;
  display: flex;
  flex-direction: row;
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
