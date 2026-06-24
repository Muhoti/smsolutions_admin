import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCode, FiLoader, FiSearch } from 'react-icons/fi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { apiService } from '../services/api';
import { PROJECT_CATEGORIES } from '../data/company';
import { filterProjects } from '../utils/portfolio';
import PageHero from '../components/ui/PageHero';
import ProjectCard from '../components/ui/ProjectCard';
import Button from '../components/ui/Button';
import './Portfolio.css';

const Portfolio = () => {
  const [ref, inView] = useScrollReveal();
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

  const filteredProjects = filterProjects(projects, { category: filter, searchTerm });

  return (
    <div className="portfolio-page">
      <PageHero
        heroClass="portfolio-hero"
        titleClass="portfolio-title"
        subtitleClass="portfolio-subtitle"
        contentClass="portfolio-hero-content"
        title="Our Portfolio"
        subtitle="Explore the online systems, web applications, and mobile apps we have built for our clients"
      />

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
              {PROJECT_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
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
              className="portfolio-grid portfolio-grid--showcase"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  inView={inView}
                  index={index}
                  featuredLayout
                />
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
            <Button to="/contact" variant="primary" size="lg">
              Contact Us
              <FiArrowRight size={20} />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
