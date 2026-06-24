import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCode, FiLoader } from 'react-icons/fi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useApp } from '../context/AppContext';
import { PROJECT_CATEGORIES } from '../data/company';
import { PORTFOLIO_CONTENT } from '../data/pageContent';
import { filterProjects } from '../utils/portfolio';
import PageHero from '../components/ui/PageHero';
import ProjectCard from '../components/ui/ProjectCard';
import Button from '../components/ui/Button';
import MobileScreenGate from '../components/mobile/MobileScreenGate';
import MobilePortfolioScreen from '../components/mobile/screens/MobilePortfolioScreen';
import '../components/sections/Portfolio.css';
import './Portfolio.css';

const PortfolioDesktop = ({ inView, sectionRef, filter, setFilter, projects, loading }) => {
  const filteredProjects = filterProjects(projects, { category: filter });
  const { hero, cta, empty, loadingMessage } = PORTFOLIO_CONTENT;

  return (
    <>
      <PageHero
        heroClass="portfolio-hero"
        titleClass="portfolio-title"
        subtitleClass="portfolio-subtitle"
        contentClass="portfolio-hero-content"
        title={hero.title}
        subtitle={hero.subtitle}
      />

      <section className="portfolio-section portfolio-page-work" ref={sectionRef}>
        <div className="container">
          <motion.div
            className="portfolio-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
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

          {loading ? (
            <div className="loading-projects">
              <FiLoader className="spinner" size={32} />
              <p>{loadingMessage}</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <motion.div
              className="portfolio-grid"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  inView={inView}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="no-projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FiCode size={48} />
              <h3>{empty.title}</h3>
              <p>{empty.message}</p>
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
            <h2>{cta.title}</h2>
            <p>{cta.subtitle}</p>
            <Button to="/contact" variant="primary" size="lg">
              {cta.button}
              <FiArrowRight size={20} />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

const Portfolio = () => {
  const [ref, inView] = useScrollReveal();
  const [filter, setFilter] = useState('all');
  const { featuredProjects, loadingFeaturedProjects, fetchFeaturedProjects } = useApp();

  useEffect(() => {
    fetchFeaturedProjects();
  }, [fetchFeaturedProjects]);

  return (
    <div className="portfolio-page">
      <MobileScreenGate
        mobile={<MobilePortfolioScreen />}
        desktop={
          <PortfolioDesktop
            inView={inView}
            sectionRef={ref}
            filter={filter}
            setFilter={setFilter}
            projects={featuredProjects}
            loading={loadingFeaturedProjects}
          />
        }
      />
    </div>
  );
};

export default Portfolio;
