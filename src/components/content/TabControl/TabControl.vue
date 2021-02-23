<template>
    <div class="TabControl">
        <div v-for="(item,index) in title" class="TabControl-item" >
            <!-- 注意：要使用变量的地方都是动态绑定 -->
            <span :class="{active: index == CurrectIndex}" @click="ControlClick(index)">{{item}}</span>
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
        background-color: #fff;
        height: 44px;
        line-height: 44px;
    }
    
    .TabControl-item {
        flex: 1;
    }
    
    .TabControl-item span {
        padding: 5px;
    }
    
    .active {
        color: #ff8198;
        border-bottom: 2px solid deeppink;
    }
</style>