import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://aichatbot-bknd.onrender.com/api' 
  : 'http://localhost:3001/api';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL,
});

// Add a request interceptor to include the Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Get the JWT token from local storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;

// --------- google signup code: