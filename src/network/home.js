import { request } from "./request"

export function getHomeMultidata() {
    return request({
        url1: "/home/multidata",
    })
}