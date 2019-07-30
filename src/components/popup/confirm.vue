
<template>
    <div class="component-confirm">
        <popup
            ref="popup"
            v-on:popupClose="popupClose"
            >
            <div slot="body" v-html="msg"></div>
            <div slot="btn-cancel" class="btn" v-on:click="close(false)" v-html="cancelText" v-show="isShow"></div>
            <div slot="btn-confirm" class="btn" v-on:click="close(true)" v-html="confirmText"></div>
        </popup>
    </div>
</template>


<script>
    import popup from './popup';

    export default {
        confirm:'confirm',

        props:['msg', 'confirmText','cancelText','isShow'],

        data(){
            return {
                result:false
            }
        },
        components:{
            popup
        },
        methods:{
            close(result) {
                this.result = result;
                // do some animation
                this.$refs.popup.hide();
            },
            popupClose() {
                this.$emit('close', this.result);
                this.$destroy();
            },
        }
    }

</script>

<style lang="less" scoped>

</style>
