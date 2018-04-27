<template>
    <div class="profile-container">
<!--         <head-top signin-up='home' head-title="我的">
            <span slot='logo' class="head_logo"></span>
        </head-top> -->
        <section class="menu">
            <section class="profile-number">
                <router-link :to="userinfo? '/profile/info' : '/login'" class="profile-link">
                    <img :src="imgpath" class="privateImage" v-if="this.avatar">
                    <span class="privateImage" v-else>
                        <svg class="privateImage-svg">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </span>
                    <div class="user-info">
                        <p v-cloak>{{username}}</p>
                        <p>
                            <!--                             <span class="user-icon">
                                <svg class="icon-mobile" fill="#fff">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                                </svg>
                            </span>
                            <span class="icon-mobile-number">{{mobile}}</span> -->
                            &nbsp;
                        </p>
                    </div>
                    <span class="arrow">
                        <svg class="arrow-svg" fill="#fff">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </router-link>
            </section>
            <section class="info-data">
                <ul class="clear">
                    <router-link :to="userinfo? {path: '/profile/asset', query:{type:'virtual'}} :'/login'" tag="li" class="info-data-link">
                        <span class="info-data-top"><b v-cloak>{{virAsset}}</b></span>
                        <span class="info-data-bottom"><ul><li><span class="info-circle">模</span></li>
                        <li>持有资产(USD)</li>
                </ul>
                </span>
                </router-link>
                <router-link :to="userinfo? {path: '/profile/asset', query:{type:'real'}} :'/login'" tag="li" class="info-data-link" v-show="step ==3">
                    <span class="info-data-top" v-show="step ==3"><b>{{realAsset}}</b></span>
                    <span class="info-data-bottom"><ul><li><span class="info-circle info-circle-real">实</span></li>
                    <li>持有资产(USD)</li>
                    </ul>
                    </span>
                </router-link>
                <router-link :to="{path: stepUrl, query:{}}" tag="li" class="info-data-link" v-show="step !=3">
                    <span class="info-data-open" v-show="step==1 && stepUrl=='/user/info_step0'">立即开户</span>
                    <span class="info-data-open" v-show="step==1 && stepUrl!='/user/info_step0'">继续开户</span>
                    <span class="info-data-open" v-show="step==2 && reviewStep !=2" v-cloak>{{reviewDesc}}</span>
                    <span class="info-data-open" v-show="step==2 && reviewStep==2">立即入金</span>
                    <span class="info-data-top" v-show="step==3"><b v-cloak>{{realAsset}}</b></span>
                    <span class="info-data-bottom"><ul><li><span class="info-circle info-circle-real">实</span></li>
                    <li>持有资产(USD)</li>
                    </ul>
                    </span>
                </router-link>
                </ul>
            </section>
            <section class="profile-1reTe">
                <!-- 风险测评 -->
                <router-link :to="userinfo? riskUrl :'/login'" class="myorder">
                    <aside>
                        <svg fill="#4aa5f0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#test"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>风险测评</span>
                        <span class="right-content" v-cloak>{{riskType}}</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!-- 通知中心 -->
                <router-link :to="userinfo ? '/message':'/login' " class="myorder">
                    <aside>
                        <svg fill="#4aa5f0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#message"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>通知中心</span>
                        <span class="right-content" v-show="unread >0" v-cloak>{{unread}}条未读</span>
                        <span class="circle-content" v-show="unread >0"></span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!-- 意见反馈 -->
                <router-link :to="userinfo ? '/feedback':'/login' " class="myorder">
                    <aside>
                        <svg fill="#4aa5f0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#feedback"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>意见反馈</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!-- 常见问题 -->
                <router-link to='/question' class="myorder">
                    <aside>
                        <svg fill="#4aa5f0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#question"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>常见问题</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
            </section>
            <section class="profile-1reTe">
                <!-- 关于我们 -->
                <router-link to='/find/aboutus' class="myorder">
                    <aside>
                        <svg fill="#4aa5f0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#aboutus"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>关于我们</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!-- 设置 -->
                <router-link :to="userinfo ? '/setting':'/login' " class="myorder">
                    <aside>
                        <svg fill="#3cabff">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#setting"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div" style="border-bottom:0;">
                        <span>设置</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
            </section>
        </section>
        <foot-guide></foot-guide>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>
