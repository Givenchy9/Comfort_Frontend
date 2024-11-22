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
      path: '/huizen',
      name: 'Huizen',
      component: () => import('@/views/Huizen.vue'),
    },
    {
      path: '/huizen_toevoegen',
      name: 'huizen_toevoegen',
      component: () => import('@/views/huizen_toevoegen.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/settings.vue'),
    },
    {
      path: '/property/:id', 
      name: 'PropertyDetail',
      component: PropertyDetail, 
      props: true,
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings.vue'),
      children: [
        {
          path: '/update_account',
          name: 'update_account',
          component: () => import('../views/settings/update_account.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../views/settings/profile.vue')
        },
        {
          path: '/become_complete',
          name: 'become_complete',
          component: () => import('../views/settings/become_complete.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin.vue'),
      children: [
        {
          path: '/users',
          name: 'users',
          component: () => import('../views/admin/users.vue')
        },
        {
          path: '/AdminHuizen',
          name: 'AdminHuizen',
          component: () => import('../views/admin/AdminHuizen.vue')
        },
      ]
    }
  ]
});

export default router;
