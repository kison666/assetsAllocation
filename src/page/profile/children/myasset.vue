<template>
    <div class="market_container">
        <head-top signin-up='home' head-title="我的资产" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <transition name="fade-choose">
                <section class="main-container">
                    <section class="menu-container" v-show="changeMarketType =='virtual'">
                        <div class="choice-item">
                            <span class="info-circle">模</span>
                            <p>智能组合</p>
                        </div>
                        <section class="choice-type-list-container">
                            <asset-show :assetDetail="commendDetail" :realData="commendRealData">
                            </asset-show>
                            <asset-menu :type="t" :opType="ot" :cType="cType">
                            </asset-menu>
                        </section>
                    </section>
                    <section class="menu-container diy-container" v-show="changeMarketType =='virtual'">
                        <div class="choice-item">
                            <span class="info-circle">模</span>
                            <p>自配组合</p>
                        </div>
                        <section class="choice-type-list-container">
                            <asset-show :assetDetail="diyDetail" :realData="diyRealData">
                            </asset-show>
                            <asset-menu :type="t1" :opType="ot">
                            </asset-menu>
                        </section>
                    </section>
                    <section class="menu-container" v-show="changeMarketType =='real'">
                        <div class="choice-item">
                            <span class="info-circle info-circle-real">实</span>
                            <p>智能组合</p>
                        </div>
                        <section class="choice-type-list-container">
                            <asset-show :assetDetail="commendDetail" :realData="commendRealData">
                            </asset-show>
                            <asset-menu :type="t" :opType="ot" :accountId="accountId" :cType="cType">
                            </asset-menu>
                        </section>
                    </section>
                </section>
            </transition>
        </section>
    </div>
</template>
<script>
import headTop from '../../../components/header/head'
import BScroll from 'better-scroll'
import assetQuery from '../../../components/common/assetQuery'
import assetMenu from '../../../components/common/assetMenu'
import assetShow from '../../../components/common/assetShow'
import { getToken } from '../../../store/store'
import {
    REQ_TYPE_ASSET_TOTAL,
    SOCKET_URL_VIRTUAL_ACCOUNT
} from '../../../config/const'
import {
    socketBaseUrl
} from '../../../config/env'
import {
    Toast,
    Indicator
} from 'mint-ui'
import {
    assetMyVirtual,
    checkTrade,
    tradeRecIndex,
    tradeGetAccount
} from '../../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_SYSTEM,
    RESPONSE_CODE_ERROR_TOKEN
} from '../../../config/response'

