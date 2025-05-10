import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Download } from 'lucide-react';
import '../styles/PreviewPage.css';

// Import template components
import MinimalTemplate from '../templates/MinimalTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import PortfolioTemplate from '../templates/PortfolioTemplate';
import DeveloperTemplate from '../templates/DeveloperTemplate';

const PreviewPage: React.FC = () => {
  const { portfolioId } = useParams<{ portfolioId: string }>();
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from MongoDB
    // For now, we'll get from localStorage
    if (portfolioId) {
      const data = localStorage.getItem(`portfolio_${portfolioId}`);
      if (data) {
        setPortfolioData(JSON.parse(data));
      }
      setLoading(false);
    }
  }, [portfolioId]);

  const renderTemplate = () => {
    if (!portfolioData) return null;

    switch (portfolioData.templateId) {
      case 'minimal':
        return <MinimalTemplate data={portfolioData} />;
      case 'creative':
        return <CreativeTemplate data={portfolioData} />;
      case 'professional':
        return <ProfessionalTemplate data={portfolioData} />;
      case 'modern':
        return <ModernTemplate data={portfolioData} />;
      case 'portfolio':
        return <PortfolioTemplate data={portfolioData} />;
      case 'developer':
        return <DeveloperTemplate data={portfolioData} />;
      default:
        return <div>Template not found</div>;
    }
  };

  if (loading) {
    return <div className="loading">Loading portfolio...</div>;
  }

  if (!portfolioData) {
    return (
      <div className="not-found">
        <h2>Portfolio not found</h2>
        <p>The portfolio you're looking for doesn't exist or has been removed.</p>
        <Link to="/templates" className="btn">Create a New Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="preview-page">
      <div className="preview-controls">
        <Link to={`/customize/${portfolioData.templateId}`} className="btn btn-secondary">
          <ArrowLeft size={16} /> Back to Editor
        </Link>
        <div className="preview-actions">
          <Link to={`/customize/${portfolioData.templateId}`} className="btn">
            <Edit size={16} /> Edit Portfolio
          </Link>
          <button className="btn btn-secondary">
            <Download size={16} /> Export
          </button>
        </div>
      </div>
      
      <div className="preview-container">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default PreviewPage;