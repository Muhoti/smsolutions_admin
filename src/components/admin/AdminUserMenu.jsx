import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiLogOut, FiUser, FiExternalLink } from 'react-icons/fi';
import { getInitials } from './adminConstants';

const AdminUserMenu = ({ user, onLogout, avatarOnly = false }) => {
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

  const initials = getInitials(user?.name || user?.email || 'Admin');

  return (
    <div className={`adm-user-menu${avatarOnly ? ' adm-user-menu--avatar-only' : ''}`} ref={ref}>
      <button
        type="button"
        className={`adm-user-trigger${avatarOnly ? ' adm-user-trigger--avatar-only' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Account menu"
      >
        <span className="adm-user-avatar">{initials}</span>
        {!avatarOnly && (
          <>
            <span className="adm-user-info">
              <span className="adm-user-name">{user?.name || 'Admin'}</span>
              <span className="adm-user-email">{user?.email}</span>
            </span>
            <FiChevronDown size={16} className={`adm-user-chevron${open ? ' rotated' : ''}`} />
          </>
        )}
      </button>

      {open && (
        <div className={`adm-user-dropdown${avatarOnly ? ' adm-user-dropdown--mobile' : ''}`}>
          <div className="adm-user-dropdown-header">
            <FiUser size={14} />
            <span>{user?.email || user?.role || 'admin'}</span>
          </div>
          <Link to="/" className="adm-user-dropdown-item adm-user-dropdown-link" onClick={() => setOpen(false)}>
            <FiExternalLink size={16} />
            View public site
          </Link>
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
