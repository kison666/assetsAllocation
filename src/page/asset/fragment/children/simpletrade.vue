<template>
    <section class="asset-container">
        <section class="content-container">
            <p class="close-trade" @click="closeTrade()">
                <svg fill="#bbb">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cancel"></use>
                </svg>
            </p>
            <section class="show-list-container">
                <ul class="manager-list-ul">
                    <li class="manager-list-li" :class="{active:currentManagerType==0}" @click="changeManagerType(0,'买入')">
                        <p class="icon" v-show="currentManagerType!=0">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#postion"></use>
                            </svg>
                        </p>
                        <p class="icon" v-show="currentManagerType==0">
                            <svg fill="#3190e8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#postion"></use>
                            </svg>
                        </p>
                        <p>买入</p>
                    </li>
                    <li class="manager-list-li" :class="{active:currentManagerType==1}" @click="changeManagerType(1,'卖出')">
                        <p class="icon" v-show="currentManagerType!=1">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#query"></use>
                            </svg>
                        </p>
                        <p class="icon" v-show="currentManagerType==1">
                            <svg fill="#3190e8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#query"></use>
                            </svg>
                        </p>
                        <p>卖出</p>
                    </li>
                    <router-link class="myorder" :to="{path: '/profile/asset/query', query:{type:0,cur:0,t:1,ot:0,title:'历史委托'}}">
                        <li class="manager-list-li" :class="{active:currentManagerType==2}" @click="changeManagerType(2,'委托状态')">
                            <p class="icon" v-show="currentManagerType!=2">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#entrust"></use>
                                </svg>
                            </p>
                            <p class="icon" v-show="currentManagerType==2">
                                <svg fill="#3190e8">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#entrust"></use>
                                </svg>
                            </p>
                            <p>委托状态</p>
                        </li>
                    </router-link>
                </ul>
            </section>
            <!-- 下单内容区 -->
            <!-- 买入-->
            <section class="trade-container" v-show="currentManagerType==0">
                <ul class="trade-content-ul">
                    <li class="trade-content-li">
                        <section class="select_container">
                            <!-- <label>FOF类型</label> -->
                            <p class="arrow-down">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-down"></use>
                                </svg>
                            </p>
                            <select name="FOFType" v-model="FOFType">
                                <option value="-1">FOF组合</option>
                                <option v-for="(item, index) in FOFList" :value="item.fofId" v-cloak>{{item.name}}</option>
                            </select>
                        </section>
                        <div class="cash-container">
                            <p>预计使用资金：<span v-cloak>{{useCash}}</span></p>
                        </div>
                        <ul class="computer-ul">
                            <li @click="reduceAccount()">
                                <p>
                                    <span class="arrow-down">
                                        <svg fill="#bbb">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#num-reduce"></use>
                                        </svg>
                                    </span>
                                </p>
                            </li>
                            <li>
                                <input type="number" placeholder="数量" v-model="FOFAccount">
                            </li>
                            <li @click="addAccount()">
                                <p>
                                    <span class="arrow-down">
                                        <svg fill="#bbb">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#num-add"></use>
                                        </svg>
                                    </span>
                                </p>
                            </li>
                        </ul>
                        <div class="show-container">
                            <p>可买<span v-cloak>{{avliableAccount}}</span>股</p>
                        </div>
                        <ul class="postion-ul" :class="{red:currentManagerType ==0}">
                            <li @click="inputAmountClick(0)">
                                <p :class="{active:inputAmountType ==0}">全仓</p>
                            </li>
                            <li @click="inputAmountClick(1)">
                                <p :class="{active:inputAmountType ==1}">半仓</p>
                            </li>
                            <li @click="inputAmountClick(2)">
                                <p :class="{active:inputAmountType ==2}">1/3仓</p>
                            </li>
                            <li @click="inputAmountClick(3)">
                                <p :class="{active:inputAmountType ==3}">1/4仓</p>
                            </li>
                        </ul>
                    </li>
                    <li class="trade-content-li">
