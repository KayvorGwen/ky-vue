<template>
    <transition name="fade" v-on:after-leave="afterLeave">
        <div class="component-loading" v-show="show">
            <gmask></gmask>
            <div class="loading-wrap">
                <div class="loading"></div>
            </div>
        </div>
    </transition>
</template>
<script>
import gmask from '../gmask.vue';

export default {
    name: 'loading',
    data() {
        return {
            show: false
        };
    },
    mounted() {
        this.show = true;
    },
    components: {
        gmask
    },
    methods: {
        afterLeave() {
            this.$destroy();
        }
    }
};
</script>
<style lang="less">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }


    .component-loading{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        text-align: center;
        z-index: 10000;
    }
    .loading-wrap{
        width: 200px;
        height: 150px;
        margin: auto;
        margin-top: 50%;
        border-radius: 0.1rem;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
    }


    .loading {
        font-size: 10px;
        position: relative;
        text-indent: -9999em;
        display: inline-block;
        border-top: 10px solid rgba(255, 255, 255, 0.2);
        border-right: 10px solid rgba(255, 255, 255, 0.2);
        border-bottom: 10px solid rgba(255, 255, 255, 0.2);
        border-left: 10px solid #ffffff;
        -webkit-transform: translateZ(0);
        -ms-transform: translateZ(0);
        transform: translateZ(0);
        animation: load8 1.1s infinite linear;
        &,
        &:after {
            border-radius: 50%;
            width: 60px;
            height: 60px;
        }
    }

    @-webkit-keyframes load8 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes load8 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>