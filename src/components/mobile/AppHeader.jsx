import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import ThemeToggle from '../ThemeToggle';
import { getScreenMeta } from '../../data/appScreens';
import AppMenuSheet from './AppMenuSheet';
import './AppHeader.css';

/** Pages with full-bleed cinematic hero — title lives in the page, not the app bar */
const CINEMATIC_ROUTES = ['/'];

const AppHeader = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const meta = getScreenMeta(pathname);
  const isCinematic = CINEMATIC_ROUTES.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={[
          'app-header',
          isCinematic ? 'app-header--overlay' : 'app-header--screen',
          scrolled ? 'app-header--scrolled' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="app-header-bar">
          <button
            type="button"
            className="app-header-menu"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu size={22} />
          </button>

          {!isCinematic && (
            <span className="app-header-title">{meta.navTitle}</span>
          )}

          {isCinematic && <span className="app-header-spacer" aria-hidden="true" />}

          <ThemeToggle />
        </div>
      </header>

      <AppMenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default AppHeader;
