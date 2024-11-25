<template>
  <header3/>
  <div class="flex p-5 bg-white text-white property-page dark:bg-gray-900">
    <aside class="w-1/4 h-1/2 bg-gray-700 rounded-lg p-4 mr-4 filters">
      <div class="results-count mb-4 text-lg">
        Aantal resultaten: {{ filteredProperties.length }}
      </div>

      <div v-if="errorMessage" class="error-message mb-4 text-red-400">
        {{ errorMessage }}
      </div>

      <!-- Check all/uncheck all buttons -->
      <div class="filter-controls flex gap-2 mb-4">
        <button class="small-button bg-blue-500 text-white py-1 px-3 rounded" @click="checkAll">Check All</button>
        <button class="small-button bg-red-500 text-white py-1 px-3 rounded" @click="uncheckAll">Uncheck All</button>
      </div>

      <!-- Toggle switches -->
      <div class="toggle-switches mb-4">
        <div v-for="(filter, index) in filters" :key="index" class="filter-item mb-4 flex items-center">
          <label class="switch">
            <input type="checkbox" v-model="filters[index]" />
            <span class="slider"></span>
          </label>
          <label :for="'filter-' + index" class="ml-2">{{ checkboxLabels[index] }}</label>
        </div>
      </div>

      <!-- Price slider -->
      <div class="price-slider mb-6">
        <div class="card-content">
          <div class="card-title">Maximum Price</div>
          <div class="values">
            <div>€<span id="max-price">{{ priceRange.max }}</span></div>
          </div>
          <div class="rangeslider">
            <input
              class="max input-ranges"
              type="range"
              min="500000"
              max="2000000"
              step="10000"
              v-model="priceRange.max"
              @input="handlePriceChange"
            />
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </aside>

    <!-- Property Cards -->
    <main class="properties-grid properties grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-3/4 overflow-auto">
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
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import header3 from '@/components/header3.vue';

const filters = ref(Array(4).fill(false)); // Toggle switches state (Zwembad, Garage, Tuin, Zonnepanelen)
const properties = ref([]); // All properties
const defaultImage = 'https://via.placeholder.com/150';
const checkboxLabels = ['Zwembad', 'Garage', 'Tuin', 'Zonnepanelen'];
const errorMessage = ref(null);

// Price range values
const priceRange = ref({ max: 500000 }); // Default to 500,000

// Vue Router
const router = useRouter();

// Fetch houses from the API
onMounted(() => {
  fetchHouses();
});

async function fetchHouses() {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/huizen');
    properties.value = response.data;
    errorMessage.value = null;
  } catch (error) {
    console.error('Error fetching houses:', error);
    errorMessage.value = 'Er is een fout opgetreden bij het ophalen van de woningen.';
  }
}

// Computed property to filter properties based on price and checkboxes
const filteredProperties = computed(() => {
  return properties.value.filter(property => {
    // Filter based on the toggled features (filters)
    const hasZwembad = filters.value[0] ? property.zwembad === "ja" : true;
    const hasGarage = filters.value[1] ? property.garage === "ja" : true;
    const hasTuin = filters.value[2] ? property.tuin === "ja" : true;
    const hasZonnepanelen = filters.value[3] ? property.zonnepanelen === "ja" : true;

    // Filter based on price
    const isInPriceRange = property.prijs <= priceRange.value.max;

    return hasZwembad && hasGarage && hasTuin && hasZonnepanelen && isInPriceRange;
  });
});

// Check all filters
function checkAll() {
  filters.value = filters.value.map(() => true);
}

// Uncheck all filters
function uncheckAll() {
  filters.value = filters.value.map(() => false);
}

/// Go to property detail page
function goToPropertyDetail(id) {
  router.push({ name: 'PropertyDetail', params: { id } });
}

// Handle price slider changes
function handlePriceChange() {
  // You could add more logic here if needed in the future
}
</script>

<style scoped>
/* New Toggle Switch Styles */
.switch {
  --button-width: 3.5em;
  --button-height: 2em;
  --toggle-diameter: 1.5em;
  --button-toggle-offset: calc((var(--button-height) - var(--toggle-diameter)) / 2);
  --toggle-shadow-offset: 10px;
  --toggle-wider: 3em;
  --color-grey: #cccccc;
  --color-green: #4296f4;
}

.slider {
  display: inline-block;
  width: var(--button-width);
  height: var(--button-height);
  background-color: var(--color-grey);
  border-radius: calc(var(--button-height) / 2);
  position: relative;
  transition: 0.3s all ease-in-out;
}

.slider::after {
  content: "";
  display: inline-block;
  width: var(--toggle-diameter);
  height: var(--toggle-diameter);
  background-color: #fff;
  border-radius: calc(var(--toggle-diameter) / 2);
  position: absolute;
  top: var(--button-toggle-offset);
  transform: translateX(var(--button-toggle-offset));
  box-shadow: var(--toggle-shadow-offset) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
  transition: 0.3s all ease-in-out;
}

.switch input[type="checkbox"]:checked + .slider {
  background-color: var(--color-green);
}

.switch input[type="checkbox"]:checked + .slider::after {
  transform: translateX(calc(var(--button-width) - var(--toggle-diameter) - var(--button-toggle-offset)));
  box-shadow: calc(var(--toggle-shadow-offset) * -1) 0 calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
}

.switch input[type="checkbox"] {
  display: none;
}

.switch input[type="checkbox"]:active + .slider::after {
  width: var(--toggle-wider);
}

.switch input[type="checkbox"]:checked:active + .slider::after {
  transform: translateX(calc(var(--button-width) - var(--toggle-wider) - var(--button-toggle-offset)));
}

.PB-range-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: #D5DBE1;
  border-radius: 5px;
  outline: none;
}

.PB-range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background-color: #007bff;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.PB-range-slidervalue {
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
}

.properties{
  height: 80vh;
}
</style>
