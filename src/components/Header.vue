<template>
  <div class="bg-blue-500 grid grid-cols-3 py-2 border-2 border-black items-center justify-items-center px-4">
    <!-- Left Section: Logo and Dropdown -->
    <div class="flex items-center justify-center lg:justify-start">
      <router-link to="/" class="inline-block mr-2">
        <img src="/favicon.ico" alt="favicon" class="w-6 h-6" />
      </router-link>
      <!-- Dropdown component (hidden on mobile, visible on larger screens) -->
      <dropdown class="hidden sm:inline-block" />

      <!-- Hamburger Menu for mobile (only visible on small screens) -->
      <button class="block sm:hidden" @click="toggleMenu">
        <i class="fa-solid fa-bars fa-xl text-white"></i>
      </button>
    </div>

    <!-- Center Section: Search Bar (hidden on mobile) -->
    <div class="flex items-center justify-center w-full">
      <input type="text" placeholder="Search..."
        class="block w-2/3 rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hidden sm:block" />
    </div>

    <!-- Right Section: Darkmode and Buttons -->
    <div class="flex items-center justify-center lg:justify-end">
      <Darkmode class="mr-4 hidden sm:inline-block" />
      <!-- Conditional Login/Logout Button -->
      <button v-if="isLoggedIn" @click="confirmLogout" class="hover:text-gray-600 mr-4">
        <p>Logout</p>
      </button>
      <button v-else @click="confirmNavigation('/login')" class="hover:text-gray-600 mr-4">
        <p>Login</p>
      </button>
      <button @click="confirmNavigation('/settings')" class="hover:text-gray-600">
        <i class="fa-solid fa-gear fa-xl"></i>/<i class="fa-solid fa-user fa-xl"></i>
      </button>
    </div>

    <!-- Mobile Menu (toggle) -->
    <div v-if="isMenuOpen" class="absolute top-12 left-0 w-full bg-blue-500 p-4 sm:hidden">
      <div class="flex flex-col space-y-2">
        <router-link to="/films" class="text-white" @click="toggleMenu">Films</router-link>
        <router-link to="/series" class="text-white" @click="toggleMenu">Series</router-link>
        <router-link to="/latest" class="text-white" @click="toggleMenu">Latest</router-link>
        <!-- Conditional Login/Logout in Mobile Menu -->
        <router-link v-if="!isLoggedIn" to="/login" class="text-white"
          @click="confirmNavigation('/login')">Login</router-link>
        <router-link v-else to="/" class="text-white" @click="confirmLogout">Logout</router-link>
        <router-link to="/settings" class="text-white" @click="confirmNavigation('/settings')">Settings</router-link>
      </div>
    </div>

    <!-- Confirmation Modal for Navigation -->
    <div v-if="showConfirm" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg text-center">
        <p>Are you sure you want to leave this page?</p>
        <div class="mt-4">
          <button @click="navigateToTarget"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
            Yes
          </button>
          <button @click="cancelNavigation"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
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
          <button @click="logoutConfirmed"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">
            Yes
          </button>
          <button @click="cancelLogout" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            No
          </button>
        </div>
      </div>
    </div>

    <!-- Logout Success Message -->
    <div v-if="logoutMessage"
      class="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded">
      {{ logoutMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import dropdown from '@/components/dropdown.vue';
import Darkmode from '@/components/Darkmode.vue';

// State to manage confirmation modals
const showConfirm = ref(false);
const showLogoutConfirm = ref(false);
const targetRoute = ref(null);
const router = useRouter();

// State for mobile menu
const isMenuOpen = ref(false);

// State to check if user is logged in
const isLoggedIn = ref(false);

// State to manage logout success message
const logoutMessage = ref('');

// Check if token exists in localStorage when the component is mounted
onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    isLoggedIn.value = true; // Set as logged in if token exists
  }
});

// Function to show confirmation dialog for navigation
const confirmNavigation = (route) => {
  targetRoute.value = route;
  showConfirm.value = true;
};

// Function to proceed with navigation if user confirms
const navigateToTarget = () => {
  router.push(targetRoute.value);
  showConfirm.value = false;
};

// Function to cancel navigation and hide the confirmation modal
const cancelNavigation = () => {
  showConfirm.value = false;
};

// Function to toggle mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Function to show logout confirmation dialog
const confirmLogout = () => {
  showLogoutConfirm.value = true;
};

// Function to confirm and proceed with logout
const logoutConfirmed = () => {
  localStorage.removeItem('token'); // Remove the token from localStorage
  isLoggedIn.value = false; // Update logged-in state
  showLogoutConfirm.value = false; // Hide logout confirmation modal

  // Set the logout success message
  logoutMessage.value = 'Successfully logged out!';

  // Clear the message after 3 seconds
  setTimeout(() => {
    logoutMessage.value = '';
  }, 3000);
};

// Function to cancel logout and hide confirmation modal
const cancelLogout = () => {
  showLogoutConfirm.value = false;
};
</script>
