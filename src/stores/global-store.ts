import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import { defineStore } from 'pinia'

export const GlobalStore = defineStore('globalStore', () => {
  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  let loginVisible:Ref<boolean> = ref(false);
  let spinning:Ref<boolean> = ref(false);
  let shoppingCartItems:Ref<any> = ref([]);

  const currencyFormat = (price:number) => {
    return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(price);
  }

  return { 
    // count, 
    // doubleCount, 
    // increment,
    loginVisible,
    spinning,
    shoppingCartItems,
    currencyFormat,
  }
})
