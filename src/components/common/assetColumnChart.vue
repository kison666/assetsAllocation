<template>
    <section class="chart-container">
        <div id="column" class="pie-chart"></div>
    </section>
</template>
<script>
import Highcharts from '../../../node_modules/highcharts/highcharts.js'
import alertTip from '../common/alertTip'

export default {
    data() {
            return {
                assetPieData: '', //资产详情
                showTitleDetail: 'true', //是否显示查看详情

            }
        },
        components: {
            alertTip
        },
        props: ['columnData', "categories"],
        created() {
            this.initData();
        },
        mounted() {

        },
        methods: {
            //初始化获取数据
            async initData() {

                if (this.columnData) {

                    this.drawColumn(this.categories, this.columnData);
                }

            },


            //绘制柱状图
            drawColumn(categories, data) {
                let chart = new Highcharts.Chart('column', {
                    chart: {
                        type: 'column',
                        backgroundColor: 'rgba(0,0,0,0)'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: ''
                    },
                    exporting: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    legend: {
                        itemStyle:{
                            color:"#aaaaaa"
                        }
                    },
                    xAxis: {
                        categories: categories,
                        crosshair: false,
                        labels: {
                            style: {
                                color: "#aaaaaa"
                            },
                        },
                        lineColor: '#666666',
                        gridLineColor: '#666666'
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: null
                        },
                        labels: {
                            formatter: function() {
                                return this.value + "%";
                            },
                            style: {
                                color: "#aaaaaa"
                            },
                        },
                        gridLineColor: '#666666'
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px;color:#333333">{point.key}年</span><table>',
                        pointFormat: '<tr><td style="color:#333333;padding:0">{series.name}: </td>' +
                            '<td style="padding:0;color:#333333"><b style="color:#333333">{point.y:.1f} %</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: data


                });
            },


            //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
            async listenPropChange() {

                this.initData();
            },

        },
        watch: {
            //监听父级传来的type，当值发生变化的时候重新获取数据
            columnData: function(value) {
                this.listenPropChange();
            },
            //监听父级传来的type，当值发生变化的时候重新获取数据
            categories: function(value) {
                this.listenPropChange();
            },
        }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.chart-container {
    background-color: $grey;
    position: relative;
    width: 100%;
    min-height: 250px;
    .pie-chart {
        width: 100%;
        height: 250px;
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
        height: 300px !important;
        background-color: transparent !important;
    }
    .highcharts-background {
        background-color: transparent !important;
    }
}
</style>
