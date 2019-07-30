<template>
    <div class="component-popup">
        <transition
            name="fade"
            >
             <gmask v-show="maskShow" :isClose="isClose" :closePopup="afterLeave"></gmask>
       </transition>
        <transition
            name="bounce"
            v-on:after-leave="afterLeave">
            <!-- 这里之所以绑定activity-detail-popup这个类名是因为活动页面弹窗宽度是特定的（UI图） -->
            <div class="main" v-show="show" :class="{'activity-detail-popup': isClose}">
                <div class="body">
                    <slot name="body"></slot>
                    <slot name="close-btn"></slot>
                </div>
                <div class="btns">
                    <slot name="btn-cancel"></slot>
                    <slot name="btn-confirm"></slot>
                </div>
            </div>
    </transition>
    </div>
</template>

<script>
    import gmask from '../gmask'
    export default {
        name: 'popup',
        props: ['isClose'],
        components: {
            gmask
        },
        data() {
            return {
                show: false,
                maskShow:false
            }
        },
        mounted() {
            this.show = true
            this.maskShow = true
        },
        methods: {
            hide(){
                this.show = false
                this.maskShow = false
            },
            afterLeave() {
                this.$emit('popupClose')
            }
        }
    }

</script>


<style lang="less" scoped>

    @import '../../assets/less/variable.less';

    .bounce-enter-active{
        animation: bounceIn .3s;
    }

    .bounce-leave-active{
        animation: bounceOut .3s;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }

    .component-popup{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        text-align: center;
        font-size: 28px;
        z-index: 10000;
    }
    .component-mask{
        position: absolute;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.3)
    }
    .main{
        position: relative;
        border-radius: 0.08rem;
        margin: auto;
        z-index: 2;
        /*top:30%;*/
        margin-top:30%;
        width: 70%;
        min-height: 300px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        word-wrap: break-word;
        .body{
            flex: 1 0 auto;
            border-bottom: 1px solid @color_border_greyer;
            display: flex;
            justify-content: space-around;
            align-content: center;
            align-items: center;
            align-items: center;
            -webkit-box-pack: center;
            flex-direction: column;
            line-height: 1.5em;
        }
        .btns{
            line-height: 3em;
            display: flex;
        }
    }
    .activity-detail-popup {
        width: 80% !important;
    }
</style>
<style lang="less">
    @import '../../assets/less/variable.less';
    .component-popup{
        .btn{
            flex: 1;
        }
        .btn:nth-child(even){
            border-left: 1px solid @color_border_greyer;
        }
    }
    [data-dpr="1"] .component-popup .main{
        border-radius: 0.04rem;
    }
</style>
