<template>
    <div class="postcode-verifier">
        <h2>Netherlands Postcode Verifier</h2>
        <form @submit.prevent="verifyPostcode">
            <input type="text" v-model="postcode" placeholder="Enter Dutch Postcode (e.g., 1234 AB)"
                class="postcode-input" />
            <button type="submit" class="verify-button">Verify</button>
        </form>

        <div v-if="error" class="error-message">{{ error }}</div>
        <div v-if="location" class="location-details">
            <p><strong>Street:</strong> {{ location.street }}</p>
            <p><strong>City:</strong> {{ location.city }}</p>
            <p><strong>Province:</strong> {{ location.province }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'PostcodeVerifier',
    data() {
        return {
            postcode: '',
            location: null,
            error: '',
        };
    },
    methods: {
        async verifyPostcode() {
            this.error = '';
            this.location = null;

            // Validate Dutch postcode format: four digits followed by two uppercase letters
            const postcodePattern = /^[1-9][0-9]{3}\s?[A-Z]{2}$/;

            if (!this.postcode.match(postcodePattern)) {
                this.error = 'Please enter a valid Dutch postcode (e.g., 1234 AB).';
                return;
            }

            // Remove any whitespace from the postcode for the API call
            const formattedPostcode = this.postcode.replace(/\s+/g, '');

            try {
                // Call the Postcode API with the provided API key and postcode
                const response = await axios.get(
                    `https://api.postcodeapi.nu/v3/lookup/${formattedPostcode}`,
                    {
                        headers: {
                            'X-Api-Key': 'YOUR_API_KEY_HERE', // Replace with your Postcode API key
                        }
                    }
                );

                if (response.data && response.data.street && response.data.city) {
                    this.location = {
                        street: response.data.street,
                        city: response.data.city,
                        province: response.data.province,
                    };
                } else {
                    this.error = 'Invalid postcode. Please try again.';
                }
            } catch (error) {
                this.error = 'Invalid postcode or API error. Please try again.';
            }
        },
    },
};
</script>

<style scoped>
.postcode-verifier {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
}

.postcode-input {
    width: 80%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.verify-button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.verify-button:hover {
    background-color: #45a049;
}

.error-message {
    color: red;
    margin-top: 10px;
}

.location-details {
    margin-top: 20px;
    text-align: left;
}
</style>