<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold text-center mb-4">House Management</h1>

    <div v-if="successMessage" class="p-4 mb-4 text-sm text-emerald-500 rounded-xl bg-emerald-50 font-normal w-1/3 m-auto text-center">
      <p>{{ successMessage }}</p><i class="fa-solid fa-circle-check"></i>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center font-bold text-3xl">
      <p class="text-gray-500">Loading...<i class="fa-solid fa-spinner fa-spin-pulse"></i></p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>

    <!-- No Houses State -->
    <div v-else-if="houses.length === 0" class="text-center text-gray-500">
      <p>No houses found.</p>
    </div>

    <!-- Houses Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="(house, index) in houses"
        :key="house.id"
        class="bg-white shadow-md rounded-lg p-4 border border-gray-200"
      >
        <div v-if="index === 0">
          <p>Featured House</p>
        </div>
        <h2 class="text-lg font-semibold">{{ house.straatnaam }}</h2>
        <p class="text-gray-600">Price: {{ house.prijs }}</p>
        <p class="text-gray-600">Type: {{ house.type }}</p>
        <p class="text-gray-600">Location: {{ house.plaats }}</p>

        <button @click="startEditing(house)" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-1">
          Edit
        </button>
        <button @click="deleteHouse(house.id)" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium text-sm px-5 py-1">
          Delete
        </button>
      </div>
    </div>

    <!-- Add House Form -->
    <div v-if="showAddHouseForm" class="mt-4 p-4 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 class="text-xl font-semibold mb-2">Add New House</h2>
      <form @submit.prevent="addHouse">
        <div class="mb-4">
          <label for="straatnaam" class="block text-sm font-semibold">Street Name</label>
          <input type="text" v-model="newHouse.straatnaam" required class="border rounded px-3 py-2 w-full" />
        </div>
        <div class="mb-4">
          <label for="prijs" class="block text-sm font-semibold">Price</label>
          <input type="number" v-model="newHouse.prijs" required class="border rounded px-3 py-2 w-full" />
        </div>
        <div class="mb-4">
          <label for="type" class="block text-sm font-semibold">Type</label>
          <select v-model="newHouse.type" required class="border rounded px-3 py-2 w-full">
            <option value="koop">Buy</option>
            <option value="huur">Rent</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="plaats" class="block text-sm font-semibold">Location</label>
          <input type="text" v-model="newHouse.plaats" required class="border rounded px-3 py-2 w-full" />
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add House</button>
      </form>
    </div>

    <!-- Edit House Modal -->
    <div v-if="editingHouse" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-semibold mb-4">Edit House</h2>
        <form @submit.prevent="editHouse">
          <div class="mb-4">
            <label for="straatnaam" class="block text-sm font-semibold">Street Name</label>
            <input type="text" v-model="editingHouse.straatnaam" required class="border rounded px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label for="prijs" class="block text-sm font-semibold">Price</label>
            <input type="number" v-model="editingHouse.prijs" required class="border rounded px-3 py-2 w-full" />
          </div>
          <div class="mb-4">
            <label for="type" class="block text-sm font-semibold">Type</label>
            <select v-model="editingHouse.type" required class="border rounded px-3 py-2 w-full">
              <option value="koop">Buy</option>
              <option value="huur">Rent</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="plaats" class="block text-sm font-semibold">Location</label>
            <input type="text" v-model="editingHouse.plaats" required class="border rounded px-3 py-2 w-full" />
          </div>
          <div class="flex justify-end">
            <button type="button" @click="editingHouse = null" class="mr-4 bg-gray-300 text-black px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Update House</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Button to Show Add House Form -->
    <button @click="showAddHouseForm = !showAddHouseForm" class="bg-green-500 text-white px-4 py-2 rounded mt-4">
      {{ showAddHouseForm ? "Cancel" : "Add New House" }}
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
      successMessage: "",
      newHouse: {
        straatnaam: "",
        prijs: "",
        type: "koop",
        plaats: "",
      },
      editingHouse: null,
      showAddHouseForm: false,
    };
  },
  methods: {
    async fetchHouses() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/huizen");
        this.houses = response.data || [];
      } catch (err) {
        this.error = "Failed to fetch houses.";
      } finally {
        this.loading = false;
      }
    },

    async addHouse() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/huizen", this.newHouse);
        this.houses.push(response.data.house);
        this.newHouse = { straatnaam: "", prijs: "", type: "koop", plaats: "" };
        this.showAddHouseForm = false;
        this.successMessage = "House added successfully!";
      } catch (err) {
        this.error = "Failed to add house.";
      } finally {
        this.loading = false;
      }
    },

    async editHouse() {
      this.loading = true;
      this.error = null;
      this.successMessage = "";

      if (!this.editingHouse.straatnaam || !this.editingHouse.prijs || !this.editingHouse.plaats) {
        this.error = "Street Name, Price, and Location are required.";
        this.loading = false;
        return;
      }

      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/huizen/${this.editingHouse.id}`, this.editingHouse);
        const index = this.houses.findIndex(house => house.id === this.editingHouse.id);
        this.houses.splice(index, 1, response.data.house);
        this.editingHouse = null;
        this.successMessage = "House updated successfully!";
        setTimeout(() => { this.successMessage = ""; }, 3000);
      } catch (err) {
        this.error = "Failed to update house.";
      } finally {
        this.loading = false;
      }
    },

    async deleteHouse(id) {
      this.loading = true;
      this.error = null;
      this.successMessage = "";
      try {
        await axios.delete(`http://127.0.0.1:8000/api/huizen/${id}`);
        this.houses = this.houses.filter(house => house.id !== id);
        this.successMessage = "House deleted successfully!";
      } catch (err) {
        this.error = "Failed to delete house.";
      } finally {
        this.loading = false;
      }
    },

    startEditing(house) {
      this.editingHouse = { ...house };
    },
  },

  created() {
    this.fetchHouses();
  },
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
