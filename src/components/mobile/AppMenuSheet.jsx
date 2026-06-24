import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronRight } from 'react-icons/fi';
import { NAV_ITEMS } from '../../data/navigation';
import Button from '../ui/Button';
import './AppMenuSheet.css';

const AppMenuSheet = ({ open, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

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
            onClick={onClose}
            aria-label="Close menu"
          />
          <motion.div
            className="app-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="App menu"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          >
            <div className="app-sheet-handle" aria-hidden="true" />
            <div className="app-sheet-head">
              <h2>Explore</h2>
              <button type="button" className="app-sheet-close" onClick={onClose} aria-label="Close">
                <FiX size={20} />
              </button>
            </div>

            <nav className="app-sheet-nav">
              {NAV_ITEMS.map((item) => (
                <div key={item.name} className="app-sheet-group">
                  <Link to={item.path} className="app-sheet-link" onClick={onClose}>
                    <span>{item.name}</span>
                    <FiChevronRight size={18} />
                  </Link>
                  {item.dropdown && (
                    <div className="app-sheet-sublinks">
                      {item.dropdown.map((sub) => (
                        <Link key={sub.name} to={sub.path} className="app-sheet-sublink" onClick={onClose}>
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="app-sheet-cta">
              <Button to="/contact" variant="primary" onClick={onClose}>
                Start a project
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AppMenuSheet;
