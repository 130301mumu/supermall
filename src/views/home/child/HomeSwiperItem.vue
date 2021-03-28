<template>
    <!-- 警告：要注意避免组件有多个 id -->
    <div id="HomeSwiper">
        <Swiper class="HomeSwiper">
            <SwiperItem v-for="item in banner">
                <a :href="item.link">
                    <img :src="item.image" alt="" @load="swiperImageLoad">
                </a>
            </SwiperItem>
        </Swiper>
    </div>
</template>
<script>
    import {
        Swiper,
        SwiperItem
    } from "components/common/swiper" //导入轮播图

    export default {
        components: {
            Swiper,
            SwiperItem
        },
        data() {
            return {
                load: true
            }
        },
        props: {
            banner: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        methods: {
            swiperImageLoad() { //作用：只需加载完第一张图片即可，因为高度都是一样
                if (this.load) {
                    this.$emit("swiperImageLoad");
                    this.load = false
                }
            },
        }
    }
</script>
<style scoped>
    #HomeSwiper img {
        width: 100%;
    }
</style>