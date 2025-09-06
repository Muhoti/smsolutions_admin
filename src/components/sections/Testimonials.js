import React, { useEffect } from 'react';
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

  const { testimonials, loading, fetchTestimonials } = useApp();

  useEffect(() => {
    if (inView && testimonials.length === 0) {
      fetchTestimonials();
    }
  }, [inView, fetchTestimonials, testimonials.length]);

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
          <h2>What My Clients Say</h2>
          <p>Don't just take my word for it. Here's what my clients have to say about the mobile and web applications I've built for their businesses.</p>
        </motion.div>

        <motion.div 
          className="testimonials-slider"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {loading ? (
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
                          src={testimonial.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.clientName)}&background=6366f1&color=fff&size=80`} 
                          alt={testimonial.clientName} 
                        />
                      </div>
                      <div className="client-info">
                        <h4>{testimonial.clientName}</h4>
                        <p className="client-position">{testimonial.position}, {testimonial.company}</p>
                        {testimonial.project && (
                          <p className="client-project">{testimonial.project}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="testimonial-rating">
                      {renderStars(testimonial.rating || 5)}
                    </div>
                    
                    <blockquote className="testimonial-text">
                      "{testimonial.content}"
                    </blockquote>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="no-testimonials">
              <p>No testimonials available at the moment.</p>
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
            <h3>50+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="stat-item">
            <h3>4.9/5</h3>
            <p>Average Rating</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>Client Satisfaction</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
