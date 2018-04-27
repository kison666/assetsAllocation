<template>
    <div class="restContainer">
        <head-top head-title="选择开户类型" goBack="true"></head-top>
        <form class="restForm">
            <section class="input_container" @click="changeRadio(1)">
                <input type="radio" name="ibType" v-model="ibType" value="1" @click="changeRadio(1)" />
                <label class="radio-label">我委托全球智能资产配置开户</label>
                <p class="arrow-down" v-show="ibType == '0' || ibType == '-1'">
                    <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-down"></use>
                    </svg>
                </p>
                <p class="arrow-down" v-show="ibType == '1'">
                    <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-up"></use>
                    </svg>
                </p>
            </section>
            <section class="radio_container" v-show="ibType == '1'">
                <div class="agree-content">
                    <p class="title"></p>
                    <p>投资人委托我们在盈透证券为其开户, 我们作为“被授权人”代理投资人向盈透证券申请、注册、管理客户的账户，被授权人在此表示认可和接受。</p>
                    <p>具体声明如下:</p>
                    <p>1. 投资人对被授权人的上述代理行为表示接受并承担责任。</p>
                    <p>2. 投资人授权我们代表其本人在盈透证券注册账户，并为账户操作之目的以投资人名义签署各项协议。 </p>
                    <p>点击下方“我同意”表示您接受以上条款声明</p>
                </div>
                <ul class="agree-ul">
                    <li class="agree-li">
                        <input type="radio" name="agreeId" v-model="agreeId" value="1" />
                        <label class="radio-label">我同意</label>
                    </li>
                    <li class="agree-li">
                        <input type="radio" name="agreeId" v-model="agreeId" value="0" />
                        <label class="radio-label">我不同意</label>
                    </li>
                </ul>
            </section>
            <section class="input_container" @click="changeRadio(0)">
                <input type="radio" name="ibType" v-model="ibType" value="0" @click="changeRadio(0)" />
                <label class="radio-label">我自己开户</label>
                <p class="arrow-down" v-show="ibType == '1' || ibType == '-1'">
                    <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-down"></use>
                    </svg>
                </p>
                <p class="arrow-down" v-show="ibType == '0'">
                    <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-up"></use>
                    </svg>
                </p>
            </section>
            <section class="self_container" v-show="ibType == '0'">
                <section class="input_container">
                    <input type="text" placeholder="真实姓名(例如：张三)" name="userName" maxlength="20" v-model="userName">
                </section>
                <section class="input_container">
                    <input type="text" placeholder="姓的拼音(例如：zhang)" name="userSpell" maxlength="10" v-model="userSpell">
                </section>
                <section class="input_container">
                    <input type="text" placeholder="名的拼音(例如：san)" name="nameSpell" maxlength="10" v-model="nameSpell">
                </section>
                <section class="input_container">
                    <input type="text" placeholder="电子邮箱" name="email" maxlength="100" v-model="email">
                </section>
            </section>
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
    registerStep0,
} from '../../service/getData'
import {
    responseRealName,
    responseResult,
    responseEmail,
    responseNameSpell,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../config/response'

export default {
    data() {
            return {
                userName: null, //姓名
                userSpell: null, //姓拼音
                nameSpell: null, //名拼音
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                ibType: '1', //开户方式
                agreeId: '1', //是否同意开户协议
                email: null, //电子邮箱
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
            //改变开户方式，显示不用的内容
            changeRadio(type) {
                this.ibType = type;
            },

            //下一步
            async nextButton() {
                if (this.ibType < 0) {
                    this.showAlert = true;
                    this.alertText = "请选择开户方式";
                    return
                } else if (this.ibType == 1 && this.agreeId == 0) {
                    this.showAlert = true;
                    this.alertText = "请同意开户协议";
                    return
                } else if (this.ibType == 0) {
                    if (responseRealName(this.userName)) {
                        this.showAlert = true;
                        this.alertText = responseRealName(this.userName);
                        return
                    } else if (responseNameSpell(this.userSpell)) {
                        this.showAlert = true;
                        this.alertText = responseNameSpell(this.userSpell);
                        return
                    } else if (responseNameSpell(this.nameSpell)) {
                        this.showAlert = true;
                        this.alertText = responseNameSpell(this.nameSpell);
                        return
                    } else if (responseEmail(this.email)) {
                        this.showAlert = true;
                        this.alertText = responseEmail(this.email);
                        return
                    }
                }

                this.showWaiting = true;
                // 发送请求
                let handler = this;
                registerStep0(this.email, this.ibType, this.userName, this.userSpell, this.nameSpell, function(ret) {
                    handler.response(ret);
                });

            },

            response(ret) {
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
.restContainer {
    padding-top: 1.95rem;
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
        .radio-label {
            width: 100%;
            float: left;
            @include sc(.65rem, $fontColor);
            padding-left: .5rem;
            margin-top: -.15rem;
        }
        .arrow-down {
            margin-top: -0.2rem;
            margin-right: 0.3rem;
            float: right;
            @include wh(.8rem, .8rem);
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
    .self_container {
        justify-content: space-between;
        border-bottom: 0px solid #666;
    }
}

.login_container {
    margin: 1rem .5rem;
    margin-top: 2rem;
    @include sc(.7rem, #fff);
    background-color: $blue;
    padding: .5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
}
</style>
