<template>
    <div class="question_container">
        <head-top signin-up='home' head-title="风险测评" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <div class="qustion-item">
                <p>1、推荐组合是金涌智能资产配置模型，是基于马科维茨现代投资组合理论，通过自主研发的多因子阿尔法及金融大数据分析模型，配备可实现机器学习的风险组合控制和资产配置模型，结合自有的高速程序化交易平台，实时监控全球数千只ETF和指数，并按照投资人风险收益偏好，配合投资人境外外币投资目标，提供的多种类型的智能资产配置方案。</p>
                <p>2、一旦选择组合配置，当日可建立组合（以当日收盘价为准，由于时差因素，欧美等市场仅统计上一个交易日情况）。</p>
                <p>3、四大推荐组合投资模型一般情况我们每个月统一调仓一次，并根据具体情况优化策略（一般半个月）。</p>
                <p>4、大类资产比例仅精确到小数点两位，比例为0可能代表配置较少，不代表没有配置相应的底层ETF。</p>
                <p>5、推荐仓位配置能具体到配置单个ETF，投资者不能自行配置。</p>
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

    },

    methods: {

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
    p {
        margin-top: 0.2rem;
        margin-bottom: 0.5rem;
        @include sc(.6rem, $fontGreyColor);
    }
}
</style>
