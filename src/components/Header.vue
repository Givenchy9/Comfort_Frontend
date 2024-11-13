<template>
  <div class="bg-blue-500 grid grid-cols-3 py-2 border-2 border-black items-center justify-items-center px-4 relative">
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

    <!-- Center Section: Search Bar (hidden on mobile) -->
    <div class="flex items-center justify-center w-full">
      <input
        type="text"
        placeholder="Search..."
        class="block w-2/3 rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hidden sm:block"
      />
    </div>

    <!-- Right Section: Darkmode, User Profile, and Buttons -->
    <div class="flex items-center justify-center lg:justify-end relative">
      <Darkmode class="mr-4 hidden sm:inline-block" />

<<<<<<< Updated upstream
      <!-- Conditional Login/Logout Button -->
      <button v-if="isLoggedIn" @click="confirmLogout" class="hover:text-gray-600 mr-4">
        <p>Logout</p>
      </button>
      <button v-else @click="confirmNavigation('/login')" class="hover:text-gray-600 mr-4">
        <p>Login</p>
=======
      <!-- Conditional Logout or Login Button -->
      <button v-if="isLoggedIn" @click="confirmLogout"
        class="bg-blue-700 hover:bg-cyan-500 text-white font-bold py-1 px-4 rounded mr-2">
        Logout
      </button>
      <button v-else @click="toggleLoginModal"
        class="bg-blue-400 hover:bg-cyan-500 text-white font-bold py-1 px-4 rounded mr-2">
        Login
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
    <!-- Mobile Menu (toggle) -->
    <div v-if="isMenuOpen" class="absolute top-12 left-0 w-full bg-blue-500 p-4 sm:hidden">
      <div class="flex flex-col space-y-2">
        <router-link to="/films" class="text-white" @click="toggleMenu">Films</router-link>
        <router-link to="/series" class="text-white" @click="toggleMenu">Series</router-link>
        <router-link to="/latest" class="text-white" @click="toggleMenu">Latest</router-link>
        <router-link v-if="!isLoggedIn" to="/login" class="text-white" @click="confirmNavigation('/login')">Login</router-link>
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
    <div v-if="logoutMessage" class="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded">
      {{ logoutMessage }}
=======
  <!-- Login Modal -->
  <div v-if="showLoginModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-lg text-center w-80">
      <p class="text-lg font-bold mb-4">Login to Your Account</p>
      <input type="text" v-model="email" placeholder="Email" class="border p-2 mb-2 w-full rounded" />
      <input type="password" v-model="password" placeholder="Password" class="border p-2 mb-4 w-full rounded" />
      <button @click="login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Login</button>
      <router-link to="/register" class="block mt-4 text-blue-600 hover:underline">Create an account</router-link>
      <button @click="toggleLoginModal" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Close</button>
>>>>>>> Stashed changes
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import dropdown from '@/components/dropdown.vue';
import Darkmode from '@/components/Darkmode.vue';

<<<<<<< Updated upstream
// State for mobile menu and dropdown visibility
const isMenuOpen = ref(false);
const dropdownVisible = ref(false);

// State to check if user is logged in
const isLoggedIn = ref(false);

// State to manage confirmation modals
const showConfirm = ref(false);
const showLogoutConfirm = ref(false);
const targetRoute = ref(null);
const logoutMessage = ref('');
const router = useRouter();

// Check if token exists in localStorage when the component is mounted
onMounted(() => {
  const token = localStorage.getItem('token');
  if (token) {
    isLoggedIn.value = true; // Set as logged in if token exists
  }
});

// Function to toggle the dropdown menu visibility
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

// Function to toggle mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

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
=======
// State Variables
const showLoginModal = ref(false);
const dropdownVisible = ref(false);
const isLoggedIn = ref(false);
const email = ref('');
const password = ref('');
const loginMessage = ref('');
const logoutMessage = ref('');
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
  logoutMessage.value = 'Successfully logged out!';
  setTimeout(() => (logoutMessage.value = ''), 3000);
};

// Handle User Login
const login = async () => {
  try {
    const response = await AuthService.login({ email: email.value, password: password.value });
    localStorage.setItem('token', response.data.token);
    isLoggedIn.value = true;
    showLoginModal.value = false;
    loginMessage.value = 'Login Successful!';
    setTimeout(() => (loginMessage.value = ''), 3000);
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
  }
};

>>>>>>> Stashed changes
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
