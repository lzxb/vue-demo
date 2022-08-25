<template>
    <div class="app">
        <router-view />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
<style lang="less" scoped>
.app {
    max-width: 750px;
    margin: 0 auto;
}
</style>
