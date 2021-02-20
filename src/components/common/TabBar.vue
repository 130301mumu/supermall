<!-- 文件作用：只管理导航栏中子组件间的布局和样式 -->
<template>
<div id="tab-bar-div">
    <div id="tab-bar">

        <tab-bar-item path="/home" isStyle="deeppink" >
            <template  v-slot:item-img1 >
                <img src="~assets/img/index.png" alt="">
            </template>
<template v-slot:item-img2>
                <img  src="~assets/img/index2.png" alt="">
            </template>
<template v-slot:item-text>
                <div>首页</div>
            </template>
</tab-bar-item>

<tab-bar-item path="/category" isStyle="deeppink">
    <template v-slot:item-img1>
                <img src="~assets/img/category.png" alt="">
            </template>
    <template v-slot:item-img2>
                <img src="~assets/img/category2.png" alt="">
           </template>
    <template v-slot:item-text>
                <div>分类</div>
            </template>
</tab-bar-item>

<tab-bar-item path="/cart" isStyle="deeppink">
    <template v-slot:item-img1>
                <img src="~assets/img/cart.png" alt="">
            </template>
    <template v-slot:item-img2>
                <img src="~assets/img/cart2.png" alt="">
            </template>
    <template v-slot:item-text>
                <div>购物车</div>
            </template>
</tab-bar-item>

<tab-bar-item path="/profile" isStyle="deeppink">
    <template v-slot:item-img1>
                <img  src="~assets/img/about.png" alt="">
            </template>
    <template v-slot:item-img2>
                <img  src="~assets/img/about2.png" alt="">
            </template>
    <template v-slot:item-text>
                <div>我的</div>
            </template>
</tab-bar-item>

</div>
</div>
</template>


<script>
    import tabBarItem from "components/content/TabBarItem.vue" //（1）导入子组件,然后在导出的实例中挂载

    export default {
        name: "tabbar",
        components: {
            tabBarItem
        }
    }
</script>

<style scoped>
    /* 管理子组件间的布局： */
    
    #tab-bar-div #tab-bar {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        box-shadow: 0 -2px 1px rgba(0, 0, 0, .1);
        background-color: #f6f6f6;
        height: 49px;
    }
</style>