import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FiPlus, FiSearch, FiUsers } from 'react-icons/fi';
import Button from '../ui/Button';
import AdminToolbar from './AdminToolbar';
import AdminPagination from './AdminPagination';
import ContactListCard from './ContactListCard';
import MobileSectionHead from './MobileSectionHead';
import {
  PROJECT_TYPE_LABELS,
  CONTACT_STATUS_OPTIONS,
  filterContacts,
  paginate,
  formatDate,
} from './adminConstants';

const STATUS_FILTER_OPTIONS = [
  { value: '', label: 'All statuses' },
  ...CONTACT_STATUS_OPTIONS,
];

const STATUS_CHIPS = [
  { value: '', label: 'All' },
  ...CONTACT_STATUS_OPTIONS,
];

const ContactsPanel = ({ contacts, onAdd, onSelect }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const chipsRef = useRef(null);

  const filtered = useMemo(
    () => filterContacts(contacts, { search, status: statusFilter }),
    [contacts, search, statusFilter]
  );

  const { items, page: safePage, totalPages, total } = paginate(filtered, page);

  useEffect(() => {
    const container = chipsRef.current;
    if (!container) return;
    const active = container.querySelector('.adm-m-chip.active');
    active?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
  }, [statusFilter]);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilter = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  return (
    <div className="adm-panel adm-panel--contacts">
      <div className="adm-mobile-only adm-m-screen">
        <div className="adm-m-search-wrap">
          <FiSearch size={18} className="adm-m-search-icon" />
          <input
            type="search"
            className="adm-m-search"
            placeholder="Search contacts…"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="adm-m-chips" ref={chipsRef}>
          {STATUS_CHIPS.map((chip) => (
            <button
              key={chip.value}
              type="button"
              className={`adm-m-chip${statusFilter === chip.value ? ' active' : ''}`}
              onClick={() => handleFilter(chip.value)}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <MobileSectionHead title={`${total} contact${total !== 1 ? 's' : ''}`} />

        {total > 0 ? (
          <>
            <div className="adm-m-list">
              {items.map((contact) => (
                <ContactListCard key={contact.id} contact={contact} onClick={onSelect} />
              ))}
            </div>
            <AdminPagination page={safePage} totalPages={totalPages} total={total} onPageChange={setPage} />
          </>
        ) : (
          <div className="adm-m-empty-card">
            <FiUsers size={32} />
            <h3>{contacts.length ? 'No matches' : 'No inquiries yet'}</h3>
            <p>
              {contacts.length
                ? 'Try a different search or filter.'
                : 'Contact form submissions will appear here.'}
            </p>
          </div>
        )}

        <button type="button" className="adm-fab" onClick={onAdd} aria-label="Add contact">
          <FiPlus size={24} />
        </button>
      </div>

      {/* Desktop */}
      <div className="adm-desktop-only">
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
                      <td>
                        <span className={`adm-badge adm-badge--${contact.status}`}>
                          {contact.status.replace(/-/g, ' ')}
                        </span>
                      </td>
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
            <p>Contact form submissions will appear here once received.</p>
            {!contacts.length && (
              <Button variant="primary" onClick={onAdd}>
                <FiPlus size={16} />
                Add contact
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsPanel;
