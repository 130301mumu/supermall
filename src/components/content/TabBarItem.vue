<!-- 文件作用：管理自己组件页面,一个组件在插槽的作用下变成几个不同的组件样式 -->
<template>
    <div class="tab-bar-item" @click="itemclick">
        <!-- 为了动态的展示 img 和 text ,这里使用两个插槽代替 -->
        <!-- 为什么在每一个 slot 上加 <div>？:为了避免dom<组件>对 <slot> 直接覆盖，影响<slot>中的属性 -->
        <div v-if="!isActive" class="item-img">
            <slot  name="item-img1"></slot>
        </div>

        <div v-else>
            <slot  name="item-img2"></slot>
        </div>
        <!-- 在两个图标中使用 v-if 和 v-else：通过控制属性 isActive切换图标，而isActive的值 由组件的状态决定 -->

        <div  :style="activeStyle">
            <slot name="item-text"></slot>
            <!-- <slot></slot> -->
        </div>
    </div>
</template>

<script>
    import router from '../../router';
    export default {
        name: "tabBarItem",
        props: {
            // 路径从父插槽的不同组件传递过来（一个组件对应一个路径）
            path: String,
            // 路径从父插槽的不同组件传递过来 isStyle:
            isStyle: {
                type: String,
                default: 'blue'
            }
        },
        data() {
            return {
                // isActive: true
            }
        },
        computed: {
            //作用： 判断组件的path 是否等于活跃状态组件的path，
            //每一个组件的active：(this.path == this.$route.path),只有当自己变成活跃状态时active 才为true
            //true 的才会有active  样式，所以实现样式切换效果
            isActive() {
                return this.path == this.$route.path;
            },
            activeStyle() {
                //作用：根据组件是否活跃，设置文字的样式，显示自定义传入的 isStyle：样式
                return this.isActive ? {
                    color: this.isStyle
                } : {};
            }
        },
        methods: {
            itemclick() {
                this.$router.replace(this.path).catch(err => {}); //路由跳转
                console.log(this.path);
            }
        },
        // mounted() {
        //     console.log(this.$route); // 无法打印出正常的url信息
        // },
        mounted() {
            let _this = this;
            setTimeout(function() {
                console.log(_this.$route.path);
            }, 100);
        }
    }
</script>

<style scoped>
    /* 管理自己组件的页面： */
    
    .tab-bar-item {
        flex: 1;
        height: 59px;
        text-align: center;
        font-size: 14px;
    }
    
    .tab-bar-item .item-img img {
        width: 24px;
        margin: 0 auto;
    }
    
    .active {
        color: blue;
    }
</style>