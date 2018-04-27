<template>
    <div class="asset-container">
        <head-top signin-up='home' head-title="调仓记录" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <p class="reason"><span>本期调仓：</span>{{reason}}</p>
            <section class="pie-container">
                <p class="date"><span>{{preDate}}</span> 至 <span>{{lastDate}}</span></p>
                <asset-pie :assetPieData="assetPieData" :isshowDetail="isshowDetail" :currentTradeType="currentTradeType">
                </asset-pie>
            </section>
            <section class="list-container">
                <ul class="main_item_list">
                    <li>
                        <ul class="main_item_list_item title">
                            <li class="width30">
                                <p>指数类型</p>
                            </li>
                            <li class="width50">
                                <p>本期比例</p>
                            </li>
                            <li class="width20">
                                <p>上期比例</p>
                            </li>
                        </ul>
                    </li>
                    <li v-for="(litem, index) in listRecord">
                        <ul class="main_item_list_item">
                            <li class="width30">
                                <p>{{litem.goodsName}}</p>
                            </li>
                            <li class="width50">
                                <p :class="{grey:litem.percent == 0}">{{litem.percent}}%</p>
                            </li>
                            <li class="width20">
                                <p :class="{grey:litem.lastPercent == 0}">{{litem.lastPercent}}%</p>
                            </li>
                        </ul>
                    </li>
                </ul>
                <section class="button-container">
                    <div @click="refreshPreDateData(downDate)">
                        <p class="grey">上一期</p>
                        <p>{{downDate}}</p>
                    </div>
                    <div @click="refreshNextDateData(nextDate)">
                        <p class="grey">下一期</p>
                        <p>{{nextDate}}</p>
                    </div>
                </section>
            </section>
        </section>
        <loading v-show="showLoading"></loading>
    </div>
</template>
<script>
import headTop from '../../../components/header/head'
import BScroll from 'better-scroll'
import assetPie from '../../../components/common/assetPieChart'
import loading from '../../../components/common/loading'
import {
    assetRecordDetail,
    assetPieDataByDate
} from '../../../service/getData'

import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_SYSTEM
} from '../../../config/response'
export default {
    components: {
        headTop,
        assetPie,
        loading
    },

    data() {
        return {
            reason: '', //调仓理由
            assetPieData: '', //饼图数据
            showLoading: true, //显示加载动画
            type: '0', //组合类型
            opType: '0', //交易类型
            date: '', //当前记录日期
            isshowDetail: 'false', //饼图是否显示查看详情
            currentTradeType: 'virtual', //当前交易类型'
            preDate: '', //前一期日期
            lastDate: '今', //最近日期
            downDate: '', //上一期日期
            nextDate: '', //下一期日期
            listRecord: '', //调仓记录
        }
    },
    created() {
        this.initData();
    },

    methods: {
        initData() {
            this.date = this.$route.query.date;
            this.type = this.$route.query.type;
            this.opType = this.$route.query.opType;
            this.getRecordDetail();
            this.getPieDataByDate();
        },

        //获取饼图数据
        getPieDataByDate() {
            this.showLoading = true;
            let handler = this;
            assetPieDataByDate(this.type, this.date,
                function(ret) {
                    handler.responsePieDataByDate(ret);
                });
        },

        responsePieDataByDate(ret) {
            this.hideLoading();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_ERROR_SYSTEM) {
                this.$router.push({
                    path: '/login'
                });
                this.$router.go(1);
                return;
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.assetPieData = ret.retData;
                return

            }
        },

        //获取页面展示数据
        async getRecordDetail() {
            this.showLoading = true;
            // let ret = await assetRecordDetail(this.type, this.date, this.opType);

            let handler = this;
            assetRecordDetail(this.type, this.date, this.opType,
                function(ret) {
                    handler.responseRecordDetail(ret);
                });
        },

        responseRecordDetail(ret) {
            this.hideLoading();
            let response = responseResult(this, ret, 1, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_ERROR_SYSTEM) {
                this.$router.push({
                    path: '/login'
                });
                this.$router.go(1);
                return;
            } else if (response == RESPONSE_CODE_SUCCESS) {
                if (ret.retData.changeReason) {
                    this.reason = ret.retData.changeReason;
                } else {
                    this.reason = "无";
                }

                this.preDate = ret.retData.date;
                if (ret.retData.lastDate.length > 0) {
                    this.lastDate = ret.retData.lastDate[0].valDate;
                    this.downDate = ret.retData.lastDate[0].valDate;
                } else {
                    this.downDate = "暂无";
                }
                if (ret.retData.nextDate.length > 0) {
                    this.nextDate = ret.retData.nextDate[0].valDate;
                    this.lastDate = ret.retData.nextDate[0].valDate;
                } else {
                    this.nextDate = "暂无";
                    this.lastDate = "今";
                }
                this.listRecord = ret.retData.arr;
                return
            }
        },

        refreshPreDateData(date) {
            this.date = date;
            if (this.downDate != "" && this.downDate != "暂无") {
                this.getRecordDetail();
                this.getPieDataByDate();
            }
        },

        refreshNextDateData(date) {
            this.date = date;
            if (this.nextDate != "" && this.nextDate != "暂无") {
                this.getRecordDetail();
                this.getPieDataByDate();
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
@import '../../../style/mixin';
.asset-container {
    .menu {
        padding-top: $containerTop;
        .reason {
            padding: .5rem .3rem;
            margin-bottom: .3rem;
            line-height: 1rem;
            @include sc(.6rem, $fontGreyColor2);
            background-color: $grey;
        }
        .pie-container {
            width: 100%;
            padding: .5rem .3rem;
            background-color: $grey;
            .date {
                line-height: 1rem;
                text-align: center;
                @include sc(.6rem, $fontGreyColor2);
            }
        }
    }
    .list-container {
        /*display: flex;*/
        flex: 1;
        overflow-y: hidden;
        position: relative;
        padding-bottom: 3rem;
        background-color: $grey;
        margin-top: .3rem;
        .main_item_list {
            background-color: $grey;
            padding: 0rem .6rem;
            li {
                border-bottom: 1px solid $lineGrey4;
                .main_item_list_item {
                    list-style: none;
                    margin: 0 auto;
                    overflow: hidden;
                    width: 100%;
                    li {
                        float: left;
                        width: 30%;
                        border-bottom: none;
                        padding: .4rem 0rem;
                        img {
                            height: .6rem;
                            margin-right: 0.3rem;
                        }
                        p {
                            @include s(.6rem);
                            line-height: 0.75rem;
                        }
                    }
                    li:nth-child(1) {
                        width: 40%;
                    }
                    li:nth-child(2) {
                        width: 30%;
                        text-align: center;
                    }
                    li:nth-child(3) {
                        text-align: right;
                        padding-right: .2rem;
                    }
                    .width20 {
                        width: 20% !important;
                    }
                    .width30 {
                        width: 30% !important;
                    }
                    .width40 {
                        width: 40% !important;
                    }
                    .width50 {
                        width: 50% !important;
                    }
                }
                .title {
                    li {
                        p {
                            color: $fontGreyColor2;
                        }
                    }
                }
                .grey {
                    color: $fontGreyColor2;
                }
            }
        }
        .button-container {
            margin-top: 1rem;
            display: flex;
            width: 100%;
            div {
                flex: 1;
                p {
                    @include sc(.6rem, $fontColor);
                    text-align: center;
                }
                .grey {
                    color: $fontGreyColor2;
                }
            }
        }
    }
}
</style>
