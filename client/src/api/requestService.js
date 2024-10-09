import { API } from "./AppClient";

export const fetchRequests = async () => {
    const response = await API.get('requests');
    return response.data;
}

export const createUser = async (user) => {
    const res = await API.post('/signUp', user);
    return res.data;
}