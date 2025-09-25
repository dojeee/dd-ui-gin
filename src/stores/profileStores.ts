import { defineStore } from "pinia";

import { ref } from "vue";

export const useProfileStore = defineStore("profile", () => {
  const showModal = ref(false);

  return { showModal };
});
