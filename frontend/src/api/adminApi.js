import axios from 'axios';

// Fallback to localhost if env isn't loaded correctly
const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_URL
});

// Setup interceptor to inject token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getMockups = async () => {
    const res = await api.get('/mockups');
    return res.data;
};

// Data is expected to be FormData since it contains images
export const uploadMockup = async (formData) => {
    const res = await api.post('/mockups', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
};

export const deleteMockup = async (id) => {
    const res = await api.delete(`/mockups/${id}`);
    return res.data;
};

// Attribute Management
export const getAttributes = async (type) => {
    const params = type ? { type } : {};
    const res = await api.get('/attributes', { params });
    return res.data;
};

export const addAttribute = async (data) => {
    const res = await api.post('/attributes', data);
    return res.data;
};

export const deleteAttribute = async (id) => {
    const res = await api.delete(`/attributes/${id}`);
    return res.data;
};

