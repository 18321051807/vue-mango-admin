import axios, { CanceledError, type CustomParamsSerializer, type AxiosResponse, type AxiosRequestConfig } from 'axios';

import { stringify } from "qs";

import { message as $message, Modal } from 'ant-design-vue';

import { ResultEnum } from '@/enums/httpEnum';
import { formatToken, getToken } from "../auth";


export interface RequestOptions extends AxiosRequestConfig {
    /** 是否直接将数据从响应中提取出，例如直接返回 res.data，而忽略 res.code 等信息 */
    isReturnResult?: boolean;
    /** 请求成功是提示信息 */
    successMsg?: string;
    /** 请求失败是提示信息 */
    errorMsg?: string;
    /** 成功时，是否显示后端返回的成功信息 */
    showSuccessMsg?: boolean;
    /** 失败时，是否显示后端返回的失败信息 */
    showErrorMsg?: boolean;
    requestType?: 'json' | 'form';
}



const UNKNOWN_ERROR = '未知错误，请重试';
const UNUSUAL_ERROR = '账号异常，您可以取消停留在该页上，或重新登录'

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

const service = axios.create(defaultConfig);

service.interceptors.request.use(
    (config) => {

        const token = getToken();
        if (token && config.headers) {
            // 请求头token信息
            config.headers['Authorization'] = formatToken(token);
        }
        return config;
    },
    (error) => {
        console.log(error)
        Promise.reject(error);
    },
);


service.interceptors.response.use(
    (response) => {
        const res = response.data;
        const code = res.code;
        // 二进制数据则直接返回
        if (response.request.responseType === 'blob' || response.request.responseType === 'arraybuffer') {
            return response.data
        }

        // if the custom code is not 200, it is judged as an error.
        if (code !== ResultEnum.SUCCESS) {
            $message.error(res.message || UNKNOWN_ERROR);
            if ([1101, 1105].includes(code)) {
                Modal.confirm({
                    title: '警告',
                    content: res.message || UNUSUAL_ERROR,
                    okText: '重新登录',
                    cancelText: '取消',
                    onOk: () => {
                        localStorage.clear();
                        window.location.reload();
                    },
                });
            }

            // throw other
            const error = new Error(res.message || UNKNOWN_ERROR) as Error & { code: any };
            error.code = code;
            return Promise.reject(error);
        } else {
            return Promise.resolve(res)
        }
    },
    (error) => {
        if (!(error instanceof CanceledError)) {
            // 处理 422 或者 500 的错误异常提示
            const errMsg = error?.response?.data?.message ?? UNKNOWN_ERROR;
            $message.error({ content: errMsg, key: errMsg });
            error.message = errMsg;
        }
        return Promise.reject(error);
    },
);


type BaseResponse<T = any> = Omit<API.ResOp, 'data'> & {
    data: T;
};



type BaseResponseWithCode<T> = BaseResponse<T> & { code: number };

export function request<T = any>(
    url: string,
    config: { isReturnResult: false } & RequestOptions,
): Promise<BaseResponse<T>>;

export function request<T = any>(
    url: string,
    config: RequestOptions,
): Promise<BaseResponse<T>['data']>;

export function request<T = any>(
    config: { isReturnResult: false } & RequestOptions,
): Promise<BaseResponse<T>>;

export function request<T = any>(config: RequestOptions): Promise<BaseResponse<T>['data']>;



/**
 *
 * @param url - request url
 * @param config - AxiosRequestConfig
 */
export async function request(_url: string | RequestOptions, _config: RequestOptions = {}) {
    const url = typeof _url == "string" ? _url : _url.url;
    const config = typeof _url == "string" ? _config : _url;
    try {
        // 兼容 from data 文件上传的情况
        const { requestType, isReturnResult = false, ...rest } = config;

        const response = (await service.request({
            url,
            ...rest,
            headers: {
                ...rest.headers,
                ...(requestType === 'form' ? { 'Content-Type': 'multipart/form-data' } : {}),
            },
        })) as AxiosResponse<BaseResponse> & { code: number };

        const { code, data } = response;

        const { message } = data || {};

        const hasSuccess = data && code === ResultEnum.SUCCESS;

        if (hasSuccess) {
            const { successMsg, showSuccessMsg } = config;
            if (successMsg) {
                $message.success(successMsg);
            } else if (showSuccessMsg && message) {
                $message.success(message);
            }
        }

        // 页面代码需要获取 code，data，message 等信息时，需要将 isReturnResult 设置为 false
        if (!isReturnResult) {
            return response;
        } else {
            return data;
        }

    } catch (error) {
        return Promise.reject(error);
    }
}

export default service
