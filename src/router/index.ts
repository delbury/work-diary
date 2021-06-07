import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/diary',
  },
  {
    path: '/home',
    component: () => import('/@/pages/home/index.vue'),
  },
  {
    path: '/diary',
    component: () => import('/@/pages/layout/index.vue'),
    children: [
      {
        path: 'years',
        component: () => import('/@/pages/diary/years/index.vue'),

      },
    ],
    redirect: '/diary/years',
  },
  {
    path: '/:notfound(.*)',
    redirect: '/',
  },
];

export default createRouter({
  history: createWebHistory('/'),
  routes,
});
