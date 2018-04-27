<template>
    <section class="asset-container">
        <section class="content-container">
            <p class="close-trade" @click="closeTrade()">
                <svg fill="#bbb">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cancel"></use>
                </svg>
            </p>
            <section class="show-list-container">
                <!-- <div v-wechat-title="$route.meta.title"></div> -->
                <p class="xbt-title">{{fofName}}组合历史收益</p>
                <div id="chart0" class="chart">
                     <p v-show="mData ==''" class="loading">加载中……</p>
                </div>
            </section>    
        </section>
    </section>
</template>
<script>
import headTop from '../../../../components/header/head'
import {
    drawHistoryKLine
} from '../../../../utils/kHistoryIncome.js'
import BScroll from 'better-scroll'
import {
    assetHistoryIncome
} from '../../../../service/getData'
import alertTip from '../../../../components/common/alertTip'
import {
    Toast,
    Indicator
} from 'mint-ui'
import {
    REQ_TYPE_DIY_ACCOUNT,
    SOCKET_URL_DIY_ACCOUNT,
    REQ_TYPE_FOF,
    SOCKET_URL_ACCOUNT,
    REQ_TYPE_SIMPLE_FOF,
    SOCKET_URL_FOF_LIST
} from '../../../../config/const'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_SYSTEM,
    RESPONSE_CODE_ERROR_TOKEN
} from '../../../../config/response'
export default {
    components: {
        headTop,
        alertTip
    },

    data() {
        return {
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            mData:'',//收益数据
        }
    },
    props: ['fofId', 'fofName'], 
    created() {
        this.initData();
        // window.scrollTo(0, 0);

        // let ua = window.navigator.userAgent.toLowerCase();
        // if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        //     this.isWeixin = "true";
        // } else {
        //     this.isWeixin = "false";
        // }
    },

    methods: {
        //初始化获取数据
        initData() {
            // this.fofId = this.$route.query.fofId;
            // this.fofName = this.$route.query.fofName;
            // this.$route.meta.title = this.fofName +'组合历史收益';
            this.getHistoryIncomeLineData();
        },

        //获取历史收益数据
        getHistoryIncomeLineData() {
            Indicator.open();
            let handler = this;
            assetHistoryIncome(this.fofId, function(ret) {
                handler.responseHistoryIncomeLine(ret);
            });
        },

        responseHistoryIncomeLine(ret) {
            Indicator.close();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.mData = ret.retData.data;
                drawHistoryKLine(this.mData,this.fofName,'chart0'); 
                return;
            } else if(response  == RESPONSE_CODE_ERROR_SYSTEM){
            }
        },
        closeTrade() {
            this.$emit('closeTrade');
        },
    }

}
</script>
<style lang="scss" scoped>
@import '../../../../style/mixin';
.xbt-title{
    font-size: .7rem;
    text-align:center;
}
.chart {
    width: 100%;
    height: 280px;
    margin-top: .8rem;
    .loading {
        text-align: center;
        @include sc(.65rem, $fontGreyColor);
    }
}

