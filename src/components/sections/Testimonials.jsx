import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiLoader } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useApp } from '../../context/AppContext';
import SectionHeader from '../ui/SectionHeader';
import './Testimonials.css';

const Testimonials = () => {
  const [ref, inView] = useScrollReveal();
  const [hasFetched, setHasFetched] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { testimonials, loadingTestimonials, fetchTestimonials } = useApp();

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

  return (
    <section className="testimonials-section" ref={ref}>
      <div className="container">
        <SectionHeader
          title="What Clients Say"
          subtitle="Feedback from organizations we have partnered with"
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
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="testimonials-swiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="testimonial-card">
                    <div className="testimonial-rating">{renderStars(testimonial.rating)}</div>
                    <p className="testimonial-text">&ldquo;{testimonial.review}&rdquo;</p>
                    <div className="testimonial-author">
                      <div className="author-info">
                        <h4>{testimonial.name}</h4>
                        <p>
                          {testimonial.title}
                          {testimonial.company ? `, ${testimonial.company}` : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
