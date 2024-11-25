<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold text-center mb-4">Users Management</h1>

    <!-- Success message -->
    <div v-if="successMessage" class="p-4 mb-4 text-sm text-emerald-500 rounded-xl bg-emerald-50 font-normal w-1/3 m-auto text-center">
      <p>{{ successMessage }}</p><i class="fa-solid fa-circle-check"></i>
    </div>
    
    <!-- Loading state -->
    <div v-if="loading" class="text-center font-bold text-3xl">
      <p class="text-gray-500">Loading...<i class="fa-solid fa-spinner fa-spin-pulse"></i></p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>

    <!-- No Users State -->
    <div v-else-if="users.length === 0" class="text-center text-gray-500">
      <p>No users found.</p>
    </div>

    <!-- Users Grid -->
    <div v-else class="grid grid-cols-1 bg-red-500 gap-2 overflow-auto users-grid">
      <div v-for="(user, index) in users" :key="user.id" class="bg-white shadow-md rounded-lg p-4 border border-gray-200">
        <h2 class="text-lg font-semibold">{{ user.first_name }}, {{ user.last_name }}</h2>
        <p class="text-gray-600">Email: {{ user.email }}</p>
        <p class="text-gray-600">Role: {{ user.role }}</p>
        <p class="text-gray-600">Joined: {{ new Date(user.created_at).toLocaleDateString() }}</p>

        <button
          @click="startEditing(user)"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          @click="deleteUser(user.id)"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium text-sm px-5 py-1 dark:bg-red-600 dark:hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- Add User Form -->
    <div v-if="showAddUserForm" class="mt-4 p-4 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 class="text-xl font-semibold mb-2">Add New User</h2>
      <form @submit.prevent="addUser">
        <div class="mb-4">
          <label for="first_name" class="block text-sm font-semibold">First Name</label>
          <input type="text" v-model="newUser.first_name" required class="border rounded px-3 py-2 w-full" />
        </div>
        <div class="mb-4">
          <label for="last_name" class="block text-sm font-semibold">Last Name</label>
          <input type="text" v-model="newUser.last_name" required class="border rounded px-3 py-2 w-full" />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-semibold">Email</label>
          <input type="email" v-model="newUser.email" required class="border rounded px-3 py-2 w-full" />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-semibold">Password</label>
          <input type="password" v-model="newUser.password" required class="border rounded px-3 py-2 w-full" />
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
      </form>
    </div>

    <!-- Edit User Modal -->
    <div v-if="editingUser" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-semibold mb-4">Edit User</h2>
        <form @submit.prevent="editUser">
          <div class="mb-4">
            <label for="first_name" class="block text-sm font-semibold">First Name</label>
            <input type="text" v-model="editingUser.first_name" required class="border rounded px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label for="last_name" class="block text-sm font-semibold">Last Name</label>
            <input type="text" v-model="editingUser.last_name" required class="border rounded px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-semibold">Email</label>
            <input type="email" v-model="editingUser.email" required class="border rounded px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-semibold">Password (optional)</label>
            <input type="password" v-model="editingUser.password" class="border rounded px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label for="role" class="block text-sm font-semibold">Role</label>
            <select v-model="editingUser.role" required class="border rounded px-3 py-2 w-full">
              <option value="basic">Basic</option>
              <option value="complete">Complete</option>
              <!-- <option value="admin">Admin</option> -->
            </select>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="editingUser = null" class="mr-4 bg-gray-300 text-black px-4 py-2 rounded">Cancel</button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Update User</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Button to show the Add User Form -->
    <button
      @click="showAddUserForm = !showAddUserForm"
      class="bg-green-500 text-white px-4 py-2 rounded mt-4"
    >
      {{ showAddUserForm ? "Cancel" : "Add New User" }}
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      loading: false,
      error: null,
      successMessage: "",
      newUser: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
      editingUser: null,
      showAddUserForm: false,
    };
  },
  methods: {
    // Fetch all users from the backend
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/allusers");
        this.users = response.data.users;
      } catch (err) {
        this.error = "Failed to fetch users.";
      } finally {
        this.loading = false;
      }
    },

    // Add new user
    async addUser() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/basicregister", this.newUser);
        this.users.push(response.data.user);
        this.newUser = { first_name: "", last_name: "", email: "", password: "" };
        this.showAddUserForm = false;
        this.successMessage = "User added successfully!";
      } catch (err) {
        this.error = "Failed to add user.";
      } finally {
        this.loading = false;
      }
    },

    // Edit existing user
    async editUser() {
  this.loading = true;
  this.error = null;
  this.successMessage = ""; // Reset success message

  // Ensure the required fields are present
  if (!this.editingUser.first_name || !this.editingUser.last_name || !this.editingUser.email) {
    this.error = "First Name, Last Name, and Email are required.";
    this.loading = false;
    return;
  }

  // Prepare the updated user data, omit password if it's not being updated
  // Add a console log to check the role being sent
const updatedUser = {
  first_name: this.editingUser.first_name,
  last_name: this.editingUser.last_name,
  email: this.editingUser.email,
  role: this.editingUser.role // Ensure this is correct
};

console.log('Updating user with data:', updatedUser);

if (this.editingUser.password) {
  updatedUser.password = this.editingUser.password;
}


  // Include password only if it's provided (not empty or null)
  if (this.editingUser.password) {
    updatedUser.password = this.editingUser.password;
  }

  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/edituser/${this.editingUser.id}`, updatedUser);
    const index = this.users.findIndex(user => user.id === this.editingUser.id);
    this.users.splice(index, 1, response.data.user);
    this.editingUser = null;
    this.successMessage = "User updated successfully!";
    setTimeout(() => { this.successMessage = ""; }, 3000);
  } catch (err) {
    if (err.response && err.response.data) {
      this.error = err.response.data.message || "Failed to update user.";
    } else {
      this.error = "Failed to update user.";
    }
  } finally {
    this.loading = false;
  }
}
,

    // Delete a user
    async deleteUser(id) {
      this.loading = true;
      this.error = null;
      this.successMessage = ""; // Reset success message
      try {
        await axios.delete(`http://127.0.0.1:8000/api/deleteuser/${id}`);
        this.users = this.users.filter(user => user.id !== id);
        this.successMessage = "User deleted successfully!";
        setTimeout(() => { this.successMessage = ""; }, 3000);
      } catch (err) {
        this.error = "Failed to delete user.";
      } finally {
        this.loading = false;
      }
    },

    // Start editing a user
    startEditing(user) {
      this.editingUser = { ...user };
    }
  },

  // Fetch users when the component mounts
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style>
  .users-grid {
    height: 65vh;
  }
</style>
