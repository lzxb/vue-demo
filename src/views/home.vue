<template>
    <div>
        <VHeader title="首页" />
        <p v-if="!isLogin">
            <router-link to="/signin">登录</router-link>后发表你的微博
        </p>
        <div v-else>
            <input v-model="blog" />
            <button @click="post">发表</button>
            <button @click="signout">退出登录</button>
        </div>
        <ul>
            <li v-for="item in blogList" :key="item.id">
                {{ formatDate(item.createTime) }} {{ item.author }} 发表了
                {{ item.content }}
            </li>
        </ul>
    </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import VHeader from '../components/v-header.vue';
import { BaseVue } from '../base-vue';
import { formatDate } from '../utils/utils';

@Component<Home>({
    components: {
        VHeader
    },

    metaInfo() {
        return {
            title: '首页'
        };
    }
})
export default class Home extends BaseVue {
    public blog = '';
    public formatDate = formatDate;
    public get isLogin() {
        return !!this.state.user.name;
    }
    public get blogList() {
        return this.state.blogList;
    }
    /**
     * 发表微博
     */
    public async post() {
        const ok = await this.postBlog(this.blog);
        if (ok) {
            this.blog = '';
        }
    }
    public async signout() {
        const res = await this.request.post('/api/signout');
        if (res.success) {
            super.signout();
            return;
        }
        alert('退出失败');
    }
    /**
     * 在服务器端，获取微博列表数据
     */
    public serverPrefetch() {
        return Promise.all([this.getCurrentUser(), this.getBlogList()]);
    }
}
</script>
