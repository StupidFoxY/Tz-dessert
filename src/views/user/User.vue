<template>
    <div class="content">
        <div class="aside">
            <div class="avatar">
                <img :src="user.avatar"/>
            </div>
            <ul>
                <li>
                    <RouterLink to="/user/order">我的订单</RouterLink>
                </li>
                <li>
                    <RouterLink to="/user/information">账户资料</RouterLink>
                </li>
                <li>
                    <RouterLink to="/user/address">收货地址</RouterLink>
                </li>
            </ul>
        </div>
        <div class="router-view">
            <RouterView />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
const user = ref<any>({});
</script>
<style scoped>
.content {
    max-width: 1220px;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
}
.content .aside {
    width: 200px;
}
.content .router-view {
    flex: 1;
}
</style>