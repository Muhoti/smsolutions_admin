import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import { ASSETS } from '../constants/assets';
import { NAV_ITEMS } from '../data/navigation';
import Button from './ui/Button';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = NAV_ITEMS;

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container navbar-container">
        <div className="navbar-content">
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          <Link to="/" className="navbar-logo">
            <img
              src={ASSETS.logoNavbar}
              alt="Strong's Digital Labs"
              className="navbar-logo-img"
            />
          </Link>

          <div className="navbar-nav desktop-nav">
            {navItems.map((item, index) => (
              <div key={item.name} className="nav-item">
                {item.dropdown ? (
                  <div className="nav-dropdown">
                    <button
                      type="button"
                      className="nav-link dropdown-trigger"
                      onClick={() => toggleDropdown(index)}
                    >
                      {item.name}
                      <FiChevronDown className={`dropdown-icon ${activeDropdown === index ? 'rotated' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          className="dropdown-menu"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className="dropdown-item"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="navbar-actions">
            <ThemeToggle />
            <div className="navbar-cta desktop-cta">
              <Button to="/contact" variant="primary">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              className="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            />
            <motion.div
              className="mobile-nav"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <div className="mobile-nav-header">
                <span className="mobile-nav-title">Menu</span>
                <button
                  type="button"
                  className="mobile-nav-close"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <FiX size={22} />
                </button>
              </div>

              <nav className="mobile-nav-links" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <div key={item.name} className="mobile-nav-group">
                    <Link
                      to={item.path}
                      className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="mobile-nav-sublinks">
                        {item.dropdown.map((sub) => (
                          <Link key={sub.name} to={sub.path} className="mobile-nav-sublink">
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mobile-cta">
                <Button to="/contact" variant="primary" onClick={() => setMobileMenuOpen(false)}>
                  Contact Us
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
