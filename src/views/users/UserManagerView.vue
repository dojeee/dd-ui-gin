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
  <div class="search-result-list">Search Result List</div>

  <div>
    ...
    <br />
    ...
    <br />
    ...
    <br />
    ...
    <br />
    ...
    <br />
    ... ...
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
  searchForm.status = "";
};

const handlerSearchPage = () => {
  console.log(searchForm);
};
</script>

<style lang="scss" scoped>
.search-form-container {
  background-color: var(--content-);
}
</style>
