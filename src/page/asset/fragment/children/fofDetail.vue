<template>
    <div class="market_container">

            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
            <defs>
                <symbol viewBox="0 0 1024 1024" id="buyIn" class="icon">
                    <path d="M749.614258 723.757868 349.693916 723.757868c-17.141402 0-31.914874-12.065803-35.326577-28.859281L184.569134 179.38353l-104.545054-34.086329c-16.906042-10.511401-22.090111-32.738635-11.57871-49.646724 10.510378-16.903995 32.747845-22.096251 49.646724-11.57564l117.738541 42.279942c8.423857 5.235235 14.3181 13.712303 16.287965 23.430642l127.027092 501.873362 345.793584 0 165.794024-252.170277c7.198959-18.551518 28.093848-27.762297 46.65253-20.568455 18.549471 7.203052 27.765367 28.086685 20.566408 46.64946L783.216563 700.742688C777.845229 714.62486 764.494153 723.757868 749.614258 723.757868L749.614258 723.757868z" p-id="27339" fill="#e0e0e0"></path><path d="M721.001593 307.860646 591.079568 454.94147c-7.091512 8.023744-18.685571 8.023744-25.777083 0L435.354877 307.860646c-7.090489-8.024767-4.13211-14.5903 6.574742-14.5903l102.186334 0L544.115953 128.58047c0-10.708899 8.757454-19.465331 19.465331-19.465331l29.196972 0c10.707876 0 19.464307 8.756431 19.464307 19.465331L612.242564 293.272393l102.183264 0C725.137797 293.272393 728.093105 299.838949 721.001593 307.860646L721.001593 307.860646z" p-id="27340" fill="#e0e0e0"></path><path d="M412.567895 881.754299m-63.956637 0a62.5 62.5 0 1 0 127.913275 0 62.5 62.5 0 1 0-127.913275 0Z" p-id="27341" fill="#e0e0e0"></path><path d="M744.119103 881.754299m-63.956637 0a62.5 62.5 0 1 0 127.913275 0 62.5 62.5 0 1 0-127.913275 0Z" p-id="27342" fill="#e0e0e0"></path>
                </symbol>
                <symbol viewBox="0 0 1024 1024" id="sellOut" class="icon">
                    <path d="M749.614 723.758h-399.92c-17.141 0-31.915-12.066-35.327-28.86L184.57 179.385 80.024 145.297c-16.906-10.511-22.09-32.738-11.579-49.647 10.51-16.904 32.748-22.096 49.647-11.575l117.739 42.28a36.014 36.014 0 0 1 16.288 23.43L379.146 651.66h345.793l165.794-252.17c7.2-18.552 28.094-27.763 46.653-20.569 18.55 7.203 27.765 28.087 20.566 46.65L783.217 700.743c-5.372 13.882-18.723 23.015-33.603 23.015z m-28.612-461.545L591.08 115.133c-7.092-8.025-18.686-8.025-25.778 0l-129.947 147.08c-7.09 8.025-4.132 14.59 6.575 14.59h102.186v164.69c0 10.71 8.757 19.466 19.465 19.466h29.197c10.708 0 19.465-8.757 19.465-19.466V276.801h102.183c10.712 0 13.667-6.565 6.576-14.588zM348.61 881.754a62.5 62.5 0 1 0 127.914 0 62.5 62.5 0 1 0-127.914 0z m331.551 0a62.5 62.5 0 1 0 127.914 0 62.5 62.5 0 1 0-127.914 0z" fill="#e0e0e0" p-id="28124"></path>
                </symbol>
            </defs>
            <defs>
                <symbol viewBox="0 0 1024 1024" id="drague" class="icon">
                    <path d="M675.8 132.5c-209.9-84.1-448.3 18-532.4 227.9-84.1 210 18 448.3 227.9 532.4 209.9 84.1 448.3-18 532.4-227.9C987.8 454.9 885.8 216.5 675.8 132.5zM856.2 645.8c-73.5 183.4-282.4 272.9-465.8 199.4C207 771.8 117.5 562.8 191 379.4 264.4 196 473.4 106.5 656.8 180S929.7 462.4 856.2 645.8z" p-id="2244" fill="#e0e0e0"></path>
                    <path d="M674 522.4c-29.8 57.5-120.8 69.5-203.2 26.8-82.4-42.7-125.1-123.9-95.3-181.4 24.4-47.1 90-63.7 158.2-44.6 2 0.6 4.1 0.5 6.1-0.1l1.9-0.6c5-1.7 8-6.9 6.8-12l0 0c-0.8-3.6-3.5-6.4-7-7.5-82.8-25.3-163.5-6.2-193.1 50.9C313.2 421.6 363.6 517.6 461 568c97.4 50.5 204.9 36.3 240.1-31.6 25.4-49 6.2-112.5-42.9-163-4.8-5-13.1-3.8-16.4 2.3l-1 1.8c-2.1 3.9-1.4 8.6 1.5 11.8C680.4 431.3 694.6 482.5 674 522.4z" p-id="2245" fill="#e0e0e0"></path>
                    <path d="M633.8 324.5 529.7 458.9c-5.4 6.9-15.3 8.2-22.3 2.8l0 0c-6.9-5.4-8.2-15.3-2.8-22.3l104.1-134.4c5.4-6.9 15.3-8.2 22.3-2.8l0 0C637.9 307.6 639.1 317.6 633.8 324.5z" p-id="2246" fill="#e0e0e0"></path>
                    <path d="M418.8 604.1l-49.6 83c-4.5 7.5-14.2 10-21.8 5.5l0 0c-7.5-4.5-10-14.2-5.5-21.8l49.6-83c4.5-7.5 14.2-10 21.8-5.5l0 0C420.8 586.8 423.3 596.6 418.8 604.1z" p-id="2247" fill="#e0e0e0"></path>
                    <path d="M595.7 706.1l-245-2.1c-8.8-0.1-15.8-7.2-15.7-16l0 0c0.1-8.8 7.2-15.8 16-15.7l245 2.1c8.8 0.1 15.8 7.2 15.7 16l0 0C611.6 699.1 604.4 706.1 595.7 706.1z" p-id="2248" fill="#e0e0e0"></path>
                </symbol>
            </defs>
            <defs>
                <symbol viewBox="0 0 1024 1024" id="flag" class="icon">
                    <path d="M292.7601 871.931309l252.511801-559.243646L797.807223 871.931309 292.7601 871.931309zM508.888637 307.53768 508.888637 2.602603 149.025854 787.439261l143.171797 0L508.888637 307.53768zM581.657211 871.931309l0 34.299137L872.800026 906.230446l0 25.240647-77.147493 0c-28.421038 34.604905-86.230526 92.528927-154.877886 92.528927-97.796514 0-413.384367 0-413.384367 0l27.767575-60.148251c45.726047-35.541637 154.012738-57.621323 290.442311-57.621323L545.600167 871.931309 581.657211 871.931309zM581.657211 306.08554l-36.057045-79.582384L545.600167 3.328673l36.057045 0L581.657211 306.08554z" p-id="1294" fill="#e0e0e0"></path>
                </symbol>
            </defs>
        </svg>
        <head-top signin-up='home' head-title="市场" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <div v-wechat-title="$route.meta.title"></div>
            <!-- 展示涨跌信息 -->
            <!--             <section class="menu-top">
                <div class="down">
                    <p><span class="title">10.00</span></p>
                    <p><span>10.00</span>&nbsp;&nbsp;<span>12.12%</span></p>
                    <p>昨收 <span>1122.22</span> &nbsp;&nbsp;&nbsp;&nbsp;今开 <span>1001.11</span></p>
                </div>
            </section> -->
            <section class="menu-top1" :class="{menu_top_margin1:isWeixin=='false'}">
                <div class="left" :class="{down:increase >= 0,up:increase <0}">
                    <p class="title">
                        <span v-cloak>{{currentPrice}}</span>
                        <span class="divsvg" @click="showTip">
                            <svg fill="#ddd">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tip"></use>
                            </svg>
                        </span>
                    </p>
                    <p class="sub-title"><span v-cloak>{{priceDif}}</span>&nbsp;&nbsp;<span v-cloak>{{increase}}%</span></p>
                </div>
                <div class="right" :class="{down:increase >= 0,up:increase <0}">
                    <p>昨收：<span v-cloak>{{closePrice}}</span></p>
                    <!-- <p>今开：<span v-cloak>{{openPrice}}</span></p> -->
                </div>
            </section>
            <section class="menu-chart-type" :class="{menu_top_margin:isWeixin=='false'}">
                <div class="chart-type">
                    <ul>
                        <li><span :class='{activity_k: changeKType =="minute"}' @click="changeKType='minute'">分时</span></li>
                        <li><span :class='{activity_k: changeKType =="day"}' @click="changeKType='day'">日K</span></li>
                        <li><span :class='{activity_k: changeKType =="week"}' @click="changeKType='week'">周K</span></li>
                        <li><span :class='{activity_k: changeKType =="month"}' @click="changeKType='month'">月K</span></li>
                    </ul>
                </div>
            </section>
            <!-- 展示日K线 -->
            <section class="menu-middle">
                <div class="chart-container" v-show="changeKType ==='minute'">
                    <div id="report0" class="report2">
                    </div>
                    <div id="chart0" class="chart2">
                        <p v-show="minuteLineData ==null" class="loading">加载中……</p>
                    </div>
                </div>
                <div class="chart-container" v-show="changeKType ==='day'">
                    <div id="report" class="report">
                    </div>
                    <div id="chart" class="chart1">
                        <p v-show="dayLineData ==null" class="loading">加载中……</p>
                    </div>
                </div>
                <div class="chart-container" v-show="changeKType ==='week'">
                    <div id="report1" class="report">
                    </div>
                    <div id="chart1" class="chart">
                        <p v-show="weekLineData ==null" class="loading">加载中……</p>
                    </div>
                </div>
                <div class="chart-container" v-show="changeKType ==='month'">
                    <div id="report2" class="report">
                    </div>
                    <div id="chart2" class="chart">
                        <p v-show="monthLineData ==null" class="loading">加载中……</p>
                    </div>
                </div>
                <section class="manager-list-container">
                    <ul class="manager-list-ul">
                        <li class="manager-list-li" @click="buyFOFClick()">
                            <p class="icon">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#buyIn"></use>
                                </svg>
                            </p>
                            <p class="manager-item" :class="{activity_trade:assetFOFTypeData !='' && currentAvliableAccount >0}">买入</p>
                        </li>
                        <li class="manager-list-li" @click="sellFOFClick()">
                            <p class="icon">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sellOut"></use>
                                </svg>
                            </p>
                            <p class="manager-item" :class="{activity_trade:isCanSell ==true && isCanBuy ==true}">卖出</p>
                        </li>
                        <li class="manager-list-li">
                            <a href="http://h5.baomap.com/home/study-radar">
                                <p class="icon">
                                    <svg fill="#bbb">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#drague"></use>
                                    </svg>
                                </p>
                                <p>雷达</p>
                            </a>
                        </li>
                        <li class="manager-list-li">
                            <a href="http://h5.baomap.com/home/study-drogue">
                                <p class="icon">
                                    <svg fill="#bbb">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#flag"></use>
                                    </svg>
                                </p>
                                <p>风向标</p>
                            </a>
                        </li>
                    </ul>
                </section>
            </section>
            <!-- 展示关于、新闻、成分股 -->
            <section class="menu-bottom">
                <div class="menu-type">
                    <ul>
                       <li><span :class='{activity_k: changeMenuType =="about"}' @click="changeMenuType='about'">关于</span></li>
                        <li><span :class='{activity_k: changeMenuType =="time"}' @click="changeMenuType='time'">时间</span></li>
                        <li><span :class='{activity_k: changeMenuType =="rule"}' @click="changeMenuType='rule'">规则</span></li>
                        <li>
                            <span :class='{activity_k: changeMenuType =="name"}' @click="changeMenuType='name'">命名</span>
                        </li>
                        <li><span :class='{activity_k: changeMenuType =="other"}' @click="changeMenuType='other'">其它</span></li>
                    </ul>
                </div>

                <section v-if="changeMenuType =='about'" class="menu-container">
                    <div class="container-content" v-html="replaceHtml(aboutHtml)"></div>
                </section>

                <section class="menu-container" v-else>
                    <trade-node :type="changeMenuType"></trade-node>
                </section>
            </section>
            <trade-panel v-show="showTrade" @closeTrade="closeTradePanel" :name="currentChoiceFOF" :account="currentAccount" :avliableAccount="currentAvliableAccount" :type="currentType" :typeName="currentTypeName" :price="currentChoiceFOFPrice" :fofId="currentChoiceFOFId" @updateData="updateData">
            </trade-panel>
            <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        </section>
    </div>
