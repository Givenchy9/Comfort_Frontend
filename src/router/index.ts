import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PropertyDetail from "../views/PropertyDetail.vue";
import Header from '../components/Header.vue'

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
      path: '/huizen',
      name: 'huizen',
      component: () => import('../views/huizen.vue')
    },
    {
      path: '/property/:id', // New route for property details
      name: 'PropertyDetail',
      component: PropertyDetail, // Link to the PropertyDetail component
      props: true, // Pass parameters as props
    },
  ]
}) 

export default router;
