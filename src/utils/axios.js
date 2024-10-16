// src/utils/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Change this to your Laravel API URL
    withCredentials: true, // This is important for CORS and to send cookies
});

export default axiosInstance;
