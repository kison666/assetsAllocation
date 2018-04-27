<template>
    <div class="market_container">
        <head-top signin-up='home' head-title="$route.meta.title" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <div v-wechat-title="$route.meta.title"></div>
        <section class="menu">
            <!-- 自配组合 当日成交、历史成交 -->
            <section class="diy-list-container" v-if="mType ==2 && type ==1">
                <div class="entrust-list-top">
                    <ul class="entrust-list-ul">
                        <li class="entrust-list-li">
                            <p>&nbsp;</p>
                        </li>
                        <li class="entrust-list-li">
                            <p>名称</p>
                        </li>
                        <li class="entrust-list-li">
                            <p>成交价</p>
                        </li>
                        <li class="entrust-list-li">
                            <p>成交量</p>
                        </li>
                        <li class="entrust-list-li">
                            <p>成交额</p>
                        </li>
                    </ul>
                </div>
                <div class="entrust-list-content">
                    <ul v-for="(item, index) in entrustDetailList" class="entrust-list-ul">
                        <li class="entrust-list-li">
                            <p>
                                <span class="info-circle" :class="{up:item.opType =='买入',down:item.opType =='卖出'}" v-cloak>{{item.opType =='买入' ? '买':'卖'}}</span>
                            </p>
                        </li>
                        <li class="entrust-list-li name">
                            <p v-cloak>{{item.symbolName}}</p>
                            <p class="time" v-cloak>{{item.createTime}}</p>
                        </li>
                        <li class="entrust-list-li">
                            <p v-cloak>{{item.buyPrice}}</p>
                        </li>
                        <li class="entrust-list-li">
                            <p v-cloak>{{item.amount}}</p>
                        </li>
                        <li class="entrust-list-li name">
                            <p v-cloak>{{item.orderState}}</p>
                            <p v-cloak>{{(item.amount * parseFloat(item.buyPrice.replace(',',''))).toFixed(2)}}</p>
                        </li>
                    </ul>
                    <div class="no-record" v-show="entrustDetailList.length ==0">无成交记录</div>
                </div>
            </section>
            <!-- 自配组合的当日委托和历史委托 -->
            <section class="diy-list-container" v-if="mType==0  && type ==1">
                <div class="entrust-list-top">
                    <ul class="entrust-list-ul">
                        <li class="entrust-list-li">
                            <p>&nbsp;</p>
                        </li>
                        <li class="entrust-list-li">
                            <p>名称</p>
                        </li>
                        <li class="entrust-list-li">
                            <p>价格</p>
                        </li>
                        <li class="entrust-list-li">
                            <p>数量</p>
                        </li>
                        <li class="entrust-list-li">
                            <p>状态</p>
                        </li>
                    </ul>
                </div>
                <div class="entrust-list-content">
                    <ul v-for="(item, index) in entrustDetailList" class="entrust-list-ul">
                        <li class="entrust-list-li">
                            <p>
                                <span class="info-circle" :class="{up:item.opType =='买入',down:item.opType =='卖出'}" v-cloak>{{item.opType =='买入' ? '买':'卖'}}</span>
                            </p>
                        </li>
                        <li class="entrust-list-li name">
                            <p v-cloak>{{item.symbolName}}</p>
                            <p v-cloak>{{item.createTime}}</p>
                        </li>
                        <li class="entrust-list-li">
                            <p v-cloak>{{item.buyPrice}}</p>
                        </li>
                        <li class="entrust-list-li">
                            <p v-cloak>{{item.amount}}</p>
                        </li>
                        <li class="entrust-list-li">
                            <p v-cloak>{{item.orderState}}</p>
                        </li>
                    </ul>
                    <div class="no-record" v-show="entrustDetailList.length ==0">无委托记录</div>
                </div>
            </section>
            <!-- 推荐组合的当日成交和历史成交 -->
            <section class="commend-list-container" v-show="mType==1  && type ==0">
                <div class="entrust-list-top">
                    <ul class="entrust-list-ul">
                        <li class="entrust-list-li" style="width: 5%">
                            <p>&nbsp;</p>
                        </li>
                        <li class="entrust-list-li" style="width: 40%">
                            <p>名称</p>
                        </li>
                        <li class="entrust-list-li" style="width: 30%">
                            <p>时间</p>
                        </li>
                        <li class="entrust-list-li" style="width: 20%">
                            <p>状态</p>
                        </li>
                    </ul>
                </div>
                <div class="entrust-list-content">
                    <ul v-for="(item, index) in entrustDetailList" class="entrust-list-ul">
                        <li class="entrust-list-li marginTop10" style="width:5%">
                            <p>
                                <span v-show="item.toTypeDesc ==''"class="info-circle" :class="{up:item.opType==2,down:item.opType ==1}" v-cloak>{{opTypeName[item.opType-1]}}</span>
                                <span v-show="item.toTypeDesc !=''" class="info-circle change" v-cloak>改</span>
                            </p>
                        </li>
                        <li class="entrust-list-li marginTop10" style="width:40%">
                            <p v-cloak>{{item.typeDesc}}<span v-show="item.toTypeDesc !=''">->{{item.toTypeDesc}}</span></p>
                        </li>
                        <li class="entrust-list-li" style="width:30%">
                            <p v-cloak>{{item.createTime}}</p>
                        </li>
                        <li class="entrust-list-li marginTop10" style="width:20%">
                            <p v-cloak>{{item.opDesc}}</p>
                        </li>
                    </ul>
                    <div class="no-record" v-show="entrustDetailList.length ==0">无成交记录</div>
                </div>
            </section>
            <!-- 推荐组合的当日委托和历史委托 -->
            <section class="commend-list-container" v-if="mType==0 && type ==0">
                <div class="entrust-list-top">
                    <ul class="entrust-list-ul">
                        <li class="entrust-list-li" style="width: 5%">
                            <p>&nbsp;</p>
                        </li>
                        <li class="entrust-list-li" style="width: 40%">
                            <p>名称</p>
                        </li>
                        <li class="entrust-list-li" style="width: 30%">
                            <p>时间</p>
                        </li>
                        <li class="entrust-list-li" style="width: 20%">
                            <p>状态</p>
                        </li>
                    </ul>
                </div>
                <div class="entrust-list-content">
                    <ul v-for="(item, index) in entrustDetailList" class="entrust-list-ul">
                        <li class="entrust-list-li marginTop10" style="width: 5%">
                            <p>
                                <span v-show="item.toTypeDesc ==''"class="info-circle" :class="{up:item.opType==2,down:item.opType ==1}" v-cloak>{{opTypeName[item.opType-1]}}</span>
                                <span v-show="item.toTypeDesc !=''" class="info-circle change" v-cloak>改</span>
                            </p>
                        </li>
                        <li class="entrust-list-li marginTop10" style="width: 40%">
                            <p v-cloak>{{item.typeDesc}}<span v-show="item.toTypeDesc !=''">->{{item.toTypeDesc}}</span></p>
                        </li>
                        <li class="entrust-list-li" style="width: 30%">
                            <p v-cloak>{{item.createTime}}</p>
                        </li>
                        <li class="entrust-list-li marginTop10" style="width: 20%">
                            <p v-cloak>{{item.opDesc}}</p>
                        </li>
                    </ul>
                    <div class="no-record" v-show="entrustDetailList.length ==0">无委托记录</div>
                </div>
            </section>
        </section>
    </div>
