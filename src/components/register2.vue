<template>
  <div class="container">
    <form @submit.prevent="submitForm" ref="form">
      <div v-if="!isComplete">
        <!-- Form for gender, birthdate, etc. -->
        <div>
          <label for="gender">Gender:</label>
          <select v-model="form.gender" id="gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label for="birthdate">Birthdate:</label>
          <input type="date" v-model="form.birthdate" id="birthdate" required />
        </div>

        <div>
          <label for="phone">Phone:</label>
          <input type="text" v-model="form.phone" id="phone" required />
        </div>

        <div>
          <label for="address">Address:</label>
          <input type="text" v-model="form.address" id="address" required />
        </div>

        <div>
          <label for="preferred_location">Preferred Location:</label>
          <input type="text" v-model="form.preferred_location" id="preferred_location" />
        </div>

        <button type="submit">Submit</button>
      </div>

      <div v-else>
        <p>Your profile is complete!</p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        gender: '',
        birthdate: '',
        phone: '',
        address: '',
        preferred_location: '',
      },
      isComplete: false,
    };
  },
  methods: {
    async submitForm() {
      try {
        // Get the auth token (assuming it's stored in localStorage)
        const token = localStorage.getItem('token');

        if (!token) {
          alert('You must be logged in to complete your profile.');
          return;
        }

        // Send the request to the backend API
        const response = await axios.post(
          'http://localhost:8000/api/completeRegister',
          this.form,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle success
        if (response.status === 200) {
          this.isComplete = true; // Mark profile as complete
          console.log('Profile completed successfully:', response.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 422) {
          console.error('Validation failed:', error.response.data.errors);
          // You can display these errors in the UI if needed
        } else if (error.response && error.response.status === 401) {
          console.error('Unauthorized:', error.response.data.message);
          alert('You must be logged in to complete your profile.');
        } else {
          console.error('An error occurred:', error.message);
        }
      }
    },
  },
};
</script>

<style scoped>
/* Add some basic styling */
.container {
  width: 50%;
  margin: 0 auto;
}
form {
  display: flex;
  flex-direction: column;
}
form div {
  margin-bottom: 10px;
}
button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
