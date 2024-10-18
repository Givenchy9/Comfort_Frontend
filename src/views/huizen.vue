<template>
  <div class="property-page">
    <aside class="filters">
      <div class="filter-controls">
        <button class="small-button" @click="checkAll">Check All</button>
        <button class="small-button" @click="uncheckAll">Uncheck All</button>
      </div>

      <div v-for="(filter, index) in filters" :key="index">
        <input 
          type="checkbox" 
          :id="'filter-' + index"
          v-model="filters[index]" 
        />
        <label :for="'filter-' + index">{{ checkboxLabels[index] }}</label>
      </div>

      <div v-for="(slider, index) in sliders" :key="index">
        <label :for="'slider-' + index">Slider {{ index + 1 }} (Value: {{ sliders[index] }})</label>
        <input 
          type="range" 
          :id="'slider-' + index" 
          v-model="sliders[index]" 
          min="1" max="10"
        />
      </div>
    </aside>

    <main class="properties-grid">
      <div v-for="(property, index) in filteredProperties" :key="index" class="property-card" @click="goToPropertyDetail(property.id)">
        <div class="property-image">
          <img :src="property.image || defaultImage" alt="Property Image" />
        </div>
        <h3 class="property-title">{{ property.address }}</h3>
        <div class="property-details">
          <div class="detail-row">
            <p class="property-detail"><strong>Straatnaam:</strong> {{ property.straatnaam }}</p>
            <p class="property-detail"><strong>Postcode:</strong> {{ property.postcode }}</p>
          </div>
          <div class="detail-row">
            <p class="property-detail"><strong>Oppervlakte Huis:</strong> {{ property.oppervlakte_huis }} m²</p>
            <p class="property-detail"><strong>Oppervlakte Tuin:</strong> {{ property.oppervlakte_tuin }} m²</p>
          </div>
        </div>
        <div class="property-actions">
          <button @click.stop="openDeleteConfirmModal(index)">🗑️</button>
        </div>
      </div>
    </main>

    <div v-if="isDeleteConfirmModalOpen" class="modal">
      <div class="modal-content">
        <h3>Weet je zeker dat je deze woning wilt verwijderen?</h3>
        <p>{{ properties[deleteIndex]?.address }}</p>
        <div class="modal-actions">
          <button @click="confirmDelete">Verwijder</button>
          <button @click="closeDeleteConfirmModal">Annuleer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Import axios to make API calls

export default {
  data() {
    return {
      filters: Array(4).fill(false), // Checkboxes for zwembad, garage, tuin, zonnepanelen
      sliders: Array(3).fill(1), // Sliders initialized to 5
      properties: [], // Initialize with an empty array for houses data
      isDeleteConfirmModalOpen: false,
      deleteIndex: null,
      defaultImage: 'https://via.placeholder.com/150', // Replace with your stock image URL
      checkboxLabels: [
        'Zwembad', 
        'Garage', 
        'Tuin', 
        'Zonnepanelen'
      ]
    };
  },
  computed: {
    filteredProperties() {
      // Filter properties based on the selected features
      return this.properties.filter(property => {
        const hasZwembad = this.filters[0] ? property.zwembad === "ja" : true;
        const hasGarage = this.filters[1] ? property.garage === "ja" : true;
        const hasTuin = this.filters[2] ? property.tuin === "ja" : true;
        const hasZonnepanelen = this.filters[3] ? property.zonnepanelen === "ja" : true;

        return hasZwembad && hasGarage && hasTuin && hasZonnepanelen;
      });
    }
  },
  mounted() {
    // Fetch the houses data from the API when the component is mounted
    this.fetchHouses();
  },
  methods: {
    async fetchHouses() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/huizen');
        this.properties = response.data; // Update properties with the data from the API
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    },
    checkAll() {
      this.filters = this.filters.map(() => true);
    },
    uncheckAll() {
      this.filters = this.filters.map(() => false);
    },
    goToPropertyDetail(id) {
      this.$router.push({ name: 'PropertyDetail', params: { id } }); // Navigate to the detail page
    },
    openDeleteConfirmModal(index) {
      this.isDeleteConfirmModalOpen = true;
      this.deleteIndex = index;
    },
    closeDeleteConfirmModal() {
      this.isDeleteConfirmModalOpen = false;
      this.deleteIndex = null;
    },
    confirmDelete() {
      this.properties.splice(this.deleteIndex, 1);
      this.closeDeleteConfirmModal();
    }
  }
};
</script>

<style scoped>
.property-page {
  display: flex;
}

.filters {
  width: 30%;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columns layout */
  gap: 16px;
  flex-grow: 1;
}

.property-card {
  border: 1px solid rgb(59 130 246 / 0.5);
  border-radius: 8px;
  padding: 16px; /* Increased padding for better spacing */
  width: 550px; /* Fixed width */
  height: auto; /* Changed to auto to accommodate content */
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease;
  background-color: #fff; /* Set a white background for better readability */
}

.property-card:hover {
  transform: scale(1.05);
}

.property-image img {
  width: 100%; /* Ensure the image fills the card width */
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.property-title {
  font-size: 1.5em; /* Title size */
  font-weight: bold;
  margin: 10px 0;
}

.property-details {
  margin-top: 8px; /* Space between title and details */
}

.detail-row {
  display: flex; /* Flexbox for row layout */
  justify-content: space-between; /* Space items evenly */
  margin-bottom: 8px; /* Space between rows */
}

.property-detail {
  color: #333; /* Darker text for better readability */
}

.property-detail strong {
  color: rgb(59, 130, 246); /* Accent color for labels */
}

.property-actions {
  position: absolute;
  bottom: 8px;
  right: 8px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.small-button {
  border: none;
  background: #ccc;
  color: white;
  cursor: pointer;
}
</style>
