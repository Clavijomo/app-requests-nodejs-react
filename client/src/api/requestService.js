import { API } from "./appClient";

export const getAllRequests = async () => {
    let errorMessage = '';
    try {
        const response = await API.get('/requests');
        if (response.status >= 200 && response.status <= 300) {
            return response.data
        }

        errorMessage = response?.data.message;
        return { data: null, error: errorMessage };
    } catch (err) {
        errorMessage = err?.response?.data?.message
            || err.message || "Hubo un error en la petición"
    }
}

export const deleteRequest = async (code) => {
    try {
        return await API.delete(`/requests/${code}`);
    } catch (err) {
        return 'Hubo un error', err;
    }
}

export const createRequest = async (request) => {
    try {
        return await API.post('/requests/', request)
    } catch (err) {
        return 'Hubo un error', err;
    }
}

export const loginUser = async (data) => {
    try {
        return await API.post('/login', data);
    } catch {
        return 'error';
    }
};

export const createUser = async (data) => {
    try {
        return await API.post('/signup/', data)
    } catch (err) {
        return 'Hubo un error', err;
    }
}