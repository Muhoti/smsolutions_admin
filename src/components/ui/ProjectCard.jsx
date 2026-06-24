import React from 'react';
import { motion } from 'framer-motion';
import {
  FiExternalLink,
  FiSmartphone,
  FiMonitor,
  FiLayers,
  FiStar,
} from 'react-icons/fi';
import {
  getProjectCover,
  getProjectType,
  getProjectInitials,
  getCategoryTheme,
} from '../../utils/portfolio';
import './ProjectCard.css';

const MAX_TECH = 4;

const categoryIcon = (category) => {
  if (category === 'mobile') return FiSmartphone;
  if (category === 'both') return FiLayers;
  return FiMonitor;
};

const ProjectCard = ({ project, inView = true, index = 0 }) => {
  const coverUrl = getProjectCover(project);
  const theme = getCategoryTheme(project.category);
  const TypeIcon = categoryIcon(project.category);
  const techStack = Array.isArray(project.techStack) ? project.techStack : [];
  const visibleTech = techStack.slice(0, MAX_TECH);
  const overflowCount = techStack.length - MAX_TECH;

  const links = [
    project.liveDemo && { href: project.liveDemo, icon: FiExternalLink, label: 'Live Demo' },
    project.playStore && { href: project.playStore, icon: FiSmartphone, label: 'Play Store' },
    project.appStore && { href: project.appStore, icon: FiSmartphone, label: 'App Store' },
  ].filter(Boolean);

  return (
    <motion.article
      className={[
        'project-card',
        project.featured ? 'project-card--highlight' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div
        className={[
          'project-card__media',
          !coverUrl ? `project-card__media--${theme.key}` : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {coverUrl ? (
          <img src={coverUrl} alt={project.title} loading="lazy" />
        ) : (
          <div className="project-card__fallback" aria-hidden="true">
            <TypeIcon size={40} />
            <span>{getProjectInitials(project.title)}</span>
          </div>
        )}

        <div className="project-card__badges">
          <span className="project-card__type">
            <TypeIcon size={14} />
            {getProjectType(project.category, project.type)}
          </span>
          {project.featured && (
            <span className="project-card__featured">
              <FiStar size={12} />
              Featured
            </span>
          )}
        </div>

        {links.length > 0 && (
          <div className="project-card__overlay">
            <div className="project-card__overlay-links">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card__overlay-link"
                >
                  <link.icon size={16} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        {project.clientName && (
          <p className="project-card__client">{project.clientName}</p>
        )}
        <p className="project-card__description">{project.description}</p>

        {visibleTech.length > 0 && (
          <div className="project-card__tech">
            {visibleTech.map((tech) => (
              <span key={tech} className="project-card__tech-tag">
                {tech}
              </span>
            ))}
            {overflowCount > 0 && (
              <span className="project-card__tech-tag project-card__tech-tag--more">
                +{overflowCount}
              </span>
            )}
          </div>
        )}

        {links.length > 0 && (
          <div className="project-card__links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__link"
              >
                <link.icon size={15} />
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default ProjectCard;
