import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { PROCESS_STEPS } from '../../data/processSteps';
import ProcessGrid from '../ui/ProcessGrid';
import './HowWeWork.css';

const HowWeWork = () => {
  const [ref, inView] = useScrollReveal();

  return (
    <ProcessGrid
      steps={PROCESS_STEPS}
      inView={inView}
      sectionRef={ref}
    />
  );
};

export default HowWeWork;
