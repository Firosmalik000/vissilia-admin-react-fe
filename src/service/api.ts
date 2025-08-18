import { navigate } from '@/utils/navigate';
import axios from 'axios';

const API_URL: string = import.meta.env.VITE_API_URL as string;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const excludedPaths = ['/auth/login', '/auth/register', '/auth/reset-password'];

    if (!excludedPaths.some((path) => config.url?.includes(path))) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.message === 'Unauthenticated')) {
      console.warn('Sesi anda telah habis. Silakan login kembali.');
      localStorage.removeItem('token');
      navigate('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
