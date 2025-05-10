import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import '../styles/auth.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the terms';
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
      const response = await axios.post(
        'http://localhost:5000/api/auth/signup',
        JSON.stringify({
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true
        }
      );
  
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/signin', { state: { success: 'Account created successfully!' } });
      } else {
        setServerError(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 500) {
          setServerError('Server error. Please try again later.');
        } else {
          setServerError(error.response.data?.message || 'Signup failed');
        }
      } else if (error.request) {
        // Request was made but no response
        setServerError('No response from server. Please check your connection.');
      } else {
        // Other errors
        setServerError('Error setting up request. Please try again.');
      }
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
            className="auth-illustration signup-illustration"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="floating-shapes">
              <div className="shape shape1"></div>
              <div className="shape shape2"></div>
              <div className="shape shape3"></div>
              <div className="shape shape4"></div>
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
            <h2>Create Account</h2>
            <p className="auth-subtitle">Sign up to get started</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className={errors.username ? 'error' : ''}
                    disabled={isLoading}
                  />
                </div>
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div>
              
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaEnvelope className="input-icon" />
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
                    onClick={() => togglePasswordVisibility('password')}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>

              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaLock className="input-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    disabled={isLoading}
                  />
                  <div 
                    className="password-toggle" 
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>

              <div className="terms-checkbox">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                  disabled={isLoading}
                />
                <label htmlFor="terms">
                  I agree to the <a href="/terms-and-conditions" className="terms-link">Terms of Service</a>
                </label>
                {errors.terms && <span className="error-message">{errors.terms}</span>}
              </div>

              {serverError && (
                <div className="server-error-message">
                  {serverError}
                </div>
              )}

              <motion.button 
                type="submit" 
                className="auth-button"
                whileHover={!isLoading ? { scale: 1.05 } : {}}
                whileTap={!isLoading ? { scale: 0.95 } : {}}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </motion.button>
              
              <div className="auth-footer">
                <p>Already have an account? <Link to="/signin" className="auth-link">Sign In</Link></p>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;