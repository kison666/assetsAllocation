<template>
    <div class="feedback_container">
        <head-top signin-up='home' head-title="我要反馈" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <section class="profile-1reTe">
                <!-- 用户名 -->
                <div class="myorder">
                    <div class="myorder-div">
                        <span>&nbsp;&nbsp;&nbsp;姓名</span>
                        <span class="right-content" v-cloak>{{userName}}</span>
                        <!--                         <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span> -->
                    </div>
                </div>
                <div class="myorder">
                    <div class="myorder-div">
                        <span>&nbsp;&nbsp;&nbsp;手机号</span>
                        <span class="right-content" v-cloak>{{mobile}}</span>
                        <!--                         <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span> -->
                    </div>
                </div>
                <div class="myorder">
                    <div class="myorder-div">
                        <span>&nbsp;&nbsp;&nbsp;身份证</span>
                        <span class="right-content" v-cloak>{{idCardNo}}</span>
                        <!--                         <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span> -->
                    </div>
                </div>
            </section>
        </section>
    </div>
</template>
<script>
import headTop from '../../../components/header/head'
import BScroll from 'better-scroll'
import {
    baseInfo
} from '../../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../../config/response'

export default {
    components: {
        headTop,
    },

    data() {
        return {
            userinfo: '', //用户基本信息
            userName: '', //用户姓名
            mobile: '', //电话号码
            idCardNo: '', //身份证
        }
    },

    created() {
        this.initData();
    },

    methods: {
        //初始化获取数据

        initData() {
            let handler = this;
            baseInfo(function(ret) {
                handler.response(ret);
            });

        },
        response(ret) {
            //如果返回的值不正确，则弹出提示框
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.userinfo = ret.retData;
                this.userName = this.userinfo.userName;
                this.mobile = this.userinfo.mobile;
                this.idCardNo = this.userinfo.idCardNo;
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
@import '../../../style/mixin';
.menu {
    padding: 0.5rem 0.4rem;
    padding-top: $containerTop;
}

.profile-1reTe {
    margin-top: 2.4rem;
    background: transparent;
    .myorder {
        /*padding-left: 1.6rem;*/
        display: flex;
        align-items: center;
        .myorder-div {
            width: 100%;
            border-bottom: 1px solid #888;
            padding: .433333rem .266667rem .433333rem 0;
            @include sc(.7rem, #333);
            display: flex;
            justify-content: space-between;
            position: relative;
            span {
                display: block;
            }
            .right-content {
                @include sc(.5rem, #e0e0e0);
                margin-top: .3rem;
                right: 2%;
            }
            .myorder-divsvg {
                @include wh(.46667rem, .466667rem);
                margin-top: .1rem;
                svg {
                    @include wh(100%, 100%);
                }
            }
        }
    }
}

.submit_container {
    background-color: $blue;
    width: 100%;
    text-align: center;
    @include sc(.7rem, $fontColor);
    padding: 0.2rem;
    margin-top: 1.8rem;
}
</style>
