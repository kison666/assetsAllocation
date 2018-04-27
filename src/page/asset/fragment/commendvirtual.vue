<template>
    <section class="asset-container" v-show="isReady ==true && currentTradeType=='virtual' && currentChoiceType=='commend'">

        <transition name="fade-choose">
            <section class="choice-type-list-container">
                <asset-show :assetDetail="assetDetail" v-show="isLogin==true && isShowAsset ==true" :realData="realData" :choseFlag="isType">
                </asset-show>
                <section class="manager-list-container" v-show="isLogin==true" :class="{marginShow:isShowAsset !=true}">
                    <ul class="manager-list-ul">
                        <li class="manager-list-li" @click="preChangeAssetType()">
                            <p class="icon" v-if="isType==false || canCancelOrder==true">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#changeHoldGrey"></use>
                                </svg>
                            </p>
                            <p class="icon" v-else>
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#changeHold"></use>
                                </svg>
                            </p>
                            <p :class="{no_active:isType==false || canCancelOrder==true}">更改组合</p>
                        </li>
                        <li class="manager-list-li" @click="refundClick()">
                            <p class="icon" v-if="isType == false || isType == '' || canCancelOrder==true">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sellOutGrey"></use>
                                </svg>
                            </p>
                            <p class="icon" v-else>
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sellOut"></use>
                                </svg>
                            </p>
                            <p :class="{no_active:isType == false || isType == '' || canCancelOrder==true}">卖出</p>
                        </li>
                        <li class="manager-list-li">
                            <router-link :to="{path: '/profile/assetdetail', query:{qt:1,t:0,ot:0,ct:currentAssetType}}">
                                <p class="icon">
                                    <svg fill="#bbb">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#query"></use>
                                    </svg>
                                </p>
                                <p>查询</p>
                            </router-link>
                        </li>
                        <li class="manager-list-li" @click="gotoRealTrade()">
                            <p class="icon">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#myTrade"></use>
                                </svg>
                            </p>
                            <p>我的实盘</p>
                        </li>
                    </ul>
                </section>
                <!-- 组合包含的内容 -->
                <div class="title-container">
                    <p class="asset-name" v-if="isType == true && isChange =='false' && isShow==true"><span v-show="isType == true && isChange =='false'" class="tip">您已选择</span><span :class="{blue: currentAssetType ==0,green: currentAssetType ==1,gold: currentAssetType ==2,red: currentAssetType ==3}" v-cloak>{{currentAssetName}}</span>组合， 近一年收益：<span v-cloak>{{rate}}</span></p>
                    <p v-else-if="isShow==false"></p>
                    <p class="asset-name" v-else><span :class="{blue: currentChoiceAssetType ==0,green: currentChoiceAssetType ==1,gold: currentChoiceAssetType ==2,red: currentChoiceAssetType ==3}" v-cloak>{{currentChoiceAssetName}}</span>组合， 近一年收益：<span v-cloak>{{rate}}</span></p>
                    <p class="asset-income">最大回撤：<span v-cloak>{{retraceRate}}</span>，波动率：<span v-cloak>{{vol}}%</span></p>
                    <div class="trade-notice">
                        <router-link :to="{path: '/asset/notice', query:{virType:currentChoiceAssetType}}" class="notice">
                            <span>交易须知</span>
                        </router-link>
                    </div>
                </div>
                <asset-pie :currentTradeType="currentTradeType" :currentAssetType="currentChoiceAssetType" :assetPieData="assetPieData" :isLogin="isLogin" v-if="currentTradeType=='virtual' && currentChoiceType=='commend'">
                </asset-pie>
                <div class="type-choice-container">
                    <div v-show="isType == false || isChange == 'true'">
                        <ul class="type-cursor-ul">
                            <li class="type-cursor-li">
                                <div class="cursor-icon">
                                    <svg class="icon-mobile" fill="#fff" :class="{cursor_activity:currentChoiceAssetType ==0}">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cursor"></use>
                                    </svg>
                                </div>
                            </li>
                            <li class="type-cursor-li">
                                <div class="cursor-icon">
                                    <svg class="icon-mobile" fill="#fff" :class="{cursor_activity:currentChoiceAssetType ==1}">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cursor"></use>
                                    </svg>
                                </div>
                            </li>
                            <li class="type-cursor-li">
                                <div class="cursor-icon">
                                    <svg class="icon-mobile" fill="#fff" :class="{cursor_activity:currentChoiceAssetType ==2}">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cursor"></use>
                                    </svg>
                                </div>
                            </li>
                            <li class="type-cursor-li">
                                <div class="cursor-icon">
                                    <svg class="icon-mobile" fill="#fff" :class="{cursor_activity:currentChoiceAssetType ==3}">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cursor"></use>
                                    </svg>
                                </div>
                            </li>
                        </ul>
                        <ul class="type-choice-ul">
                            <li class="type-choice-li" :class="{type_activity:currentChoiceAssetType ==0}" @click="changeAssetType(0,'保守型')">
                                <span>保守型</span>
                            </li>
                            <li class="type-choice-li" :class="{type_activity:currentChoiceAssetType ==1}" @click="changeAssetType(1,'稳健型')">
                                <span>稳健型</span>
                            </li>
                            <li class="type-choice-li" :class="{type_activity:currentChoiceAssetType ==2}" @click="changeAssetType(2,'进取型')">
                                <span>进取型</span>
                            </li>
                            <li class="type-choice-li" :class="{type_activity:currentChoiceAssetType ==3}" @click="changeAssetType(3,'激进型')">
                                <span>激进型</span>
                            </li>
                        </ul>
                        <div v-show="isChange =='false'" class="confirm-container" @click="getConfirmChangeAssetType(0)" :class="{active:canCancelOrder==false}">确定选择</div>
                        <div v-show="isChange =='true'" class="margin-top-20">
                            <ul class="type-change-ul">
                                <li class="type-change-li" @click="cancelChangeAssetType">
                                    <span>取消</span>
                                </li>
                                <li class="type-change-li">&nbsp;</li>
                                <li class="type-change-li active" @click="getConfirmChangeAssetType(1)">
                                    <span>确定</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--                     <div v-show="isType == true && isChange == 'false'">
                        <ul class="type-change-ul">
                            <li class="type-change-li">
                                <span>改为其它风格</span>
                            </li>
                            <li class="type-change-li">&nbsp;</li>
                            <li class="type-change-li">
                                <router-link to='/user/index' class="notice">
                                    <span>申请实盘交易</span>
                                </router-link>
                            </li>
                        </ul>
                    </div> -->
                    <div class="risk-test">
                        <router-link :to='riskUrl'>
                            <span>风险测评</span>
                            <p>{{risk}}</p>
                        </router-link>
                    </div>
                </div>
            </section>
        </transition>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <alert-multi-tip v-if="showMAlert" :showHide="showMAlert" @closeTip="closeMTip" :alertText="alertMText" @confrimTip="confrimTip"></alert-multi-tip>
        <transition name="waiting">
            <waiting v-show="showWaiting"></waiting>
        </transition>
    </section>
