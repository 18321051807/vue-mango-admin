
import type {
    AxiosResponse,
    AxiosRequestConfig
} from "axios";

export interface HttpResponse extends AxiosResponse {
    config: HttpRequestConfig;
}

export interface HttpRequestConfig extends AxiosRequestConfig {
    beforeRequestCallback?: (request: HttpRequestConfig) => void;
    beforeResponseCallback?: (response: HttpResponse) => void;
}

export type RequestMethods = Extract<
    Method,
    "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;


export interface PureHttpResponse extends AxiosResponse {
    config: HttpRequestConfig;
}