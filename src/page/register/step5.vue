<template>
    <div class="restContainer">
        <head-top head-title="上传身份证明" goBack="true"></head-top>
        <form class="restForm">
            <p class="title">请开户人上传有效二代身份证和本人签名</p>
            <section class="upload-container">
                <input type="file" capture="video" class="front-upload" @change="uploadImg(0)" id="front-upload">
                <div class="file-img">
                    <img v-bind:src="file_img_front" width="90%">
                </div>
            </section>
            <section class="upload-container">
                <input type="file" capture="video" class="oppsite-upload" @change="uploadImg(1)" id="opppsite-upload">
                <div class="file-img">
                    <img v-bind:src="file_img_opppsite" width="90%">
                </div>
            </section>
            <section class="tip_container">
                <p class="tip-label">*身份证必须为原件，不能为复印件，请把身份证和签名排在同一张照片内上传，照片要为小于5MB的JPG或PNG格式</p>
            </section>
        </form>
        <div class="login_container" @click="nextButton">下一步</div>
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
    mapState,
    mapActions
} from 'vuex'
import {
    registerStep5
} from '../../service/getData'

import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../config/response'
import {
    getToken
} from '../../store/store'

export default {
    data() {
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                file_img_opppsite: 'https://ohfz8un5b.qnssl.com/web/ib/account/account_upload_idcard_back.png', //反面图片
                file_img_front: 'https://ohfz8un5b.qnssl.com/web/ib/account/account_upload_idcard_front.png', //反面图片
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
        methods: {

            //初始化数据
            initData() {

            },

            uploadImg(type) {
                if (type == 0) {
                    this.file_img_front = window.URL.createObjectURL(document.getElementById("front-upload").files[0]);
                } else if (type == 1) {
                    this.file_img_opppsite = window.URL.createObjectURL(document.getElementById("opppsite-upload").files[0]);
                }
            },


            //下一步
            async nextButton() {

                let inputFront = document.getElementById("front-upload");
                let inputOpppsite = document.getElementById("opppsite-upload");

                if (!inputFront.files[0]) {
                    this.showAlert = true;
                    this.alertText = "请添加身份证正面照片";
                    return;
                } else if (!inputOpppsite.files[0]) {
                    this.showAlert = true;
                    this.alertText = "请添加身份证反面照片";
                    return;
                }

                //显示loading动画
                this.showWaiting = true;
                let handler = this;
                registerStep5(inputFront.files[0], inputOpppsite.files[0], function(ret) {
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
    .title {
        @include sc(.65rem, $fontColor);
        text-align: center;
    }
    .upload-container {
        @include wh(100%, 6rem);
        position: relative;
        .oppsite-upload,
        .front-upload {
            display: block;
            position: absolute;
            opacity: 0;
            left: 0;
            @include wh(100%, 5rem);
        }
        .file-img {
            width: 100%;
            height: 5rem;
            text-align: center;
            margin-top: 0.5rem;
            img {
                max-height: 6rem;
            }
        }
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
