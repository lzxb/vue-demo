<template>
    <header class="header">
        <h2 v-if="title" class="title">{{ title }}</h2>
    </header>
</template>
<script lang="ts"></script>
<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        default: ''
    }
});
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