.asset-container {
    position: fixed;
    bottom: 0rem;
    left: 0rem;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 101;
    .content-container {
        width: 100%;
        position: absolute;
        bottom: 0rem;
        left: 0rem;
        height: 15rem;
        background-color: $grey1;
        padding: .3rem;
        .close-trade {
            position: absolute;
            right: .4rem;
            top: .2rem;
            @include wh(1rem, 1rem);
            margin: auto;
            margin-bottom: 0.2rem;
            svg {
                @include wh(100%, 100%);
            }
        }
        .show-list-container {
            margin-top: 1.2rem;
            .manager-list-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 80%;
                border: solid 0.05rem $grey2;
            }
            .manager-list-li {
                float: left;
                width: 30%;
                padding-top: 0.2rem;
                padding-bottom: .2rem;
                text-align: center;
                border-right: solid 0.05rem $grey2;
                p {
                    float: left;
                    @include sc(.65rem, $fontGreyColor2);
                    text-align: center;
                }
                img {
                    width: 1rem;
                    margin: auto;
                }
                .icon {
                    @include wh(1rem, .8rem);
                    margin: auto;
                    margin-bottom: 0.1rem;
                    margin-right: 0.2rem;
                    margin-left: 15%;
                    svg {
                        @include wh(100%, 100%);
                    }
                }
            }
            .manager-list-li:last-child {
                width: 40%;
                .icon {
                    margin-left: 10%;
                }
                border-right: none 0.05rem $grey2;
            }
            .active {
                background-color: $grey;
                p {
                    color: $blue;
                }
            }
        }
        .trade-container {
            margin-top: .8rem;
            .trade-content-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
            }
            .trade-content-li:first-child {
                float: left;
                width: 60%;
                text-align: center;
                .select_container {
                    width: 100%;
                    background: #333;
                    z-index: 100;
                    border: solid 0.05rem $blue;
                    justify-content: space-between;
                    padding: .3rem 0rem .3rem .8rem;
                    padding-top: .1rem;
                    position: relative;
                    height:1.6rem;
                    select {
                        position: absolute;
                        left: 0.3rem;
                        top: 0.15rem;
                        width: 95%;
                        margin-right: 0rem;
                        @include sc(.65rem, $fontColor);
                        background-color: transparent;
                        
                        height: 1.2rem;
                        option {
                            @include sc(.55rem, $fontColor);
                            z-index: 10;
                        }
                        z-index:10;
                    }
                    .right-content {
                        float: right;
                        margin-right: 0.8rem;
                        margin-top: 0.25rem;
                        @include sc(.55rem, $fontColor);
                    }
                    .arrow-down {
                        position: absolute;
                        right: 0.3rem;
                        top: 0.2rem;
                        margin-right: 0rem;
                        z-index: 1;
                        @include wh(.6rem, .6rem);
                        svg {
                            @include wh(100%, 100%);
                            z-index: 1;
                        }
                    }
                }
                .computer-ul {
                    list-style: none;
                    margin: 0 auto;
                    overflow: hidden;
                    width: 100%;
                    padding: 0rem 0rem;
                    margin-top: .1rem;
                    background: #333;
                    z-index: 100;
                    border: solid 0.05rem $blue;
                    li {
                        float: left;
                        width: 25%;
                        padding: 0rem .5rem;
                        p {
                            @include sc(1rem, $blue);
                            line-height: 1.2rem;
                            .arrow-down {
                                margin-top: 0.25rem;
                                margin-right: 0.2rem;
                                float: right;
                                @include wh(.8rem, .8rem);
                                svg {
                                    @include wh(100%, 100%);
                                }
                            }
                        }
                        input {
                            width: 100%;
                            height: 100%;
                            background-color: transparent;
                            @include sc(.65rem, $fontGreyColor2);
                            padding: 0rem .1rem;
                            text-align: center;
                            margin-bottom: .4rem;
                        }
                        .input-price {
                            width: 100%;
                            height: 100%;
                            background-color: transparent;
                            @include sc(.65rem, $fontGreyColor2);
                            padding: 0rem .1rem;
                            line-height: 1.7rem;
                            text-align: center;
                        }
                    }
                    li:nth-child(2) {
                        width: 50%;
                        text-align: center;
                        border: solid 0.05rem $blue;
                        border-style: none solid none solid;
                    }
                }
                .show-container {
                    padding-top: .2rem;
                    margin-bottom: .3rem;
                    p {
                        @include sc(.55rem, $fontGreyColor2);
                        text-align: left;
                        span {
                            color: $red;
                        }
                    }
                }
                .cash-container {
                    padding-top: .4rem;
                    p {
                        @include sc(.55rem, $fontGreyColor2);
                        text-align: center;
                        span {}
                    }
                }
                .postion-ul {
                    list-style: none;
                    margin: 0 auto;
                    overflow: hidden;
                    width: 100%;
                    padding: 0rem 0rem;
                    margin-top: .2rem;
                    z-index: 100;
                    li {
                        float: left;
                        width: 25%;
                        padding: 0rem 0.1rem;
                        p {
                            @include sc(.55rem, $fontGreyColor);
                            background-color: $grey2;
                            padding: .1rem 0rem;
                        }
                        .active {
                            background-color: $red;
                        }
                    }
                }
                .red {
                    li {
                        .active {
                            background-color: $red;
                        }
                    }
                }
                .green {
                    li {
                        .active {
                            background-color: $green;
                        }
                    }
                }
            }
            .trade-content-li:last-child {
                float: left;
                width: 40%;
                text-align: center;
                padding-left: .2rem;
                .history-button {
                    @include sc(.65rem, $fontGreyColor);
                    background-color: $grey2;
                    padding: .3rem .6rem;
                }
                .history-button-active {
                    @include sc(.65rem, $fontGreyColor);
                    background-color: $blue;
                    padding: .3rem .6rem;
                }
                .deal-ul {
                    margin-top: .45rem;
                    border: solid 0.05rem $grey2;
                    width: 100%;
                    background-color: $grey;
                    li {
                        padding: .37rem;
                        p {
                            @include sc(.65rem, $fontGreyColor);
                            text-align: left;
                        }
                    }
                    li:first-child {
                        border-bottom: solid 0.05rem $grey2;
                    }
                }
                .tip {
                    margin-top: .2rem;
                    @include sc(.55rem, $fontGreyColor2);
                }
            }
        }
        .confirm-content {
            width: 100%;
            padding: .6rem 0rem;
            padding-bottom: 0rem;
            z-index: 102;
            div {
                width: 100%;
                padding: .3rem .6rem;
                @include sc(.75rem, $fontGreyColor);
                background-color: $grey2;
                text-align: center;
            }
            .active_buy {
                background-color: $red;
                color: $fontColor
            }
            .active_sell {
                background-color: $green;
                color: $fontColor
            }
        }
    }
}

</style>
