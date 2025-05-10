import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TemplateSelectionPage from './pages/TemplateSelectionPage';
import CustomizePage from './pages/CustomizePage';
import PreviewPage from './pages/PreviewPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/templates" element={<TemplateSelectionPage />} />
            <Route path="/customize/:templateId" element={<CustomizePage />} />
            <Route path="/preview/:portfolioId" element={<PreviewPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;