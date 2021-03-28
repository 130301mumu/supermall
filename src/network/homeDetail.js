import { request } from "./request"

//1.详情页的接口API
export function getDetailPage(iid) {
    return request({
        url: "/detail",
        params: {
            iid //iid 是个变量，不同的goodsListItem 对应不同的iid；iid不同请求函数得到不同的数据
        }
    })
}
//推荐页的接口API
export function getRecommend() {
    return request({
        url: "/recommend"
    })
}

//1.商品和服务介绍信息，对需要的数据先做一个整合，再对整合的对象做相应操作
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.nowPrice = itemInfo.highNowPrice;
    }
}
//2.商家信息的对象体
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}