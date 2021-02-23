//文件的作用，对要引用的路径 起 别名

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "assets": "@/assets", //使用时 全局dom：~assets  导入时：assets ;都代表辣路径 src/assets
                "commit": "@/commit",
                "components": "@/components",
                "network": "@/network",
                "views": "@/views",
                "router": "@/router"
            }
        }
    }
}