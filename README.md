## 前言
这个项目最开始建立的是2016年的时候，如今已经过去了4年多，时光匆匆，如今 TS 已经流行起来，并且自己已经在 SSR 方面实践颇多，所以就花了半天的时间使用 [Genesis](https://github.com/fmfe/genesis) 写了一个完整的 Vue SSR 的demo。

## 快速开发
```bash
# 开发环境启动
npm run dev
# 打包生产环境代码
npm run build
# 生产环境运行
npm run start
```

## docker
只需要执行 `yarn build` 命令后，将 `dist`、`node_modules`、目录和 `package.json` 文件 复制到镜像内即可，然后执行 `yarn start` 命令启动程序即可


## 技术栈
- Vue 
- Genesis 
- vue-router
- vuex
- axios
- vue-meta
- TS

## 功能点
- 实现登录、退出、微博列表
- 使用 vue-meta 管理页面 SEO 的信息
- 使用 TS 封装了 axios 的请求类，涉及到服务端请求的 header 转发
- 编写了 Vue 的基类，使得 Vue、Vuex 和 TS 的配合更好
- 完整的展示了开发 Vue SSR 项目所需要注意的知识点
- 基于 Genesis 开发的完整功能的 demo
- 演示了如何在服务端预取数据，在客户端还原服务端状态
- 演示了如何编译 SSR 和 TS 生产环境的代码

## 目录说明
```bash
.
├── dist                  yarn build 编译后的源码目录
├── mock                  模拟接口
│   └── mock.ts           实现登录、退出、微博列表的 mock api
├── src                   源码目录
│   ├── components        公共组件
│   |   └── v-header.vue  封装一个头部的组件
|   ├── request           请求处理目录
|   |   └── index.ts      封装 axios 请求类的实现
|   ├── router            路由管理目录
|   |   └── index.ts      提供创建路由的方法
|   ├── store             状态管理目录
|   |   └── index.ts      程序全局状态的实现
|   ├── utils             封装工具函数目录
|   |   └── index.ts      工具函数的封装
|   ├── views             页面目录
|   |   ├── home.vue      网站首页
|   |   └── signin.vue    登录页面
|   ├── app.vue           应用的公共组件
|   ├── base-vue.ts       对 Vue 封装一封，包装 vuex、request
|   ├── entry-client.ts   客户端入口文件
|   ├── entry-server.ts   服务端入口文件
|   └── shims-vue.d.ts    Vue 文件的 TS 声明
├── .editorconfig         编辑器配置
├── .eslintignore         eslint 的忽略配置
├── .eslintrc.js          eslint 的配置
├── .gitignore            git 的忽略文件
├── .stylelintignore      stylelint 的忽略文件
├── build.sh              编译生产环境代码到 dist 目录，yarn start 执行
├── genesis.build.ts      Genesis 构建生产环境代码
├── genesis.dev.ts        dev 环境开发入口
├── genesis.prod.ts       生产环境开发入口
├── genesis.ts            dev 和 生产环境，通用逻辑封装
├── index.html            SSR 渲染的基本 html 模板
├── package.json          包管理配置
├── README.md             项目说明文档
├── stylelint.config.js   stylelint 的配置文件
├── tsconfig.json         TS 的配置文件
└── yarn.lock             yarn 的依赖版本锁
```

## Genesis
Genesis 是一个 Vue 的 SSR 库，它提供了 SSR 最基础的能力，在它的基础上，你可以实现微前端、微服务的架构，如果你想深入的了解他，请查看它的[官方文档](https://fmfe.github.io/genesis-docs/#%E5%B8%B8%E7%94%A8%E9%93%BE%E6%8E%A5)