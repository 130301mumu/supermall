import axios from 'axios';

//请求的步骤和逻辑在 request.js 中处理
export function request(config) {

    //创建axios 实例
    const instance1 = axios.create({
        baseURL: "http://152.136.185.210:7878/api/m5",
        timeout: 5000, //5000毫秒
        method: "get",
    });

    //3.发送真正的网络请求
    return instance1(config)
        //作用：调用axios，因为axios（）返回是的一个promise 对象，所以这里相当于 return new promise；
        // 注意：config 是其他模块传递过来的 请求信息
}