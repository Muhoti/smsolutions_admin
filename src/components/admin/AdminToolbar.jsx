import React from 'react';
import { FiSearch } from 'react-icons/fi';

const AdminToolbar = ({
  search,
  onSearchChange,
  searchPlaceholder = 'Search…',
  filterValue,
  onFilterChange,
  filterOptions,
  filterLabel = 'Filter',
  actions,
}) => (
  <div className="adm-toolbar">
    <div className="adm-toolbar-left">
      <div className="adm-search">
        <FiSearch size={16} className="adm-search-icon" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label="Search"
        />
      </div>
      {filterOptions && (
        <select
          className="adm-filter-select"
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          aria-label={filterLabel}
        >
          {filterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
    </div>
    {actions && <div className="adm-toolbar-actions">{actions}</div>}
  </div>
);

export default AdminToolbar;
