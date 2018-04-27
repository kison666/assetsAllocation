import {
    socketBaseUrl
} from './env'

/**
 * 
 * websocket请求使用的接口类型
 * 
 */
const REQ_TYPE_PRICE = 101; //十二大类指数价格
const REQ_TYPE_FOF = 102; //FOF资产包信息
const REQ_TYPE_ACCOUNT = 103; //推荐账户金额信息
const REQ_TYPE_DIY_ACCOUNT = 104; //自配账户金额信息
const REQ_TYPE_SIMPLE_FOF = 105; //FOF每个资产包信息
const REQ_TYPE_INDEX = 106; //大类指数
const REQ_TYPE_MAIN = 107; //主要市场
const REQ_TYPE_ASSET_TOTAL = 108; //总资产信息

/**
 * 
 * websocket请求API
 * 
 */
const SOCKET_URL_ACCOUNT = socketBaseUrl + '/my/index'; //账户金额信息
const SOCKET_URL_DIY_ACCOUNT = socketBaseUrl + '/my/diy-index'; //自配账户金额信息
const SOCKET_URL_VIRTUAL_ACCOUNT = socketBaseUrl + '/my/vir-total'; //模拟账户信息
const SOCKET_URL_FOF_LIST = socketBaseUrl; //FOF包列表

export {
    REQ_TYPE_PRICE,
    REQ_TYPE_FOF,
    REQ_TYPE_ACCOUNT,
    REQ_TYPE_DIY_ACCOUNT,
    SOCKET_URL_ACCOUNT,
    SOCKET_URL_DIY_ACCOUNT,
    SOCKET_URL_FOF_LIST,
    REQ_TYPE_SIMPLE_FOF,
    REQ_TYPE_INDEX,
    REQ_TYPE_MAIN,
    SOCKET_URL_VIRTUAL_ACCOUNT,
    REQ_TYPE_ASSET_TOTAL
}