export default {
    components: {
        headTop,
        assetQuery,
        assetMenu,
        assetShow
    },

    data() {
        return {
            changeMarketType: 'virtual', //切换资金类型
            mainMarket: '', //市场指数
            mainMarketDetail: '', //细分市场指数
            choiceShow: 'false', //控制组合类型选择框的显示
            currentChoiceType: 'commend', //当前的组合
            currentChoiceName: '推荐组合', //当前的组合名称
            t: 0, //类型-推荐组合
            ot: 0, //模拟盘，实盘
            t1: 1, //类型-自配组合
            commendDetail: '', //推荐组合数据
            diyDetail: '', //自配组合数据
            lockReconnect: false, //避免重复发起连接
            conn: null, //socket连接 
            isDestory: false, //是否关闭socket
            uid:'',//用户的ID
            tradeFlag:false,//是否是实时交易
            canFlag:false,//是否获取交易数据
            commendRealData: '', //模拟盘推荐组合实时数据 
            diyRealData: '', //模拟盘自配组合实时数据
            accountId:'',//实盘用户ID
            isType:true,
            cType:'',//推荐组合类型，稳健型等           
        }
    },

    watch: {
        //主要市场、指数工具切换状态
        changeMarketType: function(value) {
            if (value == 'virtual') {
                this.ot = 0;
            } else if ('real') {
                this.ot = 1;
            }
        },

        currentChoiceType: function(value) {
            if (value == 'commend') {
                this.t = 0;
            } else if ('diy') {
                this.t = 1;
            }
        },

        tradeFlag: function(value) {
            this.getSocketDataByType();
        },

        canFlag: function(value) {
            this.getSocketDataByType();
        },

        uid: function(value) {
            this.getSocketDataByType();
        },

    },

    created() {
        this.changeMarketType = this.$route.query.type;
        if(this.changeMarketType =='virtual'){
             this.$route.meta.title = '模拟盘资产'; 
        }else{
            this.$route.meta.title = '实盘资产'; 
        }
        this.initData();
    },

    methods: {
        //初始化获取数据
        initData() {
            if(this.changeMarketType == 'virtual'){
                this.getVirtualData();
                this.getCheckTradeData();
            }else if(this.changeMarketType == 'real'){
                this.getTradeAccountData();
                // this.getRealData();
            }
        },

        //获取页面展示数据
        getVirtualData() {
            Indicator.open();
            // let ret = await assetIndex(this.currentTradeId);
            let handler = this;
            assetMyVirtual(function(ret) {
                handler.responseVirtual(ret);
            });
        },

        responseVirtual(ret) {
            Indicator.close();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.commendDetail = ret.retData.rec;
                this.diyDetail = ret.retData.diy;
                this.cType = ret.retData.rec.type;
                this.uid = ret.retData.rec.uid;
                this.canFlag = ret.retData.canFlag;
                return
            }else if (response == RESPONSE_CODE_ERROR_TOKEN || response == RESPONSE_CODE_ERROR_SYSTEM) {
                this.$router.push({
                    path: '/login'
                });
                this.$router.go(1);
            } 
        },



        //获取是否返回实时数据的信息
        getCheckTradeData() {
            // this.showLoading = true;
            // let ret = await assetIndex(this.currentTradeId);
            let handler = this;
            checkTrade(function(ret) {
                handler.responseTrade(ret);
            });

        },

        responseTrade(ret) {
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.tradeFlag = ret.retData.tradeFlag;
                return
            }
        },

        //获取个人总资产信息
        getSocketAssetTotalData(handler) {
            if (window["WebSocket"]) {
                try {
                    handler.conn = new WebSocket(SOCKET_URL_VIRTUAL_ACCOUNT);
                    handler.conn.onopen = function() {
                        // console.log("websocket open");
                        if (handler.conn.readyState === 1) {
                            handler.conn.send('type:' + REQ_TYPE_ASSET_TOTAL + "&token:" + getToken());
                        } else {
                            handler.reconnectAssetTotalData();
                        }
                    };
                    handler.conn.onclose = function(evt) {
                        // console.log("websocket close");
                        handler.reconnectAssetTotalData();
                    };
                    handler.conn.onmessage = function(evt) {
                        try {
                            let data = JSON.parse(evt.data);
                            handler.commendRealData = data.rec;
                            handler.diyRealData = data.diy;
                            // setAssetDiyInfo(evt.data);
                            Indicator.close();
                        } catch (e) {

                        }
                    };
                } catch (e) {
                    console.log(e);
                }

            } else {}
        },   

        //如果socket连接中断，每隔5s重试连接
        reconnectAssetTotalData() {
            let handler = this;
            if (handler.lockReconnect) return;
            if (handler.isDestory) return;
            handler.lockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            setTimeout(function() {
                handler.getSocketAssetTotalData(handler);
                handler.lockReconnect = false;
            }, 5000);
        },

        //根据条件获取socket数据
        getSocketDataByType() {
             if(this.uid !='' && this.tradeFlag == true && this.canFlag == true){
                   this.getSocketAssetTotalData(this);  
             }
        }, 

        //获取实盘页面展示数据
        getRealData() {
            Indicator.open();
            let handler = this;
            tradeRecIndex(this.type,this.accountId,function(ret) {
                handler.responseReal(ret);
            });
        },

        responseReal(ret) {
            Indicator.close();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.commendDetail = ret.retData;
                return
            }else if (response == RESPONSE_CODE_ERROR_TOKEN || response == RESPONSE_CODE_ERROR_SYSTEM) {
                this.$router.push({
                    path: '/login'
                });
                this.$router.go(1);
            } 
        },

        //获取实盘账户信息
        getTradeAccountData() {
            let handler = this;
            tradeGetAccount(function(ret) {
                handler.responseBase(ret);
            });
        },

        responseBase(ret) {
            //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
            Indicator.close();
            let response = responseResult(this, ret,1,1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.accountId = ret.retData.accountList[0].accountId;
                this.type = ret.retData.accountList[0].type;
                this.cType = ret.retData.accountList[0].type;
                if(ret.retData.accountList[0].type>=0){
                    this.isType=true;
                }else{
                    this.isType = false;
                }
                this.getRealData();
                return;
            } else if (response == RESPONSE_CODE_ERROR_TOKEN) {
                // setAssetState(0);
                this.$router.push({
                    path: '/login'
                });
                this.$router.go(1);
            }
        },

    },
    destroyed() {
        this.isDestory = true;
        try {
            if (this.conn) {
                this.conn.onclose();
                this.conn.close();
            }
        } catch (e) {
            console.log(e);
        }

    }

}
</script>
<style lang="scss" scoped>
@import '../../../style/mixin';
.menu {
    padding-top: $containerTop;
}

