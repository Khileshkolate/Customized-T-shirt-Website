import axiosInstance from '../utils/axiosInstance'

const designApi = {
  saveDesign: async (designData) => {
    const response = await axiosInstance.post('/designs/save', designData)
    return response.data
  },

  getUserDesigns: async () => {
    const response = await axiosInstance.get('/designs/user')
    return response.data
  },

  getDesign: async (id) => {
    const response = await axiosInstance.get(`/designs/${id}`)
    return response.data
  },

  updateDesign: async (id, designData) => {
    const response = await axiosInstance.put(`/designs/${id}`, designData)
    return response.data
  },

  deleteDesign: async (id) => {
    const response = await axiosInstance.delete(`/designs/${id}`)
    return response.data
  }
}

export default designApi