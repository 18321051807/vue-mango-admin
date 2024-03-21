


import { RouteRecordRaw } from "vue-router";

/** 自动导入全部静态路由，无需再手动引入！匹配 src/router/routes 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件，除了 basic.ts 文件
 */
export const getRoutesList = () => {
    let modules: Record<string, any> = import.meta.glob(
        ["./routes/**/*.ts", "!./routes/**/basic.ts"],
        {
            eager: true
        }
    );
    let routes: RouteRecordRaw[] = []
    Object.keys(modules).forEach(key => {
        let route = modules[key].default
        if (route.meta.isShow !== false) {
            routes.push(route)
        }
    });
    return routes
}

declare const intersection: (...rest: any[]) => any[];

/** 判断两个数组彼此是否存在相同值 */
export function isOneOfArray(a: Array<string>, b: Array<string>) {
    return Array.isArray(a) && Array.isArray(b)
        ? intersection(a, b).length > 0
            ? true
            : false
        : true;
}