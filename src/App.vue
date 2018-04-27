<template>
    <div>
        <div v-wechat-title="$route.meta.title"></div>
        <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
@import './style/common';
@import '../node_modules/mint-ui/lib/style.css';
.router-fade-enter-active,
.router-fade-leave-active {
    transition: opacity 0.2s;
}

.router-fade-enter,
.router-fade-leave-active {
    opacity: 0;
}
</style>
