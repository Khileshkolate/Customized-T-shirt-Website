import { create } from 'zustand';
import { getMockups, uploadMockup, deleteMockup } from '../api/adminApi';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || '';

const useAdminStore = create((set, get) => ({
  mockups: {},
  shirtTypes: [],
  colors: [],
  loading: false,
  error: null,

  fetchAttributes: async () => {
    try {
      const { getAttributes } = await import('../api/adminApi');
      const res = await getAttributes();
      const attributes = res.data;
      
      set({ 
        shirtTypes: attributes.filter(a => a.type === 'shirt-type'),
        colors: attributes.filter(a => a.type === 'color')
      });
    } catch (error) {
      console.error('Failed to fetch attributes:', error);
    }
  },

  addAttribute: async (data) => {
    try {
      const { addAttribute } = await import('../api/adminApi');
      await addAttribute(data);
      await get().fetchAttributes();
      toast.success('Attribute Added');
    } catch (error) {
      console.error('Failed to add attribute:', error);
      toast.error('Failed to add attribute');
    }
  },

  deleteAttribute: async (id) => {
    try {
      const { deleteAttribute } = await import('../api/adminApi');
      await deleteAttribute(id);
      await get().fetchAttributes();
      toast.success('Attribute Removed');
    } catch (error) {
      console.error('Failed to remove attribute:', error);
      toast.error('Failed to remove attribute');
    }
  },


  fetchMockups: async () => {
    set({ loading: true, error: null });
    try {
      const res = await getMockups();
      const mockupsData = res.data;
      const formattedMockups = {};

      mockupsData.forEach(m => {
        const key = m.key;
        formattedMockups[key] = m.imageUrl;
      });

      set({ mockups: formattedMockups, loading: false });
    } catch (error) {
       console.error('Failed to fetch mockups:', error);
       const message = error.response?.data?.message || 'Failed to connect to backend. Is the server running?';
       toast.error(message);
       set({ error: error.message, loading: false });
    }
  },
  
  // `key` is in format "Type_Color_view" (e.g. "Round Neck_White_front")
  uploadMockup: async (key, file) => {
    try {
      const toastId = toast.loading('Uploading Mockup...');
      const [type, color, view] = key.split('_');
      
      const formData = new FormData();
      formData.append('key', key);
      formData.append('image', file);

      await uploadMockup(formData);
      
      // Re-fetch to get updated URLs
      await get().fetchMockups();
      toast.success('Mockup Uploaded', { id: toastId });
    } catch (error) {
       console.error('Failed to upload mockup:', error);
       toast.error(error.response?.data?.message || 'Failed to upload image. Verify admin login.', { id: toastId });
    }
  },

  removeMockup: async (key) => {
    // Note: The UI currently uses this to 'remove an image'. 
    // The backend mockupController doesn't have a single-view delete, it deletes the whole mockup.
    // For now, we'll keep the local state clear to match UI behavior, but a full backend view deletion 
    // requires more controller logic. For now, this just hides it locally until refresh.
    set((state) => {
      const newMockups = { ...state.mockups };
      delete newMockups[key];
      return { mockups: newMockups };
    });
  },

  getMockup: (typeId, colorId, view) => {
    const key = `${typeId}_${colorId}_${view}`;
    return get().mockups[key] || null;
  }
}));

export default useAdminStore;
