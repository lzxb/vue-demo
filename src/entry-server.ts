import { RenderContext } from '@fmfe/genesis-core';
import Vue from 'vue';
import App from './app.vue';

export default async (renderContext: RenderContext): Promise<Vue> => {
    return new Vue({
        renderContext,
        render(h) {
            return h(App);
        }
    });
};
