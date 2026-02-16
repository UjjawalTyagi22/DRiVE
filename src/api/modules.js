import api from './config';

export const modulesAPI = {
  // Get all modules
  getAllModules: async (params = {}) => {
    try {
      const response = await api.get('/modules', { params });
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get single module
  getModule: async (moduleId) => {
    try {
      const response = await api.get(`/modules/${moduleId}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Create module (admin only)
  createModule: async (moduleData) => {
    try {
      const response = await api.post('/modules', moduleData);
      return response;
    } catch (error) {
      throw error;
    }
  }
};
