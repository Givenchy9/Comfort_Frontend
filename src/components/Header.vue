<template>
  <div class="bg-blue-500 grid grid-cols-3 py-2 border-2 border-black items-center justify-items-center px-4 relative">
    <!-- Left Section: Logo and Dropdown -->
    <div class="flex items-center justify-center lg:justify-start">
      <router-link to="/" class="inline-block mr-2">
        <img src="/favicon.ico" alt="favicon" class="w-6 h-6" />
      </router-link>
      <dropdown class="hidden sm:inline-block" />
      <button class="block sm:hidden" @click="toggleMenu">
        <i class="fa-solid fa-bars fa-xl text-white"></i>
      </button>
    </div>

    <!-- Center Section: Search Bar -->
    <div class="flex items-center justify-center w-full">
      <input type="text" placeholder="Search..." class="block w-2/3 rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hidden sm:block" />
    </div>

    <!-- Right Section: Darkmode and Buttons -->
    <div class="flex items-center justify-center lg:justify-end relative">
      <Darkmode class="mr-4 hidden sm:inline-block" />
      <button v-if="isLoggedIn" @click="confirmLogout"
        class="bg-blue-700 hover:bg-cyan-500 text-white font-bold py-1 px-4 rounded">
        <p>Logout</p>
      </button>
      <button v-else @click="toggleLoginModal"
        class="bg-blue-400 hover:bg-cyan-500 text-white font-bold py-1 px-4 rounded">
        <p>Login</p>
      </button>

      <!-- Settings Button with Dropdown -->
      <button @click="toggleDropdown" class="hover:text-gray-600">
        <i class="fa-solid fa-gear fa-xl"></i>/<i class="fa-solid fa-user fa-xl"></i>
      </button>

      <!-- Dropdown Menu (Toggle visibility based on dropdownVisible state) -->
      <div v-if="dropdownVisible" class="absolute top-12 right-0 bg-white shadow-lg rounded-md w-48 p-2 z-20">
        <router-link to="/profile" class="block p-2 text-gray-900 hover:bg-gray-100">Profile</router-link>
        <router-link to="/settings" class="block p-2 text-gray-900 hover:bg-gray-100">Settings</router-link>
        <button @click="confirmLogout" class="block w-full p-2 text-red-600 hover:bg-gray-100">Logout</button>
      </div>
    </div>

    <!-- Login Popup Modal -->
    <div v-if="showLoginModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg text-center w-80">
        <p class="text-lg font-bold mb-4">Login to Your Account</p>
        <input type="text" placeholder="Email" v-model="email" class="border p-2 mb-2 w-full rounded">
        <input type="password" placeholder="Password" v-model="password" class="border p-2 mb-4 w-full rounded">
        <button @click="login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full">
          Login
        </button>
        <RouterLink to="/register" class="font-bold block text-center hover:text-blue-600 hover:underline mt-2">
          Account maken? klik hier
        </RouterLink>
        <button>new Div</button>
        <button @click="toggleLoginModal"
          class="bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2">
          <i class="fa-solid fa-delete-left"></i>
        </button>
      </div>
      <div class="bg-white p-6 rounded shadow-lg text-center w-80">
        <p>hello</p>
      </div>
    </div>

    <!-- Mobile Menu (toggle) -->
    <div v-if="isMenuOpen" class="absolute top-12 left-0 w-full bg-blue-500 p-4 sm:hidden">
      <div class="flex flex-col space-y-2">
        <router-link to="/films" class="text-white" @click="toggleMenu">Films</router-link>
        <router-link to="/series" class="text-white" @click="toggleMenu">Series</router-link>
        <router-link to="/latest" class="text-white" @click="toggleMenu">Latest</router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="text-white" @click="toggleLoginModal">Login</router-link>
        <router-link v-else to="/" class="text-white" @click="confirmLogout">Logout</router-link>
        <router-link to="/settings" class="text-white" @click="confirmNavigation('/settings')">Settings</router-link>
      </div>
    </div>

    <!-- Confirmation Modals -->
    <div v-if="showConfirm" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg text-center">
        <p>Are you sure you want to leave this page?</p>
        <div class="mt-4">
          <button @click="navigateToTarget" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">Yes</button>
          <button @click="cancelNavigation" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">No</button>
        </div>
      </div>
    </div>

    <div v-if="showLogoutConfirm" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg text-center">
        <p>Are you sure you want to log out?</p>
        <div class="mt-4">
          <button @click="logoutConfirmed" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">Yes</button>
          <button @click="cancelLogout" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">No</button>
        </div>
      </div>
    </div>

    <!-- Logout Success Message -->
    <div v-if="logoutMessage"
      class="fixed top-16 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white p-3 rounded">
      {{ logoutMessage }}
    </div>

    <!-- Login Success Message -->
    <div v-if="loginMessage"
      class="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded">
      {{ loginMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import dropdown from '@/components/dropdown.vue';
import Darkmode from '@/components/Darkmode.vue';
import { AuthService } from '../services/authService';

// State management
const showLoginModal = ref(false);
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

// Check token on mount
onMounted(() => {
  const token = localStorage.getItem('token');
  isLoggedIn.value = !!token;
});

// Toggle functions
const toggleLoginModal = () => {
  showLoginModal.value = !showLoginModal.value;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Confirm navigation
const confirmNavigation = (route) => {
  targetRoute.value = route;
  showConfirm.value = true;
};

const navigateToTarget = () => {
  router.push(targetRoute.value);
  showConfirm.value = false;
};

const cancelNavigation = () => {
  showConfirm.value = false;
};

// Logout confirmation
const confirmLogout = () => {
  showLogoutConfirm.value = true;
};

const logoutConfirmed = () => {
  localStorage.removeItem('token');
  isLoggedIn.value = false;
  showLogoutConfirm.value = false;
  logoutMessage.value = 'Logout Successfully!';
  setTimeout(() => {
    logoutMessage.value = '';
  }, 3000);
};

const cancelLogout = () => {
  showLogoutConfirm.value = false;
};

// Login function with login success message
const login = async () => {
  error.value = '';
  try {
    const response = await AuthService.login({ email: email.value, password: password.value });
    localStorage.setItem('token', response.data.token);
    isLoggedIn.value = true;
    showLoginModal.value = false;
    loginMessage.value = 'Login successful!';
    setTimeout(() => {
      loginMessage.value = '';
    }, 3000); // Clear the login message after 3 seconds
    router.push('/');
  } catch (err) {
    error.value = err.response?.data?.message || 'Uw email komt niet overeen met het gekozen wachtwoord';
  }
};
</script>

<style scoped>
/* Styles for the dropdown menu */
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
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
.hover\:bg-gray-100:hover {
  background-color: #f7fafc;
}

/* General modal styles */
.fixed {
  position: fixed;
}
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
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
.transform {
  transform: translateX(-50%);
}
.bg-green-500 {
  background-color: #48bb78;
}
.text-white {
  color: #fff;
}
.p-3 {
  padding: 0.75rem;
}
.rounded {
  border-radius: 0.375rem;
}

/* Hamburger Menu */
.sm\:hidden {
  display: none;
}

/* Styles for input elements */
input[type="text"] {
  transition: all 0.3s ease;
}
input[type="text"]:focus {
  border-color: #1a202c;
  outline: none;
}

/* Other styles for layout and positioning */
.relative {
  position: relative;
}
</style>
