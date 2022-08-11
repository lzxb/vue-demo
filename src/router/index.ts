import Vue, { getCurrentInstance } from 'vue';
import Router from 'vue-router';

Vue.use(Router);
/**
 * 提供一个工厂函数，创建一个路由对象
 */
export const createRouter = () => {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: () =>
                    import(/* webpackChunkName: "home" */ '../views/home.vue')
            },
            {
                path: '/signin',
                component: () =>
                    import(
                        /* webpackChunkName: "signin" */ '../views/signin.vue'
                    ).then((m) => m.default)
            }
        ]
    });
};

export function useRouter() {
    const vm = getCurrentInstance();
    if (!vm) {
        throw new Error('Please use in setup');
    }

    return vm.proxy.$router;
}
