<template>
  <div class="profile-container">
    <div class="profile-inner-container">
      <h2>this is profile view</h2>
      <h2>this is profile view</h2>
      <h2>this is profile view</h2>
      <h2>this is profile view</h2>
      <h2>this is profile view</h2>

      <div class="profile-inner-right-container">
        <a-avatar icon="user"> </a-avatar>
      </div>
      <div class="profile-inner-left-container">
        <a-avatar icon="sss"> </a-avatar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const feature = ref();
</script>

<style lang="scss" scoped>
@use "@/styles/design-tokens" as v;

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: v.$spacing-sm v.$spacing-md;

  .profile-inner-container {
    width: 60%;
    height: 100%;
    padding: v.$spacing-sm v.$spacing-md;
    background-color: red;
    border-radius: v.$content-border-radius;

    .profile-inner-left-container {
      background-color: green;
      float: left;
    }
    .profile-inner-right-container {
      background-color: blue;
      float: right;
    }
  }
}
</style>
