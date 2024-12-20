<template>
    <div class="content">
        <a-steps
            :current="2"
            size="small"
            :items="stepTitle"
            class="step"         
        ></a-steps>
        选择支付方式
    </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
const stepTitle = reactive<any[]>([
    { title: '购物车' },
    { title: '提交订单' },
    { title: '确认支付' },
]);

</script>
<style scoped>
.content{
    max-width: 1220px;
    margin: 0 auto;
    margin-top: 50px;
}
.step {
    margin-bottom: 40px;
}
</style>