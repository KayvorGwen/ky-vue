<template lang="">
    <div class="login">
        <div class="username">
            <label for="username">用户名</label>
            <input type="text" name="username" v-model="username" />
        </div>
        <div class="password">
            <label for="username">密码</label>
            <input type="password" name="password" v-model="password" />
        </div>
        <!-- <div class="btn" @click="login" style="margin-top: 50px;">登录</div> -->
        <button @click="login">登录</button>
        <button @click="goRegister">去注册</button>
    </div>
</template>
<script lang="ts">
    import { Toast } from 'vant';
    import { Component, Vue } from "vue-property-decorator";
    import { SET_LOGIN_INFO } from '../../store/types';
    import { login } from '../../models/login';

    @Component({
        name: 'login',
        components: {

        },
        beforeRouteEnter(to, from, next) {
            document.title = to.meta.title;
            next();
        }
    })
    
    export default class Login extends Vue {
        username = '';
        password = '';
        
        login() {
            try {
                login({
                    username: this.username,
                    password: this.password
                }).then(res => {
                    const { data, errcode, errmsg } = res.data;
                    if (errcode === 0) {
                        this.$store.dispatch(SET_LOGIN_INFO, data);
                        window.localStorage.setItem('token', data.token);
                        this.$router.push({
                            path: '/home',
                            query: {
                                userId: data.userId
                            }
                        })
                    }
                }).catch(err => {
                    Toast(err.data.errmsg);
                })
            } catch (err) {
                Toast(err.message);
            }
        }
        goRegister() {
            this.$router.replace({
                path: '/register'
            })
        }
    }
</script>
