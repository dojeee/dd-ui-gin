<template>
  <div class="user-manager-container">
    <!-- 搜索表单 -->
    <div class="search-form-container">
      <a-form :model="searchParams" @submit.prevent="handlerSearchPage">
        <a-row
          :gutter="{ xs: 8, sm: 16, md: 24 }"
          align="meddle"
          class="search-form-row"
        >
          <a-col :span="5" :offset="1">
            <a-form-item label="User Name">
              <a-input
                v-model:value="searchParams.userName"
                placeholder="user name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item label="Mobile">
              <a-input
                v-model:value="searchParams.mobile"
                placeholder="mobile"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="State">
              <a-select v-model:value="searchParams.state">
                <a-select-option value="">All</a-select-option>
                <a-select-option :value="1">Enabled</a-select-option>
                <a-select-option :value="0">Disabled</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4" :offset="2">
            <a-form-item>
              <a-space size="large">
                <a-button type="primary" htmlType="submit">Search</a-button>
                <a-button @click="handleReset">Reset</a-button>
              </a-space>
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
          <a-button type="primary" class="right-button">New user</a-button>
          <a-button type="primary">
            <template #icon>
              <DownloadOutlined />
            </template>
          </a-button>
        </div>
      </div>

      <div class="table-wrapper">
        <a-table
          :columns="columns"
          :dataSource="userList"
          :pagination="pagination"
          :loading="loading"
          :row-key="(record: User) => record.userId"
          @change="handleTableChange"
          @resize-column="handleResizeColumn"
          :scroll="{ x: 'max-content' }"
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
                <a>✏️Edit</a>
                <a-divider type="vertical" />
                <a>🗑️Delete</a>
                <a-divider type="vertical" />
                <a class="ant-dropdown-link">
                  ⚙️More actions
                  <DownOutlined />
                </a>
              </span>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, onBeforeUnmount } from "vue";
import {
  SmileOutlined,
  DownOutlined,
  DownloadOutlined,
} from "@ant-design/icons-vue";
import { useUserManagerStores } from "@/stores/managers/userManagerStores";
import { storeToRefs } from "pinia";
import type { TablePaginationConfig } from "ant-design-vue";
import { debounce } from "lodash-es";
import type { User } from "@/types/user";

// 1. 初始化 Store 并保持响应性
const userManagerStore = useUserManagerStores();
const { userList, columns, pagination, loading, searchParams } =
  storeToRefs(userManagerStore);
const { fetchUsers, setPage } = userManagerStore;

// 3. 组件挂载时加载数据
onMounted(() => {
  fetchUsers();
});

// 4. 事件处理器调用 Store Actions
const handlerSearchPage = () => {
  pagination.value.current = 1;
  fetchUsers(searchParams.value);
};

const debounceedSearch = debounce(() => {
  handlerSearchPage();
}, 300);

const handleReset = () => {
  searchParams.value.userName = "";
  searchParams.value.mobile = "";
  searchParams.value.state = "";
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
  gap: v.$spacing-sm;
  padding: v.$content-padding;
  
  /* 需求4: 默认隐藏滚动条，悬停时显示 */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  
  &:hover {
    scrollbar-color: var(--scrollbar-thumb-color) transparent;
  }
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }
  
  &:hover::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb-color, #ccc);
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--scrollbar-thumb-hover-color, #999);
  }
}

.search-form-container {
  background-color: var(--background-color-base);
  border-radius: v.$content-border-radius;
}

.search-form-row {
  padding-top: v.$spacing-xm;
}

.search-result-list {
  background-color: var(--background-color-base);
  border-radius: v.$content-border-radius;
  .table-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    /* 滚动条美化（可选） */
    &::-webkit-scrollbar {
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background: #ccc;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    ::v-deep .ant-table-cell {
      white-space: nowrap; /* 不换行，保持列宽紧凑 */
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

.result-top-operator-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: v.$spacing-sm v.$spacing-md;
  flex-shrink: 0;

  .left-section {
    font-size: v.$font-size-xs;
    flex: 1;
  }

  .right-section {
    display: flex;
    gap: v.$spacing-sm;
    flex-shrink: 0;

    .right-button {
      border-radius: v.$radius-md;
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;

      &:hover {
        border-color: var(--primary-color);
      }
    }
  }
}
</style>