</template>
<script>
import headTop from '../../../../../components/header/head'
import BScroll from 'better-scroll'
import assetShow from '../../../../../components/common/assetShow'
import {
    REQ_TYPE_ACCOUNT,
    SOCKET_URL_ACCOUNT
} from '../../../../../config/const'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../../../../config/response'
import {
    assetOrderList,
    commendOrderList,
    tradeEntrustList
} from '../../../../../service/getData'
import {
    setMyAssetQueryStatus,
    getMyAssetQueryStatus
} from '../../../../../store/store'
export default {
    components: {
        headTop
    },

    data() {
        return {
            entrustDetailList: '', //委托列表
            mType: 0, //委托/成交
            cur: 0, //当天/历史
            type: 1, //类型
            opType: 0, //组合类型
            opTypeName:['卖','买','改']             
        }
    },

    watch: {

    },

    created() {

        this.initData();
    },

    methods: {

        //初始化获取数据
        initData() {
            this.$route.meta.title = this.$route.query.title;
            this.mType = this.$route.query.type;
            this.cur = this.$route.query.cur;
            this.type = this.$route.query.t;
            this.$route.query.ot==1 ? this.opType = 1 :this.opType = 0;
            setMyAssetQueryStatus(true);
            if(this.opType ==0){
                if (this.type == 0) {
                    this.getCommendOrderData();
                } else{
                    this.getPageData();
                }
            }else{
                this.getTradeOrderData();
            }

        },

        //获取自配类型的订单数据
        getPageData() {
            // this.showLoading = true;
            // let ret = await assetIndex(this.currentTradeId);
            let handler = this;
            assetOrderList(this.mType, this.cur, function(ret) {
                handler.responsePage(ret);
            });

        },

        responsePage(ret) {
            // this.hideLoading();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.entrustDetailList = ret.retData.list;
                // this.getRealPageData(this);
                return
            }
        },

        //获取推荐类型的订单数据
        getCommendOrderData() {
            // this.showLoading = true;
            // let ret = await assetIndex(this.currentTradeId);
            let handler = this;
            commendOrderList(this.mType, this.cur, function(ret) {
                handler.responseCommendOrder(ret);
            });

        },

        responseCommendOrder(ret) {
            // this.hideLoading();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.entrustDetailList = ret.retData.list;
                // this.getRealPageData(this);
                return
            }
        },

        //获取实盘推荐类型的委托和成交数据
        getTradeOrderData() {
            // this.showLoading = true;
            // let ret = await assetIndex(this.currentTradeId);
            let handler = this;
            tradeEntrustList(this.mType, this.cur, function(ret) {
                handler.responseTradeOrder(ret);
            });

        },

        responseTradeOrder(ret) {
            // this.hideLoading();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.entrustDetailList = ret.retData.list;
                // this.getRealPageData(this);
                return
            }
        },
    }

}
</script>
<style lang="scss" scoped>
@import '../../../../../style/mixin';
.commend-list-container {
    margin-top: 0.2rem;
    padding: 0.3rem 0.3rem;
    padding-bottom:1.5rem;
    .entrust-list-top {
        width: 100%;
        .entrust-list-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            padding: 0.4rem 0rem;
        }
        .entrust-list-li {
            float: left;
            width: 31%;
            p {
                @include sc(.6rem, $fontColor);
                text-align: center;
                padding-top: 0rem;
            }
            .time {
                @include sc(.6rem, $fontColor);
            }
        }
        .entrust-list-li:first-child {
            width: 7%;
        }
        .name {
            p {
                margin-top: .5rem;
            }
        }
    }
    .entrust-list-content {
        width: 100%;
        border-bottom: solid 0.05rem $lineGrey4;
        .entrust-list-ul {
            border-top: solid 0.05rem $lineGrey4;
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            padding: 0.4rem 0rem;
        }
        .entrust-list-li {
            float: left;
            width: 31%;
            p {
                @include sc(.6rem, $fontColor);
                text-align: center;
                margin-top: 0;
            }
            .info-circle {
                width: 1rem;
                height: 1rem;
                background-color: $blue;
                -moz-border-radius: 0.5rem;
                -webkit-border-radius: 0.5rem;
                border-radius: 0.5rem;
                padding-top: 0.06rem;
                float: left;
                text-align: center;
                font-size: 0.6rem;
                margin-left: 0.5rem;
            }
            .up {
                background-color: $red;
            }
            .down {
                background-color: $green;
            }
            .change {
                background-color: $gold;
            }
        }
        .marginTop10 {
            p {
                margin-top: .4rem;
            }
        }
        .entrust-list-li:first-child {
            width: 7%;
        }
        .name {
            p {
                margin-top: .5rem;
            }
        }
        .up .entrust-list-li {
            p {
                color: $red;
            }
        }
        .down .entrust-list-li {
            p {
                color: $green;
            }
        }
        .no-record {
            border-top: solid 0.05rem $lineGrey4;
            text-align: center;
            padding: 1rem;
            @include sc(.65rem, $fontGreyColor2);
        }
    }
}

