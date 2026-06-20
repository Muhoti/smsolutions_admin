import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MOBILE_TAB_ITEMS } from '../data/navigation';
import './BottomNav.css';

const isTabActive = (pathname, path) => {
  if (path === '/') {
    return pathname === '/';
  }
  return pathname === path || pathname.startsWith(`${path}/`);
};

const BottomNav = () => {
  const { pathname } = useLocation();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {MOBILE_TAB_ITEMS.map((item) => {
        const Icon = item.icon;
        const active = isTabActive(pathname, item.path);

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={`bottom-nav-item ${active ? 'active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            <span className="bottom-nav-icon">
              <Icon size={22} strokeWidth={active ? 2.25 : 1.85} />
            </span>
            <span className="bottom-nav-label">{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNav;
