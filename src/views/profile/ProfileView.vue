<template>
  <div class="profile-container">
    <a-modal
      v-model:open="showModal"
      :title="null"
      width="600px"
      :footer="null"
      :mask-closable="false"
      :closable="true"
      :destroy-on-close="true"
      :body-style="{ padding: '0' }"
      class="account-modal"
    >
      <!-- 自定义头部 -->
      <!-- <div class="modal-header">
        <span class="modal-title">account</span>
      </div> -->

      <!-- 主体内容 -->
      <div class="modal-body">
        <!-- 左侧菜单 -->
        <div class="sidebar">
          <a-menu mode="vertical" :items="menuItems"> </a-menu>
        </div>

        <!-- 右侧内容区 -->
        <div class="content-area">
          <div v-if="activeMenu === 'profile'">
            <p>ytryr：ChatGPT Plus</p>
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

const profileStore = useProfileStore();
const { showModal, menuItems } = storeToRefs(profileStore);

const activeMenu = ref("profile");
const darkMode = ref(false);
const feature = ref();

const handlerProfileClick = () => {
  console.log("clicked click");
  showModal.value = true;
};
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;

.profile-container {
  display: flex;
  justify-content: center;
  padding: v.$spacing-sm v.$spacing-md;
}

/* Modal 内部样式优化 */
.account-modal {
  :deep(.ant-modal-content) {
    border-radius: v.$content-border-radius;
  }

  .modal-body {
    display: flex;
    height: 400px; /* 可根据需要调整高度 */
    margin: 0;
    padding: 0;
    background-color: #208ab4; /* 可选背景色 */

    .sidebar {
      width: 150px;
      background-color: #963f3f;
      border-right: 1px solid #275394;
      flex-shrink: 0; /* 防止被压缩 */

      // 覆盖 a-menu 默认样式，使其撑满高度
      :deep(.ant-menu) {
        height: 100%;
        border-right: none;
      }
    }

    .content-area {
      flex: 1;
      padding: v.$spacing-md;
      background-color: #42c954;
      overflow-y: auto; /* 内容过长时可滚动 */
    }
  }
}
</style>
