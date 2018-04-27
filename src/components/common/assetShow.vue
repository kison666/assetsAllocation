<template>
    <section class="show-list-container">
        <ul class="show-list-ul">
            <li class="show-list-li">
                <p class="title">资产总值(USD)</p>
                <p v-cloak>{{totalPrice}}</p>
            </li>
            <li class="show-list-li">
                <p class="title">持仓价值</p>
                <p v-cloak>{{position}}</p>
            </li>
            <li class="show-list-li">
                <p class="title">资金余额</p>
                <p v-cloak>{{cash}}</p>
            </li>
            <li class="show-list-li" v-show="usefulAmt !='--'">
                <p class="title">可用现金</p>
                <p v-cloak>{{usefulAmt}}</p>
            </li>
            <li class="show-list-li" v-show="usefulAmt =='--'">
                <p class="title">持仓日期</p>
                <p v-cloak>{{positionDate}}</p>
            </li>
            <li class="show-list-li">
                <p class="title">当日盈亏</p>
                <p :class="{green:parseFloat(dayProfit) >0,red:parseFloat(dayProfit) <0,white:parseFloat(dayProfit) ==0}" v-cloak>{{dayProfit}}</p>
                <span class="divsvg" @click="showTip">
                    <svg fill="#ddd">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#tip"></use>
                    </svg>
                </span>
            </li>
            <li class="show-list-li">
                <p class="title">总盈亏</p>
                <p :class="{green:parseFloat(totalProfit) >0,red:parseFloat(totalProfit) <0,white:parseFloat(totalProfit) ==0}" v-cloak>{{totalProfit}}</p>
            </li>
        </ul>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </section>
</template>
<script>
import alertTip from '../common/alertTip'

export default {
    data() {
            return {
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                typeId: 0, //推荐类型/自配类型
                opTypeId: 0, //虚拟盘或实盘
                totalPrice: '--', //资产总值(USD)
                position: '--', //持仓价值
                cash: '--', //现金
                usefulAmt: '--', //资金余额
                dayProfit: '--', //当日盈亏
                totalProfit: '--', //总盈亏
                positionDate: '--', //持仓日期
            }
        },
        components: {
            alertTip
        },
        props: ['assetDetail', 'realData','choseFlag'],
        created() {
            // this.initData();

        },
        mounted() {

        },
        methods: {
            //初始化获取数据
            initData() {

                if (this.assetDetail.totalAmt) {
                    this.totalPrice = this.assetDetail.totalAmt;
                }
                if (this.assetDetail.totalPrice) {
                    this.totalPrice = this.assetDetail.totalPrice;
                }
                this.position = this.assetDetail.position;
                this.cash = this.assetDetail.cash;

                if (this.assetDetail.usefulAmt) {
                    this.usefulAmt = this.assetDetail.usefulAmt;
                }
                
                if(this.choseFlag==false){
                    this.positionDate = '--';
                }else{
                    if (this.assetDetail.positionDate) {
                        this.positionDate = this.assetDetail.positionDate;
                    }

                    if (this.assetDetail.date) {
                        this.positionDate = this.assetDetail.date;
                    }
                }

                if (this.assetDetail.dayProfit !=null ) {
                    if(this.assetDetail.dayProfit ==0){
                        this.dayProfit ="0.00";
                    }else{
                        this.dayProfit = this.assetDetail.dayProfit; 
                    }

                }
                if (this.assetDetail.totalProfit) {
                    this.totalProfit = this.assetDetail.totalProfit;
                }
            },

            initRealData() {
                if (this.realData) {
                    this.totalPrice = this.realData.totalAmt;
                    this.position = this.realData.position;
                    this.cash = this.realData.cash;
                    if (this.realData.usefulAmt != null) {
                        this.usefulAmt = this.realData.usefulAmt;
                    }
                    if (this.realData.positionDate) {
                       this.positionDate = this.realData.positionDate;
                    }
                    if (this.realData.date != null) {
                        this.postionDate = this.realData.date;
                    }

                    if (this.realData.dayProfit) {
                        this.dayProfit = this.realData.dayProfit;
                    }
                    if (this.realData.totalProfit) {
                        this.totalProfit = this.realData.totalProfit;
                    }
                }
            },

            //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
            listenPropChange() {
                this.initData();

            },
            showTip() {
                this.showAlert = true;
                this.alertText = "1、“当日盈亏”为交易时段的参考数据，非交易时段，数据可能不准确；2、“当日盈亏”数据仅供参考，该数据展示准确与否，都不会影响到资产的安全性。"
            },
            closeTip() {
                this.showAlert = false;
            }
        },
        watch: {
            //监听父级传来的assetDetail，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
            assetDetail: function(value) {
                this.listenPropChange();

            },
            realData: function(value) {
                if (value) {
                    this.realData = value;
                }
                this.initRealData();
            },
            positionDate:function(value){

                var p = /[0-9]/; 
                var b = p.test(value);//true,说明有数字
                if(b){
                    this.positionDate=value;
                }else{
                    this.positionDate = '--';
                }
            }

        }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.show-list-container {
    margin-top: 0.2rem;
    background-color: transparent;
    .show-list-ul {
        list-style: none;
        margin: 0 auto;
        overflow: hidden;
        width: 100%;
        padding: 0.4rem 0.2rem;
        padding-bottom: 0.8rem;
    }
    .show-list-li {
        position: relative;
        float: left;
        width: 33.33%;
        border-right: solid 0.05rem $grey1;
        margin-top: 0.4rem;
        p {
            @include s(.65rem);
            text-align: center;
        }
        .title {
            @include sc(.55rem, $fontGreyColor2);
            padding-bottom: 0.2rem;
        }
        .open-real {
            background-color: $blue;
            padding: 0rem 0.25rem;
        }
        .divsvg {
            position: absolute;
            top: -.2rem;
            right: 0.5rem;
            @include wh(.7rem, .7rem);
            svg {
                @include wh(100%, 100%);
            }
        }
    }
    .show-list-li:nth-child(3),
    .show-list-li:last-child {
        border-right-width: 0px;
    }
    .show-list-li:nth-child(5) {
        position: relative;
        z-index: 1;
    }
}
</style>
