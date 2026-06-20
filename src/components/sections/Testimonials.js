import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FiStar, FiLoader } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import './Testimonials.css';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [hasFetched, setHasFetched] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { testimonials, loading, fetchTestimonials } = useApp();

  useEffect(() => {
    if (inView && !hasFetched && !loading && isInitialLoad) {
      setHasFetched(true);
      setIsInitialLoad(false);
      fetchTestimonials();
    }
  }, [inView, hasFetched, loading, fetchTestimonials, isInitialLoad]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar 
        key={index} 
        size={16} 
        className={index < rating ? 'star-filled' : 'star-empty'} 
      />
    ));
  };

  return (
    <section className="testimonials-section" ref={ref}>
      <div className="container">
        <motion.div 
          className="testimonials-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2>What Our Clients Say</h2>
          <p>Feedback from organizations we have partnered with on web, mobile, and systems projects.</p>
        </motion.div>

        <motion.div 
          className="testimonials-slider"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {loading && isInitialLoad ? (
            <div className="loading-testimonials">
              <FiLoader className="spinner" size={32} />
              <p>Loading client testimonials...</p>
            </div>
          ) : testimonials.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                }
              }}
              className="testimonials-swiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="testimonial-card">
                    <div className="testimonial-header">
                      <div className="client-avatar">
                        <img 
                          src={testimonial.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=00a8ff&color=fff&size=80`} 
                          alt={testimonial.name} 
                        />
                      </div>
                      <div className="client-info">
                        <h4>{testimonial.name}</h4>
                        <p className="client-position">{testimonial.title}{testimonial.company ? `, ${testimonial.company}` : ''}</p>
                        {testimonial.project && (
                          <p className="client-project">{testimonial.project}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="testimonial-rating">
                      {renderStars(testimonial.rating || 5)}
                    </div>
                    
                    <blockquote className="testimonial-text">
                      "{testimonial.review}"
                    </blockquote>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="no-testimonials">
              <FiStar size={48} />
              <h3>No testimonials yet</h3>
              <p>Client testimonials will appear here once they're added.</p>
              <p>Check back later to see client feedback.</p>
            </div>
          )}
        </motion.div>

        <motion.div 
          className="testimonials-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="stat-item">
            <h3>Quality</h3>
            <p>Engineering Focus</p>
          </div>
          <div className="stat-item">
            <h3>Trusted</h3>
            <p>Client Partnerships</p>
          </div>
          <div className="stat-item">
            <h3>Results</h3>
            <p>Outcome-Driven</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
