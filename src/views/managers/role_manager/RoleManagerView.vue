<template>
  <div class="role-manager-container">
    <!-- form div -->
    <div class="search-form-container">
      <a-form :model="searchParams" @submit.prevent="handlerSearchPage">
        <a-row
          :gutter="{ xs: 8, sm: 16, md: 24 }"
          align="middle"
          class="search-form-row"
        >
          <!-- role id -->
          <a-col :span="5" offset="1">
            <a-form-item label="Role Id">
              <a-input
                v-model:value="searchParams.roleId"
                placeholder="role id"
              />
            </a-form-item>
          </a-col>

          <!-- role name -->
          <a-col :span="5">
            <a-form-item label="Role Name">
              <a-input
                v-model:value="searchParams.roleName"
                placeholder="role name"
              />
            </a-form-item>
          </a-col>

          <!-- role state -->
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

    <!-- result div -->
    <div class="search-result-list">
      <!-- operator space -->
      <div class="result-top-operator-container">
        <div class="left-section">
          <span>Role List</span>
        </div>
        <div class="right-section">
          <a-button type="primary" class="right-button">New Role</a-button>
        </div>
      </div>

      <!-- result table -->
      <div class="table-wrapper">
        <a-table
          :columns="columns"
          :dataSource="roleList"
          :pagination="pagination"
          :loading="loading"
          :row-key="(record: Role) => record.roleId"
          @change="handleTableChange"
          @resize-column="handleResizeColumn"
          :scroll="{ x: 'max-content' }"
        >
          <!-- result header -->
          <template #headerCell="{ column }">
            <template v-if="column.key === 'roleId'">
              <span> Role ID </span>
            </template>
          </template>

          <!-- result body -->
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'roleName'">
              <a href="#">{{ record.roleName }}</a>
            </template>

            <!-- actions -->
            <template v-else-if="column.key === 'action'">
              <span>
                <a>✏️Edit</a>
                <a-divider type="vertical" />
                <a>🗑️Delete</a>
                <a-divider type="vertical" />
                <a-dropdown>
                  <a class="ant-dropdown-link">
                    ⚙️More actions
                    <DownOutlined />
                  </a>
                </a-dropdown>
              </span>
            </template>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { h, ref, onMounted, onBeforeUnmount } from "vue";
import { useRoleManagerStores } from "@/stores/managers/roleManagerStores";
import { storeToRefs } from "pinia";
import { Role } from "@/types/role";
import { TablePaginationConfig } from "ant-design-vue";
import { debounce } from "lodash-es";
import { DownOutlined } from "@ant-design/icons-vue";

const useRoleManagerStore = useRoleManagerStores();
const { searchParams, columns, roleList, loading, pagination } =
  storeToRefs(useRoleManagerStore);
const { setPage, fetchRoles } = useRoleManagerStore;

const handlerSearchPage = () => {
  console.log("clicked search");
  pagination.value.current = 1;
  fetchRoles(searchParams.value);
};

const debounceedSearch = debounce(() => {
  handlerSearchPage();
}, 300);

const handleReset = () => {
  console.log("clicked reset");
  searchParams.value.roleName = "";
  searchParams.value.roleId = "";
  searchParams.value.state = "";
};

const handleTableChange = (pager: TablePaginationConfig) => {
  const page = pager.current ?? 1;
  const size = pager.pageSize ?? pagination.value.pageSize;
  setPage(page, size);
};

function handleResizeColumn(w: number, col: { width: number }) {
  col.width = w;
}

onMounted(() => {
  fetchRoles();
});

onBeforeUnmount(() => {
  debounceedSearch.cancel();
});
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;
.role-manager-container {
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
