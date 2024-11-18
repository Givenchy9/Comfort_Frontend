import { createRouter, createWebHistory } from "vue-router";
import PropertyDetail from "../views/PropertyDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: {  
        default: () => import('../views/HomeView.vue'),
      }
    },
    {
      path: '/Login',
      name: 'Login',
      components: {  
        default: () => import('../views/Login.vue'),
      }
    },
    {
      path: '/register',
      name: 'register1',
      components: {  
        default: () => import('../views/register1.vue'),
      }
    },
    {
      path: '/register_validation',
      name: 'register2',
      components: {  
        default: () => import('../views/register2.vue'),
      }
    },
    {
      path: '/admin',
      name: 'admin',
      components: {  
        default: () => import('../views/admin.vue'),
      },
      meta: { requiresAdmin: true } // Protected admin route
    },
    {
      path: '/adminhuizen',
      name: 'adminhuizen',
      components: {  
        default: () => import('../views/AdminHuizen.vue'),
      },
      meta: { requiresAdmin: true } // Protected admin route
    },
    {
      path: '/users',
      name: 'users',
      components: {  
        default: () => import('../views/users.vue'),
      },
      meta: { requiresAuth: true } // Protected route for authenticated users
    },
    {
      path: '/huizen',
      name: 'Huizen',
      component: () => import('@/views/Huizen.vue'),
      meta: { requiresAuth: true } // Protected route for authenticated users
    },
    {
      path: '/property/:id', 
      name: 'PropertyDetail',
      component: PropertyDetail, 
      props: true,
      meta: { requiresAuth: true } // Protected route for authenticated users
    },
  ]
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token"); // Check if the user is logged in
  const userRole = localStorage.getItem("role"); // Check the user's role

  console.log('beforeEach Navigation Guard:');
  console.log('Token:', token);
  console.log('User Role:', userRole);

  // If the route requires authentication and there's no token, redirect to login
  if (to.matched.some(record => record.meta.requiresAuth || record.meta.requiresAdmin)) {
    if (!token) {
      console.log("No token found, redirecting to login...");
      return next({ name: "home" }); // Redirect to login
    }

    // If the route requires admin access, check the role
    if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (userRole !== "admin") {
        console.log("User is not admin, redirecting to home...");
        return next({ name: "home" }); // Redirect to home for non-admin users
      }
    }
  }

  // Proceed to the route if no restrictions or checks are required
  next();
});

export default router;
