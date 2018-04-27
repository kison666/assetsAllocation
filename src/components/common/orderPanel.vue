<template>
    <section class="trade-container">
        <div class="trade-masking"></div>
        <div class="trade-content">
            <p class="close-trade" @click="closeTrade()">
                <svg fill="#bbb">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cancel"></use>
                </svg>
            </p>
            <p class="trade-title" v-cloak>{{FOFName}}下单</p>
            <ul class="manager-list-ul">
                <li class="manager-list-li" @click="showTradePanel(0,'买入')">
                    <p class="icon">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order-buy"></use>
                        </svg>
                    </p>
                    <p>买入</p>
                </li>
                <li class="manager-list-li" @click="showTradePanel(1,'卖出')">
                    <p class="icon">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order-sell"></use>
                        </svg>
                    </p>
                    <p>卖出</p>
                </li>
                <li class="manager-list-li">
                    <router-link :to="{path: '/my/fofdetail', query:{fofId:FOFId,name:FOFName}}">
                        <p class="icon">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order-detail"></use>
                            </svg>
                        </p>
                        <p>详情</p>
                    </router-link>
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
import alertTip from '../common/alertTip'
import {
    assetPieData
} from '../../service/getData'
import {
    responseResult,
} from '../../config/response'

export default {
    data() {
            return {
                FOFAccount: '', //输入的数量
            }
        },
        components: {
            alertTip
        },
        props: ['FOFName','FOFId'],
        created() {
            // this.initData();
        },
        mounted() {

        },
        methods: {
            //初始化获取数据
            async initData() {

            },

            //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
            async listenPropChange() {

                this.initData();
            },

            closeTrade() {
                this.$emit('closeTrade')
            },

            reduceAccount() {
                if (this.FOFAccount > 0) {
                    this.FOFAccount--;
                }
            },

            addAccount() {
                if (this.FOFAccount < this.avliableAccount) {
                    this.FOFAccount++;
                }
            },

            showTradePanel(type, name) {
                this.$emit('closeTradeAndOpenPanel', type, name);
            },

        },
        watch: {
            //监听父级传来的currentAssetType，当值发生变化的时候重新获取数据
            // currentAssetType: function(value) {
            //     this.listenPropChange();
            // },

            // 监听input输入
            FOFAccount: function(value) {
                if (value.length > 1) {
                    if (value.indexOf('0') == 0) {
                        this.FOFAccount = value.substring(1);
                    }
                }
                if (value > 0) {

                }
            }

        }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.trade-container {
    .trade-masking {
        position: fixed;
        bottom: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
    }
    .trade-content {
        position: fixed;
        bottom: 0;
        height: 6rem;
        width: 100%;
        background-color: $grey1;
        z-index: 999;
        .close-trade {
            position: absolute;
            right: .4rem;
            top: .2rem;
            @include wh(1rem, 1rem);
            margin: auto;
            margin-bottom: 0.2rem;
            svg {
                @include wh(100%, 100%);
            }
        }
        .trade-title {
            margin: auto;
            text-align: center;
            margin-top: .3rem;
            @include sc(.65rem, $fontColor);
        }
        .manager-list-ul {
            position: absolute;
            top: 1.5rem;
            left: 0rem;
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            padding: 0.4rem 0rem;
        }
        .manager-list-li {
            float: left;
            width: 33.33%;
            p {
                @include sc(.65rem, $fontColor);
                text-align: center;
            }
            .title {
                @include sc(.55rem, $fontGreyColor2);
                padding-bottom: 0.2rem;
            }
            .simple {
                padding-top: 0.5rem;
            }
            .icon {
                @include wh(2rem, 2rem);
                margin: auto;
                margin-bottom: 0.2rem;
                svg {
                    @include wh(100%, 100%);
                }
            }
        }
    }
}
</style>
