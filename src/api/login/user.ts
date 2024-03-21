import { http } from "@/utils/http/index"
interface LoginParams {
    username: string;
    password: string;
}

import { ErrorMessageMode } from '#/axios';
import axios from "axios";


interface RoleInfo {
    roleName: string;
    value: string;
}

interface LoginResultModel {
    userId: string | number;
    token: string;
    roles: RoleInfo[];
}

export type RefreshTokenResult = {
    success: boolean;
    data: {
        /** `token` */
        accessToken: string;
        /** 用于调用刷新`accessToken`的接口时所需的`token` */
        refreshToken: string;
        /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
        expires: Date;
    };
};

export const loginApi = (params: LoginParams) => {
    return http.request<RefreshTokenResult>("get", "/basic-api/interact_api/v1/pin_tab_lead", {
        data: params
    });
}

/** 登录 */
// export const getLogin = (params?: object) => {
//     return http.request("get", "/api/en", {});
// };

export const refreshTokenApi = (data?: object) => {
    return http.request<RefreshTokenResult>("post", "/refresh-token", { data });
}

export const getLogin = (params?: object) => {
    return http.request("post", '/api/login', { data: params })
}
