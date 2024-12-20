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
                                    <RouterLink to="/user">个人中心</RouterLink>
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
                <li>
                    <a-popover v-model:open="showCart" trigger="click" placement="bottomRight">
                        <template #title>
                            <div class="popover-title">
                                <span>购物车</span>
                                <a-button type="primary" @click="gotoCart" size="small">查看购物车</a-button>
                            </div>
                        </template>
                        <template #content>
                            <ul class="cart-list">
                                <li class="cart-item" v-for="item in globalStore.shoppingCartItems">
                                    <img :src="item.img" alt="">
                                    <div class="cart-item-info">
                                        <div class="cart-item-name">{{ item.name }}</div>
                                        <div class="cart-item-count">x {{ item.count }}</div>
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <a-badge :count="shoppingCartCounts()">
                            <ShoppingCartOutlined style="font-size: 20px;"/>
                            <span class="shopping-cart-text">购物车</span>
                        </a-badge>
                    </a-popover>
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

<script setup lang="ts">
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons-vue';
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { getCookie, removeCookie } from 'typescript-cookie';

import Login from './Login.vue';

import { GlobalStore } from '@/stores/global-store';
import userApi from '@/api/user';
import sweetApi from '@/api/sweet';

//相当于 angular @input
// defineProps<{
//   msg: string
// }>()

const globalStore = GlobalStore();
const user = ref<any>();
const home = ref<boolean>(true);
const router = useRouter();
const showCart = ref<boolean>(false);

onBeforeMount(() => {
    let userStorage:string | null = sessionStorage.getItem('user');
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

    let cartItemsStr:string | null = localStorage.getItem('shoppingCartItems');
    if(cartItemsStr){
        let cartItems = JSON.parse(cartItemsStr);
        let ids = []
        for(let key in cartItems){
            ids.push(key);
        }
        sweetApi.getSweetDeatil(ids).then((result:any) => {
            console.log("%c Line:124 🍎 result", "color:#ffffff;background:#fca650", result);   
            if(result.success){
                result.data.forEach((item:any)=>{
                    item.count = cartItems[item.id]
                })
                globalStore.shoppingCartItems = result.data
            }
        })
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

const gotoCart = () => {
    showCart.value = false;
    if(!user.value){
        globalStore.loginVisible = true;
        return;
    }
    routerTo('/shoppingcart');
}

const shoppingCartCounts = () => {
    let count:number = 0;
    globalStore.shoppingCartItems.forEach((item:any)=>{
        count += item.count
    })
    return count;
}

</script>

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
    max-width: 1220px;
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
    margin-right: 7px;
}
:deep(.ant-badge .ant-badge-count) {
    top: 3px;
}
.popover-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}
.popover-title > span {
    font-weight: 600;
    font-size: 16px;
}
.cart-list {
    margin-bottom: 0;
}
.cart-item {
    display: flex;
    align-items: center;
}
.cart-item:not(:first-of-type) {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #e9e9e9;
}
.cart-item img {
    width: 50px;
    margin-right: 15px;
}
.cart-item-info {
    min-width: 200px;
}
.cart-item-info .cart-item-name {
    font-size: 16px;
}
.cart-item-info .cart-item-count {
    color: #999;
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