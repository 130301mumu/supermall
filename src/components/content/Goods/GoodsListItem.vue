<template>
    <div class="goods-item" @click="getDetailClick">
        <!-- <a :href="GoodsListItem.link"> -->
            <img :src="goodListImage" alt="" @load="imgLoad">
            <div class="goods-info">
              <p>{{GoodsListItem.title}}</p>
              <span class="price">{{GoodsListItem.price}}</span>
              <span class="collect">{{GoodsListItem.cfav}}</span>
            </div>
        <!-- </a> -->
    </div>
</template>
<script>
    export default {
        props: {
            GoodsListItem: {
                type: Object
            },
        },
        computed: {
            goodListImage() {
                return this.GoodsListItem.show && this.GoodsListItem.show.img || this.GoodsListItem.image
            }
        },
        methods: {
            imgLoad() {
                //在组件A中使用事务总线触发某个动作，用mitt的属性emit发送

                //在m页面也应用该组件时，my页面的刷新要和主页面分开
                if (this.$route.path.indexOf('/home') != -1) {
                    this.$bus.emit("itemImgLoad");
                } else if (this.$route.path.indexOf('/detail/') != -1) {
                    this.$bus.emit("itemImgLoad");
                }
            },
            //路由跳转到详情页
            getDetailClick() {
                //动态路由作用 ：iid = this.GoodsListItem.iid
                this.$router.push("/detail/" + this.GoodsListItem.iid) //不同的GoodListItem得到不同的iid；不同的iid得到不同的详情页数据
            }
        }
    }
</script>
<style scoped>
    .goods-item {
        padding-bottom: 40px;
        position: relative;
        width: 48%;
    }
    
    .goods-item img {
        width: 100%;
        border-radius: 5px;
    }
    
    .goods-info {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }
    
    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }
    
    .goods-info .price {
        color: var(--color-high-text);
        margin-right: 20px;
    }
    
    .goods-info .collect {
        position: relative;
    }
    
    .goods-info .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    }
</style>