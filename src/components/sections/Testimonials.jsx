import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiLoader, FiStar } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useApp } from '../../context/AppContext';
import { HOME_CONTENT } from '../../data/pageContent';
import SectionHeader from '../ui/SectionHeader';
import './Testimonials.css';

const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

const Testimonials = () => {
  const [ref, inView] = useScrollReveal();
  const [hasFetched, setHasFetched] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { testimonials, loadingTestimonials, fetchTestimonials } = useApp();
  const { testimonials: testimonialsCopy } = HOME_CONTENT;

  useEffect(() => {
    if (inView && !hasFetched && !loadingTestimonials && isInitialLoad && testimonials.length === 0) {
      setHasFetched(true);
      setIsInitialLoad(false);
      fetchTestimonials();
    } else if (testimonials.length > 0) {
      setIsInitialLoad(false);
    }
  }, [inView, hasFetched, loadingTestimonials, fetchTestimonials, isInitialLoad, testimonials.length]);

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        size={16}
        className={index < rating ? 'star-filled' : 'star-empty'}
      />
    ));

  const renderSlide = (testimonial, variant = 'card') => (
    <div className={`testimonial-card testimonial-card--${variant}`}>
      {variant === 'spotlight' && (
        <div className="testimonial-quote-mark" aria-hidden="true">
          &ldquo;
        </div>
      )}
      {variant === 'card' && (
        <div className="testimonial-rating">{renderStars(testimonial.rating)}</div>
      )}
      <p className="testimonial-text">
        {variant === 'spotlight' ? testimonial.review : `“${testimonial.review}”`}
      </p>
      <div className="testimonial-author">
        {variant === 'spotlight' && (
          <div className="author-avatar" aria-hidden="true">
            {getInitials(testimonial.name)}
          </div>
        )}
        <div className="author-info">
          <h4>{testimonial.name}</h4>
          <p>
            {testimonial.title}
            {testimonial.company ? `, ${testimonial.company}` : ''}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="testimonials-section" ref={ref}>
      <div className="container">
        <SectionHeader
          title={testimonialsCopy.title}
          subtitle={testimonialsCopy.subtitle}
          className="testimonials-header"
          inView={inView}
        />

        <motion.div
          className="testimonials-content"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {loadingTestimonials && isInitialLoad ? (
            <div className="loading-testimonials">
              <FiLoader className="spinner" size={32} />
              <p>Loading testimonials...</p>
            </div>
          ) : testimonials.length > 0 ? (
            <>
              <div className="testimonials-spotlight">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={24}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  className="testimonials-swiper testimonials-swiper--spotlight"
                >
                  {testimonials.map((testimonial) => (
                    <SwiperSlide key={`spotlight-${testimonial.id}`}>
                      {renderSlide(testimonial, 'spotlight')}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="testimonials-desktop">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  className="testimonials-swiper"
                >
                  {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                      {renderSlide(testimonial, 'card')}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          ) : (
            <div className="no-testimonials">
              <p>Client testimonials will appear here once added.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
