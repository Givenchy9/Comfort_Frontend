<template>
    <div>
      <!-- Fixed Header -->
      <div class="fixed top-0 left-0 right-0 bg-red-500 grid grid-cols-3 py-2 border-2 border-black items-center justify-items-center px-4 z-10">
        <!-- Left Section: Logo and Dropdown -->
        <div class="flex items-center justify-center lg:justify-start">
          <router-link to="/" class="inline-block mr-2">
            <img src="/favicon.ico" alt="favicon" class="w-6 h-6" />
          </router-link>
          <dropdown2 class="hidden sm:inline-block" />
          <button class="block sm:hidden" @click="toggleMenu">
            <i class="fa-solid fa-bars fa-xl text-white"></i>
          </button>
        </div>
  
        <!-- Center Section: Search Bar -->
        <div class="flex items-center justify-center w-full"></div>
  
        <!-- Right Section: Darkmode and Buttons -->
        <div class="flex items-center justify-center lg:justify-end">
          <button @click="toggleLoginModal" class="bg-blue-400 hover:bg-cyan-500 text-white font-bold py-1 px-4 rounded">
            <p>Admin...</p>
          </button>
          <button @click="confirmLogout" class="bg-blue-700 hover:bg-cyan-500 text-white font-bold py-1 px-4 rounded">
            <p>Logout</p>
          </button>
          <!-- <button @click="confirmNavigation('/settings')" class="hover:text-gray-600">
            <i class="fa-solid fa-gear fa-xl"></i>/<i class="fa-solid fa-user fa-xl"></i>
          </button> -->
        </div>
      </div>
  
      <!-- Page Content with Padding to Avoid Overlap with Fixed Header -->
      <div class="pt-16">
        <!-- Main content of the page goes here -->
      </div>
  
      <!-- Login Popup Modal -->
      <div v-if="showLoginModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded shadow-lg text-center w-80">
          <p class="text-lg font-bold mb-4">Admin...</p>
          <button @click="toggleRegisterModal" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2 w-full">
            Admin page2
          </button>
          <button @click="toggleLoginModal" class="bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2">
            <i class="fa-solid fa-delete-left"></i>
          </button>
        </div>
      </div>
  
      <!-- Registration Popup Modal -->
      <div v-if="showRegisterModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded shadow-lg text-center w-80">
          <button @click="toggleRegisterModal" class="bg-red-500 hover:bg-gray-700 mt-2 text-white font-bold py-2 px-4 rounded">
            Ga terug naar page 1
          </button>
        </div>
      </div>
  
      <!-- Mobile Menu (toggle) -->
      <div v-if="isMenuOpen" class="absolute top-12 left-0 w-full bg-red-500 p-4 sm:hidden">
        <div class="flex flex-col space-y-2">
          <router-link to="/films" class="text-white" @click="toggleMenu">Films</router-link>
          <router-link to="/series" class="text-white" @click="toggleMenu">Series</router-link>
          <router-link to="/latest" class="text-white" @click="toggleMenu">Latest</router-link>
          <router-link v-if="!isLoggedIn" to="/login" class="text-white" @click="toggleLoginModal">Login</router-link>
          <router-link v-else to="/" class="text-white" @click="confirmLogout">Logout</router-link>
          <router-link to="/settings" class="text-white" @click="confirmNavigation('/settings')">Settings</router-link>
        </div>
      </div>
  
      <!-- Confirmation Modal for Navigation -->
      <div v-if="showConfirm" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded shadow-lg text-center">
          <p>Are you sure you want to leave this page?</p>
          <div class="mt-4">
            <button @click="navigateToTarget" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
              Yes
            </button>
            <button @click="cancelNavigation" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              No
            </button>
          </div>
        </div>
      </div>
  
      <!-- Confirmation Modal for Logout -->
      <div v-if="showLogoutConfirm" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded shadow-lg text-center">
          <p>Are you sure you want to log out?</p>
          <div class="mt-4">
            <button @click="logoutConfirmed" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">
              Yes
            </button>
            <button @click="cancelLogout" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              No
            </button>
          </div>
        </div>
      </div>
  
      <!-- Logout Success Message -->
      <div v-if="logoutMessage" class="fixed top-16 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white p-3 rounded">
        {{ logoutMessage }}
      </div>
  
      <!-- Login Success Message -->
      <div v-if="loginMessage" class="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded">
        {{ loginMessage }}
      </div>
    </div>
  </template>
  
  <script setup>
  // Your script remains unchanged, only imports and state management
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import dropdown2 from '@/components/dropdown2.vue';
  import Darkmode from '@/components/Darkmode.vue';
  import { AuthService } from '../services/authService';
  import register1 from '@/components/register1.vue';
  
  const showLoginModal = ref(false);
  const showRegisterModal = ref(false);
  const showConfirm = ref(false);
  const showLogoutConfirm = ref(false);
  const targetRoute = ref(null);
  const router = useRouter();
  const isMenuOpen = ref(false);
  const isLoggedIn = ref(false);
  const loginMessage = ref('');
  const logoutMessage = ref('');
  const email = ref('');
  const password = ref('');
  const error = ref('');
  
  const registerForm = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  
  onMounted(() => {
    const token = localStorage.getItem('token');
    isLoggedIn.value = !!token;
  });
  
  const toggleLoginModal = () => {
    showLoginModal.value = !showLoginModal.value;
  };
  
  const toggleRegisterModal = () => {
    showRegisterModal.value = !showRegisterModal.value;
  };
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  
  const confirmNavigation = (route) => {
    targetRoute.value = route;
    showConfirm.value = true;
  };
  
  const confirmLogout = () => {
    showLogoutConfirm.value = true;
  };
  
  const login = async () => {
    try {
      const response = await AuthService.login({ email: email.value, password: password.value });
      localStorage.setItem('token', response.data.token);
      isLoggedIn.value = true;
      showLoginModal.value = false;
      loginMessage.value = 'Login successful!';
      setTimeout(() => {
        loginMessage.value = '';
      }, 3000);
      router.push('/');
    } catch (err) {
      error.value = err.response?.data?.message || 'Uw email komt niet overeen met het gekozen wachtwoord';
    }
  };
  
  const logoutConfirmed = () => {
    localStorage.removeItem('token');
    isLoggedIn.value = false;
    showLogoutConfirm.value = false;
    logoutMessage.value = 'Logged out successfully!';
    setTimeout(() => {
      logoutMessage.value = '';
    }, 3000);
    router.push('/');
  };
  
  const cancelNavigation = () => {
    showConfirm.value = false;
  };
  
  const cancelLogout = () => {
    showLogoutConfirm.value = false;
  };
  
  const navigateToTarget = () => {
    if (targetRoute.value) {
      router.push(targetRoute.value);
    }
    showConfirm.value = false;
  };
  </script>
  
  <style scoped>
  /* Ensures the header is fixed at the top */
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  </style>
  