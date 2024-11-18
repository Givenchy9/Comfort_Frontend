<template>
  <div>
    <!-- Fixed Header -->
    <div class="fixed top-0 left-0 right-0 bg-blue-500 grid grid-cols-3 py-2 border-2 border-black items-center px-4 z-10">
      <!-- Left Section: Logo and Dropdown -->
      <div class="flex items-center justify-start">
        <router-link to="/" class="inline-block mr-2">
          <img src="/favicon.ico" alt="favicon" class="w-6 h-6" />
        </router-link>
        <dropdown class="hidden sm:inline-block" />
        <button class="block sm:hidden" @click="toggleMenu">
          <i class="fa-solid fa-bars fa-xl text-white"></i>
        </button>
      </div>

      <!-- Middle section (if needed for spacing, can be empty) -->
      <div></div>

      <!-- Right Section: Darkmode and Buttons -->
      <div class="flex items-center justify-end space-x-4">
        <Darkmode class="hidden sm:inline-block" />
        <button v-if="isLoggedIn" @click="confirmLogout" class="bg-blue-700 hover:bg-cyan-500 text-white font-bold py-1 px-4 rounded">
          <p>Logout</p>
        </button>
        <button v-else @click="toggleLoginModal" class="bg-blue-400 hover:bg-cyan-500 text-white font-bold py-1 px-4 rounded">
          <p>Login</p>
        </button>
        <div class="relative inline-block text-left">
          <!-- Dropdown Button -->
          <button @click="toggleDropdown" class="hover:text-gray-600">
            <i class="fa-solid fa-gear fa-xl"></i>/<i class="fa-solid fa-user fa-xl"></i>
          </button>

          <!-- Dropdown Menu -->
          <div v-if="dropdownVisible" class="dropdown-menu absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1">
            <a href="#" @click="confirmNavigation('/settings')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Instellingen</a>
            <a href="#" @click="confirmNavigation('/profile')" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profiel</a>
          </div>
        </div>
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
const dropdownVisible = ref(false);
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

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
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
/* Ensures the header is fixed at the top */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

/* Grid layout for header with 3 columns */
.grid-cols-3 {
  display: grid;
  grid-template-columns: 1fr auto 1fr; /* Left (logo), Center (empty space), Right (buttons) */
  gap: 0;
}

/* Ensures that the right section aligns its items properly */
.flex.justify-end {
  justify-content: flex-end;
  display: flex;
  align-items: center;
}

/* Adjust space between the right section items */
.space-x-4 > * {
  margin-right: 1rem;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  width: 12rem;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
