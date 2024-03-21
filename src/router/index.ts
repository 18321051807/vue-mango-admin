import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

import { basicRoutes } from './routes/basic';
import { getRoutesList } from "./utils"

import NProgress from "@/utils/progress"
import { Session, storage } from '@/utils/storage';
import { ACCESS_TOKEN, USER_INFO, HOME_URL, LOGIN_URL, type DataInfo } from "@/config/config"


import { isOneOfArray } from "@/router/utils"


let modules: RouteRecordRaw[] = getRoutesList()

console.log(import.meta.env, '----');

let routes: RouteRecordRaw[] = []
routes.push(...basicRoutes, ...modules)

// app router
const router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes,
    // 是否应该禁止尾部斜杠。默认为假
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach((to: ToRouteType, _from, next) => {
    NProgress.start();
    const userInfo: any = storage.get<DataInfo<number>>(USER_INFO)
    const token = Session.get(ACCESS_TOKEN);
    if (to.path === LOGIN_URL && !token) {
        next();
    } else {
        if (!token) {
            next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`);
            Session.clear();
        } else if (token && to.path === LOGIN_URL) {
            next(HOME_URL);
        } else {
            // 无权限跳转403页面
            if (to.meta?.roles && !isOneOfArray(to.meta?.roles, userInfo?.roles)) {
                next({ path: "/error/403" });
            } else {
                next()
            }
        }
    }
})

router.afterEach(() => {
    NProgress.done();
});

export default router;

