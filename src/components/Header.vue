<template>
  <div class="bg-blue-500 grid grid-cols-2 py-2 border-2 border-black items-center justify-items-center px-4 relative">
    <!-- Left Section: Logo and Dropdown -->
    <div class="flex items-center justify-center lg:justify-start">
      <router-link to="/" class="inline-block mr-2">
        <img src="/favicon.ico" alt="favicon" class="w-6 h-6" />
      </router-link>
      <dropdown class="hidden sm:inline-block" />

      <!-- Hamburger Menu for mobile (only visible on small screens) -->
      <button class="block sm:hidden" @click="toggleMenu">
        <i class="fa-solid fa-bars fa-xl text-white"></i>
      </button>
    </div>

    <!-- Right Section: Darkmode, User Profile, and Buttons -->
    <div class="flex items-center justify-center lg:justify-end relative">
      <Darkmode class="mr-4 hidden sm:inline-block" />

      <!-- Conditional Logout or Login Button -->
      <button
        v-if="isLoggedIn"
        @click="confirmLogout"
        class="bg-blue-700 hover:bg-cyan-500 text-white font-bold py-1 px-4 rounded mr-2">
        Logout
      </button>
      <button
        v-else
        @click="toggleLoginModal"
        class="bg-blue-400 hover:bg-cyan-500 text-white font-bold py-1 px-4 rounded mr-2">
        Login
      </button>

      <!-- User Profiling Button -->
      <button @click="toggleDropdown" class="hover:text-gray-600">
        <i class="fa-solid fa-user fa-xl"></i>
      </button>

      <!-- Dropdown Menu for User Profile -->
      <div v-if="dropdownVisible" class="absolute top-12 right-0 bg-white shadow-lg rounded-md w-48 p-2 z-20">
        <router-link to="/profile" class="block p-2 text-gray-900 hover:bg-gray-100">Profile</router-link>
        <router-link to="/settings" class="block p-2 text-gray-900 hover:bg-gray-100">Settings</router-link>
        <button @click="confirmLogout" class="block w-full p-2 text-red-600 hover:bg-gray-100">Logout</button>
      </div>
    </div>
  </div>

  <!-- Login Modal -->
  <div v-if="showLoginModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-lg text-center w-80">
      <p class="text-lg font-bold mb-4">Login to Your Account</p>
      <input type="text" v-model="email" placeholder="Email" class="border p-2 mb-2 w-full rounded" />
      <input type="password" v-model="password" placeholder="Password" class="border p-2 mb-4 w-full rounded" />
      <button @click="login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
        Login
      </button>
      <router-link to="/register" class="block mt-4 text-blue-600 hover:underline">Create an account</router-link>
      <button @click="toggleLoginModal" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '@/services/authService';
import dropdown from '@/components/dropdown.vue';
import Darkmode from '@/components/Darkmode.vue';


// State Variables
const showLoginModal = ref(false);
const dropdownVisible = ref(false);
const isLoggedIn = ref(false);
const email = ref('');
const password = ref('');
const router = useRouter();

// Check for token on component mount
onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('token');
});

// Toggle Dropdown Visibility
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

// Toggle Login Modal
const toggleLoginModal = () => {
  showLoginModal.value = !showLoginModal.value;
};

// Confirm Logout
const confirmLogout = () => {
  localStorage.removeItem('token');
  isLoggedIn.value = false;
};

// Handle User Login
const login = async () => {
  try {
    const response = await AuthService.login({ email: email.value, password: password.value });
    localStorage.setItem('token', response.data.token);
    isLoggedIn.value = true;
    showLoginModal.value = false;
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
</script>

<style scoped>
/* General Styles */
.absolute {
  position: absolute;
}
.top-12 {
  top: 3rem;
}
.right-0 {
  right: 0;
}
.bg-white {
  background-color: white;
}
.shadow-lg {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.rounded-md {
  border-radius: 0.375rem;
}
.w-48 {
  width: 12rem;
}
.p-2 {
  padding: 0.5rem;
}
.text-gray-900 {
  color: #1a202c;
}
.hover\:bg-gray-100:hover {
  background-color: #f7fafc;
}
.text-red-600 {
  color: #e53e3e;
}
.bg-gray-800 {
  background-color: rgba(31, 41, 55, 0.8);
}
.bg-opacity-50 {
  background-opacity: 0.5;
}
.p-6 {
  padding: 1.5rem;
}
.text-center {
  text-align: center;
}
.w-80 {
  width: 20rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.hover\:underline:hover {
  text-decoration: underline;
}
.font-bold {
  font-weight: bold;
}
.rounded {
  border-radius: 0.25rem;
}
.hover\:bg-cyan-500:hover {
  background-color: #22d3ee;
}
.hover\:bg-blue-700:hover {
  background-color: #1d4ed8;
}
.bg-blue-500 {
  background-color: #3b82f6;
}
.bg-blue-700 {
  background-color: #1e40af;
}
.bg-blue-400 {
  background-color: #60a5fa;
} 
.bg-red-500 {
  background-color: #ef4444;
}
.hover\:bg-red-700:hover {
  background-color: #b91c1c;
}
</style>
