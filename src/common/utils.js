export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) { //对test(fmt) 的fmt字符串 进行正则表达：/(y+)/
        // y+ ：匹配1到多个y,包括自身
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        // RegExp.$1 ：代表上面正则匹配到的字符
        // date.getFullYear() + '' ：把data 转化得到年份（如2021)
        // ().substr ：对年份进行截取
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) { //对o 对象进行正则 匹配
            let str = o[k] + ''; //将匹配到的数据转化为字符串
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
            //对个位的数字进行前加一的操作 （如 8 => 08）
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};