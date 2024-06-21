import { createRouter, createWebHistory } from "vue-router";

const getRoutes = () => [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
  },
  // {
  //   path: '/',
  //   component: () => import('../views/RemoteEmulator/PerfIndex.vue'),
  // },
  // {
  //   path: '/report',
  //   component: () => import('../views/Report/ReportDetail.vue'),
  // },
];

export let router = null;

export function setupRouter(app) {
  router = createRouter({
    history: createWebHistory(),
    routes: getRoutes(),
  });
  app.use(router);
}
