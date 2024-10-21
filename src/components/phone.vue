<template>
    <div class="w-full">
        <label class="font-bold">Telefoon nummer (31+) + Werk nummer???</label>
        <input required v-model="contactNumber" @input="formatContactNumber"
            class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
            maxlength="12" placeholder="06xxxxxxxx" :style="{ backgroundColor: inputBackgroundColor }" />
        <div v-if="!isPhoneNumberValid" class="text-black text-sm mt-2 bg-red-200 rounded-xl">
            <i class="fa-solid fa-triangle-exclamation px-2"></i>Het telefoonnummer moet 10 cijfers bevatten.
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Initialize contactNumber with '06' as a default
const contactNumber = ref('06 ');

// Reactive property to store the background color of the input field
const inputBackgroundColor = ref('');

// Function to check if the phone number is valid (should have 10 digits after '06')
const isPhoneNumberValid = ref(false);

// Method to format the contact number and ensure it always starts with '06'
const formatContactNumber = () => {
    // Ensure the number always starts with '06 '
    if (!contactNumber.value.startsWith('06 ')) {
        contactNumber.value = '06 ';
    }

    // Allow only digits after '06', and limit the length to 10 characters (i.e., 8 more after '06')
    contactNumber.value = '06 ' + contactNumber.value.slice(2).replace(/\D/g, '').slice(0, 8);

    // Check if the number has exactly 10 digits (including '06'), otherwise make background red
    if (contactNumber.value.length < 11) {
        inputBackgroundColor.value = 'red'; // Set background color to red if not fully filled
        isPhoneNumberValid.value = false; // Phone number is not valid
    } else {
        inputBackgroundColor.value = ''; // Reset the background color if the input is valid
        isPhoneNumberValid.value = true; // Phone number is valid
    }
};
</script>