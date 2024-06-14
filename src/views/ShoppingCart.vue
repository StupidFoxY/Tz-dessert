<template></template>
<script lang="ts" setup>
import { GlobalStore } from '@/stores/global-store';

const globalStore = GlobalStore();
console.log("%c Line:6 🍋 globalStore", "color:#ffffff;background:#ed9ec7", globalStore.shoppingCartItems);
</script>
<style scoped></style>