<script>
import headTop from '../../components/header/head'
import footGuide from '../../components/footer/footer'
import alertTip from '../../components/common/alertTip'
import {
    Indicator
} from 'mint-ui'
import {
    setToken,
    setAssetState,
    getAssetState
} from '../../store/store'
import {
    mapState,
    mapMutations
} from 'vuex'
import {
    profileInfo
} from '../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_TOKEN,
    RESPONSE_CODE_ERROR_SYSTEM
} from '../../config/response'

export default {
    components: {
        headTop,
        footGuide,
        alertTip
    },

    data() {

        return {
            profiletitle: '我的',
            userinfo: '', //得到数据
            username: '', //用户名
            resetname: '',
            mobile: '登录后享受更多特权', //电话号码
            balance: 0, //我的余额
            count: 0, //优惠券个数
            pointNumber: 0, //积分数
            avatar: '', //头像地址
            unread: 0, //未读消息条数
            riskType: '', //风险测评类型
            virAsset: '', //虚拟资金金额
            realAsset: '', //真实资金金额
            riskUrl: '', //风险测评url
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容//消息ID
            step: 3, //开户步骤
            stepUrl: '', //待审核
            reviewDesc: '审核', //审核步骤
            reviewStep:'',//审核步骤 

        }

    },

    created() {
        this.initData();
    },

    watch: {
        step: function(value) {
            if(this.step==2){
               this.stepUrl="/my/index";
                setAssetState(2); 
            }
        },
        reviewStep: function(value) {
            if(this.step==2){
               this.stepUrl="/my/index";
               setAssetState(2); 
            }
        },
        

    },

    methods: {

        //初始化获取数据
        initData() {
            this.showLoading = true;
            this.getProfileInfo();
        },

        getProfileInfo() {
            Indicator.open(); 
            let handler = this;
            profileInfo(function(ret) {
                // console.log("success=" + data);
                handler.response(ret);
            });

        },

        response(ret) {
            //隐藏加载动画
            Indicator.close();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return;
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.userinfo = ret.retData;
                this.username = this.userinfo.userName;
                this.unread = this.userinfo.msgCount;
                this.riskType = this.userinfo.risk;
                this.virAsset = this.userinfo.virAsset;
                this.realAsset = this.userinfo.RealAsset;
                this.riskUrl = this.userinfo.riskUrl;
                this.step = this.userinfo.step;
                this.stepUrl = this.userinfo.stepUrl;
                this.reviewDesc = this.userinfo.reviewDesc;
                this.reviewStep = this.userinfo.reviewStep;
                return;
            } else if (response == RESPONSE_CODE_ERROR_TOKEN || response == RESPONSE_CODE_ERROR_SYSTEM) {
                this.username = "登录/注册";
                this.virAsset='登录可见';
                this.realAsset='登录可见';
            }
        },



        closeTip() {
            this.showAlert = false;
        },
    }


}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.menu {
    padding-top: $containerTop1;
}

.profile_page {
    p,
    span {
        font-family: Helvetica Neue, Tahoma, Arial;
    }
}

