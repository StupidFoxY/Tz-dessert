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
    
})
</script>
<style scoped></style>