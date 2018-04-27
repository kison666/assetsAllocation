<template>
    <section class="trade-container">
        <div class="trade-masking"></div>
        <div class="trade-content">
            <p class="close-trade" @click="closeTrade()">
                <svg fill="#bbb">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cancel"></use>
                </svg>
            </p>
            <ul class="trade-content-ul">
                <li class="trade-content-li">
                    <p>市价委托系统下单</p>
                    <p>您当前有<span v-cloak>{{name}}</span>:&nbsp;<span class="red" v-cloak>{{account}}</span>股</p>
                    <p v-cloak>您选择{{typeName}}<span v-cloak>{{name}}</span>:&nbsp;<span class="red" v-cloak>{{FOFAccount}}</span>股</p>
                </li>
                <li class="trade-content-li">
                    <p v-show="type ==0">可买股数:&nbsp;<span class="red" v-cloak>{{avliableAccount}}</span>股</p>
                    <p v-show="type ==1">可卖股数:&nbsp;<span class="red" v-cloak>{{avliableSellAccount}}</span>股</p>
                    <ul class="computer-ul">
                        <li @click="reduceAccount()">
                            <p>
                                <span class="arrow-down">
                                    <svg fill="#bbb">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#num-reduce"></use>
                                    </svg>
                                </span>
                            </p>
                        </li>
                        <li>
                            <input type="number" placeholder="数量" v-model="FOFAccount">
                        </li>
                        <li @click="addAccount()">
                            <p>
                                <span class="arrow-down">
                                    <svg fill="#bbb">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#num-add"></use>
                                    </svg>
                                </span>
                            </p>
                        </li>
                    </ul>
                </li>
            </ul>
            <div class="confirm-content">
                <p class="trade-confirm" :class="{active_buy:FOFAccount>0 && FOFAccount<= avliableAccount}" v-show="type ==0" @click="buyFOFClick()" v-cloak>{{typeName}}</p>
                <p class="trade-confirm" :class="{active_sell:FOFAccount>0 && FOFAccount<= account}" v-show="type ==1" @click="sellFOFClick()" v-cloak>{{typeName}}</p>
            </div>
        </div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <alert-multi-tip v-if="showMAlert" :showHide="showMAlert" @closeTip="closeMTip" :alertText="alertMText" @confrimTip="confrimTip"></alert-multi-tip>
        <transition name="waiting">
            <waiting v-show="showWaiting"></waiting>
        </transition>
    </section>
</template>
<script>
import waiting from '../common/waiting'
import alertTip from '../common/alertTip'
import alertMultiTip from '../common/alertMultiTip'
import {
    Toast,
    Indicator
} from 'mint-ui'
import {
    assetSimpleFOFSell,
    assetSimpleFOFBuy,
} from '../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_SYSTEM,
    RESPONSE_CODE_ERROR_TOKEN
} from '../../config/response'

