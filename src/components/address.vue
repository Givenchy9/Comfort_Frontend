<template>
    <div id="app">
      <h2>Autocomplete Address Form</h2>
      <form class="address-form">
        <input
          id="autocomplete"
          v-model="autocompleteInput"
          @input="initializeAutocomplete"
          type="text"
          placeholder="Start typing your address..."
        />
        <input v-model="street" type="text" placeholder="Street" readonly />
        <input v-model="city" type="text" placeholder="City" readonly />
        <input v-model="state" type="text" placeholder="State" readonly />
        <input v-model="zip" type="text" placeholder="Zip Code" readonly />
        <input v-model="country" type="text" placeholder="Country" readonly />
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        autocompleteInput: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      };
    },
    methods: {
      initializeAutocomplete() {
        if (!window.google) return; // Ensure Google API is loaded
        const input = document.getElementById('autocomplete');
  
        const autocomplete = new google.maps.places.Autocomplete(input, {
          types: ['geocode'],
        });
  
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
  
          // Clear existing values
          this.street = '';
          this.city = '';
          this.state = '';
          this.zip = '';
          this.country = '';
  
          // Loop through address components and fill in form
          for (const component of place.address_components) {
            const addressType = component.types[0];
  
            switch (addressType) {
              case 'street_number':
                this.street = component.long_name;
                break;
              case 'route':
                this.street += ' ' + component.long_name;
                break;
              case 'locality':
                this.city = component.long_name;
                break;
              case 'administrative_area_level_1':
                this.state = component.short_name;
                break;
              case 'postal_code':
                this.zip = component.long_name;
                break;
              case 'country':
                this.country = component.long_name;
                break;
            }
          }
        });
      },
    },
    mounted() {
      // Load Google Maps Places API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      document.head.appendChild(script);
    },
  };
  </script>
  
  <style scoped>
  /* Add some basic styling */
  body {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  
  .address-form {
    width: 300px;
    margin: 0 auto;
  }
  
  .address-form input {
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    box-sizing: border-box;
  }
  </style>
  