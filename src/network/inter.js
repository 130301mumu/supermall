// 2.axios的拦截器
// 2.1请求拦截的作用
instance1.interceptors.request.use(config => {
    // 1.比如config中的一些信息不符合服务器的需求

    // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标

    // 3.某些网络请求（比如登陆（token）），必须携带一些特殊的信息

    return config;
}, err => {
    console.log(err);
})

// 2.2响应拦截
instance1.interceptors.request.use(res => {
    return res.data
}, err => {
    console.log(err);
})