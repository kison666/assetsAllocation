<template>
    <div class="market_container">
        <!--         <head-top signin-up='home' head-title="市场">
            <span slot='logo' class="head_logo"></span>
        </head-top> -->
        <section class="menu">
            <section class="change_market_type" ref="chooseType">
                <div>
                    <span :class='{activity_show: changeMarketType =="main"}' @click="changeMarketTypeClick('main')">主要市场</span>
                </div>
                <div>
                    <span :class='{activity_show: changeMarketType =="index"}' @click="changeMarketTypeClick('index')">大类指数</span>
                </div>
                <div>
                    <span :class='{activity_show: changeMarketType =="package"}' @click="changeMarketTypeClick('package')">大类资产组合</span>
                </div>
            </section>
            <transition name="fade-choose">
                <section v-if="changeMarketType =='main'" class="main_container" v-cloak>
                    <section class="menu_container">
                        <section class="menu_top">
                            <ul>
                                <li v-for="(item, index) in mainMarket">
                                    <p class="main_title" v-cloak>{{item.symbolName}}</p>
                                    <p class="main_total bold" :class="{green:getNormalFloat(item.priceDif) >= 0,red:getNormalFloat(item.priceDif) <0,white:getNormalFloat(item.priceDif)==0}" v-cloak>{{item.price}}</p>
                                    <p class="main_range bold"><span :class="{green:getNormalFloat(item.priceDif) >= 0,red:getNormalFloat(item.priceDif) <0,white:getNormalFloat(item.priceDif)==0}" v-cloak>{{item.priceDif}}</span><span :class="{green:getNormalFloat(item.priceDif) >0,red:getNormalFloat(item.priceDif) <0,white:getNormalFloat(item.priceDif)==0}" v-cloak>&nbsp;&nbsp;{{item.increase}}%</span></p>
                                </li>
                            </ul>
                        </section>
                        <section v-for="(item, key, index) in mainMarketDetail" class="menu_item">
                            <p class="menu_title" v-cloak>{{key}}</p>
                            <ul class="main_item_list">
                                <li v-for="(litem, index1) in item">
                                    <ul class="main_item_list_item main-item">
                                        <li>
                                            <p><img :src="litem.iconUrl"><span v-cloak>{{litem.symbolName}}</span></p>
                                        </li>
                                        <li class="bold">
                                            <p :class="{green:getNormalFloat(litem.priceDif) >0,red:getNormalFloat(litem.priceDif) <0,white:getNormalFloat(litem.priceDif)==0}" v-cloak>{{litem.price}}</p>
                                        </li>
                                        <li class="bold">
                                            <p :class="{green:getNormalFloat(litem.priceDif) >0,red:getNormalFloat(litem.priceDif) <0,white:getNormalFloat(litem.priceDif)==0}" v-cloak>{{litem.increase}}%</p>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </section>
                    </section>
                </section>
            </transition>
            <transition name="fade-choose">
                <section v-if="changeMarketType =='index'" class="index-container" v-cloak>
                    <section class="menu_container">
                        <section v-for="(item, key, index) in indexMarketDetail" class="menu_item">
                            <p class="menu_title" v-cloak>{{key}}</p>
                            <ul class="main_item_list">
                                <li v-for="(litem, index1) in item">
                                    <router-link :to="{path: '/my/indexdetail', query:{fofId:litem.symbolId,name:litem.symbolName}}">
                                        <ul class="main_item_list_item index-item">
                                            <li class="width30">
                                                <p v-cloak>{{litem.symbolName}}</p>
                                            </li>
                                            <li class="width50 bold">
                                                <p :class="{green:getNormalFloat(litem.priceDif) >0,red:getNormalFloat(litem.priceDif) <0,white:getNormalFloat(litem.priceDif)==0}" v-cloak>{{litem.price}}</p>
                                            </li>
                                            <li class="width20 bold">
                                                <p :class="{green:getNormalFloat(litem.priceDif) >0,red:getNormalFloat(litem.priceDif) <0,white:getNormalFloat(litem.priceDif)==0}" v-cloak>{{litem.increase}}%</p>
                                            </li>
                                        </ul>
                                    </router-link>
                                </li>
                            </ul>
                        </section>
                    </section>
                </section>
            </transition>
            <transition name="fade-choose">
                <section v-if="changeMarketType =='package'" class="package-container" v-cloak>
                    <section class="menu_container">
                        <section v-for="(item, key, index) in packageMarketDetail" class="menu_item">
                            <p class="menu_title" v-cloak>{{key}}</p>
                            <ul class="main_item_list">
                                <li v-for="(litem, index) in item">
                                    <router-link :to="{path: '/my/fofdetail', query:{fofId:litem.symbolId,name:litem.symbolName +litem.symbolNum}}">
                                        <ul class="main_item_list_item package-item">
                                            <li class="width30">
                                                <p v-cloak>{{litem.symbolName}}{{litem.symbolNum}}</p>
                                                <p class="bottom" v-cloak>{{getFofSymbol(litem.symbol)}}</p>
                                            </li>
                                            <li class="width50 bold">
                                                <p :class="{green:getNormalFloat(litem.priceDif) >0,red:getNormalFloat(litem.priceDif) <0,white:getNormalFloat(litem.priceDif)==0}" v-cloak>{{litem.price}}</p>
                                            </li>
                                            <li class="width20 bold">
                                                <p :class="{green:getNormalFloat(litem.priceDif) >0,red:getNormalFloat(litem.priceDif) <0,white:getNormalFloat(litem.priceDif)==0}" v-cloak>{{litem.increase}}%
                                                </p>
                                            </li>
                                        </ul>
                                    </router-link>
                                </li>
                            </ul>
                        </section>
                    </section>
                </section>
            </transition>
        </section>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText" v-cloak></alert-tip>
        <foot-guide></foot-guide>
    </div>
