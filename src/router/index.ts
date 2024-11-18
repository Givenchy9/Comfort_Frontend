import { createRouter, createWebHistory } from "vue-router";
import PropertyDetail from "../views/PropertyDetail.vue";
import Header from '../components/Header.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: () => import('../views/HomeView.vue'),
        header: Header,
      }
    },
    {
      path: '/Login',
      name: 'Login',
      components: {
        default: () => import('../views/Login.vue'),
        header: Header,
      }
    },
    {
      path: '/register',
      name: 'register1',
      components: {
        default: () => import('../views/register1.vue'),
        header: Header,
      }
    },
    {
      path: '/register_validation',
      name: 'register2',
      components: {
        default: () => import('../views/register2.vue'),
        header: Header,
      }
    },
    {
      path: '/huizen',
      name: 'Huizen',
      component: () => import('@/views/Huizen.vue')
    },
    {
      path: '/property/:id',
      name: 'PropertyDetail',
      component: PropertyDetail,
      props: true
    },
    {
      path: '/settings',
      name: 'Settings',
      components: {
        default: () => import('../views/settings.vue'),
        header: Header,
      }
    },
    // New Route for Huis Toevoegen
    {
      path: '/huis-toevoegen',
      name: 'HuisToevoegen',
      components: {
        default: () => import('../views/huis-toevoegen.vue'),
        header: Header,
      }
    },
   ]
});

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  console.log('Token:', token);

  if (token) {
    if (to.name === 'Login' || to.name === 'register1' || to.name === 'register2') {
      next({ name: 'home' });
    } else {
      next();
    }
  } else {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      next({ name: 'Login' });
    } else {
      next();
    }
  }
});

export default router;
