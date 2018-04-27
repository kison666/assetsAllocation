<template>
    <div class="market_container">
        <head-top signin-up='home' head-title="市场" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu" :class="{xbt_margin_top: isWeixin==false}">
            <section class="change_market_type" :class="{xbt_top: isWeixin==false}">
                <div>
                    <span :class='{activity_show: changeMarketType =="company"}' @click="changeMarketType='company'">公司介绍</span>
                </div>
                <div>
                    <span :class='{activity_show: changeMarketType =="team"}' @click="changeMarketType='team'">团队介绍</span>
                </div>
                <div>
                    <span :class='{activity_show: changeMarketType =="contract"}' @click="changeMarketType='contract'">联系我们</span>
                </div>
            </section>
            <transition name="fade-choose">
                <section class="menu_container">
                    <section class="menu-item" v-show="changeMarketType=='company'">
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  BAOMAP寻宝图是一家科技金融服务商。我们专注于金融科技和数据技术的研发，为机构和企业客户提供证券化的另类金融资产，并结合自主研发运营的智能资产管理平台和技术引擎，向合作机构输出包含境内外金融资产的智能资产配置系统及综合解决方案，帮助机构客户更好地发掘甄选优质资产，为客户提供智能、高效的资产配置服务和综合金融解决方案。</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  寻宝图的核心成员来自国际一线投资银行交易部门、知名对冲基金、金融数据公司、国内大型券商和私人财富管理机构。团队中还有多位来自国内重点高校及科研机构的教授。成员多拥有10年以上国内及海外证券资管行业从业经验。</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  寻宝图拥有资产管理、交易平台、数据科技等子公司和业务单元，旗下子公司持有国内私募基金管理人牌照、美国证监会注册投资顾问及境外持牌券商。各子公司及业务模块相互协同，为客户在境内外提供合规和受监管的综合金融解决方案。</p>
                    </section>
                    <section class="menu-item" v-show="changeMarketType=='team'">
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  寻宝图的团队成员来自国际一线投资银行交易部门、知名对冲基金、金融数据公司、国内大型券商和私人财富管理机构，包括高盛、摩根大通、摩根士丹利、美林证券、花旗、国信证券、招商银行、彭博、中国银联等，成员多拥有10年以上国内及海外相关行业从业经验。团队中还有多位来自国内重点高校及科研机构的教授。</p>
                        <p class="img"><img src="https://ohfz8un5b.qnssl.com/web/ib/new/aboutus1.png" width="90%"></p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; 团队金融市场交易经验丰富。过去十多年来，团队经手和处理过的交易及业务金额达数千亿美元，涵盖一、二级市场中的众多标志性交易业务和全球市场多项里程碑式的事件；团队成员主动管理过的资产规模有数百亿美元，资产涵盖一级、二级市场，类别包含股权类、债权类、外汇类、大宗商品、本外币利率、信用类、资产证券化类等等。</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 团队自主研发了金融大数据平台和程序化交易系统。团队在过去5年自主研发了金融大数据平台，包含外盘10年日交易数据，境内3年tick级数据，各类爬虫数据及应用数据模块；寻宝图高速跨境程序化交易系统，可以支持国内所有交易所和二级市场品种，毫秒级发单，也支持海外主要交易所，在并发性和实时性方面皆有出色表现。</p>
                    </section>
                    <section class="menu-item" v-show="changeMarketType=='contract'">
                        <p>联系电话：<a href="tel://02155889019">021-55889019<span class="tip">(点击可拨打)</span></a></p>
                        <p>联系邮箱：<a href="mailto:support@baomap.com">support@baomap.com</a></p>
                        <p>地址：上海市虹口区东大名路948号白金湾广场19楼</p>
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

export default {
    components: {
        headTop,
        loading,
        alertTip
    },

    data() {
        return {
            changeMarketType: 'company', //切换主要市场
            mainMarket: '', //市场指数
            mainMarketDetail: '', //细分市场指数
            indexMarketDetail: '', //12大类资产指数
            packageMarketDetail: '', //大类资产包
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            showLoading: false, //加载动画
            isWeixin: false, //是否是微信
        }
    },
    watch: {
        //主要市场、指数工具切换状态
        changeMarketType: function(value) {
            if (value === 'main') {

            }
        }

    },

    created() {
        window.scrollTo(0, 0);
        this.initData();
    },
    methods: {
        //初始化获取数据
        initData() {
            let ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.isWeixin = true;
            } else {
                this.isWeixin = false;
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

    },

}
</script>
<style lang="scss" scoped>
@import '../../../style/mixin';
.menu {
    padding-top: $containerTop;
    margin-top: 2rem;
}

.change_market_type {
    position: fixed;
    display: flex;
    background-color: $grey;
    padding: .3rem .3rem .3rem;
    top: 0rem;
    left: 0rem;
    width: 100%;
    div {
        flex: 1;
        text-align: center;
        span {
            @include sc(.65rem, #888);
            padding: .2rem .1rem;
        }
        .activity_show {
            color: #fff;
            border-bottom:solid 0.08rem #ffffff;
        }
    }
}

.main_container {
    display: flex;
    flex: 1;
    padding-bottom: 2rem;
}

.menu_container {
    padding-top: 0rem;
}

.menu-item {
    padding: .5rem;
    img {
        margin: 1rem 0rem;
        
    }
    .img{
        text-align:center;
    }
    p {
        @include sc(.65rem, $fontGreyColor);
        margin-bottom: .6rem;
        line-height: 1.2rem;
        a {
            @include sc(.65rem, $fontGreyColor);
            span {
                @include sc(.65rem, $fontGreyColor2);
            }
        }
    }
}
.xbt_margin_top {
    margin-top: 2rem;
}
.xbt_top {
    top: 1.95rem !important;
}
</style>
