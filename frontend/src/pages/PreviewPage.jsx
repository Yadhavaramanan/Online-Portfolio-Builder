import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Download } from 'lucide-react';
import axios from 'axios';
import '../styles/PreviewPage.css';

// Import templates
import MinimalTemplate from '../templates/MinimalTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import PortfolioTemplate from '../templates/PortfolioTemplate';
import DeveloperTemplate from '../templates/DeveloperTemplate';

// You'll need to install these dependencies:
// npm install html2canvas jspdf --save
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PreviewPage = () => {
  const { portfolioId } = useParams();
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const portfolioRef = useRef(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      
      try {
        // First, check if it's a temporary portfolio
        if (portfolioId.startsWith('temp_')) {
          const data = localStorage.getItem(`portfolio_${portfolioId}`);
          if (data) {
            setPortfolioData(JSON.parse(data));
          }
        } else {
          // Try to get it from the server
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:5000/api/portfolios/${portfolioId}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
          });
          
          if (response.status === 200) {
            setPortfolioData(response.data);
          } else {
            throw new Error('Portfolio not found');
          }
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        
        // Try localStorage as fallback
        const data = localStorage.getItem(`portfolio_${portfolioId}`);
        if (data) {
          setPortfolioData(JSON.parse(data));
        }
      } finally {
        setLoading(false);
      }
    };
    
    if (portfolioId) {
      fetchPortfolio();
    }
  }, [portfolioId]);

  const handleExportPDF = async () => {
    if (!portfolioRef.current) return;
    
    setExporting(true);
    
    try {
      const element = portfolioRef.current;
      
      // Create a notification
      const notification = document.createElement('div');
      notification.className = 'export-notification';
      notification.textContent = 'Preparing PDF export...';
      document.body.appendChild(notification);
      
      // Wait a moment for notification to display
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Create canvas from element
      const canvas = await html2canvas(element, {
        scale: 2, // Higher resolution
        useCORS: true, // Allow images from other domains
        allowTaint: true, // Allow tainted canvas
        logging: false, // Disable logging
        backgroundColor: '#ffffff' // White background
      });
      
      // Create PDF
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add first page
      pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Save PDF
      pdf.save(`${portfolioData.name || 'portfolio'}_portfolio.pdf`);
      
      // Update notification
      notification.textContent = 'PDF export complete!';
      notification.classList.add('success');
      
      // Remove notification after a delay
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 2000);
    } catch (error) {
      console.error('PDF export failed:', error);
      
      // Show error notification
      const errorNotification = document.createElement('div');
      errorNotification.className = 'export-notification error';
      errorNotification.textContent = 'Export failed. Please try again.';
      document.body.appendChild(errorNotification);
      
      // Remove notification after a delay
      setTimeout(() => {
        if (document.body.contains(errorNotification)) {
          document.body.removeChild(errorNotification);
        }
      }, 3000);
    } finally {
      setExporting(false);
    }
  };

  const handleExportHTML = () => {
    if (!portfolioRef.current) return;
    
    setExporting(true);
    
    try {
      // Show notification
      const notification = document.createElement('div');
      notification.className = 'export-notification';
      notification.textContent = 'Preparing HTML export...';
      document.body.appendChild(notification);
      
      // Get styles
      const styleSheets = document.styleSheets;
      let styles = '';
      
      // Extract and compile styles
      for (let i = 0; i < styleSheets.length; i++) {
        try {
          const cssRules = styleSheets[i].cssRules || styleSheets[i].rules;
          if (cssRules) {
            for (let j = 0; j < cssRules.length; j++) {
              styles += cssRules[j].cssText + '\n';
            }
          }
        } catch (e) {
          console.log('Cannot access stylesheet', e);
        }
      }
      
      // Create a clone of the portfolio element
      const element = portfolioRef.current;
      const clone = element.cloneNode(true);
      
      // Create HTML content
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${portfolioData.name || 'Portfolio'}</title>
          <style>
            ${styles}
            body { margin: 0; padding: 0; }
          </style>
        </head>
        <body>
          ${clone.outerHTML}
        </body>
        </html>
      `;
      
      // Create blob and download link
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${portfolioData.name || 'portfolio'}_portfolio.html`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
        
        // Update notification
        notification.textContent = 'HTML export complete!';
        notification.classList.add('success');
        
        // Remove notification after a delay
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 2000);
      }, 100);
    } catch (error) {
      console.error('HTML export failed:', error);
      
      // Show error notification
      const errorNotification = document.createElement('div');
      errorNotification.className = 'export-notification error';
      errorNotification.textContent = 'Export failed. Please try again.';
      document.body.appendChild(errorNotification);
      
      // Remove notification after a delay
      setTimeout(() => {
        if (document.body.contains(errorNotification)) {
          document.body.removeChild(errorNotification);
        }
      }, 3000);
    } finally {
      setExporting(false);
    }
  };

  // Function to toggle export options menu
  const toggleExportOptions = () => {
    const exportOptions = document.querySelector('.export-options');
    if (exportOptions) {
      exportOptions.classList.toggle('show');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector('.export-dropdown');
      const exportOptions = document.querySelector('.export-options');
      
      if (dropdown && exportOptions && 
          !dropdown.contains(event.target) && 
          exportOptions.classList.contains('show')) {
        exportOptions.classList.remove('show');
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderTemplate = () => {
    if (!portfolioData) return null;

    // Create a component with ref forwarding for each template
    const TemplateWithRef = (SpecificTemplate) => {
      return <div ref={portfolioRef}>
        <SpecificTemplate data={portfolioData} />
      </div>;
    };

    // Return the appropriate template with ref
    switch (portfolioData.templateId) {
      case 'minimal':
        return TemplateWithRef(MinimalTemplate);
      case 'creative':
        return TemplateWithRef(CreativeTemplate);
      case 'professional':
        return TemplateWithRef(ProfessionalTemplate);
      case 'modern':
        return TemplateWithRef(ModernTemplate);
      case 'portfolio':
        return TemplateWithRef(PortfolioTemplate);
      case 'developer':
        return TemplateWithRef(DeveloperTemplate);
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
          <div className="export-dropdown">
            <button 
              className="btn btn-secondary" 
              disabled={exporting}
              onClick={toggleExportOptions}
            >
              <Download size={16} /> {exporting ? 'Exporting...' : 'Export'}
            </button>
            <div className="export-options">
              <button onClick={handleExportPDF}>Export as PDF</button>
              <button onClick={handleExportHTML}>Export as HTML</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="preview-container">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default PreviewPage;