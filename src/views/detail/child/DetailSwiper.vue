<template>
    <div id="DetailSwpier">
        <Swiper class="Swiper">
            <Swiper-item  v-for="item in topImages" class="swiperItem">
                <img :src="item" alt="">
            </Swiper-item>
        </Swiper>
    </div>
</template>
<script>
    //导入轮播图
    import {
        Swiper,
        SwiperItem
    } from "components/common/swiper"



    export default {
        name: "DetailSwiper",
        components: {
            Swiper,
            SwiperItem
        },
        props: {
            iid: {
                type: String,
                default: null
            },
            topImages: {
                type: Array,
                default: []
            }
        },
    }
</script>
<style scoped>
    .swiperItem {
        height: 300px;
    }
    
    .swiperItem img {
        width: 100%;
    }
</style>