import { ClientOptions } from '@fmfe/genesis-core';
import Vue from 'vue';
import App from './app.vue';

export default async (clientOptions: ClientOptions): Promise<Vue> => {
    return new Vue({
        clientOptions,
        render(h) {
            return h(App);
        }
    });
};
