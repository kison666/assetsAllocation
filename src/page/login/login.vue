<template>
    <div class="loginContainer">
        <head-top head-title="登录" goBack="true"></head-top>
        </head-top>
        <form class="loginForm">
            <section class="input_container">
                <input type="number" placeholder="手机号/用户名" v-model="phoneNumber" maxlength="11" @input="inputPhone">
            </section>
            <section class="input_container">
                <input v-if="!showPassword" type="password" placeholder="密码" v-model="passWord">
                <input v-else type="text" placeholder="密码" v-model="passWord">
            </section>
        </form>
        <div class="login_container" :class='{action_no: showWaiting == true }' @click="mobileLogin">登录</div>
        <router-link to="/forget/code" class="to_forget">忘记密码？</router-link>
        <section class="signup_container">
            <router-link to="/signup" class="to_signup">马上注册</router-link>
        </section>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <waiting v-show="showWaiting"></waiting>
    </div>
</template>
<script>
import headTop from '../../components/header/head'
import alertTip from '../../components/common/alertTip'
import waiting from '../../components/common/waiting'
import {
    setToken,
    setReturnUrl,
    getReturnUrl
} from '../../store/store'
import {
    mapState,
    mapActions
} from 'vuex'
import {
    mobileCode,
    checkExsis,
    sendLogin,
    getcaptchas,
    accountLogin
} from '../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_DATA,
    responsePassword,
} from '../../config/response'
export default {
    data() {
            return {
                showPassword: false, // 是否显示密码
                phoneNumber: '', //电话号码
                userInfo: null, //获取到的用户信息
                passWord: '', //密码
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                showWaiting: false, //显示等待动画
                rightPhoneNumber: false, //判断手机号码的格式是否正确

            }
        },
        created() {},
        components: {
            headTop,
            alertTip,
            waiting,
        },
        computed: {},
        methods: {
            //判断输入的电话号码
            inputPhone() {
                if (/^1\d{10}$/gi.test(this.phoneNumber)) {
                    this.rightPhoneNumber = true;
                } else {
                    this.rightPhoneNumber = false;
                }
            },

            //是否显示密码
            changePassWordType() {
                this.showPassword = !this.showPassword;
            },

            mobileLogin() {
                if (!this.rightPhoneNumber) {
                    this.showAlert = true;
                    this.alertText = '请输入正确的手机号';
                    return
                } else if (responsePassword(this.passWord) != '') {
                    this.showAlert = true;
                    this.alertText = responsePassword(this.passWord);
                    return
                }
                this.requestLogin();

            },
            //发送登录信息
            requestLogin() {

                //用户名登录
                this.showWaiting = true;
                let handler = this;
                accountLogin(this.phoneNumber, this.passWord, function(ret) {
                    // console.log("success=" + data);
                    handler.response(ret);
                });
            },

            response(ret) {
                this.hideWaiting();
                let response = responseResult(this, ret, 2, 2);
                if (response == RESPONSE_CODE_ERROR_DATA) {
                    this.showAlert = true;
                    this.alertText = ret.retMsg;
                    return
                } else if (response == RESPONSE_CODE_SUCCESS) {
                    this.$router.replace({
                            path: getReturnUrl()
                        });
                    setToken(ret.retData.token);
                    this.$store.state.is_login = true;
                    //如果返回的returnUrl存在url，说明登录页面是从其他页面跳转过来的，登陆完之后跳转到当前页面
                    if (getReturnUrl() && getReturnUrl() != "-1") {
                        this.$router.replace({
                            path: getReturnUrl()
                        });
                        setReturnUrl("-1");
                        return;
                    }
                    // this.$router.push({
                    //     path: ret.retData.returnUrl
                    // });
                    if (ret.retData.returnUrl.indexOf('user') > 0) {
                        //开户跳转过来的url，跳转到智能资产页
                        this.$router.replace({
                            path: '/my/index'
                        });
                    } else {
                        // 其它地方跳转过来的url，返回到上一页
                        this.$router.go(-1);
                    }
                    return;
                }
            },

            async showVWaiting() {

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
@import '../../style/mixin';
.loginContainer {
    padding-top: 1.95rem;
    p,
    span,
    input {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.change_login {
    position: absolute;
    @include ct;
    right: 0.75rem;
    @include sc(.7rem, #fff);
}

.loginForm {
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

.login_tips {
    @include sc(.5rem, #999);
    padding: .4rem .6rem;
    line-height: .7rem;
    a {
        color: #3b95e9;
    }
}

.login_container {
    margin: 1.2rem .8rem;
    margin-bottom: .5rem;
    @include sc(.7rem, #fff);
    background-color: $blue;
    padding: .5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
}

.action_no {
    background-color: $grey;
}

.button_switch {
    background-color: #999;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include wh(2rem, .7rem);
    padding: 0 .2rem;
    border: 1px;
    border-radius: 0.5rem;
    position: relative;
    transition: all .3s;
    .circel_button {
        transition: all .3s;
        position: absolute;
        z-index: 1;
        @include wh(1.2rem, 1.2rem);
        left: -.1rem;
        box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0, 0, 0, .1);
        background-color: #666;
        border-radius: 50%;
    }
    .trans_to_right {
        transform: translateX(1.3rem);
    }
    span {
        @include sc(.45rem, #fff);
        transform: translateY(.05rem);
        line-height: .6rem;
    }
    span:nth-of-type(2) {
        transform: translateY(-.08rem);
    }
}

.change_to_text {
    background-color: $blue;
}

.to_forget {
    float: right;
    @include sc(.6rem, #3b95e9);
    margin-right: .3rem;
}

.signup_container {
    text-align: center;
    margin-top: 2rem;
}

.to_signup {
    margin: 1rem auto;
    @include sc(.7rem, $fontColor);
}
</style>
