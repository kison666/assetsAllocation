<template>
    <div class="asset_container">
        <head-top signin-up='home' head-title="资产详情" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <div v-wechat-title="$route.meta.title"></div>
        <section class="line-container" v-show="type <4">
            <p class="title" v-cloak>{{typeNameList[type]}}组合累计收益表现</p>
            <asset-line :lineData="lineData" :type="type"></asset-line>
            <p class="tip">虚线（2016-10-31）左侧是模拟盘收益，右侧是实盘收益</p>
        </section>
        <section class="column-container" v-show="type <4">
            <p class="title" v-cloak>{{typeNameList[type]}}组合每年收益表现</p>
            <asset-column :columnData="columnData" :categories="categories"></asset-column>
        </section>
        <section class="percent-container">
            <p class="title" v-cloak>{{typeNameList[type]}}大类资产配置比例</p>
            <ul class="percent-ul percent-title">
                <li class="percent-li left">
                    <p>股票类(<span v-cloak>{{stocksName}}</span>%)</p>
                </li>
                <li class="percent-li right">
                    <p>分配比例</p>
                </li>
            </ul>
            <ul class="percent-ul percent-content1" v-for="(item, index) in data.stocks">
                <li class="percent-li left">
                    <p v-cloak>{{item.etfName}}</p>
                </li>
                <li class="percent-li right">
                    <p class="red" v-cloak>{{item.percent}}</p>
                </li>
            </ul>
            <ul class="percent-ul percent-title">
                <li class="percent-li left">
                    <p>债券类(<span v-cloak>{{securityName}}</span>%)</p>
                </li>
                <li class="percent-li right">
                    <p>分配比例</p>
                </li>
            </ul>
            <ul class="percent-ul percent-content2" v-for="(item, index) in data.security">
                <li class="percent-li left">
                    <p v-cloak>{{item.etfName}}</p>
                </li>
                <li class="percent-li right">
                    <p class="red" v-cloak>{{item.percent}}</p>
                </li>
            </ul>
            <ul class="percent-ul percent-title">
                <li class="percent-li left">
                    <p>商品类(<span v-cloak>{{productsName}}</span>%)</p>
                </li>
                <li class="percent-li right">
                    <p>分配比例</p>
                </li>
            </ul>
            <ul class="percent-ul percent-content3" v-for="(item, index) in data.products">
                <li class="percent-li left">
                    <p v-cloak>{{item.etfName}}</p>
                </li>
                <li class="percent-li right">
                    <p class="red" v-cloak>{{item.percent}}</p>
                </li>
            </ul>
            <ul class="percent-ul percent-title">
                <li class="percent-li left">
                    <p>商品类(<span v-cloak>{{otherName}}</span>%)</p>
                </li>
                <li class="percent-li right">
                    <p>分配比例</p>
                </li>
            </ul>
            <ul class="percent-ul percent-content4" v-for="(item, index) in data.others">
                <li class="percent-li left">
                    <p v-cloak>{{item.etfName}}</p>
                </li>
                <li class="percent-li right">
                    <p class="red" v-cloak>{{item.percent}}</p>
                </li>
            </ul>
        </section>
        <section class="record-container">
            <router-link :to="{path:'/my/record',query:{type:'0',opType:'0',date:rDate}}" class="myorder">
                <div class="myorder-div">
                    <span>调仓记录</span>
                    <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                </div>
            </router-link>
        </section>
        <loading v-show="showLoading"></loading>
    </div>
</template>
<script>
import headTop from '../../components/header/head'
import Highcharts from '../../../node_modules/highcharts/highcharts.js';
import assetLine from '../../components/common/assetLineChart'
import assetColumn from '../../components/common/assetColumnChart'
import loading from '../../components/common/loading'
import {
    assetTypeDetail,
    assetTypeMonth,
} from '../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../config/response'
import {
    setTradeChoiceType,
    getTradeChoiceType
} from '../../store/store'

