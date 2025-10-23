import { RouteRecordRaw } from "vue-router";

const llmsRouters: Array<RouteRecordRaw> = [
  {
    path: "llms",
    name: "Llms",
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: "chat",
        name: "Chat",
        component: () => import("@/views/llms/ConversationView.vue"),
        meta: {
          title: "Chat",
          icon: "UserOutlined",
          pageHeader: false,
        },
      },
    ],
  },
];
export default llmsRouters;
