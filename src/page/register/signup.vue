<template>
    <div class="restContainer">
        <head-top head-title="注册" goBack="true"></head-top>
        <form class="restForm">
            <section class="input_container phone_number">
                <input type="number" placeholder="手机号" name="phone" maxlength="11" v-model="phoneNumber" @input="inputPhone">
                <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
                <button @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
            </section>
            <section class="input_container">
                <input type="number" placeholder="短信验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
            </section>
            <section class="input_container">
                <input type="password" placeholder="请输入密码" name="passWord" v-model="passWord">
            </section>
            <section class="input_container">
                <input type="password" placeholder="请确认密码" name="confirmPassWord" v-model="confirmPassWord">
            </section>
            <section class="input_container">
                <input type="text" placeholder="邀请码(可不填)" name="inviteCode" maxlength="6" v-model="inviteCode">
            </section>
        </form>
        <router-link to='/user/agreement' class="myorder">
            <p class="agreement">点击“确认”表示您同意 <span>用户协议</span></p>
        </router-link>
        <div class="login_container" @click="registerButton">确认</div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <transition name="waiting">
            <waiting v-show="showWaiting"></waiting>
        </transition>
    </div>
</template>
<script>
import headTop from '../../components/header/head'
import alertTip from '../../components/common/alertTip'
import waiting from '../../components/common/waiting'
import {
    Toast
} from 'mint-ui'
import {
    mobileCode,
    register,
} from '../../service/getData'

import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS,
    responsePassword,
    responseRePassword,
    responseCode
} from '../../config/response'

export default {
    data() {
            return {
                phoneNumber: null, //电话号码
                passWord: null, //密码
                rightPhoneNumber: false, //输入的手机号码是否符合要求
                confirmPassWord: null, //确认密码
                mobileCode: null, //短信验证码
                inviteCode: null, //邀请码
                computedTime: 0, //倒数记时
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                accountType: 'mobile', //注册方式
                showWaiting: false, //显示加载动画
            }
        },
        components: {
            headTop,
            alertTip,
            waiting,
        },
        methods: {
            //判断输入的电话号码
            inputPhone() {
                if (/^1\d{10}$/gi.test(this.phoneNumber)) {
                    this.rightPhoneNumber = true;
                } else {
                    this.rightPhoneNumber = false;
                }
            },
            //获取验证吗
            getVerifyCode() {
                if (this.rightPhoneNumber) {

                    //获取验证信息

                    this.showWaiting = true;
                    let handler = this;
                    mobileCode(this.phoneNumber, function(ret) {
                        handler.responseMobileCode(ret);
                    });
                } else {
                    this.showAlert = true;
                    this.alertText = '请输入正确的手机号';
                }
            },
            //注册
            registerButton() {
                if (!this.rightPhoneNumber) {
                    this.showAlert = true;
                    this.alertText = '请输入正确的手机号';
                    return
                } else if (responseCode(this.mobileCode) != '') {
                    this.showAlert = true;
                    this.alertText = responseCode(this.mobileCode);
                    return
                } else if (responsePassword(this.passWord) != '') {
                    this.showAlert = true;
                    this.alertText = responsePassword(this.passWord);
                    return
                } else if (responseRePassword(this.confirmPassWord) != '') {
                    this.showAlert = true;
                    this.alertText = responseRePassword(this.confirmPassWord);
                    return
                } else if (this.passWord != this.confirmPassWord) {
                    this.showAlert = true;
                    this.alertText = '两次输入的密码不一致';
                    return
                } else if (this.passWord.length) {

                }
                // 发送注册信息

                this.showWaiting = true;
                let handler = this;
                register(this.phoneNumber, this.passWord, this.confirmPassWord, this.mobileCode, this.inviteCode, function(ret) {
                    // console.log("success=" + data);
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
                    Toast({
                        message: '注册成功',
                        position: 'middle',
                        duration: 4000,
                        iconClass: 'mint-toast-icon mintui mintui-success'
                    });
                    return;
                }
            },

            responseMobileCode(ret) {
                this.hideWaiting();
                let response = responseResult(this, ret);
                if (response == RESPONSE_CODE_ERROR_DATA) {
                    this.showAlert = true;
                    this.alertText = ret.retMsg;
                    return
                } else if (response == RESPONSE_CODE_SUCCESS) {
                    this.computedTime = 60;
                    //倒计时
                    this.timer = setInterval(() => {
                        this.computedTime--;
                        if (this.computedTime == 0) {
                            clearInterval(this.timer)
                        }
                    }, 1000);
                    Toast({
                        message: '短信验证码已成功发送',
                        position: 'middle',
                        duration: 4000,
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
.restContainer {
    padding-top: 1.95rem;
}

.agreement {
    padding: .3rem .6rem;
    @include sc(.65rem, $fontColor);
    span {
        @include sc(.7rem, $blue);
    }
}

.restForm {
    background-color: transparent;
    margin-top: .6rem;
    .input_container {
        display: flex;
        justify-content: space-between;
        padding: .6rem .8rem;
        border-bottom: 1px solid #666;
        input {
            background-color: transparent;
            @include sc(.7rem, $fontColor);
        }
        button {
            @include sc(.65rem, #fff);
            font-family: Helvetica Neue, Tahoma, Arial;
            padding: .28rem .4rem;
            border: 1px;
            border-radius: 0.15rem;
            background-color: $grey3
        }
        .right_phone_number {
            background-color: $blue;
        }
    }
    .phone_number {
        padding: .3rem .8rem;
    }
    .captcha_code_container {
        height: 2.2rem;
        .img_change_img {
            display: flex;
            align-items: center;
            img {
                @include wh(3.5rem, 1.5rem);
                margin-right: .2rem;
            }
            .change_img {
                display: flex;
                flex-direction: 'column';
                flex-wrap: wrap;
                width: 2rem;
                justify-content: center;
                p {
                    @include sc(.55rem, #666);
                }
                p:nth-of-type(2) {
                    color: #3b95e9;
                    margin-top: .2rem;
                }
            }
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
