<template>
    <div class="app">
        <router-view />
    </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'app',
    metaInfo() {
        return {
            meta: [
                {
                    charset: 'utf-8'
                }
            ]
        };
    },
    data() {
        return {
            installed: false,
            show: true
        };
    },
    mounted() {
        this.installed = true;
    },
    methods: {
        close() {
            this.show = false;
        }
    }
});
</script>
<style lang="less" scoped>
.app {
    max-width: 750px;
    margin: 0 auto;
}
</style>
