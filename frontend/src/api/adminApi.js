import axios from '../utils/axiosInstance';

export const getMockups = async () => {
    const res = await axios.get('/mockups');
    return res.data;
};

// Data is expected to be FormData since it contains images
export const uploadMockup = async (formData) => {
    const res = await axios.post('/mockups', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
};

export const deleteMockup = async (key) => {
    const res = await axios.delete(`/mockups/${key}`);
    return res.data;
};

// Attribute Management
export const getAttributes = async (type) => {
    const params = type ? { type } : {};
    const res = await axios.get('/attributes', { params });
    return res.data;
};

export const addAttribute = async (data) => {
    const res = await axios.post('/attributes', data);
    return res.data;
};

export const deleteAttribute = async (id) => {
    const res = await axios.delete(`/attributes/${id}`);
    return res.data;
};

