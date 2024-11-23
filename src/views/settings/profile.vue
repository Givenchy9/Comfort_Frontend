<template>
  <!-- Card start -->
  <div class="max-w-sm mx-auto mt-28 bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
    <div class="border-b px-4 pb-6">
      <div class="text-center my-4">
        <!-- Avatar image -->
        <img class="h-32 w-32 rounded-full border-4 bg-blue-500 border-white dark:border-gray-800 mx-auto my-4"
             :src="user.avatar" alt="User Avatar">
        <div class="py-2">
          <!-- Display User Name -->
          <h3 class="font-bold text-2xl text-gray-800 dark:text-white mb-1">{{ user.first_name }} {{ user.last_name }}</h3>
          <div class="grid grid-cols-1 m-auto">
            <div class="inline-flex text-gray-700 dark:text-gray-300 items-center">
            {{ user.email }}
          </div>
          <div class="inline-flex text-gray-700 dark:text-gray-300 items-center">
            User role: {{ user.role }}
          </div>
          </div>
        </div>
      </div>
      <div class="flex gap-2 px-2">
        <button
          class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
          Follow
        </button>
        <button
          class="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
          Message
        </button>
      </div>
    </div>
  </div>
  <!-- Card end -->
</template>

<script>
import axios from 'axios'; // Ensure axios is imported

export default {
  data() {
    return {
      user: { // Default user object, will be updated with actual user data
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        avatar: "https://via.placeholder.com/150", // Placeholder image
      },
      loading: false,
      error: null,
    };
  },
  methods: {
    // Fetch user data by ID (logged-in user ID)
    async fetchUserById(userId) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/userinfo/${userId}`);
        this.user = response.data; // Assume API returns user object directly
        console.log("Fetched user data:", this.user); // Log the fetched data
      } catch (err) {
        this.error = "Failed to fetch user.";
        console.error(err); // Log the error
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    // Get logged-in user's ID from localStorage
    const userId = localStorage.getItem("userId");
    if (userId) {
      this.fetchUserById(userId); // Fetch user data based on the stored user ID
    } else {
      this.error = "User is not logged in.";
    }
  },
};
</script>
