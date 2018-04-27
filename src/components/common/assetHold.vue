<template>
    <section class="detail-list-container">
        <div class="detail-list-top">
            <ul class="detail-list-ul">
                <li class="detail-list-li">
                    <p>持仓市值</p>
                </li>
                <li class="detail-list-li">
                    <p>盈亏</p>
                </li>
                <li class="detail-list-li">
                    <p>持仓/可用</p>
                </li>
                <li class="detail-list-li">
                    <p>成本/现价</p>
                </li>
            </ul>
        </div>
        <div class="no-record" v-show="assetDetailList.length ==0 || assetDetailList ==''">暂无持仓</div>
        <div class="detail-list-content">
            <div class="detail-item" v-for="(item,key,index) in assetDetailList">
                <ul class="detail-list-ul" :class="{up:item.profitAmt >0,down:item.profitAmt <0,white:item.profitAmt==0}" @click="changeFOF(item.fofId,item.name,item.amount,item.currentPrice,item.usefulAmount)">
                    <li class="detail-list-li">
                        <p class="title" v-cloak>{{item.name}}</p>
                        <p v-cloak>{{item.position}}</p>
                    </li>
                    <li class="detail-list-li">
                        <p v-cloak>{{item.profit}}</p>
                        <p v-cloak>{{item.percent}}%</p>
                    </li>
                    <li class="detail-list-li">
                        <p v-cloak>{{item.amount}}</p>
                        <p v-cloak>{{item.usefulAmount}}</p>
                    </li>
                    <li class="detail-list-li">
                        <p v-cloak>{{item.buyPrice}}</p>
                        <p v-cloak>{{item.currentPrice}}</p>
                    </li>
                </ul>
                <ul class="manager-list-ul" v-show="item.name == currentChoiceFOFName && canTrade ==true">
                    <li class="manager-list-li">
                        <p @click="showTradePanel(0,'买入')">买入</p>
                    </li>
                    <li class="manager-list-li">
                        <p @click="showTradePanel(1,'卖出')">卖出</p>
                    </li>
                    <li class="manager-list-li">
                        <router-link :to="{path: '/my/fofdetail', query:{fofId:item.fofId,name:item.name}}">
                            <p>详情</p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
        <trade-panel v-show="showTrade" @closeTrade="closeTradePanel" :name="currentChoiceFOF" :account="currentAccount" :avliableAccount="currentAvliableAccount" :type="currentType" :typeName="currentTypeName" :price="currentChoiceFOFPrice" :fofId="currentChoiceFOFId" :avliableSellAccount="currentSellAmount" @updateData="updateData">
        </trade-panel>
    </section>
</template>
<script>
import BScroll from 'better-scroll'
import tradePanel from '../common/tradePanel'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../config/response'
import {
    assetDetailList,
} from '../../service/getData'

export default {
    components: {
        tradePanel
    },
    props: ["assetFOFList", "cash", "uid", "tradeFlag"],
    data() {
        return {
            changeMarketType: 'postion', //切换主要市场
            type: '0', //推荐组合和自配组合
            opType: '0', //交易类型，0、虚拟盘；1、实盘
            assetDetailList: '', //持仓明细
            currentChoiceFOFId: '', //当前选择买卖的FOF的ID
            currentChoiceFOF: '', //当前选择买卖的FOF
            currentChoiceFOFName: '', //当前选择买卖的FOF用户控制开启或者关闭下单面板
            canTrade: true, //持仓是否能够交易
            showTrade: false, //是否显示下单面板
            currentAccount: 0, //当前FOF用户持有的数量
            currentSellAmount: 0, //当前FOF用户可卖数量
            currentAvliableAccount: 0, //当前FOF可购买数量
            currentType: 0, //当前下单面板的类型
            currentTypeName: '买入', //当前下单面板的类型名称
            currentChoiceFOFPrice: 0, //当前FOF的价格
        }
    },

    watch: {
        assetFOFList: function(value) {
            this.assetDetailList = value;
        }
    },
    created() {
        this.changeMarketType = this.$route.query.queryType;
        this.assetType = this.$route.query.type;
        if (this.$route.query.type) {
            if (this.$route.query.type == 'commend') {
                this.type == 0;
            } else {
                this.type == 1;
            }
        }
        if (this.$route.query.opType) {
            if (this.$route.query.opType == 'virtual') {
                this.opType == 0;
            } else {
                this.opType == 1;
            }
        }
        this.initData();
    },

    methods: {
        //初始化获取数据
        async initData() {
            // this.assetDetailList = await assetDetailList(this.type);
        },

        //打开和关闭FOF的点击下拉菜单
        changeFOF(fofId, name, amount, price,sellAmount) {
            this.showTrade = false;
            if (this.currentChoiceFOFName == name) {
                this.currentChoiceFOFName = '';
            } else {
                this.currentChoiceFOFName = name;
            }
            this.currentChoiceFOF = name;
            this.currentAccount = amount;
            this.currentSellAmount = sellAmount;
            this.currentChoiceFOFId = fofId;
            this.currentChoiceFOFPrice = price;
            if (this.cash) {
                try{
                    this.currentAvliableAccount = parseInt(parseFloat(this.cash.replace(",", "")) / parseFloat(price.replace(",","")));
                }catch(e){
                    this.currentAvliableAccount = parseInt(parseFloat(this.cash.replace(",", "")) / parseFloat(price)); 
                }

            }

        },

        //显示下单面板
        showTradePanel(type, typeName) {
            this.showTrade = true;
            this.currentChoiceFOFName = '';
            this.currentType = type;
            this.currentTypeName = typeName;
        },

        closeTradePanel() {
            this.showTrade = false;
        },

        updateData(){
            this.$emit('updateData');
        }

    }

}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.menu {
    padding-top: $containerTop;
}

.detail-list-container {
    padding-bottom: 1rem;
    .detail-list-top {
        width: 100%;
        border-bottom: solid $lineGrey4 0.05rem;
        .detail-list-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            padding: 0.4rem 0rem;
        }
        .detail-list-li {
            float: left;
            width: 22%;
            p {
                @include sc(.6rem, $fontColor);
                text-align: center;
            }
        }
        .detail-list-li:first-child {
            width: 34%;
        }
    }
    .detail-list-content {
        width: 100%;
        z-index: 1;
        .detail-item {
            width: 100%;
            min-height: 2.5rem;
            position: relative;
            .detail-list-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                padding: 0.4rem 0rem;
                border-bottom: solid 0.05rem $lineGrey4;
            }
            .detail-list-li {
                float: left;
                width: 22%;
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
            }
            .detail-list-li:first-child {
                width: 34%;
            }
            .up .detail-list-li {
                p {
                    color: $green;
                }
            }
            .down .detail-list-li {
                p {
                    color: $red;
                }
            }
            .white .detail-list-li {
                p {
                    color: $white;
                }
            }
            .manager-list-ul {
                position: absolute;
                bottom: -1.7rem;
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
                padding: 0.4rem 0rem;
                background: #000;
                z-index: 100;
            }
            .manager-list-li {
                float: left;
                width: 33.33%;
                border-right: solid $grey 0.05rem;
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
            }
        }
    }
    .no-record {
        text-align: center;
        padding: 1rem;
        @include sc(.65rem, $fontGreyColor2);
    }
}
</style>
