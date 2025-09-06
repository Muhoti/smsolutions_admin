import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiExternalLink, 
  FiGithub, 
  FiSmartphone, 
  FiMonitor,
  FiFilter,
  FiLoader
} from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import './Portfolio.css';

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [filter, setFilter] = useState('all');
  const { projects, loading, fetchProjects } = useApp();

  useEffect(() => {
    if (inView && projects.length === 0) {
      fetchProjects();
    }
  }, [inView, fetchProjects, projects.length]);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Apps' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'both', name: 'Cross-Platform' }
  ];

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.category === filter
  );

  const getProjectType = (category, type) => {
    if (category === 'mobile') return 'Mobile App';
    if (category === 'web') return 'Web Application';
    if (category === 'both') return 'Cross-Platform';
    return type || 'Application';
  };

  const getProjectImage = (project) => {
    if (project.images && project.images.length > 0) {
      return project.images[0];
    }
    return `https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodeURIComponent(project.title)}`;
  };

  return (
    <section className="portfolio-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="portfolio-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Featured Projects</h2>
          <p>Explore some of my recent work and see how I've helped businesses transform their ideas into reality</p>
        </motion.div>

        <motion.div 
          className="portfolio-filters"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
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

        <motion.div 
          className="portfolio-grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {loading ? (
            <div className="loading-projects">
              <FiLoader className="spinner" size={32} />
              <p>Loading amazing projects...</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
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
                      {getProjectType(project.category, project.type)}
                    </div>
                    {project.featured && (
                      <div className="featured-badge">Featured</div>
                    )}
                  </div>
                </div>
                
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  
                  <div className="project-tech">
                    {project.techStack && project.techStack.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="project-links">
                    {project.liveDemo && (
                      <a 
                        href={project.liveDemo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FiExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.playStore && (
                      <a 
                        href={project.playStore} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FiSmartphone size={16} />
                        Play Store
                      </a>
                    )}
                    {project.appStore && (
                      <a 
                        href={project.appStore} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FiSmartphone size={16} />
                        App Store
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FiGithub size={16} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="no-projects">
              <p>No projects found for this category.</p>
            </div>
          )}
        </motion.div>

        <motion.div 
          className="portfolio-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="btn btn-outline">
            View All Projects
            <FiExternalLink size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
