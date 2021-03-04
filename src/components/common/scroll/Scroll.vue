<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'

    // import Pullup from '@better-scroll/pull-up'
    // 注册插件
    // BScroll.use(Pullup)

    export default {
        name: "scroll",
        props: {
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                scroll: null
            }
        },
        methods: {
            scrollTo(x, y, time = 300) {
                this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll.finishPullUp()
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                pullUpLoad: this.pullUpLoad
            });
            this.scroll.on("scroll", (position) => {
                this.$emit("scrollPosition", position) //传递滚动事件和参数
            });
            this.scroll.on("pullingUp", () => {
                this.$emit("pullingUp") //传递上拉加载事件
            })
        },
    }
</script>
<style scoped>

</style>