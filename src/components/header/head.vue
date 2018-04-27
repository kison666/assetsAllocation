<template>
    <div class="head-div">
        <header id='head_top' :class="{xbt_show:isWeixin=='false'}">
            <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2" />
                </svg>
            </section>
            <section class="title_head ellipsis" >
                <span class="title_text" v-cloak>{{$route.meta.title}}</span>
            </section>
        </header>
        <div class="head-margin" v-if="isWeixin=='false'"></div>
    </div>
</template>
<script>
import {
    mapState,
    mapActions
} from 'vuex'
export default {
    data() {
            return {
                isWeixin: "true"
            }
        },
        created() {
            let ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.isWeixin = "true";
            } else {
                this.isWeixin = "false";
            }

        },
        props: ['signinUp', 'headTitle', 'goBack'],
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
#head_top {
    background-color: $black2;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    display: none;
    @include wh(100%, 1.95rem);
}

.head-margin {
    height: 1.95rem;
}

.xbt_show {
    display: block !important;
}

.head_goback {
    left: 0.4rem;
    @include wh(0.6rem, 0.8rem);
    line-height: 2.2rem;
    margin-left: .4rem;
}

.head_login {
    right: 0.55rem;
    @include sc(0.65rem, #fff);
    @include ct;
    .login_span {
        color: #fff;
    }
    .user_avatar {
        fill: #fff;
        @include wh(.8rem, .8rem);
    }
}

.title_head {
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title_text {
        @include sc(0.8rem, #fff);
        text-align: center;
        font-weight: bold;
    }
}
</style>
