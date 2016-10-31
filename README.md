## 源码说明
### 项目目录说明
<pre>
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
</pre>

### 页面说明
```
/login                                // 登录，不需要登录可以访问
/signout                              // 退出登录，需要登录后才可以访问
/home                                 // 个人中心，需要登录后才可以访问
/                                     // 首页，不需要登录可以访问
*                                     // 强制跳转到登录页面
```


## 开发教程


### 1.安装开发环境
**vs code** https://code.visualstudio.com 
```
开发时所用的编辑器，内置了终端，开发时使它执行命令运行程序
```
**Node.js** https://nodejs.org 
```
JS服务器端的运行环境，内置npm包管理器，管理项目依赖的各种模块，编译代码，自动部署到服务器就全靠他了
```

### 2.安装全局模块
**webpack** 
```
npm install -g webpack
```
webpack是一款模块加载器兼打包工具，它能把各种资源，例如JS（含JSX）、coffee、样式（含less/sass）、图片等都作为模块来使用和处理


**gulp**
```
npm install -g gulp
```
 gulp是一个自动化构建工具,开发者可以使用它在项目开发过程中自动执行常见任务

### 3.创建项目目录 test-demo 


### 4.安装开发环境依赖模块 npm install --save-dev 模块名
**webpack相关模块**
```
webpack                               // 用来构建打包程序
webpack-dev-server                    // 开发环境下，设置代理服务器
html-webpack-plugin                   // html 文件编译
url-loader                            // 图片  转化成base64格式
file-loader                           // 字体 将字体文件打包
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

**gulp相关模块**
```
gulp                                  // 用来构建自动化工作流
gulp-sftp                             // 将代码自动部署到服务器上
del                                   // 代码部署成功后，删除本地编译的代码
```
**其他模块**
```
cross-env                             // 解决跨平台设置NODE_ENV的问题
```
### 5.安装生产环境依赖模块 npm install --save 模块名
**vue全家桶**
```
vue                                   // 构建用户界面的 渐进式框架
vue-router                            // 路由
vuex                                  // 组件状态管理
```

### 5.搭建开发环境
[package.json](package.json)          // 执行npm init 初始化项目，自定义命令，启动程序，自动部署
[config/index.js](config/index.js)                       // 配置项目开发时的信息
[webpack.config.js](webpack.config.js)                   // webpack打包配置
[.babelrc](.babelrc)                             // ES6编译配置
[server.js](server.js)                             // 设置代理服务器
[gulpfile.js](gulpfile.js)                           // 自动化打包，编译，压缩，部署服务器

### 6.测试编译
**src/template/index.html**
```html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>vue2-demo</title>
</head>

<body>
</body>

</html>
```
**src/main.js**
```javascript
alert('test')
```
```
1.运行程序执行命令：npm run dev
2.然后打开网址：http://localhost:3000/admin/app/
3.如果浏览器弹出test，说明我们的开发环境已经搭建通过。
```
**package.json自定义命令说明**
```
npm run dev      开发环境
npm run dev:test 将代码打包到测试服务器
npm run dev:dist 将代码打包到正式服务器
```

