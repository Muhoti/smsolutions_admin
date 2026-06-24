import React from 'react';
import { FiFolder, FiSmartphone, FiMonitor, FiStar, FiEdit2, FiTrash2 } from 'react-icons/fi';

const categoryIcon = (category) => {
  if (category === 'mobile') return FiSmartphone;
  if (category === 'web') return FiMonitor;
  return FiFolder;
};

const ProjectListCard = ({ project, onEdit, onDelete }) => {
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
      <div className="adm-m-project-actions">
        <button
          type="button"
          className="adm-action-btn"
          onClick={() => onEdit(project)}
          aria-label={`Edit ${project.title}`}
        >
          <FiEdit2 size={16} />
        </button>
        <button
          type="button"
          className="adm-action-btn adm-action-btn--danger"
          onClick={() => onDelete(project)}
          aria-label={`Delete ${project.title}`}
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </article>
  );
};

export default ProjectListCard;
