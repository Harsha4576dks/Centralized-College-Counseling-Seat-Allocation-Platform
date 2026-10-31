import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://centralized-college-counseling-seat.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;