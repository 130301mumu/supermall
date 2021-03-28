//该文件的作用：对组件间存在共同的 变量和方法 的集中
import {
    debounce
} from "common/still.js" //导入独立功能：滚动防抖动函数
export const itemListenerMixin = {
    data() {
        return {
            ItemImgListener: null,
            newRefresh: null //也可以为防抖函数做一个 混入
        }
    },
    mounted() {
        //图片加载完做BT-scroll 刷新
        const refresh = debounce(this.$refs.Bscroll.refresh, 10) //this.$refs.Bscroll.refresh 是执行条件 
        this.$bus.on('itemImgLoad', () => {
            refresh();
        })

        this.ItemImgListener = () => {
            refresh();
        }

    }
}