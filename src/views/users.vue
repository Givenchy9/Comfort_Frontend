<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold text-center mb-4">Users Management</h1>
  

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
  
      <!-- Users List -->
      <div v-else-if="users.length === 0" class="text-center text-gray-500">
        <p>No users found.</p>
      </div>
  
      <!-- Users Grid -->
      <div v-else class="grid grid-cols-1 bg-red-500 gap-2 overflow-auto users-grid">
        <div
          v-for="(user, index) in users"
          :key="user.id"
          class="bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          <!-- Render "hello" only in the first div -->
          <div v-if="index === 0">
            <p>hello</p>
          </div>
  
          <h2 class="text-lg font-semibold">{{ user.first_name }}, {{ user.last_name }}</h2>
          <p class="text-gray-600">Email: {{ user.email }}</p>
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
      <div
        v-if="showAddUserForm"
        class="mt-4 p-4 bg-white shadow-md rounded-lg border border-gray-200"
      >
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
            <div class="flex justify-end">
              <button type="button" @click="editingUser = null" class="mr-4 bg-gray-300 text-black px-4 py-2 rounded">
                Cancel
              </button>
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
  
      async addUser() {
        this.loading = true;
        this.error = null;
        try {
          const response = await axios.post("http://127.0.0.1:8000/api/basicregister", this.newUser);
          this.users.push(response.data.user);
          this.newUser = { first_name: "", last_name: "", email: "", password: "" };
          this.showAddUserForm = false;
        } catch (err) {
          this.error = "Failed to add user.";
        } finally {
          this.loading = false;
        }
      },
  
      async editUser() {
    this.loading = true;
    this.error = null;
    this.successMessage = "";  // Reset success message before making the request
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/user/${this.editingUser.id}`, this.editingUser);
        const index = this.users.findIndex(user => user.id === this.editingUser.id);
        this.users.splice(index, 1, response.data.user);
        this.editingUser = null;
        
        // Set success message after successful edit
        this.successMessage = "User edited successfully!";

        // Hide the success message after 3 seconds
        setTimeout(() => {
            this.successMessage = "";
        }, 3000);
    } catch (err) {
        if (err.response && err.response.data) {
            this.error = "Failed to update user: " + JSON.stringify(err.response.data.message);
        }
    } finally {
        this.loading = false;
    }
},




  
      async deleteUser(id) {
        this.loading = true;
        this.error = null;
        try {
          await axios.delete(`http://127.0.0.1:8000/api/user/${id}`);
          this.users = this.users.filter(user => user.id !== id);
        } catch (err) {
          this.error = "Failed to delete user.";
        } finally {
          this.loading = false;
        }
      },
  
      startEditing(user) {
        this.editingUser = { ...user };
      },
    },
  
    mounted() {
      this.fetchUsers();
    },
  };
  </script>
  
  <style>
    .users-grid{
        height: 65vh;
    }
  </style>
  