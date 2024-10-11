import axios from 'axios'

export const API = axios.create({
    baseURL: process.env.API_ENDPOINT || "https://api-requests-93d7054ed472.herokuapp.com/api",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json"
    }
});

export const setAuthToken = (token) => {
    if (token) {
        return API.defaults.headers.common['Authorization'] = token
    }

    return delete API.defaults.headers.common['Authorization'];
}

API.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
)