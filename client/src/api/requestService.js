import { API } from "./appClient";

const handleAPIResponse = async (requestFn) => {
    try {
        const response = await requestFn();

        if (response.status >= 200 && response.status < 300) {
            return { data: response.data, token: response.data?.token, error: null };
        } else {
            const errorMessage = response.data?.message || `Error: Código de estado ${response.status}`;
            return { data: null, token: null, error: errorMessage };
        }
    } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || "Hubo un error en la petición";
        return { data: null, token: null, error: errorMessage };
    }
};

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
    return handleAPIResponse(() => API.post('/login', data));
};

export const createUser = async (data) => {
    try {
        return await API.post('/signup/', data)
    } catch (err) {
        return 'Hubo un error', err;
    }
}