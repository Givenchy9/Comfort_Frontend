<template>
  <div class="property-detail">
    <header>
      <h1>Property Detail</h1>
    </header>

    <div class="image-gallery">
      <!-- Check if pictures object exists -->
      <div v-if="property.pictures" class="image-container">
        <!-- If picture exists, show it -->
        <img :src="getImageUrl(property.pictures.picture)" alt="Foto van huis" />
      </div>
      <!-- Optional: Handle case where no picture is available -->
      <div v-else>
        <p>No picture available</p>
      </div>
    </div>

    <div class="mydict">
      <div>
        <label>
          <input type="radio" name="radio" value="photos" checked @change="showTab('photos')">
          <span :class="{ active: isActiveTab('photos') }">Foto's</span>
        </label>
        <label>
          <input type="radio" name="radio" value="info" @change="showTab('info')">
          <span :class="{ active: isActiveTab('info') }">Informatie</span>
        </label>
        <label>
          <input type="radio" name="radio" value="highlights" @change="showTab('highlights')">
          <span :class="{ active: isActiveTab('highlights') }">Bezienswaardigheden</span>
        </label>
        <label>
          <input type="radio" name="radio" value="reviews" @change="showTab('reviews')">
          <span :class="{ active: isActiveTab('reviews') }">Reviews</span>
        </label>
      </div>
    </div>

    <div class="content">
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
          <!-- Insert Image Here -->
          <li><strong>Afbeelding:</strong> 
            <!-- Check if the picture exists -->
            <img v-if="property.pictures" :src="getImageUrl(property.pictures.picture)" alt="Property Image" style="max-width: 100%;">
            <p v-else>No image available</p>
          </li>
        </ul>
      </div>
    </div>
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
        const response = await axios.get(`http://127.0.0.1:8000/api/huizen/${id}`);
        this.property = response.data; // Store the fetched data in the 'property' object
      } catch (error) {
        console.error('Er is een fout opgetreden bij het ophalen van de woninggegevens:', error.message);
      }
    },
    isActiveTab(tab) {
      // Determine if the tab is active or should be colored (previous tabs)
      const tabsOrder = ['photos', 'info', 'highlights', 'reviews'];
      const currentIndex = tabsOrder.indexOf(this.activeTab);
      const tabIndex = tabsOrder.indexOf(tab);
      return tabIndex <= currentIndex; // Return true if the tab is the active one or before it
    },
    // Method to get the full image URL (assuming the picture is stored under 'storage')
    getImageUrl(picturePath) {
      return `http://127.0.0.1:8000/storage/${picturePath}`;
    },
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
  background-color: #1e1e1e; /* Dark grey background */
  color: #fff; /* White text for contrast */
  border-radius: 10px; /* Rounded corners for overall container */
}

header {
  text-align: center;
  margin-bottom: 20px;
}

.image-gallery {
  display: flex;
  gap: 10px;
}

.image-container {
  flex: 1;
  border: 2px solid rgba(59, 130, 246, 0.5);
  border-radius: 10px;
  overflow: hidden;
}

:focus {
  outline: 0;
  border-color: #2260ff;
  box-shadow: 0 0 0 4px #b5c9fc;
}

.mydict div {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  justify-content: center;
}

.mydict input[type="radio"] {
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.mydict input[type="radio"]:checked + span {
  box-shadow: 0 0 0 0.0625em #0043ed;
  background-color: #d4edda;
  z-index: 1;
  color: #0043ed;
}

label span {
  display: block;
  cursor: pointer;
  background-color: #fff;
  padding: 0.375em .75em;
  position: relative;
  margin-left: .0625em;
  box-shadow: 0 0 0 0.0625em #b5bfd9;
  letter-spacing: .05em;
  color: #3e4963;
  text-align: center;
  transition: background-color .5s ease;
}

/* Active tab styles for previous tabs */
label span.active {
  background-color: #d4edda; /* Light green background for active or previous tabs */
  color: #155724; /* Dark green text color */
}

label:first-child span {
  border-radius: .375em 0 0 .375em;
}

label:last-child span {
  border-radius: 0 .375em .375em 0;
}

.content {
  margin-top: 20px;
}

.tab-content {
  border: 1px solid rgba(59, 130, 246, 0.5);
  padding: 10px;
  border-radius: 10px; /* Rounded corners for tab content */
  background-color: #2c2c2c; /* Dark grey for content area */
}
</style>
