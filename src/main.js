import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import mitt from "mitt"


const app = createApp(App);
app.use(router);
app.mount('#app');

//挂载事务总线
app.config.globalProperties.$bus = new mitt()

// 在vue2.x中，我们想设置全局变量，可以在main文件中用prototype绑定vue实列
// 当Vue升级到3.0版本后，其创建方法改成了createApp({})，prototype属性也被取消了，
// 因此无法使用之前Vue.prototype.$bus = new Vue()的方式使用事务总线
// ，在vue3.0中，可以用app.config.globalProperties来代替prototype


// app.use(router) 必须先于  app.mount(＃app)
// 不然会出现问题：（1）$route无法被识别，完成不了路由状态的判断
// （2）Failed to resolve component: router-view，