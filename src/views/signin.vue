<template>
    <div>
        <CommonHeader title="登录" />
        <form @submit.prevent>
            <input v-model="login.name" placeholder="请输入你的昵称" />
            <button @click="login.submit()">登录</button>
        </form>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Setup } from 'vue-class-setup';

import CommonHeader from '../components/common-header.vue';
import { Base, User } from '../setup';

/**
 * 编写一个登录的类
 */
@Setup
class Login extends Base {
    public user = new User();
    public name = '';
    public async submit() {
        if (!this.name) {
            return alert('请输入昵称');
        }
        const res = await this.request.post('/api/signin', { name: this.name });
        if (res.success) {
            this.user.signin(this.name);
            this.router.back();
            return;
        }
        alert('登录失败');
    }
}
export default defineComponent({
    metaInfo() {
        return {
            title: `登录`
        };
    }
});
</script>
<script lang="ts" setup>
const login = new Login();
</script>
