<template>
    <div class="question_container">
        <head-top signin-up='home' head-title="通知和确认清算安排" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <div class="qustion-item">
                <p class="title">NOTICE AND ACKNOWLEDGEMENT OF CLEARING ARRANGEMENT</p>
                <p> 1. This Notice applies to Customers who have been introduced to Interactive Brokers ("Interactive") by TIGER HOLDINGS GROUP LIMITED ("Introducing Broker"). Interactive Brokers and Introducing Broker are parties to a Fully Disclosed Clearing Agreement pursuant to which Interactive performs certain services with respect to your account and other accounts introduced to Interactive by the Introducing Broker.</p>
                <p> 2. The terms and conditions of the Interactive Brokers Customer Agreement and the Interactive Brokers Margin Agreement apply to your account and are incorporated herein by reference. TO THE EXTENT THAT THIS NOTICE DIFFERS FROM OR SUPERCEDES SPECIFIC PROVISIONS OF THE INTERACTIVE BROKERS CUSTOMER AGREEMENT OR MARGIN AGREEMENT, THIS NOTICE CONTROLS AND IS BINDING ON YOUR ACCOUNT.</p>
                <p> 3. Responsibilities of Interactive Brokers: Interactive will be responsible for the following services regarding Customer accounts:</p>
                <p> a. Obtaining and verifying account information and documentation and opening and closing Customer accounts.</p>
                <p> b. Receiving, segregating, safeguarding and delivering Customer funds, securities, and other property.</p>
                <p> c. Extending credit to Customer accounts, collecting margin from the accounts, and determining and enforcing credit or margin limits applicable to the accounts.</p>
                <p> d. Receiving orders from you or from your Introducing Broker for your account and executing such orders and clearing executed transactions.</p>
                <p> e. Providing confirmations and statements to Customers.</p>
                <p> f. Accepting instructions regarding voluntary corporate actions (e.g., tender or exchange offers) and accepting instructions with respect to options and securities rights.</p>
                <p> 4. Responsibilities of Introducing Broker: Introducing Broker will be responsible for the following services regarding Customer accounts:</p>
                <p> a. Introducing Customer accounts to Interactive Brokers and providing Customers with instructions on how to apply for Interactive Brokers accounts.</p>
                <p> b. Providing all customer service and technical support and responding to Customer complaints, inquiries and requests.</p>
                <p> c. Accepting Customer orders and transmitting them to Interactive for execution (you may also submit orders directly to Interactive through Interactive's order entry software).</p>
                <p> d. Providing notice to Customers of commission rates and fees.</p>
                <p> 5. Commissions and Fees: Introducing Broker is responsible for notifying Customers of all commissions and fees applicable to Customer accounts. Interactive will deduct applicable commissions and fees from Customer accounts. Commission and fee payments owed by Customers may be shared and allocated between Introducing Broker and Interactive as Introducing Broker and Interactive agree from time to time.</p>
                <p> 6. Customer Service: Introducing Broker is solely responsible for providing all customer service and technical support for your account and for responding to your questions or inquiries concerning your account, your orders and your trading. You should not contact IB customer support directly, and instead you must contact the Introducing Broker. All disputes and issues concerning Interactive's performance of its responsibilities for Customer accounts (such as trading issues, execution questions, margin and credit issues, etc.) will be forwarded to Interactive by the Introducing Broker and Interactive will communicate the resolution to the Introducing Broker (or in exceptional cases, the Customer). INTRODUCING BROKER SHALL HAVE NO AUTHORITY TO BIND INTERACTIVE OR TO ENTER INTO ANY AGREEMENT, UNDERSTANDING OR COMMITMENT GIVING RISE TO ANY LIABILITY OR OBLIGATION OF INTERACTIVE.</p>
                <p> 7. Orders: Interactive Brokers is authorized to accept orders from you or from your Introducing Broker for your account. Interactive will not contact you to verify or confirm, prior to execution, orders entered for your account by your Introducing Broker. ALL DISPUTES REGARDING ORDERS ENTERED BY YOUR INTRODUCING BROKER ARE BETWEEN YOU AND THE INTRODUCING BROKER. ERRORS IN COMMUNICATIONS OR TRANSMISSIONS OF ORDERS FROM YOUR INTRODUCING BROKER TO INTERACTIVE ARE THE SOLE RESPONSIBILITY OF YOUR INTRODUCING BROKER.</p>
                <p> 8. Account Information: Introducing Broker is responsible for providing all customer and technical support regarding your account and is therefore authorized to view all information regarding your account. INTRODUCING BROKER'S MISUSE OR DISCLOSURE OF INFORMATION REGARDING YOUR ACCOUNT IS SOLELY THE RESPONSIBILITY OF INTRODUCING BROKER AND INTERACTIVE SHALL BEAR NO LIABILITY FOR ANY CLAIMS ARISING FROM INTRODUCING BROKER'S ACCESS TO YOUR ACCOUNT INFORMATION.</p>
                <p> 9. No Investment or Tax Advice: You acknowledge that neither Interactive nor its employees or representatives provide any investment, tax or trading advice; nor do they solicit orders. You further acknowledge that neither Interactive nor its employees or representatives advise you or your Introducing Broker on any matters pertaining to the suitability of any order; offer any opinion, judgment or other type of information pertaining to the nature, value, potential or suitability of any particular investment; or review the appropriateness of investment advice or transactions entered by you or by Introducing Broker on your behalf.</p>
                <p> 10. Interactive does not control, audit or supervise the activities of Introducing Broker or its registered representatives. Neither Introducing Broker nor any of its officers, directors, employees or representatives are employees or agents of Interactive, nor shall they hold themselves out as such.</p>
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
            this.$store.state.declare_notice = declare;
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
