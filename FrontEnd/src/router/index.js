import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../components/HomePage/page.vue"),
  },
  {
    path: "/ChatSession",
    name: "ChatSession",
    component: () => import("../components/ChatSession/page.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
