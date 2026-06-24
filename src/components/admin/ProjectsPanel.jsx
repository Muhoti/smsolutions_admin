import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FiPlus, FiSearch, FiCode, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Button from '../ui/Button';
import AdminToolbar from './AdminToolbar';
import AdminPagination from './AdminPagination';
import ProjectListCard from './ProjectListCard';
import MobileSectionHead from './MobileSectionHead';
import { filterProjects, paginate } from './adminConstants';

const CATEGORY_OPTIONS = [
  { value: '', label: 'All categories' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'both', label: 'Cross-platform' },
];

const CATEGORY_CHIPS = [
  { value: '', label: 'All' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'both', label: 'Both' },
];

const ProjectsPanel = ({ projects, onAdd, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const chipsRef = useRef(null);

  const filtered = useMemo(
    () => filterProjects(projects, { search, category }),
    [projects, search, category]
  );

  const { items, page: safePage, totalPages, total } = paginate(filtered, page);

  useEffect(() => {
    const container = chipsRef.current;
    if (!container) return;
    const active = container.querySelector('.adm-m-chip.active');
    active?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
  }, [category]);

  return (
    <div className="adm-panel adm-panel--projects">
      <div className="adm-mobile-only adm-m-screen">
        <div className="adm-m-search-wrap">
          <FiSearch size={18} className="adm-m-search-icon" />
          <input
            type="search"
            className="adm-m-search"
            placeholder="Search projects…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        <div className="adm-m-chips" ref={chipsRef}>
          {CATEGORY_CHIPS.map((chip) => (
            <button
              key={chip.value}
              type="button"
              className={`adm-m-chip${category === chip.value ? ' active' : ''}`}
              onClick={() => { setCategory(chip.value); setPage(1); }}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <MobileSectionHead title={`${total} project${total !== 1 ? 's' : ''}`} />

        {total > 0 ? (
          <>
            <div className="adm-m-project-list">
              {items.map((project) => (
                <ProjectListCard
                  key={project.id}
                  project={project}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
            <AdminPagination page={safePage} totalPages={totalPages} total={total} onPageChange={setPage} />
          </>
        ) : (
          <div className="adm-m-empty-card">
            <FiCode size={32} />
            <h3>{projects.length ? 'No matches' : 'No projects yet'}</h3>
            <p>Add portfolio work to showcase on your site.</p>
          </div>
        )}

        <button type="button" className="adm-fab" onClick={onAdd} aria-label="Add project">
          <FiPlus size={24} />
        </button>
      </div>

      {/* Desktop */}
      <div className="adm-desktop-only">
        <AdminToolbar
          search={search}
          onSearchChange={(v) => { setSearch(v); setPage(1); }}
          searchPlaceholder="Search projects…"
          filterValue={category}
          onFilterChange={(v) => { setCategory(v); setPage(1); }}
          filterOptions={CATEGORY_OPTIONS}
          actions={(
            <Button variant="primary" onClick={onAdd}>
              <FiPlus size={16} />
              Add project
            </Button>
          )}
        />

        {total > 0 ? (
          <div className="adm-card adm-card--flush">
            <div className="adm-table-scroll">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Client</th>
                    <th>Featured</th>
                    <th>Status</th>
                    <th className="adm-th-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((project) => (
                    <tr key={project.id}>
                      <td className="adm-cell-strong">{project.title}</td>
                      <td><span className="adm-tag">{project.category}</span></td>
                      <td>{project.clientName || '—'}</td>
                      <td>
                        {project.featured ? (
                          <span className="adm-badge adm-badge--featured">Featured</span>
                        ) : '—'}
                      </td>
                      <td>
                        <span className="adm-badge adm-badge--neutral">{project.status || 'completed'}</span>
                      </td>
                      <td>
                        <div className="adm-row-actions">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AdminPagination page={safePage} totalPages={totalPages} total={total} onPageChange={setPage} />
          </div>
        ) : (
          <div className="adm-empty">
            <FiCode size={40} />
            <h3>No projects yet</h3>
            <p>Add projects here, then check Featured project to publish them on the website.</p>
            <Button variant="primary" onClick={onAdd}>
              <FiPlus size={16} />
              Add project
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPanel;
