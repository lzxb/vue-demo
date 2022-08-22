<template>
    <header class="header">
        <h2 v-if="title" class="title">{{ title }}</h2>
    </header>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Define, Setup } from 'vue-class-setup';

@Setup
class App extends Define<Props> {
    /**
     * 设置默认的 props title
     */
    public readonly title = '';
}

export default defineComponent({
    ...App.inject()
});
</script>
<script lang="ts" setup>
export interface Props {
    title?: string;
}
defineProps<Props>();
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
