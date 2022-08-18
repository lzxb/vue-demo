import { Define, Setup } from 'vue-class-setup';

import { useRequest } from '../request';
import { useRouter } from '../router';
import { useStore } from '../store';

/**
 * 编写一个基本类，在封装其它业务的时候继承它来使用
 */
@Setup
export class Base extends Define {
    protected store = useStore();
    protected request = useRequest();
    protected router = useRouter();
    public constructor() {
        super();
        Object.defineProperty(this, 'store', {
            enumerable: false
        });
        Object.defineProperty(this, 'request', {
            enumerable: false
        });
        Object.defineProperty(this, 'router', {
            enumerable: false
        });
    }
}

/**
 * 封装一个微博类
 */
@Setup
export class BlogList extends Base {
    public get state() {
        return this.store.state;
    }
    public get data() {
        return this.store.state.blogList;
    }
    /**
     * 登录用户
     */
    public signin(name: string) {
        this.store.commit('signin', name);
    }
    /**
     * 退出登录
     */
    public signout() {
        this.store.commit('signin', '');
    }
    /**
     * 获取微博列表数据
     */
    public async getBlogList() {
        const res = await this.request.get('/api/blog/list');
        if (res.success) {
            this.store.commit('getBlogList', res.data.list);
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

/**
 * 封装一个用户类
 */
@Setup
export class User extends Base {
    protected get state() {
        return this.store.state;
    }
    public get data() {
        return this.store.state.user;
    }
    public get isLogin() {
        return !!this.data.name;
    }
    /**
     * 登录用户
     */
    public async signin(name: string) {
        if (!name) {
            return alert('请输入昵称');
        }
        const res = await this.request.post('/api/signin', { name });
        if (res.success) {
            this.store.commit('signin', name);
            this.router.back();
            return;
        }
        alert('登录失败');
    }
    /**
     * 退出登录
     */
    public async signout() {
        const res = await this.request.post('/api/signout');
        if (res.success) {
            this.store.commit('signin', '');
            return;
        }
        alert('退出失败');
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
