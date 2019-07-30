
<template>
    <div class="component-alert">
        <popup ref="popup"
            v-on:popupClose="popupClose" :isClose="isClose">
            <div slot="body" v-html="msg"></div>
            <div slot="close-btn" class="close" v-show="isShow" @click="popupClose"><img src="../../assets/img/popup/close.png"></div>
            <div slot="btn-confirm" class="btn" v-on:click="close" v-html="confirmText"></div>
        </popup>
    </div>
</template>


<script>
    import popup from './popup';

    export default {
        name:'alert',
        
        props: ['msg','confirmText', 'isShow', 'isClose'],

        components: {
            popup
        },
        methods: {
            close() {
                // do some animation
                this.$refs.popup.hide();
            },

            popupClose() {
                this.$emit('close')
                this.$destroy()
            },

            setMsg(msg) {
                this.msg = msg
            }
        }
    }


</script>

<style lang="less" scoped>
    .close {
        position: absolute;
        top: 20px;
        right: 15px;
        width: 45px;
        img {
            display: block;
            width: 100%;
        }
    }
</style>
