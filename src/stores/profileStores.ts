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
      key: "general",
      label: "General",
      title: "General",
      icon: "PhGearSix",
    },
    {
      key: "notification",
      label: "Notification",
      title: "Notification",
      icon: "PhBell",
    },
    {
      key: "account",
      label: "Account",
      title: "Account",
      icon: "PhUserCircle",
    },
  ]);

  return { showModal, menuItems };
});
