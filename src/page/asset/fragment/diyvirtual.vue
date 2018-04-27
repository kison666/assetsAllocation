<template>
    <section class="asset-container" v-show="isReady ==true && currentTradeType=='virtual' && currentChoiceType=='diy'">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
            <defs>
                <symbol viewBox="0 0 1024 1024" id="tradenode" class="icon">
                    <path d="M644.48 427.008c-2.048 0.192-4.032 0.64-6.144 0.64a85.76 85.76 0 0 1-70.208-134.848l88.128-153.6H120.896a55.424 55.424 0 0 0-55.488 55.424v741.952c0 30.656 24.832 55.424 55.488 55.424h667.392a55.424 55.424 0 0 0 55.488-55.424V427.648h-198.912l-0.32-0.64zM186.176 348.608H385.92a48.512 48.512 0 1 1 0 97.024H186.112a48.512 48.512 0 1 1 0-97.024z m536.96 501.952h-536.96a48.512 48.512 0 1 1 0-97.024h536.96a48.512 48.512 0 1 1 0 97.024z m48.512-224c0 26.752-21.76 48.448-48.512 48.448h-536.96a48.512 48.512 0 1 1 0-97.024h536.96c26.816 0 48.512 21.76 48.512 48.512z m214.784-303.872l0.576-0.832-149.696-259.2h-0.64A57.792 57.792 0 0 0 785.728 32a57.792 57.792 0 0 0-50.816 30.592h-0.704L590.592 312.96a58.048 58.048 0 0 0 47.552 91.264c1.408 0 2.752-0.32 4.16-0.384l0.192 0.384h291.264a58.048 58.048 0 0 0 52.608-81.536zM761.472 135.68a24.256 24.256 0 0 1 48.512 0v102.208a24.256 24.256 0 0 1-48.512 0V135.744z m24.32 215.424a34.624 34.624 0 1 1 0-69.312 34.624 34.624 0 0 1 0 69.312z" fill="#3190e8" p-id="2841"></path>
                </symbol>
                <symbol viewBox="0 0 1024 1024" id="shoppingcart" class="icon">
                    <path d="M818.8416 612.352l148.1216-338.816c2.5856-5.9392 2.0224-12.7744-1.536-18.2016s-9.6-8.6784-16.0768-8.6784l-636.16 0-24.0384-111.5136c-1.92-8.832-9.728-15.1552-18.7648-15.1552l-207.36 0c-10.5984 0-19.2 8.6016-19.2 19.2s8.6016 19.2 19.2 19.2l191.8464 0 119.7312 555.2384c-45.5424 9.8048-79.8208 50.304-79.8208 98.7392 0 55.7312 45.3376 101.0688 101.0688 101.0688s101.0432-45.3376 101.0432-101.0688c0-23.7056-8.5504-45.2608-22.272-62.5152l219.9808 0c-13.7216 17.2544-22.272 38.8096-22.272 62.5152 0 55.7312 45.3376 101.0688 101.0688 101.0688s101.0432-45.3376 101.0432-101.0688c0-55.7312-45.3376-101.0688-101.0432-101.0688-0.8448 0-1.6128 0.2304-2.4576 0.256l0-0.384L413.0816 711.168c-0.0768-0.5376 0.1024-1.0496-0.0256-1.5872l-18.4832-85.7088 406.6816 0C808.8832 623.872 815.7696 619.3664 818.8416 612.352zM395.8784 875.0336c-34.56 0-62.6688-28.1088-62.6688-62.6688 0-34.56 28.1344-62.6688 62.6688-62.6688s62.6432 28.1088 62.6432 62.6688C458.5216 846.9248 430.4128 875.0336 395.8784 875.0336zM836.0704 812.3648c0 34.56-28.1088 62.6688-62.6432 62.6688s-62.6688-28.1088-62.6688-62.6688c0-34.56 28.1344-62.6688 62.6688-62.6688S836.0704 777.8048 836.0704 812.3648zM391.2704 585.472l-69.3248-300.416 598.0672 0-131.328 300.416L391.2704 585.472z" p-id="7857" fill="#3190e8"></path>
                </symbol>
                <symbol xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" id="simple" class="icon">
                    <path d="M362.048 63.808H173.504A109.44 109.44 0 0 0 64 173.312V362.24a109.44 109.44 0 0 0 109.504 109.504h298.432V173.312c0-60.48-49.408-109.504-109.888-109.504z m40.448 276.992v61.888H205.312a72.32 72.32 0 0 1-72.32-72.256V205.504a72.32 72.32 0 0 1 72.32-72.256H330.24a72.32 72.32 0 0 1 72.256 72.256v135.296zM850.56 471.744A109.44 109.44 0 0 0 960 362.24V173.312A109.44 109.44 0 0 0 850.56 63.808h-188.928c-60.48 0-109.568 49.024-109.568 109.504v298.432h298.496zM621.44 340.8V205.504c0-40.064 32.704-72.256 72.32-72.256h124.928a72.32 72.32 0 0 1 72.256 72.256v124.928a72.32 72.32 0 0 1-72.256 72.256H621.44v-61.888zM173.504 552.256A109.44 109.44 0 0 0 64 661.76v188.928a109.44 109.44 0 0 0 109.504 109.504h188.928a109.44 109.44 0 0 0 109.504-109.504V552.256H173.504z m228.992 130.944v135.68a72.32 72.32 0 0 1-72.256 72.256H205.312a72.32 72.32 0 0 1-72.32-72.256v-124.928c0-40.064 32.576-72.32 72.32-72.32h197.12v61.568h0.064zM850.56 552.256H552.064v298.432c0 60.48 49.088 109.504 109.568 109.504h188.928A109.44 109.44 0 0 0 960 850.688V661.76a109.248 109.248 0 0 0-109.44-109.504z m40.384 266.24a72.32 72.32 0 0 1-72.256 72.32H693.76c-40.064 0-72.32-32.64-72.32-72.32v-197.12h197.248c40.064 0 72.256 32.512 72.256 72.192v124.928z" fill="#3190e8" p-id="12431"></path>
                </symbol>
                <symbol xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" id="myTrade" class="icon">
                    <path d="M837.083061 600.949064 837.083061 958.409994 187.063194 958.409994 187.063194 600.949064 122.061206 600.949064 122.061206 1023.40289 902.085048 1023.40289 902.085048 600.949064 837.083061 600.949064ZM512.017875 0.980142 0.80975 546.238045 48.196199 590.660688 512.017875 95.999756 975.839552 590.660688 1023.193499 546.238045 512.017875 0.980142ZM642.012099 893.404098 577.010112 893.404098 577.010112 665.928962 447.006139 665.928962 447.006139 893.404098 382.004152 893.404098 382.004152 600.936066 642.012099 600.936066 642.012099 893.404098ZM512.073128 340.964482C476.224531 340.964482 447.071141 370.113795 447.071141 405.957378 447.071141 441.80096 476.224531 470.950274 512.073128 470.950274 547.954224 470.950274 577.075114 441.80096 577.075114 405.957378 577.075114 370.113795 547.889222 340.964482 512.073128 340.964482ZM512.073128 535.94317C440.375936 535.94317 382.069154 477.644541 382.069154 405.957378 382.069154 334.270213 440.375936 275.971584 512.073128 275.971584 583.770318 275.971584 642.077101 334.270213 642.077101 405.957378 642.077101 477.644541 583.770318 535.94317 512.073128 535.94317" p-id="3045" fill="#e0e0e0"></path>
                </symbol>
            </defs>
        </svg>
        <transition name="fade-choose">
            <section class="choice-type-list-container">
                <asset-show :assetDetail="assetDetail" :realData="realData">
                </asset-show>
                <!-- 下单功能 -->
                <section class="manager-list-container">
                    <ul class="manager-list-ul">
                        <li class="manager-list-li" @click="showSimpleTradePanel()">
                            <p class="icon">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#simple"></use>
                                </svg>
                            </p>
                            <p>单支买入</p>
                        </li>
                        <li class="manager-list-li" @click="showMultipleTradePanel()">
                            <p class="icon">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shoppingcart"></use>
                                </svg>
                            </p>
                            <p>一篮子买入</p>
                        </li>
                    </ul>
                </section>
                <!-- 我的持仓 -->
                <section class="assethold-container">
                    <section class="fof-container">
                        <div>
                            <p :class="{active:currentHoldType ==0}" @click="changeHoldShow(0)">持仓明细</p>
                        </div>
                        <div>
                            <p :class="{active:currentHoldType ==1}" @click="changeHoldShow(1)">持仓总览</p>
                        </div>
                    </section>
                    <asset-hold v-show="currentHoldType ==0" :assetFOFList="assetFOFListData" :cash="cash" :uid="uid" :tradeFlag="tradeFlag" @updateData="updateData">
                    </asset-hold>
                    <asset-pie :assetPieData="assetPieData" :cash="cash" :uid="uid" v-if="currentHoldType ==1" @updateData="updateData">
                    </asset-pie>
                </section>
                <section class="profile-1reTe">
                    <!-- 交易须知 -->
                    <router-link class="myorder" :to="{path: '/asset/fofnotice', query:{}}">
                        <aside>
                            <svg fill="#4aa5f0">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tradenode"></use>
                            </svg>
                        </aside>
                        <div class="myorder-div">
                            <span>交易须知</span>
                            <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                        </div>
                    </router-link>
                </section>
                <section class="profile-1reTe">
                    <!-- 每日盈亏 -->
                    <router-link class="myorder" :to="{path: '/profile/assetdetail', query:{qt:4,t:1,ot:0}}">
                        <aside>
                            <svg fill="#4aa5f0">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#feedback"></use>
                            </svg>
                        </aside>
                        <div class="myorder-div">
                            <span>每日盈亏</span>
                            <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                        </div>
                    </router-link>
                    <!--  -->
                </section>
                <section class="profile-1reTe marginBottom10">
                    <!-- 委托 -->
                    <router-link class="myorder " :to="{path: '/profile/assetdetail', query:{qt:1,t:1,ot:0}}">
                        <aside>
                            <svg fill="#4aa5f0">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#question"></use>
                            </svg>
                        </aside>
                        <div class="myorder-div">
                            <span>查询</span>
                            <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                        </div>
                    </router-link>
                </section>
            </section>
        </transition>
        <transition name="fade-choose">
            <history-income v-if="showHistoryIncome" @closeTrade="closeITrade()" :fofId="fofId"  :fofName="fofName"></history-income>
        </transition>
        <transition name="fade-choose">
            <simple-trade v-if="showSimpleTrade" @closeTrade="closeTrade()" :assetFOFListData="assetFOFListData" :cash="cash" :socketFOFData="socketFOFData" :tradeFlag="tradeFlag"    @showHostoryIncome="showHostoryIncome"></simple-trade>
        </transition>
        <transition name="fade-choose">
            <multiple-trade v-show="showMultipleTrade" @closeMTrade="closeMTrade()" :cash="cash" :showPie="showPie" :socketFOFData="socketFOFData" :tradeFlag="tradeFlag"></multiple-trade>
        </transition>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </section>
