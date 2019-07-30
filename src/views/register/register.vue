<template lang="">
    <div class="login">
        <div class="username">
            <label for="username">用户名</label>
            <input type="text" name="username" v-model="username">
        </div>
        <div class="password">
            <label for="username">密码</label>
            <input type="password" name="password" v-model="password">
        </div>
        <button @click="submit">注册</button>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { SET_LOGIN_INFO } from '../../store/types';
    import { register } from '../../models/register';

    @Component({
        name: 'register',
        components: {

        },
        beforeRouteEnter(to, from, next) {
            document.title = to.meta.title;
            next();
        }
    })

    export default class Register extends Vue {
        username = '';
        password = '';

        async submit() {
            const { username, password } = this;
            register({
                username,
                password
            }).then(res => {
                const { errcode, errmsg, data } = res.data;
                this.$store.dispatch(SET_LOGIN_INFO, data);
                window.localStorage.setItem('token', data.token);
                alert(errmsg);
                this.$router.push({
                    path: '/home',
                    query: {
                        userId: data.userId
                    }
                })
            }).catch(err => {
                console.log(err);
            })
        }
    }
</script>
