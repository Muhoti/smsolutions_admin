import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiChevronDown,
  FiHome,
  FiBriefcase,
  FiFolder,
  FiUser,
  FiMail,
  FiArrowRight,
} from 'react-icons/fi';
import { NAV_ITEMS } from '../../data/navigation';
import { CONTACT } from '../../data/company';
import { ASSETS } from '../../constants/assets';
import './AppMenuSheet.css';

const MENU_ICONS = {
  '/': FiHome,
  '/services': FiBriefcase,
  '/portfolio': FiFolder,
  '/about': FiUser,
  '/contact': FiMail,
};

const SHEET_SPRING = { type: 'spring', damping: 32, stiffness: 380, mass: 0.85 };

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
};

const isPathActive = (pathname, path) => {
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
};

const AppMenuSheet = ({ open, onClose }) => {
  const { pathname } = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    document.body.classList.toggle('app-menu-open', open);
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('app-menu-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleKeyDown]);

  useEffect(() => {
    if (!open) setServicesOpen(false);
  }, [open]);

  useEffect(() => {
    if (pathname.startsWith('/services')) setServicesOpen(true);
  }, [pathname]);

  const renderNavRow = (item) => {
    const Icon = MENU_ICONS[item.path] || FiHome;
    const active = isPathActive(pathname, item.path);

    return (
      <motion.li key={item.path} variants={itemVariants}>
        <Link
          to={item.path}
          className={`app-sheet-row${active ? ' app-sheet-row--active' : ''}`}
          onClick={onClose}
          aria-current={active ? 'page' : undefined}
        >
          <span className="app-sheet-row-icon" aria-hidden="true">
            <Icon size={20} />
          </span>
          <span className="app-sheet-row-body">
            <span className="app-sheet-row-label">{item.name}</span>
          </span>
          <FiArrowRight className="app-sheet-row-chevron" size={18} aria-hidden />
        </Link>
      </motion.li>
    );
  };

  const renderServicesRow = (item) => (
    <motion.li key={item.path} variants={itemVariants} className="app-sheet-services">
      <button
        type="button"
        className={`app-sheet-row app-sheet-row--expandable${
          isPathActive(pathname, item.path) ? ' app-sheet-row--active' : ''
        }${servicesOpen ? ' app-sheet-row--open' : ''}`}
        onClick={() => setServicesOpen((v) => !v)}
        aria-expanded={servicesOpen}
      >
        <span className="app-sheet-row-icon" aria-hidden="true">
          <FiBriefcase size={20} />
        </span>
        <span className="app-sheet-row-body">
          <span className="app-sheet-row-label">{item.name}</span>
          <span className="app-sheet-row-hint">Consultancy, web, mobile &amp; AI</span>
        </span>
        <FiChevronDown className="app-sheet-row-expand" size={18} aria-hidden />
      </button>
      <AnimatePresence initial={false}>
        {servicesOpen && item.dropdown && (
          <motion.div
            className="app-sheet-sublist"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {item.dropdown.map((sub) => (
              <Link
                key={sub.path}
                to={sub.path}
                className="app-sheet-sublink"
                onClick={onClose}
              >
                {sub.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            className="app-sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            aria-label="Close menu"
          />
          <motion.div
            className="app-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={SHEET_SPRING}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.45 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 88 || info.velocity.y > 520) onClose();
            }}
          >
            <div className="app-sheet-handle" aria-hidden="true" />

            <header className="app-sheet-brand">
              <img src={ASSETS.logoHero} alt="" className="app-sheet-logo" />
              <div className="app-sheet-brand-text">
                <span className="app-sheet-brand-name">Strong&apos;s Digital Labs</span>
                <span className="app-sheet-brand-tag">{CONTACT.tagline}</span>
              </div>
              <button
                type="button"
                className="app-sheet-close"
                onClick={onClose}
                aria-label="Close menu"
              >
                <FiX size={20} />
              </button>
            </header>

            <nav className="app-sheet-nav" aria-label="Site pages">
              <motion.ul
                className="app-sheet-list"
                variants={listVariants}
                initial="hidden"
                animate="show"
              >
                {NAV_ITEMS.map((item) =>
                  item.dropdown ? renderServicesRow(item) : renderNavRow(item),
                )}
              </motion.ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AppMenuSheet;
