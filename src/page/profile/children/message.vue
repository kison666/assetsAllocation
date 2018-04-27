<template>
    <div class="market_container">
        <head-top signin-up='home' head-title="我的消息" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <section class="change_market_type" ref="chooseType">
                <div>
                    <span :class='{activity_show: changeMarketType =="main"}' @click="changeMessageType('main')">未读消息</span>
                </div>
                <div>
                    <span :class='{activity_show: changeMarketType =="index"}' @click="changeMessageType('index')">已读消息</span>
                </div>
            </section>
            <transition name="fade-choose">
                <section v-show="changeMarketType =='main'" class="main_container">
                    <section class="menu_container">
                        <div class="message-item" v-for="(item, index) in messageList" v-if="messageList.length >0">
                            <p class="date" v-cloak>{{item.time}}</p>
                            <div class="dashed"></div>
                            <p class="title" v-cloak>{{item.title}}</p>
                            <p class="content" v-cloak>{{item.content}}</p>
                            <router-link :to="{path: 'message/detail', query:{mid:item.mid}}" class="link">
                                <p>查看详情>></p>
                            </router-link>
                        </div>
                        <div class="no-record" v-else><p>无未读消息</p></div>
                    </section>
                </section>
            </transition>
            <transition name="fade-choose">
                <section v-show="changeMarketType =='index'" class="index_container" id="indexContainer">
                    <section class="menu_container">
                        <div class="message-item read" v-for="(item, index) in messageList" v-if="messageList !=''">
                            <p class="date" v-cloak>{{item.time}}</p>
                            <div class="dashed"></div>
                            <p class="title" v-cloak>{{item.title}}</p>
                            <p class="content" v-cloak>{{item.content}}</p>
                            <router-link :to="{path: 'message/detail', query:{mid:item.mid}}" class="link">
                                <p>查看详情>></p>
                            </router-link>
                        </div>
                        <div class="no-record" v-else><p>无未读消息</p></div>
                    </section>
                </section>
            </transition>
        </section>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <loading v-show="showLoading"></loading>
    </div>
</template>
<script>
import headTop from '../../../components/header/head'
import BScroll from 'better-scroll'
import alertTip from '../../../components/common/alertTip'
import loading from '../../../components/common/loading'
import {
    Toast,
    Indicator
} from 'mint-ui'
import {
    messageList
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
        loading
    },

    data() {
        return {
            changeMarketType: 'main', //切换主要市场
            messageList: '', //消息列表数据
            messageType: '0', //当前显示的消息类型
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            showLoading: false, //显示加载动画 
        }
    },

    created() {
        this.initData();
    },

    methods: {
        //初始化获取数据
        initData() {
            Indicator.open();
            let handler = this;
            messageList(this.messageType, function(ret) {
                handler.response(ret);
            });
        },
        response(ret) {
            //如果返回的值不正确，则弹出提示框
             Indicator.close();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.messageList = ret.retData.list;
            }
        },

        //消息列表切换
        changeMessageType(type) {
            this.changeMarketType = type;
            if (type == 'main') {
                this.messageType = 0;
                this.initData();
            } else if (type == 'index') {
                this.messageType = 1;
                this.initData();
            }
        },
        closeTip() {
            this.showAlert = false;
        },

        //隐藏动画
        hideLoading() {
            if (process.env.NODE_ENV !== 'development') {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer);
                    this.showLoading = false;
                }, 600)
            } else {
                this.showLoading = false;
            }
        },


    }

}
</script>
<style lang="scss" scoped>
@import '../../../style/mixin';
.menu {
    padding-top: $containerTop;
}

.change_market_type {
    display: flex;
    background-color: transparent;
    padding: .3rem 2rem .6rem;
    margin-top: .5rem;
    padding-top: $containerTop;
    div {
        flex: 1;
        text-align: center;
        span {
            @include sc(.75rem, #888);
            padding: .2rem .1rem;
        }
        .activity_show {
            color: #fff;
        }
    }
}

.main_container {
    display: flex;
    flex: 1;
    padding-bottom: 2rem;
}

.menu_container {
    /*display: flex;*/
    flex: 1;
    overflow-y: hidden;
    position: relative;
    .message-item {
        background-color: $grey;
        margin: 0.2rem 0.5rem;
        padding: 0.5rem;
        .date {
            @include sc(.65rem, $fontGreyColor);
        }
        .dashed {
            height: 0;
            width: 100%;
            border-bottom: $lineGrey2 1px dashed;
            margin: 0.3rem 0rem;
        }
        .title {
            @include sc(.65rem, $fontColor);
        }
        .content {
            margin-top: 0.2rem;
            @include sc(.55rem, $fontGreyColor);
        }
        .link {
            text-align: right;
            @include sc(.55rem, $fontGreyColor);
        }
    }
    .read {
        .date {
            @include sc(.65rem, $fontGreyColor2);
        }
        .dashed {
            border-bottom: $fontGreyColor2 1px dashed;
        }
        .title {
            @include sc(.65rem, $fontGreyColor2);
        }
        .content {
            margin-top: 0.2rem;
            @include sc(.55rem, $fontGreyColor2);
        }
        .link {
            text-align: right;
            @include sc(.55rem, $fontGreyColor2);
        }
    }
}

.no-record{
    p{
        margin-top: 0.2rem;
        @include sc(.55rem, $fontGreyColor2);   
    }
}
</style>
