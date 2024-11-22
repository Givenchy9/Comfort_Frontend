<template>
    <form @submit.prevent="submitForm" class="grid grid-cols-2 m-8 mt-4 m-auto gap-4">
      <p class="col-span-2 text-center font-bold text-2xl mb-10">Register</p>
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
        <input type="date" id="birthdate" v-model="form.birthdate" :min="minDate" :max="maxDate"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          required />
      </div>
      <div>
        <label for="address" class="font-bold">Postcode</label>
        <input type="text" id="address" v-model="form.address" @input="validatePostcode" maxlength="6"
          placeholder="1234AB"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          required />
        <div v-if="postcodeError" class="error text-red-600">{{ postcodeError }}</div>
      </div>
      <!-- <div>
        <label for="address" class="font-bold">Address:</label>
        <input type="text" id="address" v-model="form.address"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          required />
      </div> -->
      <div>
        <label for="phone" class="font-bold">Telefoon nummer (NL)</label>
        <input type="text" id="phone" v-model="form.phone" @input="validatePhoneNumber" maxlength="11"
          placeholder="06 XXXXXXXX"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          required />
        <div v-if="phoneError" class="error text-red-600">{{ phoneError }}</div>
      </div>
      <div>
        <label for="annual_income" class="font-bold">Jaarlijks inkomen</label>
        <input type="number" id="annual_income" v-model="form.annual_income" @input="validateAnnualIncome" min="1400"
          max="100000" placeholder="Uw jaarlijks inkomen moet minimaal 1400 zijn"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          required />
        <div v-if="annualIncomeError" class="error text-red-600">{{ annualIncomeError }}</div>
      </div>
      <div>
        <label for="preferred_location" class="font-bold">Vorkeursprovincie</label>
        <select id="preferred_location" v-model="form.preferred_location"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          required>
          <option value="" disabled selected>Kies een provincie</option>
          <option value="Drenthe">Drenthe</option>
          <option value="Flevoland">Flevoland</option>
          <option value="Friesland">Friesland</option>
          <option value="Gelderland">Gelderland</option>
          <option value="Groningen">Groningen</option>
          <option value="Limburg">Limburg</option>
          <option value="Noord-Brabant">Noord-Brabant</option>
          <option value="Noord-Holland">Noord-Holland</option>
          <option value="Overijssel">Overijssel</option>
          <option value="Utrecht">Utrecht</option>
          <option value="Zeeland">Zeeland</option>
          <option value="Zuid-Holland">Zuid-Holland</option>
        </select>
  
        <!-- <label for="preferred_location" class="font-bold">Preferred Location:</label>
        <input type="text" id="preferred_location" v-model="form.preferred_location"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          required /> -->
      </div>
      <div>
        <label for="radius" class="font-bold">Afstands straal in KM</label>
        <input type="text" id="radius" v-model="form.radius" @input="validateRadius" min="0" max="30"
          placholder="Kilometer"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:pl-2"
          required />
        <div v-if="radiusError" class="error text-red-600">{{ radiusError }}</div>
        <!-- <label for="radius" class="font-bold">Afstands straal in KM</label>
        <input type="number" id="radius" v-model="form.radius" min="0" max="30"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
          required /> -->
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
  
      <RouterLink to="/login" class="col-span-2 font-bold float-right text-center hover:text-blue-600 hover:underline">
        Heb je all een acocunt, log hier in
      </RouterLink>
  
      <div v-if="successMessage" class="success text-center m-auto bg-green-200 rounded col-span-2 px-2">
        <i class="fa-solid fa-check-circle"></i> {{ successMessage }}
      </div>
  
      <div v-if="error" class="error text-center m-auto bg-red-200 rounded col-span-2 px-2">
        <i class="fa-solid fa-triangle-exclamation"></i> {{ error }}
      </div>
    </form>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  
  // Reactive form object
  const form = ref({
    first_name: '',
    last_name: '',
    gender: '',
    birthdate: '',
    postcode: '',
    address: '',
    phone: '',
    annual_income: '',
    preferred_location: '',
    radius: '',
    email: '',
    password: ''
  });
  
  // Reactive error and success messages
  const error = ref('');
  const successMessage = ref('');
  const postcodeError = ref('');
  const phoneError = ref(''); // New phone validation error state
  const annualIncomeError = ref(''); // Error message for annual income validation
  const radiusError = ref('');  // New error state for radius
  let isPostcodeValid = ref(false); // Flag for postcode validation
  let isPhoneValid = ref(false); // Flag for phone validation
  let isAnnualIncomeValid = ref(false); // Flag for annual income validation
  let isRadiusValid = ref(false);  // Flag for radius validation
  
  // Calculate min and max birthdates
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate()).toISOString().split('T')[0]; // Max age: 100
  const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate()).toISOString().split('T')[0]; // Min age: 16
  
  // Function to validate postcode
  // Function to validate postcode (now using address field for validation)
  const validatePostcode = () => {
    const postcodePattern = /^\d{4}[A-Z]{2}$/; // Regex for 4 digits followed by 2 uppercase letters
  
    // Update to check form.address instead of form.postcode
    if (!postcodePattern.test(form.value.address)) {
      postcodeError.value = 'Postcode must be 4 digits followed by 2 uppercase letters (e.g., 1234AB)';
      isPostcodeValid.value = false; // Mark as invalid
    } else {
      postcodeError.value = ''; // Clear error
      isPostcodeValid.value = true; // Mark as valid
    }
  };
  
  
  // Function to validate phone number
  const validatePhoneNumber = () => {
    let phoneNumber = form.value.phone;
  
    // Ensure phone number starts with '06' and strip out any non-numeric characters except the first two
    if (!phoneNumber.startsWith('06')) {
      phoneError.value = 'Phone number must start with "06"';
      isPhoneValid.value = false;
    } else {
      // Remove any non-digit characters after "06"
      phoneNumber = '06' + phoneNumber.slice(2).replace(/\D/g, '').slice(0, 8);
      form.value.phone = phoneNumber;
  
      if (phoneNumber.length < 10) {
        phoneError.value = 'Phone number must be exactly 10 digits (06 XXXXXXXX)';
        isPhoneValid.value = false;
      } else {
        phoneError.value = ''; // Clear the error if valid
        isPhoneValid.value = true;
      }
    }
  };
  
  // Function to validate annual income
  const validateAnnualIncome = () => {
    const income = parseFloat(form.value.annual_income); // Convert input to number
  
    if (income < 1400) {
      annualIncomeError.value = 'Annual income must be at least 1400.';
      isAnnualIncomeValid.value = false; // Mark as invalid
    } else if (income > 100000) {
      annualIncomeError.value = 'Annual income cannot exceed 100000.';
      isAnnualIncomeValid.value = false; // Mark as invalid
    } else {
      annualIncomeError.value = ''; // Clear error if valid
      isAnnualIncomeValid.value = true; // Mark as valid
    }
  };
  
  // Function to validate radius
  const validateRadius = () => {
    const radius = parseFloat(form.value.radius);
    if (radius < 0 || radius > 30) {
      radiusError.value = 'Afstands straal moet tussen 0 en 30 km zijn.'; // Radius must be between 0 and 30 km
      isRadiusValid.value = false;
    } else {
      radiusError.value = '';  // Clear the error
      isRadiusValid.value = true;
    }
  };
  
  // Function to submit the form
  const submitForm = async () => {
    // Run all validations
    validatePostcode();   // Postcode validation
    validatePhoneNumber(); // Phone number validation
    validateAnnualIncome(); // Annual income validation
    validateRadius();       // Radius validation
  
    // Prevent form submission if any validation fails
    if (!isPostcodeValid.value || !isPhoneValid.value || !isAnnualIncomeValid.value || !isRadiusValid.value) {
      error.value = 'Please correct the errors before submitting the form.';
      return; // Stop form submission
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', form.value, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
  
      // Handle successful registration
      console.log(response.data);
      successMessage.value = 'Registration successful! Please log in.';
      error.value = ''; // Clear any previous error
  
      // Reset form
      form.value = {
        first_name: '',
        last_name: '',
        gender: '',
        birthdate: '',
        postcode: '',
        address: '',
        phone: '',
        annual_income: '',
        preferred_location: '',
        radius: '',
        email: '',
        password: ''
      };
    } catch (err) {
      if (err.response && err.response.data) {
        error.value = err.response.data.message || 'Registration failed';
      } else {
        error.value = 'An error occurred';
      }
      successMessage.value = ''; // Clear success message
    }
  };
  </script>
  