

<template>
    <transition
        name="slide"
        v-on:after-leave="afterLeave"
        >
        <div class="component-toast" v-if="show">
            <div class="msg">
                {{msg}}
            </div>
        </div>
    </transition>
</template>


<script>
    export default {
        props:['msg'],
        data(){
            return {
                show:false
            }
        },
        created(){
            this.show= true;
        },
        mounted(){
            setTimeout(() =>{
                this.show = false
            }, 3000);
        },
        methods:{
            afterLeave(){

            }
        }
    }
</script>

<style lang="less" scoped>

    .slide-enter-active{
        animation: slideInUp .3s;
    }

    .slide-leave-active{
        animation: slideInDown .3s;
    }

    .component-toast{
        position: absolute;
        z-index: 10000;
        bottom: 5%;
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 28px;
        .msg{
            border-radius: 0.16rem;
            display: inline-block;
            background-color: rgba(0,0,0, 0.6);
            padding: 16px 28px;
        }
    }
</style>
