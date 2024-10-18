<template>
  <div class="property-detail">
    <header>
      <h1>Property Detail</h1>
    </header>
    
    <div class="image-gallery">
      <div class="image-container">
        <img :src="property.image" alt="foto van huis" />
      </div>
      <div class="image-container">
        <img :src="property.image" alt="foto van huis" />
      </div>
    </div>

    <nav class="tabs">
      <button @click="showTab('photos')">Foto's</button>
      <button @click="showTab('info')">Informatie</button>
      <button @click="showTab('highlights')">Bezienswaardigheden</button>
      <button @click="showTab('reviews')">Reviews</button>
    </nav>

    <div class="content">
      <div v-if="activeTab === 'photos'" class="tab-content">
        <h2>Foto's</h2>
        <p>Hier komen de foto's van de woning.</p>
      </div>
      
      <div v-if="activeTab === 'info'" class="tab-content">
        <h2>Informatie</h2>
        <ul>
          <li><strong>Straatnaam:</strong> {{ property.straatnaam }}</li>
          <li><strong>Postcode:</strong> {{ property.postcode }}</li>
          <li><strong>Huisnummer:</strong> {{ property.huisnummer }}</li>
          <li><strong>Plaats:</strong> {{ property.plaats }}</li>
          <li><strong>Provincie:</strong> {{ property.provincie }}</li>
          <li><strong>Prijs:</strong> € {{ property.prijs }}</li>
          <li><strong>Type:</strong> {{ property.type }}</li>
          <li><strong>Oppervlakte huis:</strong> {{ property.oppervlakte_huis }} m²</li>
          <li><strong>Oppervlakte tuin:</strong> {{ property.oppervlakte_tuin }} m²</li>
          <li><strong>Slaapkamers:</strong> {{ property.slaapkamers }}</li>
          <li><strong>Badkamers:</strong> {{ property.badkamers }}</li>
          <li><strong>Woonlagen:</strong> {{ property.woonlagen }}</li>
          <li><strong>Energie Label:</strong> {{ property.energie_label }}</li>
          <li><strong>Isolatie:</strong> {{ property.isolatie }}</li>
          <li><strong>Bouwjaar:</strong> {{ property.bouwjaar }}</li>
          <li><strong>Garage:</strong> {{ property.garage }}</li>
          <li><strong>Zwembad:</strong> {{ property.zwembad }}</li>
          <li><strong>Tuin:</strong> {{ property.tuin }}</li>
          <li><strong>Zonnepanelen:</strong> {{ property.zonnepanelen }}</li>
        </ul>
      </div>
      
      <div v-if="activeTab === 'highlights'" class="tab-content">
        <h2>Bezienswaardigheden</h2>
        <p>Hier komen de bezienswaardigheden.</p>
      </div>
      
      <div v-if="activeTab === 'reviews'" class="tab-content">
        <h2>Reviews</h2>
        <p>Hier komen de reviews.</p>
      </div>
    </div>

    <footer>
      <p>footer</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      property: {}, // Object to hold property details
      activeTab: 'info', // Default active tab
    };
  },
  methods: {
    showTab(tab) {
      this.activeTab = tab;
    },
    async fetchPropertyDetails(id) {
      console.log(`Fetching property details for ID: ${id}`); // Log the ID
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/huizen/${id}`); // Update this line
        this.property = response.data; // Store the fetched data in the 'property' object
      } catch (error) {
        console.error('Er is een fout opgetreden bij het ophalen van de woninggegevens:', error.message);
      }
    }
  },
  created() {
    // Get the property ID from the route and fetch the details when the component is created
    const propertyId = this.$route.params.id;
    this.fetchPropertyDetails(propertyId);
  },
};
</script>

<style scoped>
.property-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.image-gallery {
  display: flex;
  gap: 10px;
}

.image-container {
  flex: 1;
  border: 2px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
}

.tabs {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
}

.tabs button {
  flex: 1;
  padding: 10px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.tabs button:hover {
  background-color: #e0e0e0;
}

.content {
  margin-top: 20px;
}

.tab-content {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
}

footer {
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
}
</style>
