import Vue from 'vue';
import { State } from './store';

export class BaseVue extends Vue {
    /**
     * 获取 store 状态
     */
    public get state() {
        return this.$store.state as State;
    }
    /**
     * 获取请求对象
     */
    public get request() {
        return this.$root.$options.request!;
    }
    /**
     * 登录用户
     */
    public signin(name: string) {
        this.$store.commit('signin', name);
    }
    /**
     * 退出登录
     */
    public signout() {
        this.$store.commit('signin', '');
    }
    /**
     * 获取微博列表数据
     */
    public async getBlogList() {
        const res = await this.request.get('/api/blog/list');
        if (res.success) {
            this.$store.commit('getBlogList', res.data.list);
        }
    }
    /**
     * 发表微博
     */
    public async postBlog(content: string) {
        const res = await this.request.post('/api/blog', {
            author: this.state.user.name,
            content
        });
        if (res.success) {
            this.getBlogList(); // 发表成功后，重新获取微博数据
            return true;
        }
        alert('发表失败');
        return false;
    }
    /**
     * 获取当前用户登录信息
     */
    public async getCurrentUser() {
        const res = await this.request.get('/api/current-user');
        if (res.success) {
            return this.signin(res.data.name);
        }
    }
}
