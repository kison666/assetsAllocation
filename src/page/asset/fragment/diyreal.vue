<template>
    <section class="asset-container">
        <transition name="fade-choose">
            <section class="choice-type-list-container">
                <asset-show :assetType="currentChoiceType">
                </asset-show>
                <!-- 组合包含的内容 -->
<!--                 <div class="title-container">

                </div> -->
            </section>
        </transition>
    </section>
</template>
<script>
import BScroll from 'better-scroll'
import assetShow from '../../../components/common/assetShow'

export default {
    components: {
        assetShow
    },

    data() {
        return {
            currentChoiceType: 'commend', //当前的组合
            currentChoiceName: '推荐组合', //当前的组合名称
        }
    },

    watch: {
        //主要市场、指数工具切换状态
        changeMarketType: function(value) {

        }

    },

    created() {
        this.initData();
    },

    methods: {
        //初始化获取数据
        async initData() {

        }

    }

}
</script>
<style lang="scss" scoped>
@import '../../../style/mixin';


.asset-container {
    /*display: flex;*/
    flex: 1;
    overflow-y: hidden;
    position: relative;

    .choice-type-list-container {
        min-height: 5rem;
    }
    .activity_show {
        display: block;
    }
    .title-container {
        position: relative;
        width: 100%;
        margin-top: 0.2rem;
        padding-top: 0.5rem;
        background-color: $grey;
        text-align: center;
        p {
            @include sc(.65rem, $fontColor);
            padding-top: 0.2rem;
            span {
                @include sc(.65rem, $red);
            }
        }
        .trade-notice {
            position: absolute;
            bottom: 0;
            right: 0;
            -webkit-border-radius: 1.2rem 0px 0px 1.2rem;
            -moz-border-radius: 1.2rem 0px 0px 1.2rem;
            border-radius: 1.2rem 0px 0px 1.2rem;
            border-style: solid none solid solid;
            border-color: $blue;
            border-width: 0.05rem;
            font-size: 0.4rem;
            text-align: center;
            padding: 0.08rem 0.4rem;
            padding-left: 0.4rem;
            padding-right: 0.2rem;
            width: 1.8rem;
            span {
                color: $fontGreyColor;
            }
            p {
                color: $blue;
            }
        }
    }
    .type-choice-container {
        position: relative;
        background-color: $grey;
        padding-bottom: 2rem;
        .type-choice-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            height: 1.8rem;
            padding: 0rem 0.8rem;
        }
        .type-choice-ul .type-choice-li {
            float: left;
            width: 25%;
            border-style: solid;
            border-width: 0.05rem;
            border-color: $lineGrey2;
            text-align: center;
            span {
                @include sc(.65rem, $fontGreyColor2);
                line-height: 1.5rem;
            }
        }
        .type-choice-ul .type_activity {
            border-color: $blue;
            span {
                color: $blue;
            }
        }
        .type-cursor-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            height: 1.1rem;
            padding: 0rem 0.8rem;
        }
        .type-cursor-ul .type-cursor-li {
            float: left;
            width: 25%;
            text-align: center;
            .cursor-icon {
                @include wh(0.5rem, 0.75rem);
                display: inline-block;
                vertical-align: middle;
                line-height: 0.75rem;
                .icon-mobile {
                    @include wh(100%, 100%);
                    display: none;
                }
                .cursor_activity {
                    display: block;
                }
            }
            span {
                @include sc(.65rem, $fontColor);
                line-height: 1.5rem;
            }
        }
        .risk-test {
            position: absolute;
            top: -2rem;
            right: 0px;
            -webkit-border-radius: 1.2rem 0px 0px 1.2rem;
            -moz-border-radius: 1.2rem 0px 0px 1.2rem;
            border-radius: 1.2rem 0px 0px 1.2rem;
            border-style: solid none solid solid;
            border-color: $blue;
            border-width: 0.05rem;
            font-size: 0.4rem;
            text-align: center;
            padding: 0.08rem 0.4rem;
            padding-left: 0.4rem;
            padding-right: 0.2rem;
            span {
                color: $fontGreyColor;
            }
            p {
                color: $blue;
            }
        }
        .type-change-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            height: 1.8rem;
            padding: 0rem 0.8rem;
        }
        .type-change-ul .type-change-li {
            float: left;
            width: 49%;
            border-style: solid;
            border-width: 0.05rem;
            border-color: $lineGrey2;
            text-align: center;
            span {
                @include sc(.65rem, $fontGreyColor2);
                line-height: 1.5rem;
            }
        }
        .type-change-ul .type-change-li:nth-child(2) {
            width: 2%;
            border-width: 0px
        }
        .type-change-ul .type-change-li:nth-child(3) {
            background-color: $blue;
            border-color: $blue;
            span {
                color: #e0e0e0;
            }
        }
    }
    .confirm-container {
        margin: 1.2rem .8rem;
        margin-bottom: .5rem;
        @include sc(.7rem, #fff);
        background-color: $blue;
        padding: .3rem 0;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
}
</style>
