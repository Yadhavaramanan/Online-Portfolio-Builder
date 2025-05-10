import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; 
//import axios from 'axios';
import '../styles/auth.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear errors when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
  
    if (!validateForm()) return;
  
    setIsLoading(true);
  
    try {
      //  Use the context login method to set auth state properly
      await login(formData.email.trim().toLowerCase(), formData.password);
  
      //  Now context is updated; Header will reflect it
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setServerError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-form-container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-left">
          <motion.div 
            className="auth-illustration"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="floating-shapes">
              <div className="shape shape1"></div>
              <div className="shape shape2"></div>
              <div className="shape shape3"></div>
            </div>
          </motion.div>
        </div>
        
        <div className="auth-right">
          <motion.div 
            className="auth-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2>Welcome Back</h2>
            <p className="auth-subtitle">Sign in to continue to your account</p>
            
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                    disabled={isLoading}
                  />
                  <div 
                    className="password-toggle" 
                    onClick={togglePasswordVisibility}
                    style={{ cursor: isLoading ? 'not-allowed' : 'pointer' }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              {serverError && (
                <div className="error-message server-error">
                  {serverError}
                </div>
              )}
              
              <div className="form-options">
                <div className="remember-me">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    disabled={isLoading} 
                  />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>
              
              <motion.button 
                type="submit" 
                className="auth-button"
                whileHover={!isLoading ? { scale: 1.05 } : {}}
                whileTap={!isLoading ? { scale: 0.95 } : {}}
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </motion.button>
              
              <div className="auth-footer">
                <p>Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link></p>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;