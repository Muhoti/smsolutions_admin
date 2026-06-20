import React, { useMemo, useState } from 'react';
import { FiPlus, FiCode, FiSmartphone, FiMonitor } from 'react-icons/fi';
import Button from '../ui/Button';
import AdminToolbar from './AdminToolbar';
import AdminPagination from './AdminPagination';
import { filterProjects, paginate } from './adminConstants';

const CATEGORY_OPTIONS = [
  { value: '', label: 'All categories' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'both', label: 'Cross-platform' },
];

const ProjectsPanel = ({ projects, onAdd }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => filterProjects(projects, { search, category }),
    [projects, search, category]
  );

  const { items, page: safePage, totalPages, total } = paginate(filtered, page);

  return (
    <div className="adm-panel">
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
                </tr>
              </thead>
              <tbody>
                {items.map((project) => (
                  <tr key={project.id}>
                    <td className="adm-cell-strong">{project.title}</td>
                    <td>
                      <span className="adm-tag">
                        {project.category === 'mobile' ? <FiSmartphone size={12} /> : <FiMonitor size={12} />}
                        {project.category}
                      </span>
                    </td>
                    <td>{project.clientName || '—'}</td>
                    <td>
                      {project.featured ? (
                        <span className="adm-badge adm-badge--featured">Featured</span>
                      ) : (
                        <span className="adm-cell-muted">—</span>
                      )}
                    </td>
                    <td>
                      <span className="adm-badge adm-badge--neutral">{project.status || 'completed'}</span>
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
          <h3>{projects.length ? 'No matches' : 'No projects yet'}</h3>
          <p>Add portfolio projects to display on the public site.</p>
          <Button variant="primary" onClick={onAdd}>
            <FiPlus size={16} />
            Add project
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsPanel;
