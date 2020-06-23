#! /bin/sh
rm -rf node_modules
yarn install --registry=https://registry.npm.taobao.org
npm run build:ts
cp index.html ./dist/node
# 使用 JS 编译，会出现路径的问题，因为 TS 编译成 JS 后，文件的相对路径变了
# NODE_ENV=production node dist/node/genesis.build.js
NODE_ENV=production ts-node genesis.build.ts
rm -rf node_modules
yarn --prod --registry=https://registry.npm.taobao.org
