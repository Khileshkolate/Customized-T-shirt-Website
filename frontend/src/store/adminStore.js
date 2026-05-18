import { create } from 'zustand';
import { getMockups, uploadMockup } from '../api/adminApi';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://customized-t-shirt-website.onrender.com/api' : '/api');
const BASE_URL = API_URL.replace(/\/api\/?$/, '');

const resolveAssetUrl = (url) => {
  if (!url || typeof url !== 'string' || /^https?:\/\//i.test(url) || url.startsWith('data:')) {
    return url;
  }

  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${BASE_URL}${cleanUrl}`;
};

const normalizeMockupPart = (value) => {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const normalizeLoosePart = (value) => {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
};

const buildMockupKey = (type, color, view) => {
  return `${normalizeMockupPart(type)}_${normalizeMockupPart(color)}_${normalizeMockupPart(view)}`;
};

const getLegacyKey = (type, color, view) => {
  return `${normalizeLoosePart(type)}_${normalizeLoosePart(color)}_${normalizeLoosePart(view)}`;
};

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
        const imageUrl = resolveAssetUrl(m.imageUrl);
        const rawKey = String(m.key || '').toLowerCase();

        if (rawKey) {
          formattedMockups[rawKey] = imageUrl;
        }

        if (m.type && m.color && m.view) {
          formattedMockups[buildMockupKey(m.type, m.color, m.view)] = imageUrl;
          formattedMockups[getLegacyKey(m.type, m.color, m.view)] = imageUrl;
        }
      });

      set({ mockups: formattedMockups, loading: false });
    } catch (error) {
       console.error('Failed to fetch mockups:', error);
       const message = error.response?.data?.message || 'Failed to connect to backend. Is the server running?';
       toast.error(message);
       set({ error: error.message, loading: false });
    }
  },
  
  // `key` is in format "type_color_view" (slugs)
  uploadMockup: async (key, file) => {
    const toastId = toast.loading('Uploading Mockup...');
    const normalizedKey = String(key).toLowerCase();

    try {
      const formData = new FormData();
      formData.append('key', normalizedKey);
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
    try {
        const { deleteMockup } = await import('../api/adminApi');
        const [type, color, view] = String(key).split('_');
        const deleteKey = String(key).toLowerCase();
        await deleteMockup(deleteKey);
        set((state) => {
            const newMockups = { ...state.mockups };
            delete newMockups[deleteKey];
            delete newMockups[buildMockupKey(type, color, view)];
            delete newMockups[getLegacyKey(type, color, view)];
            return { mockups: newMockups };
        });
        toast.success('Mockup Removed');
    } catch (error) {
        console.error('Failed to remove mockup:', error);
        toast.error('Failed to remove mockup');
    }
  },

  getMockup: (typeValue, colorValue, view) => {
    if (!typeValue || !colorValue || !view) return null;
    const mockups = get().mockups;
    const normalizedKey = buildMockupKey(typeValue, colorValue, view);
    const legacyKey = getLegacyKey(typeValue, colorValue, view);
    return mockups[normalizedKey] || mockups[legacyKey] || null;
  }
}));

export default useAdminStore;
