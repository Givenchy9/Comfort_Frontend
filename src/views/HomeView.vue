<template>
  <div>
    <Darkmode />

    <!-- Logout button -->
    <button @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'; // Import ref for reactive variables
import { useRouter } from 'vue-router'; // Import useRouter for routing
import { AuthService } from '../services/authService'; // Import your AuthService
import Darkmode from '@/components/Darkmode.vue';

// Use the router
const router = useRouter();

// Logout function
const handleLogout = async () => {
  // Remove token from localStorage
  localStorage.removeItem('token'); // Make sure 'token' is the key you used for storing the token
  try {
    await AuthService.logout(); // Call the logout function
    // Redirect to the login page or clear user state
    router.push('/Login'); // Adjust the route as necessary
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
</script>
