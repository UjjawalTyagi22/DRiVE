import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI, usersAPI } from '../api';
import { modules as allModules } from '../data/modules';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          // Verify token is still valid
          const response = await authAPI.getCurrentUser();
          if (response.success) {
            setUser(response.data.user);
            setIsAuthenticated(true);
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
          }
        } catch (error) {
          // Token is invalid, clear storage
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.login({ email, password });

      if (response.success) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Login failed. Please try again.'
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);

      if (response.success) {
        // 🔥 MODIFIED: Don't auto-login after signup
        // Just return success without setting user/auth state
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return { success: true, user: response.data.user }; // ✅ Return user data for success message
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Registration failed. Please try again.'
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authAPI.logout();
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUserProfile = async (userData) => {
    try {
      const response = await usersAPI.updateProfile(userData);

      if (response.success) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to update profile.'
      };
    }
  };

  const updateModuleProgress = async (moduleId, moduleTitle, category, lessonName, isCompleted) => {
    try {
      if (!user) return { success: false, message: 'User not authenticated' };

      // IMMUTABLE CLONE: Avoid direct state mutation
      const currentProgress = Array.isArray(user.moduleProgress)
        ? JSON.parse(JSON.stringify(user.moduleProgress))
        : (user.moduleProgress ? JSON.parse(user.moduleProgress) : []);

      console.log('--- Syncing Progress ---', { moduleTitle, moduleId, lessonName, isCompleted });

      // Find the module in progress (robust id comparison)
      let moduleIdx = currentProgress.findIndex(m => String(m.id) === String(moduleId));
      let updatedModule;

      if (moduleIdx === -1) {
        // Create new entry for this module
        updatedModule = {
          id: moduleId,
          title: moduleTitle,
          category: category || 'General',
          progress: 0,
          lessons: [{ name: lessonName, completed: isCompleted }]
        };
        currentProgress.push(updatedModule);
        moduleIdx = currentProgress.length - 1;
      } else {
        // Update existing entry
        updatedModule = { ...currentProgress[moduleIdx] };

        // Ensure lessons array exists
        if (!Array.isArray(updatedModule.lessons)) {
          updatedModule.lessons = [];
        }

        const lessonIdx = updatedModule.lessons.findIndex(l => l.name === lessonName);

        if (lessonIdx === -1) {
          updatedModule.lessons.push({ name: lessonName, completed: isCompleted });
        } else {
          updatedModule.lessons[lessonIdx] = {
            ...updatedModule.lessons[lessonIdx],
            completed: isCompleted
          };
        }
        currentProgress[moduleIdx] = updatedModule;
      }

      // Calculate module progress using the actual total lessons from the data source
      const completedCount = updatedModule.lessons.filter(l => l.completed).length;
      const moduleData = allModules.find(m => String(m.id) === String(moduleId));
      const totalLessonsInModule = moduleData ? moduleData.lessons.length : updatedModule.lessons.length;

      updatedModule.progress = Math.round((completedCount / totalLessonsInModule) * 100);

      console.log('Progress Update:', { completedCount, totalLessonsInModule, progress: updatedModule.progress });

      // Calculate overall stats
      const modulesCompletedCount = currentProgress.filter(m => m.progress === 100).length;
      const overallProgress = Math.min(100, Math.round((modulesCompletedCount / 12) * 100));

      const totalPoints = currentProgress.reduce((sum, mod) => {
        return sum + (mod.lessons?.filter(l => l.completed).length || 0) * 100;
      }, 0);

      const totalHours = Math.round(currentProgress.reduce((sum, mod) => {
        const mData = allModules.find(sm => String(sm.id) === String(mod.id));
        if (mData) {
          const duration = parseInt(mData.duration) || 0;
          return sum + (mod.progress / 100) * duration;
        }
        return sum;
      }, 0));

      const newActivity = {
        id: Date.now(),
        type: updatedModule.progress === 100 ? 'completed' : 'started',
        module: moduleTitle,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        points: isCompleted ? 100 : 0
      };

      const currentActivity = Array.isArray(user.recentActivity) ? user.recentActivity : (user.recentActivity ? JSON.parse(user.recentActivity) : []);
      const updatedActivity = [newActivity, ...currentActivity.filter(a => a.module !== moduleTitle)].slice(0, 5);

      const updatedData = {
        moduleProgress: currentProgress,
        overallProgress,
        totalPoints,
        totalHours,
        modulesCompleted: modulesCompletedCount,
        recentActivity: updatedActivity
      };

      return await updateUserProfile(updatedData);
    } catch (error) {
      console.error('Error updating module progress:', error);
      return { success: false, message: error.message };
    }
  };

  const markModuleAsAccessed = async (moduleId, moduleTitle) => {
    try {
      if (!user) return { success: false, message: 'User not authenticated' };

      // Update recent activity with "Accessed" entry
      const newActivity = {
        id: Date.now(),
        type: 'accessed',
        module: moduleTitle,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        points: 0
      };

      const currentActivity = Array.isArray(user.recentActivity) ? user.recentActivity : (user.recentActivity ? JSON.parse(user.recentActivity) : []);

      // Filter out previous "Accessed" entries for this module to keep it clean, then add new one
      const filteredActivity = currentActivity.filter(a => !(a.type === 'accessed' && a.module === moduleTitle));
      const updatedActivity = [newActivity, ...filteredActivity].slice(0, 5);

      const updatedData = {
        recentActivity: updatedActivity,
        lastAccessedModuleId: moduleId
      };

      return await updateUserProfile(updatedData);
    } catch (error) {
      console.error('Error marking module as accessed:', error);
      return { success: false, message: error.message };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUserProfile,
    updateModuleProgress,
    markModuleAsAccessed
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
