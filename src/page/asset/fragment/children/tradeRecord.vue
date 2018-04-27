<template>
    <div class="restContainer">
        <!--         <head-top head-title="开户" goBack="true"></head-top> -->
        <transition name="fade-choose">
            <section class="history-container">
                <section class="menu-container">
                    <section class="history-list-container">

                        <section class="history-list-container">
                        <div class="history-list-top">
                            <ul class="history-list-ul">
                                <li class="history-list-li">
                                    <p>时间</p>
                                </li>
                                <li class="history-list-li">
                                    <p>类型</p>
                                </li>
                                <li class="history-list-li">
                                    <p>金额(美元)</p>
                                </li>
                                <li class="history-list-li">
                                    <p>状态</p>
                                </li>
                            </ul>
                        </div>
                        <div class="history-list-content">
                            <ul v-for="(item, index) in tradeAddFundRecord" class="history-list-ul" v-show="tradeAddFundRecord.length >0">
                                <li class="history-list-li">
                                    <p v-cloak>{{item.createTime}}</p>
                                </li>
                                <li class="history-list-li" style="padding-top:8px">
                                    <p v-cloak>入金</p>
                                </li>
                                <li class="history-list-li" style="padding-top:12px">
                                    <p v-cloak>{{formatNum(item.amt,2)}}</p>
                                </li>
                                <li class="history-list-li" style="padding-top:8px">
                                     <p v-cloak>{{item.state}}</p>
                                </li>
                            </ul>
                            <ul v-for="(item, index) in tradeRedeemRecord" class="history-list-ul" v-show="tradeRedeemRecord.length >0">
                                <li class="history-list-li">
                                    <p v-cloak>{{item.createTime}}</p>
                                </li>
                                <li class="history-list-li" style="padding-top:8px">
                                    <p v-cloak>出金</p>
                                </li>
                                <li class="history-list-li" style="padding-top:12px">
                                    <p v-cloak>{{formatNum(item.amt,2)}}</p>
                                </li>
                                <li class="history-list-li" style="padding-top:8px">
                                    <p v-cloak>{{item.state}}</p>
                                </li>
                            </ul>
                            <div class="no-record" v-show ="tradeAddFundRecord.length ==0 && tradeRedeemRecord ==0">暂无出入金记录</div>
                        </div>
                    </section>
                    </section>
                </section>
            </section>
        </transition>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>
