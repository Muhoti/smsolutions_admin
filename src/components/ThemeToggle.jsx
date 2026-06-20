import React from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      className="theme-toggle"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        className="theme-toggle-inner"
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {isDarkMode ? (
          <FiSun size={20} className="theme-icon" />
        ) : (
          <FiMoon size={20} className="theme-icon" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
