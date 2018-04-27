<template>
    <div class="feedback_container">
        <head-top signin-up='home' head-title="风险测评" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <div class="qustion-item" v-show="showTip ==true">
                <p class="title">尊敬的投资者：</p>
                <p>为了便于您了解自身的风险承受能力，选择合适的投资产品和服务，请您填写以下风险承受能力调查表。</p>
                <p>下列问题可协助评估您对投资产品和服务的风险承受能力，请确保您所提供的信息或资料是客观、真实、准确、完整、有效，否则可能影响本公司提供产品或服务的适当性，我们不承担由此引起的任何责任。为了及时了解您的风险承受能力，我们建议您持续做好动态评估。我们承诺对您的所有资料保密。评估结果仅供参考，不构成投资建议。</p>
            </div>
            <transition name="fade-choose">
                <div class="menu-item" v-show="current_question ==1">
                    <p class="question">Q1、您的年龄是</p>
                    <ul class="ask-container" @click="changeAskOne">
                        <li class="ask-item">
                            <input type="radio" name="question1" v-model="question1" value="A" />
                            <label class="radio-label">A、18-30岁</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question1" v-model="question1" value="B" />
                            <label class="radio-label">E、31-40岁</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question1" v-model="question1" value="C" />
                            <label class="radio-label">E、41-50岁</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question1" v-model="question1" value="D" />
                            <label class="radio-label">E、51-60岁</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question1" v-model="question1" value="E" />
                            <label class="radio-label">E、高于60岁</label>
                        </li>
                    </ul>
                </div>
            </transition>
            <transition name="fade-choose">
                <div class="menu-item" v-show="current_question ==2">
                    <p class="question">Q2、您的家庭年收入为（折合人民币）</p>
                    <ul class="ask-container">
                        <li class="ask-item">
                            <input type="radio" name="question2" v-model="question2" value="A" />
                            <label class="radio-label">A、100万元以上</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question2" v-model="question2" value="B" />
                            <label class="radio-label">B、50-100万元</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question2" v-model="question2" value="C" />
                            <label class="radio-label">C、20-50万元</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question2" v-model="question2" value="D" />
                            <label class="radio-label">D、5-20万元</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question2" v-model="question2" value="E" />
                            <label class="radio-label">E、5万元以下</label>
                        </li>
                    </ul>
                </div>
            </transition>
            <transition name="fade-choose">
                <div class="menu-item" v-show="current_question ==3">
                    <p class="question">Q3、在您每年的家庭收入中，可用于金融投资（不含自住、自用房产及汽车等固定资产）的比例为</p>
                    <ul class="ask-container">
                        <li class="ask-item">
                            <input type="radio" name="question3" v-model="question3" value="A" />
                            <label class="radio-label">A、小于10%</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question3" v-model="question3" value="B" />
                            <label class="radio-label">B、10%至25%</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question3" v-model="question3" value="C" />
                            <label class="radio-label">C、25%至50%</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question3" v-model="question3" value="D" />
                            <label class="radio-label">D、50%至70%</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question3" v-model="question3" value="E" />
                            <label class="radio-label">E、大于70%</label>
                        </li>
                    </ul>
                </div>
            </transition>
            <transition name="fade-choose">
                <div class="menu-item" v-show="current_question ==4">
                    <p class="question">Q4、以下哪项最能说明您的投资经验?</p>
                    <ul class="ask-container">
                        <li class="ask-item">
                            <input type="radio" name="question4" v-model="question4" value="A" />
                            <label class="radio-label">A、有投资贵金属、外汇、期货、期权等高风险金融衍生品经验</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question4" v-model="question4" value="B" />
                            <label class="radio-label">B、有投资股票、股票型基金的经验</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question4" v-model="question4" value="C" />
                            <label class="radio-label">C、有购买过银行的理财产品、债券基金、分红型、投连险</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question4" v-model="question4" value="D" />
                            <label class="radio-label">D、有购买过保本基金、货币基金（如余额宝）、信托等低风险产品</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question4" v-model="question4" value="E" />
                            <label class="radio-label">E、从未有过投资经理，只存银行的定期或活期</label>
                        </li>
                    </ul>
                </div>
            </transition>
            <transition name="fade-choose">
                <div class="menu-item" v-show="current_question ==5">
                    <p class="question">Q5、您有多少年投资股票、基金、外汇、金融衍生产品等风险投资品的经验？</p>
                    <ul class="ask-container">
                        <li class="ask-item">
                            <input type="radio" name="question5" v-model="question5" value="A" />
                            <label class="radio-label">A、8年以上</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question5" v-model="question5" value="B" />
                            <label class="radio-label">B、5至8年</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question5" v-model="question5" value="C" />
                            <label class="radio-label">C、2至5年</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question5" v-model="question5" value="D" />
                            <label class="radio-label">D、少于2年</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question5" v-model="question5" value="E" />
                            <label class="radio-label">E、没有经验</label>
                        </li>
                    </ul>
                </div>
            </transition>
            <transition name="fade-choose">
                <div class="menu-item" v-show="current_question ==6">
                    <p class="question">Q6、以下哪项描述最符合您的投资态度？</p>
                    <ul class="ask-container">
                        <li class="ask-item">
                            <input type="radio" name="question6" v-model="question6" value="A" />
                            <label class="radio-label">A、希望赚取高回报，愿意为此承担较大本金损失</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question6" v-model="question6" value="B" />
                            <label class="radio-label">B、关心长期的高回报，能够接受短期的资产价值波动</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question6" v-model="question6" value="C" />
                            <label class="radio-label">C、寻求资金的较高收益和成长性，愿意为此承担有限本金损失</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question6" v-model="question6" value="D" />
                            <label class="radio-label">D、保守投资，不希望本金损失，愿意承担一定幅度的收益波动</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question6" v-model="question6" value="E" />
                            <label class="radio-label">E、厌恶风险，不希望本金损失，希望获得稳定回报</label>
                        </li>
                    </ul>
                </div>
            </transition>
            <transition name="fade-choose">
                <div class="menu-item" v-show="current_question ==7">
                    <p class="question">Q7、您计划的投资期限是多久？</p>
                    <ul class="ask-container">
                        <li class="ask-item">
                            <input type="radio" name="question7" v-model="question7" value="A" />
                            <label class="radio-label">A、5年以上</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question7" v-model="question7" value="B" />
                            <label class="radio-label">B、3 - 5年</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question7" v-model="question7" value="C" />
                            <label class="radio-label">C、1 - 3年</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question7" v-model="question7" value="D" />
                            <label class="radio-label">D、1年以下</label>
                        </li>
                    </ul>
                </div>
            </transition>
            <transition name="fade-choose">
                <div class="menu-item" v-show="current_question ==8">
                    <p class="question">Q8、您的投资目的是</p>
                    <ul class="ask-container">
                        <li class="ask-item">
                            <input type="radio" name="question8" v-model="question8" value="A" />
                            <label class="radio-label">A、资产迅速增长</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question8" v-model="question8" value="B" />
                            <label class="radio-label">B、资产较快增长</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question8" v-model="question8" value="D" />
                            <label class="radio-label">C、资产稳健增长</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question8" v-model="question8" value="E" />
                            <label class="radio-label">D、资产保值</label>
                        </li>
                    </ul>
                </div>
            </transition>
            <transition name="fade-choose">
                <div class="menu-item" v-show="current_question ==9">
                    <p class="question">Q9、您的投资出现何种程度的波动时，您会呈现明显的焦虑？</p>
                    <ul class="ask-container">
                        <li class="ask-item">
                            <input type="radio" name="question9" v-model="question9" value="A" />
                            <label class="radio-label">A、本金50％以上损失</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question9" v-model="question9" value="B" />
                            <label class="radio-label">B、本金20-50％的损失</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question9" v-model="question9" value="C" />
                            <label class="radio-label">C、本金10％以内的损失</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question9" v-model="question9" value="D" />
                            <label class="radio-label">D、出现轻微本金损失</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question9" v-model="question9" value="E" />
                            <label class="radio-label">E、本金无损失，但收益未达预期</label>
                        </li>
                    </ul>
                </div>
            </transition>
            <transition name="fade-choose">
                <div class="menu-item" v-show="current_question ==10">
                    <p class="question">Q10、如果您拥有50万用来建立投资组合，您会选择哪一种？</p>
                    <ul class="ask-container">
                        <li class="ask-item">
                            <input type="radio" name="question10" v-model="question10" value="A" />
                            <label class="radio-label">A、低风险投资、一般风险投资、高风险投资的比重分别为5:15:80</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question10" v-model="question10" value="B" />
                            <label class="radio-label">B、低风险投资、一般风险投资、高风险投资的比重分别为10:30:60</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question10" v-model="question10" value="C" />
                            <label class="radio-label">C、低风险投资、一般风险投资、高风险投资的比重分别为30:40:30</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question10" v-model="question10" value="D" />
                            <label class="radio-label">D、低风险投资、一般风险投资、高风险投资的比重分别为60:30:10</label>
                        </li>
                        <li class="ask-item">
                            <input type="radio" name="question10" v-model="question10" value="E" />
                            <label class="radio-label">E、低风险投资、一般风险投资、高风险投资的比重分别为80:15:5</label>
                        </li>
                    </ul>
                </div>
            </transition>
            <div class="pre-menu-item"><span @click="current_question--" v-show="current_question >1">上一题</span>
                <span @click="nextQuestion()" v-show="current_question <10" :class="{activity:next_activity==1}">下一题</span>
                <span :class="{activity:confirm_info >0}" v-show="current_question == 10" @click="confirmButton">提交</span></div>
        </section>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
        <waiting v-show="showWaiting"></waiting>
    </div>
