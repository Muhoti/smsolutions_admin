import React, { useEffect, useState } from 'react';
import { FiCode } from 'react-icons/fi';
import { useApp } from '../../../context/AppContext';
import { PROJECT_CATEGORIES } from '../../../data/company';
import { PORTFOLIO_CONTENT } from '../../../data/pageContent';
import { filterProjects, getProjectCover, getProjectType } from '../../../utils/portfolio';
import {
  M3Screen,
  M3Chip,
  M3Loading,
  M3Empty,
  M3Button,
} from '../flutter/MobileUIKit';
import '../flutter/MobileUIKit.css';

const MobilePortfolioScreen = () => {
  const [filter, setFilter] = useState('all');
  const { projects, loadingProjects, fetchProjects } = useApp();
  const { hero, cta, empty, loadingMessage } = PORTFOLIO_CONTENT;

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const filtered = filterProjects(projects, { category: filter });

  return (
    <M3Screen className="m3-portfolio">
      <header className="m3-page-intro">
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
      </header>
      <div className="m3-chip-row m3-chip-row--sticky">
        {PROJECT_CATEGORIES.map((cat) => (
          <M3Chip
            key={cat.id}
            label={cat.name}
            active={filter === cat.id}
            onClick={() => setFilter(cat.id)}
          />
        ))}
      </div>

      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {loadingProjects ? (
          <M3Loading message={loadingMessage} />
        ) : filtered.length > 0 ? (
          filtered.map((project) => {
            const cover = getProjectCover(project);
            return (
              <article key={project.id} className="m3-project-card m3-project-card--full">
                <div className="m3-project-media">
                  {cover ? (
                    <img src={cover} alt={project.title} loading="lazy" />
                  ) : (
                    <div
                      style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--m3-on-surface-variant)',
                      }}
                    >
                      <FiCode size={32} />
                    </div>
                  )}
                </div>
                <div className="m3-project-body">
                  <div className="m3-project-category">
                    {getProjectType(project.category, project.type)}
                  </div>
                  <h3>{project.title}</h3>
                  {project.clientName && (
                    <p style={{ margin: '0 0 4px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {project.clientName}
                    </p>
                  )}
                  <p>{project.description}</p>
                  {Array.isArray(project.techStack) && project.techStack.length > 0 && (
                    <div className="m3-tag-row">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span key={tech} className="m3-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })
        ) : (
          <M3Empty icon={FiCode} title={empty.title} message={empty.message} />
        )}
      </div>

      <div className="m3-cta-banner">
        <h2>{cta.title}</h2>
        <p>{cta.subtitle}</p>
        <M3Button variant="filled" to="/contact" fullWidth>
          {cta.button}
        </M3Button>
      </div>
    </M3Screen>
  );
};

export default MobilePortfolioScreen;
