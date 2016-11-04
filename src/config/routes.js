import App from '../app'

export default [
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/login',
                meta: { auth: false },
                component: resolve => require(['../pages/login/'], resolve)
            },
            {
                path: '/signout',
                component: resolve => require(['../pages/signout/'], resolve)
            },
            {
                path: '/home',
                component: resolve => require(['../pages/home/'], resolve)
            },
            {
                path: '/',
                meta: { auth: false },
                component: resolve => require(['../pages/index/'], resolve)
            },
            {
                path: '*',
                redirect: '/login'
            }
        ]
    }
]