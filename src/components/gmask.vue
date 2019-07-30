<!-- 遮罩层 -->
<template>
    <div class="component-mask" @click="close">

    </div>
</template>

<script>
    export default {
        props:{
            isClose: {
                type: Boolean,
                defalut: false
            },
            closePopup: {
                type: Function,
                defalut: function() {}
            },
            back: {
                type: Function,
                defalut: function() {}
            }
        },
        methods:{
            /**
             * 点击遮罩层关闭弹窗
             */
            close() {
                this.isClose && this.closePopup();
                this.back && this.back();
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
