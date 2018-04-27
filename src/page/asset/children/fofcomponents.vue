<template>
    <div class="question_container">
        <section class="menu">
            <div class="qustion-item" v-show="type == 'name' || type=='all'">
                <p>合约名称：大类资产指数简称+YYMM，如美国股票1706，即美国股票大类资产指数组合1706。</p>
                <p>合约代码：英文缩写+YYMM，如美国股票1706，合约代码为USS1706。</p>
            </div>
            <div class="qustion-item" v-show="type == 'time' || type=='all'">
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
                <p>注：交割日为美国市场每月最后一个交易日。</p>
            </div>
            <div class="qustion-item" v-show="type == 'rule' || type=='all'">    
                <p class="white">1.交割须知：</p>
                <p>每类资产组合以当月合约的形式交易，实行每月现金交割的交易制度；</p>
                <p>最后交易日和交割日均为每月最后一个交易日（美国市场）；</p>
                <p>到期合约交割日的下一交易日，新的月份合约开始交易。</p>
                <p class="white">2.交易规则：</p>
                <p>T + 0；</p>
                <p>只做多不做空；</p>
                <p>无涨跌停限制。</p>
                <p class="white">3.交易手续费：</p>
                <p>资产组合内每只ETF交易手续费汇总；</p>
                <p>买卖资产组合收双边手续费；</p>
                <p>每只ETF交易手续费为交易数量*0.005美元，不足1美元收1美元。</p>
            </div>
            <div class="qustion-item" v-show="type == 'other' || type=='all'">    
                <p class="white">若资产组合中包含停牌ETF情况：</p>
                <p>买入资产组合：买入未停牌ETF，预留现金等到ETF复牌后补买停牌ETF；</p>
                <p>卖出资产组合：卖出未停牌ETF，等停牌ETF复牌后卖出；</p>
                <p>交割：强制平仓未停牌ETF，等停牌ETF复牌后再平仓。</p>
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

    props: ['type'],

    created() {
         window.scrollTo(0, 0);
    },
    watch: {
        //日K、周K、月K切换状态
        type: function(value) {
        },

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
        @include sc(.7rem, #fff);
    }
    .white{
        color:#ffffff!important;
    }
}
</style>
