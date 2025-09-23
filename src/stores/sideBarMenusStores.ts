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
          icon: "PhBookOpenText",
          label: "Presidential briefings",
          title: "Presidential briefings",
        },
        {
          key: "saves",
          icon: "PhDownloadSimple",
          label: "Quick saves",
          title: "Quick saves",
        },
        {
          key: "readLater",
          icon: "PhClockCounterClockwise",
          label: "Read it later",
          title: "Read it later",
        },
        {
          key: "newFolder",
          icon: "PhFolderPlus",
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
      key: "managers",
      icon: undefined,
      label: "Managers",
      title: "Managers",
      children: [
        {
          key: "usersManager",
          icon: "PhUsersThree",
          label: "User manager",
          title: "User manager",
        },
        {
          key: "roleManager",
          icon: "PhIdentificationBadge",
          label: "Role manager",
          title: "Role manager",
        },
        {
          key: "permissionManager",
          icon: "PhUserCircleDashed",
          label: "Permission manager",
          title: "Permission manager",
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
