import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MOBILE_TAB_ITEMS } from '../data/navigation';
import './BottomNav.css';

const syncDockHeight = (element) => {
  if (!element) return;
  document.documentElement.style.setProperty(
    '--app-dock-height',
    `${element.getBoundingClientRect().height}px`,
  );
};

const isTabActive = (pathname, path) => {
  if (path === '/') {
    return pathname === '/';
  }
  return pathname === path || pathname.startsWith(`${path}/`);
};

const BottomNav = () => {
  const { pathname } = useLocation();
  const dockRef = useRef(null);

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return undefined;

    syncDockHeight(dock);

    const observer = new ResizeObserver(() => syncDockHeight(dock));
    observer.observe(dock);

    return () => observer.disconnect();
  }, []);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav ref={dockRef} className="app-dock" aria-label="Main navigation">
      <div className="app-dock-inner">
        {MOBILE_TAB_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = isTabActive(pathname, item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`app-dock-tab ${active ? 'active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <span className="app-dock-tab-icon">
                <Icon size={21} strokeWidth={active ? 2.35 : 1.9} />
              </span>
              <span className="app-dock-tab-label">{item.name}</span>
              {active && <span className="app-dock-tab-glow" aria-hidden="true" />}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
