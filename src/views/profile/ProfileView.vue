<template>
  <div class="profile-container">
    <a-modal
      v-model:open="showModal"
      width="650px"
      :mask-closable="false"
      :closable="false"
      :destroy-on-close="true"
      :keyboard="true"
      :footer="null"
      class="account-modal"
    >
      <!-- 主体内容 -->
      <div class="modal-body">
        <!-- 左侧菜单 -->
        <div class="sidebar">
          <a-button type="text" shape="circle" size="small" @click="closeModal">
            <template #icon>
              <component size="20" :is="iconMap['PhX']" />
            </template>
          </a-button>
          <a-menu mode="vertical">
            <a-menu-item
              v-for="menu in menuItems"
              :key="menu.key"
              :title="menu.title"
            >
              <template #icon>
                <component size="20" :is="iconMap[menu.icon]" />
              </template>
              <span>{{ menu.label }}</span>
            </a-menu-item>
          </a-menu>
        </div>

        <!-- 右侧内容区 -->
        <div class="content-area">
          <div v-if="activeMenu === 'profile'">
            <p>ytryrChatGPT Plus</p>
            <p>fff GPT-5</p>
            <a-button type="primary" size="small" style="margin-top: 16px"
              >upgrade</a-button
            >
            <a-divider />
            <p>dfgd</p>
            <p>sdfs</p>
            <p>sdfhgdfhd</p>
            <a-divider />
            <a-button type="danger" size="small">delete</a-button>
          </div>

          <div v-else-if="activeMenu === 'settings'">
            <h3>setting</h3>
            <a-switch v-model:checked="darkMode" />
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProfileStore } from "@/stores/profileStores";
import { storeToRefs } from "pinia";
import { iconMap } from "@/assets/icons/SideBarIconMap";
const profileStore = useProfileStore();
const { showModal, menuItems } = storeToRefs(profileStore);

const activeMenu = ref("profile");
const darkMode = ref(false);

const handlerProfileClick = () => {
  console.log("clicked click");
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = !showModal.value;
};
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;

.profile-container {
  display: flex;
}
:deep(.ant-modal-content) {
  padding: 12px;
}
.account-modal {
  padding: v.$spacing-lg v.$spacing-md;
  .modal-body {
    display: flex;

    .sidebar {
      width: 160px;
      background-color: var(--background-color-base);
      border-right: 1px solid var(--border-color);
      flex-shrink: 0;

      :deep(.ant-menu) {
        border-right: none;
      }
    }

    .content-area {
      flex: 1;
      padding: v.$spacing-sm;
      background-color: #42c954;
      overflow-y: auto; /* 内容过长时可滚动 */
    }
  }
}
</style>
