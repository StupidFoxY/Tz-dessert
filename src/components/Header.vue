<script setup lang="ts">
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons-vue';
import { ref, onBeforeMount } from 'vue'
import type { Ref } from 'vue'
import { GlobalStore } from '@/stores/global-store'

//相当于 angular @input
// defineProps<{
//   msg: string
// }>()

const globalStore = GlobalStore();
const userName: Ref<string> = ref('');

onBeforeMount(() => {
  let user = sessionStorage.getItem('user');
  userName.value = user ? JSON.parse(user).userName : '登录 | 注册'
})

const loginShow = () => {
    globalStore.loginVisible = true;
}

</script>

<template>
    <header class="bg-box">
        <div class="header">
            <div>
                <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
                <ul class="menu-list">
                    <li>首页</li>
                    <li>菜单</li>
                    <li>烘焙食谱</li>
                    <li>关于我们</li>
                </ul>
            </div>
            <ul class="action-list">
                <li @click="loginShow">
                    <UserOutlined style="font-size: 18px;"/>
                    <span>{{ userName }}</span>
                </li>
                <li>
                    <ShoppingCartOutlined style="font-size: 20px;"/>
                    <span>购物车</span>
                </li>
            </ul>
        </div>
        <h1>WELCOME TO THE <span class="theme-text">SWEET</span> SHOP</h1>
        <h4>No how sweet life, more is flatly light moved, feel that those with your heart, everything is as beautiful as cookies</h4>
    </header>
</template>

<style>
.bg-box {
    height: 800px;
    /* background-image: url('../assets/home-bg.jpeg'); */
    background-color: #ccc;
    background-size: cover;
    background-position: center;
    padding-top: 20px;
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