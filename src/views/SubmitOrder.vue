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
                    <template #extra>
                        <span class="brief-price">{{ globalStore.currencyFormat(item.price * item.count)}}</span>
                    </template>
                </a-list-item>
            </template>
            <template #footer>
                <div class="list-footer">
                    <span class="cart-count">{{ globalStore.shoppingCartItems.length }}款，共{{ shoppingCartCounts() }}件</span>
                    <span>合计:<span class="brief-price">{{ totalPrice() }}</span></span>
                    <a-button type="primary">提交订单</a-button>
                </div>
            </template>
        </a-list>
    </div>
</template>

<script lang="ts" setup>
import { GlobalStore } from '@/stores/global-store';
import { ref } from 'vue';

const globalStore = GlobalStore();
const addressData = ref<any[]>([]);

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