<!--                         <router-link :to="{path: '/my/hisincome', query:{fofId:FOFType,fofName:FOFName}}" v-if="FOFType !=-1"> -->
                            <p class="history-button-active" @click="showHostoryIncome()" v-if="FOFType !=-1">查看历史收益</p>
                        <!-- </router-link> -->
                            <p class="history-button" v-else>查看历史收益</p>
                        <ul class="deal-ul">
                            <li>
                                <p>买一:<span class="red" v-cloak>{{buyOnePrice}}</span></p>
                            </li>
                            <li>
                                <p>卖一:<span class="green" v-cloak>{{sellOnePrice}}</span></p>
                            </li>
                        </ul>
                        <p class="tip">说明：行情仅供参考，下单以市价（与当前盘口行情有差距）成交。</p>
                    </li>
                </ul>
                <div class="confirm-content">
                    <div class="trade-confirm" :class="{active_buy:FOFAccount>0 }" v-show="currentManagerType ==0" @click="buyFOF" v-cloak>确定{{currentManagerTypeName}}</div>
                    <!--                     <div class="trade-confirm" :class="{active_sell:FOFAccount>0 }" v-show="currentManagerType ==1">确定{{currentManagerTypeName}}</div> -->
                </div>
            </section>
            <!-- 卖出 -->
            <section class="trade-container" v-show="currentManagerType==1">
                <ul class="trade-content-ul">
                    <li class="trade-content-li">
                        <section class="select_container">
                            <!-- <label>FOF类型</label> -->
                            <p class="arrow-down">
                                <svg fill="#bbb">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-down"></use>
                                </svg>
                            </p>
                            <select name="FOFType" v-model="FOFType">
                                <option value="-1">FOF组合</option>
                                <option v-for="(item, index) in FOFList" :value="item.fofId" v-cloak>{{item.name}}</option>
                            </select>
                        </section>
                        <div class="cash-container">
                            <p><span v-cloak>{{useSellCash}}</span></p>
                        </div>
                        <ul class="computer-ul">
                            <li @click="sellReduceAccount()">
                                <p>
                                    <span class="arrow-down">
                                        <svg fill="#bbb">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#num-reduce"></use>
                                        </svg>
                                    </span>
                                </p>
                            </li>
                            <li>
                                <input type="text" placeholder="数量" v-model="FOFAccount">
                            </li>
                            <li @click="sellAddAccount()">
                                <p>
                                    <span class="arrow-down">
                                        <svg fill="#bbb">
                                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#num-add"></use>
                                        </svg>
                                    </span>
                                </p>
                            </li>
                        </ul>
                        <div class="show-container">
                            <p>可卖<span v-cloak>{{avliableSellAccount}}</span>股</p>
                        </div>
                        <ul class="postion-ul" :class="{green:currentManagerType ==1}">
                            <li @click="inputAmountClick(0)">
                                <p :class="{active:inputAmountType ==0}">全仓</p>
                            </li>
                            <li @click="inputAmountClick(1)">
                                <p :class="{active:inputAmountType ==1}">半仓</p>
                            </li>
                            <li @click="inputAmountClick(2)">
                                <p :class="{active:inputAmountType ==2}">1/3仓</p>
                            </li>
                            <li @click="inputAmountClick(3)">
                                <p :class="{active:inputAmountType ==3}">1/4仓</p>
                            </li>
                        </ul>
                    </li>
                    <li class="trade-content-li">
<!--                         <router-link :to="{path: '/my/hisincome', query:{fofId:FOFType,fofName:FOFName}}" v-if="FOFType !=-1"> -->
                            <p class="history-button-active" @click="showHostoryIncome()" v-if="FOFType !=-1">查看历史收益</p>
                        <!-- </router-link> -->
                            <p class="history-button" v-else>查看历史收益</p>
                        <ul class="deal-ul">
                            <li>
                                <p>买一:<span class="red" v-cloak>{{buyOnePrice}}</span></p>
                            </li>
                            <li>
                                <p>卖一:<span class="green" v-cloak>{{sellOnePrice}}</span></p>
                            </li>
                        </ul>
                        <p class="tip">说明：行情仅供参考，下单以市价（与当前盘口行情有差距）成交。</p>
                    </li>
                </ul>
                <div class="confirm-content">
                    <!--                     <div class="trade-confirm" :class="{active_buy:FOFAccount>0 }" v-show="currentManagerType ==0" @click="buyFOF">确定{{currentManagerTypeName}}</div> -->
                    <div class="trade-confirm" :class="{active_sell:FOFAccount>0 }" v-show="currentManagerType ==1" @click="sellFOF" v-cloak>确定{{currentManagerTypeName}}</div>
                </div>
            </section>
        </section>
        <transition name="waiting">
            <waiting v-show="showWaiting"></waiting>
        </transition>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <alert-multi-tip v-if="showMAlert" :showHide="showMAlert" @closeTip="closeMTip" :alertText="alertMText" @confrimTip="confrimTip"></alert-multi-tip>
    </section>
