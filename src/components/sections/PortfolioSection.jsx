import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCode, FiLoader } from 'react-icons/fi';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useApp } from '../../context/AppContext';
import { HOME_CONTENT } from '../../data/pageContent';
import { filterProjects } from '../../utils/portfolio';
import ProjectCard from '../ui/ProjectCard';
import './Portfolio.css';

const HOME_PREVIEW_COUNT = 3;

const PortfolioSection = () => {
  const [ref, inView] = useScrollReveal();
  const [hasFetched, setHasFetched] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { projects, loadingProjects, fetchProjects } = useApp();
  const { portfolio } = HOME_CONTENT;

  useEffect(() => {
    if (inView && !hasFetched && !loadingProjects && isInitialLoad && projects.length === 0) {
      setHasFetched(true);
      setIsInitialLoad(false);
      fetchProjects();
    } else if (projects.length > 0) {
      setIsInitialLoad(false);
    }
  }, [inView, hasFetched, loadingProjects, fetchProjects, isInitialLoad, projects.length]);

  const filteredProjects = filterProjects(projects, { category: 'all' });
  const hasMore = filteredProjects.length > HOME_PREVIEW_COUNT;
  const visibleProjects = filteredProjects.slice(0, HOME_PREVIEW_COUNT);

  return (
    <section className="portfolio-section" id="portfolio" ref={ref}>
      <div className="container">
        <motion.div
          className="portfolio-header-row"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <div className="portfolio-header-copy">
            <h2>{portfolio.title}</h2>
            <p>{portfolio.subtitle}</p>
          </div>
          {hasMore && (
            <Link to="/portfolio" className="portfolio-all-link">
              {portfolio.linkLabel} &rarr;
            </Link>
          )}
        </motion.div>

        <div className="portfolio-header portfolio-header--desktop">
          <h2>Our Work</h2>
          <p>{portfolio.subtitle}</p>
        </div>

        <motion.div
          className="portfolio-grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {loadingProjects && isInitialLoad ? (
            <div className="loading-projects">
              <FiLoader className="spinner" size={32} />
              <p>{portfolio.loadingMessage}</p>
            </div>
          ) : visibleProjects.length > 0 ? (
            visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                inView={inView}
                index={index}
              />
            ))
          ) : (
            <div className="no-projects">
              <FiCode size={48} />
              <h3>{portfolio.emptyTitle}</h3>
              <p>{portfolio.emptyMessage}</p>
              <p>{portfolio.emptyHint}</p>
            </div>
          )}
        </motion.div>

        {hasMore && (
          <motion.div
            className="portfolio-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/portfolio" className="portfolio-all-link portfolio-all-link--desktop">
              View All Projects &rarr;
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
