import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/verify-session`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true
      });

      if (response.data.isAuthenticated) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
      setError(null);
    } catch (error) {
      console.error("Authentication check failed:", error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/signin`, 
        { email, password },
        { withCredentials: true }
      );
  
      //  Extract the token from the correct structure
      const accessToken = response.data.tokens?.accessToken;
      if (accessToken) {
        localStorage.setItem('token', accessToken); //  Save the correct token
        await checkAuthStatus(); //  Update context state
        setError(null);
        return response.data;
      }
  
      throw new Error('No token received'); // This will now only run if token is truly missing
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError({
        message: error.response?.data?.message || 'Login failed',
        details: error.response?.data
      });
      throw error;
    }
  };
  
  
  const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
        username,
        email,
        password
      }, { withCredentials: true });

      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);
      setError(null);
      return response.data;
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.response?.data?.message || "Registration failed");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
