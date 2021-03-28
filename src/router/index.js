// 配置路由相关的信息
// （2）导入路由插件,Vue-router4. 用法
import {
    createRouter,
    createWebHistory
} from 'vue-router'

// （3）懒加载方式导入组件（提高代码效率）
const home = () =>
    import ("../views/home/Home")
const category = () =>
    import ("../views/category/Category")
const cart = () =>
    import ("../views/cart/Cart")
const profile = () =>
    import ("../views/profile/Profile")
const detail = () =>
    import ("../views/detail/Detail")


const routes = [{
        path: "",
        redirect: "/home"
    }, {
        name: "home",
        path: "/home",
        component: home
    },
    {
        path: "/category",
        component: category
    },
    {
        path: "/cart",
        component: cart
    }, {
        path: "/profile",
        component: profile
    }, {
        path: "/detail/:iid", //绑定动态路由；:iid现在相当于一个变量
        // iid的作用：给数据请求  的 params赋值
        component: detail
    }
]
const router = new createRouter({
    history: createWebHistory(), //===>mode:"history"
    routes,
})
export default router;