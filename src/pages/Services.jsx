import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SERVICES } from '../data/services';
import { PROCESS_STEPS } from '../data/processSteps';
import PageHero from '../components/ui/PageHero';
import ServiceCard from '../components/ui/ServiceCard';
import ProcessTimeline from '../components/ui/ProcessTimeline';
import Button from '../components/ui/Button';
import './Services.css';

const Services = () => {
  const [ref, inView] = useScrollReveal();

  return (
    <div className="services-page">
      <PageHero
        heroClass="services-hero"
        titleClass="services-title"
        subtitleClass="services-subtitle"
        contentClass="services-hero-content"
        title="Our Services"
        subtitle="Technology consultancy and development for businesses building modern online systems"
      />

      <section className="services-grid-section" ref={ref}>
        <div className="container">
          <div className="services-grid">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                variant="detailed"
                inView={inView}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline steps={PROCESS_STEPS} inView={inView} />

      <section className="services-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Let&apos;s Discuss Your Project</h2>
            <p>Tell us what you are building. We will respond with a clear recommendation.</p>
            <div className="cta-buttons">
              <Button to="/contact" variant="primary" size="lg">
                Contact Us
                <FiArrowRight size={20} />
              </Button>
              <Button to="/portfolio" variant="secondary" size="lg">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
