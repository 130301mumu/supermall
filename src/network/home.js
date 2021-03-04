import { request } from "./request"

export function getHomeMultidata() {
    return request({
        url: "/home/multidata",
        //注意：type(sell/pop/new三个其中之一)和page(page从1开始)参数没有传, 是必传参数,格式: /home/data?type=sell&page=1
        params: {
            type: "sell",
            page: 1,
        }
    })
}
export function getHomeGoods(type, page) {
    return request({
        url: "/home/data",
        params: {
            type: type,
            page: page
        }
    })
}