</template>
<script>
import BScroll from 'better-scroll'
import assetShow from '../../../components/common/assetShow'
import assetHold from '../../../components/common/assetHold'
import assetPie from '../../../components/common/assetPieAllChart'
import alertTip from '../../../components/common/alertTip'
import {
    Toast,
    Indicator
} from 'mint-ui'
import simpleTrade from './children/simpletrade'
import multipleTrade from './children/multipletrade'
import historyIncome from './children/historyIncome'
import {
    REQ_TYPE_DIY_ACCOUNT,
    SOCKET_URL_DIY_ACCOUNT,
    REQ_TYPE_FOF,
    SOCKET_URL_ACCOUNT,
    REQ_TYPE_SIMPLE_FOF,
    SOCKET_URL_FOF_LIST
} from '../../../config/const'
import {
    socketBaseUrl
} from '../../../config/env'
import {
    assetPieDataNoToken,
    assetDiyIndex,
    assetFOFList,
    getFofChart,
    checkTrade
} from '../../../service/getData'
import {
    getToken,
    getAssetFOFList,
    setAssetFOFList,
    setAssetState,
    getAssetState,
    setAssetDiyInfo,
    getAssetDiyInfo,
    setAssetFOFTypeList,
    getAssetFOFTypeList
} from '../../../store/store'

