import axiosInstance from '../utils/axiosInstance'

const productApi = {
  getProducts: async (params = {}) => {
    const response = await axiosInstance.get('/products', { params })
    return response.data
  },

  getProduct: async (id) => {
    const response = await axiosInstance.get(`/products/${id}`)
    return response.data
  },

  getCategories: async () => {
    const response = await axiosInstance.get('/products/categories')
    return response.data
  },

  searchProducts: async (query) => {
    const response = await axiosInstance.get('/products/search', {
      params: { q: query }
    })
    return response.data
  }
}

export default productApi