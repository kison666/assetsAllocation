<template>
    <div class="feedback_container">
        <head-top signin-up='home' head-title="我要反馈" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <section class="feedbackForm">
                <p class="type_tag_title">请选择反馈的类型(必选)</p>
                <ul class="type_tag_list">
                    <li class="type_tag_li" :class="{type_tag_li_active: ratingTageIndex == 0}" :key="0" @click="changeFeedBackType(0,'业务咨询')">业务咨询</li>
                    <li>&nbsp;</li>
                    <li class="type_tag_li" :class="{type_tag_li_active: ratingTageIndex == 1}" :key="1" @click="changeFeedBackType(1,'投诉与建议')">投诉与建议</li>
                    <li>&nbsp;</li>
                    <li class="type_tag_li" :class="{type_tag_li_active: ratingTageIndex == 2}" :key="2" @click="changeFeedBackType(2,'其它事项')">其它事项</li>
                </ul>
                <p class="content_title">请详细描述您的问题或宝贵的意见</p>
                <section class="input_container">
                    <textarea placeholder="请输入您的问题和意见" name="des" v-model="des"></textarea>
                </section>
            </section>
            <div class="submit_container" @click="mobileFeedback()">提&nbsp;&nbsp;交</div>
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
    feedBack
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
            ratingTageIndex: 0, //选中的反馈类型
            des: '', //反馈的内容
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容
            showWaiting: false, //显示加载动画

        }
    },

    created() {
        this.initData();
    },

    methods: {
        //初始化获取数据
        async initData() {

        },

        changeFeedBackType(index, feekId) {
            this.ratingTageIndex = index;
        },

        mobileFeedback() {

            if (!this.des) {
                this.showAlert = true;
                this.alertText = '请输入反馈内容';
                return
            }

            //提交反馈内容
            this.showWaiting = true;
            let handler = this;
            feedBack(this.ratingTageIndex, this.des, function(ret) {
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
                this.showAlert = true;
                this.alertText = "反馈信息提交成功";
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
@import '../../../style/mixin';
.menu {
    padding: 0.5rem 0.4rem;
    padding-top: $containerTop;
}

.feedbackForm {
    background-color: transparent;
    margin-top: .6rem;
    .type_tag_title {
        @include sc(.7rem, $fontColor);
        margin-bottom: 0.5rem;
    }
    .content_title {
        @include sc(.7rem, $fontColor);
        margin-top: 1.5rem;
    }
    .type_tag_list {
        list-style: none;
        margin: 0 auto;
        overflow: hidden;
        width: 100%;
        li {
            float: left;
            width: 2%;
            @include sc(.7rem, $fontColor);
            text-align: center;
        }
        .type_tag_li {
            width: 32%;
            padding: 0.2rem;
            background-color: #e0e0e0;
            @include sc(.7rem, $black);
        }
        .type_tag_li_active {
            background-color: $blue;
            @include sc(.7rem, $fontColor);
        }
    }
    .input_container {
        display: flex;
        justify-content: space-between;
        padding: .6rem 0rem;
        border-bottom: 0px solid #666;
        textarea {
            width: 100%;
            height: 6rem;
            padding: 0.2rem;
            background-color: #e0e0e0;
            @include sc(.7rem, $fontBlackColor);
        }
    }
}

.submit_container {
    background-color: $blue;
    width: 100%;
    text-align: center;
    @include sc(.8rem, $fontColor);
    padding: 0.4rem;
    margin-top: 0.8rem;
}
</style>
