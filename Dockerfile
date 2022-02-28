# 构建项目镜像
FROM node:16.14-alpine

# 创建目录
RUN mkdir /app

# 设置工作的目录
WORKDIR /app

# 复制编译好的文件
COPY ./dist /app/dist
COPY ./node_modules /app/node_modules
COPY ./package.json /app/package.json

# 设置docker程序启动时执行的命令
CMD ["npm", "start"]