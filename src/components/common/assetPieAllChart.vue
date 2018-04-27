<template>
    <section class="chart-container">
        <div id="pie" class="pie-chart"></div>
        <div class="order-content">
            <p></p>
            <order-panel v-show="showOrder" @closeTradeAndOpenPanel="closeTradeAndOpenPanel" @closeTrade="closeTrade" :FOFName="currentChoiceFOF" :FOFId="currentChoiceFOFId"></order-panel>
        </div>
        <trade-panel v-show="showTrade" @closeTrade="closeTradePanel" :name="currentChoiceFOF" :account="currentAccount" :avliableAccount="currentAvliableAccount" :type="currentType" :typeName="currentTypeName" :price="currentChoiceFOFPrice" :fofId="currentChoiceFOFId" :avliableSellAccount="currentSellAmount" @updateData="updateData">
        </trade-panel>
    </section>
</template>
<script>
import Highcharts from '../../../node_modules/highcharts/highcharts.js'
import alertTip from '../common/alertTip'
import orderPanel from '../common/orderPanel'
import tradePanel from '../common/tradePanel'
import {
    assetPieData
} from '../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../config/response'

export default {
    data() {
            return {
                showTitleDetail: 'true', //是否显示查看详情
                showOrder: false, //是否显示下单操作列表

                currentChoiceFOFId: '', //当前选择买卖的FOF的ID
                currentChoiceFOF: '', //当前选择买卖的FOF
                canTrade: true, //持仓是否能够交易
                showTrade: false, //是否显示下单面板
                currentAccount: 0, //当前FOF用户持有的数量
                currentSellAmount: 0, //当前FOF用户可卖数量
                currentAvliableAccount: 0, //当前FOF可购买数量
                currentType: 0, //当前下单面板的类型
                currentTypeName: '买入', //当前下单面板的类型名称
                currentChoiceFOFPrice: 0, //当前FOF的价格

            }
        },
        components: {
            alertTip,
            orderPanel,
            tradePanel
        },
        props: ['assetPieData', "cash", "uid"],
        created() {

        },
        mounted() {
            this.initData();
        },
        methods: {
            //初始化获取数据
            initData() {
                for (let i = 0; i < this.assetPieData.length; i++) {
                    if (this.assetPieData[i].name == "现金") {
                        this.assetPieData.splice(i, 1);
                    }
                }
                this.drawPie(this.assetPieData, this);

            },


            //绘制饼图
            drawPie(data, handler) {
                let chart = new Highcharts.Chart('pie', {

                    chart: {
                        type: 'pie', //图表的类型
                        backgroundColor: 'rgba(0,0,0,0)',
                        events: {
                            load: function() {

                                let series = this.series;
                                setInterval(function() {
                                    try {

                                        // if (series[0] != undefined) {

                                        for (let i = 0; i < handler.assetPieData.length; i++) {
                                            if (handler.assetPieData[i].name == "现金") {
                                                handler.assetPieData.splice(i, 1);
                                            }
                                        }
                                        series[0].setData(handler.assetPieData);

                                        // } else {
                                        //     console.log("series[0] undefined");
                                        // }

                                    } catch (e) {

                                    }
                                }, 2000);


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
                                shadow: false
                            },
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}<br><b>{point.y}</b>',
                                distance: 12,
                                style: {
                                    color: '#dddddd',
                                    fontSize: '11px',
                                    fontFamily: '微软雅黑',
                                    fontWeight: 'normal',
                                    textOutline: "0px 0px #aaaaaa"
                                }
                            },
                            states: {
                                hover: {
                                    enabled: false //鼠标放上去点是否放大
                                }
                            },
                            events: {
                                click: function(e) {
                                    handler.currentChoiceFOF = e.point.name;
                                    handler.currentAccount = e.point.amount;
                                    handler.currentChoiceFOFId = e.point.fofId;
                                    handler.currentChoiceFOFPrice = e.point.currentPrice;
                                    if (handler.cash) {
                                        handler.currentAvliableAccount = parseInt(parseFloat(handler.cash.replace(",", "")) / parseFloat(e.point.currentPrice));
                                    }
                                    handler.showOrder = true;
                                }
                            },
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,1)',
                        pointFormat: '{series.name}: <b>{point.y}</b><br/>',
                        valueSuffix: '',
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
                        name: '持仓', //数据列名
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


            //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
            listenPropChange() {

                this.initData();
            },

            closeTrade() {
                this.showOrder = false;
            },

            closeTradeAndOpenPanel(type, name) {
                this.showOrder = false;
                this.showTrade = true;
                this.currentType = type;
                this.currentTypeName = name;

            },

            closeTradePanel() {
                this.showTrade = false;
            },

            updateData() {
                this.$emit('updateData');
            }

        },
        watch: {
            //监听父级传来的currentAssetType，当值发生变化的时候重新获取数据
            currentAssetType: function(value) {
                this.listenPropChange();
            },

            //监听父级传来的currentTradeType，当值发生变化的时候重新获取数据
            currentTradeType: function(value) {
                this.listenPropChange();
            },

            assetPieData: function(value) {
                // this.listenPropChange();
            },
            isshowDetail: function(value) {
                this.listenPropChange();
            }
        }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.chart-container {
    position: relative;
    width: 100%;
    min-height: 200px;
    margin-bottom: 2rem;
    .pie-chart {
        width: 100%;
        height: 200px;
    }
    .no-record {
        text-align: center;
        padding: 1rem;
        @include sc(.65rem, $fontGreyColor2);
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
        height: 200px !important;
    }
}
</style>
