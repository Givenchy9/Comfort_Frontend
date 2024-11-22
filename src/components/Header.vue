<template>
  <div>
    <!-- Fixed Header -->
    <div class="fixed top-0 left-0 right-0 bg-blue-500 grid grid-cols-3 py-2 border-2 border-black items-center justify-items-center px-4 z-10">
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
        <!-- <input type="text" placeholder="Search..." class="block w-2/3 rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hidden sm:block" /> -->
      </div>

      <!-- Right Section: Darkmode and Buttons -->
      <div class="flex items-center justify-center lg:justify-end">
        <Darkmode class="mr-4 hidden sm:inline-block" />
        <button v-if="isLoggedIn" @click="confirmLogout" class="bg-blue-700 hover:bg-cyan-500 text-white font-bold py-1 px-4 rounded">
          <p>Logout</p>
        </button>
        <button v-else @click="toggleLoginModal" class="bg-blue-400 hover:bg-cyan-500 text-white font-bold py-1 px-4 rounded">
          <p>Login</p>
        </button>
        <!-- User Profiling Button -->
        <button @click="toggleDropdown" class="pl-4 hover:text-gray-600">
          <i class="fa-solid fa-user fa-xl"></i>
        </button>

        <!-- Dropdown Menu for User Profile -->
        <div v-if="dropdownVisible" class="absolute top-12 right-0 bg-white shadow-lg rounded-md w-48 p-2 z-20">
        <!-- <router-link to="/profile" class="block p-2 text-gray-900 hover:bg-gray-100">Profile</router-link> -->
        <router-link to="/settings" class="block p-2 text-gray-900 hover:bg-gray-100">Settings</router-link>
        <!-- <button @click="confirmLogout" class="block w-full p-2 text-red-600 hover:bg-gray-100">Logout</button> -->
        </div>
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
    <p class="text-lg font-bold mb-4">Login to Your Account</p>
    <input 
      type="email" 
      placeholder="Email" 
      v-model="email" 
      class="border p-2 mb-2 w-full rounded"
      :class="{'border-red-500': emailError}" 
      @input="validateEmail"
    >
    <input 
      type="password" 
      placeholder="Password" 
      v-model="password" 
      class="border p-2 mb-4 w-full rounded"
      :class="{'border-red-500': passwordError}" 
    >
    <button 
      @click="login" 
      :disabled="isSubmitting || !email || !password" 
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
    >
      Login
    </button>
    <button 
      @click="toggleRegisterModal" 
      class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
    >
      Account maken (klik hier)
    </button>
    <button 
      @click="toggleLoginModal" 
      class="bg-red-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2"
    >
      <i class="fa-solid fa-delete-left"></i>
    </button>
  </div>
</div>


    <!-- Registration Popup Modal -->
    <div v-if="showRegisterModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg text-center w-80">
        <register1/>
        <button @click="toggleRegisterModal" class="bg-red-500 hover:bg-gray-700 mt-2 text-white font-bold py-2 px-4 rounded">
          Ga terug naar Login
        </button>
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
    <div v-if="logoutMessage" class="mb-4 text-sm rounded-xl bg-red-100 border-t border-red-500 font-normal w-1/3 m-auto text-center" style="z-index: 1000;">
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
import dropdown from '@/components/dropdown.vue';
import Darkmode from '@/components/Darkmode.vue';
import { AuthService } from '../services/authService';
import register1 from '@/components/register1.vue';

const showLoginModal = ref(false);
const showRegisterModal = ref(false);
const showConfirm = ref(false);
const showLogoutConfirm = ref(false);
const targetRoute = ref(null);
const router = useRouter();
const dropdownVisible = ref(false);
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

const emailError = ref(false);  // Email error state
const passwordError = ref(false);  // Password error state
const isSubmitting = ref(false);  // Button submitting state

onMounted(() => {
  const token = localStorage.getItem('token');
  isLoggedIn.value = !!token;
});

// Toggle Dropdown Visibility
const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

// Modal Toggle Functions
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
  // Reset errors before submission
  emailError.value = false;
  passwordError.value = false;

  // Basic validation
  if (!email.value || !password.value) {
    error.value = 'Please enter both email and password.';
    return;
  }

  // Validate email format
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email.value)) {
    emailError.value = true;
    error.value = 'Invalid email address.';
    return;
  }

  isSubmitting.value = true; // Disable button while submitting

  try {
    // Call your backend login API
    const response = await AuthService.login({ email: email.value, password: password.value });
    const { token, user } = response.data;

    // Store the token and user information in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    isLoggedIn.value = true;
    showLoginModal.value = false; // Close the login modal
    loginMessage.value = 'Login successful!';
    setTimeout(() => {
      loginMessage.value = '';
    }, 3000);

    // Redirect based on role
    if (user.role === 'admin') {
      router.push('/admin'); // Redirect to admin page
    } else {
      router.push('/'); // Redirect to home page for other users
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Incorrect email or password.';
  } finally {
    isSubmitting.value = false; // Enable the button after submission
  }
};


// Logout Functionality
const logoutConfirmed = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  isLoggedIn.value = false;
  showLogoutConfirm.value = false;
  logoutMessage.value = 'Logged out successfully!';
  console.log(logoutMessage.value); // Debugging
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
