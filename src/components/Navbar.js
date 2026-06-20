import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'Services', 
      path: '/services',
      dropdown: [
        { name: 'Systems Consultancy', path: '/services#consultancy' },
        { name: 'Web Development', path: '/services#web' },
        { name: 'Mobile Apps', path: '/services#mobile' },
        { name: 'AI-Enabled Solutions', path: '/services#ai' }
      ]
    },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

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
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            <img 
              src="/logo-navbar.png" 
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
              <Link to="/contact" className="btn btn-primary">
                Contact Us
              </Link>
            </div>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mobile-nav-content">
                {navItems.map((item) => (
                  <div key={item.name} className="mobile-nav-item">
                    {item.dropdown ? (
                      <div className="mobile-dropdown">
                        <button 
                          className="mobile-nav-link mobile-dropdown-trigger"
                          onClick={() => toggleDropdown(navItems.indexOf(item))}
                        >
                          {item.name}
                          <FiChevronDown className={`dropdown-icon ${activeDropdown === navItems.indexOf(item) ? 'rotated' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === navItems.indexOf(item) && (
                            <motion.div 
                              className="mobile-dropdown-menu"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.dropdown.map((dropdownItem) => (
                                <Link 
                                  key={dropdownItem.name}
                                  to={dropdownItem.path}
                                  className="mobile-dropdown-item"
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
                        className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="mobile-cta">
                  <div className="mobile-theme-toggle">
                    <ThemeToggle />
                    <span>Toggle Theme</span>
                  </div>
                  <Link to="/contact" className="btn btn-primary w-full">
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
