//highstock K线图
import Highcharts from '../../node_modules/highcharts/highstock.js'


var getChart = function(result, fofId, fofName, reportId, chartId) {
    var reporting = document.getElementById(reportId);
    //数据处理分类
    //开盘价^最高价^最低价^收盘价^成交量^成交额^涨跌幅^换手率^五日均线^十日均线^20日均线^30日均线^昨日收盘价 ^当前点离左边的相对距离
    let open, high, low, close, volume, zde, zdf, hsl, MA5, MA10, MA20, MA60, zs, relativeWidth;
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
        data = [],
        dailyData = [];


    /*
     * 这个方法用来控制K线上的flags的显示情况，当afterSetExtremes时触发该方法,通过flags显示当前时间区间最高价和最低价
     * minTime  当前k线图上最小的时间点
     * maxTime  当前k线图上最大的时间点
     * chart  当前的highstock对象
     */
    var showTips = function(minTime, maxTime, chart) {
        //  console.log( Highcharts.dateFormat('%Y-%m-%d %H:%M',minTime));
        //  console.log( Highcharts.dateFormat('%Y-%m-%d %H:%M',maxTime));
        // chart.showLoading();
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
        var formatDate1 = Highcharts.dateFormat('%Y-%m-%d', highestTime)
        var formatDate2 = Highcharts.dateFormat('%Y-%m-%d', lowestTime)
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
        var tickIntervalTime, dataFormat = '%Y-%m';
        if (maxTime - minTime > oneYear * 2) {
            tickIntervalTime = oneYear * 2
            dataFormat = '%Y';
        } else if (maxTime - minTime > oneYear) {
            tickIntervalTime = oneMonth * 6
        } else if (maxTime - minTime > oneMonth * 6) {
            tickIntervalTime = oneMonth * 3
        } else {
            tickIntervalTime = oneMonth
            dataFormat = '%m-%d'
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
                y: -34, //调节y偏移
                formatter: function(e) {
                    return Highcharts.dateFormat(dataFormat, this.value);
                }
            }
        });
        //动态update flags(最高价)
        chart.series[5].update({
            data: flagsMaxData_2,
            point: {
                events: {
                    click: function() {
                        chart.series[5].update({
                            data: flagsMaxData_1,
                            width: 100
                        });
                        chart.series[6].update({
                            data: flagsMinData_1,
                            width: 100
                        });
                    }
                }
            },
            events: {
                mouseOut: function() {
                    chart.series[5].update({
                        data: flagsMaxData_2,
                        width: 25
                    });
                    chart.series[6].update({
                        data: flagsMinData_2,
                        width: 25
                    });
                }
            }
        });

        //动态update flags(最低价)
        chart.series[6].update({
            data: flagsMinData_2,
            point: {
                events: {
                    click: function() {
                        chart.series[6].update({
                            data: flagsMinData_1,
                            width: 100
                        });
                        chart.series[5].update({
                            data: flagsMaxData_1,
                            width: 100
                        });
                    }
                }
            },
            events: {
                mouseOut: function() {
                    chart.series[6].update({
                        data: flagsMinData_2,
                        width: 25
                    });
                    chart.series[5].update({
                        data: flagsMaxData_2,
                        width: 25
                    });
                }
            }
        });
        // chart.hideLoading();
    }

    //修改colum条的颜色（重写了源码方法）
    var originalDrawPoints = Highcharts.seriesTypes.column.prototype.drawPoints;
    Highcharts.seriesTypes.column.prototype.drawPoints = function() {
        var merge = Highcharts.merge,
            series = this,
            chart = this.chart,
            points = series.points,
            i = points.length;

        while (i--) {
            var candlePoint = chart.series[0].points[i];
            if (candlePoint.open != undefined && candlePoint.close != undefined) { //如果是K线图 改变矩形条颜色，否则不变
                var color = (candlePoint.open < candlePoint.close) ? '#4EFFFB' : '#E65839';
                var seriesPointAttr = merge(series.pointAttr);
                // seriesPointAttr[''].fill = color;
                // seriesPointAttr.hover.fill = Highcharts.Color(color).brighten(0.3).get();
                // seriesPointAttr.select.fill = color;
            } else {
                var seriesPointAttr = merge(series.pointAttr);
            }

            points[i].pointAttr = seriesPointAttr;
        }

        originalDrawPoints.call(this);
    }

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
            /*decimalPoint:'.',
         downloadPNG:'下载PNG图片',
         downloadJPEG:'下载JPG图片',
         downloadPDF:'下载PDF文件',
         exportButtonTitle:'导出...',
         printButtonTitle:'打印图表',
         resetZoom:'还原图表',
         resetZoomTitle:'还原图表为1:1大小',
         thousandsSep:',',*/
            shortMonths: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        },
    });


    //格式化数据，准备绘图 
    dailyData = result.list;
    data = result.list;
    MA5Array = result.lines['5'];
    console.log(result.lines['5']);
    for (var i = 0; i < result.lines['5'].length; i++) {
        MA5Array[i][0] = MA5Array[i][0] * 1000;
    }
    MA10Array = result.lines['10'];
    for (var i = 0; i < result.lines['10'].length; i++) {
        MA10Array[i][0] = MA10Array[i][0] * 1000;
    }
    MA20Array = result.lines['20'];
    for (var i = 0; i < result.lines['20'].length; i++) {
        MA20Array[i][0] = MA20Array[i][0] * 1000;
    }
    MA60Array = result.lines['60'];
    for (var i = 0; i < result.lines['60'].length; i++) {
        MA60Array[i][0] = MA60Array[i][0] * 1000;
    }


    //把当前最新K线数据加载进来
    for (var i = 0; i < dailyData.length; i++) {
        //  console.log( Highcharts.dateFormat('%A ,%Y-%m-%d %H:%M',parseInt(data[i][0])));
        ohlcArray.push([
            parseInt(dailyData[i]['time'] * 1000), // the date
            parseFloat(dailyData[i]['open']), // open
            parseFloat(dailyData[i]['high']), // high
            parseFloat(dailyData[i]['low']), // low
            parseFloat(dailyData[i]['close']), // close
        ]);
        volumeArray.push([
            parseInt(dailyData[i]['time'] * 1000), // the date
            parseFloat(dailyData[i]['volume']), // 成交量
        ]);
    }





    return new Highcharts.StockChart(chartId, {
        chart: {
            margin: [10, 0, 30, 5],
            plotBorderColor: '#666',
            plotBorderWidth: 0,
            pinchType: 'x',
            panning: true,
            selectionMarkerFill: 'rgba(0,0,0, 0.2)',
            resetZoomButton: {
                // 按钮定位
                position: {
                    align: 'right', // by default
                    verticalAlign: 'top', // by default
                    x: 0,
                    y: 0
                },
                // 按钮样式
                theme: {
                    fill: 'white',
                    stroke: 'silver',
                    r: 0,
                    states: {
                        hover: {
                            fill: '#41739D',
                            style: {
                                color: 'white'
                            }
                        }
                    }
                }
            },
            backgroundColor: 'rgba(0,0,0,0)',
            events: {
                load: function() {
                    var length = ohlcArray.length - 1;
                    showTips(ohlcArray[0][0], ohlcArray[length][0], this);
                }
            }
        },
        loading: {
            labelStyle: {
                position: 'relative',
                top: '10em',
                zindex: 1000
            }
        },
        rangeSelector: {
            enabled: false,
            inputDateFormat: '%Y-%m-%d' //设置右上角的日期格式
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
            height: '75%',
            lineWidth: 1, //Y轴边缘线条粗细
            gridLineColor: '#fff',
            gridLineWidth: 0.1,
            // gridLineDashStyle: 'longdash',
            opposite: true
        }, {
            title: {
                enable: false
            },
            top: '75%',
            height: '25%',
            labels: {
                x: -15,
                style: {
                    "color": "#ffffff"
                }
            },
            gridLineColor: '#000000',
            gridLineWidth: 0.1,
            lineWidth: 1,
        }],

        xAxis: {
            type: 'datetime',
            lineColor: '#555',
            lineWidth: 1,
            tickLength: 0, //X轴下标长度
            // minRange: 3600 * 1000*24*30, // one month
            labels: {
                style: {
                    "color": "#ffffff"
                }
            },
            events: {
                afterSetExtremes: function(e) {
                    var minTime = Highcharts.dateFormat("%Y-%m-%d", e.min);
                    var maxTime = Highcharts.dateFormat("%Y-%m-%d", e.max);
                    var chart = this.chart;
                    showTips(e.min, e.max, chart);
                }
            },
        },
        series: [{
            type: 'candlestick',
            id: "candlestick",
            name: result.cname,
            data: ohlcArray,
            dataGrouping: {
                enabled: false
            }
        }, {
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
        }, {
            type: 'flags',
            onSeries: 'candlestick',
            fillColor: 'rgba(0,0,0,0)',
            y: -27,
            style: {
                color: '#aaaaaa'
            },
            lineWidth: 1,
            lineColor: '#444444',
            shape: 'squarepin',
        }, {
            type: 'flags',
            y: 23,
            onSeries: 'candlestick',
            fillColor: 'rgba(0,0,0,0)',
            style: {
                color: '#aaaaaa'
            },
            lineWidth: 1,
            lineColor: '#444444',
            shape: 'squarepin',
        }],
        plotOptions: {
            //修改蜡烛颜色
            candlestick: {
                color: '#55FBFD',
                upColor: '#FE4337',
                lineColor: '#55FBFD',
                upLineColor: '#FE4337',
                lineWidth:2,
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
                }
            }
        },
        //格式化悬浮框
        tooltip: {
            // enabled:false,
            formatter: function() {
                if (this.y == undefined) {
                    return;
                }
                for (var i = 0; i < dailyData.length; i++) {
                    if (this.x == dailyData[i]['time'] * 1000) {
                        zdf = parseFloat(dailyData[i]['increase']).toFixed(2);

                        zde = parseFloat(dailyData[i]['priceDif']).toFixed(2);
                        //     hsl = parseFloat(data[i][9]).toFixed(2);
                        volume = parseFloat(dailyData[i]['volume']).toFixed(2);
                        zs = parseFloat(dailyData[i]['lastClose']).toFixed(2);
                    }
                }
                open = this.points[0].point.open.toFixed(2);
                high = this.points[0].point.high.toFixed(2);
                low = this.points[0].point.low.toFixed(2);
                close = this.points[0].point.close.toFixed(2);

                // y = (this.points[1].point.y * 0.0001).toFixed(2);
                MA5 = this.points[1].y.toFixed(2);
                MA10 = this.points[2].y.toFixed(2);
                MA20 = this.points[3].y.toFixed(2);
                MA60 = this.points[4].y.toFixed(2);
                reporting.innerHTML = '<ul style="list-style: none;margin: 0 auto;overflow: hidden;width: 100%;"><li style="float: left;width: 25%;"><p>' + Highcharts.dateFormat('%Y-%m-%d', this.x) + '</p><p>' + stockName + '</p></li><li style="float: left;width: 25%;"><p>开盘：' + open + '</p><p>收盘：' + close + '</p></li><li style="float: left;width: 25%;"><p>最高：' + high + '</p><p>最低：' + low + '</p></li><li style="float: left;width: 25%;"><p>成交：' + volume + '</p><p>涨跌:' + zdf + '</p></li></ul><p><span style="color:#E0E0E0;padding-right: 15px">MA5:' + MA5 + '</span><span style="color: #EEB13A;padding-right: 15px">MA10:' + MA10 + '   </span><span style="color:#B83A8B;padding-right: 15px">MA20:' + MA20 + '</span><span style="color:#47993D">MA60:' + MA60 + '</span></p>';
            },
            // crosshairs:   [true, true],//双线
            // crosshairs: {
            //     dashStyle: 'dash'
            // },
            crosshairs: [true, true],
            borderColor: 'white',
            borderWidth: 0,
            backgroundColor: 'rgba(0,0,0,0)',
            shadow: false
        },

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
            enabled: false
        },
    });
}


export { getChart }
