<template>
    <div class="question_container">
        <head-top signin-up='home' head-title="交易须知" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <div class="qustion-item">
                <p class="title">一、交易规则</p>
                <p><span>卖出组合:</span>交易时间内提交请求，实时卖出；非交易时间提交请求，T日卖出（T为交易日）。</p>
                <p><span>买入/更改组合:</span>1、交易时间内提交请求，实时卖出；非交易时间提交请求，T日卖出（T为交易日）。</p>
                <p>2、如提交请求时间距离月末调仓日小于等于5个交易日，调仓日生效。</p>
            </div>
            <div class="qustion-item">
                <p class="title">二、交易时间</p>
                <p class="title">如果当前为夏令时&nbsp;(&nbsp;3月初—11月初&nbsp;)&nbsp;,则：</p>
                <p class="white">非交割日交易时间：</p>
                <p>美国时间：周一至周五 9：30～16：00（午间不休市）</p>
                <p>北京时间：21：30～次日4：00</p>
                <p class="white">交割日可交易时间：</p>
                <p>美国时间：9：30～12：30（午间不休市）</p>
                <p>北京时间：21：30～次日0：30</p>
                <p>注：交割日为美国市场每月最后一个交易日。</p>
                <br>
                <p class="title">如果当前为冬令时&nbsp;(&nbsp;11月初—次年3月初&nbsp;)&nbsp;,则：</p>
                <p class="white">非交割日交易时间：</p>
                <p>美国时间：周一至周五 9：30～16：00（午间不休市）</p>
                <p>北京时间：22：30～次日5：00</p>
                <p class="white">交割日可交易时间：</p>
                <p>美国时间：9：30～12：30（午间不休市）</p>
                <p>北京时间：22：30～次日1：30</p>
            </div>
            <div class="qustion-item">
                <p class="title">三、手续费用</p>
                <p>1、每只ETF交易手续费为：交易数量*0.005美元，不足1美元收1美元。</p>
                <p>2、账户管理费：按账户资金1%收取，按月收取。</p>
            </div>
            <div class="qustion-item">
                <p class="title">四、产品说明</p>
                <p>1、全球智能资产配置智能组合模型是基于马科维茨现代投资组合理论，通过自主研发的多因子阿尔法及金融大数据分析模型，配备可实现机器学习的风险仓位控制和资产配置模型，结合自有的高速程序化交易平台，实时监控全球数千只ETF和指数，并按照投资人风险收益偏好，配合投资人境外外币投资目标，提供的多种类型的智能资产配置方案。</p>
                <p>2、四大投资组合风格模型一般情况下每个月调仓一次，并根据具体情况优化策略。</p>
                <p>3、大类资产比例仅精确到小数点后两位数，比例为0有可能代表配置较少该类资产类别，并非代表没有配置相应的底层ETF。</p>
                <p>4、智能组合中，投资者仅能选择风格类型（四大风格类型），不能自行配置底层的ETF。</p>
                <p>5、组合仓位区分为标准仓位与实际仓位：</p>
                <p><span>标准仓位：</span>以当月调仓日为标准建立的仓位及比例，不展现当月的仓位优化，不区分投资人的实际投资金额；游客模式、第一次建立仓位前、更改组合类型等情况下可查看四大类型组合的标准仓位。</p>
                <p><span>实际仓位：</span>区别于标准仓位，是根据投资者实际买入价格为准建仓，为真实的投资仓位，按照投资人的投资账户实际金额，仓位优化及时同步。</p>
            </div>
        </section>
    </div>
</template>
<script>
import headTop from '../../../components/header/head'
import BScroll from 'better-scroll'
import {
    setTradeChoiceType,
    setVirualChoiceType,
} from '../../../store/store'
export default {
    components: {
        headTop
    },

    data() {
        return {
          realType:'',
          virualType:'',  
        }
    },


    created() {
        window.scrollTo(0, 0);
        this.realType = this.$route.query.realType;
        this.virualType = this.$route.query.virType;
        console.log("realType="+this.realType);
        if(this.realType && this.realType !=''){
            setTradeChoiceType(this.realType);
        }
        if(this.virualType && this.virualType !=''){
            setVirualChoiceType(this.virualType);
        }
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
    padding: 0.5rem 0.5rem 0rem 0.5rem;
    p {
        margin-top: 0.2rem;
        margin-bottom: 0.5rem;
        @include sc(.65rem, $fontGreyColor);
        span {
            @include sc(.65rem, #fff);
        }
    }
    .title {
        @include sc(.65rem, #fff);
    }
}
</style>
