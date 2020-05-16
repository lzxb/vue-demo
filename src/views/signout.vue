<template>
    <div>退出</div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';

@Component<Signin>({
    metaInfo () {
        return {
            title: '退出'
        }
    }
})
export default class Signin extends Vue {}
</script>