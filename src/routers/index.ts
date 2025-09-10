import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "@/views/login/LoginView.vue";
import MainView from "@/views/MainView.vue";
import { useAuthStore } from "@/stores/authStores";
import { message } from "ant-design-vue";
import UserManagerView from "@/views/users/UserManagerView.vue";
import RoleManagerView from "@/views/users/RoleManagerView.vue";



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
      children: [
        {
          path: "user",
          name: "UserManager",
          component: UserManagerView,
          meta: {
            title: "User Manager",
            icon: "UserOutlined",
            requiresAuth: false,
          },
        },
        {
          path: "role",
          name: "RoleManager",
          component: RoleManagerView,
          meta: {
            title: "Role Manager",
            icon: "TeamOutlined",
            requiresAuth: false,
          },
        },
      ],
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
