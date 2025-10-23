import type { RouteRecordRaw } from "vue-router";
import UserManagerView from "@/views/managers/user_manager/UserManagerView.vue";
import RoleManagerView from "@/views/managers/role_manager/RoleManagerView.vue";
import PermissionManagerView from "@/views/managers/permission_manager/PermissionManagerView.vue";

const managerRoutes: Array<RouteRecordRaw> = [
  {
    path: "manager",
    name: "ManagerModule",
    redirect: "/manager/user",
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: "user",
        name: "UserManager",
        component: UserManagerView,
        meta: {
          title: "User Manager",
          icon: "UserOutlined",
          pageHeader: true,
        },
      },
      {
        path: "role",
        name: "RoleManager",
        component: RoleManagerView,
        meta: {
          title: "Role Manager",
          icon: "TeamOutlined",
          pageHeader: true,
        },
      },
      {
        path: "permission",
        name: "PermissionManager",
        component: PermissionManagerView,
        meta: {
          title: "Permission Manager",
          icon: "LockOutlined",
          pageHeader: true,
        },
      },
    ],
  },
];

export default managerRoutes;
