<template>
    <div class="restContainer">
        <head-top head-title="填写基本信息" goBack="true"></head-top>
        <form class="restForm">
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
                <input type="text" placeholder="身份证号码" name="idCardNo" maxlength="50" v-model="idCardNo">
            </section>
            <section class="input_container">
                <input type="text" placeholder="身份证地址" name="idCardAddress" maxlength="255" v-model="idCardAddress">
            </section>
            <section class="input_container">
                <input type="text" placeholder="电子邮箱" name="email" maxlength="100" v-model="email">
            </section>
            <section class="input_container">
                <input type="checkbox" name="isSameAddress" v-model="isSameAddress" v-bind:true-value="1" v-bind:false-value="0" />
                <label class="checkbox-label">永久居住地址是否与身份证地址相同</label>
            </section>
            <section class="input_container" v-show="isSameAddress == 0">
                <input type="text" placeholder="输入永久的居住地址" name="permanentAddress" maxlength="100" v-model="permanentAddress">
            </section>
            <section class="tip_container" v-show="isSameAddress == 0">
                <p class="tip-label">若永久居住地址与身份证地址不同，填写完所有资料后还必须将包含永久居住地址的驾照、户口页、信用卡账单、房产证明、银行结单、公共事业账单中任一个拍照后邮件发送到service@baomap.com 才能完成开户 格式要求</p>
            </section>
            <section class="input_container">
                <input type="checkbox" name="isAmerican" v-model="isAmerican" v-bind:true-value="1" v-bind:false-value="0" />
                <label class="checkbox-label">不是法定的美国居民或美国绿卡持有者</label>
            </section>
            <section class="tip_container" v-show="isAmerican == 0">
                <p class="tip-label">很抱歉，法定的美国居民或者美国绿卡持有者暂时不能在寻宝图开户，请您谅解！</p>
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
    registerStep1
} from '../../service/getData'

import {
    responseRealName,
    responseResult,
    responseEmail,
    responseNameSpell,
    responseIdCardNo,
    responseIdCardAddr,
    responseAddress,
    responseUserSpell,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_DATA
} from '../../config/response'

export default {
    data() {
            return {
                userName: null, //姓名
                userSpell: null, //姓拼音
                nameSpell: null, //名拼音
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                ibType: '-1', //开户方式
                agreeId: '-1', //是否同意开户协议
                email: '', //电子邮箱
                idCardNo: '', //身份证号码
                idCardAddress: '', //身份证地址
                isSameAddress: '1', //永久居住地址与身份证地址是否相同
                isAmerican: '1', //不是法定的美国居民或美国绿卡持有者
                permanentAddress: '', //永久居住地址
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

                if (responseRealName(this.userName)) {
                    this.showAlert = true;
                    this.alertText = responseRealName(this.userName);
                    return
                } else if (responseUserSpell(this.userSpell)) {
                    this.showAlert = true;
                    this.alertText = responseUserSpell(this.userSpell);
                    return
                } else if (responseNameSpell(this.nameSpell)) {
                    this.showAlert = true;
                    this.alertText = responseNameSpell(this.nameSpell);
                    return
                } else if (responseIdCardNo(this.idCardNo)) {
                    this.showAlert = true;
                    this.alertText = responseIdCardNo(this.idCardNo);
                    return
                } else if (responseIdCardAddr(this.idCardAddress)) {
                    this.showAlert = true;
                    this.alertText = responseIdCardAddr(this.idCardAddress);
                    return
                } else if (responseEmail(this.email)) {
                    this.showAlert = true;
                    this.alertText = responseEmail(this.email);
                    return
                } else if (this.isSameAddress == 0 && responseAddress(this.permanentAddress)) {
                    this.showAlert = true;
                    this.alertText = responseAddress(this.permanentAddress);
                    return
                } else if (this.isAmerican != 1) {
                    this.showAlert = true;
                    this.alertText = "法定的美国居民或者美国绿卡持有者暂时不能在寻宝图开户";
                    return;
                }



                this.showWaiting = true;
                // 发送请求
                let handler = this;
                registerStep1(this.email, this.userName, this.userSpell, this.nameSpell, this.idCardNo, this.idCardAddress, this.isSameAddress, this.permanentAddress, this.isAmerican, function(ret) {
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
    .tip_container {
        justify-content: space-between;
        padding: .6rem .8rem;
        border-bottom: 1px solid #666;
        .tip-label {
            width: 100%;
            @include sc(.55rem, $red);
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
