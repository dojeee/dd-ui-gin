import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "@/views/login/LoginView.vue";
import MainView from "@/views/MainView.vue";
import { useAuthStore } from "@/stores/authStores";
import { message } from "ant-design-vue";
import type { RouteRecordRaw } from "vue-router";

import profileRoutes from "./modules/ProfileRouters";
import managerRoutes from "./modules/ManagerRouters";
import llmsRouters from "./modules/LlmRouters";

const moduleRoutes: Array<RouteRecordRaw> = [
  ...profileRoutes,
  ...llmsRouters,
  ...managerRoutes,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      component: LoginView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/",
      component: MainView,
      meta: {
        requiresAuth: false,
        title: "Home",
        icon: "HomeOutlined",
      },
      children: moduleRoutes,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.token) {
    next("/login");
    message.error("ནང་འཛུལ་གནང་རོགས།");
  } else {
    next();
  }
});

export default router;
