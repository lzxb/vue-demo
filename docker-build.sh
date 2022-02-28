#! /bin/sh

# 删除构建产物
rm -rf node_modules dist types
# 安装全部的依赖
npm install
# 执行构建程序
npm run build
# 删除开发依赖
rm -rf node_modules
# 只安装生产依赖，可以使镜像最小化
npm install --production


buildTime=`date "+%Y-%m-%d-%H-%M"`
# 这里可以修改成你的私有镜像仓库地址
image="vue2-demo:$buildTime"
# 编译镜像
docker build -t $image .
# 推送镜像，这里作为演示，就不推送镜像了
# docker push $image

echo "本地运行镜像：docker run -t -p 3000:3000 $image"