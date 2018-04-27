<template>
    <div class="restContainer redeem-container">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
            <defs>
                <symbol xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" id="succ" class="icon">
                    <path d="M297.369422 505.938231a48.025571 48.025571 0 1 0-67.93212 67.932119l197.590922 197.570442a47.861731 47.861731 0 0 0 33.996779 14.090231c12.247033 0 24.575985-4.710397 33.93534-14.069751L946.994632 319.426983a48.046051 48.046051 0 0 0-67.952599-67.932119L461.004523 669.593813l-163.635101-163.655582zM1021.255067 458.752339a36.577258 36.577258 0 0 0-72.765396 7.516156c1.576959 15.052791 2.355199 30.433262 2.355198 45.711332 0 241.991535-196.874122 438.865657-438.865656 438.865657-241.991535 0-438.865657-196.874122-438.865657-438.865657 0-241.991535 196.874122-438.865657 438.886137-438.865656 86.302668 0 169.840538 25.047025 241.540975 72.417236a36.577258 36.577258 0 0 0 40.325096-61.030363A509.828814 509.828814 0 0 0 511.999693 0.000614C229.683062 0.000614 0 229.683677 0 512.000307s229.683062 511.999693 511.999693 511.999693 511.999693-229.683062 511.999693-511.999693c0-17.776629-0.921599-35.676139-2.723839-53.227488z" fill="#2d96e4" p-id="995"></path>
                </symbol>
            </defs>
        </svg>
        <head-top head-title="交易结果" goBack="true"></head-top>
        <div class="result-container">
            <div class="item">
                <p class="icons">
                    <svg fill="#bbb">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#succ"></use>
                    </svg>
                </p>
            </div>
            <p class="des">{{result}}提交成功！我们将尽快处理。</p>
            <p class="des-s">如有疑问，请联系021-55889019。</p>
            <div class="login_container" @click="nextButton">确 定</div> 
        </div>
    </div>
</template>
<script>
import headTop from '../../../../components/header/head'
import {
    tradeRedeem
} from '../../../../service/getData'
import {
    Toast,
    Indicator
} from 'mint-ui'

export default {
    data() {
            return {
                result:'',//类型
            }
        },
        components: {
            headTop,
        },
        created() {
            this.initData();
        },
        methods: {
            //初始化获取数据
            initData() {
               this.result = this.$route.query.result;
            },
            nextButton(){
                this.$router.replace({
                    path: '/my/index'
                }); 
            }
        }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.restContainer {
    padding-top: 0rem;
}

.result-container{
     text-align:center;
     width:100%;
     margin:auto;
     padding-top:3rem;
     .item{
        @include wh(2rem, 2rem);
        margin:auto;
        .icons {
            @include wh(2rem, 2rem);
            margin-bottom: 0.2rem;
            margin-right: 0.2rem;
            margin-left: 10%;
            svg {
                @include wh(100%, 100%);
            }
        }
     }
     .des{
         margin-top: .5rem;
         @include sc(.65rem, $fontGreyColor);
     }
     .des-s{
        margin-top: .5rem;
         @include sc(.55rem, $fontGreyColor2);
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
