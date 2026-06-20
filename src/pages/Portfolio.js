import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  FiExternalLink, 
  FiGithub, 
  FiSmartphone, 
  FiMonitor,
  FiSearch,
  FiLoader,
  FiCode,
  FiArrowRight
} from 'react-icons/fi';
import { apiService } from '../services/api';
import './Portfolio.css';

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const response = await apiService.getProjects({ limit: 50 });
        setProjects(response.data.data || []);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Applications' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'both', name: 'Cross-Platform' }
  ];

  const getProjectType = (category) => {
    if (category === 'mobile') return 'Mobile App';
    if (category === 'web') return 'Web Application';
    if (category === 'both') return 'Cross-Platform';
    return 'Application';
  };

  const getProjectImage = (project) => {
    if (project.images && project.images.length > 0) return project.images[0];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(project.title)}&background=00a8ff&color=fff&size=400`;
  };

  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="portfolio-page">
      <section className="portfolio-hero">
        <div className="container">
          <motion.div 
            className="portfolio-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="portfolio-title">Our Portfolio</h1>
            <p className="portfolio-subtitle">
              Explore the online systems, web applications, and mobile apps we have built for our clients
            </p>
          </motion.div>
        </div>
      </section>

      <section className="portfolio-filters">
        <div className="container">
          <motion.div 
            className="filters-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="search-box">
              <FiSearch size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-buttons">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`filter-btn ${filter === category.id ? 'active' : ''}`}
                  onClick={() => setFilter(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="portfolio-grid-section" ref={ref}>
        <div className="container">
          {loading ? (
            <div className="loading-projects" style={{ textAlign: 'center', padding: '3rem' }}>
              <FiLoader className="spinner" size={32} />
              <p>Loading projects...</p>
            </div>
          ) : (
          <motion.div 
            className="portfolio-grid"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="project-image">
                  <img src={getProjectImage(project)} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-type">
                      {project.category === 'mobile' ? <FiSmartphone size={20} /> : <FiMonitor size={20} />}
                      {getProjectType(project.category)}
                    </div>
                    {project.featured && (
                      <div className="featured-badge">Featured</div>
                    )}
                  </div>
                </div>
                
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tech">
                    {project.techStack && project.techStack.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="project-links">
                    {project.liveDemo && (
                      <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="project-link">
                        <FiExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.playStore && (
                      <a href={project.playStore} target="_blank" rel="noopener noreferrer" className="project-link">
                        <FiSmartphone size={16} />
                        Play Store
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                        <FiGithub size={16} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          )}
          
          {!loading && filteredProjects.length === 0 && (
            <motion.div 
              className="no-projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', padding: '3rem' }}
            >
              <FiCode size={48} />
              <h3>No projects yet</h3>
              <p>Projects will appear here once added via the admin panel.</p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="portfolio-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Ready to Build Your System?</h2>
            <p>Tell us about your project and we will respond with a clear recommendation.</p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Contact Us
              <FiArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
