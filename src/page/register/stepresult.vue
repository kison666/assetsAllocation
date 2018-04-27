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
            <p class="title">恭喜您</p>
            <p class="title">开户申请已成功提交，预计3-5个工作日开通</p>
        </form>
        <div class="login_container" @click="nextButton()">确定</div>
        <p class="tip">万一您发现自己所填写的关键信息，如身份证和地址信息有错误，请联系我们客服处理：021-55889019。</p>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>
<script>
import headTop from '../../components/header/head'
import alertTip from '../../components/common/alertTip'
import {
    mapState,
    mapActions
} from 'vuex'
import {
    setAssetState
} from '../../store/store'
export default {
    data() {
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
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

            //初始化数据
            initData() {

            },

            nextButton() {
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
        padding:.4rem;
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

.login_container {
    margin: 1rem .5rem;
    @include sc(.7rem, #fff);
    background-color: $blue;
    padding: .5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
}
</style>
