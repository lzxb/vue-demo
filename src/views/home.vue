<template>
    <div>
        <CommonHeader title="首页" />
        <p v-if="!isLogin">
            <router-link to="/signin">登录</router-link>后发表你的微博
        </p>
        <div v-else>
            <input v-model="blog" />
            <button @click="post">发表微博</button>
            <button @click="user.signout()">退出登录</button>
        </div>
        <ul>
            <li v-for="item in list" :key="item.id">
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
    public get list() {
        return this.blogList.data;
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
    metaInfo(this: Home) {
        return {
            title: `首页-${this.blogList.data.length}`
        };
    },
    ...Home.inject()
});
</script>
<script lang="ts" setup></script>
