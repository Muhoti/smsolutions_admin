import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, 
  FiFolder, 
  FiMessageSquare, 
  FiTrendingUp,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiLogOut
} from 'react-icons/fi';
import './Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  // Mock data
  const [stats, setStats] = useState({
    totalContacts: 24,
    newInquiries: 5,
    totalProjects: 12,
    featuredProjects: 8
  });

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      company: 'Tech Corp',
      projectType: 'Mobile App',
      status: 'new',
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      company: 'Startup Inc',
      projectType: 'Web App',
      status: 'in-progress',
      date: '2024-01-14'
    }
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Ambulex Emergency App',
      category: 'mobile',
      status: 'completed',
      featured: true,
      date: '2024-01-10'
    },
    {
      id: 2,
      title: 'Meru Agricultural MIS',
      category: 'web',
      status: 'development',
      featured: true,
      date: '2024-01-08'
    }
  ]);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication
    if (loginData.email === 'admin@strongmuhoti.com' && loginData.password === 'admin123') {
      localStorage.setItem('adminToken', 'mock-jwt-token');
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setLoginData({ email: '', password: '' });
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <motion.div 
            className="login-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="login-header">
              <h1>Admin Login</h1>
              <p>Access the admin dashboard</p>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required
                  placeholder="admin@strongmuhoti.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                  placeholder="Enter password"
                />
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary btn-lg w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            <div className="login-demo">
              <p><strong>Demo Credentials:</strong></p>
              <p>Email: admin@strongmuhoti.com</p>
              <p>Password: admin123</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div className="container">
          <div className="header-content">
            <h1>Admin Dashboard</h1>
            <button onClick={handleLogout} className="logout-btn">
              <FiLogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="admin-content">
        <div className="container">
          <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
              <nav className="sidebar-nav">
                <button 
                  className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <FiTrendingUp size={20} />
                  Dashboard
                </button>
                <button 
                  className={`nav-item ${activeTab === 'contacts' ? 'active' : ''}`}
                  onClick={() => setActiveTab('contacts')}
                >
                  <FiUsers size={20} />
                  Contacts
                </button>
                <button 
                  className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
                  onClick={() => setActiveTab('projects')}
                >
                  <FiFolder size={20} />
                  Projects
                </button>
                <button 
                  className={`nav-item ${activeTab === 'testimonials' ? 'active' : ''}`}
                  onClick={() => setActiveTab('testimonials')}
                >
                  <FiMessageSquare size={20} />
                  Testimonials
                </button>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
              {activeTab === 'dashboard' && (
                <motion.div 
                  className="dashboard-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2>Dashboard Overview</h2>
                  
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <FiUsers size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>{stats.totalContacts}</h3>
                        <p>Total Contacts</p>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">
                        <FiMessageSquare size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>{stats.newInquiries}</h3>
                        <p>New Inquiries</p>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">
                        <FiFolder size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>{stats.totalProjects}</h3>
                        <p>Total Projects</p>
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <div className="stat-icon">
                        <FiTrendingUp size={24} />
                      </div>
                      <div className="stat-content">
                        <h3>{stats.featuredProjects}</h3>
                        <p>Featured Projects</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'contacts' && (
                <motion.div 
                  className="contacts-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="content-header">
                    <h2>Contact Inquiries</h2>
                    <button className="btn btn-primary">
                      <FiPlus size={16} />
                      Add Contact
                    </button>
                  </div>
                  
                  <div className="table-container">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Company</th>
                          <th>Project Type</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((contact) => (
                          <tr key={contact.id}>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.company}</td>
                            <td>{contact.projectType}</td>
                            <td>
                              <span className={`status-badge status-${contact.status}`}>
                                {contact.status}
                              </span>
                            </td>
                            <td>{contact.date}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="action-btn">
                                  <FiEye size={16} />
                                </button>
                                <button className="action-btn">
                                  <FiEdit size={16} />
                                </button>
                                <button className="action-btn delete">
                                  <FiTrash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'projects' && (
                <motion.div 
                  className="projects-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="content-header">
                    <h2>Projects</h2>
                    <button className="btn btn-primary">
                      <FiPlus size={16} />
                      Add Project
                    </button>
                  </div>
                  
                  <div className="table-container">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th>Featured</th>
                          <th>Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((project) => (
                          <tr key={project.id}>
                            <td>{project.title}</td>
                            <td>{project.category}</td>
                            <td>
                              <span className={`status-badge status-${project.status}`}>
                                {project.status}
                              </span>
                            </td>
                            <td>
                              {project.featured ? (
                                <span className="featured-badge">Yes</span>
                              ) : (
                                <span className="not-featured">No</span>
                              )}
                            </td>
                            <td>{project.date}</td>
                            <td>
                              <div className="action-buttons">
                                <button className="action-btn">
                                  <FiEye size={16} />
                                </button>
                                <button className="action-btn">
                                  <FiEdit size={16} />
                                </button>
                                <button className="action-btn delete">
                                  <FiTrash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'testimonials' && (
                <motion.div 
                  className="testimonials-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="content-header">
                    <h2>Testimonials</h2>
                    <button className="btn btn-primary">
                      <FiPlus size={16} />
                      Add Testimonial
                    </button>
                  </div>
                  
                  <div className="empty-state">
                    <FiMessageSquare size={48} />
                    <h3>No testimonials yet</h3>
                    <p>Add testimonials to showcase client feedback</p>
                    <button className="btn btn-primary">
                      <FiPlus size={16} />
                      Add First Testimonial
                    </button>
                  </div>
                </motion.div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
