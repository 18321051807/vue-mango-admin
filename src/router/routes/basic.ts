import { RouteRecordRaw } from 'vue-router';

import { HOME_URL } from "@/config/config"

// 根路由
export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: HOME_URL,
  meta: {
    title: 'Root',
  },
};

/**
 * 定义404、401界面
 */
export const notFoundAndNoPower = [
  {
    path: '/:path(.*)*',
    name: 'notFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: 'message.staticRoutes.notFound',
      isHide: true,
    },
  },
  {
    path: '/401',
    name: 'noPower',
    component: () => import('@/views/error/401.vue'),
    meta: {
      title: 'message.staticRoutes.noPower',
      isHide: true,
    },
  },
];


/**
 * 定义静态路由（默认路由）
 */
export const staticRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Index.vue'),
    meta: {
      title: '登录',
    },
  },

];


// Basic routing without permission
export const basicRoutes = [
  RootRoute, ...staticRoutes, ...notFoundAndNoPower
];
