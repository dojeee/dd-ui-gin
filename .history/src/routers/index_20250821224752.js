


import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/login/Login.vue";
import App from "@/App.vue";




const router = createRouter({

    history: createWebHashHistory(),
    routes: [

        {
            path: "/",
            component: App
        },
        {
            path: "/login",
            component: Login
        }

    ]
})

export default router