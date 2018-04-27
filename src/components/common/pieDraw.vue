<template>
    <div id='chart'></div>
    <button @click="initChart">绘图</button>
    </div>
</template>
<script>
import Highcharts from '../../../node_modules/highcharts/highcharts.js'
import {
    getRecommendGroupChart
} from '../../service/getData'


new Vue({
    el: '#chart',
    methods: {
        methods: {
            async initChart() {

                let chartData = await getRecommendGroupChart();
                let chart = this.highcharts({

                    chart: {
                        type: 'pie', //图表的类型
                        backgroundColor: 'rgba(0,0,0,0)'
                    },
                    title: { //设置标题并将标题置于环形图表中间
                        useHTML: true,
                        text: $title.html(),
                        align: 'center',
                        verticalAlign: 'middle',
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
                        data: retData
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
        }
    }
}
})

export default {
    data() {

        return {

        }

    },
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
</style>
