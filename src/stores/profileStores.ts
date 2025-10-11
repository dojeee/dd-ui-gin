import { defineStore } from "pinia";

import { ref } from "vue";
import type { IconName } from "@/assets/icons/SideBarIconMap";
import { notification } from "ant-design-vue";
interface ProfileMenuItem {
  key: string;
  icon?: IconName;
  label: string;
  title: string;
}

interface NotificationItemType {
  key: string;
  title: string;
  description: string;
  notificationTypes: string[];
  options: [];
  value: [];
}

export const useProfileStore = defineStore("profile", () => {
  // state
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

  const notificationSettings = ref<NotificationItemType[]>([
    {
      key: "reply",
      title: "reply",
      description: "when someone replies to your comments",
      notificationTypes: ["email", "push", "sms"],
      options: [],
      value: [],
    },
    {
      key: "like",
      title: "like",
      description: "when someone likes your comments",
      notificationTypes: ["email", "push", "sms"],
      options: [],
      value: [],
    },
    {
      key: "tasks",
      title: "tasks",
      description: "when some tasks finished or expired",
      notificationTypes: ["email", "push", "sms"],
      options: [],
      value: [],
    },
  ]);

  // actions
  const enableModal = () => {
    showModal.value = true;
  };

  const disableModal = () => {
    showModal.value = false;
  };

  const toggleModal = () => {
    showModal.value = !showModal.value;
  };

  return {
    showModal,
    menuItems,
    notificationSettings,
    enableModal,
    disableModal,
    toggleModal,
  };
});
