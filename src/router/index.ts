import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register1',
      component: () => import('../views/register1.vue')
    },
    {
      path: '/register_validation',
      name: 'register2',
      component: () => import('../views/register2.vue')
    },
    {
      path: '/hello',
      name: 'hello',
      component: () => import('../components/Header.vue')
    },
  ]
}) 

export default router
