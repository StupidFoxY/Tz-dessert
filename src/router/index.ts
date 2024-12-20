import { createRouter, createWebHistory } from 'vue-router'
import User from '../views/user/User.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/sweetlist',
      name: 'sweetlist',
      component: () => import('@/views/SweetList.vue')
    },
    {
      path: '/cookbook',
      name: 'cookbook',
      component: () => import('@/views/CookBook.vue')
    },
    {
      path: '/aboutus',
      name: 'aboutus',
      component: () => import('@/views/AboutUs.vue')
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: () => import('@/views/ShoppingCart.vue')
    },
    {
      path: '/submitorder',
      name: 'submitorder',
      component: () => import('@/views/SubmitOrder.vue')
    },
    {
      path: '/payway',
      name: 'payway',
      component: () => import('@/views/PayWay.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      children: [
        {
          path: '',
          redirect: '/user/order'
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('@/views/user/Order.vue'),
        },
        {
          path: 'address',
          name: 'address',
          component: () => import('@/views/user/Address.vue'),
        },
        {
          path: 'information',
          name: 'information',
          component: () => import('@/views/user/Information.vue'),
        }
      ]
    },
  ]
})

export default router
