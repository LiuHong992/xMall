import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: Home,
        children: [{
            path: '',
            name: 'index',
            meta: {
                title: '首页'
            },
            component: () =>
                import ('../views/Index.vue')
        }]

    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: {
            title: '注册'
        },
        component: () =>
            import ('../views/Register.vue')
    },
    {
        path: '/carts',
        component: Home,
        children: [{
            path: '',
            name: 'carts',
            meta: {
                title: '购物车'
            },
            component: () =>
                import ('../views/Carts.vue')
        }]
    },
    {
        path: '/payment',
        component: Home,
        children: [{
            path: '',
            name: 'payment',
            meta: {
                title: '订单结算'
            },
            component: () =>
                import ('../views/Payment.vue')
        }]
    },
    {
        path: '/order',
        component: Home,
        children: [{
            path: '',
            name: 'order',
            meta: {
                title: '我的订单'
            },
            component: () =>
                import ('../views/Order.vue')
        }]
    },
    {
        path: '/details',
        component: Home,
        children: [{
            path: '',
            name: 'details',
            meta: {
                title: '商品详情'
            },
            component: () =>
                import ('../views/Details.vue')
        }]
    },
    {
        path: '/goods',
        component: Home,
        children: [{
            path: '',
            name: 'goods',
            meta: {
                title: '全部商品'
            },
            component: () =>
                import ('../views/Goods.vue')
        }]
    },
    {
        path: '*',
        meta: {
            title: '404 Not Found'
        },
        component: () =>
            import ('../views/Error.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router