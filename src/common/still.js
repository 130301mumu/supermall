//该文件的主要作用：封装一个防抖动函数
export function debounce(func, delay) {
    let timer = null;
    return function(params) {
        if (timer) { //不为null时执行第一个语句，为null 时执行第二语句；起到节流的作用
            clearTimeout(timer);
        } {
            timer = setTimeout(() => { //回调函数
                func.apply(params);
            }, delay)
        }
    }
}