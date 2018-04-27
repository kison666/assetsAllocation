<template>
    <div class="restContainer">
        <head-top head-title="资产信息" goBack="true"></head-top>
        <form class="restForm">
            <div class="child-container">
                <section class="select_container">
                    <label>净资产</label>
                    <select dir="rtl" name="netAssets" v-model="netAssets">
                        <option value="-1">请选择</option>
                        <option value="0">2万-5万美元</option>
                        <option value="1">5万-7.5万美元</option>
                        <option value="2">7.5万-10万美元</option>
                        <option value="3">10万-25万美元</option>
                        <option value="4">25万-50万美元</option>
                        <option value="5">50万-100万美元</option>
                        <option value="6">100万-500万美元</option>
                        <option value="7">500万以上</option>
                    </select>
                    <p class="arrow-down">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </p>
                </section>
                <section class="select_container">
                    <label>净流动资产</label>
                    <select dir="rtl" name="netCurrentAssets" v-model="netCurrentAssets">
                        <option value="-1">请选择</option>
                        <option value="0">2万-5万美元</option>
                        <option value="1">5万-7.5万美元</option>
                        <option value="2">7.5万-10万美元</option>
                        <option value="3">10万-25万美元</option>
                        <option value="4">25万-50万美元</option>
                        <option value="5">50万-100万美元</option>
                        <option value="6">100万-500万美元</option>
                        <option value="7">500万以上</option>
                    </select>
                    <p class="arrow-down">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </p>
                </section>
                <section class="select_container">
                    <label>净年收入</label>
                    <select dir="rtl" name="netAnnualIncome" v-model="netAnnualIncome">
                        <option value="-1">请选择</option>
                        <option value="0">4万-4.5万美元</option>
                        <option value="1">4.5万-5万美元</option>
                        <option value="2">5万-10万美元</option>
                        <option value="3">10万-15万美元</option>
                        <option value="4">15万-25万美元</option>
                        <option value="5">25万-50万美元</option>
                        <option value="6">50万-100万美元</option>
                        <option value="7">100万以上</option>
                    </select>
                    <p class="arrow-down">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </p>
                </section>
                <section class="select_container">
                    <label>总资产</label>
                    <select dir="rtl" name="totalAssets" v-model="totalAssets">
                        <option value="-1">请选择</option>
                        <option value="0">2万-5万美元</option>
                        <option value="1">5万-7.5万美元</option>
                        <option value="2">7.5万-10万美元</option>
                        <option value="3">10万-50万美元</option>
                        <option value="4">50万-100万美元</option>
                        <option value="5">100万-500万美元</option>
                        <option value="6">500万-1000万美元</option>
                        <option value="7">1000万以上</option>
                    </select>
                    <p class="arrow-down">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </p>
                </section>
            </div>
            <div class="child-container">
                <section class="select_container">
                    <label>投资目标</label>
                    <select dir="rtl" name="investAim" v-model="investAim">
                        <option value="-1">请选择</option>
                        <option value="0">资本增长</option>
                        <option value="1">交易利润</option>
                        <option value="2">投机</option>
                        <option value="3">对冲</option>
                    </select>
                    <p class="arrow-down">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </p>
                </section>
                <section class="select_container">
                    <label>股票交易年数</label>
                    <select dir="rtl" name="tradeYears" v-model="tradeYears">
                        <option value="-1">请选择</option>
                        <option value="0">1</option>
                        <option value="1">2</option>
                        <option value="2">3</option>
                        <option value="3">4</option>
                        <option value="4">5</option>
                        <option value="5">6-10</option>
                        <option value="6">大于10</option>
                    </select>
                    <p class="arrow-down">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </p>
                </section>
                <section class="select_container">
                    <label>股票交易次数</label>
                    <select dir="rtl" name="tradeTimes" v-model="tradeTimes">
                        <option value="-1">请选择</option>
                        <option value="0">大于100次</option>
                        <option value="1">小于100次</option>
                    </select>
                    <p class="arrow-down">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </p>
                </section>
                <section class="tip_container" v-show="tradeTimes == 1">
                    <p class="tip-label">* 总交易次数100次以上才能开通股票交易权限</p>
                </section>
                <section class="select_container">
                    <label>股票知识水平</label>
                    <select dir="rtl" name="knowledgeLevel" v-model="knowledgeLevel">
                        <option value="-1">请选择</option>
                        <option value="0">丰富</option>
                        <option value="1">良好</option>
                    </select>
                    <p class="arrow-down">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </p>
                </section>
            </div>
            <div class="child-container">
                <section class="select_container">
                    <label>开通期权交易权限</label>
                    <select dir="rtl" name="isOpenOptionTrade" v-model="isOpenOptionTrade">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                    <p class="arrow-down">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </p>
                </section>
                <section class="select_container" v-show="isOpenOptionTrade == 1">
                    <label>期权交易年数</label>
                    <select dir="rtl" name="optionTradeYears" v-model="optionTradeYears">
                        <option value="-1">请选择</option>
                        <option value="0">1年</option>
                        <option value="1">2年</option>
                        <option value="2">3年</option>
                        <option value="3">4年</option>
                        <option value="4">5年</option>
                        <option value="5">6-10年</option>
                        <option value="6">10年以上</option>
                    </select>
                    <p class="arrow-down">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </p>
                </section>
                <section class="select_container">
                    <label>开通债券、期货等交易品种权限</label>
                    <select dir="rtl" name="isOpenOtherTrade" v-model="isOpenOtherTrade">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                    <p class="arrow-down">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </p>
                </section>
                <section class="select_container">
                    <label>是否有美股交易经验</label>
                    <select dir="rtl" name="hasTwsTradeExperience" v-model="hasTwsTradeExperience">
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                    <p class="arrow-down">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </p>
                </section>
            </div>
        </form>
        <div class="login_container" @click="nextButton">下一步</div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <waiting v-show="showWaiting"></waiting>
    </div>
