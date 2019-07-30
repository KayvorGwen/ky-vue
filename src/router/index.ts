import Vue from 'vue';
import _ from 'lodash';
import Router from 'vue-router';

const login = () => import('../views/login/login.vue');
const register = () => import('../views/register/register.vue');
const home = () => import('../views/home/home.vue');

Vue.use(Router);

const routes: any[] = [
    {
        path: '/',
        name: 'login',
        component: login,
        meta: {
            title: '登录',
            tips: 'demo',
        },
    },
    {
        path: '/register',
        name: 'register',
        component: register,
        meta: {
          title: '注册',
          tips: 'demo',
        },
    },
    {
        path: '/home',
        name: 'home',
        component: home,
        meta: {
          title: '首页',
          tips: 'demo',
        },
    },
];

routes.forEach((route: any) => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});

export {
  router,
};

