<template>
    <div class="question_container">
        <head-top signin-up='home' head-title="交易须知" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <div class="qustion-item">
                <p class="title">一、大类资产指数组合命名规则</p>
                <p>合约名称：大类资产指数简称+YYMM，如美国股票1706，即美国股票大类资产指数组合1706。</p>
                <p>合约代码：英文缩写+YYMM，如美国股票1706，合约代码为USS1706。</p>
            </div>
            <div class="qustion-item">
                <p class="title">二、交易机制</p>
                <p class="white">交易时间</p>
                <p class="white">非交割日交易时间：</p>
                <p>美国时间：周一至周五 9：30～16：00（午间不休市）</p>
                <p>北京时间：21：30～次日4：00（夏令时，3月初～11月初）</p>
                <p class="red">北京时间：22：30～次日5：00（冬令时，11月初～次年3月初）</p>
                <p class="white">交割日可交易时间：</p>
                <p class="red">（暂定为前3小时可交易，后3.5小时预留交割）</p>
                <p>备注：重新选择组合类型同上规则。</p>
                <p>美国时间：周一至周五 9：30～12：30（午间不休市）</p>
                <p>北京时间：21：30～次日0：30（夏令时，3月初～11月初）</p>
                <p>美国时间：周一至周五 9：30～12：30（午间不休市）</p>
                <p>美国时间：周一至周五 9：30～12：30（午间不休市）</p>
                <p>北京时间：22：30～次日1：30（冬令时，11月初～次年3月初）</p>
                <p class="white">交易规则</p>
                <p>T + 0 ，只做多不做空，无涨跌停限制</p>
                <p class="white">交易费用</p>
                <p>每支ETF交易手续费为 交易数量*0.005美元，不足1美元收1美元。</p>
                <p class="white">交割方式</p>
                <p>本合约的合约月份为当月，实行每月现金交割的交易制度。</p>
                <p>最后交易日为每月最后一个交易日（美国市场），最后交易日即为交割日。</p>
                <p>到期合约交割日的下一交易日，新的月份合约开始交易。</p>
                <p class="white">停牌处理方式</p>
                <p>（1）买入该组合：先买入其他未停牌ETF，预留现金待ETF复牌后补买停牌ETF，<span class="red">预留现金为占用资金，资产可用现金=资产可用现金-预留现金。</span></p>
                <p>预留现金=sum(停牌ETF价格(T-1)*停牌ETF数量)*现金替代比例</p>
                <p>现金替代比例=110%（初步设定，防止复牌后股价上涨）</p>
                <p>如果复牌后股价超出预留现金额度，则需可用现金补充不足部分，如果可用现金不足，可能会导致该ETF买入不成功，需追加现金或强制平仓。</p>
                <p>（2）卖出该组合：先卖出其他未停牌ETF，等停牌ETF复牌后卖出。</p>
                <p>（3）交割该组合：先强制平仓其他未停牌ETF，等停牌ETF复牌后再强制平仓。</p>
                <p class="white">分红分拆处理方式</p>
                <p>大类资产指数组合包含ETF分红分拆情况，会涉及组合底层ETF数量变化/资产收益计算：</p>
                <p>（1）分拆 =5 > 1 ，1股拆成5股，资产包ETF数量N变为5*N；</p>
                <p>（2）合并 =0.2< 1 ，5股合成1股，资产包ETF数量N变为floor(N/3)，现金增加（N- floor(N/3)*3）*昨收；</p>
                <p>（3）分红 0.15，每股分红0.15，现金增加 N*0.15。</p>
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
    .white{
        color:#ffffff!important;
    }
}
</style>
