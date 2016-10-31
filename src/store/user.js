import Vue from 'vue'

export default {
    state: JSON.parse(sessionStorage.getItem('user')) || {},
    mutations: {
        /**
         * 登录成功
         * 
         * @param {Object} state
         * @param {Object} user
         */
        SIGNIN(state, user) {
            sessionStorage.setItem('user', JSON.stringify(user))
            Object.assign(state, user)
        },
        /**
         * 退出登录
         * 
         * @param {Object} state
         */
        SIGNOUT(state) {
            sessionStorage.removeItem('user')
            Object.keys(state).forEach(k => Vue.delete(state, k))
        }
    },
    actions: {
        SIGNIN({commit}, user) {
            commit('SIGNIN', user)
        },
        SIGNOUT({commit}) {
            commit('SIGNOUT')
        }
    }
}