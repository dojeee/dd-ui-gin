<template>
  <!-- 搜索表单 -->
  <div class="search-form-container">
    <a-form>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24 }" align="bottom">
        <a-col :span="6" :offset="1">
          <a-form-item label="User Name">
            <a-input v-model:value="searchForm.userName" placeholder="user name" @pressEnter="handlerSearchPage" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="Mobile">
            <a-input v-model:value="searchForm.mobile" placeholder="mobile" @pressEnter="handlerSearchPage" />
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item label="Status">
            <a-select v-model:value="searchForm.userState" placeholder="status">
              <a-select-option value="">All</a-select-option>
              <a-select-option :value="1">Enabled</a-select-option>
              <a-select-option :value="0">Disabled</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="3" :offset="2">
          <a-form-item>
            <div style="display: flex; justify-content: flex-end; gap: 8px">
              <a-button type="primary" @click="handlerSearchPage">Search</a-button>
              <a-button style="margin-left: 8px" @click="handleReset">Reset</a-button>
            </div>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>

  <!-- 结果列表 -->
  <div class="search-result-list">
    <a-table
      :columns="columns"
      :dataSource="userList"
      :pagination="pagination"
      :loading="loading"
      :row-key="(record) => record.userId"
      @change="handleTableChange"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'userId'">
          <span>
            <SmileOutlined /> User ID
          </span>
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
            <a class="ant-dropdown-link">More actions
              <DownOutlined />
            </a>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { useUserManagerStores } from "@/stores/userManagerStores";
import { storeToRefs } from "pinia";
import type { TablePaginationConfig } from 'ant-design-vue';

// 1. 初始化 Store 并保持响应性
const userManagerStore = useUserManagerStores();
const { userList, pagination, columns, loading } = storeToRefs(userManagerStore);
const { fetchUsers, setPage } = userManagerStore;

// 2. 本地搜索表单状态
const searchForm = reactive({
  userName: "",
  mobile: "",
  userState: "" as 0 | 1 | "",
});

// 3. 组件挂载时加载数据
onMounted(() => {
  fetchUsers();
});

// 4. 事件处理器调用 Store Actions
const handlerSearchPage = () => {
  pagination.value.current = 1; // 搜索时重置到第一页
  fetchUsers(searchForm);
};

const handleReset = () => {
  searchForm.userName = "";
  searchForm.mobile = "";
  searchForm.userState = "";
  handlerSearchPage();
};

const handleTableChange = (pager: TablePaginationConfig) => {
  // 确保页码和页面大小是数字类型
  const page = pager.current || pagination.value.current;
  const size = Number(pager.pageSize) || pagination.value.pageSize;
  setPage(page, size);
};

// 列宽调整
// function handleResizeColumn(w: number, col: { width: number }) {
//   col.width = w;
// }
</script>

<style lang="scss" scoped>
.search-form-container {
  background-color: var(--content-bg);
  padding: 24px 16px 0;
  margin-bottom: 16px;
  border-radius: 8px;
}

.search-result-list {
  background-color: var(--content-bg);
  padding: 16px;
  border-radius: 8px;
}
</style>
