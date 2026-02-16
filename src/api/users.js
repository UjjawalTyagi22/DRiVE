import api from './config';

export const usersAPI = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get module enrollment statistics
  getModuleStats: async () => {
    try {
      const response = await api.get('/users/module-stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
