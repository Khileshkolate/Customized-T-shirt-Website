import { create } from 'zustand';

const useAdminStore = create((set, get) => ({
  // Temporary localStorage mock until MongoDB/Cloudinary routes are connected
  mockups: JSON.parse(localStorage.getItem('tc_mockups') || '{}'),
  
  uploadMockup: (key, dataUrl) => set((state) => {
    const newMockups = { ...state.mockups, [key]: dataUrl };
    localStorage.setItem('tc_mockups', JSON.stringify(newMockups));
    return { mockups: newMockups };
  }),

  removeMockup: (key) => set((state) => {
    const newMockups = { ...state.mockups };
    delete newMockups[key];
    localStorage.setItem('tc_mockups', JSON.stringify(newMockups));
    return { mockups: newMockups };
  }),

  getMockup: (typeId, colorId, view) => {
    const key = `${typeId}_${colorId}_${view}`;
    return get().mockups[key] || null;
  }
}));

export default useAdminStore;
