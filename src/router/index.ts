import { createRouter, createWebHistory } from "vue-router";
import PropertyDetail from "../views/PropertyDetail.vue";

// Middleware to check for admin role
function isAdmin(to: any, from: any) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.role === 'admin') {
    return true; // Allow navigation
  } else {
    return '/'; // Redirect to home or login
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register1',
      component: () => import('../views/register1.vue'),
    },
    {
      path: '/register_validation',
      name: 'register2',
      component: () => import('../views/register2.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin.vue'),
      beforeEnter: isAdmin, // Protect the route
      children: [
        {
          path: 'users', // Relative path
          name: 'users',
          component: () => import('../views/admin/users.vue'),
        },
        {
          path: 'huizen', // Relative path
          name: 'AdminHuizen',
          component: () => import('../views/admin/AdminHuizen.vue'),
        },
      ],
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
      component: () => import('../views/settings.vue'),
      children: [
        {
          path: 'update_account', // No leading '/'
          name: 'update_account',
          component: () => import('../views/settings/update_account.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('../views/settings/profile.vue'),
        },
        {
          path: 'become_complete',
          name: 'become_complete',
          component: () => import('../views/settings/become_complete.vue'),
        },
      ],
    },
    {
      path: '/property/:id',
      name: 'PropertyDetail',
      component: PropertyDetail,
      props: true,
    },
    {
      path: '/huis-toevoegen',
      name: 'HuisToevoegen',
      component: () => import('../views/huis-toevoegen.vue'),
    },
  ],
});

export default router;
