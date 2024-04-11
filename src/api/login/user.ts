import { request } from '@/utils/http';
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

export const getLogin = (data?: object) => {
    return request({
        url: '/login',
        method: 'post',
        data,
    })
}

export const refreshTokenApi = (data?: object) => {
    return request({
        url: '/refresh-token',
        method: 'post',
        data,
    })
}