<template>
    <div class="restContainer" v-show="detailData !=''">
        <!--         <head-top head-title="开户" goBack="true"></head-top> -->
    
        <section class="charge-container">
            <section class="input_container">
                <label>存入币种</label>
                <input type="text" placeholder="" name="currency" readonly="true" v-model="currency">
            </section>
            <section class="input_container">
                <label>存入金额</label>
                <input type="number" placeholder="例如：3000" name="amt" v-model="amt">
            </section>
            <section class="upload-container">
                <input type="file" capture="video" class="prove-upload" @change="uploadImg()" id="prove-upload">
                <div class="file-img" v-show="show_pic">
                    <p class="icon">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#proof"></use>
                        </svg>
                    </p>
                    <p class="title">上传汇款凭证</p>
                </div>
                <div class="file-img" v-show="!show_pic">
                    <img v-bind:src="file_img_url" width="100%" height="100%">
                </div>
            </section>
            <label class="remark-label">备注</label>
            <section class="input_container">
                   <textarea placeholder="请输入备注" name="des" v-model="des"></textarea>
            </section>
            <div class="login_container" @click="noticeRemit()" v-if="flag==true">通知查看汇款</div>
            <div class="login_container grey" v-else>通知查看汇款</div>
            <div class="add-fund-tip"><a href="https://etf.baomap.com/help/addfund">如何入金</a></div>
            <p class="tip" v-show="flag==false">您有增资订单在审核中，完成之后才能申请新的增资</p> 
        </section>
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
    tradeCanAdd
} from '../../../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_SYSTEM,
    RESPONSE_CODE_ERROR_TOKEN
} from '../../../../config/response'
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    data() {
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                currency: '美元', //币种
                amt: '', //金额
                file_img_url: 'https://ohfz8un5b.qnssl.com/web/ib/account/account_upload_add_fund.png', //上传图片封面
                show_pic: true, //是否展示封面图
                detailData:'',//所有的数据
                des:'',//入金描述
                accountId:'',//交易账号
                flag:false,//是否能够增资
            }
        },
        components: {
            headTop,
            alertTip,
        },
        created() {
            this.initData();
        },
        computed: mapState({
            pathUrl: state => state.step_url,
        }),
        methods: {

            //初始化数据
            initData() {
                this.show_pic = true;
                this.accountId = this.$route.query.ai;
                this.getCanAddData();
            },

            //入金请求
            requestAddFund() {

                if(this.accountId == '' || this.accountId ==0){
                    Toast({
                        message: '交易账号不能为空',
                        position: 'middle',
                        duration: 3000
                    });
                    return
                 }


                if (!this.amt || this.amt<=0) {
                    Toast({
                        message: '存入金额应该大于0美金',
                        position: 'middle',
                        duration: 3000
                    });
                    // this.alertText = '存入金额应该大于3000美金';
                    return
                }

                let inputProve = document.getElementById("prove-upload");
                if (!inputProve.files[0]) {
                    // this.showAlert = true;
                    Toast({
                        message: '请添加打款凭证',
                        position: 'middle',
                        duration: 3000
                    });
                    // this.alertText = "请添加打款凭证";
                    return;
                }

                // if (!this.des) {
                // // this.showAlert = true;
                //     Toast({
                //         message: '请输入备注',
                //         position: 'middle',
                //         duration: 3000
                //     });
                // // this.alertText = '请输入备注';
                // return
                // }
                Indicator.open();
                let handler = this;
                tradeAddFund(this.amt,this.currency,this.des,this.accountId,inputProve.files[0],function(ret) {
                    handler.responseAddFund(ret);
                });
            },

            responseAddFund(ret) {
                //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                Indicator.close();
                let response = responseResult(this, ret);
                if (response == RESPONSE_CODE_ERROR_DATA) {
                    this.showAlert = true;
                    this.alertText = ret.retMsg;
                    return
                } else if (response == RESPONSE_CODE_SUCCESS) {
                    // Toast({
                    // message: '提交成功',
                    // position: 'middle',
                    // duration: 4000,
                    // iconClass: 'mint-toast-icon mintui mintui-success'
                    // });
                    this.$router.replace({
                        path: '/trade/result',query:{'result':'增资'}
                    });
                    return;
                }
            },

            uploadImg() {
                this.file_img_url = window.URL.createObjectURL(document.getElementById("prove-upload").files[0]);
                this.show_pic = false;

            },

            noticeRemit() {
                this.requestAddFund();
            },

            nextButton() {
                this.$router.replace({
                    path: '/'
                });
                return;
            },

            //获取是否能够增资
            getCanAddData() {
                let handler = this;
                tradeCanAdd(function(ret) {
                    handler.responseCanAdd(ret);
                });
            },

            responseCanAdd(ret) {
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
            }
        }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.show-container {
    width: 100%;
    margin: .5rem 0rem 0rem;
    .progress-ul {
        list-style: none;
        margin: 0 auto;
        overflow: hidden;
        width: 100%;
        padding: 0.4rem 0.2rem;
    }
    .progress-li {
        float: left;
        width: 25%;
        text-align: center;
        .tip {
            @include sc(.55rem, $fontGreyColor2);
            text-align: center;
        }
        .progress-item {
            background-color: $grey2;
            height: .3rem;
            border-right: solid #000 0.08rem;
        }
        .active {
            background-color: $blue;
        }
        .pre_active {
            background-color: rgba(70, 148, 209, 0.5);
        }
    }
    .character-ul {
        list-style: none;
        margin: 0 auto;
        overflow: hidden;
        width: 100%;
        padding: 0.4rem 0.2rem;
    }
    .character-li {
        float: left;
        width: 25%;
        padding: .02rem;
        .icon {
            @include wh(2rem, 2rem);
            margin: auto;
            svg {
                @include wh(100%, 100%);
            }
        }
    }
    .character-li:last-child {
        width: 75%;
        p {
            @include sc(.55rem, $fontGreyColor2);
        }
        .title {
            @include sc(.75rem, $blue);
            margin-bottom: .3rem;
        }
    }
}

.charge-container {
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
