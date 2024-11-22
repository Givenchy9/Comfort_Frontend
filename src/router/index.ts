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
        // header: Header,
      }
    },
    {
      path: '/Login',
      name: 'Login',
      components: {
        default: () => import('../views/Login.vue'),
        // header: Header,
      }
    },
    {
      path: '/register',
      name: 'register1',
      components: {
        default: () => import('../views/register1.vue'),
        // header: Header,
      }
    },
    {
      path: '/register_validation',
      name: 'register2',
      components: {
        default: () => import('../views/register2.vue'),
        // header: Header,
      }
    },
    {
      path: '/admin',
      name: 'admin',
      components: {  // Using 'components' for named views
        default: () => import('../views/admin.vue'),
        // header: Header,
      }
    },
    {
      path: '/adminhuizen',
      name: 'adminhuizen',
      components: {  // Using 'components' for named views
        default: () => import('../views/AdminHuizen.vue'),
        // header: Header,
      }
    },
    {
      path: '/users',
      name: 'users',
      components: {  // Using 'components' for named views
        default: () => import('../views/users.vue'),
        // header: Header,
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
      path: '/settings',  // The URL path for the settings page
      name: 'Settings',    // The name of the route
      components: {        // Using 'components' for named views
        default: () => import('../views/settings.vue'), // Lazy-load the settings component
        //header: Header,    // You can keep the header component if it's used globally
      }
    },
    // New Route for Huis Toevoegen
    {
      path: '/huis-toevoegen',
      name: 'HuisToevoegen',
      components: {
        default: () => import('../views/huis-toevoegen.vue'),
        //header: Header,
      }
    },
   ]
});

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Get token from localStorage
  const userEmail = localStorage.getItem('userEmail', 'admin@example.com'); // Get the user email (you might be storing this in localStorage)

  // Debugging logs
  console.log('beforeEach:');
  console.log('Token:', token);
  console.log('User Email:', userEmail);

  // Check if the user is logged in (token exists)
  if (token) {
    console.log('Token exists, checking user email...');

    // Check if the user email matches the admin email
    if (userEmail === "admin@example.com") {
      console.log('User is admin, redirecting to admin page...');
      
      // If not already on the admin page, redirect to admin
      if (to.name !== 'admin') {
        console.log('Redirecting to admin...');
        next({ name: 'admin' });
      } else {
        console.log('Already on admin page, continuing...');
        next();
      }
    } else {
      console.log('User is not admin, proceeding to requested route...');
      
      // Normal behavior for non-admin users
      if (to.name === 'Login' || to.name === 'register1' || to.name === 'register2') {
        next({ name: 'home' });
      } else {
        next(); // Proceed to other routes
      }
    }
  } else {
    console.log('No token found, redirecting to login...');
    
    // If the route requires authentication and no token exists, redirect to login
    if (to.matched.some(record => record.meta.requiresAuth)) {
      next({ name: 'Login' });
    } else {
      next();
    }
  }
});

export default router;
