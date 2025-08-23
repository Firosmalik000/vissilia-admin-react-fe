import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    config.headers['ngrok-skip-browser-warning'] = 'true';

    const excludedPaths = ['/auth/login', '/auth/register', '/auth/reset-password'];

    if (!excludedPaths.some((path) => config.url?.includes(path))) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers['Content-Type'] = 'multipart/form-data';
        // config.headers['Content-Type'] = 'application/json';
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.data?.message === 'Unauthenticated')) {
      localStorage.removeItem('token');

      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message); // <== tambahin
    return Promise.reject(error);
  }
);

export default api;
