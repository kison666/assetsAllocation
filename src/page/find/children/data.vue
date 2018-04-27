<template>
    <div class="question_container">
        <head-top signin-up='home' head-title="金融大数据" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <div class="qustion-item">
                <!-- <p class="question">金融大数据平台</p> -->
                <p class="answer">我们开发建立的金融大数据平台，旨在建立以全球主流金融证券数据为核心的大型数据仓库，数据内容涵盖股票、期货、基金、外汇、金融衍生品等领域，可提供实时行情、历史行情、财务数据、宏观经济数据。</p>
                <p class="answer">我们金融大数据平台主要具备以下几个特征：</p>
                <p class="answer">准确全面的数据仓库——支持全球主流金融证券数据，多路数据源比对，数据稳定可靠；</p>
                <p class="answer">专业标准的数据表结构——统一的代码，合理的模块分类，标准化的数据表结构；</p>
                <p class="answer">简洁易用的数据接口——支持不同语言数据接口，满足客户特定数据需求。</p>
                <img src="https://ohfz8un5b.qnssl.com/web/ib/account/study4_1.png" width="100%">
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
.menu {
    padding-top: $containerTop;
}

.qustion-item {
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    .question {
        text-align: center;
        @include sc(.75rem, $white);
        margin-bottom: .8rem;
    }
    .answer {
        margin: .6rem 0rem;
        margin-top: .3rem;
        @include sc(.65rem, $fontGreyColor);
    }
    img{
        margin:.5rem 0rem 1.5rem;
    }
}
</style>
