<template>
  <div class="flex p-5 bg-white text-white property-page">
    <aside class="w-1/4 h-1/2 bg-gray-700 rounded-lg p-4 mr-4 filters">
      <div class="results-count mb-4 text-lg">
        Aantal resultaten: {{ filteredProperties.length }}
      </div>

      <div v-if="errorMessage" class="error-message mb-4 text-red-400">
        {{ errorMessage }}
      </div>

      <!-- Buttons to check/uncheck all filters -->
      <div class="filter-controls flex justify-between mb-4">
        <button class="small-button bg-blue-500 text-white py-1 px-3 rounded" @click="checkAll">Check All</button>
        <button class="small-button bg-red-500 text-white py-1 px-3 rounded" @click="uncheckAll">Uncheck All</button>
      </div>

      <!-- Filter Checkboxes (Zwembad, Garage, Tuin, Zonnepanelen) -->
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

      <!-- Price Range Slider -->
      <div class="card-conteiner mb-6">
        <div class="card-content">
          <div class="card-title">Price <span>Range</span></div>
          <div class="values">
            <div>€<span id="first">{{ priceRange.min }}</span></div> - 
            <div>€<span id="second">{{ priceRange.max }}</span></div>
          </div>
          <small class="current-range">
            Current Range:
            <div>€<span id="third">{{ priceRange.max }}</span></div>
          </small>
          <div class="slider">
            <label class="label-min-value">€1</label>
            <label class="label-max-value">€2,000,000</label>
          </div>
          <div class="rangeslider">
            <input
              class="min input-ranges"
              type="range"
              min="500"
              max="2000000"
              v-model="priceRange.min"
              @change="handleMinPriceChange"
            />
            <input
              class="max input-ranges"
              type="range"
              min="500"
              max="2000000"
              v-model="priceRange.max"
              @change="handleMaxPriceChange"
            />
          </div>
        </div>
      </div>
    </aside>

    <!-- Property Cards Section -->
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
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const filters = ref(Array(4).fill(false));
const properties = ref([]);
const defaultImage = 'https://via.placeholder.com/150';
const checkboxLabels = ['Zwembad', 'Garage', 'Tuin', 'Zonnepanelen'];
const errorMessage = ref(null);

// Price range slider values
const priceRange = ref({ min: 735, max: 6465 });

// Use Vue Router
const router = useRouter();

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

function checkAll() {
  filters.value = filters.value.map(() => true);
}

function uncheckAll() {
  filters.value = filters.value.map(() => false);
}

function goToPropertyDetail(id) {
  router.push({ name: 'PropertyDetail', params: { id } });
}

// Handle min price change on release
function handleMinPriceChange() {
  if (priceRange.value.min > priceRange.value.max) {
    priceRange.value.min = priceRange.value.max - 1; // Adjust slightly if min exceeds max
  }
}

// Handle max price change on release
function handleMaxPriceChange() {
  if (priceRange.value.max < priceRange.value.min) {
    priceRange.value.max = priceRange.value.min + 1; // Adjust slightly if max is below min
  }
}
</script>

<style scoped>
.card-conteiner {
  cursor: default;
  --color-primary: #275efe;
  --color-headline: #3f4656;
  --color-text: #99a3ba;
}

.card-content {
  max-width: 312px;
  padding: 36px 32px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(18, 22, 33, 0.12);
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--color-headline);
}

.card-content .values {
  margin: 0;
  font-weight: 500;
  color: var(--color-primary);
}

.rangeslider input {
  width: 100%;
  height: 5px;
  background: var(--color-headline);
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
}

.input-ranges[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #2196F3;
  transition: background-color 0.2s;
}

.input-ranges[type="range"]:focus::-webkit-slider-thumb {
  background-color: #1a73e8;
}

.input-ranges[type="range"]:focus {
  outline: none;
}

/* Styling for the toggle buttons */
.toggle {
  display: inline-block;
  width: 60px;
  height: 34px;
}

.toggle .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
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
  border-radius: 50%;
  transition: transform 0.4s;
}

.toggle input:checked + .slider {
  background-color: #2196F3;
}

.toggle input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

.toggle input:checked + .slider:before {
  transform: translateX(26px);
}

.filter-controls button {
  padding: 8px 16px;
  border-radius: 4px;
}

.filter-controls .small-button {
  background-color: #275efe;
  color: white;
  font-size: 14px;
}

/* Blue color for current range */
.current-range {
  color: #275efe; /* Same blue as buttons */
  font-weight: bold;
}
</style>
