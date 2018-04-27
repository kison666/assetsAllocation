<template>
    <section class="chart-container">
        <div id="virtual" class="pie-chart" v-show="currentTradeType == 'virtual'"></div>
        <!-- <div id="real" class="pie-chart" v-show="currentTradeType == 'real'"></div> -->
        <div class="pie-title" v-show="isshowDetail !='false'">
            <router-link :to="{path: isLogin ==false ? '/login':'/my/detail', query:{type:currentAssetType}}" class="pie-link">
                <span v-if="assetPieData.pieData">查看详情</span>
                <span v-else>加载中……</span>
            </router-link>
        </div>
    </section>
</template>
<script>
import Highcharts from '../../../node_modules/highcharts/highcharts.js'
import alertTip from '../common/alertTip'
import {
    assetPieData
} from '../../service/getData'
import {
    responseResult,
} from '../../config/response'

export default {
    data() {
            return {
                showTitleDetail: 'true' //是否显示查看详情

            }
        },
        components: {
            alertTip
        },
        props: ['currentAssetType', 'currentTradeType', 'assetPieData', 'isshowDetail', 'isLogin'],
        created() {
            // this.initData();
        },
        mounted() {

        },
        methods: {
            //初始化获取数据
            initData() {
                this.drawPie(this.assetPieData.pieData, this.currentTradeType);
            },

            //绘制饼图
            drawPie(data, divid) {
                let chart = new Highcharts.Chart(divid, {

                    chart: {
                        type: 'pie', //图表的类型
                        backgroundColor: 'rgba(0,0,0,0)'
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
                            size: 170,
                            innerSize: '57%', //配置环形大小
                            shadow: false,
                            center: ['50%', '50%'], //水平和垂直方向居中
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
                                format: '{point.y}%',
                                distance: 7,
                                style: {
                                    color: '#aaaaaa',
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
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,1)',
                        pointFormat: '{series.name}: <b>{point.y}</b><br/>',
                        valueSuffix: '%',
                        shared: false,
                        //positioner: function() {
                        //    return {
                        //        x: 150,
                        //        y: 0
                        //    }
                        //}
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


            //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
            listenPropChange() {

                // this.initData();
            },

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
                 this.drawPie(this.assetPieData.pieData, this.currentTradeType);
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
    min-height: 9.8rem;
    padding-top: .5rem;
    .pie-chart {
        width: 100%;
        height: 8.5rem;
    }
    .pie-title {
        position: absolute;
        top: 4rem;
        width: 100%;
        text-align: center;
        .pie-link {
            span {
                @include sc(.6rem, $fontColor);
            }
        }
    }
    .highcharts-container {
        height: 8.5rem !important;
    }
}
</style>