export default {
    data() {
            return {
                FOFAccount: 0, //输入的数量
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                showMAlert: false, //显示M提示组件
                alertMText: null, //提示M的内容
                closeTipType: 0, //1为买卖成功后的提示
                showWaiting: false, //显示等待动画
                isTradeTime:false,//是否是交易时间
            }
        },
        components: {
            alertTip,
            alertMultiTip,
            waiting,
        },
        props: ['name', 'account', 'avliableAccount', 'type', 'typeName', 'fofId', 'tradeFlag','avliableSellAccount'],
        created() {
            // this.initData();
        },
        mounted() {

        },
        methods: {
            //初始化获取数据
            async initData() {

            },

            //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
            async listenPropChange() {

                this.initData();
            },
            closeTip() {
                this.showAlert = false;
                if (this.closeTipType == 1) {
                    this.closeTrade();
                    this.closeTipType = 0;
                }
            },

            closeTrade() {
                this.$emit('closeTrade');
                this.FOFAccount = 0;
            },

            reduceAccount() {
                if (this.FOFAccount > 0) {
                    this.FOFAccount--;
                }
            },

            addAccount() {
                if (this.type == 0) {
                    if (this.FOFAccount < this.avliableAccount) {
                        this.FOFAccount++;
                    }
                } else if (this.type == 1) {
                    if (this.FOFAccount < this.avliableSellAccount) {
                        this.FOFAccount++;
                    }
                }
            },

            buyFOFClick() {
                if (this.FOFAccount <= 0) {
                    return;
                }
                this.showMAlert = true;
                let tmpType = '买入:';
                this.alertMText = tmpType + this.name + " 数量:" + this.FOFAccount + "股";

            },

            sellFOFClick() {
                if (this.FOFAccount <= 0) {
                    return;
                }
                this.showMAlert = true;
                let tmpType = '卖出:';
                this.alertMText = tmpType + this.name + " 数量:" + this.FOFAccount + "股";
            },

            //确认下单
            confrimTip() {
                if (this.type == 0) {
                    this.requestFOFBuy();
                } else if (this.type == 1) {
                    this.requestFOFSell();
                }
                this.closeMTip();
            },
            closeMTip() {
                this.showMAlert = false;
            },
            //生产环境与发布环境隐藏loading方式不同
            hideWaiting() {
                if (process.env.NODE_ENV !== 'development') {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        clearTimeout(this.timer);
                        this.showWaiting = false;
                    }, 400)
                } else {
                    this.showWaiting = false;
                }
            },


            requestFOFBuy() {
                if (this.FOFAccount > this.avliableAccount || this.FOFAccount < 0) {
                    return;
                }
                this.showWaiting = true;
                let handler = this;
                assetSimpleFOFBuy(this.fofId, this.FOFAccount, function(ret) {
                    // console.log("success=" + data);
                    handler.responseFOFBuy(ret);
                });
            },

            responseFOFBuy(ret) {
                this.hideWaiting();
                let response = responseResult(this, ret, 1, 1);
                if (response == RESPONSE_CODE_ERROR_DATA) {
                    this.showAlert = true;
                    this.alertText = ret.retMsg;
                    return
                } else if (response == RESPONSE_CODE_SUCCESS) {
                    this.orderNo = ret.retData.contractNo;
                    this.showAlert = true;
                    this.closeTipType = 1;
                    this.isTradeTime = ret.retData.isTradeTime;
                    let tmpType = '委托买入';
                    if (this.isTradeTime == true) {
                        tmpType = '买入';
                    }
                    this.alertText = tmpType + "成功,合同编号为：" + this.orderNo;
                    this.$emit('updateData');
                }
            },

            requestFOFSell() {
                if (this.FOFAccount > this.account || this.FOFAccount < 0) {
                    return;
                }
                this.showWaiting = true;
                let handler = this;
                assetSimpleFOFSell(this.fofId, this.FOFAccount, function(ret) {
                    handler.responseSell(ret);
                });
            },

            responseSell(ret) {
                this.hideWaiting();
                let response = responseResult(this, ret, 1, 1);
                if (response == RESPONSE_CODE_ERROR_DATA || response == RESPONSE_CODE_ERROR_SYSTEM) {
                    this.showAlert = true;
                    this.alertText = ret.retMsg;
                    return
                } else if (response == RESPONSE_CODE_SUCCESS) {
                    this.orderNo = ret.retData.contractNo;
                    this.showAlert = true;
                    this.closeTipType = 1;
                    this.isTradeTime = ret.retData.isTradeTime;
                    let tmpType = '委托卖出';
                    if (this.isTradeTime == true) {
                        tmpType = '卖出';
                    }
                    this.alertText = tmpType + "成功,合同编号为：" + this.orderNo;
                    this.$emit('updateData');
                }
            },


        },
        watch: {
            //监听父级传来的currentAssetType，当值发生变化的时候重新获取数据
            // currentAssetType: function(value) {
            //     this.listenPropChange();
            // },

            // 监听input输入
            FOFAccount: function(value) {
                if (value.length > 1) {
                    if (value.indexOf('0') == 0) {
                        this.FOFAccount = value.substring(1);
                    }
                }
                //如果输入的金额大于可买和可卖的数量，提示用户
                if (this.type == 0) {
                    //买
                    if (value > this.avliableAccount) {
                        Toast({
                            message: "您最多可卖" + this.avliableAccount + "股",
                            position: 'middle',
                            duration: 4000,
                        });
                    }
                } else if (this.type == 1) {
                    //买
                    if (value > this.account) {
                        Toast({
                            message: "您最多可卖" + this.account + "股",
                            position: 'middle',
                            duration: 4000,
                        });
                    }
                }
            }

        }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.trade-container {
    .trade-masking {
        position: fixed;
        bottom: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
    }
    .trade-content {
        position: fixed;
        bottom: 0;
        height: 7.5rem;
        width: 100%;
        background-color: $grey1;
        z-index: 9999;
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
        .trade-content-ul {
            bottom: -1.7rem;
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            padding: 0.4rem 0rem;
            margin-top: .6rem;
            z-index: 100;
        }
        .trade-content-li {
            float: left;
            width: 55%;
            padding: 0rem .5rem;
            p {
                @include sc(.5rem, $fontGreyColor2);
                line-height: 1rem;
            }
            .title {
                @include sc(.55rem, $fontGreyColor2);
                padding-bottom: 0.2rem;
            }
            .simple {
                padding-top: 0.5rem;
            }
        }
        .trade-content-li:last-child {
            width: 45%;
        }
        .computer-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            padding: 0rem 0rem;
            margin-top: .2rem;
            background: #333;
            z-index: 100;
            border: solid 0.05rem $red;
            li {
                float: left;
                width: 25%;
                padding: 0rem .5rem;
                p {
                    @include sc(0.65rem, $red);
                    line-height: 1.2rem;
                    .arrow-down {
                        margin-top: 0.1rem;
                        margin-right: 0rem;
                        float: right;
                        @include wh(.6rem, .6rem);
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
                    padding: .2rem .2rem;
                    text-align: center;
                    line-height: 1rem;
                    padding-top: 0rem;
                }
            }
            li:nth-child(2) {
                width: 50%;
                text-align: center;
                border: solid 0.05rem $red;
                border-style: none solid none solid;
            }
        }
        .confirm-content {
            width: 100%;
            padding: .4rem .5rem;
            padding-bottom: 0rem;
            p {
                width: 100%;
                padding: .3rem .6rem;
                @include sc(.75rem, $fontColor);
                background-color: $grey2;
                text-align: center;
            }
            .active_buy {
                background-color: $red;
            }
            .active_sell {
                background-color: $green;
            }
        }
    }
}
</style>
