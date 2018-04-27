<template>
    <div class="market_container">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
            <defs>
                <symbol xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" id="myTrade" class="icon">
                <path d="M853.346462 635.963077c-94.267077 0-170.692923 78.158769-170.692923 174.513231 0 96.413538 76.425846 174.513231 170.692923 174.513231 94.227692 0 170.653538-78.139077 170.653538-174.513231C1024 714.121846 947.574154 635.963077 853.346462 635.963077zM960.945231 836.608l-85.326769 0 0 86.311385-42.673231 0 0-86.311385-85.326769 0 0-44.603077 85.326769 0 0-87.276308 42.673231 0 0 87.276308 85.326769 0L960.945231 836.608z" p-id="2443" fill="#cccccc"></path><path d="M858.072615 611.623385c27.884308 0 54.468923 5.848615 78.532923 16.384 7.542154-34.126769 11.539692-69.691077 11.539692-106.161231 0-266.456615-212.263385-482.461538-474.072615-482.461538C212.243692 39.384615 0 255.389538 0 521.846154s212.243692 482.461538 474.072615 482.461538c83.712 0 162.343385-22.075077 230.616615-60.849231-28.553846-35.052308-45.725538-80.088615-45.725538-129.201231C658.963692 702.345846 748.110769 611.623385 858.072615 611.623385zM496.620308 740.608c0 14.178462-13.843692 26.505846-35.032615 26.505846-19.101538 0-34.067692-12.465231-34.067692-26.505846l0-96.157538-166.990769 0c-18.136615 0-32.964923-12.484923-32.964923-28.199385 0-14.867692 14.966154-26.486154 32.964923-26.486154l167.148308 0 0-82.983385-167.148308 0c-18.136615 0-32.964923-10.771692-32.964923-28.179692 0-14.158769 14.966154-25.777231 32.964923-25.777231l141.528615 0-145.821538-219.628308c-9.550769-12.465231-3.190154-28.179692 15.931077-35.682462 15.931077-5.809231 36.135385-0.846769 44.721231 10.752l146.924308 220.632615 145.683692-221.341538c8.448-12.465231 29.794462-18.254769 45.843692-9.905231 18.136615 5.809231 23.394462 22.370462 14.946462 34.835692l0-0.846769-145.959385 221.341538 139.460923 0c18.136615 0 34.048 11.598769 34.048 27.332923 0 15.734154-15.931077 26.466462-34.048 26.466462l-167.010462 0 0 83.003077 167.010462 0c18.136615 0 34.048 11.618462 34.048 28.199385 0 14.158769-15.931077 26.466462-34.048 26.466462l-167.148308 0 0 96.157538L496.620308 740.608z" p-id="2444" fill="#cccccc"></path>
                </symbol>
                <symbol xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" id="changeHold" class="icon">
                    <path d="M905.28 278.784l-399.36-209.92c-8.704-3.456-15.68-9.472-36.48 3.584L76.16 281.856a22.016 22.016 0 0 0-8.32 30.4l7.552 12.8a22.976 22.976 0 0 0 31.04 8.192l384-203.264 384.448 203.2c10.88 6.528 24.768 2.688 31.04-8.64l7.616-13.568a24.064 24.064 0 0 0-8.32-32.192zM870.4 366.848h-30.4a15.232 15.232 0 0 0-15.232 15.232v516.864H155.712V382.08a15.232 15.232 0 0 0-15.232-15.232H110.08a15.232 15.232 0 0 0-15.232 15.232v562.496c0 8.384 6.848 15.168 15.232 15.168H870.4a15.232 15.232 0 0 0 15.232-15.168v-562.56a15.232 15.232 0 0 0-15.232-15.168z" p-id="3489" fill="#e0e0e0"></path>
                    <path d="M301.376 532.928a30.4 30.4 0 0 0 28.288-19.328 182.912 182.912 0 0 1 160.64-95.68c48.64 0 94.528 19.008 128.96 53.44 15.36 15.36 27.648 32.96 36.48 52.032h65.408a243.392 243.392 0 0 0-446.912-34.944l0.128 0.064a30.4 30.4 0 0 0 27.008 44.416zM494.272 827.456a243.264 243.264 0 0 0 216.064-131.328l-0.128-0.064a30.4 30.4 0 0 0-55.296-25.088 182.912 182.912 0 0 1-160.64 95.68 181.312 181.312 0 0 1-129.024-53.44 182.528 182.528 0 0 1-36.48-52.032h-65.28a243.392 243.392 0 0 0 230.784 166.272z" p-id="3490" fill="#e0e0e0"></path>
                </symbol>
                <symbol xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" id="changeHoldGrey" class="icon">
                    <path d="M905.28 278.784l-399.36-209.92c-8.704-3.456-15.68-9.472-36.48 3.584L76.16 281.856a22.016 22.016 0 0 0-8.32 30.4l7.552 12.8a22.976 22.976 0 0 0 31.04 8.192l384-203.264 384.448 203.2c10.88 6.528 24.768 2.688 31.04-8.64l7.616-13.568a24.064 24.064 0 0 0-8.32-32.192zM870.4 366.848h-30.4a15.232 15.232 0 0 0-15.232 15.232v516.864H155.712V382.08a15.232 15.232 0 0 0-15.232-15.232H110.08a15.232 15.232 0 0 0-15.232 15.232v562.496c0 8.384 6.848 15.168 15.232 15.168H870.4a15.232 15.232 0 0 0 15.232-15.168v-562.56a15.232 15.232 0 0 0-15.232-15.168z" p-id="3489" fill="#999999"></path>
                    <path d="M301.376 532.928a30.4 30.4 0 0 0 28.288-19.328 182.912 182.912 0 0 1 160.64-95.68c48.64 0 94.528 19.008 128.96 53.44 15.36 15.36 27.648 32.96 36.48 52.032h65.408a243.392 243.392 0 0 0-446.912-34.944l0.128 0.064a30.4 30.4 0 0 0 27.008 44.416zM494.272 827.456a243.264 243.264 0 0 0 216.064-131.328l-0.128-0.064a30.4 30.4 0 0 0-55.296-25.088 182.912 182.912 0 0 1-160.64 95.68 181.312 181.312 0 0 1-129.024-53.44 182.528 182.528 0 0 1-36.48-52.032h-65.28a243.392 243.392 0 0 0 230.784 166.272z" p-id="3490" fill="#999999"></path>
                </symbol>
                <symbol viewBox="0 0 1024 1024" id="sellOut" class="icon">
                    <path d="M749.614 723.758h-399.92c-17.141 0-31.915-12.066-35.327-28.86L184.57 179.385 80.024 145.297c-16.906-10.511-22.09-32.738-11.579-49.647 10.51-16.904 32.748-22.096 49.647-11.575l117.739 42.28a36.014 36.014 0 0 1 16.288 23.43L379.146 651.66h345.793l165.794-252.17c7.2-18.552 28.094-27.763 46.653-20.569 18.55 7.203 27.765 28.087 20.566 46.65L783.217 700.743c-5.372 13.882-18.723 23.015-33.603 23.015z m-28.612-461.545L591.08 115.133c-7.092-8.025-18.686-8.025-25.778 0l-129.947 147.08c-7.09 8.025-4.132 14.59 6.575 14.59h102.186v164.69c0 10.71 8.757 19.466 19.465 19.466h29.197c10.708 0 19.465-8.757 19.465-19.466V276.801h102.183c10.712 0 13.667-6.565 6.576-14.588zM348.61 881.754a62.5 62.5 0 1 0 127.914 0 62.5 62.5 0 1 0-127.914 0z m331.551 0a62.5 62.5 0 1 0 127.914 0 62.5 62.5 0 1 0-127.914 0z" fill="#e0e0e0" p-id="28124"></path>
                </symbol>
                <symbol viewBox="0 0 1024 1024" id="sellOutGrey" class="icon">
                    <path d="M749.614 723.758h-399.92c-17.141 0-31.915-12.066-35.327-28.86L184.57 179.385 80.024 145.297c-16.906-10.511-22.09-32.738-11.579-49.647 10.51-16.904 32.748-22.096 49.647-11.575l117.739 42.28a36.014 36.014 0 0 1 16.288 23.43L379.146 651.66h345.793l165.794-252.17c7.2-18.552 28.094-27.763 46.653-20.569 18.55 7.203 27.765 28.087 20.566 46.65L783.217 700.743c-5.372 13.882-18.723 23.015-33.603 23.015z m-28.612-461.545L591.08 115.133c-7.092-8.025-18.686-8.025-25.778 0l-129.947 147.08c-7.09 8.025-4.132 14.59 6.575 14.59h102.186v164.69c0 10.71 8.757 19.466 19.465 19.466h29.197c10.708 0 19.465-8.757 19.465-19.466V276.801h102.183c10.712 0 13.667-6.565 6.576-14.588zM348.61 881.754a62.5 62.5 0 1 0 127.914 0 62.5 62.5 0 1 0-127.914 0z m331.551 0a62.5 62.5 0 1 0 127.914 0 62.5 62.5 0 1 0-127.914 0z" fill="#999999" p-id="28124"></path>
                </symbol>
            </defs>
        </svg>
        <!--         <head-top signin-up='home' head-title="我的资产">
            <span slot='logo' class="head_logo"></span>
        </head-top> -->
        <section class="menu">
            <section class="change_market_type" ref="chooseType">
                <div>
                    <span :class='{activity_show: changeMarketType =="virtual"}' @click="changeMarketTypes('virtual')">模拟交易</span>
                </div>
                <div>
                    <span :class='{activity_show: changeMarketType =="real"}' @click="changeMarketTypes('real')">实盘交易</span>
                </div>
            </section>
            <transition name="fade-choose">
                <section v-show="changeMarketType =='virtual'" class="main-container">
                    <section class="menu-container">
                        <section class="type-list-container">
                            <div>
                                <section class="item" :class='{sort_select:currentChoiceType == "commend"}' @click="changeChoiceType('commend','推荐组合')">
                                    <span class="info-circle">模</span>
                                    <p>智能组合</p>
                                </section>
                            </div>
                            <div>
                                <section class="item" :class='{sort_select:currentChoiceType == "diy"}' @click="changeChoiceType('diy','自配组合')">
                                    <span class="info-circle">模</span>
                                    <p>自配组合</p>
                                </section>
                            </div>
                        </section>
                        <section class="choice-type-list-container">
                            <commend-virtual v-show="currentChoiceType == 'commend' && changeMarketType == 'virtual'" @gotoRealTrade="gotoRealTrade()" :currentTradeType="changeMarketType" :currentChoiceType="currentChoiceType"></commend-virtual>
                            <diy-virtual v-show="currentChoiceType == 'diy' && changeMarketType == 'virtual'" :currentTradeType="changeMarketType" :isLogin="isLogin" :currentChoiceType="currentChoiceType"></diy-virtual>
                        </section>
                    </section>
                </section>
            </transition>
            <transition name="fade-choose">
                <section v-show="changeMarketType =='real'" class="index-container">
                    <section class="menu-container">
                        <div class="choice-item">
                            <span class="info-circle info-circle-real">实</span>
                            <p v-cloak>{{currentRealChoiceName}}</p>
                            <!--                             <span class="arrow-down" v-show="choiceShow == 'false' || choiceShow == '' && changeMarketType == 'real'">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-down"></use>
                                </svg>
                            </span>
                            <span class="arrow-down" v-show="choiceShow == 'true' && changeMarketType == 'real'">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-up"></use>
                                </svg>
                            </span> -->
                        </div>
                        <section class="choice-type-list-container">
                            <commend-real :currentTradeType="changeMarketType" :currentChoiceType="currentChoiceType" :realClicked="realClicked"  :isLogin ="isLogin" v-show="currentRealChoiceType == 'commend' && changeMarketType == 'real'"></commend-real>
                        </section>
                    </section>
                </section>
            </transition>
        </section>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <foot-guide></foot-guide>
    </div>
