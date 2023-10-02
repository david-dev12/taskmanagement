import axios from 'axios';

export const login = async (username, password) => {
    const response = await axios.post('/api/account/login', { username, password });
    return response.data.token;
};

export const deleteTask = async (id) => {
    return await axios.delete(`/api/tasks/${id}`);
};

export const fetchTasks = async (cursor) => {
    return await axios.get(`/api/tasks?cursor=${cursor}&limit=10`);
};

export const fetchTask = async (id) => {
    return await axios.get(`/api/tasks/${id}`);
};

export const updateTask = async (id, updatedTask) => {
    return await axios.put(`/api/tasks/${id}`, updatedTask);
};

export const createTask = async (task) => {
    return await axios.post('/api/tasks', task);
};