import React from 'react';
import { FiFolder, FiSmartphone, FiMonitor, FiStar } from 'react-icons/fi';

const categoryIcon = (category) => {
  if (category === 'mobile') return FiSmartphone;
  if (category === 'web') return FiMonitor;
  return FiFolder;
};

const ProjectListCard = ({ project }) => {
  const Icon = categoryIcon(project.category);

  return (
    <article className="adm-m-project-card">
      <span className="adm-m-project-icon">
        <Icon size={20} />
      </span>
      <div className="adm-m-project-body">
        <div className="adm-m-list-top">
          <strong>{project.title}</strong>
          {project.featured && (
            <span className="adm-badge adm-badge--featured">
              <FiStar size={10} /> Featured
            </span>
          )}
        </div>
        <p className="adm-m-project-desc">{project.description}</p>
        <span className="adm-m-list-meta">
          {project.category} · {project.clientName || 'No client'} · {project.status || 'completed'}
        </span>
      </div>
    </article>
  );
};

export default ProjectListCard;
