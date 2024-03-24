import { createRouter, createWebHistory } from 'vue-router';
import { $tc } from '@/locales/setupI18n';

const getRoutes = () => [
  {
    path: '/Login',
    component: () => import('../views/RemoteEmulator/index.vue'),
    meta: { title: $tc('routes.remoteControl') },
  },
  {
    path: '/',
    redirect: '/Index',
  },
  {
    path: '/AndroidRemote/:deviceId(\\d+)',
    component: () => import('../views/RemoteEmulator/index.vue'),
    meta: { title: $tc('routes.remoteControl') },
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
