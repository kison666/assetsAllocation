<template>
    <section class="show-list-container">
        <ul class="show-list-ul">
            <li class="show-list-li">
                <p class="title">资产总值(USD)</p>
                <p v-cloak>{{assetDetail.total}}</p>
            </li>
            <li class="show-list-li">
                <p class="title">持仓价值</p>
                <p v-cloak>{{assetDetail.value}}</p>
            </li>
            <li class="show-list-li">
                <p class="title">可用现金</p>
                <p v-cloak>{{assetDetail.available}}</p>
            </li>
            <li class="show-list-li">
                <p class="title">持仓日期</p>
                <p v-cloak>{{assetDetail.date}}</p>
            </li>
            <li class="show-list-li">
                <p class="title">总盈亏</p>
                <p :class="{green:parseFloat(assetDetail.profit) >0,red:parseFloat(assetDetail.profit) <0,white:parseFloat(assetDetail.profit) ==0}" v-cloak>{{assetDetail.profit}}</p>
            </li>
            <li class="show-list-li">
                <router-link to='#' v-show="assetDetail.isOpen == '0'">
                    <p class="title">开通实盘</p>
                    <p><span class="open-real">+</span></p>
                </router-link>
                <router-link to='#' v-show="assetDetail.isOpen == '1'">
                    <p class="title">查看实盘</p>
                    <p><span class="open-real">+</span></p>
                </router-link>
            </li>
        </ul>
    </section>
</template>
<script>
import {
    assetDetail
} from '../../service/getData'

export default {
    data() {
            return {
                assetDetail //资产详情
            }
        },
        props: ['assetType'],
        created() {
            this.initData();
        },
        mounted() {

        },
        methods: {
            //初始化获取数据
            async initData() {
                this.assetDetail = await assetDetail(this.assetType);
            },

            //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
            async listenPropChange() {


            }
        },
        watch: {
            //监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
            assetType: function(value) {
                this.listenPropChange();
            }
        }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.show-list-container {
    margin-top: 0.2rem;
    .show-list-ul {
        list-style: none;
        margin: 0 auto;
        overflow: hidden;
        width: 100%;
        padding: 0.4rem 0.2rem;
        padding-bottom: 0.8rem;
    }
    .show-list-li {
        float: left;
        width: 33.33%;
        border-right: solid 0.05rem $lineGrey4;
        margin-top: 0.4rem;
        p {
            @include sc(.65rem, $fontColor);
            text-align: center;
        }
        .red {
            color: $red;
        } 
        .green {
            color: $green;
        }
        .title {
            @include sc(.55rem, $fontGreyColor2);
            padding-bottom: 0.2rem;
        }
        .open-real {
            background-color: $blue;
            padding: 0rem 0.25rem;
        }
    }
    .show-list-li:nth-child(3),
    .show-list-li:last-child {
        border-right-width: 0px;
    }
}
</style>
