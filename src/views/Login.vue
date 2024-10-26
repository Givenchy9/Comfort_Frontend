<template>
  <div class="mt-40">
    <form @submit.prevent="login" class="w-1/3 m-auto grid grid-rows-2 gap-8">
      <p class="text-center font-bold text-2xl">Sign in to your account</p>
      <div>
        <label class="font-bold">Email Address</label>
        <input type="email" v-model="email" placeholder="Email"
          class="block w-full m-auto rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          required />
      </div>
      <div>
        <label class="font-bold">Wachtwoord</label>
        <RouterLink to="" class="font-bold float-right hover:text-blue-600 hover:underline">
          Wachtwoord vergeten? (link)
        </RouterLink>
        <input type="password" v-model="password" placeholder="Password"
          class="block w-full m-auto rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          required />
      </div>
      <button type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Login
      </button>

      <!-- Removed 'to' attribute and used @click.prevent to manually trigger navigation -->
      <RouterLink to="/register" class="font-bold float-right text-center hover:text-blue-600 hover:underline">
        Account maken? klik hier
      </RouterLink>

      <div v-if="error"
        class="grid grid-cols-10 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert">
        <i class="col-span-1 pt-1 fa-solid fa-triangle-exclamation"> |</i>
        <p class="col-span-9">{{ error }}</p>
      </div>
    </form>

    <!-- <button @click="handleLogout">Logout</button> -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AuthService } from '../services/authService';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');

const router = useRouter();

const login = async () => {
  error.value = ''; // Clear any previous errors
  try {
    const response = await AuthService.login({
      email: email.value,
      password: password.value,
    });
    console.log('Login successful', response);

    // Store token in localStorage (make sure this is the correct key)
    localStorage.setItem('token', response.data.token);
    router.push('/'); // Redirect to a dashboard or home page after login
  } catch (err) {
    console.error('Login error:', err); // Log error for debugging
    error.value =
      err.response?.data?.message || 'Uw email komt niet overeen met het gekozen wachtwoord'; // Set error message for display
  }
};

const handleLogout = () => {
  localStorage.removeItem('token'); // Remove token from localStorage on logout
  router.push('/Login'); // Redirect to login page after logout
};

// Updated register function for conditional navigation
const register = () => {
  const result = confirm(
    "Wilt u doorgaan met het maken van een account? Als u op 'Annuleren' klikt, blijft u op de huidige pagina."
  );

  if (result) {
    // User clicked OK, navigate to the registration page
    router.push('/register_validation');
  } else {
    // User clicked Cancel, stay on the current page
    console.log('User chose to stay on the current page');
  }
};
</script>
