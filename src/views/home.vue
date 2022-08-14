<template>
    <div>
        <CommonHeader title="首页" />
        <p v-if="!home.isLogin">
            <router-link to="/signin">登录</router-link>后发表你的微博
        </p>
        <div v-else>
            <input v-model="home.blog" />
            <button @click="home.post()">发表微博</button>
            <button @click="home.user.signout()">退出登录</button>
        </div>
        <ul>
            <li v-for="item in home.blogList.data" :key="item.id">
                {{ formatDate(item.createTime) }} {{ item.author }} 发表了
                {{ item.content }}
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { defineComponent, onServerPrefetch } from 'vue';
import { PassOnTo, Setup } from 'vue-class-setup';

import CommonHeader from '../components/common-header.vue';
import { Base, BlogList, User } from '../setup';
import { formatDate } from '../utils/index';

@Setup
class Home extends Base {
    public user: User;
    public blogList = new BlogList();
    public blog = '';
    public constructor() {
        super();
        this.user = new User();
    }
    /**
     * 发表微博
     */
    public async post() {
        const ok = await this.blogList.postBlog(this.blog);
        if (ok) {
            this.blog = '';
        }
    }
    public get isLogin() {
        return this.user.isLogin;
    }
    @PassOnTo(onServerPrefetch)
    public async getData() {
        await Promise.all([
            this.user.getCurrentUser(),
            this.blogList.getBlogList()
        ]);
    }
}

export default defineComponent({
    metaInfo() {
        const home: Home = this.home;
        return {
            title: `首页-${home.blogList.data.length}`
        };
    }
});
</script>
<script lang="ts" setup>
const home = new Home();
defineExpose({ home });
</script>
