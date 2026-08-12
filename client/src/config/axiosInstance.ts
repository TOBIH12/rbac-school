import axios from 'axios';


const token = localStorage.getItem('token');
console.log("authorization token:", token)
// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_FRONTEND_BASE_URL, // Replace with your backend's base URL
    timeout: 10000,
    withCredentials: true, // Include credentials (cookies) in requests
    headers: {
        'Accept': 'application/json', // Set default accept header for responses
        'Access-Control-Allow-Credentials': 'true', // Allow credentials in CORS requests
    },
});
// Add a request interceptor to include the token in req.headers.Authorization
axiosInstance.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (token) {
            req.headers.Authorization = `Bearer ${token}`
        }
        console.log('Request headers:', req.headers); // Debug log
        return req;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;