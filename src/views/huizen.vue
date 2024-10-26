<template>
  <div class="flex p-5 bg-white text-white property-page">
    <aside class="w-1/4 h-1/2 bg-gray-700 rounded-lg p-4 mr-4 filters">
      <div class="results-count mb-4 text-lg">
        Aantal resultaten: {{ filteredProperties.length }}
      </div>

      <div v-if="errorMessage" class="error-message mb-4 text-red-400">
        {{ errorMessage }}
      </div>

      <div class="filter-controls flex justify-between mb-4">
        <button class="small-button bg-blue-500 text-white py-1 px-3 rounded" @click="checkAll">Check All</button>
        <button class="small-button bg-red-500 text-white py-1 px-3 rounded" @click="uncheckAll">Uncheck All</button>
      </div>

      <div v-for="(filter, index) in filters" :key="index" class="filter-item mb-4">
        <div class="flex items-center">
          <input :id="'filter-' + index" type="checkbox" v-model="filters[index]" class="hidden" />
          <label :for="'filter-' + index" class="toggle relative inline-flex items-center cursor-pointer">
            <input type="checkbox" :id="'filter-' + index" v-model="filters[index]" class="hidden" />
            <span class="slider rounded"></span>
          </label>
          <label :for="'filter-' + index" class="ml-2">{{ checkboxLabels[index] }}</label>
        </div>
      </div>

      <div v-for="(slider, index) in sliders" :key="index" class="slider-item mb-4">
        <label :for="'slider-' + index">Slider {{ index + 1 }} (Value: {{ sliders[index] }})</label>
        <input type="range" :id="'slider-' + index" v-model="sliders[index]" min="1" max="10" class="slider w-full" />
      </div>
    </aside>

    <main class="properties-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-3/4">
      <div v-for="(property, index) in filteredProperties" :key="index"
        class="property-card bg-gray-600 rounded-lg p-4 cursor-pointer" @click="goToPropertyDetail(property.id)">
        <div class="property-image mb-2">
          <img :src="property.image || defaultImage" alt="Property Image" class="w-full rounded-lg" />
        </div>
        <h3 class="property-title text-lg font-bold">{{ property.address }}</h3>
        <div class="property-details text-sm">
          <div class="detail-row mb-1">
            <p class="property-detail"><strong>Straatnaam:</strong> {{ property.straatnaam }}</p>
            <p class="property-detail"><strong>Postcode:</strong> {{ property.postcode }}</p>
            <p class="property-detail"><strong>Prijs:</strong> € {{ property.prijs }}</p>
          </div>
          <div class="detail-row">
            <p class="property-detail"><strong>Oppervlakte Huis:</strong> {{ property.oppervlakte_huis }} m²</p>
            <p class="property-detail"><strong>Oppervlakte Tuin:</strong> {{ property.oppervlakte_tuin }} m²</p>
          </div>
        </div>
        <div class="property-actions text-right">
          <button @click.stop="openDeleteConfirmModal(index)" class="delete-button text-red-500">🗑️</button>
        </div>
      </div>
    </main>

    <div v-if="isDeleteConfirmModalOpen"
      class="modal fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-70">
      <div class="modal-content bg-white p-4 rounded-lg text-center">
        <h3>Weet je zeker dat je deze woning wilt verwijderen?</h3>
        <p>{{ properties[deleteIndex]?.address }}</p>
        <div class="modal-actions mt-4">
          <button @click="confirmDelete"
            class="confirm-button bg-green-500 text-white py-1 px-4 rounded">Verwijder</button>
          <button @click="closeDeleteConfirmModal"
            class="cancel-button bg-red-500 text-white py-1 px-4 rounded">Annuleer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const filters = ref(Array(4).fill(false));
const sliders = ref(Array(3).fill(1));
const properties = ref([]);
const isDeleteConfirmModalOpen = ref(false);
const deleteIndex = ref(null);
const defaultImage = 'https://via.placeholder.com/150';
const checkboxLabels = ['Zwembad', 'Garage', 'Tuin', 'Zonnepanelen'];
const errorMessage = ref(null);

// Computed property for filtered properties
const filteredProperties = computed(() => {
  return properties.value.filter(property => {
    const hasZwembad = filters.value[0] ? property.zwembad === "ja" : true;
    const hasGarage = filters.value[1] ? property.garage === "ja" : true;
    const hasTuin = filters.value[2] ? property.tuin === "ja" : true;
    const hasZonnepanelen = filters.value[3] ? property.zonnepanelen === "ja" : true;

    return hasZwembad && hasGarage && hasTuin && hasZonnepanelen;
  });
});

// Fetch houses on component mount
onMounted(() => {
  fetchHouses();
});

// Fetch houses from API
async function fetchHouses() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/huizen');
    properties.value = response.data;
    errorMessage.value = null; // Clear any previous error messages
  } catch (error) {
    console.error('Error fetching houses:', error.response ? error.response.data : error.message);
    errorMessage.value = 'Er is een fout opgetreden bij het ophalen van de woningen.'; // Update the error message
  }
}

// Check all filters
function checkAll() {
  filters.value = filters.value.map(() => true);
}

// Uncheck all filters
function uncheckAll() {
  filters.value = filters.value.map(() => false);
}

// Navigate to property detail
function goToPropertyDetail(id) {
  // Assuming you have a router setup
  this.$router.push({ name: 'PropertyDetail', params: { id } });
}

// Open delete confirmation modal
function openDeleteConfirmModal(index) {
  isDeleteConfirmModalOpen.value = true;
  deleteIndex.value = index;
}

// Close delete confirmation modal
function closeDeleteConfirmModal() {
  isDeleteConfirmModalOpen.value = false;
  deleteIndex.value = null;
}

// Confirm delete action
function confirmDelete() {
  properties.value.splice(deleteIndex.value, 1);
  closeDeleteConfirmModal();
}
</script>

<style scoped>
.toggle {
  display: inline-block;
  width: 60px;
  /* Adjusted width for the toggle */
  height: 34px;
  /* Adjusted height for the toggle */
}

.toggle .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  /* Default background color */
  border-radius: 34px;
  /* Rounded edges for the toggle */
  transition: background-color 0.4s;
}

.toggle .slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  /* Color of the slider thumb */
  border-radius: 50%;
  /* Rounded thumb */
  transition: transform 0.4s;
}

.toggle input:checked+.slider {
  background-color: #2196F3;
  /* Background color when checked */
}

.toggle input:focus+.slider {
  box-shadow: 0 0 1px #2196F3;
  /* Focus effect */
}

.toggle input:checked+.slider:before {
  transform: translateX(26px);
  /* Move the thumb when checked */
}

/* .toggle .dot {
  transition: all 0.2s ease;
}

.toggle input:checked+span .dot {
  transform: translateX(100%);
} */
</style>
