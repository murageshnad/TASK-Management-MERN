import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const registerUser = async (user) => {
    const res = await axios.post(`${API_URL}/register`, user);
    return res.data;
};

export const loginUser = async (user) => {
    const res = await axios.post(`${API_URL}/login`, user);
    return res.data;
};

export const deleteUser = async (token) => {
    const config = {
        headers: {
            'x-auth-token': token
        }
    };
    await axios.delete(API_URL, config);
};
