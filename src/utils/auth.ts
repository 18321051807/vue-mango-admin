import Cookies from "js-cookie";
import { ACCESS_TOKEN, USER_INFO } from "@/config/config";
import { storage, Session } from "./storage";
export interface DataInfo<T> {
    /** token */
    token: string;
    /** `token`的过期时间（时间戳） */
    expires: T;
    /** 用户名 */
    username?: string;
    /** 当前登陆用户的角色 */
    roles?: Array<string>;
    id: number
}


/** 获取`token` */
export const getToken = (): DataInfo<number> => {
    // 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
    return Cookies.get(ACCESS_TOKEN)
        ? JSON.parse(Cookies.get(ACCESS_TOKEN))
        : '';
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`accessToken`、`expires`这两条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`username`、`roles`、`refreshToken`、`expires`这四条信息放在key值为`user-info`的localStorage里（利用`multipleTabsKey`当浏览器完全关闭后自动销毁）
 */
export const setToken = (data: DataInfo<Date>) => {
    let expires = 0;
    const { token } = data;
    expires = new Date(data.expires).getTime();
    console.log(expires);
    Session.set(ACCESS_TOKEN, token)

}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
    return "Bearer " + token;
};

export const removeToken = () => {
    return Cookies.remove(ACCESS_TOKEN);
}