</template>
<script>
import BScroll from 'better-scroll'
import assetShow from '../../../../components/common/assetShow'
import assetMenu from '../../../../components/common/assetMenu'
import assetPie from '../../../../components/common/assetPieChart'
import waiting from '../../../../components/common/waiting'
import alertTip from '../../../../components/common/alertTip'
import alertMultiTip from '../../../../components/common/alertMultiTip'
import {
    Toast,
    Indicator
} from 'mint-ui'
import {
    REQ_TYPE_SIMPLE_FOF,
    SOCKET_URL_FOF_LIST
} from '../../../../config/const'
import {
    assetSimpleFOFSell,
    assetSimpleFOFBuy,
    assetFOFList
} from '../../../../service/getData'
import {
    getToken,
    getAssetFOFList,
    getAssetFOFTypeList,
} from '../../../../store/store'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_ERROR_SYSTEM,
    RESPONSE_CODE_ERROR_TOKEN
} from '../../../../config/response'
export default {
    components: {
        assetShow,
        assetMenu,
        assetPie,
        waiting,
        alertTip,
        alertMultiTip
    },

    data() {
        return {
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            showMAlert: false, //显示M提示组件
            alertMText: null, //提示M的内容
            showWaiting: false, //显示等待动画
            currentManagerType: 0, //当前的操作类型
            currentManagerTypeName: '买入', //当前的操作类型名称
            FOFAccount: '', //输入的数量
            avliableAccount: 0, //可买股数
            useCash: 0, //预计使用资金
            FOFType: -1, //FOF类型名称
            orderNo: '', //合同号
            FOFList: '', //FOF类型列表
            FOFList1: '', //FOF类型列表(不可改变)
            FOFPrice: '市价委托', //FOF价格
            // socketFOFData: '', //资产包的信息
            lockReconnect: false, //避免重复发起连接
            conn: null, //socket连接
            isDestory: false, //socket是否关闭
            currentFOFType: false, //当前FOF是否能卖
            useSellCash: 0, //预计卖出现金
            avliableSellAccount: 0, //可卖股数
            buyOnePrice: '--', //买1的价格
            sellOnePrice: '--', //卖1的价格
            FOFName: '', //当前FOF的名称
            inputAmountType: -1, //快速全仓、半仓的按钮类型
            isTradeTime:false,//是否是交易时间
        }
    },
    props: ['changeMarketType', 'currentChoiceType1', 'assetFOFListData', 'cash', 'socketFOFData', 'tradeFlag'],

    created() {
        this.initData();
    },

    watch: {
        // 监听input输入
        FOFAccount: function(value) {
            if (value.length > 1) {
                if (value.indexOf('0') == 0) {
                    this.FOFAccount = value.substring(1);
                    value = value.substring(1);
                }
            }
            if (value < 0) {
                this.FOFAccount = 0;
            }
            if (this.currentManagerType == 0) {
                if (value > this.avliableAccount) {
                    this.FOFAccount = this.avliableAccount;
                }
            } else if (this.currentManagerType == 1) {
                if (value > this.avliableSellAccount) {
                    this.FOFAccount = this.avliableSellAccount;
                }
            }

            this.updateAmountAndCash();
        },
        FOFType: function(value) {
            // this.getFOFDataByType(this);
            this.FOFAccount = 0;
            if (value == -1) {
                this.FOFPrice = "市价委托";
                this.avliableAccount = 0;
                this.avliableSellAccount = 0;
                this.buyOnePrice = '--';
                this.sellOnePrice = '--';
                this.useCash = 0;
                this.useSellCash = 0;
            }
            if (this.currentManagerType == 0) {
                if (this.socketFOFData) {
                    try {
                        for (let i = 0; i < this.socketFOFData.length; i++) {
                            if (this.socketFOFData[i]["fofId"] == this.FOFType) {
                                this.FOFPrice = this.socketFOFData[i]["price"];
                                this.buyOnePrice = this.socketFOFData[i]["bidPrice"];
                                this.sellOnePrice = this.socketFOFData[i]["askPrice"];
                                this.FOFName = this.socketFOFData[i]["symbolName"] + this.socketFOFData[i]["symbolNum"];
                            }
                        }
                    } catch (e) {

                    }
                } else {
                    try {
                        for (let i = 0; i < this.FOFList.length; i++) {
                            if (this.FOFList[i]["fofId"] == this.FOFType) {
                                this.FOFPrice = this.FOFList[i]["price"];
                                this.buyOnePrice = this.FOFList[i]["bidPrice"];
                                this.sellOnePrice = this.FOFList[i]["askPrice"];
                                this.FOFName = this.FOFList[i]["name"];
                            }
                        }
                    } catch (e) {

                    }
                }
            } else if (this.currentManagerType == 1) {
                this.avliableSellAccount = 0;
                this.useSellCash = 0;
                if (!this.assetFOFListData) {
                    return;
                }
                for (let i = 0; i < this.assetFOFListData.length; i++) {
                    if (this.assetFOFListData[i]["fofId"] == this.FOFType) {

                        if (this.FOFPrice == "市价委托") {
                            this.FOFPrice = this.assetFOFListData[i]["currentPrice"];
                        }
                        this.currentFOFType = true;
                        this.avliableSellAccount = this.assetFOFListData[i]["amount"];
                        this.FOFName = this.assetFOFListData[i]["name"]; 
                        break;
                    } else {
                        this.currentFOFType = false;
                    }
                }
            }
            if (this.socketFOFData) {
                    try {
                        for (let i = 0; i < this.socketFOFData.length; i++) {
                            if (this.socketFOFData[i]["fofId"] == this.FOFType) {
                                this.buyOnePrice = this.socketFOFData[i]["bidPrice"];
                                this.sellOnePrice = this.socketFOFData[i]["askPrice"];
                                   this.FOFName = this.socketFOFData[i]["symbolName"] + this.socketFOFData[i]["symbolNum"]; 
                            }
                        }
                    } catch (e) {

                    }
                }  
        },
        FOFPrice: function(value) {
            if (this.currentManagerType == 0) {
                if (value != "市价委托") {
                    try {
                        this.avliableAccount = parseInt((parseFloat(this.cash.replace(",", "")) / parseFloat(value.replace(",", ""))));
                        this.useCash = (this.FOFAccount * (value.replace(",", ""))).toFixed(2);
                    } catch (e) {

                    }
                }
            } else if (this.currentManagerType == 1) {

                if (value != "市价委托") {
                    try {
                        for (let i = 0; i < this.assetFOFListData.length; i++) {
                            if (this.assetFOFListData[i]["fofId"] == this.FOFType) {
                                this.avliableSellAccount = this.assetFOFListData[i]["amount"];
                                this.useSellCash = (this.FOFAccount * parseFloat(this.FOFPrice.replace(",", ""))).toFixed(2);

                            }
                        }
                    } catch (e) {
                        this.useSellCash = (this.FOFAccount * parseFloat(this.FOFPrice)).toFixed(2);
                    }
                }
            }
        },
        socketFOFData: function(value) {
            if (value && this.currentManagerType == 1) {
                try {
                    for (let i = 0; i < value.length; i++) {
                        if (value[i]["fofId"] == this.FOFType) {
                            this.FOFPrice = value[i]["price"];
                            this.buyOnePrice = this.socketFOFData[i]["bidPrice"];
                            this.sellOnePrice = this.socketFOFData[i]["askPrice"];
                            this.FOFName = this.socketFOFData[i]["symbolName"] + this.socketFOFData[i]["symbolNum"];

                        }
                    }
                } catch (e) {

                }
            } else if (value && this.currentManagerType == 0) {
                try {
                    for (let i = 0; i < value.length; i++) {
                        if (value[i]["fofId"] == this.FOFType) {
                            this.FOFPrice = value[i]["price"];
                            this.buyOnePrice = this.socketFOFData[i]["bidPrice"];
                            this.sellOnePrice = this.socketFOFData[i]["askPrice"];
                            this.FOFName = this.socketFOFData[i]["symbolName"];
                        }
                    }
                } catch (e) {

                }
            }

        },
        assetFOFListData: function(value) {

            if (value && this.currentManagerType == 1) {
                try {
                    let FOFdata = value;
                    for (let i = 0; i < FOFdata.length; i++) {
                        if (FOFdata[i]["fofId"] == this.FOFType) {
                            this.currentFOFType = true;
                            break;
                        } else {
                            this.currentFOFType = false;
                        }
                    }
                } catch (e) {

                }
            }
        },
        FOFList: function(value) {},
        currentManagerType: function(value) {
            let tmpList = [];
            let count = 0;
            if (value == 1 && this.assetFOFListData) {
                for (let i = 0; i < this.FOFList.length; i++) {
                    for (let j = 0; j < this.assetFOFListData.length; j++) {
                        if (this.FOFList[i]['fofId'] == this.assetFOFListData[j]['fofId']) {
                            tmpList[count] = this.FOFList[i];
                            count++;
                        }
                    }
                }
                this.FOFList = tmpList;
            } else if (value == 0) {
                this.FOFList = this.FOFList1;
            }
        }

    },
    methods: {
        //初始化获取数据
        initData() {
            // this.requestFOFList();
            // this.getFOFDataByType(this);
            this.useSellCash = 0;
            this.avliableSellAccount = 0;
            this.avliableAccount = 0;
            this.useCash = 0;
            this.FOFList = JSON.parse(getAssetFOFTypeList());
            this.FOFList1 = this.FOFList;
        },

        //买FOF的按钮
        buyFOF() {
            if (this.FOFType < 0) {
                this.showAlert = true;
                this.alertText = "FOF类型不能为空";
                return;
            } else if (this.FOFAccount == '' || this.FOFAccount <= 0) {
                this.showAlert = true;
                this.alertText = "FOF的数量不能为0";
                return;
            }
            this.showMAlert = true;
            let tmpType = '买入:';
            this.alertMText = tmpType + this.FOFName + " 数量:" + this.FOFAccount + "股";
        },

        //卖FOF的按钮
        sellFOF() {
            if (!this.currentFOFType) {
                this.showAlert = true;
                this.alertText = "当前FOF不能卖";
                return;
            }
            if (this.FOFType < 0) {
                this.showAlert = true;
                this.alertText = "FOF类型不能为空";
                return;
            } else if (this.FOFAccount == '' || this.FOFAccount <= 0) {
                this.showAlert = true;
                this.alertText = "FOF的数量不能为0";
                return;
            }
            this.showMAlert = true;
            let tmpType = '卖出:';
            this.alertMText = tmpType + this.FOFName + " 数量:" + this.FOFAccount + "股";
        },

        //确认下单
        confrimTip() {
            if (this.currentManagerType == 0) {
                this.requestFOFBuy();
            } else if (this.currentManagerType == 1) {
                this.requestFOFSell();
            }
            this.closeMTip();
        },

        //获取FOF列表 
        requestFOFList() {

            this.showLoading = true;
            let handler = this;
            assetFOFList(function(ret) {
                handler.responseFOFList(ret);
            });
        },

        responseFOFList(ret) {
            Indicator.close();
            let response = responseResult(this, ret, 1, 1);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.FOFList = ret.retData.fofArr;
            }
        },

        requestFOFBuy() {

            this.showWaiting = true;
            let handler = this;
            assetSimpleFOFBuy(this.FOFType, this.FOFAccount, function(ret) {
                handler.response(ret);
            });
        },

        response(ret) {
            this.hideWaiting();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA || response == RESPONSE_CODE_ERROR_SYSTEM) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.orderNo = ret.retData.contractNo;
                this.isTradeTime = ret.retData.isTradeTime;
                let tmpType = '委托';
                if (this.isTradeTime == true) {
                    tmpType = '买入';
                }
                Toast({
                    message: tmpType + "成功,合同编号为：" + this.orderNo,
                    position: 'middle',
                    duration: 4000,
                    iconClass: 'mint-toast-icon mintui mintui-success'
                });
                this.closeTrade();

            }
        },

        requestFOFSell() {

            this.showWaiting = true;
            let handler = this;
            assetSimpleFOFSell(this.FOFType, this.FOFAccount, function(ret) {
                handler.responseSell(ret);
            });
        },

        responseSell(ret) {
            this.hideWaiting();
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA || response == RESPONSE_CODE_ERROR_SYSTEM) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.orderNo = ret.retData.contractNo;
                this.isTradeTime = ret.retData.isTradeTime;
                let tmpType = '委托卖出';
                if (this.isTradeTime == true) {
                    tmpType = '卖出';
                }
                Toast({
                    message: tmpType + "成功,合同编号为：" + this.orderNo,
                    position: 'middle',
                    duration: 4000,
                    iconClass: 'mint-toast-icon mintui mintui-success'
                });
                this.closeTrade();

            }
        },

        //改变操作类型
        changeManagerType(type, typeName) {
            this.currentManagerType = type;
            this.currentManagerTypeName = typeName;
            this.useSellCash = 0;
            this.inputAmountType = -1;
            // this.avliableSellAccount = 0;
            // this.avliableAccount = 0;
            this.useCash = 0;
            this.FOFAccount = 0;
            this.FOFType = -1;


        },

        inputAmountClick(type) {
            this.inputAmountType = type;
            if (this.currentManagerType == 0) {
                if (type == 0 && this.avliableAccount > 0) {
                    this.FOFAccount = this.avliableAccount;
                } else if (type == 1 && this.avliableAccount > 2) {

                    this.FOFAccount = (this.avliableAccount / 2).toFixed(0);
                } else if (type == 2 && this.avliableAccount > 3) {

                    this.FOFAccount = (this.avliableAccount / 3).toFixed(0);;

                } else if (type == 3 && this.avliableAccount > 4) {
                    this.FOFAccount = (this.avliableAccount / 4).toFixed(0);
                } else {
                    this.FOFAccount = 1;
                }
            } else {
                if (type == 0 && this.avliableSellAccount > 0) {
                    this.FOFAccount = this.avliableSellAccount;
                } else if (type == 1 && this.avliableSellAccount > 2) {

                    this.FOFAccount = (this.avliableSellAccount / 2).toFixed(0);
                } else if (type == 2 && this.avliableSellAccount > 3) {

                    this.FOFAccount = (this.avliableSellAccount / 3).toFixed(0);;

                } else if (type == 3 && this.avliableSellAccount > 4) {
                    this.FOFAccount = (this.avliableSellAccount / 4).toFixed(0);
                } else {
                    this.FOFAccount = 1;
                }
            }
        },

        //实时更新可用股数和可用资金
        updateAmountAndCash() {
            if (this.currentManagerType == 0 && this.FOFType != -1) {
                //根据价格和可用资金进行变化
                if (this.cash) {
                    try {

                        this.avliableAccount = parseInt((parseFloat(this.cash.replace(",", "")) / parseFloat(this.FOFPrice.replace(",", ""))));
                        this.useCash = (this.FOFAccount * (this.FOFPrice.replace(",", ""))).toFixed(2);

                    } catch (e) {
                        this.avliableAccount = parseInt((parseFloat(this.cash.replace(",", "")) / parseFloat(this.FOFPrice)));
                        this.useCash = (this.FOFAccount * (this.FOFPrice)).toFixed(2);
                    }
                }

            } else if (this.currentManagerType == 1 && this.FOFType != -1) {
                //根据价格
                try {
                    this.useSellCash = (this.FOFAccount * parseFloat(this.FOFPrice.replace(",", ""))).toFixed(2);
                } catch (e) {
                    this.useSellCash = (this.FOFAccount * parseFloat(this.FOFPrice)).toFixed(2);
                }
            }
        },

        //更新可卖的FOF列表
        updateSellFofList() {

        },


        reduceAccount() {
            this.inputAmountType = -1;
            if (this.FOFAccount > 0) {
                this.FOFAccount--;
            } else {
                this.FOFAccount = 0;
            }
        },

        addAccount() {
            this.inputAmountType = -1;
            if (this.FOFAccount < this.avliableAccount) {
                this.FOFAccount++;
            }
        },
        sellReduceAccount() {
            this.inputAmountType = -1;
            if (this.FOFAccount > 0) {
                this.FOFAccount--;
            }
        },

        sellAddAccount() {
            this.inputAmountType = -1;
            if (this.FOFAccount < this.avliableSellAccount) {
                this.FOFAccount++;
            }
        },
        closeTip() {
            this.showAlert = false;
        },
        closeMTip() {
            this.showMAlert = false;
        },
        closeTrade() {
            this.$emit('closeTrade');
        },
        //生产环境与发布环境隐藏loading方式不同
        hideWaiting() {
            if (process.env.NODE_ENV !== 'development') {
                clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer);
                    this.showWaiting = false;
                }, 400)
            } else {
                this.showWaiting = false;
            }
        },

        showHostoryIncome(){
            this.$emit('showHostoryIncome',[this.FOFType,this.FOFName]);
        }
    },

    destroyed() {
        // setMarketState('main');
        this.isDestory = true;
        try {
            if (this.conn) {
                this.conn.onclose();
                this.conn.close();
            }
        } catch (e) {}

    }

}
</script>
<style lang="scss" scoped>
@import '../../../../style/mixin';
.asset-container {
    position: fixed;
    bottom: 0rem;
    left: 0rem;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 101;
    .content-container {
        width: 100%;
        position: absolute;
        bottom: 0rem;
        left: 0rem;
        height: 15rem;
        background-color: $grey1;
        padding: .3rem;
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
        .show-list-container {
            margin-top: 1.2rem;
            .manager-list-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 80%;
                border: solid 0.05rem $grey2;
            }
            .manager-list-li {
                float: left;
                width: 30%;
                padding-top: 0.2rem;
                padding-bottom: .2rem;
                text-align: center;
                border-right: solid 0.05rem $grey2;
                p {
                    float: left;
                    @include sc(.65rem, $fontGreyColor2);
                    text-align: center;
                }
                img {
                    width: 1rem;
                    margin: auto;
                }
                .icon {
                    @include wh(1rem, .8rem);
                    margin: auto;
                    margin-bottom: 0.1rem;
                    margin-right: 0.2rem;
                    margin-left: 15%;
                    svg {
                        @include wh(100%, 100%);
                    }
                }
            }
            .manager-list-li:last-child {
                width: 40%;
                .icon {
                    margin-left: 10%;
                }
                border-right: none 0.05rem $grey2;
            }
            .active {
                background-color: $grey;
                p {
                    color: $blue;
                }
            }
        }
        .trade-container {
            margin-top: .8rem;
            .trade-content-ul {
                list-style: none;
                margin: 0 auto;
                overflow: hidden;
                width: 100%;
            }
            .trade-content-li:first-child {
                float: left;
                width: 60%;
                text-align: center;
                .select_container {
                    width: 100%;
                    background: #333;
                    z-index: 100;
                    border: solid 0.05rem $blue;
                    justify-content: space-between;
                    padding: .3rem 0rem .3rem .8rem;
                    padding-top: .1rem;
                    position: relative;
                    height:1.6rem;
                    select {
                        position: absolute;
                        left: 0.3rem;
                        top: 0.15rem;
                        width: 95%;
                        margin-right: 0rem;
                        @include sc(.65rem, $fontColor);
                        background-color: transparent;
                        
                        height: 1.2rem;
                        option {
                            @include sc(.55rem, $fontColor);
                            z-index: 10;
                        }
                        z-index:10;
                    }
                    .right-content {
                        float: right;
                        margin-right: 0.8rem;
                        margin-top: 0.25rem;
                        @include sc(.55rem, $fontColor);
                    }
                    .arrow-down {
                        position: absolute;
                        right: 0.3rem;
                        top: 0.2rem;
                        margin-right: 0rem;
                        z-index: 1;
                        @include wh(.6rem, .6rem);
                        svg {
                            @include wh(100%, 100%);
                            z-index: 1;
                        }
                    }
                }
                .computer-ul {
                    list-style: none;
                    margin: 0 auto;
                    overflow: hidden;
                    width: 100%;
                    padding: 0rem 0rem;
                    margin-top: .1rem;
                    background: #333;
                    z-index: 100;
                    border: solid 0.05rem $blue;
                    li {
                        float: left;
                        width: 25%;
                        padding: 0rem .5rem;
                        p {
                            @include sc(1rem, $blue);
                            line-height: 1.2rem;
                            .arrow-down {
                                margin-top: 0.25rem;
                                margin-right: 0.2rem;
                                float: right;
                                @include wh(.8rem, .8rem);
                                svg {
                                    @include wh(100%, 100%);
                                }
                            }
                        }
                        input {
                            width: 100%;
                            height: 100%;
                            background-color: transparent;
                            @include sc(.65rem, $fontGreyColor2);
                            padding: 0rem .1rem;
                            text-align: center;
                            margin-bottom: .4rem;
                        }
                        .input-price {
                            width: 100%;
                            height: 100%;
                            background-color: transparent;
                            @include sc(.65rem, $fontGreyColor2);
                            padding: 0rem .1rem;
                            line-height: 1.7rem;
                            text-align: center;
                        }
                    }
                    li:nth-child(2) {
                        width: 50%;
                        text-align: center;
                        border: solid 0.05rem $blue;
                        border-style: none solid none solid;
                    }
                }
                .show-container {
                    padding-top: .2rem;
                    margin-bottom: .3rem;
                    p {
                        @include sc(.55rem, $fontGreyColor2);
                        text-align: left;
                        span {
                            color: $red;
                        }
                    }
                }
                .cash-container {
                    padding-top: .4rem;
                    p {
                        @include sc(.55rem, $fontGreyColor2);
                        text-align: center;
                        span {}
                    }
                }
                .postion-ul {
                    list-style: none;
                    margin: 0 auto;
                    overflow: hidden;
                    width: 100%;
                    padding: 0rem 0rem;
                    margin-top: .2rem;
                    z-index: 100;
                    li {
                        float: left;
                        width: 25%;
                        padding: 0rem 0.1rem;
                        p {
                            @include sc(.55rem, $fontGreyColor);
                            background-color: $grey2;
                            padding: .1rem 0rem;
                        }
                        .active {
                            background-color: $red;
                        }
                    }
                }
                .red {
                    li {
                        .active {
                            background-color: $red;
                        }
                    }
                }
                .green {
                    li {
                        .active {
                            background-color: $green;
                        }
                    }
                }
            }
            .trade-content-li:last-child {
                float: left;
                width: 40%;
                text-align: center;
                padding-left: .2rem;
                .history-button {
                    @include sc(.65rem, $fontGreyColor);
                    background-color: $grey2;
                    padding: .3rem .6rem;
                }
                .history-button-active {
                    @include sc(.65rem, $fontGreyColor);
                    background-color: $blue;
                    padding: .3rem .6rem;
                }
                .deal-ul {
                    margin-top: .45rem;
                    border: solid 0.05rem $grey2;
                    width: 100%;
                    background-color: $grey;
                    li {
                        padding: .37rem;
                        p {
                            @include sc(.65rem, $fontGreyColor);
                            text-align: left;
                        }
                    }
                    li:first-child {
                        border-bottom: solid 0.05rem $grey2;
                    }
                }
                .tip {
                    margin-top: .2rem;
                    @include sc(.55rem, $fontGreyColor2);
                }
            }
        }
        .confirm-content {
            width: 100%;
            padding: .6rem 0rem;
            padding-bottom: 0rem;
            z-index: 102;
            div {
                width: 100%;
                padding: .3rem .6rem;
                @include sc(.75rem, $fontGreyColor);
                background-color: $grey2;
                text-align: center;
            }
            .active_buy {
                background-color: $red;
                color: $fontColor
            }
            .active_sell {
                background-color: $green;
                color: $fontColor
            }
        }
    }
}
</style>
