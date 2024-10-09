// src/services/authService.js
import axios from '../utils/axios';

export const AuthService = {
    login(userData) {
        return axios.post('/login', userData);
    },
    register(userData) {
        return axios.post('/register', userData);
    },
    getUser() {
        return axios.get('/user'); // Get authenticated user details
    },
    logout() {
        return axios.post('/logout'); // Call this if you have a logout route in Laravel
    }

};
