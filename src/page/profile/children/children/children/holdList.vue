<template>
    <section class="asset-container">
        <transition name="fade-choose">
            <section class="choice-type-list-container">
                <!-- 我的持仓 -->
                <section class="assethold-container">
                    <asset-hold v-show="currentHoldType ==0" :assetFOFList="assetFOFListData" :cash="cash" :uid="uid" :tradeFlag="tradeFlag" @updateData="updateData">
                    </asset-hold>
                </section>
            </section>
        </transition>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </section>
</template>
<script>
import BScroll from 'better-scroll'
import assetShow from '../../../../../components/common/assetShow'
import assetHold from '../../../../../components/common/assetHold'
import assetPie from '../../../../../components/common/assetPieAllChart'
import alertTip from '../../../../../components/common/alertTip'
import {
    Toast,
    Indicator
} from 'mint-ui'
import {
    REQ_TYPE_DIY_ACCOUNT,
    SOCKET_URL_DIY_ACCOUNT,
    REQ_TYPE_FOF,
    SOCKET_URL_ACCOUNT,
    REQ_TYPE_SIMPLE_FOF,
    SOCKET_URL_FOF_LIST
} from '../../../../../config/const'
import {
    socketBaseUrl
} from '../../../../../config/env'
import {
    assetPieDataNoToken,
    assetDiyIndex,
    assetFOFList,
    getFofChart,
    checkTrade
} from '../../../../../service/getData'
import {
    getToken,
    getAssetFOFList,
    setAssetFOFList,
    setAssetFOFTypeList,
} from '../../../../../store/store'

import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_SYSTEM,
    RESPONSE_CODE_ERROR_TOKEN
} from '../../../../../config/response'

