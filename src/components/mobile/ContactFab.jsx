import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMessageCircle } from 'react-icons/fi';
import { getScreenMeta } from '../../data/appScreens';
import './ContactFab.css';

const ContactFab = () => {
  const { pathname } = useLocation();
  const meta = getScreenMeta(pathname);

  if (!meta.showFab) {
    return null;
  }

  return (
    <Link to="/contact" className="app-fab" aria-label="Contact us">
      <FiMessageCircle size={22} />
      <span>Contact</span>
    </Link>
  );
};

export default ContactFab;
