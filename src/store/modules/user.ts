// import type { UserInfo } from '#/store';
// 

import { store } from "@/store"
import { getLogin, refreshTokenApi } from '@/api/login/user';

interface UserState {
    userInfo: any;
    token?: string;
    sessionTimeout?: boolean;
    lastUpdateTime: number;
}

interface LoginParams {
    username: string;
    password: string;
}

interface RoleInfo {
    roleName: string;
    value: string;
}

interface GetUserInfoModel {
    roles: RoleInfo[];
    // 用户id
    userId: string | number;
    // 用户名
    username: string;
    // 真实名字
    realName: string;
    // 头像
    avatar: string;
    // 介绍
    desc?: string;
}

import { ErrorMessageMode } from '#/axios';
import type { RefreshTokenResult } from '@/api/login/user';
import { setToken } from "@/utils/auth"
export const useUserStore = defineStore({
    id: 'app-user',
    state: (): UserState => (
        {
            // user info
            userInfo: null,
            // token
            token: undefined,
            // roleList
            // roleList: [],
            // Whether the login expired
            sessionTimeout: false,
            // Last fetch time
            lastUpdateTime: 0,
        }
    ),
    getters: {},
    actions: {
        async login(params: LoginParams): Promise<GetUserInfoModel | null> {

            const { ...loginParams } = params;
            try {
                let res: any = await getLogin(loginParams)
                if (res.code == '200') {
                    // save token
                    setToken(res.data);
                    return res
                }
            } catch (error) {
                return Promise.reject(error);
            }
        },
        /** 刷新`token` */
        async handRefreshToken(data) {
            console.log(data, '这有东西吗');

            return new Promise<RefreshTokenResult>((resolve, reject) => {
                refreshTokenApi(data).then(data => {
                    if (data) {
                        // setToken(data.data)
                        resolve(data)
                    }
                }).catch(error => reject(error))
            })
        }
    }
})


export const useUserStoreHook = () => {
    return useUserStore(store);
}