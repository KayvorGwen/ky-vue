<template>
  <div id="app">
    <van-nav-bar 
    class="header"
    title="标题"
    left-text="返回"
    right-text="按钮"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    v-show="isHeader"
    />
    <div class="main-box">
        <transition>
            <keepAlive>
                <router-view class="demo-content"></router-view>
            </keepAlive>
        </transition>
    </div>

    <van-tabbar
        class="tools"
        v-model="active"
        active-color="#07c160"
        inactive-color="#000"
        v-show="isTabber"
        >
        <van-tabbar-item icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item icon="search">标签</van-tabbar-item>
        <van-tabbar-item icon="freinds-o">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>

  </div>
</template>
<script lang="ts">
import _ from 'lodash';
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Tabbar, TabbarItem, NavBar, Toast } from 'vant';

@Component({
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem,
        [NavBar.name]: NavBar
    }
})
export default class App extends Vue {
    active = 0;
    icon = {
        normal: '//img.yzcdn.cn/icon-normal.png',
        active: '//img.yzcdn.cn/icon-active.png'
    }
    isHeader = false;
    isTabber = false;

    @Watch('$route')
    routerChangeHalder(newVal: any) {console.log(newVal.path === '/' || newVal.path === '/register')
        if (newVal.path === '/' || newVal.path === '/register') {
            this.isHeader = false;
            this.isTabber = false;
        } else {
            this.isHeader = true;
            this.isTabber = true;
        }
    }

    onClickLeft() {
      Toast('返回');
    }

    onClickRight() {
      Toast('按钮');
    }
}
</script>

<style lang="less">
    html {
        height: 100%;
        width: 100%;
    }
    body {
        height: 100%;
        max-width: 750px;
        margin: 0 auto !important;
    }
    *,*:before,*:after {
        max-height:100000px;
    }
    #app {
        position: relative;
        background-color: #efefef;
        width: 100%;
        height: 100%;
        .main-box {
            position: relative;
            overflow: hidden;
            width: 100%;
            height: ~'calc(100% - 96px)';
            .demo-content {
                position: absolute;
                overflow-y: auto;
                width: 100%;
                height: 100%;
            }
        }
        .header {

        }
        .tools {
            position: absolute !important;
        }
    }
</style>
