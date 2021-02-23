import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


const app = createApp(App);
app.use(router);
app.mount('#app');

// app.use(router) 必须先于  app.mount(＃app)
// 不然会出现问题：（1）$route无法被识别，完成不了路由状态的判断
// （2）Failed to resolve component: router-view，