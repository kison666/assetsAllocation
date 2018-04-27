/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */
let baseUrl;
let routerMode;
const imgBaseUrl = 'http://10.21.1.21:98';
let socketBaseUrl;

if (process.env.NODE_ENV == 'development') {
    // baseUrl = 'http://10.21.1.21:98';
    baseUrl = 'http://mapi.baomap.com';
    routerMode = 'hash';
    // socketBaseUrl = 'ws://10.21.1.21:8080';
    socketBaseUrl = 'ws://ws.baomap.com:8089';
} else {
    // baseUrl = 'http://10.21.1.21:98';
    baseUrl = 'http://mapi.baomap.com';
    routerMode = 'hash';
    socketBaseUrl = 'ws://ws.baomap.com:8089';
    // socketBaseUrl = 'ws://10.21.1.21:8080';
}

export {
    baseUrl,
    routerMode,
    imgBaseUrl,
    socketBaseUrl
}
