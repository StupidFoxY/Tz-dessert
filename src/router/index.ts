import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/sweetlist',
      name: 'sweetlist',
      component: () => import('../views/SweetList.vue')
    },
    {
      path: '/cookbook',
      name: 'cookbook',
      component: () => import('../views/CookBook.vue')
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: () => import('../views/AboutUs.vue')
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: () => import('../views/ShoppingCart.vue')
    },
  ]
})

export default router
