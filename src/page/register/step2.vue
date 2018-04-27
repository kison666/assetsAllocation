<template>
    <div class="restContainer">
        <head-top head-title="填写基本信息" goBack="true"></head-top>
        <form class="restForm">
            <div class="child-container">
                <section class="title_container"><span>家庭信息</span></section>
                <section class="select_container">
                    <label>家庭成员个数</label>
                    <select dir="rtl" name="familyCount" v-model="familyCount">
                        <option value="-1">(不包含自己)</option>
                        <option value="1">1个</option>
                        <option value="2">2个</option>
                        <option value="3">3个</option>
                        <option value="4">4个</option>
                        <option value="5">5个</option>
                        <option value="6">6个</option>
                    </select>
                    <p class="arrow-down">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </p>
                </section>
                <section class="select_container">
                    <label>婚姻状况</label>
                    <select dir="rtl" name="marriageInfo" v-model="marriageInfo">
                        <option value="-1">婚姻状况</option>
                        <option value="1">未婚</option>
                        <option value="2">已婚</option>
                        <option value="3">离异</option>
                        <option value="4">其它</option>
                    </select>
                    <p class="arrow-down">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </p>
                </section>
            </div>
            <div class="child-container">
                <section class="title_container"><span>职业信息</span></section>
                <section class="select_container">
                    <label>从事职业</label>
                    <select dir="rtl" name="professionType" v-model="professionType">
                        <option value="-1">选择职业</option>
                        <option value="0">受雇</option>
                        <option value="1">自主创业</option>
                        <!--                    <option value="1">无职业</option>-->
                    </select>
                    <p class="arrow-down">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </p>
                </section>
                <section class="select_container">
                    <label>所属行业</label>
                    <select dir="rtl" name="professionName" v-model="professionName">
                        <option value="-1">选择行业</option>
                        <option value="0">金融|银行|保险</option>
                        <option value="1">政府事业机构</option>
                        <option value="2">广告公关|媒体|艺术文化</option>
                        <option value="3">销售|贸易</option>
                        <option value="4">计算机|互联网|通信|点子技术</option>
                        <option value="5">生产制造|物流运输</option>
                        <option value="6">医药|化工</option>
                        <option value="7">建筑|房地产</option>
                        <option value="8">教育|法律</option>
                        <option value="9">餐饮|娱乐|美容</option>
                        <option value="10">其他</option>
                    </select>
                    <p class="arrow-down">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </p>
                </section>
                <section class="tip_container" v-show="professionName == 0">
                    <p class="tip-label">* 如果您是证监会(交易所)注册(从业人员)，我们需要您的雇主批准信才能开户</p>
                </section>
                <section class="select_container" @click="showAddressSelect = true">
                    <label>单位地址</label>
                    <p class="right-content">{{addressTotal}}</p>
                    <p class="arrow-down">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </p>
                </section>
                <address-select :showAddressSelect="showAddressSelect" v-on:listenChildChange="listenChildChange"></address-select>
                <section class="input_container">
                    <input type="text" placeholder="单位详细地址(街道,门牌号)" name="companyAddress" maxlength="100" v-model="companyAddress">
                </section>
                <section class="input_container">
                    <input type="text" placeholder="单位名称" name="companyName" maxlength="100" v-model="companyName">
                </section>
            </div>
            <div class="child-container">
                <section class="radio_container">
                    <div class="agree-content">
                        <p class="title"></p>
                        <p>账户所有人本人及其直系亲属是否为登记的证券经纪人，证券交易所、监管组织、证券或商品经纪公司的员工、关联人员、利害关系人？</p>
                    </div>
                    <ul class="agree-ul">
                        <li class="agree-li">
                            <input type="radio" name="isRelative" v-model="isRelative" value="1" />
                            <label class="radio-label">是</label>
                        </li>
                        <li class="agree-li">
                            <input type="radio" name="isRelative" v-model="isRelative" value="0" />
                            <label class="radio-label">否</label>
                        </li>
                    </ul>
                </section>
            </div>
            <div class="child-container">
                <section class="radio_container">
                    <div class="agree-content">
                        <p class="title"></p>
                        <p>账户持有人是否是一家公共上市公司的董事，持有10%股权的股东或决策人？</p>
                    </div>
                    <ul class="agree-ul">
                        <li class="agree-li">
                            <input type="radio" name="isDirector" v-model="isDirector" value="1" />
                            <label class="radio-label">是</label>
                        </li>
                        <li class="agree-li">
                            <input type="radio" name="isDirector" v-model="isDirector" value="0" />
                            <label class="radio-label">否</label>
                        </li>
                    </ul>
                </section>
            </div>
        </form>
        <div class="login_container" @click="nextButton">下一步</div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <waiting v-show="showWaiting"></waiting>
    </div>
</template>
<script>
import headTop from '../../components/header/head'
import alertTip from '../../components/common/alertTip'
import addressSelect from '../../components/common/addressSelect'
import waiting from '../../components/common/waiting'
import {
    registerStep2,
} from '../../service/getData'

