<template>
  <!-- <h2>User manager page</h2> -->

  <div class="search-form-container">
    <a-form>
      <a-row :gutter="{ xs: 8, sm: 16, md: 24 }" align="bottom">
        <!-- userName -->
        <a-col :span="4" :offset="1">
          <a-form-item name="username" label="User Name">
            <a-input
              v-model:value="searchForm.userName"
              placeholder="user name"
            ></a-input>
          </a-form-item>
        </a-col>

        <!-- mobile -->
        <a-col :span="4">
          <a-form-item name="mobile" label="mobile">
            <a-input
              v-model:value="searchForm.mobile"
              placeholder="mobile"
            ></a-input>
          </a-form-item>
        </a-col>

        <!-- status -->
        <a-col :span="4">
          <a-form-item name="status" label="status">
            <a-select v-model:value="searchForm.status" placeholder="status">
              <a-select-option value="userEnabledStatus">All</a-select-option>
              <a-select-option value="userEnabledStatus"
                >Enabled</a-select-option
              >
              <a-select-option value="userDisabledStatus"
                >Disabled</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :span="6" :offset="1">
          <a-form-item>
            <div style="display: flex; justify-content: flex-end; gap: 8px">
              <a-button
                type="primary"
                html-type="submit"
                @click="handlerSearchPage"
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

  <!-- result list -->
  <div class="search-result-list">
    <a-table
      :columns="columns"
      :dataSource="userList"
      :pagination="true"
      @resizeColumn="handleResizeColumn"
      
    >
      <!-- table header -->
      <template #headerCell="{ column }">
        <template v-if="column.key === 'id'"">
          
          <span><SmileOutlined /> ID</span>
        </template>
      </template>

      <!-- table cell -->
      <template #bodyCell="{ column,record}">

        <!-- user name cell -->
        <template v-if="column.key === 'userName'">
            <a href="#">{{ record.userName }}</a>
        </template>

        <!-- action cell -->
        <template v-else-if="column.key === 'action'">
              <span>
                <a>Edit</a>
                <a-divider type="vertical" />
                <a>Delete</a> 
                <a-divider type="vertical" />
                <a class="ant-dropdown-link"> More actions <DownOutlined /></a>
             </span>
        </template>

        
      </template>
      <template >

      </template>
    </a-table>
    
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
interface SearchFormType {
  userName: string;
  mobile: string;
  status: string;
}
onMounted(() => {
  fetchUsers();
});

const searchForm = reactive<SearchFormType>({
  userName: "",
  mobile: "",
  status: "",
});

const handleReset = () => {
  searchForm.userName = "";
  searchForm.mobile = "";
  searchForm.status = "All";
};

const handlerSearchPage = () => {
  console.log(searchForm);
};

// 👇 分页状态
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});

// 👇 当前页用户列表
const userList = ref<any[]>([]);

const mockUsers = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  userName: `user_${(i + 1).toString().padStart(3, "0")}`,
  mobile: `138${String(10000000 + i).padStart(8, "0")}`,
  status: i % 3 === 0 ? "disabled" : "enabled", // 模拟部分禁用
  email: `user${i + 1}@example.com`,
  createTime: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
}));

const columns = [
  { title: "ID", dataIndex: "id", key: "id", width: 80 },
  { title: "User Name", dataIndex: "userName", key: "userName" },
  { title: "Mobile", dataIndex: "mobile", key: "mobile" },
  { title: "Email", dataIndex: "email", key: "email" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",

    customRender: ({ value }) =>
      value === "enabled" ? "✅ Enabled" : "❌ Disabled",
  },
  {
    title: "Create Time",
    dataIndex: "createTime",
    key: "createTime",
  },
  {title: "Action", dataIndex: "action", key: "action"},
];

// 👇 过滤并分页数据
const fetchUsers = () => {
  let filtered = mockUsers.filter((user) => {
    return (
      (!searchForm.userName || user.userName.includes(searchForm.userName)) &&
      (!searchForm.mobile || user.mobile.includes(searchForm.mobile)) &&
      (!searchForm.status || user.status === searchForm.status)
    );
  });

  pagination.total = filtered.length;

  // 分页
  const start = (pagination.current - 1) * pagination.pageSize;
  const end = start + pagination.pageSize;
  userList.value = filtered.slice(start, end);
};

// 👇 页码变化
const handlePageChange = (page: number) => {
  pagination.current = page;
  fetchUsers();
};

function handleResizeColumn(w, col) {
  col.width = w;
}
</script>

<style lang="scss" scoped>
.search-form-container {
  background-color: var(--content-bg);
}
.search-result-list {
  background-color: var(--content-bg);
}
</style>
