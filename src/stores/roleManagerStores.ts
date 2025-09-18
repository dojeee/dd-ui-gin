import { defineStore } from "pinia";

import { ref, reactive } from "vue";
import { RoleManagerPageSearchParams } from "@/types/role";

export const useRoleManagerStores = defineStore("roleManager", () => {
  const searchParams = reactive<RoleManagerPageSearchParams>({
    roleId: "",
    roleName: "",
    status: "" as 0 | 1 | "",
  });

  return {
    searchParams,
  };
});
