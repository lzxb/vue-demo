import Vue, { getCurrentInstance } from 'vue';
import Vuex, { Store } from 'vuex';

import { Request } from '../request';

export interface BlogItem {
    author: string;
    content: string;
    id: number;
    createTime: number;
}

export interface State {
    user: {
        name: string;
    };
    blogList: BlogItem[];
}

Vue.use(Vuex);

/**
 * 提供一个工厂函数创建 store
 */
export const createStore = (request: Request) => {
    return new Vuex.Store<State>({
        state: {
            /**
             * 用户信息
             */
            user: {
                name: ''
            },
            /**
             * 微博列表
             */
            blogList: []
        },
        mutations: {
            /**
             * 用户登录成功
             */
            signin(state, name: string) {
                state.user.name = name;
            },
            /**
             * 获取微博列表数据
             */
            getBlogList(state, list: BlogItem[]) {
                state.blogList = list;
            }
        }
    });
};

export function useStore(): Store<State> {
    const vm = getCurrentInstance();
    if (!vm) {
        throw new Error('Please use in setup');
    }

    return vm.proxy.$store;
}
