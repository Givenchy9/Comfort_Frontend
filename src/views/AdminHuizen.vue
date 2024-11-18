<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold text-center mb-4">House Management</h1>
  
      <!-- Loading state -->
      <div v-if="loading" class="text-center font-bold text-3xl">
        <p class="text-gray-500">Loading...<i class="fa-solid fa-spinner fa-spin-pulse"></i></p>
      </div>
  
      <!-- Error state -->
      <div v-else-if="error" class="text-center text-red-500">
        <p>{{ error }}</p>
      </div>
  
      <!-- House List -->
      <div v-else-if="houses.length === 0" class="text-center text-gray-500">
        <p>No houses found.</p>
      </div>
  
      <!-- Houses Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="house in houses"
          :key="house.id"
          class="bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          <h2 class="text-lg font-semibold">{{ house.straatnaam || 'No Street Name' }}</h2>
          <p class="text-gray-600">Price: {{ house.prijs || 'N/A' }}</p>
          <p class="text-gray-600">Type: {{ house.type || 'Unknown' }}</p>
          <p class="text-gray-600">Location: {{ house.plaats || 'Not Available' }}</p>
  
          <button @click="viewHouse(house.id)" class="text-blue-500 mt-2">View</button>
          <button @click="editHouse(house.id)" class="text-yellow-500 mt-2">Edit</button>
          <button @click="deleteHouse(house.id)" class="text-red-500 mt-2">Delete</button>
        </div>
      </div>
  
      <!-- Add House Form -->
      <div v-if="showAddHouseForm" class="mt-4 p-4 bg-white shadow-md rounded-lg border border-gray-200">
        <h2 class="text-xl font-semibold mb-2">Add New House</h2>
        <form @submit.prevent="addHouse">
          <div class="mb-4">
            <label for="straatnaam" class="block text-sm font-semibold">Street Name</label>
            <input type="text" v-model="formData.straatnaam" required class="border rounded px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label for="prijs" class="block text-sm font-semibold">Price</label>
            <input type="number" v-model="formData.prijs" required class="border rounded px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label for="type" class="block text-sm font-semibold">Type</label>
            <select v-model="formData.type" required class="border rounded px-3 py-2 w-full">
              <option value="koop">Buy</option>
              <option value="huur">Rent</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="plaats" class="block text-sm font-semibold">Location</label>
            <input type="text" v-model="formData.plaats" required class="border rounded px-3 py-2 w-full" />
          </div>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add House</button>
        </form>
      </div>
  
      <!-- Edit House Form -->
      <div v-if="isEditingHouse" class="mt-4 p-4 bg-white shadow-md rounded-lg border border-gray-200">
        <h2 class="text-xl font-semibold mb-2">Edit House</h2>
        <form @submit.prevent="updateHouse">
          <div class="mb-4">
            <label for="straatnaam" class="block text-sm font-semibold">Street Name</label>
            <input type="text" v-model="formData.straatnaam" required class="border rounded px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label for="prijs" class="block text-sm font-semibold">Price</label>
            <input type="number" v-model="formData.prijs" required class="border rounded px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label for="type" class="block text-sm font-semibold">Type</label>
            <select v-model="formData.type" required class="border rounded px-3 py-2 w-full">
              <option value="koop">Buy</option>
              <option value="huur">Rent</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="plaats" class="block text-sm font-semibold">Location</label>
            <input type="text" v-model="formData.plaats" required class="border rounded px-3 py-2 w-full" />
          </div>
          <button type="submit" class="bg-yellow-500 text-white px-4 py-2 rounded">Update House</button>
        </form>
      </div>
  
      <!-- Button to show the Add House Form -->
      <button @click="toggleAddHouseForm" class="bg-green-500 text-white px-4 py-2 rounded mt-4">
        {{ showAddHouseForm ? 'Cancel' : 'Add New House' }}
      </button>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        houses: [],
        loading: false,
        error: null,
        showAddHouseForm: false,
        isEditingHouse: false,
        formData: {
          straatnaam: '',
          prijs: '',
          type: 'koop',
          plaats: ''
        },
        houseId: null,
      };
    },
    methods: {
      // Fetch all houses
      async fetchHouses() {
        this.loading = true;
        this.error = null;
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/huizen");
          console.log(response.data); // Log API response to check structure
          this.houses = response.data || []; // Ensure we handle empty or invalid responses
        } catch (err) {
          this.error = "Failed to fetch houses.";
        } finally {
          this.loading = false;
        }
      },
  
      // Show form to add a new house
      toggleAddHouseForm() {
        this.showAddHouseForm = !this.showAddHouseForm;
        if (this.showAddHouseForm) {
          this.isEditingHouse = false;
          this.formData = {
            straatnaam: '',
            prijs: '',
            type: 'koop',
            plaats: ''
          };
        }
      },
  
      // Show form to edit an existing house
      editHouse(id) {
        this.isEditingHouse = true;
        this.houseId = id;
        this.getHouseDetails(id);
      },
  
      // Fetch details of a specific house
      async getHouseDetails(id) {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/huizen");
          this.formData = response.data;
        } catch (err) {
          this.error = "Failed to fetch house details.";
        }
      },
  
      // Add a new house
      async addHouse() {
        this.loading = true;
        this.error = null;
        try {
          const response = await axios.post("http://127.0.0.1:8000/api/huizen");
          this.houses.push(response.data.huis);
          this.toggleAddHouseForm();
        } catch (err) {
          this.error = "Failed to add house.";
        } finally {
          this.loading = false;
        }
      },
  
      // Update an existing house
      async updateHouse() {
        this.loading = true;
        this.error = null;
        try {
          const response = await axios.put("http://127.0.0.1:8000/api/huizen");
          const index = this.houses.findIndex(house => house.id === this.houseId);
          this.houses.splice(index, 1, response.data.huis);
          this.isEditingHouse = false;
        } catch (err) {
          this.error = "Failed to update house.";
        } finally {
          this.loading = false;
        }
      },
  
      // Delete a house
      async deleteHouse(id) {
        this.loading = true;
        this.error = null;
        try {
          await axios.delete("http://127.0.0.1:8000/api/huizen");
          this.houses = this.houses.filter(house => house.id !== id);
        } catch (err) {
          this.error = "Failed to delete house.";
        } finally {
          this.loading = false;
        }
      },
  
      // View house details
      viewHouse(id) {
        // You can implement this to show details on a different page or modal
        console.log("Viewing house", id);
      },
    },
  
    mounted() {
      this.fetchHouses();
    },
  };
  </script>
  
  <style scoped>
  /* Tailwind CSS will automatically handle most of the styling */
  </style>
  