import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_SYSTEM,
    RESPONSE_CODE_ERROR_TOKEN
} from '../../../config/response'

export default {
    components: {
        assetShow,
        assetHold,
        assetPie,
        alertTip,
        simpleTrade,
        multipleTrade,
        historyIncome
    },
    props: ['currentTradeType', 'currentChoiceType','isLogin'],

    data() {
        return {
            // currentChoiceType: 'diy', //当前的组合
            currentChoiceName: '自配组合', //当前的组合名称
            currentHoldType: 0, //当前持仓展现形式
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            assetPieData: '', //当前总览数据
            showSimpleTrade: false, //是否显示单支买卖FOF面板
            showMultipleTrade: false, //是否显示一篮子买卖FOF面板
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
            canFlag:false,//交易时间是否需要调实时接口
            tradeFlag:false,//是否是实时交易
            dif:-1,//交易倒计时
            uid:'',//用户ID
            isReady:false,//是否显示界面
            showHistoryIncome:false,//是否显示历史收益界面
            fofId:'',//当前选择的fofId
            fofName:'',//当前选择的fof名称
            socketCount:0,//长连接的次数
        }
    },
    watch: {
        //主要市场、指数工具切换状态
        changeMarketType: function(value) {
 
        },
        tradeFlag: function(value) {
             if(value ==true || value == 'true' && this.conn.readyState ==null){
                 this.getSocketFOFDataByType(this);
                 // this.refreshPageData();
             }
             if(this.canFlag == true && value== 'true' && this.fofConn.readyState==null && this.socketCount ==0){
                   
                 this.getSocketHoldFOFData(this);
             }  
        },
        dif: function(value) {
            if (value > 0 && this.tradeFlag == false) {
                this.setTimeUpdateData();
            }
        },
        canFlag: function(value) {
            if (this.tradeFlag == true && value =='true' && this.conn ==null && this.socketCount ==0) {
                this.getSocketHoldFOFData(this);
            }
            if(this.tradeFlag ==true && this.fofConn ==null){
               this.getSocketFOFDataByType(this);
               this.refreshPageData();
            }
        },
        isLogin:function(value){
            if(this.isLogin==true){
                this.initData();
            }
        },
    },

    created() {
        this.initData();
        window.scrollTo(0, 0);
    },

    methods: {
        //初始化获取数据
        initData() {
            if(this.isLogin==true){
                this.getIndexData();
                this.getCheckTradeData();
                this.requestFOFTypeList();
            }
        },

        //改变持仓形式，并触发更新数据
        changeHoldShow(type) {
            this.currentHoldType = type;
            if (this.currentHoldType == 1) {
                this.getPieData();
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
                this.dif = ret.retData.dif;
                return
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


        //获取饼图数据
        getPieData() {
            Indicator.open();
            let handler = this;
            getFofChart(function(ret) {
                handler.response(ret);
            });
        },

        //获取FOF列表和个人自配资产信息
        getSocketHoldFOFData(handler) {
            this.socketCount++;
            if (window["WebSocket"]) {
                try {
                    handler.conn = new WebSocket(SOCKET_URL_DIY_ACCOUNT);
                    handler.conn.onopen = function() {

                        if (handler.conn.readyState === 1) {
                            handler.conn.send('type:' + REQ_TYPE_DIY_ACCOUNT + "&token:" + getToken());
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
                            let data = JSON.parse(evt.data);
                            handler.assetFOFListData = data.fofArr;
                            handler.realData = data;
                            handler.cash = data.usefulAmt;
                            handler.assetPieData = data.pieData;
                            // setAssetDiyInfo(evt.data);
                            Indicator.close();
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
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.isReady = true;
                if(this.conn ==null){
                    this.assetDetail = ret.retData;
                }
                this.cash = this.assetDetail.usefulAmt;
                this.assetFOFListData = ret.retData.fofList;
                this.canFlag= this.assetDetail.canFlag;
                this.uid = this.assetDetail.uid;
                if ((this.tradeFlag == true || this.tradeFlag =='true')  && (this.canFlag ==true || this.canFlag =='true')) {
                    if(this.socketCount ==0){
                        this.getSocketHoldFOFData(this);
                    }
                    if (getAssetFOFList) {
                        this.assetFOFListData = JSON.parse(data);
                        this.realData = JSON.parse(data);
                    }
                }
                return
            } else if (response == RESPONSE_CODE_ERROR_TOKEN || response == RESPONSE_CODE_ERROR_SYSTEM) {
                // setAssetState(0);
                // this.$router.replace({
                //     path: '/login'
                // });
                // this.$router.go(1);
            }
        },

        response(ret) {
            //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
            Indicator.close();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.assetPieData = ret.retData.pieData;
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
            let response = responseResult(this, ret);
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

        //增加倒计时，获取开盘时间倒计时 
        setTimeUpdateData() {
            let handler = this;
            window.setTimeout(function() {
                handler.getSocketFOFDataByType(handler);
                handler.getSocketHoldFOFData(handler);
            }, this.dif * 1000);
        },

        //单支FOF下单
        showSimpleTradePanel() {
            this.showSimpleTrade = true;
        },

        //一篮子FOF下单
        showMultipleTradePanel() {
            this.showMultipleTrade = true;
            this.showPie = true;

        },
        closeTip() {
            this.showAlert = false;
        },
        closeTrade() {
            this.showSimpleTrade = false;
            this.getIndexData();
        },
        closeMTrade() {
            this.showMultipleTrade = false;
            this.getIndexData();
        },
        closeITrade() {
            this.showHistoryIncome = false;
            this.showSimpleTrade = true;
        },
        updateData() {
            this.getIndexData();
        },

        showHostoryIncome(data){
            this.fofId = data[0];
            this.fofName = data[1];
            var strs=this.fofName.split(' ');
            if(strs.length>1){
                this.fofName = strs[0];
            }
            this.showSimpleTrade = false;
            this.showHistoryIncome = true;
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
            console.log(e);
        }

    }
}
</script>
<style lang="scss" scoped>
@import '../../../style/mixin';
.asset-container {
    /*display: flex;*/
    flex: 1;
    overflow-y: hidden;
    position: relative;
    .choice-type-list-container {
        min-height: 5rem;
    }
    .activity_show {
        display: block;
    }
    .placeorder-container {
        display: flex;
        background-color: $grey;
        margin: .3rem 0rem;
        padding: .4rem;
        div {
            flex: 1;
            text-align: center;
            p {
                border: solid $lineGrey3 0.05rem;
                padding: .2rem .3rem;
                width: 5.5rem;
                @include sc(.6rem, $fontColor);
                margin: auto;
            }
            .active {
                background-color: $blue;
                border-color: $blue;
            }
        }
    }
    .assethold-container {
        margin-bottom: 2rem;
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
    .manager-list-container {
        background-color: $grey;
        margin-bottom: .2rem;
        .manager-list-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            padding: 0.3rem 0.2rem;
            border-top: solid 0.05rem $grey1;
        }
        .manager-list-li {
            float: left;
            width: 45%;
            margin-top: 0.1rem;
            text-align: center;
            p {
                float: left;
                @include sc(.65rem, $fontColor);
                text-align: center;
            }
            img {
                width: 1.2rem;
                margin: auto;
            }
            .icon {
                @include wh(1rem, 1rem);
                margin: auto;
                margin-bottom: 0.2rem;
                margin-right: 0.2rem;
                margin-left: 20%;
                svg {
                    @include wh(100%, 100%);
                }
            }
        }
        .manager-list-li:last-child {
            width: 55%;
        }
    }
    .profile-1reTe {
        margin-bottom: .3rem;
        background: $grey;
        .myorder {
            padding-left: 1.6rem;
            display: flex;
            align-items: center;
            aside {
                @include wh(.9rem, .9rem);
                margin-left: -.866667rem;
                margin-right: .266667rem;
                display: flex;
                align-items: center;
                svg {
                    @include wh(100%, 100%);
                }
            }
            .myorder-div {
                width: 100%;
                border-bottom: 1px solid $borderColor;
                padding: .433333rem .266667rem .433333rem 0;
                @include sc(.7rem, #333);
                display: flex;
                justify-content: space-between;
                position: relative;
                span {
                    display: block;
                }
                .right-content {
                    @include sc(.55rem, #e0e0e0);
                    @include cr;
                    top: 0.55rem;
                    /*display: none;*/
                }
                .circle-content {
                    width: 10px;
                    height: 10px;
                    @include cr;
                    right: 4%;
                    background-color: #EE6363;
                    -webkit-border-radius: 5px;
                    /*display: none;*/
                }
                .right-activity {
                    display: block;
                }
                .myorder-divsvg {
                    margin-top: 0.1rem;
                    @include wh(.46667rem, .466667rem);
                    svg {
                        @include wh(100%, 100%);
                    }
                }
            }
        }
    }
    .marginBottom10 {
        margin-bottom: 2rem;
    }
}
</style>
