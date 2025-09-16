<template>
  <div class="user-manager-container">
    <!-- 搜索表单 -->
    <div class="search-form-container">
      <a-form>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24 }" align="bottom">
          <a-col :span="6" :offset="1">
            <a-form-item label="User Name">
              <a-input
                v-model:value="searchParams.userName"
                placeholder="user name"
                @pressEnter="debounceedSearch"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="Mobile">
              <a-input
                v-model:value="searchParams.mobile"
                placeholder="mobile"
                @pressEnter="debounceedSearch"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="Status">
              <a-select
                v-model:value="searchParams.userState"
                placeholder="status"
              >
                <a-select-option value="">All</a-select-option>
                <a-select-option :value="1">Enabled</a-select-option>
                <a-select-option :value="0">Disabled</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="3" :offset="2">
            <a-form-item>
              <div class="search-reset-button-container">
                <a-button
                  type="primary"
                  @click="handlerSearchPage"
                  :loading="loading"
                  :disabled="loading"
                  >Search</a-button
                >
                <a-button style="margin-left: 8px" @click="handleReset"
                  >Reset</a-button
                >
              </div>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- 结果列表 -->
    <div class="search-result-list">
      <!-- operator space -->
      <div class="result-top-operator-container">
        <!-- left section -->
        <div class="left-section">
          <span>User List</span>
        </div>

        <!-- right section -->
        <div class="right-section">
          <a-button type="primary" size="5" class="right-btn"
            >New user</a-button
          >
          <a-button type="primary">
            <template #icon>
              <DownloadOutlined />
            </template>
          </a-button>
        </div>
      </div>

      <a-table
        :columns="columns"
        :dataSource="userList"
        :pagination="pagination"
        :loading="loading"
        :row-key="(record: User) => record.userId"
        @change="handleTableChange"
        @resize-column="handleResizeColumn"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'userId'">
            <span> <SmileOutlined /> User ID </span>
          </template>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'userName'">
            <a href="#">{{ record.userName }}</a>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a>Edit</a>
              <a-divider type="vertical" />
              <a>Delete</a>
              <a-divider type="vertical" />
              <a class="ant-dropdown-link"
                >More actions
                <DownOutlined />
              </a>
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, onBeforeUnmount } from "vue";
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { useUserManagerStores } from "@/stores/userManagerStores";
import { storeToRefs } from "pinia";
import type { TablePaginationConfig } from "ant-design-vue";
import { debounce } from "lodash-es";
import type { User } from "@/types/user";
import { DownloadOutlined } from "@ant-design/icons-vue";

// 1. 初始化 Store 并保持响应性
const userManagerStore = useUserManagerStores();
const { userList, columns, pagination, loading } =
  storeToRefs(userManagerStore);
const { fetchUsers, setPage, searchParams } = userManagerStore;

// 3. 组件挂载时加载数据
onMounted(() => {
  fetchUsers();
});

// 4. 事件处理器调用 Store Actions
const handlerSearchPage = () => {
  pagination.value.current = 1; // 搜索时重置到第一页
  fetchUsers(searchParams);
};

const debounceedSearch = debounce(() => {
  handlerSearchPage();
}, 300);

const handleReset = () => {
  searchParams.userName = "";
  searchParams.mobile = "";
  searchParams.userState = "";
  handlerSearchPage();
};

const handleTableChange = (pager: TablePaginationConfig) => {
  // 使用 ?? 操作符确保 page 和 size 始终是 number 类型
  const page = pager.current ?? 1;
  const size = pager.pageSize ?? pagination.value.pageSize;
  setPage(page, size);
};

// 列宽调整
function handleResizeColumn(w: number, col: { width: number }) {
  col.width = w;
}

onBeforeUnmount(() => {
  debounceedSearch.cancel();
});
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;

.user-manager-container {
  display: flex;
  flex-direction: column;
}

.search-form-container {
  background-color: var(--content-bg);
  border-radius: v.$radius-md;
}

.search-result-list {
  background-color: var(--content-bg);
  padding: v.$spacing-md;
}

.result-top-operator-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: v.$spacing-sm;
  padding: v.$spacing-sm v.$spacing-md;
  background-color: var(--content-bg);
  border-radius: v.$radius-sm;
  flex-shrink: 0;

  .left-section {
    font-size: v.$font-size-xs;
    flex: 1;
    min-width: 0;
  }

  .right-section {
    display: flex;
    gap: v.$spacing-sm; /* 按钮之间的间距 */
    flex-shrink: 0; /* 防止被挤压 */

    .right-btn {
      border-radius: v.$radius-md;
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
      &:hover {
        border-color: var(--primary-color);
      }
    }
  }
}

.search-reset-button-container {
  display: flex;
}
</style>
