import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({
  title,
  subtitle,
  className = 'section-header',
  titleTag: TitleTag = 'h2',
  inView = true,
  delay = 0,
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
    transition={{ duration: 0.8, delay }}
  >
    <TitleTag>{title}</TitleTag>
    {subtitle && <p>{subtitle}</p>}
  </motion.div>
);

export default SectionHeader;
