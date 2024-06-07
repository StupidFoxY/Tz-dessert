<script setup lang="ts">

const toggleTab = (tab: string) => {
    console.log("%c Line:4 🍤 tab", "color:#ffffff;background:#2eafb0", tab);
}
</script>

<template>
  <div class="hot-selling">
    <h1>甜品美食</h1>
    <ul class="tabs-list">
        <li @click="toggleTab('cake')">蛋糕</li>
        <li @click="toggleTab('bread')">面包</li>
        <li @click="toggleTab('cookies')">饼干</li>
        <li @click="toggleTab('sweet')">小食</li>
    </ul>
  </div>
</template>

<style scoped>
.hot-selling{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.tabs-list {
    display: flex;
    margin: 0 auto;
}
.tabs-list li {
    padding: 0 10px;
    cursor: pointer;
}
.tabs-list li:not(:first-of-type) {
    border-left: 1px solid var(--color-text);
}
.tabs-list li:hover {
    color: var(--color-theme);
}
</style>
