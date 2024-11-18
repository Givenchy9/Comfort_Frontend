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
        <input type="text" placeholder="Search..." class="block w-2/3 rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hidden sm:block" />
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
        <button @click="confirmNavigation('/settings')" class="hover:text-gray-600">
          <i class="fa-solid fa-gear fa-xl"></i>/<i class="fa-solid fa-user fa-xl"></i>
        </button>
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
          <button @click="navigateToTarget" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
            Yes
          </button>
          <button @click="cancelNavigation" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            No
          </button>
        </div>
      </div>
    </div>

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
import { AuthService } from '@/services/authService';
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
  localStorage.removeItem('token');
  isLoggedIn.value = false;
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
    // Assuming you call an API to verify login and get the token
    const response = await AuthService.login({ email: email.value, password: password.value });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userEmail', email.value);  // Store email as well

    isLoggedIn.value = true;
    showLoginModal.value = false;  // Close the login modal
    loginMessage.value = 'Login successful!';
    setTimeout(() => {
      loginMessage.value = '';
    }, 3000);

    router.push('/'); // Optionally redirect after successful login

  } catch (err) {
    error.value = err.response?.data?.message || 'Incorrect email or password.';
  } finally {
    isSubmitting.value = false; // Enable the button after submission
  }
};

// Logout Functionality
const logoutConfirmed = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail'); // Optionally remove user email from localStorage
  isLoggedIn.value = false;
  showLogoutConfirm.value = false;
  logoutMessage.value = 'Logged out successfully!';
  setTimeout(() => {
    logoutMessage.value = '';
  }, 3000);
  router.push('/'); // Redirect after logout
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
