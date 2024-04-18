<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Login from './components/Login.vue';

import { GlobalStore } from '@/stores/global-store'

const globalStore = GlobalStore();

const delayTime = 500;
</script>

<template>
  <a-spin :spinning="globalStore.spinning" :delay="delayTime">
    <Header />
    <Login />
    <RouterView />
  </a-spin>
</template>

<style scoped>

</style>