<script>
import headTop from '../../../../components/header/head'
import alertTip from '../../../../components/common/alertTip'
import {
    setAssetState,
    getAssetState
} from '../../../../store/store'
import {
    Toast,
    Indicator
} from 'mint-ui'
import {
    profileGetStep,
    tradeAddFund,
    tradeCanAdd,
    tradeAddFundRecord,
    tradeRedeemRecord
} from '../../../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_SYSTEM,
    RESPONSE_CODE_ERROR_TOKEN
} from '../../../../config/response'
import {
    formatNumber
} from '../../../../utils/utils'
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    data() {
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                currencyName:['人民币','美元'],
                tradeAddFundRecord:'',//出入金明细-入金
                tradeRedeemRecord:'',//出入金明细-出金  
            }
        },
        components: {
            headTop,
            alertTip,
        },
        created() {
            this.initData();
        },
        methods: {

            formatNum(num,pos){
                return formatNumber(num,pos);
            },

            //初始化数据
            initData() {
                this.accountId = this.$route.query.ai;
                this.requestTradeAddFundRecord();
                this.requestTradeRedeemRecord();
            },


            //获取实盘出入金的入金记录
            requestTradeAddFundRecord(cur) {
                let handler = this;
                tradeAddFundRecord(function(ret) {
                    handler.responseTradeAddFundRecord(ret);
                });
            },

            
            responseTradeAddFundRecord(ret) {
                let response = responseResult(this, ret);
                if (response == RESPONSE_CODE_SUCCESS) {
                    this.tradeAddFundRecord = ret.retData.list;
                    console.log(this.tradeAddFundRecord);
                    return
                }
            },

            //获取实盘出入金的出金记录
            requestTradeRedeemRecord(cur) {
                let handler = this;
                tradeRedeemRecord(function(ret) {
                    handler.responseTradeRedeemRecord(ret);
                });
            },
            
            responseTradeRedeemRecord(ret) {
                let response = responseResult(this, ret);
                if (response == RESPONSE_CODE_SUCCESS) {
                    this.tradeRedeemRecord = ret.retData.list;
                    return
                }
            },

            closeTip() {
                this.showAlert = false;
            }
        }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.history-list-container {
        width: 100%;
        margin-top: 0.2rem;
        padding: 0.3rem 0.3rem;
        .history-list-top {
            width: 100%;
            border-bottom: solid $lineGrey4 0.05rem;
            .history-list-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                padding: 0.4rem 0rem;
            }
            .history-list-li {
                float: left;
                width: 25%;
                p {
                    @include sc(.65rem, $fontColor);
                    text-align: center;
                }
            }
        }
        .no-data {
                margin-top: 1rem;
                padding: 1rem;
                @include sc(.65rem, $fontGreyColor2);
                background-color: $grey;
            }
        .history-list-content {
            width: 100%;
            border-bottom: solid 0rem $lineGrey4;
            .no-record {
                display: none;
                text-align: center;
                padding: 1rem;
                @include sc(.65rem, $fontGreyColor2);
            }
            .no-data {
                margin-top: 1rem;
                padding: 1rem;
                @include sc(.65rem, $fontGreyColor2);
                background-color: $grey;
            }
            .history-list-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                padding: 0.4rem 0rem;
                border-bottom: solid 0.05rem $lineGrey4;
            }
            .history-list-ul:last-child {
                border-bottom-width: 0px;
            }
            .history-list-li {
                float: left;
                width: 25%;
                p {
                    @include sc(.65rem, $fontColor);
                    text-align: center;
                }
                .up {
                    background-color: $red;
                }
                .down {
                    background-color: $green;
                }
            }
            .up .history-list-li {
                p {
                    color: $red;
                }
            }
            .down .history-list-li {
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

.tip {
    @include sc(.55rem, $fontGreyColor2);
    padding: .4rem;
    padding-left: .6rem;
}

.login_container {
    margin: 1rem .5rem;
    @include sc(.8rem, $fontColor);
    background-color: $blue;
    padding: .4rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
}

.grey {
    background-color: $grey3;
    @include sc(.7rem, $fontGreyColor);
}

.question {
    text-align: right;
    margin-right: .3rem;
    margin-top: -1rem;
    a {
        @include sc(.55rem, $blue);
    }
}

.bottom-container {
    width: 100%;
    background-color: $grey;
    padding-top: .5rem;
    margin: .5rem 0rem 2.5rem;
    .title {
        @include sc(.65rem, $fontGreyColor2);
        text-align: center;
    }
    .tip-ul {
        list-style: none;
        margin: 0 auto;
        overflow: hidden;
        width: 100%;
        padding: 0.4rem 0.2rem;
    }
    .tip-li {
        float: left;
        width: 50%;
        padding: .02rem;
        text-align: center;
        .character-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            padding: 0.4rem 0.2rem;
        }
        .character-li {
            float: left;
            width: 30%;
            padding: .02rem;
            .icon {
                @include wh(1.5rem, 1.5rem);
                margin: auto;
                svg {
                    @include wh(100%, 100%);
                }
            }
        }
        .character-li:last-child {
            width: 70%;
            text-align: left;
            p {
                @include sc(.55rem, $fontGreyColor2);
            }
        }
    }
}

.remark-label{
  font-size: .6rem;
  margin-left: 1rem;
}

.add-fund-tip{
	text-align:right;
	margin-top:-0.8rem;
	margin-right:.6rem;
}
.add-fund-tip a{
	 @include sc(.55rem, $fontGreyColor2);
}
.grey {
    background-color: $grey3;
    @include sc(.7rem, $fontGreyColor);
}
.tip{
   @include sc(.6rem, $red);
   margin-left: 0.5rem;
   margin-top:-0.3rem;
} 
</style>
