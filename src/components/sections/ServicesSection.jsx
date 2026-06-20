import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { SERVICES } from '../../data/services';
import SectionHeader from '../ui/SectionHeader';
import ServiceCard from '../ui/ServiceCard';
import './Services.css';

const ServicesSection = () => {
  const [ref, inView] = useScrollReveal();

  return (
    <section className="services-section" ref={ref}>
      <div className="container">
        <SectionHeader
          title="Our Services"
          subtitle="End-to-end technology consultancy for businesses building modern online systems"
          className="services-header"
          inView={inView}
        />

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              variant="compact"
              inView={inView}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
