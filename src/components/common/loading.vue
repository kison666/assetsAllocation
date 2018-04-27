<template>
    <div class="waiting-container" :class="{Black:bgColor}">
        <div class="loading_container">
            <ring-loader :color="color" :size="size"></ring-loader>
        </div>
    </div>
</template>
<script>
import RingLoader from '../../../node_modules/vue-spinner/src/RingLoader.vue'
export default {
    data() {
            return {
                positionY: 0,
                timer: null,
                color: '#3190e8',
                size: '50px',

            }
        },
        props: ['bgColor'],
        components: {
            RingLoader
        },
        mounted() {
            this.timer = setInterval(() => {
                this.positionY++;
            }, 600)
        },
        beforeDestroy() {
            clearInterval(this.timer);
        }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';

.waiting-container {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    background: rgba(102,102,102,0.1);
}

.Black{
   background: rgba(0,0,0,1) !important; 
}

.loading_container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    margin: auto;
    z-index:99;
}

.load_img {
    @include wh(100%, 100%);
    position: relative;
    z-index: 11;
    span {
        @include sc(.65rem, $fontColor);
    }
}
</style>
