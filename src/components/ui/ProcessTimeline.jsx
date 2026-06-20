import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const ProcessTimeline = ({
  steps,
  inView = true,
  headerTitle = 'Our Process',
  headerSubtitle = 'A proven consultancy methodology from first conversation to long-term support',
}) => (
  <section className="process-section">
    <div className="container">
      <SectionHeader
        title={headerTitle}
        subtitle={headerSubtitle}
        className="process-header"
        inView={inView}
      />

      <div className="process-timeline">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <motion.div
              key={step.step}
              className="process-step"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <div className="step-number">{step.step}</div>
              <div className="step-content">
                {Icon && (
                  <div className="step-icon">
                    <Icon size={32} />
                  </div>
                )}
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ProcessTimeline;
