import axiosInstance from '../utils/axiosInstance'

const normalizeContact = (contact) => {
  if (!contact) return contact
  const value = String(contact).trim()
  return value.includes('@') ? value.toLowerCase() : value.replace(/\s+/g, '')
}

const authApi = {
  register: async (userData) => {
    const response = await axiosInstance.post('/auth/register', {
      ...userData,
      email: normalizeContact(userData.email),
      phone: normalizeContact(userData.phone)
    })
    return response.data
  },

  login: async (credentials) => {
    const response = await axiosInstance.post('/auth/login', {
      ...credentials,
      email: normalizeContact(credentials.email)
    })
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

  sendOtp: async ({ contact, phone, email, type }) => {
    const otpContact = normalizeContact(contact || phone || email)
    const response = await axiosInstance.post('/auth/send-otp', {
      contact: otpContact,
      type: type || (email || otpContact?.includes('@') ? 'email' : 'phone')
    })
    return response.data
  }
}

export default authApi
