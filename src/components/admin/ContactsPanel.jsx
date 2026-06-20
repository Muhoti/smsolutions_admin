import React, { useMemo, useState } from 'react';
import { FiPlus, FiUsers } from 'react-icons/fi';
import Button from '../ui/Button';
import AdminToolbar from './AdminToolbar';
import AdminPagination from './AdminPagination';
import {
  PROJECT_TYPE_LABELS,
  CONTACT_STATUS_OPTIONS,
  filterContacts,
  paginate,
  formatDate,
} from './adminConstants';

const StatusBadge = ({ status }) => (
  <span className={`adm-badge adm-badge--${status}`}>
    {status.replace(/-/g, ' ')}
  </span>
);

const STATUS_FILTER_OPTIONS = [
  { value: '', label: 'All statuses' },
  ...CONTACT_STATUS_OPTIONS,
];

const ContactsPanel = ({ contacts, onAdd, onSelect }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => filterContacts(contacts, { search, status: statusFilter }),
    [contacts, search, statusFilter]
  );

  const { items, page: safePage, totalPages, total } = paginate(filtered, page);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilter = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  return (
    <div className="adm-panel">
      <AdminToolbar
        search={search}
        onSearchChange={handleSearch}
        searchPlaceholder="Search by name, email, company…"
        filterValue={statusFilter}
        onFilterChange={handleFilter}
        filterOptions={STATUS_FILTER_OPTIONS}
        filterLabel="Filter by status"
        actions={(
          <Button variant="primary" onClick={onAdd}>
            <FiPlus size={16} />
            Add contact
          </Button>
        )}
      />

      {total > 0 ? (
        <div className="adm-card adm-card--flush">
          <div className="adm-table-scroll">
            <table className="adm-table adm-table--interactive">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {items.map((contact) => (
                  <tr
                    key={contact.id}
                    onClick={() => onSelect(contact)}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onSelect(contact)}
                  >
                    <td className="adm-cell-strong">{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.company || '—'}</td>
                    <td>{PROJECT_TYPE_LABELS[contact.projectType] || contact.projectType}</td>
                    <td><StatusBadge status={contact.status} /></td>
                    <td className="adm-cell-muted">{formatDate(contact.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <AdminPagination page={safePage} totalPages={totalPages} total={total} onPageChange={setPage} />
        </div>
      ) : (
        <div className="adm-empty">
          <FiUsers size={40} />
          <h3>{contacts.length ? 'No matches' : 'No inquiries yet'}</h3>
          <p>
            {contacts.length
              ? 'Try adjusting your search or filter.'
              : 'Contact form submissions will appear here.'}
          </p>
          {!contacts.length && (
            <Button variant="primary" onClick={onAdd}>
              <FiPlus size={16} />
              Add contact
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactsPanel;
