<template>
    <div class="feedback_container">
        <head-top signin-up='home' go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <section class="profile-1reTe">
                <!-- 风险测评 -->
                <router-link to='/order' class="myorder">
                    <div class="myorder-div">
                        <span>&nbsp;&nbsp;&nbsp;版本信息</span>
                        <span class="right-content">Beta1.0</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
            </section>
            <div class="submit_container" @click="signOut()">退出登录</div>
        </section>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <transition name="waiting">
            <waiting v-show="showWaiting"></waiting>
        </transition>
    </div>
</template>
<script>
import headTop from '../../../components/header/head'
import BScroll from 'better-scroll'
import alertTip from '../../../components/common/alertTip'
import waiting from '../../../components/common/waiting'
import {
    setToken
} from '../../../store/store'
import {
    signOut
} from '../../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../../config/response'

export default {
    components: {
        headTop,
        alertTip,
        waiting
    },

    data() {
        return {
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容//消息ID
            showWaiting: false,
        }
    },

    created() {
        this.initData();
    },

    methods: {
        //初始化获取数据
        async initData() {

        },

        signOut() {

            this.showWaiting = true;
            let handler = this;
            signOut(function(ret) {
                // console.log("success=" + data);
                handler.response(ret);
            });
        },
        response(ret) {
            this.hideWaiting();
            //如果返回的值不正确，则弹出提示框
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                setToken('');
                this.$router.replace({
                    path: '/login'
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
                @include cr;
                top: 31%;
            }
            .myorder-divsvg {
                @include wh(.46667rem, .466667rem);
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
    padding: 0.4rem;
    margin-top: 1.8rem;
}
</style>