.profile-number {
    border-bottom: solid 1px $lineGrey4;
    .profile-link {
        display: block;
        display: flex;
        box-align: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        background: $grey;
        padding: .666667rem .6rem;
        .privateImage {
            display: inline-block;
            @include wh(2.5rem, 2.5rem);
            border-radius: 50%;
            vertical-align: middle;
            .privateImage-svg {
                background: $fc;
                border-radius: 50%;
                @include wh(2.5rem, 2.5rem);
            }
        }
        .user-info {
            margin-left: .48rem;
            -webkit-box-flex: 1;
            -ms-flex-positive: 1;
            flex-grow: 1;
            p {
                font-weight: 700;
                @include sc(.8rem, $fc);
                .user-icon {
                    @include wh(0.5rem, 0.75rem);
                    display: inline-block;
                    vertical-align: middle;
                    line-height: 0.75rem;
                    .icon-mobile {
                        @include wh(100%, 100%);
                    }
                }
                .icon-mobile-number {
                    display: inline-block;
                    @include sc(.57333rem, $fc);
                }
            }
        }
        .arrow {
            @include wh(.46667rem, .98rem);
            display: inline-block;
            svg {
                @include wh(100%, 100%);
            }
        }
    }
}

.info-data {
    width: 100%;
    background: $grey;
    box-sizing: border-box;
    ul {
        .info-data-link {
            float: left;
            width: 50%;
            display: inline-block;
            border-right: 1px solid $borderColor;
            span {
                display: block;
                width: 100%;
                text-align: center;
            }
            .info-data-top {
                @include s(.55rem);
                padding: .853333rem 0 .453333rem;
                b {
                    display: inline-block;
                    @include sc(.8rem, $fontColor);
                    font-weight: 700;
                    line-height: 1rem;
                    font-family: Helvetica Neue, Tahoma;
                }
            }
            .info-data-open {
                @include s(.55rem);
                padding: .853333rem 0 .453333rem;
                @include sc(.8rem, $blue);
                line-height: 1rem;
            }
            .info-data-bottom {
                @include sc(.57333rem, #e0e0e0);
                font-weight: 400;
                padding-bottom: .453333rem;
                ul {
                    list-style: none;
                    margin: 0 auto;
                    overflow: hidden;
                    width: 100%;
                    li {
                        float: left;
                        width: 30%;
                        text-align: left;
                    }
                    li:last-child {
                        width: 70%;
                        padding-top: 0.2rem;
                        padding-left: 0.2rem;
                    }
                }
            }
            .info-circle {
                width: 1.2rem;
                height: 1.2rem;
                background-color: $blue;
                -moz-border-radius: 0.6rem;
                -webkit-border-radius: 0.6rem;
                border-radius: 0.6rem;
                padding-top: 0.16rem;
                float: right;
                font-size: 0.6rem;
            }
            .info-circle-real {
                background-color: $red;
            }
        }
    }
}

.profile-1reTe {
    margin-top: .4rem;
    background: $grey;
    .myorder {
        padding-left: 1.6rem;
        display: flex;
        align-items: center;
        aside {
            @include wh(.9rem, .9rem);
            margin-left: -.866667rem;
            margin-right: .266667rem;
            display: flex;
            align-items: center;
            svg {
                @include wh(100%, 100%);
            }
        }
        .myorder-div {
            width: 100%;
            border-bottom: 1px solid $borderColor1;
            padding: .433333rem .266667rem .433333rem 0;
            @include sc(.7rem, #333);
            display: flex;
            justify-content: space-between;
            position: relative;
            span {
                display: block;
            }
            .right-content {
                @include sc(.55rem, #e0e0e0);
                @include cr;
                top: 0.55rem;
                /*display: none;*/
            }
            .circle-content {
                width: 10px;
                height: 10px;
                @include cr;
                right: 4%;
                background-color: #EE6363;
                -webkit-border-radius: 5px;
                /*display: none;*/
            }
            .right-activity {
                display: block;
            }
            .myorder-divsvg {
                margin-top: 0.1rem;
                @include wh(.46667rem, .466667rem);
                svg {
                    @include wh(100%, 100%);
                }
            }
        }
    }
}

.router-slid-enter-active,
.router-slid-leave-active {
    transition: all .4s;
}

.router-slid-enter,
.router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>
