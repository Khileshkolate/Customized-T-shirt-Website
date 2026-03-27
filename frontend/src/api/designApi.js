import axiosInstance from '../utils/axiosInstance'

const designApi = {
  saveDesign: async (designData) => {
    // Backend expects POST /api/designs
    const response = await axiosInstance.post('/designs', designData)
    return response.data
  },

  getUserDesigns: async () => {
    // Backend expects GET /api/designs/my
    const response = await axiosInstance.get('/designs/my')
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