<template>
</template>
<script lang="ts" setup>
import { GlobalStore } from '@/stores/global-store';
import { ref, onBeforeMount } from 'vue';
import sweetApi from '@/api/sweet';
import { message } from 'ant-design-vue';

const globalStore = GlobalStore();
console.log("%c Line:6 🍋 globalStore", "color:#ffffff;background:#ed9ec7", globalStore.shoppingCartItems);

onBeforeMount(() => {
    // let params:string[] = [];
    // for(let key in globalStore.shoppingCartItems){
    //     params.push(key)
    // }
    // sweetApi.getSweetDeatil(params).then((result:any)=>{
    //     if(result.success){
    //         console.log("%c Line:15 🍣 result", "color:#ffffff;background:#2eafb0", result);
            
    //     }else{
    //         message.error(result.message)
    //     }
    // })
})
</script>
<style scoped></style>