</template>
<script>
import headTop from '../../../../components/header/head'
import tradePanel from '../../../../components/common/tradePanel'
import {
    drawMinuteKLine,
    interval
} from '../../../../utils/kMinuteLine.js'
import {
    drawDayKLine
} from '../../../../utils/kDayLine.js'
import BScroll from 'better-scroll'
import {
    indexDetail,
    indexData,
    assetDiyIndex,
    assetFOFList,
    assetFOFDayLine,
    assetFOFWeekLine,
    assetFOFMonthLine,
    checkTrade,
    fofAnalyseDetail,
    assetMinuteLine,
    assetLineBaseInfo
} from '../../../../service/getData'
import alertTip from '../../../../components/common/alertTip'
import tradeNode from '../../children/fofcomponents'
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
} from '../../../../config/const'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_SYSTEM,
    RESPONSE_CODE_ERROR_TOKEN
} from '../../../../config/response'
import {
    getToken,
    setBack,
    setAssetFOFList,
    setAssetFOFTypeList,
    setReturnUrl,
    getReturnUrl,
} from '../../../../store/store'
export default {
    components: {
        headTop,
        tradePanel,
        alertTip,
        tradeNode
    },

    data() {
        return {
            changeMenuType: 'about', //切换菜单，新闻、成分股、关于
            changeKType: 'minute', //切换主要市场
            indexDetail: '', //指数数据详情
            isLogin: true, //用户是否登录
            pageType: 0, //0代表主要市场，1、代表大类指数，2、代表大类资产包

            showAlert: false, //显示提示组件
            alertText: null, //提示的内容

            lockReconnect: false, //避免重复发起连接
            conn: null, //socket连接
            fofConn: null, //FOFTypeList socket连接
            fofLockReconnect: false, //避免重复发起连接
            isDestory: false, //是否关闭socket

            currentChoiceFOFId: '', //当前选择买卖的FOF的ID
            currentChoiceFOF: '', //当前选择买卖的FOF
            currentChoiceFOFName: '', //当前选择买卖的FOF用户控制开启或者关闭下单面板
            canTrade: true, //持仓是否能够交易
            showTrade: false, //是否显示下单面板
            currentAccount: 0, //当前FOF用户持有的数量
            currentAvliableAccount: 0, //当前FOF可购买数量
            currentType: 0, //当前下单面板的类型
            currentTypeName: '买入', //当前下单面板的类型名称
            currentChoiceFOFPrice: 0, //当前FOF的价格
            cash: 0, // 可用现金
            assetDetail: '', //用户资产信息
            uid: '', //用户的ID
            assetProfileHoldData: '', //用户持仓的最近价格等和用户的资产信息
            assetFOFTypeData: '', //用户持仓的最近价格等和用户的资产信息
            isCanBuy: false, //是否能买
            isCanBuy1: false, //是否可以买入
            isCanSell: false, //是否能卖
            minuteLineData:null,//分钟线数据
            dayLineData: null, //日K线数据
            weekLineData: null, //周K线数据
            monthLineData: null, //月K线数据
            openPrice: '0.00', //今开
            closePrice: '0.00', //昨收
            currentPrice: '0.00', //现价
            increase: '0.00', //涨跌幅
            priceDif: '0.00', //涨跌幅度
            tradeFlag: false, //是否需要获取实时数据
            dif: 0, //离开盘的时间
            aboutHtml: '', //关于
            isWeixin: 'true', //是否是微信
        }
    },

    watch: {
        //日K、周K、月K切换状态
        changeKType: function(value) {

            // this.initChart(value);
        },

        //新闻、成分股、关于切换状态
        changeMenuType: function(value) {
            if (value === "news") {

            }
        },
    },

    created() {
        this.initData();
        window.scrollTo(0, 0);

        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            this.isWeixin = "true";
        } else {
            this.isWeixin = "false";
        }
    },

    methods: {

        //初始化获取数据
        initData() {
            if (this.$route.query.type) {
                this.pageType = this.$route.query.type;
            }
            if (this.$route.query.name) {
                this.$route.meta.title = this.$route.query.name;
            }

            // if (this.$route.query.cp) {
            //     this.currentPrice = this.$route.query.cp;
            // }

            if (this.$route.query.i) {
                this.increase = this.$route.query.i;
            }

            if (this.$route.query.pd) {
                this.priceDif = this.$route.query.pd;
            }

            if (this.$route.query.fofId) {
                this.currentChoiceFOFId = this.$route.query.fofId;
            }

            if (this.$route.query.name) {
                this.currentChoiceFOF = this.$route.query.name;
            }
            this.getBaseInfo();
            this.getMinuteLineData();
            this.getIndexData();
        },
        //k线
        initChart(ktype) {
            // Indicator.open();
            let handler = this;
            if (ktype == 'minute') {
                drawMinuteKLine(this.minuteLineData,this.currentChoiceFOFId, '分时线', this.currentChoiceFOF, 'report0', 'chart0', null);
                Indicator.close();
            }
            else if (ktype == 'day') {
                drawDayKLine(this.dayLineData, '日线', this.currentChoiceFOF, 'report', 'chart', null);
                Indicator.close();
            } else if (ktype == 'week') {

                drawDayKLine(this.weekLineData, '周线', this.currentChoiceFOF, 'report1', 'chart1', function() {

                    Indicator.close();
                    handler.getMonthLineData();
                });

            } else if (ktype == 'month') {
                drawDayKLine(this.monthLineData, '月线', this.currentChoiceFOF, 'report2', 'chart2', function() {
                    Indicator.close();
                });
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
                if (this.tradeFlag == true || this.tradeFlag == 'true') {
                    this.getSocketHoldFOFData(this);
                    this.getSocketFOFDataByType(this);
                } else {
                    this.setTimeUpdateData();
                }
                return
            }
        },

        //获取关于数据
        getAnalyseDetail() {
            // this.showLoading = true;
            // let ret = await assetIndex(this.currentTradeId);
            let handler = this;
            fofAnalyseDetail(this.currentChoiceFOFId, function(ret) {
                handler.responseAnalyseDetail(ret);
            });
        },
        responseAnalyseDetail(ret) {
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.aboutHtml = ret.retData.content;
                return
            }
        },

        //获取昨收、今开数据
        getBaseInfo() {
            // this.showLoading = true;
            // let ret = await assetIndex(this.currentTradeId);
            let handler = this;
            assetLineBaseInfo(this.currentChoiceFOFId, function(ret) {
                handler.responseBaseInfo(ret);
            });
        },
        responseBaseInfo(ret) {
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.openPrice = ret.retData.data.openPrice;
                this.closePrice = ret.retData.data.closePrice;
                // this.currentPrice = ret.retData.data.curPrice;
                this.increase = ret.retData.data.increase;
                this.priceDif = ret.retData.data.priceDif;
                return
            }
        },

        //获取基础数据
        getIndexData() {
            // Indicator.open();
            let handler = this;
            assetDiyIndex(0, function(ret) {
                handler.responseIndex(ret);
            });
        },

        responseIndex(ret) {
            //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
            // Indicator.close();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                let assetDetail = ret.retData;
                this.cash = assetDetail.cash;
                this.getCheckTradeData();
                this.requestFOFTypeList();
                this.isLogin = true;
                this.assetProfileHoldData = assetDetail.fofList;
                this.uid = assetDetail.uid;
                this.responseProfileHoldData();
                return;
            } else if (response == RESPONSE_CODE_ERROR_TOKEN) {
                this.isLogin = false;
            }
        },

        //获取分钟线数据
        getMinuteLineData() {
            Indicator.open();
            let handler = this;
            assetMinuteLine(this.currentChoiceFOFId, function(ret) {
                handler.responseMinuteLine(ret);
            });
        },

        //获取日线数据
        getDayLineData() {
            Indicator.open();
            let handler = this;
            assetFOFDayLine(this.currentChoiceFOFId, function(ret) {
                handler.responseDayLine(ret);
            });
        },

        //获取周线数据
        getWeekLineData() {
            let handler = this;
            assetFOFWeekLine(this.currentChoiceFOFId, function(ret) {
                handler.responseWeekLine(ret);
            });
        },

        //获取月线数据
        getMonthLineData() {
            let handler = this;
            assetFOFMonthLine(this.currentChoiceFOFId, function(ret) {
                handler.responseMonthLine(ret);
            });
        },

        responseMinuteLine(ret) {
            //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.minuteLineData = ret.retData;
                this.currentPrice = ret.retData.curPrice;
                // if (this.changeKType === 'day') {
                this.getDayLineData();
                this.getAnalyseDetail();
                this.initChart('minute');
                // }
                return;
            } else if (response == RESPONSE_CODE_ERROR_TOKEN) {

            }
        },

        responseDayLine(ret) {
            //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.dayLineData = ret.retData;
                // if (this.changeKType === 'day') {
                this.initChart('day');
                this.getWeekLineData();
                // }
                return;
            } else if (response == RESPONSE_CODE_ERROR_TOKEN) {

            }
        },

        responseWeekLine(ret) {
            //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.weekLineData = ret.retData;
                // if (this.changeKType === 'week') {
                this.initChart('week');
                this.getMonthLineData();
                // }
                return;
            } else if (response == RESPONSE_CODE_ERROR_TOKEN) {

            }
        },

        responseMonthLine(ret) {
            //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
            // Indicator.close();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.monthLineData = ret.retData;
                // if (this.changeKType === 'month') {
                this.initChart('month');
                // }
                return;
            } else if (response == RESPONSE_CODE_ERROR_TOKEN) {

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
                this.assetFOFTypeData = ret.retData.list;
                // this.responseFOFData();
                for (let i = 0; i < this.assetFOFTypeData.length; i++) {
                    if (this.currentChoiceFOFId == this.assetFOFTypeData[i]['fofId']) {
                        this.currentChoiceFOF = this.assetFOFTypeData[i]['name'];
                        this.currentChoiceFOFPrice = this.assetFOFTypeData[i]['price'];
                        try {
                            let amount = parseInt(parseFloat(this.cash.replace(",", "")) / parseFloat(this.currentChoiceFOFPrice.replace(",", "")));
                            this.currentAvliableAccount = amount;
                            this.isCanBuy = true;
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
            }
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
                            handler.reconnectFOFList();
                        }

                    };
                    handler.conn.onclose = function(evt) {
                        // console.log("websocket close");
                        handler.reconnectFOFList();
                    };
                    handler.conn.onmessage = function(evt) {
                        try {
                            if (evt.data) {
                                let data = JSON.parse(evt.data);
                                handler.assetProfileHoldData = data.fofArr;
                                handler.cash = data.cash;
                                handler.responseProfileHoldData();
                            }
                        } catch (e) {

                        }
                    };
                } catch (e) {}

            } else {}
        },

        //如果socket连接中断，每隔2s重试连接
        reconnectFOFList() {
            let handler = this;
            if (handler.lockReconnect) return;
            if (handler.isDestory) return;
            handler.lockReconnect = true;
            //没连接上会一直重连，设置延迟避免请求过多
            setTimeout(function() {
                handler.reconnectFOFList(handler);
                handler.lockReconnect = false;
            }, 5000);
        },

        //获取FOF类型的socket数据
        getSocketFOFDataByType(handler) {
            if (window["WebSocket"]) {
                try {
                    handler.fofConn = new WebSocket(SOCKET_URL_FOF_LIST);
                    handler.fofConn.onopen = function() {
                        // console.log("websocket send");
                        if (handler.fofConn.readyState === 1) {
                            handler.fofConn.send('type:' + REQ_TYPE_SIMPLE_FOF);
                        } else {
                            handler.fofTypeReconnect();
                        }
                    };
                    handler.fofConn.onclose = function(evt) {
                        // console.log("websocket close");
                        //onclose reconnect
                        handler.fofTypeReconnect();
                    };
                    handler.fofConn.onmessage = function(evt) {
                        try {
                            if (evt.data) {
                                let data = JSON.parse(evt.data);
                                handler.assetFOFTypeData = data;
                                handler.responseFOFData();
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
        responseFOFData() {
            for (let i = 0; i < this.assetFOFTypeData.length; i++) {
                if (this.currentChoiceFOFId == this.assetFOFTypeData[i]['fofId']) {
                    this.currentChoiceFOF = this.assetFOFTypeData[i]['symbolName'] + " " + this.assetFOFTypeData[i]['symbolNum'];
                    this.currentChoiceFOFPrice = this.assetFOFTypeData[i]['price'];
                    try {
                        let amount = parseInt(parseFloat(this.cash.replace(",", "")) / parseFloat(this.currentChoiceFOFPrice.replace(",", "")));
                        this.currentAvliableAccount = amount;
                        this.isCanBuy = true;
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        },

        responseProfileHoldData() {
            this.isCanBuy1 = true;
            for (let i = 0; i < this.assetProfileHoldData.length; i++) {
                if (this.currentChoiceFOFId == this.assetProfileHoldData[i]['fofId']) {
                    this.currentChoiceFOF = this.assetProfileHoldData[i]['name'];
                    this.currentAccount = this.assetProfileHoldData[i]['amount'];
                    this.currentChoiceFOFPrice = this.assetProfileHoldData[i]['currentPrice'];
                    this.isCanSell = true;
                    break;
                }else{
                    this.currentAccount = 0;//没有持仓说明持仓数量为0
                    this.isCanSell = false;
                }
            }
        },

        buyFOFClick() {
            if (this.isLogin == false) {
                this.$router.push({
                    path: '/login'
                });
                this.$router.go(1);
                return;
            }

            if (this.assetFOFTypeData == '') {
                Toast({
                    message: '数据加载中，请稍后操作',
                    position: 'middle',
                    duration: 4000,
                });
                return;
            }

            if (this.currentAvliableAccount <= 0) {
                Toast({
                    message: '您的可用现金不足，不能买入',
                    position: 'middle',
                    duration: 4000,
                });
                return;
            }

            this.showTrade = true;
            this.currentType = 0;
            this.currentTypeName = '买入';
        },
        sellFOFClick() {
            if (this.isLogin == false) {
                this.$router.push({
                    path: '/login'
                });
                this.$router.go(1);
                return;
            }

            // if (this.assetProfileHoldData == '') {
            //     Toast({
            //         message: '数据加载中，请稍后操作',
            //         position: 'middle',
            //         duration: 4000,
            //     });
            //     return;
            // }

            if (this.isCanBuy == false || this.isCanSell == false) {
                Toast({
                    message: '您未持有此FOF，不能进行卖出操作',
                    position: 'middle',
                    duration: 4000,
                });
                return;
            }

            this.showTrade = true;
            this.currentType = 1;
            this.currentTypeName = '卖出';
        },
        showTip() {
            this.showAlert = true;
            this.alertText = "数据延迟十五分钟";
        },
        closeTip() {
                this.showAlert = false;
        },

        closeTradePanel() {
            this.showTrade = false;
        },
        
        updateData(){
            this.getIndexData();
        },

        replaceHtml(html){
            var tmpHtml = html.replace(/color:red/g,"color:#ffffff");
            tmpHtml = tmpHtml.replace(/font-family:宋体/g,"font-family:微软雅黑");
            tmpHtml = tmpHtml.replace(/line-height:150%/g,"line-height:220%;color:#ffffff");
            tmpHtml = tmpHtml.replace(/font-size:14px/g,"font-size:18px");
            return tmpHtml;
        }

    },
    //增加倒计时，获取开盘时间倒计时 
    setTimeUpdateData() {
        let handler = this;
        window.setTimeout(function() {
            handler.getSocketHoldFOFData(handler);
            handler.getSocketFOFDataByType(handler);
        }, this.dif * 1000);
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
            if(interval !=''){
            clearInterval(interval);
            }
        } catch (e) {

        }

    }

}
</script>
<style lang="scss" scoped>
@import '../../../../style/mixin';
.menu {
    padding-top: $containerTop;
}

.menu-top {
    display: black;
    padding: 0.5rem 0.8rem;
    text-align: center;
    p {
        @include sc(.65rem, $fontColor);
        text-align: center;
        padding-top: 6px;
    }
    .up p span {
        color: $red;
    }
    .down p span {
        color: $green;
    }
    .title {
        font-size: 0.9rem;
        position:relative;
        .divsvg {
            position: absolute;
            top: -.2rem;
            right: 0.5rem;
            @include wh(.7rem, .7rem);
            svg {
                @include wh(100%, 100%);
            }
        }
    }
    ul {
        list-style: none;
        margin: 0 auto;
        overflow: hidden;
        width: 100%;
    }
    ul li {
        float: left;
        width: 20%;
        padding-top: 10px;
        p {
            @include sc(.5rem, $fontColor);
            text-align: center;
            padding-top: 6px;
        }
        .title {
            @include sc(.75rem, $fontColor);
        }
    }
    ul li:first-child {
        width: 40%;
        padding-top: 0px;
    }
    ul li:nth-child(2),
    ul li:nth-child(4) {
        width: 10%
    }
    .up li span,
    .up li p span {
        color: $red;
    }
    .down li span,
    .down li p span {
        color: $green;
    }
}

.menu-top1 {
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    padding: .2rem .5rem .2rem;
    background-color: #252527;
    div {
        flex: 1;
        p {
            @include sc(.65rem, $fontColor);
            text-align: center;
        }
        .title {
            span {
                @include sc(.95rem, $fontColor);
            }
            position:relative;
           .divsvg {
                position: absolute;
                top: -0.1rem;
                right: 0.7rem;
                @include wh(.7rem, .7rem);
                svg {
                    @include wh(100%, 100%);
                }
           }
        }
        .sub-title {
            padding: 0px;
            span {
                @include sc(.58rem, $fontColor);
            }
        }
    }
    .up p span {
        color: $red;
    }
    .down p span {
        color: $green;
    }
    .right{
        text-align:left;
        p{
            text-align:left;
        } 
    }
}

.menu_top_margin1 {
    top: 1.95rem !important;
}

.menu_top_margin {
    top: 4.2rem !important;
}

.menu-chart-type {
    z-index: 10;
    position: fixed;
    top: 2.3rem;
    left: 0;
    width: 100%;
    .chart-type {
        width: 100%;
        background-color: $grey;
        ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 60%;
            margin: auto;
            padding: 0.4rem 0rem;
        }
        ul li {
            float: left;
            width: 25%;
            @include sc(.65rem, $fontGreyColor);
            text-align: center;
            span {
                color: $fontGreyColor2
            }
            .activity_k {
                color: #ffffff;
                border-bottom: solid .08rem #ffffff;
            }
        }
    }
}

.menu-middle {
    z-index: 1;
    margin-top: 4.2rem;
    .chart-container {
        .chart {
            width: 100%;
            height: 285px;
            margin-top: .8rem;
            .loading {
                text-align: center;
                @include sc(.65rem, $fontGreyColor);
            }
        }
        .chart1 {
            width: 100%;
            height: 285px;
            margin-top:.8rem;
            .loading {
                text-align: center;
                @include sc(.65rem, $fontGreyColor);
            }
        }
        .chart2 {
            width: 100%;
            height: 235px;
            .loading {
                text-align: center;
                @include sc(.65rem, $fontGreyColor);
            }
        }
        .report {
            height: 1.5rem;
            padding-top: 0.25rem;
            padding-left: 0.25rem;
            font-size: 0.5rem;
            ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
            }
            ul li {
                float: left;
                width: 25%;
                p {
                    @include sc(.55rem, $fontGreyColor);
                    line-height: .55rem;
                }
            }
            p {
                padding-top: .2rem;
            }
        }
        .tip-report{
            margin-top:1rem;
            @include sc(.65rem, $fontGreyColor);
            line-height: .65rem;
            margin-left:.2rem;
        }
        .report2 {
            height:1.2rem;
            font-size: 0.55rem;
        }
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
            .manager-item{
                color:#666666;
            }
            .activity_trade{
               @include sc(.65rem, $fontColor); 
            }

        }
        .manager-list-li:last-child {
            width: 31%;
        }
    }
}

.menu-bottom {
    display: black;
    margin-top: .2rem;
    .menu-type {
        width: 100%;
        background-color: $grey;
        ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            margin: auto;
            padding: 0.4rem 0rem;
            border-style: solid none solid none;
            border-width: 1px;
            border-color: $grey;
        }
        ul li {
            float: left;
            width: 20%;
            @include sc(.65rem, $fontGreyColor);
            text-align: center;
            span {
                color: $fontGreyColor2
            }
            .activity_k {
                color: #ffffff;
            }
        }
    }
    .menu-container {
        min-height: 200px;
        width: 100%;
        .container-content {
            font-size: .65rem;
            padding: .5rem .3rem 1rem .1rem;
            color:#e0e0e0!important;
            p{
                color:#e0e0e0!important;
                span{
                    color:#e0e0e0!important;
                }
            }
        }
    }
}

@media screen and (orientation:portrait) {
    .menu-top {
        display: black;
    }
    .menu-middle {
        .chart-type {
            display: black;
        }
    }
    .menu-bottom {
        display: black;
    }
}

@media screen and (orientation:landscape) {
    .menu-top {
        display: none;
    }
    .menu-middle {
        .chart-type {
            display: none;
        }
        .report {
            height: 40px;
            padding-top: 0.25rem;
            padding-left: 0.25rem;
            font-size: 0.35rem;
        }
    }
    .menu-bottom {
        display: none;
    }
    .highcharts-range-selector-buttons {
        display: none !important;
    }
}
</style>
