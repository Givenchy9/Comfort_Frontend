<template>
  <form @submit.prevent="submitForm" class="bg-red-500 grid grid-cols-2 m-8 gap-4">
    <div>
      <label for="first_name" class="font-bold">Voornaam</label>
      <input type="text" id="first_name" v-model="form.first_name" maxlength="20" placeholder="20 characters max"
        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
        required />
    </div>
    <div>
      <label for="last_name" class="font-bold">Achternaam</label>
      <input type="text" id="last_name" v-model="form.last_name" maxlength="30" placeholder="30 characters max"
        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
        required />
    </div>
    <div>
      <label for="gender" class="font-bold">Geslacht</label>
      <select id="gender" v-model="form.gender"
        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
        required>
        <option value="male">Man</option>
        <option value="female">Vrouw</option>
      </select>
    </div>
    <div>
      <label for="birthdate" class="font-bold">Geboorte dag</label>
      <input type="date" id="birthdate" v-model="form.birthdate"
        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
        required />
    </div>
    <div>
      <label for="address" class="font-bold">Address:</label>
      <input type="text" id="address" v-model="form.address"
        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
        required />
    </div>
    <div>

      <!-- <label for="phone" class="font-bold">Phone:</label>
      <input type="text" id="phone" v-model="form.phone"
        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
        required /> -->
    </div>
    <div>
      <label for="annual_income" class="font-bold">Annual Income:</label>
      <input type="number" id="annual_income" v-model="form.annual_income"
        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
        required />
    </div>
    <div>
      <label for="preferred_location" class="font-bold">Preferred Location:</label>
      <input type="text" id="preferred_location" v-model="form.preferred_location"
        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
        required />
    </div>
    <div>
      <label for="radius" class="font-bold">Radius:</label>
      <input type="number" id="radius" v-model="form.radius"
        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
        required />
    </div>
    <div>
      <label for="email" class="font-bold">Email:</label>
      <input type="email" id="email" v-model="form.email"
        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
        required />
    </div>
    <div class="col-span-2">
      <label for="password" class="font-bold">Password:</label>
      <input type="password" id="password" v-model="form.password"
        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
        required />
    </div>
    <button type="submit"
      class="col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</button>
  </form>
  <div v-if="error" class="error">{{ error }}</div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

// Reactive form object
const form = ref({
  first_name: '',
  last_name: '',
  gender: '',
  birthdate: '',
  address: '',
  phone: '',
  annual_income: '',
  preferred_location: '',
  radius: '',
  email: '',
  password: ''
});

// Reactive error message
const error = ref('');

// Function to submit the form
const submitForm = async () => {
  try {
    console.log('User Token:', localStorage.getItem('token'));
    const response = await axios.post('http://127.0.0.1:8000/api/completeregister', form.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in local storage
      }
    });
    // Handle successful registration, e.g., redirect or show a message
    console.log(response.data);
  } catch (err) {
    // Handle validation errors
    if (err.response && err.response.data) {
      error.value = err.response.data.message || 'Registration failed';
    } else {
      error.value = 'An error occurred';
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
</style>
