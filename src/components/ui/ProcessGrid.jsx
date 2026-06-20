import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const ProcessGrid = ({
  steps,
  inView = true,
  headerTitle = 'How We Work',
  headerSubtitle = 'A structured consultancy process designed to reduce risk and deliver results',
  headerClassName = 'how-we-work-header',
  gridClassName = 'how-we-work-grid',
  cardClassName = 'how-we-work-card',
  sectionClassName = 'how-we-work-section',
  sectionRef,
}) => (
  <section className={sectionClassName} ref={sectionRef}>
    <div className="container">
      <SectionHeader
        title={headerTitle}
        subtitle={headerSubtitle}
        className={headerClassName}
        inView={inView}
      />

      <div className={gridClassName}>
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <motion.div
              key={step.step}
              className={cardClassName}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="step-number">{step.step}</div>
              {Icon && (
                <div className="step-icon">
                  <Icon size={28} />
                </div>
              )}
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ProcessGrid;
