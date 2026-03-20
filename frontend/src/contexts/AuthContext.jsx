import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../utils/axiosInstance';
import toast from 'react-hot-toast';

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

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    try {
      // Check localStorage for user data
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
        
        // Set axios headers for API calls
        if (storedToken.startsWith('admin')) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
      }
    } catch (error) {
      console.error('Check user error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Direct admin login (no API call needed)
      if (email === 'admin@printcraft.com' && password === 'admin123') {
        const adminUser = {
          id: 'admin123456',
          name: 'Admin User',
          email: 'admin@printcraft.com',
          phone: '9999999999',
          role: 'admin',
          isVerified: true,
          addresses: []
        };
        
        localStorage.setItem('token', 'admin-jwt-token-12345');
        localStorage.setItem('user', JSON.stringify(adminUser));
        setUser(adminUser);
        setIsAuthenticated(true);
        
        return { success: true, data: adminUser };
      }

      // Regular user login (API call)
      const response = await axios.post('/auth/login', { email, password });
      const { token, user: userData } = response.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true, data: userData };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
    window.location.href = '/';
  };

  const updateProfile = async (userData) => {
    try {
      const response = await axios.put('/auth/profile', userData);
      const updatedUser = response.data.data;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success('Profile updated successfully');
      return { success: true, data: updatedUser };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
      return { success: false, error: error.response?.data?.message };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    register: async (userData) => {
      try {
        const response = await axios.post('/auth/register', userData);
        return { success: true, data: response.data.data };
      } catch (error) {
        return { success: false, error: error.response?.data?.message };
      }
    },
    verifyOtp: async (otp, phone) => {
      try {
        const response = await axios.post('/auth/verify-otp', { phone, otp });
        const { token, user: userData } = response.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true, data: userData };
      } catch (error) {
        return { success: false, error: error.response?.data?.message };
      }
    },
    login,
    logout,
    updateProfile
  };
  // In your AuthContext.js or wherever register is defined
const register = async (userData) => {
  try {
    // Remove confirmPassword before sending to server
    const { confirmPassword, ...dataToSend } = userData;
    
    const response = await axios.post('/api/auth/register', dataToSend, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Registration API error:', error.response?.data || error.message);
    throw error;
  }
};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};