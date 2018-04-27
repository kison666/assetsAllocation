<template>
    <div class="market_container">
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
                    <span>{{currentPrice}}</span>
                    <span class="divsvg" @click="showTip">
                        <svg fill="#ddd">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tip"></use>
                        </svg>
                    </span>
                    </p>
                    <p class="sub-title"><span>{{priceDif}}</span>&nbsp;&nbsp;<span>{{increase}}%</span></p>
                </div>
                <div class="right" :class="{down:increase >= 0,up:increase <0}">
                    <p>昨收：<span v-cloak>{{closePrice}}</span></p>
                    <!-- <p>今开：<span v-cloak>{{openPrice}}</span></p> -->
                </div>
            </section>
            <section class="menu-chart-type" :class="{menu_top_margin:isWeixin=='false'}">
                <div class="chart-type">
                    <ul>
<!--                         <li><span :class='{activity_k: changeKType =="minute"}' @click="changeKType='minute'">分时</span></li> -->
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
            </section>
            <!-- 展示关于、新闻、成分股 -->
            <section class="menu-bottom">
                <div class="menu-type">
                    <ul>
                        <!--                         <li><span :class='{activity_k: changeMenuType =="news"}' @click="changeMenuType='news'">新闻</span></li> -->
                        <li>
                            <p :class='{activity_k: changeMenuType =="about"}' @click="changeMenuType='about'">关于</p>
                        </li>
                    </ul>
                </div>
                <!--                                 <transition name="fade-choose">
                    <section v-show="changeMenuType =='news'" class="menu-container">
                        <p>新闻</p>
                    </section>
                </transition> -->
                <transition name="fade-choose">
                    <section v-show="changeMenuType =='tradeNode'" class="menu-container trade-node">
                        <trade-node :type="noticeType"></trade-node>
                    </section>
                </transition>
                <transition name="fade-choose">
                    <section v-show="changeMenuType =='about'" class="menu-container">
                        <p class="container-content" v-html="replaceHtml(aboutHtml)"></p>
                    </section>
                </transition>
            </section>
            <trade-panel v-show="showTrade" @closeTrade="closeTradePanel" :name="currentChoiceFOF" :account="currentAccount" :avliableAccount="currentAvliableAccount" :type="currentType" :typeName="currentTypeName" :price="currentChoiceFOFPrice" :fofId="currentChoiceFOFId">
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
} from '../../../../utils/kIndexDayLine.js'
import BScroll from 'better-scroll'
import {
    indexDetail,
    indexData,
    assetDiyIndex,
    assetFOFList,
    assetIndexDayLine,
    assetIndexWeekLine,
    assetIndexMonthLine,
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
            changeKType: 'day', //切换主要市场
            indexDetail: '', //指数数据详情
            isLogin: true, //用户是否登录
            pageType: 0, //0代表主要市场，1、代表大类指数，2、代表大类资产包

            showAlert: false, //显示提示组件
            alertText: null, //提示的内容

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
            noticeType:'all'
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
        },
        //k线
        initChart(ktype) {
            // Indicator.open();
            let handler = this;
            if (ktype == 'minute') {
                drawMinuteKLine(this.minuteLineData,this.currentChoiceFOFId, '分时线', this.currentChoiceFOF, 'report0', 'chart0', null);
                Indicator.close();
            }
            if (ktype == 'day') {
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

        //获取是否返回实时数据的信息
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
            assetIndexDayLine(this.currentChoiceFOFId, function(ret) {
                handler.responseDayLine(ret);
            });
        },

        //获取周线数据
        getWeekLineData() {
            let handler = this;
            assetIndexWeekLine(this.currentChoiceFOFId, function(ret) {
                handler.responseWeekLine(ret);
            });
        },

        //获取月线数据
        getMonthLineData() {
            let handler = this;
            assetIndexMonthLine(this.currentChoiceFOFId, function(ret) {
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

        replaceHtml(html){
            var tmpHtml = html.replace(/color:red/g,"color:#ffffff");
            tmpHtml = tmpHtml.replace(/font-family:宋体/g,"font-family:微软雅黑");
            tmpHtml = tmpHtml.replace(/line-height:150%/g,"line-height:220%;color:#ffffff");
            tmpHtml = tmpHtml.replace(/font-size:14px/g,"font-size:18px");
            return tmpHtml;
        }
    },

    destroyed() {
        // setMarketState('main');
        try {
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

.highcharts-container {
    height: 300px!important;
    width: 100%!important;
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
            width: 33.33%;
            @include sc(.65rem, $fontGreyColor);
            text-align: center;
            span {
                color: $fontGreyColor2
            }
            .activity_k {
                color: #ffffff;
                border-bottom: solid 0.08rem #ffffff;
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
            height: 260px;
            margin-top: .8rem;
            .loading {
                text-align: center;
                @include sc(.65rem, $fontGreyColor);
            }
        }
        .chart1 {
            width: 100%;
            height: 260px;
            margin-top: .8rem;
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
        .chart2 {
            width: 100%;
            height: 235px;
            .loading {
                text-align: center;
                @include sc(.65rem, $fontGreyColor);
            }
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
            text-align: left;
            margin-left: .5rem;
            span {
                color: $fontGreyColor2
            }
            .activity_k {
                color: #ffffff;
            }
        }
        ul li:first-child {
            width: 10%;
        }
    }
    .menu-container {
        min-height: 200px;
        width: 100%;
        .container-content {
            font-size: .6rem;
            padding: .5rem .3rem 1rem .1rem;
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
