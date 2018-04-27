<template>
    <div class="question_container">
        <head-top signin-up='home' head-title="交易须知" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <div class="qustion-item">
                <p>一、本账户为<span class="blue">虚拟资金账户</span>，资产配置界面“<span class="blue">推荐组合</span>”与“<span class="blue">自配组合</span>”各提供<span class="blue">5万美元</span>体验金，共计<span class="blue">10万美元</span>，不能提现；</p>
                <p>二、实盘交易账户目前只针对特定客户开放；</p>
                <p>三、建议先进行风险测评，以便更科学地对您的组合进行配置。</p>
            </div>
            <section class="button-container">
                <div>
                    <router-link :to="{path: '/', query:{}}">
                        <p class="grey">我知道了</p>
                    </router-link>
                </div>
                <div>
                    <router-link :to="{path: '/user/info_step0', query:{}}">
                        <p>继续开立实盘</p>
                    </router-link>
                </div>
            </section>
        </section>
    </div>
</template>
<script>
import headTop from '../../components/header/head'
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

    },

    methods: {

    }

}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.menu {
    padding-top: $containerTop;
}

.qustion-item {
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    p {
        margin-top: 0.2rem;
        margin-bottom: 0.5rem;
        @include sc(.6rem, $fontGreyColor);
        line-height: 1.2rem;
    }
    .title {
        @include sc(.7rem, $fontColor);
        margin-bottom: .5rem;
        margin-top: 1rem;
    }
}

.button-container {
    display: flex;
    div {
        flex: 1;
        text-align: center;
        p {
            background-color: $blue;
            padding: .3rem .5rem;
            width: 5.5rem;
            @include sc(.65rem, $fontColor);
            margin: auto;
        }

        .grey{
            background-color:$grey;
        }
    }
}
</style>
