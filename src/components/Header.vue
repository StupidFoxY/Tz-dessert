<script setup lang="ts">
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons-vue';
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { getCookie, removeCookie } from 'typescript-cookie';
import type { Ref } from 'vue';

import Login from './Login.vue';

import { GlobalStore } from '@/stores/global-store';
import userApi from '@/api/user';

//相当于 angular @input
// defineProps<{
//   msg: string
// }>()

const globalStore = GlobalStore();
const user: Ref<any> = ref();
const home: Ref<Boolean> = ref(true);
const router = useRouter();

onBeforeMount(() => {
    let userStorage = sessionStorage.getItem('user');
    if(userStorage){
        user.value = JSON.parse(userStorage);
    }else{
        let token = getCookie('token');
        if(token){
            sessionStorage.setItem('token',token);
            userApi.getUserInfo().then((result:any)=>{
                if(result.success){
                    sessionStorage.setItem('user',JSON.stringify(result.data.user));
                    user.value = result.data.user;
                }
            })
        }
    }
})
router.beforeEach((to, from) => {
    home.value = to.name == 'home' ? true : false
})

const loginShow = () => {
    if(!user.value){
        globalStore.loginVisible = true;
    }
}

const signOut = () => {
    sessionStorage.clear();
    removeCookie('token', { path: '' });
    user.value = null;
}

const logined = () => {
    let userStorage = sessionStorage.getItem('user');
    if(userStorage){
        user.value = JSON.parse(userStorage);
    }
}

const routerTo = (path: string) => {
    router.push(path)
}

</script>

<template>
    <header class="bg-box" :class="{'home':home}">
        <div class="header">
            <div>
                <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
                <ul class="menu-list">
                    <li @click="routerTo('/')">首页</li>
                    <li @click="routerTo('/sweetlist')">甜品美食</li>
                    <li @click="routerTo('/cookbook')">烘焙食谱</li>
                    <li @click="routerTo('/aboutus')">关于我们</li>
                </ul>
            </div>
            <ul class="action-list">
                <li @click="loginShow">
                    <a-dropdown :placement="'bottom'" :trigger="['click']" v-if="user">
                        <span>
                            <UserOutlined style="font-size: 18px;"/>
                            <span>{{ user.username }}</span>
                        </span>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item>
                                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                                        个人中心
                                    </a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a @click="signOut">
                                        退出登录
                                    </a>
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                    <template v-else>
                        <UserOutlined style="font-size: 18px;"/>
                        <span>登录 | 注册</span>
                    </template>
                </li>
                <li @click="routerTo('/shoppingcart')">
                    <ShoppingCartOutlined style="font-size: 20px;"/>
                    <a-badge :count="Object.keys(globalStore.shoppingCartItems).length">
                        <span class="shopping-cart-text">购物车</span>
                    </a-badge>
                </li>
            </ul>
        </div>
        <template :v-if="home">
            <h1>WELCOME TO THE <span class="theme-text">SWEET</span> SHOP</h1>
            <h4>No how sweet life, more is flatly light moved, feel that those with your heart, everything is as beautiful as cookies</h4>
        </template>
    </header>
    <Login @logined="logined"/>
</template>

<style scoped>
.bg-box {
    height: 300px;
    /* background-image: url('../assets/home-bg.jpeg'); */
    background-color: #ccc;
    background-size: cover;
    background-position: center;
    padding-top: 20px;
}
.bg-box.home {
    height: 800px;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    max-width: 1024px;
    margin: 0 auto;
}
.header > div,
.menu-list,
.action-list,
.action-list li {
    display: flex;
    color: #fff;
    justify-content: center;
    align-items: center;
}
.header > div {
    align-items: flex-end;
}
.menu-list li {
    margin-left: 50px;
}
.menu-list li:hover {
    color: var(--color-theme);
}
.menu-list li,
.action-list li {
    cursor: pointer;
}
.action-list li:not(:first-of-type) {
    margin-left: 20px;
}
.action-list li span {
    margin-left: 4px;
    color: #fff;
}
.action-list li span.shopping-cart-text {
    margin-right: 10px;
}
.bg-box h1,
.bg-box h4 {
    width: 820px;
    text-align: center;
    color: #fff;
    margin: auto;
}
.bg-box h1 {
    font-family: fantasy;
    font-size: 70px;
    margin-top: 250px;
}
</style>