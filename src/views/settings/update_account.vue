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
          <div class="inline-flex text-gray-700 dark:text-gray-300 items-center">
            <svg class="h-5 w-5 text-gray-400 dark:text-gray-600 mr-1" fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
            </svg>
            <!-- Display User Email -->
            {{ user.email }}
          </div>
        </div>
      </div>

      <!-- Edit Form -->
      <div v-if="isEditing" class="mt-6">
        <form @submit.prevent="updateUser">
          <div class="mb-4">
            <label for="first_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
            <input type="text" id="first_name" v-model="user.first_name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white" required />
          </div>
          <div class="mb-4">
            <label for="last_name" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
            <input type="text" id="last_name" v-model="user.last_name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white" required />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input type="email" id="email" v-model="user.email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white" required />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input type="password" id="password" v-model="user.password" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white" />
          </div>
          <div class="flex gap-2">
            <button type="submit" class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
              Save Changes
            </button>
            <button @click="cancelEdit" type="button" class="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- View Mode -->
      <div v-else>
        <div class="flex gap-2 px-2 mt-6">
          <button @click="startEditing"
            class="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
            Edit Profile
          </button>
        </div>
      </div>

      <!-- Error or Success Message -->
      <div v-if="error" class="text-red-500 text-center mt-4">{{ error }}</div>
      <div v-if="successMessage" class="text-green-500 text-center mt-4">{{ successMessage }}</div>

    </div>
  </div>

  <!-- Password Popup -->
  <div v-if="showPopup" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded-lg w-96">
      <h3 class="text-xl font-semibold mb-4">Enter Password to Change Role</h3>
      <input type="password" v-model="passwordInput" class="w-full mb-4 p-2 border rounded-md" placeholder="Enter password" />
      <div class="flex justify-end gap-2">
        <button @click="confirmPassword" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Confirm</button>
        <button @click="cancelPopup" class="bg-red-500 text-white px-4 py-2 rounded-lg">Cancel</button>
      </div>
    </div>
  </div>
  <!-- Card end -->
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: { // Default user object, will be updated with actual user data
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        avatar: "https://via.placeholder.com/150", // Placeholder image
        role: "basic", // Add role here to initialize
      },
      loading: false,
      error: null,
      successMessage: "",
      isEditing: false, // Tracks whether the user is in editing mode
      showPopup: false, // Controls the visibility of the password popup
      passwordInput: "", // Stores the password entered by the user
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
      } catch (err) {
        this.error = "Failed to fetch user.";
      } finally {
        this.loading = false;
      }
    },

    // Enable editing mode
    startEditing() {
      this.isEditing = true;
    },

    // Cancel editing mode without saving
    cancelEdit() {
      this.isEditing = false;
    },

    // Show the password popup when the role is changed
    showRoleChangePopup() {
      this.showPopup = true;
    },

    // Cancel the popup
    cancelPopup() {
      this.showPopup = false;
      this.passwordInput = "";
    },

    // Confirm password and change role
    confirmPassword() {
      const correctPassword = "12345678"; // Predefined password for demonstration
      if (this.passwordInput === correctPassword) {
        this.showPopup = false;
        this.updateUser();
      } else {
        alert("Incorrect password!"); // Simple alert for incorrect password
      }
    },

    // Method to update the user's name, email, and role
    async updateUser() {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        this.error = "User is not logged in.";
        return;
      }

      this.loading = true;
      this.error = null;
      this.successMessage = "";

      try {
        // Log user data to verify
        console.log("Updated user data: ", this.user);

        // Send PUT request to update user data including role
        const response = await axios.put(`http://127.0.0.1:8000/api/edituser/${userId}`, {
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          email: this.user.email,
          role: this.user.role, // Include the role field in the update request
        });

        this.user = response.data; // Update user object with response data
        this.isEditing = false; // Exit edit mode
        this.successMessage = "Profile updated successfully!";
      } catch (err) {
        this.error = "Failed to update user.";
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