</template>
<script>
import headTop from '../../components/header/head'
import footGuide from '../../components/footer/footer'
import BScroll from 'better-scroll'
import alertTip from '../../components/common/alertTip'
import {
    Indicator
} from 'mint-ui'
import {
    REQ_TYPE_PRICE,
    SOCKET_URL_FOF_LIST,
    REQ_TYPE_FOF,
    REQ_TYPE_INDEX,
    REQ_TYPE_MAIN
} from '../../config/const'
import {
    getFOFCode,
    getFOFName
} from '../../config/mUtils'
// import {
//     getFofSymbol
// } from '../../utils/utils'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../config/response'
import {
    socketBaseUrl
} from '../../config/env'
import {
    getToken,
    setMarketState,
    getMarketState,
    getMarketPackageList,
    setMarketPackageList,
    getMarketIndexList,
    setMarketIndexList,
    setMarketMainList,
    getMarketMainList,
    setMarketTopList,
    getMarketTopList
} from '../../store/store'
import {
    mapState,
    mapMutations
} from 'vuex'
import {
    mainMarket,
    mainMarketDetail,
    indexMarketDetail,
    packageMarketDetail,
    myIndex,
    checkTrade,
    mainFOFStaticList,
    mainIndexStaticList,
    mainMainStaticList
} from '../../service/getData'

