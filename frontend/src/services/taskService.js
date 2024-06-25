import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = async (token) => {
    const config = {
        headers: {
            'x-auth-token': token
        }
    };
    const res = await axios.get(API_URL, config);
    return res.data;
};

export const createTask = async (task, token) => {
    const config = {
        headers: {
            'x-auth-token': token
        }
    };
    const res = await axios.post(API_URL, task, config);
    return res.data;
};

export const getAllTasks = async (token) => {
    const config = {
        headers: {
            'x-auth-token': token
        }
    };
    const res = await axios.get(API_URL + '/all', config);
    console.log(res);
    return res.data;
};

export const updateTask = async (task, taskId, token) => {
    const config = {
        headers: {
            'x-auth-token': token
        }
    };
    const res = await axios.put(`${API_URL}/${taskId}`, task, config);
    return res.data;
};

export const deleteTask = async (taskId, token) => {
    const config = {
        headers: {
            'x-auth-token': token
        }
    };
    await axios.delete(`${API_URL}/${taskId}`, config);
};
