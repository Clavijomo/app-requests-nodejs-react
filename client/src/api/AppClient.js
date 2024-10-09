import axios from 'axios'

export const API = axios.create({
    baseURL: "http://localhost:3000/api/",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json"
    }
});

API.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
)