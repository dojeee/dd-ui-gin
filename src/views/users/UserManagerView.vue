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

    <!-- 用户表格 -->
    <a-table
      :dataSource="userList"
      :columns="columns"
      :pagination="false"
      row-key="id"
      bordered
    />


    <a-pagination 
    :total="100"
    
    
    />


  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

interface SearchFormType {
  userName: string;
  mobile: string;
  status: string;
}

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


const userList = reactive([]);


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
    customRender: ({ value }) => (value === "enabled" ? "✅ Enabled" : "❌ Disabled"),
  },
  {
    title: "Create Time",
    dataIndex: "createTime",
    key: "createTime",
  },
];


</script>

<style lang="scss" scoped>
.search-form-container {
  background-color: var(--content-);
}
.search-result-list {
  background-color: red;
}
</style>
