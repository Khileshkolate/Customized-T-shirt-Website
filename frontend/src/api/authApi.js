import axiosInstance from '../utils/axiosInstance'

const authApi = {
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData)
    return response.data
  },

  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials)
    return response.data
  },

  verifyOtp: async (otpData) => {
    const response = await axiosInstance.post('/auth/verify-otp', otpData)
    return response.data
  },

  getProfile: async () => {
    const response = await axiosInstance.get('/auth/profile')
    return response.data
  },

  updateProfile: async (profileData) => {
    const response = await axiosInstance.put('/auth/profile', profileData)
    return response.data
  },

  sendOtp: async (phone) => {
    const response = await axiosInstance.post('/auth/send-otp', { phone })
    return response.data
  }
}

export default authApi