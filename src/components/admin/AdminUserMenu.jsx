import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiLogOut, FiUser } from 'react-icons/fi';

const AdminUserMenu = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const initials = (user?.name || user?.email || 'A')
    .split(/[\s@]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('');

  return (
    <div className="adm-user-menu" ref={ref}>
      <button
        type="button"
        className="adm-user-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <span className="adm-user-avatar">{initials || 'A'}</span>
        <span className="adm-user-info">
          <span className="adm-user-name">{user?.name || 'Admin'}</span>
          <span className="adm-user-email">{user?.email}</span>
        </span>
        <FiChevronDown size={16} className={open ? 'rotated' : ''} />
      </button>

      {open && (
        <div className="adm-user-dropdown">
          <div className="adm-user-dropdown-header">
            <FiUser size={14} />
            <span>{user?.role || 'admin'}</span>
          </div>
          <button type="button" className="adm-user-dropdown-item danger" onClick={onLogout}>
            <FiLogOut size={16} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminUserMenu;
