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
<pre>
.
|-- config.js              // 开发的配置文件，设置代理服务器地址，自动部署到服务器的帐号配置等
|-- src                    // 源码目录
|   |-- components         // 公共组件
|   |-- config             // 路由配置和程序的基本信息配置
|   |-- css                // 公共css文件
|   |-- iconfont           // 公共字体图标
|   |-- images             // 公共图片
|   |-- less               // 公共less文件
|   |-- pages              // 页面组件
|   |-- store              // vuex的状态管理
|   |-- template           // 入口html模板
|   |-- util               // 公共的js方法，vue的mixin混合
|   |-- main.js            // 程序入口文件，加载各种公共组件
|   |-- app.vue            // 页面入口文件
|-- .babelrc               // ES6语法编译配置
|-- gulpfile.js            // 启动，打包，部署，自动化构建
|-- webpack.config.js      // 程序打包配置
|-- server.js              // 代理服务器配置
|-- package.json           // 配置项目相关信息，通过执行 npm init 命令创建
|__
</pre>

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
### 6.构建自动化编译和部署
**.babelrc 配置ES6编译规则**
```json
{
    "presets": [
        "es2015",
        "stage-0"
    ],
    "plugins": [
        "transform-object-assign",
        "transform-vue-jsx"
    ]
}
```
**config/index.js 配置项目基本信息**
```javascript
module.exports = {
    devTest: { //部署到测试服务器上
        remotePath: '/app/', //部署到服务器的路径
        host: '111.11.111.111', //ip地址
        user: 'root', //帐号
        pass: '88888888', //密码
        port: 22 //端口
    },
    devDist: { //部署正式服务器上
        remotePath: '/app/', //部署到服务器的路径
        host: '111.11.111.111', //ip地址
        user: 'root', //帐号
        pass: '88888888', //密码
        port: 22 //端口
    },
    publicPath: '/app/', //程序在服务器的根路径地址
    target: 'https://cnodejs.org/' //连接的服务器地址
}
```
**webpack.config.js 文件打包配置**
```javascript
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config/')
const IS_ENV = process.env.NODE_ENV == 'production'


var plugins = []
if (IS_ENV) { //生产环境
    plugins.push(new webpack.DefinePlugin({ 
        'process.env': { //设置成生产环境
            NODE_ENV: 'production'
        }
    }))
    plugins.push(new webpack.optimize.UglifyJsPlugin({ //压缩代码
        compress: {
            warnings: false
        }
    }))
}

plugins.push(
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
        filename: './index.html', //生成的html存放路径，相对于 path
        template: './src/template/index.html', //html模板路径
    })
)


module.exports = {
    entry: ['./src/main.js'], //编译入口文件
    output: {
        publicPath: config.publicPath, //服务器的路径
        path: path.resolve(__dirname + config.publicPath), //编译到app目录
        filename: '[name].js' //编译后的文件名
    },
    module: {
        loaders: [
            {
                test: /\.js(x)*$/,
                exclude: /^node_modules$/,
                loader: 'babel'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.css/,
                exclude: /^node_modules$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.less/,
                exclude: /^node_modules$/,
                loader: `style-loader!css-loader!autoprefixer-loader?{
                    browsers: [
                        'ie >= 8',
                        'ie_mob >= 10',
                        'ff >= 26',
                        'chrome >= 30',
                        'safari >= 6',
                        'opera >= 23',
                        'ios >= 5',
                        'android >= 2.3',
                        'bb >= 10'
                    ]
                }!less-loader`
            },
            {
                test: /\.(png|jpg)$/,
                exclude: /^node_modules$/,
                loader: 'url?limit=2000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            },
            {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    plugins,
    resolve: {
        extensions: ['', '.js', '.vue', '.jsx'], //后缀名自动补全
        alias: {
            vue: 'vue/dist/vue.js' //webpack打包时，需要设置别名
        }
    },
}
```
**server.js 开发代理服务器配置**
```javascript
const Webpack = require("webpack")
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require("./webpack.config")
const config = require('./config/')

var compiler = Webpack(webpackConfig)
var server = new WebpackDevServer(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: require('supports-color') //显示不同的颜色区分打包的文件
    },
    proxy: { //代理服务器
        '*': {
            target: config.target
        }
    }
})
 
server.listen(3000, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('http://localhost:3000' + config.publicPath)
})
```
**gulpfile.js 自动化部署服务器配置**
```javascript
const gulp = require('gulp')
const path = require('path')
const config = require('./config/')
const isEnv = process.env.NODE_ENV == 'production'

/**
 * 清除生产目录文件
 */
const del = require('del')
gulp.task('clean', ['upload'], function (callback) {
    console.log('## 已经成功部署到服务器上')
    console.log('## 清除原来编译的代码')
    del(['.' + config.publicPath], callback)
})

/**
 * 编译代码
 */
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
gulp.task('build', function (callback) {
    console.log('## 代码编译开始')
    webpack(webpackConfig, function (err, state) {
        console.log('## 代码编译完成')
        callback(err)
    })
})

/**
 * 编译代码，自动部署到服务器
 */
const ftp = require('gulp-sftp')
gulp.task('upload', ['build'], function (callback) {
    console.log('## 正在部署到服务器上')
    var dev = isEnv ? config.devDist : config.devTest
    gulp.src('.' + config.publicPath + '**')
        .pipe(ftp(Object.assign(dev, {callback})))
})

/**
 * 上传到测试服务器上
 */
gulp.task('devTest', ['build', 'upload', 'clean'])

/**
 * 上传到生产服务器上
 */
gulp.task('devDist', ['build', 'upload', 'clean'])
```
**package.json 自动化部署服务器配置，将下面代码添加进去配置**
```json
{
    "scripts": {
        "dev": "node server",
        "dev:dist": "cross-env NODE_ENV=production gulp devDist",
        "dev:test": "gulp devTest"
    }
}
```

### 7.基本项目架构
```
/            // 首页，不需要登录可以访问
/login       // 登录，不需要登录可以访问
/signout     // 退出登录，需要登录后才可以访问
/home        // 个人中心，需要登录后才可以访问
```