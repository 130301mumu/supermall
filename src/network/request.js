import axios from 'axios';

//请求的步骤和逻辑在 request.js 中处理
export function request(config) {

    //创建axios 实例
    const instance1 = axios.create({
        baseURL: "http://152.136.185.210:7878/api/m5",
        timeout: 5000, //5000毫秒
        method: "get",
        //注意：type(sell/pop/new三个其中之一)和page(page从1开始)参数没有传, 是必传参数，格式: /home/data?type=sell&page=1
        params: {
            type: "sell",
            page: 1,
        }
    });

    //3.发送真正的网络请求
    return instance1(config.url1) //调用axios，因为axios（）返回是的一个promise 对象，所以这里相当于 return new promise
}