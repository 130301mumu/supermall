<template>
<div id="Home">
    <!-- 导航栏 -->
<nav-bar id="HomeNav">
        <template v-slot:center>
            <div class="center">购物街</div>
        </template>
</nav-bar>
<!-- 首页内容： -->
<Better-scroll class="content" ref="Bscroll" @scrollPosition="scrollPosition" @pullingUp="pullLoadMore" :pull-up-load="true">
    <!-- 轮播图 -->
    <Home-swiper :banner="banner"></Home-swiper>
    <!--推荐栏-->
    <Recommend :recommend="recommend"></Recommend>
    <!-- 本周流行栏 -->
    <Feature-view></Feature-view>
    <!-- 选择位置栏 -->
    <Tab-control class="Tab-control" :title="title" @switchClick="switchClick"></Tab-control>
    <!-- 商品布局 -->
    <Goods-list :GoodsList="goods[currentType].list"></Goods-list>
    <!-- 更多数据 -->
</Better-scroll>
<Back-top class="backTop" @click="backClick" v-show="isShowBack"></Back-top>
</div>
</template>

<script>
    import navBar from "components/common/navbar/NavBar.vue" //导入导航栏
    import TabControl from "components/content/TabControl/TabControl.vue" //导入位置栏
    import GoodsList from "components/content/Goods/GoodsList.vue" //导入商品展示

    import HomeSwiper from "./child/HomeSwiperItem.vue" //导入轮播图栏
    import Recommend from "./child/HomeRecommend.vue" //导入推荐栏
    import FeatureView from './child/HomeFeature.vue' //导入流行栏
    import BetterScroll from 'components/common/scroll/Scroll.vue' //导入滚动插件
    import BackTop from "components/content/backTop/BackTop.vue" //导入返回顶部组件
    // import BScroll from 'better-scroll'


    import {
        getHomeMultidata,
        getHomeGoods
    } from "network/home.js" //导入网络请求

    export default {
        components: {
            //每一个导入的子组件都必须注册
            navBar,
            TabControl,
            GoodsList,
            HomeSwiper,
            Recommend,
            FeatureView,
            BetterScroll,
            // BScroll
            BackTop,
        },
        data() {
            return {
                scroll: null,
                isShowBack: false,
                title: ['流行', '新款', '精选'], //位置栏
                banner: [], //轮播图数据
                recommend: [], //推荐栏数据
                goods: { //商品信息数据
                    "pop": {
                        page: 0,
                        list: []
                    },
                    "new": {
                        page: 0,
                        list: []
                    },
                    "sell": {
                        page: 0,
                        list: []
                    }
                },
                currentType: "pop"
            }
        },
        //在实质开发中，每个组件中都有不同的网络请求，这些网络请求在 .vue中 实现并返回数据给组件处理：
        created() {
            //1.多个数据请求
            this.getHomeMultidata();
            //2.商品数据请求
            this.getHomeGoods("pop");
            this.getHomeGoods("new");
            this.getHomeGoods("sell")
        },
        methods: {
            //Scroll.vue传递：上拉加载更多
            pullLoadMore() {
                console.log(333);
                this.getHomeGoods(this.currentType);
                this.$refs.Bscroll.finishPullUp();
            },
            //Scroll.vue传递：返回图标 的显示和隐藏 
            scrollPosition(position) {
                this.isShowBack = (-position.y) > 500; //当滚动距离大于1000 时，isShowBack 为true,图标展示
            },
            //返回顶部事件
            backClick() {
                this.$refs.Bscroll.scrollTo(0, 0, 300) //利用ref：调用组件Scroll.vue 中的scroll 属性
            },
            // 商品页面切换相关的
            switchClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = "pop";
                        break; //注意条件判断完成后要 终止整个判断；不然判断会继续的执行，结果变成最后一个
                    case 1:
                        this.currentType = "new";
                        break
                    case 2:
                        this.currentType = "sell";
                        break
                }
            },
            //网络请求相关的
            getHomeMultidata() {
                getHomeMultidata()
                    .then(res => {
                        console.log(res);
                        //1.2 把请求到的数据赋值给 组件的属性data
                        this.banner = res.data.data.banner.list;
                        this.recommend = res.data.data.recommend.list;
                    }).catch((err) => {
                        console.log(err, "请求失败啦");
                    })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1; //请求一次代表一次上拉，原页数+1，作为请求页数
                getHomeGoods(type, page)
                    .then(res => {
                        this.goods[type].list.push(...res.data.data.list);
                        this.goods[type].page += 1; //请求完成后，数据的页数(page)要实时刷新
                    })
            }
        }
    }
</script>

<style scoped>
    #Home {
        position: relative;
        height: 100vh;
        margin-top: 44px;
        /* vh：viewport height 视口高度 */
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
    
    .Tab-control {
        position: sticky;
        top: 44px;
    }
    /* (1)使用 calc 动态改变 */
    
    .content {
        height: calc(100% - 93px);
        overflow: hidden;
    }
    /* .content {
        position: absolute;
        top: 44px;
        bottom: 59px;
        left: 0;
        right: 0;
    } */
    /* （2）使用定位，因为上下状态栏高度是定死的 */
</style>