<template>
    <div>
        <VHeader title="首页" />
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator';
import VHeader from '../components/v-header.vue';

@Component<Home>({
    components: {
        VHeader
    },
    metaInfo () {
        return {
            title: '首页'
        }
    }
})
export default class Home extends Vue {
}
</script>