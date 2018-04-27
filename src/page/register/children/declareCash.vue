<template>
    <div class="question_container">
        <head-top signin-up='home' head-title="保整件披露" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <div class="qustion-item">
                <p>由于您指定了保证金交易许可，您必须阅读并表示您接受保证金交易披露文件。请阅读下面的文件并在底部确认您接受该文件。</p>
                <p> 该披露基于美国金融业监管局("FINRA")的样本披露，主要介绍保证金账户交易的固有风险，包括盈透会在不通知客户的情况下平仓保证金不足的账户。</p>
                <p> DISCLOSURE OF RISKS OF MARGIN TRADING</p>
                <p> Interactive Brokers (“IB”) is furnishing this document to you to provide some basic facts about purchasing securities and futures contracts on margin, and to alert you to the risks involved with trading in a margin account. “Margin trading” can mean engaging in a transaction in which securities are purchased partially through a margin loan extended to you by IB, for which the securities act as collateral. Margin trading can also mean trading investment products such as futures or options in which an initial “margin” deposit is made to secure your obligations and further margin may be required to secure your obligations as the value of your positions changes.</p>
                <p> This document also describes special risks associated with trading on margin in an IRA account, as described below.</p>
                <p> Before trading stocks, futures or other investment products in a margin account, you should carefully review the margin agreement provided by IB and you should consult IB regarding any questions or concerns you may have with your margin accounts.</p>
                <p> When you purchase securities, you may pay for the securities in full or you may borrow part of the purchase price from IB. If you choose to borrow funds from IB, you will open a margin account with the firm. The securities purchased are IB’s collateral for the loan to you. If the securities or futures contracts in your account decline in value, so does the value of the collateral supporting your loan, and, as a result, IB can take action, such as sell securities or other assets in any of your accounts held with IB or issue a margin call, in order to maintain the required equity in the account.</p>
                <p> You should understand that pursuant to the IB Margin Agreement, IB generally will not issue margin calls, that IB will not credit your account to meet intraday margin deficiencies, and that IB generally will liquidate positions in your account in order to satisfy margin requirements without prior notice to you and without an opportunity for you to choose the positions to be liquidated or the timing or order of liquidation.</p>
                <p> In addition, it is important that you fully understand the risks involved in trading securities or futures contracts on margin. These risks include the following:</p>
                <p> You can lose more funds than you deposit in the margin account. A decline in the value of securities or futures contracts that are purchased on margin may require you to provide additional funds to IB or you must put up margin to avoid the forced sale of those securities or futures contracts or other assets in your account(s).</p>
                <p> IB can force the sale of securities or other assets in your account(s). If the equity in your account falls below the maintenance margin requirements, or if IB has higher “house” requirements, IB can sell the securities or futures contracts or other assets in any of your accounts held at the firm to cover the margin deficiency. You also will be responsible for any shortfall in the account after such a sale.</p>
                <p> IB can sell your securities or other assets without contacting you. Some investors mistakenly believe that a firm must contact them for a margin call to be valid, and that the firm cannot liquidate securities or other assets in their accounts to meet the call unless the firm has contacted them first. This is not the case. As noted above, IB generally will not issue margin calls and can immediately sell your securities or futures contracts without notice to you in the event that your account has insufficient margin.</p>
                <p> You are not entitled to choose which securities or futures contracts or other assets in your account(s) are liquidated or sold to meet a margin call. IB has the right to decide which positions to sell in order to protect its interests.</p>
                <p> IB can increase its “house” maintenance margin requirements at any time and is not required to provide you with advance written notice. These changes in firm policy often take effect immediately. Your failure to maintain adequate margin in the event of an increased margin rate generally will cause IB to liquidate or sell securities or futures contracts in your account(s).</p>
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
            this.$store.state.declare_cash = declare;
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
