<template>
    <div class="market_container">
        <head-top signin-up='home' head-title="市场" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu" :class="{xbt_margin_top: isWeixin==false}">
            <section class="change_market_type" :class="{xbt_top: isWeixin==false}">
                <div>
                    <span :class='{activity_show: category==1}' @click="category=1">媒体报道</span>
                </div>
                <div>
                    <span :class='{activity_show: category==2}' @click="category=2">公告公示</span>
                </div>
                <div>
                    <span :class='{activity_show: category==0}' @click="category=0">行业动态</span>
                </div>
                <div>
                    <span :class='{activity_show: category==3}' @click="category=3">道听图说</span>
                </div>
            </section>
            <transition name="fade-choose">
                <section class="news-container" infinite-scroll="loadMore" infinite-scroll-disabled="newLoading" infinite-scroll-distance="10">
                    <ul class="news-item" v-for="(item,index) in newsList">
                        <router-link :to="{path: '/find/newdetail', query:{id:item.nid,title:item.title,author:item.author,source:item.source,sourceUrl:item.sourceUrl,date:item.date}}">
                            <li><img :src="item.cover"></li>
                            <li>
                                <p class="title">{{item.title}}</p>
                                <p class="sub-title">{{item.subTitle}}</p>
                            </li>
                        </router-link>
                    </ul>
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
    Indicator,
    InfiniteScroll,
} from 'mint-ui'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../../config/response'
import {
    newsList
} from '../../../service/getData'

export default {
    components: {
        headTop,
        loading,
        alertTip,
        Toast,
        InfiniteScroll,
    },

    data() {
        return {
            mainMarket: '', //市场指数
            mainMarketDetail: '', //细分市场指数
            indexMarketDetail: '', //12大类资产指数
            packageMarketDetail: '', //大类资产包
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            showLoading: false, //加载动画
            newsList: '', //新闻列表
            newLoading: true, //加载更多
            perPage: 50, //每页的条数
            page: 1, //当前页
            category: 1, //当前种类
            isWeixin: false, //是否是微信

        }
    },
    watch: {
        //主要市场、指数工具切换状态
        category: function(value) {
            this.$router.replace({
                path: '/find/news',
                query:{c:this.category}
            });
            this.requestNews();

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
            this.category = this.$route.query.c;
            if(this.category=='' || this.category==null){
                 this.category=1;
             }   
             
            this.requestNews();
        },


        requestNews() {
            Indicator.open();
            let handler = this;
            newsList(this.page, 0, this.category, this.perPage, function(ret) {
                handler.response(ret);
            });
        },

        //加载更多
        loadMore() {
            this.newLoading = true;
            let handler = this;
            newsList(this.page, 0, this.category, this.perPage, function(ret) {
                handler.response(ret);
            });
        },

        response(ret) {
            Indicator.close();
            let response = responseResult(this, ret);
            // console.log(ret);
            if (response == RESPONSE_CODE_SUCCESS) {
                this.newsList = ret.retData.list;
                this.newLoading = false;
                return
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

.news-container {
    padding-top: .2rem;
}

.news-item {
    list-style: none;
    margin: 0 auto;
    overflow: hidden;
    width: 100%;
    padding: .3rem .4rem;
    border-bottom: solid $lineGrey4 0.05rem;
}

.news-item li {
    float: left;
    width: 24%;
    padding-top: .15rem;
    img {
        width: 100%;
        height: 2.4rem;
    }
}

.news-item li:last-child {
    float: left;
    width: 76%;
    padding-left: .5rem;
    .title {
        @include sc(.65rem, $fontColor);
        max-width: 100%;
        white-space: nowrap;
        word-break: keep-all;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: -0.15rem;
    }
    .sub-title {
        @include sc(.55rem, $fontGreyColor2);
        max-width: 100%;
        white-space: nowrap;
        word-break: keep-all;
        overflow: hidden;
        padding-top: .5rem;
        text-overflow: ellipsis;
    }
}

.xbt_top {
    top: 1.95rem !important;
}

.xbt_margin_top {
    margin-top: 2.2rem;
}
</style>
