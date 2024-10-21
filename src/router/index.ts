
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PropertyDetail from "../views/PropertyDetail.vue";
import Header from '../components/Header.vue';
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

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
      component: HomeView,
    },
    {
      path: '/Login',
      name: 'Login',
      components: {
        default: () => import('../views/Login.vue'),
        header: Header
      }
      component: () => import('../views/Login.vue'),
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
      component: () => import('../views/register1.vue'),
    },
    // {
    //   path: '/register_validation',
    //   name: 'register2',
    //   component: () => import('../views/register2.vue'),
    //   meta: { requiresAuth: true },
    // },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Get token from localStorage
  console.log('Token:', token);

  // If the user is logged in (token exists)
  if (token) {
    // If the route is login or register1 (the first registration page), redirect to home
    if (to.name === 'Login' || to.name === 'register1' || to.name === 'register2') {
      next({ name: 'home' });
    } else {
      next(); // Proceed to other routes
    }
  } else {
    // If the route requires auth and the token doesn't exist
    if (to.matched.some(record => record.meta.requiresAuth)) {
      next({ name: 'Login' });
    } else {
      next(); // Proceed to the route
    }
  }
});

export default router;