</template>
<script>
import headTop from '../../components/header/head'
import alertTip from '../../components/common/alertTip'
import waiting from '../../components/common/waiting'
import {
    registerStep3
} from '../../service/getData'

import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../config/response'

export default {
    data() {
            return {
                netAssets: -1, //净资产
                netCurrentAssets: -1, //净流动资产
                netAnnualIncome: -1, //净年收入
                totalAssets: -1, //总资产
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                investAim: '-1', //投资目标
                tradeYears: '-1', //股票交易年数
                tradeTimes: '-1', //股票交易次数
                knowledgeLevel: '-1', //股票知识水平
                isOpenOptionTrade: '1', //是否开通期权交易
                optionTradeYears: '-1', //期权交易年数
                isOpenOtherTrade: '1', //开通债券、期货、个股期货等交易品种权限
                hasTwsTradeExperience: '1', //是否有美股交易经验
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                showWaiting: false, //显示加载动画
            }
        },
        components: {
            headTop,
            alertTip,
            waiting,
        },
        methods: {

            //下一步
            async nextButton() {

                if (this.netAssets < 0) {
                    this.showAlert = true;
                    this.alertText = "请选择净资产";
                    return
                } else if (this.netCurrentAssets < 0) {
                    this.showAlert = true;
                    this.alertText = "请选择净流动资产";
                    return
                } else if (this.netAnnualIncome < 0) {
                    this.showAlert = true;
                    this.alertText = "请选择净年收入";
                    return
                } else if (this.totalAssets < 0) {
                    this.showAlert = true;
                    this.alertText = "请选择总资产";
                    return
                } else if (this.investAim < 0) {
                    this.showAlert = true;
                    this.alertText = "请选择投资目标";
                    return
                } else if (this.tradeYears < 0) {
                    this.showAlert = true;
                    this.alertText = "请选择股票交易年数";
                    return
                } else if (this.tradeTimes < 0) {
                    this.showAlert = true;
                    this.alertText = "请选择股票交易次数";
                    return
                } else if (this.tradeTimes == 1) {
                    this.showAlert = true;
                    this.alertText = "总交易次数100次以上才能开通股票交易权限";
                    return
                } else if (this.knowledgeLevel < 0) {
                    this.showAlert = true;
                    this.alertText = "请选择股票知识水平";
                    return
                } else if (this.optionTradeYears < 0 && this.isOpenOptionTrade == 1) {
                    this.showAlert = true;
                    this.alertText = "请选择期权交易年数";
                    return
                }

                this.showWaiting = true;
                // 发送下一步请求

                let handler = this;
                registerStep3(this.netAssets, this.netCurrentAssets, this.netAnnualIncome, this.totalAssets, this.investAim, this.tradeYears, this.tradeTimes, this.knowledgeLevel, this.isOpenOptionTrade, this.optionTradeYears, this.isOpenOtherTrade, this.hasTwsTradeExperience, function(ret) {
                    handler.response(ret);
                });
            },
            response(ret) {
                this.hideWaiting();
                let response = responseResult(this, ret);
                if (response == RESPONSE_CODE_ERROR_DATA) {
                    this.showAlert = true;
                    this.alertText = ret.retMsg;
                    return
                } else if (response == RESPONSE_CODE_SUCCESS) {
                    this.$router.replace({
                        path: ret.retData.returnUrl
                    });
                    return;
                }
            },
            closeTip() {
                this.showAlert = false;
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
        }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.restContainer {}

.restForm {
    background-color: transparent;
    margin-top: .6rem;
    .child-container {
        background-color: $grey;
        width: 100%;
        margin-top: 0.3rem;
    }
    .title_container {
        padding-left: 0.75rem;
        padding-bottom: 0.2rem;
        border-bottom: 1px solid #666;
        span {
            @include sc(.65rem, $fontGreyColor2);
        }
    }
    .input_container {
        display: flex;
        justify-content: space-between;
        padding: .6rem .8rem;
        border-bottom: 1px solid #666;
        input {
            width: 100%;
            background-color: transparent;
            @include sc(.7rem, $fontColor);
        }
        button {
            @include sc(.65rem, #fff);
            font-family: Helvetica Neue, Tahoma, Arial;
            padding: .28rem .4rem;
            border: 1px;
            border-radius: 0.15rem;
            background-color: $blue
        }
        .right_phone_number {
            background-color: #4cd964;
        }
        .checkbox-label {
            width: 100%;
            float: left;
            @include sc(.65rem, $fontColor);
            padding-left: .5rem;
            margin-top: -.15rem;
        }
    }
    .select_container {
        justify-content: space-between;
        padding: .3rem .8rem;
        border-bottom: 1px solid #666;
        position: relative;
        select {
            float: right;
            min-width: 3rem;
            margin-right: 0.4rem;
            @include sc(.55rem, $fontColor);
            background-color: transparent;
            margin-top: 0.25rem;
            margin-right: 0.6rem;
            height: 0.8rem;
            option {
                @include sc(.55rem, $fontColor);
            }
        }
        label {
            @include sc(.65rem, $fontColor);
        }
        .right-content {
            float: right;
            margin-right: 0.8rem;
            margin-top: 0.25rem;
            @include sc(.55rem, $fontColor);
        }
        .arrow-down {
            position: absolute;
            right: 0.4rem;
            top: 0.4rem;
            margin-right: 0.3rem;
            @include wh(.6rem, .6rem);
            svg {
                @include wh(100%, 100%);
            }
        }
    }
    .radio_container {
        justify-content: space-between;
        padding: .6rem .8rem;
        border-bottom: 1px solid #666;
        .agree-content {
            width: 100%;
            p {
                @include sc(.55rem, $fontColor);
            }
        }
        .agree-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            margin-top: 1rem;
        }
        .agree-li {
            float: left;
            width: 50%;
            text-align: center;
            .radio-label {
                width: 100%;
                @include sc(.65rem, $fontColor);
            }
        }
    }
    .tip_container {
        justify-content: space-between;
        padding: .6rem .8rem;
        border-bottom: 1px solid #666;
        .tip-label {
            width: 100%;
            @include sc(.55rem, $red);
        }
    }
}

.login_container {
    margin: 1rem .5rem;
    @include sc(.7rem, #fff);
    background-color: $blue;
    padding: .5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
}
</style>
