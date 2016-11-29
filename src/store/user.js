import Vue from 'vue'

export const SIGNIN = 'USER_SIGNIN' //登录成功
export const SIGNOUT = 'USER_SIGNOUT' //退出登录

export default {
    state: JSON.parse(sessionStorage.getItem('user')) || {},
    mutations: {
        [SIGNIN](state, user) {
            sessionStorage.setItem('user', JSON.stringify(user))
            Object.assign(state, user)
        },
        [SIGNOUT](state) {
            sessionStorage.removeItem('user')
            Object.keys(state).forEach(k => Vue.delete(state, k))
        }
    },
    actions: {
        [SIGNIN]({commit}, user) {
            commit(SIGNIN, user)
        },
        [SIGNOUT]({commit}) {
            commit(SIGNOUT)
        }
    }
}