export default {
    components: {
        headTop,
        footGuide,
        alertTip
    },

    data() {
        return {
            changeMarketType: 'main', //切换主要市场
            mainMarket: '', //市场指数
            mainMarketDetail: '', //细分市场指数
            indexMarketDetail: '', //12大类资产指数
            packageMarketDetail: '', //大类资产包
            preMainMarket: '', //细分市场指数
            preMainMarketDetail: '', //细分市场指数
            preIndexMarketDetail: '', //12大类资产指数
            prePackageMarketDetail: '', //大类资产包
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            myIndex: '', //测试数据
            getToken: '', //token数据
            isRealTimeData: true, //是否返回实时数据
            lockReconnect: false, //避免重复发起连接
            lockIndexReconnect: false, //避免重复发起连接
            lockMainReconnect: false, //避免重复发起连接
            conn: null, //SOCKET连接
            connIndex: null, //Index SOCKET链接
            connMain: null, //Main SOCKET链接
            isDestory: false, //是否销毁socket
            tradeFlag: false, //是否需要获取实时数据
            dif: 0, //离开盘的时间
            isSocketPackage: 0, //socket package数据计算
            isSocketIndex: 0, //socket index数据计算
            isSocketMain: 0, //socket main数据计算 
        }
    },
    created() {
        this.initData();
    },
    watch: {
        getToken: function(value) {
            this.getToken = value || '';
        },
        packageMarketDetail: function(value) {

        }
    },

    methods: {
        //初始化获取数据
        initData() {
            this.getCheckTradeData();
            this.changeMarketType = getMarketState();
            if (this.changeMarketType == null) {
                this.changeMarketType = "main";
            }
            // this.mainMarket = await mainMarket();
            // this.mainMarketDetail = await mainMarketDetail();

            // if (getMarketPackageList()) {
            //     this.packageMarketDetail = JSON.parse(getMarketPackageList());
            // }
            // if (getMarketIndexList()) {
            //     this.indexMarketDetail = JSON.parse(getMarketIndexList());
            // }

            // if (getMarketMainList()) {
            //     this.mainMarketDetail = JSON.parse(getMarketMainList());
            // }

            // if (getMarketTopList()) {
            //     this.mainMarket = JSON.parse(getMarketTopList());
            // }

            this.getLocalDataToShow(this);
            this.getSocketMainData(this);
            this.refreshPackageData();  

            if (this.changeMarketType == 'main') {
                this.getGlobalData();
            } else if (this.changeMarketType == 'index') {
                this.getIndexData();
            } else if (this.changeMarketType == 'package') {
                this.getPackageData();
            }
        },

        //获取是否返回实时数据的信息
        getCheckTradeData() {
            // Indicator.open();
            // let ret = await assetIndex(this.currentTradeId);
            let handler = this;
            checkTrade(function(ret) {
                handler.responseTrade(ret);
            });

        },

        responseTrade(ret) {
            Indicator.close();
            let response = responseResult(this, ret);
            // console.log(ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.tradeFlag = ret.retData.tradeFlag;
                this.dif = ret.retData.dif;
                if (this.tradeFlag == true || this.tradeFlag == 'true') {
                    this.getSocketIndexData(this);
                    this.getSocketPackageData(this);
                    // this.getSocketMainData(this);
                    this.refreshPackageData();
                } else {
                    this.setTimeUpdateData();
                }
                return
            } else if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            }
        },

        //获取主要市场数据
        getGlobalData() {
            if(this.preMainMarketDetail !=''){
                return;
            }
            Indicator.open();
            let handler = this;
            mainMainStaticList(function(ret) {
                handler.responseGlobalData(ret);
            });

        },

        responseGlobalData(ret) {
            Indicator.close();
            let response = responseResult(this, ret);
            // console.log(ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.mainMarketDetail = ret.retData.data;
                this.mainMarket = ret.retData.head;
                setMarketMainList(ret.retData.data);
                setMarketTopList(ret.retData.head);
                return
            } else if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            }
        },

        //获取FOF资产包数据
        getPackageData() {
            if(this.prePackageMarketDetail !=''){
                return;
            }
            if (this.changeMarketType == 'package') {
                Indicator.open();
            }
            // let ret = await assetIndex(this.currentTradeId);
            let handler = this;
            mainFOFStaticList(function(ret) {
                handler.responsePackageData(ret);
            });
        },

        responsePackageData(ret) {
            Indicator.close();
            let response = responseResult(this, ret);
            // console.log(ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.packageMarketDetail = ret.retData.data;
                setMarketPackageList(ret.retData.data);
                return
            } else if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            }
        },

        //获取大类指数数据
        getIndexData() {
            if(this.preIndexMarketDetail !=''){
                return;
            }
            if (this.changeMarketType == 'index') {
                Indicator.open();
            }
            // let ret = await assetIndex(this.currentTradeId);
            let handler = this;
            mainIndexStaticList(function(ret) {
                handler.responseIndexData(ret);
            });

        },

        responseIndexData(ret) {
            Indicator.close();
            let response = responseResult(this, ret);
            // console.log(ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.indexMarketDetail = ret.retData.data;
                setMarketIndexList(ret.retData.data);
                return
            } else if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            }
        },

        getSocketPackageData(handler) {
            if (window["WebSocket"]) {
                try {
                    handler.conn = new WebSocket(SOCKET_URL_FOF_LIST);
                    handler.conn.onopen = function() {
                        if (handler.conn.readyState === 1) {

                            handler.conn.send('type:' + REQ_TYPE_FOF);
                        } else {
                            handler.reconnect();
                        }
                    };
                    handler.conn.onclose = function(evt) {
                        // console.log("websocket close");

                        handler.reconnect();
                    };
                    handler.conn.onmessage = function(evt) {
                        try {
                            if (evt.data) {
                                let data = JSON.parse(evt.data);
                                handler.prePackageMarketDetail = evt.data;
                                setMarketPackageList(evt.data);
                                Indicator.close();
                            }
                        } catch (e) {

                        }

                    };
                } catch (e) {
                    console.log(e);
                    // error reconnect
                    // handler.reconnect();
                }

            } else {
                // console.log("window not support websocket");
            }
        },

        //如果socket连接中断，每隔2s重试连接
        reconnect() {
            let handler = this;
            if (handler.lockReconnect) return;
            if (handler.isDestory == true) return;
            handler.lockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            setTimeout(function() {
                handler.getSocketPackageData(handler);
                handler.lockReconnect = false;
            }, 5000);
        },

        getSocketIndexData(handler) {
            if (window["WebSocket"]) {
                try {
                    handler.connIndex = new WebSocket(SOCKET_URL_FOF_LIST);
                    handler.connIndex.onopen = function() {
                        // console.log("websocket send");
                        if (handler.connIndex.readyState === 1) {
                            handler.connIndex.send('type:' + REQ_TYPE_INDEX);
                        } else {
                            handler.reIndexconnect();
                        }
                    };
                    handler.connIndex.onclose = function(evt) {
                        handler.reIndexconnect();
                    };
                    handler.connIndex.onmessage = function(evt) {
                        try {
                            if (evt.data) {
                                let data = JSON.parse(evt.data);
                                // handler.indexMarketDetail = data;
                                handler.preIndexMarketDetail = evt.data;
                                setMarketIndexList(evt.data);
                                Indicator.close();
                                this.isSocketIndex++;
                            }
                        } catch (e) {

                        }
                    };
                } catch (e) {}
            }
        },

        //如果socket连接中断，每隔2s重试连接
        reIndexconnect() {
            let handler = this;
            if (handler.lockIndexReconnect) return;
            if (handler.isDestory == true) return;
            handler.lockIndexReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            setTimeout(function() {
                handler.getSocketIndexData(handler);
                handler.lockIndexReconnect = false;
            }, 5000);
        },

        getSocketMainData(handler) {
            if (window["WebSocket"]) {
                try {
                    handler.connMain = new WebSocket(SOCKET_URL_FOF_LIST);
                    handler.connMain.onopen = function() {
                        if (handler.connMain.readyState === 1) {
                            handler.connMain.send('type:' + REQ_TYPE_MAIN);
                        } else {
                            handler.reMainconnect();
                        }
                    };
                    handler.connMain.onclose = function(evt) {
                        handler.reMainconnect();
                    };
                    handler.connMain.onmessage = function(evt) {
                        try {
                            let data = evt.data;
                            if (evt.data) {
                                handler.preMainMarketDetail = JSON.parse(data).list;
                                handler.preMainMarket = JSON.parse(data).head;
                                setMarketMainList(JSON.parse(data).list);
                                setMarketTopList(JSON.parse(data).head);
                                Indicator.close();
                                this.isSocketMain++;
                            }
                        } catch (e) {

                        }
                    };
                } catch (e) {

                }

            } else {}
        },

        //如果socket连接中断，每隔5s重试连接
        reMainconnect() {
            let handler = this;
            if (handler.lockMainReconnect) return;
            if (handler.isDestory == true) return;
            handler.lockMainReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            setTimeout(function() {
                handler.getSocketMainData(handler);
                handler.lockMainReconnect = false;
            }, 5000);
        },

        changeMarketTypeClick(type) {
            if (type) {
                this.changeMarketType = type;
                setMarketState(type);
                if (this.changeMarketType == 'main' && this.isSocketMain <= 1) {
                    this.getGlobalData();
                } else if (this.changeMarketType == 'index' && this.isSocketIndex <= 1) {
                    this.getIndexData();
                } else if (this.changeMarketType == 'package' && this.isSocketPackage <= 1) {
                    this.getPackageData();
                }
            }
        },

        //为了数据刷新不晃动
        refreshPackageData(){
            let inHandler = this;
            window.setInterval(function() {
                  inHandler.getLocalDataToShow(inHandler);
            }, 500);
        },


        //从本地数据取数据
        getLocalDataToShow(inHandler){
            if (inHandler.changeMarketType == 'main') {
                if(inHandler.preMainMarketDetail !=''){
                    try{
                    inHandler.mainMarketDetail = JSON.parse(inHandler.preMainMarketDetail);
                    }catch(e){
                    inHandler.mainMarketDetail = inHandler.preMainMarketDetail;
                    }
                }
                if(inHandler.preMainMarket !=''){
                    try{
                    inHandler.mainMarket = JSON.parse(inHandler.preMainMarket);
                    }catch(e){
                    inHandler.mainMarket = inHandler.preMainMarket;
                    }
                }
            } else if (inHandler.changeMarketType == 'index') {
                if(inHandler.preIndexMarketDetail !=''){
                    try{
                       inHandler.indexMarketDetail = JSON.parse(inHandler.preIndexMarketDetail);
                    }catch(e){
                       inHandler.indexMarketDetail = inHandler.preIndexMarketDetail;
                    }
                }
            } else if (inHandler.changeMarketType == 'package') {
                if(inHandler.prePackageMarketDetail){
                    try{
                       inHandler.packageMarketDetail = JSON.parse(inHandler.prePackageMarketDetail);
                    }catch(e){
                       inHandler.packageMarketDetail = inHandler.prePackageMarketDetail;
                    }
                }
            }
        },

        //增加倒计时，获取开盘时间倒计时 
        setTimeUpdateData() {
            let handler = this;
            window.setTimeout(function() {
                handler.getSocketIndexData(handler);
                handler.getSocketPackageData(handler);
                // handler.getSocketMainData(handler);
            }, this.dif * 1000);
        },
        closeTip() {
            this.showAlert = false;
        },

        getFofSymbol(symbol) {
            if (!symbol) {
                return sympbol;
            }

            if (symbol.indexOf('.PO') >= 0) {
                return symbol.substring(0, symbol.indexOf('.PO'));
            }

            return symbol;
        },
        getNormalFloat(str) {
            if (!str) {
                return str;
            }
            if(typeof(str) =='string'){
                 return parseFloat(str.replace(',','')).toFixed(2);
            }  
            return str;
        },
    },
    destroyed() {
        this.isDestory = true;
        try {
            if (this.conn) {
                this.conn.onclose();
                this.conn.close();
            }
            if (this.connIndex) {
                this.connIndex.onclose();
                this.connIndex.close();
            }
        } catch (e) {}

    }

}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.menu {
    padding-top: $containerTop1;
}

