<template>
    <section id='foot_guide'>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position:absolute;width:0;height:0">
            <defs>
                <symbol viewBox="0 0 1024 1024" id="market" class="icon">
                    <path d="M901.12 805.546667 157.013333 805.546667 157.013333 184.32c0-20.48-13.653333-34.133333-34.133333-34.133333S88.746667 163.84 88.746667 184.32l0 662.186667c0 20.48 13.653333 34.133333 34.133333 34.133333l778.24 0c20.48 0 34.133333-13.653333 34.133333-34.133333C935.253333 826.026667 921.6 805.546667 901.12 805.546667L901.12 805.546667zM259.413333 655.36c6.826667 0 6.826667 0 13.653333 0 13.653333 0 27.306667-6.826667 34.133333-20.48L361.813333 477.866667l266.24 136.533333c13.653333 6.826667 34.133333 0 40.96-13.653333l184.32-307.2c6.826667-13.653333 6.826667-34.133333-13.653333-40.96-13.653333-6.826667-34.133333-6.826667-47.786667 13.653333L628.053333 546.133333 361.813333 402.773333c-13.653333 0-20.48 0-27.306667 0S314.026667 416.426667 314.026667 423.253333L238.933333 607.573333C232.106667 628.053333 238.933333 641.706667 259.413333 655.36L259.413333 655.36z" p-id="19669" fill="#e0e0e0"></path>
                </symbol>
                <symbol xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" id="marketActive" class="icon">
                    <path d="M901.12 805.546667 157.013333 805.546667 157.013333 184.32c0-20.48-13.653333-34.133333-34.133333-34.133333S88.746667 163.84 88.746667 184.32l0 662.186667c0 20.48 13.653333 34.133333 34.133333 34.133333l778.24 0c20.48 0 34.133333-13.653333 34.133333-34.133333C935.253333 826.026667 921.6 805.546667 901.12 805.546667L901.12 805.546667zM259.413333 655.36c6.826667 0 6.826667 0 13.653333 0 13.653333 0 27.306667-6.826667 34.133333-20.48L361.813333 477.866667l266.24 136.533333c13.653333 6.826667 34.133333 0 40.96-13.653333l184.32-307.2c6.826667-13.653333 6.826667-34.133333-13.653333-40.96-13.653333-6.826667-34.133333-6.826667-47.786667 13.653333L628.053333 546.133333 361.813333 402.773333c-13.653333 0-20.48 0-27.306667 0S314.026667 416.426667 314.026667 423.253333L238.933333 607.573333C232.106667 628.053333 238.933333 641.706667 259.413333 655.36L259.413333 655.36z" p-id="19669" fill="#0095FF"></path>
                </symbol>
                <symbol xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" id="asset" class="icon">
                    <path d="M368.857882 205.432813c-14.551414-14.551414-38.146808-14.551414-52.698223 0L184.41308 337.179392c-14.551414 14.551414-14.551414 38.146808 0 52.698223 14.553461 14.551414 38.146808 14.551414 52.698223 0l68.133773-68.133773 0 470.314599c0 20.580734 16.682961 37.263695 37.263695 37.263695 20.580734 0 37.263695-16.682961 37.263695-37.263695L379.772466 321.742818l68.133773 68.133773c14.551414 14.551414 38.144762 14.551414 52.698223 0 14.551414-14.551414 14.551414-38.146808 0-52.698223L368.857882 205.432813zM890.221134 634.479519c-14.428617-14.524808-37.818327-14.524808-52.244898 0l-67.51979 67.980277L770.456447 232.785787c0-20.403702-16.540721-36.9434-36.944424-36.9434l-0.057305 0c-20.403702 0-36.9434 16.539698-36.9434 36.9434l0 469.669916-67.515696-67.976184c-14.426571-14.524808-37.817304-14.524808-52.242851 0-14.428617 14.524808-14.428617 38.0762 0 52.601009L707.364503 818.585607c14.426571 14.526855 37.817304 14.526855 52.244898 0l130.611733-131.504056C904.647705 672.555719 904.647705 649.00535 890.221134 634.479519z" p-id="20517" fill="#ffffff"></path>
                </symbol>
                <symbol viewBox="0 0 1024 1024" id="assetActive" class="icon">
                    <path d="M368.857882 205.432813c-14.551414-14.551414-38.146808-14.551414-52.698223 0L184.41308 337.179392c-14.551414 14.551414-14.551414 38.146808 0 52.698223 14.553461 14.551414 38.146808 14.551414 52.698223 0l68.133773-68.133773 0 470.314599c0 20.580734 16.682961 37.263695 37.263695 37.263695 20.580734 0 37.263695-16.682961 37.263695-37.263695L379.772466 321.742818l68.133773 68.133773c14.551414 14.551414 38.144762 14.551414 52.698223 0 14.551414-14.551414 14.551414-38.146808 0-52.698223L368.857882 205.432813zM890.221134 634.479519c-14.428617-14.524808-37.818327-14.524808-52.244898 0l-67.51979 67.980277L770.456447 232.785787c0-20.403702-16.540721-36.9434-36.944424-36.9434l-0.057305 0c-20.403702 0-36.9434 16.539698-36.9434 36.9434l0 469.669916-67.515696-67.976184c-14.426571-14.524808-37.817304-14.524808-52.242851 0-14.428617 14.524808-14.428617 38.0762 0 52.601009L707.364503 818.585607c14.426571 14.526855 37.817304 14.526855 52.244898 0l130.611733-131.504056C904.647705 672.555719 904.647705 649.00535 890.221134 634.479519z" p-id="20517" fill="#0095FF"></path>
                </symbol>
                <symbol xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 40 40" id="find">
                    <defs>
                        <path id="discover-regular.8ef537f_a" d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"></path>
                        <mask id="discover-regular.8ef537f_b" width="40" height="40" x="0" y="0" fill="#fff">
                            <use xlink:href="#discover-regular.8ef537f_a"></use>
                        </mask>
                    </defs>
                    <g fill="none" fill-rule="evenodd">
                        <use stroke="#fff" stroke-width="4" mask="url(#discover-regular.8ef537f_b)" xlink:href="#discover-regular.8ef537f_a"></use>
                        <path stroke="#fff" stroke-width="2" d="M12.79 28.126c-1.515.68-2.169.016-1.462-1.484l3.905-8.284c.47-.999 1.665-2.198 2.66-2.675l8.484-4.064c1.497-.717 2.153-.08 1.46 1.435l-3.953 8.64c-.46 1.006-1.647 2.186-2.655 2.64l-8.44 3.792z"></path>
                        <path fill="#fff" d="M15.693 24.636c-.692.276-1.02-.06-.747-.746l2.21-4.946c.225-.505.721-.602 1.122-.202l2.563 2.563c.394.394.31.893-.203 1.122l-4.945 2.209z"></path>
                    </g>
                </symbol>
                <symbol viewBox="0 0 40 40" id="findActive">
                    <defs>
                        <linearGradient id="discover.5811137_a" x1="50%" x2="50%" y1="100%" y2="0%">
                            <stop offset="0%" stop-color="#2BAEFF"></stop>
                            <stop offset="100%" stop-color="#0095FF"></stop>
                        </linearGradient>
                    </defs>
                    <g fill="none" fill-rule="evenodd">
                        <path fill="url(#discover.5811137_a)" d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20z"></path>
                        <path fill="#FFF" d="M12.79 28.126c-1.515.68-2.169.016-1.462-1.484l3.905-8.284c.47-.999 1.665-2.198 2.66-2.675l8.484-4.064c1.497-.717 2.153-.08 1.46 1.435l-3.953 8.64c-.46 1.006-1.647 2.186-2.655 2.64l-8.44 3.792z"></path>
                        <path fill="url(#discover.5811137_a)" d="M6.482 5.44c-.684-.294-.678-.764 0-1.055L11.54 2.45c.517-.198.936.085.936.65v3.625c0 .558-.412.852-.936.65L6.48 5.44z" transform="rotate(-45 34.258 3.92)"></path>
                    </g>
                </symbol>
                <symbol xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 38 38" id="profile">
                    <defs>
                        <path id="profile-regular.c151d62_a" d="M10 11.833V8.999A8.999 8.999 0 0 1 19 0c4.97 0 9 4.04 9 8.999v2.834l-.013.191C27.657 16.981 23.367 21 19 21c-4.616 0-8.64-4.02-8.987-8.976L10 11.833z"></path>
                        <mask id="profile-regular.c151d62_c" width="18" height="21" x="0" y="0" fill="#fff">
                            <use xlink:href="#profile-regular.c151d62_a"></use>
                        </mask>
                        <path id="profile-regular.c151d62_b" d="M0 32.675C0 26.763 10.139 22 19.027 22 27.916 22 38 26.763 38 32.757v3.312C38 37.136 37.098 38 35.997 38H2.003C.897 38 0 37.137 0 36.037v-3.362z"></path>
                        <mask id="profile-regular.c151d62_d" width="38" height="16" x="0" y="0" fill="#fff">
                            <use xlink:href="#profile-regular.c151d62_b"></use>
                        </mask>
                    </defs>
                    <g fill="none" fill-rule="evenodd" stroke="#fff" stroke-width="4">
                        <use mask="url(#profile-regular.c151d62_c)" xlink:href="#profile-regular.c151d62_a"></use>
                        <use mask="url(#profile-regular.c151d62_d)" xlink:href="#profile-regular.c151d62_b"></use>
                    </g>
                </symbol>
                <symbol viewBox="0 0 38 38" id="profileActive">
                    <defs>
                        <linearGradient id="profile.dbc5ebf_a" x1="50%" x2="50%" y1="100%" y2="0%">
                            <stop offset="0%" stop-color="#2BAEFF"></stop>
                            <stop offset="100%" stop-color="#0095FF"></stop>
                        </linearGradient>
                    </defs>
                    <path fill="url(#profile.dbc5ebf_a)" fill-rule="evenodd" d="M10 11.833V8.999A8.999 8.999 0 0 1 19 0c4.97 0 9 4.04 9 8.999v2.834l-.013.191C27.657 16.981 23.367 21 19 21c-4.616 0-8.64-4.02-8.987-8.976L10 11.833zM0 32.675C0 26.763 10.139 22 19.027 22 27.916 22 38 26.763 38 32.757v3.312C38 37.136 37.098 38 35.997 38H2.003C.897 38 0 37.137 0 36.037v-3.362z"></path>
                </symbol>
            </defs>
        </svg>
        <section @click="gotoAddress({path: '/market', query: {}})" class="guide_item">
            <svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('market') !== -1? '#marketActive' : '#market'"></use>
            </svg>
            <p :class="$route.path.indexOf('market') !== -1? 'bar-active' : ''">全球市场</p>
        </section>
        <section @click="gotoAddress({path: '/my/index', query: {}})" class="guide_item">
            <svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('/my/index') !== -1? '#assetActive' : '#asset'"></use>
            </svg>
            <p :class="$route.path.indexOf('/my/index') !== -1? 'bar-active' : ''">智能交易</p>
        </section>
        <section @click="gotoAddress('/find')" class="guide_item">
            <svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('find') !== -1? '#findActive' : '#find'"></use>
            </svg>
            <p :class="$route.path.indexOf('find') !== -1? 'bar-active' : ''">发现</p>
        </section>
        <section @click="gotoAddress('/profile')" class="guide_item">
            <svg class="icon_style">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="$route.path.indexOf('profile') !== -1? '#profileActive' : '#profile'"></use>
            </svg>
            <p :class="$route.path.indexOf('profile') !== -1? 'bar-active' : ''">我的</p>
        </section>
    </section>
</template>
<script>
export default {
    data() {
            return {

            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
            gotoAddress(path) {
                this.$router.push(path)
            }
        },

}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
#foot_guide {
    background-color: #000;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    @include wh(100%, 2rem);
    display: flex;
    box-shadow: 0 -0.026667rem 0.053333rem rgba(0, 0, 0, .1);
}

.guide_item {
    flex: 1;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    .icon_style {
        @include wh(.8rem, .8rem);
        margin-bottom: .25rem;
        margin-top: .3rem;
        fill: #e0e0e0;
    }
    span,p {
        @include sc(.55rem, #e0e0e0);
        line-height: .55rem;
    }

    .bar-active{color:#0095FF}
}
</style>
