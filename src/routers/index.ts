import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "@/views/login/LoginView.vue";
import MainView from "@/views/MainView.vue";




const router = createRouter({
    history: createWebHashHistory(),
    routes: [

        {
            path: "/login",
            component: LoginView
        },
        {
            path: "/",
            component: MainView
        }
    ]
})

export default router