</template>
<script>
import headTop from '../../components/header/head'
import BScroll from 'better-scroll'
import commendVirtual from './fragment/commendvirtual'
import diyVirtual from './fragment/diyvirtual'
import commendReal from './fragment/commendreal'
import diyReal from './fragment/diyreal'
import footGuide from '../../components/footer/footer'
import alertTip from '../../components/common/alertTip'
import {
    Indicator
} from 'mint-ui'
import {
    REQ_TYPE_ACCOUNT
} from '../../config/const'
import {
    setToken,
    setReturnUrl,
    getReturnUrl,
    setAssetState,
    getAssetState
} from '../../store/store'
import {
    mapState,
    mapActions
} from 'vuex'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_SYSTEM,
    RESPONSE_CODE_ERROR_TOKEN
} from '../../config/response'
import {
    assetIndex,
    checkTrade
} from '../../service/getData'
export default {
    components: {
        headTop,
        commendVirtual,
        diyVirtual,
        commendReal,
        diyReal,
        footGuide,
        alertTip
    },

    data() {
        return {
            changeMarketType: '', //切换资金类型
            mainMarket: '', //市场指数
            mainMarketDetail: '', //细分市场指数
            currentChoiceType: '', //当前的组合
            currentChoiceName: '', //当前的组合名称
            currentRealChoiceName: '智能组合', //实盘账户的类型
            currentRealChoiceType: 'commend', //实盘账户的类型
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            isLogin:'',//是否登录
            realClicked:'',//是否是点击了实盘交易
        }
    },

    watch: {
        //主要市场、指数工具切换状态
        changeMarketType: function(value) {
              
        }

    },
    created() {
        this.initData();
    },
    watch: {
        isLogin: function(value) {
              if(this.isLogin==false){
                    let type = 0;
                    if (getAssetState()) {
                        type = parseInt(getAssetState());
                    }
                    if(type==0){
                       this.getPrePageState(); 
                   }else{
                        setAssetState(0);
                        this.gotoLogin();
                   }
              }else{
                this.getPrePageState();
              }
        },
    },
    methods: {
        //初始化获取数据
        initData() {
            this.getPageData();
        },

        gotoLogin(){
            this.$router.push({
              path: '/login'
           });
           this.$router.go(1);
        },

        //获取页面展示数据
        getPageData() {
            Indicator.open();
            // let ret = await assetIndex(this.currentTradeId);
            let handler = this;
            assetIndex(0, function(ret) {
                handler.responsePage(ret);
            });

        },

        responsePage(ret) {
            Indicator.close();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            }else if (response == RESPONSE_CODE_SUCCESS) {
                this.isLogin = true;
                this.getPrePageState();
                return
            } else if (response == RESPONSE_CODE_ERROR_TOKEN || response == RESPONSE_CODE_ERROR_SYSTEM) {
                this.isLogin = false;
                return
            }
        },

        //获取上次页面的状态
        getPrePageState() {
            let type = 0;
            if (getAssetState()) {
                type = parseInt(getAssetState());
            }

            //0,虚拟盘-推荐组合；1,虚拟盘-自配组合；2,实盘-推荐组合
            switch (type) {
                case 0:
                    this.currentChoiceType = 'commend';
                    this.currentChoiceName = '推荐组合';
                    this.changeMarketType = 'virtual';
                    break;
                case 1:
                    this.currentChoiceType = 'diy';
                    this.currentChoiceName = '自配组合';
                    this.changeMarketType = 'virtual';
                    break;
                case 2:
                    this.currentChoiceType = 'commend';
                    this.currentChoiceName = '推荐组合';
                    this.changeMarketType = 'real';
                    break;
                default:
                    this.currentChoiceType = 'commend';
                    this.currentChoiceName = '推荐组合';
                    this.changeMarketType = 'virtual';
                    break;
            }             
        },

        changeMarketTypes(type) {
            if (type == this.changeMarketType) {
                return;
            }
            if (type == 'real') {
                this.changeMarketType = type;
                this.realClicked = true;
                setAssetState(2);
                if(this.isLogin==false){
                    this.gotoLogin();
                    setAssetState(0);
                    return ;
                }

            } else if (type == 'virtual') {
                 this.realClicked = false;
                this.changeMarketType = type;
                if (this.currentChoiceType == 'diy') {
                    setAssetState(1);
                    if(this.isLogin==false){
                        this.gotoLogin();
                         setAssetState(0);
                        return ;
                    }
                } else if (this.currentChoiceType == 'commend') {
                    setAssetState(0);
                }
            }
            this.getPrePageState();

        },


        //选中某项，收起菜单，触发数据获取
        changeChoiceType(type, name) {
            if(type == 'commend' && this.changeMarketType =='virtual'){
               setAssetState(0);
            }else if(type =='diy' && this.changeMarketType =='virtual'){
                 setAssetState(1);
                if(this.isLogin==false){
                    this.gotoLogin();
                     setAssetState(0);
                    return ;
                }
            }else if(type =='commend' && this.changeMarketType =='real'){
                 setAssetState(2);
                if(this.isLogin==false){
                    this.gotoLogin();
                    setAssetState(0);
                    return ;
                }
            }
            this.currentChoiceType = type;
            this.currentChoiceName = name;
        },

        closeTip() {
            this.showAlert = false;
        },
        gotoRealTrade() {
            this.changeMarketTypes('real');
        },

    }

}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.menu {
    padding-top: $containerTop1;
}

