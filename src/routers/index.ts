import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "@/views/login/LoginView.vue";
import MainView from "@/views/MainView.vue";
import { useAuthStore } from "@/stores/authStores";
import { message } from "ant-design-vue";
import UserManagerView from "@/views/users/UserManagerView.vue";
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
      },
    },
    {
      path: "/user",
      component: UserManagerView,
      meta: {
        requiresAuth: false,
      },
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
