//highstock K线图
import Highcharts from '../../node_modules/highcharts/highstock.js'

export var drawDayKLine = function(data, tName, lTitle, tipId, chartId, callback) {
    var reporting = document.getElementById(tipId);
    //开盘价^最高价^最低价^收盘价^成交量^成交额^涨跌幅^换手率^五日均线^十日均线^20日均线^30日均线^昨日收盘价
    let open, high, low, close, zde, zdf, hsl, MA5, MA10, MA20, MA60, zs;

    //定义数组
    let ohlcArray = [],
        MA5Array = [],
        MA10Array = [],
        MA20Array = [],
        MA60Array = [],
        zdfArray = [],
        zdeArray = [],
        hslArray = [],
        dailyData = [];

    let xMaxTime, xMinTime;

    var reselector = 0;
    if(tName =='日线'){
        reselector=0;
    }else if(tName =='周线'){
        reselector=1;
    }else if(tName =='月线'){
        reselector=2;
    }

    var showLastDayData = function() {
        var tempPostion = dailyData.length-1;
        var lastDate = '';
        lastDate = Highcharts.dateFormat('%Y/%m/%d', dailyData[tempPostion]['time'] * 1000);
        xMaxTime = dailyData[tempPostion]['time'];
        zdf = parseFloat(dailyData[tempPostion]['increase']).toFixed(2);
        zde = parseFloat(dailyData[tempPostion]['priceDif']).toFixed(2);
        zs = parseFloat(dailyData[tempPostion]['lastClose']).toFixed(2);
        open = parseFloat(dailyData[tempPostion]['open']).toFixed(2);
        high = parseFloat(dailyData[tempPostion]['high']).toFixed(2);
        low = parseFloat(dailyData[tempPostion]['low']).toFixed(2);
        close = parseFloat(dailyData[tempPostion]['close']).toFixed(2);

        xMinTime = dailyData[tempPostion]['time'];

        var tempPostion = 0;
        for (var i = 0; i < MA5Array.length; i++) {
            if (MA5Array[i][0] > MA5Array[tempPostion][0]) {
                tempPostion = i;
            }
        }
        MA5 = MA5Array[tempPostion][1];

        var tempPostion = 0;
        for (var i = 0; i < MA10Array.length; i++) {
            if (MA10Array[i][0] > MA10Array[tempPostion][0]) {
                tempPostion = i;
            }
        }
        MA10 = MA10Array[tempPostion][1];

        var tempPostion = 0;
        for (var i = 0; i < MA20Array.length; i++) {
            if (MA20Array[i][0] > MA20Array[tempPostion][0]) {
                tempPostion = i;
            }
        }
        MA20 = MA20Array[tempPostion][1];

        var tempPostion = 0;
        for (var i = 0; i < MA60Array.length; i++) {
            if (MA60Array[i][0] > MA60Array[tempPostion][0]) {
                tempPostion = i;
            }
        }
        MA60 = MA60Array[tempPostion][1];

        reporting.innerHTML = '<ul style="list-style: none;margin: 0 auto;overflow: hidden;width: 100%;"><li style="float: left;width: 29%;"><p style="line-height:17px">' + lastDate + '</p><p><span style="background-color:#666666;padding:2px">' + lTitle + '</span></p></li><li style="float: left;width: 23%;"><p>开盘:' + open + '</p><p>收盘:' + close + '</p></li><li style="float: left;width: 23%;"><p>最高:' + high + '</p><p>最低:' + low + '</p></li><li style="float: left;width: 25%;"><p>涨跌:' + zdf + '%</p></li></ul><p style="margin-top:4px"><span style="color:#E0E0E0;padding-right: 15px">MA5:' + MA5 + '</span><span style="color: #EEB13A;padding-right: 15px">MA10:' + MA10 + '   </span><span style="color:#B83A8B;padding-right: 15px">MA20:' + MA20 + '</span><span style="color:#47993D">MA60:' + MA60 + '</span></p>';
    };

    //格式化数据，准备绘图 
    dailyData = data.list;
    MA5Array = data.lines['5'];
    for (var i = 0; i < data.lines['5'].length; i++) {
        MA5Array[i][0] = MA5Array[i][0] * 1000;
    }
    MA10Array = data.lines['10'];
    for (var i = 0; i < data.lines['10'].length; i++) {
        MA10Array[i][0] = MA10Array[i][0] * 1000;
    }
    MA20Array = data.lines['20'];
    for (var i = 0; i < data.lines['20'].length; i++) {
        MA20Array[i][0] = MA20Array[i][0] * 1000;
    }
    MA60Array = data.lines['60'];
    for (var i = 0; i < data.lines['60'].length; i++) {
        MA60Array[i][0] = MA60Array[i][0] * 1000;
    }

    //把当前最新K线数据加载进来
    for (var i = 0; i < dailyData.length; i++) {
        ohlcArray.push([
            parseInt(dailyData[i]['time'] * 1000), // the date
            parseFloat(dailyData[i]['open']), // open
            parseFloat(dailyData[i]['high']), // high
            parseFloat(dailyData[i]['low']), // low
            parseFloat(dailyData[i]['close']), // close
        ]);
        let tmpColor = '#FF4A37';
        if (parseFloat(dailyData[i]['open']) <= parseFloat(dailyData[i]['close'])) {
            tmpColor = '#32A224';
        }
    }
    //初始化report最近的数据
    showLastDayData();

    //常量本地化
    Highcharts.setOptions({
        global: {
            useUTC: false
        },
        lang: {
            resetZoom: '重置',
            resetZoomTitle: '重置缩放比例',
            rangeSelectorFrom: "日期:",
            rangeSelectorTo: "至",
            rangeSelectorZoom: "范围",
            loading: '加载中...',
            shortMonths: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        },
    });
    return new Highcharts.StockChart(chartId, {
        chart: {
            // animation: false,
            backgroundColor: 'rgba(0,0,0,0)',
            height: 260,
            pinchType: 'x',
            width:document.body.clientWidth,
            panning: true,
            margin: [-25, 2, 15, 2],
            events: {
                load: function() {
                    var length = ohlcArray.length - 1;
                    // showTips(ohlcArray[0][0], ohlcArray[length][0], this);
                },
            },
            resetZoomButton: {
                // 按钮定位
                position: {
                    align: 'right', // by default
                    verticalAlign: 'bottom', // by default
                    x: 0,
                    y: -40
                },
                // 按钮样式
                theme: {
                    display:'none',
                }
            },
        },
        loading: {
            labelStyle: {
                position: 'relative',
                top: '50px',
                zindex: 1000
            }
        },
        rangeSelector: {
            // enabled: false,
            buttonPosition:{
                 y:-60,
            },
            selected: reselector,
            inputEnabled:false,
            labelStyle:{
                display:'none',
            },
            buttons: [{
                type: 'month',
                count: 2,
                text: '月'
            }, {
                type: 'month',
                count: 9,
                text: '季度'
            },{
                type: 'all',
                text: '所有'
            }],
            buttonTheme: { // styles for the buttons
                display: 'none' ,// 不显示按钮
                fill: 'rgba(96,96,96,1)',
                stroke: 'none',
                'stroke-width': 0,
                r: 0,
                style: {
                    color: '#999999',
                    fontWeight: 'normal',
                    height:0,
                },
                states: {
                    hover: {
                        fill: '#000000',
                        style: {
                            color: 'white'
                        }
                    },
                    select: {
                        fill: '#000000',
                        style: {
                            color: 'white'
                        }
                    }
                    // disabled: { ... }
                }
            },
        },
        title: {
            enabled: false
        },
        exporting: {
            enabled: false //设置导出按钮不可用 
        },
        yAxis: [{
            title: {
                enable: false
            },
            height: '100%',
            lineWidth: 1, //Y轴边缘线条粗细
            lineColor: '#222222', //Y轴边缘线条颜色
            gridLineColor: '#343434',
            gridLineWidth: 0.1,
            // gridLineDashStyle: 'longdash',
            opposite: true,
            crosshairs: {
                color: '#666666',
                width: 0.5,
            },
            labels: {
                // enabled: false,
            }
        }],

        xAxis: {
            type: 'datetime',
            lineColor: '#343434',
            lineWidth: 1,
            tickLength: 0, //X轴下标长度
            labels: {
                style: {
                    color: "#999999",
                    x: 0,
                },
                y: 12, //调节y偏移
                formatter: function(e) {
                    return Highcharts.dateFormat("%Y/%m/%d", this.value);
                },
                step: 2,

            },
            crosshairs: {
                color: '#666666'
            },
            events: {
                afterSetExtremes: function(e) {
                    var minTime = Highcharts.dateFormat("%Y/%m/%d", e.min);
                    var maxTime = Highcharts.dateFormat("%Y/%m/%d", e.max);
                    var chart = this.chart;
                    // showTips(e.min, e.max, chart);
                }
            },
        },
        tooltip: {
            formatter: function() {
                if (this.y == undefined) {
                    return;
                }

                for (var i = 0; i < dailyData.length; i++) {
                    if (this.x == dailyData[i]['time'] * 1000) {
                        zdf = parseFloat(dailyData[i]['increase']).toFixed(2);
                        zde = parseFloat(dailyData[i]['priceDif']).toFixed(2);
                        zs = parseFloat(dailyData[i]['lastClose']).toFixed(2);
                        open = parseFloat(dailyData[i]['open']).toFixed(2);
                        high = parseFloat(dailyData[i]['high']).toFixed(2);
                        low = parseFloat(dailyData[i]['low']).toFixed(2);
                        close = parseFloat(dailyData[i]['close']).toFixed(2);
                    }
                }
                try {
                    MA5 = this.points[0].y;
                    MA10 = this.points[1].y;
                    MA20 = this.points[2].y;
                    MA60 = this.points[3].y;
                } catch (e) {

                }

                reporting.innerHTML = '<ul style="list-style: none;margin: 0 auto;overflow: hidden;width: 100%;"><li style="float: left;width: 29%;"><p style="line-height:17px">' + Highcharts.dateFormat('%Y-%m-%d', this.x) + '</p><p><span style="background-color:#666666;padding:2px">' + lTitle + '</span></p></li><li style="float: left;width: 23%;"><p>开盘:' + open + '</p><p>收盘:' + close + '</p></li><li style="float: left;width: 23%;"><p>最高:' + high + '</p><p>最低:' + low + '</p></li><li style="float: left;width: 25%;"></p><p>涨跌:' + zdf + '%</p></li></ul><p style="margin-top:4px"><span style="color:#E0E0E0;padding-right: 15px">MA5:' + MA5 + '</span><span style="color: #EEB13A;padding-right: 15px">MA10:' + MA10 + '   </span><span style="color:#B83A8B;padding-right: 15px">MA20:' + MA20 + '</span><span style="color:#47993D">MA60:' + MA60 + '</span></p>';
            },
            followTouchMove:false,
            crosshairs: [true, true],
            borderColor: 'white',
            borderWidth: 0,
            backgroundColor: 'rgba(0,0,0,0)',
            shadow: false,
        },
        plotOptions: {
            //修改蜡烛颜色
            candlestick: {
                color: '#FF4A37',
                upColor: '#32A224',
                lineColor: '#FF4A37',
                upLineColor: '#32A224',
                lineWidth: 0.5,
                maker: {
                    states: {
                        hover: {
                            enabled: false,
                        }
                    }
                }
            },
            //去掉曲线和蜡烛上的hover事件
            series: {
                animation:true,
                states: {
                    hover: {
                        enabled: false
                    }
                },
                line: {
                    marker: {
                        enabled: false
                    }
                },
               //  events: { 
               //  click: function(e) { 
               //  try{
               //  for (var i = 0; i < dailyData.length; i++) {
               //      if ( e.point.category == dailyData[i]['time'] * 1000) {
               //          zdf = parseFloat(dailyData[i]['increase']).toFixed(2);
               //          zde = parseFloat(dailyData[i]['priceDif']).toFixed(2);
               //          zs = parseFloat(dailyData[i]['lastClose']).toFixed(2);
               //          open = parseFloat(dailyData[i]['open']).toFixed(2);
               //          high = parseFloat(dailyData[i]['high']).toFixed(2);
               //          low = parseFloat(dailyData[i]['low']).toFixed(2);
               //          close = parseFloat(dailyData[i]['close']).toFixed(2);
               //      }
               //  }
               //  for (var i = 0; i < MA5Array.length; i++) {
               //      if ( e.point.category == MA5Array[i][0]) {
               //           MA5 = MA5Array[i][1];  
               //      }
               //   } 
               //  for (var i = 0; i < MA10Array.length; i++) {
               //      if ( e.point.category == MA10Array[i][0]) {
               //           MA10 = MA10Array[i][1];  
               //      }
               //   } 
               //  for (var i = 0; i < MA20Array.length; i++) {
               //      if ( e.point.category == MA20Array[i][0]) {
               //           MA20 = MA20Array[i][1];  
               //      }
               //   } 
               //  for (var i = 0; i < MA60Array.length; i++) {
               //      if ( e.point.category == MA60Array[i][0]) {
               //           MA60 = MA60Array[i][1];  
               //      }
               //   }   
               //  }catch(e){

               //  }
               //  reporting.innerHTML = '<ul style="list-style: none;margin: 0 auto;overflow: hidden;width: 100%;"><li style="float: left;width: 29%;"><p style="line-height:17px">' + Highcharts.dateFormat('%Y/%m/%d', e.point.category) + '</p><p><span style="background-color:#666666;padding:2px">' + lTitle + '</span></p></li><li style="float: left;width: 23%;"><p>开盘:' + open + '</p><p>收盘:' + close + '</p></li><li style="float: left;width: 23%;"><p>最高:' + high + '</p><p>最低:' + low + '</p></li><li style="float: left;width: 25%;"></p><p>涨跌:' + zdf + '%</p></li></ul><p style="margin-top:4px"><span style="color:#E0E0E0;padding-right: 15px">MA5:' + MA5 + '</span><span style="color: #EEB13A;padding-right: 15px">MA10:' + MA10 + '   </span><span style="color:#B83A8B;padding-right: 15px">MA20:' + MA20 + '</span><span style="color:#47993D">MA60:' + MA60 + '</span></p>';
               //  } 
               // }
            }
        },
        series: [{
            type: 'spline',
            name: 'MA5',
            color: '#e0e0e0',
            data: MA5Array,
            lineWidth: 1,
            dataGrouping: {
                enabled: false
            }
        }, {
            type: 'spline',
            name: 'MA10',
            data: MA10Array,
            color: '#EEB13A',
            threshold: null,
            lineWidth: 1,
            dataGrouping: {
                enabled: false
            }
        }, {
            type: 'spline',
            name: 'MA20',
            data: MA20Array,
            color: '#B83A8B',
            threshold: null,
            lineWidth: 1,
            dataGrouping: {
                enabled: false
            }
        }, {
            type: 'spline',
            name: 'MA60',
            data: MA60Array,
            color: '#47993D',
            threshold: null,
            lineWidth: 1,
            dataGrouping: {
                enabled: false
            }
        }, {
            type: 'candlestick',
            id: "candlestick",
            name: tName,
            data: ohlcArray,
            dataGrouping: {
                enabled: false
            }
        }],
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        scrollbar: {
            enabled: false
        },
        navigator: {
            enabled: false,

        },

    });
}
