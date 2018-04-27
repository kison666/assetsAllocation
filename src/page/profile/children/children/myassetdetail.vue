<template>
    <div class="market_container">
        <head-top signin-up='home' head-title="我的资产" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <div v-wechat-title="$route.meta.title"></div>
        <section class="menu" v-show="opType ==0 && type==1">
            <section class="change_market_type" ref="chooseType">
                <div>
                    <span :class='{activity_show: changeMarketType ==1}' @click="changeMarketTypeClick(1)">查询</span>
                </div>
                <div>
                    <span :class='{activity_show: changeMarketType ==2}' @click="changeMarketTypeClick(2)">撤单</span>
                </div>
                <section>
                    <span :class='{activity_show: changeMarketType ==3}' @click="changeMarketTypeClick(3)">出金/入金</span>
                </section>
                <div>
                    <span :class='{activity_show: changeMarketType ==4}' @click="changeMarketTypeClick(4)">盈亏</span>
                </div>
            </section>
        </section>    
        <section class="menu" v-show="(opType ==0 && type==0) || opType==1">
            <section class="change_market_type" ref="chooseType">
                <div>
                    <span :class='{activity_show: changeMarketType ==0}' @click="changeMarketTypeClick(0)">持仓</span>
                </div>
                <div>
                    <span :class='{activity_show: changeMarketType ==1}' @click="changeMarketTypeClick(1)">查询</span>
                </div>
                <div>
                    <span :class='{activity_show: changeMarketType ==2}' @click="changeMarketTypeClick(2)">撤单</span>
                </div>
                <section>
                    <span :class='{activity_show: changeMarketType ==3}' @click="changeMarketTypeClick(3)">出金/入金</span>
                </section>
                <div>
                    <span :class='{activity_show: changeMarketType ==4}' @click="changeMarketTypeClick(4)">盈亏</span>
                </div>
            </section>
           </section> 
            <!-- 持仓 -->
            <transition name="fade-choose">
                <section v-if="changeMarketType ==0" class="main-container">
                    <section class="menu-container">
                        <div class="commend-hold">
                            <section class="top5-container" v-show="opType==0">
                                <!-- <p class="title">前5名ETF资产</p> -->
                                <ul class="percent-ul percent-title">
                                    <li class="percent-li left">
                                        <p>ETF名称</p>
                                    </li>
                                    <li class="percent-li right">
                                        <p>ETF排名</p>
                                    </li>
                                </ul>
                                <div v-if="topPosition.length >0 && topPosition !='-1'">
                                    <ul class="percent-ul" v-for="(item, index) in topPosition">
                                        <li class="percent-li left">
                                            <p v-cloak>{{item.etfCode}}</p>
                                            <p class="small-item" v-cloak>{{item.etfName}}</p>
                                        </li>
                                        <li class="percent-li right">
                                             <p v-cloak>{{item.num}}</p>
                                        </li>
                                    </ul>
                                </div>
                                <div class="no-record" v-show="topPosition.length ==0">无持仓记录</div>
                            </section>
                            <section class="top5-container" v-show="opType==1">
                                <!-- <p class="title">前5名ETF资产</p> -->
                            <div class="entrust-list-top">
                                <ul class="entrust-list-ul">
                                    <li class="entrust-list-li" style="width:60%">
                                        <p>ETF名称</p>
                                    </li>
                                    <li class="entrust-list-li" style="width:20%">
                                        <p>价格(美元)</p>
                                    </li>
                                    <li class="entrust-list-li" style="width:20%">
                                        <p>数量</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="entrust-list-content" v-if="topPosition1.length >0 && topPosition1 !='-1'">
                                <ul v-for="(item, index) in topPosition1" class="entrust-list-ul">
                                    <li class="entrust-list-li marginTop10" style="width:60%">
                                        <p v-cloak>{{item.etfCode}}</p>
                                        <p class="small-item" v-cloak>{{item.etfName}}</p>
                                    </li>
                                    <li class="entrust-list-li marginTop10" style="width:20%">
                                        <p v-cloak>{{item.price}}</p>
                                    </li>
                                    <li class="entrust-list-li marginTop10" style="width:20%">
                                        <p v-cloak>{{item.amount}}</p>
                                    </li>
                                </ul>
                                <div class="no-record" v-if="topPosition1.length ==0">无持仓记录</div>
                            </div>
                            </section>
                            <p class="menu-p" v-show="opType==0 && type ==0 ">更多持仓明细可查看实盘智能组合</p>
                            <p v-show="opType==0 && type ==0"><span class="menu-a" @click="gotoRealCommend">实盘智能组合</span></p>
                        </div>
                        <!-- <hold-list v-else></hold-list> -->
                    </section>
                </section>
            </transition>
            <!-- 查询 -->
            <transition name="fade-choose">
                <section v-show="changeMarketType ==1" class="index-container">
                    <section class="menu-container">
                        <section class="profile-1reTe" v-if="type==1">
                            <!-- 当日成交 -->
                            <router-link :to="{path: '/profile/asset/query', query:{type:'2',cur:'1',t:type,ot:opType,title:'当日成交'}}" class="myorder">
                                <div class="myorder-div">
                                    <span>当日成交</span>
                                    <span class="right-content"></span>
                                    <span class="myorder-divsvg">
                                        <svg fill="#bbb">
                                           <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                        </svg>
                                    </span>
                                </div>
                            </router-link>
                            <!-- 当日委托 -->
                            <router-link :to="{path: '/profile/asset/query', query:{type:'0',cur:'1',t:type,ot:opType,title:'当日委托'}}" class="myorder">
                                <div class="myorder-div">
                                    <span>当日委托</span>
                                    <span class="right-content"></span>
                                    <span class="myorder-divsvg">
                                       <svg fill="#bbb">
                                           <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                        </svg>
                                    </span>
                                </div>
                            </router-link>
                        </section>
                        <section class="profile-1reTe" v-if="type==1">
                            <!-- 历史成交 -->
                            <router-link :to="{path: '/profile/asset/query', query:{type:'2',cur:'0',t:type,ot:opType,title:'历史成交'}}" class="myorder">
                                <div class="myorder-div">
                                    <span>历史成交</span>
                                    <span class="right-content"></span>
                                    <span class="myorder-divsvg">
                                        <svg fill="#bbb">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                        </svg>
                                    </span>
                                </div>
                            </router-link>
                            <!-- 历史委托 -->
                            <router-link :to="{path: '/profile/asset/query', query:{type:'0',cur:'0',t:type,ot:opType,title:'历史委托'}}" class="myorder">
                                <div class="myorder-div">
                                    <span>历史委托</span>
                                    <span class="right-content"></span>
                                    <span class="myorder-divsvg">
                                       <svg fill="#bbb">
                                          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                       </svg>
                                    </span>
                                </div>
                            </router-link>
                        </section>
                        <section class="profile-1reTe" v-if="type==0">
                            <!-- 当日成交 -->
                            <router-link :to="{path: '/profile/asset/query', query:{type:'1',cur:'1',t:type,ot:opType,title:'当日成交'}}" class="myorder">
                                <div class="myorder-div">
                                    <span>当日成交</span>
                                    <span class="right-content"></span>
                                    <span class="myorder-divsvg">
                                        <svg fill="#bbb">
                                           <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                        </svg>
                                    </span>
                                </div>
                            </router-link>
                            <!-- 当日委托 -->
                            <router-link :to="{path: '/profile/asset/query', query:{type:'0',cur:'1',t:type,ot:opType,title:'当日委托'}}" class="myorder">
                                <div class="myorder-div">
                                    <span>当日委托</span>
                                    <span class="right-content"></span>
                                    <span class="myorder-divsvg">
                                       <svg fill="#bbb">
                                           <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                        </svg>
                                    </span>
                                </div>
                            </router-link>
                        </section>
                        <section class="profile-1reTe" v-if="type==0">
                            <!-- 历史成交 -->
                            <router-link :to="{path: '/profile/asset/query', query:{type:'1',cur:'0',t:type,ot:opType,title:'历史成交'}}" class="myorder">
                                <div class="myorder-div">
                                    <span>历史成交</span>
                                    <span class="right-content"></span>
                                    <span class="myorder-divsvg">
                                        <svg fill="#bbb">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                        </svg>
                                    </span>
                                </div>
                            </router-link>
                            <!-- 历史委托 -->
                            <router-link :to="{path: '/profile/asset/query', query:{type:'0',cur:'0',t:type,ot:opType,title:'历史委托'}}" class="myorder">
                                <div class="myorder-div">
                                    <span>历史委托</span>
                                    <span class="right-content"></span>
                                    <span class="myorder-divsvg">
                                       <svg fill="#bbb">
                                          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                       </svg>
                                    </span>
                                </div>
                            </router-link>
                        </section>
                    </section>
                </section>
            </transition>
            <!-- 撤单 -->
            <transition name="fade-choose">
                <section v-show="changeMarketType ==2" class="entrust-container">
                    <section class="menu-container">
                        <section class="entrust-list-container" v-if="type ==0">
                            <div class="entrust-list-top">
                                <ul class="entrust-list-ul">
                                    <li class="entrust-list-li" style="width:5%">
                                        <p>&nbsp;</p>
                                    </li>
                                    <li class="entrust-list-li" style="width:40%">
                                        <p>名称</p>
                                    </li>
                                    <li class="entrust-list-li" style="width:30%">
                                        <p>时间</p>
                                    </li>
                                    <li class="entrust-list-li" style="width:20%">
                                        <p>状态</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="entrust-list-content">
                                <ul v-for="(item, index) in entrustDetailList" class="entrust-list-ul" v-if="entrustDetailList.length>0 && entrustDetailList !='-1'">
                                    <li class="entrust-list-li marginTop10" style="width:5%">
                                        <p>
                                        <span class="info-circle" :class="{up:item.opType==2,down:item.opType ==1,change:item.opType==3}" v-cloak>{{opTypeName[item.opType-1]}}</span>
                                        </p>
                                    </li>
                                    <li class="entrust-list-li marginTop10" style="width:40%">
                                        <p v-cloak>{{item.typeDesc}}<span v-show="item.opType==3">->{{item.toTypeDesc}}</span></p>
                                    </li>
                                    <li class="entrust-list-li" style="width:30%">
                                        <p v-cloak>{{item.createTime}}</p>
                                    </li>
                                    <li class="entrust-list-li marginTop10" style="width:20%">
                                        <p v-cloak>{{item.opDesc}}
                                            <span class="cancel" v-show="item.canCancel ==true" @click="cancelCommendClick(item.id)">撤单</span>
                                        </p>
                                    </li>
                                </ul>
                                <div class="no-record" v-show="entrustDetailList =='-1' || entrustDetailList.length ==0">无委托记录</div>
                            </div>
                        </section>
                        <section class="entrust-diy-list-container" v-if="type ==1">
                            <div class="entrust-list-top">
                                <ul class="entrust-list-ul">
                                    <li class="entrust-list-li">
                                        <p>&nbsp;</p>
                                    </li>
                                    <li class="entrust-list-li">
                                        <p>名称</p>
                                    </li>
                                    <li class="entrust-list-li">
                                        <p>价格</p>
                                    </li>
                                    <li class="entrust-list-li">
                                        <p>数量</p>
                                    </li>
                                    <li class="entrust-list-li">
                                        <p>状态</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="entrust-list-content">
                                <ul v-for="(item, index) in entrustDetailList" class="entrust-list-ul" v-if="entrustDetailList.length>0 && entrustDetailList !='-1'">
                                    <li class="entrust-list-li">
                                        <p>
                                            <span class="info-circle" :class="{up:item.opType =='买入',down:item.opType =='卖出'}">{{item.opType =='买入' ? '买':'卖'}}</span>
                                        </p>
                                    </li>
                                    <li class="entrust-list-li name">
                                        <p v-cloak>{{item.symbolName}}</p>
                                        <p v-cloak>{{item.createTime}}</p>
                                    </li>
                                    <li class="entrust-list-li">
                                        <p v-cloak>{{item.buyPrice}}</p>
                                    </li>
                                    <li class="entrust-list-li">
                                        <p>{{item.amount}}</p>
                                    </li>
                                    <li class="entrust-list-li">
                                        <p v-cloak>{{item.orderState}}&nbsp;<span class="cancel" v-show="item.orderState =='待成交'" @click="cancelClick(item.orderId)">撤单</span></p>
                                    </li>
                                </ul>
                                <ul v-for="(item, index) in entrustDetailList1" class="entrust-list-ul" v-if="entrustDetailList1 != '-1'">
                                    <li class="entrust-list-li">
                                        <p>
                                            <span class="info-circle" :class="{up:item.opType =='买入',down:item.opType =='卖出'}">{{item.opType =='买入' ? '买':'卖'}}</span>
                                        </p>
                                    </li>
                                    <li class="entrust-list-li name">
                                        <p v-cloak>{{item.symbolName}}</p>
                                        <p v-cloak>{{item.createTime}}</p>
                                    </li>
                                    <li class="entrust-list-li">
                                        <p v-cloak>{{item.buyPrice}}</p>
                                    </li>
                                    <li class="entrust-list-li">
                                        <p v-cloak>{{item.amount}}</p>
                                    </li>
                                    <li class="entrust-list-li">
                                        <p v-cloak>{{item.orderState}}&nbsp;<span class="cancel" v-show="item.orderState =='待成交'" @click="cancelClick(item.orderId)">撤单</span></p>
                                    </li>
                                </ul>
                                <div class="no-record" v-show="(entrustDetailList1.length ==0 || entrustDetailList1 =='-1' ) &&(entrustDetailList.length==0 || entrustDetailList=='-1')">当前无可撤销委托单</div>
                            </div>
                        </section>
                    </section>
                </section>
            </transition>
            <!-- 出入金 -->
            <transition name="fade-choose">
                <section v-show="changeMarketType ==3" class="history-container">
                    <section class="menu-container">
                        <section class="history-list-container">
                                <div class="no-data" v-show="opType==0">抱歉，虚拟账户无此信息，实盘账户才提供此类信息</div>
                            <section class="history-list-container" v-show="opType==1">
                            <div class="history-list-top">
                                <ul class="history-list-ul">
                                    <li class="history-list-li">
                                        <p>时间</p>
                                    </li>
                                    <li class="history-list-li">
                                        <p>类型</p>
                                    </li>
                                    <li class="history-list-li">
                                        <p>金额(美元)</p>
                                    </li>
                                    <li class="history-list-li">
                                        <p>状态</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="history-list-content">
                                <ul v-for="(item, index) in tradeAddFundRecord" class="history-list-ul" v-if="tradeAddFundRecord.length >0 && tradeAddFundRecord !='-1'">
                                    <li class="history-list-li">
                                        <p v-cloak>{{item.createTime}}</p>
                                    </li>
                                    <li class="history-list-li" style="padding-top:8px">
                                        <p v-cloak>入金</p>
                                    </li>
                                    <li class="history-list-li" style="padding-top:12px">
                                        <p v-cloak>{{formatNum(item.amt,2)}}</p>
                                    </li>
                                    <li class="history-list-li" style="padding-top:8px">
                                        <p v-cloak>{{item.state}}</p>
                                    </li>
                                </ul>
                                <ul v-for="(item, index) in tradeRedeemRecord" class="history-list-ul" v-if="tradeRedeemRecord.length >0 && tradeRedeemRecord !='-1'">
                                    <li class="history-list-li">
                                        <p v-cloak>{{item.createTime}}</p>
                                    </li>
                                    <li class="history-list-li" style="padding-top:8px">
                                        <p v-cloak>出金</p>
                                    </li>
                                    <li class="history-list-li" style="padding-top:12px">
                                        <p v-cloak>{{formatNum(item.amt,2)}}</p>
                                    </li>
                                    <li class="history-list-li" style="padding-top:8px">
                                        <p v-cloak>{{item.state}}</p>
                                    </li>
                                </ul>
                                <div class="no-record" v-show ="tradeAddFundRecord.length ==0 && tradeRedeemRecord.length ==0">暂无出入金记录</div>
                            </div>
                        </section>
                        </section>
                    </section>
                </section>
            </transition>
            <!-- 盈亏 -->
            <transition name="fade-choose">
                <section v-show="changeMarketType ==4" class="profit-container">
                    <section class="menu-container">
                        <section class="profit-list-container">
                            <div class="profit-list-top">
                                <ul class="profit-list-ul">
                                    <li class="profit-list-li">
                                        <p>持仓日期</p>
                                    </li>
                                    <li class="profit-list-li">
                                        <p>盈亏比例</p>
                                    </li>
                                    <li class="profit-list-li">
                                        <p>当日盈亏</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="profit-list-content">
                                <ul v-for="(item, index) in profitDetailList" class="profit-list-ul" :class="{up:item.percent <0,down:item.percent >=0}" v-if="profitDetailList.length >0 && profitDetailList !='-1'">
                                    <li class="profit-list-li">
                                        <p v-cloak>{{item.date}}</p>
                                    </li>
                                    <li class="profit-list-li">
                                        <p v-cloak>{{item.percent}}%</p>
                                    </li>
                                    <li class="profit-list-li">
                                        <p v-cloak>{{item.profit}}</p>
                                    </li>
                                </ul>
                                <div class="no-record" v-show="profitDetailList.length ==0">暂无盈亏记录</div>
                            </div>
                        </section>
                    </section>
                </section>
            </transition>
            <transition name="waiting">
                <waiting v-show="showWaiting"></waiting>
            </transition>
        </section>
    </div>
