**强烈推荐**：[vuet是一个跨页面、跨组件的状态管理插件](https://github.com/medevicex/vuet)

## 前言
```
国庆在回家的路上，得知了vue2发布了正式版，
国庆回来后，在公司内两个项目便直接应用上了vue2，
一个是PC端的商户后台，一个是微信端商城，
都是基于Vue2、vue-router、vuex ......
在开发的过程中，遇到了一系列的问题，
比如页面后退数据还原，滚动条还原，
登录超时，获取列表数据，表单提交，
多台服务器自动化部署，最终后一个个解决了，
能够平稳的从react切换到vue2开发，vue的文档功不可没。
```
github:[https://github.com/lzxb/vue2-demo](https://github.com/lzxb/vue2-demo)

## 源码说明
### 项目目录说明
```
.
|-- config                           // 项目开发环境配置
|   |-- index.js                     // 项目打包部署配置
|-- src                              // 源码目录
|   |-- components                   // 公共组件
|       |-- header.vue               // 页面头部公共组件
|       |-- index.js                 // 加载各种公共组件
|   |-- config                       // 路由配置和程序的基本信息配置
|       |-- routes.js                // 配置页面路由
|   |-- css                          // 各种css文件
|       |-- common.css               // 全局通用css文件
|   |-- iconfont                     // 各种字体图标
|   |-- images                       // 公共图片
|   |-- less                         // 各种less文件
|       |-- common.less              // 全局通用less文件
|   |-- pages                        // 页面组件
|       |-- home                     // 个人中心
|       |-- index                    // 网站首页
|       |-- login                    // 登录
|       |-- signout                  // 退出
|   |-- store                        // vuex的状态管理
|       |-- index.js                 // 加载各种store模块
|       |-- user.js                  // 用户store
|   |-- template                     // 各种html文件
|       |-- index.html               // 程序入口html文件
|   |-- util                         // 公共的js方法，vue的mixin混合
|   |-- app.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- .babelrc                         // ES6语法编译配置
|-- gulpfile.js                      // 启动，打包，部署，自动化构建
|-- webpack.config.js                // 程序打包配置
|-- server.js                        // 代理服务器配置
|-- README.md                        // 项目说明
|-- package.json                     // 配置项目相关信息，通过执行 npm init 命令创建
.
```

### 开发环境依赖模块说明
#### webpack相关模块
```
webpack                               // 用来构建打包程序
webpack-dev-server                    // 开发环境下，设置代理服务器
html-webpack-plugin                   // html 文件编译
url-loader                            // 图片  转化成base64格式
file-loader                           // 字体  将字体文件打包
css-loader                            // css  生成
less                                  // css  预处理器less
less-loader                           // css  预处理器less的webpack插件
style-loader                          // css  插入到style标签
autoprefixer-loader                   // css  浏览器兼容性问题处理
babel-core                            // ES6  代码转换器
babel-loader                          // ES6  代码转换器，webpack插件
babel-plugin-transform-object-assign  // ES6  Object.assign方法做兼容处理
babel-preset-es2015                   // ES6  代码编译成现在浏览器支持的ES5
babel-preset-stage-0                  // ES6  ES7要使用的语法阶段
vue-loader                            // vue  组件编译
babel-helper-vue-jsx-merge-props      // vue  jsx语法编译
babel-plugin-syntax-jsx               // vue  jsx语法编译
babel-plugin-transform-vue-jsx        // vue  jsx语法编译
```

#### gulp相关模块
```
gulp                                  // 用来构建自动化工作流
gulp-sftp                             // 将代码自动部署到服务器上
del                                   // 代码部署成功后，删除本地编译的代码
```
#### 其他模块
```
cross-env                             // 解决跨平台设置NODE_ENV的问题
```
### 生产模块依赖说明
#### vue全家桶
```
vue                                   // 构建用户界面的
vue-router                            // 路由
vuex                                  // 组件状态管理
```

### 页面说明
```
/login                                // 登录，不需要登录可以访问
/signout                              // 退出登录，需要登录后才可以访问
/home                                 // 个人中心，需要登录后才可以访问
/                                     // 首页，不需要登录可以访问
*                                     // 强制跳转到登录页面
```

### 运行程序 
```
npm install
npm run dev
http://localhost:3000/app/
```

## 开发教程
[1.开发环境搭建](https://github.com/lzxb/vue2-demo/blob/master/docs/1.md)  
[2.实现登录退出](https://github.com/lzxb/vue2-demo/blob/master/docs/2.md)
