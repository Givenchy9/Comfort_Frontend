<template>
  <div class="property-detail">
    <header>
      <h1>Property Detail</h1>
    </header>
    
    <div class="image-gallery">
      <div class="image-container">
        <img :src="propertyImage" alt="foto van huis" />
      </div>
      <div class="image-container">
        <img :src="propertyImage" alt="foto van huis" />
      </div>
    </div>

    <nav class="tabs">
      <button @click="showTab('photos')">foto's</button>
      <button @click="showTab('info')">informatie</button>
      <button @click="showTab('highlights')">bezienswaardigheden</button>
      <button @click="showTab('reviews')">reviews</button>
    </nav>

    <div class="content">
      <div v-if="activeTab === 'photos'" class="tab-content">
        <h2>Foto's</h2>
        <p>Hier komen de foto's van de woning.</p>
      </div>
      
      <div v-if="activeTab === 'info'" class="tab-content">
        <h2>Informatie</h2>
        <p>{{ propertyInfo }}</p>
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
export default {
  data() {
    return {
      propertyImage: 'https://f.hubspotusercontent30.net/hubfs/4890439/_system/Website%20images/Woningfotografie_05.jpg', // Use the provided image URL
      propertyInfo: 'Hier staat informatie over de woning. Dit kan bijvoorbeeld de oppervlakte, het aantal kamers, en andere details omvatten.',
      activeTab: 'info' // Default active tab
    };
  },
  methods: {
    showTab(tab) {
      this.activeTab = tab;
    }
  }
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
  border: 2px solid #ccc; /* Border around each image */
  border-radius: 8px;
  overflow: hidden; /* To keep the corners rounded */
}

.image-container img {
  width: 100%; /* Adjust to fit within the container */
  height: auto; /* Maintain aspect ratio */
  display: block; /* Remove bottom space from image */
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
