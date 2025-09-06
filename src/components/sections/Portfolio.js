import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiExternalLink, 
  FiGithub, 
  FiSmartphone, 
  FiMonitor,
  FiFilter
} from 'react-icons/fi';
import './Portfolio.css';

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Ambulex Emergency Response System',
      category: 'web',
      type: 'Web Application',
      description: 'Real-time emergency response platform with GPS tracking and instant notifications.',
      image: '/api/placeholder/400/300',
      tech: ['React', 'Node.js', 'MongoDB'],
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
      description: 'GPS-enabled mobile application for agricultural data collection and farmer mapping.',
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
      description: 'Comprehensive agricultural management information system for county government.',
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
      description: 'Enterprise asset tracking and management mobile application.',
      image: '/api/placeholder/400/300',
      tech: ['React Native', 'Node.js', 'MongoDB'],
      links: {
        playStore: 'https://play.google.com/store/apps/details?id=com.uetcl.assets',
        github: 'https://github.com/strongmuhoti'
      },
      featured: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Apps' },
    { id: 'mobile', name: 'Mobile Apps' }
  ];

  const filteredProjects = projects.filter(project => 
    filter === 'all' || project.category === filter
  );

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
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
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