import {
    responseRealName,
    responseResult,
    responseEmail,
    responseNameSpell,
    responseIdCardNo,
    responseIdCardAddr,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../config/response'

export default {
    data() {
            return {
                familyCount: -1, //家庭成员个数
                marriageInfo: -1, //婚姻状况
                professionType: -1, //从事职业类型
                professionName: -1, //从事行业
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                isRelative: '0', //是否账户所有人本人及其直系……
                isDirector: '0', //账户持有人是否是一家公共……
                companyAddress: '', //单位地址
                companyName: '', //单位名称
                showAddressSelect: 'false', //是否显示地址选择框
                addressProvince: '', //省份名称
                addressCity: '', //城市名称
                addressArea: '', //区名称
                addressTotal: '请选择', //地址选择区显示信息
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
                showWaiting: false, //显示加载动画
            }
        },
        components: {
            headTop,
            alertTip,
            addressSelect,
            waiting,
        },
        methods: {

            //监听子组件转过来的值
            async listenChildChange(province, city, area) {
                this.showAddressSelect = false;
                this.addressProvince = province;
                this.addressCity = city;
                this.addressArea = area;
                this.addressTotal = province + " " + city + " " + area;
            },
            //下一步
            async nextButton() {

                if (this.familyCount < 0) {
                    this.showAlert = true;
                    this.alertText = "请选择家庭成员个数";
                    return
                } else if (this.marriageInfo < 0) {
                    this.showAlert = true;
                    this.alertText = "请选择婚姻状况";
                    return
                } else if (this.professionType < 0) {
                    this.showAlert = true;
                    this.alertText = "请选择从事职业";
                    return
                } else if (this.professionName < 0) {
                    this.showAlert = true;
                    this.alertText = "请选择从事行业";
                    return
                } else if (this.addressProvince == '') {
                    this.showAlert = true;
                    this.alertText = "请选择省份";
                    return
                } else if (this.addressCity == '') {
                    this.showAlert = true;
                    this.alertText = "请选择城市";
                    return
                } else if (this.addressArea == '') {
                    this.showAlert = true;
                    this.alertText = "请选择地区";
                    return
                } else if (this.companyAddress == '') {
                    this.showAlert = true;
                    this.alertText = "请填写单位详细地址";
                    return
                } else if (this.companyName == '') {
                    this.showAlert = true;
                    this.alertText = "请填写单位名称";
                    return
                }

                this.showWaiting = true;
                // 发送下一步请求
                let handler = this;
                registerStep2(this.familyCount, this.marriageInfo, this.professionType, this.professionName, this.isRelative, this.isDirector, this.companyAddress, this.companyName, this.addressProvince, this.addressCity, this.addressArea, function(ret) {
                    handler.response(ret);
                });

            },
            response(ret) {
                this.hideWaiting();
                let response = responseResult(this, ret);
                if (response == RESPONSE_CODE_ERROR_DATA) {
                    this.showAlert = true;
                    this.alertText = ret.retMsg;
                    return
                } else if (response == RESPONSE_CODE_SUCCESS) {
                    this.$router.replace({
                        path: ret.retData.returnUrl
                    });
                    return;
                }
            },
            closeTip() {
                this.showAlert = false;
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
    .title_container {
        padding-left: 0.75rem;
        padding-bottom: 0.2rem;
        border-bottom: 1px solid #666;
        span {
            @include sc(.65rem, $fontGreyColor2);
        }
    }
    .input_container {
        display: flex;
        justify-content: space-between;
        padding: .6rem .8rem;
        border-bottom: 1px solid #666;
        input {
            width: 100%;
            background-color: transparent;
            @include sc(.7rem, $fontColor);
        }
        button {
            @include sc(.65rem, #fff);
            font-family: Helvetica Neue, Tahoma, Arial;
            padding: .28rem .4rem;
            border: 1px;
            border-radius: 0.15rem;
            background-color: $blue
        }
        .right_phone_number {
            background-color: #4cd964;
        }
        .checkbox-label {
            width: 100%;
            float: left;
            @include sc(.65rem, $fontColor);
            padding-left: .5rem;
            margin-top: -.15rem;
        }
    }
    .select_container {
        justify-content: space-between;
        padding: .3rem .8rem;
        border-bottom: 1px solid #666;
        position: relative;
        select {
            float: right;
            width: 60%;
            margin-right: 0.4rem;
            @include sc(.55rem, $fontColor);
            background-color: transparent;
            margin-top: 0.25rem;
            margin-right: 0.6rem;
            height: 0.8rem;
            option {
                @include sc(.55rem, $fontColor);
            }
        }
        label {
            width: 40%;
            @include sc(.65rem, $fontColor);
        }
        .right-content {
            float: right;
            margin-right: 0.8rem;
            margin-top: 0.25rem;
            @include sc(.55rem, $fontColor);
        }
        .arrow-down {
            position: absolute;
            right: 0.4rem;
            top: 0.4rem;
            margin-right: 0.3rem;
            @include wh(.6rem, .6rem);
            svg {
                @include wh(100%, 100%);
            }
        }
    }
    .radio_container {
        justify-content: space-between;
        padding: .6rem .8rem;
        border-bottom: 1px solid #666;
        .agree-content {
            width: 100%;
            p {
                @include sc(.55rem, $fontColor);
            }
        }
        .agree-ul {
            list-style: none;
            margin: 0 auto;
            overflow: hidden;
            width: 100%;
            margin-top: 1rem;
        }
        .agree-li {
            float: left;
            width: 50%;
            text-align: center;
            .radio-label {
                width: 100%;
                @include sc(.65rem, $fontColor);
            }
        }
    }
    .tip_container {
        justify-content: space-between;
        padding: .6rem .8rem;
        border-bottom: 1px solid #666;
        .tip-label {
            width: 100%;
            @include sc(.55rem, $red);
        }
    }
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
