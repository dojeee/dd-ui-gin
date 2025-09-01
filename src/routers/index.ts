import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "@/views/login/LoginView.vue";
import MainView from "@/views/MainView.vue";
import { useAuthStore } from "@/stores/authStores";
import { message } from "ant-design-vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/login",
            component: LoginView,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: "/",
            component: MainView,
            meta: {
                requiresAuth: true
            }
        }
    ]
});


router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.token) {
        next('/login');
        message.error("ནང་འཛུལ་གནང་རོགས།")
    } else {
        next();
    }
});

export default router;