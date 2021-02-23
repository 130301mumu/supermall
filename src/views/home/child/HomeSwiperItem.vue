<template>
    <!-- 警告：要注意避免组件有多个 id -->
    <div id="HomeSwiper">
        <Swiper class="HomeSwiper">
            <SwiperItem v-for="item in banner">
                <a :href="item.link">
                    <img :src="item.image" alt="">
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
        props: {
            banner: {
                type: Array,
                default () {
                    return []
                }
            }
        }
    }
</script>
<style scoped>
    #HomeSwiper img {
        width: 100%;
    }
</style>