import { RenderContext } from '@fmfe/genesis-core';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import Vue, { getCurrentInstance } from 'vue';

export interface RequestResponse {
    success: boolean;
    message: string;
    data: any;
}

/**
 * 封装一层 axios
 */
export class Request {
    private axios: AxiosInstance;
    public constructor(renderContext?: RenderContext) {
        /**
         * 将当前渲染请求带过来的请求头，转发给 api 调用的请求
         */
        const headersArr = [
            'http-host',
            'remote-host',
            'user-agent',
            'referer',
            'cookie',
            'x-forwarded-for',
            'authorization',
            'if-none-match',
            'accept-language',
            'lang',
            'origin'
        ];
        const headers: { [x: string]: string } = {};
        /**
         * 在服务器端是，将渲染上下文传递进来
         */
        if (renderContext?.req) {
            headersArr.forEach((k) => {
                const v = renderContext?.req?.headers[k];
                if (typeof v === 'string') {
                    headers[k] = v;
                }
            });
        }
        this.axios = axios.create({
            headers,
            // 在服务器端请求的时候，需要设置请求的基本地址
            baseURL:
                process.env.VUE_ENV === 'server' ? 'http://localhost:3000' : '',
            timeout: 5000,
            validateStatus: () => true
        });
        this.axios.interceptors.request.use(async (config) => {
            console.log(`${config.method} ${config.url}`);
            return config;
        });
    }

    /**
     * 获取数据
     */
    public get(
        url: string,
        config: AxiosRequestConfig = {}
    ): Promise<RequestResponse> {
        return this.axios.get(url, config).then(this.success).catch(this.error);
    }
    /**
     * 提交数据
     */
    public post(url: string, data: any = {}, config: AxiosRequestConfig = {}) {
        return this.axios
            .post(url, data, config)
            .then(this.success)
            .catch(this.error);
    }
    /**
     * 更新数据
     */
    public put(url: string, data: any = {}, config: AxiosRequestConfig = {}) {
        return this.axios
            .put(url, data, config)
            .then(this.success)
            .catch(this.error);
    }
    /**
     * 删除数据
     */
    public delete(url: string, config: AxiosRequestConfig = {}) {
        return this.axios
            .delete(url, config)
            .then(this.success)
            .catch(this.error);
    }
    /**
     * 处理请求成功
     */
    private success<T>(res: AxiosResponse): Promise<RequestResponse> {
        return res.data;
    }
    /**
     * 处理请求失败
     */
    private async error(err: Error): Promise<RequestResponse> {
        console.log('request error', err?.message);
        return {
            success: false,
            message: '请求失败',
            data: null
        };
    }
}

/**
 * 创建一个请求对象
 */
export const createRequest = (renderContext?: RenderContext) => {
    return new Request(renderContext);
};

export function useRequest(): Request {
    const vm = getCurrentInstance();
    if (!vm) {
        throw new Error('Please use in setup');
    }
    const request = vm.proxy.$root.$options.request;
    if (!request) {
        throw new Error('Vue root component does not inject request object');
    }
    return request;
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        request?: Request;
    }
}
