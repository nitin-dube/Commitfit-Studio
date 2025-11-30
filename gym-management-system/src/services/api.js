import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://commitfit-studio.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to inject the token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Auto logout on 401
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
