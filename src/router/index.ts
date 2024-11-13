import { createRouter, createWebHistory } from "vue-router";
import PropertyDetail from "../views/PropertyDetail.vue";
import Header from '../components/Header.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {  // Using 'components' for named views
        default: () => import('../views/HomeView.vue'),
        header: Header,
      }
    },
    {
      path: '/Login',
      name: 'Login',
      components: {  // Using 'components' for named views
        default: () => import('../views/Login.vue'),
        header: Header,
      }
    },
    {
      path: '/register',
      name: 'register1',
      components: {  // Using 'components' for named views
        default: () => import('../views/register1.vue'),
        header: Header,
      }
    },
    {
      path: '/register_validation',
      name: 'register2',
      components: {  // Using 'components' for named views
        default: () => import('../views/register2.vue'),
        header: Header,
      }
    },
    {
      path: '/huizen',
      name: 'Huizen',
      component: () => import('@/views/Huizen.vue')  // Single component, no named views, so 'component' is correct
    },
    {
      path: '/property/:id', // New route for property details
      name: 'PropertyDetail',
      component: PropertyDetail, // Single component, no named views, so 'component' is correct
      props: true, // Pass parameters as props
    },
    {
      path: '/settings',  // The URL path for the settings page
      name: 'Settings',    // The name of the route
      components: {        // Using 'components' for named views
        default: () => import('../views/settings.vue'), // Lazy-load the settings component
        header: Header,    // You can keep the header component if it's used globally
      }
    }, 
  ]
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
