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
