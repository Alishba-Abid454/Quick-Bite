/**
 * AuthContext - Authentication State Management
 * Handles user authentication, login, signup, and logout
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';
import { STORAGE_KEYS } from '../utils/constants';

// Create Context
const AuthContext = createContext(null); //Creates a Context with default value null

// Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check Auth Status on Mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);// check local storage for token
        if (token) {
          const response = await authService.getProfile();
          if (response.success) {
            setUser(response.data.user);
            setIsAuthenticated(true);
          } else {
            // Token invalid, clear storage
            localStorage.removeItem(STORAGE_KEYS.TOKEN);
            localStorage.removeItem(STORAGE_KEYS.USER);
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login
  const login = async (email, password) => {
    try {
        //user submit login form 
      setError(null);
      setLoading(true);

      const response = await authService.login(email, password); //Sends POST request to backend

      if (response.success) {
        const { user, token } = response.data;
        
        // Save to localStorage
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        
        // Update state
        setUser(user);
        setIsAuthenticated(true);
        
        return { success: true, user };
      } else {
        setError(response.message || 'Login failed');
        return { success: false, error: response.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Signup
  const signup = async (userData) => {
    try {
      setError(null);
      setLoading(true);

      const response = await authService.signup(userData);

      if (response.success) {
        const { user, token } = response.data;
        
        // Save to localStorage
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        
        // Update state
        setUser(user);
        setIsAuthenticated(true);
        
        return { success: true, user };
      } else {
        setError(response.message || 'Signup failed');
        return { success: false, error: response.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Signup failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    
    // Reset state
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    
    // Call logout service
    authService.logout();
  };

  // Update Profile
  const updateProfile = async (profileData) => {
    try {
      setError(null);
      setLoading(true);

      const response = await authService.updateProfile(profileData);

      if (response.success) {
        const updatedUser = response.data.user;
        setUser(updatedUser);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
        return { success: true, user: updatedUser };
      } else {
        setError(response.message || 'Update failed');
        return { success: false, error: response.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Update failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Change Password
  const changePassword = async (oldPassword, newPassword) => {
    try {
      setError(null);
      setLoading(true);

      const response = await authService.changePassword(oldPassword, newPassword);

      if (response.success) {
        return { success: true };
      } else {
        setError(response.message || 'Password change failed');
        return { success: false, error: response.message };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Password change failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Context Value
  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;