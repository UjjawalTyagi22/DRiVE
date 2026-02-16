import api from './config';

export const authAPI = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      
      // 🔥 MODIFIED: Don't store token/user after registration
      // if (response.success && response.data.token) {
      //   localStorage.setItem('authToken', response.data.token);    // ❌ Removed
      //   localStorage.setItem('user', JSON.stringify(response.data.user)); // ❌ Removed
      // }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Login user (unchanged - still stores token)
  login: async (loginData) => {
    try {
      const response = await api.post('/auth/login', loginData);
      
      // Store token and user data ONLY on login
      if (response.success && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
};
