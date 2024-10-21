// src/services/authService.js
import axios from '../utils/axios';
import router from '../router'; // Import your router if using vue-router

const API_URL = 'http://127.0.0.1:8000/api/'; // Adjust this according to your backend URL

export const AuthService = {
    login(userData) {
        return axios.post(`${API_URL}login`, userData);
    },
    register(userData) {
        return axios.post(`${API_URL}register`, userData);
    },
    getUser() {
        return axios.get(`${API_URL}user`); // Get authenticated user details
    },
    async logout() {
        try {
            const token = localStorage.getItem('authToken');
    
            if (!token) {
                console.log('No token found, user may already be logged out.');
                return;
            }
    
            const response = await axios.get(`${API_URL}logout`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            console.log('Logout successful:', response.data);
            localStorage.removeItem('authToken');
            router.push('/login');
        } catch (err) {
            console.error('Logout failed:', err.response?.data?.message || 'Logout failed');
        }
    },      
};
