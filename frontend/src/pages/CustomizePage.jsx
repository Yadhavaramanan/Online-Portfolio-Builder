import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Eye } from 'lucide-react';
import axios from 'axios';
import '../styles/CustomizePage.css';

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

const CustomizePage = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    location: '',
    skills: '',
    experience: [{ id: '1', company: '', position: '', duration: '', description: '' }],
    education: [{ id: '1', institution: '', degree: '', year: '' }],
    projects: [{ id: '1', title: '', description: '', imageUrl: '', link: '' }]
  });
  const [isSaving] = useState(false);

  useEffect(() => {
    const selectedTemplate = templates.find(t => t.id === templateId);
    if (selectedTemplate) {
      setTemplate(selectedTemplate);
    } else {
      navigate('/templates');
    }
  }, [templateId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setFormData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setFormData(prev => ({ ...prev, education: updatedEducation }));
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setFormData(prev => ({ ...prev, projects: updatedProjects }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now().toString(), company: '', position: '', duration: '', description: '' }]
    }));
  };

  const removeExperience = (index) => {
    if (formData.experience.length > 1) {
      const updatedExperience = [...formData.experience];
      updatedExperience.splice(index, 1);
      setFormData(prev => ({ ...prev, experience: updatedExperience }));
    }
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now().toString(), institution: '', degree: '', year: '' }]
    }));
  };

  const removeEducation = (index) => {
    if (formData.education.length > 1) {
      const updatedEducation = [...formData.education];
      updatedEducation.splice(index, 1);
      setFormData(prev => ({ ...prev, education: updatedEducation }));
    }
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: Date.now().toString(), title: '', description: '', imageUrl: '', link: '' }]
    }));
  };

  const removeProject = (index) => {
    if (formData.projects.length > 1) {
      const updatedProjects = [...formData.projects];
      updatedProjects.splice(index, 1);
      setFormData(prev => ({ ...prev, projects: updatedProjects }));
    }
  };

  // Updated handleSave function for CustomizePage.jsx
