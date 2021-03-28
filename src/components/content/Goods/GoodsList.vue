<template>
    <div id="GoodsList" >
        <GoodsList-item v-for="item in GoodsList" :GoodsListItem="item" > 
        </GoodsList-item>
    </div>
</template>
<script>
    import GoodsListItem from "./GoodsListItem.vue";

    export default {
        components: {
            GoodsListItem
        },
        props: {
            GoodsList: { //从views/home.vue 中传递过来数据
                type: Array,
                default () {
                    return []
                }
            }
        }
    }
</script>
<style scoped>
    #GoodsList {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 2px;
    }
</style>