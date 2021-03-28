<template>
<div id="Home">
    <!-- 导航栏 -->
<nav-bar id="HomeNav">
        <template v-slot:center>
            <div class="center">购物街</div>
        </template>
</nav-bar>
<Tab-control :title="title" @switchClick="switchClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></Tab-control>
<!-- 首页内容： -->
<!-- @pullingUp="pullLoadMore" :pull-up-load="true" -->
<Better-scroll class="content" ref="Bscroll" @scrollPosition="scrollPosition" @pullingUp="pullLoadMore" :pull-up-load="true">
    <!-- 轮播图 -->
    <Home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"></Home-swiper>
    <!--推荐栏-->
    <Recommend :recommend="recommend"></Recommend>
    <!-- 本周流行栏 -->
    <Feature-view></Feature-view>
    <!-- 选择位置栏 -->
    <Tab-control :title="title" @switchClick="switchClick" ref="tabControl2"></Tab-control>
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
        getHomeMultidata, //获取轮播图和推荐栏数据  的函数
        getHomeGoods //获取商品数据  的函数
    } from "network/home.js" //导入网络请求
    import {
        itemListenerMixin
    } from "common/mixin.js"
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
                saveY: 0,
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
                currentType: "pop",
                tabOffsetTop: 0,
                isTabFixed: false, //用于判断，tabcorlt 是否显示
            }
        },
        mixins: [itemListenerMixin], //使用混入中的变量和方法（防抖动函数）
        //组件活跃时调用
        activated() {
            this.$refs.Bscroll.scrollTo(0, this.saveY, 0)

            this.$refs.Bscroll.refresh() //当从其他页面跳转到 首页时对 better-scroll 刷新，避免bt-scroll 的卡顿BUG
        },
        //组件离开时调用
        deactivated() {
            //1.当存在scroll 不为空时，保持页面位置不动
            this.$refs.Bscroll.scroll && (this.saveY = this.$refs.Bscroll.scroll.y);
            //2.在离开组件时：取消全局事件的监听
            this.$bus.off("itemImgLoad", this.ItemImgListener)
        },
        //在实质开发中，每个组件中都有不同的网络请求，这些网络请求在 .vue中 实现并返回数据给组件处理：
        created() {
            //1.多个数据请求
            this.getHomeMultidata();

            //2.商品数据请求
            this.getHomeGoods("pop");
            this.getHomeGoods("new");
            this.getHomeGoods("sell");
        },
        mounted() {
            //3. 在组件B监听Item中图片加载完成
            //防抖动函数 debounce从外部引入 作用：对同一操作（加载图片）只有在最后一张加载完后才做相应的操作,减少繁琐的操作，提高程序执行效率
        },
        methods: {
            //Scroll.vue传递：上拉加载更多
            pullLoadMore() {
                this.getHomeGoods(this.currentType);
                this.$refs.Bscroll.finishPullUp();
            },
            //Scroll.vue传递：返回图标 的显示和隐藏 
            scrollPosition(position) {
                //1.当滚动距离大于1000 时，isShowBack 为true,图标展示
                this.isShowBack = (-position.y) > 500;
                //2. 但滚动到的距离大于 tabContorl距离顶部距离  时改变属性
                this.isTabFixed = (-position.y) > this.tabOffsetTop
            },
            //返回顶部事件
            backClick() {
                this.$refs.Bscroll.scrollTo(0, 0, 300) //利用ref：调用组件Scroll.vue 中的scroll 属性
            },
            // 商品页面切换相关；switchClick 是子组件tabC 传递过来的
            switchClick(index) {
                switch (index) {
                    //作用：给上拉加载更多，提供参数，给参数是数组的元素
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
                //作用：是第一个control 和第二个control 高亮同步 
                if (this.$refs.tabControl1) {
                    this.$refs.tabControl1.CurrectIndex = index
                };
                if (this.$refs.tabControl2) {
                    this.$refs.tabControl2.CurrectIndex = index
                };
            },
            //轮盘加载完成后的操作
            swiperImageLoad() {
                //获取tabControl的offsetTop 
                //所有的组件都有一个属性 $el :用于获取组件中的元素
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            },
            //网络请求相关的
            getHomeMultidata() {
                getHomeMultidata()
                    .then(res => {
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
                    .then(res => { //res 是请求到的数据
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
        /* vh：viewport height 视口高度 */
    }
    
    #HomeNav {
        display: flex;
        /* position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9; */
        background-color: rgb(253, 112, 154);
        box-shadow: 0 1px 1px rgba(241, 241, 243, 0.3);
    }
    
    #HomeNav .center {
        color: #fff;
    }
    
    .tab-control {
        position: relative;
        z-index: 9;
        /* z-index在有定位的时候起效果 */
    }
    
    .content {
        /* (1)使用 calc 动态改变 */
        /* height: calc(100% - 93px); */
        overflow: hidden;
    }
    
    .content {
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
    /* （2）使用定位，因为上下状态栏高度是定死的 */
</style>