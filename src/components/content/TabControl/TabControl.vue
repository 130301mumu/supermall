<template>
    <div class="TabControl">
        <div v-for="(item,index) in title" 
        class="TabControl-item"
        :class="{active: index == CurrectIndex}"
        @click="ControlClick(index)">
            <!-- 注意：要使用变量的地方都是动态绑定 -->
            <span >{{item}}</span>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                CurrectIndex: 0
            }
        },
        methods: {
            ControlClick(index) {
                this.CurrectIndex = index;
                this.$emit("switchClick", index)
            }
        },
        props: {
            title: {
                type: Array,
                defaut() {
                    return []
                }
            }
        }
    }
</script>
<style scoped>
    .TabControl {
        display: flex;
        text-align: center;
        z-index: 9;
        background-color: #fff;
        height: 44px;
        line-height: 44px;
        width: 100%;
    }
    
    .TabControl-item {
        flex: 1;
    }
    
    .TabControl-item span {
        padding: 5px;
    }
    
    .active span {
        color: #ff8198;
        border-bottom: 2px solid deeppink;
    }
</style>