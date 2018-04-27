<template>
    <section class="asset-container">
        <transition name="fade-choose">
            <section class="choice-type-list-container" v-if="step ==3 && reviewStep >0">
                <asset-show :assetDetail="assetDetail" realData="realData" :choseFlag="isType" v-show="isShowAsset ==true">
                </asset-show>
                <section class="manager-list-container" v-if="isShowAsset ==true">
                    <ul class="manager-list-ul">
                        <li class="manager-list-li" @click="preChangeAssetType()">
                            <p class="icon" v-if="canChange==false || isType== false">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#changeHoldGrey"></use>
                                </svg>
                            </p>
                            <p class="icon" v-else>
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#changeHold"></use>
                                </svg>
                            </p>
                            <p :class="{no_active:canChange==false || isType== false}">更改组合</p>
                        </li>
                        <li class="manager-list-li" @click="refundClick()">
                            <p class="icon" v-if="isType == false || isType == '' || canChange==false">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sellOutGrey"></use>
                                </svg>
                            </p>
                            <p class="icon" v-else>
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sellOut"></use>
                                </svg>
                            </p>
                            <p :class="{no_active:isType == false || isType == '' || canChange==false}">卖出</p>
                        </li>
                        <li class="manager-list-li">
                            <router-link :to="{path: '/profile/assetdetail', query:{qt:1,t:0,ot:1,ct:currentAssetType,ai:accountId}}">
                                <p class="icon">
                                    <svg fill="#bbb">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#query"></use>
                                    </svg>
                                </p>
                                <p>查询</p>
                            </router-link>
                        </li>
                        <li class="manager-list-li">
                            <router-link :to="{path: '/trade/payment', query:{ai:accountId}}">
                            <p class="icon">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#myTrade"></use>
                                </svg>
                            </p>
                            <p>增资</p>
                            </router-link>
                        </li>
                    </ul>
                </section>
                <!-- 组合包含的内容 -->
                <div class="title-container">
                    <p class="asset-name" v-if="isType == true && isChange =='false'"><span v-show="isType == true && isChange =='false'" class="tip">您已选择</span><span :class="{blue: currentAssetType ==0,green: currentAssetType ==1,gold: currentAssetType ==2,red: currentAssetType ==3}" v-cloak>{{assetNameList[currentAssetType]}}</span>组合， 近一年收益：<span v-cloak>{{rate}}</span></p>
                    <p class="asset-name" v-else><span :class="{blue: currentChoiceAssetType ==0,green: currentChoiceAssetType ==1,gold: currentChoiceAssetType ==2,red: currentChoiceAssetType ==3}" v-cloak>{{assetNameList[currentChoiceAssetType]}}</span>组合， 近一年收益：<span v-cloak>{{rate}}</span></p>
                    <p class="asset-income">最大回撤：<span v-cloak>{{retraceRate}}</span>，波动率：<span v-cloak>{{vol}}%</span></p>
                    <div class="trade-notice">
                        <router-link :to="{path: '/asset/notice', query:{realType:currentChoiceAssetType}}" class="notice">
                            <span>交易须知</span>
                        </router-link>
                    </div>
                </div>
                <asset-pier :currentTradeType="currentTradeType" :currentAssetType="currentChoiceAssetType" :assetPieData="assetPieData" :isLogin="isLogin" v-show="currentTradeType=='real'">
                </asset-pier>
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
                        <div v-show="isChange =='false'" class="confirm-container" @click="getConfirmChangeAssetType" :class="{active:canChange==true}">确定选择</div>
                        <div v-show="isChange =='true'" class="margin-top-20">
                            <ul class="type-change-ul">
                                <li class="type-change-li" @click="cancelChangeAssetType">
                                    <span>取消</span>
                                </li>
                                <li class="type-change-li">&nbsp;</li>
                                <li class="type-change-li active" @click="getConfirmChangeAssetType">
                                    <span>确定</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="risk-test">
                        <router-link :to="{path: riskUrl, query:{callback:callback}}">
                            <span>风险测评</span>
                            <p>{{risk}}</p>
                        </router-link>
                    </div>
                </div>
            </section>
            <open-account v-else-if="step <=2 || (step==3 && reviewStep==0)" :accountId="accountId" :reviewDesc="reviewDesc" :reviewStep="reviewStep" :stepUrl="stepUrl" :step="step"></open-account>
            <div v-else></div>
        </transition>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <alert-multi-tip v-if="showMAlert" :showHide="showMAlert" @closeTip="closeMTip" :alertText="alertMText" @confrimTip="confrimTip"></alert-multi-tip>
        <transition name="waiting">
            <waiting v-show="showWaiting"></waiting>
        </transition>
    </section>
