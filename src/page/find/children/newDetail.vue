<template>
    <div class="message_container">
        <head-top signin-up='home' head-title="消息详情" go-back='true'>
            <span slot='logo' class="head_logo"></span>
        </head-top>
        <div v-wechat-title="$route.meta.title"></div>
        <section class="menu">
            <p class="title">{{title}}</p>
            <p class="title-bottom">
                <span>{{date}}</span>
                <span>{{author}}</span>
                <a :href="sourceUrl" v-if="sourceUrl != 'www.baomap.com' && sourceUrl !=''">
                      <span class="url">{{source}}</span>
                </a>
                <a v-else>
                    <span>{{source}}</span>
                </a>
            </p>
            <div class="message-item" v-html="replaceHtml(content)"></div>
        </section>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
    </div>
</template>
<script>
import headTop from '../../../components/header/head'
import BScroll from 'better-scroll'
import alertTip from '../../../components/common/alertTip'
import {
    newsDetail
} from '../../../service/getData'
import {
    responseResult,
    RESPONSE_CODE_ERROR_DATA,
    RESPONSE_CODE_SUCCESS
} from '../../../config/response'

export default {
    components: {
        headTop,
        alertTip
    },

    data() {
        return {
            content: '', //消息详情
            title: '', //消息标题
            id: '',
            showAlert: false, //显示提示组件
            alertText: null, //提示的内容//消息ID
            date:'',//日期
            author:'',//作者
            source:'',//来源
            sourceUrl:'',//文章来源链接
        }
    },


    created() {
        window.scrollTo(0, 0);
        this.id = this.$route.query.id;
        this.date = this.$route.query.date;
        this.author = this.$route.query.author;
        this.source = this.$route.query.source;
        this.sourceUrl = this.$route.query.sourceUrl;
        // if (this.$route.query.title) {
        this.$route.meta.title = this.$route.query.title;
        // }
        this.initData();
    },

    methods: {
        //初始化获取数据
        initData() {
            //获取消息详情
            let handler = this;
            newsDetail(this.id, function(ret) {
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
        },

        replaceHtml(html){
            return html.replace(/<img/g,"<img style='width:100%'");
        }

    }

}
</script>
<style lang="scss" scoped>
@import '../../../style/mixin';
.menu {
    padding-top: $containerTop;
    .title{
         @include sc(.8rem, #ffffff);
         text-align: left;
         margin: 0rem .8rem;
         margin-top: .8rem;
    }
    .title-bottom{
         span{
             @include sc(.55rem, $fontGreyColor2);
             text-align: center;
         }
         text-align:left;
         margin: 0rem .8rem;
         margin-top: .1rem;
         .url{
            color:$blue
         }
    }
}

.message-item {
    padding: 0.5rem;
    padding-top: 0.6rem;
    @include sc(.65rem, $fontGreyColor);
    p {
        img {
          width: auto;  
        }
    }
}
</style>
