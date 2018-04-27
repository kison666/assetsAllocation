<template>
    <div class="question_container">
        <head-top signin-up='home' head-title="W-8BEN表格" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <div class="qustion-item">
                <p class="title">W-8BEN Substitute 在美预扣税和报税受益人
                </p>
                <p>W-8BEN Substitute</p>
                <p>在美预扣税和报税受益人</p>
                <p>外籍身份证明（个人）</p>
                <br>
                <p>*W8表格供个人使用。实体须使用 W-8BEN-E 表格。</p>
                <p>有关W-8BEN表格的信息以及单独说明参见www.irs.gov/formw8ben</p>
                <p>请将此表格交给代扣税代理或纳税方。请勿发送至国税局。</p>
                <br>
                <p>如果属于以下情况，请勿使用此表格，而使用其他表格：</p>
                <p>1.非个人，请使用W-8BEN-E表格</p>
                <p>2.美国公民或其他在美人士，包括外籍居住者，请使用W-9表格</p>
                <p>3.宣称收入在与美国的贸易或业务行为相关的收益所有人（除个人服务），请使用W-8ECI表格</p>
                <p>4.因在美国提供个人服务而获取补偿的受益所有人，请使用8233或者W-4表格</p>
                <p>5.担任中介的人，请使用W-8IMY表格</p>
                <br>
                <p>第一部分：受益方身份</p>
                <p>姓名</p>
                <p>国籍</p>
                <p>中国</p>
                <p>永久居住地址</p>
                <p>邮寄地址</p>
                <p>美国纳税人识别号码</p>
                <p>海外税收识别号码</p>
                <p>参考编码</p>
                <p>出生日期</p>
                <br>
                <p>第二部分：税务条约优惠声明</p>
                <p>本人证明，受益方居住的中华人民共和国属于美国与该国家之间达成的所得税 协定的作用范围之内。</p>
                <br>
                <p>第三部分：证明</p>
                <p>根据伪证罪处罚条例，本人声明本人已审查表格中的信息，据本人所知及所信其真实、准确且完整。根据伪证罪处罚条款，本人进一步证明:</p>
                <p>本人是本表格相关之收入的受益所有人（或被授权为受益所有人签字），或正在使用该表格作为文件证明本人是一家外国金融机构的所有人或账户持有人，</p>
                <p>表格第一行内填写的人士并非美国人</p>
                <p>本表格相关收入:</p>
                <p>(a)与在美的贸易或商业活动无关，</p>
                <p>(b)虽为相关收入，但根据所得税条约不需要交纳税费，或者</p>
                <p>(c)为合伙企业相关收入的合伙人收入，</p>
                <p>该表格第1行填写的人士是表格第9行（如果有的话）所列条约国的居民，属于美国与该国之间达成的所得税协定的作用范围之内，并且</p>
                <p>对于中间交易或易货交易，受益方正如说明中定义的为豁免外籍人士。</p>
                <p>本人同意，如果此表格内的证明信息不再准确，本人会在30天内提交一份新的表格。</p>
                <p>点击下方“本人同意”即代表您确认表格W-8BEN内填写的信息真实准确且税务表格的收集和发送均使用电子形式</p>
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
            this.$store.state.declare_wben = declare;
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
