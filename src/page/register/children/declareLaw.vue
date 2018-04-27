<template>
    <div class="question_container">
        <head-top signin-up='home' head-title="法律声明" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <div class="qustion-item">
                <p>盈透之所以能够保持低廉的佣金结构，是因为我们建立了自动交易流程以最大程度减少人为干预及决策。从这点出发，我们制定了若干管理盈透所有账户的简单条款。这些规则承认由于电子系统的自身特质(常常依赖于第三方连接)，系统有时可能无法工作或发生延迟；交易所和数据提供方也可能出错。</p>
                <p>本人有义务接受所有按本人定单指令进行的定单执行。</p>
                <p> 尽管我们相信在同行业中我们的故障几率最低，但事实上任何系统都可能偶尔出现故障，且常常是由人力不可控因素造成的。因此盈透不对系统或网络错误负责，且要求最高级别可靠性的客户，须同意设置备用交易设施。</p>
                <p> 客户有责任对用户名和密码进行保密；并对由第三方使用其用户名和密码进行的交易负责。</p>
                <p> 盈透已确认交易执行，但随后交易被交易所、交易网络或监管当局取消，这种情况下，盈透确认的交易也被视为取消。</p>
                <p> 盈透通常按照接收顺序处理定单，包括盈透及其子公司提交的所有定单。</p>
                <p> 如果定单延迟传送，或定单传送受到了数据通信故障的影响，盈透不保证限价定单获得执行。</p>
                <p> 盈透不提供交易、投资或税务建议，客户不应听信盈透员工意图提供此类建议的言论。</p>
                <p> 盈透通常不会发出保证金追缴通知，对余额不足、不符合监管当局或盈透保证金要求的账户，盈透保留不经事先通知即立即平仓所有头寸的权利，盈透不对此举负责。考虑到市场或其他因素，盈透可自行决定发出保证金追缴通知且/或不强制平仓账户头寸。如果您收到了保证金追缴通知，您必须立即存入资金以补足保证金。</p>
                <p> 盈透客户须负责确保提供给盈透的信息的精确性和最新性。 盈透客户确保盈透知悉其当前使用的电邮地址，以便随时接收并查看盈透发出的电子邮件。</p>
            </div>
            <section class="declare-container">
                <section class="declare-item">
                    <span @click="setDeclare('我不同意')">我不同意</span>
                </section>
                <section class="declare-item">
                    <span @click="setDeclare('我同意')">我同意</span>
                </section>
            </section>
        </section>
    </div>
</template>
<script>
import headTop from '../../../components/header/head'
import BScroll from 'better-scroll'
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    components: {
        headTop
    },

    data() {
        return {
            userName: ''
        }
    },


    created() {
        this.initData();
    },

    methods: {
        initData() {},

        setDeclare(declare) {
            this.$store.state.declare_law = declare;
            this.$router.go(-1);
        }
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
    padding-bottom: 3rem;
    p {
        margin-top: 0.2rem;
        margin-bottom: 0.5rem;
        @include sc(.6rem, $fontGreyColor);
    }
    .title {
        @include sc(.75rem, $fontColor);
    }
}

.declare-container {
    position: fixed;
    display: flex;
    width: 100%;
    bottom: 0;
    padding-bottom: .5rem;
    padding-top: .3rem;
    background-color: $grey;
    .declare-item {
        text-align: center;
        flex: 1;
        span {
            background-color: $grey3;
            text-align: center;
            padding: 0.2rem 0.4rem;
            @include sc(.6rem, $fontColor);
        }
    }
    .declare-item:last-child {
        span {
            background-color: $blue;
        }
    }
}
</style>
