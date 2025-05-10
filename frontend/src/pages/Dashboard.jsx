import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, FileText, Settings, Plus, Edit, Eye, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("templates");
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/signin");  // Redirect to signin if not authenticated
    } else if (!loading && isAuthenticated) {
      fetchUserData();
    }
  }, [loading, isAuthenticated, navigate]);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found. Skipping fetch.");
      return;
    }
  
    try {
      const response = await axios.get("http://localhost:5000/api/portfolios/templates/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTemplates(response.data); // Adjust if it's response.data.templates
    } catch (error) {
      console.error("Error fetching portfolio templates:", error);
      if (error.response && error.response.status === 404) {
        setTemplates([]);
      }
    } finally {
      setDataLoading(false);
    }
  };
  

  const handleDeletePortfolio = async (portfolioId) => {
    if (window.confirm("Are you sure you want to delete this portfolio?")) {
      try {
        const token = localStorage.getItem("token");
        // Updated API endpoint
        await axios.delete(`http://localhost:5000/api/portfolio/${portfolioId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTemplates(prev => prev.filter(t => t._id !== portfolioId));
      } catch (error) {
        console.error("Error deleting portfolio:", error);
      }
    }
  };

  const getTemplateThumbnail = (templateId) => {
    const thumbnails = {
      '1': '/template1-thumbnail.jpg',
      '2': '/template2-thumbnail.jpg',
      '3': '/template3-thumbnail.jpg'
    };
    return thumbnails[templateId] || '/default-template-thumbnail.jpg';
  };

  if (loading || dataLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <div className="dashboard-profile">
          <User size={32} />
          <div>
            <h3>{user?.username || "User"}</h3>
            <p>{user?.email || "user@example.com"}</p>
          </div>
        </div>
        
        <nav className="dashboard-nav">
          <button 
            className={activeTab === "templates" ? "active" : ""} 
            onClick={() => setActiveTab("templates")}
          >
            <FileText size={18} /> My Portfolios
          </button>
          <button 
            className={activeTab === "settings" ? "active" : ""} 
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={18} /> Account Settings
          </button>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="dashboard-content">
        {activeTab === "templates" && (
          <div className="portfolio-templates">
            <div className="portfolio-header">
              <h2>My Portfolio Templates</h2>
              <Link to="/templates" className="btn-create">
                <Plus size={16} /> Create New Portfolio
              </Link>
            </div>
            
            {templates.length === 0 ? (
              <div className="empty-state">
                <p>You haven't created any portfolios yet.</p>
                <Link to="/templates" className="btn-create">
                  Create Your First Portfolio
                </Link>
              </div>
            ) : (
              <div className="portfolio-grid">
                {templates.map(template => (
                  <div className="portfolio-card" key={template._id}>
                    <div className="portfolio-thumbnail">
                      <img 
                        src={template.thumbnail || getTemplateThumbnail(template.templateId)} 
                        alt={template.name} 
                      />
                    </div>
                    <div className="portfolio-info">
                      <h3>{template.name || "Untitled Portfolio"}</h3>
                      <p className="portfolio-date">
                        Last updated: {new Date(template.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="portfolio-actions">
                      <Link 
                        to={`/edit-portfolio/${template._id}`} 
                        className="btn-action edit"
                      >
                        <Edit size={16} /> Edit
                      </Link>
                      <Link 
                        to={`/preview/${template._id}`} 
                        className="btn-action preview"
                      >
                        <Eye size={16} /> Preview
                      </Link>
                      <button 
                        className="btn-action delete"
                        onClick={() => handleDeletePortfolio(template._id)}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="account-settings">
            <h2>Account Settings</h2>
            <div className="settings-content">
              <div className="setting-item">
                <h3>Profile Information</h3>
                <p>Username: {user?.username}</p>
                <p>Email: {user?.email}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;