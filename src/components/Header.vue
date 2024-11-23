<template>
  <div>
    <div class="fixed top-0 left-0 right-0 bg-blue-500 grid grid-cols-3 py-2 items-center px-4 z-10 dark:bg-gray-800">
      <div class="flex items-center justify-start">
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
        <Darkmode class="darkmode hidden sm:inline-block w-80 dark:bg-gray-900" />
      </div>

      <div class="flex items-center justify-end space-x-1">
        <button v-if="isLoggedIn" @click="confirmLogout" class="bg-blue-700 hover:bg-cyan-500 text-white font-bold w-40 py-1 px-4 rounded dark:bg-gray-900">
          <p>Logout</p>
        </button>
        <button v-else @click="toggleLoginModal" class="bg-blue-400 hover:bg-cyan-500 text-white font-bold w-40 py-1 px-4 rounded dark:bg-gray-900">
          <p>Login</p>
        </button>
        <button @click="toggleDropdown" class="hover:text-gray-600 bg-blue-400 hover:bg-cyan-500 text-white font-bold w-22 py-1 px-8 rounded dark:bg-gray-900 dark-hover:text-black">
          <i class="fa-solid fa-user fa-xl"></i>
        </button>

        <div v-if="dropdownVisible" class="absolute top-12 right-0 bg-white shadow-lg rounded-md w-48 p-2 z-20">
        <router-link to="/settings" class="block p-2 text-gray-900 hover:bg-gray-100">Settings</router-link>
        </div>
      </div>
    </div>

    <div class="pt-16">
    </div>

    <div v-if="showLoginModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg text-center w-80 dark:bg-gray-900 dark:border-white border-2">
        <p class="text-lg font-bold mb-4 dark:text-white">Login to Your Account</p>
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

    <div v-if="showRegisterModal" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg text-center w-80 dark:bg-gray-900 dark:text-white border-2">
        <register1/>
        <button @click="toggleRegisterModal" class="bg-red-500 hover:bg-gray-700 mt-2 text-white font-bold py-2 px-4 rounded">
          Ga terug naar Login
        </button>
      </div>
    </div>

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

    <div v-if="showConfirm" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow-lg text-center dark:bg-gray-900">
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
      <div class="bg-white p-6 rounded shadow-lg text-center dark:bg-gray-800 dark:text-white border-2 dark:border-white">
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

    <div v-if="logoutMessage" class="mb-4 text-sm rounded-xl bg-red-100 border-t border-red-500 font-normal w-1/3 m-auto text-center" style="z-index: 1000;">
      {{ logoutMessage }}
    </div>

    <div v-if="loginMessage" class="fixed top-16 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded">
      {{ loginMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import dropdown from '@/components/dropdown.vue';
import dropdown3 from '@/components/dropdown3.vue';
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

const emailError = ref(false);  
const passwordError = ref(false); 
const isSubmitting = ref(false);  

onMounted(() => {
  const token = localStorage.getItem('token');
  isLoggedIn.value = !!token;

  if (isLoggedIn.value) {
    fetchUserProfile(); 
  }
});

const toggleDropdown = () => {
  dropdownVisible.value = !dropdownVisible.value;
};

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
  emailError.value = false;
  passwordError.value = false;

  if (!email.value || !password.value) {
    error.value = 'Please enter both email and password.';
    return;
  }

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email.value)) {
    emailError.value = true;
    error.value = 'Invalid email address.';
    return;
  }

  isSubmitting.value = true; 

  try {
    const response = await AuthService.login({
      email: email.value,
      password: password.value,
    });

    const { token, user } = response.data;

    // Save user data in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userId', user.id); 

    console.log("User Token:", token);
    console.log("User ID:", user.id);

    isLoggedIn.value = true;
    showLoginModal.value = false; 
    loginMessage.value = 'Login successful!';
    setTimeout(() => {
      loginMessage.value = '';
    }, 3000);

    // Redirect based on role
    if (user.role === 'admin') {
      router.push('/admin'); 
    } else if (user.role === 'complete') {
      router.push('/complete');
    } else {
      router.push('/');
    }
  } catch (err) {
    console.error('Login Error:', err);
    if (err.response) {
      // If the server returns a response (401 or other error)
      if (err.response.status === 401) {
        error.value = 'Incorrect email or password. Please try again.';
      } else {
        error.value = 'An unexpected error occurred. Please try again later.';
      }
    } else {
      // If no response from the server
      error.value = 'No response from server. Please check your connection.';
    }
  } finally {
    isSubmitting.value = false;
  }
};



const fetchUserProfile = async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    error.value = 'User ID not found. Please login again.';
    return;
  }

  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/userinfo/${userId}`);
    const userProfile = response.data;
    console.log('User Profile:', userProfile);
  } catch (err) {
    error.value = 'Failed to fetch user profile. Please try again later.';
  }
};


// Logout Functionality
const logoutConfirmed = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  isLoggedIn.value = false;
  showLogoutConfirm.value = false;
  logoutMessage.value = 'Logged out successfully!';
  console.log(logoutMessage.value);
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
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.grid-cols-3 {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0;
}

.flex.justify-end {
  justify-content: flex-end;
  display: flex;
  align-items: center;
}

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
