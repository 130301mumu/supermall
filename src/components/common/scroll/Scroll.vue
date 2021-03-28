<!-- 该文件的作用：作为使用插件的代理
当插件不再维护时，只需要改变这里的代码即可，而不需要对业务的代码改变 和修改-->
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
            //注意：为防止scroll 在没初始前就被调用，要求调用方法时前先做 scroll 是否已经初始化的判断
            scrollTo(x, y, time = 300) {
                this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll.finishPullUp()
            },
            refresh() {
                this.scroll.refresh()
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                pullUpLoad: this.pullUpLoad //动态属性，由用户自定义
            });
            //传递滚动事件和参数
            this.scroll.on("scroll", (position) => {
                this.$emit("scrollPosition", position)
            });
            this.scroll.on("pullingUp", () => {
                this.$emit("pullingUp") //传递上拉加载事件
            })
        },
    }
</script>
<style scoped>

</style>