<template>
    <div class="content">
        <div class="address-box" v-for="addItem in addressData">
            <div class="add-item-box">
                <div class="name-box">
                    <span>{{ addItem.name }}</span>
                    <span>{{ addItem.provinceName }}</span>
                </div>
                <div class="deail-box">
                    <span>{{ addItem.name }}</span>
                    <span>{{ addItem.provinceName }}</span>
                    <span>{{ addItem.cityName }}</span>
                    <span>{{ addItem.countyName }}</span>
                    <span v-if="addItem.townName">{{ addItem.townName }}</span>
                    <span>{{ addItem.address }}</span>
                    <span>{{ addItem.phone }}</span>
                    <span v-if="addItem.default">默认地址</span>
                </div>
            </div>
        </div>
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
import { ref, onBeforeMount } from 'vue';
import userApi from '@/api/user';

const globalStore = GlobalStore();
const addressData = ref<any[]>([]);

onBeforeMount(() => {
    userApi.getAddress().then((result:any)=>{
        if(result.success){
            let defaultAdd:any
            result.data.forEach((item:any) => {
                if(item.default){
                    item.checked = true;
                    defaultAdd = item;
                }else{
                    item.checked = false;
                    addressData.value.push(item);
                }
            });
            if(defaultAdd){
                addressData.value.unshift(defaultAdd);
            }else{
                addressData.value[0].checked = true;
            }
        }
    })
})

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

.add-item-box {
    width: 100%;
    margin: 6px 0;
    display: flex;
    align-items: center;
    font-size: 12px;
}
.name-box {
    position: relative;
    border: 1px solid #ddd;
    height: 18px;
    line-height: 18px;
    padding: 5px 10px;
    width: 120px;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    height: 30px;
    box-sizing: border-box;
}
.name-box:hover,
.name-box.add-checked {
    border: 2px solid #e4393c;
    padding: 4px 10px;
}
.name-box.add-checked::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 12px;
    height: 12px;
    overflow: hidden;
    background: url(//misc.360buyimg.com/user/purchase/2.0.0/css/i/selected-icon.png) no-repeat;
}
.add-item-box:hover .deail-box {
    flex: 1;
    background: #ffe4e5;
    height: 30px;
    line-height: 30px;
}
</style>