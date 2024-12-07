<template>
  <form @submit.prevent="submitForm" class="grid grid-cols-2 w-1/2 m-8 mt-10 m-auto gap-4">
    <div class="col-span-2">
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
    </div>
    <div>
      <label for="radius" class="font-bold">Afstands straal in KM</label>
      <input type="text" id="radius" v-model="form.radius" @input="validateRadius" min="0" max="30"
        placeholder="Kilometer"
        class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
        required />
      <div v-if="radiusError" class="error text-red-600">{{ radiusError }}</div>
    </div>
    <button type="submit"
      class="col-span-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</button>

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
  gender: '',
  birthdate: '',
  postcode: '',
  address: '',
  phone: '',
  annual_income: '',
  preferred_location: '',
  radius: '',
});

const error = ref('');
const successMessage = ref('');
const postcodeError = ref('');
const phoneError = ref('');
const annualIncomeError = ref('');
const radiusError = ref('');

// Validation flags
const isPostcodeValid = ref(true);
const isPhoneValid = ref(true);
const isAnnualIncomeValid = ref(true);
const isRadiusValid = ref(true);

// Calculate min and max birthdates
const today = new Date();
const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate()).toISOString().split('T')[0]; // Max age: 100
const maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate()).toISOString().split('T')[0]; // Min age: 16

// Validation functions (same as provided earlier)
const validatePostcode = () => {
  const postcodeRegex = /^[1-9]{1}[0-9]{3}[A-Z]{2}$/;
  isPostcodeValid.value = postcodeRegex.test(form.value.address);
  postcodeError.value = isPostcodeValid.value ? '' : 'Ongeldige postcode. Gebruik het formaat 1234AB';
};

const validatePhoneNumber = () => {
  const phoneRegex = /^06\d{8}$/;
  isPhoneValid.value = phoneRegex.test(form.value.phone);
  phoneError.value = isPhoneValid.value ? '' : 'Ongeldig telefoonnummer. Gebruik het formaat 06XXXXXXXX';
};

const validateAnnualIncome = () => {
  const income = parseInt(form.value.annual_income, 10);
  isAnnualIncomeValid.value = income >= 1400;
  annualIncomeError.value = isAnnualIncomeValid.value ? '' : 'Jaarinkomen moet minimaal 1400 zijn';
};

const validateRadius = () => {
  const radius = parseInt(form.value.radius, 10);
  isRadiusValid.value = radius >= 0 && radius <= 30;
  radiusError.value = isRadiusValid.value ? '' : 'Afstand moet tussen 0 en 30 km liggen';
};

// Function to validate and submit the form
const submitForm = async () => {
  // First validate all fields
  validatePostcode();
  validatePhoneNumber();
  validateAnnualIncome();
  validateRadius();

  if (!isPostcodeValid.value || !isPhoneValid.value || !isAnnualIncomeValid.value || !isRadiusValid.value) {
    error.value = 'Please correct the errors before submitting the form.';
    return;
  }

  // Send form data to completeRegister API endpoint
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/completeregister', form.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    successMessage.value = 'Registration completed successfully!';
    error.value = '';

    // Reset form
    form.value = {
      gender: '',
      birthdate: '',
      postcode: '',
      address: '',
      phone: '',
      annual_income: '',
      preferred_location: '',
      radius: '',
    };
  } catch (err) {
    error.value = err.response?.data?.message || 'An error occurred.';
    successMessage.value = '';
  }
};
</script>
