import Axios, {
    type AxiosInstance,
    type AxiosRequestConfig,
    type CustomParamsSerializer
} from "axios";

import qs from 'qs';
import { stringify } from "qs";

import { HttpRequestConfig, RequestMethods, HttpResponse } from "./types";
import NProgress from "@/utils/progress"
import { formatToken, getToken } from "../auth";
import { useUserStoreHook } from "@/store/modules/user";

const defaultConfig: AxiosRequestConfig = {
    // 请求超时时间
    timeout: 10000,
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    },
    // 数组格式参数序列化
    paramsSerializer: {
        serialize: stringify as unknown as CustomParamsSerializer
    }
};

class Request {
    constructor() {
        this.httpInterceptorsRequest();
        this.httpInterceptorsResponse();
    }

    /** token过期后，暂存待执行的请求 */
    private static requests = [];

    /** 防止重复刷新token */
    private static isRefreshing = false;

    /** 初始化配置对象 */
    private static initConfig: any = {};

    /** 保存当前Axios实例对象 */
    private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

    /** 重连原始请求 */
    private static retryOriginalRequest(config) {
        return new Promise(resolve => {
            Request.requests.push((token: string) => {
                config.headers["Authorization"] = formatToken(token);
                resolve(config);
            });
        });
    }

    /** 请求拦截 */
    private httpInterceptorsRequest(): void {
        Request.axiosInstance.interceptors.request.use(
            async (config: HttpRequestConfig): Promise<any> => {

                // 开启进度条动画
                NProgress.start();
                // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
                if (typeof config.beforeRequestCallback === "function") {
                    config.beforeRequestCallback(config);
                    return config;
                }
                if (Request.initConfig.beforeRequestCallback) {
                    Request.initConfig.beforeRequestCallback(config);
                    return config;
                }
                /** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
                const whiteList = ["/refresh-token", "/login"];

                return whiteList.find(url => url === config.url) ? config : new Promise(resolve => {
                    const data = getToken();

                    if (data) {
                        const now = new Date().getTime();
                        const expired = parseInt(data.expires) - now <= 0;
                        if (expired) {
                            if (!Request.isRefreshing) {
                                Request.isRefreshing = true;
                                // token过期刷新
                                useUserStoreHook().handRefreshToken({ refreshToken: data.refreshToken })
                                    .then(res => {
                                        const token = res.data.accessToken
                                        config.headers["Authorization"] = formatToken(token);
                                        Request.requests.forEach(cb => cb(token));
                                        Request.requests = [];
                                    }).finally(() => {
                                        Request.isRefreshing = false
                                    })
                            }
                            resolve(Request.retryOriginalRequest(config));

                        } else {
                            config.headers["Authorization"] = formatToken(
                                data.accessToken
                            );
                            resolve(config);
                        }
                    } else {
                        resolve(config);
                    }
                })
            },
            error => {
                return Promise.reject(error)
            }

        )
    }

    /** 响应拦截 */
    private httpInterceptorsResponse(): void {
        const instance = Request.axiosInstance;
        instance.interceptors.response.use(
            (response: HttpResponse) => {
                const $config = response.config;
                // 关闭进度条动画
                NProgress.done();
                // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
                if (typeof $config.beforeResponseCallback === "function") {
                    $config.beforeResponseCallback(response);
                    return response.data;
                }
                if (Request.initConfig.beforeResponseCallback) {
                    Request.initConfig.beforeResponseCallback(response);
                    return response.data;
                }
                console.log(response,'response');

                return response.data;
            },
            (error) => {
                const $error = error;
                $error.isCancelRequest = Axios.isCancel($error);
                // 关闭进度条动画
                NProgress.done();
                // 所有的响应异常 区分来源为取消请求/非取消请求
                return Promise.reject($error);
            }
        );
    }

    public post<T, P>(url: string,
        params?: AxiosRequestConfig<T>,
        config?: HttpRequestConfig): Promise<P> {
        return this.request("post", url, params, config)
    }
    /** 单独抽离的get工具函数 */
    public get<T, P>(
        url: string,
        params?: AxiosRequestConfig<T>,
        config?: HttpRequestConfig
    ): Promise<P> {
        return this.request<P>("get", url, params, config);
    }

    /** 通用请求工具函数 */
    public request<T>(
        method: RequestMethods,
        url: string,
        param?: AxiosRequestConfig,
        axiosConfig?: HttpRequestConfig
    ): Promise<T> {
        const config = {
            method,
            url,
            ...param,
            ...axiosConfig
        } as HttpRequestConfig;
        console.log(config, 'config');

        // 单独处理自定义请求/响应回调
        return new Promise((resolve, reject) => {
            Request.axiosInstance
                .request(config)
                .then((response: undefined) => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}


export const http = new Request();
