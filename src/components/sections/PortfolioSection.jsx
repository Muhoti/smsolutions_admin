import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCode, FiLoader } from 'react-icons/fi';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useApp } from '../../context/AppContext';
import { HOME_CONTENT } from '../../data/pageContent';
import ProjectCard from '../ui/ProjectCard';
import './Portfolio.css';

const PortfolioSection = () => {
  const [ref, inView] = useScrollReveal();
  const [hasFetched, setHasFetched] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { featuredProjects, loadingFeaturedProjects, fetchFeaturedProjects } = useApp();
  const { portfolio } = HOME_CONTENT;
  const previewCount = portfolio.previewCount;

  useEffect(() => {
    if (
      inView &&
      !hasFetched &&
      !loadingFeaturedProjects &&
      isInitialLoad &&
      featuredProjects.length === 0
    ) {
      setHasFetched(true);
      setIsInitialLoad(false);
      fetchFeaturedProjects();
    } else if (featuredProjects.length > 0) {
      setIsInitialLoad(false);
    }
  }, [
    inView,
    hasFetched,
    loadingFeaturedProjects,
    fetchFeaturedProjects,
    isInitialLoad,
    featuredProjects.length,
  ]);

  const hasMore = featuredProjects.length > previewCount;
  const visibleProjects = featuredProjects.slice(0, previewCount);

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
          {loadingFeaturedProjects && isInitialLoad ? (
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
