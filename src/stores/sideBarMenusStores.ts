import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { IconName } from "@/assets/icons/SideBarIconMap";

interface PersonalMenuItem {
  key: string;
  icon?: IconName; // ✅ 使用字符串类型，不是组件
  label: string;
  title: string;
  children?: PersonalMenuItem[];
}

export const useSideBarMenusStores = defineStore("sideBarMenus", () => {
  const sideBarMenus = ref<PersonalMenuItem[]>([
    {
      key: "foryou",
      icon: "CompassOutlined",
      label: "For You",
      title: "For You",
    },
    {
      key: "following",
      icon: "UsergroupAddOutlined",
      label: "Following",
      title: "Following",
    },
    {
      key: "explore",
      icon: "RiseOutlined",
      label: "Explore",
      title: "Explore",
    },
    {
      key: "history",
      icon: "HistoryOutlined",
      label: "History",
      title: "History",
    },
    {
      key: "customFeeds",
      icon: undefined,
      label: "Custom feeds",
      title: "Custom feeds",
      children: [
        {
          key: "addCustomFeed",
          icon: "PlusOutlined",
          label: "Custom feed",
          title: "Custom feed",
        },
      ],
    },
    {
      key: "network",
      icon: undefined,
      label: "Network",
      title: "Network",
      children: [
        {
          key: "findSquads",
          icon: "TeamOutlined",
          label: "Find Squads",
          title: "Find Squads",
        },
        {
          key: "newSquad",
          icon: "PlusOutlined",
          label: "New Squad",
          title: "New Squad",
        },
      ],
    },
    {
      key: "bookmarks",
      icon: undefined,
      label: "Bookmarks",
      title: "Bookmarks",
      children: [
        {
          key: "briefings",
          icon: "ReadOutlined",
          label: "Presidential briefings",
          title: "Presidential briefings",
        },
        {
          key: "saves",
          icon: "BookOutlined",
          label: "Quick saves",
          title: "Quick saves",
        },
        {
          key: "readLater",
          icon: "ClockCircleOutlined",
          label: "Read it later",
          title: "Read it later",
        },
        {
          key: "newFolder",
          icon: "PlusOutlined",
          label: "New folder",
          title: "New folder",
        },
      ],
    },
    {
      key: "discover",
      icon: undefined,
      label: "Discover",
      title: "Discover",
      children: [
        {
          key: "tags",
          icon: "TagOutlined",
          label: "Tags",
          title: "Tags",
        },
        {
          key: "sources",
          icon: "GlobalOutlined",
          label: "Sources",
          title: "Sources",
        },
        {
          key: "leaderboard",
          icon: "TrophyOutlined",
          label: "Leaderboard",
          title: "Leaderboard",
        },
        {
          key: "discussions",
          icon: "MessageOutlined",
          label: "Discussions",
          title: "Discussions",
        },
      ],
    },
    {
      key: "userList",
      icon: undefined,
      label: "User list",
      title: "User list",
      children: [
        {
          key: "usersManager",
          icon: "UserOutlined",
          label: "User manager",
          title: "User manager",
        },
        {
          key: "roleManager",
          icon: "UserOutlined",
          label: "Role manager",
          title: "R manager",
        },
      ],
    },
  ]);

  function setMenus(menus: PersonalMenuItem[]) {
    sideBarMenus.value = menus;
  }

  function addMenu(menu: PersonalMenuItem) {
    sideBarMenus.value.push(menu);
  }

  const firstSelectedKey = computed(() => {
    return sideBarMenus.value[0].key;
  });

  const topLevelKeys = computed(() => {
    return sideBarMenus.value.map((item) => item.key);
  });

  return {
    sideBarMenus,
    topLevelKeys,
    firstSelectedKey,
    setMenus,
    addMenu,
  };
});
