<template>
    <div class="restContainer">
        <head-top head-title="投资协议" goBack="true"></head-top>
        <form class="restForm">
            <div class="child-container">
                <section class="select_container">
                    <router-link :to="{path: '/user/declare/law'}" tag="li" class="info-data-link">
                        <label>法律承认</label>
                        <p class="right-content">{{lawDeclare}}</p>
                        <p class="arrow-down">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </p>
                    </router-link>
                </section>
                <section class="select_container">
                    <router-link :to="{path: '/user/declare/cash'}" tag="li" class="info-data-link">
                        <label>保证金披露</label>
                        <p class="right-content">{{cashDeclare}}</p>
                        <p class="arrow-down">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </p>
                    </router-link>
                </section>
                <section class="select_container">
                    <router-link :to="{path: '/user/declare/customer'}" tag="li" class="info-data-link">
                        <label>客户协议</label>
                        <p class="right-content">{{customerDeclare}}</p>
                        <p class="arrow-down">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </p>
                    </router-link>
                </section>
                <section class="select_container">
                    <router-link :to="{path: '/user/declare/wben'}" tag="li" class="info-data-link">
                        <label>W-8BEN表格</label>
                        <p class="right-content">{{wbenDeclare}}</p>
                        <p class="arrow-down">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </p>
                    </router-link>
                </section>
                <section class="select_container">
                    <router-link :to="{path: '/user/declare/other'}" tag="li" class="info-data-link">
                        <label>其它交易品种协议和声明</label>
                        <p class="right-content">{{otherDeclare}}</p>
                        <p class="arrow-down">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </p>
                    </router-link>
                </section>
                <section class="select_container">
                    <router-link :to="{path: '/user/declare/notice'}" tag="li" class="info-data-link">
                        <label>通知和确认清算安排</label>
                        <p class="right-content">{{noticeDeclare}}</p>
                        <p class="arrow-down">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </p>
                    </router-link>
                </section>
            </div>
            <div class="child-container">
                <section class="tip_container">
                    <p class="tip-label">本人声明，本人提供的所有开户信息均真实准确并同意在内容有任何变化的情况下以电话或邮件的形式通知我们，必要时，本人授权全球智能资产配置对资料的准确性进行确认。</p>
                    <p class="tip-label name">姓名：{{userName}}</p>
                    <p class="tip-label">日期：{{declareDate}}</p>
                </section>
                <section class="input_container">
                    <input type="text" placeholder="请输入您的真实姓名" name="realName" v-model="realName">
                </section>
                <section class="tip_container">
                    <p class="tip-label">键入本人签名并通过网络发送之前，本人确认，阅读并已经了解申请过程中提供的所有信息；本人了解并同意此电子签名等同于手写签名；本人希望全球智能资产配置及其关联合作伙伴信赖此签名，同时授权全球智能资产配置在必要时可以使用次签名作为确认依据；本人自愿受其约束。</p>
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
    mapState,
    mapActions
} from 'vuex'
import {
    registerStep4,
    profileInfo
} from '../../service/getData'

import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../config/response'

export default {
    data() {
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                date: '', //日期
                realName: '', //客户的签名
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                showWaiting: false, //显示加载动画

            }
        },
        components: {
            headTop,
            alertTip,
            waiting
        },
        created() {
            this.initData();
        },
        computed: mapState({
            lawDeclare: state => state.declare_law,
            cashDeclare: state => state.declare_cash,
            customerDeclare: state => state.declare_customer,
            wbenDeclare: state => state.declare_wben,
            noticeDeclare: state => state.declare_notice,
            otherDeclare: state => state.declare_other,
            userName: state => state.user_name,
            declareDate: state => state.declare_date,
        }),
        methods: {

            //初始化数据
            initData() {
                this.setDeclareDate();
                if (this.userName == "") {
                    let handler = this;
                    profileInfo(function(ret) {
                        handler.responseProfile(ret);
                    });
                }
            },
            responseProfile(ret) {
                let response = responseResult(this, ret);
                if (response == RESPONSE_CODE_ERROR_DATA) {
                    this.showAlert = true;
                    this.alertText = ret.retMsg;
                    return
                } else if (response == RESPONSE_CODE_SUCCESS) {
                    ret.retData.userName;
                    this.setUserName(ret.retData.userName);
                    return;
                }
            },

            //保存用户名
            setUserName(username) {
                this.$store.state.user_name = username;
            },


            //保存签名时间
            setDeclareDate() {
                let currentDate = new Date();
                let decDate = currentDate.getFullYear() + "-" + (currentDate.getMonth() +1)+ "-" + currentDate.getDate();
                this.$store.state.declare_date = decDate;
                console.log(decDate);
                this.declareDate = decDate;
            },

            //下一步
            async nextButton() {

                if (this.lawDeclare != '我同意') {
                    this.showAlert = true;
                    this.alertText = "请阅读并同意法律承认";
                    return
                } else if (this.cashDeclare != '我同意') {
                    this.showAlert = true;
                    this.alertText = "请阅读并同意保证金披露";
                    return
                } else if (this.customerDeclare != '我同意') {
                    this.showAlert = true;
                    this.alertText = "请阅读并同意客户协议";
                    return
                } else if (this.wbenDeclare != '我同意') {
                    this.showAlert = true;
                    this.alertText = "请阅读并同意W-8BEN表格";
                    return
                } else if (this.otherDeclare != '我同意') {
                    this.showAlert = true;
                    this.alertText = "请阅读并同意其它交易品种协议和声明";
                    return
                } else if (this.noticeDeclare != '我同意') {
                    this.showAlert = true;
                    this.alertText = "请阅读并同意通知和确认清算安排";
                    return
                } else if (this.realName != this.userName || this.realName == '') {
                    this.showAlert = true;
                    this.alertText = "请输入您的真实姓名";
                    return
                }


                this.showWaiting = true;
                // 发送下一步请求
                let handler = this;
                registerStep4(this.realName,function(ret) {
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
                    // this.$router.go(1);
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
            @include sc(.55rem, $fontColor);
        }
        .name {
            margin-top: 0.2rem;
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
