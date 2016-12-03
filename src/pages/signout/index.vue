<style lang="less" scoped>
	.btn {
		padding: 50px;
		text-align: center;
		button {
			padding: 5px 10px;
		}
	}
</style>
<template>
	<div>
		<v-header title="退出">
			<router-link slot="left" to="/home">返回</router-link>
		</v-header>
		<div class="btn">
			<button v-on:click="submit">确认退出</button>
		</div>
	</div>
</template>
<script>
    import { mapActions } from 'vuex'
    import { USER_SIGNOUT } from 'store/user'
    export default {
        methods: {
            ...mapActions([USER_SIGNOUT]),
            submit() {
                this.USER_SIGNOUT()
				this.$router.replace({ path: '/login' })
            }
        }
    }
</script>