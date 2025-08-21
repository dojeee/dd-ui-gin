


import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";




const router = createRouter({

    history: createWebHashHistory(),
    routes: [

        {
            path: "/",
            component: Login
        }

    ]
})