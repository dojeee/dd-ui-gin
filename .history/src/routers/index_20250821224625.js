


import { createRouter, createWebHashHistory } from "vue-router";
import Login from "@/views/login/Login.vue";




const router = createRouter({

    history: createWebHashHistory(),
    routes: [

        {
            path: "/",
            component: Login
        },
        {
            path: "/login",
            component: Login
        }

    ]
})