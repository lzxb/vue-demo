import Vue from 'vue';
import Vuex from 'vuex';

export interface State {
    user: {
        name: string;
    }
}

Vue.use(Vuex);

/**
 * 提供一个工厂函数创建 store
 */
export const createStore = () => {
    return new Vuex.Store<State>({
        state: {
            user: {
                name: ''
            }
        }
    });
}