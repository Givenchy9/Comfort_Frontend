<template>
  <div class="property-page">
    <aside class="filters">
      <div class="results-count">
        Aantal resultaten: {{ filteredProperties.length }}
      </div>
      
      <div class="filter-controls">
        <button class="small-button" @click="checkAll">Check All</button>
        <button class="small-button" @click="uncheckAll">Uncheck All</button>
      </div>

      <div v-for="(filter, index) in filters" :key="index" class="filter-item">
        <div class="checkbox-wrapper-51">
          <input 
            :id="'filter-' + index" 
            type="checkbox" 
            v-model="filters[index]" 
          />
          <label class="toggle" :for="'filter-' + index">
            <span>
              <svg viewBox="0 0 10 10" height="10px" width="10px">
                <path d="M5,1 L5,1 C2.790861,1 1,2.790861 1,5 L1,5 C1,7.209139 2.790861,9 5,9 L5,9 C7.209139,9 9,7.209139 9,5 L9,5 C9,2.790861 7.209139,1 5,1 L5,9 L5,1 Z"></path>
              </svg>
            </span>
          </label>
          <label :for="'filter-' + index">{{ checkboxLabels[index] }}</label>
        </div>
      </div>

      <div v-for="(slider, index) in sliders" :key="index" class="slider-item">
        <label :for="'slider-' + index">Slider {{ index + 1 }} (Value: {{ sliders[index] }})</label>
        <input 
          type="range" 
          :id="'slider-' + index" 
          v-model="sliders[index]" 
          min="1" max="10"
          class="slider"
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
            <p class="property-detail"><strong>Prijs:</strong> € {{ property.prijs }}</p>
          </div>
          <div class="detail-row">
            <p class="property-detail"><strong>Oppervlakte Huis:</strong> {{ property.oppervlakte_huis }} m²</p>
            <p class="property-detail"><strong>Oppervlakte Tuin:</strong> {{ property.oppervlakte_tuin }} m²</p>
          </div>
        </div>
        <div class="property-actions">
          <button @click.stop="openDeleteConfirmModal(index)" class="delete-button">🗑️</button>
        </div>
      </div>
    </main>

    <div v-if="isDeleteConfirmModalOpen" class="modal">
      <div class="modal-content">
        <h3>Weet je zeker dat je deze woning wilt verwijderen?</h3>
        <p>{{ properties[deleteIndex]?.address }}</p>
        <div class="modal-actions">
          <button @click="confirmDelete" class="confirm-button">Verwijder</button>
          <button @click="closeDeleteConfirmModal" class="cancel-button">Annuleer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      filters: Array(4).fill(false),
      sliders: Array(3).fill(1),
      properties: [],
      isDeleteConfirmModalOpen: false,
      deleteIndex: null,
      defaultImage: 'https://via.placeholder.com/150',
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
    this.fetchHouses();
  },
  methods: {
    async fetchHouses() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/huizen');
        this.properties = response.data;
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
      this.$router.push({ name: 'PropertyDetail', params: { id } });
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
  padding: 20px;
  background-color: #1e1e1e;
  color: #fff;
}

.results-count {
  color: #fff;
  margin-bottom: 16px;
  font-size: 1.2em;
}

.filters {
  width: 25%;
  background: #2c2c2c;
  border-radius: 10px;
  padding: 20px;
  margin-right: 20px;
}

.filter-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter-item, .slider-item {
  margin-bottom: 16px;
}

.checkbox-wrapper-51 {
  display: flex;
  align-items: center;
  padding: 1px;
}

.checkbox-wrapper-51 input[type="checkbox"] {
  visibility: hidden;
  display: none;
}

.checkbox-wrapper-51 .toggle {
  position: relative;
  display: block;
  width: 42px;
  height: 24px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transform: translate3d(0, 0, 0);
}

.checkbox-wrapper-51 .toggle:before {
  content: "";
  position: relative;
  top: 1px;
  left: 1px;
  width: 40px;
  height: 22px;
  display: block;
  background: #c8ccd4;
  border-radius: 12px;
  transition: background 0.2s ease;  
}

.checkbox-wrapper-51 .toggle span {
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  display: block;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(154,153,153,0.75);
  transition: all 0.2s ease;
}

.checkbox-wrapper-51 .toggle span svg {
  margin: 7px;
  fill: none;
}

.checkbox-wrapper-51 .toggle span svg path {
  stroke: #c8ccd4;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 24;
  stroke-dashoffset: 0;
  transition: all 0.5s linear;
}

.checkbox-wrapper-51 label {
  margin-left: 5px;
}

.checkbox-wrapper-51 input[type="checkbox"]:checked + .toggle:before {
  background: #1175c7;
}

.checkbox-wrapper-51 input[type="checkbox"]:checked + .toggle span {
  transform: translateX(18px);
}

.checkbox-wrapper-51 input[type="checkbox"]:checked + .toggle span path {
  stroke: #000000;
  stroke-dasharray: 25;
  stroke-dashoffset: 25;
}

.slider {
  border-radius: 10px;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
  gap: 16px;
  flex-grow: 1;
}

.property-card {
  border: 1px solid rgba(59, 130, 246, 0.5);
  border-radius: 10px;
  padding: 16px; 
  height: auto; 
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease; 
  background-color: #fff; 
}

.property-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); 
}

.property-image img {
  width: 100%; 
  height: 200px;
  object-fit: cover;
  border-radius: 10px; 
}

.property-title {
  font-size: 1.5em; 
  font-weight: bold;
  margin: 10px 0;
}

.property-details {
  margin-top: 8px; 
}

.detail-row {
  display: flex; 
  justify-content: space-between; 
  margin-bottom: 8px; 
}

.property-detail {
  color: #333; 
}

.property-detail strong {
  color: rgb(59, 130, 246); 
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
  z-index: 999; 
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25); 
  color: black;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.small-button {
  border: none;
  background: rgb(59, 130, 246); 
  color: white;
  cursor: pointer;
  border-radius: 10px; 
  padding: 8px 12px; 
  transition: background 0.3s ease; 
}

.small-button:hover {
  background: rgba(59, 130, 246, 0.8); 
}

.delete-button {
  background: transparent;
  border: none;
  cursor: pointer;
  color: rgb(255, 0, 0); 
  font-size: 1.5em; 
}

.confirm-button {
  background: rgb(59, 130, 246); 
  color: white;
  border: none;
  border-radius: 10px; 
  padding: 8px 12px; 
  transition: background 0.3s ease; 
}

.confirm-button:hover {
  background: rgba(59, 130, 246, 0.8); 
}

.cancel-button {
  background: #ccc; 
  color: black;
  border: none;
  border-radius: 10px; 
  padding: 8px 12px; 
  transition: background 0.3s ease; 
}

.cancel-button:hover {
  background: rgba(200, 200, 200, 0.8); 
}
</style>