</template>
<script>
import {
    setTradeChoiceType,
    getTradeChoiceType,
} from '../../../store/store'
import {
    Toast,
    Indicator
} from 'mint-ui'
import BScroll from 'better-scroll'
import assetShow from '../../../components/common/assetShow'
import assetMenu from '../../../components/common/assetMenu'
import assetPier from '../../../components/common/assetPierChart'
import openAccount from './children/openaccount'
import waiting from '../../../components/common/waiting'
import alertTip from '../../../components/common/alertTip'
import alertMultiTip from '../../../components/common/alertMultiTip'
import {
    tradeGetAccount,
    profileGetStep,
    tradeRecIndex,
    assetIndex,
    assetPieData,
    assetPieDataNoToken,
    tradeChooseType,
    tradeSoldOut,
    tradeEntrustList
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
        assetShow,
        assetMenu,
        assetPier,
        openAccount,
        waiting,
        alertTip,
        alertMultiTip,
    },
    props: ['currentTradeType', 'currentChoiceType','realClicked','isLogin'],
    data() {
        return {
            // currentTradeType: 'real', //当前交易类型
            currentTradeId: '1', //当前交易类型ID
            // currentChoiceType: 'commend', //当前的组合
            currentChoiceName: '推荐组合', //当前的组合名称
            currentAssetType: 0, //当前组合
            currentAssetName: '保守型', //当前组合名称
            risk: '未测评', //测评类型
            isChange: 'false', //当前操作是否更改过配置类型
            assetPieData: '', //当前饼图数据
            assetDetail: '', //获取当前页面的用户交易数据
            accountId:'',//交易账号
            reviewDesc: '', //步骤描述
            reviewStep: '',//子步骤
            stepUrl: '', //按钮的链接
            step: 5, //目前的步骤
            type:-1,//用户持仓的组合
            isType:false,//是否能够卖出和更改仓位
            monthFlag:false,//是否能够更改组合或者配置组合
            currentChoiceAssetType: 0, //当前用户配置的组合
            currentChoiceAssetName: '保守型', //当前用户配置的组合名称
            assetNameList:['保守型','稳健型','进取型','激进型'],
            rate: '--', //收益率
            vol: '--', //波动率
            retraceRate: '1.1', //回撤
            risk: '未测评', //测评类型
            riskUrl: '/login', //测评结果链接
            isChange: 'false', //当前操作是否更改过配置类型
            isShowAsset: true, //是否显示仓位信息
            currentAlertHold: 0, //当前对话框的拥有者
            showMAlert: false, //显示M提示组件
            alertMText: null, //提示M的内容
            showWaiting: false, //显示加载动画
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            canCancelOrder:false,//是否有委托单
            canChange:true,//是否能够更改组合
            callback:true,//是否需要保留当前的状态
            changeingAsset:false,//是否正在切换类型
        }
    },
    created() {
        this.initData();
    },

    methods: {
        //初始化获取数据
        initData() {
            if(this.isLogin==true){
                Indicator.open();
                this.getTradeAccountData();
                if(getTradeChoiceType()!=null && getTradeChoiceType()!='null'){
                  this.currentChoiceAssetType=getTradeChoiceType(); 
                  this.currentAssetType=getTradeChoiceType(); 
                  setTradeChoiceType(null);  
              }
            }
        },

        //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
        listenPropChange() {

            this.initData();
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
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                if(ret.retData.accountList=='' || ret.retData.accountList==[]){
                  this.step =-1;
                  return 
                }
                this.accountId = ret.retData.accountList[0].accountId;
                this.type = ret.retData.accountList[0].type;
                this.currentAssetType = ret.retData.accountList[0].type;
                this.getTradeBaseData();
                // this.getRealOrderData();
                return;
            } else if (response == RESPONSE_CODE_ERROR_TOKEN) {
                // setAssetState(0);
                // this.$router.push({
                //     path: '/login'
                // });
                // this.$router.go(1);
            }
        },

        //获取用户的实盘开户流程
        getTradeBaseData() {
            let handler = this;
            profileGetStep(function(ret) {
                handler.responseTradeBase(ret);
            });
        },

        responseTradeBase(ret) {
            //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
            Indicator.close();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return;
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.reviewDesc = ret.retData.reviewDesc;
                this.reviewStep = ret.retData.reviewStep;
                this.stepUrl = ret.retData.stepUrl;
                this.step = ret.retData.step;
                if(this.step==3 && this.step>0){
                     this.getTradeIndexData();
                }
                return;
            } 
        },

        //获取用户首页的数据
        getTradeIndexData() {
            let handler = this;
            tradeRecIndex(this.type,this.accountId,function(ret) {
                handler.responseTradeIndex(ret);
            });
        },

        responseTradeIndex(ret) {
            //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
            Indicator.close();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return;
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.assetDetail = ret.retData;
                this.canChange = ret.retData.canChange;
                this.canCancelOrder = ret.retData.canChange;
                this.risk = ret.retData.risk;
                if(ret.retData.risk !='未测评' && ret.retData.risk !=''){
                    this.riskUrl = '/my/risk-result'; 
                }else{
                    this.riskUrl = '/my/risk'; 
                }
                return;
            } 
        },


        //获取饼图数据
        getPieData(type) {
            Indicator.open();
            let handler = this;
            assetPieData(type, function(ret) {
                handler.responsePieData(ret);
            });
        },

        responsePieData(ret) {
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

        //游客模式获取饼图数据
        getPieDataNoToken(type) {
            // Indicator.open();
            let handler = this;
            assetPieDataNoToken(type, function(ret) {
                handler.responseNoToken(ret);
            });

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

        //推荐仓位卖出 
        requestCommendSell() {
            this.showWaiting = true;
            let handler = this;
            tradeSoldOut(this.accountId,function(ret) {
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

                this.initData();
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

        //确定更改组合类型，触发用户的配置类型数据
        getConfirmChangeAssetType() {
            this.isShowAsset = true;

            if(this.canChange ==false){
                 //monthFlag为true则不能进行交易
                Toast({
                    message: "您有委托单待处理，请先撤单!",
                    position: 'middle',
                    duration: 4000
                });
                return;
            }
            
            if(this.monthFlag == true){
                this.currentAlertHold = 3;
                this.showMAlert = true;
                this.alertMText ="调仓前五个交易日内，可提交委托申请，调仓日成交。";
                return ;
            }

            if(this.type >=0 && this.currentChoiceAssetType ==this.type){
                 //monthFlag为true则不能进行交易
                Toast({
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
            this.alertMText = "您当前持有 "+this.assetNameList[this.currentAssetType]+" 组合,将更改为 "+this.assetNameList[this.currentChoiceAssetType]+" 组合";

        },


        //改变组合类型，触发更新饼图
        changeAssetType(assetType, assetName) {
            this.currentChoiceAssetType = assetType;
            this.currentChoiceAssetName = assetName;
            this.getPieDataNoToken(assetType);

        },

        //确定更改组合类型，触发用户的配置类型数据
        confirmChangeAssetType() {
            this.isChange = 'true';
        },

        //取消重新配置仓位
        cancelChangeAssetType() {
            this.isShowAsset = true;
            this.isChange = 'false';
            // this.currentAssetType = this.currentChoiceAssetType;
            // this.currentAssetName = this.currentChoiceAssetName;
            this.getPieData(this.currentAssetType);
        },

        //改为其它风格
        preChangeAssetType() {

            if(this.canChange ==false){
                 //monthFlag为true则不能进行交易
                Toast({
                    message: "您有委托单待处理，请先撤单!",
                    position: 'middle',
                    duration: 4000
                });
                return;
            }

            if(this.isType ==false){
                 //monthFlag为true则不能进行交易
                Toast({
                    // message: "您有委托单待处理，请先撤单!",
                    message: "你目前没有配置组合，不能进行更改组合!",
                    position: 'middle',
                    duration: 4000
                });
                return;
            }

            if(this.monthFlag == true){
                this.currentAlertHold = 2;
                this.showMAlert = true;
                this.alertMText ="调仓前五个交易日内，可提交委托申请，调仓日成交。";
                return ;
            }

            this.isChange = 'true';
            this.isChangeOther = true;
            this.currentChoiceAssetType = this.currentAssetType;
            this.currentChoiceAssetName = this.currentAssetName;
            this.getPieDataNoToken(this.currentChoiceAssetType);
            this.isShowAsset = false;

        },

        refundClick() {
            if(this.canChange ==false){
                 //monthFlag为true则不能进行交易
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
            this.alertMText = "是否卖出您的 "+this.assetNameList[this.type]+" 组合？";
        },

        closeTip() {
            this.showAlert = false;
        },
        closeMTip() {
            this.showMAlert = false;
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
                tradeChooseType(this.currentChoiceAssetType,this.accountId,function(ret) {
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
                return;
            }else if (this.currentAlertHold == 2) {
                this.isChange = 'true';
                this.isChangeOther = true;
                this.currentChoiceAssetType = this.currentAssetType;
                this.currentChoiceAssetName = this.currentAssetName;
                this.getPieDataNoToken(this.currentChoiceAssetType);
                this.isShowAsset = false;
                return;
            }else if (this.currentAlertHold == 3) {
                this.currentAlertHold = 0;
                this.showMAlert = true;
                if (this.isType == false || this.isType == "") {
                    this.alertMText = "是否买入 "+this.currentChoiceAssetName+" 组合?";
                    return;
                }
                this.alertMText = "您当前持有 "+this.assetNameList[this.currentAssetType]+" 组合,将更改为 "+this.assetNameList[this.currentChoiceAssetType]+" 组合";
                return;
            }
        },

        responseChangeAssetType(ret) {
            this.hideWaiting();
            let response = responseResult(this, ret, 1, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return;
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.isChange = 'false';
                this.getTradeAccountData();
                Toast({
                    message: '委托提交成功',
                    position: 'middle',
                    duration: 4000,
                    iconClass: 'mint-toast-icon mintui mintui-success'
                });
                return;
            }
        },

        //获取委托列表
        getRealOrderData() {
            // this.showLoading = true;
            // let ret = await assetIndex(this.currentTradeId);
            let handler = this;
            tradeEntrustList(0,1, function(ret) {
                handler.responseRealOrder(ret);
            });

        },

        responseRealOrder(ret) {
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
    },
    watch: {
        type: function(value) {
            if(this.type <0){
                 //用户没有配置过仓位
                 
                 this.isType = false;
                 this.getPieData(0); 
            }else{
                this.isType = true;
                this.getPieData(this.type);
                this.currentAssetType = this.type;
                this.currentChoiceAssetType = this.type;    
            }
        },
        assetPieData:function(value){
             
        },
        realClicked:function(value){
            if(this.realClicked==true){
                this.getPieData(this.currentChoiceAssetType);  
            }
        },
        currentTradeType:function(value){
        },
        isLogin:function(value){
            if(this.isLogin==true){
                this.initData();
            }
        },

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
            width: 23%;
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
        .manager-list-li:first-child {
            width: 31%;
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
</style>
