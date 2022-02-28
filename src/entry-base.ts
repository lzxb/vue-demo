import Vue from 'vue';
import Meta from 'vue-meta';

import App from './app.vue';
import { createRequest } from './request';
import { createRouter } from './router';
import { createStore } from './store';

Vue.use(Meta);

export { App, createStore, createRouter, createRequest };
