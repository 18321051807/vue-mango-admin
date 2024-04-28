// ? 全局不动配置项 只做导出不做修改

// * token
export const ACCESS_TOKEN = 'token'

export const USER_INFO = 'user-info'

// * 首页地址（默认）
export const HOME_URL: string = "/home";

// * 登录页地址（默认）
export const LOGIN_URL: string = "/login";

// * 默认主题颜色
export const DEFAULT_PRIMARY: string = "#009688";

// * 路由白名单地址（必须是本地存在的路由 staticRouter.ts）
export const ROUTER_WHITE_LIST: string[] = ["/500"];

export interface DataInfo<T> {
    /** token */
    accessToken: string;
    /** `accessToken`的过期时间（时间戳） */
    expires: T;
    /** 用于调用刷新accessToken的接口时所需的token */
    refreshToken: string;
    /** 用户名 */
    username?: string;
    /** 当前登陆用户的角色 */
    roles?: Array<string>;
}

