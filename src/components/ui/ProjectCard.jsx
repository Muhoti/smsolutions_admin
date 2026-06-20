import React from 'react';
import { motion } from 'framer-motion';
import {
  FiExternalLink,
  FiGithub,
  FiSmartphone,
  FiMonitor,
} from 'react-icons/fi';
import { getProjectImage, getProjectType } from '../../utils/portfolio';

const ProjectCard = ({ project, inView = true, index = 0 }) => (
  <motion.div
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
        {project.featured && <div className="featured-badge">Featured</div>}
      </div>
    </div>

    <div className="project-content">
      <h3>{project.title}</h3>
      <p>{project.description}</p>

      {project.techStack?.length > 0 && (
        <div className="project-tech">
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      )}

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
);

export default ProjectCard;
