import React from 'react';
import { motion } from 'framer-motion';

const ValuesGrid = ({
  title,
  values,
  inView = true,
  sectionClassName = 'about-values',
}) => (
  <section className={sectionClassName}>
    <div className="container">
      <motion.div
        className="values-content"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h2>{title}</h2>
        <div className="values-grid">
          {values.map((value) => (
            <div key={value.title} className="value-item">
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default ValuesGrid;
