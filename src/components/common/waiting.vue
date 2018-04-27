<template>
    <div class="waiting-container">
        <div class="loading_container">
            <beat-loader :color="color" :size="size"></beat-loader>
        </div>
    </div>
</template>
<script>
import BeatLoader from '../../../node_modules/vue-spinner/src/BeatLoader.vue'
export default {
    data() {
            return {
                positionY: 0,
                timer: null,
                color: '#3190e8',
                size: '15px',
            }
        },
        components: {
            BeatLoader
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
@keyframes load {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-50px);
    }
    100% {
        transform: translateY(0px);
    }
}

@keyframes ellipse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(0.3);
    }
    100% {
        transform: scale(1);
    }
}

.waiting-container {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
}

.loading_container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @include wh(6rem, 6rem);
    text-align: center;
    margin: auto;
    padding-top: 2.5rem;
    background: rgba(102,102,102,0.8);
    z-index:200;
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