export default {
    components: {
        loading,
        headTop,
        assetLine,
        assetColumn
    },

    data() {

        return {
            type: 0, //当前组合类型
            typeName: '保守型', //当前组合名称
            flag: '1', //判断是否是用户的资产详情
            data: '', //所有的数据
            lineData: '', //收益走势图数据
            columnData: '', //柱状图的数据
            categories: '', //柱状图分类数据
            typeNameList: ['保守型', '稳健型', '进取型', '激进型'], //组合名称数组
            stocksName: '', //股票类
            securityName: '', //债券类
            productsName: '', //商品类
            otherName: '', //其他类
            showLoading: true, //显示加载动画
            topPosition: [], //前5名ETF数据,
            rDate:'',//最新期日期

        }

    },

    created() {
        // this.initData();
    },

    mounted() {
        this.initData();
    },


    methods: {
        //初始化获取数据
        initData() {
            this.type = this.$route.query.type;
            this.getBaseData();
            if (this.type < 4) {
                this.$route.meta.title = this.typeNameList[this.type]+'-资产详情';
                this.getChartData();
            }

            setTradeChoiceType(this.type);
        },


        //获取基础数据
        getBaseData() {
            this.showLoading = true;
            let handler = this;
            assetTypeDetail(this.type, this.flag,
                function(ret) {
                    handler.responseBaseData(ret);
                });

        },

        responseBaseData(ret) {
            //隐藏加载动画
            this.hideLoading();
            let response = responseResult(this, ret, 1, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.data = ret.retData;
                if (this.data.percent.length > 0) {
                    this.stocksName = this.data.percent[0].s / 100;
                    this.securityName = this.data.percent[1].s / 100;
                    this.productsName = this.data.percent[2].s / 100;
                    this.otherName = this.data.percent[3].s / 100;
                    this.topPosition = this.data.topPosition;
                    this.rDate = this.data.rDate;
                }

                return

            }
        },

        //获取画图数据
        getChartData() {
            this.showLoading = true;
            let handler = this;
            assetTypeMonth(this.type,
                function(ret) {
                    handler.responseChartData(ret);
                });

        },

        responseChartData(ret) {
            //隐藏加载动画
            this.hideLoading();
            let response = responseResult(this, ret, 1, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.lineData = ret.retData.draw.line;
                this.columnData = ret.retData.draw.col.arr;
                this.categories = ret.retData.draw.col.year;

                return

            }
        },

        //隐藏动画
        hideLoading() {
            if (process.env.NODE_ENV !== 'development') {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer);
                    this.showLoading = false;
                }, 600)
            } else {
                this.showLoading = false;
            }
        },




    }


}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.asset_container {
    padding-bottom: 1.5rem;
    .percent-container,
    .top5-container,
    .line-container,
    .column-container {
        width: 100%;
        .title {
            width: 100%;
            @include sc(.75rem, $fontColor);
            text-align: center;
            margin: .8rem auto;
        }
        .tip {
            @include sc(.55rem, $fontGreyColor2);
            text-align: center;
            margin: .3rem;
        }
        .percent-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            border-bottom: solid 0.005rem $lineGrey4;
        }
        .percent-li {
            float: left;
            width: 50%;
            @include sc(.65rem, $fontColor);
            padding: .4rem;
        }
        .left {
            p {
                text-align: left;
            }
        }
        .right {
            text-align: right;
            p {
                text-align: right;
                margin-top:.15rem;
            }
            .red {
                color: $red;
            }
        }
        .percent-title {
            background-color: $grey;
            margin-top: .2rem;
            .percent-li {
                p,
                span {
                    @include sc(.65rem, $fontGreyColor2);
                }
            }
        }
        .percent-content1:last-child{
           border-bottom: none 0rem $lineGrey4; 
        }
                .percent-content2:last-child{
           border-bottom: none 0rem $lineGrey4; 
        }
                .percent-content3:last-child{
           border-bottom: none 0rem $lineGrey4; 
        }
                .percent-content4:last-child{
           border-bottom: none 0rem $lineGrey4; 
        }
    }
    .line-container,
    .column-container {
        min-height: 300px;
    }
    .record-container {
        background-color: $grey;
        margin: .5rem 0rem;
        .myorder {
            padding-left: .6rem;
            display: flex;
            align-items: center;
            .myorder-div {
                width: 100%;
                border-bottom: 1px solid #555;
                padding: .433333rem .266667rem .433333rem 0;
                @include sc(.7rem, #333);
                display: flex;
                justify-content: space-between;
                position: relative;
                span {
                    display: block;
                }
                .right-content {
                    @include sc(.55rem, #e0e0e0);
                    @include cr;
                    top: 0.55rem;
                    /*display: none;*/
                }
                .circle-content {
                    width: 10px;
                    height: 10px;
                    @include cr;
                    right: 4%;
                    background-color: #EE6363;
                    -webkit-border-radius: 5px;
                    /*display: none;*/
                }
                .right-activity {
                    display: block;
                }
                .myorder-divsvg {
                    margin-top: 0.1rem;
                    @include wh(.46667rem, .466667rem);
                    svg {
                        @include wh(100%, 100%);
                    }
                }
            }
        }
    }
    .no-record {
        padding: 1rem;
        p {
            @include sc(.65rem, $fontGreyColor2);
            text-align: center;
        }
    }
}
</style>