</template>
<script>
import headTop from '../../../../components/header/head'
import BScroll from 'better-scroll'
import assetShow from '../../../../components/common/assetShow'
import holdList from '../children/children/holdList'
import waiting from '../../../../components/common/waiting'
import {
    Toast,
    Indicator
} from 'mint-ui'
import {
    formatNumber
} from '../../../../utils/utils'
import {
    setAssetState,
    setMyAssetQueryStatus,
    getMyAssetQueryStatus,
    setAssetQueryTypeStatus,
    getAssetQueryTypeStatus
} from '../../../../store/store'
import {
    REQ_TYPE_ACCOUNT,
    SOCKET_URL_ACCOUNT
} from '../../../../config/const'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../../../config/response'
import {
    assetDetail,
    assetDetailList,
    entrustDetailList,
    profitDetailList,
    assetIndex,
    assetOrderList,
    orderCancel,
    commendOrderList,
    commendOrderCancel,
    assetTypeDetail,
    assetTopEtf,
    tradeDailyProfit,
    tradeEntrustList,
    tradeCancelEntrust,
    tradePostionList,
    tradeAddFundRecord,
    tradeRedeemRecord
} from '../../../../service/getData'

export default {
    components: {
        headTop,
        holdList,
        waiting,
    },

    data() {
        return {
            changeMarketType: -1, //0、持仓,1、查询,2、撤单,3、出入金,4、每日盈亏
            type: '0', //推荐组合和自配组合
            cType: '0', //推荐组合的细分，保守型、稳健型、进取型、激进型
            opType: '0', //交易类型，0、虚拟盘；1、实盘
            assetDetail: '', //持仓数据
            assetDetailList: '', //持仓明细
            entrustDetailList: '-1', //未撤销订单列表
            profitDetailList: '-1', //盈亏列表
            mType: 5, //自配类型撤销订单
            cur1: 1, //已撤销订单
            cur0: 0, //未撤销订单
            mCommendType: 3, //推荐类型撤销订单
            cur1: 1, //已撤销订单
            cur0: 0, //未撤销订单
            showWaiting: false, //显示等待动画
            entrustDetailList1: '-1', //已撤销订单列表
            topPosition: '-1', //前五名ETF
            topPosition1: '-1', //前五名ETF
            lockReconnect: false, //避免重复发起连接
            conn: null, //socket连接
            isDestory: false, //是否关闭socket
            accountId:'',//实盘用户的ID
            opTypeName:['卖','买','改'],
            currencyName:['人民币','美元'],
            tradeAddFundRecord:'-1',//出入金明细-入金
            tradeRedeemRecord:'-1',//出入金明细-出金  
        }
    },

    watch: {
        changeMarketType:function(value){
             this.initData();
        },
    },

    created() {
        this.changeMarketType = this.$route.query.qt;
        this.type = this.$route.query.t;
        this.opType = this.$route.query.ot;
        this.cType = this.$route.query.ct;
        this.accountId = this.$route.query.ai;
        if (this.$route.query.qt != 1 && this.$route.query.qt != 4 && (getMyAssetQueryStatus() == 'true' || getMyAssetQueryStatus() == true)) {
            this.changeMarketType = 1;
            setMyAssetQueryStatus(false);
        }
        // this.initData();
    },

    methods: {

       formatNum(num,pos){
           return formatNumber(num,pos);
       },

        //初始化获取数据
        initData() {

            if (this.type == 0 && this.opType == 0) {
                this.$route.meta.title = '模拟盘-智能组合';
            } else if (this.type == 1 && this.opType == 0) {
                this.$route.meta.title = '模拟盘-自配组合';
            } else if(this.type == 0 && this.opType == 1){
                this.$route.meta.title = '实盘-智能组合';
            }
   

            if(this.changeMarketType == 0){
                if (this.type == 0 && this.opType == 0) {
                    this.requestVirualCommendData();
                } else if (this.type == 1 && this.opType == 0) {
                    this.getPageData();
                } else if(this.type == 0 && this.opType == 1){
                    this.requestTradePostionList();
                }
            }

            if (this.changeMarketType == 2) {
                if(this.opType ==0){
                    if (this.type == 0) {
                        this.requestCommendCancelOrderList();
                    } else {
                        this.requestCancelOrderList(this.cur0);
                        this.requestCancelOrderList(this.cur1);
                    } 
                }else{
                    this.requestTradeCancelOrderList();
                }

            }

            if (this.changeMarketType == 3 && this.opType==1) {
                this.requestTradeAddFundRecord();
                this.requestTradeRedeemRecord();
            }

            if (this.changeMarketType == 4) {
                let handler = this;
                let diyType = this.cType;
                if (this.type == 1) {
                    diyType = 4;
                } else if (this.type == 0) {
                    diyType = this.cType;
                }
                if(this.type == 0 && this.opType == 1){
                    tradeDailyProfit(this.cType, this.accountId, function(ret) {
                        handler.responseTradeProfitDetail(ret);
                    }); 
                }else{
                    profitDetailList(diyType, this.opType, function(ret) {
                        handler.responseProfitDetail(ret);
                    });        
                }

            }
            // this.assetDetailList = await assetDetailList(this.type);

        },

        cancelClick(orderId) {
            if (orderId < 0 || orderId == '') {
                Toast({
                    message: '订单数据异常',
                    position: 'middle',
                    duration: 4000,
                });
                return;
            }

            this.requestCancelOrder(orderId);
        },

        cancelCommendClick(orderId) {
            if (orderId < 0 || orderId == '') {
                Toast({
                    message: '订单数据异常',
                    position: 'middle',
                    duration: 4000,
                });
                return;
            }
            if(this.opType ==0){
                this.requestCommendCancelOrder(orderId);
            }else{
                this.requestTradeCancelOrder(orderId);
            }

        },

        //撤销自配委托
        requestCancelOrder(orderId) {
            this.showWaiting = true;
            let handler = this;
            orderCancel(orderId, function(ret) {
                handler.responseCancelOrder(ret);
            });
        },

        //撤销模拟盘推荐组合委托
        requestCommendCancelOrder(orderId) {
            this.showWaiting = true;
            let handler = this;
            commendOrderCancel(orderId, function(ret) {
                handler.responseCommendCancelOrder(ret);
            });
        },

        //撤销实盘推荐组合委托
        requestTradeCancelOrder(orderId) {
            this.showWaiting = true;
            let handler = this;
            tradeCancelEntrust(orderId, function(ret) {
                handler.responseTradeCancelOrder(ret);
            });
        },

        //获取自配类型可以撤销订单列表
        requestCancelOrderList(cur) {
            let handler = this;
            assetOrderList(this.mType, cur, function(ret) {
                handler.responseCancelOrderList(cur, ret);
            });
        },

        //获取推荐类型的可撤销订单列表
        requestCommendCancelOrderList() {
            let handler = this;
            commendOrderList(this.mCommendType, this.cur1, function(ret) {
                handler.responseCommendOrderList(ret);
            });
        },

        //获取实盘推荐组合的可撤销订单列表
        requestTradeCancelOrderList() {
            let handler = this;
            tradeEntrustList(this.mCommendType, this.cur1, function(ret) {
                handler.responseTradeOrderList(ret);
            });
        },

        //获取实盘推荐组合的持仓
        requestTradePostionList() {
            Indicator.open();
            let handler = this;
            tradePostionList(this.accountId,
                function(ret) {
                    handler.responseTradePostionList(ret);
                });
        },

        //获取模拟盘推荐组合前5名ETF
        requestVirualCommendData() {
            Indicator.open();
            let handler = this;
            assetTopEtf(this.cType,
                function(ret) {
                    handler.responseVirualCommendData(ret);
                });

        },

        responseTradePostionList(ret) {
            Indicator.close();
            let response = responseResult(this, ret, 1, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.topPosition1 = ret.retData.topPosition;
                return

            }
        },

        responseVirualCommendData(ret) {
            Indicator.close();
            let response = responseResult(this, ret, 1, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.topPosition = ret.retData.topPosition;
                return

            }
        },

        responseCommendOrderList(ret) {
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.entrustDetailList = ret.retData.list;
                return
            }
        },

        responseTradeOrderList(ret) {
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.entrustDetailList = ret.retData.list;
                return
            }
        },

        //获取实盘出入金的入金记录
        requestTradeAddFundRecord(cur) {
            let handler = this;
            tradeAddFundRecord(function(ret) {
                handler.responseTradeAddFundRecord(ret);
            });
        },

        
        responseTradeAddFundRecord(ret) {
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.tradeAddFundRecord = ret.retData.list;
                return
            }
        },

        //获取实盘出入金的出金记录
        requestTradeRedeemRecord(cur) {
            let handler = this;
            tradeRedeemRecord(function(ret) {
                handler.responseTradeRedeemRecord(ret);
            });
        },
        
        responseTradeRedeemRecord(ret) {
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.tradeRedeemRecord = ret.retData.list;
                return
            }
        },


        //TAB切换
        changeMarketTypeClick(type) {
            this.changeMarketType = type;
            this.$router.replace({
                path: '/profile/assetdetail',
                query:{qt:this.changeMarketType,t:this.type,ot:this.opType,ct:this.cType}
            });
            // this.initData();
        },

        responseProfitDetail(ret) {
            let response = responseResult(this, ret, 1, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.profitDetailList = ret.retData.list;
            }
        },

        //实盘-智能组合每日盈亏
        responseTradeProfitDetail(ret) {
            let response = responseResult(this, ret, 1, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.profitDetailList = ret.retData.list;
            }
        },

        responseCancelOrder(ret) {
            this.showWaiting = false;
            let response = responseResult(this, ret, 1, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                Toast({
                    message: '撤销成功',
                    position: 'middle',
                    duration: 4000,
                    iconClass: 'mint-toast-icon mintui mintui-success'
                });
                this.requestCancelOrderList(this.cur0);
                this.requestCancelOrderList(this.cur1);
            }
        },

        responseCommendCancelOrder(ret) {
            this.showWaiting = false;
            let response = responseResult(this, ret, 1, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                Toast({
                    message: '撤销成功',
                    position: 'middle',
                    duration: 4000,
                    iconClass: 'mint-toast-icon mintui mintui-success'
                });
                this.requestCommendCancelOrderList();
            }
        },

        //撤销实盘委托订单
        responseTradeCancelOrder(ret) {
            this.showWaiting = false;
            let response = responseResult(this, ret, 1, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                Toast({
                    message: '撤销成功',
                    position: 'middle',
                    duration: 4000,
                    iconClass: 'mint-toast-icon mintui mintui-success'
                });
                this.requestTradeCancelOrderList();
            }
        },

        responseCancelOrderList(cur, ret) {
            let response = responseResult(this, ret, 1, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                if (cur == 0) {
                    this.entrustDetailList = ret.retData.list;
                } else if (cur == 1) {
                    this.entrustDetailList1 = ret.retData.list;
                }
            }
        },

        //获取页面展示数据
        getPageData() {
            // this.showLoading = true;
            // let ret = await assetIndex(this.currentTradeId);
            let handler = this;
            assetIndex(0, function(ret) {
                handler.responsePage(ret);
            });

        },

        responsePage(ret) {
            // this.hideLoading();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.assetDetail = ret.retData;
                // this.getRealPageData(this);
                return
            }
        },

        gotoRealCommend() {
            setAssetState(2);
            this.$router.replace({
                path: '/my/index'
            });
        },
    }

}
</script>
<style lang="scss" scoped>
@import '../../../../style/mixin';
.menu {
    padding-top: $containerTop;
}

