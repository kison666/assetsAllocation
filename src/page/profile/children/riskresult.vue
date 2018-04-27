<template>
    <div class="restContainer">
        <head-top head-title="上传身份证明" goBack="true"></head-top>
        <form class="restForm">
            <section class="select_container">
                <p class="arrow-down">
                    <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tick"></use>
                    </svg>
                </p>
            </section>
            <p class="title">根据您的选择，您的风险水平为</p>
            <p class="title-type">{{type}}</p>
        </form>
        <ul class="change-ul">
            <li class="change-li">
                <router-link to='/my/risk'>
                    <p>重新测评</p>
                </router-link>
            </li>
            <li class="change-li">
                <p class="active" @click="gotoAssetReset">资产配置</p>
            </li>
        </ul>
        <section class="tip-container">
            <p>评分说明：</p>
            <br>
            <p class="xbt-title">保守型 0-44分</p>
            <p>此类投资者首要目的是保持组合的稳定性与资产的保值，这类投资者需要注意目的回报率可能很低，甚至为负，以换取本金免于受损和具备较高的流动性。</p>
            <br>
            <p class="xbt-title">稳健型 45-66分</p>
            <p>此类投资者愿意承担一定程度的风险，主要强调组合风险和组合增值之间的平衡。投资于此类组合的投资者可以承受一定程度的资产波动风险和本金亏损可能。</p>
            <br>
            <p class="xbt-title">进取型 67-88分</p>
            <p>此类投资者愿意冒较大的风险，投资目标主要是取得较高收益。投资于此类组合的投资者会承担较大的投资风险和部分本金亏损可能。</p>
            <br>
            <p class="xbt-title">激进型 89-100分</p>
            <p>此类投资者愿意冒很大的风险，投资目标主要是取得超额收益，资本快速增长，他们往往为了追求高收益而能承受相当大的本金亏损可能。</p>
        </section>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>
<script>
import headTop from '../../../components/header/head'
import alertTip from '../../../components/common/alertTip'
import {
    setAssetState
} from '../../../store/store'
import {
    mapState,
    mapActions
} from 'vuex'
import {
    riskTestResult
} from '../../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../../config/response'
export default {
    data() {
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                type: '--', //测评结果类型
            }
        },
        components: {
            headTop,
            alertTip,
        },
        created() {
            this.initData();
        },
        methods: {

            //初始化获取数据
            initData() {
                let handler = this;
                riskTestResult(function(ret) {
                    handler.response(ret);
                });
            },

            response(ret) {
                //如果返回的值不正确，则弹出提示框
                let response = responseResult(this, ret);
                if (response == RESPONSE_CODE_ERROR_DATA) {
                    this.showAlert = true;
                    this.alertText = ret.retMsg;
                    return
                } else if (response == RESPONSE_CODE_SUCCESS) {
                    this.type = ret.retData.type;

                    return

                }
            },
            gotoAssetReset(){
                 setAssetState(2);
                 this.$router.replace({
                    path: '/my/index'
                });
                return;
            },

            closeTip() {
                this.showAlert = false;
            }
        }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.restContainer {}

.tip-container {
    margin-top: 2rem;
    padding: .4rem;
    p {
        @include sc(.65rem, $fontColor);
    }
}

.restForm {
    background-color: transparent;
    margin-top: .6rem;
    .child-container {
        background-color: $grey;
        width: 100%;
        margin-top: 0.3rem;
    }
    .title {
        @include sc(.65rem, $fontColor);
        text-align: center;
    }
    .title-type {
        @include sc(.8rem, $red);
        text-align: center;
        line-height: 1.4rem;
    }
    .select_container {
        justify-content: space-between;
        padding: .3rem .8rem;
        border-bottom: 0px solid #666;
        position: relative;
        .arrow-down {
            margin: auto;
            margin-top: 2rem;
            @include wh(1.6rem, 1.6rem);
            svg {
                @include wh(100%, 100%);
            }
        }
    }
}

.tip {
    @include sc(.55rem, $fontGreyColor2);
    padding: .4rem;
}

.change-ul {
    list-style: none;
    margin: 0 auto;
    overflow: hidden;
    width: 90%;
    margin-top: 1.4rem;
}

.change-li {
    float: left;
    width: 50%;
    padding: .2rem;
    p {
        background-color: $grey;
        border: solid 0.05rem $grey2;
        @include sc(.65rem, $fontGreyColor);
        text-align: center;
        padding: .2rem 0rem;
        width: 100%;
    }
    .active {
        background-color: $blue;
        color: $white;
    }
}

.login_container {
    margin: 1rem .5rem;
    margin-top: 2rem;
    @include sc(.7rem, #fff);
    background-color: $blue;
    padding: .5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
}
</style>