.change_market_type {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: $grey4;
    padding: .3rem 1.2rem .3rem;
    border-top: solid $lineGrey4 0.05rem;
    z-index: 10;
    div {
        flex: 1;
        text-align: center;
        span {
            @include sc(.65rem, #888);
            padding: .25rem .1rem;
        }
        .activity_show {
            color: #fff;
            border-color: #fff;
            border-bottom: solid $lineGrey 0.09rem;
        }
    }
}

.main_container {
    display: flex;
    flex: 1;
    margin-top: 0.5rem;
}

.index-container,
.package-container {
    margin-top: 1.85rem;
}

.menu_container {
    /*display: flex;*/
    flex: 1;
    overflow-y: hidden;
    position: relative;
    padding-bottom: 3rem;
    margin-top: 1.8rem;
    .menu_top {
        background-color: transparent;
        padding: .5rem .5rem;
        width: 100%;
        margin-bottom: .5rem;
        ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
        }
        ul li {
            float: left;
            width: 27%;
        }
        ul li:nth-child(2) {
            width: 33%;
        }
        ul li:first-child {
            width: 40%;
        }
        .main_title {
            @include sc(.7rem, #fontGreyColor);
            text-align: center;
            margin-bottom: 0.4rem;
            max-width: 100%;
            white-space: nowrap;
            word-break: keep-all;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 0.85rem;
        }
        .main_total {
            @include s(.8rem);
            text-align: center;
            margin-bottom: 0.1rem;
        }
        .main_range {
            @include s(.6rem);
            text-align: center;
        }
    }
    .menu_item {
        background-color: transparent;
        padding: .0rem 0rem;
        width: 100%;
        position: relative;
        .menu_title {
            @include sc(.65rem, $fontGreyColor2);
            padding: .3rem .5rem;
            background-color: $grey;
            line-height: .65rem;
        }
        .main_item_list {
            background-color: transparent;
            padding: 0rem .5rem;
            li {
                border-bottom: 0.05rem solid $borderColor;
                .main_item_list_item {
                    list-style: none;
                    margin: 0 auto;
                    overflow: hidden;
                    width: 100%;
                    li {
                        float: left;
                        width: 25%;
                        border-bottom: none;
                        padding: .4rem 0rem .25rem;
                        img {
                            height: .6rem;
                            margin-right: 0.3rem;
                        }
                        p {
                            @include sc(.65rem, $fontColor);
                            line-height: 0.65rem;
                        }
                    }
                    li:nth-child(1) {
                        width: 45%;
                        p:first-child {
                            max-width: 100%;
                            white-space: nowrap;
                            word-break: keep-all;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            line-height: 0.7rem;
                        }
                    }
                    li:nth-child(2) {
                        width: 25%;
                        text-align: right;
                        p {
                            padding-top: .1rem;
                            @include sc(.75rem, $fontGreyColor);
                            line-height: .75rem;
                        }
                    }
                    li:nth-child(3) {
                        width: 30%;
                        text-align: right;
                        padding-right: .2rem;
                        p {
                            padding-top: .1rem;
                            @include sc(.75rem, $fontGreyColor);
                            line-height: .75rem;
                        }
                    }
                    .width20 {
                        width: 35% !important;
                        p {
                            margin-top: .25rem;
                        }
                    }
                    .width30 {
                        width: 30% !important;
                        .bottom {
                            text-align: left;
                            @include sc(.5rem, $fontGreyColor2);
                            line-height: .6rem;
                            padding-top: .1rem;
                        }
                    }
                    .width40 {
                        width: 40% !important;
                    }
                    .width50 {
                        width: 35% !important;
                        p {
                            margin-top: .25rem;
                        }
                    }
                }
                .package-item {
                    .width20 {
                        width: 30% !important;
                        p {
                            margin-top: .25rem;
                        }
                    }
                    .width30 {
                        width: 40% !important;
                    }
                    .width50 {
                        width: 30% !important;
                        p {
                            margin-top: .25rem;
                        }
                    }
                }
                .main-item {
                    li {
                        padding: .5rem 0rem .5rem;
                        img {
                            height: .6rem;
                            margin-right: 0.2rem;
                        }
                        p {
                            @include sc(.65rem, $fontGreyColor);
                            line-height: 0.65rem;
                            span {
                                line-height: 0.65rem;
                            }
                        }
                    }
                    li:first-child {
                        img {
                            height: .55rem;
                            margin-right: 0.2rem;
                        }
                        p {
                            @include sc(.65rem, $fontGreyColor);
                            line-height: 0.65rem;
                            padding-top: .1rem;
                            span {
                                line-height: 0.65rem;
                            }
                        }
                    }
                }
                .index-item {
                    li {
                        padding: .3rem 0rem .5rem;
                    }
                    .width30 {
                        p {
                            margin-top: .3rem;
                            line-height: 0.75rem;
                        }
                    }
                }
            }
            li:last-child {
                border-bottom-width: 0rem;
            }
        }
        .main_item_list:last-child {
            border-bottom: 0.05rem solid $borderColor;
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}
</style>
