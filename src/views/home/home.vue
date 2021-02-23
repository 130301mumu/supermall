<template>
<div id="Home">
    <!-- 导航栏 -->
<nav-bar id="HomeNav">
        <template v-slot:center>
            <div class="center">购物街</div>
        </template>
</nav-bar>
<!-- 首页内容： -->
<div class="content">
    <!-- 轮播图 -->
    <Home-swiper :banner="banner"></Home-swiper>
    <!--推荐栏-->
    <Recommend :recommend="recommend"></Recommend>
    <!-- 本周流行栏 -->
    <Feature-view></Feature-view>
    <Tab-control :title="title"></Tab-control>
    <ul>
        <li>列表1</li>
        <li>列表2</li>
        <li>列表3</li>
        <li>列表4</li>
        <li>列表5</li>
        <li>列表6</li>
        <li>列表7</li>
        <li>列表8</li>
        <li>列表9</li>
        <li>列表10</li>
        <li>列表11</li>
        <li>列表12</li>
        <li>列表13</li>
        <li>列表14</li>
        <li>列表15</li>
        <li>列表16</li>
        <li>列表17</li>
        <li>列表18</li>
        <li>列表19</li>
        <li>列表20</li>
    </ul>
</div>
</div>
</template>

<script>
    import navBar from "components/common/navbar/NavBar.vue" //导入导航栏
    import TabControl from "components/content/TabControl/TabControl.vue" //导入位置栏

    import HomeSwiper from "./child/HomeSwiperItem.vue" //导入轮播图栏
    import Recommend from "./child/HomeRecommend.vue" //导入推荐栏
    import FeatureView from './child/HomeFeature.vue' //导入流行栏

    import {
        getHomeMultidata
    } from "network/home.js" //导入网络请求

    export default {
        components: {
            //每一个导入的子组件都必须注册
            navBar,
            TabControl,
            HomeSwiper,
            Recommend,
            FeatureView
        },
        data() {
            return {
                title: ['流行', '新款', '精选'],
                banner: [],
                recommend: []
            }
        },
        methods: {},
        //在实质开发中，每个组件中都有不同的网络请求，这些网络请求在 .vue中 实现并返回数据给组件处理：
        //1.多个数据请求
        created() {
            getHomeMultidata().then(res => {
                console.log(res);
                //1.2 把请求到的数据赋值给 组件的属性data
                this.banner = res.data.data.banner.list;
                this.recommend = res.data.data.recommend.list;
            }).catch((err) => {
                console.log(err, "请求失败啦");
            })
        }
    }
</script>

<style scoped>
    #Home {
        position: absolute;
        top: 45px;
    }
    
    #HomeNav {
        display: flex;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
        background-color: rgb(253, 112, 154);
        box-shadow: 0 1px 1px rgba(0, 0, 0, .5);
    }
    
    #HomeNav .center {
        color: #fff;
    }
</style>