.change_market_type {
    display: flex;
    background-color: $grey4;
    padding: .4rem 0 .4rem;
    margin-bottom: .4rem;
    div {
        flex: 1;
        text-align: center;
        span {
            @include sc(.7rem, #999);
            padding: .2rem .1rem;
            border-bottom: 0.08rem solid transparent;
        }
        .activity_show {
            color: #fff;
            border-color: #fff;
        }
    }
}

.main-container {
    padding-bottom: 2rem;
}

.menu-container {
    /*display: flex;*/
    overflow-y: hidden;
    position: relative;
    .choice-item {
        padding: 0.2rem;
        height: 1.6rem;
        @include sc(.7rem, $fontColor);
        background-color: $grey;
        p {
            width: 75%;
            float: left;
            margin-top: 0.1rem;
            padding-left: 0.6rem;
            text-align: left;
            height: 100%;
        }
        .arrow-down {
            margin-top: 0.2rem;
            margin-right: 0.3rem;
            float: right;
            @include wh(.8rem, .8rem);
            svg {
                @include wh(100%, 100%);
            }
        }
        .info-circle {
            width: 1.2rem;
            height: 1.2rem;
            background-color: $blue;
            -moz-border-radius: 0.6rem;
            -webkit-border-radius: 0.6rem;
            border-radius: 0.6rem;
            padding-top: 0.16rem;
            float: left;
            text-align: center;
            font-size: 0.6rem;
            margin-left: 0.5rem;
        }
        .info-circle-real {
            background-color: $red;
        }
    }
    .choice-type-list {
        position: absolute;
        z-index: 100;
        width: 100%;
        display: flex;
        top: 1.6rem;
        left: 0;
        border-top: 0.025rem solid $lineGrey4;
        background-color: $grey1;
        padding-bottom: .2rem;
        .sort-list-container {
            width: 100%;
            .sort-list-li {
                height: 2rem;
                display: flex;
                align-items: center;
                p {
                    line-height: 2rem;
                    flex: auto;
                    text-align: left;
                    text-indent: 0.25rem;
                    font-size: .65rem;
                    border-bottom: 0.025rem solid $lineGrey4;
                    @include fj;
                    align-items: center;
                    padding-left: 0.8rem;
                }
                .sort_select {
                    color: $blue;
                }
            }
        }
    }
    .choice-type-list-container {
        min-height: 5rem;
    }
    .activity_show {
        display: block;
    }
}

.diy-container {
    margin-top: 1rem;
}
</style>