.change_market_type {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    display: flex;
    background-color: $grey4;
    padding: .35rem 2.8rem .35rem;
    padding-top: 0.2rem;
    margin-bottom: .05rem;
    border-top: solid $lineGrey4 0.05rem;
    div {
        flex: 1;
        text-align: center;
        span {
            @include sc(.65rem, #888);
            padding: .25rem .1rem;
        }
        .activity_show {
            color: #e0e0e0;
            border-color: #e0e0e0;
            border-bottom: solid #e0e0e0 0.1rem;
        }
    }
}

.main-container {
    display: flex;
    flex: 1;
    padding-bottom: 1rem;
}

.menu-container {
    /*display: flex;*/
    flex: 1;
    overflow-y: hidden;
    position: relative;
    .choice-item {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;
        margin-top: 1.7rem;
        padding: 0.2rem;
        padding-top: .4rem;
        height: 1.9rem;
        @include sc(.7rem, $fontColor);
        background-color: $grey;
        border-bottom: 0.025rem solid $lineGrey4;
        border-top: 0.035rem solid $black;
        p {
            float: left;
            width: 75%;
            margin-top: 0.05rem;
            padding-left: 0.3rem;
            text-align: left;
            height: 100%;
        }
        .arrow-down {
            margin-top: 0.1rem;
            margin-left: 0.3rem;
            float: left;
            @include wh(.8rem, .8rem);
            svg {
                @include wh(100%, 100%);
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
            float: left;
            text-align: center;
            font-size: 0.6rem;
            margin-left: 0.5rem;
        }
        .info-circle-real {
            background-color: $red;
        }
    }
    .type-list-container {
        position: fixed;
        top: 1.7rem;
        left: 0;
        width: 100%;
        z-index: 10;
        display: flex;
        background-color: $grey4;
        padding-top: 0.2rem;
        margin-bottom: .05rem;
        border-top: solid #000 0.05rem;
        div {
            flex: 1;
            text-align: center;
            span {
                @include sc(.65rem, #fontColor);
                padding: .25rem .1rem;
            }
            .activity_show {
                color: $blue;
                border-color: #fff;
                border-bottom: solid $blue 0.15rem;
            }
            .item {
                height: 2rem;
                padding-top: .3rem;
                border-bottom: solid $grey 0.05rem;
                .info-circle {
                    width: 1.2rem;
                    height: 1.2rem;
                    background-color: $blue;
                    -moz-border-radius: 0.6rem;
                    -webkit-border-radius: 0.6rem;
                    border-radius: 0.6rem;
                    padding-top: 0.16rem;
                    float: left;
                    text-align: center;
                    font-size: 0.6rem;
                    margin-left: 1.5rem;
                }
                .info-circle-real {
                    background-color: $red;
                }
                p {
                    float: left;
                    margin-top: 0.05rem;
                    padding-left: 0.3rem;
                    text-align: left;
                    height: 100%;
                    @include sc(.65rem, #fontColor);
                }
            }
            .sort_select {
                border-bottom: solid $blue 0.05rem;
                p {
                    color: $blue;
                }
            }
        }
    }
    .choice-type-list {
        position: absolute;
        z-index: 100;
        width: 100%;
        display: flex;
        top: 1.9rem;
        left: 0;
        border-top: 0.025rem solid $grey1;
        background-color: $grey;
        padding-bottom: .2rem;
        .sort-list-container {
            width: 100%;
            .sort-list-li {
                height: 2rem;
                display: flex;
                align-items: center;
                p {
                    line-height: 2rem;
                    flex: auto;
                    text-align: left;
                    text-indent: 0.25rem;
                    font-size: .65rem;
                    border-bottom: 0.025rem solid $lineGrey4;
                    @include fj;
                    align-items: center;
                    padding-left: 0.2rem;
                }
                .sort_select {
                    color: $blue;
                }
                .info-circle {
                    width: 1.2rem;
                    height: 1.2rem;
                    background-color: $blue;
                    -moz-border-radius: 0.6rem;
                    -webkit-border-radius: 0.6rem;
                    border-radius: 0.6rem;
                    padding-top: 0.16rem;
                    float: left;
                    text-align: center;
                    font-size: 0.6rem;
                    margin-left: 0.5rem;
                }
            }
        }
    }
    .choice-type-list-container {
        min-height: 5rem;
        margin-top: 3.5rem;
    }
    .activity_show {
        display: block;
    }
    .title-container {
        position: relative;
        width: 100%;
        margin-top: 0.2rem;
        padding-top: 0.5rem;
        background-color: $grey;
        text-align: center;
        p {
            @include sc(.65rem, $fontColor);
            padding-top: 0.2rem;
            span {
                @include sc(.65rem, $red);
            }
        }
        .trade-notice {
            position: absolute;
            bottom: 0;
            right: 0;
            -webkit-border-radius: 1.2rem 0px 0px 1.2rem;
            -moz-border-radius: 1.2rem 0px 0px 1.2rem;
            border-radius: 1.2rem 0px 0px 1.2rem;
            border-style: solid none solid solid;
            border-color: $blue;
            border-width: 0.05rem;
            font-size: 0.4rem;
            text-align: center;
            padding: 0.08rem 0.4rem;
            padding-left: 0.4rem;
            padding-right: 0.2rem;
            width: 1.8rem;
            span {
                color: $fontGreyColor;
            }
            p {
                color: $blue;
            }
        }
    }
    .type-choice-container {
        position: relative;
        background-color: $grey;
        padding-bottom: 2rem;
        .type-choice-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            height: 1.8rem;
            padding: 0rem 0.8rem;
        }
        .type-choice-ul .type-choice-li {
            float: left;
            width: 25%;
            border-style: solid;
            border-width: 0.05rem;
            border-color: $lineGrey2;
            text-align: center;
            span {
                @include sc(.65rem, $fontGreyColor2);
                line-height: 1.5rem;
            }
        }
        .type-choice-ul .type_activity {
            border-color: $blue;
            span {
                color: $blue;
            }
        }
        .type-cursor-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            height: 1.1rem;
            padding: 0rem 0.8rem;
        }
        .type-cursor-ul .type-cursor-li {
            float: left;
            width: 25%;
            text-align: center;
            .cursor-icon {
                @include wh(0.5rem, 0.75rem);
                display: inline-block;
                vertical-align: middle;
                line-height: 0.75rem;
                .icon-mobile {
                    @include wh(100%, 100%);
                    display: none;
                }
                .cursor_activity {
                    display: block;
                }
            }
            span {
                @include sc(.65rem, $fontColor);
                line-height: 1.5rem;
            }
        }
        .risk-test {
            position: absolute;
            top: -2rem;
            right: 0px;
            -webkit-border-radius: 1.2rem 0px 0px 1.2rem;
            -moz-border-radius: 1.2rem 0px 0px 1.2rem;
            border-radius: 1.2rem 0px 0px 1.2rem;
            border-style: solid none solid solid;
            border-color: $blue;
            border-width: 0.05rem;
            font-size: 0.4rem;
            text-align: center;
            padding: 0.08rem 0.4rem;
            padding-left: 0.4rem;
            padding-right: 0.2rem;
            span {
                color: $fontGreyColor;
            }
            p {
                color: $blue;
            }
        }
        .type-change-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            height: 1.8rem;
            padding: 0rem 0.8rem;
        }
        .type-change-ul .type-change-li {
            float: left;
            width: 49%;
            border-style: solid;
            border-width: 0.05rem;
            border-color: $lineGrey2;
            text-align: center;
            span {
                @include sc(.65rem, $fontGreyColor2);
                line-height: 1.5rem;
            }
        }
        .type-change-ul .type-change-li:nth-child(2) {
            width: 2%;
            border-width: 0px
        }
        .type-change-ul .type-change-li:nth-child(3) {
            background-color: $blue;
            border-color: $blue;
            span {
                color: #e0e0e0;
            }
        }
    }
    .confirm-container {
        margin: 1.2rem .8rem;
        margin-bottom: .5rem;
        @include sc(.7rem, #fff);
        background-color: $blue;
        padding: .3rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
}
</style>
