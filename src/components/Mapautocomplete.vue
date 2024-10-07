<template>
    <div>
        <div class="search-container">
            <input type="text" v-model="query" placeholder="Enter a location" @input="fetchLocations"
                @focus="showDropdown = true" />
            <ul v-if="showDropdown && suggestions.length" class="suggestions-list">
                <li v-for="(location, index) in suggestions" :key="index" @click="selectLocation(location)">
                    {{ location.display_name }}
                </li>
            </ul>
        </div>
        <div id="map" class="map-container"></div>
    </div>
</template>

<script>
import axios from 'axios';
import L from 'leaflet';

export default {
    name: 'MapAutocomplete',
    data() {
        return {
            query: '',
            suggestions: [],
            showDropdown: false,
            map: null,
            marker: null,
        };
    },
    methods: {
        // Fetch suggestions from Nominatim API
        async fetchLocations() {
            if (this.query.length < 3) {
                this.suggestions = [];
                return;
            }

            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${this.query}`;
            try {
                const response = await axios.get(url);
                this.suggestions = response.data;
            } catch (error) {
                console.error('Error fetching location data:', error);
            }
        },
        // Select a location from the suggestions
        selectLocation(location) {
            this.query = location.display_name;
            this.showDropdown = false;
            this.suggestions = [];

            // Update map to show the selected location
            const { lat, lon } = location;
            this.updateMap(lat, lon);
        },
        // Initialize the Leaflet map
        initializeMap() {
            this.map = L.map('map').setView([51.505, -0.09], 13); // Initial view set to London
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(this.map);
        },
        // Update the map to the selected location
        updateMap(lat, lon) {
            if (this.marker) {
                this.map.removeLayer(this.marker);
            }

            this.marker = L.marker([lat, lon]).addTo(this.map);
            this.map.setView([lat, lon], 15);
        },
    },
    mounted() {
        this.initializeMap();
    },
};
</script>

<style>
/* Styling for the search box and map */
.search-container {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1000;
}

.search-container input {
    width: 300px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.suggestions-list {
    list-style: none;
    padding: 0;
    margin: 5px 0 0 0;
    border: 1px solid #ddd;
    border-top: none;
    background: #fff;
    max-height: 150px;
    overflow-y: auto;
}

.suggestions-list li {
    padding: 8px;
    cursor: pointer;
}

.suggestions-list li:hover {
    background: #f0f0f0;
}

.map-container {
    height: 500px;
    margin-top: 60px;
}
</style>