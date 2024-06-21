<template>
    <div class="content">
        <a-list item-layout="horizontal" :data-source="globalStore.shoppingCartItems" :bordered="true">
            <template #renderItem="{ item }">
                <a-list-item>
                    <a-list-item-meta>
                        <template #avatar>
                            <img :src="item.img" width="50px"/>
                        </template>
                        <template #title>
                            <a href="" class="list-title">{{ item.name }}</a>
                        </template>
                        <template #description>
                            <span>{{ globalStore.currencyFormat(item.price) }}</span>
                        </template>
                    </a-list-item-meta>

                    <template #actions>
                        <a-input-number id="inputNumber" v-model:value="item.count" :min="1" :max="99" class="input-count"/>
                    </template>
                    <template #extra>
                        <div class="list-extra">
                            <span class="brief-price">{{ globalStore.currencyFormat(item.price * item.count)}}</span>
                            <a-button shape="circle" :icon="h(CloseOutlined)" size="small" style="font-size: 10px;" @click="removeItem(item)"/>
                        </div>
                    </template>
                </a-list-item>
            </template>
            <template #footer>
                <div class="list-footer">
                    <span class="cart-count">已选{{ shoppingCartCounts() }}商品,</span>
                    <span>合计:<span class="brief-price">{{ totalPrice() }}</span></span>
                    <a-button type="primary">结算</a-button>
                </div>
            </template>
        </a-list>
    </div>
</template>

<script lang="ts" setup>
import { GlobalStore } from '@/stores/global-store';
import { ref } from 'vue';
import { h } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';

const globalStore = GlobalStore();

const shoppingCartCounts = () => {
    let count:number = 0;
    globalStore.shoppingCartItems.forEach((item:any)=>{
        count += item.count
    })
    return count;
}

const totalPrice = () => {
    let price = 0;
    globalStore.shoppingCartItems.forEach((item:any)=>{
        price += (item.count * item.price);
    })
    return globalStore.currencyFormat(price);
}

const removeItem = (curItem:any) => {
    globalStore.shoppingCartItems = globalStore.shoppingCartItems.filter((item:any)=> curItem != item);
    localStorage.setItem('shoppingCartItems', JSON.stringify(globalStore.shoppingCartItems));
}
</script>

<style scoped>
.content{
    max-width: 1024px;
    margin: 0 auto;
    margin-top: 50px;
}
.input-count {
    width: 50px;
}
:deep(.ant-list .ant-list-item .ant-list-item-meta){
    align-items: center;
}
.list-title {
    font-size: 18px;
}
.list-extra {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 150px;
    margin-left: 30px;
}
.brief-price {
    color: brown;
    font-size: 18px;
}
.list-footer {
    text-align: right;
}
.list-footer .cart-count {
    color: #999;
    margin-right: 5px;
}
.list-footer .brief-price {
    margin-left: 5px;
    margin-right: 20px;
}
</style>