.diy-list-container {
    margin-top: 0.2rem;
    padding: 0.3rem 0.3rem;
    padding-bottom:1.5rem;
    .entrust-list-top {
        width: 100%;
        border-bottom: solid 0.05rem $lineGrey4;
        .entrust-list-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            padding: 0.4rem 0rem;
        }
        .entrust-list-li {
            float: left;
            width: 21%;
            p {
                @include sc(.6rem, $fontColor);
                text-align: center;
            }
        }
        .entrust-list-li:first-child {
            width: 6%;
        }
        .entrust-list-li:nth-child(2) {
            width: 31%;
        }
    }
    .entrust-list-content {
        width: 100%;
        .entrust-list-ul {
            border-bottom: solid 0.05rem $lineGrey4;
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            padding: 0.4rem 0rem;
        }
        .entrust-list-li {
            float: left;
            width: 21%;
            p {
                @include sc(.6rem, $fontColor);
                text-align: center;
                margin-top: .4rem;
            }
            .info-circle {
                width: 1rem;
                height: 1rem;
                background-color: $blue;
                -moz-border-radius: 0.5rem;
                -webkit-border-radius: 0.5rem;
                border-radius: 0.5rem;
                padding-top: 0.06rem;
                float: left;
                text-align: center;
                font-size: 0.6rem;
                margin-left: 0.5rem;
            }
            .up {
                background-color: $red;
            }
            .down {
                background-color: $green;
            }
        }
        .name {
            p {
                margin-top: 0rem;
            }
        }
        .entrust-list-li:nth-child(2) {
            width: 31%;
        }
        .entrust-list-li:first-child {
            width: 6%;
        }
        .up .entrust-list-li {
            p {
                color: $red;
            }
        }
        .down .entrust-list-li {
            p {
                color: $green;
            }
        }
        .no-record {
            text-align: center;
            padding: 1rem;
            @include sc(.65rem, $fontGreyColor2);
        }
    }
}
</style>
