<style lang="less" scoped>

</style>
<template>
	<div>
		<v-header title="首页">
			<router-link slot="left" to="/">首页</router-link>
			<router-link slot="right" to="/signout">退出</router-link>
		</v-header>
		<div style="padding: 50px;">{{user.name}}欢迎回家</div>
	</div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        computed: mapState({ user: state => state.user }),
    }
</script>