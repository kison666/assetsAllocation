<template>
    <div class="message_container">
        <head-top signin-up='home' head-title="消息详情" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <section class="menu">
            <p class="message-item" v-cloak>{{content}}</p>
        </section>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>
<script>
import headTop from '../../../../components/header/head'
import BScroll from 'better-scroll'
import alertTip from '../../../../components/common/alertTip'
import {
    messageDetail
} from '../../../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../../../config/response'

export default {
    components: {
        headTop,
        alertTip
    },

    data() {
        return {
            content: '', //消息详情
            title: '', //消息标题
            mId: '',
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容//消息ID
        }
    },


    created() {
        this.mId = this.$route.query.mid;
        this.initData();
    },

    methods: {
        //初始化获取数据
        initData() {
            //获取消息详情
            let handler = this;
            messageDetail(this.mId, function(ret) {
                handler.response(ret);
            });

        },
        response(ret) {
            //如果返回的值不正确，则弹出提示框
            let response = responseResult(this, ret);
            if (response == RESPONSE_CODE_ERROR_DATA) {
                this.showAlert = true;
                this.alertText = ret.retMsg;
                return
            } else if (response == RESPONSE_CODE_SUCCESS) {
                this.content = ret.retData.content;
                this.title = ret.retData.title;
            }
        },
        closeTip() {
            this.showAlert = false;
        }

    }

}
</script>
<style lang="scss" scoped>
@import '../../../../style/mixin';
.menu {
    padding-top: $containerTop;
}

.message-item {
    padding: 0.5rem;
    padding-top: 0.6rem;
    @include sc(.65rem, $fontColor);
}
</style>