</template>
<script>
import BScroll from 'better-scroll'
import assetShow from '../../../components/common/assetShow'
import assetMenu from '../../../components/common/assetMenu'
import assetPie from '../../../components/common/assetPieChart'
import waiting from '../../../components/common/waiting'
import alertTip from '../../../components/common/alertTip'
import alertMultiTip from '../../../components/common/alertMultiTip'
import {
    setVirualChoiceType,
    getVirualChoiceType,
} from '../../../store/store'
import {
    Toast,
    Indicator
} from 'mint-ui'
import {
    REQ_TYPE_ACCOUNT,
    SOCKET_URL_ACCOUNT
} from '../../../config/const'
import {
    assetAddType,
    assetIndex,
    assetPieData,
    assetPieDataNoToken,
    myCommendSell,
    myChangePostion,
    checkTrade,
    commendOrderList
} from '../../../service/getData'
import {
    getToken
} from '../../../store/store'
import {
    mapState,
    mapActions
} from 'vuex'

import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_SYSTEM,
    RESPONSE_CODE_ERROR_TOKEN,
} from '../../../config/response'
export default {
    components: {
        assetShow,
        assetMenu,
        assetPie,
        waiting,
        alertTip,
        alertMultiTip
    },
    props: ['currentTradeType', 'currentChoiceType'],

    data() {
        return {
            // currentTradeType: 'virtual', //当前交易类型
            currentTradeId: '0', //当前交易类型ID
            // currentChoiceType: 'commend', //当前的组合
            currentChoiceId: '0', //当前的类型ID
            currentChoiceName: '推荐组合', //当前的组合名称
            currentAssetType: 0, //当前组合
            type: -1, //当前组合
            currentAssetName: '保守型', //当前组合名称
            currentChoiceAssetType: 0, //当前用户配置的组合
            currentChoiceAssetName: '保守型', //当前用户配置的组合名称
            risk: '未测评', //测评类型
            riskUrl: '/login', //测评结果链接
            isChange: 'false', //当前操作是否更改过配置类型
            rate: '--', //收益率
            vol: '--', //波动率
            retraceRate: '1.1', //回撤
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            showMAlert: false, //显示M提示组件
            alertMText: null, //提示M的内容
            currentAlertHold: 0, //当前对话框的拥有者
            showWaiting: false, //显示加载动画
            isType: false, //空代表用户未配置过仓位
            assetPieData: '', //当前饼图数据
            assetDetail: '', //获取当前页面的用户交易数据
            showLoading: false, //显示加载动画
            isChangeOther: false, //是否更改为其它风格
            isLogin: false, //是否游客模式
            realData: '', //实时数据
            lockReconnect: false, //避免重复发起连接
            conn: null, //socket连接
            isDestory: false, //socket是否关闭
            isShowAsset: true, //是否显示仓位信息
            canFlag:false,//交易时间是否需要调实时接口
            tradeFlag:false,//是否是实时交易
            dif:-1,//交易倒计时
            uid:'',//用户ID
            isReady:false,//是否显示界面
            monthFlag:false,//是否能够更改组合或者配置组合
            canCancelOrder:false,//是否用可撤单
            canType:false,
            isReFresh:true,//是否需要刷新实时数据
            isShow:false,//是否展示
            isSell:false,//是否是卖出之后再买入
            isFirstChange:''//当前是否为第一次配仓位0、是，1、不是
        }
    },
    created() {
        this.initData();
        this.isShow = true;
        if(getVirualChoiceType()!=null && getVirualChoiceType()!='null'){
            this.currentChoiceAssetType=getVirualChoiceType(); 
            this.currentAssetType=getVirualChoiceType(); 
            setVirualChoiceType(null);
        }
    },

    watch: {
        realData: function(value) {
            if (value) {
                this.realData = value;
            }
        },
        tradeFlag: function(value) {
            if ((value == true || value=='true' ) && (this.canFlag ==true || this.canFlag=='true') && this.conn ==null && this.isType ==true) {
                if(this.isReFresh==true){
                    this.getRealPageData(this);
                }else{
                    this.isReFresh = true;
                }
            
            } 
        },
        dif: function(value) {
            if (value > 0 && (this.tradeFlag == false || this.tradeFlag =='false')) {
                this.setTimeUpdateData();
            }
        },
        canFlag:function(value){
            if ((value == true || value =='true') && (this.tradeFlag ==true || this.tradeFlag =='true' ) && this.conn ==null && this.isType ==true) {
                if(this.isReFresh==true){
                    this.getRealPageData(this);
                }else{
                    this.isReFresh = true;
                }
            } 
        },
        currentTradeType:function(value){
            if(this.currentTradeType=='virtual' && this.currentChoiceType=='commend'){
                if (this.isType ==true) {
                    this.getPieData();
                } else {
                    this.getPieDataNoToken();
                }
            }
        },

        currentChoiceType:function(value){
            if(this.currentTradeType=='virtual' && this.currentChoiceType=='commend'){
                if (this.isType ==true) {
                    this.getPieData();
                } else {
                    this.getPieDataNoToken();
                }
            }
        },

    },
    methods: {
        //初始化获取数据
        initData() {
             this.getPageData();
             this.getCheckTradeData();
             this.canType = false;
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


        //获取页面展示数据
        getPageData() {
            Indicator.open();
            this.getCommendOrderData();
            // let ret = await assetIndex(this.currentTradeId);
            let handler = this;
            assetIndex(0, function(ret) {
                handler.responsePage(ret);
            });

        },

        //获取页面实时数据
        getRealPageData(handler) {
            try {
                if (this.conn) {
                    this.conn.onclose();
                    this.conn.close();
                }
           } catch (e) {
            // console.log(e);
           }
            if (window["WebSocket"]) {
                try {
                    handler.conn = new WebSocket(SOCKET_URL_ACCOUNT);
                    handler.conn.onopen = function() {
                        // console.log("websocket send");
                        if (handler.conn.readyState === 1) {
                            handler.conn.send('type:' + REQ_TYPE_ACCOUNT + "&token:" + getToken());
                        } else {
                            handler.reconnect();
                        }
                    };
                    handler.conn.onclose = function(evt) {
                        //onclose reconnect
                        handler.reconnect();
                    };
                    handler.conn.onmessage = function(evt) {
                        let data = null;
                        try {
                            if (evt.data) {
                                data =JSON.parse(evt.data);
                            } else {
                                return;
                            }
                        } catch (e) {
                            // console.log(e);
                            data = null;
                            return;
                        }
                        if (data != null) {
                            handler.realData = JSON.parse(evt.data);
                        }
                    };
                } catch (e) {

                }

            } else {
                // console.log("window not support websocket");
            }
        },

        //如果socket连接中断，每隔5s重试连接
        reconnect() {
            let handler = this;
            if (handler.lockReconnect) return;
            if (handler.isDestory) return;
            handler.lockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            setTimeout(function() {
                handler.getRealPageData(handler);
                handler.lockReconnect = false;
            }, 5000);
        },

        //获取饼图数据
        getPieData() {
            // Indicator.open();
            let handler = this;
            assetPieData(this.currentAssetType, function(ret) {
                handler.response(ret);
            });

        },

        //游客模式获取饼图数据
        getPieDataNoToken() {
            // Indicator.open();
            let handler = this;
            assetPieDataNoToken(this.currentChoiceAssetType, function(ret) {
                // console.log("success=" + data);
                handler.responseNoToken(ret);
            });

        },

        //推荐仓位卖出 
        requestCommendSell() {
            this.showWaiting = true;
            let handler = this;
            myCommendSell(function(ret) {
                handler.responseMyCommSell(ret);
            });
        },

        responseMyCommSell(ret) {
            this.hideWaiting();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_ERROR_SYSTEM) {

                return;
            } else if (response == RESPONSE_CODE_SUCCESS) {
                
                if(this.isFirstChange==1){
                     this.isReFresh=false;
                }
                this.isSell = true;
                this.getPageData();

                Toast({
                    message: '卖出提交成功',
                    position: 'middle',
                    duration: 4000,
                    iconClass: 'mint-toast-icon mintui mintui-success'
                });
                this.closeSocket();

            } else if (response == RESPONSE_CODE_ERROR_TOKEN) {

            }
        },

        response(ret) {
            Indicator.close();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_ERROR_SYSTEM) {

                return;
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.assetPieData = ret.retData;
                this.rate = this.assetPieData.detail.rate;
                this.vol = this.assetPieData.detail.vol;
                this.retraceRate = this.assetPieData.detail.drawDown;
                this.isLogin = true;

            } else if (response == RESPONSE_CODE_ERROR_TOKEN) {

            }
        },

        responseNoToken(ret) {
            Indicator.close();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.assetPieData = ret.retData;
                this.rate = this.assetPieData.detail.rate;
                this.vol = this.assetPieData.detail.vol;
                this.retraceRate = this.assetPieData.detail.drawDown;
                return
            }
        },

        responsePage(ret) {
            Indicator.close();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_ERROR_SYSTEM) {

                //token失效则切换游客模式
                this.isReady = true;
                this.getPieDataNoToken();
                return;
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.isReady = true;
                this.assetDetail = ret.retData;
                this.risk = this.assetDetail.risk;
                this.riskUrl = this.assetDetail.returnUrl;
                this.currentAssetType = this.assetDetail.type;
                this.type=this.assetDetail.type;
                this.currentChoiceAssetType = this.assetDetail.type;
                let typeNameArray = ['保守型', '稳健型', '进取型', '激进型'];
                this.currentAssetName = typeNameArray[this.currentAssetType];
                this.currentChoiceAssetName = typeNameArray[this.currentAssetType];
                this.isType = this.assetDetail.choseFlag;
                this.canFlag= this.assetDetail.canFlag;
                this.isLogin = true;
                this.uid = this.assetDetail.uid;
                this.monthFlag = ret.retData.monthFlag;
                this.isShow = true;
                if (this.isType ==true) {
                    this.getPieData();
                } else {
                    this.getPieDataNoToken();
                }
                
                if(this.isSell==true){
                    this.getRealPageData(this);
                }
                if (this.tradeFlag == true  && this.canFlag ==true && this.isType ==true) {
                    this.lockReconnect = true;
                    if(isReFresh==true){
                       this.getRealPageData(this);
                    }else{
                        isReFresh =true;
                    }
                }
                return
            } else if (response == RESPONSE_CODE_ERROR_TOKEN) {
                //token失效则切换游客模式
                this.isReady = true;
                this.getPieDataNoToken();
                return
            }
        },


        //改变组合类型，触发更新饼图
        changeAssetType(assetType, assetName) {
            this.currentChoiceAssetType = assetType;
            this.currentChoiceAssetName = assetName;
            this.getPieDataNoToken();

        },

        //确定更改组合类型，触发用户的配置类型数据
        getConfirmChangeAssetType(flag) {
            this.isFirstChange = flag;
            this.isShowAsset = true;
            if (this.isLogin == false) {
                this.$router.push({
                    path: '/login'
                });
                this.$router.go(1);
                return;
            }

            if(this.canCancelOrder ==true){
                 //monthFlag为true则不能进行交易
                Toast({
                    message: "您有委托单待处理，请先撤单!",
                    position: 'middle',
                    duration: 4000
                });
                return;
            }

            if(this.monthFlag == true && flag==0){
                this.currentAlertHold = 3;
                this.showMAlert = true;
                this.alertMText ="调仓前五个交易日内，可提交委托申请，调仓日成交。";
                return ;
            }
            
            // if(this.monthFlag ==true){
            //      //monthFlag为true则不能进行交易
            //     Toast({
            //         // message: "您有委托单待处理，请先撤单!",
            //         message: "月底调仓期间不能进行配置和更改组合!",
            //         position: 'middle',
            //         duration: 4000
            //     });
            //     return;
            // }

            if(this.type >=0 && this.type == this.currentChoiceAssetType && this.isType==true){
                Toast({
                    // message: "您有委托单待处理，请先撤单!",
                    message: "更改的组合不能和您当前的组合相同!",
                    position: 'middle',
                    duration: 4000
                });
                return;
            }

            this.currentAlertHold = 0;
            this.showMAlert = true;
            if (this.isType == false || this.isType == "") {
                this.alertMText = "是否买入 "+this.currentChoiceAssetName+" 组合?";
                return;
            }
            this.alertMText = "您当前持有 "+this.currentAssetName+" 组合,将更改为 "+this.currentChoiceAssetName+" 组合";

        },

        responseChangeAssetType(ret) {
            this.hideWaiting();
            let response = responseResult(this, ret, 2, 2);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return;
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.isChange = 'false';
                this.isType = true;
                // this.$router.replace({
                //     path: '/my/index'
                // });
                // this.currentAssetType = this.currentChoiceAssetType;
                // this.currentAssetName = this.currentChoiceAssetName;
                this.getPageData();
                if(this.isFirstChange==1){
                     this.isReFresh=false;
                }
                let tmpTip = '请求提交成功'
                if(ret.retData.isTradeTime ==false || this.monthFlag==true){
                     tmpTip = '委托提交成功';
                }
                Toast({
                    message: tmpTip,
                    position: 'middle',
                    duration: 4000,
                    iconClass: 'mint-toast-icon mintui mintui-success'
                });
                this.canType==true;
                return;
            }
        },

        //获取委托列表
        getCommendOrderData() {
            // this.showLoading = true;
            // let ret = await assetIndex(this.currentTradeId);
            let handler = this;
            commendOrderList(3,1, function(ret) {
                handler.responseCommendOrder(ret);
            });

        },

        responseCommendOrder(ret) {
            // this.hideLoading();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                 let result = ret.retData.list;
                 if(result){
                    for(var i=0;i<result.length;i++){
                        if(result[i].canCancel==true){
                             this.canCancelOrder = true;
                             break;
                        }
                    }
                 }
                // this.getRealPageData(this);
                return
            }
        },

        //取消重新配置仓位
        cancelChangeAssetType() {
            this.isShowAsset = true;
            this.isChange = 'false';
            this.currentAssetType = this.currentChoiceAssetType;
            this.currentAssetName = this.currentChoiceAssetName;
            this.getPieData();
        },

        //改为其它风格
        preChangeAssetType() {

            if(this.canCancelOrder ==true){
                 //monthFlag为true则不能进行交易
                Toast({
                    message: "您有委托单待处理，请先撤单!",
                    position: 'middle',
                    duration: 4000
                });
                return;
            }

            if(this.isType ==false){
                Toast({
                    // message: "您有委托单待处理，请先撤单!",
                    message: "您目前没有配置组合，不能更改组合",
                    position: 'middle',
                    duration: 4000
                });
                return ;
            }

            if(this.monthFlag == true){
                this.currentAlertHold = 2;
                this.showMAlert = true;
                this.alertMText ="调仓前五个交易日内，可提交委托申请，调仓日成交。";
                return ;
            }

            this.isChange = 'true';
            this.isChangeOther = true;
            this.getPieDataNoToken();
            this.isShowAsset = false;
        },

        refundClick() {

            if(this.canCancelOrder ==true){
                Toast({
                    message: "您有委托单待处理，请先撤单!",
                    position: 'middle',
                    duration: 4000
                });
                return;
            }

            if (this.isType == false || this.isType == "") {
                Toast("您目前没有配置组合，不能卖出");
                return;
            }

            this.currentAlertHold = 1;
            this.showMAlert = true;
            this.alertMText = "是否卖出您的 "+this.currentAssetName+" 组合？";
        },

        //增加倒计时，获取开盘时间倒计时 
        setTimeUpdateData() {
            let handler = this;
            window.setTimeout(function() {
                handler.getRealPageData(handler);
            }, this.dif * 1000);
        },

        closeTip() {
            this.showAlert = false;
        },
        closeMTip() {
            this.showMAlert = false;
        },

        gotoRealTrade() {
            //通知父类打开实盘账户界面
            this.$emit('gotoRealTrade');
        },

        //确认更改仓位
        confrimTip() {
            this.closeMTip();
            if (this.currentAlertHold == 0) {
                this.showWaiting = true;
                let handler = this;
                let reset = 0;
                if (this.isChangeOther) {
                    reset = 1;
                }
                this.isShow =false;
                myChangePostion(this.currentChoiceAssetType, function(ret) {
                    handler.responseChangeAssetType(ret);
                });
            } else if (this.currentAlertHold == 1) {
                this.requestCommendSell();
                // Toast({
                //     message: '卖出提交成功',
                //     position: 'middle',
                //     duration: 4000,
                //     iconClass: 'mint-toast-icon mintui mintui-success'
                // });
                 this.isShow =false;
                return;
            } else if (this.currentAlertHold == 2) {
               
                this.isChange = 'true';
                this.isChangeOther = true;
                this.getPieDataNoToken();
                this.isShowAsset = false;
                this.isShow =false;
                return;
            } else if(this.currentAlertHold == 3){
                this.currentAlertHold = 0;
                this.showMAlert = true;
                if (this.isType == false || this.isType == "") {
                    this.alertMText = "是否买入 "+this.currentChoiceAssetName+" 组合?";
                    return;
                }
                this.alertMText = "您当前持有 "+this.currentAssetName+" 组合,将更改为 "+this.currentChoiceAssetName+" 组合";
            }
        },

        //生产环境与发布环境隐藏loading方式不同
        hideWaiting() {
            if (process.env.NODE_ENV !== 'development') {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer);
                    this.showWaiting = false;
                }, 400)
            } else {
                this.showWaiting = false;
            }
        },
        //隐藏动画
        hideLoading() {
            if (process.env.NODE_ENV !== 'development') {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer);
                    this.showLoading = false;
                }, 600)
            } else {
                this.showLoading = false;
            }
        },
        closeSocket(){
            try {
                if (this.conn) {
                    this.lockReconnect = true;
                    this.conn.onclose();
                    this.conn.close();
                }
            } catch (e) {
                // console.log(e);
            }
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
        } catch (e) {
            // console.log(e);
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
    .manager-list-container {
        background-color: $grey;
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
            width: 20%;
            margin-top: 0.1rem;
            text-align: center;
            p {
                float: left;
                @include sc(.65rem, $fontColor);
                text-align: center;
            }
            img {
                width: 1rem;
                margin: auto;
            }
            .icon {
                @include wh(.8rem, .8rem);
                margin: auto;
                margin-bottom: 0.2rem;
                margin-right: 0.2rem;
                margin-left: 10%;
                svg {
                    @include wh(100%, 100%);
                }
            }
            .no_active{
               @include sc(.65rem, $fontGreyColor2); 
            }
        }
        .manager-list-li:last-child {
            width: 30%;
        }
        .manager-list-li:first-child {
            width: 30%;
        }
    }
    .activity_show {
        display: block;
    }
    .title-container {
        position: relative;
        width: 100%;
        margin-top: 0.2rem;
        padding-top: 0.5rem;
        text-align: center;
        p {
            @include sc(.60rem, $fontColor);
            padding-top: 0.2rem;
            span {
                @include sc(.60rem, $red);
            }
            .tip {
                @include sc(.6rem, $fontColor);
            }
        }
        .trade-notice {
            position: absolute;
            bottom: 0;
            right: 0;
            -webkit-border-radius: 1.2rem 0px 0px 1.2rem;
            -moz-border-radius: 1.2rem 0px 0px 1.2rem;
            border-radius: 1.2rem 0px 0px 1.2rem;
            border-style: solid none solid solid;
            border-color: $blue;
            border-width: 0.05rem;
            font-size: 0.4rem;
            text-align: center;
            padding: 0.08rem 0.4rem;
            padding-left: 0.4rem;
            padding-right: 0.2rem;
            width: 1.8rem;
            span {
                color: $fontGreyColor;
            }
            p {
                color: $blue;
            }
        }
    }
    .type-choice-container {
        position: relative;
        margin-top: -0.5rem;
        padding-bottom: 2rem;
        .type-choice-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            height: 1.8rem;
            padding: 0rem 0.8rem;
        }
        .type-choice-ul .type-choice-li {
            float: left;
            width: 25%;
            border-style: solid;
            border-width: 0.05rem;
            border-color: $lineGrey2;
            text-align: center;
            span {
                @include sc(.65rem, $fontGreyColor2);
                line-height: 1.5rem;
            }
        }
        .type-choice-ul .type_activity {
            border-color: $blue;
            span {
                color: $blue;
            }
        }
        .type-cursor-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            height: 1.1rem;
            padding: 0rem 0.8rem;
        }
        .type-cursor-ul .type-cursor-li {
            float: left;
            width: 25%;
            text-align: center;
            .cursor-icon {
                @include wh(0.5rem, 0.75rem);
                display: inline-block;
                vertical-align: middle;
                line-height: 0.75rem;
                .icon-mobile {
                    @include wh(100%, 100%);
                    display: none;
                }
                .cursor_activity {
                    display: block;
                }
            }
            span {
                @include sc(.65rem, $fontColor);
                line-height: 1.5rem;
            }
        }
        .risk-test {
            position: absolute;
            top: -2rem;
            right: 0px;
            -webkit-border-radius: 1.2rem 0px 0px 1.2rem;
            -moz-border-radius: 1.2rem 0px 0px 1.2rem;
            border-radius: 1.2rem 0px 0px 1.2rem;
            border-style: solid none solid solid;
            border-color: $blue;
            border-width: 0.05rem;
            font-size: 0.4rem;
            text-align: center;
            padding: 0.08rem 0.4rem;
            padding-left: 0.4rem;
            padding-right: 0.2rem;
            span {
                color: $fontGreyColor;
            }
            p {
                color: $blue;
            }
        }
        .margin-top-20 {
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
        .type-change-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            height: 1.8rem;
            padding: 0rem 0.8rem;
        }
        .type-change-ul .type-change-li {
            float: left;
            width: 49%;
            border-style: solid;
            border-width: 0.05rem;
            border-color: $lineGrey2;
            text-align: center;
            span {
                @include sc(.65rem, $fontGreyColor2);
                line-height: 1.5rem;
            }
        }
        .type-change-ul .type-change-li:nth-child(2) {
            width: 2%;
            border-width: 0px
        }
        .type-change-ul .type-change-li:nth-child(3) {
            background-color: $grey; 
            border-color: $grey;
        }
        .type-change-ul .active{
            background-color: $blue !important;
            border-color: $blue;
            span {
                color: #e0e0e0;
            }
        }
    }
    .confirm-container {
        margin: 1.2rem .8rem;
        margin-bottom: .5rem;
        @include sc(.7rem, $fontGreyColor2);
        background-color: $grey;
        padding: .3rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
    .active{
      background-color: $blue; 
      @include sc(.7rem, #ffffff); 
    }
}
.marginShow{
    margin-top:.8rem;
}
</style>
