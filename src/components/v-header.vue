<template>
    <header class="header">
        <h2 v-if="title" class="title">{{ title }}</h2>
    </header>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component<VHeader>({})
export default class VHeader extends Vue {
    @Prop({
        type: String,
        default: ''
    })
    public title!: string;
}
</script>
<style lang="less" scoped>
.header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
}
.title {
    margin: 0;
    font-size: 18px;
    text-align: center;
}
</style>
