<template>
    <div class="market_container">
        <head-top signin-up='home' head-title="市场">
            <span slot='logo' class="head_logo" ></span>
        </head-top>
        <section class="menu">
            <!-- 展示涨跌信息 -->
            <section class="menu-top">
                <ul :class='{up:indexDetail.range >= 0,down:indexDetail.range <0}'>
                    <li>
                        <p class="title"><span>{{indexDetail.total}}</span></p>
                        <p><span>{{indexDetail.range}}</span><span>{{indexDetail.percent}}</span></p>
                    </li>
                    <li>
                        <p>昨收</p>
                        <p>今开</p>
                    </li>
                    <li>
                        <p><span>{{indexDetail.preClose}}</span></p>
                        <p><span>{{indexDetail.nowOpen}}</span></p>
                    </li>
                    <li>
                        <p>最新</p>
                        <p>涨幅</p>
                    </li>
                    <li>
                        <p><span>{{indexDetail.nowNew}}</span></p>
                        <p><span>{{indexDetail.percent}}</span></p>
                    </li>
                </ul>
            </section>
            <!-- 展示K线 -->
            <section class="menu-middle">
                <div class="chart-type">
                    <ul>
                        <li>日K</li>
                        <li>周K</li>
                        <li>月K</li>
                    </ul>
                </div>
                <div id="chart" class="chart"></div>
            </section>
            <!-- 展示关于、新闻、成分股 -->
            <section class="menu-bottom"></section>
        </section>
    </div>
</template>
<script>
import headTop from '../../../components/header/head'
import jquery from '../../../../node_modules/jquery/dist/jquery.min.js'
import Highcharts from '../../../../node_modules/highcharts/highstock.js'
import chartExt from '../../../utils/chartExt.js'
import BScroll from 'better-scroll'
import {
    indexDetail,
    indexData
} from '../../../service/getData'

export default {
    components: {
        headTop
    },

    data() {
        return {
            indexDetail: '', //指数数据详情
            iId: 0 //指数ID
        }
    },

    watch: {


    },

    created() {
        this.initData();
        this.initChart();
    },

    methods: {
        //初始化获取数据
        async initData() {
            this.iId = this.$route.query.iid;
            this.indexDetail = await indexDetail();
        },

        //k线
        async initChart() {

            let chartData = await indexData();
            var chart = new Highcharts.StockChart('chart', {
                chart: {
                    backgroundColor: 'rgba(0,0,0,0)'
                },
                rangeSelector: {
                    selected: 1,
                    enabled: false
                },
                title: {
                    text: 'AAPL Stock Price'
                },
                xAxis: {
                    type: 'datetime',
                    labels: {
                        //tickInterval: 5 * 24 * 3600 * 1000,
                        formatter: function() {
                            return Highcharts.dateFormat('%Y-%m', this.value);
                        }
                    }
                },
                series: [{
                    type: 'candlestick',
                    name: '',
                    data: chartData,
                    dataGrouping: {
                        units: [
                            [
                                'week', // unit name
                                [1] // allowed multiples
                            ],
                            [
                                'month', [1, 2, 3, 4, 6]
                            ]
                        ]
                    }
                }],
                plotOptions: {
                    //修改蜡烛颜色  
                    candlestick: {
                        color: '#33AA11',
                        upColor: '#DD2200',
                        lineColor: '#33AA11',
                        upLineColor: '#DD2200',
                        maker: {
                            states: {
                                hover: {
                                    enabled: false,
                                }
                            }
                        }
                    }
                },
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

    }

}
</script>
<style lang="scss" scoped>
@import '../../../style/mixin';
.menu {
    padding-top: $containerTop;
}

.menu-top {
    padding: 0.5rem 0.8rem;
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

.menu-middle {
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
            @include sc(.65rem, $fontColor);
        }
    }
    .chart {
        width: 100%;
        height: 300px;
    }
}
</style>