</template>
<script>
import headTop from '../../../components/header/head'
import BScroll from 'better-scroll'
import alertTip from '../../../components/common/alertTip'
import waiting from '../../../components/common/waiting'
import {
    riskTest
} from '../../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../../config/response'

export default {
    components: {
        headTop,
        alertTip,
        waiting
    },

    data() {
        return {
            current_question: 1, //当前选择的题目
            question1: '0',
            question2: '0',
            question3: '0',
            question4: '0',
            question5: '0',
            question6: '0',
            question7: '0',
            question8: '0',
            question9: '0',
            question10: '0',
            confirm_info: 0, //提交
            next_activity: 0, //下一题按钮激活
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            showWaiting: false,
            showTip:true,//提示

        }
    },

    created() {
        this.initData();
    },

    methods: {
        //初始化获取数据
        async initData() {

        },

        changeAskOne(){
            
        },

        nextQuestion() {
            if (this.next_activity == 1) {
                this.showTip = false;
                this.current_question++;
                this.next_activity = 0
            }
        },

        confirmButton() {

            this.showWaiting = true;
            let handler = this;
            riskTest(this.question1, this.question2, this.question3, this.question4, this.question5, this.question6, this.question7, this.question8, this.question9, this.question10, function(ret) {
                handler.response(ret);
            });
        },
        response(ret) {
            //如果返回的值不正确，则弹出提示框
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

    },

    watch: {
        question1: function() {
            // this.current_question = 2;
            this.next_activity = 1;
        },
        question2: function() {
            // this.current_question = 3;
            this.next_activity = 1;
        },
        question3: function() {
            // this.current_question = 4;
            this.next_activity = 1;
        },
        question4: function() {
            // this.current_question = 5;
            this.next_activity = 1;
        },
        question5: function() {
            // this.current_question = 6;
            this.next_activity = 1;
        },
        question6: function() {
            // this.current_question = 7;
            this.next_activity = 1;
        },
        question7: function() {
            // this.current_question = 8;
            this.next_activity = 1;
        },
        question8: function() {
            // this.current_question = 9;
            this.next_activity = 1;
        },
        question9: function() {
            // this.current_question = 10;
            this.next_activity = 1;
        },
        question10: function() {
            this.confirm_info = 1;
        },
    }

}
</script>
<style lang="scss" scoped>
@import '../../../style/mixin';
.menu {
    padding: 0.5rem 0rem;
    padding-top: $containerTop;
    margin-top: .5rem;
    .menu-item {
        background-color: $grey;
        width: 100%;
        padding: 0.4rem 0.4rem;
        margin-top: 0.2rem;
        .question {
            @include sc(.75rem, $fontColor);
        }
        .ask-container {
            margin-top: 0.4rem;
            .ask-item {
                position: relative;
                width: 100%;
                padding: 0.2rem 0rem;
                label {
                    @include sc(.65rem, $fontColor);
                }
            }
        }
    }
    .pre-menu-item {
        display: flex;
        text-align: center;
        background-color: $grey;
        @include sc(.7rem, $fontColor);
        padding: .5rem 0rem;
        span {
            flex: 1;
        }
        .activity {
            color: $blue;
        }
    }
}

.submit_container {
    background-color: $blue;
    width: 100%;
    text-align: center;
    @include sc(.7rem, $fontColor);
    padding: 0.2rem;
    margin-top: 1.8rem;
}

.qustion-item {
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    p {
        margin-top: 0.2rem;
        margin-bottom: 0.5rem;
        @include sc(.65rem, $fontGreyColor);
        span {
            @include sc(.65rem, #fff);
        }
    }
    .title {
        @include sc(.7rem, #fff);
    }
}
</style>
