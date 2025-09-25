<template>
  <div class="profile-container">
    <a-modal
      v-model:open="showModal"
      :title="null"
      width="500px"
      :footer="null"
      :mask-closable="false"
      :closable="true"
      :destroy-on-close="true"
      :body-style="{ padding: '0' }"
      class="account-modal"
    >
      <!-- 自定义头部 -->
      <div class="modal-header">
        <span class="modal-title">account</span>
        <a-button type="link" @click="showModal = false" class="close-btn">
          ×
        </a-button>
      </div>

      <!-- 主体内容 -->
      <div class="modal-body">
        <!-- 左侧菜单 -->
        <div class="sidebar">
          <div
            v-for="(item, index) in menuItems"
            :key="index"
            class="menu-item"
            :class="{ active: activeMenu === item.key }"
            @click="activeMenu = item.key"
          >
            <component :is="item.icon" />
            {{ item.label }}
          </div>
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
const { showModal } = storeToRefs(profileStore);
const menuItems = ref([
  { key: "profile", label: "userInfo", icon: "UserOutlined" },
  { key: "settings", label: "settings", icon: "SettingOutlined" },
]);
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

  .profile-inner-container {
    display: flex;
    // justify-content: space-between;
    // align-items: center;
    width: 60%;
    height: 100%;
    background-color: red;
    border-radius: v.$content-border-radius;
    flex-direction: row;

    .profile-inner-left-container {
      background-color: green;
      // float: left;
    }
    .profile-inner-right-container {
      border-width: 10px;
      background-color: blue;
      // float: right;
    }
  }
}
</style>
