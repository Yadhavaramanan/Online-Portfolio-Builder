import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/TemplateSelectionPage.css';

// Template data
const templates = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design focusing on content',
    image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and artistic design for creative professionals',
    image: 'https://images.unsplash.com/photo-1545665277-5937489579f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Elegant and sophisticated design for business professionals',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with a focus on visual impact',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1115&q=80'
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Showcase-focused design for visual portfolios',
    image: 'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Tech-focused design for developers and programmers',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  }
];

const TemplateSelectionPage: React.FC = () => {
  return (
    <div className="template-selection-page">
      <div className="page-header">
        <h1>Choose Your Template</h1>
        <p>Select a template to start building your portfolio</p>
      </div>
      
      <div className="templates-grid">
        {templates.map(template => (
          <div className="template-card" key={template.id}>
            <div className="template-image">
              <img src={template.image} alt={template.name} />
            </div>
            <div className="template-info">
              <h3>{template.name}</h3>
              <p>{template.description}</p>
              <Link to={`/customize/${template.id}`} className="btn">
                Use This Template
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelectionPage;