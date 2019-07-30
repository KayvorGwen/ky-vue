<template lang="">
    <div class="login">
        <img :src="userImg" v-if="userImg">
        <upload :cb="getValue" />
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { getHomeData } from '../../models/home';
    import loading from '../../components/loading';
    import upload from '../../components/upload/upload.vue';

    const userUrl = require('../../assets/img/user_photo.png');

    @Component({
        name: 'home',
        components: {
            upload
        },
        beforeRouteEnter(to, from, next) {
            document.title = to.meta.title;
            next();
        }
    })
    export default class Home extends Vue {
        base = {};
        userInfo = {};
        userImg = userUrl;

        mounted() {
            this.getInfo();
        }

        async getInfo() {
            // const userId = this.$route.query.userId;
            getHomeData().then(res => {
                const { data, errmsg, errcode } = res.data;
                data.user_img && (this.userImg = data.user_img);
                errmsg && alert(errmsg); 
            }).catch(err => {
                console.log(err)
            })
        }

        getValue(value: any) {
            this.userImg = value.user_img;
        }
    }
</script>
<style>
    
</style>
