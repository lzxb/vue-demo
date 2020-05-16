import { RenderContext } from '@fmfe/genesis-core';
import { createServerApp } from '@fmfe/genesis-app';
import Vue from 'vue';
import { App, createStore, createRouter } from './entry-base';


/**
 * 服务端入口，需要导出一个方法，并且返回一个 Promise<Vue>
 */
export default async (renderContext: RenderContext): Promise<Vue> => {
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
            store: createStore(),
            /**
             * 注入路由，根据当前请求进行渲染 createServerApp 会自动执行 router.push(req.url);
             */
            router: createRouter()
        }
    });
    /**
     * 等渲染完成后，将标题传输给 index.html 模板中
     */
    renderContext.beforeRender(() => {
        // 如果你需要设置网站的关键词、描述等等，请查阅相关文档：https://vue-meta.nuxtjs.org/
        const { title } = app.$meta().inject();
        // 在 index.html 文件中使用 <%- title %>  就可以渲染出标题了
        renderContext.data.title = title?.text() || '';
        // 将服务端状态，下发给客户端
        renderContext.data.state.vuexState = app.$store.state;
    })
    return app;
};
