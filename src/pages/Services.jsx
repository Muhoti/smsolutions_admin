import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SERVICES } from '../data/services';
import { PROCESS_STEPS } from '../data/processSteps';
import { SERVICES_CONTENT } from '../data/pageContent';
import PageHero from '../components/ui/PageHero';
import ServiceCard from '../components/ui/ServiceCard';
import ProcessTimeline from '../components/ui/ProcessTimeline';
import Button from '../components/ui/Button';
import MobileScreenGate from '../components/mobile/MobileScreenGate';
import MobileServicesScreen from '../components/mobile/screens/MobileServicesScreen';
import './Services.css';

const ServicesDesktop = ({ inView, sectionRef }) => {
  const { hero, cta } = SERVICES_CONTENT;

  return (
  <>
    <PageHero
      heroClass="services-hero"
      titleClass="services-title"
      subtitleClass="services-subtitle"
      contentClass="services-hero-content"
      title={hero.title}
      subtitle={hero.subtitle}
    />

    <section className="services-grid-section" ref={sectionRef}>
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
          <h2>{cta.title}</h2>
          <p>{cta.subtitle}</p>
          <div className="cta-buttons">
            <Button to="/contact" variant="primary" size="lg">
              {cta.primary}
              <FiArrowRight size={20} />
            </Button>
            <Button to="/portfolio" variant="secondary" size="lg">
              {cta.secondary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  </>
  );
};

const Services = () => {
  const [ref, inView] = useScrollReveal();

  return (
    <div className="services-page">
      <MobileScreenGate
        mobile={<MobileServicesScreen />}
        desktop={<ServicesDesktop inView={inView} sectionRef={ref} />}
      />
    </div>
  );
};

export default Services;
