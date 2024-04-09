import { createRouter, createWebHistory } from 'vue-router';

const getRoutes = () => [
  {
    path: '/',
    component: () => import('../views/RemoteEmulator/index.vue'),
  },
  {
    path: '/report',
    component: () => import('../views/Report.vue'),
  },
];

export let router = null;

export function setupRouter(app) {
  router = createRouter({
    history: createWebHistory(),
    routes: getRoutes(),
  });
  app.use(router);
}
