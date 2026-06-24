import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { HOME_CONTENT } from '../../data/pageContent';
import { SERVICES } from '../../data/services';
import SectionHeader from '../ui/SectionHeader';
import ServiceCard from '../ui/ServiceCard';
import './Services.css';

const ServicesSection = () => {
  const [ref, inView] = useScrollReveal();
  const { services } = HOME_CONTENT;

  return (
    <section className="services-section" ref={ref}>
      <div className="container">
        <SectionHeader
          title={services.title}
          subtitle={services.subtitle}
          className="services-header section-header--underline"
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
