import { createRouter, createWebHistory } from "vue-router";
import PropertyDetail from "../views/PropertyDetail.vue";

// Middleware to check for admin role
function isAdmin(to: any, from: any, next: any) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.role === 'admin') {
    next();
  } else {
    next('/'); // Redirect to home or login if not admin
  }
}

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
      beforeEnter: isAdmin, // Protect the route
    },
    {
      path: '/adminhuizen',
      name: 'adminhuizen',
      components: {  
        default: () => import('../views/AdminHuizen.vue'),
      },
    },
    {
      path: '/users',
      name: 'users',
      components: {  
        default: () => import('../views/users.vue'),
      },
    },
    {
      path: '/huizen',
      name: 'Huizen',
      component: () => import('@/views/Huizen.vue'),
    },
    {
      path: '/property/:id', 
      name: 'PropertyDetail',
      component: PropertyDetail, 
      props: true,
    },
  ]
});

export default router;