export default {
    components: {
        assetShow,
        assetHold,
        assetPie,
        alertTip,
    },

    data() {
        return {
            currentChoiceType: 'diy', //当前的组合
            currentChoiceName: '自配组合', //当前的组合名称
            currentHoldType: 0, //当前持仓展现形式
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            assetDetail: '', //获取当前页面的用户交易数据
            realData: '', //实时数据
            assetFOFListData: '', //FOF列表数据
            lockReconnect: false, //避免重复发起连接
            conn: null, //socket连接
            fofConn: null, //FOFTypeList socket连接
            fofLockReconnect: false, //避免重复发起连接
            isDestory: false, //是否关闭socket
            cash: 0, //用户的可用现金
            showPie: false, //是否显示饼图
            socketFOFData: '', //fof大类的实时价格的数据
            FOFList: '', //fof大类列表
            uid: '', //用户的id,
            tradeFlag: true, //是否是实时交易
        }
    },
    watch: {
        //主要市场、指数工具切换状态
        changeMarketType: function(value) {

        },
        tradeFlag: function(value) {

            if (this.tradeFlag == true || this.tradeFlag == 'true') {
                this.getSocketFOFDataByType(this);
                this.getSocketHoldFOFData(this);
                this.requestFOFTypeList();
            }
        }
    },

    created() {
        this.initData();
    },

    methods: {
        //初始化获取数据
        initData() {
            this.getIndexData();
        },

        //获取是否返回实时数据的信息
        getCheckTradeData() {
            let handler = this;
            checkTrade(function(ret) {
                handler.responseTrade(ret);
            });
        },

        responseTrade(ret) {
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.tradeFlag = ret.retData.tradeFlag;
                if (this.tradeFlag == true || this.tradeFlag == 'true') {
                    this.getSocketHoldFOFData(this);
                    this.getFOFListData(this);
                    this.getSocketFOFDataByType(this);
                    this.requestFOFTypeList();
                }
                return
            }
        },

        //改变持仓形式，并触发更新数据
        changeHoldShow(type) {
            this.currentHoldType = type;
            if (this.currentHoldType == 1) {
                this.getPieData();
            }
        },

        //获取基础数据
        getIndexData() {
            Indicator.open();
            let handler = this;
            assetDiyIndex(0, function(ret) {
                handler.responseIndex(ret);
            });
        },


        //获取FOF列表和个人自配资产信息
        getSocketHoldFOFData(handler) {

            if (window["WebSocket"]) {
                try {
                    handler.conn = new WebSocket(SOCKET_URL_DIY_ACCOUNT);
                    handler.conn.onopen = function() {
                        // console.log("websocket send");
                        if (handler.conn.readyState === 1) {
                            handler.conn.send('type:' + REQ_TYPE_DIY_ACCOUNT + "&uid:" + handler.uid);
                        } else {
                            handler.reconnectHoldFOFData();
                        }
                    };
                    handler.conn.onclose = function(evt) {
                        // console.log("websocket close");
                        handler.reconnectHoldFOFData();
                    };
                    handler.conn.onmessage = function(evt) {
                        try {
                            if (evt.data) {
                                let data = JSON.parse(evt.data);
                                handler.assetFOFListData = data.fofArr;
                                handler.realData = data;
                                handler.cash = data.cash;
                                handler.assetPieData = data.pieData;
                            }
                        } catch (e) {

                        }
                    };
                } catch (e) {}

            } else {}
        },

        //如果socket连接中断，每隔2s重试连接
        reconnectHoldFOFData() {
            let handler = this;
            if (handler.lockReconnect) return;
            if (handler.isDestory) return;
            handler.lockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            setTimeout(function() {
                handler.getSocketHoldFOFData(handler);
                handler.lockReconnect = false;
            }, 5000);
        },

        responseIndex(ret) {
            //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
            Indicator.close();
            let response = responseResult(this, ret, 3, 3);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.assetDetail = ret.retData;
                this.cash = this.assetDetail.cash;
                this.assetFOFListData = ret.retData.fofList;
                if (this.tradeFlag == true || this.tradeFlag == 'true') {

                    // this.getRealPageData(this);
                    this.getCheckTradeData();
                    this.uid = ret.retData.uid;
                    if (getAssetFOFList) {
                        this.assetFOFListData = JSON.parse(data);
                        this.realData = JSON.parse(data);
                    }
                }
                return
            }
        },

        //获取FOF类型列表 
        requestFOFTypeList() {

            let handler = this;
            assetFOFList(function(ret) {
                handler.responseFOFTypeList(ret);
            });
        },

        responseFOFTypeList(ret) {
            let response = responseResult(this, ret, 1, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                //存储fof类型列表
                setAssetFOFTypeList(ret.retData.list);
            }
        },

        //获取FOF类型的socket数据
        getSocketFOFDataByType(handler) {
            if (window["WebSocket"]) {
                try {
                    handler.fofConn = new WebSocket(SOCKET_URL_FOF_LIST);
                    handler.fofConn.onopen = function() {
                        if (handler.fofConn.readyState === 1) {
                            handler.fofConn.send('type:' + REQ_TYPE_SIMPLE_FOF);
                        } else {
                            handler.fofTypeReconnect();
                        }
                    };
                    handler.fofConn.onclose = function(evt) {
                        handler.fofTypeReconnect();
                    };
                    handler.fofConn.onmessage = function(evt) {
                        try {
                            if (evt.data) {
                                let data = JSON.parse(evt.data);
                                handler.socketFOFData = data;
                            }
                        } catch (e) {

                        }
                    };
                } catch (e) {

                }

            } else {

            }
        },

        //如果socket连接中断，每隔5s重试连接
        fofTypeReconnect() {
            let handler = this;
            if (handler.fofLockReconnect) return;
            if (handler.isDestory) return;
            handler.fofLockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            setTimeout(function() {
                handler.getSocketFOFDataByType(handler);
                handler.fofLockReconnect = false;
            }, 5000);
        },

        closeTip() {
            this.showAlert = false;
        },
        closeTrade() {
            this.showSimpleTrade = false;
        },
        closeMTrade() {
            this.showMultipleTrade = false;
        },

        updateData(){
            this.getIndexData();
        }
    },
    destroyed() {
        // setMarketState('main');
        this.isDestory = true;
        try {
            if (this.conn) {
                this.conn.onclose();
                this.conn.close();
            }
            if (this.fofConn) {
                this.fofConn.onclose();
                this.fofConn.close();
            }
        } catch (e) {

        }

    }
}
</script>
<style lang="scss" scoped>
@import '../../../../../style/mixin';
.asset-container {
    .assethold-container {
        margin-top: .5rem;
        .fof-container {
            display: flex;
            background-color: $grey;
            margin: .3rem 0rem;
            padding: .2rem 2.5rem;
            width: 100%;
            margin: auto;
            div {
                flex: 1;
                text-align: center;
                border-right: solid $lineGrey4 .05rem;
                p {
                    padding: .2rem .3rem;
                    @include sc(.65rem, $fontGreyColor2);
                    margin: auto;
                }
                .active {
                    @include sc(.65rem, $white);
                }
            }
            div:last-child {
                border-width: 0px;
            }
        }
    }
}
</style>
