import { createRouter, createWebHistory } from 'vue-router'
import ShoppingCart from '@/views/ShoppingCart.vue'
import Index from '@/views/Index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/cart',
      name: 'cart',
      component: ShoppingCart
    },
  ],
})

export default router
