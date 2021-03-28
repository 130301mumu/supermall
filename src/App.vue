<template>
    <div id="app">
        <!-- tab-bar 是TabBar.vue 的插槽 slot的占位 -->
        <!-- /* 包裹路由, 缓存页面 */ -->
            <router-view v-slot="{ Component }">
                <keep-alive exclude="detail">
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        <tab-bar></tab-bar>
    </div>
</template>

<script>
    import tabBar from "./components/common/tabbar/TabBar.vue"; //（1）导入父组件,父插槽
    import tabBarItem from "./components/content/TabBarItem/TabBarItem.vue" //（1）导入子组件
    // import router from "./router"

    export default {
        name: 'App',
        components: {
            tabBar,
            tabBarItem,
        }
    }
</script>

<style>
    @import "assets/css/base.css";
</style>