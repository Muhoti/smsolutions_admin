import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const pageMotion = {
  initial: { opacity: 0, y: 10, scale: 0.995 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.995 },
  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
};

const MobilePageLayout = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} className="app-screen" {...pageMotion}>
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};

export default MobilePageLayout;
