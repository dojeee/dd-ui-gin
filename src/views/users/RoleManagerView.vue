<template>
  <div class="role-manager-class">
    <h2>this is is role manager page</h2>

    <div class="search-form-container"></div>
    <div class="search-result-list"></div>
  </div>
</template>
<script setup lang="ts"></script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;
.role-manager-class {
  background-color: rgb(58, 116, 193);
  padding: v.$spacing-xl v.$spacing-lg 0;
  margin-bottom: v.$spacing-md;
  border-radius: v.$radius-md;
}
.search-form-container {
  background-color: blue;
  padding: v.$spacing-md;
}
.search-result-list {
  background-color: red;
  padding: v.$spacing-md;
}
</style>
