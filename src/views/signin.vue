<template>
    <div>登录</div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component<Signin>({
    metaInfo () {
        return {
            title: '登录'
        }
    }
})
export default class Signin extends Vue {}
</script>