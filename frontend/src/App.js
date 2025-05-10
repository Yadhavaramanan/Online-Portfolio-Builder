import React from 'react';
import {  Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TemplateSelectionPage from './pages/TemplateSelectionPage';
import CustomizePage from './pages/CustomizePage';
import PreviewPage from './pages/PreviewPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Terms from './pages/Terms';

// Layout component to conditionally render header and footer
const Layout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  
  // Check if current path is one of the auth pages
  const isAuthPage = 
    path === '/' || 
    path === '/signin' || 
    path === '/signup' || 
    path === '/forgot-password' || 
    path === '/terms-and-conditions' ||
    path === '/login';
  
  return (
    <div className="app">
      {!isAuthPage && <Header />}
      <main className="main-content">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/templates" element={<TemplateSelectionPage />} />
          <Route path="/customize/:templateId" element={<CustomizePage />} />
          <Route path="/preview/:portfolioId" element={<PreviewPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/login" element={<SignIn />} />
          {/* Add more routes as needed */}
        </Routes>
      </Layout>
  );
}

export default App;