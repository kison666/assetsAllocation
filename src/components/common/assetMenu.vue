<template>
    <section class="show-list-container">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
            <defs>
                <symbol viewBox="0 0 1024 1024" id="cancelorder" class="icon">
                    <path d="M231.04 310.272h188.16a25.408 25.408 0 0 0 0-50.816H231.04a25.408 25.408 0 1 0 0 50.816z m0 154.688h424.64a25.408 25.408 0 1 0 0-50.816H231.04a25.408 25.408 0 1 0 0 50.816z" fill="#e0e0e0" p-id="1935"></path><path d="M386.56 864.96H153.216a38.144 38.144 0 0 1-38.08-38.144V153.856c0-21.12 17.088-38.144 38.144-38.144h580.096c21.056 0 38.144 17.088 38.144 38.144V598.4a25.408 25.408 0 1 0 50.816 0V141.12c0-42.112-34.112-76.224-76.224-76.224H140.608c-42.112 0-76.288 34.112-76.288 76.224v698.432c0 42.112 34.176 76.224 76.288 76.224h245.888a25.408 25.408 0 0 0 0-50.816z" fill="#e0e0e0" p-id="1936"></path><path d="M775.872 695.616H523.2l65.92-65.92a25.408 25.408 0 1 0-35.904-36.032l-104.96 104.96a25.6 25.6 0 0 0-10.368 20.672 25.344 25.344 0 0 0 10.304 20.672l104.96 104.96a25.408 25.408 0 1 0 35.968-35.904l-62.528-62.592h249.28a81.344 81.344 0 1 1 0 162.752h-96.512a25.408 25.408 0 0 0-0.064 50.816h96.64a132.224 132.224 0 1 0 0-264.384z" fill="#e0e0e0" p-id="1937"></path>
                </symbol>
            </defs>
        </svg>
        <ul class="manager-list-ul">
            <li class="manager-list-li">

                <router-link :to="{path: '/profile/assetdetail', query:{qt:0,t:type,ot:opType,ct:cType}}" v-if="opType==0 && type==0">
                    <p class="icon">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#postion"></use>
                        </svg>
                    </p>
                    <p>持仓</p>
                </router-link>
                <div v-if="opType==0 && type==1" @click="toDiyIndex()">
                    <p class="icon">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#postion"></use>
                        </svg>
                    </p>
                    <p>持仓</p>
                </div>
                <router-link :to="{path: '/profile/assetdetail', query:{qt:0,t:type,ot:opType,ct:cType,ai:accountId}}" v-if="opType==1">
                    <p class="icon">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#postion"></use>
                        </svg>
                    </p>
                    <p>持仓</p>
                </router-link>
            </li>
            <li class="manager-list-li">
                <router-link :to="{path: '/profile/assetdetail', query:{qt:1,t:type,ot:opType,ct:cType}}" v-if="opType==0">
                    <p class="icon">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#query"></use>
                        </svg>
                    </p>
                    <p>查询</p>
                </router-link>
                <router-link :to="{path: '/profile/assetdetail', query:{qt:1,t:type,ot:opType,ct:cType,ai:accountId}}" v-if="opType==1">
                    <p class="icon">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#query"></use>
                        </svg>
                    </p>
                    <p>查询</p>
                </router-link>
            </li>
            <li class="manager-list-li">
                <router-link :to="{path: '/profile/assetdetail', query:{qt:2,t:type,ot:opType,ct:cType}}" v-if="opType==0">
                    <p class="icon">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cancelorder"></use>
                        </svg>
                    </p>
                    <p>撤单</p>
                </router-link>
                <router-link :to="{path: '/profile/assetdetail', query:{qt:2,t:type,ot:opType,ct:cType,ai:accountId}}" v-if="opType==1">
                    <p class="icon">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cancelorder"></use>
                        </svg>
                    </p>
                    <p>撤单</p>
                </router-link>
            </li>
            <li class="manager-list-li">
                <router-link :to="{path: '/profile/assetdetail', query:{qt:3,t:type,ot:opType,ct:cType}}" v-if="opType==0">
                    <p class="icon">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#history"></use>
                        </svg>
                    </p>
                    <p>出金/入金</p>
                </router-link>
                <router-link :to="{path: '/profile/assetdetail', query:{qt:3,t:type,ot:opType,ct:cType,ai:accountId}}" v-if="opType==1">
                    <p class="icon">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#history"></use>
                        </svg>
                    </p>
                    <p>出金/入金</p>
                </router-link>
            </li>
            <li class="manager-list-li">
                <router-link :to="{path: '/profile/assetdetail', query:{qt:4,t:type,ot:opType,ct:cType}}" v-if="opType==0">
                    <p class="icon">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#profit"></use>
                        </svg>
                    </p>
                    <p>每日盈亏</p>
                </router-link>
                <router-link :to="{path: '/profile/assetdetail', query:{qt:4,t:type,ot:opType,ct:cType,ai:accountId}}" v-if="opType==1">
                    <p class="icon">
                        <svg fill="#bbb">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#profit"></use>
                        </svg>
                    </p>
                    <p>每日盈亏</p>
                </router-link>
            </li>
        </ul>
    </section>
</template>
<script>
import {
    setAssetState,
    getAssetState,
} from '../../store/store'
export default {
    data() {
            return {

            }
        },
        props: ['type', 'opType','accountId','cType'],
        created() {
            this.initData();

        },
        mounted() {

        },
        methods: {
            //初始化获取数据
            initData() {
            },

            //监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
            async listenPropChange() {


            },
            toDiyIndex(){
                setAssetState(1);
                this.$router.push({
                    path: '/my/index'
                });
                this.$router.go(1);
            }
        },
        watch: {
            //监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
            type: function(value) {
                this.listenPropChange();
            },
            //监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
            opType: function(value) {
                this.listenPropChange();
            },
            accountId: function(value) {
                // console.log(this.accountId);
            }
        }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
.show-list-container {
    background-color: $grey;
    .manager-list-ul {
        list-style: none;
        margin: 0 auto;
        overflow: hidden;
        width: 100%;
        padding: 0.4rem 0.2rem;
        padding-bottom: 0.8rem;
    }
    .manager-list-li {
        float: left;
        width: 19%;
        margin-top: 0.4rem;
        p {
            @include sc(.55rem, $fontGreyColor2);
            text-align: center;
        }
        img {
            width: 1.2rem;
            margin: auto;
        }
        .icon {
            @include wh(1rem, 1rem);
            margin: auto;
            margin-bottom: 0.2rem;
            svg {
                @include wh(100%, 100%);
            }
        }
    }
    .manager-list-li:nth-child(4) {
        width: 24%;
    }
}
</style>
