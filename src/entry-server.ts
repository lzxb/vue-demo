import { createServerApp } from '@fmfe/genesis-app';
import { RenderContext } from '@fmfe/genesis-core';
import Vue from 'vue';

import { App, createRequest, createRouter, createStore } from './entry-base';

/**
 * 服务端入口，需要导出一个方法，并且返回一个 Promise<Vue>
 */
export default async (renderContext: RenderContext): Promise<Vue> => {
    const request = createRequest(renderContext);
    const store = createStore(request);
    const router = createRouter();
    /**
     * 创建服务端应用程序
     */
    const app = await createServerApp({
        /**
         * 根组件
         */
        App,
        /**
         * SSR 渲染的上下文
         */
        renderContext,
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
    /**
     * 等渲染完成后，将标题传输给 index.html 模板中
     */
    renderContext.beforeRender(() => {
        // 如果你需要设置网站的关键词、描述等等，请查阅相关文档：https://vue-meta.nuxtjs.org/
        const {
            title,
            meta,
            link,
            style,
            script,
            htmlAttrs,
            headAttrs,
            bodyAttrs,
            base,
            noscript
        } = app.$meta().inject();
        // 在 index.html 文件中使用 <%- meta.title %>  就可以渲染出标题了，其它的举一反三
        Object.defineProperty(renderContext.data, 'meta', {
            enumerable: false,
            value: {
                title: title?.text() || '',
                meta: meta?.text() || '',
                link: link?.text() || '',
                style: style?.text() || '',
                script: script?.text() || '',
                htmlAttrs: htmlAttrs?.text() || '',
                headAttrs: headAttrs?.text() || '',
                bodyAttrs: bodyAttrs?.text() || '',
                base: base?.text() || '',
                noscript: noscript?.text() || ''
            }
        });
        // 将服务端状态，下发给客户端
        renderContext.data.state.vuexState = app.$store.state;
    });
    return app;
};
