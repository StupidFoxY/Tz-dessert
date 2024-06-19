<template>
    <div>
        <a-menu 
            v-model:selectedKeys="currentMenu"
            mode="horizontal"
            @click="tabClick"
            :items="menus"
        />
    </div>
    <div class="list-box">
        <a-card hoverable style="width: 240px; margin-right: 50px;" v-for="item in sweetList">
            <template #cover>
                <img alt="example" :src="item.img" />
            </template>
            <a-card-meta :title="item.name">
                <template #description>
                    <div class="card-des">
                        <span>￥{{ item.price }}</span>
                        <a-button type="primary" shape="circle" :icon="h(ShoppingCartOutlined)" @click.stop="()=>{addShoppingCart(item)}"/>
                    </div>
                </template>
            </a-card-meta>
        </a-card>
    </div>
</template>

<script lang="ts" setup>
import { h } from 'vue';
import { ShoppingCartOutlined } from '@ant-design/icons-vue';
import { ref, onBeforeMount } from 'vue';

import type { MenuProps } from 'ant-design-vue';
import sweetApi from '@/api/sweet';
import { GlobalStore } from '@/stores/global-store';

const globalStore = GlobalStore();
const sweetList = ref<any[]>([]);
const sweetListAll = ref<any[]>([]);
const currentMenu = ref<string[]>(['cake']);
const menus = ref<any[]>([
    { key: 'cake', label: '蛋糕' },
    { key: 'bread', label: '面包' },
    { key: 'cookies', label: '饼干' },
    { key: 'sweet', label: '小食' },
]);

onBeforeMount(() => {
    sweetApi.getSweetList().then((result:any)=>{
        if(result.success){
            sweetListAll.value = result.data;
            sweetList.value = sweetListAll.value.filter((item) => item.type == 'cake');
            console.log("%c Line:14 🥒 sweetlist.value", "color:#ffffff;background:#6ec1c2", sweetList.value);
        }
    })

})

const tabClick: MenuProps['onClick'] = (e) => {
    sweetList.value = sweetListAll.value.filter((item) => item.type == e.key);
};
const addShoppingCart = (item:any) => {
    let exist:boolean = false;
    globalStore.shoppingCartItems.forEach((cartItem:any) => {
        if(cartItem.id == item.id){
            exist = true;
            cartItem.count++;
        }
    });
    if(!exist){
        globalStore.shoppingCartItems.push({...item,count:1});
    }
    localStorage.setItem('shoppingCartItems',JSON.stringify(globalStore.shoppingCartItems));
};
</script>

<style scoped>
:deep(.ant-menu) {
    justify-content: center;
}
.list-box {
    display: flex;
    max-width: 1024px;
    margin: 0 auto;
    margin-top: 50px;
    flex-wrap: wrap;
}
.card-des {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>