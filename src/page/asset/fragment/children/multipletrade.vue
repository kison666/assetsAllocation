<template>
    <section class="asset-container">
        <section class="content-container">
            <p class="close-trade" @click="closeMTrade()">
                <svg fill="#bbb">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cancel"></use>
                </svg>
            </p>
            <!-- 饼图显示 -->
            <section class="chart-container">
                <p class="title">一篮子买入</p>
                <div id="pie1" class="pie-chart"></div>
            </section>
            <!-- 文字描述，信息展示 -->
            <section class="detail-container">
                <ul class="detail-ul">
                    <li class="detail-li">
                        <p>可用资金:<span class="red" v-cloak>{{avliableCash}}</span></p>
                        <p>您选择购买:<span class="red" v-cloak>{{FOFAccount}}</span>股</p>
                        <!-- <p>预计手续费:<span class="red">{{fcstFee}}</span></p> -->
                        <p>预计使用资金:<span class="red" v-cloak>{{fcstAccount}}</span></p>
                    </li>
                    <li class="detail-li">
                        <p><span v-bind:style="activeFoFStyle" v-cloak>{{FOFName}}</span></p>
                        <p> 当前价格:<span class="red" v-cloak>{{FOFPrice}}</span> 预计可买：<span class="red" v-cloak>{{fcstCanBuyAccount}}</span>股</p>
                        <ul class="computer-ul" v-bind:style="activeFoFStyleBorder">
                            <li @click="reduceAccount()" v-bind:style="activeFoFStyleBorder">
                                <p class="click">
                                    <span class="arrow-down">
                                        <svg fill="#bbb">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#num-reduce"></use>
                                        </svg>
                                    </span>
                                </p>
                            </li>
                            <li v-bind:style="activeFoFStyleBorder">
                                <input type="number" placeholder="数量" v-model="FOFAccount" class="input">
                            </li>
                            <li @click="addAccount()" v-bind:style="activeFoFStyleBorder">
                                <p class="click">
                                    <span class="arrow-down">
                                        <svg fill="#bbb">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#num-add"></use>
                                        </svg>
                                    </span>
                                </p>
                            </li>
                        </ul>
                        <p class="tip">市价下单</p>
                    </li>
                </ul>
            </section>
            <!-- 十二大类选择 -->
            <section class="type-container">
                <ul class="type-ul">
                    <li class="type-li" @click="choiceFOF(0,'#0DA4D2')">
                        <p :class="{'active1':choiceActive[FOFList[0]['fofId']] ==1 || FOFId ==FOFList[0]['fofId']}" v-cloak>{{FOFList[0]['name']}}</p>
                    </li>
                    <li class="type-li" @click="choiceFOF(1,'#F05455')">
                        <p :class="{'active2':choiceActive[FOFList[1]['fofId']] ==1 || FOFId ==FOFList[1]['fofId']}" v-cloak>{{FOFList[1]['name']}}</p>
                    </li>
                    <li class="type-li" @click="choiceFOF(2,'#FEBE07')">
                        <p :class="{'active3':choiceActive[FOFList[2]['fofId']] ==1 || FOFId ==FOFList[2]['fofId']}" v-cloak>{{FOFList[2]['name']}}</p>
                    </li>
                    <li class="type-li" @click="choiceFOF(3,'#AE66D6')">
                        <p :class="{'active4':choiceActive[FOFList[3]['fofId']] ==1 || FOFId ==FOFList[3]['fofId']}" v-cloak>{{FOFList[3]['name']}}</p>
                    </li>
                    <li class="type-li" @click="choiceFOF(4,'#3B66CF')">
                        <p :class="{'active5':choiceActive[FOFList[4]['fofId']] ==1 || FOFId ==FOFList[4]['fofId']}" v-cloak>{{FOFList[4]['name']}}</p>
                    </li>
                    <li class="type-li" @click="choiceFOF(5,'#92C73B')">
                        <p :class="{'active6':choiceActive[FOFList[5]['fofId']] ==1 || FOFId ==FOFList[5]['fofId']}" v-cloak>{{FOFList[5]['name']}}</p>
                    </li>
                    <li class="type-li" @click="choiceFOF(6,'#659050')">
                        <p :class="{'active7':choiceActive[FOFList[6]['fofId']] ==1 || FOFId ==FOFList[6]['fofId']}" v-cloak>{{FOFList[6]['name']}}</p>
                    </li>
                    <li class="type-li" @click="choiceFOF(7,'#00BFFF')">
                        <p :class="{'active8':choiceActive[FOFList[7]['fofId']] ==1 || FOFId ==FOFList[7]['fofId']}" v-cloak>{{FOFList[7]['name']}}</p>
                    </li>
                    <li class="type-li" @click="choiceFOF(8,'#8A2BE2')">
                        <p :class="{'active9':choiceActive[FOFList[8]['fofId']] ==1 || FOFId ==FOFList[8]['fofId']}" v-cloak>{{FOFList[8]['name']}}</p>
                    </li>
                    <li class="type-li" @click="choiceFOF(9,'#EEE8AA')">
                        <p :class="{'active10':choiceActive[FOFList[9]['fofId']] ==1 || FOFId ==FOFList[9]['fofId']}" v-cloak>{{FOFList[9]['name']}}</p>
                    </li>
                    <li class="type-li" @click="choiceFOF(10,'#7FFFAA')">
                        <p :class="{'active11':choiceActive[FOFList[10]['fofId']] ==1 || FOFId ==FOFList[10]['fofId']}" v-cloak>{{FOFList[10]['name']}}</p>
                    </li>
                    <li class="type-li" @click="choiceFOF(11,'#ADD8E6')">
                        <p :class="{'active12':choiceActive[FOFList[11]['fofId']] ==1 || FOFId ==FOFList[11]['fofId']}" v-cloak>{{FOFList[11]['name']}}</p>
                    </li>
                </ul>
                <ul class="change-ul">
                    <li class="change-li" @click="resetAssetType">
                        <p>一键重置</p>
                    </li>
                    <li class="change-li" @click="confirmAssetType">
                        <p class="active">确定选择</p>
                    </li>
                </ul>
            </section>
        </section>
        <transition name="waiting">
            <waiting v-show="showWaiting"></waiting>
        </transition>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        </transition>
    </section>
