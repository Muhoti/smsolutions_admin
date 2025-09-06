import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { 
  FiUsers, 
  FiFolder, 
  FiMessageSquare, 
  FiTrendingUp,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiLogOut,
  FiSave,
  FiX,
  FiCode,
  FiStar,
  FiSmartphone,
  FiMonitor
} from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import './Admin.css';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [isCreatingTestimonial, setIsCreatingTestimonial] = useState(false);

  // Get data from context
  const { projects: contextProjects, testimonials: contextTestimonials, loading: contextLoading, createProject, createTestimonial, fetchProjects, fetchTestimonials } = useApp();

  // Forms
  const { register: registerProject, handleSubmit: handleProjectSubmit, reset: resetProject, formState: { errors: projectErrors } } = useForm();
  const { register: registerTestimonial, handleSubmit: handleTestimonialSubmit, reset: resetTestimonial, formState: { errors: testimonialErrors } } = useForm();

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
      // Fetch data when authenticated
      fetchProjects();
      fetchTestimonials();
    }
    setIsLoading(false);
  }, [fetchProjects, fetchTestimonials]);

  // Form submission handlers
  const onProjectSubmit = async (data) => {
    try {
      setIsCreatingProject(true);
      const result = await createProject(data);
      if (result.success) {
        toast.success('Project created successfully!');
        setShowProjectForm(false);
        resetProject();
        // Refresh projects list
        await fetchProjects();
      } else {
        toast.error(result.error || 'Failed to create project');
      }
    } catch (error) {
      console.error('Project creation error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create project';
      toast.error(errorMessage);
    } finally {
      setIsCreatingProject(false);
    }
  };

  const onTestimonialSubmit = async (data) => {
    try {
      setIsCreatingTestimonial(true);
      const result = await createTestimonial(data);
      if (result.success) {
        toast.success('Testimonial created successfully!');
        setShowTestimonialForm(false);
        resetTestimonial();
        // Refresh testimonials list
        await fetchTestimonials();
      } else {
        toast.error(result.error || 'Failed to create testimonial');
      }
    } catch (error) {
      console.error('Testimonial creation error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create testimonial';
      toast.error(errorMessage);
    } finally {
      setIsCreatingTestimonial(false);
    }
  };

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
                    <h2>Projects ({contextProjects.length})</h2>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowProjectForm(true)}
                    >
                      <FiPlus size={16} />
                      Add Project
                    </button>
                  </div>
                  
                  {contextProjects.length > 0 ? (
                    <div className="table-container">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Featured</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contextProjects.map((project) => (
                            <tr key={project.id}>
                              <td>{project.title}</td>
                              <td>
                                <span className={`category-badge ${project.category}`}>
                                  {project.category === 'mobile' ? <FiSmartphone size={14} /> : <FiMonitor size={14} />}
                                  {project.category}
                                </span>
                              </td>
                              <td className="description-cell">{project.description}</td>
                              <td>
                                {project.featured ? (
                                  <span className="featured-badge">Yes</span>
                                ) : (
                                  <span className="not-featured">No</span>
                                )}
                              </td>
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
                  ) : (
                    <div className="empty-state">
                      <FiCode size={48} />
                      <h3>No projects yet</h3>
                      <p>Add your first project to showcase your work</p>
                      <button 
                        className="btn btn-primary"
                        onClick={() => setShowProjectForm(true)}
                      >
                        <FiPlus size={16} />
                        Add Project
                      </button>
                    </div>
                  )}
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
                    <h2>Testimonials ({contextTestimonials.length})</h2>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setShowTestimonialForm(true)}
                    >
                      <FiPlus size={16} />
                      Add Testimonial
                    </button>
                  </div>
                  
                  {contextTestimonials.length > 0 ? (
                    <div className="testimonials-list">
                      {contextTestimonials.map((testimonial) => (
                        <div key={testimonial.id} className="testimonial-item">
                          <div className="testimonial-content">
                            <p>"{testimonial.content}"</p>
                            <div className="testimonial-author">
                              <strong>{testimonial.clientName}</strong>
                              <span>{testimonial.position}, {testimonial.company}</span>
                            </div>
                            <div className="testimonial-rating">
                              {Array.from({ length: 5 }, (_, i) => (
                                <FiStar key={i} size={14} className={i < (testimonial.rating || 5) ? 'filled' : ''} />
                              ))}
                            </div>
                          </div>
                          <div className="testimonial-actions">
                            <button className="action-btn">
                              <FiEdit size={16} />
                            </button>
                            <button className="action-btn delete">
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <FiStar size={48} />
                      <h3>No testimonials yet</h3>
                      <p>Add client testimonials to build trust</p>
                      <button 
                        className="btn btn-primary"
                        onClick={() => setShowTestimonialForm(true)}
                      >
                        <FiPlus size={16} />
                        Add Testimonial
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Project Form Modal */}
      {showProjectForm && (
        <div className="modal-overlay">
          <motion.div 
            className="modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="modal-header">
              <h3>Add New Project</h3>
              <button 
                className="close-btn"
                onClick={() => setShowProjectForm(false)}
              >
                <FiX size={20} />
              </button>
            </div>
            
            <form onSubmit={handleProjectSubmit(onProjectSubmit)} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Project Title *</label>
                  <input
                    {...registerProject('title', { required: 'Title is required' })}
                    placeholder="Enter project title"
                  />
                  {projectErrors.title && <span className="error">{projectErrors.title.message}</span>}
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select {...registerProject('category', { required: 'Category is required' })}>
                    <option value="">Select category</option>
                    <option value="web">Web Application</option>
                    <option value="mobile">Mobile App</option>
                    <option value="both">Cross-Platform</option>
                  </select>
                  {projectErrors.category && <span className="error">{projectErrors.category.message}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  {...registerProject('description', { required: 'Description is required' })}
                  rows={4}
                  placeholder="Describe your project..."
                />
                {projectErrors.description && <span className="error">{projectErrors.description.message}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Live Demo URL</label>
                  <input
                    {...registerProject('liveDemo')}
                    placeholder="https://yourproject.com"
                  />
                </div>
                <div className="form-group">
                  <label>GitHub URL</label>
                  <input
                    {...registerProject('github')}
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Play Store URL</label>
                  <input
                    {...registerProject('playStore')}
                    placeholder="https://play.google.com/store/apps/details?id=..."
                  />
                </div>
                <div className="form-group">
                  <label>App Store URL</label>
                  <input
                    {...registerProject('appStore')}
                    placeholder="https://apps.apple.com/app/..."
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Tech Stack (comma separated)</label>
                <input
                  {...registerProject('techStack')}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    {...registerProject('featured')}
                  />
                  Featured Project
                </label>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => setShowProjectForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isCreatingProject}
                >
                  <FiSave size={16} />
                  {isCreatingProject ? 'Creating...' : 'Create Project'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Testimonial Form Modal */}
      {showTestimonialForm && (
        <div className="modal-overlay">
          <motion.div 
            className="modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="modal-header">
              <h3>Add New Testimonial</h3>
              <button 
                className="close-btn"
                onClick={() => setShowTestimonialForm(false)}
              >
                <FiX size={20} />
              </button>
            </div>
            
            <form onSubmit={handleTestimonialSubmit(onTestimonialSubmit)} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Client Name *</label>
                  <input
                    {...registerTestimonial('clientName', { required: 'Client name is required' })}
                    placeholder="Enter client name"
                  />
                  {testimonialErrors.clientName && <span className="error">{testimonialErrors.clientName.message}</span>}
                </div>
                <div className="form-group">
                  <label>Position *</label>
                  <input
                    {...registerTestimonial('position', { required: 'Position is required' })}
                    placeholder="CEO, Director, etc."
                  />
                  {testimonialErrors.position && <span className="error">{testimonialErrors.position.message}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Company *</label>
                <input
                  {...registerTestimonial('company', { required: 'Company is required' })}
                  placeholder="Enter company name"
                />
                {testimonialErrors.company && <span className="error">{testimonialErrors.company.message}</span>}
              </div>

              <div className="form-group">
                <label>Testimonial Content *</label>
                <textarea
                  {...registerTestimonial('content', { required: 'Content is required' })}
                  rows={4}
                  placeholder="What did the client say about your work?"
                />
                {testimonialErrors.content && <span className="error">{testimonialErrors.content.message}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Rating (1-5)</label>
                  <select {...registerTestimonial('rating')}>
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Project (optional)</label>
                  <input
                    {...registerTestimonial('project')}
                    placeholder="Project name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    {...registerTestimonial('featured')}
                  />
                  Featured Testimonial
                </label>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-outline"
                  onClick={() => setShowTestimonialForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isCreatingTestimonial}
                >
                  <FiSave size={16} />
                  {isCreatingTestimonial ? 'Creating...' : 'Create Testimonial'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Admin;
