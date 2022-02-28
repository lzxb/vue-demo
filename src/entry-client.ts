import { createClientApp } from '@fmfe/genesis-app';
import { ClientOptions } from '@fmfe/genesis-core';
import Vue from 'vue';

import { App, createRequest, createRouter, createStore } from './entry-base';

/**
 * 客户端入口，需要导出一个方法，并且返回一个 Promise<Vue>
 */
export default async (clientOptions: ClientOptions): Promise<Vue> => {
    const request = createRequest();
    const store = createStore(request);
    const router = createRouter();
    /**
     * 把服务端下发的状态，还原到 store 中
     */
    store.replaceState(clientOptions.state.vuexState);

    /**
     * 创建客户端应用程序
     */
    return createClientApp({
        /**
         * 根组件
         */
        App,
        /**
         * 客户端的选项
         */
        clientOptions,
        /**
         * new Vue({ ...vueOptions })
         */
        vueOptions: {
            /**
             * 注入 store 在服务端预取数据
             */
            store,
            /**
             * 注入路由，根据当前请求进行渲染 createServerApp 会自动执行 router.push(req.url);
             */
            router,
            /**
             * 注入请求，然后在 base-vue.ts 中封装对象
             */
            request
        }
    });
};
