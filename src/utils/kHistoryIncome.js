//highstock K线图
import Highcharts from '../../node_modules/highcharts/highstock.js'

export var drawHistoryKLine = function(mData,tName,chartId) {
    var dataArray = [];
    var color = '#318eff';
    
    var initData = function(){
        dataArray = mData;
        if(mData !=null){
            for(var i=0;i<mData.length;i++){
                 dataArray[i][0] = mData[i][0] *1000;
                 dataArray[i][1] = parseFloat(mData[i][1]);
            }     
        }
    };

    //参数实例化
    Highcharts.setOptions({ global: { useUTC: false  } });

    var drawLineChart = function(){
        return new Highcharts.StockChart(chartId, {
            chart: {
                type: 'line',
                backgroundColor: 'rgba(0,0,0,0)'
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled:false
            },
            exporting:{
                enabled:false
            },
            scrollbar:{
                enabled:false
            },
            navigator:{
                enabled:false
            },
            title: {
                text: ''
            },
            rangeSelector: {
            enabled: false,
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    //tickInterval: 5 * 24 * 3600 * 1000,
                    style:{
                        color: '#999999',//颜色
                        fontSize:'13px',  //字体
                        fontFamily: '微软雅黑'
                    },
                    formatter: function () {
                        return Highcharts.dateFormat('%Y/%m/%d', this.value);
                    },
                    step: 1,
                },
                tickLength: 0, //X轴下标长度
                lineColor: '#444444',
                lineWidth: 1,
            },
            yAxis: {
                height: '100%',
                lineWidth: 1, //Y轴边缘线条粗细
                lineColor: '#222222', //Y轴边缘线条颜色
                gridLineColor: '#343434',
                gridLineWidth: 0.1,
                // gridLineDashStyle: 'longdash',
                opposite: true,
                labels: {
                    style: {
                        color: '#999999',//颜色
                        fontSize:'13px',  //字体
                        fontFamily: '微软雅黑'
                    },
                    formatter:function(){
                        return this.value +"%";
                    }
                }
            },
            plotOptions: {
                area: {
                    color:color,
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
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
                style: {                      // 文字内容相关样式
                    fontFamily: "微软雅黑"
                },
                formatter: function() {
                    return '<b>'+'日期:' +'</b>'
                        +Highcharts.dateFormat('%Y-%m-%d', this.x) +'<br/>'+
                        '<b>'+'<%=lbname%>累计收益:' +'</b>'+ this.y.toFixed(2)+' <%=shll%>'+ '%';
                }
            },
            series: [{
                type: 'area',
                name: '累计收益',
                data: dataArray
            }]
        });
    };


    initData();
    drawLineChart();
}