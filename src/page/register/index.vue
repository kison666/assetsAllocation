<template>
    <div class="restContainer">
        <head-top head-title="开户" goBack="true"></head-top>
        <section class="show-container">
            <ul class="progress-ul">
                <li class="progress-li">
                    <p class="progress-item" :class="{'active':progress==0,'pre_active':progress>0}"></p>
                    <p class="tip">开户</p>
                </li>
                <li class="progress-li">
                    <p class="progress-item" :class="{'active':progress==1,'pre_active':progress>1}"></p>
                    <p class="tip">审核</p>
                </li>
                <li class="progress-li">
                    <p class="progress-item" :class="{'active':progress==2,'pre_active':progress>2}"></p>
                    <p class="tip">入金</p>
                </li>
                <li class="progress-li">
                    <p class="progress-item" :class="{'active':progress==3,'pre_active':progress>3}"></p>
                    <p class="tip">交易</p>
                </li>
            </ul>
            <section class="desc-container" v-show="progress <2">
                <ul class="character-ul">
                    <li class="character-li">
                        <p class="icon">
                            <svg fill="#3190e8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#quick"></use>
                            </svg>
                        </p>
                    </li>
                    <li class="character-li">
                        <p class="title">便捷开户</p>
                        <p>足不出户 一键开通海外证券账户</p>
                    </li>
                </ul>
                <ul class="character-ul">
                    <li class="character-li">
                        <p class="icon">
                            <svg fill="#3190e8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#fee-market"></use>
                            </svg>
                        </p>
                    </li>
                    <li class="character-li">
                        <p class="title">资金安全</p>
                        <p>账户及资金全部在投资者个人名下</p>
                    </li>
                </ul>
                <ul class="character-ul">
                    <li class="character-li">
                        <p class="icon">
                            <svg fill="#3190e8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#charge"></use>
                            </svg>
                        </p>
                    </li>
                    <li class="character-li">
                        <p class="title">佣金低廉</p>
                        <p>低至交易数量*0.005美元的交易手续费</p>
                    </li>
                </ul>
            </section>
        </section>
        <section class="charge-container" v-show="progress ==2">
            <section class="input_container">
                <label>存入币种</label>
                <input type="text" placeholder="" name="currency" readonly="true" v-model="currency">
            </section>
            <section class="input_container">
                <label>存入金额</label>
                <input type="number" placeholder="例如：3000" name="amt" v-model="amt">
            </section>
            <section class="upload-container">
                <input type="file" capture="video" class="front-upload" @change="uploadImg()" id="front-upload">
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
            <div class="login_container" @click="noticeRemit()">通知查看汇款</div>
        </section>
        <router-link :to="pathUrl" class="info-data-link" v-show="pathUrl !='' && progress ==0">
            <div class="login_container">继续开户</div>
        </router-link>
        <router-link :to="{path: '/user/info_step0', query:{}}" class="info-data-link" v-show="pathUrl =='' && progress ==0">
            <div class="login_container">马上开户</div>
        </router-link>
        <router-link :to="{path: '#', query:{}}" class="info-data-link" v-show="pathUrl =='' && progress ==1">
            <div class="login_container grey">正在审核中</div>
        </router-link>
        <p class="question" v-show="progress <2"><a href="https://etf.baomap.com/help/openaccount">开户遇到问题？</a></p>
        <p class="question" v-show="progress ==2"><a href="https://etf.baomap.com/help/addfund">入金遇到问题？</a></p>
        <p class="tip" v-show="progress ==1">审核时间为提交开户申请后3-5个工作日</p>
        <p class="tip" v-show="progress ==2">账户金额至少为3000美元才能进行交易</p>
        <section class="bottom-container" v-show="progress ==0">
            <p class="title">开户前请准备好</p>
            <ul class="tip-ul">
                <li class="tip-li">
                    <ul class="character-ul">
                        <li class="character-li">
                            <p class="icon">
                                <svg fill="#3190e8">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#idcardno"></use>
                                </svg>
                            </p>
                        </li>
                        <li class="character-li">
                            <p>证件</p>
                            <p>在有效期内的证件</p>
                        </li>
                    </ul>
                </li>
                <li class="tip-li">
                    <ul class="character-ul">
                        <li class="character-li">
                            <p class="icon">
                                <svg fill="#3190e8">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#wifi"></use>
                                </svg>
                            </p>
                        </li>
                        <li class="character-li">
                            <p>WIFI网络</p>
                            <p>3G/4G网络</p>
                        </li>
                    </ul>
                </li>
            </ul>
        </section>
    </div>
</template>
<script>
import headTop from '../../components/header/head'
import alertTip from '../../components/common/alertTip'
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    data() {
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                progress: 0, //进度
                currency: '美元', //币种
                amt: '', //金额
                file_img_url: 'https://ohfz8un5b.qnssl.com/web/ib/account/account_upload_add_fund.png', //上传图片封面
                show_pic:true,//是否展示封面图

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
            },

            uploadImg() {
                this.file_img_url = window.URL.createObjectURL(document.getElementById("front-upload").files[0]);
                this.show_pic = false;

            },

            noticeRemit() {
                alert("汇款");
            },

            nextButton() {
                this.$router.replace({
                    path: '/'
                });
                return;
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
    background-color: $grey;
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
        padding: .03rem;
        text-align: center;
        .tip {
            @include sc(.55rem, $fontGreyColor2);
            text-align: center;
        }
        .progress-item {
            background-color: $grey2;
            height: .3rem;
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
    background-color: rgba(49, 144, 232, 0.6);
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
</style>
