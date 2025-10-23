import type { RouteRecordRaw } from "vue-router";

const profileRoutes: Array<RouteRecordRaw> = [
  {
    path: "profile",
    name: "Profile",
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "settings",
        name: "Settings",
        component: () => import("@/views/profile/ProfileView.vue"),
        meta: {
          title: "Settings",
          icon: "UserOutlined",
          pageHeader: true,
        },
      },
    ],
  },
];

export default profileRoutes;