</template>
<script>
import BScroll from 'better-scroll'
import assetShow from '../../../../components/common/assetShow'
import assetMenu from '../../../../components/common/assetMenu'
import assetPie from '../../../../components/common/assetPieChart'
import waiting from '../../../../components/common/waiting'
import alertTip from '../../../../components/common/alertTip'
import {
    Toast,
    Indicator
} from 'mint-ui'
import {
    REQ_TYPE_SIMPLE_FOF,
    SOCKET_URL_FOF_LIST
} from '../../../../config/const'
import Highcharts from '../../../../../node_modules/highcharts/highcharts.js'
import {
    assetMultiFOFBuy,
    assetPieDataNoToken,
    assetFOFList
} from '../../../../service/getData'
import {
    getToken,
    getAssetFOFTypeList
} from '../../../../store/store'

import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_SYSTEM,
    RESPONSE_CODE_ERROR_TOKEN
} from '../../../../config/response'
export default {
    components: {
        assetShow,
        assetMenu,
        assetPie,
        waiting,
        alertTip,
    },

    data() {
        return {
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            showWaiting: false, //显示加载动画
            FOFAccount: '', //输入的数量
            avliableCash: 0, //可用资金
            choiceBuyAccount: 0, //选择购买数量
            fcstFee: 0, //预估手续费
            fcstAccount: 0, //预计资金
            FOFName: '', //当前配置的FOF的名称
            FOFId: '', //当前配置的FOF的ID
            preFOFId: '', //上次点击的FOF的ID
            FOFPrice: '--', //当前FOF的价格
            fcstCanBuyAccount: 0, //预计可买
            currentFOFColor: '', //当前大类的颜色值
            choiceActive: {}, //存储FOF配置的状态
            choiceAccount: {}, //存储FOF配置的数量
            FOFList: [], //FOF大类列表
            pieData: null, //初始状态的数据
            cashPieData: null, //初始状态的数据
            activeFoFStyle: {
                color: ''
            },
            activeFoFStyleBorder: {
                borderColor: ''
            },
            reset: false, //当前是否重置了配置
            pieTimer: null, //画饼图的计时器
            alertFlag: 0, //是否直接关掉alert
            lockReconnect: false, //避免重复发起连接
            conn: null, //socket连接
            isDestory: false, //socket是否关闭
            chartPieAmount: 0, //绘饼图的次数
            isTradeTime:false,//是否是交易时间
            cashAccount:'--',//显示的余额
        }
    },
    props: ['changeMarketType', 'currentChoiceType1', 'cash', 'showPie', 'socketFOFData', 'tradeFlag'],

    created() {
        this.initData();
        Indicator.open();
    },

    watch: {
        //监听输入的数量，更新饼图的显示
        FOFAccount: function(value) {
            if (this.FOFId == '' && !this.reset) {
                this.alertText = "请先选择要购买的FOF";
                this.showAlert = true;
                this.FOFAccount = '';
                return;
            } else if (this.FOFId == '' && this.reset) {
                return;
            } else {
                this.reset = false;
                if (this.FOFId != this.preFOFId && this.preFOFId != '') {
                    //如果当前FOF和上次FOF不一样
                    this.preFOFId = this.FOFId;
                    return;
                }
            }

            if (value.length > 1) {
                if (value.indexOf('0') == 0) {
                    this.FOFAccount = value.substring(1);
                }
            }
            if (value > this.fcstCanBuyAccount) {
                this.alertText = "最多可买" + this.fcstCanBuyAccount + "股";
                this.showAlert = true;
                this.FOFAccount = 0;
                return;
            }

            //当前FOF大类占比
            let currentFOFTotal = this.FOFAccount * this.FOFPrice;
            //当前FOF大类之前的占比
            let preFOFTotal = 0;

            //判断当前FOF是否已经存在
            let exist = false;
            for (let j = 0; j < this.pieData.length; j++) {
                if (this.FOFName == this.pieData[j].name) {
                    exist = true;
                    preFOFTotal = this.pieData[j].y;
                    this.pieData[j].y = currentFOFTotal;
                }
                if (exist) break;
            }
            if (!exist) {
                //如果不存在，新增种类
                this.pieData.push({
                    name: this.FOFName,
                    y: 0,
                    color: this.currentFOFColor,
                    gid: this.FOFId
                });
            }

            //计算剩余的现金和本次调整的大类使用的金额
            for (let j = 0; j < this.pieData.length; j++) {
                if (this.FOFName == this.pieData[j].name && this.FOFName != '现金') {
                    for (var i = 0; i < this.pieData.length; i++) {
                        if (this.pieData[i].name == '现金') {
                            currentFOFTotal = currentFOFTotal;
                            let tmpCashY = parseFloat((this.pieData[i].y - (currentFOFTotal - preFOFTotal)).toFixed(2));
                            this.pieData[i].y = tmpCashY;
                            this.chartPieAmount++;
                        }
                    }
                    this.pieData[j].y = parseFloat(currentFOFTotal.toFixed(2));
                }
            }
            if (this.FOFAccount > 0) {
                this.choiceActive[this.FOFId] = 1;
                this.choiceAccount[this.FOFId] = value;
                this.fcstAccount = currentFOFTotal.toFixed(2);
            } else {
                this.choiceActive[this.FOFId] = 0;
                this.choiceAccount[this.FOFId] = 0;
            }
            //去掉pieData中份额为0的大类
            this.clearPieZeroType();
            this.updateCurFOFPriceAndAccount(true);
            if (this.chartPieAmount == 1) {
                this.drawPie(this.pieData);
            }

        },

        //可用现金
        cash: function(value) {
            if (value) {
                this.avliableCash = this.cash;
                let cashAmount = parseFloat(this.cash.replace(",", ""));
                this.pieData = [{
                    name: '现金',
                    y: cashAmount,
                    color: '#666',
                    gid: 13
                }];
                this.cashPieData = [{
                    name: '现金',
                    y: cashAmount,
                    color: '#666',
                    gid: 13
                }];
            }
        },
        socketFOFData: function(value) {
            if (value) {
                Indicator.close();
                //当获取到所有的FOF的价格以后，实时更新当前FOF的价格和预计可购买的股数
                if (this.avliableCash && this.socketFOFData) {
                    if (this.FOFId == '') {
                        return;
                    }
                    this.updateCurFOFPriceAndAccount(false, true);
                    //实时更新存量的大类的价格可可用的现金
                    // this.updateStockPriceAndCash();
                }
            }
        },
        showPie: function(value) {
            if (value == true) {
                this.drawPie(this.pieData);

            }
        },
        //切换大类的，计算此大类可购买的股数和剩余现金
        FOFId: function(value) {
            if (value != this.preFOFId) {
                if (this.avliableCash) {
                    if (this.FOFId == '') {
                        return;
                    }
                    this.updateCurFOFPriceAndAccount(true, true);
                }
            }
            this.updateCurFOFPriceAndAccount(true, true);
        },

    },
    mounted() {
        //获取FOF大类本地的缓存
        this.drawPie(this.pieData);
    },
    methods: {
        //初始化获取数据
        initData() {
            this.FOFList = JSON.parse(getAssetFOFTypeList());
        },

        getAvliableCash(){
            for (let j = 0; j < this.pieData.length; j++) {
                if (this.pieData[j].name == '现金') {
                    return this.avliableCash = this.pieData[j].y;
                }
            }
        },

        //选择FOF的类型
        choiceFOF(type, color) {
            this.preFOFId = this.FOFId;
            this.FOFAccount = '';
            this.FOFId = this.FOFList[type]['fofId'];
            this.FOFName = this.FOFList[type]['name'];
            this.currentFOFColor = color;
            this.activeFoFStyle.color = color;
            this.activeFoFStyleBorder.borderColor = color;

            if (this.choiceAccount[this.FOFId] > 0) {
                this.FOFAccount = this.choiceAccount[this.FOFId];
            }
            //去掉pieData中份额为0的大类
            this.clearPieZeroType();
        },

        //清除份额为0的大类
        clearPieZeroType() {
            for (let j = 0; j < this.pieData.length; j++) {
                if (this.pieData[j].y == 0) {
                    this.pieData.splice(j, 1);
                }
            }
        },

        //一键重配
        resetAssetType() {
            let cashY;
            try {
                cashY = parseFloat(this.cash.replace(",", ""));
            } catch (e) {

            }
            this.pieData = [{
                name: '现金',
                y: cashY,
                color: '#666',
                gid: 13
            }];
            this.cashPieData = [{
                name: '现金',
                y: cashY,
                color: '#666',
                gid: 13
            }];
            this.FOFPrice = '--'; //当前FOF的价格
            this.fcstCanBuyAccount = 0; //预计可买
            this.FOFName = '--';
            this.FOFId = '';
            this.choiceActive = {};
            this.choiceAccount = {};
            this.currentFOFColor = '';
            this.FOFAccount = '';
            this.reset = true;
            this.activeFoFStyle.color = '';
            this.activeFoFStyleBorder.borderColor = '';

        },

        //确定选择
        confirmAssetType() {
            let point = 0;
            let data = [];
            let isRequest = false; //判断是否有选择过FOF

            for (let key in this.choiceAccount) {
                if (this.choiceAccount[key] > 0) {
                    let temp = {};
                    temp['fofId'] = key;
                    temp['amount'] = this.choiceAccount[key];
                    data[point] = temp;
                    point++;
                    isRequest = true;
                }
            }

            if (!isRequest) {
                this.showAlert = true;
                this.alertText = "请先选择FOF和数量再下单";
                return;
            }
            this.showWaiting = true;
            let handler = this;
            assetMultiFOFBuy(data, function(ret) {
                handler.response(ret);
            });
        },

        response(ret) {
            this.hideWaiting();
            let response = responseResult(this, ret, 1, 1);
            if (response == RESPONSE_CODE_ERROR_DATA || response == RESPONSE_CODE_ERROR_SYSTEM) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                this.alertFlag = 1;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.isTradeTime = ret.retData.isTradeTime;
                let tmpType = '委托';
                if (this.isTradeTime == true) {
                    tmpType = '买入';
                }
                Toast({
                    message: tmpType + '成功',
                    position: 'middle',
                    duration: 4000,
                    iconClass: 'mint-toast-icon mintui mintui-success'
                });
                this.closeMTrade();
            }
        },

        //获取饼图数据
        getPieData() {
            Indicator.open();
            let handler = this;
            assetPieDataNoToken(0, function(ret) {
                // console.log("success=" + data);
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
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.drawPie(this.pieData);
                return
            }
        },

        //绘制饼图
        drawPie(data) {
            let handler = this;
            let count = 0;
            let chart = new Highcharts.Chart('pie1', {

                chart: {
                    type: 'pie', //图表的类型
                    backgroundColor: 'rgba(0,0,0,0)',
                    events: {
                        load: function() {

                            let series = this.series;
                            setInterval(function() {
                                try {

                                    if (series[0] != undefined) {

                                        series[0].setData(handler.cashPieData);
                                        series[0].setData(handler.pieData);
                                        handler.getAvliableCash();

                                    } else {
                                        // console.log("series[0] undefined");
                                    }

                                } catch (e) {
                                    // console.log(e);
                                }
                            }, 500);


                        }
                    },
                    point: {
                        events: {
                            legendItemClick: function() {
                                return false;
                            }
                        }
                    },
                },
                title: { //设置标题并将标题置于环形图表中间
                    useHTML: true,
                    align: 'center',
                    text: '',
                    verticalAlign: 'middle',
                    enabled: false,
                    y: 0
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },
                plotOptions: {
                    pie: {
                        shadow: false,
                        borderColor: '#ffffff',
                        borderWidth: 0,

                        series: {
                            animation: false,
                            shadow: false,
                            allowPointSelect: false,
                        },
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}:<br>{point.y}',
                            distance: 7,
                            style: {
                                color: '#cccccc',
                                fontSize: '11px',
                                fontFamily: '微软雅黑',
                                fontWeight: 'normal',
                                textOutline: "0px 0px #cccccc"
                            }
                        },
                        states: {
                            hover: {
                                enabled: false //鼠标放上去点是否放大
                            }
                        }
                    }
                },
                tooltip: {
                    enabled: false,
                    backgroundColor: 'rgba(0,0,0,1)',
                    pointFormat: '{series.name}: <b>{point.y}</b><br/>',
                    valueSuffix: '%',
                    shared: false,
                    style: { // 文字内容相关样式
                        color: "#e0e0e0",
                        fontSize: "14px",
                        fontWeight: "blod",
                        backgroundColor: '#333',
                        fontFamily: "Courir new"
                    }
                },
                series: [{
                    name: '比例', //数据列名
                    data: data
                }],
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                scrollbar: {
                    enabled: false
                },
                navigator: {
                    enabled: false
                }

            });
        },

        //更新当前FOF的价格和可购买的股数
        updateCurFOFPriceAndAccount(requestData, socketData) {
            //1、获取当前可用现金
            let curCash = 0;
            this.fcstAccount = 0;

            for (var i = 0; i < this.pieData.length; i++) {
                if (this.pieData[i].name == '现金') {
                    curCash = this.pieData[i].y;
                } else if (this.pieData[i].name == this.FOFName) {
                    if (this.pieData[i].y > 0) {
                        curCash = parseFloat(curCash + this.pieData[i].y).toFixed(2);
                        this.fcstAccount = this.pieData[i].y;
                    }
                }
            }
            try {
                if (socketData != false && this.socketFOFData.length > 0) {
                    for (let i = 0; i < this.socketFOFData.length; i++) {
                        if (this.socketFOFData[i]["fofId"] == this.FOFId) {
                            this.FOFPrice = parseFloat(this.socketFOFData[i]["price"].replace(",", "")).toFixed(2);

                            this.fcstCanBuyAccount = parseInt(parseFloat(curCash) / parseFloat(this.FOFPrice));
                        }
                    }
                } else {
                    for (let i = 0; i < this.FOFList.length; i++) {
                        if (this.FOFList[i]["fofId"] == this.FOFId) {
                            this.FOFPrice = parseFloat(this.FOFList[i]["price"].replace(",", "")).toFixed(2);

                            this.fcstCanBuyAccount = parseInt(parseFloat(curCash) / parseFloat(this.FOFPrice));
                        }
                    }
                }

            } catch (e) {
                console.log(e);
            }
        },

        //实时更新用户已加入pieData的价格和剩余现金
        updateStockPriceAndCash() {
            // let nowCash = 0;
            // try {
            //     for (let i = 0; i < this.socketFOFData.length; i++) {
            //         for (let j = 0; j < this.pieData.length; i++) {
            //             if (this.socketFOFData[i]['symbol'] == this.pieData[j].name) {
            //                 if (this.choiceAccount[this.socketFOFData[i]['fofId']] > 0) {
            //                     this.pieData[j].y = this.choiceAccount[this.socketFOFData[i]['fofId']] * this.socketFOFData[i]['price'];
            //                     nowCash = nowCash + this.pieData[j].y;
            //                 }
            //             }
            //         }
            //     }
            //     if (nowCash >= this.avliableCash) {
            //         return;
            //     } else {
            //         for (var i = 0; i < this.pieData.length; i++) {
            //             if (this.pieData[i].name == '现金') {
            //                 this.pieData[i].y = this.avliableCash - nowCash;
            //             }
            //         }
            //         this.drawPie(this.pieData);
            //     }
            // } catch (e) {
            //     console.log(e);
            // }
        },

        reduceAccount() {
            if (this.FOFAccount > 0) {
                this.FOFAccount--;
            }
        },

        addAccount() {
            if (this.FOFAccount < this.fcstCanBuyAccount) {
                this.FOFAccount++;
            } else {
                this.showAlert = true;
                this.alertText = this.FOFName + "最多可买" + this.fcstCanBuyAccount + "股";
            }
        },

        closeTip() {
            // clearTimeout(this.pieTimer);
            this.showAlert = false;
            if (this.alertFlag == 1) {
                this.alertFlag = 0;
                this.closeMTrade();
            }
        },
        closeMTrade() {
            this.showAlert = false;
            this.avliableCash =this.cash;
            this.resetAssetType();
            this.$emit('closeMTrade');
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

    }

}
</script>
<style lang="scss" scoped>
@import '../../../../style/mixin';
.asset-container {
    position: fixed;
    bottom: 0rem;
    left: 0rem;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 200;
    .content-container {
        width: 100%;
        position: absolute;
        bottom: 0rem;
        left: 0rem;
        height: 22rem;
        background-color: $grey1;
        .close-trade {
            position: absolute;
            right: .4rem;
            top: .2rem;
            @include wh(1rem, 1rem);
            margin: auto;
            margin-bottom: 0.2rem;
            svg {
                @include wh(100%, 100%);
            }
        }
    }
    .chart-container {
        width: 100%;
        min-height: 7.5rem;
        background-color: $grey1;
        padding-top: .2rem;
        .title {
            @include sc(.65rem, $fontColor);
            text-align: center;
        }
        .pie-chart {
            width: 100%;
            height: 7.5rem;
        }
        .pie-title {
            position: absolute;
            top: 43%;
            width: 100%;
            text-align: center;
            .pie-link {
                span {
                    @include sc(.6rem, $fontColor);
                }
            }
        }
        .highcharts-container {
            height: 7.5rem !important;
        }
    }
    .detail-container {
        background-color: $grey1;
        padding: .2rem;
        padding-top: 0rem;
        .detail-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
        }
        .detail-li {
            float: left;
            width: 35%;
            p {
                @include sc(.50rem, $fontGreyColor2);
                text-align: left;
                line-height: .8rem;
            }
            .tip {
                text-align: center;
                width: 100%;
                margin: auto;
            }
            .computer-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                padding: 0rem 0rem;
                background: #333;
                z-index: 100;
                border: solid 0.05rem $fontGreyColor2;
                margin-top: .4rem;
                li {
                    float: left;
                    width: 18%;
                    padding: 0rem .5rem;
                    p {
                        @include sc(1.2rem, $fontColor);
                        line-height: 1.4rem;
                        .arrow-down {
                            margin-top: 0rem;
                            margin-right: 0rem;
                            float: right;
                            @include wh(.8rem, .8rem);
                            svg {
                                @include wh(100%, 100%);
                            }
                        }
                    }
                    input {
                        width: 100%;
                        height: 100%;
                        background-color: transparent;
                        @include sc(.65rem, $fontColor);
                        padding: 0rem .2rem;
                        text-align: center;
                        margin-bottom: .2rem;
                    }
                }
                li:nth-child(2) {
                    width: 64%;
                    text-align: center;
                    border: solid 0.05rem $fontGreyColor2;
                    border-style: none solid none solid;
                }
            }
        }
        .detail-li:last-child {
            width: 65%;
        }
    }
    .type-container {
        padding: .3rem;
        .type-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
        }
        .type-li {
            float: left;
            width: 33.33%;
            padding: .2rem .1rem;
            p {
                background-color: $grey;
                border: solid 0.05rem $grey2;
                @include sc(.55rem, $fontGreyColor);
                text-align: center;
                padding: .2rem 0rem;
                width: 100%;
            }
            .active1 {
                @include qcb($color1);
            }
            .active2 {
                @include qcb($color2);
            }
            .active3 {
                @include qcb($color3);
            }
            .active4 {
                @include qcb($color4);
            }
            .active5 {
                @include qcb($color5);
            }
            .active6 {
                @include qcb($color6);
            }
            .active7 {
                @include qcb($color7);
            }
            .active8 {
                @include qcb($color8);
            }
            .active9 {
                @include qcb($color9);
            }
            .active10 {
                @include qcb($color10);
            }
            .active11 {
                @include qcb($color11);
            }
            .active12 {
                @include qcb($color12);
            }
        }
        .change-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            margin-top: .4rem;
        }
        .change-li {
            float: left;
            width: 50%;
            padding: .2rem;
            p {
                background-color: $grey;
                border: solid 0.05rem $grey2;
                @include sc(.65rem, $fontGreyColor);
                text-align: center;
                padding: .2rem 0rem;
                width: 100%;
            }
            .active {
                background-color: $blue;
                color: $white;
            }
        }
    }
}
</style>
