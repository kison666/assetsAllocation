<template>
    <div class="market_container">
        <head-top signin-up='home' head-title="增资赎回" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <section class="change_market_type">
                <div>
                    <span :class='{activity_show: changeMarketType =="add"}' @click="changeMarketType='add'">增资</span>
                </div>
                <div>
                    <span :class='{activity_show: changeMarketType =="redeem"}' @click="changeMarketType='redeem'">提现</span>
                </div>
                <div>
                    <span :class='{activity_show: changeMarketType =="record"}' @click="changeMarketType='record'">记录</span>
                </div>
            </section>
        </section>
        <trade-add v-show="changeMarketType=='add'"></trade-add>
        <trade-redeem v-show="changeMarketType=='redeem'"></trade-redeem>
        <trade-record v-if="changeMarketType=='record'"></trade-record>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <loading v-show="showLoading"></loading>
    </div>
</template>
<script>
import headTop from '../../../../components/header/head'
import BScroll from 'better-scroll'
import alertTip from '../../../../components/common/alertTip'
import loading from '../../../../components/common/loading'
import tradeAdd from '../children/tradeAdd'
import tradeRedeem from '../children/tradeRedeem'
import tradeRecord from '../children/tradeRecord'
import {
    Toast,
    Indicator
} from 'mint-ui'

export default {
    components: {
        headTop,
        alertTip,
        loading,
        tradeRedeem,
        tradeAdd,
        tradeRecord
    },

    data() {
        return {
            changeMarketType: 'add', //切换主要市场
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
@import '../../../../style/mixin';
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
            border-bottom: 0.08rem solid transparent;
        }
        .activity_show {
            color: #fff;
            border-color: #fff;
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
