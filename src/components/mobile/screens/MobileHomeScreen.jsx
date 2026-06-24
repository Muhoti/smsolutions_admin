import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { useApp } from '../../../context/AppContext';
import { HOME_CONTENT } from '../../../data/pageContent';
import { SERVICES } from '../../../data/services';
import { PROCESS_STEPS } from '../../../data/processSteps';
import { filterProjects, getProjectCover, getProjectType } from '../../../utils/portfolio';
import MobileCinematicHero from '../flutter/MobileCinematicHero';
import { M3Screen, M3Button, M3Loading } from '../flutter/MobileUIKit';
import './MobileHomeScreen.css';
import '../flutter/MobileCinematicHero.css';

const SERVICE_COLORS = ['#0088ff', '#6366f1', '#10b981', '#a855f7'];
const HOME_PROCESS_STEPS = PROCESS_STEPS.slice(0, 4);

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

const MobileHomeScreen = () => {
  const { projects, testimonials, loadingProjects, loadingTestimonials } = useApp();
  const { hero, services, howWeWork, portfolio, testimonials: testimonialsCopy, cta } =
    HOME_CONTENT;

  const featured = filterProjects(projects, { category: 'all' }).slice(
    0,
    portfolio.previewCount,
  );

  return (
    <M3Screen className="m3-home">
      <MobileCinematicHero
        className="m3-home-hero"
        layout="split"
        title={hero.title}
        titleAccent={hero.titleAccent}
        lead={hero.subtitle}
        showLogo
      >
        <div className="m3-cinematic-actions">
          <M3Button variant="filled" to={hero.ctaPrimary.to}>
            {hero.ctaPrimary.label}
          </M3Button>
          <M3Button variant="outlined" to={hero.ctaSecondary.to}>
            {hero.ctaSecondary.label}
          </M3Button>
        </div>
      </MobileCinematicHero>

      <section className="m3-home-panel m3-home-panel--auto m3-home-services-panel" aria-label={services.title}>
        <div className="m3-home-panel-inner m3-home-panel-inner--fill">
          <header className="m3-home-panel-head m3-home-panel-head--compact">
            <div>
              <h2>{services.title}</h2>
              <p className="m3-home-panel-sub">{services.subtitle}</p>
            </div>
          </header>
          <div className="m3-home-services">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  to={`/services#${service.id}`}
                  className="m3-home-service"
                >
                  <span
                    className="m3-home-service-icon"
                    style={{
                      background: `${SERVICE_COLORS[index]}18`,
                      color: SERVICE_COLORS[index],
                    }}
                  >
                    <Icon size={24} />
                  </span>
                  <span className="m3-home-service-label">{service.title}</span>
                  <span className="m3-home-service-hint">{service.subtitle}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="m3-home-panel m3-home-panel--auto m3-home-process-panel" aria-label={howWeWork.title}>
        <div className="m3-home-panel-inner m3-home-panel-inner--fill">
          <header className="m3-home-panel-head m3-home-panel-head--compact">
            <div>
              <h2>{howWeWork.title}</h2>
              <p className="m3-home-panel-sub">{howWeWork.subtitle}</p>
            </div>
          </header>
          <div className="m3-home-process">
            {HOME_PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="m3-home-process-card">
                  <span className="m3-home-process-num">{step.step}</span>
                  <span
                    className="m3-home-process-icon"
                    style={{
                      background: `${SERVICE_COLORS[index]}18`,
                      color: SERVICE_COLORS[index],
                    }}
                  >
                    <Icon size={22} />
                  </span>
                  <span className="m3-home-process-label">{step.title}</span>
                  <span className="m3-home-process-hint">{step.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="m3-home-panel m3-home-work" aria-label={portfolio.title}>
        <div className="m3-home-panel-inner m3-home-panel-inner--fill">
          <header className="m3-home-panel-head m3-home-panel-head--compact">
            <div>
              <h2>{portfolio.title}</h2>
              <p className="m3-home-panel-sub">{portfolio.subtitle}</p>
            </div>
          </header>
          {loadingProjects ? (
            <M3Loading message={portfolio.loadingMessage} />
          ) : featured.length > 0 ? (
            <>
              <div className="m3-home-projects">
                {featured.map((project) => {
                  const cover = getProjectCover(project);
                  return (
                    <Link key={project.id} to="/portfolio" className="m3-home-project">
                      <div className="m3-home-project-media">
                        {cover ? (
                          <img src={cover} alt="" loading="lazy" />
                        ) : (
                          <span className="m3-home-project-fallback">SDL</span>
                        )}
                      </div>
                      <div className="m3-home-project-text">
                        <span className="m3-home-project-type">
                          {getProjectType(project.category, project.type)}
                        </span>
                        <strong>{project.title}</strong>
                        <p>{project.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Link to="/portfolio" className="m3-home-view-all">
                {portfolio.linkLabel}
                <FiArrowRight size={16} />
              </Link>
            </>
          ) : (
            <div className="m3-home-muted">
              <p>{portfolio.emptyMessage}</p>
              <p>
                Check back later or{' '}
                <Link to="/contact">contact us</Link> to discuss your project.
              </p>
              <Link to="/portfolio" className="m3-home-view-all m3-home-view-all--solo">
                {portfolio.linkLabel}
                <FiArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section
        className="m3-home-panel m3-home-clients"
        aria-label={testimonialsCopy.title}
      >
        <div className="m3-home-panel-inner m3-home-panel-inner--fill">
          <header className="m3-home-panel-head m3-home-panel-head--compact">
            <div>
              <h2>{testimonialsCopy.title}</h2>
              <p className="m3-home-panel-sub">{testimonialsCopy.subtitle}</p>
            </div>
          </header>
          {loadingTestimonials ? (
            <M3Loading message="Loading testimonials…" />
          ) : testimonials.length > 0 ? (
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={12}
              slidesPerView={1}
              className="m3-home-testimonials-swiper"
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="m3-home-quote">
                    <p>&ldquo;{item.review}&rdquo;</p>
                    <div className="m3-home-quote-author">
                      <span className="m3-home-quote-avatar">{getInitials(item.name)}</span>
                      <span>
                        <strong>{item.name}</strong>
                        <small>
                          {item.title}
                          {item.company ? ` · ${item.company}` : ''}
                        </small>
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="m3-home-muted">Client feedback will appear here soon.</p>
          )}
        </div>
      </section>

      <section className="m3-home-panel m3-home-panel--auto m3-home-cta-wrap" aria-label={cta.title}>
        <div className="m3-cta-banner">
          <h2>{cta.title}</h2>
          <p>{cta.subtitle}</p>
          <M3Button variant="filled" to="/contact" fullWidth>
            {cta.button}
            <FiArrowRight size={18} />
          </M3Button>
        </div>
      </section>
    </M3Screen>
  );
};

export default MobileHomeScreen;
