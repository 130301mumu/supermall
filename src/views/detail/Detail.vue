<template>
        <div id="detail">
                <!-- 导航栏 -->
            <Detail-nav-bar  class="detailNavbar"/>
            <!-- 滚动区域 -->
            <Better-scroll class="content" ref="Bscroll">
                <!--3 轮播图 -->
                <Detail-swiper :iid="iid" :topImages="topImages"/>
                    <!-- 夫传子用 ":" 子传夫用 "@" -->
                    <!-- 轮播图下的商品基础信息 -->
                <Detail-base-info :goods="goods" />
                <!-- 商家店铺信息 -->
                <Detail-shop-info :shop="shop" />
                <!-- 商品的模特展示信息 -->
                <Detail-goods-info :detailInfo=" detailGoodsInfo" />
                <!-- 商品的参数信息 -->
                <Detail-param-info :paramInfo="paramInfo" />
                <!-- 商品的评价信息 -->
                <Detail-comment-info :commentInfo="commentInfo" />
                <Detail-recommend-info :GoodsList="recommend" />
            </Better-scroll>
            <Detail-tab-bar />
            
        </div>
</template>
<script>
    import DetailNavBar from "./child/DetailNavbar.vue"
    import DetailSwiper from "./child/DetailSwiper.vue"
    import DetailBaseInfo from "./child/DetailBaseInfo.vue"
    import DetailShopInfo from "./child/DetailShopInfo.vue"
    import DetailTabBar from "./child/DetailTabBar.vue"
    import DetailGoodsInfo from "./child/DetailGoodsInfo.vue"
    import DetailParamInfo from "./child/DetailParamInfo.vue"
    import DetailCommentInfo from "./child/DetailCommentInfo.vue"
    import DetailRecommendInfo from "components/content/Goods/GoodsList.vue"

    import BetterScroll from 'components/common/scroll/Scroll.vue' //导入滚动插件


    //网络请求数据
    import {
        getDetailPage,
        Goods,
        Shop,
        getRecommend
    } from "network/homeDetail.js"

    import {
        itemListenerMixin
    } from "common/mixin.js"


    export default {
        name: "detail",
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            BetterScroll,
            DetailTabBar,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailRecommendInfo
        },
        mixins: [itemListenerMixin], //引入混入的变量和方法（防抖动函数）
        data() {
            return {
                iid: null, //该数据传递给轮播图
                topImages: [], //轮播图信息
                goods: {}, //注意：商品介绍信息  error: Cannot convert undefined or null to object
                shop: {},
                detailGoodsInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommend: [],

            }
        },
        created() {
            //1.注意：$router 是全局 的路由对象；但$route 是当前活跃路由
            this.iid = this.$route.params.iid; //作用；给getDetailPage(this.iid) 的this.iid 赋值

            //2.获取/detail/iid 对象的全部信息，在这里做中转
            getDetailPage(this.iid).then((res) => {
                // console.log(res.data);
                let data = res.data.result;

                //2.1提取轮播图数据的 url 信息
                this.topImages = data.itemInfo.topImages;

                //2.2 商品和服务介绍信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

                //2.3 商家信息
                this.shop = new Shop(data.shopInfo);

                //2.4 获取商品展示信息
                this.detailGoodsInfo = data.detailInfo

                //2.5获取商品的参数信息
                this.paramInfo = data.itemParams

                //2.6 取出评论信息
                data.rate.list && (this.commentInfo = data.rate.list[0])
            })

            getRecommend().then(res => {
                this.recommend = res.data.data.list
            })
        },
        deactivated() {
            //1.在离开组件时：取消全局事件的监听（this.ItemImgListener 监听函数）
            this.$bus.off("itemImgLoad", this.ItemImgListener)
        }
    }
</script>
<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    
    .content {
        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>