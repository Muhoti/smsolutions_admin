import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiExternalLink, 
  FiGithub, 
  FiSmartphone, 
  FiMonitor,
  FiFilter,
  FiSearch
} from 'react-icons/fi';
import './Portfolio.css';

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 1,
      title: 'Ambulex Emergency Response System',
      category: 'web',
      type: 'Web Application',
      description: 'Real-time emergency response platform with GPS tracking and instant notifications for emergency services.',
      image: '/api/placeholder/400/300',
      tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      links: {
        demo: 'https://dashboard.ambulexsolutions.org/',
        github: 'https://github.com/strongmuhoti'
      },
      featured: true
    },
    {
      id: 2,
      title: 'Vihiga Farmer Mapping App',
      category: 'mobile',
      type: 'Mobile App',
      description: 'GPS-enabled mobile application for agricultural data collection and farmer mapping in Vihiga County.',
      image: '/api/placeholder/400/300',
      tech: ['React Native', 'Firebase', 'Maps API'],
      links: {
        playStore: 'https://play.google.com/store/apps/details?id=com.vihiga.farmer',
        github: 'https://github.com/strongmuhoti'
      },
      featured: true
    },
    {
      id: 3,
      title: 'Meru County Agricultural MIS',
      category: 'web',
      type: 'Web Platform',
      description: 'Comprehensive agricultural management information system for Meru County government operations.',
      image: '/api/placeholder/400/300',
      tech: ['React', 'Express', 'PostgreSQL'],
      links: {
        demo: 'https://meru.dat.co.ke/',
        github: 'https://github.com/strongmuhoti'
      },
      featured: false
    },
    {
      id: 4,
      title: 'UETCL Asset Tracking App',
      category: 'mobile',
      type: 'Mobile App',
      description: 'Enterprise asset tracking and management mobile application for Uganda Electricity Transmission Company.',
      image: '/api/placeholder/400/300',
      tech: ['React Native', 'Node.js', 'MongoDB'],
      links: {
        playStore: 'https://play.google.com/store/apps/details?id=com.uetcl.assets',
        github: 'https://github.com/strongmuhoti'
      },
      featured: true
    },
    {
      id: 5,
      title: 'KiriAMIS Agricultural System',
      category: 'web',
      type: 'Web Application',
      description: 'Agricultural information management system for Kirinyaga County with farmer registration and crop monitoring.',
      image: '/api/placeholder/400/300',
      tech: ['React', 'Node.js', 'MySQL'],
      links: {
        demo: 'https://admin-kirinyaga.dat.co.ke/',
        github: 'https://github.com/strongmuhoti'
      },
      featured: false
    },
    {
      id: 6,
      title: 'Box Champy Fitness App',
      category: 'mobile',
      type: 'Mobile App',
      description: 'Fitness training and boxing club management mobile application with workout tracking and scheduling.',
      image: '/api/placeholder/400/300',
      tech: ['React Native', 'Firebase', 'Stripe'],
      links: {
        playStore: 'https://play.google.com/store/apps/details?id=com.boxchampy.fitness',
        github: 'https://github.com/strongmuhoti'
      },
      featured: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Applications' },
    { id: 'mobile', name: 'Mobile Apps' }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="portfolio-page">
      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="container">
          <motion.div 
            className="portfolio-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="portfolio-title">My Portfolio</h1>
            <p className="portfolio-subtitle">
              Explore my latest projects and see how I've helped businesses transform their ideas into reality
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
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

      {/* Projects Grid */}
      <section className="portfolio-grid-section" ref={ref}>
        <div className="container">
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
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-type">
                      {project.category === 'mobile' ? <FiSmartphone size={20} /> : <FiMonitor size={20} />}
                      {project.type}
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
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="project-links">
                    {project.links.demo && (
                      <a 
                        href={project.links.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FiExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.links.playStore && (
                      <a 
                        href={project.links.playStore} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <FiSmartphone size={16} />
                        Play Store
                      </a>
                    )}
                    {project.links.github && (
                      <a 
                        href={project.links.github} 
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
            ))}
          </motion.div>
          
          {filteredProjects.length === 0 && (
            <motion.div 
              className="no-projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>No projects found matching your criteria.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="portfolio-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Ready to Start Your Project?</h2>
            <p>Let's work together to bring your app idea to life</p>
            <button className="btn btn-primary btn-lg">
              Start Your Project
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
