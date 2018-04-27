//highstock K线图
import Highcharts from '../../node_modules/highcharts/highstock.js'
import {
    assetMinuteLine,
} from '../service/getData'
export var interval =''
export var drawMinuteKLine = function(mData,fofId, tName, lTitle, tipId, chartId, callback) {
    var dataArray=[];
    var timeX,dataY,beginTime,endTime;
    var reporting = document.getElementById(tipId);
    var xMaxTime=null,xMinTime=null,currentTime=null;

    //参数实例化
    Highcharts.setOptions({ global: { useUTC: false  } });
    beginTime = mData.beginTime;
    endTime = mData.endTime; 
    mData = mData.list;

    //间隔1分钟取一次数据
    var getMinuteData= function(){
        
        interval = setInterval(function(){
           
            assetMinuteLine(fofId, function(ret) {
                    mData =  ret.retData.list;
                    initData();      
            });
 
        },20000);
    };

    //初始化数据
    var initData = function(){
        if(mData ==null){
            return ;
        }
        dataArray = [];
        for(var i=0;i<mData.length;i++){
             dataArray.push([
                parseInt(mData[i]['time'] * 1000), // the date
                parseFloat(mData[i]['closePrice'].replace(',','')), // closePrice
                parseFloat(mData[i]['increase'].replace(',','')) // closePrice
            ]);
        }
        initX(); 
        //初始化
        showLastData();
    };

    //report区域显示最新时间的数据
    var showLastData = function() {
        var tempPostion = mData.length-1;
        var lastDate = '';
        lastDate = Highcharts.dateFormat('%Y/%m/%d %H:%M', mData[tempPostion]['time'] *1000);
        var dataY = mData[tempPostion]['closePrice'];
        var increase = mData[tempPostion]['increase'];
        
        var color  = '#32A224';
        if(increase <0){
            color = '#FF4A37';
        }

        reporting.innerHTML = '<p style="padding:5px;color:#e0e0e0">时间 <span>'+lastDate+'</span>&nbsp;&nbsp;数值: <span style="color:'+color+'">'+dataY+'</span>&nbsp;&nbsp;涨跌: <span style="color:'+color+'">'+increase+'%</span></p>';
    };
    
    var initX = function(){
        //处理x坐标时间轴
        // currentTime = Date.parse(new Date("2017-07-30 00:00:00"));
        // currentTime = Date.parse(new Date());
        // var currentDate = Highcharts.dateFormat('%Y/%m/%d', currentTime);
        // var tmpXMaxTime = Date.parse(new Date(currentDate + " 16:00:00"));
        // var tmpXMinTime = Date.parse(new Date(currentDate + " 09:30:00"));
        // var tmpXMinTime1 = Date.parse(new Date(currentDate + " 21:30:00"));
        // var tmpXMaxTime1 = Date.parse(new Date(Highcharts.dateFormat('%Y/%m/%d', (currentTime + 86400000)) + " 04:00:00"));
        // var tmpXMinTime2 = Date.parse(new Date(Highcharts.dateFormat('%Y/%m/%d', (currentTime - 86400000))+ " 21:30:00"));
        // var tmpXMaxTime2 = Date.parse(new Date(currentDate + " 04:00:00"));
        

        // if(Date.parse(new Date(currentDate + " 09:45:01")) <= currentTime && currentTime <= Date.parse(new Date(currentDate + " 21:45:00"))){
        //    xMaxTime = tmpXMaxTime;
        //    xMinTime = tmpXMinTime;  
        // }else if(Date.parse(new Date(currentDate + " 21:45:01")) <= currentTime && currentTime <= Date.parse(new Date(currentDate + " 23:59:59"))){
        //    xMaxTime = tmpXMaxTime1;
        //    xMinTime = tmpXMinTime1;   
        // }else if(Date.parse(new Date(currentDate + " 00:00:00")) <= currentTime && currentTime <= Date.parse(new Date(currentDate + " 09:45:00")) ){
        //    xMaxTime = tmpXMaxTime2;
        //    xMinTime = tmpXMinTime2;    
        // }
        endTime = endTime.toString().replace('-','/');
        beginTime = beginTime.toString().replace('-','/');
        xMaxTime = Date.parse(new Date(endTime.toString()));
        xMinTime = Date.parse(new Date(beginTime.toString()));
    };

    var drawLineChart = function(){
        return new Highcharts.StockChart(chartId, {
            chart: {
                type: 'line',
                backgroundColor: 'rgba(0,0,0,0)',
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
                events: {
                    load: function() {
                        let series = this.series;
                        try{
                            window.setInterval(function() {
                                if(series[0].yData.length <dataArray.length){
                                    series[0].setData(dataArray,true,false,false);
                                }
                            }, 1000);
                        } catch (e) {
                            
                        }
                    }
                }
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
                ordinal:false,
                max:xMaxTime,
                min:xMinTime,
                lineColor: '#343434',
                lineWidth: 1,
                dateTimeLabelFormats: {
                    minute: '%H:%M'
                },
                tickLength: 0, //X轴下标长度
                labels: {
                    style: {
                        color: "#999999",
                        x: 0,
                    },
                    y: 12, //调节y偏移

                },
                crosshairs: {
                    color: '#666666'
                },
            },
            yAxis: {
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
            },
            plotOptions: {
                line: {
                    lineWidth: 1,
                    lineColor:'#ffffff',
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
                formatter: function() {
                    if (this.y == undefined) {
                        return;
                    }
                    var increase=0;
                    for (var i = 0; i < dataArray.length; i++) {
                        if (this.x == dataArray[i][0]) {
                            timeX = dataArray[i][0];
                            dataY = parseFloat(dataArray[i][1]).toFixed(2);
                            increase = parseFloat(dataArray[i][2]).toFixed(2);
                        }
                    }
                    var color  = '#32A224';
                    if(increase <0){
                        color = '#FF4A37';
                    }
                    reporting.innerHTML = '<p style="padding:5px;color:#e0e0e0">时间 <span>'+Highcharts.dateFormat('%Y/%m/%d %H:%M', this.x)+'</span>&nbsp;&nbsp;数值: <span style="color:'+color+'">'+dataY+'</span>&nbsp;&nbsp;涨跌: <span style="color:'+color+'">'+increase+'%</span></p>';
                },
                followTouchMove:true,
                crosshairs: [true, true],
                borderColor: 'white',
                borderWidth: 0,
                backgroundColor: 'rgba(0,0,0,0)',
                shadow: false,
            },
            series: [{
                name: '累计收益',
                data: dataArray
            }]
    });
    } 
    
    initData();
    initX(); 
    getMinuteData();
    drawLineChart();

}
