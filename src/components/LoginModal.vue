<template>
    <div v-if="show" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded shadow-lg w-1/3">
            <form @submit.prevent="login" class="grid grid-rows-3 gap-8">
                <p class="text-center font-bold text-2xl">Sign in to your account</p>

                <div>
                    <label class="font-bold">Email Address</label>
                    <input type="email" v-model="email" placeholder="Email"
                        class="block w-full m-auto rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        required />
                </div>

                <div>
                    <label class="font-bold">Password</label>
                    <input type="password" v-model="password" placeholder="Password"
                        class="block w-full m-auto rounded-md border-0 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        required />
                </div>

                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center">
                    Login
                </button>

                <RouterLink to="/register" class="font-bold text-center hover:text-blue-600 hover:underline">
                    Account maken? klik hier
                </RouterLink>

                <div v-if="error"
                    class="grid grid-cols-10 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert">
                    <i class="col-span-1 pt-1 fa-solid fa-triangle-exclamation"> |</i>
                    <p class="col-span-9">{{ error }}</p>
                </div>

                <button @click="closeModal"
                    class="mt-4 w-full text-center text-sm font-bold text-blue-600 hover:underline">
                    Close
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '../services/authService';

// Define props and emits
const props = defineProps({
    show: {
        type: Boolean,
        required: true,
    },
});
const emit = defineEmits(['close']);

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

// Login function
const login = async () => {
    error.value = '';  // Clear any previous errors
    try {
        const response = await AuthService.login({
            email: email.value,
            password: password.value,
        });
        localStorage.setItem('token', response.data.token);  // Store token in localStorage
        emit('close'); // Emit the close event to notify parent
        router.push('/');  // Redirect after login
    } catch (err) {
        error.value = err.response?.data?.message || 'Incorrect email or password';
    }
};

// Function to close modal
const closeModal = () => {
    emit('close'); // Emit the close event to notify parent
};
</script>