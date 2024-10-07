<template>
  <div class="w-full rounded-3xl bg-red-500 p-8">
    <form @submit.prevent="submitForm" class="grid grid-cols-2 gap-4">
      <!-- First Name -->
      <div class="grid grid-cols-2 gap-2">
        <div class="form-group col-span-1">
          <label for="first_name" class="font-bold">First Name</label>
          <input type="text" v-model="form.first_name" id="first_name" required maxlength="255"
            class="ring-1 ring-gray-300 rounded-3xl py-2" />
        </div>

        <!-- Last Name -->
        <div class="form-group col-span-1">
          <label for="last_name" class="font-bold">Last Name</label>
          <input type="text" v-model="form.last_name" id="last_name" required maxlength="255"
            class="ring-1 ring-gray-300 rounded-3xl py-2" />
        </div>

        <!-- Gender -->
        <div class="form-group col-span-2">
          <label for="gender" class="font-bold">Gender</label>
          <select v-model="form.gender" id="gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <!-- Birthdate -->
        <div class="form-group col-span-2">
          <label for="birthdate" class="font-bold">Birthdate</label>
          <input type="date" v-model="form.birthdate" id="birthdate" required
            class="ring-1 ring-gray-300 rounded-3xl py-2" />
        </div>

        <!-- Address -->
        <div class="form-group col-span-2">
          <label for="address" class="font-bold">Address</label>
          <input type="text" v-model="form.address" id="address" required maxlength="255"
            class="ring-1 ring-gray-300 rounded-3xl py-2" />
        </div>

        <!-- Phone -->
        <div class="form-group col-span-2">
          <label for="phone" class="font-bold">Phone</label>
          <input type="tel" v-model="form.phone" id="phone" required maxlength="15"
            class="ring-1 ring-gray-300 rounded-3xl py-2" />
        </div>

        <!-- Annual Income -->
        <div class="form-group col-span-1">
          <label for="annual_income" class="font-bold">Annual Income</label>
          <input type="number" v-model="form.annual_income" id="annual_income" required min="0"
            class="ring-1 ring-gray-300 rounded-3xl py-2" />
        </div>

        <!-- Income Documents -->
        <div class="form-group">
          <label for="income_documents col-span-1" class="font-bold">Income Documents</label>
          <input type="file" id="income_documents" multiple @change="handleFileUpload" accept=".pdf,.png"
            class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" />
        </div>

        <!-- Preferred Location -->
        <div class="form-group col-span-1">
          <label for="preferred_location" class="font-bold">Preferred Location</label>
          <input type="text" v-model="form.preferred_location" id="preferred_location" required maxlength="255"
            class="ring-1 ring-gray-300 rounded-3xl py-2" />
        </div>

        <!-- Radius -->
        <div class="form-group col-span-1">
          <label for="radius" class="font-bold">Preferred Radius (in kilometers)</label>
          <input type="number" v-model="form.radius" id="radius" required min="0"
            class="ring-1 ring-gray-300 rounded-3xl py-2" />
        </div>

        <!-- Email -->
        <div class="form-group col-span-2">
          <label for="email" class="font-bold">Email</label>
          <input type="email" v-model="form.email" id="email" required maxlength="255"
            class="ring-1 ring-gray-300 rounded-3xl py-2" />
        </div>

        <!-- Password -->
        <div class="form-group col-span-2">
          <label for="password" class="font-bold">Password</label>
          <input type="password" v-model="form.password" id="password" required minlength="8"
            class="ring-1 ring-gray-300 rounded-3xl py-2" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">

        <div>
          <MapAutocomplete />
        </div>


        <div class="form-group col-span-2">
          <label for="first_name" class="font-bold">Post code</label>
          <input type="text" v-model="form.first_name" id="first_name" required maxlength="255"
            class="ring-1 ring-gray-300 rounded-3xl py-2" />
        </div>

        <!-- Last Name -->
        <div class="form-group col-span-2">
          <label for="last_name" class="font-bold">Huis Nummer</label>
          <input type="text" v-model="form.last_name" id="last_name" required maxlength="255"
            class="ring-1 ring-gray-300 rounded-3xl py-2" />
        </div>

        <!-- Address -->
        <div class="form-group col-span-2">
          <label for="address" class="font-bold">Straatnaam</label>
          <input type="text" v-model="form.address" id="address" required maxlength="255"
            class="ring-1 ring-gray-300 rounded-3xl py-2" />
        </div>

        <!-- Phone -->
        <div class="form-group col-span-2">
          <label for="phone" class="font-bold">Plaats</label>
          <input type="tel" v-model="form.phone" id="phone" required maxlength="15"
            class="ring-1 ring-gray-300 rounded-3xl py-2" />
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit"
        class="col-span-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { onMounted } from 'vue';

export default {
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        gender: '',
        birthdate: '',
        address: '',
        phone: '',
        annual_income: '',
        income_documents: [],
        preferred_location: '',
        radius: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.income_documents = Array.from(event.target.files);
    },
    async submitForm() {
      const formData = new FormData();

      // Append regular fields
      for (const key in this.form) {
        if (key !== 'income_documents') {
          formData.append(key, this.form[key]);
        }
      }

      // Append multiple files for income_documents
      if (this.form.income_documents.length) {
        this.form.income_documents.forEach((file, index) => {
          formData.append(`income_documents[${index}]`, file);
        });
      }

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/register', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Form submitted successfully!');
        console.log(response.data);
      } catch (error) {
        // Enhanced error logging
        console.error('Error response data:', error.response ? error.response.data : error);
        alert(`Failed to submit the form: ${error.response?.data?.message || error.message}`);
      }
    }

  },
  mounted() {
    // This will run when the component is mounted
    const dateInput = document.getElementById('birthdate');
    const minDate = '1920-01-01'; // Minimum date set to January 1st, 1920
    const maxDate = '2008-12-31'; // Maximum date set to December 31st, 2008

    if (dateInput) {
      dateInput.min = minDate; // Assign the minimum date
      dateInput.max = maxDate; // Assign the maximum date
    }
  },
};
</script>

<style>
.form-container {
  max-width: 600px;
  margin: auto;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>