const handleSave = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if not authenticated
      alert("You need to be logged in to save your portfolio.");
      navigate('/login');
      return;
    }
  
    // Create a notification
    const notification = document.createElement('div');
    notification.className = 'save-notification saving';
    notification.textContent = 'Saving portfolio...';
    document.body.appendChild(notification);
    
    const response = await axios.post('http://localhost:5000/api/portfolios', {
      templateId,
      ...formData
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      timeout: 15000 // Add timeout to prevent hanging requests
    });
  
    // Check response
    if (response.status === 201 || response.status === 200) {
      const saved = response.data;
      console.log("Portfolio saved:", saved);
      
      // Store portfolio data in localStorage as backup
      localStorage.setItem(`portfolio_${saved._id}`, JSON.stringify({
        templateId,
        ...formData
      }));
      
      // Update notification to success
      notification.textContent = 'Portfolio saved successfully!';
      notification.className = 'save-notification success';
      
      // Remove notification after delay
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
        // Navigate to preview page
        navigate(`/preview/${saved._id}`);
      }, 1500);
    } else {
      throw new Error("Server returned non-success status code");
    }
  } catch (error) {
    console.error("Error saving portfolio:", error);
    
    // Remove saving notification if it exists
    const savingNotification = document.querySelector('.save-notification');
    if (savingNotification) {
      document.body.removeChild(savingNotification);
    }
    
    // Create error notification
    const errorNotification = document.createElement('div');
    errorNotification.className = 'save-notification error';
    errorNotification.textContent = 'Failed to save to server. Saving locally...';
    document.body.appendChild(errorNotification);
    
    // Fallback - save to localStorage if API fails
    const tempId = 'temp_' + Date.now().toString();
    localStorage.setItem(`portfolio_${tempId}`, JSON.stringify({
      templateId,
      ...formData
    }));
    
    // Update notification
    errorNotification.textContent = 'Saved locally. You can still preview and export.';
    
    // Remove notification after delay
    setTimeout(() => {
      if (document.body.contains(errorNotification)) {
        document.body.removeChild(errorNotification);
      }
      // Navigate to preview page
      navigate(`/preview/${tempId}`);
    }, 2000);
  }
};

  const handlePreview = () => {
    const portfolioId = 'temp_' + Date.now().toString();
    localStorage.setItem(`portfolio_${portfolioId}`, JSON.stringify({
      templateId,
      ...formData
    }));
    navigate(`/preview/${portfolioId}`);
  };

  if (!template) {
    return <div className="loading">Loading template...</div>;
  }

  return (
    <div className="customize-page">
      <div className="page-header">
        <h1>Customize Your {template.name} Portfolio</h1>
        <p>Fill in your information to personalize your portfolio</p>
      </div>

      <div className="customize-container">
        <div className="form-section">
          <h2>Personal Information</h2>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., John Doe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Professional Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Web Developer"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Write a short bio about yourself"
              rows={4}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g., (123) 456-7890"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., New York, NY"
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills">Skills (comma separated)</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="e.g., JavaScript, React, Node.js"
            />
          </div>

          <h2>Experience</h2>
          {formData.experience.map((exp, index) => (
            <div className="form-section-item" key={exp.id}>
              <div className="form-section-header">
                <h3>Experience {index + 1}</h3>
                {formData.experience.length > 1 && (
                  <button 
                    type="button" 
                    className="btn-remove"
                    onClick={() => removeExperience(index)}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="form-group">
                <label htmlFor={`company-${index}`}>Company</label>
                <input
                  type="text"
                  id={`company-${index}`}
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  placeholder="e.g., Acme Inc."
                />
              </div>

              <div className="form-group">
                <label htmlFor={`position-${index}`}>Position</label>
                <input
                  type="text"
                  id={`position-${index}`}
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                  placeholder="e.g., Senior Developer"
                />
              </div>

              <div className="form-group">
                <label htmlFor={`duration-${index}`}>Duration</label>
                <input
                  type="text"
                  id={`duration-${index}`}
                  value={exp.duration}
                  onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                  placeholder="e.g., 2018 - Present"
                />
              </div>

              <div className="form-group">
                <label htmlFor={`description-${index}`}>Description</label>
                <textarea
                  id={`description-${index}`}
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                  placeholder="Describe your responsibilities and achievements"
                  rows={3}
                />
              </div>
            </div>
          ))}
          <button type="button" className="btn-add" onClick={addExperience}>
            Add Experience
          </button>

          <h2>Education</h2>
          {formData.education.map((edu, index) => (
            <div className="form-section-item" key={edu.id}>
              <div className="form-section-header">
                <h3>Education {index + 1}</h3>
                {formData.education.length > 1 && (
                  <button 
                    type="button" 
                    className="btn-remove"
                    onClick={() => removeEducation(index)}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="form-group">
                <label htmlFor={`institution-${index}`}>Institution</label>
                <input
                  type="text"
                  id={`institution-${index}`}
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                  placeholder="e.g., University of Example"
                />
              </div>

              <div className="form-group">
                <label htmlFor={`degree-${index}`}>Degree</label>
                <input
                  type="text"
                  id={`degree-${index}`}
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  placeholder="e.g., Bachelor of Science in Computer Science"
                />
              </div>

              <div className="form-group">
                <label htmlFor={`year-${index}`}>Year</label>
                <input
                  type="text"
                  id={`year-${index}`}
                  value={edu.year}
                  onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                  placeholder="e.g., 2015 - 2019"
                />
              </div>
            </div>
          ))}
          <button type="button" className="btn-add" onClick={addEducation}>
            Add Education
          </button>

          <h2>Projects</h2>
          {formData.projects.map((project, index) => (
            <div className="form-section-item" key={project.id}>
              <div className="form-section-header">
                <h3>Project {index + 1}</h3>
                {formData.projects.length > 1 && (
                  <button 
                    type="button" 
                    className="btn-remove"
                    onClick={() => removeProject(index)}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="form-group">
                <label htmlFor={`project-title-${index}`}>Project Title</label>
                <input
                  type="text"
                  id={`project-title-${index}`}
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                  placeholder="e.g., E-commerce Website"
                />
              </div>

              <div className="form-group">
                <label htmlFor={`project-description-${index}`}>Description</label>
                <textarea
                  id={`project-description-${index}`}
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  placeholder="Describe your project"
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label htmlFor={`project-image-${index}`}>Image URL</label>
                <input
                  type="text"
                  id={`project-image-${index}`}
                  value={project.imageUrl}
                  onChange={(e) => handleProjectChange(index, 'imageUrl', e.target.value)}
                  placeholder="e.g., https://example.com/image.jpg"
                />
              </div>

              <div className="form-group">
                <label htmlFor={`project-link-${index}`}>Project Link</label>
                <input
                  type="text"
                  id={`project-link-${index}`}
                  value={project.link}
                  onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                  placeholder="e.g., https://example.com"
                />
              </div>
            </div>
          ))}
          <button type="button" className="btn-add" onClick={addProject}>
            Add Project
          </button>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={handlePreview}>
              <Eye size={16} /> Preview
            </button>
            <button 
              type="button" 
              className="btn" 
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save size={16} /> {isSaving ? 'Saving...' : 'Save Portfolio'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;