import React from 'react';
import { motion } from 'framer-motion';

const PageHero = ({
  title,
  subtitle,
  heroClass,
  titleClass,
  subtitleClass,
  contentClass = 'page-hero-content',
}) => (
  <section className={`${heroClass} ai-surface-light`}>
    <div className="container">
      <motion.div
        className={contentClass}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className={titleClass}>{title}</h1>
        {subtitle && <p className={subtitleClass}>{subtitle}</p>}
      </motion.div>
    </div>
  </section>
);

export default PageHero;
