import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PropertyDetail from "../views/PropertyDetail.vue";
import Header from '../components/Header.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: HomeView,
        header: Header
      }
    },
    {
      path: '/Login',
      name: 'Login',
      components: {
        default: () => import('../views/Login.vue'),
        header: Header
      }
    },
    {
      path: '/register',
      name: 'register1',
      components: {
        default: () => import('../views/register1.vue'),
        header: Header
      }
    },
    {
      path: '/register_validation',
      name: 'register2',
      components: {
        default: () => import('../views/register2.vue'),
        header: Header
      }
    },
    {
      path: '/huizen',
      name: 'Huizen',
      component: () => import('@/views/Huizen.vue')
    },
    {
      path: '/property/:id', // New route for property details
      name: 'PropertyDetail',
      component: PropertyDetail, // Link to the PropertyDetail component
      props: true, // Pass parameters as props
    },
  ]
});

export default router;