.change_market_type {
    display: flex;
    background-color: $grey4;
    padding: .4rem 0 .4rem;
    padding-top: 0.2rem;
    div {
        flex: 1;
        text-align: center;
        span {
            @include sc(.65rem, #999);
            padding: .2rem .1rem;
            border-bottom: 0.08rem solid transparent;
        }
        .activity_show {
            color: #fff;
            border-color: #fff;
        }
    }
    section {
        text-align: center;
        width: 30%;
        span {
            @include sc(.65rem, #999);
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
    .commend-hold {
        p {
            text-align: center;
            @include sc(.6rem, $fontGreyColor2);
            line-height: 1.2rem;
        }
        .menu-p {
            padding: 2.5rem .5rem .5rem;
        }
        .menu-a {
            padding: .2rem .6rem;
            @include sc(.6rem, $blue);
            border: solid $blue 0.05rem;
        }
        .top5-container {
            width: 100%;
            .title {
                width: 100%;
                @include sc(.75rem, $fontColor);
                text-align: center;
                margin: .8rem auto;
            }
            .tip {
                @include sc(.55rem, $fontGreyColor2);
                text-align: center;
                margin: .3rem;
            }
            .percent-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                border-bottom: solid 0.005rem $lineGrey4;
            }
            .percent-li {
                float: left;
                width: 30%;
                @include sc(.65rem, $fontColor);
                padding: .4rem;
            }
            .left {
                width: 70%;
                padding-left:.7rem;
                p { 
                    text-align:left;
                    line-height:.7rem;
                    @include sc(.65rem, $fontColor);
                }
                .small-item{
                   @include sc(.60rem, $fontGreyColor2); 
                }
            }
            .right {
                text-align: right;
                p {
                    text-align: center;
                    @include sc(.75rem, $fontColor);
                    padding-left: 1.5rem;
                }
                .red {
                    color: $red;
                }
            }
            .percent-title {
                margin-top:.4rem;
                .percent-li {
                    p,
                    span {
                        @include sc(.65rem, $fontGreyColor2);
                    }
                    p{
                        text-align:left;
                    }
                },
                .right {
                    
                    p{
                        text-align:right;
                    line-height:.7rem;
                    }
                    
                }
            }
            .no-record {
                margin-top: .5rem;
            }

            .entrust-list-top {
            width: 100%;

            .entrust-list-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                padding: 0.4rem 0rem;
            }
            .entrust-list-li {
                float: left;
                width: 31%;
                p {
                    @include sc(.6rem, $fontColor);
                    text-align: center;
                    padding-top: 0rem;
                }
                .time {
                    @include sc(.6rem, $fontColor);
                }
            }
            .entrust-list-li:first-child {
                width: 7%;
            }
            .name {
                p {
                    margin-top: .5rem;
                }
            }
        }
        .entrust-list-content {
            width: 100%;
            border-bottom: solid 0.05rem $lineGrey4;
            margin-bottom: 1rem;
            .entrust-list-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                padding: 0.4rem 0rem;
                border-top: solid 0.05rem $lineGrey4;
            }
            .entrust-list-li {
                float: left;
                width: 31%;
                p {
                    @include sc(.6rem, $fontColor);
                    text-align: center;
                    margin-top: 0;
                    .cancel {
                        background-color: $grey3;
                        padding: .15rem .25rem;
                    }
                }
                .info-circle {
                    width: 1rem;
                    height: 1rem;
                    background-color: $blue;
                    -moz-border-radius: 0.5rem;
                    -webkit-border-radius: 0.5rem;
                    border-radius: 0.5rem;
                    padding-top: 0.06rem;
                    float: left;
                    text-align: center;
                    font-size: 0.6rem;
                    margin-left: 0.5rem;
                }
                .up {
                    background-color: $red;
                }
                .down {
                    background-color: $green;
                }
                .change {
                background-color: $gold;
            }
            }
            .marginTop10 {
                p {
                    margin-top: .4rem;
                }
            }
            .entrust-list-li:first-child {
                width: 7%;
                p { 
                    text-align:left;
                    line-height:.7rem;
                    @include sc(.65rem, $fontColor);
                    padding-left:.5rem;
                    margin-top:0rem;
                }
                .small-item{
                   @include sc(.60rem, $fontGreyColor2);
                   display: inline-block;
                   max-width: 100%;
                   white-space: nowrap;
                   word-break: keep-all;
                   overflow: hidden;
                   text-overflow: ellipsis;

                }
            }
            .no-record {
                text-align: center;
                padding: 1rem;
                @include sc(.65rem, $fontGreyColor2);
            }
        }
        }
    }
    .show-list-container {
        margin-top: 0.2rem;
        padding: 0.3rem 0.3rem;
        .show-list-top {
            width: 100%;
            padding: 0rem 0.6rem;
            .name {
                float: left;
                @include sc(.65rem, $fontColor);
            }
            .update-date {
                float: right;
                @include sc(.55rem, $fontGreyColor2);
                padding-bottom: 0.3rem;
            }
        }
        .show-list-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            padding: 0.4rem 0rem;
            padding-bottom: 0.8rem;
            border-top: solid 0.05rem $lineGrey4;
        }
        .show-list-li {
            float: left;
            width: 33.33%;
            border-right: solid 0.05rem $lineGrey4;
            margin-top: 0.4rem;
            p {
                @include sc(.65rem, $fontColor);
                text-align: center;
            }
            .red {
                color: $red;
            }
            .green {
                color: $green;
            }
            .title {
                @include sc(.55rem, $fontGreyColor2);
                padding-bottom: 0.2rem;
            }
            .open-real {
                background-color: $blue;
                padding: 0rem 0.25rem;
            }
        }
        .show-list-li:nth-child(3),
        .show-list-li:last-child {
            border-right-width: 0px;
        }
    }
    .detail-list-container {
        margin-top: 0.2rem;
        padding: 0.3rem 0.3rem;
        width: 100%;
        .detail-list-top {
            width: 100%;
            background-color: $grey;
            .detail-list-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                padding: 0.4rem 0rem;
            }
            .detail-list-li {
                float: left;
                width: 25%;
                p {
                    @include sc(.65rem, $fontColor);
                    text-align: center;
                }
            }
        }
        .detail-list-content {
            width: 100%;
            .detail-list-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                padding: 0.4rem 0rem;
                border-top: solid 0.05rem $lineGrey4;
            }
            .detail-list-ul:last-child {
                border-bottom: solid 0.05rem $lineGrey4;
            }
            .detail-list-li {
                float: left;
                width: 25%;
                p {
                    @include sc(.65rem, $fontColor);
                    text-align: center;
                }
                .title {
                    @include sc(.55rem, $fontGreyColor2);
                    padding-bottom: 0.2rem;
                }
                .simple {
                    padding-top: 0.5rem;
                }
            }
            .up .detail-list-li {
                p {
                    color: $red;
                }
            }
            .down .detail-list-li {
                p {
                    color: $green;
                }
            }
        }
    }
    .entrust-list-container {
        margin-top: 0.2rem;
        padding: 0.3rem 0.3rem;
        .entrust-list-top {
            width: 100%;

            .entrust-list-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                padding: 0.4rem 0rem;
            }
            .entrust-list-li {
                float: left;
                width: 31%;
                p {
                    @include sc(.6rem, $fontColor);
                    text-align: center;
                    padding-top: 0rem;
                }
                .time {
                    @include sc(.6rem, $fontColor);
                }
            }
            .entrust-list-li:first-child {
                width: 7%;
            }
            .name {
                p {
                    margin-top: .5rem;
                }
            }
        }
        .entrust-list-content {
            width: 100%;
            border-bottom: solid 0.05rem $lineGrey4;
            margin-bottom: 1rem;
            .entrust-list-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                padding: 0.4rem 0rem;
                border-top: solid 0.05rem $lineGrey4;
            }
            .entrust-list-li {
                float: left;
                width: 31%;
                p {
                    @include sc(.6rem, $fontColor);
                    text-align: center;
                    margin-top: 0;
                    .cancel {
                        background-color: $grey3;
                        padding: .15rem .25rem;
                    }
                }
                .info-circle {
                    width: 1rem;
                    height: 1rem;
                    background-color: $blue;
                    -moz-border-radius: 0.5rem;
                    -webkit-border-radius: 0.5rem;
                    border-radius: 0.5rem;
                    padding-top: 0.06rem;
                    float: left;
                    text-align: center;
                    font-size: 0.6rem;
                    margin-left: 0.5rem;
                }
                .up {
                    background-color: $red;
                }
                .down {
                    background-color: $green;
                }
                .change {
                background-color: $gold;
            }
            }
            .marginTop10 {
                p {
                    margin-top: .4rem;
                }
            }
            .entrust-list-li:first-child {
                width: 7%;
            }
            .name {
                p {
                    margin-top: .5rem;
                }
            }
            .up .entrust-list-li {
                p {
                    color: $red;
                }
            }
            .down .entrust-list-li {
                p {
                    color: $green;
                }
            }
            .no-record {
                text-align: center;
                padding: 1rem;
                @include sc(.65rem, $fontGreyColor2);
            }
        }
    }
    .entrust-diy-list-container {
        margin-top: 0.2rem;
        padding: 0.3rem 0rem;
        .entrust-list-top {
            width: 100%;
            border-bottom: solid $lineGrey4 0.05rem;
            .entrust-list-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                padding: 0.4rem 0rem;
            }
            .entrust-list-li {
                float: left;
                width: 19%;
                p {
                    @include sc(.6rem, $fontColor);
                    text-align: center;
                }
            }
            .entrust-list-li:first-child {
                width: 6%;
            }
            .entrust-list-li:nth-child(2) {
                width: 31%;
            }
            .entrust-list-li:last-child {
                width: 25%;
            }
        }
        .entrust-list-content {
            width: 100%;
            margin-bottom: 1rem;
            .entrust-list-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                padding: 0.4rem 0rem;
                border-bottom: solid 0.05rem $lineGrey4;
            }
            .entrust-list-li {
                float: left;
                width: 19%;
                p {
                    @include sc(.6rem, $fontColor);
                    text-align: center;
                    margin-top: .4rem;
                    .cancel {
                        background-color: $grey3;
                        padding: .15rem .25rem;
                    }
                }
                .info-circle {
                    width: 1rem;
                    height: 1rem;
                    background-color: $blue;
                    -moz-border-radius: 0.5rem;
                    -webkit-border-radius: 0.5rem;
                    border-radius: 0.5rem;
                    padding-top: 0.06rem;
                    float: left;
                    text-align: center;
                    font-size: 0.6rem;
                    margin-left: 0.5rem;
                }
                .up {
                    background-color: $red;
                }
                .down {
                    background-color: $green;
                }
            }
            .entrust-list-li:first-child {
                width: 6%;
            }
            .entrust-list-li:nth-child(2) {
                width: 31%;
            }
            .entrust-list-li:last-child {
                width: 25%;
            }
            .name {
                p {
                    margin-top: 0rem;
                }
            }
            .up .entrust-list-li {
                p {
                    color: $red;
                }
            }
            .down .entrust-list-li {
                p {
                    color: $green;
                }
            }
            .no-record {
                text-align: center;
                padding: 1rem;
                @include sc(.65rem, $fontGreyColor2);
            }
        }
    }
    .profit-list-container {
        margin-top: 0.2rem;
        padding: 0.3rem 0.3rem;
        .profit-list-top {
            width: 100%;
            border-bottom: solid $lineGrey4 0.05rem;
            .profit-list-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                padding: 0.4rem 0rem;
            }
            .profit-list-li {
                float: left;
                width: 33.33%;
                p {
                    @include sc(.65rem, $fontColor);
                    text-align: center;
                }
            }
        }
        .profit-list-content {
            width: 100%;
            border-bottom: solid 0.05rem $lineGrey4;
            .profit-list-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                padding: 0.4rem 0rem;
                border-top: solid 0.05rem $lineGrey4;
            }
            .profit-list-li {
                float: left;
                width: 33.33%;
                p {
                    @include sc(.65rem, $fontColor);
                    text-align: center;
                }
                .up {
                    background-color: $red;
                }
                .down {
                    background-color: $green;
                }
            }
            .up .profit-list-li {
                p {
                    color: $red;
                }
            }
            .down .profit-list-li {
                p {
                    color: $green;
                }
            }
            .no-record {
                text-align: center;
                padding: 1rem;
                @include sc(.65rem, $fontGreyColor2);
            }
        }
    }
    .history-list-container {
        width: 100%;
        margin-top: 0.2rem;
        padding: 0.3rem 0.3rem;
        .history-list-top {
            width: 100%;
            border-bottom: solid $lineGrey4 0.05rem;
            .history-list-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                padding: 0.4rem 0rem;
            }
            .history-list-li {
                float: left;
                width: 25%;
                p {
                    @include sc(.65rem, $fontColor);
                    text-align: center;
                }
            }
        }
        .no-data {
                margin-top: 1rem;
                padding: 1rem;
                @include sc(.65rem, $fontGreyColor2);
                background-color: $grey;
            }
        .history-list-content {
            width: 100%;
            border-bottom: solid 0rem $lineGrey4;
            .no-record {
                display: none;
                text-align: center;
                padding: 1rem;
                @include sc(.65rem, $fontGreyColor2);
            }
            .no-data {
                margin-top: 1rem;
                padding: 1rem;
                @include sc(.65rem, $fontGreyColor2);
                background-color: $grey;
            }
            .history-list-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                padding: 0.4rem 0rem;
                border-bottom: solid 0.05rem $lineGrey4;
            }
            .history-list-ul:last-child {
                border-bottom-width: 0px;
            }
            .history-list-li {
                float: left;
                width: 25%;
                p {
                    @include sc(.65rem, $fontColor);
                    text-align: center;
                }
                .up {
                    background-color: $red;
                }
                .down {
                    background-color: $green;
                }
            }
            .up .history-list-li {
                p {
                    color: $red;
                }
            }
            .down .history-list-li {
                p {
                    color: $green;
                }
            }
            .no-record {
                text-align: center;
                padding: 1rem;
                @include sc(.65rem, $fontGreyColor2);
            }
        }
    }
}

.profile-1reTe {
    margin-top: .4rem;
    background: $grey;
    .myorder {
        padding-left: 1.6rem;
        display: flex;
        align-items: center;
        aside {
            @include wh(.7rem, .7rem);
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
            border-bottom: 1px solid #555;
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
                top: 31%;
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
                @include wh(.46667rem, .466667rem);
                svg {
                    @include wh(100%, 100%);
                }
            }
        }
    }
}
.no-record {
    text-align: center;
    padding: 1rem;
    @include sc(.65rem, $fontGreyColor2);
}
</style>
