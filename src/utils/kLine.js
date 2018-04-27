//highstock K线图
import Highcharts from '../../node_modules/highcharts/highstock.js'

export var drawKLine = function(data, tName, lTitle, tipId, chartId, callback) {
    var reporting = document.getElementById(tipId);
    //开盘价^最高价^最低价^收盘价^成交量^成交额^涨跌幅^换手率^五日均线^十日均线^20日均线^30日均线^昨日收盘价
    let open, high, low, close, volume, zde, zdf, hsl, MA5, MA10, MA20, MA60, zs;

    //定义数组
    let ohlcArray = [],
        volumeArray = [],
        MA5Array = [],
        MA10Array = [],
        MA20Array = [],
        MA60Array = [],
        zdfArray = [],
        zdeArray = [],
        hslArray = [],
        dailyData = [];

    let xMaxTime, xMinTime;

    var showLastDayData = function() {
        var tempPostion = 0;
        var lastDate = '';
        for (var i = 0; i < dailyData.length; i++) {
            if (dailyData[i]['time'] > dailyData[tempPostion]['time']) {
                tempPostion = i;
            }
        }
        lastDate = Highcharts.dateFormat('%Y/%m/%d', dailyData[tempPostion]['time'] * 1000);
        xMaxTime = dailyData[tempPostion]['time'];
        zdf = parseFloat(dailyData[tempPostion]['increase']).toFixed(2);
        zde = parseFloat(dailyData[tempPostion]['priceDif']).toFixed(2);
        volume = parseFloat(dailyData[tempPostion]['volume']).toFixed(2);
        zs = parseFloat(dailyData[tempPostion]['lastClose']).toFixed(2);
        open = parseFloat(dailyData[tempPostion]['open']).toFixed(2);
        high = parseFloat(dailyData[tempPostion]['high']).toFixed(2);
        low = parseFloat(dailyData[tempPostion]['low']).toFixed(2);
        close = parseFloat(dailyData[tempPostion]['close']).toFixed(2);

        var tempPostion = 0;
        for (var i = 0; i < dailyData.length; i++) {
            if (dailyData[i]['time'] < dailyData[tempPostion]['time']) {
                tempPostion = i;
            }
        }
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

        reporting.innerHTML = '<ul style="list-style: none;margin: 0 auto;overflow: hidden;width: 100%;"><li style="float: left;width: 29%;"><p style="line-height:17px">' + lastDate + '</p><p><span style="background-color:#666666;padding:2px">' + lTitle + '</span></p></li><li style="float: left;width: 23%;"><p>开盘:' + open + '</p><p>收盘:' + close + '</p></li><li style="float: left;width: 23%;"><p>最高:' + high + '</p><p>最低:' + low + '</p></li><li style="float: left;width: 25%;"><p>成交:' + volume + '</p><p>涨跌:' + zdf + '%</p></li></ul><p style="margin-top:4px"><span style="color:#E0E0E0;padding-right: 15px">MA5:' + MA5 + '</span><span style="color: #EEB13A;padding-right: 15px">MA10:' + MA10 + '   </span><span style="color:#B83A8B;padding-right: 15px">MA20:' + MA20 + '</span><span style="color:#47993D">MA60:' + MA60 + '</span></p>';
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
        volumeArray.push({
            x: parseInt(dailyData[i]['time'] * 1000), // the date
            y: parseFloat(dailyData[i]['volume']), // 成交量
            color: tmpColor
        });
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

    var showTipsCount = 0;
    var showTips = function(minTime, maxTime, chart) {
        if (showTipsCount > 1) {
            return;
        }
        showTipsCount++;
        chart.showLoading();
        //定义当前时间区间中最低价的最小值，最高价的最大值 以及对应的时间
        var lowestPrice, highestPrice, array = [],
            highestArray = [],
            lowestArray = [],
            highestTime, lowestTime, flagsMaxData_1 = [],
            flagsMaxData_2 = [],
            flagsMinData_1, flagsMinData_2;
        for (var i = 0; i < ohlcArray.length - 1; i++) {
            if (ohlcArray[i][0] >= minTime && ohlcArray[i][0] <= maxTime) {
                array.push([
                    ohlcArray[i][0],
                    ohlcArray[i][2], //最高价
                    ohlcArray[i][3] //最低价
                ])
            }
        }
        if (!array.length > 0) {
            return;
        }
        highestArray = array.sort(function(x, y) {
            return y[1] - x[1];
        })[0]; // 根据最高价降序排列
        highestTime = highestArray[0];
        highestPrice = highestArray[1].toFixed(2);
        lowestArray = array.sort(function(x, y) {
            return x[2] - y[2];
        })[0]; //根据最低价升序排列
        lowestTime = lowestArray[0];
        lowestPrice = lowestArray[2].toFixed(2);
        var formatDate1 = Highcharts.dateFormat('%Y/%m/%d', highestTime)
        var formatDate2 = Highcharts.dateFormat('%Y/%m/%d', lowestTime)
        flagsMaxData_1 = [{
            x: highestTime,
            title: highestPrice
        }];

        flagsMaxData_2 = [{
            x: highestTime,
            title: highestPrice
        }];
        flagsMinData_1 = [{
            x: lowestTime,
            title: lowestPrice
        }];

        flagsMinData_2 = [{
            x: lowestTime,
            title: lowestPrice
        }];


        var min = parseFloat(flagsMinData_2[0].title) - parseFloat(flagsMinData_2[0].title) * 0.05;
        var max = parseFloat(flagsMaxData_2[0].title) + parseFloat(flagsMaxData_2[0].title) * 0.05;
        var tickInterval = ((max - min) / 5).toFixed(1) * 1;
        var oneMonth = 1000 * 3600 * 24 * 30;
        var oneYear = 1000 * 3600 * 24 * 365;
        var tickIntervalTime, dataFormat = '%Y/%m';
        if (maxTime - minTime > oneYear * 2) {
            tickIntervalTime = oneYear * 2
            dataFormat = '%Y';
        } else if (maxTime - minTime > oneYear) {
            tickIntervalTime = oneMonth * 6
        } else if (maxTime - minTime > oneMonth * 6) {
            tickIntervalTime = oneMonth * 3
        } else {
            tickIntervalTime = oneMonth
            dataFormat = '%m/%d'
        }

        //Y轴坐标自适应
        chart.yAxis[0].update({
            min: min,
            max: max,
            tickInterval: tickInterval,
        });
        //X轴坐标自适应
        chart.xAxis[0].update({
            min: minTime,
            max: maxTime,
            tickInterval: tickIntervalTime,
            labels: {
                y: -43, //调节y偏移
                formatter: function(e) {
                    return Highcharts.dateFormat(dataFormat, this.value);
                }
            }
        });
        chart.hideLoading();
        callback();
    };
    return new Highcharts.StockChart(chartId, {
        chart: {
            animation:false,
            backgroundColor: 'rgba(0,0,0,0)',
            height: 285,
            width:document.body.clientWidth,
            pinchType: 'x',
            panning: true,
            margin: [5, 2, 5, 2],
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
                    y: -110
                },
                // 按钮样式
                theme: {
                    display:'none',
                    fill: 'rgba(96,96,96,0.5)',
                    stroke: 'none',
                    r: 0,
                    style: {
                        color: '#999999',
                        fontWeight: 'normal'
                    },
                    states: {
                        hover: {
                            fill: '#41739D',
                            style: {
                                color: '#666666'
                            }
                        }
                    }
                }
            },
        },
        rangeSelector: {
            // enabled: false,
            selected: 3,
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
                count: 3,
                text: '季度'
            }, {
                type: 'month',
                count: 6,
                text: '半年'
            }, {
                type: 'month',
                count: 9,
                text: '年'
            }, {
                type: 'all',
                text: '所有'
            }],
            buttonTheme: { // styles for the buttons
                fill: 'rgba(96,96,96,0.5)',
                stroke: 'none',
                'stroke-width': 0,
                r: 0,
                style: {
                    display:'none',
                    color: '#999999',
                    fontWeight: 'normal'
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
        loading: {
            labelStyle: {
                position: 'relative',
                top: '50px',
                zindex: 1000
            }
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
            height: '81%',
            lineWidth: 1, //Y轴边缘线条粗细
            lineColor: '#222222', //Y轴边缘线条颜色
            gridLineColor: '#666666',
            gridLineWidth: 0.1,
            // gridLineDashStyle: 'longdash',
            opposite: true,
            labels: {
                // enabled: false,
            }
        }, {
            title: {
                enable: false
            },
            top: '85%',
            height: '16%',
            lineColor: '#222222', //Y轴边缘线条颜色
            labels: {
                x: -15,
                style: {
                    "color": "#999999"
                }
            },
            gridLineColor: '#666666',
            gridLineWidth: 0.1,
            lineWidth: 1,
            labels: {
                // enabled: false,
            }
        }],

        xAxis: {
            type: 'datetime',
            lineColor: '#555',
            lineWidth: 1,
            tickLength: 0, //X轴下标长度
            // minRange: 3600 * 1000*24*30, // one month
            labels: {
                style: {
                    color: "#aaaaaa",
                },
                y: -37, //调节y偏移
                formatter: function(e) {
                    return Highcharts.dateFormat("%Y/%m/%d", this.value);
                },
                step: 2,

            },
        },
        tooltip: {
            enabled: false,
            formatter: function() {
                if (this.y == undefined) {
                    return;
                }
                for (var i = 0; i < dailyData.length; i++) {
                    if (this.x == dailyData[i]['time'] * 1000) {
                        zdf = parseFloat(dailyData[i]['increase']);

                        zde = parseFloat(dailyData[i]['priceDif']);
                        //     hsl = parseFloat(data[i][9]).toFixed(2);
                        volume = parseFloat(dailyData[i]['volume']);
                        zs = parseFloat(dailyData[i]['lastClose']);
                    }
                }
                try {
                    open = this.points[5].point.open;
                    high = this.points[5].point.high;
                    low = this.points[5].point.low;
                    close = this.points[5].point.close;

                    MA5 = this.points[1].y;
                    MA10 = this.points[2].y;
                    MA20 = this.points[3].y;
                    MA60 = this.points[4].y;
                } catch (e) {

                }
                reporting.innerHTML = '<ul style="list-style: none;margin: 0 auto;overflow: hidden;width: 100%;"><li style="float: left;width: 29%;"><p style="line-height:17px">' + Highcharts.dateFormat('%Y-%m-%d', this.x) + '</p><p><span style="background-color:#666666;padding:2px">' + lTitle + '</span></p></li><li style="float: left;width: 23%;"><p>开盘:' + open + '</p><p>收盘:' + close + '</p></li><li style="float: left;width: 23%;"><p>最高:' + high + '</p><p>最低:' + low + '</p></li><li style="float: left;width: 25%;"><p>成交:' + volume + '</p><p>涨跌:' + zdf + '%</p></li></ul><p style="margin-top:4px"><span style="color:#E0E0E0;padding-right: 15px">MA5:' + MA5 + '</span><span style="color: #EEB13A;padding-right: 15px">MA10:' + MA10 + '   </span><span style="color:#B83A8B;padding-right: 15px">MA20:' + MA20 + '</span><span style="color:#47993D">MA60:' + MA60 + '</span></p>';
            },
            crosshairs: [true, true],
            borderColor: 'white',
            borderWidth: 0,
            backgroundColor: 'rgba(0,0,0,0)',
            shadow: false
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
                events: {
                click: function(e) { 
                try{
                for (var i = 0; i < dailyData.length; i++) {
                    if ( e.point.category == dailyData[i]['time'] * 1000) {
                        zdf = parseFloat(dailyData[i]['increase']);
                        zde = parseFloat(dailyData[i]['priceDif']);
                        zs = parseFloat(dailyData[i]['lastClose']);
                        open = parseFloat(dailyData[i]['open']);
                        high = parseFloat(dailyData[i]['high']);
                        low = parseFloat(dailyData[i]['low']);
                        close = parseFloat(dailyData[i]['close']);
                        volume = parseFloat(dailyData[i]['volume']);
                    }
                }
                for (var i = 0; i < MA5Array.length; i++) {
                    if ( e.point.category == MA5Array[i][0]) {
                         MA5 = MA5Array[i][1];  
                    }
                 } 
                for (var i = 0; i < MA10Array.length; i++) {
                    if ( e.point.category == MA10Array[i][0]) {
                         MA10 = MA10Array[i][1];  
                    }
                 } 
                for (var i = 0; i < MA20Array.length; i++) {
                    if ( e.point.category == MA20Array[i][0]) {
                         MA20 = MA20Array[i][1];  
                    }
                 } 
                for (var i = 0; i < MA60Array.length; i++) {
                    if ( e.point.category == MA60Array[i][0]) {
                         MA60 = MA60Array[i][1];  
                    }
                 }   
                }catch(e){

                }
                reporting.innerHTML = '<ul style="list-style: none;margin: 0 auto;overflow: hidden;width: 100%;"><li style="float: left;width: 29%;"><p style="line-height:17px">' + Highcharts.dateFormat('%Y-%m-%d', e.point.category) + '</p><p><span style="background-color:#666666;padding:2px">' + lTitle + '</span></p></li><li style="float: left;width: 23%;"><p>开盘:' + open + '</p><p>收盘:' + close + '</p></li><li style="float: left;width: 23%;"><p>最高:' + high + '</p><p>最低:' + low + '</p></li><li style="float: left;width: 25%;"><p>成交:' + volume + '</p><p>涨跌:' + zdf + '%</p></li></ul><p style="margin-top:4px"><span style="color:#E0E0E0;padding-right: 15px">MA5:' + MA5 + '</span><span style="color: #EEB13A;padding-right: 15px">MA10:' + MA10 + '   </span><span style="color:#B83A8B;padding-right: 15px">MA20:' + MA20 + '</span><span style="color:#47993D">MA60:' + MA60 + '</span></p>';
                } 
            },
            },

        },
        series: [ {
            type: 'column', //2
            name: '成交量',
            data: volumeArray,
            yAxis: 1,
            dataGrouping: {
                enabled: false
            }
        }, {
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
        },{
            type: 'candlestick',
            id: "candlestick",
            name: tName,
            data: ohlcArray,
            dataGrouping: {
                enabled: false
            }
        },],
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        scrollbar: {
            barBackgroundColor: '#252527',
            barBorderColor: '#252527',
            buttonArrowColor: '#252527',
            buttonBackgroundColor: '#252527',
            buttonBorderWidth: 0,
            height: 1,
            enabled: false
        },
        navigator: {
            enabled: false
        },

    });
}
