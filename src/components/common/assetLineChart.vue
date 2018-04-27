<template>
    <section class="chart-container">
        <div id="line" class="pie-chart"></div>
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
        props: ['lineData', "type"],
        created() {
            this.initData();
        },
        mounted() {

        },
        methods: {
            //初始化获取数据
            async initData() {

                if (this.lineData) {
                    let colors = ['#318eff', '#6ca584', '#efb71f', '#EE6363'];
                    this.drawLine(this.lineData, colors[this.type]);
                }

            },


            //绘制收益走势图
            drawLine(data, color) {
                let chart = new Highcharts.Chart('line', {

                    chart: {
                        zoomType: 'x',
                        backgroundColor: 'rgba(0,0,0,0)'
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
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        type: 'datetime',
                        labels: {
                            //tickInterval: 5 * 24 * 3600 * 1000,
                            formatter: function() {
                                return Highcharts.dateFormat('%Y-%m', this.value);
                            },
                            style: {
                                color: "#aaaaaa"
                            },
                        },
                        plotLines: [{ //一条延伸到整个绘图区的线，标志着轴中一个特定值。
                            color: '#fff',
                            dashStyle: 'Dash', //Dash,Dot,Solid,默认Solid
                            width: 1,
                            value: 1477872000000, //x轴显示位置，一个标记为1
                            zIndex: 5
                        }],
                        lineColor: '#666666',
                        gridLineColor: '#666666'
                    },
                    yAxis: {
                        title: {
                            text: null
                        },
                        min: 0,
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#727373',
                            fontFamily: '微软雅黑'
                        }],
                        labels: {
                            formatter: function() {
                                return this.value + "%";
                            },
                            style: {
                                color: "#aaaaaa"
                            }
                        },
                        gridLineColor: '#666666'
                    },
                    plotOptions: {
                        area: {
                            color: color,
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, color],
                                    [1, Highcharts.Color(color).setOpacity(0).get('rgba')]
                                ]
                            },
                            lineWidth: 1,
                            marker: {
                                enabled: false
                            },
                            shadow: false,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },
                    navigation: {
                        buttonOptions: {
                            enabled: false
                        }
                    },
                    tooltip: {
                        style: { // 文字内容相关样式
                            fontFamily: "微软雅黑"
                        },
                        formatter: function() {
                            return '<b>' + '日期:' + '</b>' + Highcharts.dateFormat('%Y-%m-%d', this.x) + '<br/>' +
                                '<b>' + '<%=lbname%>累计收益:' + '</b>' + this.y + '%  <%=shll%>';
                        }
                    },
                    colors: ['#ffffff', '#000000'],
                    series: [{
                        type: 'area',
                        name: '净值',
                        data: data
                    }]

                });
            },


            //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
            async listenPropChange() {

                this.initData();
            },

        },
        watch: {
            //监听父级传来的type，当值发生变化的时候重新获取数据
            lineData: function(value) {
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
