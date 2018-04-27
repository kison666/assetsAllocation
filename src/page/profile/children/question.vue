<template>
    <div class="question_container">
        <head-top signin-up='home' head-title="常见问题" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <div class="qustion-item">
                <p class="question">在全球智能资产配置账户及账户里的资金是受保护的吗？</p>
                <p class="answer">在全球智能资产配置所开立的证券交易账户将受到美国证监会的严格监管。客户资产由第三方银行托管，同时接受证监会监管，同主流券商一样。如未经客户授权动用客户资产，属于严重违法行为。</p>
            </div>
            <div class="qustion-item">
                <p class="question">如果全球智能资产配置在经营上出现了问题，资产是安全的吗？</p>
                <p class="answer">客户资产隔离在指定给客户的托管账户中。该保护（SEC称为“储 备”，CFTC称为“隔离”）是证券和商品经纪的核心原则。妥善分离客户资产的益处在于当经纪商违约或破产，并且客户没有借入资金或股票并且未持有期货头寸时，客户资产可以返还给客户。</p>
            </div>
            <div class="qustion-item">
                <p class="question">在线注册完成后，一般多长时间可以开始进行交易？</p>
                <p class="answer">资料填写完成后，需约 2-3 个工作日对您的开户申请进行审核，审核通过后会通知开户成功，即可进行入金操作，资金一般需要1-3个工作日到账，到账后即可进行交易。</p>
            </div>
            <div class="qustion-item">
                <p class="question">注册完成后，我可以修改我的个人基本信息吗？</p>
                <p class="answer">您可以登陆个人中心，修改您的邮箱、手机号、登陆密码等基本信息。</p>
            </div>
            <div class="qustion-item">
                <p class="question">账户有最低的限额吗？我需要入多少钱才可以开始交易？</p>
                <p class="answer">在全球智能资产配置开设资金账户需存入3000美金以上。</p>
            </div>
            <div class="qustion-item">
                <p class="question">如何汇款入金？汇款会产生费用吗？</p>
                <p class="answer">通过网银或者柜台进行购汇并汇款，具体可见入金必读。各家银行有一定收费差异，请以实际为准，各银行实际到账1-5个工作日不等。</p>
            </div>
            <div class="qustion-item">
                <p class="question">如何出金？取款会产生费用吗？多久到账？</p>
                <p class="answer">您可直接通过全球智能资产配置将资金取款到您的全球任何银行的同名账户，取款的费用以各银行实际产生费用为准。一般取款后，1~5工作日可以到账。</p>
            </div>
        </section>
    </div>
</template>
<script>
import headTop from '../../../components/header/head'
import BScroll from 'better-scroll'
import {
    messageDetail
} from '../../../service/getData'

export default {
    components: {
        headTop
    },

    data() {
        return {
    
        }
    },


    created() {
        this.initData();
    },

    methods: {
        //初始化获取数据
        async initData() {
            //获取消息详情
            
        }

    }

}
</script>
<style lang="scss" scoped>
@import '../../../style/mixin';
.menu {
    padding-top: $containerTop;
    padding-top:.8rem;
    padding-bottom: 1rem;
}

.qustion-item {
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    .question {
        @include sc(.65rem, $white);
    }
    .answer {
        margin-top: 0.2rem;
        @include sc(.55rem, $fontGreyColor);
    }
}
</style>
