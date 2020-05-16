<template>
    <div>
        <VHeader title="登录" />
        <form @submit.prevent>
        <input v-model="name" placeholder="请输入你的昵称" /> <button @click="submit">登录</button>
        </form>
    </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import VHeader from '../components/v-header.vue';
import { BaseVue } from '../base-vue';

@Component<Signin>({
    components: {
        VHeader
    },
    metaInfo () {
        return {
            title: '登录'
        }
    }
})
export default class Signin extends BaseVue {
    public name = '';
    public async submit () {
        if (!this.name) {
            return alert('请输入昵称');
        }
        const res = await this.request.post('/api/signin', { name: this.name });
        if (res.success) {
            this.signin(this.name);
            this.$router.back();
            return;
        }
        alert('登录失败');
    }
}
</script>