<template>
    <div>
        <h1>User Profile</h1>
        <p v-if="user">Welcome, {{ user.name }}</p>
        <p v-else>No user data available.</p>
    </div>
</template>

<script>
import { AuthService } from '../services/authService';

export default {
    data() {
        return {
            user: null,
        };
    },
    async created() {
        try {
            const response = await AuthService.getUser();
            this.user = response.data; // Store user data
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    },
};
</script>
