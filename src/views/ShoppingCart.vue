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
                            <span>￥{{ item.price }}</span>
                        </template>
                    </a-list-item-meta>

                    <template #actions>
                        <a-input-number id="inputNumber" v-model:value="item.count" :min="1" :max="99" class="input-count"/>
                    </template>
                    <template #extra>
                        <div class="list-extra">
                            <span class="brief-price">￥{{ item.price * item.count}}</span>
                            <a-button shape="circle" :icon="h(CloseOutlined)" size="small" style="font-size: 10px;"/>
                        </div>
                    </template>
                </a-list-item>
            </template>
            <template #footer>
                <div>
                    <b>ant design vue</b>
                    footer part
                </div>
            </template>
        </a-list>
    </div>
</template>
<script lang="ts" setup>
import { GlobalStore } from '@/stores/global-store';
import { ref, onBeforeMount } from 'vue';
import { h } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import sweetApi from '@/api/sweet';
import { message } from 'ant-design-vue';

const globalStore = GlobalStore();
console.log("%c Line:6 🍋 globalStore", "color:#ffffff;background:#ed9ec7", globalStore.shoppingCartItems);

onBeforeMount(() => {
    
})
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
.list-extra .brief-price {
    color: brown;
    font-size: 20px;
}
</style>