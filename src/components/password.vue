<template>
    <div class="p-6">
        <h3 class="text-2xl font-semibold mb-2">Password Validation</h3>
        <p class="text-gray-600 mb-4">Try to submit the form.</p>

        <div class="bg-gray-100 p-5 rounded-lg">
            <form @submit.prevent="handleSubmit" class="space-y-4">
                <label for="psw" class="block font-medium text-gray-700">Password</label>
                <input type="password" id="psw" v-model="password" @focus="showMessage = true"
                    @blur="showMessage = false" @input="validatePassword" required
                    class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />

                <input type="submit" value="Submit"
                    class="w-full bg-green-600 text-white py-2 rounded cursor-pointer hover:bg-green-700 transition duration-200" />
            </form>
        </div>

        <div v-if="showMessage" id="message" class="bg-gray-100 mt-4 p-5 rounded-lg">
            <h3 class="text-lg font-semibold mb-3">Password must contain the following:</h3>
            <p :class="{ 'text-green-600': isLowercaseValid, 'text-red-600': !isLowercaseValid }"
                class="flex items-center mb-2">
                <span class="mr-2" v-if="isLowercaseValid">✔</span>
                <span class="mr-2" v-else>✖</span>
                A <b>lowercase</b> letter
            </p>
            <p :class="{ 'text-green-600': isUppercaseValid, 'text-red-600': !isUppercaseValid }"
                class="flex items-center mb-2">
                <span class="mr-2" v-if="isUppercaseValid">✔</span>
                <span class="mr-2" v-else>✖</span>
                A <b>capital (uppercase)</b> letter
            </p>
            <p :class="{ 'text-green-600': isNumberValid, 'text-red-600': !isNumberValid }"
                class="flex items-center mb-2">
                <span class="mr-2" v-if="isNumberValid">✔</span>
                <span class="mr-2" v-else>✖</span>
                A <b>number</b>
            </p>
            <p :class="{ 'text-green-600': isLengthValid, 'text-red-600': !isLengthValid }" class="flex items-center">
                <span class="mr-2" v-if="isLengthValid">✔</span>
                <span class="mr-2" v-else>✖</span>
                Minimum <b>8 characters</b>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// State variables
const password = ref('');
const showMessage = ref(false);

// Validation state
const isLowercaseValid = ref(false);
const isUppercaseValid = ref(false);
const isNumberValid = ref(false);
const isLengthValid = ref(false);

const validatePassword = () => {
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;

    isLowercaseValid.value = lowerCaseLetters.test(password.value);
    isUppercaseValid.value = upperCaseLetters.test(password.value);
    isNumberValid.value = numbers.test(password.value);
    isLengthValid.value = password.value.length >= 8;
};

const handleSubmit = () => {
    alert("Form submitted successfully!");
    // Add form submission logic here
};
</script>

<!-- Make sure Tailwind CSS is included in your project -->