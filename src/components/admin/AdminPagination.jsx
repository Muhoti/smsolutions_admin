import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const AdminPagination = ({ page, totalPages, total, onPageChange }) => {
  if (total <= 0) return null;

  return (
    <div className="adm-pagination">
      <span className="adm-pagination-info">
        Page {page} of {totalPages} · {total} total
      </span>
      <div className="adm-pagination-controls">
        <button
          type="button"
          className="adm-pagination-btn"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <FiChevronLeft size={16} />
        </button>
        <button
          type="button"
          className="adm-pagination-btn"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <FiChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default AdminPagination;
