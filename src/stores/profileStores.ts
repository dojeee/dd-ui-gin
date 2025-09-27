import { defineStore } from "pinia";

import { ref } from "vue";
import type { IconName } from "@/assets/icons/SideBarIconMap";
interface ProfileMenuItem {
  key: string;
  icon?: IconName;
  label: string;
  title: string;
}

export const useProfileStore = defineStore("profile", () => {
  const showModal = ref(false);

  const menuItems = ref<ProfileMenuItem[]>([
    {
      key: "settings",
      label: "Settings",
      title: "Settings",
      icon: "UserOutlined",
    },
    {
      key: "general",
      label: "General",
      title: "General",
      icon: "UserOutlined",
    },
    {
      key: "notification",
      label: "Notification",
      title: "Notification",
      icon: "UserOutlined",
    },
  ]);

  return { showModal, menuItems };
});
