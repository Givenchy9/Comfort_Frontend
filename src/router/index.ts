import { createRouter, createWebHistory } from "vue-router";
import PropertyDetail from "../views/PropertyDetail.vue";

// Middleware to check if the user has a token (logged in)
function checkAuth(to: any, from: any, next: any) {
  const token = localStorage.getItem('token'); // Check for token in localStorage
  if (token) {
    next(); // Token exists, allow navigation
  } else {
    next('/login'); // No token, redirect to login page
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
      children: [
        {
          path: '/users', // Relative path
          name: 'users',
          component: () => import('../views/admin/users.vue'),
        },
        {
          path: '/AdminHuizen', // Relative path
          name: 'AdminHuizen',
          component: () => import('../views/admin/AdminHuizen.vue'),
        },
      ],
    },
    {
      path: '/huizen',
      name: 'Huizen',
      component: () => import('@/views/Huizen.vue'),
      beforeEnter: checkAuth, // Protect the route with checkAuth
    },
    {
      path: '/huizen2',
      name: 'Huizen2',
      component: () => import('@/views/Huizen2.vue'),
      beforeEnter: checkAuth, // Protect the route with checkAuth
    },
    {
      path: '/huizen_toevoegen',
      name: 'huizen_toevoegen',
      component: () => import('@/views/huizen_toevoegen.vue'),
      beforeEnter: checkAuth, // Protect the route with checkAuth
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/settings.vue'),
      beforeEnter: checkAuth, // Protect the route with checkAuth
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
      path: '/settings2',
      name: 'settings2',
      component: () => import('../views/settings2.vue'),
      beforeEnter: checkAuth, // Protect the route with checkAuth
      children: [
        {
          path: 'update_account2', // No leading '/'
          name: 'update_account2',
          component: () => import('../views/settings2/update_account2.vue'),
        },
        {
          path: 'profile2',
          name: 'profile2',
          component: () => import('../views/settings2/profile2.vue'),
        },
        {
          path: 'become_complete2',
          name: 'become_complete2',
          component: () => import('../views/settings2/become_complete2.vue'),
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
    {
      path: '/complete',
      name: 'complete',
      component: () => import('../views/HomeView2.vue'),
    },
  ],
});

export default router;
