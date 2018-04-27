<template>
    <div class="restContainer redeem-container">
        <head-top head-title="填写基本信息" goBack="true" style="display:none"></head-top>
        <form class="restForm">
            <section class="select_container">
                <label>提取币种</label>
                <select dir="rtl" name="currency" v-model="currency">
                    <option value="1">美元</option>
                    <option value="0">人民币</option>
                </select>
            </section>
            <section class="select_container">
                <label>收款银行</label>
                <select dir="rtl" name="bankType" v-model="bankType">
                    <option value="0">境内银行</option>
                    <option value="1">境外银行</option>
                </select>
            </section>
            <section class="input_container">
                <label>收款银行名称</label>
                <input type="text" placeholder="收款银行名称" name="bankName" maxlength="50" v-model="bankName">
            </section>
            <section class="input_container">
                <label>收款账户名</label>
                <input type="text" placeholder="收款账户名" name="accountName" maxlength="20" v-model="accountName">
            </section>
            <section class="input_container">
                <label>SWIFT CODE</label>
                <input type="text" placeholder="请向您的收款银行客服咨询" name="swiftCode" maxlength="20" v-model="swiftCode">
            </section>
            <section class="input_container">
                <label>提取金额</label>
                <input type="text" placeholder="提取金额" name="amount" maxlength="10" v-model="amount">
            </section>
            <section class="input_container">
                <label>备注</label>
                <input type="text" placeholder="备注" name="remarks" maxlength="100" v-model="remarks">
            </section>
        </form>
        <div class="login_container" @click="nextButton" v-if="flag==true">确 定</div>
        <div class="login_container grey" v-else>确 定</div>
        <p class="tip" v-show="flag==false">您有提现订单在审核中，完成之后才能申请新的提现</p> 
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <waiting v-show="showWaiting"></waiting>
    </div>
</template>
<script>
import headTop from '../../../../components/header/head'
import alertTip from '../../../../components/common/alertTip'
import waiting from '../../../../components/common/waiting'
import {
    tradeRedeem,
    tradeCanRedeem
} from '../../../../service/getData'
import {
    Toast,
    Indicator
} from 'mint-ui'
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
} from '../../../../config/response'

export default {
    data() {
            return {
                currency: 1, //币种
                bankType: 0, //银行类型
                bankName: '', //银行名称
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                accountName: '', //收款账户名
                amount: '', //提取金额
                remarks: '', //备注
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                showWaiting: false, //显示加载动画
                accountId:'',//交易账号
                swiftCode:'',//swiftCode
                flag:false,//是否能够赎回 
            }
        },
        components: {
            headTop,
            alertTip,
            waiting,
        },
        created() {
        this.initData();
        },
        methods: {
            //初始化获取数据
            initData() {
               this.accountId = this.$route.query.ai;
               this.getCanRedeemData();
            },

            //下一步
            nextButton() {
                if (!this.accountId || this.accountId =='') {
                    Toast({
                        message: '交易账号不能为空',
                        position: 'middle',
                        duration: 3000
                    });
                    return
                }

                if (!this.bankName || this.bankName =='') {
                    Toast({
                        message: '收款银行名称不能为空',
                        position: 'middle',
                        duration: 3000
                    });
                    return
                }

                if (!this.accountName || this.accountName =='') {
                    Toast({
                        message: '收款账户名不能为空',
                        position: 'middle',
                        duration: 3000
                    });
                    return
                }
                if (!this.swiftCode || this.swiftCode =='') {
                    Toast({
                        message: 'SWIFT CODE不能为空',
                        position: 'middle',
                        duration: 3000
                    });
                    return
                }

                if (!this.amount || this.amount<= 0) {
                    Toast({
                        message: '提取金额必须大于0',
                        position: 'middle',
                        duration: 3000
                    });
                    return
                }


                this.showWaiting = true;
                // 发送请求
                let handler = this;
                tradeRedeem(this.amount, this.currency, this.remarks, this.bankType, this.bankName,this.swiftCode, this.accountId, this.accountName, function(ret) {
                    handler.response(ret);
                });
            },
            response(ret) {
                this.hideWaiting();
                let response = responseResult(this, ret, 3, 3);
                if (response == RESPONSE_CODE_ERROR_DATA) {
                    this.showAlert = true;
                    this.alertText = ret.retMsg;
                    return
                } else if (response == RESPONSE_CODE_SUCCESS) {
                    // Toast({
                    //     message: '赎回请求提交成功',
                    //     position: 'middle',
                    //     duration: 4000,
                    //     iconClass: 'mint-toast-icon mintui mintui-success'
                    // });
                    // this.$router.go(-1);
                    this.$router.replace({
                        path: '/trade/result',query:{'result':'提现'}
                    });
                    return;
                }
            },

            //获取是否能够赎回
            getCanRedeemData() {
                let handler = this;
                tradeCanRedeem(function(ret) {
                    handler.responseCanRedeem(ret);
                });
            },

            responseCanRedeem(ret) {
                //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                Indicator.close();
                let response = responseResult(this, ret,1,1);
                if (response == RESPONSE_CODE_ERROR_DATA) {
                    this.showAlert = true;
                    this.alertText = ret.retMsg;
                    return
                } else if (response == RESPONSE_CODE_SUCCESS) {
                     this.flag = ret.retData.flag;
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
    padding-top: 0rem;
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

.redeem-container {
    .input_container {
        display: flex;
        justify-content: space-between;
        padding: .6rem .8rem;
        border-bottom: 1px solid #666;
        input {
            background-color: transparent;
            @include sc(.65rem, $fontColor);
            flex: 2;
            text-align: right;
        }
        label {
            flex: 1;
            @include sc(.65rem, $fontGreyColor);
        }
        textarea {
            width: 100%;
            height: 3rem;
            padding: 0.2rem;
            margin-top:-0.5rem;
            background-color: #e0e0e0;
            @include sc(.7rem, $fontBlackColor);
        }
    }
    .upload-container {
        @include wh(100%, 6rem);
        position: relative;
        .oppsite-upload,
        .prove-upload {
            display: block;
            position: absolute;
            opacity: 0;
            left: 0;
            @include wh(100%, 5rem);
        }
        .file-img {
            width: 90%;
            height: 6rem;
            text-align: center;
            margin: auto;
            margin-top: 0.5rem;
            border: solid 0.05rem $fontGreyColor2;
            img {
                max-height: 6rem;
            }
            .icon {
                @include wh(2.2rem, 2.2rem);
                margin: auto;
                margin-bottom: 0.2rem;
                margin-top: 1rem;
                svg {
                    @include wh(100%, 100%);
                }
            }
            .title {
                @include sc(.65rem, $fontGreyColor);
                text-align: center;
            }
        }
    }
    .select_container {
        justify-content: space-between;
        padding: .3rem .8rem;
        border-bottom: 1px solid #666;
        position: relative;
        select {
            float: right;
            width: 60%;
            margin-right: 0.4rem;
            @include sc(.65rem, $fontColor);
            background-color: transparent;
            margin-top: 0.25rem;
            margin-right: 0rem;
            height: 0.8rem;
            option {
                @include sc(.55rem, $fontColor);
            }
        }
        label {
            width: 40%;
            @include sc(.65rem, $fontColor);
        }
        .right-content {
            float: right;
            margin-right: 0.4rem;
            margin-top: 0.25rem;
            @include sc(.65rem, $fontColor);
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
