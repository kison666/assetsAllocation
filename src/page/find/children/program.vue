<template>
    <div class="question_container">
        <head-top signin-up='home' head-title="程序化交易" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <div class="qustion-item">
                <!-- <p class="question">程序化交易平台</p> -->
                <p class="answer">我们独家开发了程序化交易平台，能高效精准通达全球市场，平台具备以下几个特征：</p>
                <p class="answer">1、通过高速交易端口及专线，连接全球交易所；</p>
                <p class="answer">2、集成了程序化交易系统、包含各类深度行情及爬虫数据的金融大数据系统；</p>
                <p class="answer">3、支持各类高频、中频、低频策略的开发和实施。</p>
            </div>
            <div class="qustion-item">
                <img src="https://ohfz8un5b.qnssl.com/web/ib/account/study3.png" width="100%">
            </div>
        </section>
    </div>
</template>
<script>
import headTop from '../../../components/header/head'
import BScroll from 'better-scroll'

export default {
    components: {
        headTop
    },

    data() {
        return {

        }
    },


    created() {
       window.scrollTo(0, 0);
    },

    methods: {
        //初始化获取数据

    }

}
</script>
<style lang="scss" scoped>
@import '../../../style/mixin';
.menu {}

.qustion-item {
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    .question {
        text-align: center;
        @include sc(.75rem, $white);
    }
    .answer {
        margin: .6rem 0rem;
        margin-top: .5rem;
        @include sc(.65rem, $fontGreyColor);
    }
    img {
        margin: .5rem 0rem 1.5rem;
    }
}
</style>
