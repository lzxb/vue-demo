<template>
    <div>
        <CommonHeader title="登录" />
        <form @submit.prevent>
            <input v-model="name" placeholder="请输入你的昵称" />
            <button @click="submit">登录</button>
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
        this.user.signin(this.name);
    }
}
export default defineComponent({
    metaInfo() {
        return {
            title: `登录`
        };
    },
    ...Login.inject()
});
</script>
<script lang="ts" setup></script>
