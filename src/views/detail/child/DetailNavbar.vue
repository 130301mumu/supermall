<template>
    <div id="detailNavbar">
    <Nav-bar>
            <!--1 左插槽 -->
                        <template v-slot:left >
                            <div class="detailLeft" @click="backClick">
                                <img src="../image/back.png" alt="" class="backImage">
                            </div>
                        </template>
<!--2 中间插槽 -->
<template v-slot:center>
                        <div class="center">
                            <div class="centerItem" 
                            :class="{active:index == currentIndex}" 
                            v-for="(item,index) in list" 
                            @click="currentClick(index)">{{item}}</div>
                        </div>
                        </template>
</Nav-bar>
</div>

</template>
<script>
    import NavBar from "components/common/navbar/NavBar.vue"

    export default {
        name: "DatailNavbar",
        components: {
            NavBar
        },
        data() {
            return {
                list: ["商品", "参数", "评论", "推荐"],
                currentIndex: 0,

            }
        },
        methods: {
            backClick() {
                this.$router.go(-1);

            },
            currentClick(index) {
                this.currentIndex = index;
            }
        },
    }
</script>
<style scoped>
    #detailNavbar {
        position: relative;
        width: 100%;
        z-index: 99;
        background-color: #fff;
    }
    
    .detailLeft {
        text-align: center;
    }
    
    .detailLeft:hover {
        color: royalblue;
    }
    
    .backImage {
        position: relative;
        width: 24px;
        top: 6px;
    }
    
    .center {
        display: flex;
    }
    
    .centerItem {
        flex: 1;
    }
    
    .center .active {
        color: deeppink;
    }
</style>