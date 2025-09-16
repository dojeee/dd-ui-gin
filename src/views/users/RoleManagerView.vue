<template>
  <div class="role-manager-container">
    <!-- form div -->
    <div class="search-form-container">
      <a-form>
        <a-row :gutter="{ xs: 8, sm: 16, md: 24 }" align="bottom">
          <!-- role id -->
          <a-col :span="6" :offset="1">
            <a-form-item label="Role Id">
              <a-input
                v-model:value="searchParams.roleId"
                placeholder="role id"
              />
            </a-form-item>
          </a-col>

          <!-- role name -->
          <a-col :span="6">
            <a-form-item label="Role Name">
              <a-input
                v-model:value="searchParams.roleName"
                placeholder="role name"
              />
            </a-form-item>
          </a-col>

          <!-- role status -->
          <a-col :span="4">
            <a-form-item label="Status" v-model:value="searchParams.status">
              <a-select>
                <a-select-option value="">All</a-select-option>
                <a-select-option :value="1">Enabled</a-select-option>
                <a-select-option :value="0">Disabled</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>

          <a-col :span="3" :offset="2">
            <a-form-item>
              <div class="search-reset-button-container">
                <a-button type="primary" @click="handlerSearchPage"
                  >Search</a-button
                >
                <a-button @click="handleReset">Reset</a-button>
              </div>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <!-- result div -->
    <div class="search-result-list"></div>
  </div>
</template>
<script setup lang="ts">
import { h, ref } from "vue";

const searchParams = ref({
  roleName: "",
  roleId: "",
  status: "",
});

const handlerSearchPage = () => {
  console.log("clicked search");
};

const handleReset = () => {
  console.log("clicked reset");
  searchParams.value.roleName = "";
  searchParams.value.roleId = "";
  searchParams.value.status = "All";
};
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;
.role-manager-container {
  display: flex;
  flex-direction: column;
}
.search-form-container {
  background-color: var(--content-bg);
  padding: auto;
}
.search-result-list {
  background-color: var(--content-bg);
  padding: v.$spacing-md;
}
.search-reset-button-container {
  display: flex;
  gap: v.$spacing-sm;
}
</style>
