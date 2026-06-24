import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiChevronDown, FiLoader } from 'react-icons/fi';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useApp } from '../../context/AppContext';
import { filterProjects } from '../../utils/portfolio';
import SectionHeader from '../ui/SectionHeader';
import ProjectCard from '../ui/ProjectCard';
import Button from '../ui/Button';
import './Portfolio.css';

const HOME_PREVIEW_COUNT = 3;

const PortfolioSection = () => {
  const [ref, inView] = useScrollReveal();
  const [hasFetched, setHasFetched] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { projects, loadingProjects, fetchProjects } = useApp();

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
        <SectionHeader
          title="Our Work"
          subtitle="Selected projects showcasing the systems we design and build for our clients"
          className="portfolio-header"
          inView={inView}
        />

        <motion.div
          className="portfolio-grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {loadingProjects && isInitialLoad ? (
            <div className="loading-projects">
              <FiLoader className="spinner" size={32} />
              <p>Loading amazing projects...</p>
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
              <h3>No projects yet</h3>
              <p>Projects will appear here once they&apos;re added to the database.</p>
              <p>Check back later or contact us to discuss your project.</p>
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
            <Button variant="outline" to="/portfolio">
              View All Projects
              <FiChevronDown size={16} />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
